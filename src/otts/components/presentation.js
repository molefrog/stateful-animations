import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const KEY_CODE_LEFT = 37
const KEY_CODE_RIGHT = 39

class Presentation extends Component {
  static propTypes = {
    showNavigation: PropTypes.bool
  }

  static childContextTypes = {
    slide: PropTypes.number
  }

  static defaultProps = {
    showNavigation: false
  }

  constructor() {
    super()
    this.state = {
      activeSlide: 0
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.keyCode === KEY_CODE_RIGHT) {
      this.shiftSlide(1)
    }

    if (e.keyCode === KEY_CODE_LEFT) {
      this.shiftSlide(-1)
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  getSlideNames() {
    return React.Children.map(
      this.props.children,
      (c, i) => c.props.name || `Слайд #${i + 1}`
    )
  }

  getChildContext() {
    return { slide: this.state.activeSlide }
  }

  shiftSlide(shift) {
    const id = this.state.activeSlide + shift
    const limited = Math.max(0, Math.min(id, this.getSlideNames().length - 1))
    this.setActiveSlide(limited)
  }

  setActiveSlide(id) {
    this.setState({ activeSlide: id })
  }

  render() {
    const slides = this.getSlideNames()
    const currentSlide = this.state.activeSlide

    const { showNavigation } = this.props

    return (
      <div className="presentation">
        {showNavigation && (
          <div className="presentation__tool-bar">
            <div className="presentation__logo">{this.props.name}</div>

            <div className="presentation__plan">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => this.setActiveSlide(idx)}
                  className={cx('presentation__plan-item', {
                    'presentation__plan-item--current': idx === currentSlide,
                    'presentation__plan-item--future': idx > currentSlide
                  })}
                >
                  {slide}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="presentation__content">
          <div className="presentation__slides">
            {React.Children.map(this.props.children, (child, id) =>
              React.cloneElement(child, { index: id })
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Presentation
