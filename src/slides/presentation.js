import React, { Component } from 'react'
import cx from 'classnames'

import './presentation.scss'

class PresentationContainer extends Component {
  constructor () {
    super()
    this.state = {
      activeSlide: 0
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (e) {
    if (e.keyCode === 39) {
      this.shiftSlide(1)
    }

    if (e.keyCode === 37) {
      this.shiftSlide(-1)
    }
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  getSlideNames () {
    return React.Children.map(this.props.children, (c, i) =>
      c.props.name || `Слайд #${i + 1}`)
  }

  getChildContext () {
    return { slide: this.state.activeSlide }
  }

  shiftSlide (shift) {
    const id = this.state.activeSlide + shift
    const limited = Math.max(0, Math.min(id, this.getSlideNames().length - 1))
    this.setActiveSlide(limited)
  }

  setActiveSlide (id) {
    this.setState({ activeSlide: id })
  }

  render () {
    const slides = this.getSlideNames()
    const currentSlide = this.state.activeSlide

    return (
      <div className='presentation'>

        <div className='presentation__tool-bar'>
          <div className='presentation__logo'>
            {this.props.name}
          </div>

          <div className='presentation__plan'>
            {slides.map((slide, idx) =>
              <div
                key={idx}
                onClick={() => this.setActiveSlide(idx)}
                className={
                  cx('presentation__plan-item', {
                    'presentation__plan-item--current': idx === currentSlide,
                    'presentation__plan-item--future': idx > currentSlide
                  })
                }>
                {slide}
              </div>
            )}
          </div>
        </div>

        <div className='presentation__content'>

          <div className='presentation__slides'>
            {React.Children.map(this.props.children, (child, id) =>
              React.cloneElement(child, { index: id })
            )}
          </div>
        </div>
      </div>
    )
  }
}

PresentationContainer.childContextTypes = {
  slide: React.PropTypes.number
}

import Slide, { TextSlide, IframeSlide } from './slide'
import TransistorSlide from './transistor'
import { CloudPollSlide, PollsSlide } from './poll-slides'

const Presentation = (props) =>
  <PresentationContainer name='Грязные анимации в мире состояний'>
    <TextSlide name='Введение' image='http://i.giphy.com/d7PElE9GaaodG.gif'>
      Грязные анимации в мире состояний
    </TextSlide>

    <Slide name='О докладчике' image='/images/alyosha.png' />
    <TextSlide
      overlay={0.2}
      name='В Ростове есть клевые ребята Code Hipsters' image='/images/es6.gif'
      subText='сообщество программистов и цифровых дизайнеров из Ростова'>
      Code Hipsters
    </TextSlide>

    <TextSlide overlay={0.2}
      name='React — Automatic View Library' image='/images/react.gif'
      subText='Automatic View Library' >
      React
    </TextSlide>

    <Slide name='Состояние отображается в DOM' image='/images/dom-state-1.svg' />
    <Slide name='Приложение — это цепочка состояний' image='/images/dom-state-2.svg' />

    <Slide name='Используя подход состояний, можно путешествовать во времени' image='/images/retrodux.gif' />

    <TextSlide overlay={0.2}
      name='CSS transitions работают в 99% случаев' image='/images/bean.gif'
      subText='' >
      CSS transitions
    </TextSlide>

    <TransistorSlide name='CSS transitions в React — проще простого' />

    <TextSlide overlay={0.2} name='Time-based анимации' image='/images/charlie.gif' subText='$.animate, Velocity, anime.js etc.'>
      Time-based animations
    </TextSlide>

    <Slide name='Анимации: ожидание' image='/images/time-based-1.svg' />
    <Slide name='Анимации: реальность' image='/images/time-based-2.svg' />

    <IframeSlide url='http://theseguys.io' name='requestAnimationFrame очень удобен для произвольных сложных анимаций' />

    <TransistorSlide name='React Motion использует requestAnimationFrame. Позволяет задавать пружинные анимации декларативно.' motionEnabled />

    <CloudPollSlide name='Некоторые анимации сложно описать декларативно' />
    <PollsSlide name='Компоненты, грязные внутри, легко тестировать' />
  </PresentationContainer>

export default Presentation
