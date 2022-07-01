import moment from 'moment'
import { CalendarEvent } from '../../Hooks/Events/useFetchEvents'
import './Event.style.css'
import { getDimension } from '../../Utils/windowHeight'

const Event = ({ event, groupStart }: { event: CalendarEvent; groupStart: string }) => {
  const top = getDimension(
    moment(event.start, 'HH:mm').diff(moment(groupStart, 'HH:mm'), 'minutes')
  )
  const height = getDimension(event.duration)
  return (
    <div className="container">
      <div style={{ height: top }}></div>
      <div className="event" style={{ height }}>
        {`id: ${event.id} (${event.start} - ${event.end})`}
      </div>
    </div>
  )
}

export default Event
