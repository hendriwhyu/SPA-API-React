import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import autoBind from "auto-bind";
import DetailButton from "../components/DetailButton";
import { FaTrash } from "react-icons/fa6";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import DetailNote from "../components/DetailNote";
import PropTypes from "prop-types";
import PageNotFound from "./PageNotFound";

function DetailPageAction(props) {
  const { id, isArchived, onDelete, onArchive, onUnarchive } = props;
  return (
    <div className="detail-page__action">
      {isArchived ? (
        <DetailButton
          title="Pindahkan"
          id={id}
          eventHandler={onUnarchive}
          icon={<MdUnarchive />}
        />
      ) : (
        <DetailButton
          title="Archive"
          id={id}
          eventHandler={onArchive}
          icon={<IoMdArchive />}
        />
      )}

      <DetailButton
        title="Delete"
        id={id}
        eventHandler={onDelete}
        icon={<FaTrash />}
      />
    </div>
  );
}

DetailPageAction.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.element,
  eventHandler: PropTypes.func,
};

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState();

  const getDetailNote = async () => {
    const { data } = await getNote(id);
    setNote(data);
  };

  const deleteNoteHandler = async (id) => {
    await deleteNote(id);
  };

  const archiveNoteHandler = async (id) => {
    await archiveNote(id);
  };

  const unarchiveNoteHandler = async (id) => {
    await unarchiveNote(id);
  };

  useEffect(() => {
    getDetailNote();
  }, [note]);

  if (!note) {
    return <PageNotFound />;
  }
  return (
    <section className="detail-page">
      <DetailNote
        title={note.title}
        createdAt={note.createdAt}
        body={note.body}
      />
      <DetailPageAction
        id={note.id}
        onDelete={deleteNoteHandler}
        onUnarchive={unarchiveNoteHandler}
        onArchive={archiveNoteHandler}
        isArchived={note.archived}
      />
    </section>
  );
}

export default DetailPage;
