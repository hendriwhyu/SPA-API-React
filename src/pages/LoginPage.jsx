import React, { useContext } from "react";
import PropTypes from "prop-types";
import { login } from "../utils/api";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { UserContext } from "../contexts/UserContext";
function LoginPage({ loginSuccess }) {
  const { setAuthUser } = useContext(UserContext);
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    //   setAuthUser(data);
    }
  };

  return (
    <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <LoginForm login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
