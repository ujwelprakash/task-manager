import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-lg font-bold">Task Manager</h1>
      {user && (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
