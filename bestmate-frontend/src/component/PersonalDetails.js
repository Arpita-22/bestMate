import React from 'react';
import {useSelector} from 'react-redux';


const PersonalDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(
        
        <div className="personal-details">
                <h2>Address: {user.address}</h2>
                <h2>Age: {user.age}</h2>
        </div>
    )
}


export default PersonalDetails;