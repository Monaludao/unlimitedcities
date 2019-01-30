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


import React from 'react'
import PropTypes from 'prop-types'
import MixCard from './MixCard'


const CARDS_LIMIT = 8;

class MixList extends React.Component {



    constructor(props){
      super(props);
      this.state = {counter: CARDS_LIMIT};

      this.onScrollWindow = this.onScrollWindow.bind(this);
      this.onScrollContainer = this.onScrollContainer.bind(this);
    }

    onScrollWindow(e){
      const container = document.getElementsByClassName('mixcardlist-container')[0];
      if ((window.innerHeight + window.scrollY) >= container.offsetHeight) {
        if(this.state.counter >= Object.keys(this.props.mixs).length){
          return false;
        }
        this.setState({
          counter: this.state.counter + CARDS_LIMIT
        });
      }
    }

    onScrollContainer(e){
      const container = document.getElementsByClassName('background-selected-mixs')[0];
      if ((container.clientHeight + container.scrollTop) >= container.scrollHeight) {
        if(this.state.counter >= this.props.selectedMixs.length){
          return false;
        }
        this.setState({
          counter: this.state.counter + CARDS_LIMIT
        });
      }
    }

    componentDidMount(){

      if(this.props.selectedMixs){
        const container = document.getElementsByClassName('background-selected-mixs')[0];
        container.addEventListener('scroll', this.onScrollContainer);
      }else{
        window.addEventListener('scroll', this.onScrollWindow);
      }
    }

    componentWillUnmount(){
      if(this.props.selectedMixs){
        const container = document.getElementsByClassName('background-selected-mixs')[0];
        container.removeEventListener('scroll', this.onScrollContainer);
      }
      else{
        window.removeEventListener('scroll', this.onScrollWindow);
      }
    }

    render(){

      const {mixs, onMixClick, margin} = this.props;
      const selectedMixs = this.props.selectedMixs  || Object.keys(mixs);

      return selectedMixs.map((mix, index) => {

        if(index>=this.state.counter){
          return null;
        }

        const { thumbnail, image_url, nickname, comment, timestamp } = mixs[mix.id || mix].data;
        const { likes } = mixs[mix.id || mix];

        return (
          <MixCard
            id={mix.id || mix}
            onClick={()=>onMixClick(mix.id || mix)}
            key={`mix_${mix.id || mix}`}
            thumbnail={thumbnail || image_url}
            nickname={nickname}
            comment={comment}
            timestamp={timestamp}
            margin={margin}
            likes={likes}
          />
        )
      });
    }
}


MixList.propTypes = {
  selectedMixs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired
  ),
  mixs: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onMixClick: PropTypes.func.isRequired
}


export default MixList;
