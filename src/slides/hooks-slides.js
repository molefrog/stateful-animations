import React, { Component } from 'react'
import Button from 'ui/button'
import Slide from './slide'

import Velocity from 'velocity-animate'
import { findDOMNode } from 'react-dom'

import './hooks-slides.scss'

class HooksCircle extends Component {
  componentDidMount () {
    const el = findDOMNode(this)

    Velocity(el, { scale: 0.6, opacity: 0 }, { duration: 0 })
    Velocity(el, { scale: 1.3, opacity: 1 }, { duration: 600, easing: [55, 5] })
  }

  render () {
    return <div className='hooks-circle'>surprise!</div>
  }
}

class HooksSlide extends Component {
  constructor () {
    super()
    this.state = { isDotShown: true }
  }

  render () {
    const { isDotShown } = this.state

    return (
      <Slide {...this.props} extraClass='hooks-slide'>

        <div className='hooks-slide__button'>
          <Button checked={isDotShown}
            icon='💡'
            onClick={() => { this.setState({ isDotShown: !isDotShown }) }}>
            {isDotShown ? 'видно' : 'не видно'}
          </Button>
        </div>

        <div className='hooks-slide__circle'>
          {isDotShown && <HooksCircle />}
        </div>
      </Slide>)
  }
}

export default HooksSlide
