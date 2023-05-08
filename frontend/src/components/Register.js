import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.js";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
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
    onRegister(formValue);
  };

  return (
    <>
      <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="login__input"
            id="password"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            autoComplete="password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <button className="login__button" type="submit">Зарегистрироваться</button>
        </form>
      </div>
      <Link to="/sign-in" className="login__signin-link">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
};

export default Register;
