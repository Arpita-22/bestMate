//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';


export class NavBar extends React.Component {

   handlePersonalDetails = () =>{
   console.log("hi")
   }

   handleFamilyDetails = () =>{

   }
   
   render(){

   return(
      <div>
         <h3>
          <li onClick={() => this.handlePersonalDetails()}>Personal Details</li>
          <li onClick={() => this.handleFamilyDetails()}>Family Details</li>
          </h3>
      </div>
   )
}
}

export default NavBar;