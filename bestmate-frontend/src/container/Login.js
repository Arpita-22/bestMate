//form + TermsCondition
import React from 'react';


export class Login extends React.Component {
   render() {
    return (
      <form>
        <h1>Login</h1>
        <div>
          <input type="text" name="name" placeholder="name" />
          <label htmlFor="name">name</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;