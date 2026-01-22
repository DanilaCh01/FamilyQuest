const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';

//token utils

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

//role utils

export const setRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

// clear all auth data
export const clearAuthData = () => {
  removeToken();
  removeRole();
};