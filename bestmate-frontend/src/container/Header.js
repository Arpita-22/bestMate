//Login, SignUp(form)
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import{store} from './MainContainer';
import { NavLink } from 'react-router-dom';
import {Menu} from 'semantic-ui-react'


const Header = ({logout, isUserLoggedIn}) => {
  return (
    <div className="header">
      <Menu secondary pointing>
        <Menu.Item style={{fontSize:24}}>
          <NavLink to="/" exact  >Home</NavLink>
        </Menu.Item>
        <Menu.Item style={{fontSize:24}} position="right">
          {!isUserLoggedIn ? <NavLink to="/SignUp" > SignUp </NavLink> : ''}
        </Menu.Item>
        <Menu.Item style={{fontSize:24}} position="right">
          {
            !isUserLoggedIn ? <NavLink to="/Login" exact > Login </NavLink> : 
            <NavLink to="/" exact ><h2 style={{fontFamily: 'Lora'}} onClick={logout}>Logout</h2></NavLink>
          }
        </Menu.Item>
        <Menu.Item style={{fontSize:24}} position="right">
          {
            isUserLoggedIn ? <NavLink to="/MainContainer"> Personal Details Page</NavLink>: ''
          }
        </Menu.Item>
      </Menu>
    </div>
  );
};


export default Header;
 
