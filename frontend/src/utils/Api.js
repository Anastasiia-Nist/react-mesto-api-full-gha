// API
const dataApi = {
  baseUrl: "https://nomoreparties.co/v1/cohort-64/",
  headers: {
      authorization: "3bc753b1-d1b4-4fd5-b226-ffa03d509b4a",
      "Content-Type": "application/json",
    },
};

export class Api {
  constructor(dataApi) {
    this._baseUrl = dataApi.baseUrl;
    this._headers = dataApi.headers;
  }
  //
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResult
    );
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то сломалось. Ошибка: ${res.status}`);
  }

  //загружаем информацию о юзере с сервера
  getUserInfo() {
    return this._request(`users/me/`, { headers: this._headers });
  }
  //загружаем карточки с сервера
  getInitialCards() {
    return this._request(`cards/`, { headers: this._headers });
  }
  // отправляем данные юзера на сервер
  patchUserInfo(data) {
    return this._request(`users/me/`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  // отправляем данные карточки на сервер
  postNewCard(data) {
    return this._request(`cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  //удалени карточки
  deleteCard(cardId) {
    return this._request(`cards/${cardId}/`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  // лайк и дизлайк
  likeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  // добавление аватара
  patchUserAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this._request(`/cards/${_id}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    } else {
      return this._request(`/cards/${_id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  }
}

const api = new Api(dataApi);
export default api;
