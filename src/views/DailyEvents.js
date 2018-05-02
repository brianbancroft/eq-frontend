import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'
import BarChart from '../components/BarChart'


class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableRows: []
    }

    const TableRow = props =>
      <tr>
        <td>{props.date}</td>
        <td>{props.events}</td>
      </tr>

    const generateTablerow = (el, i) => <TableRow date={el.clean_date} events={el.events} key={i} />
    const setupData = resp => {
      this.setState({tableRows: resp.data.map(generateTablerow)})
      this.setState({chartData: { labels: resp.data.map(i => i.clean_date), data: resp.data.map(i => i.events)}})
    }

    axios
      .get('http://localhost:5555/events/daily')
      .then(setupData)
  }

  render () {
    const WeeklyEventsTable = () =>
      <Row className="table-view table-view__weekly">
        <h2>Weekly Events Table</h2>
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

    return(
      <div className="stats-view">
        <BarChart chartData={this.state.chartData} />
        <WeeklyEventsTable />
      </div>
    )
  }
}

export default Events