import React, { Component } from 'react'
import styled from 'styled-components'

import { Slide } from 'presa'
import Button from 'blocks/button'

import DialogEnter from './01-dialog-enter'
import DialogExit from './02-dialog-exit'
import StateMonitor from './state-monitor'

class HooksSlide extends Component {
  constructor() {
    super()
    this.state = {
      isActive: true,
      slow: false,
      showMonitor: true,
      animationState: null
    }
  }

  handleAnimationState = stateName => {
    this.setState({
      animationState: stateName
    })
  }

  render() {
    const { isActive, slow, showMonitor } = this.state

    let DialogComponent = null
    let hasMonitor = false

    switch (this.props.example) {
      case 'enter':
        DialogComponent = DialogEnter
        break

      case 'exit':
        hasMonitor = true
        DialogComponent = DialogExit
        break
    }

    return (
      <Slide {...this.props} centered>
        <div>
          <Button
            checked={isActive}
            icon="💡"
            onClick={() => this.setState({ isActive: !isActive })}
          >
            {isActive ? 'видно' : 'не видно'}
          </Button>

          <Button
            icon={!slow ? '🚗' : '🐢'}
            checked={slow}
            onClick={() => this.setState({ slow: !slow })}
          >
            {!slow ? 'быстро' : 'медленно'}
          </Button>

          {hasMonitor && (
            <Button
              icon={'🔍'}
              checked={showMonitor}
              onClick={() => this.setState({ showMonitor: !showMonitor })}
            >
              монитор
            </Button>
          )}
        </div>

        <Showcase>
          <DialogPreview>
            <DialogComponent
              active={isActive}
              slow={slow}
              onAnimationState={this.handleAnimationState}
            />
          </DialogPreview>

          {hasMonitor &&
            this.state.showMonitor && (
              <Monitor>
                <StateMonitor state={this.state.animationState} />
              </Monitor>
            )}
        </Showcase>
      </Slide>
    )
  }
}

const DialogPreview = styled.div`
  transform: scale(1.1, 1.1);
  padding-top: 60px;
  padding-bottom: 60px;
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 290px;
  width: 400px;
`

const Showcase = styled.div`
  display: flex;
  align-items: center;
`

const Monitor = styled.div`
  width: 300px;
  margin-left: 60px;
  padding-left: 60px;
  border-left: 2px solid rgba(0, 0, 0, 0.02);
`

export default HooksSlide
