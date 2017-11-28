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
      reasonForVisit: '',
      startDate: new Date(2017,16,11,9,0,0),
      endDate: new Date(2017,16,11,20,0,0),
      timeText: ''
    }
  }

  componentWillMount(){
    let localEvents = this.state.events
    let localStartTimes = []
    let event1 = {
      'title': 'Booked',
      'start': new Date(2017,10,29,9,0,0),
      'isBooked': true,
      'end': new Date(2017,10,29,10,0,0)
    }
    let event2 = {
      'title': 'Doctor Talgat',
      'start': new Date(2017,10,29,15,0,0),
      'end': new Date(2017,10,29,16,0,0),
      'isBooked': true,
      'desc': 'Check up'
    }
    localEvents.push(event1)
    localStartTimes.push(moment(event1.start).format('DD.MM.YYYY hh:mm'))
    localEvents.push(event2)
    localStartTimes.push(moment(event2.start).format('DD.MM.YYYY hh:mm'))
    this.setState({events: localEvents, startTimes: localStartTimes})
  }

  handleDateChange(newDate) {
    let eventTime = 'from ' + this.state.appointmentDate.format('HH:mm')
    let timeRef = this.state.appointmentDate
    eventTime+= ' to ' + timeRef.add(1, 'hours').format('HH:mm')
    this.setState({timeText: eventTime})
    this.setState({
      appointmentDate: newDate
    })
  }

  pushEvent(slotInfo) {
    let clickedEvent = moment(slotInfo.start).format('DD.MM.YYYY hh:mm')
    let localStartTimes = this.state.startTimes
    let result = localStartTimes.indexOf(clickedEvent)
    if (result != -1) {
      Bert.alert({
        title: 'This time is taken',
        message: 'Sorry, that timeslot is booked!',
        type: 'info',
        style: 'growl-top-right',
        icon: 'fa-clock-o'
      });
      return true
    }
    let event = {}
    event.title = 'My booking'
    event.start = slotInfo.start
    event.end = slotInfo.end
    this.setState({appointmentDate: moment(slotInfo.start)})
    let localEvents = this.state.events
    let eventTime = 'from ' + this.state.appointmentDate.format('HH:mm')
    let timeRef = this.state.appointmentDate
    eventTime+= ' to ' + timeRef.add(1, 'hours').format('HH:mm')
    this.setState({timeText: eventTime})
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
  }

  handleAppointmentSubmit(e) {
    e.preventDefault()
    console.log('Reason for visit: '+this.state.reasonForVisit);
    let appDate = this.state.appointmentDate
    console.log(moment(appDate).subtract({hours: 1}).format('DD.MM.YYYY hh:mm'))
  }

  renderCreateAppointmentArea() {
    if (this.state.creatingAppointment) {
      // console.log(this.state.appointmentDate.format('dd MM YYYY HH:mm'))

      return (
        <div className="col">
          <div className="card">
            <div className="card-header">
              Book Appointment
            </div>
            <div className="card-body">
              <h4 className="card-title">Please fill out this form</h4>
              <form onSubmit={this.handleAppointmentSubmit.bind(this)}>
                <div className="row">
                  <div className="col-xs-12 col-md-3">
                    <div className="form-group">
                      <label>Reason for visit:</label>
                      <textarea type="text" value={this.state.reasonForVisit}
                      onChange={(e)=>{
                        e.preventDefault();
                        this.setState({reasonForVisit: e.target.value})
                      }} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Desired time (please pick in Calendar):</label>
                      <input value={this.state.timeText}
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
                        min={this.state.startDate}
                        max={this.state.endDate}
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
