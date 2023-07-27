import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";

export function ConfirmationPopup({ card, isOpen, onDelete }) {
  const { isLoading, closeAllPopups } = React.useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);
  function hendleDeleteCard(evt) {
    evt.preventDefault();
    onDelete(card);
  }
  return (
    <PopupWithForm
      name="trash"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onSubmit={hendleDeleteCard}
    />
  );
}
