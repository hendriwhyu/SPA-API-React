import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginForm({ login }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-input">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button>Masuk</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
