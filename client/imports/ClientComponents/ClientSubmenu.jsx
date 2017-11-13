import React from 'react'
import { NavLink } from 'react-router-dom'

const ClientSubmenu = props => {
  let cardPath = "/client/" + props.user.username
  return (
    <div style={{paddingTop: '15px', marginBottom: '15px'}}>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <NavLink exact={true} className="nav-link" to="/client">Appointments</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={cardPath}>My card</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/client/notifications">Notifications</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/client/messages">Messages</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default ClientSubmenu
