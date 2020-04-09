import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoItem from "./components/todoitem";
import todosData from "./todosdata";

function App() {
  const [todos, setTodos] = useState(todosData);
  const todolist = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onChange={handleChange} />
  ));

  function handleChange(id) {
    const todolist = todos;

    const updatedtodos = todolist.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedtodos);
  }

  return <div className="todo-list">{todolist}</div>;
}

export default App;
