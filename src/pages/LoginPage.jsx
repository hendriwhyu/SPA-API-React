import React, { useContext } from "react";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import toast from "react-hot-toast";
import { LocaleContext } from "../contexts/LocaleContext";
import { ThemeContext } from "../contexts/ThemeContext";

function LoginPage({ loginSuccess }) {
  const { value: locale } = useContext(LocaleContext);
  const { value: theme } = useContext(ThemeContext);

  const onLogin = async (user) => {
    const { email, password } = user;
    const { error, data, message } = await login({ email, password });
    const requiredFields = ["email", "password"];
    let messageError = "";
    const toastStyle =
      theme === "light" ? {} : { background: "#333", color: "#fff" };

    if (message === '"email" is not allowed to be empty') {
      messageError =
        locale === "Indonesia"
          ? '"email" tidak terdapat dalam sistem'
          : message;
    } else if (message === "Password is wrong") {
      messageError = locale === "Indonesia" ? "Password salah" : message;
    } else {
      messageError =
        locale === "Indonesia"
          ? requiredFields
              .map((field) => (!user[field] ? field : null))
              .filter(Boolean)
              .join(", ") + " harus diisi"
          : requiredFields
              .map((field) => (!user[field] ? field : null))
              .filter(Boolean)
              .join(", ") + " must be filled";
    }

    if (!error) {
      loginSuccess(data);
    } else {
      toast.error(messageError, {
        position: "top-center",
        style: toastStyle,
      });
    }
  };
  return (
    <section className="login-page">
      <h2>
        {locale === "Indonesia"
          ? "Yuk, login untuk menggunakan aplikasi."
          : "Come on, log in to use the application."}
      </h2>
      <LoginForm login={onLogin} />
      {locale === "Indonesia" ? (
        <p>
          Belum punya akun? <Link to="/register"> Daftar di sini.</Link>
        </p>
      ) : (
        <p>
          Don't have an account? <Link to="/register"> Register here.</Link>
        </p>
      )}
    </section>
  );
}
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
