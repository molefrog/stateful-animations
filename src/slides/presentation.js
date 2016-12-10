import React from 'react'

import PresentationContainer from './presentation-container'
import Slide, { TextSlide, IframeSlide } from './slide'
import TransistorSlide from './transistor'
import { CloudPollSlide, PollsSlide } from './poll-slides'

const Presentation = (props) =>
  <PresentationContainer name='Грязные анимации в мире состояний'>
    <TextSlide name='Введение' image='/images/storm.gif'>
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

    <TextSlide overlay={0.2}
      name='Time-based анимации'
      image='/images/charlie.gif'
      subText='$.animate, Velocity, anime.js etc.'>
      Time-based animations
    </TextSlide>

    <Slide name='Анимации: ожидание' image='/images/time-based-1.svg' />
    <Slide name='Анимации: реальность' image='/images/time-based-2.svg' />

    <IframeSlide url='http://theseguys.io'
      name='requestAnimationFrame очень удобен для произвольных сложных анимаций' />

    <TransistorSlide
      name='React Motion использует requestAnimationFrame.
      Позволяет задавать пружинные анимации декларативно.' motionEnabled />

    <CloudPollSlide name='Некоторые анимации сложно описать декларативно' />
  </PresentationContainer>

export default Presentation
