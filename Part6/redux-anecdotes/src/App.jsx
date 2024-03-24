import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisbilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {
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