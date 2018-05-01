import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Stats extends Component {
  render () {
    return(
      <div className="bar-chart">
        <h1>Bar Chart</h1>
        <ReactEcharts option={ {foo: 'bar'}} />
      </div>
    )
  }
}

export default Stats