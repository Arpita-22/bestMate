import React from 'react';
import {useSelector} from 'react-redux';

const handlePersonalDetails = () =>{
//   {user.address}
}


const PersonalDetails = () =>{
 const user = useSelector(state => state.user.user)
    return(
        <div>
            <h3>
                <li onClick={() => handlePersonalDetails()}>PersonalDetails</li>
                <li>{user.name}</li>
                <li>{user.address}</li>
                <li>{user.age}</li>
            </h3>
        </div>
    )
}


export default PersonalDetails;