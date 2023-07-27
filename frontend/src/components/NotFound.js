import React from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../images/404.gif";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <img
        className="notFound__img"
        src={notFound}
        alt="Страница не найдена. Ошибка 404."
      />
      <button
        className="notFound__button"
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        На главную страницу
      </button>
    </div>
  );
}
