import React from 'react'
import { Slide } from 'presa'
import styled from 'styled-components'

import Rotator from './rotator'
import DynamicCode from 'blocks/dynamic-code'

const demoBg = '#dfe5f3'

const Monitor = ({ mouseX, mouseY, rotX, rotY }) => (
  <DynamicCode>
    {'<Rotator rotX={'}
    <DynamicCode.H pure text={mouseX.toFixed(3)} />
    {'} rotY={'}
    <DynamicCode.H pure text={mouseY.toFixed(3)} />
    {'} />\n\n'}

    {'rot = [ '}
    <DynamicCode.H pure text={rotX.toFixed(3)} />
    {', '}
    <DynamicCode.H pure text={rotY.toFixed(3)} />
    {' ]\n'}
  </DynamicCode>
)

class WebglSlide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseX: 0.0,
      mouseY: 0.0,
      rotX: 0.0,
      rotY: 0.0
    }
  }

  handleMouseMove = event => {
    const rect = event.currentTarget.getBoundingClientRect()

    this.setState({
      mouseX: (event.clientX - rect.left) / rect.width,
      mouseY: (event.clientY - rect.top) / rect.height
    })
  }

  handleTick = (x, y) => {
    this.setState({
      rotX: x,
      rotY: y
    })
  }

  render() {
    return (
      <Slide {...this.props}>
        <Layout>
          <Side>
            <Monitor {...this.state} />
          </Side>

          <Demo onMouseMove={this.handleMouseMove}>
            <Rotator
              rotX={this.state.mouseX}
              rotY={this.state.mouseY}
              onTick={this.handleTick}
              background={demoBg}
            />
          </Demo>
        </Layout>
      </Slide>
    )
  }
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  * {
    box-sizing: border-box;
  }
`

const Demo = styled.div`
  flex: 3 0;
  background: ${demoBg};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Side = styled.div`
  flex: 2 1;
  padding: 2em 2.5em;
`

export default WebglSlide
