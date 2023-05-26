import { useState } from "react";
import PropTypes from "prop-types";

export const NewTodoForm = ({ addTodo }) => {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const value = newItem.trim();
    if (!value) return;
    addTodo(newItem);
    // console.log("todos", todos);
    setNewItem("");
  }
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          id="item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
};

NewTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
