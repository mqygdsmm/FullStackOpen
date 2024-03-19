import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginServices from './services/login'
import Message from './components/Message'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const showMessage = (message) => {
    return (
      <div style={{border: 'solid red', fontSize: 24, color: 'red', padding: 5, margin: 5}}>
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginServices.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  if (!user) {
    return (
      <div>
        <Login user={user} password={password} handleLogin={handleLogin} 
              onPasswordChange={({target}) => setPassword(target.value)} 
              onUsernameChange={({target}) => setUsername(target.value)}/>
          {errorMessage !== null && showMessage(errorMessage)}
      </div>

    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App