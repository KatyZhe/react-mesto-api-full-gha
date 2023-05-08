import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    onLogin(formValue);
  };

  return (
    <>
      <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Вход</h1>

        <input
          id="email"
          name="email"
          className="login__input"
          type="email"
          required
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          className="login__input"
          type="password"
          required
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <button className="login__button">Войти</button>
      </form>
      </div>
    </>
  );
};

export default Login;
