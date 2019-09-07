import axios from "axios";
import * as auth from './auth';

const api = axios.create({
  baseURL: "https://localhost:44321"
});

api.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = "Bearer " + auth.getToken();

    return reqConfig;
  },
  err => Promise.reject(err),
);

export const findArticles = async (event, page) => {
  const params = new URLSearchParams();

  params.append('page', page);

  return await api.get(`articles/${event}`, params);
}

export const findAvaliadores = async (event) => {
  return await api.get(`articles/avaliadores/${event}`);
}

export const findModalidades = async () => {
  return await api.get(`articles/modalities`);
}

export const saveArticle = async (article) => {
  try {
    const res = await api.put(`/articles`, article);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export default api;