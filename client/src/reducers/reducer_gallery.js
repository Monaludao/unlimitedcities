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

import { FETCH_MIXS, SET_SELECTED_MIXS, SET_GALLERY_POSITION, SET_SELECTED_MIX, SET_CURRENT_STATE, SET_INTERFACE_TYPE } from '../actions'
import { LOCATION_DEFAULT, ZOOM_DEFAULT } from '../config'

const initialState = {
  mixs: {},
  selectedMixs: {},
  selectedMix: {
    mix:{
      data:{
        serialized: {
          "objects": [],
          "textures": []
        },
      },
      id: null,
      likes: 0
    },
    selectedObject: {
      title: "",
      description: "",
      index: null
    },
    currentState: false,
    interfaceType: 'viewer'
  },
  position: {
    lat: LOCATION_DEFAULT[1],
    lng: LOCATION_DEFAULT[0]
  },
  zoom: ZOOM_DEFAULT,
};

export default function(state = initialState, action) {
  switch (action.type){
      case SET_GALLERY_POSITION:
        return {
          ...state,
          position: initialState.position,
          zoom: initialState.zoom,
          ...action.payload
        };
      case FETCH_MIXS:
        return {
          ...state,
          mixs: action.payload,
        };
      case SET_SELECTED_MIXS:
        return {
          ...state,
          selectedMixs: action.payload
        }
      case SET_SELECTED_MIX:
        console.log({mix:{
          ...state.mixs[action.payload] || initialState.selectedMix.mix,
          id: action.payload
        }});
        return {
          ...state,
          selectedMix: {
            ...initialState.selectedMix,
            mix:{
              ...state.mixs[action.payload] || initialState.selectedMix.mix,
              id: action.payload
            }
          }
        }
      case SET_CURRENT_STATE:
        return {
          ...state,
          selectedMix:{
            ...state.selectedMix,
            currentState: action.payload
          }
        }
      case SET_INTERFACE_TYPE:
        return {
          ...state,
          selectedMix:{
            ...state.selectedMix,
            interfaceType: action.payload
          }
        }
      default:
        return state;
  }
}
