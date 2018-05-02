import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
import BarChart from '../components/BarChart'

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: this.props.location.pathname.split('/events/')[1],
      tableRows: [],
    }

    const TableRow = props =>
      <tr>
        <td><Moment date={props.date} format="DD/MM/YYYY"/></td><td>{props.events}</td>
      </tr>

    const generateTablerow = (el, i) => <TableRow date={el.date} events={el.events} key={i} />
    const setupData = resp => {
      this.setState({tableRows: resp.data.map(generateTablerow)})
      this.setState({chartData: { labels: resp.data.map(i => i.clean_date), data: resp.data.map(i => i.events)}})
    }

    axios
      .get(`http://localhost:5555/events/hourly?date=${this.state.date}`)
      .then(setupData)
  }

  render () {
    const WeeklyEventsTable = () =>
      <Row className="table-view table-view__weekly">
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

    return(
      <div className="stats-view">
        <div className="dataviz-view">
          <BarChart chartData={this.state.chartData} />
        </div>
        <WeeklyEventsTable />
      </div>
    )
  }
}

export default Events