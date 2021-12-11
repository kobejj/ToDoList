import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoCompleteAllTodos() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const updatedTodos = todos.map((todo) => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }
  return (
    <div>
      <button onClick={completeAllTodos}>Check All</button>
    </div>
  );
}

export default TodoCompleteAllTodos;
