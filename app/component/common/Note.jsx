import React from "react";

class Note extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      editing : false
    }

    this.renderEdit = this.renderEdit.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
  }
  render(){
    const editing = this.state.editing;

    return (
      <div>
        {editing ? this.renderEdit() : this.renderTask()}
      </div>
    );
  }

  renderTask(){
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.edit}>
        <span className="task">{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  }

  renderDelete(){
    const onDelete = this.props.onDelete;
    return (
      <button className="delete" onClick={onDelete}>x</button>
    )
  }

  edit(){
    this.setState({
      editing : true
    })
  }

  checkEnter(e){
    if(e.key == "Enter"){
      this.finishEdit(e);
    }
  }

  finishEdit(e){
    this.props.onEdit(e.target.value);

    this.setState({
      editing : false
    })
  }

  renderEdit(){
    return (
      <input type="text"
             autofocus={true}
             defaultValue={this.props.task}
             onBlur={this.finishEdit}
             onKeyPress={this.checkEnter} />
    )
  }
}

export default Note;