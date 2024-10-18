import { axiosInstance } from './common/axiosSetup';

const CONTROLLER_NAME = '/cards';

export const getAllCardsByUserName = async (user_name: string) => {
  return await axiosInstance().then((res) => res.get(`${CONTROLLER_NAME}`, { params: { user_name } }));
};

export const createCard = async (text: string, user_name: string) => {
  return await axiosInstance().then((res) => res.post(`${CONTROLLER_NAME}`, { user_name, text }));
};

export const updateCard = async (text: string, user_name: string, id: string) => {
  return await axiosInstance().then((res) => res.put(`${CONTROLLER_NAME}`, { user_name, text, id }));
};

export const deleteCard = async (id: string) => {
  return await axiosInstance().then((res) => res.delete(`${CONTROLLER_NAME}`, { params: { id } }));
};
