export const BASE_URL = "http://localhost:8080/api";

export const USER_URL = `${BASE_URL}/user`;
export const REGISTER_URL = `${USER_URL}/register`;
export const LOGIN_URL = `${USER_URL}/login`;
export const getIsValidTokenUrl = username => `${USER_URL}/${username}/isValidToken`;