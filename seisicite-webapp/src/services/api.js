import axios from "axios";
import * as auth from './auth';

const api = axios.create({
  baseURL: "http://localhost:5000"
});

api.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = "Bearer " + auth.getToken();

    return reqConfig;
  },
  err => Promise.reject(err),
);

export default api;

export const findArticles = async (event, page) => {
  const params = new URLSearchParams();

  params.append('page', page);

  return await api.get(`articles/${event}`, params);
}

export const findAvaliadores = async (event) => {
  return await api.get(`articles/avaliadores/${event}`);
} 