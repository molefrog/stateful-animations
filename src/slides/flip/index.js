import React from 'react'
import { Slide } from 'presa'
import styled from 'styled-components'

// Animation utils
import Transition from 'react-transition-group/Transition'
import Velocity from 'velocity-animate'

import Route from './animated-route'
import Button from 'blocks/button'

// getBoundingClientRect will not work properly with transforms
// (in demo mode only!), so we use this replacement.
//
// Change it to `getBoundingClientRect` when using in your project.
const getBoundingClientRect = el => {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

class FlipSlide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isList: true,
      debug: false
    }
  }

  getDuration() {
    // make it slower in debug mode
    return this.state.debug ? 1500 : 500
  }

  switchRoute = () => {
    this.setState(state => ({
      isList: !state.isList
    }))
  }

  // Perform FLIP animation of a card
  animateFlip = inTransition => {
    const source = inTransition ? this._smallCard : this._bigCard
    const target = inTransition ? this._bigCard : this._smallCard

    const sR = getBoundingClientRect(source)
    const tR = getBoundingClientRect(target)

    Velocity(
      source,
      {
        translateX: tR.left - sR.left,
        translateY: tR.top - sR.top,
        scale: tR.width / sR.width
      },
      { duration: this.getDuration(), easing: 'easeInOutQuart' }
    )

    // Return the element back the original state.
    // Only need this line because both layers stay in DOM
    // during the demo. Consider this a hack.
    Velocity(
      source,
      {
        translateX: 0,
        translateY: 0,
        scale: 1
      },
      { duration: 0, delay: 350 }
    )
  }

  render() {
    const duration = this.getDuration()

    return (
      <Slide {...this.props} centered>
        <Controls>
          <Button
            icon={'🔍'}
            checked={this.state.debug}
            onClick={() => this.setState({ debug: !this.state.debug })}
          >
            {'inspect'}
          </Button>
        </Controls>

        <WorkArea onClick={this.switchRoute}>
          <Transition
            in={this.state.isList}
            timeout={duration}
            onExiting={() => this.animateFlip(true)}
          >
            {transState => {
              const hideRest = transState !== 'entered'

              return (
                <Route
                  {...this.state}
                  animationState={transState}
                  isList={true}
                >
                  <List>
                    <ListItem duration={duration} transparent={hideRest} />
                    <ListItem duration={duration} transparent={hideRest} />
                    <ListItem duration={duration} transparent={hideRest} />
                    <ListItem duration={duration} transparent={hideRest} />

                    <ListItem
                      duration={duration}
                      innerRef={el => (this._smallCard = el)}
                    />
                    <ListItem duration={duration} transparent={hideRest} />
                  </List>
                </Route>
              )
            }}
          </Transition>

          <Transition
            in={!this.state.isList}
            timeout={duration}
            onExiting={() => this.animateFlip(false)}
          >
            {transState => {
              const hideRest = transState !== 'entered'

              return (
                <Route
                  {...this.state}
                  animationState={transState}
                  isList={false}
                >
                  <SingleView>
                    <BigPreview
                      innerRef={el => {
                        el && (this._bigCard = el)
                      }}
                    />
                    <FakeText duration={duration} transparent={hideRest}>
                      <FakeTextLine />
                      <FakeTextLine />
                      <FakeTextLine />
                      <FakeTextLine />
                      <FakeTextLine />
                      <FakeTextLine />
                    </FakeText>
                  </SingleView>
                </Route>
              )
            }}
          </Transition>
        </WorkArea>
      </Slide>
    )
  }
}

const SingleView = styled.div`
  display: flex;
`

const BigPreview = styled.div`
  transform-origin: top left;
  width: 260px;
  height: 300px;

  background: #b6e6ff;
  border-radius: 12px;
`

const FakeText = styled.div`
  transition: opacity ${props => props.duration * 0.5 / 1000.0}s ease;
  opacity: ${props => (props.transparent ? 0 : 1)};
  padding-top: 26px;
`

const FakeTextLine = styled.div`
  width: 180px;
  height: 26px;
  background: rgba(42, 108, 159, 0.05);
  border-radius: 3px;

  margin-bottom: 18px;
  margin-left: 32px;
`

const List = styled.div`
  display: grid;
  padding-top: 20px;

  grid-column-gap: 20px;
  grid-row-gap: 24px;
  justify-content: center;

  grid-template-columns: repeat(auto-fill, 130px);
  grid-auto-flow: dense;
`

const ListItem = styled.div`
  transform-origin: top left;
  width: 130px;
  height: 150px;

  border-radius: 6px;
  will-change: transform;

  transition: opacity ${props => props.duration * 0.5 / 1000.0}s ease;
  opacity: ${props => (props.transparent ? 0 : 1)};

  &:nth-child(1) {
    background: #e5e9f2;
  }

  &:nth-child(2) {
    background: #ffe8e6;
  }

  &:nth-child(3) {
    background: #fff4d6;
  }

  &:nth-child(4) {
    background: #c3ffc6;
  }

  &:nth-child(5) {
    background: #b6e6ff;
  }

  &:nth-child(6) {
    background: #f3e7ff;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
`

const WorkArea = styled.div`
  width: 540px;
  height: 420px;

  position: relative;
  cursor: pointer;

  perspective: 0px;
  transition: transform 0.5s ease;
`

export default FlipSlide
