import React, { useContext, useEffect } from "react";
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
import toast from "react-hot-toast";
import useThemeToast from "../hooks/useThemeToast";

function Header() {
  const { value: theme, handleChange: changeTheme } = useContext(ThemeContext);
  const { value: locale, handleChange: changeLocale } =
    useContext(LocaleContext);
  const { authUser, onLogout } = useContext(UserContext);
  const { onChangeTheme, onChangeLocale } = useThemeToast(
    changeTheme,
    changeLocale,
    theme,
    locale
  );
  return (
    <header>
      <h1>
        <Link to={"/"}>
          {locale === "Indonesia" ? "Aplikasi Catatan" : "Notes App"}
        </Link>
      </h1>
      <Navigation />
      <button className="toggle-locale" onClick={onChangeLocale}>
        <MdGTranslate />
      </button>
      <button className="toggle-theme" onClick={onChangeTheme}>
        {theme === "light" ? <MdOutlineDarkMode /> : <MdLightMode />}
      </button>

      {authUser != null ? (
        <button className="button-logout" onClick={onLogout}>
          <MdLogout />
          {authUser?.name}
        </button>
      ) : null}
    </header>
  );
}

export default Header;
