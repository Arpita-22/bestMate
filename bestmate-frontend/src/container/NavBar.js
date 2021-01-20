//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {interactionAction} from '../actions/interactionAction';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {store} from '../index';
import {connect} from 'react-redux';
import {setUser, signOut, allowedFoods, relatives, notes} from '../actions/useraction'




const handleDelete = (user, signOut, isLoggedAction, setUser, allowedFoods, relatives, notes) =>{
  fetch(`https://secure-lake-64435.herokuapp.com/api/v1/users/${user.id}`, {
    method: 'DELETE',
  })
  .then(res => res.json()) 
  .then(() => {
    isLoggedAction(false)
    signOut('')
    allowedFoods('')
    relatives('')
    notes('')
    setUser('')
  })
}

const NavBar = ({signOut, isLoggedAction}) => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   return(
      <div className="blue ui vertical buttons">
         <h1 >Welcome {user.name} !</h1>
               <button  className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("personalDetails"))}>Personal Details</button>
               <button  className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("familyDetails"))}>Family Details</button>
               <button className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("UpdateUser")) }> Update User</button>
               <button className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("AllowedFoodDetails"))}>Allowed Food Details</button>
               <button className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(isLoggedAction("LogIn"))}>SpeechInteraction</button>
               {/* <button onClick={() => dispatch(interactionAction("questionansDetails"))}>Question answers</button> */}
               <button className="ui button" style={{color: 'red',fontFamily:'Lora'}} onClick={() => handleDelete(user, signOut, isLoggedAction, setUser, allowedFoods, relatives, notes)}> Delete User</button>
      </div>
   )
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
     allowedFoods,
     relatives,
     notes
   };
 };
  
 export default connect(
   mapStateToProps,
   mapDispatchToProps()
 )(NavBar);

