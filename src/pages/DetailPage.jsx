import React from "react";
import { useParams } from "react-router-dom";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";
import autoBind from "auto-bind";
import DetailButton from "../components/DetailButton";
import { FaTrash } from "react-icons/fa6";
import { IoMdArchive } from "react-icons/io";
import { MdUnarchive } from "react-icons/md";
import DetailNote from "../components/DetailNote";
import PropTypes from "prop-types";

function DetailPageWrapper() {
  const { id } = useParams();

  return <DetailPage id={id} />;
}

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

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: getNote(props.id),
    };
    autoBind(this);
  }

  onDeleteNoteEventHandler(id) {
    deleteNote(id);
  }
  onArchiveNoteEventHandler(id) {
    archiveNote(id);
  }
  onUnArchiveNoteEventHandler(id) {
    unarchiveNote(id);
  }

  render() {
    if (!this.state.note) {
      return <p>Note is not found!</p>;
    }
    return (
      <section className="detail-page">
        <DetailNote
          title={this.state.note.title}
          createdAt={this.state.note.createdAt}
          body={this.state.note.body}
        />
        <DetailPageAction
          id={this.state.note.id}
          onDelete={this.onDeleteNoteEventHandler}
          onUnarchive={this.onUnArchiveNoteEventHandler}
          onArchive={this.onArchiveNoteEventHandler}
          isArchived={this.state.note.archived}
        />
      </section>
    );
  }
}

export default DetailPageWrapper;
