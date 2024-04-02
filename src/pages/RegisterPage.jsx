import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterForm from "../components/RegisterForm";
import { LocaleContext } from "../contexts/LocaleContext";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const { value: locale } = useContext(LocaleContext);

  const registerHandler = async (user) => {
    const { error, message } = await register(user);
    if (!error) {
      navigate("/");
    } else {
      toast.error(message, {
        position: "top-center",
      });
    }
  };

  return (
    <section className="regsiter-page">
      <h2>
        {locale === "Indonesia"
          ? "Isi form untuk mendaftar akun."
          : "Fill in the form to register an account."}
      </h2>
      <RegisterForm register={registerHandler} />
      {locale === "Indonesia" ? (
        <p>
          Sudah punya akun? <Link to={"/"}>Login disini.</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/register">Login here.</Link>
        </p>
      )}
    </section>
  );
}

export default RegisterPage;
