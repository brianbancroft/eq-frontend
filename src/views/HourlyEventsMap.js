import React, { Component, } from 'react'
import ReactMapboxGl, { Layer, Feature, } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA',

})

class HourlyEventsMap extends Component {
  render () {
    return (
      <div>
        <Map
          style='mapbox://styles/brianbancroft/cjgpfbonw002p2srogwwm99i2'
          containerStyle={{
            height: '800px',
            width: '800px',
            border: '2px solid #555',
          }}>
            <Layer
              type='symbol'
              id='marker'
              layout={{ 'icon-image': 'marker-15', }}>
              <Feature coordinates={
                [-0.481747846041145, 51.3233379650232,]
              }/>
            </Layer>
        </Map>
      </div>
    )
  }
}

export default HourlyEventsMap
