import { useState } from "react"
const Blog = ({ blog, like }) => {
  const style = {
    border: 'solid black',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = {display: visible ? '' : 'none'}
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
  
  return (
  <div style={style}>
      {blog.title} {blog.author}
    <button style={{marginLeft: 10}} onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <div>
        Likes: {blog.likes}
        <button onClick={handleLike} style={{marginLeft: 5}}>Like</button>
      </div>
      <p>{blog.user.username}</p>
    </div>

  </div>  
  )
  
}

export default Blog