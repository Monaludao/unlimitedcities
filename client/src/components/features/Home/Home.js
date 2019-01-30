/*
Path : /src/components/features/Home

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
import { getTranslate } from 'react-localize-redux';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(${process.env.PUBLIC_URL+'/img/home/background.jpg'});
  background-size: cover;
  text-align: center;

  h1{
    font-size: 2.6em;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.50);
    padding: 10px;
  }

  h2{
    font-size: 1.4em;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.50);
    padding: 10px;
    font-weight: 200;
    padding-bottom: 20px;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.4em;
  }
  p{
    font-size: 0.9em;
    color: white;
    line-height: 1.4em;
    max-width: 400px;
    margin: 0 auto;
    text-align: justify;
    padding-bottom: 20px;
  }

  div{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    img{
      padding: 0 8px;
    }
  }
`;

const Description = styled.div`
  background: #e2e1ea;
  color: #6c6b75;
  padding: 60px 0 100px;
  div{
    max-width: 780px;
    width: 100%;
    padding: 10px;
    margin: 0 auto;

    h2{
      font-size: 1.8em;
      padding: 0.4em 0;
    }

    p, ul{
      padding-bottom: 1em;
      line-height: 1.4em;
    }

    li:before {
       content: '- ';
    }

    hr{
      margin: 0.5em 0 1em;
    }

    h3{
      font-size: 1em;
      padding: 0.8em 0;
      font-weight: bold;

    }
    a{
      color: black;
    }
  }
`;

const Legal = styled.div`
  background: #d2d1dc;
  color: #444250;
  padding: 60px 0 100px;
  div{
    max-width: 780px;
    width: 100%;
    padding: 10px;
    margin: 0 auto;

    a{color: inherit;}

    h2{
      font-size: 1.8em;
      padding: 0.5em 0;
    }

    p{
      padding-bottom: 1em;
      line-height: 1.4em;
      b{
        font-weight: bold;
      }
    }

  }
`;




class Home extends React.Component {
  render(){
    const {translate} = this.props;
    return(
      <div>
        <Container>
          <h1>{translate('app-title')}</h1>
          <h2>{translate('app-subtitle')}</h2>
          <p>{translate('app-short-description')}</p>
          <a data-scroll href="#description">
            <img className="animated pulse infinite" src={process.env.PUBLIC_URL+'/img/arrow-bottom.svg'} />
          </a>
        </Container>
        <Description id="description">
          <div>
            {
              translate('app-long-description')
            }
          </div>
        </Description>
        <Legal>
          <div>
            {translate('GDPR')}
          </div>
        </Legal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.locale),
  }
}


export default connect(mapStateToProps)(Home);
