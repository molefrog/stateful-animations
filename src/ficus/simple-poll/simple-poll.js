import React, { Component } from 'react'
import _ from 'lodash'

const safeFraction = (a, b) => (!b ? 0.0 : a / b)

const BarToolip = ({ votes, percent }) => (
  <div className="simple-poll__bar-tooltip">
    <div className="simple-poll__bar-tooltip-inner">
      {votes || 0} · {(percent || 0).toFixed(1)}%
    </div>
  </div>
)

const Bar = ({ width, height, bar }) => {
  return (
    <div style={{ width: `${width}%` }} className="simple-poll__bar">
      <BarToolip votes={bar.votes} percent={bar.weight * 100.0} />

      <div
        className="simple-poll__bar-progress"
        style={{
          backgroundColor: bar.color,
          height: `${height}%`
        }}
      />
    </div>
  )
}

class SimplePoll extends Component {
  getBarHeight(value, max) {
    const step = 10

    const currentLimit = step * Math.ceil(max / step)
    return Math.max(1, 100.0 * safeFraction(value, currentLimit))
  }

  render() {
    const subHeader = `${this.getVotersCount()} votes on`

    const { poll } = this.props

    const bars = this.getChartData()

    const maxVotes = _.max(bars.map(b => b.votes))
    const barWidth = 100.0 / bars.length

    return (
      <div className="simple-poll">
        <div className="simple-poll__subheader">
          <div className="simple-poll__subheader-inner">
            {subHeader}
            <span className="simple-poll__subheader-link">{poll.url}</span>
          </div>

          <div className="simple-poll__total">{this.getVotersCount()}</div>
        </div>

        <div className="simple-poll__header">{poll.title}</div>

        <div className="simple-poll__votes">
          <div className="simple-poll__bars">
            {bars.map(bar => (
              <Bar
                bar={bar}
                key={bar.id}
                width={barWidth}
                height={this.getBarHeight(bar.votes, maxVotes)}
              />
            ))}
          </div>

          <div className="simple-poll__labels">
            {bars.map(bar => (
              <div
                style={{ width: `${barWidth}%` }}
                className="simple-poll__label-col"
                key={bar.id}
              >
                <div className="simple-poll__label">{bar.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  getVotersCount() {
    return this.props.poll.votersCount
  }

  getChartData() {
    const { poll } = this.props
    if (!poll) return []

    return poll.choices.map(choice => {
      let result = poll.results[choice.id]

      return {
        ...choice,
        label: choice.text,
        weight: result.percent,
        votes: result.votes
      }
    })
  }
}

export default SimplePoll
