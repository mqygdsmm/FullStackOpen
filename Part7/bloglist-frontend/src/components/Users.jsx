import { countBy, keys } from "lodash";
import { useSelector } from "react-redux";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const data = countBy(blogs, "user.username");
  const users = keys(data);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <em>Blogs created</em>
            </td>
          </tr>
        </thead>
        {users.map((user) => (
          <tr>
            <td>{user}</td>
            <td>{data[user]}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
