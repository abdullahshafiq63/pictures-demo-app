import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'https://picsum.photos/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// singleton instance
export default axiosService;
