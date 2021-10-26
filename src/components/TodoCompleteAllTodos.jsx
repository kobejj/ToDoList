import React from "react";
import PropTypes from "prop-types";

TodoCompleteAllTodos.prototype = {
  completeAllTodos: PropTypes.func.isRrequired,
};

function TodoCompleteAllTodos(props) {
  return (
    <div>
      <button onClick={props.completeAllTodos}>Check All</button>
    </div>
  );
}

export default TodoCompleteAllTodos;
