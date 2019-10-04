import axios from 'axios';
import * as auth from './auth';

const api = axios.create({
  // baseURL: 'https://seisicite-api.conveyor.cloud',
  baseURL: 'http://192.168.0.103:45455'
});

api.interceptors.request.use(async function (reqConfig) {
  var token = await auth.getToken();

  if (token) {
    reqConfig.headers.authorization = "Bearer " + token;
  }

  return reqConfig;
});

export const registerUser = async (user) => {
  try {
    const res = await api.post(`/auth/register-evaluator`, user);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export const findModalidades = async () => {
  return await api.get(`articles/modalities`);
}

export const findInstitutions = async () => {
  return await api.get(`articles/instituions`);
}

export default api;