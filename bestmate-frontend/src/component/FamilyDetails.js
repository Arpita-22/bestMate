import React from 'react';
import {useSelector} from 'react-redux';

const handleFamilyDetails = () =>{
    console.log("family")
}

const FamilyDetails = () =>{
    const user = useSelector(state => state.user.user)
    // console.log(user.relatives.map(relative => console.log(relative.name, relative.address)))
    // (Object.keys(user.relatives).map(function(key,index){
    //     console.log(user.relatives["name"])
    // }))
    console.log(user.relatives)
    return(
        <div className="FamilyDetails">
            {user.relatives.map(relative => {
                  return( <ul>
                    <li>name:{relative.name}</li>
                    </ul>
                    )
            })}
            {/* {user.relatives[0].name} */}
            {/* <h3>
            <li onClick={() => handleFamilyDetails()}>Family Details</li>
            </h3> */}
        </div>
    )
}

export default FamilyDetails;