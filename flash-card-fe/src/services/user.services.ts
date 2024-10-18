import { axiosInstance } from './common/axiosSetup';

const CONTROLLER_NAME = '/users';

export const login = async (data) => {
  return await axiosInstance().then((res) => res.post(`${CONTROLLER_NAME}/login`, data));
};

export const register = async (data) => {
  return await axiosInstance().then((res) => res.post(`${CONTROLLER_NAME}`, data));
};
