import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addNewComment = async (id, comment) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};
export default { getAll, setToken, create, update, remove, addNewComment };
