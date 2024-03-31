import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import {
  MdGTranslate,
  MdLightMode,
  MdLogout,
  MdOutlineDarkMode,
} from "react-icons/md";
import { ThemeContext } from "../contexts/ThemeContext";
import { LocaleContext } from "../contexts/LocaleContext";
import { UserContext } from "../contexts/UserContext";

function Header() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { changeLocale } = useContext(LocaleContext);
  const { authUser, onLogout } = useContext(UserContext);
  return (
    <header>
      <h1>
        <Link to={"/"}>Aplikasi Catatan</Link>
      </h1>
      <Navigation authUser={authUser} />
      <button className="toggle-locale" onClick={changeLocale}>
        <MdGTranslate />
      </button>
      <button className="toggle-theme" onClick={changeTheme}>
        {theme === "light" ? <MdOutlineDarkMode /> : <MdLightMode />}
      </button>
      <button className="button-logout" onClick={onLogout}>
        <MdLogout />
        {authUser?.name}
      </button>
    </header>
  );
}

export default Header;
