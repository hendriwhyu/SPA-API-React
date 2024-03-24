import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList(props) {
  const { notes } = props;
  return (
    <section className="notes-list">
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            id={note.id}
            createdAt={note.createdAt}
            title={note.title}
            body={note.body}
          />
        );
      })}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
