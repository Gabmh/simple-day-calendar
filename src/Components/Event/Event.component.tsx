import moment from 'moment'
import { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import './Event.style.css'

const Event = ({ event }: { event: CalendarEvent }) => {
  return (
    <div className="event">
      {`event start: ${event.start} end: ${moment(event.start, 'HH:mm')
        .add(event.duration, 'minutes')
        .format('HH:mm')}`}
    </div>
  )
}

export default Event
