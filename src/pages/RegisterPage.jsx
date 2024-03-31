import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  const navigate = useNavigate();
  const registerHandler = async (user) => {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  };
  return (
    <section className="regsiter-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <RegisterForm register={registerHandler} />
      <p>
    Sudah punya akun? <Link to={"/login"}>Login Page</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
