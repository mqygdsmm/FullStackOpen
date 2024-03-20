import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: {
      authorization: token
    }
  } 
   const response = await axios.post(baseUrl, newObject, config)
   return response.data
}

export default { getAll, setToken, create}