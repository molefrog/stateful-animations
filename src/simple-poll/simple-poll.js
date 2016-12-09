import React, { Component } from 'react'

const safeFraction = (a, b) => !b ? 0.0 : (a / b)
const dummyI18n = (text, ...rest) => text

class SimplePoll extends Component {
  render () {
    const i18n = this.props.i18n || dummyI18n
    const subHeader = `${this.getVotersCount()} votes on ` ||
      i18n('%voters on ', {
        voters: i18n('total %0 voters', this.getVotersCount())
      })

    const { poll } = this.props

    const bars = this.getChartData()
    const maxWeight = Math.min(0.4, Math.max(...bars.map(b => b.weight)))

    const barWidth = `${100.0 / bars.length}%`

    return (
      <div className='simple-poll'>
        <div className='simple-poll__header'>
          {poll.title}
        </div>
        <div className='simple-poll__subheader'>
          {subHeader}
          <span className='simple-poll__subheader-link'>
            {poll.url}
          </span>
        </div>

        <div className='simple-poll__votes'>

          <div className='simple-poll__bars'>
            {bars.map(bar => (
              <div style={{ width: barWidth }}
                key={bar.id} className='simple-poll__bar'>

                <div className='simple-poll__bar-progress'
                  style={{
                    backgroundColor: bar.color,
                    height: `${Math.max(1, 0.8 * 100 * safeFraction(bar.weight, maxWeight))}%`
                  }} />
              </div>)
            )}
          </div>

          <div className='simple-poll__labels'>
            {bars.map(bar => (
              <div style={{ width: barWidth }}
                className='simple-poll__label-col'
                key={bar.id}>

                <div className='simple-poll__label'>
                  {bar.label}
                </div>
              </div>)
            )}
          </div>
        </div>
      </div>
    )
  }

  getVotersCount () {
    return this.props.poll.votersCount
  }

  getChartData () {
    const { poll } = this.props
    if (!poll) return []

    return poll.choices.map(choice => {
      let result = poll.results[choice.id]

      return {
        ...choice,
        label: choice.text,
        weight: result.percent
      }
    })
  }
}

export default SimplePoll
