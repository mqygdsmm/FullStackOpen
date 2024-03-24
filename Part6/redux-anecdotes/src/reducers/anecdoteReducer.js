import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {...noteToChange, votes: noteToChange.votes + 1}
      return state.map(note => note.id === noteToChange.id ? changedNote : note)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {appendAnecdote, voteOf, setAnecdotes} = anecdotesSlice.actions
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