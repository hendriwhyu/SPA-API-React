import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { LocaleContext } from "../contexts/LocaleContext";

function LoginForm({ login }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { value: locale } = useContext(LocaleContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-input">
      <label htmlFor="email">{locale === "Indonesia" ? "Surel" : "Email"}</label>
      <input
        type="email"
        name="email"
        placeholder={locale === "Indonesia" ? "Surel" : "Email"}
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor="password">
        {locale === "Indonesia" ? "Kata Sandi" : "Password"}
      </label>
      <input
        type="password"
        placeholder={locale === "Indonesia" ? "Kata Sandi" : "Password"}
        value={password}
        onChange={handlePasswordChange}
      />
      <button>{locale === "Indonesia" ? "Masuk" : "Login"}</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
