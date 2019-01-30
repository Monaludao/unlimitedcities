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


import { SET_OBJECT_ACTIVE } from '../actions'

const initialState = {
  title: "",
  description: "",
  index: null
};

export default function(state = initialState, action) {
  switch (action.type){
      case SET_OBJECT_ACTIVE:
        const {title, description, childIndex} =  action.payload;
        return{
          title: title || "",
          description : description || "",
          childIndex: childIndex || null
        };
      default:
        return state;
  }
}
