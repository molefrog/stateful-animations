import React, { Component } from 'react'
import styled from 'styled-components'

import { Slide } from 'otts'
import { Button } from 'otts/blocks'

import DialogEnter from './01-dialog-enter'
import DialogExit from './02-dialog-exit'

const DialogComponent = DialogExit

class HooksSlide extends Component {
  constructor() {
    super()
    this.state = { isActive: true, slow: false }
  }

  render() {
    const { isActive, slow } = this.state

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
        </div>

        <DialogPreview>
          <DialogComponent active={isActive} slow={slow} />
        </DialogPreview>
      </Slide>
    )
  }
}

const DialogPreview = styled.div`
  transform: scale(1.1, 1.1);
  padding-top: 60px;
  padding-bottom: 60px;
  pointer-events: none;

  height: 290px;
`

export default HooksSlide
