import React, { Component } from 'react'
import { Row, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
// import BarChart from './BarChart'


const TimeSeries = props => <div>
  <h1>Time Series</h1>
</div>

const RowStats = props => <div>
  <h1>Row Stats</h1>
</div>

let selectedView = <TimeSeries />

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

  tableRow (props) {
    return <tr onClick={() => this.setCharts(props.date, props.impressions, props.clicks, props.revenue, props.hour)}>
      <td className="column-date"><Moment date={props.date} format="DD/MM/YYYY"/></td>
      <td className="column-hour">{props.hour}</td>
      <td className="column-impressions">{props.impressions}</td>
      <td className="column-clicks">{props.clicks}</td>
      <td className="column-revenue">{props.revenue}</td>
    </tr>
  }

  constructor (props) {

    super(props)
    this.state = {
      tableRows: []
    }

    const constructTableRow = (el, i) => {
      const revenue = Math.round(Number(el.revenue) * 100) / 100
      return this.tableRow({
        date: el.date,
        impressions: el.impressions,
        clicks: el.clicks,
        revenue: `$${revenue}`,
        hour: el.hour,
        key: i,
        className: `table-row-${i}`,
      })
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
    const constructTableRow = (el, i) => {
      const revenue = Math.round(Number(el.revenue) * 100) / 100
      return this.tableRow({
        date: el.date,
        impressions: el.impressions,
        clicks: el.clicks,
        revenue: `$${revenue}`,
        hour: el.hour,
        key: i,
        className: `table-row-${i}`,
      })
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
        <h2>Hourly Stats Table</h2>
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
          <div className="dataviz-view__chart-container">
            {selectedView}
          </div>
          <div className="dataviz-view__dataviz-selector">
            <Button bsStyle="primary">Time Series</Button>
            <Button bsStyle="primary">Row Analysis</Button>
          </div>
        </div>
        <DailyStatsTable />
      </div>
    )
  }
}

export default Events