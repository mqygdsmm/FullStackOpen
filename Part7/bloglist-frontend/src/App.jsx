import { useEffect } from "react";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import BlogList from "./components/BlogList";
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

const App = () => {
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {currentUser !== null && (
          <p>
            {currentUser.username} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
        )}
        <Message />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <BlogList /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/users" element={currentUser ? <Users /> : <Login />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
