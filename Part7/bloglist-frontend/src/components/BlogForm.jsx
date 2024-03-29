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
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative">
          <input
            id="title"
            {...title.props}
            className="peer w-2/3 h-10 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            placeholder="title"
            required
          />
          <label
            htmlFor="title"
            className="absolute left-0 -top-6 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            title
          </label>
        </div>
        <div className="relative">
          <input
            id="author"
            {...author.props}
            className="peer h-10 w-2/3 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            placeholder="author"
            required
          />
          <label
            htmlFor="author"
            className="absolute left-0 -top-6 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            author
          </label>
        </div>
        <div className="relative">
          <input
            id="url"
            {...url.props}
            className="peer h-10 w-2/3 border-b-2 border-grey-300 text-grey-900 focus:outline-none focus:border-sky-500 placeholder-transparent"
            placeholder="url"
            required
          />
          <label
            htmlFor="url"
            className="absolute left-0 -top-6 text-gray-600 text-xl peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all italic"
          >
            url
          </label>
        </div>
        {/* <div>
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
        </div> */}
        <button
          type="submit"
          className="bg-lime-600 p-2 rounded-xl mr-5 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
