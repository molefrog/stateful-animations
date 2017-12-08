import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

// Redux swiss knife
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createEngine, { actuate, Actuator } from 'redux-actuator'

// Local components
import ThisGuy from './this-guy'
import ActionLogger from './action-logger'
import Button from 'blocks/button'

// This will create store. The store is instatiated inside
// components' constructors which isn't cool, but works for demos
const configureStore = () => {
  const engine = createEngine()

  const rootReducer = combineReducers({ actuator: engine.reducer })
  return createStore(rootReducer)
}

// This is a wrapper around ThisGuys component with an Actuator
// Normally the Actuator is placed inside the component, but
// I wanted to isolate the component from Redux-related logic
class TalkingGuy extends Component {
  render() {
    const { channel = 'default', ...restProps } = this.props

    return (
      <Actuator
        channel={channel}
        on={(...args) => {
          const guy = this.guy
          guy && guy.say(...args)
        }}
      >
        <ThisGuy
          ref={g => {
            this.guy = g
          }}
          {...restProps}
        />
      </Actuator>
    )
  }
}

const internationalPhrases = {
  jose: ['¡Hóla!', 'Cómo estás?', 'Puedes repetirlo?', 'Lo siento, pero...'],

  gustav: ['Goeden avond!', 'Goeiedag!', 'Dank u wel'],

  pierrot: [
    'Quoi de neuf?',
    'Bonjour!',
    'Salut!',
    'Coucou!',
    'Au revoir!',
    'Comment ça va?'
  ],

  avram: ['Tzohorayim Tovim', 'Lilah Tov', 'Shabbat Shalom', 'Shavua Tov']
}

const logActuatorAction = (store, action, color = null) => {
  store.dispatch(action)
  store.dispatch(
    actuate('log', {
      color: color,
      ...action.payload
    })
  )
}

// First demo. One guy talking on demand.
// Only one Actuator channel
class TalkingHeads extends Component {
  constructor() {
    super()
    this.state = {
      isMany: false
    }
    this.store = configureStore()
  }

  saySomething() {
    const guy = this.state.isMany
      ? _.sample(Object.keys(internationalPhrases))
      : 'gustav'

    const phrase = _.sample(internationalPhrases[guy])

    const actuatorAction = actuate(guy, phrase)

    const colors = {
      jose: 'rgba(247, 49, 111, 0.2)',
      gustav: null,
      pierrot: 'rgba(64, 148, 237, 0.2)',
      avram: 'rgba(42, 213, 139, 0.2)'
    }
    logActuatorAction(this.store, actuatorAction, colors[guy])
  }

  render() {
    const store = this.store

    return (
      <Provider store={store}>
        <Container>
          <Heads>
            <Head>
              <TalkingGuy who="gustav" channel="gustav" zoomFactor={1.5} />

              <HeadName>Gustav</HeadName>
            </Head>

            {this.state.isMany && (
              <Head>
                <TalkingGuy who="jose" channel="jose" zoomFactor={1.5} />

                <HeadName>José</HeadName>
              </Head>
            )}

            {this.state.isMany && (
              <Head>
                <TalkingGuy who="pierrot" channel="pierrot" zoomFactor={1.5} />

                <HeadName>Pierrot</HeadName>
              </Head>
            )}

            {this.state.isMany && (
              <Head>
                <TalkingGuy who="avram" channel="avram" zoomFactor={1.5} />

                <HeadName>Avram</HeadName>
              </Head>
            )}
          </Heads>

          <Controls>
            <Button onClick={this.saySomething.bind(this)} icon={'📣'}>
              Говорить
            </Button>

            <Button
              onClick={() => this.setState({ isMany: !this.state.isMany })}
              icon={this.state.isMany ? '👯‍' : '🙎‍♂️'}
            >
              {this.state.isMany ? 'Много' : 'Один'}
            </Button>
          </Controls>

          <ActionLogger />
        </Container>
      </Provider>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 90px;
`

const Heads = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  > div {
    margin: 0 30px;
  }
`

const Head = styled.div``

const HeadName = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 12px;
  font-weight: 500;

  &.head-jose {
    color: #666;
  }

  &.head-gustav {
    color: #f7316f;
  }

  &.head-pierrot {
    color: #4094ed;
  }

  &.head-avram {
    color: #2ad58b;
  }
`

const Controls = styled.div`
  margin-top: 22px;
  margin-bottom: 16px;
`

export { TalkingHeads }
