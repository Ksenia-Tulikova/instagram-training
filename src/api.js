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

export const getUser = async (login) => {
  const response = await axios({
    method: 'GET',
    url: `http://localhost:8080/user/${login}`,
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
    url: 'http://localhost:8080/addUser',
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
  console.log(formData);
  const response = await axios({
    method: 'PUT',
    url: 'http://localhost:8080/updateUser',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const removeUser = async (login) => {
  const formData = fillFormDataWithData({login});
  const response = await axios({
    method: 'DELETE',
    url: 'http://localhost:8080/removeUser',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};