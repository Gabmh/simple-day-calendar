import React from 'react'
import useFetchEvents, { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import moment from 'moment'
import Row from '../../Components/Row'

const Calendar = () => {
  const events = useFetchEvents()

  let lastStartDate = moment('08:00', 'HH:mm')
  let lastEndDate = moment('08:00', 'HH:mm')

  const record = events.reduce((acc, event) => {
    const startDate = moment(event.start, 'HH:mm')
    const endDate = startDate.clone().add(event.duration, 'minutes')

    let calendarMap = {} as Record<string, CalendarEvent[]>
    if (lastEndDate.isSameOrBefore(startDate)) {
      lastStartDate = startDate.clone()
      calendarMap = { ...acc, [event.start]: [event] }
    } else {
      const key = lastStartDate.format('HH:mm')
      calendarMap = { ...acc, [key]: [...acc[key], event] }
    }
    if (endDate > lastEndDate) lastEndDate = endDate

    return calendarMap
  }, {} as Record<string, CalendarEvent[]>)

  return (
    <div className="calendar">
      {Object.values(record).map((events, index) => (
        <Row key={`row-${index}`} events={events} />
      ))}
    </div>
  )
}

export default Calendar
