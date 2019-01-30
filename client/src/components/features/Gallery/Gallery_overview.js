/*
Path : /src/components/features/Gallery

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
import { connect } from 'react-redux';
import styled from 'styled-components';
import { med } from '../../../utils/style';

import { setSelectedMix, setSelectedMixs } from '../../../actions/';
import MixCardList from '../../common/MixCardList';
import Statistics from '../../common/Statistics';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  top: 52px;
  .mixcardlist-container{
    > div{
      ${med(580)`
        width: 100%;
        max-width: calc(100vw - 60px);
      `}
      ${med(800)`
        width: 100%;
        max-width: calc(100vw / 2 - 60px);
      `}
      ${med(1024)`
        width: 100%;
        max-width: calc(100vw / 3 - 60px);
      `}
      ${med(1360)`
        width: 100%;
        max-width: calc(100vw / 4 - 60px);
      `}

    }
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin: 20px auto 80px;
  }
`;

let GalleryOverview = (props) => {

  const onClick = (id) => {
    props.setSelectedMixs();
    props.setSelectedMix(id);
    props.history.push({
      pathname: '/gallery/'+id,
    });
  }

  return(
    <Container>
      <Statistics />
      <div className="mixcardlist-container">
        <MixCardList mixs={props.mixs} onMixClick={onClick} onScroll={()=>{console.log('scroll;')}}/>
      </div>
    </Container>
  );

}



const mapStateToProps = state => {
  return {
    mixs: state.gallery.mixs,
    library: state.library.data
  }
}

GalleryOverview = connect(mapStateToProps, {setSelectedMix, setSelectedMixs})(GalleryOverview);



export default GalleryOverview
