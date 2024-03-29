import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlogData } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { addComment } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
  const comment = useField("text");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const sameUser =
    currentUser && blog ? currentUser.username === blog.user.username : false;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment.props.value));
    comment.resetField();
  };

  if (!currentUser || !blog) {
    return null;
  }

  return (
    <div className="mt-20">
      <h2 className="font-bold italic text-4xl mb-3">{blog.title}</h2>
      <div className="text-xl">{blog.author}</div>
      <div className="mt-20">
        <p>
          see more{" "}
          <a className="underline italic decoration-sky-500" href={blog.url}>
            {blog.url}
          </a>
        </p>
        <p className="my-5">
          Likes: {blog.likes}
          <button
            onClick={handleLike}
            className="bg-pink-500 rounded-lg p-2 text-white mx-2 hover:bg-pink-600 active:bg-pink-700"
          >
            Like
          </button>
        </p>
        <p className="my-5">
          added by{" "}
          <Link
            to={`/users/${blog.user.id}`}
            className="underline decoration-sky-500"
          >
            {blog.user.name}
          </Link>
        </p>
        <div style={showWhenSameUser}>
          <button onClick={handleRemove} className="bg-rose-300 p-2 rounded-xl">
            remove
          </button>
        </div>
        <h3 className="font-bold italic mt-24">comments</h3>
        <div className="my-5">
          <form onSubmit={handleSubmit}>
            <input
              {...comment.props}
              className="border-b-2 focus:outline-none w-5/6"
              placeholder="write your comment here"
              required
            />
            <button type="submit">
              <img src="/add-comment.svg" className="fill-current w-8 h-8" />
            </button>
          </form>
        </div>
        <ul className="mt-8 divide-y space-y-4">
          {blog.comments &&
            blog.comments.map((comment) => (
              <li className="pt-4" key={comment}>
                {comment}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
