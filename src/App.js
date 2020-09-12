import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoBanner from "./components/TodoBanner";
import TodoCreator from "./components/TodoCreator";
import TodoRow from "./components/TodoRow";

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
      showCompleted: false
    };
  }
  updateNewTextValue = (e) => {
    this.setState({
      newItemText: e.target.value
    });
  };
  createNewTodo = (task) => {
    if (!this.state.todoItems.find((item) => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }]
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  };
  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    });
  todoTableRows = (doneValue) =>
    this.state.todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data !== null
        ? JSON.parse(data)
        : {
            username: "Veeru",
            todoItems: [
              { action: "Buy Flowers", done: false },
              { action: "Get Store", done: false },
              { action: "Collect tickets", done: false },
              { action: "Go to Pub", done: false }
            ],
            showCompleted: false
          }
    );
  };
  doneCheck = (checked) => this.setState({ showCompleted: checked });
  render() {
    const { todoItems, username } = this.state;
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
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <input
            type="checkbox"
            isChecked={this.state.showCompleted}
            onClick={(e) => this.doneCheck(e.target.checked)}
          />
          <label>Show Completed Taks</label>
        </div>
        {this.state.showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descrption</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    );
  }
}
