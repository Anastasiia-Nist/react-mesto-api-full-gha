import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export function AddPlacePopup({ isOpen, onAddPlace }) {
  const app = React.useContext(AppContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({});

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonText={app.isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_card_name ${
            errors.name && "form__input_invalid"
          }`}
          id="place"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={values.name || ""}
          onChange={handleChange}
        />
        {!isValid && (
          <span className="form__input-error_active" id="avatar-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="form__section">
        <input
          className={`form__input form__input_card_img ${
            errors.link && "form__input_invalid"
          }`}
          id="place__link"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={values.link || ""}
          onChange={handleChange}
        />
        {!isValid && (
          <span className="form__input-error_active" id="avatar-error">
            {errors.link}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
