import React, { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import DetailPageWrapper from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import { getUserLogged, putAccessToken } from "./utils/api";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import useTheme from "./hooks/useTheme";
import { UserContext } from "./contexts/UserContext";
import { LocaleContext } from "./contexts/LocaleContext";
import { ThemeContext } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import { Toaster } from "react-hot-toast";

const LANG_SYSTEM = ["Indonesia", "English"];
const THEME_SYSTEM = ["light", "dark"];

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const initialTheme = localStorage.getItem("theme") || THEME_SYSTEM[0];
  const initialLang = localStorage.getItem("lang") || LANG_SYSTEM[0];

  const localeValue = useTheme(LANG_SYSTEM, initialLang);
  const themeValue = useTheme(THEME_SYSTEM, initialTheme);

  const getAuthUser = async () => {
    const { error, data } = await getUserLogged();
    if (!error) {
      setAuthUser(data);
    } else {
      setAuthUser(null);
    }
    setInitializing(false);
  };

  const onLoginSuccess = ({ accessToken }) => {
    putAccessToken(accessToken);
    getAuthUser();
  };

  const onLogout = () => {
    setAuthUser(null);
    setInitializing(false);
    putAccessToken("");
  };

  const userValue = useMemo(() => {
    return {
      authUser,
      setAuthUser,
      onLogout,
    };
  }, [authUser]);

  useEffect(() => {
    getAuthUser();
    document.documentElement.setAttribute("data-theme", themeValue.value);
    document.documentElement.setAttribute("lang", localeValue.value);

    return () => {
      setAuthUser(null);
      setInitializing(true);
    };
  }, [themeValue.value]);

  if (initializing) {
    return null;
  }
  if (authUser === null) {
    return (
      <UserContext.Provider value={userValue}>
        <LocaleContext.Provider value={localeValue}>
          <ThemeContext.Provider value={themeValue}>
            <div className="app-container">
              <Header />
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
              <Toaster position="top-right" reverseOrder={false} />
              <Footer />
            </div>
          </ThemeContext.Provider>
        </LocaleContext.Provider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={userValue}>
      <LocaleContext.Provider value={localeValue}>
        <ThemeContext.Provider value={themeValue}>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/new" element={<CreatePage />} />
                <Route path="/notes/:id" element={<DetailPageWrapper />} />
                <Route path="/archives" element={<ArchivePage />} />
              </Routes>
            </main>
            <Toaster position="top-center" reverseOrder={false} />
            <Footer />
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
