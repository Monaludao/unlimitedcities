/*
Path : /src/actions

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


import firebase from '../utils/firebase';
import reverse from '../utils/reverse-object-order';
import { initialize, addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';

import { LIBRARY_ID, APP_ID, LANGUAGES } from '../config';


// MIX - ACTION TYPES
export const RESET_MIX = 'RESET_MIX';
export const SET_MIX_APP = 'SET_MIX_APP';
export const SET_MIX_LIBRARY = 'SET_MIX_LIBRARY';
export const SET_MIX_BACKGROUND = 'SET_MIX_BACKGROUND';
export const SET_MIX_BACKGROUND_URL = 'SET_MIX_BACKGROUND_URL';
export const SET_MIX_SERIALIZED = 'SET_MIX_SERIALIZED';
export const SET_MIX_RESULT_IMAGE = 'SET_MIX_RESULT_IMAGE';
export const SET_MIX_LOCATION = 'SET_MIX_LOCATION';
export const SET_MIX_COMMENT = 'SET_MIX_COMMENT';
export const SET_MIX_UPLOAD = 'SET_MIX_UPLOAD';
export const SET_MIX_REBOUNDED = 'SET_MIX_REBOUNDED';
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR';

// MIX : GALLERY - ACTION TYPES
export const FETCH_MIXS = 'FETCH_MIXS';
export const SET_SELECTED_MIXS = 'SET_SELECTED_MIXS';
export const SET_SELECTED_MIX = 'SET_SELECTED_MIX';
export const SET_GALLERY_POSITION = 'SET_GALLERY_POSITION';
export const SET_CURRENT_STATE = 'SET_CURRENT_STATE';
export const SET_INTERFACE_TYPE= 'SET_INTERFACE_TYPE';

// OBJECT - ACTION TYPES
export const SET_OBJECT_ACTIVE = 'SET_OBJECT_ACTIVE';

// LIBRARY - ACTION TYPES
export const FETCH_LIBRARY_DATA = 'FETCH_LIBRARY_DATA';
export const UPDATE_PROGRESS_LIBRARY = 'UPDATE_PROGRESS_LIBRARY';

// OTHERS - ACTION TYPES
export const LIKE_MIX = 'LIKE_MIX';
export const SIGN_IN = 'SIGN_IN';



const database = firebase.database();
const Gallery = database.ref("gallery");
const Libraries = database.ref("libraries");
const storageRef = firebase.storage().ref("gallery");

let libraryIsCached = false;

export function onAuthStateChanged(){
  return dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({
          type: SIGN_IN,
          payload: user
        });
      } else {
        console.log("DISCONNECT");
        dispatch(signInAnonymously());
      }
    });
  }
}

export function signInAnonymously(){
  return dispatch => {
    firebase.auth().signInAnonymously().then(user => {
      console.log("has signInAnonymously");
    }).catch(function(error) {
      console.log(error);
    });
  }
}

export function signIn(email, password){
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error);
    });
  }
}

export function signOut(){
  return dispatch => {
    firebase.auth().signOut().then(()=>{
      console.log("You're logded out!")
    });
  }
}

export function resetMix(){
  return{
    type: RESET_MIX
  }
}

export function setMixLibrary(data){
  return{
    type: SET_MIX_LIBRARY,
    payload: data
  }
}

export function setMixApp(data){
  return{
    type: SET_MIX_APP,
    payload: data
  }
}

export function setMixBackground(data){
  return{
    type: SET_MIX_BACKGROUND,
    payload: data
  }
}

export function setMixSerialized(data){
  return{
    type: SET_MIX_SERIALIZED,
    payload: data
  }
}

export function setMixResultImage(data){
  return{
    type: SET_MIX_RESULT_IMAGE,
    payload: data
  }
}

export function setMixLocation(data){
  return{
    type: SET_MIX_LOCATION,
    payload: data
  }
}

export function setMixBackgroundUrl(data){
  return{
    type: SET_MIX_BACKGROUND_URL,
    payload: data
  }
}

export function setMixComment(nickname, comment){
  return{
    type: SET_MIX_COMMENT,
    payload: {nickname, comment}
  }
}

export function setMixUpload(){
  return{
    type: SET_MIX_UPLOAD,
    payload: true
  }
}

export function setMixRebounded(){
  return{
    type: SET_MIX_REBOUNDED,
    payload: true
  }
}


export function saveMix(mix, user, callback, errorCallback){

  return dispatch => {


      const { nickname, comment, location, serialized, background_url } = mix;

      const myLibraryId = mix.libraryId || LIBRARY_ID;
      const myAppId = mix.appId || APP_ID;

      const mixData = {
        'data':{
          'uid': user.uid,
          nickname,
          comment,
          location,
          serialized,
          'timestamp': Date.now(),
          'libraryId': myLibraryId,
          'appId': myAppId
        }
      };

      if(background_url){
        mixData.data.background_url = background_url
      }

      console.log("before");
      console.log({...mixData});
      console.log({...user});
      console.log("user.uid: "+user.uid);

      firebase.auth().signInAnonymously().then(user => {
        console.log("has signInAnonymously twice");
        console.log(user);
        mixData.data.uid = user.uid;

        Gallery.push({...mixData}, (error) => {
          console.log("pushFunction");
          console.log({...mixData});
          if(error){
            alert("An error has occurred in uploading your mix!");
            console.log("pushFunction::error");
            console.log({...mixData});
            console.log(error);
            return errorCallback();
          }
        }).then(res => {
          const uniqKey = res.getKey();
          const backgroundRef = storageRef.child(uniqKey).child('background.jpg');
          const mixRef = storageRef.child(uniqKey).child('mix.jpg');

          let backgroundPercent = 0.;
          let resultPercent = 0.;

          let task2 = mixRef.putString(mix.resultImage, 'data_url');
          task2.on('state_changed',
            (snapshot) => {
              resultPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 50;
              dispatch(updateProgressBar(resultPercent+backgroundPercent));
            },
            (error) => {
              console.log(error);
            },
            () => {
              console.log("mix uploaded");
            }
          );

          if(!background_url){
            let task1 = backgroundRef.putString(mix.background, 'data_url');
            task1.on('state_changed',
              (snapshot) => {
                backgroundPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 50;
                dispatch(updateProgressBar(backgroundPercent+resultPercent));
              },
              (error) => {
                console.log(error);
              },
              () => {
                console.log("background uploaded");
              }
            );
            Promise.all([task1, task2]).then(values => {
              dispatchValues();
            });
          }else{
            Promise.all([task2]).then(values => {
              dispatchValues();
            });
          }

          function dispatchValues(){
            dispatch(resetMix());
            dispatch(setGalleryPosition({
              zoom: 16,
              position: location
            }));
            callback();
          }

        });

      }).catch(function(error) {
        console.log(error);
      });



  }
}

export function updateProgressBar(data){
  return {
    type: UPDATE_PROGRESS_BAR,
    payload: data
  }
}

export function removeMix(id, callback){
  return dispatch => {
    Gallery.child(id).remove().then(() => {
      console.log(`${id} has been removed`);
      callback();
    }).catch(error => {
      alert(`Remove failed for ${id}: ${error.message}`);
      console.log(error);
    })
  };
}

export function reboundMix({background, serialized, location, libraryId=LIBRARY_ID, appId=APP_ID, callback}){
  return dispatch => {

    if(libraryId){
      dispatch(fetchLibraryData(libraryId));
      dispatch(setMixLibrary(libraryId));
    }

    if(appId){
      dispatch(setMixApp(appId));
    }

    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = background;
    image.onload = (e) => {
      dispatch(setMixBackground(imageToBase64(e.target)));
      dispatch(setMixBackgroundUrl(background));
      dispatch(setMixSerialized(serialized));
      dispatch(setMixLocation(location));
      dispatch(setMixRebounded());
      callback();
    }
  };
}


export function fetchMixs(){
  return dispatch => {
    // FETCH ALL MIXS, BUT BUGS WITH STATS
    //Gallery.orderByChild("data/appId").on('value', snapshot => {
    Gallery.orderByChild("data/appId").equalTo(APP_ID).on('value', snapshot => {
      const results = snapshot.val() ? reverse(snapshot.val()) : {};
      dispatch({
        type: FETCH_MIXS,
        payload: results
      })
    });
  };
}



export function setSelectedMixs(markers){
  return{
    type: SET_SELECTED_MIXS,
    payload: markers || []
  }
}

export function setSelectedMix(id){
  return {
    type: SET_SELECTED_MIX,
    payload: id
  }
}

export function setCurrentState(bool){
  return{
    type: SET_CURRENT_STATE,
    payload: bool
  }
}

export function setInterfaceType(type){
  return{
    type: SET_INTERFACE_TYPE,
    payload: type
  }
}

export function setGalleryPosition(data){
  return{
    type: SET_GALLERY_POSITION,
    payload: data
  }
}


export function setObjectActive(obj){
  return {
    type: SET_OBJECT_ACTIVE,
    payload: obj
  }
}


export function initializeLanguages(){

  return dispatch => {
    dispatch(initialize(LANGUAGES.map(elt => elt.country)));
    LANGUAGES.map((elt)=>{
      const lang = elt.lang.toLowerCase();
      const json = require(`../assets/${lang}.locale.json`);
      dispatch(addTranslationForLanguage(json, elt.country));
      return elt;
    });
    dispatch(setActiveLanguage(LANGUAGES[0].country));
  }


}

export function fetchLibraryData(libraryId){
  return dispatch => {
    dispatch(updateProgressLibrary(0));
    dispatch({
      type: FETCH_LIBRARY_DATA,
      payload: {
        'id': libraryId
      }
    });
    const libraryToLoad = libraryId || LIBRARY_ID;
    Libraries.child(libraryToLoad).on('value', snapshot => {
      const results = snapshot.val();
      dispatch({
        type: FETCH_LIBRARY_DATA,
        payload: {
          'id': libraryToLoad,
          'data': results
        }
      });
      if(process.env.NODE_ENV === 'production' && libraryToLoad === LIBRARY_ID){
        cacheLibraryImage(results, dispatch);
      }else if(libraryToLoad === LIBRARY_ID){
        dispatch(updateProgressLibrary(1));
        // cacheLibraryImage(results, dispatch);
      }else{
        dispatch(updateProgressLibrary(1));
      }
    });
  };
}

export function likeMix(id, user, alreadyLike){
  if(alreadyLike){
    Gallery.child(id).child('likes').child(user.uid).set({});
  }else{
    Gallery.child(id).child('likes').child(user.uid).set(1);
  }
}

export function updateProgressLibrary(progress){
  return {
    type: UPDATE_PROGRESS_LIBRARY,
    payload: progress
  }
}

function cacheLibraryImage(libraryData, dispatch){
  if(libraryIsCached){
    dispatch(updateProgressLibrary(1));
    return false;
  }

  libraryIsCached = true;

  let createjs = window.createjs;

  let manifest = libraryData.map(criteria => {
    const path = (criteria.type === "objects") ? "objects" : "textures";
    const ext = (criteria.type === "objects") ? "png" : "jpg";

    return criteria.collection.map(elt =>{
      elt.src = path+"/"+ elt.filename;
      elt.mode = path;
      elt.ext = ext;
      return elt;
    });
  });

  manifest = [].concat(...manifest);

  let preload = new createjs.LoadQueue("true", process.env.PUBLIC_URL+"/img/");

  let manifestIcons = manifest.map(elt => ({
    ...elt,
    src : `${elt.src}_icon.png`
  }));

  let manifestImages = manifest.map(elt =>({
    ...elt,
    src : `${elt.src}.${elt.ext}`
  }));

  preload.loadManifest(manifestIcons);
  preload.on("error", (e) => {console.log(e)});
  preload.on("progress", (e) => {
    dispatch(updateProgressLibrary(e.progress/4));
  });
  preload.on("complete", ()=>{
    let preloadBigImages = new createjs.LoadQueue("true", process.env.PUBLIC_URL+"/img/");
    preloadBigImages.loadManifest(manifestImages);
    preloadBigImages.on("error", (e) => {console.log(e)});
    preloadBigImages.on("progress", (e) => {
      dispatch(updateProgressLibrary(((e.progress/4)*3) + 0.25));
    });
    preloadBigImages.on("complete", (e) => {
      dispatch(updateProgressLibrary(1));
    });
  });

}

function imageToBase64(img)
{
    var canvas, ctx, dataURL;
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    return dataURL;
}
