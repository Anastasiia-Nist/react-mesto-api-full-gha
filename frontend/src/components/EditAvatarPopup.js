import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const app = React.useContext(AppContext);
  const { values, handleChange, errors, isValid,resetForm } = useFormAndValidation({});

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.link,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={app.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_avatar_link ${
            errors.link && "form__input_invalid"
          }`}
          id="avatar"
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
