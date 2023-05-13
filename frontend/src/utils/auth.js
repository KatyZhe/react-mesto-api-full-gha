const BASE_URL = "https://api.katyzhe.nomoredomains.monsters";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `${res.status} - некорректно заполнено одно из полей`
      );
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      name: `Произошла ошибка: ${
        res.status === 400
          ? `${res.status} - не передано одно из полей`
          : res.status === 401
          ? `${res.status} - пользователь с email не найден`
          : `Что-то пошло не так. Код ошибки: ${res.status}`
      }.`,
      isServerError: true,
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data.token;
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject({
        name: `Произошла ошибка: ${
          res.status === 400
            ? `${res.status} - Токен не передан или передан не в том формате`
            : res.status === 401
            ? `${res.status} - Переданный токен некорректен`
            : `Что-то пошло не так. Код ошибки: ${res.status}`
        }.`,
        isServerError: true,
      });
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};