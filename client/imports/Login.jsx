import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      username: '',
      password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let { username, password } = this.state
    let history = this.props.history
    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-times'
        });
      } else {
        Bert.alert({
          title: 'Successful login',
          message: 'Welcome, ' + Meteor.user().profile.first_name + '!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
        history.push('/admin')
      }
    })
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail">Username</label>
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required autoFocus
            value={this.state.username}
            onChange={(e)=>{ e.preventDefault(); this.setState({username: e.target.value})}}
            />
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password" id="inputPassword"
            className="form-control" placeholder="Password" required
            value={this.state.password}
            onChange={(e)=> {e.preventDefault(); this.setState({password: e.target.value})}}
            />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
