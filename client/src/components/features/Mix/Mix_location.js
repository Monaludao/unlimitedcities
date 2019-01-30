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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MixHeader from './MixHeader';

import ReactMapboxGl from "react-mapbox-gl";
import NextButton from './NextButton';
import Geocoder from "../../common/Geocoder";

import { setMixLocation } from '../../../actions';
import { getTranslate } from 'react-localize-redux';

import { LOCATION_DEFAULT } from '../../../config.js';

import pinIcon from '../../../img/mix-header-pin.svg';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYW5pY29sYXMiLCJhIjoiY2ppMGFlamtyMTJpNjNwcG8wZ2k5bmc0ZiJ9.pJsIFAWTIkLKNQSJulFP9w"
});



const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height:100%;
  background: radial-gradient(#5E5E5E,#2B2B2B);
  border: 10px solid white;
  h2{
    font-size: 20px;
    font-weight: 600;
  }
  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid white;
    border-radius: 8px;
    height: 50px;
    width: 50px;
  }
`;


class MixLocation extends React.Component {

  constructor(props){
    super(props);
    this.onBackClick = this.onBackClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }


  validateDataUpstream(){
    return this.props.background && this.props.resultImage;
  }

  componentDidMount(){
    if(!this.validateDataUpstream()){
      this.props.history.push("/mix/upload");
    }
  }

  /////////

  onBackClick(){
    this.props.history.push("/mix/create");
  }

  onNextClick(){
    this.props.history.push("/mix/comment");
  }

  /////////

  render(){
    return(
      <Wrapper>
        <MixHeader
          onBackClick={this.onBackClick}
          title={this.props.translate('whats-the-place')}
          icon={pinIcon}
        />
        <Map
          zoom={[16]}
          center={[this.props.location.lng || LOCATION_DEFAULT[0], this.props.location.lat || LOCATION_DEFAULT[1]]}
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "100%",
            width: "100%"
          }}
        >
          <Geocoder
            onMarkerChange={this.props.setMixLocation}
            location={this.props.location}/>
          />
        </Map>
        <div id="geocoder" className="geocoder"></div>
        {
          this.props.location.lat && (
            <NextButton onClick={this.onNextClick}/>
          )
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    background: state.mix.background,
    resultImage: state.mix.resultImage,
    location: state.mix.location,
    translate: getTranslate(state.locale)
  }
}

export default connect(mapStateToProps, { setMixLocation })(MixLocation);

MixLocation.propTypes = {
  history: PropTypes.object
};
