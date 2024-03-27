import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginServices from "./services/login";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BlogFormRef = useRef();
  const notification = useSelector((state) => state.notification);
  const notificationDispatch = useDispatch();

  const addNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      BlogFormRef.current.toggleVisibility();
      notificationDispatch(
        showNotification({
          type: "success",
          content: `a new blog ${newBlog.title} by ${newBlog.author}`,
        })
      );
    } catch (exception) {
      notificationDispatch(
        showNotification({ type: "error", content: "invalid data" })
      );
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch(
        showNotification({
          type: "error",
          content: "invalid username or password",
        })
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppUser");
    setUser(null);
  };

  const like = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (exception) {
      console.log("error");
    }
  };

  const remove = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      console.log("error");
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("blogAppUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  if (!user) {
    return (
      <div>
        <Login
          user={user}
          password={password}
          handleLogin={handleLogin}
          onPasswordChange={({ target }) => setPassword(target.value)}
          onUsernameChange={({ target }) => setUsername(target.value)}
        />
        <Message message={notification} />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Message message={notification} />
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <BlogForm addNewBlog={addNewBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={like}
            remove={remove}
            sameUser={user.username === blog.user.username}
          />
        ))}
    </div>
  );
};

export default App;
