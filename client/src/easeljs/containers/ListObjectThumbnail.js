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


import ObjectThumbnail from './ObjectThumbnail';
import ObjectPreview from './ObjectPreview';
import TexturePreview from './TexturePreview';


let createjs = window.createjs;
export default class ListObjectThumbnail extends createjs.Container{
  constructor(manifest, path){
    super();
    const padding = 16;

    this.hasMoved = false;
    this.regY = 110;
    this.y = 600-padding;
    this.x = padding;
    this.padding = padding;
    ObjectThumbnail.container = this;

    this.on("mousedown", this.onMousedown);
    this.on("pressmove", this.onPressmove);
    this.on("pressup", this.onPressup);

    let background = new createjs.Shape();
    background.graphics.beginFill("rgba(255,255,255,0.6)").drawRoundRect(0,0,0,110,8);
    ListObjectThumbnail._background = background;
    this.addChild(background);

    this.init(manifest, path);



    ListObjectThumbnail.currentListObjectThumbnail = this;
  }

  init(manifest, path){
    let preload = new createjs.LoadQueue("true", process.env.PUBLIC_URL+"/img/");

    const imageExtensions = (path === "objects") ? "png" : "jpg";

    let manifestIcons = manifest.map(elt => ({
      ...elt,
      src : `${elt.src}_icon.png`
    }));
    let manifestImages = manifest.map(elt =>({
      ...elt,
      src : `${elt.src}.${imageExtensions}`
    }));

    preload.loadManifest(manifestIcons);
    preload.on("fileload", (e) => {this.onFileload(e)});
    preload.on("error", (e) => {console.log(e)});
    preload.on("complete", ()=>{
      let preloadBigImages = new createjs.LoadQueue("true", process.env.PUBLIC_URL+"/img/");
      preloadBigImages.loadManifest(manifestImages);
      preloadBigImages.on("error", (e) => {console.log(e)});
      preloadBigImages.on("complete", (e) => {console.log("preloadBigImages completed")});
    });
  }

  onMousedown(e){
    ObjectThumbnail.hasMoved = false;
    this.mouseDifferenceToOrigin = {
      x: e.stageX-this.x
    };
  }

  onPressmove(e){
    ObjectThumbnail.hasMoved = true;
    this.x = e.stageX - this.mouseDifferenceToOrigin.x;
  }

  onPressup(e){
    if(ObjectThumbnail.hasMoved){
      const x = this.x;
      const padding = this.padding;

      if(x > padding ){
        createjs.Tween.get(this)
          .to({x: padding}, 300, createjs.Ease.circOut)
      }else{
        const width = this.getBounds().width;
        const max = -width+800-padding;

        if(width > 800-padding*2){
          if(x < max){
            createjs.Tween.get(this)
              .to({x: max}, 300, createjs.Ease.circOut)
          }
        }else{
          createjs.Tween.get(this)
            .to({x: padding}, 300, createjs.Ease.circOut)
        }
      }
    }

    const descriptionDiv = document.getElementById("descriptionOfObject");
    if(descriptionDiv){
      descriptionDiv.scrollTop = 0;
    }
  }

  onFileload(e){

    let background = ListObjectThumbnail._background;
    const index = e.target._numItemsLoaded-1;

    let item = e.item;

    if(!item.srcBase){
      item.id = item.id.substr(0,item.id.length-9);
      item.srcBase = item.path+item.id;
    }

    let bitmap = new ObjectThumbnail(e.result, item);
    bitmap.x = background.graphics.command.w+10;
    bitmap.y = 10;

    background.graphics.command.w += 100;
    this.addChild(bitmap);

    if(index===0){
      ObjectThumbnail.objectPreview = null;

      let shape = new createjs.Shape();
      shape.graphics.beginFill("#292929").drawRoundRectComplex(15,105,50,5, 4,4,0,0);
      this.addChild(shape);

      ObjectThumbnail.mode = item.mode;

      if(item.mode === "objects"){
        let objectPreview = new ObjectPreview(item.srcBase, item.title, item.description);
        this.parent.addChild(objectPreview);
        ObjectThumbnail.objectPreview = objectPreview;
      }

      if(item.mode === "textures"){
        let objectPreview = new TexturePreview(item.srcBase);
        this.parent.addChild(objectPreview);
        ObjectThumbnail.objectPreview = objectPreview;
      }


      ObjectThumbnail.indicator = shape;
      ObjectThumbnail.currentSelected = bitmap;
    }
  }

  static set currentListObjectThumbnail(list){
    ListObjectThumbnail._currentListObjectThumbnail = list;
  }

  static get currentListObjectThumbnail(){
    return ListObjectThumbnail._currentListObjectThumbnail;
  }


}
