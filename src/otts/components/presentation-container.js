import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import Navigation from './navigation'
import RemoteControl from './remote-control'

// default theme for styled components
import defaultTheme from '../theme'

// Gets the current slide index from
// the url hash e.g. /#10
const extractIndexFromLocation = () => {
  const numbers = window.location.hash.replace(/\D/g, '')
  return parseInt(numbers) || 0
}

class Presentation extends Component {
  static propTypes = {
    showNavigation: PropTypes.bool
  }

  static defaultProps = {
    showNavigation: false
  }

  constructor(props) {
    super(props)

    const currentIndex = Math.min(
      props.slides.length,
      extractIndexFromLocation()
    )

    this.state = {
      slides: props.slides,
      presentationName: props.name,
      showNavigation: props.showNavigation,
      currentSlideIndex: currentIndex
    }
  }

  shiftSlide(shift) {
    const { slides, currentSlideIndex } = this.state

    const id = currentSlideIndex + shift
    const limited = Math.max(0, Math.min(id, slides.length - 1))

    this.setActiveSlide(limited)
  }

  setActiveSlide(id) {
    window.location.hash = id.toString()
    this.setState({ currentSlideIndex: id })
  }

  render() {
    const { slides, currentSlideIndex, showNavigation } = this.state

    const currentSlide = slides[currentSlideIndex]

    return (
      <ThemeProvider theme={defaultTheme}>
        <PresentationLayout>
          <RemoteControl onMove={step => this.shiftSlide(step)} />

          {showNavigation && (
            <Navigation
              {...this.state}
              onSelectSlide={index => this.setActiveSlide(index)}
            />
          )}

          <PresentationContent>
            <div className="presentation__slides">
              {React.cloneElement(currentSlide.element, {
                key: currentSlideIndex
              })}
            </div>
          </PresentationContent>
        </PresentationLayout>
      </ThemeProvider>
    )
  }
}

const PresentationLayout = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  flex-grow: 1;

  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
`

const PresentationContent = styled.div`
  padding: 32px;
  flex-grow: 1;
  overflow-y: auto;
  align-self: stretch;

  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
`

export default Presentation
