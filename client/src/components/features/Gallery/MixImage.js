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

const MixImage = ({currentState, mixData}) => (
  <img alt="Mix" className="mix" width="800" height="600" src={currentState ? mixData['background_url'] : mixData['image_url']}/>
);

const mapStateToProps = (state, ownProps) => {
  return {
    currentState: state.gallery.selectedMix.currentState,
    mixData: state.gallery.selectedMix.mix.data
  }
}

export default connect(mapStateToProps)(MixImage);
