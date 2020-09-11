import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoBanner from "./components/TodoBanner";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Veeru",
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Get Store", done: false },
        { action: "Collect tickets", done: false },
        { action: "Go to Pub", done: false }
      ],
      newItemText: ""
    };
  }
  updateNewTextValue = (e) => {
    this.setState({
      newItemText: e.target.value
    });
  };
  createNewTodo = () => {
    if (
      !this.state.todoItems.find(
        (item) => item.action === this.state.newItemText
      )
    ) {
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          { action: this.state.newItemText, done: false }
        ],
        newItemText: ""
      });
    }
  };
  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    });
  todoTableRows = () =>
    this.state.todoItems.map((item) => (
      <tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => this.toggleTodo(item)}
          />
        </td>
      </tr>
    ));
  render() {
    const { todoItems, newItemText, username } = this.state;
    return (
      <div>
        <TodoBanner user={username} todo={todoItems} />

        <div className="container-fluid d-flex justify-content-center">
          <div className="my-1">
            <input
              className="form-control"
              value={newItemText}
              onChange={this.updateNewTextValue}
            />
          </div>
          <div className="btn-add">
            <button
              className="d-flex btn btn-primary mt-1 mb-1 "
              onClick={this.createNewTodo}
            >
              Add
            </button>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Descrption</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows()}</tbody>
        </table>
      </div>
    );
  }
}
