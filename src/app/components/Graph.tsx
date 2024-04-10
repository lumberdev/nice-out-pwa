'use client'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Background from './Background'
import { useGlobalContext } from '@/lib/GlobalContext'
import { graphTempColorStops } from '@/utils'
import LinearGradient from './LinearGradient'
import moment from 'moment'
import { roundToNearestHours } from 'date-fns/roundToNearestHours'
import { formatISO } from 'date-fns/formatISO'
import { isWithinInterval } from 'date-fns/isWithinInterval'
import { isSameDay } from 'date-fns/isSameDay'
import WeatherIcon from './Icon'

const Graph = () => {
  const { graphData, weatherData } = useGlobalContext()
  const mainChart = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [timestamp, setTimestamp] = useState<{
    time: string
    meridiem: string
    summary: string
    icon: number
  }>({
    time: '10:40',
    meridiem: 'AM',
    summary: 'Sunny',
    icon: 2,
  })
  const [isItDay, setIsItDay] = useState(true)
  const [temperature, setTemperature] = useState(0)

  const [graphSize, setGraphSize] = useState({
    width: 0,
    height: 0,
    popHeight: 0,
  })
  const hasD = !!lineRef.current?.getAttribute('d')
  const handleAnimation = useCallback(() => {
    if (
      !lineRef.current ||
      !hasD ||
      !circleRef.current ||
      !graphData ||
      !weatherData ||
      !groupRef.current
    ) {
      return
    }
    const scrollX = containerRef.current?.scrollLeft ?? 0
    const { width: lineWidth } = lineRef.current.getBoundingClientRect()
    const progress = Math.min(Math.max(scrollX / lineWidth, 0), 1)
    const totalLength = lineRef.current.getTotalLength()
    const { x, y } = lineRef.current.getPointAtLength(progress * totalLength)

    circleRef.current.setAttribute('cx', x.toString())
    circleRef.current.setAttribute('cy', y.toString())
    groupRef.current.setAttribute('transform', `translate(${x + 6}, ${y - 40})`)
    const { scaleX, scaleY, formattedSevenDayHourly, dayBreaks } = graphData
    const timestamp = scaleX.invert(x)
    const roundedTimestamp = formatISO(roundToNearestHours(timestamp)).slice(
      0,
      -6,
    )
    const activeDay = formattedSevenDayHourly.find((day) =>
      day.get(roundedTimestamp),
    )
    const currentData = activeDay?.get(roundedTimestamp)

    const temperature = scaleY.invert(y)
    const { timezone } = weatherData

    const currentDayBreaks = dayBreaks.find(({ currentDay }) =>
      isSameDay(currentDay, roundedTimestamp),
    )
    if (currentDayBreaks) {
      const isItDay = isWithinInterval(timestamp, {
        start: currentDayBreaks.twilight.sunrise.fullSunriseTime,
        end: currentDayBreaks.twilight.sunset.fullSunsetTime,
      })
      setIsItDay(isItDay)
    }
    setTimestamp({
      time: moment(timestamp).tz(timezone).format('hh:mm'),
      meridiem: moment(timestamp).tz(timezone).format('A'),
      summary: currentData?.summary ?? '',
      icon: currentData?.icon ?? 0,
    })
    setTemperature(temperature)
  }, [graphData, hasD, weatherData])

  useEffect(() => {
    handleAnimation()
  }, [handleAnimation])

  useEffect(() => {
    if (!graphData) return
    const { GRAPH_WIDTH, GRAPH_HEIGHT, GRAPH_POP_HEIGHT } = graphData
    setGraphSize({
      width: GRAPH_WIDTH,
      height: GRAPH_HEIGHT,
      popHeight: GRAPH_POP_HEIGHT,
    })
  }, [graphData])

  if (!graphData) return null

  return (
    <>
      <div
        onScroll={handleAnimation}
        ref={containerRef}
        className='h-full flex flex-col justify-end bg-grey-700 relative overflow-x-scroll'
      >
        <svg
          className='absolute bottom-0 left-0 z-0'
          width={graphSize.width}
          height={graphSize.height + graphSize.popHeight}
        >
          {/* Day breaks + sunrise and sunset lines */}
          {graphData.dayBreaks.map((dayBreak, index) => {
            return (
              <Fragment key={dayBreak.xValue}>
                {dayBreak.xValue > window.innerWidth / 2 && (
                  <line
                    key={index}
                    x1={dayBreak.xValue - 1}
                    x2={dayBreak.xValue - 1}
                    y1={graphSize.height + graphSize.popHeight}
                    y2={dayBreak.yValue}
                    stroke='rgba(255, 255, 255, 0.8)'
                    strokeWidth={2}
                  />
                )}
                {dayBreak.twilight.sunrise.x > window.innerWidth / 2 && (
                  <g transform={`translate(${dayBreak.twilight.sunrise.x}, 0)`}>
                    <line
                      y1={graphSize.height + graphSize.popHeight}
                      y2={dayBreak.twilight.sunrise.y}
                      stroke='rgba(255, 255, 255, 0.8)'
                      strokeDasharray={5}
                      strokeWidth={2}
                    />
                    <text
                      x={25}
                      y={dayBreak.twilight.sunrise.y - 10}
                      className='text-sm font-bold tracking-wider fill-white/75'
                    >
                      {dayBreak.twilight.sunrise.time}
                    </text>
                    <WeatherIcon
                      icon={'sunrise'}
                      x={-12.5}
                      y={dayBreak.twilight.sunrise.y - 25}
                      width={'100%'}
                      height={'100%'}
                    />
                  </g>
                )}
                {dayBreak.twilight.sunset.x > window.innerWidth / 2 && (
                  <g transform={`translate(${dayBreak.twilight.sunset.x}, 0)`}>
                    <line
                      y1={graphSize.height + graphSize.popHeight}
                      y2={dayBreak.twilight.sunset.y}
                      stroke='rgba(255, 255, 255, 0.8)'
                      strokeDasharray={5}
                      strokeWidth={2}
                    />
                    <text
                      x={25}
                      y={dayBreak.twilight.sunset.y - 10}
                      className='text-sm font-bold tracking-wider fill-white/75'
                    >
                      {dayBreak.twilight.sunset.time}
                    </text>
                    <WeatherIcon
                      icon={'sunset'}
                      x={-12.5}
                      y={dayBreak.twilight.sunset.y - 25}
                      width={'100%'}
                      height={'100%'}
                    />
                  </g>
                )}
              </Fragment>
            )
          })}
        </svg>

        {/* Temp Chart */}
        <svg
          ref={mainChart}
          width={graphSize.width}
          height={graphSize.height}
          viewBox={`0 0 ${graphSize.width} ${graphSize.height}`}
        >
          <path
            ref={lineRef}
            d={graphData.graphTemp.tempLinePath ?? ''}
            className='invisible'
          />

          <path
            d={graphData.graphTemp.path ?? ''}
            fill={'url(#chart-gradient)'}
            id='graph-path'
          />

          <LinearGradient id='chart-gradient' stops={graphTempColorStops} />
          <circle
            r='6'
            ref={circleRef}
            fill='white'
            stroke='rgba(255, 255, 255, 0.3)'
            strokeWidth={8}
          />
          <g ref={groupRef} fill='white'>
            <WeatherIcon
              icon={timestamp.icon}
              x={0}
              y={-40}
              width={'100%'}
              height={'100%'}
            />
            <text x={0} y={0} textLength={40}>
              {timestamp.time}
            </text>
            <text x={42} y={-6} className='text-3xs'>
              {timestamp.meridiem}
            </text>
            <text x={0} y={20} className='text-2xs'>
              {timestamp.summary}
            </text>
          </g>
        </svg>
        {/* POP Chart */}
        <svg
          width={graphSize.width}
          height={graphSize.popHeight}
          viewBox={`0 0 ${graphSize.width} ${graphSize.popHeight}`}
        >
          <path
            d={graphData.graphPop.path ?? ''}
            fill={'url(#chart-pop-gradient)'}
            id='graph-pop-path'
          />
          <LinearGradient id='chart-pop-gradient' stops={graphTempColorStops} />
        </svg>
        <Background
          icon={timestamp.icon}
          id='chart-bg-gradient'
          isItDay={isItDay}
        />
      </div>
    </>
  )
}

export default Graph
