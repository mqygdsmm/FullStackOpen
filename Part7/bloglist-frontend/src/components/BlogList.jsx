import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const BlogFormRef = useRef();
  const dispatch = useDispatch();
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <BlogForm BlogFormRef={BlogFormRef} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            sameUser={user.username === blog.user.username}
          />
        ))}
    </div>
  );
};

export default BlogList;
