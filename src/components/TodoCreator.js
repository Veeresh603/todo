import React from "react";

export default class TodoCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemText: ""
    };
  }
  updateNewTextValue = (e) =>
    this.setState({
      newItemText: e.target.value
    });
  createNewTodo = () => {
    this.props.callback(this.state.newItemText);
    this.setState({
      newItemText: ""
    });
  };
  render() {
    return (
      <div className="d-flex">
        <input
          className="form-control"
          value={this.state.newItemText}
          onChange={this.updateNewTextValue}
        />

        <button className="d-flex btn btn-primary" onClick={this.createNewTodo}>
          Add
        </button>
      </div>
    );
  }
}
