import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

export default Authenticated = ({ loggingIn, authenticated, component, user, path, ...rest }) => (
    <Route
      { ...rest }
      path={ path }
      render={ (props) => {
        if(loggingIn)
          return <div />

        if(!authenticated)
          return <Redirect to='/login' />

        return (React.createElement(component, {...props, ...rest, user, path, loggingIn, authenticated}))
      } }
    />
)
