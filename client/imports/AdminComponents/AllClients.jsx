import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

class AllClients extends Component {
  constructor(props) {
    super(props)
  }
  renderClientsTable() {
    let clients = this.props.clients

    return clients.map((client, index) => {
      let cardPath = "/admin/clients/" + client.username
      return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{client.profile.first_name}</td>
        <td>{client.profile.last_name}</td>
        <td><Link to={cardPath}>Card</Link></td>
      </tr>
    )})
  }
  render() {
    if (!this.props.loading) {
      return (
        <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <h1>Clients</h1>
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Clients</li>
            </ol>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Card</th>
              </tr>
            </thead>
            <tbody>
              {this.renderClientsTable()}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <span><i className="fa fa-spin"></i> Loading</span>
        </div>
      )
    }
  }
}

export default withTracker(props => {
  const clientsSubscription = Meteor.subscribe("allClients")
  const bothReady = clientsSubscription.ready() 
  const loading = bothReady ? !bothReady : true

  return {
    loading,
    clients: Roles.getUsersInRole('client').fetch()
  }
})(AllClients)
