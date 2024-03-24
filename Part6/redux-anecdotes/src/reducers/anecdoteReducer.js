import { createSlice } from "@reduxjs/toolkit"

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

    createAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {createAnecdote, voteOf, setAnecdotes} = anecdotesSlice.actions
export default anecdotesSlice.reducer