import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
import BarChart from './BarChart'


const TableRow = props => <tr>
  <td><Moment date={props.date} format="DD/MM/YYYY"/></td>
  <td>{props.impressions}</td>
  <td>{props.clicks}</td>
  <td>{props.revenue}</td>
</tr>

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableRows: []
    }

    const tableRow = (el, i) => <TableRow date={el.date} impressions={el.impressions} clicks={el.clicks} revenue={el.clicks} key={i} />
    const setupData = resp => {
      this.setState({tableRows: resp.data.map(tableRow)})
      // TODO: Resolve date string issue:
      // this.setState({chartData: { labels: resp.data.map(i => i.date), data: resp.data.map(i => i.events)}})
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
        <DailyStatsTable />
      </div>
    )
  }
}

export default Events