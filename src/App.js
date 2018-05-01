import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

import './App.css'

import Body from './components/Body'
import Events from './components/Events'
import Stats from './components/Stats'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {selectedElement: Body}
  }


  render() {

    return (
      <Router>
        <Grid>
          <Row>
            <Col xs={4} md={3} className="side-nav">
              <div className="site-title">
                {this.state.selectedElement}
              </div>

              <div className="link-container">
                <div className="link events-link">
                  <Link to="/events">
                    Events
                  </Link>
                </div>
                <div className="link stats-link">
                  <Link to="/stats">
                    Stats
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <Route exact path="/" component={Body} />
              <Route path="/events" component={Events} />
              <Route path="/stats" component={Stats}  />
            </Col>
          </Row>
        </Grid>
      </Router>
    )
  }
}

export default App
