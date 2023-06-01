import { TodoItem } from "./TodoItem";
import PropTypes from "prop-types";
import React from "react";

const TodoList = ({
  todos,
  toggleTodo,
  deleteTodo,
  handleEditTodo,
  showFilterData,
  filterData,
}) => {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {(showFilterData ? filterData : todos).map((todo) => {
        return (
          <TodoItem
            id={todo.id}
            completed={todo.completed}
            title={todo.title}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            handleEditTodo={handleEditTodo}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.string,
    completed: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  showFilterData: PropTypes.bool.isRequired,
  filterData: PropTypes.shape([
    {
      id: PropTypes.string,
      completed: PropTypes.string,
      title: PropTypes.string,
    },
  ]).isRequired,
};

export default React.memo(TodoList);
