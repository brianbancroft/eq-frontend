import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
// import BarChart from './BarChart'

class Events extends Component {
  setCharts(date, impressions, clicks, revenue, hour) {
    console.log('set charts called')
    this.setState({renderSpecialCharts: true, specialChartData: {
      hour: hour,
      date: date,
      clicks: clicks,
      revenue: revenue,
      impressions: impressions
    }})
  }

  constructor (props) {

    super(props)
    this.state = {
      tableRows: []
    }

    const TableRow = props => <tr onClick={() => this.setCharts(props.date, props.impressions, props.clicks, props.revenue, props.hour)}>
      <td className="column-date"><Moment date={props.date} format="DD/MM/YYYY"/></td>
      <td className="column-hour">{props.hour}</td>
      <td className="column-impressions">{props.impressions}</td>
      <td className="column-clicks">{props.clicks}</td>
      <td className="column-revenue">{props.revenue}</td>
    </tr>

    const constructTableRow = (el, i) => {
      const revenue = Math.round(Number(el.revenue) * 100) / 100
      return <TableRow
        date={el.date}
        impressions={el.impressions}
        clicks={el.clicks}
        revenue={`$${revenue}`}
        hour={el.hour}
        key={i}
        className={`table-row-${i}`}
      />
    }

    const setupData = resp => {
      this.setState({tableRows: resp.data.map(constructTableRow)})
      this.setState({chartData: { labels: resp.data.map(i => `${i.hour}h, ${i.clean_date}`), data: resp.data.map(i => i.events)}})
    }

    axios
      .get('http://localhost:5555/stats/hourly')
      .then(setupData)
  }

  render () {
    const TableRow = props => <tr onClick={() => this.setCharts(props.date, props.impressions, props.clicks, props.revenue, props.hour)}>
      <td className="column-date"><Moment date={props.date} format="DD/MM/YYYY"/></td>
      <td className="column-hour">{props.hour}</td>
      <td className="column-impressions">{props.impressions}</td>
      <td className="column-clicks">{props.clicks}</td>
      <td className="column-revenue">{props.revenue}</td>
    </tr>

    const constructTableRow = (el, i) => {
      const revenue = Math.round(Number(el.revenue) * 100) / 100
      return <TableRow
        date={el.date}
        impressions={el.impressions}
        clicks={el.clicks}
        revenue={`$${revenue}`}
        hour={el.hour}
        key={i}
        className={`table-row-${i}`}
        onClick={() => this.setCharts(el.date, el.impressions, el.clicks, el.revenue, el.hour)}
        />
    }


    const setupData = resp => {
      this.setState({tableRows: resp.data.map(constructTableRow)})
      this.setState({chartData: { labels: resp.data.map(i => `${i.hour}h, ${i.clean_date}`), data: resp.data.map(i => i.events)}})
    }


    const sortColumn = column => {
      axios
        .get(`http://localhost:5555/stats/hourly?orderBy=${column}&order=DESC`)
        .then(setupData)
    }


    const DailyStatsTable = () =>
      <Row className="table-view table-view__weekly">
        <h2>Daily Stats Table</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="header-toggle column-date" onClick={() => sortColumn('date, hour')}>Date</th>
              <th className="header-toggle column-hour" onClick={() => sortColumn('date, hour')}>Hour</th>
              <th className="header-toggle column-impressions" onClick={() => sortColumn('impressions')}>Impressions</th>
              <th className="header-toggle column-clicks" onClick={() => sortColumn('clicks')}>Clicks</th>
              <th className="header-toggle column-revenue" onClick={() => sortColumn('revenue')}>Revenue</th>
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
        </div>
        <DailyStatsTable />
      </div>
    )
  }
}

export default Events