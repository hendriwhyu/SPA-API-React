import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navigation({ authUser }) {
  return (
    <nav className="navigation">
      <ul>
        {authUser && (
          <li>
            <Link to={"/archives"}>Arsip</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.object,
};

export default Navigation;
