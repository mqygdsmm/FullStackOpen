import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    addNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:<input type='text' id='title' data-testId='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:<input type='text' id='author' data-testId='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:<input type='text' id='url' data-testId='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">Create</button>

      </form>
    </div>
  )
}

export default BlogForm