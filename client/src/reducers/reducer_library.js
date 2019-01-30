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


import { FETCH_LIBRARY_DATA, UPDATE_PROGRESS_LIBRARY} from '../actions'
import { LIBRARY_ID } from '../config';

const initialState = {
  id: LIBRARY_ID,
  data: [
    {
      title: "",
      icon: "",
      collection: [
        {
          title: {
            "EN": ""
          },
          description: {
            "EN": ""
          },
          filename: ""
        }
      ]
    }
  ],
  progress: 0
};

export default function(state = initialState, action) {
  switch (action.type){
      case FETCH_LIBRARY_DATA:
        return {
          ...state,
          ...(action.payload)
        }
      case UPDATE_PROGRESS_LIBRARY:
        return {
          ...state,
          progress: action.payload
        }
      default:
        return state;
  }
}
