import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import CreateNotes from './CreateNotes'



class Relatives extends React.Component {

    constructor(props){
        super(props)
        this.state={
        relatives:[{
            name:"",
            address:"",
            age:"",
            relationship:"",
            distance:'',
        }],
        clicked:false,
        noteClick:false
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

    handleChangeRelative = (e) =>{
       let relatives = [...this.state.relatives]
       relatives[e.target.dataset.id][e.target.className] = e.target.value
       this.setState({relatives}, () => (this.state.relatives))
    }

    handleRemoveRelative = (e,idx) =>{
        // console.log([idx])
        // this.state.relatives.splice([idx],1)
        // this.setState({
        //     relatives:this.state.relatives
        // })

        this.setState({
            relatives:this.state.relatives.filter((relative,ridx) => idx !== ridx)
        })
    }

    handleSubmit = (e,relatives,user,idx) =>{
        e.preventDefault()
        relatives.map(relative => {
                    fetch(`http://localhost:3000/api/v1/relatives`, {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization':`Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    name:relative.name,
                    address:relative.address,
                    age:relative.age,
                    relationship:relative.relationship,
                    distance:relative.distance,
                    user_id:user.id
                }
                ),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    user: data
                })
                this.setState({ clicked: true });  
                this.props.setUser(data)          
                })
        
            .catch((error) => {
                console.error('Error:', error);
            });
        })
    }

    handleAddNotes = () =>{
        this.setState({
            noteClick:true
        })
    }

    render(){
        let{relatives} = this.state
        const{user} = this.props
        if(this.state.clicked === true){
            return <Redirect to='/MainContainer'  />
        }
        if(this.state.noteClick === true){
            return  <Redirect to='/CreateNotes'  />
        }
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
                               <input type="text" name={relativeId} data-id={idx} id={relativeId} onChange={(e) => this.handleChangeRelative(e)}className="name" value={val.name}/>
                               <label htmlFor={addressId}>Address</label>
                               <input type="text" name={addressId} data-id={idx} id={addressId} onChange={(e) => this.handleChangeRelative(e)} className="address" value={val.address}/>
                               <label htmlFor={ageId}>Age</label>
                               <input type="integer" name={ageId} data-id={idx} id={ageId} onChange={(e) => this.handleChangeRelative(e)} className="age" value={val.age}/>
                               <label htmlFor={relationshipId}>Relationship</label>
                               <input type="text" name={relationshipId} data-id={idx} id={relationshipId} onChange={(e) => this.handleChangeRelative(e)} className="relationship" value={val.relationship}/>
                               <label htmlFor={distanceId}>Distance</label>
                               <input type="integer" name={distanceId} data-id={idx} id={distanceId} onChange={(e) => this.handleChangeRelative(e)} className="distance" value={val.distance}/>
                               <button onClick={(e) => this.handleRemoveRelative(e,idx)}>Remove Relative</button>
                               <button onClick={() => this.handleAddNotes()}>Create Notes</button>
                               </div>
                       )
                   })
               }
               <button onClick={(e) => this.handleSubmit(e,relatives,user)}>Submit</button>
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

