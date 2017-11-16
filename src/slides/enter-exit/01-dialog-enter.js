/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Velocity from 'velocity-animate'

import FakeDialog from './fake-dialog'

class AppearableDialog extends Component {
  componentDidMount() {
    const { slow } = this.props
    const root = findDOMNode(this)

    if (!root) {
      return
    }

    const duration = slow ? 2000 : 600

    Velocity(root, { scale: 0.3, opacity: 0 }, { duration: 0 })
    Velocity(
      root,
      { scale: 1.0, opacity: 1 },
      { duration: duration, easing: [55, 7] }
    )
  }

  render() {
    return <FakeDialog {...this.props} />
  }
}

class DialogEnter extends Component {
  render() {
    return this.props.active && <AppearableDialog {...this.props} />
  }
}

export default DialogEnter
