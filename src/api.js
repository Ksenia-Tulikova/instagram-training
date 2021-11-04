import axios from 'axios';

const fillFormDataWithData = (data) => {
  const formData = new FormData();

  for (const rowName in data) {
    formData.append(rowName, data[rowName]);
  }

  return formData;
};

export default {
  avatars: {
    upload: async ({ avatar, login }) => {
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
    }
  },
  users: {
    getAll: async () => {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8080/users',
      });
      return response.data;
    },
    get: async (id) => {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8080/user/${id}`,
      });
      return response.data;
    },
    add: async (userData) => {
      const formData = fillFormDataWithData(userData);
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/users',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    update: async (userData) => {
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
    },
    delete: async (id) => {
      const formData = fillFormDataWithData({ id });
      const response = await axios({
        method: 'DELETE',
        url: `http://localhost:8080/users/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    authenticate: async (userData) => {
      const formData = fillFormDataWithData(userData);
      const response = await axios({
        method: 'POST',
        data: formData,
        url: `http://localhost:8080/authenticate`,
        headers: { 'Content-Type': 'multipart/form-data' },

      });
      return response.data;
    },
  },
  images: {
    getAll: async () => {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8080/images`,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    getAllByUser: async (userId) => {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8080/users/${userId}/images`,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    add: async (userImageInfo) => {
      const formData = fillFormDataWithData(userImageInfo);
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/users/images',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    delete: async ({ userId, name }) => {
      const formData = fillFormDataWithData({ userId, name });
      const response = await axios({
        method: 'DELETE',
        data: formData,
        url: `http://localhost:8080/users/${userId}/images`,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
  },
  likes: {
    add: async (userId, imageId) => {
      const response = await axios({
        method: 'POST',
        data: { userId },
        url: `http://localhost:8080/images/${imageId}/like`, //
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    },
    delete: async (userId, imageId) => {

      const response = await axios({
        method: 'POST',
        data: { userId },
        url: `http://localhost:8080/images/${imageId}/unlike`, // images/imageId/unLike
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    },
  },
  comments: {
    add: async (commentData) => {
      const response = await axios({
        method: 'POST',
        data: {
          userId: commentData.userId,
          comment: commentData.value,
          parent_id: commentData.parent_id,
        },
        url: `http://localhost:8080/images/${commentData.imageId}/comments`,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    },
    delete: async (commentId, imageId) => {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:8080/images/${imageId}/comments/${commentId}`,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    },
    getAll: async () => {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8080/images/comments`,
      });

      return response.data;
    }
  }
}