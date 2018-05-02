import React, { Component, } from 'react'
import { Bar, } from 'react-chartjs-2'

class Stats extends Component {

  render () {
    let ChartContent = <div><h2>Loading...</h2></div>
    if (this.props.chartData) {
      const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)
      const data = {
        labels: this.props.chartData.labels,
        datasets: [
          {
            label: capitalize(this.props.chartData.subject),
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: this.props.chartData.data,
          }
        ],
      }

      ChartContent = <Bar
        data={data}
        width={800}
        height={300}
        options={{
          maintainAspectRatio: false,
          responsive: false,
        }}
      />
    }

    return(
      <div className="bar-chart">
        {ChartContent}
      </div>
    )
  }
}

export default Stats
