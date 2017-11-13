import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

import UsersCreate from '/client/imports/UsersCreate'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreatingUsers: false
    }
    this.toggleCreateState = this.toggleCreateState.bind(this)
  }
  renderUsersTable() {
    let users = this.props.users

    return users.map((user, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{user.profile.first_name}</td>
        <td>{user.profile.last_name}</td>
        <td>{user.roles[0]}</td>
      </tr>
    ))
  }

  toggleCreateState(e) {

    let toggle = !this.state.isCreatingUsers
    this.setState({isCreatingUsers: toggle})
  }

  renderCreateUsersArea(){
    if (!this.state.isCreatingUsers) {
      return (
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); this.setState({isCreatingUsers:true})}}>Add user <i className="fa fa-plus"></i></button>
      )
    } else {
      return <UsersCreate handler={this.toggleCreateState} />
    }
  }

  render() {
    return (
      <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Users</h1>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsersTable()}
          </tbody>
        </table>
        {this.renderCreateUsersArea()}
      </div>
    )
  }
}

export default withTracker(props => {
  const usersSubscription = Meteor.subscribe("allUsers")
  const rolesSubscription = Meteor.subscribe("allRoles")
  const bothReady = usersSubscription.ready() && rolesSubscription.ready()
  const loading = usersSubscription ? !bothReady : true

  return {
    loading,
    roles: Meteor.roles.find().fetch(),
    users: Meteor.users.find().fetch()
  }
})(Users)
