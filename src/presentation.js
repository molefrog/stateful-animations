import React from 'react'
import styled from 'styled-components'

// Presentation pieces
import { Presentation, Slide } from 'presa'
import { Title, Caption, Code, H3, H4 } from 'presa/blocks'

import FigureCaption from 'blocks/figure-caption'
import FrameBackground from 'blocks/frame-background'

// Interactive slides
import TransistorSlide from 'slides/transistor'
import { CloudPollSlide, PollsSlide, BubblePollSlide } from 'slides/poll-slides'
import MotionGhostSlide from 'slides/motion-ghost-slide'
import { TalkingHeads } from 'slides/actuation/talking-heads'
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
import FlipSlide from 'slides/flip'
import ResourcesSlide from 'slides/resources'
import SummarySlide from 'slides/summary'

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
      <DeckTitle color="white">
        Анимации ↝<br />в мире состояний
      </DeckTitle>

      <Contacts>
        <Author>
          Алексей Тактаров<br />HolyJS Moscow 2017
        </Author>

        <TwitterHandle>@mlfrg · molefrog.com</TwitterHandle>
      </Contacts>
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
    <Slide name="В чем наша миссия?" background="./images/architecture.jpg">
      <SecTitle>наша ответственность</SecTitle>
      <H3 color="#333">
        Приложения должны решать задачи людей, <br />стабильно работать и быть
        <b> приятными в использовании</b>.
      </H3>
    </Slide>

    {/* Про что доклад? */}
    <Slide
      name="Что рассмотрим в докладе"
      background="./images/talk-abstract.png"
    />

    <Slide name="О докладчике" background="./images/about-author.jpg" />

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
    <Slide name="Состояние отображается в DOM" centered>
      <img width="470" src="./images/immutable-map.png" />
      <FigureCaption>
        Immutable UI в основе современных веб-приложений. Состояние отображается
        в DOM.
      </FigureCaption>
    </Slide>
    <Slide name="Приложение — это цепочка состояний" layout={false}>
      <CustomImageLayout>
        <img width="860" src="./images/immutable-chain.png" />
        <FigureCaption>Приложение — цепочка состояний.</FigureCaption>
      </CustomImageLayout>
    </Slide>
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
      background="./images/react-motion-cons.jpg"
    />

    {/* Делаем кастомную анимацию на примере */}
    <Slide
      fade={0.2}
      centered
      background="./images/gifs/storm.gif"
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
      background="./images/dan-article.jpg"
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

    <Slide name="Transition из react-transition-group v2" centered>
      <Code>{`import Transition
  from 'react-transition-group/Transition'

// \`state\` is 'entered', 'entering', 'exited' etc.
<Transition in={isVisible} timeout={duration}>
  {state =>
    <ModalDialog animationState={state} />}
</Transition>
`}</Code>

      <FigureCaption>
        <code>react-transition-group@2.0</code> предоставляет декларативный
        компонент для анимаций входа/выхода
      </FigureCaption>
    </Slide>

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

    <Slide name="P-контроллер для анимаций" centered>
      <Code>{`// Limit delta to avoid divergence
const delta = Math.min(100.0, ts - prevTs)
const P = 0.001 * delta

this.x = P * (this.target - x)`}</Code>

      <FigureCaption>
        P-контроллер удобен для плавных неограниченных по времени анимаций.
      </FigureCaption>
    </Slide>

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

    <Slide centered name="Применяем паттерн в Redux приложениях">
      <Code>
        {`import { Actuator, actuate } from 'redux-actuator'

// Inside the component
<Actuator on={{ animateBadge: this.animateBadge }} />

// Where the business logic is
store.dispatch(actuate('animateBadge'))
store.dispatch(actuate('highlightUser', { id: 1 }))`}
      </Code>
      <FigureCaption>
        Паттерн удобно использовать в Redux приложениях, где глобальный стейт —
        единственный способ коммуникации.
      </FigureCaption>
    </Slide>

    <Slide name="Redux Actuator демо">
      <TalkingHeads />
    </Slide>

    <FlipSlide name="Анимация перехода между роутами с помощью FLIP" />

    <SummarySlide name="Резюме. Классификация анимаций в React по чистоте." />

    <ResourcesSlide name="Плейлист по докладов теме" />
  </Presentation>
)

export default DirtyAnimations

const SecTitle = styled(H4)`
  margin-bottom: 10px;
  letter-spacing: 1px;
  color: #666;
`

const CustomImageLayout = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    align-self: stretch;
  }
`

const DeckTitle = styled(Title)`
  line-height: 0.95;
  margin-top: 90px;
`

const Contacts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
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
