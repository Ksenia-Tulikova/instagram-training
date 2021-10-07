import axios from 'axios';

const fillFormDataWithData = (data) => {
  const formData = new FormData();

  for (const rowName in data) {
    formData.append(rowName, data[rowName]);
  }

  return formData;
}

export const uploadAvatar = async ({ avatar, login }) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('login', login);

  const response = await axios({
    method: 'POST',
    url: 'http://localhost:8080/avatars',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const getUsers = async () => {
  const response = await axios({
    method: 'GET',
    url: 'http://localhost:8080/users',
  });
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios({
    method: 'GET',
    url: `http://localhost:8080/user/${id}`,
  });
  return response.data;
};

export const authenticate = async (userData) => {
  const formData = fillFormDataWithData(userData);
  const response = await axios({
    method: 'POST',
    data: formData,
    url: `http://localhost:8080/authenticate`,
    headers: { 'Content-Type': 'multipart/form-data' },

  });
  return response.data;
};

export const createUser = async (userData) => {
  const formData = fillFormDataWithData(userData);
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:8080/users',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const updateUser = async (userData) => {
  const requestParams = {
    ...userData,
    gender: userData.gender.male === 'checked' ? 'male' : 'female',
  };

  const formData = fillFormDataWithData(requestParams);
  const response = await axios({
    method: 'PUT',
    url: `http://localhost:8080/users/${userData.id}`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const removeUser = async (id) => {
  const formData = fillFormDataWithData({id});
  const response = await axios({
    method: 'DELETE',
    url: `http://localhost:8080/users/${id}`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const addImage = async (userImageInfo) => {
  const formData = fillFormDataWithData(userImageInfo);
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:8080/images',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const deleteImage = async ({userId, name}) => {
  const formData = fillFormDataWithData({userId, name});
  const response = await axios({
    method:'DELETE',
    data: formData,
    url:`http://localhost:8080/images/${userId}`,
    headers:{'Content-Type': 'multipart/form-data'},
  });

  return response.data;
}

export const getUserPhotos = async (userId) => {
  const response = await axios({
    method:'GET',
    url:`http://localhost:8080/images/${userId}`,
    headers:{'Content-Type': 'multipart/form-data'},
  });

  return response.data;
}
