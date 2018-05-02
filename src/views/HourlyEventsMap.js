import React, { Component, } from 'react'
import ReactMapboxGl, { Layer, Feature, } from 'react-mapbox-gl';
import axios from 'axios'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA',
})

class HourlyEventsMap extends Component {
  constructor (props) {
    super(props)

    const buildGeojsonFeature = feat => ({
      type: 'Feature',
      properties: {
        date: feat.clean_date,
        hour: feat.hour,
        events: feat.events,
      },
      geometry: {
        type: 'Point',
        coordinates: [feat.lon, feat.lat,],
      },
    })

    const setupData = resp => {
      this.setState({
        featureSet: {
          type: 'FeatureCollection',
          features: resp.data.map(buildGeojsonFeature),
        },
      })
    }

    axios
      .get('http://localhost:5555/events/hourly-map')
      .then(setupData)
  }

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
