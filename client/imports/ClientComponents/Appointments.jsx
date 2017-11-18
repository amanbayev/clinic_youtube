import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { AppointmentsCollection } from '/imports/api/AppointmentsCollection'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'

BigCalendar.momentLocalizer(moment);

class Appointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatingAppointment: true,
      appointmentDate: moment(),
      events: [],
      hasCustomEvents: false,
      clickedBookedEvent: false
    }
  }
  componentWillMount(){
    let localEvents = this.state.events
    localEvents.push({
      'title': 'Booked',
      'start': new Date(2017,10,15,9,0,0),
      'isBooked': true,
      'end': new Date(2017,10,15,11,0,0)
    })
    localEvents.push({
      'title': 'Doctor Talgat',
      'start': new Date(2017,10,15,15,0,0),
      'end': new Date(2017,10,15,17,0,0),
      'isBooked': true,
      desc: 'Check up'
    })
    this.setState({events: localEvents})
  }
  handleDateChange(newDate) {
    this.setState({
      appointmentDate: newDate
    })
  }
  pushEvent(slotInfo) {

    if (this.state.clickedBookedEvent) {
      this.setState({clickedBookedEvent: false})
      return true
    }
    let event = {}
    event.title = 'My booking'
    event.start = slotInfo.start
    event.end = slotInfo.end
    this.setState({appointmentDate: moment(slotInfo.start)})
    let localEvents = this.state.events

    if (this.state.hasCustomEvents)
      localEvents.pop()
    else
      this.setState({hasCustomEvents:true})
    localEvents.push(event)
    this.setState({events: localEvents})
  }
  eventPropGetter(event, start, end, isSelected) {
    let classForEvent = ''
    let styleForEvent = {}
    if (event.isBooked) {
      classForEvent += ' booked'
      styleForEvent = {backgroundColor: '#c91f37'}
    }
    let response = {
      className: classForEvent,
      style: styleForEvent
    }
    return response
  }
  bookedTimeslotClick(e) {
    Bert.alert({
      title: 'This time is taken',
      message: 'Sorry, that timeslot is booked!',
      type: 'info',
      style: 'growl-top-right',
      icon: 'fa-clock-o'
    });
    this.setState({bookedTimeslotClick: true})
  }
  renderCreateAppointmentArea() {
    if (this.state.creatingAppointment) {
      let startDate = new Date(2017,16,11,9,0,0)
      let endDate = new Date(2017,16,11,20,0,0)
      let eventTime = 'from ' + this.state.appointmentDate.format('HH:mm')
      eventTime+= ' to ' + this.state.appointmentDate.add(1, 'hours').format('HH:mm')
      return (
        <div className="col">
          <div className="card">
            <div className="card-header">
              Book Appointment
            </div>
            <div className="card-body">
              <h4 className="card-title">Please fill out this form</h4>
              <form>
                <div className="row">
                  <div className="col-xs-12 col-md-3">
                    <div className="form-group">
                      <label>Reason for visit:</label>
                      <textarea type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Desired time (please pick in Calendar):</label>
                      <input value={eventTime}
                        type="text" className="form-control" readOnly={true}/>
                    </div>
                    <div className="form-group">
                      <label>Desired date:</label>
                      <DatePicker
                        className="form-control"
                        selected={this.state.appointmentDate}
                        dateFormat="DD MMM YYYY"
                        onChange={this.handleDateChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                      <label>Patient phone #:</label>
                      <input type="phone" className="form-control" value="700 177 0777" readOnly={true}/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-9">
                    <div className="form-group">
                      <label>Desired appointment date:</label>
                      <BigCalendar
                        events={this.state.events}
                        min={startDate}
                        max={endDate}
                        startAccessor='start'
                        defaultView='week'
                        views={['week']}
                        endAccessor='end'
                        step={60}
                        date={this.state.appointmentDate.toDate()}
                        onNavigate={()=>{console.log('somehow navigated')}}
                        eventPropGetter={this.eventPropGetter.bind(this)}
                        toolbar={false}
                        selectable
                        onSelectEvent={this.bookedTimeslotClick.bind(this)}
                        onSelectSlot={this.pushEvent.bind(this)}
                        timeslots={1}
                        defaultView='week'
                      />
                    </div>
                  </div>
                </div>


                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">Request booking</button>
                  <button className="btn btn-secondary" onClick={(e)=>(this.setState({creatingAppointment: false}))}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-md-6">
          <button className="btn btn-success" onClick={(e)=>(this.setState({creatingAppointment: true}))}>Request New Appointment</button>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="row">
        {this.renderCreateAppointmentArea()}

      </div>
    )
  }
}

export default withTracker(props => {
  const loggingIn = Meteor.loggingIn()
  const user = Meteor.user()
  const appointmentsSubscription = Meteor.subscribe("AppointmentsCollection");
  const allReady = appointmentsSubscription.ready() && !loggingIn && user
  const loading = allReady ? !allReady : true

  return {
    loading,
    appointments: AppointmentsCollection.find().fetch()
  }
})(Appointments)
