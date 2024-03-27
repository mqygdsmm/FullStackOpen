import { useEffect } from "react";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "./reducers/userReducer";
import Message from "./components/Message";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []);

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {user !== null && (
          <p>
            {user.username} logged in
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
        )}
        <Message />
      </div>
      <Routes>
        <Route
          path="/"
          element={user ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/users" element={user ? <Users /> : <Login />} />
      </Routes>
    </div>
  );
  // if (!user) {
  //   return (
  //     <div>
  //       <Login />
  //       <Message />
  //     </div>
  //   );
  // }
  // return <BlogList />;
};

export default App;
