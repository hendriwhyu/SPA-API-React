import { useEffect } from "react";
import toast from "react-hot-toast";

const useThemeToast = (changeTheme, changeLocale, theme, locale) => {
  const onChangeTheme = () => {
    changeTheme();
    const titleLang = locale === "Indonesia" ? "Ubah ke " : "Change to ";
    const toastTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", toastTheme);
    const toastStyle =
      theme === "light" ? { background: "#333", color: "#fff" } : {};

    toast.success(`${titleLang} ${toastTheme}`, {
      duration: 3000,
      position: "top-center",
      icon: "👏",
      style: toastStyle,
    });
  };

  const onChangeLocale = () => {
    changeLocale();
    const languange = locale === "Indonesia" ? "English" : "Indonesia";
    localStorage.setItem("lang", languange);
    const titleLang =
      locale === "Indonesia" ? "Change to English" : "Ubah ke Indonesia";
    const toastStyle =
      theme === "light" ? {} : { background: "#333", color: "#fff" };

    toast.success(`${titleLang}`, {
      duration: 3000,
      position: "top-center",
      icon: "👏",
      style: toastStyle,
    });
  };

  return { onChangeTheme, onChangeLocale };
};

export default useThemeToast;
