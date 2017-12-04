import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

class SingleClient extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.loading) {
      return <div><span><i className="fa fa-spin"></i> Loading</span></div>
    } else {
      console.log(this.props)
      let username = this.props.match.params.username
      let profile = this.props.client.profile
      // let profile = { first_name: 'test', 'last_name': 'break'}
      return (
        <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <h1>{profile.first_name}&nbsp;{profile.last_name}'s card</h1>
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/admin/clients">Clients</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Username: {username}</li>
            </ol>
          </nav>
        </div>
      )
    }
  }
}

export default withTracker(props => {
  let username = props.match.params.username
  const clientProfile = Meteor.subscribe('getClientsCard', username)
  const loading = clientProfile ? !clientProfile.ready() : true
  return {
    loading,
    client: Meteor.users.findOne({username: username})
  }
})(SingleClient)
