/*
Path : /src/components/features/Gallery

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
import { connect } from 'react-redux';
import { getActiveLanguage } from 'react-localize-redux';
import {LANGUAGES} from '../../../config';

// RESSOURCES
import closeButton from '../../../img/button-cross.svg';

const Description = ({onObjectClose, obj, currentLanguage}) => {

  const lang = LANGUAGES.find(e => (e.country === currentLanguage)).lang.toUpperCase();

  if((obj.title[lang] || obj.title['EN'])|| (obj.description[lang] || obj.description['EN'])){
    return(
      <div id="descriptionOfObject">
        <button onClick={()=>{onObjectClose(obj.childIndex)}}><img src={closeButton} alt="Close object's description" width="10"/></button>
        <div id="descriptionOfObject-content">
          <h1>{obj.title[lang] || obj.title['EN']}</h1>
          {obj.description[lang] || obj.description['EN']}
        </div>
      </div>
    )
  }else{
    return (
      <button style={{position:'absolute', top: 10, right: 10, zIndex:99}} onClick={()=>{onObjectClose(obj.childIndex)}}><img src={closeButton} alt="Close object's description" width="25"/></button>
    );
  }


};

Description.propTypes = {
  onObjectClose: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: getActiveLanguage(state.locale).code,
    obj: state.obj
  }
}

export default connect(mapStateToProps)(Description);
