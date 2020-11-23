//form + TermsCondition
import React from 'react';
import { isLogged } from '../actions';


export class Login extends React.Component {

handleLogin = () =>{
  console.log("login")
  // store.dispatch(isLogged())
  // {store.getState().isLogged}
}

   render() {
    return (
      <form onSubmit={() => this.handleLogin()}>
        <h1>Login</h1>
        <div>
          <input type="text" name="name" placeholder="name" onChange={() => console.log()}/>
          <label htmlFor="name">name</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" onChange={() => console.log()} />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;