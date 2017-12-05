import React from 'react'
import styled from 'styled-components'

// Presentation pieces
import { Presentation, Slide } from 'presa'
import { Title, Caption, Code } from 'presa/blocks'

import FigureCaption from 'blocks/figure-caption'
import FrameBackground from 'blocks/frame-background'
import Layout from 'blocks/layout'

// Interactive slides
import TransistorSlide from 'slides/transistor'
import { CloudPollSlide, PollsSlide, BubblePollSlide } from 'slides/poll-slides'
import MotionGhostSlide from 'slides/motion-ghost-slide'
import { TalkingHeads, InternationalHeads } from 'slides/talking-heads-slide'
import ControlledRenderSlide from 'slides/own-render'
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
  <Presentation
    name="Анимации в мире состояний"
    tableOfContents
    theme={{
      slide: { fontScale: 1.414 }
    }}
  >
    {/* Введение */}
    <Slide
      name="Титульный слайд"
      background="./images/gifs/abstract.gif"
      fade={0.5}
    >
      <Layout>
        <DeckTitle color="white">
          Анимации ↝<br />в мире состояний
        </DeckTitle>

        <Contacts>
          <Author>
            Алексей Тактаров<br />HolyJS Moscow 2017
          </Author>

          <TwitterHandle>@mlfrg · molefrog.com</TwitterHandle>
        </Contacts>
      </Layout>
    </Slide>

    <Slide
      name="Витрувий — один из первых архитекторов-теоретиков"
      background="./images/vitruvius-pitch.jpg"
    />
    <Slide
      name="Витрувий написал труд по архитектуре"
      background="./images/vitruvius-book.jpg"
    />
    <Slide name="Три качества" background="./images/vitruvius-rules.png" />
    <Slide name="Применимы везде" background="./images/rams-radio.jpg" />
    <Slide
      name="В чем наша миссия?"
      background="./images/gifs/apps.gif"
      fade={0.2}
      centered
    />

    {/* Про что доклад? */}
    <Slide
      name="Что рассмотрим в докладе"
      background="./images/talk-abstract.png"
    />

    <Slide name="О докладчике" background="./images/about-author.png" />

    {/* Производительные анимации в браузере */}
    <Slide
      name="Анимации: ожидание"
      background="./images/ideal-animation.png"
    />
    <Slide name="requestAnimationFrame" background="./images/time-based.png" />

    <RafScheduleSlide name="rAF как выглядит" />
    <TimelineComparisonSlide
      name="Но наивная реализация некорректна"
      comparedMethod="naive"
    />
    <RafTimestampSlide name="rAF принимает параметр-время" />
    <RafDeltaSlide name="Учитываем дельту в анимации" />
    <TimelineComparisonSlide
      name="Пропуск кадров, но анимация корректна"
      comparedMethod="raf"
    />

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
      background="./images/dom-state-1.svg"
    />
    <Slide
      name="Приложение — это цепочка состояний"
      background="./images/dom-state-2.svg"
    />
    <Slide
      name="Используя подход состояний, можно путешествовать во времени"
      background="./images/retrodux.gif"
    />

    {/* Анимации переходов состояний */}
    <Slide
      name="CSS transitions работают в 99% случаев"
      background="./images/gifs/bean.gif"
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
    <ReactMotionCodeSlide name="Function-as-a-Prop" />

    <MotionGhostSlide
      name="Как React Motion работает с состояниями."
      centered
    />

    <Slide
      name="React Motion не всегда подходит"
      background="./images/react-motions-cons.png"
    />

    {/* Делаем кастомную анимацию на примере */}
    <Slide
      fade={0.4}
      centered
      background="./images/gifs/factory.gif"
      name="Грязные анимации"
    >
      <Title color="white">Как делать «грязные» анимации</Title>
      <Caption color="white">На примере диалогового окна</Caption>
    </Slide>

    <Slide name="Анимации на входе" centered>
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

    <Slide name="Отмена анимации" centered>
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

    <DialogSlide name="Диалоговое окно: вход" example="enter" />

    <Slide name="Проблемы с выходом" centered>
      <Code>{`
<div>
  {this.state.showDialog && <Dialog />}
</div>
`}</Code>
      <FigureCaption>
        Проблемы с анимацией выхода — компонент уже извлечен из DOM.
      </FigureCaption>
    </Slide>

    <Slide name="Карта состояний" centered>
      <img src="./images/state-map.png" width="800" />
      <FigureCaption>
        Карта состояний компонента <code>Animated</code>
      </FigureCaption>
    </Slide>

    <Slide name="Интерфейс Animated" centered>
      <Code>{`
<Animated>
  {this.state.showDialog && <Dialog />}
</Animated>
`}</Code>
      <FigureCaption>
        Компонент-хелпер Animated с поддержкой анимаций выхода.
      </FigureCaption>
    </Slide>

    <Slide name="Во что превращается JSX" centered>
      <Code fontSize={22}>{`const element = <Dialog size="medium" />

// => { type: Dialog, props: { size: 'medium' }, ... }
const element = React.createElement(Dialog, { size: 'medium' })`}</Code>

      <FigureCaption>Что скрывается за JSX?</FigureCaption>
    </Slide>

    <Slide
      name="Тонкости хорошо раскрыты в статье"
      background="./images/dan-article.png"
    />

    <Slide name="Animated — простейший автомат" centered>
      <Code>{`
  componentWillReceiveProps(nextProps) {
    // Exit transition
    if (this.props.children && !nextProps.children) {
      return this.transitionState(st.EXITING,
        { children: this.props.children })
    }
  }

  transitionState(transitionTo, opt = {}) {
    // .. FSM logic ..
    // Wait for \`this._content.animateExit()\`
  }
`}</Code>
      <FigureCaption>
        Компонент-хелпер Animated с поддержкой анимаций выхода.
      </FigureCaption>
    </Slide>

    <DialogSlide name="Диалог с входом и выходом" example="exit" />

    <CloudPollSlide name="Паттерн Change Detection на примере" />

    <Slide name="Перехват ответственности" centered>
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

    <ControlledRenderSlide name="WebGL компонент" />

    <BubblePollSlide name="Перехват ответственности на примере" />
    <PollsSlide
      name={'Правильно построенные «грязные компоненты» удобно тестировать'}
    />

    {/* Золотое правило и о запуске презентаций */}
    <Slide
      name="Золотое правило для грязных анимаций"
      background="./images/golden-rule.png"
    />
    <Slide
      name="Правило работает и в другую сторону"
      background="./images/state-changes.png"
    />

    <Slide name="Redux Actuator позволяет слать события компонентам через Redux store">
      <TalkingHeads />
    </Slide>
    <Slide name="Актуатор в действии" background="./images/actuator-code.jpg" />
    <Slide name="Redux Actuator поддерживает механизм каналов">
      <InternationalHeads />
    </Slide>
  </Presentation>
)

export default DirtyAnimations

const DeckTitle = styled(Title)`
  line-height: 0.95;
  margin-top: 80px;
`

const Contacts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 200px;
  color: white;
  font-weight: bold;
  font-size: 24px;
  align-items: flex-end;
`

const Author = styled.div`
  border-bottom: 4px solid white;
  padding-top: 10px;
`

const TwitterHandle = styled.div`
  font-size: 20px;
`
