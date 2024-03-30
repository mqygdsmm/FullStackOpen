import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";

const Blog = ({ blog }) => {
  return (
    <div className="p-2">
      <Link to={`/blogs/${blog.id}`}>
        <div>{blog.title}</div>
        <div className="text-sm">
          {blog.author} likes: {blog.likes} comments: {blog.comments.length}
        </div>
      </Link>
    </div>
  );
};
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const BlogFormRef = useRef();
  return (
    <div>
      <h2 className="font-bold p-2 sm:p-10 text-2xl sm:text-5xl text-sky-400 italic">
        blog app
      </h2>
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <BlogForm BlogFormRef={BlogFormRef} />
      </Togglable>
      <Message />
      <div className="mt-5 sm:mt-10">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
