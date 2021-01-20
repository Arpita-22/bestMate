import React from 'react';
import { Redirect } from "react-router-dom";
import {Grid} from 'semantic-ui-react'

 
class SignUp extends React.Component {

  constructor() {
      super();
      this.state = {
        user:{
          name: "" ,
          address: "",
          age: "",
          allowed_foods:[{
            name:""
          }],
          relatives:[{
            name:"",
            address:"",
            age:"",
            relationship:"",
            distance:""
          }],
          password:""
        },
        token:"",
        signedUp: false
      };
    }

  handleChange = (e) =>{
    const{name, value} = e.target
    this.setState({
        user:{
            ...this.state.user, [e.target.name]: e.target.value
        }
    });
  }



  handleSignUp = (e) =>{
      e.preventDefault();
      fetch('https://secure-lake-64435.herokuapp.com/api/v1/users', {
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
          this.setState({
              user: data.user
          })
          this.setState({ signedUp: true });            
      })

      .catch((error) => {
          console.error('Error:', error);
      });
      
  }



    
  render() {

    if (this.state.signedUp) {
      return <Redirect to='/Login' />
    }
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <div>
        <form  className="signUp"onSubmit={(e) => this.handleSignUp(e)}>
          <h1 style={{color:"midnightblue",fontFamily:'Lora'}}>SignUp</h1>
          <h2 style={{color:"midnightblue",fontFamily:'Lora'}}>Personal Details</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} value={this.state.name} />
            </div>
          <div>
            <label htmlFor="">Address</label>
            <input type="text" name="address" placeholder="address" onChange={(e) => this.handleChange(e)} value={this.state.address}/>
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleChange(e)} value={this.state.age} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
          </div>
          <input id="sign-up" type="submit" value="SignUp" />
        </form>
      </div>
      </Grid.Column>
      </Grid>
    );
  }
}


export default SignUp;
