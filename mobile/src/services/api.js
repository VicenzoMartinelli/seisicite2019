import axios from 'axios';
import * as auth from './auth';

const api = axios.create({
  baseURL: 'https://api-seisicite.herokuapp.com',
  //baseURL: 'http://192.168.0.103:45455/'
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

export const evaluateArticle = async (evaluationData) => {
  const { personId } = await auth.getUser();

  try {
    const res = await api.put(`/articles/${evaluationData.id}/evaluate`, { ...evaluationData, evaluatorId: personId });

    return Promise.resolve(res);
  } catch (error) {
    console.log(error)
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

export const findArticlesEvaluate = async (event, type) => {
  const { personId } = await auth.getUser();

  return await api.get(`articles/articles-evaluate/${event}/${personId}/${type}`);
}

export const canEvaluateArticle = async (articleId) => {
  const { personId } = await auth.getUser();

  const params = new URLSearchParams();
  params.append('evaluatorId', personId);

  return await api.get(`articles/${articleId}/can-evaluate`, {
    params
  });
}

export const resetPassword = async (email) => {
  try {
    const res = await api.post(`/auth/reset-password/${email}`);

    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve({
      success: false
    });
  }
};

export default api;