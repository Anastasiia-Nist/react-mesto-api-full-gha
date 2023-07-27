import React from "react";
import { usePopupClose } from "../hooks/usePopupClose.js";
import success from "../images/success.svg";
import error from "../images/error.svg";
import { AppContext } from "../context/AppContext";

export function InfoTooltip({ isOpen, isConfirmationStatus }) {
  const app = React.useContext(AppContext);
  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <div
      className={`popup
      ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__tooltip">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Кнопка закрытия"
        />
        <img
          className="popup__img"
          src={isConfirmationStatus ? success : error}
          alt={
            isConfirmationStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."
          }
        />

        <samp className="popup__samp">
          {isConfirmationStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </samp>
      </div>
    </div>
  );
}
