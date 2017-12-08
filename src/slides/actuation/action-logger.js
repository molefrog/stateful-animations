import React, { Component } from 'react'
import styled from 'styled-components'
import { Actuator } from 'redux-actuator'
import { TransitionMotion, spring, presets } from 'react-motion'

// Action logger event entry box
const ActionLoggerEvent = ({ msg, alpha }) => (
  <Entry
    style={{
      backgroundColor: msg.color,
      transform: `scale(${alpha}, ${alpha})`,
      opacity: alpha,
      maxWidth: alpha * 180
    }}
  >
    <Line>
      <Field>{msg.key}</Field>
    </Line>

    <Line>
      <Field>ch: </Field>
      {msg.channel}
    </Line>

    <Line>
      <Field>arg: </Field>
      {JSON.stringify(msg.args)}
    </Line>
  </Entry>
)

class Logger extends Component {
  constructor(props) {
    super(props)
    this.state = { logs: [] }
  }

  render() {
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
      <ActionLogger>
        {!!logs.length && <LoggerLabel>Action Logger</LoggerLabel>}

        <Actuator
          on={{
            log: msg => this.setState({ logs: [msg, ...logs] })
          }}
        >
          <TransitionMotion
            willLeave={() => ({ x: spring(0) })}
            willEnter={() => ({ x: 0 })}
            styles={motionStyles}
          >
            {interpolatedStyles => (
              <Events>
                {interpolatedStyles.map(config => {
                  const msg = config.data
                  const { x } = config.style

                  return (
                    <ActionLoggerEvent key={config.key} msg={msg} alpha={x} />
                  )
                })}
              </Events>
            )}
          </TransitionMotion>
        </Actuator>
      </ActionLogger>
    )
  }
}

const ActionLogger = styled.div`
  align-self: stretch;
`

const Events = styled.div`
  white-space: nowrap;
`

const LoggerLabel = styled.div`
  font-size: 18px;
  padding-left: 16px;
  margin-bottom: 4px;
  color: #757575;
  font-weight: 500;
`

const Field = styled.span`
  font-weight: bold;
`

const Line = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Entry = styled.div`
  display: inline-block;
  background-color: #ffffe6;
  border: 2px solid #ddd;
  border-radius: 6px;
  padding: 8px 14px;
  margin: 4px;
  font-size: 14px;
  font-family: 'SF Mono', 'Lucida Console', Monaco, monospace;
`

export default Logger
