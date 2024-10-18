import axios from 'axios';

export const axiosInstance = async () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });
};
