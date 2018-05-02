import React, { Component, } from 'react'
import { Row, Table, } from 'react-bootstrap'

class HourlyStatsTable extends Component {
  render () {
    return(
      <Row className="table-view table-view__weekly">
        <h2>Hourly Stats Table</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="header-toggle column-date" onClick={() => this.props.sortColumn('date, hour')}>Date</th>
              <th className="header-toggle column-hour" onClick={() => this.props.sortColumn('date, hour')}>Hour</th>
              <th className="header-toggle column-impressions" onClick={() => this.props.sortColumn('impressions')}>Impressions</th>
              <th className="header-toggle column-clicks" onClick={() => this.props.sortColumn('clicks')}>Clicks</th>
              <th className="header-toggle column-revenue" onClick={() => this.props.sortColumn('revenue')}>Revenue</th>
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

export default HourlyStatsTable
