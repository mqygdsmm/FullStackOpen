import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    updateAnecdote(state, action) {
      const {id, changedAnecdote} = action.payload
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    }
  }
})


export const {appendAnecdote, setAnecdotes, updateAnecdote} = anecdotesSlice.actions
export default anecdotesSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteOf = (id) => {
  return async dispatch => {
      const noteToChange = await anecdoteServices.getAnecdote(id)
      const changedObject = {...noteToChange, votes: noteToChange.votes + 1}
      const changedAnecdote= await anecdoteServices.updateAnecdote(id, changedObject)
      dispatch(updateAnecdote({id, changedAnecdote}))
  }
}