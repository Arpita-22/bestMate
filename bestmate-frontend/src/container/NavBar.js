//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {interactionAction} from '../actions/interactionAction';
import { Redirect } from "react-router-dom";
import { isLoggedAction } from '../actions/';
import {store} from '../index';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/useraction'


// state = {
//    signedin: true
// }

const handleUpdate = () =>{

}

const handleDelete = (user) =>{
   // const dispatch = useDispatch();
 fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
  method: 'DELETE',
})
.then(res => res.json()) // or res.json()
.then(() => {
   // () => dispatch(setUser())
   window.localStorage.clear()
}
)
}

const NavBar = () => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   return(
      <div>
         <h1>Welcome {user.name} !</h1>
         <ul>
            <li>
               <button  className="button" onClick={() => dispatch(interactionAction("personalDetails"))}>Personal Details</button>
               <button  className="button" onClick={() => dispatch(interactionAction("familyDetails"))}>Family Details</button>
               <button onClick={() => handleUpdate()}> Update User</button>
               <button onClick={() => handleDelete(user)}> Delete User</button>

               {/* <button onClick={() => dispatch(interactionAction("foodDetails"))}>Food Details</button>
               <button onClick={() => dispatch(interactionAction("questionansDetails"))}>Question answers</button> */}
            </li>
         </ul>
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

// export default NavBar;