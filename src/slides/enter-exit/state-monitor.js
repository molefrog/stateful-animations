import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'colors'

const StateEntry = props => (
  <StateEntryContainer active={props.active}>
    <StateDot color={props.color} />
    <StateName>
      <code>{props.name}</code>
    </StateName>
  </StateEntryContainer>
)

class StateMonitor extends Component {
  render() {
    return (
      <div>
        <StateEntry
          active={this.props.state === 'ENTERING'}
          name="ENTERING"
          color={colors.yellow}
        />
        <StateEntry
          active={this.props.state === 'ENTERED'}
          name="ENTERED"
          color={colors.green}
        />
        <StateEntry
          active={this.props.state === 'EXITING'}
          name="EXITING"
          color={colors.pink}
        />
        <StateEntry
          active={this.props.state === 'EXITED'}
          name="EXITED"
          color={colors.red}
        />
      </div>
    )
  }
}

const StateName = styled.div`
  margin-left: 18px;
  font-size: 26px;
`

const StateEntryContainer = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;

  transition: opacity 0.2s ease;
  opacity: ${props => (props.active ? 1.0 : 0.2)};
`

const StateDot = styled.div`
  width: 28px;
  height: 28px;

  background-color: ${props => props.color};
  border-radius: 28px;
`

export default StateMonitor
