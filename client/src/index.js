/*
Path : /src

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
import DocumentMeta from 'react-document-meta';
import { render } from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import myStore from './store';


class DocumentHTML extends React.Component {
  render() {
    const meta = {
      title: 'Unlimited Cities : DIY',
      description: 'A free application to transform the city together',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      },
      property: {
          'og:title': 'Unlimited Cities : DIY',
          'og:type': 'website',
          'og:image': 'http://unli-diy.org/img/home/atelier.png',
        }
    };

    return (
      <DocumentMeta {...meta} extend>
        <Root store={myStore} {...meta}/>
      </DocumentMeta>
    );
  }
}


render(
    <DocumentHTML/>
  , document.getElementById('root')
);

registerServiceWorker();
