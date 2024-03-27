import { useEffect, useRef } from "react";
import Login from "./components/Login";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/userReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const BlogFormRef = useRef();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []);

  if (!user) {
    return (
      <div>
        <Login />
        <Message />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
      <Message />
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <BlogForm BlogFormRef={BlogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
