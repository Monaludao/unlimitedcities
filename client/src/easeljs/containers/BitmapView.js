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

import {setObjectActive} from '../../actions';
import store from '../../store';

import GalleryStage from '../stages/GalleryStage';

let createjs = window.createjs;
export default class BitmapView extends createjs.Bitmap{

  constructor(imageOrUri){
      super(imageOrUri);
      this.on("mousedown", this.onMousedown);
      BitmapView.parent.addChild(this);
  }

  /* INSTANCE METHODS */

  onMousedown(e){
    let stage = BitmapView.parent;
    stage.setChildIndex(BitmapView.background, 0);

    if(BitmapView.oldObject && BitmapView.oldObjectIndex){
      stage.setChildIndex(BitmapView.oldObject, BitmapView.oldObjectIndex);
    }

    BitmapView.oldObject = this;
    BitmapView.oldObjectIndex = BitmapView.parent.getChildIndex(this);

    const childIndex = BitmapView.parent.getChildIndex(this);

    stage.setChildIndex(this, stage.getNumChildren()-1);
    stage.setChildIndex(BitmapView.background, stage.getNumChildren()-2);
    BitmapView.background.visible = true;

    const filename = e.target.filename;
    let dataUniqueSrc = [];

    let data = store.getState().library.data;
    data.map((elt)=>{
    	dataUniqueSrc.push(...elt.collection);
      return elt;
    });

    dataUniqueSrc = dataUniqueSrc.filter(BitmapView.onlyUniqueSrc);

    let found = dataUniqueSrc.find(function(element) {
      return element.filename === filename;
    });

    GalleryStage.currentStage.onObjectClick();

    store.dispatch(setObjectActive({
      title: found.title,
      description: found.description,
      childIndex
    }));

  }

  draw(ctx, ignoreCache){
    super.draw(ctx, ignoreCache);
    this.regX = this.image.width/2;
    this.regY = this.image.height/2;
  }


  static onlyUniqueSrc(value, index, self) {
      return index === self.findIndex((t) => (
        t.filename === value.filename
      ));
  }




}
