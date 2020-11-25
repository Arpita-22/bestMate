import React from 'react';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/useraction'
 
class UpdateUser extends React.Component {

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
        clicked: false
      };
    }


    handleUpdate = (e,user) =>{
      e.preventDefault()
      console.log(this.state.user)
      fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
        method: 'PATCH', 
        headers: {
        'Content-Type': 'application/json',
        // 'Authorization':`Bearer ${this.state.token}`
        },
        body: JSON.stringify(
            {user:this.state.user}
        ),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
        this.setState({
            user: data.user
        })
        this.setState({ clicked: true });            
    })

    .catch((error) => {
        console.error('Error:', error);
    });
    }

    handleChange = (e) =>{
      const{name, value} = e.target
      this.setState({
          user:{
              ...this.state.user, [e.target.name]: e.target.value
          }
      });
    }

render() {
  // console.log(this.props.user)
  if (this.state.clicked) {
    return <Redirect to='/MainContainer' />
  }
  const{user} = this.props
    return (
      <div className="update">
        <form onSubmit={(e) => this.handleUpdate(e,user)}>
          {/* <h1>Update</h1> */}
          {/* <h2>Personal Details</h2> */}
            <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} value={this.state.name} />
            <label htmlFor="name">Name</label>

            <input type="text" name="address" placeholder="address" onChange={(e) => this.handleChange(e)} value={this.state.address}/>
            <label htmlFor="">Address</label>
       
            <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleChange(e)} value={this.state.age} />
            <label htmlFor="age">Age</label>
       
            <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
            <label htmlFor="password">Password</label>
         
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged : state.isLogged,
    user: state.user.user
  };
};
 
const mapDispatchToProps = () => {
  return {
    isLoggedAction,
    setUser,
    signOut
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(UpdateUser);

// export default UpdateUser;