import React from 'react'
import { interpolateRgb } from 'd3-interpolate'

import colors from 'colors'

const interpolateDot = interpolateRgb(colors.green, colors.yellow)

const Timeline = ({ time, points, onCursorMove, ...props }) => {
  const barsCount = 10

  return (
    <svg
      viewBox="0 0 1 1"
      baseProfile="full"
      onMouseOut={() => onCursorMove(1.0)}
      onMouseMove={event => {
        const svg = event.currentTarget
        const rect = svg.getBoundingClientRect()

        const width = event.currentTarget.clientWidth
        const delta = (event.clientX - rect.left) / width

        onCursorMove(delta)
      }}
      {...props}
    >
      {barsCount &&
        Array(barsCount)
          .fill()
          .map((_, index) => {
            const y = index / barsCount

            return (
              <line
                key={index}
                x1={0}
                y1={y}
                x2={1}
                y2={y}
                strokeWidth={0.005}
                stroke={colors.gray}
                opacity={0.15}
              />
            )
          })}

      {points.map((point, idx) => {
        if (!idx) return false

        const prevPoint = points[idx - 1]
        const t = point[0]
        return (
          <line
            key={prevPoint[0]}
            x1={prevPoint[0]}
            y1={prevPoint[1]}
            x2={point[0]}
            y2={point[1]}
            strokeWidth={0.01}
            stroke={colors.gray}
            opacity={t <= time ? 1.0 : 0.2}
          />
        )
      })}

      {points.map(point => {
        let [x, y, throttleFactor] = point
        throttleFactor = throttleFactor || 0.0

        return (
          <circle
            key={x}
            cx={x}
            cy={y}
            r={0.015}
            fill={interpolateDot(throttleFactor)}
            opacity={point[0] <= time ? 1.0 : 0.15}
          />
        )
      })}
    </svg>
  )
}

export default Timeline
