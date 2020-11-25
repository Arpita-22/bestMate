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

const Header = ({logout, isUserLoggedIn}) => {
  return (
    <div className="header">
      <NavLink to="/" exact style={link} >Home</NavLink>
      {!isUserLoggedIn ? <NavLink to="/SignUp" exact style={link}> SignUp </NavLink> : ''}
      {
        !isUserLoggedIn ? <NavLink to="/Login" exact  style={link}> Login </NavLink> : 
        <NavLink to="/" exact ><h3 onClick={logout}>Logout</h3></NavLink>
      }
    </div>
  );
};


export default Header;
 
