import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function DetailButton(props) {
  const { id, title, icon, eventHandler } = props;
  const navigate = useNavigate();
  return (
    <button
      className="action"
      type="button"
      title={title}
      onClick={() => {
        eventHandler(id);
        navigate("/");
      }}
    >
      {icon}
    </button>
  );
}

DetailButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  eventHandler: PropTypes.func.isRequired,
};

export default DetailButton;
