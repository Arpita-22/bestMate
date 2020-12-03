import React from 'react';
import {useSelector, useStore} from 'react-redux';
import { isLoggedAction } from '../actions/';
import {connect} from 'react-redux';
import {setUser, signOut} from '../actions/useraction'
import {Grid} from 'semantic-ui-react'



class FamilyDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            relatives:this.props.user.relatives,
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
        let notes = [...relatives[idx].notes]
        relatives[e.target.dataset.id][e.target.className] = e.target.value
        notes[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({relatives}, () => (this.state.relatives))
        this.setState({notes}, () => (this.state.notes))
    }

    handleUpdate = (e,relative) =>{
        e.preventDefault()
        console.log(relative.id, relative)
        fetch(`http://localhost:3000/api/v1/relatives/${relative.id}`, {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization':`Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                relative:relative
            }
            ),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.updateNote(data.notes)
            // this.setState({
            //     user: data
            // })
            // this.setState({ clicked: true });  
            // this.props.setUser(data)          
            })
    
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    updateNote = (notes) =>{
        notes.map(note =>{
            fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
                method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization':`Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    note:note
                }
                ),
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
                // this.setState({
                //     user: data
                // })
                // this.setState({ clicked: true });  
                // this.props.setUser(data)          
                })
        
            .catch((error) => {
                console.error('Error:', error);
            });

        })
    }

    render(){
        const {user} = this.props.user
        // console.log(this.props.user.relatives)
    return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <div className="family-details">
                {this.state.relatives.slice(0,this.state.showRelatives).map((relative,idx) => {
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
                                            <input type="text" name={noteId} data-id={idx} id={noteId} placeholder="description" onChange={(e) => this.handleChange(e,idx)}className="description" value={note.description} />
                                            
                                          </div>
                                  )
                              })}
                              <button onClick={(e) => this.handleUpdateRelative(e,relative)}>Update</button>
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
      signOut
    };
  };
   
  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(FamilyDetails);

