import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Highlight from 'react-highlight'
import styled from 'styled-components'

const StyledHighlight = styled(Highlight)`
  font-family: 'SF Mono', 'Lucida Console', Monaco, monospace;
  font-size: ${props => props.fontSize}px;
  line-height: 1.44;
`

class Code extends Component {
  static propTypes = {
    language: PropTypes.string,
    fontSize: PropTypes.number,
    children: PropTypes.string
  }

  static defaultProps = {
    fontSize: 22
  }

  render() {
    const { className, fontSize, language } = this.props
    const code = this.props.children

    return (
      <StyledHighlight fontSize={fontSize} className={cx(className, language)}>
        {code}
      </StyledHighlight>
    )
  }
}

export default Code
