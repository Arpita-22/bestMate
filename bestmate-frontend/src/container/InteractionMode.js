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
import {Grid} from 'semantic-ui-react'


const InteractionMode = () =>{
    const interactionMode = useSelector(state => state.interactionType.interactionMode);
    console.log("===============INTERACITON_MODE===============", interactionMode);
    return(
        // <Grid textAlign='center' style={{ height: '5vh' }} verticalAlign='top'>
        //     <Grid.Column style={{ maxWidth: 450 }}> 
                <div className="interaction-mode">
                    <h3>
                        {interactionMode === "personalDetails" ? <PersonalDetails/> : ''}  
                        {interactionMode === "familyDetails"  || interactionMode === "updateRelatives" ? <FamilyDetails/>: ''}  
                        {interactionMode === "UpdateUser" ? <UpdateUser/>: ''}  
                        {interactionMode === "AllowedFoodDetails" || interactionMode === "updateAllowedFoods" ? <AllowedFoodDetails/>: ''}                     
                        {interactionMode === "fetchUser" || interactionMode === "LogIn" ? <SpeechInteraction/>: ''} 
                        {/* {interactionMode === "foodDetails" ? <FoodRestaurant/>: ''}   */}
                        {/* {interactionMode === "questionansDetails" ? <QuestionAnswers/>: ''}   */}
                    </h3>
                </div>
        //     </Grid.Column>
        // </Grid>
        )
    }


export default InteractionMode;