import React from 'react';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser,signOut,allowedFoods} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'




class AllowedFoodDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
        allowed_foods:[],
        readOnly:true
        }
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
                      <input type="text" name={allowed_foodId} data-id={idx} id={allowed_foodId} placeholder="name" onChange={(e) => this.handleChange(e,idx)}className="description" value={allowed_food.name} />
                      {/* <button onClick={(e) =>this.handleDeleteNote(e,note)}>Delete Allowed Food</button> */}

                  </div>
                      )
            })}
            <button onClick={(e) => this.handleUpdate(e)}>Update</button>
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

