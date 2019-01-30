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
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../utils/style';

import FormatedDate from './FormatedDate';
import Like from './Like';
import LoaderHOC from './LoaderHOC';

import ellipsis from 'text-ellipsis';

import { likeMix } from '../../actions';


const Thumbnail = ({image, onClick}) => (
  <div className="thumbs" onClick={onClick}>
    <img src={image} alt="Mix"/>
  </div>
);

const ThumbnailWithLoader = LoaderHOC('image')(Thumbnail);

const MixCard = ({ id, className, onClick, comment, nickname, thumbnail, timestamp, likes}) => (
  <div className={className}>
    <ThumbnailWithLoader onClick={onClick} image={thumbnail}/>
    <p>{ellipsis(comment, 200)}</p>
    <h3>{nickname}</h3>
    <div className="actions">
      <div className="left">
        <Like onClick={(user, alreadyLike)=>{likeMix(id, user, alreadyLike)}} likes={likes}/>
      </div>
      <div className="right">
        <FormatedDate timestamp={timestamp}/>
      </div>
    </div>
  </div>
);

MixCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  thumbnail: PropTypes.string
};

const MixCardStyled = styled(MixCard)`
  position: relative;
  background-color: white;
  border: 10px solid white;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.15);
  border-radius: 2px;
  margin: ${props => props.margin || 20}px;
  width: 100%;
  height: 100%;
  ${media['screen-sm-min']`
    max-width:300px;
  `}
  .thumbs{
    width: 100%;
    height: auto;
    position: relative;
    cursor: pointer;
    &::after{
      content: '';
      top:0; left:0; right:0; bottom:0;
      position: absolute;
      box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.1);
    }
    img{
      display: inline-block;
      width: 100%;
      background-color: #CBCBCB;
    }
  }
  p{
    font-weight: 200;
    line-height: 20px;
    padding-top: 5px;
    font-size: 16px;
    &::before{
      content: '« ';
    }
    &::after{
      content:' »';
    }
  }
  h3{
    font-size: 16px;
    font-weight: 400;
    font-style: italic;
    text-align: right;
    padding: 4px 0 12px;
    &::before{
      content: '- ';
    }
  }
  .actions{
    display: flex;
    justify-content: space-between;
    color: #9B9B9B;
    padding: 10px 10px 0;
    margin-left: -10px;
    width: 100%;
    border-top: 1px solid #ECECEC;
    div {
      display: flex;
    }
  }
`;


export default MixCardStyled;
