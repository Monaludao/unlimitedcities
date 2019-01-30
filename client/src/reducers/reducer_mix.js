/*
Path : /src/reducers

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


import { SET_MIX_APP, SET_MIX_BACKGROUND ,SET_MIX_LIBRARY ,SET_MIX_BACKGROUND_URL ,SET_MIX_RESULT_IMAGE ,SET_MIX_SERIALIZED ,SET_MIX_LOCATION ,SET_MIX_COMMENT, SET_MIX_UPLOAD, SET_MIX_REBOUNDED, UPDATE_PROGRESS_BAR ,RESET_MIX } from '../actions'
import { LOCATION_DEFAULT } from '../config'

const initialState = {
  background: "",
  resultImage: "",
  serialized: {
    "objects": [],
    "textures": []
  },
  location: {
    lat: LOCATION_DEFAULT[1],
    lng: LOCATION_DEFAULT[0]
  },
  nickname: "",
  comment: '',
  progress: 0,
  uploading: false,
  rebounded: false
}

export default function(state = initialState, action) {
  switch (action.type){
      case SET_MIX_APP:
        return{
          ...state,
          appId: action.payload
        };
      case SET_MIX_LIBRARY:
        return{
          ...state,
          libraryId: action.payload
        };
      case SET_MIX_BACKGROUND:
        return{
          ...state,
          background: action.payload
        };
      case SET_MIX_BACKGROUND_URL:
        return{
          ...state,
          background_url: action.payload
        };
      case SET_MIX_RESULT_IMAGE:
        return{
          ...state,
          resultImage: action.payload
        };
      case SET_MIX_SERIALIZED:
        return {
          ...state,
          serialized: action.payload
        };
      case SET_MIX_LOCATION:
        return{
          ...state,
          location: action.payload
        };
      case SET_MIX_COMMENT:
        return{
          ...state,
          nickname: action.payload.nickname,
          comment: action.payload.comment
        };
      case SET_MIX_UPLOAD:
        return{
          ...state,
          uploading: action.payload
        };
      case SET_MIX_REBOUNDED:
        return{
          ...state,
          rebounded: action.payload
        };
      case UPDATE_PROGRESS_BAR:
        return{
          ...state,
          progress: action.payload
        };
      case RESET_MIX:
        return initialState;
      default:
        return state;
  }
}
