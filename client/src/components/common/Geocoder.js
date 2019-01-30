/*
Path : /src/components/common

Copyright (C) 2019 | Unlimited Cities® | Alain Renk | <alain.renk@7-bu.org>

Developer: Nicoals Ancel <email@adress>
Supported by: https://7billion-urbanists.org/ and https://freeit.world

This file is part of Unlimited Cities® software.

Unlimited Cities® is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Unlimited Cities® is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Unlimited Cities®. If not, see <http://www.gnu.org/licenses/>.
*/


import { Component } from 'react';
import { Map } from 'mapbox-gl';
import PropTypes from 'prop-types';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import markerImage from '../../img/marker.svg';

import { MAPBOX_CONFIG } from '../../config';


class Geocoder extends Component {
  static contextTypes = { map: PropTypes.object.isRequired };

  context: {
    map: Map;
  };

  constructor(props){
    super(props);
    this.geocoder = new MapboxGeocoder(MAPBOX_CONFIG);
  }

  componentDidMount() {

    const {map} = this.context;
    const {location} = this.props;
    const that = this;

    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [location.lng || 0, location.lat || 0]
            }
        }]
    };

    let image = new Image();
    image.src = markerImage;
    image.onload = (e) => {
      map.addImage('pin', image);
      map.addSource('mix', {type: 'geojson', data: geojson});
      map.getSource('mix').setData({
        "type": "Point",
        "coordinates": [location.lng, location.lat]
      });
      map.addLayer({
          "id": "mix",
          "type": "symbol",
          "source": "mix",
          "layout": {
              "icon-image": "pin",
              "icon-size": 1.4
          }
      });

      function onMove(e) {
        e.preventDefault();
        map.getSource('mix').setData({
          "type": "Point",
          "coordinates": [e.lngLat.lng, e.lngLat.lat]
        });
        return false;
      }

      map.on('mousedown', 'mix', (e) => {
          e.preventDefault();
          map.dragPan.disable();
          map.on('mousemove', onMove);
          map.once('mouseup',(ev) => {
            map.dragPan.enable();
            this.props.onMarkerChange({
              lat: ev.lngLat.lat,
              lng: ev.lngLat.lng
            })
            map.off('mousemove', onMove);
          });
          return false;
      });

      map.on('touchstart', 'mix', (e) => {
        if (e.points.length !== 1) return;
          e.preventDefault();
          map.dragPan.disable();
          map.on('touchmove', onMove);
          map.once('touchend',(ev) => {
            map.dragPan.enable();
            this.props.onMarkerChange({
              lat: ev.lngLat.lat,
              lng: ev.lngLat.lng
            });
            map.off('touchmove', onMove);
          });
          return false;
      });


      this.geocoder.on('result', (ev) => {
          const geometry = ev.result.geometry;
          map.getSource('mix').setData(geometry);
          that.props.onMarkerChange({
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0]
          });
      });

      document.getElementById('geocoder').innerHTML = '';
      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(map));

    };
  }


  render() {

    const {map} = this.context;
    const {location} = this.props;

    if(map.getSource('mix')){
      map.getSource('mix').setData({
        "type": "Point",
        "coordinates": [location.lng, location.lat]
      });
    }

    return null;
  }
}

export default Geocoder;
