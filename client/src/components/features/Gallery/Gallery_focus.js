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
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';
import GalleryStage from '../../../easeljs/stages/GalleryStage';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Like from '../../common/Like';
import Interface from './Interface';
import MixImage from './MixImage';
import { TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';
import { getActiveLanguage } from 'react-localize-redux';

import _ from 'lodash';
import FormatedDate from '../../common/FormatedDate';

// ACTIONS
import { likeMix, setSelectedMix, setInterfaceType, removeMix, fetchLibraryData} from '../../../actions/';


// RESSOURCES
import nextMix from '../../../img/next-mix.svg';
import previousMix from '../../../img/previous-mix.svg';


const Wrapper = styled.div`
  width:800px;
  height: 600px;
  background-color: white;
  border: 10px solid white;
  border-radius: 4px;

  #descriptionOfObject{
      position: absolute;
      top:20px;
      right: 20px;
      width: 280px;
      height: auto;
      background-color: rgba(0,0,0,0.9);

      font-size: 14px;
      line-height: 17px;

      button{
        padding: 10px;
        position: absolute;
        right: 0px;
        top: 0px;
      }

      h3{
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
      }

  }

  canvas{
    position:absolute;
    top:0;
    left:0;
    box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.1);
  }

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

  .actions{
    margin-bottom: 80px;
    display: flex;
    justify-content: space-between;
    color: #9B9B9B;
    padding: 10px 10px 10px;
    margin-left: -10px;
    background-color: white;
    width: 100%;
    border-top: 1px solid #ECECEC;
    font-size: 16px;
    border-radius: 0 0 4px 4px;
    div {
      &[role="button"]{
        cursor: pointer;
      }
      &.SocialMediaShareButton{
        margin-left: 8px;
      }
      align-items: center;
      display: flex;
    }
  }
`;

const Comment = styled.div`
  position: relative;
  width: 800px;
  border: 10px solid white;
  border-top:none;
  background-color: white;
  left: -10px;

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
`;

const Background = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  background:${props => props.color};
`;


const Next = ({ className, onClick }) => (
  <button className={className} onClick={onClick}>
    <img src={nextMix} alt="Next"/>
  </button>
);

const StyledNext = styled(Next)`
  display: block;
  position: absolute;
  top: ${(620/2)-(84/2)}px;
  right: -100px;
`;


const Previous = ({ className, onClick }) => (
  <button className={className} onClick={onClick}>
    <img src={previousMix} alt="Previous"/>
  </button>
);

const StyledPrevious = styled(Previous)`
  display: block;
  position: absolute;
  top: ${(620/2)-(84/2)}px;
  left: -100px;
`;




class GalleryMix extends React.Component{

  constructor(props){
    super(props);

    this.onNavigationClick = this.onNavigationClick.bind(this);
    this.onObjectClick = this.onObjectClick.bind(this);
    this.deleteMix = this.deleteMix.bind(this);
  }

  onObjectClick(){
    this.props.setInterfaceType('inspect');
  }

  componentDidMount(){
    const paramId = this.props.match.params.id;
    const mixs = this.props.mixs;
    if(!_.isEmpty(mixs) && !mixs[paramId]){
      this.props.history.push({
        pathname: '/gallery/',
      });
      return;
    }
    else{
      const {serialized, libraryId} = this.props.selectedMix.data;
      if(this.props.libraryId !== libraryId){
        this.props.fetchLibraryData(libraryId);
      }
      if(!_.isEmpty(serialized)){
        window.galleryStage = new GalleryStage("galleryStage", serialized);
        window.galleryStage.onObjectClick = this.onObjectClick;
      }else{
        window.galleryStage = new GalleryStage("galleryStage", null);
        window.galleryStage.onObjectClick = null;
      }
    }
  }


  componentDidUpdate(prevProps, prevState){
    const mixs =  this.props.mixs;
    const selectedMix = this.props.selectedMix;
    const {id: mixId, data: mixData} = selectedMix;
    const paramId = this.props.match.params.id;

    if(_.isEmpty(mixs)){
      return;
    }else {
      if(paramId !== mixId){
        this.props.setSelectedMix(paramId);
        return false;
      }else{
        if(mixs[mixId]){
          if(selectedMix.likes !== mixs[mixId].likes){
            this.props.setSelectedMix(paramId);
          }
          if(mixs[mixId].data.libraryId !== this.props.libraryId){
            this.props.fetchLibraryData(mixs[mixId].data.libraryId);
          }
        }else{
          this.props.history.push({
            pathname: '/gallery/',
          });
        }
      }
    }

    if(!_.isEmpty(mixs) && !mixs[paramId]){
      this.props.history.push({
        pathname: '/gallery/',
      });
      return;
    }

    const {serialized} = mixData;

    if(prevProps.selectedMix.id !== this.props.selectedMix.id){
      if(!_.isEmpty(serialized)){
        console.log(serialized);
        window.galleryStage = new GalleryStage("galleryStage", serialized, ()=>{fadeInWrapper(mixData.image_url)});
        window.galleryStage.onObjectClick = this.onObjectClick;
      }else{
        window.galleryStage = new GalleryStage("galleryStage", null, ()=>{fadeInWrapper(mixData.image_url)});
        window.galleryStage.onObjectClick = null;
      }
    }

    function fadeInWrapper(img){
      let image = new Image();
      image.src = img;
      image.onload = (e) => {
        const mixContainer = document.getElementById('mix-container');
        if(mixContainer){
          mixContainer.classList.remove('fadeOut');
          mixContainer.classList.add('fadeIn');
        }
      }
    }

  }

  onNavigationClick(e, id){
    document.getElementById('mix-container').classList.add('fadeIn');
    document.getElementById('mix-container').classList.add('fadeOut');
    setTimeout(() => {
      this.props.history.push({
        pathname: '/gallery/'+id,
      });
    }, 500);
  }

  deleteMix(id){
    if (window.confirm('Are you sure you want to remove this mix?')) {
        this.props.removeMix(id,()=>{
          this.props.history.push({
            pathname: '/gallery/',
          });
        });
    }
  }

  render(){

    let selectedMixs = this.props.selectedMixs;
    const selectedMix = this.props.selectedMix;
    const mixData = selectedMix.data;

    if(_.isEmpty(mixData.image_url)){
      return null;
    }

    this.previousMix = null;
    this.nextMix = null;

    if(_.isEmpty(selectedMixs)){
      selectedMixs = this.props.mixs;
      var arr = _.keys(selectedMixs);
      const idxOfCurrentMix = arr.indexOf(selectedMix.id);
      if(idxOfCurrentMix > 0){
          this.previousMix = arr[idxOfCurrentMix-1];
      }
      if(idxOfCurrentMix < arr.length-1){
        this.nextMix = arr[idxOfCurrentMix+1]
      }
    }else{
      const idx = selectedMixs.findIndex((elt)=>(elt.id === this.props.match.params.id));
      if(idx > 0){
        this.previousMix = selectedMixs[idx-1].id;
      }
      if(idx < selectedMixs.length-1){
        this.nextMix = selectedMixs[idx+1].id;
      }
    }

    const meta = {
      title: 'Unlimited Cities : DIY',
      description: mixData.comment,
      property: {
          'og:title': 'Unlimited Cities : DIY',
          'og:type': 'article',
          'og:image': mixData['image_url'],
        }
    };


    return(
      <DocumentMeta {...meta}>
        <Background color="#F2F2F2">
        </Background>
        <Wrapper id="mix-container" className="animated">
          <MixImage/>
          <canvas id="galleryStage" width="800" height="600" style={{zIndex:1}}></canvas>
          <Interface history={this.props.history} />
          <Comment>
            <p>{mixData.comment}</p>
            <h3>{mixData.nickname}</h3>
          </Comment>
          <div className="actions">
            <div className="left">
              <Like onClick={(user, alreadyLike)=>{likeMix(selectedMix.id, user, alreadyLike)}} likes={selectedMix.likes}/>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={25} round />
              </TwitterShareButton>
              <EmailShareButton url={window.location.href}>
                <EmailIcon size={25} round />
              </EmailShareButton>
            </div>
            {this.props.user.isAnonymous === false &&
              <div>
                <button style={{background: 'red', padding: '5px 10px', color: 'white', borderRadius: 2}} onClick={()=>{this.deleteMix(selectedMix.id)}}>Remove this mix</button>
              </div>
            }
            <div className="right">
              <FormatedDate timestamp={mixData.timestamp}/>
            </div>
          </div>
          {this.previousMix &&
            <StyledPrevious
              onClick={(e)=>{
                this.onNavigationClick(e, this.previousMix)
              }}
            />
          }
          {this.nextMix &&
            <StyledNext
              onClick={(e)=>{
                this.onNavigationClick(e, this.nextMix)
              }}
            />
          }
        </Wrapper>
      </DocumentMeta>
    )

  }
}

GalleryMix.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: getActiveLanguage(state.locale).code,
    selectedMix: state.gallery.selectedMix.mix,
    selectedMixs: state.gallery.selectedMixs,
    mixs: state.gallery.mixs,
    user: state.user,
    libraryId: state.library.id
  }
}

export default connect(mapStateToProps, {setSelectedMix, likeMix, setInterfaceType, removeMix, fetchLibraryData})(GalleryMix);
