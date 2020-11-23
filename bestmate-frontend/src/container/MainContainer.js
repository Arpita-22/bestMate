//FrontPage, Header, Form, InteractionMode
import React from 'react';
import { Router } from 'react-router-dom';
import {createStore} from 'redux';
import FrontPage from './FrontPage';
import InteractionMode from './InteractionMode';


export class MainContainer extends React.Component {
  render(){
    return (
    <div className="container">
      <h1>Welcome to BestMate!</h1>
      <InteractionMode />
    </div>
  );
  }
}

export default MainContainer;