/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react'

class Animated extends Component {
  constructor(props) {
    super(props)

    this._anims = []

    this.state = {
      lastChildren: props.children,
      renderGhost: false
    }
  }

  registerAnimation(descriptor) {
    descriptor && this._anims.push(descriptor)
  }

  cancelAllAnimations() {
    this._anims.forEach(anim => anim.cancel())
    this._anims.splice(0, this._anims.length)
  }

  componentWillUnmount() {
    this.cancelAllAnimations()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.children && this.props.children) {
      this.setState({
        lastChildren: this.props.children,
        renderGhost: true
      })

      if (this.$content && this.$content.animateExit) {
        this.cancelAllAnimations()
        this.registerAnimation(this.$content.animateExit())
      }
    }

    if (nextProps.children && !this.props.children) {
      this.setState({
        lastChildren: null,
        renderGhost: false
      })

      if (this.$content && this.$content.animateAppear) {
        this.cancelAllAnimations()
        this.registerAnimation(this.$content.animateAppear())
      }
    }
  }

  componentDidMount() {
    if (this.$content && this.$content.animateAppear) {
      this.registerAnimation(this.$content.animateAppear())
    }
  }

  registerElement = node => {
    this.$content = node
  }

  render() {
    const { lastChildren, renderGhost } = this.state
    const children = renderGhost ? lastChildren : this.props.children

    if (!children) {
      return false
    }

    return React.cloneElement(children, { ref: this.registerElement })
  }
}

export default Animated
