import React from 'react';
import {useSelector} from 'react-redux';
import {Grid} from 'semantic-ui-react'

const handleNotes = () =>{
    console.log("notes")
}

const FamilyDetails = () =>{
    const user = useSelector(state => state.user.user)
    console.log(user.relatives[0].notes[0].description)
    return(
        <div className="family-details">
            {user.relatives.map(relative => {
                  return( <div className="ui bulleted list" key={relative.id}>
                    <div className="item">Name:{relative.name}</div>
                    <div >Address:{relative.address}</div>
                    <div >Age:{relative.age}</div>
                    <div>Relationship:{relative.relationship}</div>
                    <div >Distance:{relative.distance}</div>
                    {relative.notes.map(note =>{
                        return(
                        <div key={note.id}> 
                            Note:{note.description}
                        </div>
                        )
                    })}
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