import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./ClassCalendar.css"
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
const localizer = momentLocalizer(moment)
const propTypes = {}

function Event({ event }) {
  return (
    <span>
      <strong>{event.title + ": "}</strong>
      <a href={event.link} style={{color: "red"}}>{event.link}</a>
    </span>
  )
}

function EventAgenda({ event }) {
  return (
    <span>
      <strong>{event.title +": "}</strong>
      <a href={event.link} style={{color: "red"}}>{event.link}</a>
    </span>
  )
}

class ClassCalendar extends React.Component {
  constructor(...args) {
    super(...args)
    this.onEventSave = this.props.onEventSave;
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    const link = window.prompt('Enter Class Link')
    if (title)
      this.onEventSave([
        ...this.props.events,
        {
          start,
          end,
          title,
          link
        },
      ])
  }

  render() {
    return (
      <div>
        <TopBar></TopBar>
        <SideBar messages={this.props.messages} />
        <Calendar
          selectable
          localizer={localizer}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          onSelectEvent={event => alert(event.title + " : " + event.link)}
          onSelectSlot={this.handleSelect}
          style={{ height: 500, marginLeft: 340 }}
          scrollToTime
          components={{
            event: Event,
            agenda: {
              event: EventAgenda,
            },
          }
        }
        />
      </div>
    )
  }
}

ClassCalendar.propTypes = propTypes

export default ClassCalendar;