import React from 'react'
import Header from '/client/imports/Header'

import {
  Route,
  Switch
} from 'react-router-dom'
import ClientSubmenu from '/client/imports/ClientComponents/ClientSubmenu'
import NotFound from '/client/imports/NotFound'
import Appointments from '/client/imports/ClientComponents/Appointments'

const ClientMain = props => (
  <div>
    <Header {...props}/>
    <div className="container-fluid">
      <ClientSubmenu { ...props }/>
      <Switch>
        <Route exact path="/client" component={ Appointments } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  </div>
)

export default ClientMain
