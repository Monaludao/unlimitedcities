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
import { connect } from 'react-redux';
import { setCurrentState, setInterfaceType, reboundMix } from '../../../actions';
import Description from './Description'
import BitmapView from '../../../easeljs/containers/BitmapView';
import GalleryStage from '../../../easeljs/stages/GalleryStage';

import { CloseButton, ViewTypeButton, BounceButton } from '../../common/Interface';


function MixGalleryInterface(props){
  return [
    <CloseButton
      key="closeButton"
      onClick={props.onCloseClick}
    />,
    <ViewTypeButton
      key="viewTypeButton"
      onClick={props.onCurrentClick}
      currentState={props.currentState}
    />,
    <BounceButton
      key="bounceButton"
      onClick={props.onBounceClick}
    />
  ]
}


class Interface extends React.Component{
  constructor(props){
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onCurrentClick = this.onCurrentClick.bind(this);
    this.onBounceClick = this.onBounceClick.bind(this);
    this.onObjectClose = this.onObjectClose.bind(this);
  }

  onCloseClick(){
    this.props.history.push({
      pathname: '/map'
    });
  }

  onCurrentClick(){
    this.props.setCurrentState(!this.props.currentState);
    if(this.props.currentState === false){
      document.getElementById("galleryStage").style.display = "none";
    }else{
      document.getElementById("galleryStage").style.display = "block";
    }
  }

  onObjectClose(childIndex){
    BitmapView.background.visible = false;
    GalleryStage.resetChildIndex(childIndex);
    this.props.setInterfaceType('viewer');
  }


  onBounceClick(){
    const {background_url, serialized, location, appId, libraryId} = this.props.selectedMix.mix.data;
    const myLibraryId =   (this.props.libraryId === libraryId) ? null : libraryId;
    this.props.reboundMix({
      background: background_url,
      serialized,
      location,
      'libraryId': myLibraryId,
      appId,
      callback: () => {
        this.props.history.push({
          pathname: '/mix/create'
        });
      }
    });
  }

  render(){
    return(
      <div>
        { this.props.interfaceType === 'inspect' &&
          <Description onObjectClose={this.onObjectClose}/>
        }
        { this.props.interfaceType === 'viewer' && <MixGalleryInterface onCloseClick={this.onCloseClick} currentState={this.props.currentState} onCurrentClick={this.onCurrentClick} onBounceClick={this.onBounceClick}/> }
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedMix: state.gallery.selectedMix,
    currentState: state.gallery.selectedMix.currentState,
    interfaceType: state.gallery.selectedMix.interfaceType,
    libraryId: state.library.id
  }
}

Interface.propTypes = {
  history: PropTypes.object
};

export default connect(mapStateToProps, {setCurrentState, setInterfaceType, reboundMix})(Interface);
