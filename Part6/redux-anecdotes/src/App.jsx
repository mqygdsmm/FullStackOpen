import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisbilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import anecdoteServices from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteServices.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  },)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
     <VisbilityFilter /> 
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App