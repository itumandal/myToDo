export const TodoItem = ({ id, completed, title, toggleTodo, deleteTodo }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
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
