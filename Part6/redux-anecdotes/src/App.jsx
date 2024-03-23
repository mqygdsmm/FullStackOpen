import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisbilityFilter from './components/VisibilityFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
     <VisbilityFilter /> 
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App