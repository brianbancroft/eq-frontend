import React, { Component, } from 'react'
import { ListGroup, ListGroupItem, Badge, } from 'react-bootstrap'

class RowAnalysis extends Component {
  render () {
    return(
      <div className="stats-row-analysis">
        hello Row Summary for Date: {this.props.date}, Hour: {this.props.hour}
        <ListGroup>
          <ListGroupItem>
            <strong>Clicks</strong>:
            <Badge className="badge-analysis">{this.props.clicks}</Badge>
          </ListGroupItem>
          <ListGroupItem>
            <strong>Impressions</strong>:
            <Badge className="badge-analysis">{this.props.impressions}</Badge>
          </ListGroupItem>
          <ListGroupItem>
            <strong>Revenue</strong>:
            <Badge className="badge-analysis">${this.props.revenue}</Badge>
          </ListGroupItem>
          <ListGroupItem>
            <strong>Average Revenue per Impressions</strong>:
            <Badge className="badge-analysis">${this.props.revenuePerImpression}</Badge>
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default RowAnalysis
