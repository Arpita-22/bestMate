//form + TermsCondition
import React from 'react'
import {connect} from 'react-redux';
import { Redirect, link } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {store} from '../index.js'
import {setUser,signOut} from '../actions/useraction'
import AllowedFoods from './AllowedFoods'
import {BrowserRouter as Router,Route} from 'react-router-dom';


export class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      user:{
        name: "" ,
        password:""
    },
    message:false
  }
}

  handleChange = (e) =>{
    this.setState({
      user:{
          ...this.state.user, [e.target.name]: e.target.value
      }
    });
  }


handleLogin = (e) =>{
  e.preventDefault()
  fetch('http://localhost:3000/api/v1/login', {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${this.state.token}`
    },
    body: JSON.stringify(
        {user:this.state.user}
    ),
  })
  .then(response => response.json())
  .then(data => {
      //dispatch true to redux state
      if (data.message){
        this.setState({
          message:!this.state.message
        })
      }
      if(data.user){
      this.props.isLoggedAction(true);
      this.props.setUser(data.user)
      const token = data.jwt
      localStorage.setItem("token", token)
      }
      else{

      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


  render() {
    if (this.props.isLogged) {
      // return <Redirect to='/MainContainer'  />
      return <Redirect to='/AllowedFoods'  />
    }
    if(this.state.message === true){
      return (
      <div>Invalid Name or Password</div>
      // <Redirect to='/Login' />
      )
    }
    return (
      <form onSubmit={(e) => this.handleLogin(e)} >
        <h1>Login</h1>
        <div>
          <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)}/>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
        {/* <link to="/AllowedFoods" > AllowedFoods </link> */}
      </form>
    );
   }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged,
    user: state.user.user
  };
};
 
const mapDispatchToProps = (Log_In) => {
  return {
    isLoggedAction,
    setUser,
    signOut
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Login);

