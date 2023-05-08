import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header({ userEmail, loggedIn, onSignOut }) {

  return (
    <>
      <header className="header">
        <img src={headerLogo} className="header__logo" alt="Место" />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__button" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__button" to="/sign-up">
                Регистрация
              </Link>
            }
          />
        </Routes>
        {loggedIn && (
          <nav className="header__nav">
            <span>{userEmail}</span>
            <button className="header__sign-out" onClick={() => onSignOut()}>
              Выйти
            </button>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
