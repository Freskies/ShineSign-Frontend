export const BASE_URL = "http://localhost:8080/api";

export const USER_URL = `${BASE_URL}/user`;
export const REGISTER_URL = `${USER_URL}/register`;
export const LOGIN_URL = `${USER_URL}/login`;
export const UPDATE_USER_URL = `${USER_URL}/update`;
export const getIsValidTokenUrl = username => `${USER_URL}/${username}/isValidToken`;

export const DASHBOARD_URL = `${BASE_URL}/dashboard`;
export const ALL_DOCUMENTS_URL = `${DASHBOARD_URL}/documents`;

export const EDITOR_URL = `${BASE_URL}/editor/document`;
export const CREATE_DOCUMENT_URL = `${EDITOR_URL}`;
export const getDocumentUrl = documentId => `${EDITOR_URL}/${documentId}`;
export const createPageUrl = documentId => `${EDITOR_URL}/${documentId}/newPage`;
export const modifyDocumentUrl = documentId => `${EDITOR_URL}/${documentId}`;
export const uploadImageUrl = documentId => `${EDITOR_URL}/${documentId}/newImage`;
export const deleteImageUrl = (documentId, imageId) => `${EDITOR_URL}/${documentId}/deleteImage/${imageId}`;
export const getAllImages = documentId => `${EDITOR_URL}/${documentId}/allImages`;

export const fillOutUrl = documentId => `${BASE_URL}/fillOut/${documentId}`;