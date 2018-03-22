import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'

import { Slide } from 'presa'
import DynamicCode from 'blocks/dynamic-code'
import Button from 'blocks/button'

import './transistor.scss'

const cycleRot = (collection, el) =>
  collection[(collection.indexOf(el) + 1) % collection.length]

const TransistorCode = ({ points }) => (
  <DynamicCode>
    {'  <div>\n'}
    {'    <div style="transform: translate('}
    <DynamicCode.H text={points[0].x.toFixed(2) + 'px'} />
    {','}
    <DynamicCode.H text={points[0].y.toFixed(2) + 'px'} />
    {')" />\n'}
    {'    ...\n'}
    {'  </div>'}
  </DynamicCode>
)

const TransistorCodeMotion = ({ points }) => {
  const p = points[0]

  return (
    <DynamicCode>
      {'  <div>\n'}

      {'    <Motion style={{x: spring('}
      <DynamicCode.H text={p.x.toFixed(2)} />
      {'), y: spring('}
      <DynamicCode.H text={p.y.toFixed(2)} />
      {')}}>\n'}

      <Motion
        defaultStyle={{ x: 0.0, y: 0.0 }}
        style={{
          x: spring(p.x, presets.wobbly),
          y: spring(p.y, presets.wobbly)
        }}
      >
        {v => (
          <span>
            {`      <div style="transform: translate(`}
            <DynamicCode.H text={v.x.toFixed(2) + 'px'} />
            {`,`}
            <DynamicCode.H text={v.y.toFixed(2) + 'px'} />
            {`)" />\n`}
          </span>
        )}
      </Motion>
      {'    </Motion>\n'}
      {'    ...\n'}
      {'  <div>'}
    </DynamicCode>
  )
}

const TransistorPoints = ({ points, withMotion, width, height }) => {
  const pointsList = points.map((p, i) => {
    if (withMotion) {
      return (
        <Motion
          key={i}
          defaultStyle={{ x: 0.0, y: 0.0 }}
          style={{
            x: spring(p.x, presets.wobbly),
            y: spring(p.y, presets.wobbly)
          }}
        >
          {value => (
            <div
              className="transistor__point transistor__point--no-transition"
              key={i}
              style={{ transform: `translate(${value.x}px, ${value.y}px)` }}
            />
          )}
        </Motion>
      )
    }

    const pointTransform = `translate(${p.x}px, ${p.y}px)`
    return (
      <div
        className="transistor__point"
        key={i}
        style={{
          transform: pointTransform,
          transitionDelay: `${0.02 * i}s`
        }}
      />
    )
  })

  return (
    <div className="transistor__area" style={{ width, height }}>
      {pointsList}
    </div>
  )
}

class Transistor extends Component {
  constructor() {
    super()
    this.state = {
      mode: 'line',
      motionEnabled: true
    }
  }

  changeMode() {
    const modes = ['line', 'circle', 'eight']
    this.setState({ mode: cycleRot(modes, this.state.mode) })
  }

  toggleMotion() {
    this.setState({ motionEnabled: !this.state.motionEnabled })
  }

  render() {
    const mode = this.state.mode
    const width = 700
    const height = 330

    const N = this.props.numberOfPoints

    const radius = 120.0
    const step = 22.0

    const motionEnabled = this.props.motionEnabled
      ? this.state.motionEnabled
      : false

    const points = Array(N)
      .fill()
      .map((_, idx) => {
        const t = (idx + 1) * Math.PI * 2 / N

        switch (mode) {
          case 'line':
            return {
              x: width * 0.5 + idx * step - N * step * 0.5,
              y: height * 0.5
            }

          case 'circle':
            return {
              x: width * 0.5 + radius * Math.cos(t),
              y: height * 0.5 + radius * Math.sin(t)
            }

          case 'eight':
            return {
              x:
                width * 0.5 +
                radius *
                  Math.sqrt(2) *
                  Math.cos(t) /
                  (Math.pow(Math.sin(t), 2) + 1),
              y:
                height * 0.5 +
                radius *
                  Math.sqrt(2) *
                  Math.cos(t) *
                  Math.sin(t) /
                  (Math.pow(Math.sin(t), 2) + 1)
            }
        }
      })

    const translations = {
      line: 'Line',
      circle: 'Circle',
      eight: 'Infinity'
    }

    return (
      <Slide {...this.props} layout={false} className="transistor-slide">
        <div className="transistor-slide__code">
          {motionEnabled ? (
            <TransistorCodeMotion points={points} />
          ) : (
            <TransistorCode points={points} />
          )}
        </div>

        <TransistorPoints
          width={width}
          height={height}
          points={points}
          withMotion={motionEnabled}
        />

        <div className="transistor-slide__controls">
          {this.props.motionEnabled && (
            <Button
              checked={motionEnabled}
              icon={motionEnabled ? '🚗' : '🐢'}
              onClick={this.toggleMotion.bind(this)}
            >
              React Motion {motionEnabled ? 'enabled' : 'disabled'}
            </Button>
          )}

          <Button icon="💥" onClick={this.changeMode.bind(this)}>
            {' '}
            {translations[mode]}
          </Button>
        </div>
      </Slide>
    )
  }
}

Transistor.defaultProps = {
  numberOfPoints: 28
}

export default Transistor
