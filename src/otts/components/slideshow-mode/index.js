import React from 'react'
import styled from 'styled-components'

import Controls from '../controls'

class SlideshowMode extends React.Component {
  render() {
    const { slide } = this.props

    return (
      <Slideshow>
        <CurrentSlide>
          {React.cloneElement(slide.element, {
            key: slide.index
          })}
        </CurrentSlide>

        <Footer>
          <Controls {...this.props} />
        </Footer>
      </Slideshow>
    )
  }
}

const Slideshow = styled.div`
  padding: 28px;
`

const CurrentSlide = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
`

export default SlideshowMode
