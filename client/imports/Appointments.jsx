import React, { Component } from 'react'

class Appointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatingAppointment: false
    }
  }
  renderCreateAppointmentArea() {
    if (this.state.creatingAppointment) {
      return (
          <div className="card">
            <div className="card-header">
              Book Appointment
            </div>
            <div className="card-body">
              <h4 className="card-title">Please fill out this form</h4>
              <form>
                <div className="form-group">
                  <label>Reason for visit:</label>
                  <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Desired date:</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Patient phone #:</label>
                  <input type="phone" className="form-control" value="700 177 0777" readOnly={true}/>
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">Request booking</button>
                  <button className="btn btn-secondary" onClick={(e)=>(this.setState({creatingAppointment: false}))}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
      )
    } else {
      return (
        <button className="btn btn-success" onClick={(e)=>(this.setState({creatingAppointment: true}))}>Request New Appointment</button>
      )
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          {this.renderCreateAppointmentArea()}
        </div>
      </div>
    )
  }
}

export default Appointments
