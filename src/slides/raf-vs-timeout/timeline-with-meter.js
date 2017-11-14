import React from 'react'
import styled from 'styled-components'

import Timeline from './timeline'
import RollingMeter from './rolling-meter'

const TMLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  > div {
    margin-left: 12px;
  }
`

const TimelineWithMeter = props => {
  const { size, ...rest } = props
  const { points, time } = rest

  const filtered = points.filter(p => p[0] <= time)

  // find the current value
  const currentPoint = filtered.length
    ? filtered[filtered.length - 1]
    : [0.0, 0.0]

  return (
    <TMLayout>
      <Timeline width={1.05 * size} height={size} {...rest} />
      <RollingMeter
        skin={props.skin}
        x={currentPoint[1]}
        t={currentPoint[0]}
        height={size}
      />
    </TMLayout>
  )
}

export default TimelineWithMeter
