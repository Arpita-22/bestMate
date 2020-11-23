//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';



export class NavBar extends React.Component {

   handlePersonalDetails = () =>{
      this.props.diplayUser()

   }

   handleFamilyDetails = () =>{

   }
   
   render(){

   return(
      <div>
          <button onClick={() => this.handlePersonalDetails()}>Personal Details</button>
          <button onClick={() => this.handleFamilyDetails()}>Family Details</button>
      </div>
   )
}
}

export default NavBar;