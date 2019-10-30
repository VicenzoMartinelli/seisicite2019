import axios from "axios";
import * as auth from './auth';

const api = axios.create({
  baseURL: 'https://api-seisicite.herokuapp.com/',
  //baseURL: 'http://192.168.0.103:45455/'
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

export const findReportArticles = async (event, modality, apresentationType) => {
  const params = new URLSearchParams();
  if(apresentationType)
  {
    params.append('apresentationType', apresentationType);
  }
  console.log(apresentationType)
  return await api.get(`/articles/articles-report/${event}/${modality}`, {
    params: params
  });
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

export const changeEvent = async (id, evento) => {
  try {
    const res = await api.put(`/evaluator/update-event`, {
      userId: id,
      event: evento
    });

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