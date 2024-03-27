import { useState } from 'react'
const Blog = ({ blog, like, remove, sameUser }) => {
  const style = {
    border: 'solid black',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenSameUser = { display:  sameUser ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    like(blog.id, {
      author: blog.author,
      title: blog.title,
      likes: blog.likes,
      url: blog.url,
      user: blog.user.id
    })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
    }
  }
  return (
    <div style={style} className='blogDiv'>
      {blog.title} {blog.author}
      <button style={{ marginLeft: 10 }} onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='blogDetails'>
        <p>{blog.url}</p>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike} style={{ marginLeft: 5 }}>Like</button>
        </div>
        <p>{blog.user.username}</p>
        <div style={showWhenSameUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog