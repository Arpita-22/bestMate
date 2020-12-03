import React from 'react';import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Menu,Icon} from 'semantic-ui-react'



class CreateNotes extends React.Component {

    constructor(props){
        super(props)
        this.state={
        notes:[{
            description:""
        }],
        clicked:false,
        backToRelative:false
        }
    }

    addNotes = () =>{
        this.setState((prevState) =>({
            notes:[...prevState.notes,
                {
                description:""
            }],
        }))

    }


    handleChangeNote = (e) =>{
        let notes = [...this.state.notes]
        notes[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({notes}, () => (this.state.notes))
        this.props.handleUpdate(notes);
    }

    handleRemoveNote = (e,idx) =>{
        this.setState({
            notes:this.state.notes.filter((note,nidx) => idx !== nidx)
        })
    }

    backToRelative = () =>{
        this.setState({
            backToRelative:true
        })
    }

    // handleSubmit = (e,notes, relative) =>{
    //     e.preventDefault()
    //     relative.notes = notes
    //     console.log(relative,notes)
    // }

    render(){
        const {notes} = this.state
        //const relative =  this.props.location.state.relatives[0]
        return(
            <Menu secondary pointing>
            <div>
               <h1>Create Notes</h1>
               <Menu.Item>
               <button onClick={(e)=> this.addNotes(e)}><Icon  name="plus"></Icon></button>
               </Menu.Item>
               {
                   notes.map((val, idx) =>{
                       let noteId =`note-${idx}`
                       return(
                           <div key={idx}>
                               <label htmlFor={noteId}>{`Note${idx+1}`}</label>
                               <input type="text" name={noteId} data-id={idx} id={noteId} placeholder="note" onChange={(e) => this.handleChangeNote(e)}className="description" value={val.description}/>
                               <Menu.Item>
                               <button onClick={(e) => this.handleRemoveNote(e,idx)}><Icon  name="minus"></Icon></button>
                               </Menu.Item>
                            </div>
                       )
                   })
               }
               {/* <button onClick={(e) => this.handleSubmit(e,notes,relative)}>Submit</button> */}
            </div>
            </Menu>
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
  )(CreateNotes);
