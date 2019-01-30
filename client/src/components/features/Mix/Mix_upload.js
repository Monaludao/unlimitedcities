/*
Path : /src/components/features/Mix

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
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import _ from 'lodash';

import { getTranslate } from 'react-localize-redux';
import { resetMix, setMixBackground, setMixLocation, fetchLibraryData} from '../../../actions';
import { LIBRARY_ID } from '../../../config';

import premixIcon from '../../../img/premix.svg';

require('exif-js');

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height:100%;

  background: radial-gradient(#5E5E5E,#2B2B2B);
  border: 10px solid white;
`;

const Form = styled.div`
  text-align: center;
  padding: 0 25px;
  label{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: white;
    font-size: 60px;
    color: #9B9B9B;
    font-weight: lighter;
    height: 80px;
    width:80px;
    border-radius: 40px;
    margin: 0 auto;
  }
  p{
    margin-top: 25px;
    color: #C5C5C5;
  }
`;



class MixUpload extends React.Component{

  constructor(props){
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.goToPremix = this.goToPremix.bind(this);
  }

  getGeolocation(){
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.props.setMixLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      }, (error) => {
        console.log(error);
      });
    }
  }

  componentDidMount(){
    this.props.resetMix();
    if(this.props.libraryId !== LIBRARY_ID)
      this.props.fetchLibraryData();
  }

  goToPremix(){
    this.props.history.push({
      pathname: '/map/premix'
    });
  }

  onChangeFile(e){
    let loadImage = window.loadImage;
    var loadingImage = loadImage(
        e.target.files[0],
        (canvas, data)=> {
          if(data && data.exif){
            const lat_dms = data.exif.get('GPSLatitude');
            const lng_dms = data.exif.get('GPSLongitude');
            if(lat_dms && lng_dms){
              const lat = (lat_dms[0]+lat_dms[1]/60+lat_dms[2]/(60*60));
              const lng = (lng_dms[0]+lng_dms[1]/60+lng_dms[2]/(60*60));
              this.props.setMixLocation({
                lat,
                lng
              });
            }else{
              this.getGeolocation();
            }
          }else{
            this.getGeolocation();
          }
          this.props.setMixBackground(canvas.toDataURL('image/jpeg', 0.8));
          this.props.history.push("/mix/create");
        },
        {maxWidth: 800, maxHeight:600, cover: true, orientation:true, crop:true, canvas:true}
    );
    if (!loadingImage) {
        alert("Your file is not compatible!");
    }
  }

  render(){
    const { libraryUploadProgress } = this.props;
    if(!libraryUploadProgress || libraryUploadProgress < 1){
      return (
        <Wrapper>
          <span style={{color:'white', fontSize:'42px'}}>
            {Math.round(this.props.libraryUploadProgress*100)}%
          </span>
        </Wrapper>
      )
    }
    return(
      <Wrapper>
        {_.some(this.props.mixs, ['premix', 1]) && (
          <Form>
            <button onClick={this.goToPremix}>
              <img src={premixIcon} alt="Premix"/>
            </button>
            <p>{this.props.translate('choose-premix')}</p>
          </Form>
        )}
        {
        <Form>
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            accept="image/x-png,image/jpeg"
            style={{display:"none"}}
            onChange={this.onChangeFile}
          />
            <label htmlFor="file">+</label>
            <p>{this.props.translate('open-photo')}</p>
          </Form>
          }
      </Wrapper>
    )
  }

}

const mapStateToProps = state => ({
  mixs: state.gallery.mixs,
  translate: getTranslate(state.locale),
  libraryId: state.library.id,
  libraryUploadProgress: state.library.progress
});


export default connect(mapStateToProps,{resetMix, setMixBackground, setMixLocation, fetchLibraryData})(MixUpload);

MixUpload.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
};
