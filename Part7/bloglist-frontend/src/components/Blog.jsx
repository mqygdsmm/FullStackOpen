import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlogData } from "../reducers/blogReducer";
const Blog = ({ blog, sameUser }) => {
  const dispatch = useDispatch();
  const style = {
    border: "solid black",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenSameUser = { display: sameUser ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    dispatch(
      updateBlogData({ ...blog, likes: blog.likes + 1, user: blog.user.id })
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };
  return (
    <div style={style} className="blogDiv">
      {blog.title} {blog.author}
      <button style={{ marginLeft: 10 }} onClick={toggleVisibility}>
        {visible ? "hide" : "show"}
      </button>
      <div style={showWhenVisible} className="blogDetails">
        <p>{blog.url}</p>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike} style={{ marginLeft: 5 }}>
            Like
          </button>
        </div>
        <p>{blog.user.username}</p>
        <div style={showWhenSameUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
