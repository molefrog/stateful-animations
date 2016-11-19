import React, { Component } from 'react'

const safeFraction = (a, b) => !b ? 0.0 : (a / b)
const dummyI18n = (text, ...rest) => text

class SimplePoll extends Component {
  render () {
    // const i18n = this.props.i18n || dummyI18n
    // const subHeader = i18n('%voters on ', {
    //   voters: i18n('total %0 voters', this.getVotersCount())
    // })

    const { poll } = this.props

    // const bars = this.getChartData()
    // const maxWeight = Math.min(0.4, Math.max(...bars.map(b => b.weight)))

    // const barWidth = `${100.0 / bars.length}%`

    const results = poll.choices.map(choice => ({
      ...choice,
      ...poll.results[choice.id]
    }))

    return (
      <div className='classic-poll'>
        <div className='classic-poll__question'>
          {poll.title}
        </div>

        <div className='classic-poll__results'>
          {results.map(result => (
            <div className='classic-poll__result'>
              <div className='classic-poll__result-header'>
                {result.text}
              </div>

              <div className='classic-poll__line'>
                <div className='classic-poll__progress-wrap'>
                  <div className='classic-poll__progress'
                    style={{
                      backgroundColor: result.color,
                      width: `${result.percent * 100}%` }} />
                </div>

                <div className='classic-poll__percent'>
                  {`${(result.percent * 100).toFixed(0)}%`}
                </div>
              </div>
            </div>

          ))}
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

    const totalVoters = this.getVotersCount()

    return poll.choices.map(choice => {
      let count = poll.results[choice.id]

      return {
        ...choice,
        count,
        label: choice.text,
        weight: safeFraction(count, totalVoters)
      }
    })
  }
}

export default SimplePoll
