import requestAnimationFrame from 'raf'
import React from 'react'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshNormalMaterial,
  IcosahedronGeometry,
  Mesh
} from 'three'

class Rotator extends React.Component {
  static defaultProps = {
    size: 500,
    background: '#ffffff'
  }

  doRender = ts => {
    if (this.destroy) {
      return
    }

    // Schedule next frame
    requestAnimationFrame(this.doRender)

    // Calculate frame delta
    const prevTs = this.prevTs || ts
    this.prevTs = ts
    const delta = Math.min(100.0, ts - prevTs)

    // P-controller parameter (depends on delta!)
    const p = 0.001 * delta

    const targetX = 4 * Math.PI * (this.mouseX || 0.0)
    const targetY = 3 * Math.PI * (this.mouseY || 0.0)

    this.cube.rotation.z += p * (targetX - this.cube.rotation.z)
    this.cube.rotation.x += p * (targetY - this.cube.rotation.x)
    this.props.onTick(this.cube.rotation.z, this.cube.rotation.x)

    this.renderer.setClearColor(this.props.background, 1)
    this.renderer.render(this.scene, this.camera)
  }

  componentDidMount() {
    const { size } = this.props
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, size / size, 0.1, 1000)

    // Init WebGL renderer
    this.renderer = new WebGLRenderer()
    this.renderer.setSize(size, size)
    this.renderer.setClearColor(this.props.background, 1)
    this._root.appendChild(this.renderer.domElement)

    var geometry = new IcosahedronGeometry(1, 1)
    var material = new MeshNormalMaterial({ flatShading: true })
    this.cube = new Mesh(geometry, material)
    this.scene.add(this.cube)
    this.camera.position.z = 2

    requestAnimationFrame(this.doRender)
  }

  componentWillUnmount() {
    // Three.js doesn't provide good methods for disposal
    this.destroy = true
  }

  componentWillReceiveProps(nextProps) {
    this.mouseX = nextProps.rotX
    this.mouseY = nextProps.rotY
  }

  // Do not rerender
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div
        style={{
          background: this.props.background
        }}
        ref={el => (this._root = el)}
      />
    )
  }
}

export default Rotator
