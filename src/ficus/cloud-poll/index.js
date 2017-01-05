import React from 'react'
import _ from 'lodash'

import { select as d3select } from 'd3-selection'
import { sum as d3sum } from 'd3-array'
import { easeCubic, easeBack, easeElastic } from 'd3-ease'
import 'd3-transition'

import './cloud-poll.scss'

function safeFraction (a, b) {
  if (b === 0) return 0
  return (a / b)
}

const NAME_WIDTH = 350
const BARS_MARGIN = 15
const BAR_MIN_VALUE = 0.05

const BALLS_ANIM_DURATION = 1000
const REORDER_ANIM_DURATION = 500
const BAR_GROW_ANIM_DURATION = 500

class CloudPoll extends React.Component {
  render () {
    const { poll } = this.props
    const votesText = 'votes on'

    const cloudPollStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    }

    return (
      <div className='cloud-poll' style={cloudPollStyle} ref={n => { this.$el = n }}>
        <div className='cloud-poll__poll-question'>{poll.title}</div>
        <div className='cloud-poll__balls-container' ref={n => { this.$ballsContainer = n }} />
        <div className='cloud-poll__cloud-poll-layout'>
          <div className='cloud-poll__contenders' ref={n => { this.$contenders = n }} />
          <div className='cloud-poll__summary'>
            <div className='cloud-poll__already-voted'>
              <div className='cloud-poll__number' ref={n => { this.$alreadyVotedNumber = n }}>
                {poll.votersCount}
              </div>
              <div className='cloud-poll__label'>{votesText}</div>
              <div className='cloud-poll__label-link'>{poll.url}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---
  // Считает, кто на сколько поменялся
  // [
  //   { name: 'Obama', id: 1, count: 3 },
  //   { name: 'Hillary', id: 2, count: -2 }
  // ]
  // ---
  votersDiff (prevProps) {
    if (!prevProps || !prevProps.poll) {
      return []
    }

    const poll = this.props.poll
    const pollWas = prevProps.poll

    let diff = []

    for (const choiceId in poll.results) {
      const d = (poll.results[choiceId].votes - pollWas.results[choiceId].votes) || 0

      if (d !== 0) {
        diff.push({
          id: choiceId,
          count: d
        })
      }
    }

    return diff
  }

  // ---
  // Высчитывает верхнюю границу для значений голосовалки
  // ---
  calcBoundary (max) {
    return 10 * Math.ceil(max / 10)
  }

  componentDidMount () {
    this.updateVotes()
  }

  componentDidUpdate (prevProps) {
    this.updateVotes(prevProps)
  }

  // Позволяет вычислить offset относительно контейнера опроса
  // Работает, если график был трансформирован через transform
  relativeOffset (el) {
    let x = 0
    let y = 0

    const detectClass = this.props.offsetContainerClass

    while (el && el.className.indexOf(detectClass) === -1) {
      x += el.offsetLeft
      y += el.offsetTop
      el = el.offsetParent
    }

    return [ x, y ]
  }

  updateVotes (prevProps) {
    const { poll, alphaTime } = this.props
    const prevPoll = prevProps ? prevProps.poll : null

    const newVotes = this.votersDiff(prevProps)

    const contendersHeight = this.$contenders.offsetHeight
    const contendersWidth = this.$contenders.offsetWidth

    const barMaxWidth = contendersWidth - NAME_WIDTH - 20

    const entries = _.sortBy(
      poll.choices.map(c => ({ ...c, count: poll.results[c.id].votes })),
      d => -d.votes)

    let root = d3select(this.$contenders)

    let ballsEnter = d3select(this.$ballsContainer)
      .selectAll('.cloud-poll__ball')
      .data(newVotes, d => `${d.id} ${d.count}`)
      .enter()
      .append('div')
      .attr('class', 'cloud-poll__ball')

    ballsEnter
      .transition()
      .duration(alphaTime * BALLS_ANIM_DURATION)
      .delay((d, i) => alphaTime * 100 * i)
      .attrTween('style', (d, i) => {
        return (t) => {
          let aEl = this.$alreadyVotedNumber
          let bEl = this.$el.querySelector(`[data-id="${d.id}"] .cloud-poll__entry-count`)

          if (!aEl || !bEl) {
            return
          }

          const aOffset = this.relativeOffset(aEl)
          const bOffset = this.relativeOffset(bEl)

          const aX = aOffset[0] + 0.5 * aEl.offsetWidth
          const aY = aOffset[1] + 0.5 * aEl.offsetHeight

          const bX = bOffset[0] + 0.5 * bEl.offsetWidth
          const bY = bOffset[1] + 0.5 * bEl.offsetHeight

          let tx = easeCubic(t)
          let ty = t

          if (d.count < 0) {
            tx = 1 - tx
            ty = 1 - ty
          }

          const x = aX + (bX - aX) * tx
          const y = aY + (bY - aY) * ty

          const CP_1 = 0.2
          const CP_2 = 0.01

          let scale = 1.0
          let opacity = 1.0

          if (t >= 0 && t <= CP_1) {
            opacity = (t / CP_1)
            scale = opacity
          }

          if (t >= (1.0 - CP_2) && t <= 1.0) {
            opacity = 1 - ((t - (1.0 - CP_2)) / CP_2)
            scale = opacity
          }

          let transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale}, ${scale})`

          return `
             opacity: ${opacity};
             transform: ${transform};
             -webkit-transform: ${transform};
          `
        }
      })
      .remove()

    // Анимируем взрывающиеся шарики с количество проголосовавших
    const scaleTween = (a, b) => {
      return (t) => {
        let x = a + (b - a) * t
        return `transform: scale(${x}, ${x})`
      }
    }

    ballsEnter.each((data, i) => {
      let optionId = data.id

      let entrySelect = root.select(`.cloud-poll__entry[data-id="${optionId}"]`)

      const scaleRatio = 1.3

      entrySelect.select('.cloud-poll__entry-count')
        .transition()
        .delay(data.count > 0
          ? alphaTime * 600 + alphaTime * 100 * i : 0)
        .duration(alphaTime * 300)
        .ease(easeBack)
        .attrTween('style', (d, i) => { return scaleTween(1.0, scaleRatio) })
        .on('end', function () {
          d3select(this)
            .transition()
            .duration(alphaTime * 600)
            .ease(easeElastic)
            .attrTween('style', () => scaleTween(scaleRatio, 1.0))
        })
    })

    const allVotes = entries.map(e => e.count)
    let max = this.calcBoundary(Math.max(...allVotes))

    // Flash counter animation
    if (prevPoll && prevPoll.votersCount && prevPoll.votersCount !== poll.votersCount) {
      this.$alreadyVotedNumber.classList.remove('cloud-poll__flash-animation')
      setTimeout(() => { this.$alreadyVotedNumber.classList.add('cloud-poll__flash-animation') }, 0)
    }

    let entry = root
      .selectAll('.cloud-poll__entry')
      .data(entries, e => e.id)

    let barWidthFunc = (d, i) => {
      let x = safeFraction(d.count, max)

      let bmin = BAR_MIN_VALUE * barMaxWidth
      let w = bmin + (barMaxWidth - bmin) * x
      let r = `${w.toFixed(0)}px`

      return r
    }

    let entryEnter = entry.enter()
      .append('div')
      .attr('class', 'cloud-poll__entry')
      .attr('data-id', (d) => d.id)
      .html(d => (
        `
          <div class="cloud-poll__entry-name">${d.text}</div>
          <div class="cloud-poll__entry-votes" style="width: ${barWidthFunc(d)}"></div>
          <div class="cloud-poll__entry-count">${d.count}</div>
        `
      ))

    entry.exit().remove()

    let elemHeights = []
    root.selectAll('.cloud-poll__entry').each(function () {
      elemHeights.push(this.offsetHeight)
    })

    let positionFunc = (d, i) => {
      let fullHeight = d3sum(elemHeights, (h) => h + BARS_MARGIN)
      let elemOffset = d3sum(elemHeights.slice(0, i), (h) => h + BARS_MARGIN)

      let y = 0.5 * contendersHeight - 0.5 * fullHeight + elemOffset
      return `${y}px`
    }

    entryEnter
      .style('top', positionFunc)

    entry.select('.cloud-poll__entry-votes')
      .transition()
      .delay(alphaTime * BALLS_ANIM_DURATION)
      .duration(alphaTime * BAR_GROW_ANIM_DURATION)
      .style('width', barWidthFunc)

    entry
      .transition()
      .duration(alphaTime * REORDER_ANIM_DURATION)
      .delay(alphaTime * (BALLS_ANIM_DURATION + BAR_GROW_ANIM_DURATION))
      .style('top', positionFunc)

    entry.select('.cloud-poll__entry-count')
      .transition('text-trans')
      .delay(alphaTime * BALLS_ANIM_DURATION)
      .text((d) => d.count)
  }
}

CloudPoll.defaultProps = {
  alphaTime: 1.4,
  width: 1024,
  height: 768,
  offsetContainerClass: 'playground__poll'
}

export default CloudPoll
