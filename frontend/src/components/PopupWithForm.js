//import { useEffect } from "react";
import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import { AppContext } from "../context/AppContext";

function PopupWithForm({
  isOpen,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  const app = React.useContext(AppContext);
  usePopupClose(isOpen, app.closeAllPopups);

  React.useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [children]);
  const [isValid, setIsValid] = React.useState(false);
  const formRef = React.useRef();

  return (
    <section
      className={`popup popup-${name} 
      ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Кнопка закрытия"
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="form"
          name={`${name}Form`}
          onSubmit={onSubmit}
          ref={formRef}
        >
          {children}
          <button disabled={!isValid} className="button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
