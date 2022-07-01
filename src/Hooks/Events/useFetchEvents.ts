import moment from 'moment'
import input from '../../input.json'

export interface CalendarEvent {
  id: number
  start: string
  end: string
  duration: number
}

const useFetchEvents = (): CalendarEvent[] => {
  const events = input.map(item => ({
    ...item,
    end: moment(item.start, 'HH:mm').add(item.duration, 'minutes').format('HH:mm'),
  }))
  return events.sort((a, b) => (a.start > b.start ? 1 : -1))
}

export default useFetchEvents
