
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getFoods = () => axios.get(`${API_URL}/foods`);
export const addFood = (food) => axios.post(`${API_URL}/foods`, food);
export const updateFood = (id, food) => axios.put(`${API_URL}/foods/${id}`, food);
export const deleteFood = (id) => axios.delete(`${API_URL}/foods/${id}`);
