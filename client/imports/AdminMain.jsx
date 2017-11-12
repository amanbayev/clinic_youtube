import React, { Component } from 'react'

import Header from '/client/imports/Header'
import Dashboard from '/client/imports/Dashboard'
import NotFound from '/client/imports/NotFound'
import Sidebar from '/client/imports/Sidebar'
import Staff from '/client/imports/Staff'
import Departments from '/client/imports/Departments'

import {
  Route,
  Switch
} from 'react-router-dom'

export default class AdminMain extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Switch>
              <Route exact path="/admin" component={ Dashboard } />
              <Route exact path="/admin/staff" component={ Staff } />
              <Route exact path="/admin/departments" component={ Departments } />
              <Route component={ NotFound } />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}