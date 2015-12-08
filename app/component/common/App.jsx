import React,{Component} from "react";
import Notes from "./Notes.jsx";
import AltContainer from "alt-container";
import Lanes from "../common/Lane/Lane.jsx";
import NoteActions from "../../actions/NoteActions";
import NoteStore from "../../stores/NoteStore";

class App extends Component{
  constructor(props) {
    super(props);

    //this.state =  NoteStore.getState();
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.storeChanged = this.storeChanged.bind(this);
  }
  componentDidMount(){
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount(){
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged(state){
    this.setState(state);
  }

  render(){
    //const notes = this.state.notes;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <AltContainer stores={[NoteStore]}
                      inject={{
                        items : ()=> NoteStore.getState().notes
                      }}>
          <Notes onEdit={this.editNote}
                 onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  addNote(){
    console.log("testing !");
    NoteActions.create({task : "New Task"});
  }

  editNote(id,task){
    NoteActions.update({id,task});
  }

  deleteNote(id){
    NoteActions.delete(id);
  }
}

export default App;
