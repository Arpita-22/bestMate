//PersonalDetails, FamilyDetails, FoodRestaurant


import React from 'react';
import {useSelector} from 'react-redux';
import PersonalDetails from '../component/PersonalDetails';
import FamilyDetails from '../component/FamilyDetails';
import FoodRestaurant from '../component/FoodRestaurant';
import UpdateUser from '../component/UpdateUser';
import'../assets/bestmate.css'
import AllowedFoodDetails from '../component/AllowedFoodDetails';

const InteractionMode = () =>{
 const interactionMode = useSelector(state => state.interactionType.interactionMode)
    return(
        <div>
           <h3>
               {interactionMode === "personalDetails" ? <PersonalDetails/> : ''}  
               {interactionMode === "familyDetails" ? <FamilyDetails/>: ''}  
               {interactionMode === "UpdateUser" ? <UpdateUser/>: ''}  
               {interactionMode === "AllowedFoodDetails" ? <AllowedFoodDetails/>: ''} 
               {/* {interactionMode === "foodDetails" ? <FoodRestaurant/>: ''}   */}
               {/* {interactionMode === "questionansDetails" ? <QuestionAnswers/>: ''}   */}
           </h3>
        </div>
    )
}


export default InteractionMode;