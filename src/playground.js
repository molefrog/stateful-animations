import React, { Component } from 'react'
import './playground.scss'

import SimplePoll from 'polls/simple-poll'
import CloudPoll from 'polls/cloud-poll'
import BubblePoll from 'polls/bubble-poll'
import ClassicPoll from 'polls/classic-poll'

const makeUid = () => (Math.random() * 0xffffff | 0)

const initialPoll = {
  title: 'What is the best album of 2016?',
  url: 'otts.ficus.io',
  choices: [
    { id: 'a1', color: 'rgba(61, 118, 230, 1.00)', text: 'Chance The Rapper – Coloring Book' },
    { id: 'a2', color: 'rgba(241, 196, 15, 1.00)', text: 'Beyoncé – Lemonade' },
    { id: 'a3', color: 'rgba(230, 126, 34, 1.00)', text: 'Frank Ocean – Blonde  ' },
    { id: 'a4', color: 'rgba(231, 76, 60, 1.00)', text: 'David Bowie – Star' },
    { id: 'a5', color: 'rgba(142, 68, 173, 1.00)', text: 'Kanye West – The Life Of Pablo' }
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
          </div>

          <div className='playground__button-line'>
            <PlaygroundButton icon='🐥' onClick={() => this.addVotes(1)} />
            <PlaygroundButton icon='🐥🐥' onClick={() => this.addVotes(10)} />
          </div>

          <div className='playground__button-line'>
            <PlaygroundButton icon='🔥' onClick={() => this.addVotes(1)} />
            <PlaygroundButton icon='🔥🔥' onClick={() => this.addVotes(5)} />
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
