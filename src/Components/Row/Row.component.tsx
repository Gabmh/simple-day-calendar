import { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import Event from '../../Components/Event'
import './Row.style.css'

const Row = ({ events }: { events: CalendarEvent[] }) => {
  const sortedEventsByDuration = events.sort((a, b) => (a.duration > b.duration ? -1 : 1))

  return (
    <div className="row">
      {sortedEventsByDuration.map((event, index) => (
        <Event key={`event-${index}`} event={event} />
      ))}
    </div>
  )
}

export default Row
