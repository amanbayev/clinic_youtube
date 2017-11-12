import React, { Component } from 'react'
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

export default class StaffCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      department: '',
      deptId: ''
    }
  }
  handleStaffSubmit(e) {
    e.preventDefault()
    let newStaff = this.state
    Meteor.call("staff.insert", newStaff, function(error){
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
          title: 'Staff added',
          message: newStaff.first_name + ' ' + newStaff.last_name + ' has been added to Staff!',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-users'
        });
      }
    });
    this.props.handler()
  }
  render() {
    let depts = this.props.departments.map((dept,index)=>{
      return { 'label': dept.name, 'value':dept._id }
    })

    return (
      <div className="row">
        <div className="col">
          <div className="card" style={{width: '20rem'}}>
            <div className="card-body">
              <h4 className="card-title">Add new staff member</h4>
              <h6 className="card-subtitle mb-2 text-muted">Please fill in the form and click Save</h6>
              <form onSubmit={this.handleStaffSubmit.bind(this)}>
                <div className="form-group">
                  <label>First name</label>
                  <input type="text" className="form-control" value={this.state.first_name}
                    onChange={(e)=>{e.preventDefault(); this.setState({first_name: e.target.value})}}/>
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" className="form-control" value={this.state.last_name}
                    onChange={(e)=>{e.preventDefault(); this.setState({last_name: e.target.value})}}/>
                </div>
                <div className="form-group">
                  <Select
                    options={depts}
                    value={this.state.deptId}
                    onChange={(e)=>{ this.setState({department: e.label, deptId: e.value})}}
                    />
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
