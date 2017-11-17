import React from 'react'

// Presentation pieces
import { Presentation, Slide } from 'otts'
import { Title, Caption, FrameBackground } from 'otts/blocks'

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

import DialogSlide from 'slides/enter-exit'

const DirtyAnimations = props => (
  <Presentation name="Грязные анимации в мире состояний">
    {/* Введение */}
    <Slide name="Титульный слайд" background="black" centered>
      <Title color="white">Грязные анимации в мире состояний</Title>
      <Caption color="white">
        Алексей Тактаров<br />HolyJS Moscow 2017
      </Caption>
    </Slide>

    <Slide backgroundImage="/images/vitruvius-pitch.png" />
    <Slide backgroundImage="/images/vitruvius-book.png" />
    <Slide backgroundImage="/images/vitruvius-rules.png" />
    <Slide backgroundImage="/images/rams-radio.png" />

    {/* Про что доклад? */}
    <Slide
      name="Что рассмотрим в докладе"
      backgroundImage="/images/talk-abstract.png"
    />

    <Slide name="О докладчике" backgroundImage="/images/about-author.png" />

    {/* Производительные анимации в браузере */}
    <Slide
      name="Анимации: ожидание"
      backgroundImage="/images/ideal-animation.png"
    />
    <Slide
      name="requestAnimationFrame"
      backgroundImage="/images/time-based.png"
    />

    <RafScheduleSlide name="rAF как выглядит" />
    <TimelineComparisonSlide
      name="Но наивная реализация некорректна"
      comparedMethod="naive"
    />
    <RafTimestampSlide />
    <RafDeltaSlide />
    <TimelineComparisonSlide comparedMethod="raf" />

    <Slide
      name={
        'requestAnimationFrame очень удобен ' +
        'для произвольных сложных анимаций'
      }
      background={<FrameBackground src="http://theseguys.io" />}
      clickThrough
    />

    {/* Как выглядят современные веб-приложения */}
    <Slide
      name="Состояние отображается в DOM"
      backgroundImage="/images/dom-state-1.svg"
    />
    <Slide
      name="Приложение — это цепочка состояний"
      backgroundImage="/images/dom-state-2.svg"
    />
    <Slide
      name="Используя подход состояний, можно путешествовать во времени"
      backgroundImage="/images/retrodux.gif"
    />

    <DialogSlide />

    <Slide
      name="CSS transitions работают в 99% случаев"
      backgroundImage="/images/gifs/bean.gif"
      backgroundFade={0.2}
      centered
    >
      <Title color="white">CSS transitions</Title>
      <Caption color="white">Подойдут для большинства задач</Caption>
    </Slide>

    <TransistorSlide name="CSS transitions в React — проще простого" />

    <Slide
      overlay={0.2}
      name="Time-based анимации"
      image="/images/gifs/charlie.gif"
      subText="$.animate, Velocity, anime.js etc."
    >
      Time-based animations
    </Slide>

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
    <Slide
      overlay={0.2}
      name="React Lifecycle Hooks"
      image="/images/gifs/old-dance-1.gif"
      subText="componentDidMount и др."
    >
      Lifecycle Hooks
    </Slide>
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
    <Slide
      overlay={0.2}
      name="Представляем Redux Actuator!"
      image="/images/gifs/robot-dance.gif"
      subText="github.com/molefrog/redux-actuator"
    >
      Redux Actuator
    </Slide>
    <Slide name="Redux Actuator позволяет слать события компонентам через Redux store">
      <TalkingHeads />
    </Slide>
    <Slide name="Актуатор в действии" image="/images/actuator-code.jpg" />
    <Slide name="Redux Actuator поддерживает механизм каналов">
      <InternationalHeads />
    </Slide>
    <Slide name="Резюме и ресурсы" image="/images/resources.jpg" />
    <Slide
      overlay={0.2}
      name="Конец"
      image="/images/gifs/old-dance-2.gif"
      subText="Анимируйте на здоровье"
    >
      Спасибо
    </Slide>
  </Presentation>
)

export default DirtyAnimations
