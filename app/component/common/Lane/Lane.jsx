import React, {Component} from "react";
import AltContainer from "alt-container";
import Notes from "../Notes.jsx";
import NoteActions from "../../../actions/NoteActions";
import NoteStore from "../../../stores/NoteStore";
import LaneActions from "../../../actions/LaneActions";
import Editable from "../Editable/Editable.jsx";


class Lane extends Component{
  constructor(props){
    super(props);

    const id = props.lane.id;

    this.addNote = this.addNote.bind(this,id);
    this.deleteNote = this.deleteNote.bind(this,id);
    this.editName = this.editName.bind(this,id);
    this.deleteName = this.deleteName.bind(this,id);
  }

  render(){
    const {lane,...props} = this.props;

    return (
      <div {...props}>
        <div className="lane-header">
          <button onClick={this.deleteName}>x</button>
          <Editable className="lane-name" value={lane.name} onEdit={this.editName} />
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer stores={[NoteStore]}
                      inject={{
                        items : ()=> NoteStore.get(lane.notes) || []
                      }}>
          <Notes onEdit={this.editNote}
                 onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  deleteName(laneId){
    console.log("delete lane ",laneId);
    LaneActions.delete(laneId);
  }

  editName(id,name){
    if(name){
      LaneActions.update({id,name});
    }else {
      LaneActions.delete(id);
      console.log("edited lane name :", id, name);
    }
  }

  addNote(laneId){
    NoteActions.create({task : "New Task"});
    LaneActions.attachToLane({laneId});
  }

  editNote(id,task){
    NoteActions.update({id,task});
  }

  deleteNote(laneId,noteId){
    console.log("delete note ",noteId);
    LaneActions.detachFromLane({laneId,noteId});
    NoteActions.delete(noteId);
  }
}

Lane.Header = class LaneHeader extends Component{
  render(){
    return (
      <h1></h1>
    );
  }
}

Lane.Notes = class LaneNotes extends Component{
  render(){
    return (
      <div className="notes-container"></div>
    );
  }
}

export default Lane;