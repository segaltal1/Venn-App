import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.7:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export  { api  }