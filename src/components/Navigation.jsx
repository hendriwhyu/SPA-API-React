import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
import { LocaleContext } from "../contexts/LocaleContext";

function Navigation() {
  const { authUser } = useContext(UserContext);
  const { locale } = useContext(LocaleContext);
  return (
    <nav className="navigation">
      <ul>
        {authUser && (
          <li>
            <Link to={"/archives"}>
              {locale === "id" ? "Arsip" : "Archive"}
            </Link>
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
