import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class Relatives extends React.Component {
    constructor(props){
        super(props)
        this.state={
        relatives:[{
            name:"",
            address:"",
            age:"",
            relationship:"",
            distance:''
        }],
        clicked:false
        }
    }

    addRelatives = (e) =>{
        this.setState((prevState) =>({
            relatives:[...prevState.relatives,
                {
                name:"",
                address:"",
                age:"",
                relationship:"",
                distance:""
            }],
        }))
    }

    render(){
        let{relatives} = this.state
        return(
            <div>
                <h1>Relatives</h1>
               <button onClick={(e)=> this.addRelatives(e)}>Add Relatives</button>
               {
                   relatives.map((val,idx) =>{
                       let relativeId =`relative-${idx}`, addressId = `address-${idx}`, ageId = `age-${idx}`, 
                       relationshipId = `relationship-${idx}`, distanceId = `distance-${idx}`
                       return(
                           <div key={idx}>
                               <label htmlFor={relativeId}>{`Relative${idx+1}`}</label>
                               <input type="text" name={relativeId} data-id={idx} id={relativeId} className="name"/>
                               <label htmlFor={addressId}>Address</label>
                               <input type="text" name={addressId} data-id={idx} id={addressId} className="address"/>
                               <label htmlFor={ageId}>Age</label>
                               <input type="integer" name={ageId} data-id={idx} id={ageId} className="age"/>
                               <label htmlFor={relationshipId}>Relationship</label>
                               <input type="text" name={relationshipId} data-id={idx} id={relationshipId} className="relationship"/>
                               <label htmlFor={distanceId}>Distance</label>
                               <input type="integer" name={distanceId} data-id={idx} id={distanceId} className="distance"/>
                               </div>
                       )
                   })
               }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      isLogged : state.isLogged,
      user: state.user.user
    };
  };
   
  const mapDispatchToProps = (Log_In) => {
    return {
      isLoggedAction,
      setUser,
      signOut
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(Relatives);

// export default Relatives