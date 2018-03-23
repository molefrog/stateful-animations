import React from 'react'
import styled from 'styled-components'

// Presentation pieces
import { Presentation, Slide } from 'presa'
import { Title, Caption, Code, H2, H3, H4 } from 'presa/blocks'
import FigureCaption from 'blocks/figure-caption'

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
import GameSlide from 'slides/boids'
import ResourcesSlide from 'slides/etc/resources'
import SummarySlide from 'slides/etc/summary'
import LinksSlide from 'slides/etc/links'
import {
  AnimationsExpectationsSlide,
  AnimationsRealitySlide
} from 'slides/etc/animation-expectations'

import { GoldenRuleSlide, ReverseRuleSlide } from 'slides/etc/golden-rule'

const DirtyAnimations = props => (
  <Presentation
    name="Animations in a stateful world"
    tableOfContents
    useFullscreenAPI
    theme={{
      slide: { fontScale: 1.414 }
    }}
  >
    <Slide
      name="Animations in a stateful world"
      background="./images/gifs/abstract.gif"
      fade={0.5}
    >
      <DeckTitle color="white">
        Animations ↝<br />in a stateful world
      </DeckTitle>

      <Contacts>
        <Author>
          Alexey Taktarov<br />React Kyiv March
        </Author>

        <TwitterHandle>@mlfrg · molefrog.com</TwitterHandle>
      </Contacts>
    </Slide>

    <Slide name="Who am I?" background="./images/about-author.jpg">
      <H3>Alexey Taktarov</H3>
      <H4>
        Co-founder and team lead at <b>resume.io</b>
      </H4>
      <H4>
        <i>(before)</i> product designer/dev at Shogun{' '}
        <YCBadge>YC&apos;17</YCBadge>
      </H4>
    </Slide>

    <Slide name="About resume.io" background="./images/resume-screen-1.jpg">
      <ResumeioLogo src="./images/resumeio-logo.png" width="120" />

      <MetricNumber>~500k</MetricNumber>
      <MetricLabel>registered users</MetricLabel>

      <MetricNumber>1.5 years</MetricNumber>
      <MetricLabel>active, since 2016</MetricLabel>

      <MetricNumber>6 countries</MetricNumber>
      <MetricLabel>US and Europe</MetricLabel>

      <br />

      <img src="./images/producthunt-badge.jpg" width="180" />
    </Slide>

    <Slide name="Today's agenda" centered>
      <H4>talk&apos;s topic</H4>
      <H3>Animation Patterns in React apps</H3>
      <br />

      <img width="300" src="./images/sequence.jpg" />
    </Slide>

    <AnimationsExpectationsSlide name="Animations: expectations" />

    <AnimationsRealitySlide name="Animations: reality" />

    <RafScheduleSlide name="How to use rAF" />
    <TimelineComparisonSlide
      name="Naive method is incorrect"
      comparedMethod="naive"
    />
    <RafTimestampSlide name="rAF callback takes timestamp parameter" />
    <RafDeltaSlide name="Delta + rAF" />
    <TimelineComparisonSlide
      name="Frame dropping, but feasible"
      comparedMethod="raf"
    />

    <GameSlide name={'requestAnimationFrame demo'} />

    <Slide name="requestAnimationFrame game loop" centered>
      <Code fontSize={20}>{`const redraw = _ => {
  points.forEach(point => {

    // make sure \`will-change: transform\` is set
    point.element.style.transform = \`
      translate3d($\{point.x}px, $\{point.y}px, 0.0px)
      rotate($\{point.angle}rad)\`
  })
}

const tick = ts => {
  _lastRaf = requestAnimationFrame(tick)

  physicsStep(delta)
  redraw(delta)
}`}</Code>
      <FigureCaption>
        The <code>requestAnimationFrame</code>-based game skeleton.
      </FigureCaption>
    </Slide>

    {/* Как выглядят современные веб-приложения */}
    <Slide name="State maps to DOM" centered>
      <img width="470" src="./images/immutable-map.png" />
      <FigureCaption>
        <b>Immutable UI</b> is the foundation of modern apps.<br />
        Application state maps to DOM.
      </FigureCaption>
    </Slide>
    <Slide name="Application as a chain of immutable states" layout={false}>
      <CustomImageLayout>
        <img width="860" src="./images/immutable-chain.png" />
        <FigureCaption>
          Application as a chain of immutable states.
        </FigureCaption>
      </CustomImageLayout>
    </Slide>

    <Slide name="What about animations?" centered>
      <ImmutableLogo width="160" src="./images/immutable-logo.png" />
      <H3>
        Immutable UIs are predictable, maintainable<br /> and better to test.
      </H3>

      <Question>But what about animations?</Question>
    </Slide>

    <Slide
      name="CSS transitions is what you need in 99% cases"
      background="./images/gifs/bean.gif"
      fade={0.2}
      centered
    >
      <Title color="white">CSS transitions</Title>
      <Caption color="white">are supported out of the box in React</Caption>
    </Slide>

    <CssTransitionCodeSlide name="How to use CSS transitions in React." />

    <TransistorSlide name="Demo: CSS transitions in React." />

    <TransistorSlide
      name={'React Motion uses requestAnimationFrame.'}
      motionEnabled
    />
    <ReactMotionCodeSlide name="Function-as-a-Prop" />

    <MotionGhostSlide name="How React Motion works" centered />

    <Slide name="React Motion cons" centered>
      <H3>The downsides of using React Motion</H3>
      <ConsList>
        <li>Spring-based animations are not time limited</li>
        <li>Hard to work with sequences</li>
        <li>Performance issues</li>
      </ConsList>
    </Slide>

    <Slide
      fade={0.2}
      centered
      background="./images/gifs/storm.gif"
      name="Dirty animations"
    >
      <Title color="white">Dirty animations</Title>
      <Caption color="white">A dialog window example</Caption>
    </Slide>

    <Slide name="Enter animations" centered>
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
        The <b>«animation on enter»</b> pattern. Works through{' '}
        <code>componentDidMount</code> lifecycle hook.
      </FigureCaption>
    </Slide>

    <Slide name="Cancelling the animation" centered>
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
        Make sure you stop the animation on unmount.
      </FigureCaption>
    </Slide>

    <DialogSlide name="Dialog window: enter animation" example="enter" />

    <Slide name="Animating exit is tough" centered>
      <Code>{`
<div>
  {this.state.showDialog && <Dialog />}
</div>
`}</Code>
      <FigureCaption>
        Animating exit is hard — there is nothing to animate since the component
        is not in the DOM anymore.
      </FigureCaption>
    </Slide>

    <Slide name="Animated component" centered>
      <Code>{`
<Animated>
  {this.state.showDialog && <Dialog />}
</Animated>
`}</Code>
      <FigureCaption>
        Introducing <code>Animated</code> — a helper component that supports
        exit animation
      </FigureCaption>
    </Slide>

    <Slide name=" The state map of the Animated component" centered>
      <img src="./images/state-map.png" width="800" />
      <FigureCaption>
        The state map of the <code>Animated</code> component
      </FigureCaption>
    </Slide>

    <Slide name="How is JSX working internally?" centered>
      <Code fontSize={22}>{`const element = <Dialog size="medium" />

// => { type: Dialog, props: { size: 'medium' }, ... }
const element = React.createElement(Dialog, { size: 'medium' })`}</Code>

      <FigureCaption>
        JSX is nothing but a light-weight serializable object.
      </FigureCaption>
    </Slide>

    <Slide
      name="Check Dan's article for more info"
      background="./images/dan-article.jpg"
    />

    <Slide name="Animated is a FSM" centered>
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
        <code>Animated</code> component implementation: <br />
        <b>Finite State Machine.</b>
      </FigureCaption>
    </Slide>

    <DialogSlide
      name="Demo: modal dialog with enter/exit animations"
      example="exit"
    />

    <Slide name="Transition component from react-transition-group v2" centered>
      <Code>{`import Transition
  from 'react-transition-group/Transition'

// \`state\` is 'entered', 'entering', 'exited' etc.
<Transition in={isVisible} timeout={duration}>
  {state =>
    <ModalDialog animationState={state} />}
</Transition>
`}</Code>

      <FigureCaption>
        <code>react-transition-group@2.0</code> provides <br />a declarative way
        for enter/exit animations
      </FigureCaption>
    </Slide>

    <CloudPollSlide name="Using «Change Detection» pattern" />

    <Slide name="«Own render» pattern" centered>
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
        Using lifecycle hooks you can completely{' '}
        <b>override component&apos;s render</b>. For exaple when using{' '}
        <code>Canvas</code>, <code>WebGL</code>, <code>WebAudio</code> etc.
      </FigureCaption>
    </Slide>

    <Slide name="Changes in React 16.3" centered>
      breaking changes in React 16.3:
      <OutlineCode strikethrough>componentWillReceiveProps()</OutlineCode>
      <OutlineCode>static getDerivedStateFromProps()</OutlineCode>
      <p>
        but it can only be used to devide state from props,<br />
        so use <code>componentDidUpdate</code> instead.
      </p>
    </Slide>

    <ControlledRenderSlide name="WebGL component demo" />

    <Slide name="Using P-controller in animations" centered>
      <Code>{`// Limit delta to avoid divergence
const delta = Math.min(100.0, ts - prevTs)
const P = 0.001 * delta

this.x += P * (this.target - x)`}</Code>

      <FigureCaption>
        This little trick called <b>P-controller</b> (taken from control theory)
        is handy for time-unbound animations
      </FigureCaption>
    </Slide>

    <BubblePollSlide name="Own render demo: canvas poll" />
    <PollsSlide name={'You can test dirty components visually'} />

    <GoldenRuleSlide name="The rule of thumb when making dirty animations" />

    <ReverseRuleSlide name="The rule works other way around" />

    <Slide centered name="How to use Actuator in Redux apps">
      <Code>
        {`import { Actuator, actuate } from 'redux-actuator'

// Inside the component
<Actuator on={{ animateBadge: this.animateBadge }} />

// Where the business logic is
store.dispatch(actuate('animateBadge'))
store.dispatch(actuate('highlightUser', { id: 1 }))`}
      </Code>
      <FigureCaption>
        Actuator is used in Redux apps where global state is the only way to
        communicate.
      </FigureCaption>
    </Slide>

    <Slide name="Redux Actuator demo">
      <TalkingHeads />
    </Slide>

    <FlipSlide name="Route change animation decoupled (FLIP method)" />

    <Slide name="React-Native" centered>
      <H4>React Native</H4>
      <H3>
        Building high-performance animations <br />using Animated API
      </H3>
      <br />

      <img width="300" src="./images/sequence.jpg" />
    </Slide>

    <Slide name="Step 1. Define value" centered>
      <Code fontSize={20}>
        {`import { Animated } from 'react-native'

// inside a constructor
const animValue = new Animated.Value(0)
this.state = { animValue }`}
      </Code>
      <FigureCaption>
        <b>Step 1.</b> Define a value.
      </FigureCaption>
    </Slide>

    <Slide name="Step 2. Connect it to the View" centered>
      <Code fontSize={20}>
        {`const { animValue } = this.state

<Animated.View
  style={{
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })
      }
    ]
  }}>`}
      </Code>
      <FigureCaption>
        <b>Step 2.</b> Connect it to the View.
      </FigureCaption>
    </Slide>

    <Slide name="Step 3. Fire it up!" centered>
      <Code fontSize={20}>
        {`
// or \`spring\`, \`decay\` etc.
Animated.timing(animValue, {
  toValue: 0,
  duration: 500
}).start()
`}
      </Code>
      <FigureCaption>
        <b>Step 3.</b> Fire it up!
      </FigureCaption>
    </Slide>

    <SummarySlide name="Animation methods in React classified by purity" />

    <ResourcesSlide name="Related talks and videos" />

    <LinksSlide name="Resources" />
  </Presentation>
)

export default DirtyAnimations

const MetricNumber = styled.div`
  font-size: 38px;
  font-weight: 700;
`

const MetricLabel = styled.div`
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 600;
  color: #a0a0a0;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`

const ImmutableLogo = styled.img`
  margin-bottom: 24px;
`

const Question = styled.div`
  margin-top: 20px;
  font-size: 25px;
  background-color: #fbf177;
  padding: 2px 3px;
`

const ConsList = styled.ul`
  font-size: 26px;
  text-align: left;
  padding: 0;
  padding-top: 15px;
  color: #333333;

  li {
    margin-bottom: 32px;
    list-style-type: none;

    &:before {
      content: '❌';
      padding-right: 15px;
    }
  }
`

const OutlineCode = styled.code`
  font-size: 26px;
  margin: 15px;

  ${props => props.strikethrough && 'text-decoration: line-through;'};
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

const ResumeioLogo = styled.img`
  margin-bottom: 38px;
`

const YCBadge = styled.span`
  background: #f06530;
  padding: 3px 5px;
  color: white;
  font-weight: 700;
  border-radius: 3px;
  margin: 0 2px;
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
