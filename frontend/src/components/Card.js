import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onConfirmationDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${isLiked && "card__button-like_active"}`;
  const cardDeleteButtonClassName = `card__button-trash ${isOwn && "card__button-trash_active"}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleTrashClick() {
    onConfirmationDelete(card);
  }
  return (
    <article className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Кнопка лайка карточки"
          ></button>
          <p className="card__button-like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          onClick={handleTrashClick}
          aria-label="Кнопка удаления карточки"
        />
      )}
    </article>
  );
}
export default Card;
