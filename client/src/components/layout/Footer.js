/*
Path : /src/components/layout

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

const Footer = styled.footer`
  position: fixed;
  background-color: #2A3948;
  width: 100vw;
  height: 35px;
  font-size: 14px;
  bottom: 0px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  z-index: 999;

  a{
  	font-size: 100%;
  	font: inherit;
  	color: inherit;
    text-decoration: none;
  }

  .left{
    padding: 0 15px;
  }

  .right{
    padding: 0 15px;
    ul{
      display: flex;
      li{
        display: flex;
        padding-left: 10px;
      }
    }
  }
`;

export default function Listing({ className }) {
  return (
    <Footer className={className}>
      <div className="left">
        <a href="https://www.host-lab.org" target="_blank"><b>Unlimited Cities</b> by <b>Host <i>Lab</i></b></a>
      </div>
      <div className="right">
        <ul>
          <li>7 Billion Urbanists</li>
        </ul>
      </div>
    </Footer>
  )
}
