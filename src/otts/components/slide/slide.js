import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import cx from 'classnames'

class Slide extends Component {
  static defaultProps = {
    width: 1066,
    height: 600,
    centered: false
  }

  render() {
    const slideStyle = {
      width: this.props.width,
      height: this.props.height
    }

    const { background, backgroundImage } = this.props
    let backElement = null

    if (backgroundImage) {
      backElement = <SlideBackground image={backgroundImage} />
    }

    if (background && typeof background === 'string') {
      backElement = <SlideBackground background={background} />
    }

    console.log(background)
    if (background && typeof background === 'object') {
      backElement = <SlideBackground>{background}</SlideBackground>
    }

    return (
      <SlideCard style={slideStyle}>
        {backElement}

        <SlideContent
          className={cx(this.props.extraClass, this.props.className)}
          clickThrough={this.props.clickThrough}
          centered={this.props.centered}
          fade={this.props.backgroundFade}
        >
          {this.props.children}
        </SlideContent>
      </SlideCard>
    )
  }
}

const SlideCard = styled.div`
  overflow: hidden;
  box-shadow: 0px 5px 16px -2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  background: white;
`

const SlideBackground = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  ${props =>
    props.image &&
    css`
      background-image: url(${props.image});
    `};

  ${props =>
    props.background &&
    css`
      background: ${props.background};
    `};
`

const SlideContent = styled.div`
  position: relative;
  background: ${props => `rgba(0,0,0,${props.fade})`};
  z-index: 2;

  width: 100%;
  height: 100%;
  overflow: hidden;

  ${props => props.clickThrough && 'pointer-events: none;'} ${props =>
      props.centered &&
      `
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    `};
`

export default Slide
