import React from 'react';
import {useSelector} from 'react-redux';




const AllowedFoodDetails = () =>{
 const user = useSelector(state => state.user.user)
  console.log(user)
    return(    
        <div className="AllowedFoodDetails">
            <h1>food</h1>
        </div>
    )
}


export default AllowedFoodDetails;