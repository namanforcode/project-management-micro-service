import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "./ui/button";

const Header = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });

  };

  return (
    <>
    { user && (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/dashboard" className="text-2xl font-bold">
          Project Management
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/project" className="hover:underline">
            Project
          </Link>
            <Button variant="outline" onClick={handleLogout} className="text-white border-white">
              Logout
            </Button>
        </nav>
      </div>
    </header>
    )}
    </>

);
};

export default Header;
