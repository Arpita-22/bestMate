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

const handleDelete = (user,signOut, isLoggedAction) =>{
   // const dispatch = useDispatch();
 fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
  method: 'DELETE',
})
.then(res => res.json()) // or res.json()
.then(() => {
   signOut()
   isLoggedAction(false)
   // user = {}
}
)
}

const NavBar = ({signOut, isLoggedAction}) => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   console.log(user)
   return(
      <div>
         {/* <h1>Welcome {user.name} !</h1> */}
         <ul>
            <li>
               <button  className="button" onClick={() => dispatch(interactionAction("personalDetails"))}>Personal Details</button>
               <button  className="button" onClick={() => dispatch(interactionAction("familyDetails"))}>Family Details</button>
               <button className="button" onClick={() => handleUpdate()}> Update User</button>
               <button className="button" onClick={() => handleDelete(user,signOut,isLoggedAction)}> Delete User</button>

               {/* <button onClick={() => dispatch(interactionAction("foodDetails"))}>Food Details</button>
               <button onClick={() => dispatch(interactionAction("questionansDetails"))}>Question answers</button> */}
            </li>
         </ul>
         <h1>Welcome {user.name} !</h1>
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