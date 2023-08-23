import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex justify-between px-10 py-5 my-3 rounded-lg bg-zinc-700">
      <Link to="/">
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome, {user?.username}</li>
            <li>
              <Link
                className="px-4 py-1 bg-indigo-500 rounded-sm"
                to="/add-task"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="px-4 py-1 bg-indigo-500 rounded-sm" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link
                className="px-4 py-1 bg-indigo-500 rounded-sm"
                to="/register"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
