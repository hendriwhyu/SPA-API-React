import React from "react";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import parser from "html-react-parser";

function DetailNote(props) {
  const { title, createdAt, body } = props;
  return (
    <article>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
    </article>
  );
}

DetailNote.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default DetailNote;
