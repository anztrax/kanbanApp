import uuid from "node-uuid";
import alt from "../lib/alt";
import NoteActions from "../actions/NoteActions";

class NoteStore{
  constructor(){
    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note){
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({
      notes : notes.concat(note)
    });
  }

  update({id,task}){
    console.log("update id",task,id);
    const notes = this.notes;
    const noteIndex = this.findNote(id);

    if(noteIndex < 0){
      return;
    }

    notes[noteIndex].task = task;

    this.setState({notes});
  }

  delete(id){
    const notes = this.notes;
    const noteIndex = this.findNote(id);
    if(noteIndex < 0){
      return;
    }

    this.setState({
      notes : notes.slice(0,noteIndex).concat(notes.slice(noteIndex + 1))
    })
  }

  findNote(noteId){
    const notes = this.notes;
    console.log("notes : ",notes);

    const noteIndex = notes.findIndex((note)=>{
        return note.id === noteId
      });

    if(noteIndex < 0){
      console.warn("Failed to find note",noteId);
    }

    return noteIndex;
  }

}

export default alt.createStore(NoteStore,"NoteStore");