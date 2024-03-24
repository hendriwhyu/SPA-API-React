import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";
import { FaCheck } from "react-icons/fa6";
import NoteInput from "../components/NoteInput";


function CreatePage() {
  const navigate = useNavigate();

  const onAddNoteEventHandler = (note) => {
    addNote(note);
    navigate("/");
  };

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteEventHandler}  />
    </section>
  );
}

export default CreatePage;
