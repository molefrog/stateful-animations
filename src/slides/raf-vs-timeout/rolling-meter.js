import React from 'react'

import styled from 'styled-components'

const SKINS = {
  moon: '/images/moon-emoji.png',
  sun: '/images/sun-emoji.png',
  sunglasses: '/images/sunglasses-emoji.png'
}

const Meter = styled.div`
  border-radius: 50px;
  height: ${props => props.size}px;
`

const Ball = styled.div`
  height: 52px;
  width: 52px;
  border-radius: 52px;

  background-image: url(${props => SKINS[props.skin]});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  transform: ${props => {
    return `
      translateY(${props.size * props.x - 23.0}px)
      rotate(${540 * props.t}deg)`
  }};
`

class RollingMeter extends React.Component {
  static defaultProps = {
    skin: 'moon'
  }

  render() {
    return (
      <Meter size={this.props.height}>
        <Ball {...this.props} size={this.props.height} />
      </Meter>
    )
  }
}

export default RollingMeter
