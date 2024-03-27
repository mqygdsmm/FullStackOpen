import { useSelector } from "react-redux";

const User = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs
          .filter((blog) => blog.user.id === user.id)
          .map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default User;
