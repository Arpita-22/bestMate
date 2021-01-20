import React from 'react';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser,signOut,allowedFoods} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'
import { Redirect } from "react-router-dom";



class AllowedFoodDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
        allowed_foods:this.props.user.allowed_foods,
          readOnly:true,
          clicked:false
        }
    }

    handleChange = (e, idx) =>{
      let allowed_foods = [...this.state.allowed_foods]
      allowed_foods[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({allowed_foods}, () => (this.state.allowed_foods)) 
    }

    handleUpdate = (e, allowed_foods) =>{
      // e.preventDefault()
      allowed_foods.map(allowed_food =>{
        fetch(`https://secure-lake-64435.herokuapp.com/api/v1/allowed_foods/${allowed_food.id}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              allowed_food
          }),
        })
        .then(response => response.json())
        .then(data => {
            let updatedAllowedFoods = [];
            this.state.allowed_foods.forEach((allowed_food) => {
                if(allowed_food.id === data.id){
                  updatedAllowedFoods.push(data);
                } else {
                  updatedAllowedFoods.push(allowed_food);
                }                
            });
            this.setState({allowed_foods:updatedAllowedFoods})
            this.props.allowedFoods(updatedAllowedFoods)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      })
    }

    handleDelete = (e, allowed_food) =>{
      // e.preventDefault()
      fetch(`https://secure-lake-64435.herokuapp.com/api/v1/allowed_foods/${allowed_food.id}`, {
        method: 'DELETE',
      })
      .then(res => res.json()) 
      .then(() => {
          let updatedAllowedFoods = this.state.allowed_foods.filter(allowedFood => allowedFood.id !== allowed_food.id) 
          this.setState({allowed_foods:updatedAllowedFoods})
          this.props.allowedFoods(updatedAllowedFoods)   
      })
    }

    handleReturn = (e) =>{
      e.preventDefault()
      this.setState({
        clicked:!this.state.clicked
      })
    }

    makeUpdate = (e) =>{
      const readOnly = this.state.readOnly; 
      this.setState({ readOnly: !readOnly });  
    }

  render(){
    if(this.state.clicked === true){
      return <Redirect to='/AllowedFoods' />
    }
    return(  
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>  
          <div className="allowed-food-details">
            <h1 style={{color:"midnightblue"}} >Update Food Details</h1>
              {this.props.user.allowed_foods && this.props.user.allowed_foods.map((allowed_food,idx) => {
                  let allowed_foodId =`AllowedFood-${idx}`
                    return (
                      <div key={idx}>
                      <label htmlFor={allowed_foodId}>{`AllowedFood${idx+1}`}</label>
                        <input type="text" name={allowed_foodId} data-id={idx} id={allowed_foodId} placeholder="name" onChange={(e) => this.handleChange(e,idx)}className="name" value={allowed_food.name}readOnly={this.state.readOnly}/>
                        <button id="delete-food" onClick={(e) =>this.handleDelete(e,allowed_food)}>Delete Allowed Food</button>

                    </div>
                  )
              })}
              {this.state.readOnly === true?<button id="make-update-food" onClick={(e) => this.makeUpdate(e)}>Do you want to update?</button>:''}
              {this.state.readOnly === false? <button id="update-food" onClick={(e) => this.handleUpdate(e, this.state.allowed_foods)}>Update</button>:''}
              {this.state.readOnly === false? <button id="cancel-food" onClick={(e) => this.makeUpdate(e)}>Cancel</button>:''}
              <button id="allowed-food" onClick={(e) => this.handleReturn(e)}>Add Allowed Food</button>
          </div>
        </Grid.Column>
      </Grid>
    )
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
      signOut,
      allowedFoods
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(AllowedFoodDetails);

