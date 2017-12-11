import React from 'react'
import styled from 'styled-components'
import { Slide } from 'presa'

import Simulator from './simulator'

// transforms event's mouse coordinates to relative ones
// e.g. [0.3, 0.9]
const toRelativeMouseCoords = event => {
  const rect = event.currentTarget.getBoundingClientRect()

  return {
    x: (event.clientX - rect.left) / rect.width,
    y: (event.clientY - rect.top) / rect.height
  }
}

class GameSlide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      started: false
    }
  }

  handleKeyDown = event => {
    // A
    if (event.keyCode === 65) {
      this._engine.alphaLaw = !this._engine.alphaLaw
    }

    // S
    if (event.keyCode === 83) {
      this._engine.betaLaw = !this._engine.betaLaw
    }

    // D
    if (event.keyCode === 68) {
      this._engine.gammaLaw = !this._engine.gammaLaw
    }

    // F
    if (event.keyCode === 70) {
      this._engine.attractLaw = !this._engine.attractLaw
    }
  }

  componentDidMount() {
    this._engine = new Simulator(this._root)
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    this._engine.stop()
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleMouseMove = event => {
    const point = toRelativeMouseCoords(event)

    this._engine.targetX = point.x
    this._engine.targetY = point.y
  }

  startTheParty = event => {
    this.setState({ started: true })

    const point = toRelativeMouseCoords(event)
    this._engine.start(point.x, point.y)
  }

  render() {
    const { started } = this.state

    return (
      <Slide {...this.props} layout={false}>
        <Container>
          <Game innerRef={e => (this._root = e)} />
          <Controls
            onClick={this.startTheParty}
            onMouseMove={this.handleMouseMove}
          >
            <ClickAnywhere invisible={started}>
              Click anywhere on a screen
            </ClickAnywhere>
          </Controls>
        </Container>
      </Slide>
    )
  }
}

const ClickAnywhere = styled.div`
  font-weight: 600;
  color: #777;
  pointer-events: none;
  user-select: none;
  transition: all 1s ease;

  ${props =>
    props.invisible &&
    `
    opacity: 0;
    transform: scale(1.3, 1.3) translateY(-100px);
  `};
`

const Controls = styled.div`
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`

const Game = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  will-change: transform;

  .boids__fps {
    position: absolute;
    font-family: monospace;
    font-size: 20px;
    bottom: 20px;
    left: 30px;
  }

  .boids__cross {
    width: 24px;
    height: 24px;
    line-height: 24px;

    top: -12px;
    left: -12px;

    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    border: 1px solid black;

    font-size: 20px;
    text-align: center;

    will-change: transform;
    transform: translate3d(-30px, -30px, 0);

    &.is-killed {
      opacity: 0.2;
    }
  }
`

export default GameSlide
