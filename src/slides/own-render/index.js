import React from 'react'
import { Slide } from 'presa'
import styled from 'styled-components'

import Rotator from './rotator'
import DynamicCode from 'blocks/dynamic-code'
import Button from 'blocks/button'
import { Code } from 'presa/blocks'

const demoBg = '#dfe5f3'

const RotatorCode = ({ mouseX, mouseY, rotX, rotY }) => (
  <DynamicCode>
    {'<Rotator rotX={'}
    <DynamicCode.H pure text={mouseX.toFixed(3)} />
    {'} rotY={'}
    <DynamicCode.H pure text={mouseY.toFixed(3)} />
    {'} />\n\n'}
  </DynamicCode>
)

const InnerCode = ({ mouseX, mouseY, rotX, rotY }) => (
  <DynamicCode>
    {"// Rotator's internal state:\nthis.x = "}
    <DynamicCode.H pure text={rotX.toFixed(3)} />
    {'\nthis.y = '}
    <DynamicCode.H pure text={rotY.toFixed(3)} />
    {'\n'}
  </DynamicCode>
)

class WebglSlide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isControlled: false,
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
      <Slide {...this.props} layout={false}>
        <Layout>
          <Side>
            <Buttons>
              <Button
                icon={'🤖'}
                checked={this.state.isControlled}
                onClick={() =>
                  this.setState({ isControlled: !this.state.isControlled })
                }
              >
                {this.state.isControlled
                  ? 'P-controller enabled'
                  : 'P-controller disabled'}
              </Button>
            </Buttons>

            <RotatorCode {...this.state} />
            <InnerCode {...this.state} />

            <Extra>
              {!this.state.isControlled && (
                <div>
                  <div>Update internal state immediately on props change:</div>
                  <Code>{`this.x = props.rotX`}</Code>
                </div>
              )}

              {this.state.isControlled && (
                <div>
                  <div> Using P-controller filter to animate smoothly:</div>
                  <Code>{`this.x += P * (props.rotX - this.x)`}</Code>
                </div>
              )}
            </Extra>
          </Side>

          <Demo onMouseMove={this.handleMouseMove}>
            <Rotator
              controlled={this.state.isControlled}
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

const Extra = styled.div`
  border-top: 2px solid #eee;
  margin-top: 34px;
  padding-top: 34px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 28px;
`

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const Demo = styled.div`
  flex: 3 0;
  background: ${demoBg};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Side = styled.div`
  flex: 2 0;
  padding: 2em 2.5em;
`

export default WebglSlide
