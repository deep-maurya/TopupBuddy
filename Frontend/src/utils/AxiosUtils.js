import axios from 'axios';

import Cookies from 'js-cookie';
//const BASE_URL = 'https://topupbuddy.onrender.com';
const BASE_URL = 'http://localhost:9090';

export const AxioPost = async (endpoint, payload, auth_token = '', withCredentials = false) => {
  const authToken = Cookies.get('auth_token');
  const regToken = Cookies.get('reg_token');
  const resetPassword = Cookies.get('fprl_token');
  console.log(regToken)
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
        ...(regToken ? { 'registrationtoken': `Bearer ${regToken}` } : {}),
        ...(resetPassword ? { 'resetp': `Bearer ${resetPassword}` } : {}),
      },
      withCredentials,
    });
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error; 
  }
};

export const AxioGet = async (endpoint, params = {}, withCredentials = true) => {
  const authToken = Cookies.get('auth_token');
  console.log(authToken)
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      },
      withCredentials,
      params, // Pass query parameters here
    });
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

