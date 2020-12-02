import React from 'react';
import {useSelector} from 'react-redux';




const AllowedFoodDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(    
        <div className="allowed-food-details">
            {/* <h1>food</h1> */}
            {user.allowed_foods.map(allowed_food => {
                  return (
                      <ul className="ui list" key={allowed_food.id}>
                         <li className="item"> {allowed_food.name}</li> 
                      </ul>
                      )
            })}
        </div>
    )
}


export default AllowedFoodDetails;