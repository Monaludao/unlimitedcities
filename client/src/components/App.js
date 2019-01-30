/*
Path : /src/components

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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchLibraryData, fetchMixs, onAuthStateChanged, initializeLanguages} from '../actions';

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

import './App.css';


class App extends Component {

  componentWillMount(){
    this.props.onAuthStateChanged();
    this.props.initializeLanguages();
    this.props.fetchLibraryData();
    this.props.fetchMixs();
  }

  render() {
    if(this.props.locale.languages[0]){
      return (
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      );
    }else{
      return null;
    }
  }
}

const mapStateToProps = state => ({
    locale: state.locale
  }
);

export default connect(mapStateToProps, {fetchLibraryData, fetchMixs, onAuthStateChanged, initializeLanguages})(App);

App.contextTypes = {
  store: PropTypes.object.isRequired
};
