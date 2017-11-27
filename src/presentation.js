import React from 'react'

// Presentation pieces
import { Presentation, Slide } from 'otts'
import {
  Title,
  Caption,
  FrameBackground,
  Code,
  FigureCaption
} from 'otts/blocks'

// Interactive slides
import TransistorSlide from 'slides/transistor'
import { CloudPollSlide, PollsSlide, BubblePollSlide } from 'slides/poll-slides'
import MotionGhostSlide from 'slides/motion-ghost-slide'
import { TalkingHeads, InternationalHeads } from 'slides/talking-heads-slide'

import {
  TimelineComparisonSlide,
  RafScheduleSlide,
  RafTimestampSlide,
  RafDeltaSlide
} from 'slides/raf-vs-timeout'

import {
  CssTransitionCodeSlide,
  ReactMotionCodeSlide
} from 'slides/transitions'

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

    <Slide background="/images/vitruvius-pitch.png" />
    <Slide background="/images/vitruvius-book.png" />
    <Slide background="/images/vitruvius-rules.png" />
    <Slide background="/images/rams-radio.png" />
    <Slide background="/images/gifs/apps.gif" fade={0.2} centered />

    {/* Про что доклад? */}
    <Slide
      name="Что рассмотрим в докладе"
      background="/images/talk-abstract.png"
    />

    <Slide name="О докладчике" background="/images/about-author.png" />

    {/* Производительные анимации в браузере */}
    <Slide name="Анимации: ожидание" background="/images/ideal-animation.png" />
    <Slide name="requestAnimationFrame" background="/images/time-based.png" />

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
      background="/images/dom-state-1.svg"
    />
    <Slide
      name="Приложение — это цепочка состояний"
      background="/images/dom-state-2.svg"
    />
    <Slide
      name="Используя подход состояний, можно путешествовать во времени"
      background="/images/retrodux.gif"
    />

    {/* Анимации переходов состояний */}
    <Slide
      name="CSS transitions работают в 99% случаев"
      background="/images/gifs/bean.gif"
      fade={0.2}
      centered
    >
      <Title color="white">CSS transitions</Title>
      <Caption color="white">Подойдут для большинства задач</Caption>
    </Slide>

    <CssTransitionCodeSlide name="Как работать с CSS transitions в React" />

    <TransistorSlide name="CSS transitions в React — демо" />

    <TransistorSlide
      name={
        'React Motion использует requestAnimationFrame. ' +
        'Позволяет задавать пружинные анимации декларативно.'
      }
      motionEnabled
    />
    <ReactMotionCodeSlide />

    <MotionGhostSlide
      name="Как React Motion работает с состояниями."
      centered
    />

    <Slide background="/images/react-motions-cons.png" />

    {/* Делаем кастомную анимацию на примере */}
    <Slide
      fade={0.4}
      centered
      name="React Lifecycle Hooks"
      background="/images/gifs/factory.gif"
    >
      <Title color="white">Как делать «грязные» анимации</Title>
      <Caption color="white">На примере диалогового окна</Caption>
    </Slide>

    <Slide centered>
      <Code>{`
class Dialog extends Component {
  componentDidMount() {
    const node = findDOMNode(this)

    // Or $.animate, anime.js, GSAP, D3 ...
    Velocity(node, { scale: 1.5 },
      { duration: 1000 })
  }

  render() { ... }
}`}</Code>
      <FigureCaption>
        Паттерн <b>«анимация на входе»</b> работает через хук{' '}
        <code>componentDidMount</code> и прямой доступ к элементу.
      </FigureCaption>
    </Slide>

    <Slide centered>
      <Code>{`class Dialog extends Component {
  componentDidMount() {
    const node = findDOMNode(this)

    // animate returns a cancellable
    // Promise-like object
    this._anim = animate(node, { ... })
  }

  componentWillUnmount() {
    this._anim && this._anim.cancel()
  }
}`}</Code>
      <FigureCaption>
        Компонент может быть извлечен до того, как анимация закончится.
      </FigureCaption>
    </Slide>

    <DialogSlide example="enter" />

    <Slide centered>
      <Code>{`
<div>
  {this.state.showDialog && <Dialog />}
</div>
`}</Code>
      <FigureCaption>
        Проблемы с анимацией выхода — компонент уже извлечен из DOM.
      </FigureCaption>
    </Slide>

    <Slide background="/images/state-map.png" />

    <Slide centered>
      <Code>{`
<Animated>
  {this.state.showDialog && <Dialog />}
</Animated>
`}</Code>
      <FigureCaption>
        Компонент-хелпер Animated с поддержкой анимаций выхода.
      </FigureCaption>
    </Slide>

    <Slide centered>
      <Code fontSize={22}>{`const element = <Dialog size="medium" />

// => { type: Dialog, props: { size: 'medium' }, ... }
const element = React.createElement(Dialog, { size: 'medium' })`}</Code>

      <FigureCaption>Что скрывается за JSX?</FigureCaption>
    </Slide>

    <Slide background="/images/dan-article.png" />

    <Slide centered>
      <Code>{`
  componentWillReceiveProps(nextProps) {
    // Exit transition
    if (this.props.children && !nextProps.children) {
      return this.transitionState(st.EXITING,
        { children: this.props.children })
    }

    // Enter transition
    if (!this.props.children && nextProps.children) {
      return this.transitionState(st.ENTERING)
    }
  }
`}</Code>
      <FigureCaption>
        Компонент-хелпер Animated с поддержкой анимаций выхода.
      </FigureCaption>
    </Slide>

    <DialogSlide example="exit" />

    <CloudPollSlide name="Паттерн Change Detection на примере" />

    <Slide centered>
      <Code fontSize={20}>{`render() {
  return <canvas />
}

// Render only once!
shouldComponentUpdate() { return false }

componentWillReceiveProps(nextProps) {
  if (this.props.color != nextProps.color) {
    // Animate on canvas...
  }
}`}</Code>
      <FigureCaption>
        С помощью хуков можно полностью <b>перехватить ответственность</b> за
        рендер. Например, для работы с <code>Canvas</code>, <code>WebGL</code>,{' '}
        <code>WebAudio</code> и т.д.
      </FigureCaption>
    </Slide>

    <BubblePollSlide name="Перехват ответственности на примере" />
    <PollsSlide
      name={'Правильно построенные «грязные компоненты» удобно тестировать'}
    />

    {/* Золотое правило и о запуске презентаций */}
    <Slide
      name="Золотое правило для грязных анимаций"
      background="/images/golden-rule.png"
    />
    <Slide
      name="Правило работает и в другую сторону"
      background="/images/state-changes.png"
    />

    <Slide background="/images/demo-wip.png" />

    <Slide name="Redux Actuator позволяет слать события компонентам через Redux store">
      <TalkingHeads />
    </Slide>
    <Slide name="Актуатор в действии" background="/images/actuator-code.jpg" />
    <Slide name="Redux Actuator поддерживает механизм каналов">
      <InternationalHeads />
    </Slide>
    <Slide name="Резюме и ресурсы" />
  </Presentation>
)

export default DirtyAnimations
