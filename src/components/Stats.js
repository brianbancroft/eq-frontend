import React, { Component } from 'react'
import { Row, Table } from 'react-bootstrap'


class Stats extends Component {
  render () {
    return(
      <div className="stats-view">
        <Row className="dataviz-view">Databiz</Row>
        <Row className="table-view">
          <h2>Daily Events Table</h2>
          <Table striped bordered condensed hover>
            <tr>
              <th></th>
            </tr>
          </Table>

        </Row>
      </div>
    );
}

}

export default Stats