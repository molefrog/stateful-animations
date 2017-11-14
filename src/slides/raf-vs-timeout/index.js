import React, { Component } from 'react'

import { Slide } from 'otts'
import Timeline from './timeline'

// default discrete step
const step = 0.025

// sin func but gets from 0 to 1
const timingFunc = t => 0.5 + 0.4 * Math.sin(6 * t)

class RafSlide extends Component {
  constructor() {
    super()
    this.state = { currentTime: 0.0 }
  }

  handleCursorChange = cursor => {
    this.setState({ currentTime: cursor })
  }

  render() {
    const numberOfIterations = Math.ceil(1 / step)

    const normalScale = Array(numberOfIterations)
      .fill(0)
      .map((_, index) => {
        return [index * step, 0.0]
      })

    const rafScale = (() => {
      let buffer = []
      let x = 0.0
      let delay = 0.0

      while (x <= 1.0) {
        // carefuly crafted params
        const maxDeviation = 0.03
        const startFrom = 0.15

        buffer.push([x, delay / maxDeviation])

        // Add some arificial delay,
        // but only after `startFrom`.
        const shift = Math.abs(maxDeviation * Math.sin(6 * (x - startFrom)))
        delay = x > startFrom ? shift : 0.0

        x += step + delay
      }

      return buffer
    })()

    const idealGraph = normalScale.map(t => [t[0], timingFunc(t[0])])
    const rafGraph = rafScale
      .filter(t => t[0] <= 1)
      .map(t => [t[0], timingFunc(t[0]), t[1]])

    const timeoutGraph = (scale => {
      let points = []
      let lastValue = 0.0

      scale.forEach(tt => {
        const [t, delay] = tt
        points.push([t, timingFunc(lastValue), delay])
        lastValue += step
      })

      return points
    })(rafScale)

    // Common props for all timelines
    const timelineProps = {
      width: 320,
      height: 300,
      onCursorMove: this.handleCursorChange,
      time: this.state.currentTime
    }

    return (
      <Slide {...this.props} extraClass="hooks-slide">
        <Timeline points={idealGraph} {...timelineProps} />
        <Timeline points={rafGraph} {...timelineProps} />
        <Timeline points={timeoutGraph} {...timelineProps} />
      </Slide>
    )
  }
}

export default RafSlide
