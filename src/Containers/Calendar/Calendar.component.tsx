import React from 'react'
import useFetchEvents, { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import moment from 'moment'

const Calendar = () => {
  const events = useFetchEvents()
  let lastStartDate = moment('09:00', 'HH:mm')
  let lastEndDate = moment('09:00', 'HH:mm')
  const record = events.reduce((acc, event) => {
    const startDate = moment(event.start, 'HH:mm')

    let calendarMap = {} as Record<string, CalendarEvent[]>
    if (lastEndDate.isSameOrBefore(startDate)) {
      lastStartDate = startDate.clone()
      calendarMap = { ...acc, [event.start]: [event] }
    } else {
      const key = lastStartDate.format('HH:mm')
      calendarMap = { ...acc, [key]: [...acc[key], event] }
    }

    lastEndDate = startDate.clone().add(event.duration, 'minutes')

    return calendarMap
  }, {} as Record<string, CalendarEvent[]>)
  return (
    <div className="calendar">
      {Object.values(record).map((events, index) => (
        <div key={`row-${index}`}>{`row ${index}, nb event ${events.length}`}</div>
      ))}
    </div>
  )
}

export default Calendar
