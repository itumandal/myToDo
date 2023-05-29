import PropTypes from "prop-types";

export const TodoItem = ({
  id,
  completed,
  title,
  toggleTodo,
  deleteTodo,
  handleEditTodo,
}) => {
  const modifiedTitle = (title) => {
    let res = "";
    if (title.length > 20) {
      res = title.slice(0, 20) + "...";
    } else {
      res = title;
    }
    return res;
  };
  return (
    <li>
      <label className="label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {modifiedTitle(title)}
        {title.length > 20 && <span className="tool-tip">{title}</span>}
      </label>
      <button
        className="btn btn-edit"
        disabled={completed}
        onClick={() => handleEditTodo(id)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        disabled={!completed}
        onClick={() => deleteTodo({ id, completed })}
      >
        Delete
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
