import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import BarChart from '../components/BarChart'
import HourlyEventsTable from '../components/HourlyEventsTable';

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableRows: [],
    }

    const TableRow = props =>
      <tr>
        <td><Moment date={props.date} format="DD/MM/YYYY"/></td><td>{props.events}</td>
      </tr>

    const generateTablerow = (el, i) => <TableRow date={el.date} events={el.events} key={i} />
    const setupData = resp => {
      this.setState({
        chartData: {
          labels: resp.data.map(i => i.clean_date),
          data: resp.data.map(i => i.events),
          subject: 'events',
        },
        tableRows: resp.data.map(generateTablerow),
      })
    }

    axios
      .get(`http://localhost:5555/events/hourly?date=${this.state.date}`)
      .then(setupData)
  }

  render () {
    return(
      <div className="stats-view">
        <div className="dataviz-view">
          <BarChart chartData={this.state.chartData} />
        </div>
        <HourlyEventsTable tableRows={this.state.tableRows} />
      </div>
    )
  }
}

export default Events
