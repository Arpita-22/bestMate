//Login, SignUp(form)
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import{store} from './MainContainer';
// import {Router} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// let handleSignUp = () =>{
//     console.log("signup")
// }

// let handleLogin = () =>{
//     console.log("login")
// }


// function Header(){
//     return(
//         <div className="nav-bar">
//             {/* {store.getState().count} */}
//         <button onClick={() => handleSignUp()}>SignUp </button>
//         <button onClick={() => handleLogin()}>Login</button>
//         </div>
//     )
// }

const Header = () => {
  return (
    <div className="header">
      {/*{code here}*/}
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/SignUp" > SignUp   </NavLink>
      <NavLink to="/Login" >  Login </NavLink>
      {/* <NavLink  to="/InteractionMode" > InteractionMode</NavLink> */}
    </div>
  );
};


export default Header;
 
