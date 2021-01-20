import React from 'react'
import {connect} from 'react-redux';
import { Redirect, link } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {setUser,signOut} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'


export class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      user:{
        name: "" ,
        password:""
      },
      message: false,
      userDetailsProvided: false
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
    fetch('https://secure-lake-64435.herokuapp.com/api/v1/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${this.state.token}`
      },
      body: JSON.stringify(
        {user: this.state.user}
      ),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message){
          this.setState({
            message:!this.state.message
          })
        }
        if(data.user){
          this.setState({
            userDetailsProvided: data.user.allowed_foods.length !== 0
          })
          this.props.isLoggedAction(true);
          this.props.setUser(data.user);
          const token = data.jwt;
          localStorage.setItem("token", token);          
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  componentDidMount(){
    this.setState({
      message: false
    }); 
  }

  render() {
    if (this.props.isLogged) {
      if(this.state.userDetailsProvided) {
        return <Redirect to='/MainContainer'/>        
      } else {
        return <Redirect to='/AllowedFoods'/>
      }
    }
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <form className="login" onSubmit={(e) => this.handleLogin(e)} >
            <h1 style={{color:"midnightblue",fontFamily: 'Lora'}}>Login</h1>
            <div style={{color: 'red'}}>{this.state.message === true? 'Invalid Name or Password':''}</div>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            </div>
            <input id="login" type="submit" value="Login" />
          </form>
        </Grid.Column>
      </Grid>
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

