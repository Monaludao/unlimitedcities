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


import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTranslate } from 'react-localize-redux';
import _ from 'lodash';
import { getActiveLanguage } from 'react-localize-redux';
import {LANGUAGES} from '../../config';


const colors = [
  "#7EC72A",
  "#4A90E2",
  "#E69C2A",
  "#E62A2A"
]

const Bar = ({className, statistics}) => {
  const colorsBar = colors.slice();
  return(
    <div className={className}>
      {
        _.map(statistics.criteria, (criteria, index) => {
          const width = (criteria/statistics.total) * 100;
          const color = colorsBar.shift();
          return (
            <div key={`bar-${index}`} style={{height:'100%', width: `${width}%`, backgroundColor: color}}></div>
          );
        })
      }
    </div>
  );
}

const BarStyled = styled(Bar)`
  margin: 0 auto;
  width: calc(100% - 40px);
  height: 4px;
  background-color: white;
  margin-top: 12px;
  border-radius: 2px;
  display: flex;
`;


const Legend = ({className, statistics}) => {
  const colorsCritera = colors.slice();
  return(
    <div className={className}>
      {
        _.map(statistics.criteria, (criteria, index) => {
          const color = colorsCritera.shift();
          return (
            <div key={`bar-title-${index}`}><span style={{color: color}}>●</span> {index}</div>
          );
        })
      }
    </div>
  );
}

const LegendStyled = styled(Legend)`
  display: flex;
  margin: 0 auto;
  padding-top: 15px;
  justify-content: center;
  > div {
    margin: 0 8px;
  }
`;

const Statistics = ({mixs, library, translate, selectedMixs, currentLanguage, className}) => {

    let statistics = {};
    statistics.criteria = {};
    statistics.total = 0;

    const lang = LANGUAGES.find(e => (e.country === currentLanguage)).lang.toUpperCase();

    selectedMixs = selectedMixs || Object.keys(mixs);

    selectedMixs.map((elt, index) => {
      let mix = mixs[elt.id ||elt];
      if(!mix.data.serialized || !mix.data.serialized.objects){
        return null;
      }
      return mix.data.serialized.objects.map((obj)=>{
        if(!library){
          return false;
        }
        library.map((category)=>{
          let categoryName = category.title[lang.toUpperCase()];
          category.collection.map((obj_c)=>{
            if(obj.filename===obj_c.filename){
              statistics.criteria[categoryName] = (statistics.criteria[categoryName]||0) + 1;
              statistics.total += 1;
              return false;
            }
            return false;
          })
          return false;
        })
        return false;
      })
    });

  return(
    <div className={className}>
      <h2>
        {selectedMixs.length} mix(s)
      </h2>
      {translate("object-division")}
      {statistics.criteria && <BarStyled statistics={statistics}/>}
      {statistics.criteria && <LegendStyled statistics={statistics}/>}
    </div>
  );
};



Statistics.propTypes = {
  selectedMixs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  )
};


const StatisticsStyled = styled(Statistics)`
  font-size: 14px;
  color: #9B9B9B;
  text-align: center;
  h2{
    padding: 25px 0 5px;
    font-size: 28px;
    color: #9B9B9B;
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    mixs: state.gallery.mixs,
    library: state.library.data,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps)(StatisticsStyled);
