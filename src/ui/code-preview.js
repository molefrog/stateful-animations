import React, { Component } from 'react'

import './code-preview.scss'

const CodePreview = ({children}) =>
  <div className='code-preview'>
    {children}
  </div>

export default CodePreview

export class Hightlight extends Component {
  componentDidUpdate (prevProps) {
    if (!this.props.pure || this.props.text !== prevProps.text) {
      this.$root.classList.add('code-preview__highlight--flash')

      setTimeout(() =>
        this.$root.classList.remove('code-preview__highlight--flash'), 100)
    }
  }

  render () {
    return (
      <span ref={(e) => { this.$root = e }} className='code-preview__highlight'>
        {this.props.text}
      </span>)
  }
}
