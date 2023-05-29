import { useState } from "react";
import PropTypes from "prop-types";

export const ModalEdit = ({ hidePopup, handleEdit, defaultTitle }) => {
  const [newTitle, setNewTitle] = useState(defaultTitle || "");

  const handleAdd = () => {
    if (!newTitle.trim()) {
      hidePopup();
      return;
    }
    handleEdit(newTitle);
    hidePopup();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <textarea
          cols="30"
          rows="10"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></textarea>
        <span onClick={hidePopup}>&#10006;</span>
        <button className="btn" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

ModalEdit.propTypes = {
  hidePopup: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  defaultTitle: PropTypes.string.isRequired,
};
