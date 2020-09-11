import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoBanner from "./components/TodoBanner";
import TodoCreator from "./components/TodoCreator";

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
  createNewTodo = (task) => {
    if (!this.state.todoItems.find((item) => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }],
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
          <div className="my-1 m-4">
            <TodoCreator callback={this.createNewTodo} />
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
