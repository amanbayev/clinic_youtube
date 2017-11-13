import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

export default Authenticated = ({ adminOnly, loggingIn, authenticated, component, user, path, ...rest }) => (
    <Route
      { ...rest }
      path={ path }
      render={ (props) => {
        if(loggingIn)
          return <div />
        let isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin')
        if(!authenticated)
          return <Redirect to='/login' />
        if (adminOnly && isAdmin) {
          return (React.createElement(component, {...props, ...rest, user, path, loggingIn, authenticated}))
        }
        if (!adminOnly) {
          return (React.createElement(component, {...props, ...rest, user, path, loggingIn, authenticated}))
        }
        return <Redirect to="/login" />
      } }
    />
)
