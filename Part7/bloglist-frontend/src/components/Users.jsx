import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2 className="font-bold italic text-4xl">Users</h2>
      {users && (
        <table className="table-auto w-full mt-8">
          <thead>
            <tr>
              <td className="px-4 py-2">user</td>
              <td className="px-4 py-2">
                <em>Blogs created</em>
              </td>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} className="underline">
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
