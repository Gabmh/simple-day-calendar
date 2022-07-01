import input from '../../input.json'

export interface CalendarEvent {
  id: number
  start: string
  duration: number
}

const useFetchEvents = (): CalendarEvent[] => {
  return input.sort((a, b) => (a.start > b.start ? 1 : -1))
}

export default useFetchEvents
