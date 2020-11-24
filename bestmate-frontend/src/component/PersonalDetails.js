import React from 'react';

const handlePersonalDetails = () =>{
    console.log("hi")
}

const PersonalDetails = () =>{
    return(
        <div>
            <h3>
            <li onClick={() => handlePersonalDetails()}>Personal Details</li>
            </h3>
        </div>
    )
}

export default PersonalDetails;