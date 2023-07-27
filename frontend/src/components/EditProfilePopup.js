import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { AppContext } from "../context/AppContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const app = React.useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation({});

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={app.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_type_name ${
            errors.name && "form__input_invalid"
          }`}
          id="name"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
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
          className={`form__input form__input_type_career ${
            errors.about && "form__input_invalid"
          }`}
          id="about"
          type="text"
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={values.about || ""}
          onChange={handleChange}
        />
        {!isValid && (
          <span className="form__input-error_active" id="avatar-error">
            {errors.about}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
