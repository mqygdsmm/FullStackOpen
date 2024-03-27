import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlogData } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const sameUser = currentUser
    ? currentUser.username === blog.user.username
    : false;
  const dispatch = useDispatch();
  const showWhenSameUser = { display: sameUser ? "" : "none" };

  const handleLike = () => {
    dispatch(
      updateBlogData({ ...blog, likes: blog.likes + 1, user: blog.user.id })
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="blogDetails">
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button onClick={handleLike} style={{ marginLeft: 5 }}>
            Like
          </button>
        </p>
        <p>added by {blog.user.username}</p>
        <div style={showWhenSameUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
        <h3>comments</h3>
        <ul>
          {blog.comments &&
            blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
