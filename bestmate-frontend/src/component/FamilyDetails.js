import React from 'react';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser,signOut,relatives,notes} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'



class FamilyDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            relatives: this.props.user.relatives,
            notes:[],
            showRelatives:2,
            readOnly:true
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
        // let n = relatives.map((relative, idx) => idx === e.target.dataset.id ?  {...relative,[relative.target.name]:[e.target.name]}: relative)
        // this.setState({relatives:n}, () => (this.state.relatives)) 
        this.setState({relatives}, () => (this.state.relatives)) 
    }

    handleChangeNotes = (e, relative) =>{
        let notes = [...relative.notes]
        notes[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({notes}, () => (this.state.notes)) 
    }

    handleUpdate = (e,relative) =>{
        e.preventDefault()
        alert(JSON.stringify(relative));
        fetch(`http://localhost:3000/api/v1/relatives/${relative.id}`, {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization':`Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                relative
            }
            ),
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
            });

            this.setState({
                relatives:[...this.state.relatives, data]
            })
            this.props.relatives(updatedRelatives)
            this.updateNote(relative)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    updateNote = (relative) =>{
        this.state.notes.map(note =>{
            fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
                method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization':`Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    note
                }
                ),
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
                });

                //update note for the specific relative
                let updatedRelatives = [];
                this.state.relatives.map((relativeFromState) => {
                    if(relativeFromState.id === relative.id){
                        relativeFromState.notes = updatedNotes;
                    }
                    updatedRelatives.push(relativeFromState);
                });
                //this.props.notes(updatedRelatives);
                this.setState({
                    notes:[...this.state.notes, data]
                })
                this.props.relatives(updatedRelatives);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        })
    }

    handleDeleteNote = (e, note) =>{
        console.log(e,note)
        fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
            method: 'DELETE',
          })
          .then(res => res.json()) 
          .then(() => {
              this.props.notes()
          }
          )
    }

    handleDeleteRelative = (e,relative) =>{
        console.log(e,relative)
        fetch(`http://localhost:3000/api/v1/relatives/${relative.id}`, {
            method: 'DELETE',
          })
          .then(res => res.json()) 
          .then(() => {
              this.props.relatives()
          }
          )
    }

    render(){
        // const {user} = this.props.user
        console.log("~~~~~~~~~IN RENDER family details~~~~~~~~~~~", JSON.stringify(this.props.user.relatives));
    return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <div className="family-details">
                {this.state.relatives.slice(0, this.state.showRelatives).map((relative,idx) => {
                      let relativeId =`relative-${idx}`, addressId = `address-${idx}`, ageId = `age-${idx}`, 
                      relationshipId = `relationship-${idx}`, distanceId = `distance-${idx}`
                      return(
                          <div key={idx}>
                              <label htmlFor={relativeId}>{`Relative${idx+1}`}</label>
                              <input type="text" name={relativeId} data-id={idx} id={relativeId} placeholder="name" onChange={(e) => this.handleChange(e,idx)}className="name" value={relative.name} />
                              <label htmlFor={addressId}>Address</label>
                              <input type="text" name={addressId} data-id={idx} id={addressId} placeholder="address" onChange={(e) => this.handleChange(e,idx)} className="address" value={relative.address} />
                              <label htmlFor={ageId}>Age</label>
                              <input type="integer" name={ageId} data-id={idx} id={ageId} placeholder="age" onChange={(e) => this.handleChange(e,idx)} className="age" value={relative.age} />
                              <label htmlFor={relationshipId}>Relationship</label>
                              <input type="text" name={relationshipId} data-id={idx} id={relationshipId} placeholder="relationship" onChange={(e) => this.handleChange(e,idx)} className="relationship" value={relative.relationship} />
                              <label htmlFor={distanceId}>Distance</label>
                              <input type="integer" name={distanceId} data-id={idx} id={distanceId} placeholder="distance" onChange={(e) => this.handleChange(e,idx)} className="distance" value={relative.distance} />
                              {relative.notes.map((note,idx) =>{
                                  let noteId=`description-${idx}`
                                  return(
                                        <div key={idx}>
                                          <label htmlFor={relativeId}>{`Note${idx+1}`}</label>
                                            <input type="text" name={noteId} data-id={idx} id={noteId} placeholder="description" onChange={(e) => this.handleChangeNotes(e,relative)}className="description" value={note.description} />
                                            <button onClick={(e) =>this.handleDeleteNote(e,note)}>Delete Note</button>

                                        </div>
                                  )
                              })}
                              <button id="update-`${idx}`" onClick={(e) => this.handleUpdate(e, relative)}>Update</button>
                              <button onClick={(e) => this.handleDeleteRelative(e,relative)}>Delete Relative</button>
                            </div>
                        )})}
                        <button onClick={this.handleShowMore}>Show more!</button>
        </div>
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

