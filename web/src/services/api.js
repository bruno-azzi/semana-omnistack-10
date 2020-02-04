import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tranquil-spire-21196.herokuapp.com'
});

export default api;