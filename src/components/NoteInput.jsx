import autoBind from "auto-bind";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
import useInput from "../hooks/useInput";
import { LocaleContext } from "../contexts/LocaleContext";
import toast, { Toaster } from "react-hot-toast";

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
  const { value: locale } = useContext(LocaleContext);

  const addNoteEventHandler = () => {
    if (!title || !body) {
      return toast.error("Title or body cannot be empty");
    }
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
          placeholder={
            locale === "Indonesia" ? "Catatan rahasia" : "Secret Note"
          }
          value={title}
          onChange={handleTitleChange}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder={
            locale === "Indonesia"
              ? "Sebenarnya saya adalah ...."
              : "It's actually me..."
          }
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
