import React from "react";
import PropTypes from "prop-types";

TodoClearCompleted.prototype = {
  clearCompleted: PropTypes.func.isRrequired,
};
function TodoClearCompleted(props) {
  return (
    <button onClick={props.clearCompleted} className="button">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
