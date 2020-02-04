import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-map-api.herokuapp.com/'
});

export default api;