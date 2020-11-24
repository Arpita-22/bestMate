//Login, SignUp(form)
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import{store} from './MainContainer';
// import {Router} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'grey',
  textDecoration: 'none',
  color: 'white',
}

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/" exact style={link} >Home</NavLink>
      <NavLink to="/SignUp" exact style={link}> SignUp   </NavLink>
      <NavLink to="/Login" exact  style={link}>  Login </NavLink>
    </div>
  );
};


export default Header;
 
