import decode from "jwt-decode";
import api from "./api";

export const login = async (email, password) => {
  try {
    const res = await api.post(`/auth/login`, {
      email,
      password
    });

    setToken(res.data.accessToken);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const loggedIn = () => {
  const token = getToken();

  return !(!token && !isTokenExpired(token));
};

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export const setToken = idToken => localStorage.setItem("ssc_jwt_tkn", idToken);

export const getToken = () => localStorage.getItem("ssc_jwt_tkn");

export const logout = () => localStorage.removeItem("ssc_jwt_tkn");

export const getConfirm = () => {
  const confirm = decode(getToken());

  console.log(confirm);
  return confirm;
}

export const fetch = (url, options) => {
  const headers = {};

  if (loggedIn()) {
    headers["Authorization"] = "Bearer " + getToken();
  }

  return fetch(url, {
    headers,
    ...options
  })
    .then(_checkStatus)
    .then(response => response.json());
};

const _checkStatus = response => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) {
    // Success status lies between 200 to 300
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
