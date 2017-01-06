import React, { Component } from 'react'
import { Actuator } from 'redux-actuator'
import { TransitionMotion, spring, presets } from 'react-motion'

import './action-logger.scss'

// Action logger event entry box
const ActionLoggerEvent = ({msg, alpha}) =>
  <div className='action-logger__entry' style={{
    backgroundColor: msg.color,
    transform: `scale(${alpha}, ${alpha})`,
    opacity: alpha,
    maxWidth: alpha * 160
  }}>
    <div className='action-logger__line'>
      <span className='action-logger__field'>evnt: </span>
      {`"${msg.type}"`}
    </div>

    <div className='action-logger__line'>
      <span className='action-logger__field'>time: </span>
      {msg.timestamp}
    </div>

    <div className='action-logger__line'>
      <span className='action-logger__field'>args: </span>
      {JSON.stringify(msg.args)}
    </div>
  </div>

class ActionLogger extends Component {
  constructor (props) {
    super(props)
    this.state = { logs: [] }
  }

  render () {
    const { logs } = this.state

    // styles for TransitionMotion
    const motionStyles = logs.map((msg, i) => ({
      key: msg.timestamp.toString(),
      data: msg,
      style: {
        x: spring(1.0, presets.wobbly)
      }
    }))

    return (
      <div className='action-logger'>
        {!!logs.length && <div className='action-logger__label'>
          Action Logger
        </div>}

        <Actuator
          channel='logger'
          events={{
            log: (msg) => this.setState({ logs: [msg, ...logs] })
          }}>

          <TransitionMotion
            willLeave={() => ({ x: spring(0) })}
            willEnter={() => ({ x: 0 })}
            styles={motionStyles}>

            {interpolatedStyles =>
              <div className='action-logger__events'>
                {interpolatedStyles.map(config => {
                  const msg = config.data
                  const { x } = config.style

                  return <ActionLoggerEvent key={config.key} msg={msg} alpha={x} />
                })}
              </div>
            }
          </TransitionMotion>
        </Actuator>
      </div>
    )
  }
}

export default ActionLogger
