import React, { Component } from 'react'
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap'
import Body from './components/Body'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={4} md={3} className="side-nav">
            Hello sidenav
          </Col>
          <Col xs={8} md={9}>
            <Body />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App;
