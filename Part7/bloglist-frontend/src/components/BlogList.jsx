import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const style = {
    border: "solid black",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };
  return (
    <div style={style} className="blogDiv">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const BlogFormRef = useRef();
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <BlogForm BlogFormRef={BlogFormRef} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
