import React from 'react';
import {connect} from 'react-redux';
import { isLoggedAction, } from '../actions/';
import {setUser} from '../actions/useraction'

const handlePersonalDetails = () =>{

}

const PersonalDetails = () =>{
    return(
        <div>
            <h3>
            <li onClick={() => handlePersonalDetails()}>PersonalDetails</li>
            </h3>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      isLogged : state.isLogged,
      user: state.user.user
    };
  };
   
  const mapDispatchToProps = () => {
    return {
      isLoggedAction,
      setUser
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(PersonalDetails);

// export default PersonalDetails;