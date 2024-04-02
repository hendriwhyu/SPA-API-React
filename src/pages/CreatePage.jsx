import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import { FaCheck } from "react-icons/fa6";
import NoteInput from "../components/NoteInput";
import toast from "react-hot-toast";

function CreatePage() {
  const navigate = useNavigate();

  const onAddNoteEventHandler = async (note) => {
    await addNote(note);
    toast.success("Note added successfully");
    navigate("/");
  };

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteEventHandler} />
    </section>
  );
}

export default CreatePage;
