import React from 'react';
import {useSelector} from 'react-redux';

const handleNotes = () =>{
    console.log("notes")
}

const FamilyDetails = () =>{
    const user = useSelector(state => state.user.user)
    console.log(user.relatives)
    return(
        <div className="FamilyDetails">
            {user.relatives.map(relative => {
                  return( <ul key={relative.id}>
                    <li>Name:{relative.name}</li>
                    <li>Address:{relative.address}</li>
                    <li>Age:{relative.age}</li>
                    <li>Relationship:{relative.relationship}</li>
                    <li>Distance:{relative.distance}</li>
                    {/* <li onClick={() => handleNotes()}>Notes</li> */}
                    </ul>
                    )
            })}
            {/* <h3>
            <li onClick={() => handleFamilyDetails()}>Family Details</li>
            </h3> */}
        </div>
    )
}

export default FamilyDetails;