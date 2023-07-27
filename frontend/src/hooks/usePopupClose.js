import React from "react";
// кастомный хук
export function usePopupClose(isOpen, closePopup) {
  React.useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closePopup();
      }
    }
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup();
      }
      if (evt.target.classList.contains("popup__button-close")) {
        closePopup();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);
    // оптимизация: удаление слушателя
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [isOpen, closePopup]);
}
