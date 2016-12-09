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
    <div className='text-slide__content' style={{ background: `rgba(0,0,0,${props.overlay})` }}>
      <div className='text-slide__text'>{props.children}</div>
      {props.subText && <div className='text-slide__sub-text'>{props.subText}</div>}
    </div>
  </Slide>

TextSlide.defaultProps = {
  overlay: 0
}

export const IframeSlide = (props) =>
  <Slide {...props} extraClass='iframe-slide'>
    <iframe className='iframe-slide__iframe' src={props.url} />
  </Slide>

export default Slide
