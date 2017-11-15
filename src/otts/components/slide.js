import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class Slide extends Component {
  render() {
    const isActive = this.props.index === this.context.slide
    if (!isActive) return null

    const slideStyle = {
      ...(this.props.image
        ? { backgroundImage: `url(${this.props.image})` }
        : {})
    }

    return (
      <div
        className={cx(
          'presentation__slide',
          { 'presentation__slide--centered': this.props.centered },
          this.props.extraClass,
          this.props.className
        )}
        style={slideStyle}
      >
        {this.props.children}
      </div>
    )
  }
}

Slide.contextTypes = { slide: PropTypes.number }

export default Slide
