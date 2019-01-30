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
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import ReactSVG from 'react-svg'
import likeIcon from '../../img/like.svg';

const Like = ({className, onClick, likes, user}) => {
  const alreadyLike = likes ? likes[user.uid] : false;

  return (<div className={`${className} ${(alreadyLike ? 'liked' : '')}`}>
    <button onClick={()=>{onClick(user, alreadyLike)}} ><ReactSVG path={likeIcon}/></button>
    <span>
      {likes ? _.size(likes) : 0}</span>
  </div>);
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

Like.propTypes = {
  onClick: PropTypes.func.isRequired,
  likes: PropTypes.object,
  user: PropTypes.object.isRequired
};


const LikeStyled = styled(Like)`
  a, button{
    padding-right: 6px;
  }
  &.liked{
    color:#4A90E2;
    svg path{
      fill: #4A90E2;
      stroke: #4A90E2;
    }
  }
`;

export default connect(mapStateToProps)(LikeStyled);
