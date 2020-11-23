//NavBar, QuestionAnswer
import React from 'react';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';

export class InteractionMode extends React.Component {
   render(){

   return(
      <div>
         <NavBar displayUser={this.props.displayUser} />
      </div>
   )
}
}

export default InteractionMode;