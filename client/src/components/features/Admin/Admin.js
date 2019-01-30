/*
Path : /src/components/features/Admin

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
import {signIn, signOut} from '../../../actions';
import styled from 'styled-components';


const Wrapper = styled.div`
  text-align: center;
  form{
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input{
      position: relative;
      width: 100%
      font-size: 12px;
      padding: 12px 10px;
      border-radius: 4px;
      background: white;
      border: 1px solid #e0e0e0;
      margin: 2px;
      &[type="submit"]{
        background: #4A90E2;
        border: 1px solid #4D8BD3;
        color: white;
        font-weight: 600;
      }
    }
  }

  h2{
    font-size: 22px;
    font-weight: 200;
    b{
      font-weight: 400;
    }
  }

  button{
    background: #E84A46;
    border: 1px solid #D32A34;
    border-radius: 4px;
    font-size: 16px;
    color: white;
    font-weight: 600;
    padding: 15px;
    margin: 10px;
  }

  @media (min-height: 768px){
    width: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);}
  }

  @media (max-height: 768px){
    position: relative;
    width: 100vw;
    margin: 77px auto;
    transform: translateX(0px) translateY(0px);
    left: 0;
    top: 0;
  }
`;

class Admin extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(e){
    e.preventDefault();
    this.props.signIn(this.state.email,this.state.password);
  }

  logOut(){
    this.props.signOut();
  }

  render(){

    if(this.props.user.isAnonymous){
      return(
        <Wrapper>
          <form onSubmit={this.logIn}>
            <input type="email" name="username" id="username" placeholder="Enter email" value={this.state.email} onChange={(e)=>{this.setState({email: e.target.value});}}/>
            <input type="password" name="password" id="password" placeholder="Enter password" value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value});}}/>
            <input type="submit" value="Sign in"/>
          </form>
        </Wrapper>
      );
    }else{
      return(
        <Wrapper>
          <h2>Welcome <b>{this.props.user.email}</b>!</h2>
          <button onClick={this.logOut}>Log out</button>
        </Wrapper>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    mixs: state.gallery.mixs,
  }
}


export default connect(mapStateToProps, {signIn, signOut})(Admin);
