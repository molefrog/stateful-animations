import React from 'react'
import styled from 'styled-components'
import { Slide } from 'presa'

export const AnimationsExpectationsSlide = () => (
  <Slide centered>
    <Column>
      <Row>
        <Header>Ideal Animation</Header>
        <Description>
          runs smoothly within<br />equal periods of time
        </Description>
      </Row>

      <Row>
        <img width="300" src="./images/timeline-ideal.jpg" />
      </Row>
    </Column>
  </Slide>
)

export const AnimationsRealitySlide = () => (
  <Slide centered>
    <Column>
      <Row>
        <Header>setTimeout</Header>
        <Description>
          not guaranteed to be executed in given time interval
        </Description>
      </Row>

      <Row>
        <img width="300" src="./images/timeline-set-timeout.jpg" />
      </Row>
    </Column>

    <Column>
      <Row>
        <Header>requestAnimationFrame</Header>
        <Description>
          schedule a call before the next browser repaint
        </Description>
      </Row>

      <Row>
        <img width="300" src="./images/timeline-raf.jpg" />
      </Row>
    </Column>
  </Slide>
)

const Column = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 20px;
`

const Row = styled.div`
  width: 50%;
  padding: 20px 35px;
  text-align: left;

  &:first-child {
    text-align: right;
  }
`

const Header = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`

const Description = styled.div`
  font-size: 24px;
  color: #656565;
`
