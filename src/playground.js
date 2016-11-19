import React, { Component } from 'react'
import './playground.scss'

import SimplePoll from 'simple-poll'
import CloudPoll from 'cloud-poll'
import BubblePoll from 'bubble-poll'
import ClassicPoll from 'classic-poll'

const makeUid = () => (Math.random() * 0xffffff | 0)

const initialPoll = {
  title: 'Что вы считаете главным сдерживающим фактором инвестиционного роста в регионе?',
  url: 'otts.ficus.io',
  choices: [
    { id: 'a1', color: '#29BECE', text: 'Высокие тарифы' },
    { id: 'a2', color: '#2CCC85', text: 'Недоступность инфраструктуры' },
    { id: 'a3', color: '#E17AC1', text: 'Избыточный контроль и надзор' },
    { id: 'a4', color: '#FD9998', text: 'Отсутствие "дешевых" денег' },
    { id: 'a5', color: '#549DF2', text: 'Падение потребительского спроса' },
    { id: 'a6', color: '#E82339', text: 'Кадровый дефицит' },
    { id: 'a7', color: '#B59CC8', text: 'Трудности в получении госуслуг' }
  ],
  voters: []
}

const makePollPayload = (poll) => {
  const votersCount = poll.voters.length
  const results = {}
  poll.choices.forEach(ch => { results[ch.id] = { votes: 0 } })
  poll.voters.forEach(v => {
    results[v.choice].votes++
  })

  poll.choices.forEach(ch => {
    results[ch.id].percent = votersCount
      ? (results[ch.id].votes / votersCount) : 0
  })

  return {
    ...poll,
    votersCount,
    results
  }
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const generateVoter = (poll, choices) => {
  const ch = choices || poll.choices

  return {
    id: makeUid(),
    choice: sample(ch).id
  }
}

const addVotes = (poll, amount) => {
  const newVoters = Array(amount).fill()
    .map(() => generateVoter(poll))

  return {
    ...poll,
    voters: [...poll.voters, ...newVoters]
  }
}

const changeVotes = (poll, percent) => {
  let choices = []

  for (var i = 0; i < 3; ++i) {
    choices.push(sample(poll.choices))
  }

  return {
    ...poll,
    voters: poll.voters.map(v => ({
      ...v,
      choice: (Math.random() <= percent ? sample(choices).id : v.choice)
    }))
  }
}

const PlaygroundButton = ({ icon, children, onClick }) =>
  <button className='playground__button' onClick={onClick}>
    <span className='playground__button-icon'>{icon}</span>
    {children}
  </button>

class Playground extends Component {
  constructor () {
    super()
    this.state = {
      poll: addVotes(initialPoll, 80)
    }
  }

  changeVotes (percent) {
    this.setState({
      poll: changeVotes(this.state.poll, percent)
    })
  }

  addVotes (amount = 1) {
    this.setState({
      poll: addVotes(this.state.poll, amount)
    })
  }

  render () {
    return (
      <div className='playground'>
        <div className='playground__tool-bar'>
          <div className='playground__logo'>
            ficus.otts
          </div>
          <div className='playground__button-line'>
            <PlaygroundButton icon='🍭' onClick={() => this.changeVotes(0.2)}>20%</PlaygroundButton>
            <PlaygroundButton icon='🍭' onClick={() => this.changeVotes(0.8)}>80%</PlaygroundButton>
            <PlaygroundButton icon='🍭' onClick={() => this.changeVotes(0.8)}>100%</PlaygroundButton>
          </div>

          <div className='playground__button-line'>
            <PlaygroundButton icon='🐥' onClick={() => this.addVotes(1)} />
            <PlaygroundButton icon='🐥🐥' onClick={() => this.addVotes(10)} />
            <PlaygroundButton icon='🐥🐥🐥' onClick={() => this.addVotes(50)} />
          </div>

          <div className='playground__button-line'>
            <PlaygroundButton icon='🔥' onClick={() => this.addVotes(1)} />
            <PlaygroundButton icon='🔥🔥' onClick={() => this.addVotes(5)} />
            <PlaygroundButton icon='🔥🔥🔥' onClick={() => this.addVotes(50)} />
          </div>
        </div>

        <div className='playground__content'>

          <div className='playground__poll'>
            <div className='playground__poll-wrap'>
              <BubblePoll poll={makePollPayload(this.state.poll)} />
            </div>
          </div>

          <div className='playground__poll'>
            <div className='playground__poll-wrap'>
              <CloudPoll poll={makePollPayload(this.state.poll)} />
            </div>
          </div>

          <div className='playground__poll'>
            <div className='playground__poll-wrap'>
              <SimplePoll poll={makePollPayload(this.state.poll)} />
            </div>
          </div>

          <div className='playground__poll'>
            <div className='playground__poll-wrap'>
              <ClassicPoll poll={makePollPayload(this.state.poll)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Playground
