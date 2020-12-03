import React from 'react';
import {useSelector} from 'react-redux';


const handleNotes = () =>{
    console.log("notes")
}

const FamilyDetails = () =>{
    const user = useSelector(state => state.user.user)
    // console.log(user.relatives[0].notes[0].description)
    return(
        <div className="family-details">
            {user.relatives.map(relative => {
                  return( 
                    <table key={relative.id}>
                        <tr>
                            <td>Name:</td>
                            <td>{relative.name}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{relative.address}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>{relative.age}</td>
                        </tr>
                        <tr>
                            <td>Relationship:</td>
                            <td>{relative.relationship}</td>
                        </tr>
                        <tr>
                            <td>Distance:</td>
                            <td>{relative.distance}</td>
                        </tr>
                        <tr>
                            <td>Note:</td>
                            <td>
                                {relative.notes.map(note =>{
                                return(
                                    <div key={note.id}> 
                                        Note:{note.description}
                                    </div>
                                )
                                })}
                            </td>
                        {/* <li onClick={() => handleNotes()}>Notes</li> */}
                    </tr>
                    </table>
                )
            })}
            {/* <h3>
            <li onClick={() => handleFamilyDetails()}>Family Details</li>
            </h3> */}
        </div>
    )
}

export default FamilyDetails;