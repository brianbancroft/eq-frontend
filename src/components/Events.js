import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'

class TableRow extends Component {
  render () {
    return (
      <tr><td>{this.props.date}</td><td>{this.props.events}</td></tr>
    )
  }
}

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableRows: []
    }
  }

  render () {
    const tableRow = el => <TableRow date={el.date} events={el.events} />
    const setupData = resp => this.setState({tableRows: resp.data.map(tableRow)})

    axios
      .get('http://localhost:5555/events/daily')
      .then(setupData)

    return(
      <div className="stats-view">
        <Row className="dataviz-view">Databiz</Row>
        <Row className="table-view">
          <h2>Daily Events Table</h2>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              { this.state.tableRows }
            </tbody>
          </Table>
        </Row>
      </div>
    )
  }
}

export default Events