import React from 'react'
import useFetchEvents, { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import moment from 'moment'
import Row from '../../Components/Row'

const Calendar = () => {
  const events = useFetchEvents()

  let lastEventEnd = moment('08:00', 'HH:mm')
  let lastGroupEnd = '09:00'
  let actualGroupEnd = '09:00'

  const record = events.reduce((acc, event) => {
    const startDate = moment(event.start, 'HH:mm')
    const endDate = startDate.clone().add(event.duration, 'minutes')

    let calendarMap = {} as Record<string, CalendarEvent[]>
    if (lastEventEnd.isSameOrBefore(startDate)) {
      lastGroupEnd = actualGroupEnd
      actualGroupEnd = event.end
      calendarMap = { ...acc, [lastGroupEnd]: [event] }
    } else {
      calendarMap = { ...acc, [lastGroupEnd]: [...acc[lastGroupEnd], event] }
      actualGroupEnd = acc[lastGroupEnd].reduce((prev, current) =>
        moment(prev.end, 'HH:mm').isAfter(moment(current.end, 'HH:mm')) ? prev : current
      ).end
    }
    if (endDate > lastEventEnd) lastEventEnd = endDate

    return calendarMap
  }, {} as Record<string, CalendarEvent[]>)

  return (
    <div className="calendar">
      {Object.entries(record).map(([key, events]) => (
        <Row key={`row-${key}`} events={events} groupStart={key} />
      ))}
    </div>
  )
}

export default Calendar
