
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface Response {
    data: any,
    meta: {
        status: number,
        message: string
    },
    hasError: boolean
}

const API_BASE_URL = 'https://proyectoindustria-be.onrender.com';
//const API_BASE_URL = 'http://192.168.0.5:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: () => true
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    if(response.status === 401){
      await AsyncStorage.removeItem("authToken");
    }

    return Promise.resolve(response);
  }
);

export default api;