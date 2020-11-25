//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {interactionAction} from '../actions/interactionAction';

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
               {/* <button onClick={() => dispatch(interactionAction("foodDetails"))}>Food Details</button>
               <button onClick={() => dispatch(interactionAction("questionansDetails"))}>Question answers</button> */}
            </li>
         </ul>
      </div>
   )
}

export default NavBar;