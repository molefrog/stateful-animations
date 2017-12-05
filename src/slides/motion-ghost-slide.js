import React, { Component } from 'react'
import { Motion, TransitionMotion, spring, presets } from 'react-motion'

import { Slide } from 'presa'
import Button from 'blocks/button'

// Utils
const makeKey = (t, i) => `${t}-${i}`
const nextTick = fn => setTimeout(fn, 0)

/*
 * UI-related options: colors, sizes etc.
 */
const options = {
  boxColor: '#F62466',
  timelineColor: '#CFCFCF',
  pointColor: '#2AD58B',
  pointSelectedColor: '#F62466',
  edgeColor: '#4094ED',

  width: 800,
  height: 400,
  timelineWidth: 500
}

/*
 * Box entity component
 */
const Entity = ({ t, opacity, width, radius = 50 }) => (
  <g
    style={{ opacity }}
    transform={`
      translate(${width * t})
      rotate(${405 * t})
      scale(${1.0 + 1.5 * t})
    `}
  >
    <rect
      x={-0.5 * radius}
      y={-0.5 * radius}
      width={radius}
      height={radius}
      style={{ fill: options.boxColor }}
      rx="5"
      ry="5"
    />
  </g>
)

class MotionGhost extends Component {
  constructor() {
    super()
    this.state = {
      alpha: 0.0,
      ghosts: [],
      currentTime: null,
      isWobble: false
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.switchCorners = this.switchCorners.bind(this)
  }

  switchCorners() {
    this.setState({
      alpha: this.state.alpha ? 0.0 : 1.0,
      ghosts: []
    })
  }

  componentDidMount() {
    if (!this.state.ghosts.length) {
      this.switchCorners()
    }
  }

  handleMouseMove(event) {
    const { left } = event.currentTarget.getBoundingClientRect()
    const x = event.pageX - left - 0.5 * (options.width - options.timelineWidth)

    const tx = x / options.timelineWidth

    const sorted = [...this.state.ghosts, 1.0, 0.0].sort(
      (a, b) => Math.abs(a - tx) - Math.abs(b - tx)
    )

    const current = sorted[0]

    if (this.state.currentTime !== current) {
      this.setState({ currentTime: current })
    }
  }

  handleMouseLeave() {
    this.setState({ currentTime: null })
  }

  render() {
    const controlPoints = 30
    const { width, height, timelineWidth } = options
    const { currentTime, alpha, isWobble } = this.state

    const springParams = isWobble
      ? { stiffness: 100, damping: 10 }
      : { stiffness: 120, damping: 30 }

    const timelineMargins = 20

    return (
      <Slide {...this.props} centered>
        <svg
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          version="1.1"
          baseProfile="full"
          width={width}
          height={height}
        >
          {/* Render box and its ghost copies */}
          <g transform={`translate(${0.5 * width - 0.5 * timelineWidth},100)`}>
            <Motion
              defaultStyle={{ x: 0.0 }}
              style={{ x: spring(this.state.alpha, springParams) }}
            >
              {value => {
                const t = value.x

                // This will fill up `ghosts` array during the animation
                nextTick(() => {
                  const { ghosts, alpha } = this.state
                  const step = 1.0 / controlPoints

                  if (
                    (alpha && t > step * ghosts.length) ||
                    (!alpha && t < 1.0 - step * ghosts.length)
                  ) {
                    this.setState({ ghosts: [...ghosts, t] })
                  }
                })

                return <Entity t={t} width={timelineWidth} opacity={0.9} />
              }}
            </Motion>

            {/* Ghosts */}
            {this.state.ghosts.map((t, i) => (
              <Entity
                key={makeKey(t, i)}
                t={t}
                width={timelineWidth}
                opacity={t === currentTime ? 0.4 : 0.05}
              />
            ))}
          </g>

          {/* Timeline */}
          <g transform={`translate(${0.5 * width - 0.5 * timelineWidth}, 300)`}>
            <line
              x1={-timelineMargins}
              y1="0"
              x2={timelineWidth + timelineMargins}
              y2="0"
              strokeWidth={5}
              style={{
                stroke: options.timelineColor,
                strokeLinecap: 'round'
              }}
            />

            {/* Render control ghost points */}
            <TransitionMotion
              willLeave={() => ({ x: spring(0) })}
              willEnter={() => ({ x: 0 })}
              styles={this.state.ghosts.map((t, i) => ({
                key: makeKey(t, i),
                data: t,
                style: {
                  x: spring(t === currentTime ? 1.4 : 1.0, presets.stiff)
                }
              }))}
            >
              {interpolatedStyles => (
                <g>
                  {interpolatedStyles.map(config => {
                    const t = config.data
                    const { x } = config.style

                    return (
                      <circle
                        cx={timelineWidth * t}
                        cy="0"
                        r={x * 7.0}
                        key={config.key}
                        style={{
                          fill:
                            t === currentTime
                              ? options.pointSelectedColor
                              : options.pointColor
                        }}
                      />
                    )
                  })}
                </g>
              )}
            </TransitionMotion>

            {/* 0 and 1 control points */}
            <circle
              cx={0}
              cy="0"
              r="12"
              style={{
                fill: options.edgeColor,
                strokeWidth: 2,
                stroke: '#fff'
              }}
            />
            <circle
              cx={timelineWidth}
              cy="0"
              r="12"
              style={{
                fill: options.edgeColor,
                strokeWidth: 2,
                stroke: '#fff'
              }}
            />

            {/* Current state label */}
            {currentTime && (
              <Motion
                defaultStyle={{ x: currentTime }}
                style={{ x: spring(currentTime, presets.stiff) }}
              >
                {value => (
                  <text textAnchor="middle" x={timelineWidth * value.x} y="-30">
                    {`{ x: ${currentTime.toFixed(6)} }`}
                  </text>
                )}
              </Motion>
            )}
          </g>
        </svg>

        <div className="transistor-slide__controls">
          <Button icon={alpha ? '👈' : '👉'} onClick={this.switchCorners}>
            {alpha ? 'Cюда' : 'Туда'}
          </Button>

          <Button
            icon={'🔫'}
            checked={isWobble}
            onClick={() => this.setState({ isWobble: !isWobble })}
          >
            {'Режим желе'}
          </Button>
        </div>
      </Slide>
    )
  }
}

export default MotionGhost
