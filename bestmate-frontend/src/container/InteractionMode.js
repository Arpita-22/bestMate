//PersonalDetails, FamilyDetails, FoodRestaurant


import React from 'react';
import'../assets/bestmate.css'
import {useSelector} from 'react-redux';
import PersonalDetails from '../component/PersonalDetails';
import FamilyDetails from '../component/FamilyDetails';
import FoodRestaurant from '../component/FoodRestaurant';
import UpdateUser from '../component/UpdateUser';
import AllowedFoodDetails from '../component/AllowedFoodDetails';
import SpeechInteraction from '../component/SpeechInteraction';

const InteractionMode = () =>{
    const interactionMode = useSelector(state => state.interactionType.interactionMode)
    return(
        <div className="interaction-mode">
           <h3>
               {interactionMode === "personalDetails" ? <PersonalDetails/> : ''}  
               {interactionMode === "familyDetails" ? <FamilyDetails/>: ''}  
               {interactionMode === "UpdateUser" ? <UpdateUser/>: ''}  
               {interactionMode === "AllowedFoodDetails" ? <AllowedFoodDetails/>: ''} 
               
               {interactionMode === "fetchUser" ? <SpeechInteraction/>: ''} 
               {interactionMode === "LogIn" ? <SpeechInteraction/>: ''} 
               {/* {interactionMode === "foodDetails" ? <FoodRestaurant/>: ''}   */}
               {/* {interactionMode === "questionansDetails" ? <QuestionAnswers/>: ''}   */}
           </h3>
        </div>
    )
}


export default InteractionMode;