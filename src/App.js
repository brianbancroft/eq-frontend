import React, { Component } from 'react'
import './App.css';
import Body from './components/Body'
import Sidenav from './components/Sidenav'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidenav />
        <Body />
      </div>
    )
  }
}

export default App;
