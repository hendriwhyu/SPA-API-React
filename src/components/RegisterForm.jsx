import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import toast from "react-hot-toast";
import { ThemeContext } from "../contexts/ThemeContext";
import { LocaleContext } from "../contexts/LocaleContext";

function RegisterForm({ register }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");
  const { value: locale } = useContext(LocaleContext);
  const { value: theme } = useContext(ThemeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const toastStyle =
      theme === "light" ? {} : { background: "#333", color: "#fff" };
    const messageError =
      locale === "Indonesia"
        ? "Password tidak cocok"
        : "Password doesn't match";
    if (password !== confirmPassword) {
      toast.error(messageError, {
        position: "top-center",
        style: toastStyle,
      });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-input">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
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
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <button>Register</button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
