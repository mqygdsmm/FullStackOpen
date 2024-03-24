import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { renderNotification, clearNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}


const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => 
    anecdotes.filter(anecdote => anecdote.content.includes(filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteOf(id))
    dispatch(renderNotification(anecdotes.find(n => n.id === id).content))
    setTimeout(() => dispatch(clearNotification()), 5000)

  }
  return(
   anecdotes.sort((a, b) => b.votes - a.votes)
      .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />)
  )
}



export default AnecdoteList