import React,{Component} from "react";
import Note from "./Note.jsx";

class Notes extends Component{
  constructor(props){
    super(props);

    this.state = {};
    this.renderNote = this.renderNote.bind(this);
  }

  render(){
    const notes = this.props.items;
    console.log("notes : ",notes);

    return (
      <ul className="notes">
        {notes.map(this.renderNote)}
      </ul>
    )
  }

  renderNote(note){
    console.log("note : ",note);

    return (
      <li className="note" key={note.id}>
        <Note task={note.task}
              onEdit={this.props.onEdit.bind(null,note.id)}
              onDelete={this.props.onDelete.bind(null,note.id)} />
      </li>
    )
  }
}

export default Notes;