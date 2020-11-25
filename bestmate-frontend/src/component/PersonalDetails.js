import React from 'react';
import {useSelector} from 'react-redux';




const PersonalDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(
        
        <div className="personalDetails">
                <h1>{user.name}</h1>
                <h1>{user.address}</h1>
                <h1>{user.age}</h1>
        </div>
    )
}


export default PersonalDetails;