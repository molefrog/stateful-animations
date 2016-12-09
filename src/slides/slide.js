import React, { Component } from 'react'

class Slide extends Component {
  render () {
    const isActive = this.props.index === this.context.slide

    if (!isActive) return null

    const slideStyle = {
      ...(this.props.image ? { backgroundImage: `url(${this.props.image})` } : {})
    }

    return (
      <div className={`presentation__slide ${this.props.extraClass}`}
        style={slideStyle}>
        {this.props.children}
      </div>)
  }
}

Slide.contextTypes = { slide: React.PropTypes.number }

export const TextSlide = (props) =>
  <Slide {...props} extraClass='text-slide'>
    <div className='text-slide__text'>{props.children}</div>
    {props.subText && <div className='text-slide__sub-text'>{props.subText}</div>}
  </Slide>

export default Slide
