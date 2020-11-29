import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut} from '../actions/useraction'
import { isLoggedAction } from '../actions/';

class AllowedFoods extends React.Component {
    constructor(props){
        super(props)
        this.state={
        allowed_foods:[],
        clicked:false
    }
}



    addAllowedFood = (e) =>{
        this.setState({
            allowed_foods:[...this.state.allowed_foods," "]})
    }

    handleAllowedFoodsChange = (e,index) =>{
        // console.log(this.state.allowed_foods)
        this.state.allowed_foods[index] = e.target.value
        this.setState({
            allowed_foods:this.state.allowed_foods })
    }

    handleRemoveAllowedFood = (index) =>{
        this.state.allowed_foods.splice(index,1)

        this.setState({allowed_foods:this.state.allowed_foods})
    }

    handleSubmit = (e,user) =>{
        // console.log(this.state.allowed_foods)
        const new_allowed_foods ={
            name:this.state.allowed_foods,
            user_id:user.id
        }
        fetch(`http://localhost:3000/api/v1/allowed_foods`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization':`Bearer ${this.state.token}`
            },
            body: JSON.stringify(
                     {
                        name:this.state.allowed_foods,
                        user_id:user.id
                    }
            ),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
            // this.setState({
            //     user: data
            // })
            // this.setState({ clicked: true });  
            // this.props.setUser(data)          
            })
    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    render(){
        // console.log(this.state.allowed_foods)
        let {allowed_foods} = this.state
        const{user} = this.props
        return(
            <div>
                <h1>AllowedFoods</h1>
            <button onClick ={(e) => this.addAllowedFood(e)}>Add Allowed Food</button> 
                {this.state.allowed_foods.map((allowed_food,index) =>{
                return(
               <div key={index}>
               <input onChange={(e) => this.handleAllowedFoodsChange(e,index)}  value={allowed_food} />
                <button onClick={() => this.handleRemoveAllowedFood(index)}>Remove Allowed Food</button>
              </div>
            )
          })} 
          <hr/>
          <button onClick={(e) => this.handleSubmit(e,user)}>Submit</button>
            </div>
        )
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
  )(AllowedFoods);

