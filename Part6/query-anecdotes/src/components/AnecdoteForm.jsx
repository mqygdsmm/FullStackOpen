import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createNew } from "../requests"
import { useRenderNotification } from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const renderNotification = useRenderNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      renderNotification(`anecdote ${newAnecdote.content} created`)
    },
    onError: (error) => {
      renderNotification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
