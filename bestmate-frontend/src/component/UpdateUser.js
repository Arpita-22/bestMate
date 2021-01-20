import React from 'react';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'
 
class UpdateUser extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user:{
          name: this.props.user.name ,
          address: this.props.user.address,
          age: this.props.user.age,
          password:" "
        },
        token:"",
        clicked: false,
        readOnly: true
      };
    }


    handleUpdate = (e,user) =>{
      e.preventDefault()
      fetch(`https://secure-lake-64435.herokuapp.com/api/v1/users/${user.id}`, {
        method: 'PATCH', 
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
            user: data
        })
        this.setState({ clicked: true });  
        this.props.setUser(data)          
        })

    .catch((error) => {
        console.error('Error:', error);
    });
    }

    handleChange = (e) =>{
      const{name, value} = e.target
      const readOnly = this.state.readOnly;
      this.setState({
          user:{
              ...this.state.user, [e.target.name]: e.target.value
          }
      });
    }

    makeUpdate = (e) =>{
      e.preventDefault()
      const readOnly = this.state.readOnly; 
      this.setState({ readOnly: !readOnly });  
    }
    
render() {
  if (this.state.clicked) {
    return <Redirect to='/MainContainer' />
  }
  const{user} = this.props
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <div className="update">
              <form onSubmit={(e) => this.handleUpdate(e,user)}>
                <h1 style={{color:"midnightblue",fontFamily:"Lora"}}>Update Personal Details</h1>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" placeholder="name" onChange={(e) => this.handleChange(e)} value={this.state.user.name} readOnly={this.state.readOnly}/>

                  <label htmlFor="">Address</label>
                  <input type="text" name="address" placeholder="address" onChange={(e) => this.handleChange(e)} value={this.state.user.address} readOnly={this.state.readOnly}/>

                  <label htmlFor="age">Age</label>
                  <input type="integer" name="age" placeholder="age" onChange={(e) => this.handleChange(e)} value={this.state.user.age} readOnly={this.state.readOnly}/>

                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} readOnly={this.state.readOnly}/>
              
                  {this.state.readOnly === true ?
                    <input type="submit" onClick={(e) => this.makeUpdate(e)} value="Update information" />  : ''}
        
                {this.state.readOnly === false ?
                    <input type="submit" value="Submit" />  : ''}

                {this.state.readOnly === false ?
                    <input type="submit" onClick={(e) => this.makeUpdate(e)} value="Cancel" />  : ''}
              </form>
          </div>
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

