import React, { useContext } from "react";

import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAllTodos from "./TodoCompleteAllTodos";
import TodoFilters from "./TodoFilters";
import useToggle from "../hooks/useToggle";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {
  const [isFeaturesOneVisible, setIsFeaturesOneVisible] = useToggle();
  const [isFeaturesTwoVisible, setIsFeaturesTwoVisible] = useToggle(false);
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);

  function deleteTodo(id) {
    //console.log("deleting todo id " + id);
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    //console.log(event.target.value);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map((todo, index) => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="slide-horizontal"
          >
            <li className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />

                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={(event) => updateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        updateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        cancelEdit(event, todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggles-container">
        <button onClick={setIsFeaturesOneVisible} className="button">
          Features One Toggle
        </button>
        <button onClick={setIsFeaturesTwoVisible} className="button">
          Features Two Toggle
        </button>
      </div>

      <CSSTransition
        in={isFeaturesOneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAllTodos />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isFeaturesTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default TodoList;
