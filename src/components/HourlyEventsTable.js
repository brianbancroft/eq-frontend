import React, { Component, } from 'react'
import { Row, Table, } from 'react-bootstrap'

class HourlyEventsTable extends Component {
  render () {
    return(
      <Row className="table-view table-view__weekly">
        <h2>Hourly Events Table</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            { this.props.tableRows }
          </tbody>
        </Table>
      </Row>
    )
  }
}

export default HourlyEventsTable
