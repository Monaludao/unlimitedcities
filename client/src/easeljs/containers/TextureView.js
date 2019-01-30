/*
Path : /src/easeljs/containers

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


let createjs = window.createjs;
export default class TextureEditable extends createjs.Bitmap{

  constructor(imageOrUri, instructions){
      super(imageOrUri);

      this.x = 0;
      this.y = 0;

      this.customMask = new createjs.Shape();
      this.customMask.graphics.setStrokeStyle(1).beginStroke("#fff");

      instructions.map((elt, index) => {
        if(index===0){
          this.customMask.graphics.moveTo(elt.x, elt.y);
        }else{
          this.customMask.graphics.lineTo(elt.x, elt.y);
        }
        return elt;
      })
      TextureEditable.parent.addChild(this);
      this.mask = this.customMask;

  }
}
