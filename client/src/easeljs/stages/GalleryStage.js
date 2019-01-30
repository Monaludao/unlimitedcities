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


import BitmapView from '../containers/BitmapView';
import TextureView from '../containers/TextureView';

let createjs = window.createjs;

export default class GalleryStage extends createjs.Stage{
  constructor(canvasId, serialized, callback){


    super(canvasId);
    if(GalleryStage._currentStage){
      console.log("remove old stage");
      GalleryStage._currentStage.removeAllChildren();
      GalleryStage._currentStage.removeAllEventListeners();
      GalleryStage._currentStage.canvas = null
      // GalleryStage._currentStage._eventListeners = null
      GalleryStage._currentStage.enableDOMEvents(false);
      GalleryStage._currentStage = null;
      createjs.DisplayObject._hitTestCanvas = null
    }

    this.serialized = serialized;

    createjs.Ticker.on("tick", e => {
      this.update(e);
    });

    createjs.Touch.enable(this);
    this.init(callback);




    GalleryStage.currentStage = this;
  }


  init(callback){

    this.containerTextures = new createjs.Container();
    this.containerObjects = new createjs.Container();
    this.addChild(this.containerTextures);
    this.addChild(this.containerObjects);

    let background = new createjs.Shape();
    background.graphics.beginFill("rgba(255,255,255,0.8)").drawRect(0,0,800,600);
    background.visible = false;
    this.containerObjects.addChild(background);

    BitmapView.background = background;
    TextureView.parent = this.containerTextures ;
    BitmapView.parent = this.containerObjects ;



    if(this.serialized){
      this.drawSerializedStage(this.serialized, callback);
    }else if(callback){
      callback();
    }

  }


  drawSerializedStage(data, callback){

    if(data.textures){
      data.textures.map(txtr => {
        let texture = new TextureView(process.env.PUBLIC_URL+'/img/textures/'+txtr.filename+'.jpg', txtr.instructions);
        texture.crossOrigin="anonymous";
        texture.customMask.x = txtr.position.x;
        texture.customMask.y = txtr.position.y;
        return txtr;
      });
    }

    if(data.objects){
      data.objects.map(obj => {
         let bitmap = new BitmapView(process.env.PUBLIC_URL+'/img/objects/'+obj.filename+'.png');
         bitmap.crossOrigin="anonymous";
         bitmap.filename = obj.filename;
         bitmap.x = obj.position.x;
         bitmap.y = obj.position.y;
         bitmap.scaleX = obj.scale.x;
         bitmap.scaleY = obj.scale.y;
         return obj;
      });
    }



    if(callback){
      callback();
    }

  }


  static resetChildIndex(childIndex){
    let containerObjects = BitmapView.parent;
    containerObjects.setChildIndex(containerObjects.getChildAt(containerObjects.getNumChildren()-1), childIndex-1);
  }

  static set currentStage(stage){
    GalleryStage._currentStage = stage;
  }

  static get currentStage(){
    return GalleryStage._currentStage;
  }


}
