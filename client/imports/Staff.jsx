import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

import { StaffCollection } from '/imports/api/StaffCollection'
import StaffCreate from '/client/imports/StaffCreate'

class Staff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreatingStaff: false
    }
    this.toggleCreateState = this.toggleCreateState.bind(this)
  }
  renderStaffTable() {
    let staff = this.props.staff

    return staff.map((member, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{member.first_name}</td>
        <td>{member.last_name}</td>
        <td>{member.department}</td>
      </tr>
    ))
  }

  toggleCreateState(e) {
    
    let toggle = !this.state.isCreatingStaff
    this.setState({isCreatingStaff: toggle})
  }

  renderCreateStaffArea(){
    if (!this.state.isCreatingStaff) {
      return (
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); this.setState({isCreatingStaff:true})}}>Add staff member <i className="fa fa-plus"></i></button>
      )
    } else {
      return <StaffCreate handler={this.toggleCreateState} />
    }
  }

  render() {
    return (
      <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Staff</h1>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Staff</li>
          </ol>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {this.renderStaffTable()}
          </tbody>
        </table>
        {this.renderCreateStaffArea()}
      </div>
    )
  }
}

export default withTracker(props => {
  const staffSubscription = Meteor.subscribe("StaffCollection")
  const loading = staffSubscription ? !staffSubscription.ready() : true

  return {
    loading,
    staff: StaffCollection.find().fetch()
  }
})(Staff)
