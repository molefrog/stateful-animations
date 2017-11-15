import React from 'react'

// Presentation pieces
import { Presentation, Slide, TextSlide, IframeSlide } from 'otts'

// Interactive slides
import TransistorSlide from 'slides/transistor'
import { CloudPollSlide, PollsSlide, BubblePollSlide } from 'slides/poll-slides'
import HooksSlide from 'slides/hooks-slides'
import MotionGhostSlide from 'slides/motion-ghost-slide'
import { TalkingHeads, InternationalHeads } from 'slides/talking-heads-slide'

import {
  TimelineComparisonSlide,
  RafScheduleSlide,
  RafTimestampSlide,
  RafDeltaSlide
} from 'slides/raf-vs-timeout'

const DirtyAnimations = props => (
  <Presentation name="Грязные анимации в мире состояний">
    <TextSlide name="Введение" image="/images/gifs/wave.gif">
      Грязные анимации в мире состояний
    </TextSlide>

    <Slide name="О докладчике" image="/images/about-author.png" />

    <TextSlide
      name="React = Automatic View Library"
      image="/images/business.png"
    />
    <TextSlide name="React = Automatic View Library" image="/images/avl.svg" />
    <Slide
      name="Состояние отображается в DOM"
      image="/images/dom-state-1.svg"
    />
    <Slide
      name="Приложение — это цепочка состояний"
      image="/images/dom-state-2.svg"
    />
    <Slide
      name="Используя подход состояний, можно путешествовать во времени"
      image="/images/retrodux.gif"
    />
    <TextSlide
      overlay={0.2}
      name="CSS transitions работают в 99% случаев"
      image="/images/gifs/bean.gif"
      subText="Подойдут для большинства задач"
    >
      CSS transitions
    </TextSlide>
    <TransistorSlide name="CSS transitions в React — проще простого" />
    <TextSlide
      overlay={0.2}
      name="Time-based анимации"
      image="/images/gifs/charlie.gif"
      subText="$.animate, Velocity, anime.js etc."
    >
      Time-based animations
    </TextSlide>
    <Slide name="Анимации: ожидание" image="/images/ideal-animation.png" />
    <Slide name="Анимации: реальность" image="/images/time-based.png" />
    <RafScheduleSlide />
    <TimelineComparisonSlide comparedMethod="naive" />
    <RafTimestampSlide />
    <RafDeltaSlide />
    <TimelineComparisonSlide comparedMethod="raf" />
    <IframeSlide
      url="http://theseguys.io"
      name="requestAnimationFrame очень удобен для произвольных сложных анимаций"
    />
    <TransistorSlide
      name={
        'React Motion использует requestAnimationFrame. ' +
        'Позволяет задавать пружинные анимации декларативно.'
      }
      motionEnabled
    />
    <MotionGhostSlide
      name="Как React Motion работает с состояниями."
      centered
    />
    <TextSlide
      overlay={0.2}
      name="React Lifecycle Hooks"
      image="/images/gifs/old-dance-1.gif"
      subText="componentDidMount и др."
    >
      Lifecycle Hooks
    </TextSlide>
    <Slide
      name="Паттерн #1. Анимации на «входе»"
      image="/images/hooks-code.jpg"
    />
    <HooksSlide name="Проблемы с выходом" />
    <Slide
      name="Паттерн #2. Change Detection"
      image="/images/hooks-code-2.jpg"
    />
    <CloudPollSlide name="Паттерн Change Detection на примере" />
    <Slide
      name="Паттерн #3. Перехват ответственности"
      image="/images/hooks-code-3.jpg"
    />
    <BubblePollSlide name="Перехват ответственности на примере" />
    <PollsSlide
      name={'Правильно построенные «грязные компоненты» удобно тестировать'}
    />
    <Slide
      name="Золотое правило для грязных анимаций"
      image="/images/golden-rule.png"
    />
    <Slide
      name="Правило работает и в другую сторону"
      image="/images/state-changes.png"
    />
    <TextSlide
      overlay={0.2}
      name="Представляем Redux Actuator!"
      image="/images/gifs/robot-dance.gif"
      subText="github.com/molefrog/redux-actuator"
    >
      Redux Actuator
    </TextSlide>
    <Slide name="Redux Actuator позволяет слать события компонентам через Redux store">
      <TalkingHeads />
    </Slide>
    <Slide name="Актуатор в действии" image="/images/actuator-code.jpg" />
    <Slide name="Redux Actuator поддерживает механизм каналов">
      <InternationalHeads />
    </Slide>
    <Slide name="Резюме и ресурсы" image="/images/resources.jpg" />
    <TextSlide
      overlay={0.2}
      name="Конец"
      image="/images/gifs/old-dance-2.gif"
      subText="Анимируйте на здоровье"
    >
      Спасибо
    </TextSlide>
  </Presentation>
)

export default DirtyAnimations
