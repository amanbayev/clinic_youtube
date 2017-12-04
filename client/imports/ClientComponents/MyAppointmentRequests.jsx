import React, {Component } from 'react'

class MyAppointmentRequests extends Component {
  constructor(props) {
    super(props)
  }

  renderMyAppointmentsList() {
    let myAppointments = this.props.myAppointments
    return myAppointments.map((app, index) => {
      let url = 'http://lorempixel.com/400/200/people/' + (index + 1)
      return (
        <div className="col-3" key={index}>
          <div className="card" style={{'width':'20rem', 'marginTop':'10px'}}>
            <img className="card-img-top" src={url} style={{'height':'200px'}} alt="Random image placeholder" />
            <div className="card-body">
              <h4 className="card-title">{app.reasonForVisit}</h4>
              <p className="card-text">{app.title}</p>
              <a href="#" className="btn btn-primary">Go to appointment request</a>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="row">
        {this.renderMyAppointmentsList()}
      </div>
    )
  }
}

export default MyAppointmentRequests
