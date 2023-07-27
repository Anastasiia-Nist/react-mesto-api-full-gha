import React, { useState } from "react";

export function Login(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(formValue);
    setFormValue({ password: "", email: "" });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form" name="auth-login">
        <input
          value={formValue.email}
          onChange={handleChange}
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
        />
        <input
          value={formValue.password}
          onChange={handleChange}
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="15"
        />
        <button
          className="auth__button-register"
          type="submit"
          aria-label="Кнопка регистрации"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
