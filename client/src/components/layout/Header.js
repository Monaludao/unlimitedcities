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
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { med } from '../../utils/style';
import { colors } from '../../styles/theme';

import { getTranslate, getActiveLanguage, getLanguages, setActiveLanguage } from 'react-localize-redux';

import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

import logo from '../../img/logo.svg';


const Wrapper = styled.header`
  background-color: white;
  text-align: center;
  position: fixed;
  top:0;
  z-index: 9999;
  width: 100%;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.20);
  min-width: 800px;

  .flag-select{
    position: absolute;
    top: 10px;
    right: 0;

    span.country-label{
      display: none;
      ${med(760)`
        display: inline;
      `}
    }

  }

  nav{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    min-height: 52px;
    button{
      ${med(760)`
      display: none;
      `}
      position: absolute;
      left: 10px;
      top:0;
      height: 52px;
      width: 42px;
    }



    ul li a{
      justify-content: center;
    }

  }
`;

const StyledNavLink = styled(NavLink)`
  &.active{
    font-weight: bold;
    border-bottom: 4px solid ${colors.grey};
  }
  display: inline-block;
  padding: 12px 0;
  text-align: center;
	color: ${colors.grey};
	font-weight: 200;
  text-decoration: none;
  font-size: 24px;
  width: 140px;
  border-bottom: none;
`;

const StyledLi = styled.li`
  display: inline-block;
`;

const Logo = styled(NavLink)`
  &.active{
    opacity: 1;
  }
  opacity: 0.5;
  position: absolute;
  left: 15px;
`;


function Header({ translate, currentLanguage, availableLanguages, setLanguage }){
  return (
    <Wrapper>
      <nav id="top-nav">
        <Logo exact to="/" activeClassName="active">
          <img src={logo} alt="Unlimited Cities : Collage" />
        </Logo>
        <ul>
          <StyledLi>
            <StyledNavLink to="/mix/" activeClassName="active">{translate('mix')}
            </StyledNavLink>
          </StyledLi>
          <StyledLi>
            <StyledNavLink to="/map/" activeClassName="active">{translate('map')}
            </StyledNavLink>
          </StyledLi>
          <StyledLi>
            <StyledNavLink to="/gallery/" activeClassName="active">{translate('gallery')}
            </StyledNavLink>
          </StyledLi>
        </ul>
        <ReactFlagsSelect
          defaultCountry={currentLanguage}
          countries={availableLanguages}
          showOptionLabel={true}
          customLabels={{"GB": "English", "TH": "中文"}}
          showSelectedLabel={true}
          onSelect={setLanguage}
        />
        <button onClick={()=>{document.getElementById('top-nav').classList.toggle('open');}}>
          <span className='hamburger'></span>
        </button>
      </nav>
    </Wrapper>
  )
};

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code,
  availableLanguages: getLanguages(state.locale).map((e)=>e.code)
});

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: countryCode => {
      dispatch(setActiveLanguage(countryCode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
