import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

import './App.css'

import DailyEvents from './views/DailyEvents'
import HourlyEvents from './views/HourlyEvents'
import DailyStats from './views/DailyStats'
import HourlyStats from './views/HourlyStats'
import HourlyEventsMap from './views/HourlyEventsMap'


class App extends Component {

  render() {
    return (
      <Router>
        <Grid>
          <Row>
            <Col xs={4} md={3} className="side-nav">
              <div className="site-title">
                <h3>Maps and Tables</h3>

                <img src="https://cdn.brianbancroft.io/images/eqworks/scale.svg" alt="A scale"/>
              </div>

              <div className="link-container">
                <div className="link events-link">
                  <Link to="/events/daily">
                    Event Counts
                  </Link>
                </div>
                <div className="link-switch">
                  <Link to="/events/daily">Daily</Link>
                  <div className="divider-dot">·</div>
                  <Link to="/events/hourly">Hourly</Link>
                </div>
                <div className="link events-link">
                  <Link to="/events/hourlymap">
                    Event Count Map
                  </Link>
                </div>
                <div className="link stats-link">
                  <Link to="/stats/daily">
                    Stats
                  </Link>
                </div>
                <div className="link-switch">
                  <Link to="/stats/daily">Daily</Link>
                  <div className="divider-dot">·</div>
                  <Link to="/stats/hourly">Hourly</Link>
                </div>
              </div>
            </Col>
            <Col xs={8} md={9}>
              <Route exact path="/">
                <h1>Basic UI for API Consumption</h1>
              </Route>
              <Route path="/events/daily" component={DailyEvents} />
              <Route path="/events/hourly" component={HourlyEvents} />
              <Route path="/events/hourlymap" component={HourlyEventsMap} />
              <Route path="/stats/daily" component={DailyStats} />
              <Route path="/stats/hourly" component={HourlyStats} />
            </Col>
          </Row>
        </Grid>
      </Router>
    )
  }
}

export default App
