import { getToken } from '../utils/token.utils';

const BASE_URL = 'https://study-api-volkov-lab-566b7077.koyeb.app/api';

export const request = async (url, method = 'GET', body = null) => {
  const token = getToken();

  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${url}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { status: response.status, ...errorData };
  }

  return response.json();
};