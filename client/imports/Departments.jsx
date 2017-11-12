import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

import { DepartmentsCollection } from '/imports/api/DepartmentsCollection'
import DepartmentsCreate from '/client/imports/DepartmentsCreate'

class Departments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreatingDepartments: false
    }
    this.toggleCreateState = this.toggleCreateState.bind(this)
  }
  renderDepartmentsTable() {
    let departments = this.props.departments

    return departments.map((dept, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{dept.name}</td>
        <td>{dept.counter}</td>
      </tr>
    ))
  }

  toggleCreateState(e) {

    let toggle = !this.state.isCreatingDepartments
    this.setState({isCreatingDepartments: toggle})
  }

  renderCreateDepartmentsArea(){
    if (!this.state.isCreatingDepartments) {
      return (
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); this.setState({isCreatingDepartments:true})}}>Add department <i className="fa fa-plus"></i></button>
      )
    } else {
      return <DepartmentsCreate handler={this.toggleCreateState} />
    }
  }

  render() {
    return (
      <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Departments</h1>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Departments</li>
          </ol>
        </nav>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDepartmentsTable()}
          </tbody>
        </table>
        {this.renderCreateDepartmentsArea()}
      </div>
    )
  }
}

export default withTracker(props => {
  const departmentsSubscription = Meteor.subscribe("DepartmentsCollection")
  const loading = departmentsSubscription ? !departmentsSubscription.ready() : true

  return {
    loading,
    departments: DepartmentsCollection.find().fetch()
  }
})(Departments)
