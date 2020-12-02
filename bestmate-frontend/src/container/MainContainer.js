//FrontPage, Header, Form, InteractionMode
import React from 'react';
import { Router } from 'react-router-dom';
import {createStore} from 'redux';
import FrontPage from './FrontPage';
import InteractionMode from './InteractionMode';
import NavBar from './NavBar';


export class MainContainer extends React.Component {
  render(){
    return (
    <div className="master-detail-element">
      <NavBar displayUser={this.props.displayUser} />
      <InteractionMode  />
    </div>
  );
  }
}

export default MainContainer;