import requestAnimationFrame from 'raf'
import NeighbourDetector from './neighbour-detector'
import { Howl } from 'howler'

// boid algorithm params
const alpha = 0.006
const beta = 0.09
const gamma = -0.1

// friction
const theta = -0.03
const alphaRadius = 100.0
const betaRadius = 100.0
const gammaRadius = 30.0
const attraction = 0.001
const explosionBounce = 3000.0

const boidSymbols = ['✕', '△', '◯', '▧']

// Calculates the distance between two points
const distance = (x1, y1, x2, y2) =>
  Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))

// Same as _.sample
const pickRandom = array => array[Math.floor(Math.random() * array.length)]

const startSound = new Howl({ src: './sounds/game-start.ogg' })
// const slapSound = new Howl({ src: './sounds/slap.ogg' })

class Simulator {
  constructor(_root, N = 100) {
    this._root = _root
    this.width = 0
    this.height = 0

    this.targetX = 0.0
    this.targetY = 0.0

    this.alphaLaw = true
    this.betaLaw = true
    this.gammaLaw = true
    this.attractLaw = false

    this.boids = Array(N)
      .fill(0)
      .map((_, i) => ({
        idx: i,
        active: true,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        symbol: pickRandom(boidSymbols)
      }))

    this.boidElements = this.boids.map(boid => {
      const element = document.createElement('div')

      element.classList.add('boids__cross')
      element.textContent = boid.symbol

      // append to the container element
      _root.appendChild(element)

      return element
    })

    this.fpsCounter = document.createElement('div')
    this.fpsCounter.classList.add('boids__fps')
    _root.appendChild(this.fpsCounter)
  }

  start(initX = 0.5, initY = 0.5) {
    // Restart
    this.stop()
    this.isStopped = false

    this.width = this._root.offsetWidth
    this.height = this._root.offsetHeight

    this.boids.forEach(b => {
      b.x = this.width * initX
      b.y = this.height * initY
      b.vx = Math.random() * 3.0 - 1.5
      b.vy = Math.random() * 3.0 - 1.5
    })

    startSound.play()
    this._lastRaf = requestAnimationFrame(this.tick)
  }

  stop() {
    this.isStopped = true
    requestAnimationFrame.cancel(this._lastRaf)
  }

  redraw(delta) {
    const fps = delta ? 1000.0 / delta : 0.0
    this.fpsCounter.textContent =
      `delta: ${delta.toFixed(6)}\n` + `fps: ${fps.toFixed(6)}`

    for (var i = 0; i < this.boids.length; ++i) {
      const b = this.boids[i]
      const angle = Math.atan2(b.vy, b.vx)

      // Update element's transform style
      const element = this.boidElements[i]

      element.style.transform = `
        translate3d(${b.x}px, ${b.y}px, 0.0px)
        rotate(${angle}rad)`
    }
  }

  tick = ts => {
    if (this.isStopped) return

    this._lastRaf = requestAnimationFrame(this.tick)

    // calculate delta
    const prevTs = this.prevTs || ts
    const delta = Math.min(100.0, ts - prevTs) || 0.0001
    this.prevTs = ts

    this.doPhysics(delta)
    this.redraw(delta)
  }

  doPhysics(delta) {
    const detector = new NeighbourDetector(this.boids)

    this.boids.forEach((b, i) => {
      if (!b.active) return

      let cx = 0.0
      let cy = 0.0
      let cvx = 0.0
      let cvy = 0.0

      let collisionx = 0.0
      let collisiony = 0.0

      let n1 = 0
      let n2 = 0

      let nearestBoids = detector.detect(b.x, b.y, 100)

      nearestBoids.forEach((ob, j) => {
        if (i === j || !ob.active) {
          return
        }

        let d = Math.sqrt(
          (ob.x - b.x) * (ob.x - b.x) + (ob.y - b.y) * (ob.y - b.y)
        )

        if (d < alphaRadius) {
          cx += ob.x
          cy += ob.y
          n1 += 1
        }

        if (d < betaRadius) {
          cvx += ob.vx
          cvy += ob.vy
          n2 += 1
        }

        if (d < gammaRadius) {
          collisionx += ob.x - b.x
          collisiony += ob.y - b.y
        }
      })

      cx = n1 ? cx / n1 : 0.0
      cy = n1 ? cy / n1 : 0.0
      cvx = n2 ? cvx / n2 : 0.0
      cvy = n2 ? cvy / n2 : 0.0

      const _alpha = this.alphaLaw ? alpha : 0.0
      const _beta = this.betaLaw ? beta : 0.0
      const _gamma = this.gammaLaw ? gamma : 0.0

      let vx1 = (cx - b.x) * _alpha
      let vy1 = (cy - b.y) * _alpha

      let vx2 = (cvx - b.vx) * _beta
      let vy2 = (cvy - b.vy) * _beta

      let vx3 = collisionx * _gamma
      let vy3 = collisiony * _gamma

      const attrC = this.attractLaw ? attraction : 0.0

      b.vx +=
        vx1 +
        vx2 +
        vx3 +
        theta * b.vx +
        attrC * (this.width * this.targetX - b.x)
      b.vy +=
        vy1 +
        vy2 +
        vy3 +
        theta * b.vy +
        attrC * (this.height * this.targetY - b.y)

      if (this.explode) {
        const [eX, eY] = this.explode

        const r = distance(eX, eY, b.x, b.y) || 0.01

        b.vx += explosionBounce * (b.x - eX) / (r * r)
        b.vy += explosionBounce * (b.y - eY) / (r * r)
      }

      b.x += b.vx
      b.y += b.vy

      if (b.x <= 0.0) {
        b.x = 0.0
        b.vx = -1.0 * b.vx
      }

      if (b.x >= this.width) {
        b.x = this.width
        b.vx = -1.0 * b.vx
      }

      if (b.y <= 0.0) {
        b.y = 0.0
        b.vy = -1.0 * b.vy
      }

      if (b.y >= this.height) {
        b.y = this.height
        b.vy = -1.0 * b.vy
      }
    })

    this.explode = null
  }
}

export default Simulator
