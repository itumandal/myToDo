import React, {  useState } from "react";
import PropTypes from "prop-types";

const NewTodoForm = ({ addTodo }) => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = newItem.trim();
    if (!value) return;
    addTodo(newItem);
    setNewItem("");
  };

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
export default React.memo(NewTodoForm);
