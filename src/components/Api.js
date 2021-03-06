export default class Api{
  constructor({url, auth}) {
    this._url = url;
    this._auth = auth;
  }

  _handleResponse(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText)
    }
  }
  
  _handleError(err){
    return Promise.reject(err.message)
  }
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
  
  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
    })
    .then(this._handleResponse)
    .catch(this._handleError);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
    })
    .then(this._handleResponse);
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
    })
    .then(this._handleResponse);
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
    })
    .then(this._handleResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }

  editAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }
}

