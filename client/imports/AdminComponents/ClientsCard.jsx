import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCardCollection } from '/imports/api/ClientsCardCollection'

class ClientsCard extends Component {
  constructor(props) {
    super(props)
  }
  renderClientsCardTable() {
    let clients = this.props.clients

    return clients.map((client, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{client.profile.first_name}</td>
        <td>{client.profile.last_name}</td>
      </tr>
    ))
  }

  render() {
    if (!this.props.loading) {
      return (
        <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <h1>Clients cards</h1>
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Clients cards</li>
            </ol>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Last login</th>
              </tr>
            </thead>
            <tbody>
              {this.renderClientsCardTable()}
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
  const clientsCardsSubscription = Meteor.subscribe("ClientsCardCollection")
  const loading = clientsCardsSubscription ? !clientsCardsSubscription.ready() : true

  return {
    loading,
    clientsCards: ClientsCardCollection.find().fetch()
  }
})(ClientsCard)
