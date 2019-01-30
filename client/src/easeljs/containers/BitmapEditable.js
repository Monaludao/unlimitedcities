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


import MainStage from '../stages/MainStage';
import TransformBox from './TransformBox';
import TextureEditable from './TextureEditable';

let createjs = window.createjs;
export default class BitmapEditable extends createjs.Bitmap{

  constructor(imageOrUri){
      super(imageOrUri);

      this.type = 'BitmapEditable';

      this.on("mousedown", this.onMousedown);
      this.on("pressmove", this.onPressmove);
      this.on("pressup", this.onPressup);

      BitmapEditable.parent.addChild(this);
  }

  /* INSTANCE METHODS */

  onMousedown(e){
    this.mouseDifferenceToOrigin = {
      x: e.stageX-this.x,
      y: e.stageY-this.y
    };

    let stage = BitmapEditable.parent;
    stage.setChildIndex(this, stage.getNumChildren()-1);
    BitmapEditable.boundingBox = null;
    TextureEditable.boundingBox = null;
  }

  onPressmove(e){
    this.x = e.rawX - this.mouseDifferenceToOrigin.x;
    this.y = e.rawY - this.mouseDifferenceToOrigin.y;
    if(e.rawX < 5 || e.rawX > 795 || e.rawY < 5 || e.rawY > 595 ){
      this.alpha = 0.3;
    }else{
      this.alpha = 1;
    }
  }

  onPressup(e){
    if(e.rawX < 5 || e.rawX > 795 || e.rawY < 5 || e.rawY > 595 ){
      this.parent.removeChild(this);
      MainStage.currentStage.saveSerializedStage();
    }else{
      MainStage.currentStage.saveSerializedStage();
      BitmapEditable.displayBoundingBox(this);
    }
  }

  draw(ctx, ignoreCache){
    super.draw(ctx, ignoreCache);
    this.regX = this.image.width/2;
    this.regY = this.image.height/2;
  }


  /* STATIC METHODS */

  static get boundingBox(){
      return BitmapEditable._boundingBox;
  }

  static set boundingBox(box){
    if(BitmapEditable._boundingBox){
      BitmapEditable.parent.removeChild(BitmapEditable._boundingBox)
    }

    BitmapEditable._boundingBox = box;
    BitmapEditable.parent.addChild(box);
  }

  static displayBoundingBox(bitmap){
    let transformBox = new TransformBox(bitmap);
    BitmapEditable.boundingBox = transformBox;
    BitmapEditable.parent.addChild(transformBox);
  }


}
