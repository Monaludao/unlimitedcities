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
import styled from 'styled-components';

import backButton from '../../../img/button-back.svg';


const Wrapper = ({ className, children, onBackClick, icon, title}) => (
  <div className={className}>
    <div>
      <button onClick={onBackClick}>
        <img alt="back" src={backButton}/>
      </button>
    </div>
    <div>
      <h2>{title}</h2>
    </div>
    <div className="icon">
      <img alt="step" src={icon}/>
    </div>
  </div>
)

export default styled(Wrapper)`
  position: absolute;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height:70px;
  width:760px;
  background:#292929;
  color: white;
  padding: 0 20px;
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
