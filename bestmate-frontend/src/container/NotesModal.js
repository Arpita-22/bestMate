import React, { useState } from "react";
import Modal from "react-modal";
import CreateNotes from './CreateNotes'
import '../assets/bestmate.css'



Modal.setAppElement("#root");

export default function App(props) {
  const [isOpen, setIsOpen] = useState(false);
  let notesSet = [];

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleSubmit = (e, relative) =>{
    e.preventDefault()
    if(relative.notes){
      relative.notes.push(notesSet[0]);
    } else {
      relative[0].notes = notesSet;
    }
    toggleModal();    
  }

  const handleUpdate = (notes) =>{
    notesSet = notes;
  }

  return (
    <div className="App">
      <button id="add-notes" onClick={toggleModal}>Add notes</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay">
        <CreateNotes handleUpdate = {(e) => handleUpdate(e)}/>
        <button id="cancel-modal"onClick={toggleModal}>Cancel</button>
        <button id="save-notes" onClick={(e) => handleSubmit(e, props.relative)}>Save</button>
      </Modal>
    </div>
  );
}