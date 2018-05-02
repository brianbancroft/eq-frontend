import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
// import BarChart from './BarChart'

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableRows: []
    }

    const TableRow = props => <tr>
      <td><Moment date={props.date} format="DD/MM/YYYY"/></td>
      <td>{props.impressions}</td>
      <td>{props.clicks}</td>
      <td>{props.revenue}</td>
    </tr>
    const constructTableRow = (el, i) => <TableRow date={el.date} impressions={el.impressions} clicks={el.clicks} revenue={el.clicks} key={i} />
    const setupData = resp => {
      this.setState({tableRows: resp.data.map(constructTableRow)})
    }

    axios
      .get('http://localhost:5555/stats/daily')
      .then(setupData)
  }

  render () {
    const DailyStatsTable = () =>
      <Row className="table-view table-view__weekly">
        <h2>Daily Stats Table</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            { this.state.tableRows }
          </tbody>
        </Table>
      </Row>

    return(
      <div className="stats-view">
        <div className="dataviz-view">
          <h2>Daily Stats View</h2>
          Note: The charts and row summaries for this section are not implemented.
        </div>
        <DailyStatsTable />
      </div>
    )
  }
}

export default Events
