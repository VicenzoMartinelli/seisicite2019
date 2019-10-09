import decode from "jwt-decode";
import api from "./api";
import AsyncStorage from '@react-native-community/async-storage';

export const login = async (email, password) => {
  try {
    const res = await api.post(`/auth/login`, {
      email,
      password
    });

    await setToken(res.data.accessToken);
    await AsyncStorage.setItem("ssc_user", JSON.stringify(res.data));

    return Promise.resolve(res);
  } catch (error) {
    console.log(error)
    return Promise.resolve({ 
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export async function loggedIn() {
  const token = await getToken();
  console.log(token && !isTokenExpired(token))
  return token && !isTokenExpired(token);
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

export async function setToken(idToken) {
  await AsyncStorage.setItem("ssc_jwt_tkn", idToken);
}

export async function getToken() {
  return AsyncStorage.getItem("ssc_jwt_tkn");
}


export async function logout() {
  var res = await AsyncStorage.multiGet(["ssc_jwt_tkn", "ssc_user"])
  console.log(res);

  await AsyncStorage.multiRemove(["ssc_user", "ssc_jwt_tkn"]);

}

export const getConfirm = () => {
  const confirm = decode(getToken());

  return confirm;
}

export const getUser = async () => {
  return JSON.parse(await AsyncStorage.getItem("ssc_user"));
}

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
