import React, { Component } from 'react'

export default class DepartmentsCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleDepartmentsSubmit(e) {
    e.preventDefault()
    let newDepartment = this.state
    Meteor.call("departments.insert", newDepartment, function(error){
      if(error){
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-times'
        });
      } else {
        Bert.alert({
          title: 'Department added',
          message: newDepartment.firstName + ' ' + newDepartment.lastName + ' has been added to Departments!',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-users'
        });
      }
    });
    this.props.handler()
  }
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card" style={{width: '20rem'}}>
            <div className="card-body">
              <h4 className="card-title">Add new department</h4>
              <h6 className="card-subtitle mb-2 text-muted">Please fill in the form and click Save</h6>
              <form onSubmit={this.handleDepartmentsSubmit.bind(this)}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" value={this.state.name}
                    onChange={(e)=>{e.preventDefault(); this.setState({name: e.target.value})}}/>
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button className="btn btn-secondary" onClick={this.props.handler}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
