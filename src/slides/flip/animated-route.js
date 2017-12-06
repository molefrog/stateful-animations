import React, { Component } from 'react'
import styled from 'styled-components'

class Route extends Component {
  getLayerOpacity() {
    const { debug, animationState } = this.props

    // for debug purposes
    const semiTransparent = 0.3

    switch (animationState) {
      case 'entering':
        return debug ? semiTransparent : 0.0
      case 'entered':
        return 1.0

      case 'exiting':
        return 1.0

      case 'exited':
        return 0.0
    }
  }
  render() {
    const { debug, isList, animationState } = this.props

    const isAbsolute =
      animationState === 'exiting' || animationState === 'exited'

    // for debug mode
    const layerOffset = -30 + -75 * (isList ? -1 : 0)
    const debugBackground = isList
      ? 'rgba(233, 30, 99, 0.2)'
      : 'rgba(33, 150, 243, 0.2)'

    return (
      <Container
        debugBackground={debugBackground}
        debug={debug}
        zOffset={layerOffset}
        isAbsolute={isAbsolute}
      >
        <DebugInfo visible={debug}>
          position: {isAbsolute ? 'absolute' : 'static'}
        </DebugInfo>

        <Content
          debug={debug}
          debugBackground={debugBackground}
          opacity={this.getLayerOpacity()}
        >
          {this.props.children}
        </Content>
      </Container>
    )
  }
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  transition: ${props => (props.debug ? 'opacity 0.3s ease' : 'none')};
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
  padding: 25px 30px;
  opacity: ${props => props.opacity};
`

const DebugInfo = styled.div`
  position: absolute;
  left: 60%;
  top: 100%;
  width: 300px;
  color: #333;

  padding: 14px 0;
  font-size: 24px;
  font-weight: 500;
  transition: opacity 0.3s ease;

  opacity: ${props => (props.visible ? 1 : 0)};
  font-family: ${props => props.theme.slide.monoFont};
`

const Container = styled.div`
  width: 100%;
  height: 100%;

  * {
    box-sizing: border-box;
  }

  transition: border-color 0.6s ease, transform 0.6s ease;
  will-change: transform;
  border: 2.5px solid transparent;
  border-radius: 6px;
  border-color: #efefef;

  // 3d perspective
  ${props =>
    props.debug &&
    `
    transform: rotateX(-60deg) rotateZ(-40deg) translateZ(${props.zOffset}px);
    border-color: ${props.debugBackground};
  `};

  ${props =>
    props.isAbsolute &&
    `
    position: absolute;
    top: 0;
    left: 0;
  `};
`

export default Route
