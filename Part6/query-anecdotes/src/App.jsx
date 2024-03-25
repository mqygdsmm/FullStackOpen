import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRenderNotification } from './notificationContext'
const App = () => {

  const queryClient = useQueryClient()
  const rednerNotification = useRenderNotification()

  const udpateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      rednerNotification(`anecdote ${updatedAnecdote.content} voted`)
    }
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    udpateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return (<div>loading data</div>)
  }
  else if (result.isError) {
    return (<div>anecdote service is not available due to problems in server</div>)
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
