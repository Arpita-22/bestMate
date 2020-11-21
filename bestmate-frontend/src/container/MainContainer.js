//FrontPage, Header, Form, InteractionMode
import React from 'react';
// import './App.css';
import {createStore} from 'redux';
import FrontPage from './FrontPage';
import Form from './Form';
import InteractionMode from './InteractionMode';



const initialState={
   count:0,
   value:1
}

const reducer = (state = initialState, action) =>{
  console.log( state,  action)
  return state
}

export const store = createStore(reducer)
export class MainContainer extends React.Component {
  render(){
  return (
    <div className="container">
      <h1>Welcome to BestMate!</h1>
      <Form />
      <InteractionMode />
    </div>
  );
  }
}