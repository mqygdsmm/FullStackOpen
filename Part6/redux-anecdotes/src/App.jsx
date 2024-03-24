import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisbilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer' 

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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