import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({ src, alt, userEmail, onLogOut }) {
  const navMobile = React.useRef();
  const btnBurger = React.useRef();

  function toggleClick() {
    navMobile.current.classList.toggle("active");
    btnBurger.current.classList.toggle("active")
  }
  React.useEffect(() => {
    navMobile.current.classList.remove("active");
  }, [onLogOut]);
  return (
    <>
      <nav ref={navMobile} className="header__nav-mobile">
        <span className="header__email">{userEmail}</span>
        <button
          className="header__button_type_logout"
          type="button"
          onClick={onLogOut}
        >
          Выйти
        </button>
      </nav>
      <header className="header">
        <img className="header__logo" src={src} alt={alt} />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <nav className="header__nav-desktop">
                  <span className="header__email">{userEmail}</span>
                  <button
                    className="header__button_type_logout"
                    type="button"
                    onClick={onLogOut}
                  >
                    Выйти
                  </button>
                </nav>
                <button
                  ref={btnBurger}
                  onClick={toggleClick}
                  className="header__button_type_burger"
                  type="button"
                >
                  <span className="header__span"></span> 
                </button>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}
export default Header;
