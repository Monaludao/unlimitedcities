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

import ListObjectThumbnail from '../containers/ListObjectThumbnail';
import BitmapEditable from '../containers/BitmapEditable';
import TextureEditable from '../containers/TextureEditable';

import store from '../../store';


let createjs = window.createjs;
export default class ToolsStage extends createjs.Stage{
  constructor(canvasId, categorieIndex){

    super(canvasId);
    this.canvasId = canvasId;
    createjs.Touch.enable(this);
    createjs.Ticker.on("tick", e => {
      this.update(e);
    });

    BitmapEditable.boundingBox = null;
    TextureEditable.boundingBox = null;

    let rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("black").drawRect(0,0,800,600);

    let backgroundContainer = new createjs.Container();
    backgroundContainer.addChild(rectangle);

    this.addChild(backgroundContainer);

    let background_img = new Image();
    background_img.src = document.getElementById("mainStage").toDataURL();
    background_img.onload = () => {
      let background = new createjs.Bitmap(background_img);
      let blurFilter = new createjs.BlurFilter(30,30,2);
      let bounds = blurFilter.getBounds();
      background.filters = [blurFilter];
      background.cache(bounds.x, bounds.y, 800+bounds.width, 600+bounds.height);
      backgroundContainer.addChild(background);

      let data = store.getState().library.data;

      const path = (data[categorieIndex].type === "objects") ? "objects" : "textures";

      const manifest = data[categorieIndex].collection.map((elt) => {
        elt.src = path+"/"+ elt.filename;
        elt.mode = path;
        return elt;
      });

      let listObjectThumbnail = new ListObjectThumbnail(manifest, path);
      this.addChild(listObjectThumbnail);
      this.init();

      this.listObjectThumbnail = listObjectThumbnail;


      this.backgroundContainer = backgroundContainer;
      ToolsStage.currentStage = this;

    }
  }


  init(){
    document.getElementById(this.canvasId).style.display = "block";
    document.getElementById(this.canvasId).style.animation = "showTools 0.5s 1";
  }

  set listObjectThumbnail(list){
    this._listObjectThumbnail = list;
  }

  get listObjectThumbnail(){
    return this._listObjectThumbnail;
  }

  set backgroundContainer(backgroundContainer){
    this._backgroundContainer = backgroundContainer;
  }

  get backgroundContainer(){
    return this._backgroundContainer;
  }

  static set currentStage(stage){
    ToolsStage._currentStage = stage;
  }

  static get currentStage(){
    return ToolsStage._currentStage;
  }


}
