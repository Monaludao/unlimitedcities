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
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { med } from '../../../utils/style';
import { getTranslate } from 'react-localize-redux';

import PremixCardList from '../../common/PremixCardList';
import { reboundMix } from '../../../actions/';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  top: 52px;
  .mixcardlist-container{
    > div{
      ${med(580)`
        width: 100%;
        max-width: calc(100vw - 60px);
      `}
      ${med(800)`
        width: 100%;
        max-width: calc(100vw / 2 - 60px);
      `}
      ${med(1360)`
        width: 100%;
        max-width: calc(100vw / 3 - 60px);
      `}

    }
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin: 20px auto 0;
  }
`;

const Statistics = ({counter, className, translate}) => (
  <div className={className}>
    <h2>{counter} {translate('premix(es)')}</h2>
    <p>{translate('premixes-description')}</p>
  </div>
)

const StatisticsStyled = styled(Statistics)`
  padding: 0 10px;
  font-size: 14px;
  color: #9B9B9B;
  text-align: center;
  line-height: 18px;
  h2{
    padding: 25px 0 5px;
    font-size: 28px;
    line-height: 33px;
    color: #9B9B9B;
  }
`;

let GalleryPremix = (props) => {
  return(
    <Container>
      <StatisticsStyled counter={props.premixs.length} translate={props.translate}/>
      <div className="mixcardlist-container">
        <PremixCardList premixs={props.premixs} reboundMix={props.reboundMix} history={props.history}/>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    premixs: _.compact(_.map(state.gallery.mixs, (mix, key) => {
      if(mix.premix){
        return {
          id: key,
          timestamp: mix.data.timestamp,
          comment: mix.data.comment,
          image: mix.data.image_url,
          background: mix.data.background_url,
          serialized: mix.data.serialized,
          location: mix.data.location,
          libraryId: mix.data.libraryId,
        };
      }
    })),
    translate: getTranslate(state.locale),
  }
}

GalleryPremix = connect(mapStateToProps, {reboundMix})(GalleryPremix);

GalleryPremix.propTypes = {
  history: PropTypes.object
}

export default GalleryPremix
