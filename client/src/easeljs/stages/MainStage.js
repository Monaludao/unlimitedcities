/*
Path : /src/easeljs/stages

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


import {setMixSerialized} from '../../actions';
import store from '../../store';


import BitmapEditable from '../containers/BitmapEditable';
import TextureEditable from '../containers/TextureEditable';

let createjs = window.createjs;
export default class MainStage extends createjs.Stage{

  constructor(canvasId, background, serialized){
    super(canvasId);

    this.serialized = serialized;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", e => {
      this.update(e);
    });

    this.on("stagemouseup", function(event) {
			if(!event.relatedTarget){
        BitmapEditable.boundingBox = null;
        TextureEditable.boundingBox = null;
      }
		});

    createjs.Touch.enable(this);

    let bitmap = new createjs.Bitmap(background);

    this.addChild(bitmap);
    this.init();

    MainStage.currentStage = this;
  }


  init(){
    this.containerTextures = new createjs.Container();
    this.containerObjects = new createjs.Container();

    this.addChild(this.containerTextures);
    this.addChild(this.containerObjects);

    BitmapEditable.parent = this.containerObjects ;
    TextureEditable.parent = this.containerTextures ;

    if(this.serialized){
      this.drawSerializedStage(this.serialized);
    }
  }

  toDataURL(){
    BitmapEditable.boundingBox = null;
    TextureEditable.boundingBox = null;
    this.update();
    return this.canvas.toDataURL('image/jpeg', 0.8);
  }

  serializeStage(){

    const objectsChildren = this.containerObjects.children;
    const texturesChildren = this.containerTextures.children;

    const textures = texturesChildren.filter(obj => obj.type === 'TextureEditable').map(obj => ({
      filename: obj.image.src.substring(obj.image.src.lastIndexOf('/')+1, obj.image.src.lastIndexOf('.jpg')),
      instructions: obj.customMask.graphics._activeInstructions,
      position:{
        x: obj.customMask.x,
        y: obj.customMask.y
      }
    }));

    const objects = objectsChildren.filter(obj => obj.type === 'BitmapEditable').map(obj => ({
          filename: obj.filename,
          position: {
            x: obj.x,
            y: obj.y
          },
          scale: {
            x: obj.scaleX,
            y: obj.scaleY
          }
      }));

    return {
      objects,
      textures
    };
  }

  saveSerializedStage(){
    store.dispatch(setMixSerialized(this.serializeStage()));
  }

  drawSerializedStage(data){

    if(data.textures){
      data.textures.map(txtr => {
        let texture = new TextureEditable(process.env.PUBLIC_URL+'/img/textures/'+txtr.filename+'.jpg', txtr.instructions);
        texture.crossOrigin="anonymous";
        texture.customMask.x = txtr.position.x;
        texture.customMask.y = txtr.position.y;
        return txtr;
      });
    }

    if(data.objects){
      data.objects.map(obj => {
         let bitmap = new BitmapEditable(process.env.PUBLIC_URL+'/img/objects/'+obj.filename+'.png');
         bitmap.crossOrigin="anonymous";
         bitmap.filename = obj.filename;
         bitmap.x = obj.position.x;
         bitmap.y = obj.position.y;
         bitmap.scaleX = obj.scale.x;
         bitmap.scaleY = obj.scale.y;
         return obj;
      });
    }

  }

  static set currentStage(stage){
    MainStage._currentStage = stage;
  }

  static get currentStage(){
    return MainStage._currentStage;
  }


}
