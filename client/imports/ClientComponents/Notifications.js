import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { NotificationsCollection } from '/imports/api/NotificationsCollection'

class Notifications extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <h1>Notifications</h1>
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <div className="alert alert-primary" role="alert">
              This is a primary alert—check it out!
            </div>
            <div className="alert alert-secondary" role="alert">
              This is a secondary alert—check it out!
            </div>
            <div className="alert alert-success" role="alert">
              This is a success alert—check it out!
            </div>
            <div className="alert alert-danger" role="alert">
              This is a danger alert—check it out!
            </div>
          </div>
          <div className="col-6">
            <div className="alert alert-info" role="alert">
              This is a info alert—check it out!
            </div>
            <div className="alert alert-warning" role="alert">
              This is a warning alert—check it out!
            </div>
            <div className="alert alert-light" role="alert">
              This is a light alert—check it out!
            </div>
            <div className="alert alert-dark" role="alert">
              This is a dark alert—check it out!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  const loggingIn = Meteor.loggingIn()
  const user = Meteor.user()
  const notificationsSubscription = Meteor.subscribe('NotificationsCollection');
  const myNotifications = Meteor.subscribe('MyNotifications')
  const allReady = notificationsSubscription.ready() && !loggingIn && user && myNotifications.ready()
  const loading = allReady ? !allReady : true

  return {
    loading,
    user,
    myNotifications: NotificationsCollection.find({'createdBy': user._id}).fetch(),
    notifications: NotificationsCollection.find().fetch()
  }
})(Notifications)
