import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h2 className="font-bold text-3xl italic my-8">{user.name}</h2>
      <h3 className="font-medium mb-4">added blogs</h3>
      <ul
        role="list"
        className="marker:text-blue-300 list-disc pl-10 text-slate-600 space-y-3"
      >
        {blogs
          .filter((blog) => blog.user.id === user.id)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default User;
