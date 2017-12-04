import React, { Component } from 'react'
import Header from '/client/imports/Header'

import {
  Route,
  Switch
} from 'react-router-dom'

import ClientSubmenu from '/client/imports/ClientComponents/ClientSubmenu'
import NotFound from '/client/imports/NotFound'
import Appointments from '/client/imports/ClientComponents/Appointments'
import Notifications from '/client/imports/ClientComponents/Notifications'

class ClientMain extends Component {
  constructor(props) {
    super(props)
  }
  componentWillUnmount() {
    UserStatus.stopMonitor()
  }
  componentDidMount() {
    UserStatus.startMonitor({threshold: 30000, idleOnBlur: true})
  }
  render(){
    return (
      <div>
        <Header {...this.props}/>
        <div className="container-fluid">
          <ClientSubmenu { ...this.props }/>
          <Switch>
            <Route exact path="/client" component={ Appointments } />
            <Route exact path="/client/notifications" component={ Notifications } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </div>
    )
  }
}

export default ClientMain
