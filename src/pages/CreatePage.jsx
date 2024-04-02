import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import NoteInput from "../components/NoteInput";
import toast from "react-hot-toast";
import { LocaleContext } from "../contexts/LocaleContext";
import { ThemeContext } from "../contexts/ThemeContext";

function CreatePage() {
  const navigate = useNavigate();
  const { value: locale } = useContext(LocaleContext);
  const { value: theme } = useContext(ThemeContext);

  const onAddNoteEventHandler = async (note) => {
    await addNote(note);
    const message =
      locale === "Indonesia"
        ? "Catatan berhasil ditambahkan"
        : "Note added successfully";
    const toastStyle =
      theme === "light" ? {} : { background: "#333", color: "#fff" };

    toast.success(message, {
      position: "top-center",
      style: toastStyle,
    });

    navigate("/");
  };

  return (
    <section className="add-new-page">
      <NoteInput addNote={onAddNoteEventHandler} />
    </section>
  );
}

export default CreatePage;
