import autoBind from "auto-bind";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
import useInput from "../hooks/useInput";

function NoteInputAction(props) {
  const { AddNote } = props;
  return (
    <div className="add-new-page__action">
      <button
        className="action"
        type="button"
        title="Simpan"
        onClick={() => {
          AddNote();
        }}
      >
        <FaCheck />
      </button>
    </div>
  );
}

NoteInputAction.propTypes = {
  AddNote: PropTypes.func.isRequired,
};

function NoteInput({ addNote }) {
  const [title, handleTitleChange] = useInput("");
  const [body, setBody] = useState(null);

  const addNoteEventHandler = () => {
    addNote({ title, body });
  };

  const handleBodyChange = (event) => {
    setBody(event.target.innerHTML);
  };
  return (
    <>
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Catatan rahasia"
          value={title}
          onChange={handleTitleChange}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder="Sebenarnya saya adalah ...."
          onInput={handleBodyChange}
        ></div>
      </div>
      <NoteInputAction AddNote={addNoteEventHandler} />
    </>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
