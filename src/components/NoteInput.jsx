import autoBind from "auto-bind";
import React from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";

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

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
    autoBind(this);
  }

  handleTitleChange(e) {
    this.setState(() => {
      return {
        title: e.target.value,
      };
    });
  }

  onInputBodyHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onAddNoteEventHandler() {
    this.props.addNote(this.state);
  }

  render() {
    return (
      <>
        <div className="add-new-page__input">
          <input
            className="add-new-page__input__title"
            placeholder="Catatan rahasia"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder="Sebenarnya saya adalah ...."
            onInput={this.onInputBodyHandler}
          ></div>
        </div>
        <NoteInputAction AddNote={this.onAddNoteEventHandler} />
      </>
    );
  }
}

export default NoteInput;
