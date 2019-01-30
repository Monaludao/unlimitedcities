/*
Path : /src/components/features/Map

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


import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../utils/style';
import _ from 'lodash';
import {Loader} from '../../common/LoaderHOC';
import Statistics from '../../common/Statistics';
import { MAPBOX_CONFIG } from '../../../config';


// COMPONENTS
import ReactMapboxGl, { Cluster, Marker } from "react-mapbox-gl";
import MixCardList from '../../common/MixCardList';

// ACTIONS
import { setSelectedMixs, setSelectedMix, setGalleryPosition } from '../../../actions';

// IMAGES
import crossButton from '../../../img/button-cross.svg';


const Map = ReactMapboxGl(MAPBOX_CONFIG);

function SelectedMixs(props){
    return(
      <div className="selected-mixs-overlay">
        <div className="selected-mixs-header">
          <button onClick={props.onClose}><img alt="close" src={crossButton}/></button>
        </div>
        <div className="background-selected-mixs">
          <Statistics selectedMixs={props.selectedMixs}/>
          <div className="selected-mixs-container">
            <MixCardList onMixClick={props.onMixClick}  mixs={props.mixs} selectedMixs={props.selectedMixs} margin={10}/>
          </div>
        </div>
      </div>
    );
}




const Vignette = (props) => {
  return(
  <div className="vignette" style={{backgroundImage: 'url('+props.image+')', backgroundPosition: '50% 50%'}}>
    {(!props.image || props.image === "undefined.jpg") && <Loader/>}
    {props.children}
  </div>
)};

const VignetteCounter = ({counter}) => (
  <div className="vignette-counter">
    {counter}
  </div>
);


const Container = styled.div`
  .selected-mixs-overlay{
    position: absolute;
    z-index: 999999;
    background: rgba(0,0,0,0.5);
    width: 100vw;
    height: calc(100vh - 52px);
    top: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .selected-mixs-header{
      border-radius: 4px 4px 0 0;
      ${media['screen-sm-max']`
        max-width:285px;
        width:285px;
      `}
      ${media['screen-sm-min']`
        max-width:680px;
        width:680px;
      `}
      ${media['screen-md-min']`
        max-width:1020px;
        width:1020px;
      `}
      ${media['screen-lg-min']`
        max-width:1380px;
        width:1380px;
      `}
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      top:0;
      left:0;
      height:40px;
      background:#4A4A4A;
      padding: 0 10px;
      button{
        img{
          height: 20px;
        }
      }
    }
    .background-selected-mixs{
      background: #F4F4F4;
      min-height: 400px;
      max-height: calc(50vh - 52px);
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 0 10px;

      ${media['screen-sm-max']`
        max-width:285px;
        width:285px;
      `}
      ${media['screen-sm-min']`
        max-width:680px;
        width:680px;
      `}
      ${media['screen-md-min']`
        max-width:1020px;
        width:1020px;
      `}
      ${media['screen-lg-min']`
        max-width:1380px;
        width:1380px;
      `}
    }
    .selected-mixs-container{
      border-radius: 0 0 4px 4px;
      position:relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 10px;

      ${media['screen-sm-max']`
        max-width:285px;
        width:285px;
      `}
      ${media['screen-sm-min']`
        max-width:680px;
        width:680px;
      `}
      ${media['screen-md-min']`
        max-width:1020px;
        width:1020px;
      `}
      ${media['screen-lg-min']`
        max-width:1360px;
        width:1360px;
      `}

      .selectedMix{
        position:relative;
        background: white;
        margin: 5px;
        padding: 10px;
        width:auto;
        height:auto;
        p{
          width: 256px;
          max-width: 256px;
          height: 50px;
          max-height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 16px;
          font-size: 14px;
          padding-top: 5px;
        }

        .thumbs{
          img{
            with: 256px;
            height: 192px;
            background-color: #CBCBCB;
          }
          h3{
            position: absolute;
            text-align: right;
            width: 250px;
            top: 180px;
            font-family: RobotoSlab-Bold;
            font-size: 14px;
            color: #FFFFFF;
            text-shadow: 0 0 2px rgba(0,0,0,0.50);
          }
        }
      }
    }
  }
  .vignette{
    width: 75px;
    height: 75px;
    border: 3px solid #FFFFFF;
    box-shadow: 0 2px 15px 0 rgba(0,0,0,0.22);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    .vignette-counter{
      position: absolute;
      top: -12px;
      right: -10px;
      background-color: #E13359;
      border-radius: 50%;
      color:white;
      font-weight: bold;
      padding: 3px 9px;
    }
  }
`;








class GalleryMap extends React.Component {

  constructor(props){
    super(props);
    this.onSelectedMixsClose = this.onSelectedMixsClose.bind(this);
    this.onMixClick = this.onMixClick.bind(this);
  }

  componentWillMount(){
    this.props.setSelectedMixs();
  }

  onSelectedMixsClose(){
    this.props.setSelectedMixs();
  }

  onMixClick(id){
    this.props.setSelectedMix(id);
    this.props.history.push({
      pathname: '/gallery/'+id,
    });
  }


  clusterMarker = (coordinates, pointCount, getLeaves) => {


    // GET MAKERS OF THE CLUSTERMARKER AND SET SETELECTEDMIXS
    const clickedMarkers = getLeaves();
    const markers = clickedMarkers.map((marker)=>{
      return {id: marker.key, timestamp: this.props.gallery.mixs[marker.key].data.timestamp};
    });


    const markersSortByDate = markers.sort((a, b) => {
      return (a.timestamp===null)-(b.timestamp===null) || +(a.timestamp>b.timestamp)||-(a.timestamp<b.timestamp);
    }).reverse();

    const thumbnail = this.props.gallery.mixs[markersSortByDate[0].id].data.thumbnail || this.props.gallery.mixs[markersSortByDate[0].id].data.image_url;

    return(
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        onClick={(e)=>{
          console.log(markersSortByDate);
          this.props.setSelectedMixs(markersSortByDate);
        }}
        >
        <Vignette image={thumbnail}>
          <VignetteCounter counter={pointCount} />
        </Vignette>
      </Marker>
    );
  }


  render(){

    const {lat, lng} = this.props.gallery.position;

    return(
      <Container>
        <Map
          zoom={[this.props.gallery.zoom]}
          center={[lng, lat]}
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "calc(100vh - 35px)",
            width: "100vw"
          }}
          onDragEnd={(e)=>{this.props.setGalleryPosition({
            position: e.getCenter(),
            zoom: e.getZoom()
          });}}
          onZoomEnd={(e)=>{this.props.setGalleryPosition({
            position: e.getCenter(),
            zoom: e.getZoom()
          });}}
        >
          <Cluster
            ClusterMarkerFactory={this.clusterMarker}
            maxZoom={24}
            >
          {
              _.map(this.props.gallery.mixs, (mix, index) => {

                const data = mix.data;
                const thumbnail = data.thumbnail || data.image_url;
                const location = data.location;

                return(
                  <Marker
                    key={index}
                    coordinates={[location.lng, location.lat]}
                    onClick={()=>{this.onMixClick(index);}}
                  >
                    <Vignette image={thumbnail}/>
                  </Marker>
                );
              }

          )}
        </Cluster>
        </Map>
        {
          !_.isEmpty(this.props.gallery.selectedMixs) && <SelectedMixs onClose={this.onSelectedMixsClose} onMixClick={this.onMixClick} selectedMixs={this.props.gallery.selectedMixs} mixs={this.props.gallery.mixs}/>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gallery: state.gallery
  }
}

export default connect(mapStateToProps, { setSelectedMixs, setSelectedMix, setGalleryPosition})(GalleryMap);
