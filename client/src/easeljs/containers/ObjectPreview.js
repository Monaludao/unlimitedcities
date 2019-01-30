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
import {setObjectActive} from '../../actions';
import store from '../../store';


import ToolsStage from '../stages/ToolsStage';
import BitmapEditable from '../containers/BitmapEditable';

let createjs = window.createjs;

const marginTop = 85;

export default class ObjectPreview extends createjs.Container{
  constructor(imagePath, title, description){
    super();

    store.dispatch(setObjectActive({
      title,
      description
    }));

    this.x = 0;
    this.y = marginTop ;
    this.filename = imagePath;

    let previewImage = new Image();
    previewImage.src = `${imagePath}.png`;

    previewImage.onload = (e) => {

      let bitmap = new createjs.Bitmap(previewImage);
      const { width, height } = previewImage;
      const maxWidthAndHeight = ObjectPreview.maxWidthAndHeight;

      // RESIZE IMAGE IF TOO BIG
      let scale = 1;

      if(height*scale > maxWidthAndHeight){
        scale = maxWidthAndHeight/height;
      }

      if(width*scale > maxWidthAndHeight){
        scale = maxWidthAndHeight/width;
      }

      bitmap.scaleY = scale;
      bitmap.scaleX = scale;

      bitmap.regY = height/2;
      bitmap.regX = width/2;
      bitmap.y = (354/2);
      bitmap.x = 400;

      if(title || description){
        bitmap.x = 65+(354/2);
      }


      this.addChild(bitmap);

      let toolStage =  ToolsStage.currentStage;

      bitmap.on('pressmove', (e) => {
        bitmap.x = e.stageX - bitmap.mouseDifferenceToOrigin.x;
        bitmap.y = e.stageY - bitmap.mouseDifferenceToOrigin.y;
      });

      bitmap.on('mousedown', (e) => {

        store.dispatch(setObjectActive({
          title:"",
          description:""
        }));

        bitmap.mouseDifferenceToOrigin = {
          x: e.stageX-bitmap.x,
          y: e.stageY-bitmap.y
        };

        const oldScaleX = bitmap.scaleX;
        const oldScaleY = bitmap.scaleY;

        createjs.Tween.get(bitmap)
          .to({scaleX: oldScaleX*0.8, scaleY: oldScaleY*0.8}, 200)

        toolStage.removeChild(toolStage.listObjectThumbnail, toolStage.backgroundContainer);

      });

      bitmap.on('pressup', (e) => {

        let bitmapEditable = new BitmapEditable(bitmap.image.src);
        bitmapEditable.x = bitmap.x;
        bitmapEditable.y = bitmap.y+marginTop;
        bitmapEditable.scaleX = bitmap.scaleX;
        bitmapEditable.scaleY = bitmap.scaleY;
        bitmapEditable.regX = bitmap.regX;
        bitmapEditable.regY = bitmap.regY;
        bitmapEditable.filename = this.filename.substring(this.filename.lastIndexOf('/')+1);

        var image = new Image();
        image.src = bitmap.image.src;
        image.onload = (e)=>{
          BitmapEditable.displayBoundingBox(bitmapEditable);
        }

        MainStage.currentStage.saveSerializedStage();
        toolStage.closeToolStage();


      });


    }

  }

  static get maxWidthAndHeight(){
    return 354;
  }


}
