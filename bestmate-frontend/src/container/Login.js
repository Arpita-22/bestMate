//form + TermsCondition
import React from 'react';
import { isLogged } from '../actions';


export class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      user:{
        name: "" ,
        password:""
    },
    signedIn: false
  }
}

  handleName = (e) =>{
    this.setState({
      user:{
          ...this.state.user, name: e.target.value
  }
  });

  }

  handlePassword = (e) =>{
    this.setState({
      user:{
          ...this.state.user, password: e.target.value
  }
  });

  }

handleLogin = (e) =>{
  e.preventDefault()
  console.log(this.state.user)
  fetch('http://localhost:3000/api/v1/login', {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {user:this.state.user}
    ),
})
.then(response => response.json())
.then(data => {

    console.log("Login", data); 
    this.props.displayUser(data) 
    //dispatch true to redux state
    
    this.setState({ signedIn: true });
})
.catch((error) => {
    console.error('Error:', error);
});
  // store.dispatch(isLogged())
  // {store.getState().isLogged}
}


   render() {
    //  console.log(store.getState().isLogged)
    return (
      <form onSubmit={(e) => this.handleLogin(e)} >
        <h1>Login</h1>
        <div>
          <input type="text" name="name" placeholder="name" onChange={(e) => this.handleName(e)}/>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" onChange={(e) => this.handlePassword(e)} />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
   }
}

export default Login;