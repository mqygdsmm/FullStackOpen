import axios  from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {content, votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateAnecdote = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data

}
export default { getAll, createNew, updateAnecdote, getAnecdote }