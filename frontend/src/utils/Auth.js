const BASE_URL = "http://api.mesto-by-anastasiia.nomoredomains.sbs";
const BASE_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then((res) =>
    checkResult(res)
  );
}

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то сломалось. Ошибка: ${res.status}`);
}

export const register = ({ email, password }) => {
  return request(`signup`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  });
};

export const authorize = (email, password) => {
  return request(`signin`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const checkToken = (token) => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
