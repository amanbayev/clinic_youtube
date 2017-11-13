import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  showAdminArea() {
    let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin')
    if (isAdmin) {
      return (
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin">Admin</NavLink>
        </li>
      )
    } else {
      return <div></div>
    }
  }
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="#">Clinic</a>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              {this.showAdminArea()}

              <li className="nav-item">
                <NavLink className="nav-link" to="/client">Client</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
    )
  }
}
