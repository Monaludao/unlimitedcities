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


import ObjectPreview from './ObjectPreview';
import TexturePreview from './TexturePreview';

let createjs = window.createjs;

export default class ObjectThumbnail extends createjs.Bitmap{

  constructor(imageOrUri, item){
      super(imageOrUri);

      const { title, description, srcBase } = item ;
      const { width, height } = imageOrUri;

      // ATTACH INFOS OF OBJECT
      this.title = title;
      this.description = description;
      this.srcBase = srcBase;

      // HIT AREA
      let hit =  new createjs.Shape();
      hit.graphics.beginFill("black").drawRect(0,0,width,height);
      this.hitArea = hit;

      // EVENTS
      this.on("pressup", this.onPressup);
  }

  /* INSTANCE METHODS */



  onPressup(e){
    if(!ObjectThumbnail.hasMoved){
      ObjectThumbnail.currentSelected = this;
      if(ObjectThumbnail.mode !== "textures"){
        ObjectThumbnail.objectPreview = new ObjectPreview(this.srcBase, this.title, this.description);
      }else{
        ObjectThumbnail.objectPreview = new TexturePreview(this.srcBase);
      }
    }
  }


  /* STATIC METHODS */

  static get currentSelected(){
    return ObjectThumbnail._currentSelected;
  }

  static set currentSelected(selected){
    if(ObjectThumbnail._currentSelected !== selected){
      ObjectThumbnail._currentSelected = selected;
      ObjectThumbnail.indicator.x = selected.x;
    }
  }

  static get container(){
    return ObjectThumbnail._container;
  }

  static set container(container){
    return ObjectThumbnail._container = container;
  }

  static get objectPreview(){
    return ObjectThumbnail._objectPreview;
  }

  static set objectPreview(objectPreview){
    if(ObjectThumbnail._objectPreview){
        let _objectPreview = ObjectThumbnail._objectPreview;
        let parent = _objectPreview.parent;
        if(parent){
          parent.removeChild(_objectPreview);
          parent.addChild(objectPreview);
        }
    }
    ObjectThumbnail._objectPreview = objectPreview;
  }

  static get hasMoved(){
    return ObjectThumbnail._hasMoved;
  }

  static set hasMoved(value){
    return ObjectThumbnail._hasMoved = value;
  }

}
