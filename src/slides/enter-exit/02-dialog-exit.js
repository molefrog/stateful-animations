/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Velocity from 'velocity-animate'

import FakeDialog from './fake-dialog'
import Animated from './animated'

/*
 *
 */
class Dialog extends Component {
  animateAppear() {
    const { slow } = this.props
    const node = findDOMNode(this)

    if (!node) {
      return
    }

    const duration = slow ? 2000 : 600

    Velocity(node, { scale: 0.3, opacity: 0, translateY: 0 }, { duration: 0 })
    let promise = Velocity(
      node,
      { scale: 1.0, opacity: 1 },
      { duration: duration, easing: [55, 7] }
    )

    promise.cancel = () => Velocity(node, 'stop')
    return promise
  }

  animateExit() {
    const { slow } = this.props
    const node = findDOMNode(this)

    if (!node) {
      return
    }

    let promise = Velocity(
      node,
      { translateY: 100, opacity: 0.0 },
      { duration: slow ? 2000 : 1000, easing: 'easeOutCubic' }
    )

    promise.cancel = () => Velocity(node, 'stop')
    return promise
  }

  render() {
    return <FakeDialog {...this.props} />
  }
}

// Showcase
class DialogExit extends Component {
  render() {
    return (
      <Animated>{this.props.active && <Dialog {...this.props} />}</Animated>
    )
  }
}

export default DialogExit
