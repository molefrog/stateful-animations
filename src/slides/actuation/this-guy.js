/* eslint-disable react/no-find-dom-node */
import Velocity from 'velocity-animate'
import React from 'react'
import styled from 'styled-components'
import { findDOMNode } from 'react-dom'
import { Howl } from 'howler'

class ThisGuy extends React.Component {
  constructor(props) {
    super(props)
    this.whoopSound = new Howl({ src: './sounds/whoop.mp3', volume: 0.6 })
  }

  render() {
    // Default viewport
    const viewport = { width: 70, height: 110 }

    // Scaling
    const factor = this.props.zoomFactor
    const width = viewport.width * factor
    const height = viewport.height * factor

    const imageUrl = `url(./images/guys/${this.props.who}.svg)`

    return (
      <Img
        style={{
          width,
          height,
          backgroundImage: imageUrl
        }}
      />
    )
  }

  doMagic(phrase) {
    const container = findDOMNode(this)

    Velocity(container, { scaleY: 0.1 }, { duration: 100 })
    Velocity(container, { scaleY: 1.0 }, { duration: 800, easing: [30, 5] })
  }

  say(phrase) {
    const container = findDOMNode(this)
    if (!container) return

    const dialog = document.createElement('div')
    dialog.classList.add('guy__dialog')

    const dialogText = document.createElement('div')
    dialogText.classList.add('guy__dialog-text')
    dialogText.textContent = phrase

    dialog.appendChild(dialogText)
    container.appendChild(dialog)

    dialogText.style.fontSize = `${this.props.zoomFactor * 12}px`

    Velocity(
      dialogText,
      { scaleX: 0.3, scaleY: 0.3, opacity: 0.3 },
      { duration: 0 }
    )

    Velocity(
      dialogText,
      {
        scaleX: '1.0',
        scaleY: '1.0'
      },
      { duration: 800, easing: [250, 15], queue: false }
    )

    Velocity(
      dialogText,
      { opacity: 1.0 },
      { duration: 200, easing: 'easeOutCirc', queue: false }
    )

    Velocity(
      dialogText,
      { translateY: '-400px' },
      {
        duration: 6000,
        queue: false,
        complete: () => container.removeChild(dialog)
      }
    )

    setTimeout(() => {
      if (!findDOMNode(this)) return
      Velocity(dialogText, { opacity: 0.0 }, { duration: 1000, queue: false })
    }, 2000)

    this.whoopSound.play()
  }
}

ThisGuy.defaultProps = {
  zoomFactor: 1.0,
  who: 'tikhon'
}

const Img = styled.div`
  cursor: pointer;
  position: relative;

  width: 70px;
  height: 110px;

  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;

  .guy__dialog {
    position: absolute;
    bottom: 85%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .guy__dialog-text {
    background-color: black;
    color: white;
    padding: 3px 10px;
    border-radius: 3px;
    font-size: 16px;
    text-align: center;
    font-family: Rubik, sans-serif;
  }
`

export default ThisGuy
