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
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Switch, Route} from 'react-router-dom';
import styled from 'styled-components';

import BackgroundBlurImage from './BackgroundBlurImage';

import MixUpload from './Mix_upload';
import MixCreate from './Mix_create';
import MixLocation from './Mix_location';
import MixComment from './Mix_comment';
import MixSave from './Mix_save';


const Wrapper = styled.div`
  width:800px;
  height: 600px;
  background-color: white;

  @media (min-height: 768px){
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);}
  }

  @media (max-height: 768px){
    position: relative;
    margin: 77px auto;
    transform: translateX(0px) translateY(0px);
    left: 0;
    top: 0;
  }
`;



class Mix extends React.Component {

  componentDidMount(){
    if(this.props.background){
      this.props.history.push(`/mix/create`);
    }
  }

  render() {
    return (
      <div>
        <BackgroundBlurImage image={this.props.background}/>
        <Wrapper>
          <Switch>
            <Route exact path="/mix/" component={MixUpload} />
            <Route exact path="/mix/create/" component={MixCreate} />
            <Route exact path="/mix/location/" component={MixLocation} />
            <Route exact path="/mix/comment/" component={MixComment} />
            <Route exact path="/mix/save/" component={MixSave} />
            <Route component={MixUpload}/>
          </Switch>
        </Wrapper>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    background: state.mix.background
  }
}

export default connect(mapStateToProps)(Mix);

Mix.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
};
