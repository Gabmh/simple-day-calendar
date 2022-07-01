import { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import Event from '../../Components/Event'
import './Row.style.css'

const Row = ({ events, groupStart }: { events: CalendarEvent[]; groupStart: string }) => {
  const sortedEventsByDuration = events.sort((a, b) => (a.duration > b.duration ? -1 : 1))
  return (
    <div className="row">
      {sortedEventsByDuration.map((event, index) => (
        <Event key={`event-${index}`} event={event} groupStart={groupStart} />
      ))}
    </div>
  )
}

export default Row
