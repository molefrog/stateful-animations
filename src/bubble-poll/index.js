import React, { Component } from 'react'

import {
  forceSimulation,
  forceCollide,
  forceCenter
} from 'd3-force'

import pointForce from './point-force'

class BubblePoll extends Component {
  componentDidUpdate () {
    this.nodes = this.props.poll.voters.map((v, idx) => {
      let node = this.nodes[idx] ? this.nodes[idx] : {}

      return {
        r: Math.random() * 4 + 10,
        x: 0,
        y: 0,
        ...node,
        choice: v.choice
      }
    })

    this.choicesIds = this.props.poll.choices.map(ch => ch.id)

    this.simulation.stop()
    this.simulation.nodes(this.nodes)
    this.simulation.restart()
  }

  onTick () {
    const canvas = this.pollEl.querySelector('canvas')
    const context = canvas.getContext('2d')

    const width = canvas.width
    const height = canvas.height

    context.clearRect(0, 0, width, height)
    context.save()
    context.translate(width / 2, height / 2)

    context.beginPath()

    this.nodes.forEach(function (d) {
      context.moveTo(d.x + d.r, d.y)
      context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
    })

    context.fill()
    context.strokeStyle = 'black'
    context.stroke()

    context.restore()
  }

  nodeTarget (node) {
    const r = 220

    const idx = this.choicesIds.indexOf(node.choice)

    return [
      r * Math.cos(idx * 2 * Math.PI / 3),
      r * Math.sin(idx * 2 * Math.PI / 3),
      0.015
    ]
  }

  componentDidMount () {
    this.nodes = this.props.poll.voters.map((n) => ({
      r: Math.random() * 4 + 6,
      choice: n.choice
    }))

    this.choicesIds = this.props.poll.choices.map(ch => ch.id)

    this.simulation = forceSimulation(this.nodes)
      .velocityDecay(0.2)
      .alphaDecay(0.00001)
      .force('target', pointForce(x => this.nodeTarget(x)))
      .force('collide', forceCollide().radius(function (d) { return d.r + 3 }).iterations(2))
      .force('center', forceCenter())
      .on('tick', () => this.onTick())
  }

  render () {
    return (
      <div
        ref={e => { this.pollEl = e }}
        className='bubble-poll'>
        <canvas width='1024px' height='768px' />
      </div>)
  }
}

export default BubblePoll

