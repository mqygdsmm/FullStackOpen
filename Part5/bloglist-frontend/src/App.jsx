import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginServices from './services/login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const addNewBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginServices.login({username, password})
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({type:'error', content:'invalid username or password'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogAppUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  if (!user) {
    return (
      <div>
        <Login user={user} password={password} handleLogin={handleLogin} 
              onPasswordChange={({target}) => setPassword(target.value)} 
              onUsernameChange={({target}) => setUsername(target.value)}/>
        <Message message={errorMessage} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2> 
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm addNewBlog={addNewBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App