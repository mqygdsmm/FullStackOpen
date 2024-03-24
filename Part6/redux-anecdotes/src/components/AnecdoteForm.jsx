import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { clearNotification, renderNotification } from "../reducers/notificationReducer";
import anecdoteServices from '../services/anecdotes'



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdotes = await anecdoteServices.createNew(content)
    dispatch(createAnecdote(newAnecdotes))
    dispatch(renderNotification(content))
    setTimeout(() => dispatch(clearNotification()), 5000)

  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm