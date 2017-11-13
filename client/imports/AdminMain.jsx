import React, { Component } from 'react'

import Header from '/client/imports/Header'
import Dashboard from '/client/imports/Dashboard'
import NotFound from '/client/imports/NotFound'
import Sidebar from '/client/imports/Sidebar'
import Staff from '/client/imports/Staff'
import Departments from '/client/imports/Departments'
import Users from '/client/imports/Users'
import Clients from '/client/imports/Clients'
import Positions from '/client/imports/Positions'
import ClientsCard from '/client/imports/ClientsCard'

import {
  Route,
  Switch
} from 'react-router-dom'

export default class AdminMain extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    $.fn.extend({
      animateCss: function (animationName, callback) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          this.addClass('animated ' + animationName).one(animationEnd, function() {
              $(this).removeClass('animated ' + animationName);
              if (callback) {
                callback();
              }
          });
          return this;
      }
    });
  }
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
              <Route exact path="/admin/positions" component={ Positions } />
              <Route exact path="/admin/users" component={ Users } />
              <Route path="/admin/clients" component={ Clients } />
              <Route exact path="/admin/clientscards" component={ ClientsCard } />
              <Route component={ NotFound } />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
