import axios from "axios";
const baseUrl = "/api/user";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const register = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  console.log(response);
  return response.data;
};

export default { getAll, register };
