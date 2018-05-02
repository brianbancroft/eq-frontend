import React, { Component, } from 'react'
import { Button, } from 'react-bootstrap'

class DatavizSelector extends Component {
  render () {
    return(
      <div className="dataviz-view__dataviz-selector">
        <Button bsStyle="primary" onClick={() => this.props.selectTimeSeries('impressions')}>Total Impressions</Button>
        <Button bsStyle="primary" onClick={() => this.props.selectTimeSeries('clicks')}>Total Clicks</Button>
        <Button bsStyle="primary" onClick={() => this.props.selectTimeSeries('revenue')}>Total Revenue</Button>

        <Button bsStyle="primary" onClick={() => this.props.selectTimeSeries()}>Clicks per Impression</Button>
        <Button bsStyle="primary" onClick={() => this.props.selectTimeSeries()}>Average Revenue per Impression</Button>
      </div>
    )
  }
}

export default DatavizSelector
