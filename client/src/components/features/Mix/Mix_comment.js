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
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MixHeader from './MixHeader';

import { getTranslate } from 'react-localize-redux';
import { saveMix, setMixUpload, setMixComment } from '../../../actions';

import NextButton from './NextButton';

import commentIcon from '../../../img/mix-header-comment.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height:100%;
  background: radial-gradient(#5E5E5E,#2B2B2B);
  border: 10px solid white;
  h2{
    font-size: 20px;
    font-weight: 600;
  }
  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid white;
    border-radius: 8px;
    height: 50px;
    width: 50px;
  }
  form{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-container{
      position:relative;
      background: #F4F4F4;
      border-radius: 4px;
      width: 520px;
      padding: 10px;

      input, textarea{
        font-size: 16px;
        padding: 15px;
        border: #ECECEC 1px solid;
        border-radius: 2px;
        &.error{
          border: #C74242 1px solid;
        }
      }

      input{
        width: 200px;
      }
      textarea{
        width: calc(100% - 30px);
        margin-top: 10px;
        height: 240px;
      }
    }
  }
`;


class MixLocation extends React.Component {

  constructor(props){
    super(props);
    this.onBackClick = this.onBackClick.bind(this);
  }

  validateDataUpstream(){
    const {background, resultImage, location} = this.props.mix;
    return background && resultImage && location;
  }

  componentDidMount(){
    if(!this.validateDataUpstream()){
      this.props.history.push("/mix/location");
    }
  }

  /////////

  renderField(field){
    if(field.type !== 'textarea'){
      return(
        <div>
          <input
            type={field.type}
            placeholder={field.placeholder}
            {...field.input}
            className={(field.meta.touched && field.meta.error) ? 'animated shake error' : ''}
          />
        </div>
      );
    }else{
      return(
        <div>
          <textarea
            placeholder={field.placeholder}
            {...field.input}
            className={(field.meta.touched && field.meta.error) ? 'animated shake error' : ''}
          >
          </textarea>
        </div>
      );
    }
  }

  onBackClick(){
    this.props.history.push("/mix/create");
  }

  onSubmit(values){
    this.props.setMixUpload();
    this.props.setMixComment(values.nickname, values.comment);
    this.props.history.push("/mix/save");
    this.props.saveMix({
      ...this.props.mix,
      ...values
    }, this.props.user,
    () => {
      this.props.history.push("/map");
    }, () => {
      console.log("errorCallback");
      this.props.history.push("/mix/comment");
    });

  }

  /////////

  render(){
    const { handleSubmit } = this.props;

    return(
      <Wrapper>
        <MixHeader
          onBackClick={this.onBackClick}
          title={this.props.translate('comment')}
          icon={commentIcon}
        />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="form-container">
            <Field
              type="text"
              name="nickname"
              placeholder={this.props.translate("your-nickname")}
              component={this.renderField}
            />
            <Field
              type="textarea"
              name="comment"
              placeholder={this.props.translate("your-comment")}
              component={this.renderField}
            />
          </div>
          <NextButton onClick={this.onNextClick}/>
        </form>
      </Wrapper>
    )
  }
}


function validate(values){
  const errors = {};

  if(!values.nickname){
    errors.nickname = 'Enter a nickname!';
  }

  if(!values.comment){
    errors.comment = 'Enter a comment!';
  }

  return errors;
}


const mapStateToProps = state => {
  return {
    initialValues:{
      nickname: state.mix.nickname,
      comment: state.mix.comment
    },
    translate: getTranslate(state.locale),
    mix: state.mix,
    user: state.user
  }
}

const MixLocationContainer  = connect(
    mapStateToProps,
    {saveMix, setMixUpload, setMixComment}
)(MixLocation);

let InitializeFromStateForm = reduxForm({
  validate,
  form: 'MixNewForm'
})(MixLocationContainer);

export default InitializeFromStateForm = connect(state => ({
  initialValues:{
    nickname: state.mix.nickname,
    comment: state.mix.comment
  }
}))(InitializeFromStateForm)


MixLocation.propTypes = {
  history: PropTypes.object
};
