import React, { Component, } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import BarChart from '../components/BarChart'
import RowAnalysis from '../components/RowAnalysis'
import DatavizSelector from '../components/DatavizSelector'
import HourlyStatsTable from '../components/HourlyStatsTable'

class Events extends Component {
  setRowSummaryPane (date, impressions, clicks, revenue, hour) {
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
        onClick={() => this.setRowSummaryPane(props.date, props.impressions, props.clicks, props.revenue, props.hour)}
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
      this.setState({
        tableRows: resp.data.map(constructTableRow),
        baseChartData: {
          impressions: resp.data.map(i => i.impressions),
          clicks: resp.data.map(i => i.clicks),
          revenue: resp.data.map(i => i.revenue),
          clicksPerImpression: resp.data.map(i => Number(i.clicks) / Number(i.impressions)),
          revenuePerImpression: resp.data.map(i => Number(i.revenue) / Number(i.impressions)),
        },
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

    const selectTimeSeries = subject => {
      this.setState({
        selectedView: <TimeSeries />,
        baseChartData: this.state.baseChartData,
        chartData: {
          labels: this.state.chartData.labels,
          data: this.state.baseChartData[subject],
          subject: subject,
        },
      })
    }

    const setupData = resp => {
      this.setState({
        tableRows: resp.data.map(constructTableRow),
        baseChartData: {
          impressions: resp.data.map(i => i.impressions),
          clicks: resp.data.map(i => i.clicks),
          revenue: resp.data.map(i => i.revenue),
        },
        chartData: {
          labels: resp.data.map(i => `${i.hour}h, ${i.clean_date}`),
          data: resp.data.map(i => i['impressions']),
          subject: 'impressions',
        },
      })
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
