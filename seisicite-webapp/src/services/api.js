import axios from "axios";
import * as auth from './auth';

const api = axios.create({
  baseURL: "http://172.30.4.162:45455"
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

export const sortArticles = async (event) => {
  try {
    const res = await api.put(`/articles/sort/${event}`);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export const findEvaluatorsToApprove = async () => {
  return await api.get(`/evaluator/to-approve`);
}

export const findApprovedEvaluators = async () => {
  return await api.get(`/evaluator/approveds`);
}

export const findReportArticles = async (event, modality) => {
  return await api.get(`/articles/articles-report/${event}/${modality}`);
}

export const approve = async (ids) => {
  try {
    const res = await api.put(`/evaluator/approve`, ids);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export const cancelEvaluators = async (ids) => {
  try {
    const res = await api.put(`/evaluator/cancel`, ids);

    return Promise.resolve(res);
  } catch (error) {
    return Promise.resolve({
      success: false,
      msg: error.response.data.occurrences ? error.response.data.occurrences[0].message : error.response.data
    });
  }
};

export default api;