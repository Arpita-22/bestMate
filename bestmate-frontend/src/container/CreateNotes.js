import React from 'react';import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {setUser,signOut} from '../actions/useraction'
import { isLoggedAction } from '../actions/';
import {BrowserRouter as Router,Route} from 'react-router-dom';


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
        console.log(notes)

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

    handleSubmit = (e,notes,relatives) =>{

    }
    render(){
        // console.log(this.props.user.relatives.map(relative => console.log(relative.id)))
        console.log(this.props.relative)
        const {notes} = this.state
        const {relatives} = this.props.user.relatives
        if (this.state.backToRelative === true){
            return <Redirect to='/Relatives' />
        }
        return(
            <div>
               <h1>Create Notes</h1>
               <button onClick={(e)=> this.addNotes(e)}>Add Notes</button>
               {
                   notes.map((val,idx) =>{
                       let noteId =`note-${idx}`
                       return(
                           <div key={idx}>
                               <label htmlFor={noteId}>{`Note${idx+1}`}</label>
                               <input type="text" name={noteId} data-id={idx} id={noteId} onChange={(e) => this.handleChangeNote(e)}className="description" value={val.description}/>
                               <button onClick={(e) => this.handleRemoveNote(e,idx)}>Remove Note</button>
                                <button onClick={(e)=> this.backToRelative(e)}>Back To Relative</button>
                            </div>
                       )
                   })
               }
               <button onClick={(e) => this.handleSubmit(e,notes,relatives)}>Submit</button>
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
  )(CreateNotes);
