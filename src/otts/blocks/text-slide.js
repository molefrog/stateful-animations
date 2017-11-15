import React from 'react'
import Slide from '../components/slide'

export const TextSlide = props => (
  <Slide {...props} extraClass="text-slide">
    <div
      className="text-slide__content"
      style={{ background: `rgba(0,0,0,${props.overlay})` }}
    >
      <div className="text-slide__text">{props.children}</div>
      {props.subText && (
        <div className="text-slide__sub-text">{props.subText}</div>
      )}
    </div>
  </Slide>
)

TextSlide.defaultProps = {
  overlay: 0
}

export const IframeSlide = props => (
  <Slide {...props} extraClass="iframe-slide">
    <iframe className="iframe-slide__iframe" src={props.url} />
  </Slide>
)
