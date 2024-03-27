import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogForm = ({ BlogFormRef }) => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        createBlog({
          title: title.props.value,
          author: author.props.value,
          url: url.props.value,
        })
      );
      title.resetField();
      author.resetField();
      url.resetField();
      BlogFormRef.current.toggleVisibility();
      dispatch(
        showNotification({
          type: "success",
          content: `a new blog ${title.props.value} by ${author.props.value}`,
        })
      );
    } catch (exception) {
      console.log(exception);
      dispatch(showNotification({ type: "error", content: "invalid data" }));
    }
  };
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title.props} />
        </div>
        <div>
          author:
          <input {...author.props} />
        </div>
        <div>
          url:
          <input {...url.props} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
