import React,{Component} from "react";
import AltContainer from "alt-container";
import Lanes from "../common/Lane/Lanes.jsx";
import LaneActions from "../../actions/LaneActions";
import LaneStore from "../../stores/LaneStore";

import {DragAndDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

@DragAndDropContext(HTML5Backend)
class App extends Component{
  constructor(props) {
    super(props);

    //this.state =  NoteStore.getState();
    //this.addNote = this.addNote.bind(this);
    //this.editNote = this.editNote.bind(this);
    //this.deleteNote = this.deleteNote.bind(this);
    this.addItem = this.addItem.bind(this);
    this.storeChanged = this.storeChanged.bind(this);
  }
  componentDidMount(){
    LaneStore.listen(this.storeChanged);
  }

  componentWillUnmount(){
    LaneStore.unlisten(this.storeChanged);
  }

  storeChanged(state){
    this.setState(state);
  }

  render(){
    return (
      <div>
        <button className="add-note" onClick={this.addItem}>+</button>
        <AltContainer stores={[LaneStore]}
                      inject={{
                        items : ()=> LaneStore.getState().lanes || []
                      }}>
          <Lanes />
        </AltContainer>
      </div>
    )
  }

  addItem(){
    LaneActions.create({
      name : "New Lane"
    });
  }
}

export default App;
