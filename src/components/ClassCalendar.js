import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const ClassCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default ClassCalendar;