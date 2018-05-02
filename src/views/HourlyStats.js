import React, { Component, } from 'react'
import { Button, } from 'react-bootstrap'
import axios from 'axios'
import Moment from 'react-moment'
import BarChart from '../components/BarChart'
import RowAnalysis from '../components/RowAnalysis'
import DatavizSelector from '../components/DatavizSelector'
import HourlyStatsTable from '../components/HourlyStatsTable'

class Events extends Component {
  setCharts (date, impressions, clicks, revenue, hour) {
    const revenuePerImpression = (revenue, impression) => {
      return Math.round(Number(revenue) / Number(impressions) * 10000) / 10000
    }

    this.setState({
      renderSpecialCharts: true,
      selectedView: <RowAnalysis
        hour={hour}
        date={date}
        clicks={clicks}
        revenue={revenue}
        impressions={impressions}
        revenuePerImpression={revenuePerImpression(revenue, impressions)}
      />,
    })
  }

  tableRow (props) {
    return(
      <tr
        key={props.key}
        onClick={() => this.setCharts(props.date, props.impressions, props.clicks, props.revenue, props.hour)}
      >
        <td className="column-date">
          <Moment date={props.date} format="DD/MM/YYYY"/>
        </td>
        <td className="column-hour">{props.hour}</td>
        <td className="column-impressions">{props.impressions}</td>
        <td className="column-clicks">{props.clicks}</td>
        <td className="column-revenue">${props.revenue}</td>
      </tr>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      tableRows: [],
      selectedView: <h3>Select a row or a chart type</h3>,
    }

    const constructTableRow = (el, i) => {
      const revenue = Math.round(Number(el.revenue) * 100) / 100
      return this.tableRow({
        date: el.date,
        impressions: el.impressions,
        clicks: el.clicks,
        revenue: revenue,
        hour: el.hour,
        key: i,
        className: `table-row-${i}`,
      })
    }

    const setupData = resp => {
      this.setState({tableRows: resp.data.map(constructTableRow),})
      this.setState({
        chartData: {
          labels: resp.data.map(i => `${i.hour}h, ${i.clean_date}`),
          data: resp.data.map(i => i['impressions']),
          subject: 'impressions',
        },
      })
    }

    axios
      .get('http://localhost:5555/stats/hourly')
      .then(setupData)
  }

  render () {
    const TimeSeries = props => <BarChart chartData={this.state.chartData} />

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

    const selectTimeSeries = () => this.setState({selectedView: <TimeSeries />,})

    const setupData = resp => {
      this.setState({
        tableRows: resp.data.map(constructTableRow),
        chartData: {
          labels: resp.data.map(i => `${i.hour}h, ${i.clean_date}`),data: resp.data.map(i => i['impressions']),
          subject: 'impressions',
        },
      })
      this.setState()
    }

    const sortColumn = column => {
      axios
        .get(`http://localhost:5555/stats/hourly?orderBy=${column}&order=DESC`)
        .then(setupData)
    }

    return(
      <div className="stats-view">
        <div className="dataviz-view">
          <div className="dataviz-view__chart-container">
            {this.state.selectedView}
          </div>
          <DatavizSelector selectTimeSeries={selectTimeSeries} />
        </div>
        <HourlyStatsTable
          tableRows={this.state.tableRows}
          sortColumn={sortColumn}
        />
      </div>
    )
  }
}

export default Events
