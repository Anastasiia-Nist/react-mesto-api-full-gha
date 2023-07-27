import logo from ".././images/logo.svg";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { ProtectedRouteElement } from "./ProtectedRoute.js";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";
import * as auth from "./../utils/Auth";
import { AppContext } from "../context/AppContext";
import { NotFound } from "./NotFound";
//

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setisConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    avatar: "",
    name: "",
    about: "",
    cohort: "",
  });
  // авторизация и регистрация пользователя
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [userEmail, setUserEmail] = React.useState("");
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);

  // универсальная функция для закрытия попапов, изменения текста кнопки
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => {
        const timeout = window.setTimeout(() => {
          setIsLoading(false);
          window.clearTimeout(timeout)
        }, 500)
      });
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        setIsInfoTooltip(true);
        navigate("/sign-in", { replace: true }); 
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(false);
      })
      .finally(openInfoTooltip);
  }

  function handleLogin(data) {
    auth
      .authorize(data.password, data.email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltip(false);
        openInfoTooltip();
        console.log(err);
      })
      .finally(() => setUserEmail(data.email));
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in");
  }

  function handleCheckToken() {
    // проверка если у пользователя есть токен в localStorage
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    handleCheckToken();
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisConfirmationPopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleTrashClick(card) {
    setDeletedCard(card);
    setisConfirmationPopupOpen(true);
  }
  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.patchUserAvatar(data.avatar).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  function handleUpdateUser(data) {
    function makeRequest() {
      return api.patchUserInfo(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api
        .postNewCard(data)
        .then((newCard) => setCards([newCard, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogOut={handleLogOut}
          src={logo}
          alt="Логотип Место"
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onConfirmationDelete={handleTrashClick}
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} onLogin={userEmail} />}
          />
          <Route
            path="*"
            element={ <NotFound />}
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
          card={deletedCard}
          isOpen={isConfirmationPopupOpen}
          onDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isConfirmationStatus={isInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
