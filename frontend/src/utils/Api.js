class Api {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
      headers: this._headers
      })
      .then(this._checkResponse);
    }

    createCard(data) {
      return fetch(`${this._url}/cards`, {
          headers: this._headers,
          method: 'POST',
          body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }

    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
          headers: this._headers,
          method: 'DELETE',
      })
      .then(this._checkResponse);
    }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: 'GET'
      })
      .then(this._checkResponse);
    }

    changeUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse);
    }

    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkResponse);
    }
  
    toggleCardLike(id, isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
}

const configApi = {
  url: "https://api.katyzhe.nomoredomains.monsters",
  headers: {
    authorization: '45d022b9-9c09-4bab-9547-37af2b0af73d',
    "Content-Type": "application/json",
  }
};

const api = new Api(configApi);

export default api;