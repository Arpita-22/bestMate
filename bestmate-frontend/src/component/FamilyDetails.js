import React from 'react';

const handleFamilyDetails = () =>{
    console.log("family")
}

const FamilyDetails = () =>{
    return(
        <div>
            <h3>
            <li onClick={() => handleFamilyDetails()}>Family Details</li>
            </h3>
        </div>
    )
}

export default FamilyDetails;