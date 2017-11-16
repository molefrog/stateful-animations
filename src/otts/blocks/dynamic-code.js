import React, { Component } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

// TODO:
// Refactor this one, rewrite entirely with styled comp.
// Think about the way to use tag literal.
// Something like:
//  <div>
//    DynamicCode`
//      <span>
//        ${this.props.text + 'px'}
//      </span>
//    `
//  </div>

const Code = styled.span`
  font-family: ${props => props.theme.monoFont};
  white-space: pre;
  font-size: 20px;

  .code-preview__highlight {
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 1.6s ease;
    border-radius: 2px;
  }

  .code-preview__highlight--flash {
    transition-duration: 0.15s;
    background-color: ${rgba('#fc7979', 0.5)};
  }
`

const DynamicCode = ({ children }) => <Code>{children}</Code>

export class HightlightSegment extends Component {
  componentDidUpdate(prevProps) {
    if (this.$root) {
      return
    }

    if (!this.props.pure || this.props.text !== prevProps.text) {
      this.$root.classList.add('code-preview__highlight--flash')

      // No good :)
      setTimeout(
        () =>
          this.$root &&
          this.$root.classList.remove('code-preview__highlight--flash'),
        100
      )
    }
  }

  render() {
    return (
      <span
        ref={e => {
          this.$root = e
        }}
        className="code-preview__highlight"
      >
        {this.props.text}
      </span>
    )
  }
}

DynamicCode.H = HightlightSegment
export default DynamicCode
