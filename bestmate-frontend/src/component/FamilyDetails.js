import React from 'react';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser,signOut,relatives,notes} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import NotesModal from '../container/NotesModal'
import CreateNotes from '../container/CreateNotes'



class FamilyDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            relatives: this.props.user.relatives,
            notes:[],
            showRelatives: 2,
            readOnly:true,
            clicked:false
        }
    }

    handleShowMore = () =>{
        this.setState({
            showRelatives: 
              this.state.showRelatives >= this.state.relatives.length ?
                this.state.showRelatives : this.state.showRelatives + 1
          })
    }

    handleChange = (e,idx) =>{
        let relatives = [...this.state.relatives]
        relatives[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({relatives}, () => (this.state.relatives)) 
    }

    handleChangeNotes = (e, relative) =>{
        let notes = [...relative.notes]
        notes[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({notes}, () => (this.state.notes)) 
    }

    handleUpdate = (e,relative) =>{
        e.preventDefault()
        fetch(`https://secure-lake-64435.herokuapp.com/api/v1/relatives/${relative.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                relative
            }),
        })
        .then(response => response.json())
        .then(data => {
            let updatedRelatives = [];
            this.state.relatives.map((relative) => {
                if(relative.id === data.id){
                    updatedRelatives.push(data);
                } else {
                    updatedRelatives.push(relative);
                } 
                this.setState({relatives:updatedRelatives})               
            });
            this.props.relatives(updatedRelatives)
            this.updateNote(relative)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    updateNote = (relative) =>{
        this.setState({notes:relative.notes})
        this.state.notes.map(note =>{
            if(note.id){
                fetch(`https://secure-lake-64435.herokuapp.com/api/v1/notes/${note.id}`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        note
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    //update family details component state
                    let updatedNotes = [];
                    this.state.notes.map((note) => {
                        if(note.id === data.id){
                            updatedNotes.push(data);
                        } else {
                            updatedNotes.push(note);
                        } 
                        this.setState({notes:this.updateNotes})               
                    });

                    //update note for the specific relative
                    let updatedRelatives = [];
                    this.state.relatives.map((relativeFromState) => {
                        if(relativeFromState.id === relative.id){
                            relativeFromState.notes = updatedNotes;
                        }
                        updatedRelatives.push(relativeFromState);
                    });
                    this.setState({relatives:updatedRelatives})
                    this.props.relatives(updatedRelatives);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
            else{
                let createdNotes = []
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
                createdNotes.push(data.note)
                let updatedRelatives = [];
                this.state.relatives.map((relativeFromState) => {
                    if(relativeFromState.id === relative.id){
                        relativeFromState.notes = createdNotes;
                    }
                    updatedRelatives.push(relativeFromState);
                });
                this.props.relatives(updatedRelatives);

            })
            .catch((error) => {
                console.error('Error:', error);
            }); 
        }
    })

    }

    handleDeleteNote = (e, noteToDelete, relative) =>{
        e.preventDefault();
        fetch(`https://secure-lake-64435.herokuapp.com/api/v1/notes/${noteToDelete.id}`, {
            method: 'DELETE',
        })
        .then(res => res.json()) 
        .then(() => {
            //update family details component state
            let updatedNotes = relative.notes.filter(note => note.id !== noteToDelete.id);
            
            //update note for the specific relative
            let updatedRelatives = [];
            this.state.relatives.map((relativeFromState) => {
                if(relativeFromState.id === relative.id){
                    relativeFromState.notes = updatedNotes;
                }
                updatedRelatives.push(relativeFromState);
            });
            this.props.relatives(updatedRelatives);            
        })
    }

    handleDeleteRelative = (e,relative) =>{
        e.preventDefault()
        fetch(`https://secure-lake-64435.herokuapp.com/api/v1/relatives/${relative.id}`, {
            method: 'DELETE',
        })
        .then(res => res.json()) 
        .then(() => {
            let updatedRelatives = this.props.user.relatives.filter(relativeInner => relativeInner.id !== relative.id) 
            this.props.relatives(updatedRelatives)
        })
    }

    handleReturn = (e) =>{
        e.preventDefault()
        this.setState({
          clicked:true
        })
    }

    makeUpdate = (e) =>{
        e.preventDefault()
        const readOnly = this.state.readOnly; 
        this.setState({ readOnly: !readOnly });  
    }

    render(){
        if(this.state.clicked === true){
            return <Redirect to='/Relatives' />
        }
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <div className="family-details">
                        <h1 style={{color:"midnightblue"}}>Update Family Details</h1>
                        {this.props.user.relatives && this.props.user.relatives.slice(0, this.state.showRelatives).map((relative,idx) => {
                            let relativeId =`relative-${idx}`, addressId = `address-${idx}`, ageId = `age-${idx}`, 
                            relationshipId = `relationship-${idx}`, distanceId = `distance-${idx}`
                            return(
                                <div key={idx}>
                                    <label htmlFor={relativeId}>{`Relative${idx+1}`}</label>
                                    <input type="text" name={relativeId} data-id={idx} id={relativeId} placeholder="name" onChange={(e) => this.handleChange(e,idx)}className="name" value={relative.name} readOnly={this.state.readOnly} />
                                    <label htmlFor={addressId}>Address</label>
                                    <input type="text" name={addressId} data-id={idx} id={addressId} placeholder="address" onChange={(e) => this.handleChange(e,idx)} className="address" value={relative.address} readOnly={this.state.readOnly}/>
                                    <label htmlFor={ageId}>Age</label>
                                    <input type="integer" name={ageId} data-id={idx} id={ageId} placeholder="age" onChange={(e) => this.handleChange(e,idx)} className="age" value={relative.age} readOnly={this.state.readOnly}/>
                                    <label htmlFor={relationshipId}>Relationship</label>
                                    <input type="text" name={relationshipId} data-id={idx} id={relationshipId} placeholder="relationship" onChange={(e) => this.handleChange(e,idx)} className="relationship" value={relative.relationship} readOnly={this.state.readOnly}/>
                                    <label htmlFor={distanceId}>Distance</label>
                                    <input type="integer" name={distanceId} data-id={idx} id={distanceId} placeholder="distance" onChange={(e) => this.handleChange(e,idx)} className="distance" value={relative.distance} readOnly={this.state.readOnly}/>
                                    {relative.notes && relative.notes.map((note,idx) =>{
                                        let noteId=`description-${idx}`
                                        return(
                                            <div key={idx}>
                                            <label htmlFor={relativeId}>{`Note${idx+1}`}</label>
                                                <input type="text" name={noteId} data-id={idx} id={noteId} placeholder="description" onChange={(e) => this.handleChangeNotes(e,relative)}className="description" value={note.description} readOnly={this.state.readOnly}/>
                                                <button id="delete-note"onClick={(e) =>this.handleDeleteNote(e, note, relative)}>Delete Note</button>
                                            </div>
                                        )
                                    })}
                                    {this.state.readOnly === true? '': <NotesModal relative = {relative}/>}
                                    {this.state.readOnly === true?<button id="make-update-relative" onClick={(e) => this.makeUpdate(e)}>Do you want to update?</button>:''}
                                    {this.state.readOnly === false?<button id="update-relative" onClick={(e) => this.handleUpdate(e, relative)}>Update</button>: ''}
                                    {this.state.readOnly === false?<button id="cancel-relative" onClick={(e) => this.makeUpdate(e)}>Cancel</button>:''}
                                    <button id="delete-relative" onClick={(e) => this.handleDeleteRelative(e,relative)}>Delete Relative</button>
                                </div>
                            )})}
                            <button id="show-more" onClick={this.handleShowMore}>Show more!</button>
                            <button id="relative" onClick={(e) => this.handleReturn(e)}>Add Relatives</button>
                    </div>
                </Grid.Column>
        </Grid>
    )}
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
      setUser,
      signOut,
      relatives,
      notes
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(FamilyDetails);

