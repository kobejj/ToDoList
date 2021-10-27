import React, { useMemo, useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);
  function remainingCalculation() {
    // console.log("calculating remaining todos. this is slow");

    // for (let index = 0; index < 2000000000; index++) {}
    return todos.filter((todo) => !todo.isComplete).length;
  }
  const remaining = useMemo(remainingCalculation, [todos]);
  return <div>{remaining} items remaining</div>;
}

export default TodoItemsRemaining;
