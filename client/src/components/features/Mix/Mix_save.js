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
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height:100%;
  background: radial-gradient(#5E5E5E,#2B2B2B);
  border: 10px solid white;

  progress[value]{
    height:40px;
    width:520px;
  }
`;


class MixSave extends React.Component{

  validateDataUpstream(){
    return this.props.uploading;
  }

  componentDidMount(){
    if(!this.validateDataUpstream()){
      this.props.history.push("/mix/comment");
    }
  }

  render(){
    return(
      <Wrapper>
        <progress
          max="100"
          value={this.props.progressValue}
        />
      </Wrapper>
    )
  }

}

const mapStateToProps = state => ({
  uploading: state.mix.uploading,
  progressValue: state.mix.progress
});


export default connect(mapStateToProps)(MixSave);
