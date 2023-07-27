import React from "react";
import pencilImg from "../images/pencil.svg";
import Card from "../components/Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import avatarDefault from "../images/avatarCat.jpg";

function Main(props) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__img">
          <img
            src={avatar || avatarDefault}
            alt="Аватарка"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
          <img
            src={pencilImg}
            alt="Редактировать аватар"
            className="profile__img-hover"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__career">{about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Кнопка добавления фотографии"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onConfirmationDelete={props.onConfirmationDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
