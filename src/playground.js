import React, { Component } from 'react'
import './playground.scss'

import SimplePoll from 'simple-poll'
// import CloudPoll from 'cloud-poll'
// import BubblePoll from 'bubble-poll'

const makeUid = () => (Math.random() * 0xffffff | 0)

const initialPoll = {
  title: 'Who is likely to be the next president of Russia?',
  url: 'otts.ficus.io',
  choices: [
    { id: 'a1', color: '#29BECE', text: 'Dmitry Medvedev' },
    { id: 'a2', color: '#2CCC85', text: 'Vladimir Putin' },
    { id: 'a3', color: '#E17AC1', text: 'Donald Trump' }
  ],
  voters: []
}

const makePollPayload = (poll) => {
  const votersCount = poll.voters.length
  const results = {}
  poll.choices.forEach(ch => { results[ch.id] = 0 })
  poll.voters.forEach(v => {
    results[v.choice]++
  })

  return {
    ...poll,
    votersCount,
    results
  }
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const generateVoter = (poll) => ({
  id: makeUid(),
  choice: sample(poll.choices).id
})

const addVotes = (poll, amount) => {
  const newVoters = Array(amount).fill()
    .map(() => generateVoter(poll))

  return {
    ...poll,
    voters: [...poll.voters, ...newVoters]
  }
}

const changeVotes = (poll, percent) => {
  return {
    ...poll,
    voters: poll.voters.map(v => ({
      ...v,
      choice: (Math.random() <= percent ? sample(poll.choices).id : v.choice)
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
      poll: addVotes(initialPoll, 40)
    }
  }

  changeVotes (percent) {
    this.setState({
      poll: changeVotes(this.state.poll, percent)
    })
  }

  addVotes (amount = 1) {
    // const votes = this.state.poll.votes

    // this.setState({
    //   poll: {
    //     votes: [ ...votes, ...this.generateVotes(amount) ]
    //   }
    // })
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
            <PlaygroundButton icon='🔥🔥' onClick={() => this.addVotes(10)} />
            <PlaygroundButton icon='🔥🔥🔥' onClick={() => this.addVotes(50)} />
          </div>
        </div>

        <div className='playground__content'>
          {/*
          <div className='playground__poll'>
            <BubblePoll poll={this.state.poll} />
          </div>
          */}

          <div className='playground__poll'>
            <SimplePoll poll={makePollPayload(this.state.poll)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Playground
