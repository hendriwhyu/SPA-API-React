import React from "react";
import { showFormattedDate } from "../utils";

function DetailNote(props) {
  const { title, createdAt, body } = props;
  return (
    <article>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
    </article>
  );
}

export default DetailNote;
