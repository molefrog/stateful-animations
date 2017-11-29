import React, { Component } from 'react'

import SimplePoll from 'ficus/simple-poll'
import CloudPoll from 'ficus/cloud-poll'
import BubblePoll from 'ficus/bubble-poll'
import ClassicPoll from 'ficus/classic-poll'

import { Slide } from 'presa'
import { Button } from 'presa/blocks'

import './poll-slides.scss'

const makeUid = () => (Math.random() * 0xffffff) | 0

const initialPoll = {
  title: 'What is the best album of 2016?',
  url: 'ficus.io',
  choices: [
    {
      id: 'a1',
      color: 'rgba(61, 118, 230, 1.00)',
      text: 'Chance The Rapper – Coloring Book'
    },
    { id: 'a2', color: 'rgba(241, 196, 15, 1.00)', text: 'Beyoncé – Lemonade' },
    {
      id: 'a3',
      color: 'rgba(230, 126, 34, 1.00)',
      text: 'Frank Ocean – Blonde  '
    },
    { id: 'a4', color: 'rgba(231, 76, 60, 1.00)', text: 'David Bowie – Star' },
    {
      id: 'a5',
      color: 'rgba(142, 68, 173, 1.00)',
      text: 'Kanye West – The Life Of Pablo'
    }
  ],
  voters: []
}

const makePollPayload = poll => {
  const votersCount = poll.voters.length
  const results = {}
  poll.choices.forEach(ch => {
    results[ch.id] = { votes: 0 }
  })
  poll.voters.forEach(v => {
    results[v.choice].votes++
  })

  poll.choices.forEach(ch => {
    results[ch.id].percent = votersCount
      ? results[ch.id].votes / votersCount
      : 0
  })

  return {
    ...poll,
    votersCount,
    results
  }
}

const sample = array => array[Math.floor(Math.random() * array.length)]

const generateVoter = (poll, choices) => {
  const ch = choices || poll.choices

  return {
    id: makeUid(),
    choice: sample(ch).id
  }
}

const addVotes = (poll, amount) => {
  const newVoters = Array(amount)
    .fill()
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
      choice: Math.random() <= percent ? sample(choices).id : v.choice
    }))
  }
}

class PollControls extends Component {
  constructor() {
    super()
    this.state = {
      poll: addVotes(initialPoll, 80)
    }
  }

  changeVotes(percent) {
    this.setState({
      poll: changeVotes(this.state.poll, percent)
    })
  }

  addVotes(amount = 1) {
    this.setState({
      poll: addVotes(this.state.poll, amount)
    })
  }

  render() {
    return (
      <div className="poll-slide__wrap">
        <div className="poll-slide__content">
          {this.props.children(makePollPayload(this.state.poll))}
        </div>

        <div className="poll-slide__controls">
          <Button icon="👏" onClick={() => this.changeVotes(0.2)}>
            поменять 20%
          </Button>
          <Button icon="👏" onClick={() => this.changeVotes(0.8)}>
            поменять 80%
          </Button>
          <Button icon="⭐️" onClick={() => this.addVotes(1)}>
            +1 голос
          </Button>
          <Button icon="⭐" onClick={() => this.addVotes(10)}>
            +10 голосов
          </Button>
        </div>
      </div>
    )
  }
}

const PollZoom = ({ zoom, children, width, height }) => (
  <div
    className="poll-zoom__poll"
    style={{ width: width * zoom, height: height * zoom }}
  >
    <div
      className="poll-zoom__poll-wrap"
      style={{ transform: `scale(${zoom}, ${zoom})` }}
    >
      {children}
    </div>
  </div>
)

export class CloudPollSlide extends Component {
  constructor() {
    super()
    this.state = { alphaTime: 1.4 }
  }

  toggleSpeed() {
    this.setState({ alphaTime: this.state.alphaTime === 1.4 ? 4.0 : 1.4 })
  }

  render() {
    const width = 1100
    const height = 660

    const alphaTime = this.state.alphaTime

    return (
      <Slide {...this.props} className="poll-slide">
        <PollControls>
          {poll => (
            <PollZoom width={width} height={height} zoom={0.65}>
              <CloudPoll
                width={width}
                height={height}
                alphaTime={alphaTime}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>
          )}
        </PollControls>

        <div className="poll-slide__speed">
          <Button
            icon="⭐"
            checked={alphaTime === 4.0}
            onClick={() => this.toggleSpeed()}
          >
            {alphaTime === 1.4 ? 'нормально' : 'медленно'}
          </Button>
        </div>
      </Slide>
    )
  }
}

export class BubblePollSlide extends Component {
  render() {
    const width = 1024
    const height = 768

    return (
      <Slide {...this.props} className="poll-slide">
        <PollControls>
          {poll => (
            <PollZoom width={width} height={height} zoom={0.65}>
              <BubblePoll
                width={width}
                height={height}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>
          )}
        </PollControls>
      </Slide>
    )
  }
}

export const PollsSlide = props => {
  const width = 1024
  const height = 768

  return (
    <Slide {...props} className="poll-slide">
      <PollControls>
        {poll => (
          <div className="poll-slide__polls">
            <PollZoom width={width} height={height} zoom={0.3}>
              <CloudPoll
                width={width}
                height={height}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>

            <PollZoom width={width} height={height} zoom={0.3}>
              <SimplePoll
                width={width}
                height={height}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>

            <PollZoom width={width} height={height} zoom={0.3}>
              <BubblePoll
                width={width}
                height={height}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>

            <PollZoom width={width} height={height} zoom={0.3}>
              <ClassicPoll
                width={width}
                height={height}
                offsetContainerClass="poll-zoom__poll"
                poll={poll}
              />
            </PollZoom>
          </div>
        )}
      </PollControls>
    </Slide>
  )
}
