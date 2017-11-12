import React, { Component } from 'react'

import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

import { PositionsCollection } from '/imports/api/PositionsCollection'
import PositionsCreate from '/client/imports/PositionsCreate'

class Positions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreatingPositions: false
    }
    this.toggleCreateState = this.toggleCreateState.bind(this)
  }
  renderPositionsTable() {
    let positions = this.props.positions

    return positions.map((dept, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{dept.name}</td>
        <td>{dept.counter}</td>
      </tr>
    ))
  }

  toggleCreateState(e) {

    let toggle = !this.state.isCreatingPositions
    this.setState({isCreatingPositions: toggle})
  }

  renderCreatePositionsArea(){
    if (!this.state.isCreatingPositions) {
      return (
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); this.setState({isCreatingPositions:true})}}>Add position <i className="fa fa-plus"></i></button>
      )
    } else {
      return <PositionsCreate handler={this.toggleCreateState} />
    }
  }

  render() {
    return (
      <div role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
        <h1>Positions</h1>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Positions</li>
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
            {this.renderPositionsTable()}
          </tbody>
        </table>
        {this.renderCreatePositionsArea()}
      </div>
    )
  }
}

export default withTracker(props => {
  const positionsSubscription = Meteor.subscribe("PositionsCollection")
  const loading = positionsSubscription ? !positionsSubscription.ready() : true

  return {
    loading,
    positions: PositionsCollection.find().fetch()
  }
})(Positions)
