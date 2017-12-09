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
            <MethodName>Чистые анимации</MethodName>
            <MethodDesc>
              Только состояния!{' '}
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
            <MethodName>Грязные анимации</MethodName>
            <MethodDesc>
              Работают через хуки и могут использовать DOM напрямую.<br />
              <code>Web Animations, Velocity, GSAP, D3, anime.js, ...</code>
            </MethodDesc>
          </div>
        </Line>

        <Line>
          <Icon width="64" height="64" src="./images/stateless-circle.png" />
          <div>
            <MethodName>Перехват рендера</MethodName>
            <MethodDesc>
              Для работы с внешними библиотеками, WebGL, Canvas.
            </MethodDesc>
          </div>
        </Line>

        <Line extra>
          <Icon width="64" height="64" src="./images/stateless-square.png" />
          <div>
            <MethodName>Сложные случаи</MethodName>
            <MethodDesc>Коммуникация между компонентами, FLIP.</MethodDesc>
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
