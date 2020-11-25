import React from 'react';
import { Redirect } from "react-router-dom";

 
class SignUp extends React.Component {

  constructor() {
      super();
      this.state = {
        user:{
          name: "" ,
          address: "",
          age: "",
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
      fetch('http://localhost:3000/api/v1/users', {
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
      <div>
        <form onSubmit={(e) => this.handleSignUp(e)}>
          <h1>SignUp</h1>
          {/* <h2>Personal Details</h2> */}
          <div>
            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} value={this.state.name} />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" name="address" placeholder="address" onChange={(e) => this.handleChange(e)} value={this.state.address}/>
            <label htmlFor="">Address</label>
          </div>
          <div>
            <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleChange(e)} value={this.state.age} />
            <label htmlFor="age">Age</label>
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" value="SignUp" />
        </form>
      </div>
    );
  }
}


export default SignUp;
