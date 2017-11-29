import React, { Component } from 'react'

import { Slide } from 'presa'
import { Code, FigureCaption } from 'presa/blocks'

export class ReactMotionCodeSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`
<Motion>
  {interpolated =>
    <div style={{ opacity: interpolated.x }} />}
</Motion>`}</Code>
        <FigureCaption>
          В React-Motion используется паттерн<br />
          <code>function-as-a-prop</code>.
        </FigureCaption>
      </Slide>
    )
  }
}

export class CssTransitionCodeSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`
// CSS property
// transition: transform 1s ease;

// Conditional state change
<div className={isVisible ? 'is-visible' : 'is-hidden'} />

// Direct style manipulation
<div style={{ transform: \`translateX(\${scale})\` }} />`}</Code>
        <FigureCaption>
          CSS анимации в React работают из коробки.<br />
          Свойство <code>transition</code> + смена состояния → анимация.
        </FigureCaption>
      </Slide>
    )
  }
}
