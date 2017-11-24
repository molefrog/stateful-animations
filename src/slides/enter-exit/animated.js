/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react'

const animationStates = {
  IDLE: 'IDLE',
  ENTERING: 'ENTERING',
  ENTERED: 'ENTERED',
  EXITING: 'EXITING',
  EXITED: 'EXITED'
}

const st = animationStates

class Animated extends Component {
  constructor(props) {
    super(props)

    this._anims = []

    this.state = {
      ghostChildren: props.children,
      animationState: st.EXITED
    }
  }

  // Dummiest animation manager ever.
  // Simply saves animation handles and cancels
  // them all on demand.
  registerAnimation(descriptor) {
    descriptor && this._anims.push(descriptor)
  }

  cancelAllAnimations() {
    this._anims.forEach(anim => anim.cancel())
    this._anims.splice(0, this._anims.length)
  }

  componentWillUnmount() {
    this.cancelAllAnimations()
    this._unmounted = true
  }

  changeAnimationState(state, cb) {
    const stateName = state.animationState

    if (stateName) {
      this.props.onAnimationState(stateName)
    }

    return this.setState(state, cb)
  }

  transitionState(transitionTo, options = {}) {
    const transitionFrom = this.state.animationState

    // Do nothing
    if (transitionFrom === transitionTo) {
      return
    }

    // terminal states
    if (transitionTo === st.ENTERED) {
      return this.changeAnimationState({
        animationState: st.ENTERED
      })
    }

    if (transitionTo === st.EXITED) {
      return this.changeAnimationState({
        animationState: st.EXITED
      })
    }

    if (transitionTo === st.ENTERING) {
      return this.changeAnimationState(
        {
          animationState: st.ENTERING
        },
        () => {
          this.cancelAllAnimations()

          if (!this.$content || !this.$content.animateAppear) {
            return this.transitionState(st.ENTERED)
          }

          const animation = this.$content.animateAppear()

          animation.then(() => {
            if (!this._unmounted && this.state.animationState !== st.EXITING) {
              this.transitionState(st.ENTERED)
            }
          })
          this.registerAnimation(animation)
        }
      )
    }

    if (transitionTo === st.EXITING) {
      return this.changeAnimationState(
        {
          animationState: st.EXITING,
          ghostChildren: options.children
        },
        () => {
          this.cancelAllAnimations()

          if (!this.$content || !this.$content.animateExit) {
            return this.transitionState(st.EXITED)
          }

          const animation = this.$content.animateExit()
          animation.then(() => {
            if (!this._unmounted && this.state.animationState !== st.ENTERING) {
              this.transitionState(st.EXITED)
            }
          })
          this.registerAnimation(animation)
        }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children && !nextProps.children) {
      return this.transitionState(st.EXITING, { children: this.props.children })
    }

    if (!this.props.children && nextProps.children) {
      return this.transitionState(st.ENTERING)
    }
  }

  componentDidMount() {
    this.transitionState(st.ENTERING)
  }

  registerElement = node => (this.$content = node)

  render() {
    const { animationState, ghostChildren } = this.state

    // This flags shows if we have to render 'ghost'
    // version of the children prop.
    // Only works when exit animation is performing
    const shouldRenderGhost = animationState === st.EXITING
    const childrenToRender = shouldRenderGhost
      ? ghostChildren
      : this.props.children

    // Nothing to render yet
    if (!childrenToRender) {
      return null
    }

    return React.cloneElement(childrenToRender, { ref: this.registerElement })
  }
}

export default Animated
