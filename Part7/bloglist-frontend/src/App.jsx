import { useEffect } from "react";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { logout } from "./reducers/userReducer";
import Message from "./components/Message";
import Users from "./components/Users";
import User from "./components/User";
import Registor from "./components/Register";

const App = () => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMatch = useMatch("/users/:id");
  const blogMatch = useMatch("/blogs/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const padding = {
    padding: 5,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const navibarStyle = {
    background: "lightgrey",
    display: currentUser ? "" : "none",
  };
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, []);

  return (
    <div className="font-serif text-2xl selection:bg-blue-400 selection:text-blue-600">
      <div
        className="grid grid-cols-2 space-x-2 p-1 mb-3 text-slate-*00 py-2 bg-gray-200"
        style={{ display: currentUser ? "" : "none" }}
      >
        <div className="space-x-5 px-4 my-1">
          <Link to="/blogs" className="hover:bg-slate-50 p-2 rounded-md">
            <span>blogs</span>
          </Link>
          <Link to="/users" className="hover:bg-slate-50 p-2 rounded-md">
            users
          </Link>
        </div>

        <div className="text-right pr-3 space-x-3">
          <span className="italic">
            {currentUser && (
              <Link to={`/users/${currentUser.id}`}>{currentUser.name}</Link>
            )}
          </span>
          <button
            onClick={handleLogout}
            className="border-1 rounded-lg text-blue-700 bg-blue-300 px-2"
          >
            logout
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center p-8">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate replace to="/blogs" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/users" element={currentUser ? <Users /> : <Login />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route
            path="/register"
            element={currentUser ? <Navigate replace to="/" /> : <Registor />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
