//PersonalDetails, FamilyDetails, FoodRestaurant

import React from 'react';
import PersonalDetails from '../component/PersonalDetails';
import FamilyDetails from '../component/FamilyDetails';


export class NavBar extends React.Component {

  
   render(){

   return(
      <div>
          <PersonalDetails />
          <FamilyDetails />
      </div>
   )
}
}

export default NavBar;