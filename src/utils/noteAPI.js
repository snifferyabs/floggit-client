import axios from 'axios';

import { SERVICE_URL } from './constants';

const validateStatus = status => (response) => {
  if (response.status !== status) {
    throw new Error('Service returned a non OK status code');
  }
  return response;
};

const getAll = () => axios.get(`${SERVICE_URL}/v1/notes`)
  .then(validateStatus(200))
  .then(response => response.data);

const add = (title, noteList, color) => axios({
  method: 'POST',
  url: `${SERVICE_URL}/v1/notes`,
  data: { title, noteList, color },
})
  .then(validateStatus(201))
  .then(response => response.data.id);

const update = (id, title, noteList, color) => axios({
  method: 'PUT',
  url: `${SERVICE_URL}/v1/notes/${id}`,
  data: { title, noteList, color },
})
  .then(validateStatus(201))
  .then(response => response.data.id);

const remove = id => axios.delete(`${SERVICE_URL}/v1/notes/${id}`)
  .then(validateStatus(204));

const notes = {
  getAll, add, remove, update,
};

export default notes;
