// API
const dataApi = {
  baseUrl: "https://api.mesto-by-anastasiia.nomoredomains.sbs",
  headers: {
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
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(
      this._checkResult
    );
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то сломалось. Ошибка: ${res.status}`);
  }
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  //загружаем информацию о юзере с сервера
  getUserInfo() {
    return this._request(`users/me/`, { headers: this._getHeaders() });
  }
  //загружаем карточки с сервера
  getInitialCards() {
    return this._request(`cards/`, { headers: this._getHeaders() });
  }
  // отправляем данные юзера на сервер
  patchUserInfo(data) {
    return this._request(`users/me/`, {
      method: "PATCH",
      headers: this._getHeaders(),

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
      headers: this._getHeaders(),
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
      headers: this._getHeaders(),
    });
  }
  // лайк и дизлайк
  likeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    });
  }

  dislikeCard(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }
  // добавление аватара
  patchUserAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this._request(`cards/${_id}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
      });
    } else {
      return this._request(`cards/${_id}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
      });
    }
  }
}

const api = new Api(dataApi);
export default api;
