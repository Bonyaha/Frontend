/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  let request = axios.get(baseUrl);
  return request.then((res) => res.data);
};
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

const del = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  del,
};
