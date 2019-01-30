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
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getActiveLanguage} from 'react-localize-redux';
import styled from 'styled-components';
import MainStage from '../../../easeljs/stages/MainStage';
import ToolsStage from '../../../easeljs/stages/ToolsStage';
import {LANGUAGES} from '../../../config';

import { CloseButton, CategoryList, NextButton, DescriptionObject, BackButton, CategoryIndicator } from '../../common/Interface';

import { resetMix, setMixResultImage, setMixSerialized } from '../../../actions';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height:100%;
  background: radial-gradient(#5E5E5E,#2B2B2B);
  border: 10px solid white;

  canvas{
    position:absolute;
    top:0;
    left:0;
  }

  @keyframes showTools {
  	from { opacity: 0.5; }
  	to { opacity: 1; }
  }
`;



class MixCreate extends React.Component {

  constructor(props){
    super(props);

    this.state = {interfaceType: 'main', currentSelected:null};

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);

  }

  componentDidMount(){
    if(this.validateDataUpstream()){
      new MainStage("mainStage", this.props.mixBackground, this.props.mixSerialized);
    }else{
      this.props.history.push("/mix/upload");
    }
  }

  /////////

  validateDataUpstream(){
    return this.props.mixBackground;
  }

  onBackClick(){
    this.setState({interfaceType:'main', currentSelected: null});
    ToolsStage._currentStage.removeAllEventListeners();
    const canvas = document.getElementById('toolsStage');
    canvas.style.display = "none";
    canvas.opacity = 0;
  }

  onCategoryClick(categoryIndex){
    this.setState({interfaceType:'tools', currentSelected:categoryIndex});
    const toolsStage = new ToolsStage("toolsStage",categoryIndex);
    toolsStage.closeToolStage = () => {this.onBackClick()} ;
  }

  onCloseClick(){
    let confirmation = window.confirm("are you sure you want to remove your mix?");
    if (confirmation == true) {
      sessionStorage.removeItem("background");
      this.props.resetMix();
      this.props.history.push("/mix/upload");
    }
  }

  onNextClick(){
    const currentStage = MainStage.currentStage;
    this.props.setMixSerialized(currentStage.serializeStage());
    this.props.setMixResultImage(currentStage.toDataURL());
    if(this.props.mixRebounded){
      this.props.history.push("/mix/comment");
    }else{
      this.props.history.push("/mix/location");
    }
  }

  /////////

  render(){

    const { libraryUploadProgress } = this.props;
    if(!libraryUploadProgress || libraryUploadProgress < 1){
      return (
        <Wrapper>
          <span style={{color:'white', fontSize:'42px'}}>
            {Math.round(this.props.libraryUploadProgress*100)}%
          </span>
        </Wrapper>
      )
    }

    return(
      <Wrapper>
        <canvas id="mainStage" width="800" height="600" style={{zIndex:1}}></canvas>
        <canvas id="toolsStage" width="800" height="600" style={{zIndex:2, display:'none'}}></canvas>

        { this.state.interfaceType === 'main' &&
          (
            <div style={{
              position:'initial',
              zIndex: 3
            }}>
              <MainInterface
                onNextClick={this.onNextClick}
                onCloseClick={this.onCloseClick}
                onCategoryClick={this.onCategoryClick}
                categories={this.props.library}
              />
            </div>
          )
        }

        { this.state.interfaceType === 'tools' &&
          (
            <div style={{
              position:'initial',
              zIndex: 3
            }}>
              <ToolsInterface
                style={{position:'absolute', zIndex: 3}}
                library={this.props.library}
                onBackClick={this.onBackClick}
                selectedCategoryId={this.state.currentSelected}
                objectDescription={this.props.obj}
                currentLanguage={this.props.currentLanguage}
              />
            </div>
          )

        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    obj: state.obj,
    mixBackground : state.mix.background,
    mixSerialized : state.mix.serialized,
    mixRebounded: state.mix.rebounded,
    currentLanguage: getActiveLanguage(state.locale).code,
    libraryUploadProgress: state.library.progress,
    library: _.map(state.library.data, function(object) {
      return _.pick(object, ['id', 'type', 'icon']);
    })
  }
}

export default connect(mapStateToProps, {setMixResultImage, setMixSerialized, resetMix})(MixCreate);


MixCreate.propTypes = {
  history: PropTypes.object
};


function MainInterface(props){
  return [
    <CloseButton
      key="closeButton"
      onClick={props.onCloseClick}
    />,
    <CategoryList
      key="categoryList"
      categories={props.categories}
      onClick={props.onCategoryClick}
    />,
    <NextButton
      key="nextButton"
      onClick={props.onNextClick}
    />
  ]
}

function ToolsInterface({library, selectedCategoryId, objectDescription, currentLanguage, onBackClick}){
  const selectedCategory = library[selectedCategoryId];
  const lang = LANGUAGES.find(e => (e.country === currentLanguage)).lang.toUpperCase();
  
  return [
    <DescriptionObject
      key="descriptionObject"
      type={selectedCategory.type}
      title={objectDescription.title[lang] || objectDescription.title['EN']}
      description={objectDescription.description[lang] || objectDescription.description['EN']}
    />,
    <BackButton
      key="BackButton"
      onClick={onBackClick}
    />,
    <CategoryIndicator
      key="categoryIndicator"
      title={selectedCategory.title}
      icon={selectedCategory.icon}
    />
  ]
}
