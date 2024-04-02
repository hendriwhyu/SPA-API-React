import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import RegisterForm from "../components/RegisterForm";
import { LocaleContext } from "../contexts/LocaleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const { value: locale } = useContext(LocaleContext);
  const { value: theme } = useContext(ThemeContext);

  const registerHandler = async (user) => {
    const { error, message } = await register(user);
    const requiredFields = ["name", "email", "password"];
    let messageError = "";
    const toastStyle =
      theme === "light" ? {} : { background: "#333", color: "#fff" };

    if (message === "Email already use") {
      messageError =
        locale === "Indonesia" ? "Email telah terdaftar disistem" : message;
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
      navigate("/");
    } else {
      toast.error(messageError, {
        position: "top-center",
        style: toastStyle,
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
          Sudah punya akun? <Link to="/">Login disini.</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/">Login here.</Link>
        </p>
      )}
    </section>
  );
}

export default RegisterPage;
