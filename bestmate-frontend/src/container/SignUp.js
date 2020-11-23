import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
 
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
        signedIn: false
        // family:{
        //     name: "" ,
        //     address: "",
        //     age: "",
        //     relationship:"",
        //     distance:""
        // }
        
        };
      }
       
      handleName = (e) => {
        this.setState({
            user:{
                ...this.state.user, name: e.target.value
        }
        });
        // console.log(this.state.user.name)
      };

      handleAddress = (e)=> {
        this.setState({
            user:{
                ...this.state.user, address: e.target.value
            }
        });
      };

      handleAge = (e) => {
        this.setState({
            user:{
                ...this.state.user, age: e.target.value
            }
        });
      };

      handlePassword = (e) =>{
        this.setState({
            user:{
                ...this.state.user, password: e.target.value
            }
        });
      }


    handleSignUp = (e) =>{
        e.preventDefault();
        console.log("111111111", this.state.user)
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
            // this.props.history.push('/')
            console.log("signUp", data);    
            //dispatch true to redux state
            // this.props.isLogged
            
            this.setState({ signedIn: true });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    
  render() {
    // console.log(this.props.isLogged)
    // console.log(this.state.isLogged)
    if (this.state.signedIn) {
      return <Redirect to='/Login' />
    }
    return (
      <div>
        <form onSubmit={(e) => this.handleSignUp(e)}>
          <h1>SignUp</h1>
          {/* <h2>Personal Details</h2> */}
          <div>
            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleName(e)} value={this.state.name} />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" name="address" placeholder="address" onChange={(e) => this.handleAddress(e)} value={this.state.address}/>
            <label htmlFor="">Address</label>
          </div>
          <div>
            <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleAge(e)} value={this.state.age} />
            <label htmlFor="age">Age</label>
          </div>
          {/* <h2>Family Details</h2>
          <div>
            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleName(e)} value={this.state.name} />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" name="address" placeholder="address" onChange={(e) => this.handleAddress(e)} value={this.state.address}/>
            <label htmlFor="">Address</label>
          </div>
          <div>
            <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleAge(e)} value={this.state.age}/>
            <label htmlFor="age">Age</label>
          </div> */}

          <div>
            <input type="password" name="password" placeholder="Password" onChange={(e) => this.handlePassword(e)} />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" value="SignUp" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged
  };
};
 
const mapDispatchToProps = () => {
  return {
    isLoggedAction
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(SignUp);
//  export default SignUp;
