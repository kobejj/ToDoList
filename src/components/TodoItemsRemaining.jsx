import React from "react";
import PropTypes from "prop-types";

TodoItemsRemaining.prototype = {
  remaining: PropTypes.number.isRrequired,
};

function TodoItemsRemaining(props) {
  return <div>{props.remaining} items remaining</div>;
}

export default TodoItemsRemaining;
