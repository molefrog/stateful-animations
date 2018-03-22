import React from 'react'
import styled from 'styled-components'
import { Slide } from 'presa'

export const GoldenRuleSlide = () => (
  <Slide centered>
    <Label>The rule of thumb</Label>

    <Rule>
      Keep the component&apos;s interfrace<br /> as <b>pure</b> as possible and
      make sure <br /> its <b>side-effects</b> don&apos;t break the contract.
    </Rule>
  </Slide>
)

export const ReverseRuleSlide = () => (
  <Slide centered>
    <Label>Works the other way around</Label>

    <Rule>
      You can use only pure <b>state changes</b>
      <br /> in order to trigger animations
    </Rule>

    <img width="800" src="./images/actuation.png" />

    <Comment>the traditional alternative is to use refs or PubSub</Comment>
  </Slide>
)

const Label = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  color: #a08447;
  font-size: 18px;
  letter-spacing: 0.2px;
  margin-bottom: 20px;
`

const Rule = styled.div`
  font-size: 28px;
  line-height: 1.4;
  margin-bottom: 28px;
`

const Comment = styled.div`
  margin-top: 32px;
  font-size: 22px;
  color: #808080;
`
