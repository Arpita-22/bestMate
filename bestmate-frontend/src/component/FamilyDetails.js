import React from 'react';
import {useSelector} from 'react-redux';

const handleNotes = () =>{
    console.log("notes")
}

const FamilyDetails = () =>{
    const user = useSelector(state => state.user.user)
    console.log(user.relatives)
    return(
        <div className="family-details">
            {user.relatives.map(relative => {
                  return( <div className="ui bulleted list" key={relative.id}>
                    <div className="item">Name:{relative.name}</div>
                    <div >Address:{relative.address}</div>
                    <div >Age:{relative.age}</div>
                    <div>Relationship:{relative.relationship}</div>
                    <div >Distance:{relative.distance}</div>
                    {/* <li onClick={() => handleNotes()}>Notes</li> */}
                    </div>
                    )
            })}
            {/* <h3>
            <li onClick={() => handleFamilyDetails()}>Family Details</li>
            </h3> */}
        </div>
    )
}

export default FamilyDetails;