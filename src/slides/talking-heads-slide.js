import React, { Component } from 'react'
import _ from 'lodash'

// Redux swiss knife
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createEngine, { actuateChannel, Actuator } from 'redux-actuator'

// Local components
import ThisGuy from './this-guy'
import ActionLogger from './action-logger'
import Button from 'blocks/button'

import './talking-heads.scss'

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
        events={{
          say: (...args) => {
            const guy = this.guy
            guy && guy.say(...args)
          },

          'magic!': () => {
            this.guy && this.guy.doMagic()
          }
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

// Static phrases for both demos
const officePhrases = [
  'Мы созвали эту встречу',
  'Приятно было побеседовать',
  'У меня в волосах жвачка',
  'Идемте внутрь, я ему позвоню',
  'Нам нельзя рисковать с проклятьями',
  'Небезопасно. Может быть что угодно подмешано.',
  'Не хочу торопить события, но...'
]

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

// First demo. One guy talking on demand.
// Only one Actuator channel
class TalkingHeads extends Component {
  constructor() {
    super()
    this.state = {}
    this.store = configureStore()
  }

  saySomething() {
    const phrase = _.sample(officePhrases)
    const actuatorAction = actuateChannel('default')('say', phrase)

    this.store.dispatch(actuatorAction)
    this.store.dispatch(
      actuateChannel('logger')('log', {
        channel: actuatorAction.payload.channel,
        ...actuatorAction.payload.event
      })
    )
  }

  doMagic() {
    const actuatorAction = actuateChannel('default')('magic!')

    this.store.dispatch(actuatorAction)
    this.store.dispatch(
      actuateChannel('logger')('log', {
        channel: actuatorAction.payload.channel,
        ...actuatorAction.payload.event
      })
    )
  }

  render() {
    const store = this.store

    return (
      <Provider store={store}>
        <div className="talking-heads">
          <TalkingGuy who="tikhon" channel="default" zoomFactor={1.5} />

          <div className="talking-heads__controls">
            <Button onClick={this.saySomething.bind(this)} icon={'📣'}>
              {'Говорить'}
            </Button>

            <Button onClick={this.doMagic.bind(this)} icon={'⭐️'}>
              {'Вжух!'}
            </Button>
          </div>

          <ActionLogger />
        </div>
      </Provider>
    )
  }
}

const logActuatorAction = (store, action, color = null) => {
  store.dispatch(action)
  store.dispatch(
    actuateChannel('logger')('log', {
      color: color,
      channel: action.payload.channel,
      ...action.payload.event
    })
  )
}

class InternationalHeads extends Component {
  constructor() {
    super()
    this.state = { gossip: false }
    this.store = configureStore()
  }

  saySomething() {
    const who = _.sample(Object.keys(internationalPhrases))
    const phrase = _.sample(internationalPhrases[who])

    const colors = {
      jose: 'rgba(102, 102, 102, 0.1)',
      gustav: 'rgba(247, 49, 111, 0.2)',
      pierrot: 'rgba(64, 148, 237, 0.2)',
      avram: 'rgba(42, 213, 139, 0.2)'
    }

    logActuatorAction(
      this.store,
      actuateChannel(who)('say', phrase),
      colors[who]
    )

    this.lastTimer = setTimeout(
      () => this.saySomething(),
      500 + Math.random() * 2000
    )
  }

  stopTalking() {
    this.setState({ gossip: false })
    this.lastTimer && clearTimeout(this.lastTimer)
  }

  componentWillUnmount() {
    this.lastTimer && clearTimeout(this.lastTimer)
  }

  render() {
    const store = this.store
    const { gossip } = this.state

    return (
      <Provider store={store}>
        <div className="talking-heads">
          <div className="talking-heads__heads">
            <div className="talking-heads__head">
              <TalkingGuy who="jose" channel="jose" zoomFactor={1.5} />

              <div className="talking-heads__head-name talking-heads__head-name--jose">
                José
              </div>
            </div>

            <div className="talking-heads__head">
              <TalkingGuy who="gustav" channel="gustav" zoomFactor={1.5} />

              <div className="talking-heads__head-name talking-heads__head-name--gustav">
                Gustav
              </div>
            </div>

            <div className="talking-heads__head">
              <TalkingGuy who="pierrot" channel="pierrot" zoomFactor={1.5} />

              <div className="talking-heads__head-name talking-heads__head-name--pierrot">
                Pierrot
              </div>
            </div>

            <div className="talking-heads__head">
              <TalkingGuy who="avram" channel="avram" zoomFactor={1.5} />

              <div className="talking-heads__head-name talking-heads__head-name--avram">
                Avram
              </div>
            </div>
          </div>

          <div className="talking-heads__controls">
            <Button
              onClick={() => {
                if (gossip) {
                  this.stopTalking()
                } else {
                  this.setState({ gossip: true })
                  this.saySomething()
                }
              }}
              checked={!gossip}
              icon={'😶'}
            >
              {'Тихо!'}
            </Button>
          </div>

          <ActionLogger />
        </div>
      </Provider>
    )
  }
}

export { TalkingHeads, InternationalHeads }
