/*
Path : /src/components/features/Mix

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

const NextButton = (props) => (
  <button onClick={props.onClick} style={{
    zIndex: 9999,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width:60,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    cursor: 'pointer'
  }}>
    <svg width="19px" height="30px" viewBox="0 0 19 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-843.000000, -636.000000)" fill="#E72B70">
            <polygon id="navigate_next---material" points="846.54 636 861.54 651 846.54 666 843 662.46 854.52 651 843 639.54"></polygon>
        </g>
      </g>
    </svg>
  </button>
);

export default NextButton;
