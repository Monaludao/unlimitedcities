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


import ToolsStage from '../stages/ToolsStage';
import TextureEditable from './TextureEditable';

let createjs = window.createjs;

export default class TexturePreview extends createjs.Container{
  constructor(imagePath){
    super();

    this.x = 0;
    this.y = 0 ;

    let previewImage = new Image();
    previewImage.src = `${imagePath}.jpg`;

    previewImage.onload = (e) => {

      let bitmap = new createjs.Bitmap(previewImage);

      bitmap.y = 300;
      bitmap.x = 400;

      bitmap.regY = 300;
      bitmap.regX = 400;


      let mask = new createjs.Shape();
  		mask.graphics.beginFill("#000").drawCircle(400, 250, 135);

      this.addChild(bitmap);
      bitmap.mask = mask;

      let toolStage =  ToolsStage.currentStage;

      bitmap.on('mousedown', (e) => {

        toolStage.removeAllChildren();

        let texture = new TextureEditable(e.target.image.src);
        let poly = texture.customMask;

        toolStage.addChild(poly);

        const HANDLES_SIZE = 8;
        const HANDLES_HIT = 18;
        const HANDLES_STROKE_COLOR = "white";
        const HANDLES_FILL_COLORS = "#838383";

        let handle_idx=0;

        let hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawCircle(0, 0, HANDLES_HIT);

        let handleModel = new createjs.Shape();
        handleModel.graphics.setStrokeStyle(1).beginStroke(HANDLES_STROKE_COLOR).beginFill(HANDLES_FILL_COLORS).drawCircle(0, 0, HANDLES_SIZE);
        handleModel.hitArea = hit;

        toolStage.on("stagemousedown", (e)=>{

          if(e.relatedTarget){
            return null;
          }

          let handle = handleModel.clone();
          handle.x = e.stageX;
          handle.y = e.stageY;
          handle.idx = handle_idx++;

          handle.on("pressmove", (e) => {
            handle.x = e.stageX;
            handle.y = e.stageY;

            const instructionLength = texture.customMask.graphics._activeInstructions.length;
            texture.customMask.graphics._activeInstructions[handle.idx].x = e.stageX;
            texture.customMask.graphics._activeInstructions[handle.idx].y = e.stageY;

            if(handle.idx === 0){
              texture.customMask.graphics._activeInstructions[instructionLength-1].x = e.stageX;
              texture.customMask.graphics._activeInstructions[instructionLength-1].y = e.stageY;
            }

          });

          toolStage.addChild(handle);
          texture.drawTexture(e);
        });

      });


    }

  }



}
