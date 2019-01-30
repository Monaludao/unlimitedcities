/*
Path : /src/components/common

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


import React from 'react';
import PropTypes from 'prop-types';

import closeButton from '../../img/button-cross.svg';
import nextButton from '../../img/button-next.svg';
import backButton from '../../img/button-back.svg';
import currentButton from '../../img/button-current.svg';
import objectsButton from '../../img/button-objects.svg';
import bounceButton from '../../img/button-bounce.svg';


export function CloseButton({onClick}){
  return(
    <button
      onClick={onClick} style={{
        zIndex:4,
        position: 'absolute',
        display:'block',
        top:20,
        left:20
      }}
    >
      <img alt="close" src={closeButton}/>
    </button>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}


export function CategoryList({onClick, categories}) {
  return categories.map((category, index) => (
    <button
      key={category.id}
      onClick={()=>onClick(index)}
      style={{
        position: 'absolute',
        zIndex:4,
        display:'block',
        top: 20+(index*50),
        right:20
      }}
    >
      <img
        alt={category.id}
        src={process.env.PUBLIC_URL+'/img/icons/'+category.icon}
      />
    </button>
  ));
}

CategoryList.propTypes = {
  onClick: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  )
}


export function NextButton({onClick}){
  return(
    <button
      onClick={onClick}
      style={{
        zIndex: 4,
        position: 'absolute',
        bottom: 20,
        right: 20,
        width:60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
      }}
    >
      <img src={nextButton} alt="Next" />
    </button>
  )
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}


export function BackButton({onClick}){
  return (
    <button
      onClick={onClick}
      style={{
        zIndex:4,
        position: 'absolute',
        display:'block',
        top:20,
        left:20,
        paddingRight: 15
      }}
    >
      <img alt="back" src={backButton}/>
    </button>
  )
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}


export function DescriptionObject({type, title, description}){
  if(type === "objects" && (title || description)){
    return (
      <div key="description-object" id="descriptionOfObject">
        <h1>{title}</h1>
        <p>
          {description}
        </p>
      </div>
    )
  }else{
    return null
  }
}

DescriptionObject.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
}


export function CategoryIndicator({title, icon}){
  return (
    <div
      style={{
        display: 'flex',
        zIndex:4,
        position: 'absolute',
        top:20,
        right:20,
        width: 50,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.33)',
        borderRadius: 9
      }}
    >
      <img
        alt={title}
        src={process.env.PUBLIC_URL+'/img/icons/'+icon}
      />
    </div>
  )
}


export function ViewTypeButton({onClick, currentState}){
  return (
    <button
      onClick={onClick}
      style={{
        zIndex:4,
        position: 'absolute',
        display:'flex',
        top:20,
        right:20,
        width: 50,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 9
      }}
    >
      <img alt="state" src={currentState ? objectsButton : currentButton}/>
    </button>
  )
}

ViewTypeButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export function BounceButton({onClick}){

  return (
    <button
      onClick={onClick}
      style={{
        zIndex: 4,
        position: 'absolute',
        display: 'flex',
        bottom: 20,
        right: 20,
        width:60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30
      }}
    >
      <img src={bounceButton} alt="Bounce" />
    </button>
  )
};

BounceButton.propTypes = {
  onClick: PropTypes.func.isRequired
}
