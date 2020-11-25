//form + TermsCondition
import React from 'react'
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {store} from '../index.js'
import {setUser} from '../actions/useraction'


export class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      user:{
        name: "" ,
        password:""
    }
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
      // this.props.displayUser(data) 
      //dispatch true to redux state
      if(data.user){
      this.props.isLoggedAction(true);
      this.props.setUser(data.user)
      }
      const token = data.jwt
      localStorage.setItem("token", token)
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


  render() {
    // console.log(store.getState().isLogged)
    if (this.props.isLogged) {
      return <Redirect to='/MainContainer' />
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
      </form>
    );
   }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged
  };
};
 
const mapDispatchToProps = (Log_In) => {
  return {
    isLoggedAction,
    setUser
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Login);

