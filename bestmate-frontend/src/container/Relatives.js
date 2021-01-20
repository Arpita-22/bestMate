import React from 'react';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut,allowedFoods,relatives,notes} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import CreateNotes from './CreateNotes'
import NotesModal from './NotesModal'
import {Grid,Menu,Icon} from 'semantic-ui-react'


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
            notes:[]
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
                distance:"",
                notes:[
                ]
            }],
        }))
    }

    handleChangeRelative = (e) =>{
       let relatives = [...this.state.relatives]
       relatives[e.target.dataset.id][e.target.className] = e.target.value
       this.setState({relatives}, () => (this.state.relatives))
    }

    handleRemoveRelative = (e,idx) =>{
        this.setState({
            relatives:this.state.relatives.filter((relative,ridx) => idx !== ridx)
        })
    }


    addNotes = (relative, notes) =>{
        let notesAdded = [];
        notes.map(note => {
            fetch(`https://secure-lake-64435.herokuapp.com/api/v1/notes`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    relative_id: relative.id,
                    description: note.description
                }),
            })
            .then(response => response.json())
            .then(data => {
                notesAdded.push(data.note);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
        return notesAdded;        
    }

    handleSubmit = (e,relatives, user) =>{
        e.preventDefault()
        relatives.map(relative => {
                fetch(`https://secure-lake-64435.herokuapp.com/api/v1/relatives`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: relative.name,
                        address: relative.address,
                        age: relative.age,
                        relationship: relative.relationship,
                        distance: relative.distance,
                        user_id: user.id
                    }   
                ),
            })
            .then(response => response.json())
            .then(data => {                
                const notesAdded = this.addNotes(data.relative, relative.notes);
                data.relative.notes = notesAdded;
                if(user.relatives) {
                    user.relatives.push(data.relative);           
                } else {
                    user.relatives = data.relative;
                }
                this.setState({ clicked: true });  
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        })
        this.props.relatives(user.relatives);
        this.props.setUser(user);        
    }

    handleAddNotes = (idx) =>{
        this.setState({
            noteClick:true
        })
        //passing relatives to CreateNotes component
        this.props.history.push({
            pathname:"/CreateNotes",
            state:{
                relatives: this.state.relatives.filter((relative, ridx) =>  idx === ridx)
            }
        });
    }

    handleReturn = (e) =>{
        e.preventDefault()
        this.setState({ clicked: true })
    }

    render(){
        let{relatives} = this.state
        const{user} = this.props
        if(this.state.clicked === true){
            return <Redirect to='/MainContainer'  />
        }
        if(this.state.noteClick === true){
            return  (
                <div>
                    <CreateNotes relative={this.state.relatives} />
                    <Redirect to='/CreateNotes'  />
                </div>
            )
        }
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Menu secondary pointing>
                        <div className="relatives">
                            <h1 style={{color:"midnightblue"}}>Relatives</h1>
                            <Menu.Item>
                                <button onClick={(e)=> this.addRelatives(e)}><Icon  name="plus"></Icon></button>
                                </Menu.Item>
                                    {
                                        relatives.map((val, idx) =>{
                                            let relativeId =`relative-${idx}`, addressId = `address-${idx}`, ageId = `age-${idx}`, 
                                            relationshipId = `relationship-${idx}`, distanceId = `distance-${idx}`
                                            return(
                                                <div key={idx}>
                                                    <label htmlFor={relativeId}>{`Relative${idx+1}`}</label>
                                                    <input type="text" name={relativeId} data-id={idx} id={relativeId} placeholder="name" onChange={(e) => this.handleChangeRelative(e)}className="name" value={val.name}/>
                                                    <label htmlFor={addressId}>Address</label>
                                                    <input type="text" name={addressId} data-id={idx} id={addressId} placeholder="address" onChange={(e) => this.handleChangeRelative(e)} className="address" value={val.address}/>
                                                    <label htmlFor={ageId}>Age</label>
                                                    <input type="integer" name={ageId} data-id={idx} id={ageId} placeholder="age" onChange={(e) => this.handleChangeRelative(e)} className="age" value={val.age}/>
                                                    <label htmlFor={relationshipId}>Relationship</label>
                                                    <input type="text" name={relationshipId} data-id={idx} id={relationshipId} placeholder="relationship" onChange={(e) => this.handleChangeRelative(e)} className="relationship" value={val.relationship}/>
                                                    <label htmlFor={distanceId}>Distance</label>
                                                    <input type="integer" name={distanceId} data-id={idx} id={distanceId} placeholder="distance" onChange={(e) => this.handleChangeRelative(e)} className="distance" value={val.distance}/>
                                                    <Menu.Item>
                                                        <button onClick={(e) => this.handleRemoveRelative(e,idx)}><Icon  name="minus"></Icon></button>
                                                    </Menu.Item>
                                                    <NotesModal relative = {this.state.relatives.filter((relative,ridx) =>  idx === ridx)}/>
                                                </div>
                                            )
                                        })
                                    }
                                <Menu.Item>
                                <button  id="submit-relatives" onClick={(e) => this.handleSubmit(e,relatives,user)}>Submit</button>
                                <button onClick={(e) => this.handleReturn(e)}>No more to add</button>
                            </Menu.Item>
                        </div>
                    </Menu>
                </Grid.Column>
            </Grid>
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
      signOut,
      allowedFoods,
      relatives,
      notes
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(Relatives);

