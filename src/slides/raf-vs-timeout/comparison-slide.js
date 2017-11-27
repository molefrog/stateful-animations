import React, { Component } from 'react'
import styled from 'styled-components'

import { Slide } from 'otts'
import colors from 'colors'
import TimelineWithMeter from './timeline-with-meter'

// default discrete step
const step = 0.025

// sin func but gets from 0 to 1
const timingFunc = t => 0.5 + 0.3 * Math.sin(8 * t)

class ComparisonSlide extends Component {
  constructor() {
    super()
    this.state = { currentTime: 0.0 }
  }

  static defaultProps = {
    comparedMethod: 'naive'
  }

  handleCursorChange = cursor => {
    this.setState({ currentTime: cursor })
  }

  render() {
    const numberOfIterations = Math.ceil(1 / step)

    const normalScale = Array(numberOfIterations)
      .fill(0)
      .map((_, index) => {
        return [index * step, 0.0]
      })

    const rafScale = (() => {
      let buffer = []
      let x = 0.0
      let delay = 0.0

      while (x <= 1.0) {
        // carefuly crafted params
        const maxDeviation = 0.09
        const startFrom = 0.05

        buffer.push([x, delay / maxDeviation])

        // Add some arificial delay,
        // but only after `startFrom`.
        const shift = Math.abs(maxDeviation * Math.sin(6 * (x - startFrom)))
        delay = x > startFrom ? shift : 0.0

        x += step + delay
      }

      return buffer
    })()

    const idealGraph = normalScale.map(t => [t[0], timingFunc(t[0])])
    const rafGraph = rafScale
      .filter(t => t[0] <= 1)
      .map(t => [t[0], timingFunc(t[0]), t[1]])

    const timeoutGraph = (scale => {
      let points = []
      let lastValue = 0.0

      scale.forEach(tt => {
        const [t, delay] = tt
        points.push([t, timingFunc(lastValue), delay])
        lastValue += step
      })

      return points
    })(rafScale)

    // Common props for all timelines
    const timelineProps = {
      size: 360,
      onCursorMove: this.handleCursorChange,
      time: this.state.currentTime
    }

    const comparedMethod = this.props.comparedMethod

    return (
      <SlideLayout {...this.props}>
        <SlideContent>
          <AnimationMethod>
            <TimelineWithMeter
              points={idealGraph}
              skin="sun"
              {...timelineProps}
            />

            <AnimationDetails>
              <AnimationHeader>Идеальная анимация</AnimationHeader>
              <AnimationText>
                Плавная, работает через равные промежутки времени
              </AnimationText>
            </AnimationDetails>
          </AnimationMethod>

          {comparedMethod === 'raf' && (
            <AnimationMethod>
              <TimelineWithMeter
                points={rafGraph}
                skin="sun"
                {...timelineProps}
              />

              <AnimationDetails>
                <AnimationHeader>rAF + дельта</AnimationHeader>
                <AnimationText>
                  Учитываем разницу во времени. <b>Пропускаем кадры</b>, но
                  успеваем!
                </AnimationText>
              </AnimationDetails>
            </AnimationMethod>
          )}
          {comparedMethod === 'naive' && (
            <AnimationMethod>
              <TimelineWithMeter
                points={timeoutGraph}
                skin="moon"
                {...timelineProps}
              />

              <AnimationDetails>
                <AnimationHeader>Наивный метод</AnimationHeader>
                <AnimationText>
                  Забыли, что шаг переменный = анимация «тормозит»
                </AnimationText>
              </AnimationDetails>
            </AnimationMethod>
          )}
        </SlideContent>
      </SlideLayout>
    )
  }
}

/*
 * Styling and stuff
 */

const SlideLayout = styled(Slide)`
  display: flex;
  align-items: center;
`

const SlideContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const AnimationMethod = styled.div`
  margin: 0 30px;
  text-align: center;
`

const AnimationDetails = styled.div`
  padding: 0 40px;
`

const AnimationText = styled.div`
  font-size: 20px;
  color: ${colors.textGray};
  max-width: 340px;
  margin: 0 auto;
  line-height: 1.4;
`

const AnimationHeader = styled.div`
  font-size: 24px;
  margin-top: 18px;
  margin-bottom: 12px;
`

export default ComparisonSlide
