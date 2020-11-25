import React from 'react';
import {useSelector} from 'react-redux';



const handlePersonalDetails = () =>{
//   {user.address}
}


const PersonalDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(
        
        <div className="personalDetails">
            <h3>
                <h1>{user.name}</h1>
                <h1>{user.address}</h1>
                <h1>{user.age}</h1>
            </h3>
        </div>
    )
}


export default PersonalDetails;