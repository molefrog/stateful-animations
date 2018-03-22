import React from 'react'
import { Slide } from 'presa'
import styled from 'styled-components'

class SummarySlide extends React.Component {
  render() {
    return (
      <Slide {...this.props}>
        <Line>
          <Icon width="64" height="64" src="./images/stateful-circle.png" />
          <div>
            <MethodName>Pure animations</MethodName>
            <MethodDesc>
              Only state changes allowed!{' '}
              <code>
                CSS transitions, react-motion,<br />react-transition-group,
                React Move, ...
              </code>
            </MethodDesc>
          </div>
        </Line>

        <Line>
          <Icon width="64" height="64" src="./images/dirty-circle.png" />
          <div>
            <MethodName>Dirty animations</MethodName>
            <MethodDesc>
              They use lifecycle hooks and might manipulate DOM directly<br />
              <code>Web Animations, Velocity, GSAP, D3, anime.js, ...</code>
            </MethodDesc>
          </div>
        </Line>

        <Line>
          <Icon width="64" height="64" src="./images/stateless-circle.png" />
          <div>
            <MethodName>Own render</MethodName>
            <MethodDesc>
              Use this when you need to work with external APIs like WebGL,
              Canvas.
            </MethodDesc>
          </div>
        </Line>

        <Line extra>
          <Icon width="64" height="64" src="./images/stateless-square.png" />
          <div>
            <MethodName>Complex cases</MethodName>
            <MethodDesc>Inter-component communication, FLIP method.</MethodDesc>
          </div>
        </Line>
      </Slide>
    )
  }
}

const MethodDesc = styled.div`
  line-height: 1.35;
`

const MethodName = styled.div`
  font-size: 26px;
  margin-bottom: 10px;
  font-weight: 500;
`

const Icon = styled.img`
  margin-right: 32px;
  flex-shrink: 0;
`

const Line = styled.div`
  display: flex;
  margin-bottom: 38px;

  ${props =>
    props.extra &&
    `
    border-top: 2px solid #ddd;
    padding-top: 25px;
  `};
`

export default SummarySlide
