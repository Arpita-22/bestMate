//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {interactionAction} from '../actions/interactionAction';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {store} from '../index';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/useraction'




// const handleUpdate = (user) =>{
// console.log(user)
// }

const handleDelete = (user,signOut, isLoggedAction) =>{
 fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
  method: 'DELETE',
})
.then(res => res.json()) 
.then(() => {
   signOut()
   isLoggedAction(false)
}
)
}

const NavBar = ({signOut, isLoggedAction}) => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   return(
      <div className="blue ui vertical buttons">
         <h1 >Welcome {user.name} !</h1>
               <button  className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("personalDetails"))}>Personal Details</button>
               <button  className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("familyDetails"))}>Family Details</button>
               {/* <button className="button" onClick={() => handleUpdate(user)}> Update User</button> */}
               <button className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("UpdateUser")) }> Update User</button>
               <button className="ui button" style={{color: 'red',fontFamily:'Lora'}} onClick={() => handleDelete(user,signOut,isLoggedAction)}> Delete User</button>
               <button className="ui button" style={{fontFamily:'Lora'}} onClick={() => dispatch(interactionAction("AllowedFoodDetails"))}>Allowed Food Details</button>
               {/* <button onClick={() => dispatch(interactionAction("questionansDetails"))}>Question answers</button> */}
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
     signOut
   };
 };
  
 export default connect(
   mapStateToProps,
   mapDispatchToProps()
 )(NavBar);

