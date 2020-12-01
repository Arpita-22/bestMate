import React from 'react';
import {useSelector} from 'react-redux';




const AllowedFoodDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(    
        <div className="AllowedFoodDetails">
            {/* <h1>food</h1> */}
            {user.allowed_foods.map(allowed_food => {
                  return (
                      <ul key={allowed_food.id}>
                         <li> {allowed_food.name}</li> 
                      </ul>
                      )
            })}
        </div>
    )
}


export default AllowedFoodDetails;