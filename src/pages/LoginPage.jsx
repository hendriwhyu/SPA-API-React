import React, { useContext } from "react";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../contexts/UserContext";
import toast from "react-hot-toast";
import { LocaleContext } from "../contexts/LocaleContext";
function LoginPage({ loginSuccess }) {
  const { value: locale } = useContext(LocaleContext);

  const onLogin = async ({ email, password }) => {
    const { error, data, message } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    } else {
      toast.error(message, {
        position: "top-center",
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
