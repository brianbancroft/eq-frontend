import React, { Component, } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'


const accessToken = 'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA'
const mapStyle = 'mapbox://styles/brianbancroft/cjgpfbonw002p2srogwwm99i2'

class HourlyEventsMap extends Component {
  componentDidMount () {
    mapboxgl.accessToken = accessToken
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: mapStyle,
      center: [-98.8067489, 49.0719174,],
      zoom: 3,
    })
  }

  componentWillUnmount () {
    this.map.remove()
  }

  constructor (props) {
    super(props)
    this.state = {
      featureSet: {
        type: 'FeatureCollection',
        features: [],
      },
    }

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
    if (this.map) {
      this.featureSet = this.state.featureSet
      this.map.on('load', () => {
        this.map.addLayer({
          'id': 'points',
          'type': 'circle',
          'source': {
            'type': 'geojson',
            'data': this.state.featureSet,
          },
          'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
              'base': 1.75,
              'stops': [[12, 12,], [22, 180,],],
            },
            'circle-color': '#3bb2d0',
          },
        })
      })
    }

    const style = {
      position: 'absolute',
      height: '800px',
      width: '800px',
    }

    return (
      <div>
        <div style={style} ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

export default HourlyEventsMap
