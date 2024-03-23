const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteOf = (id) => {
  console.log('i am here')
  return {
    type: 'vote',
    payload: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'vote': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {...noteToChange, votes: noteToChange.votes + 1}
      return state.map(note => note.id === noteToChange.id ? changedNote : note)
    }
    case 'NEW_ANECDOTE': {
      const anecdote = action.payload
      return [...state, anecdote]
    }
    default:
      return state
  }
}

export default reducer