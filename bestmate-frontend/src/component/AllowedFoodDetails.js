import React from 'react';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser,signOut,allowedFoods} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'




class AllowedFoodDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
        allowed_foods:this.props.user.allowed_foods,
        readOnly:true
        }
    }

    handleChange = (e, idx) =>{
      // console.log(e.target.value, idx)
      // console.log(this.state.allowed_foods)
      let allowed_foods = [...this.state.allowed_foods]
      allowed_foods[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({allowed_foods}, () => (this.state.allowed_foods)) 
    }

    handleUpdate = (e, allowed_foods) =>{
      e.preventDefault()
      console.log(allowed_foods)
      allowed_foods.map(allowed_food =>{
        fetch(`http://localhost:3000/api/v1/allowed_foods/${allowed_food.id}`, {
          method: 'PATCH', 
          headers: {
          'Content-Type': 'application/json',
          // 'Authorization':`Bearer ${this.state.token}`
          },
          body: JSON.stringify({
              allowed_food
          }
          ),
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
          let updatedAllowedFoods = [];
          this.state.allowed_foods.map((allowed_food) => {
              if(allowed_food.id === data.id){
                updatedAllowedFoods.push(data);
              } else {
                updatedAllowedFoods.push(allowed_food);
              }                
          });
          this.props.allowedFoods(updatedAllowedFoods)
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      })
    }

    handleDelete = (e, allowed_food) =>{
      console.log(e, allowed_food)
      fetch(`http://localhost:3000/api/v1/allowed_foods/${allowed_food.id}`, {
        method: 'DELETE',
      })
      .then(res => res.json()) 
      .then(() => {
          this.props.allowedFoods()
      }
      )
    }

render(){
    return(  
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>  
        <div className="allowed-food-details">
            {this.props.user.allowed_foods.map((allowed_food,idx) => {
                let allowed_foodId =`AllowedFood-${idx}`
                  return (
                    <div key={idx}>
                    <label htmlFor={allowed_foodId}>{`AllowedFood${idx+1}`}</label>
                      <input type="text" name={allowed_foodId} data-id={idx} id={allowed_foodId} placeholder="name" onChange={(e) => this.handleChange(e,idx)}className="name" value={allowed_food.name} />
                      <button onClick={(e) =>this.handleDelete(e,allowed_food)}>Delete Allowed Food</button>

                  </div>
                      )
            })}
            <button onClick={(e) => this.handleUpdate(e, this.state.allowed_foods)}>Update</button>
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

