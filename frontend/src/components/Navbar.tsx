import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircleUserRound } from "lucide-react";
import { Icon } from "../assets";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="absolute z-10 top-0 py-4 w-full bg-transparent">
      <div className="wrapper flex-between">
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <div className="flex-center gap-2">
            <img src={Icon} alt="TheGuard Logo" className="h-8" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading text-xl font-bold text-white">
              TheGuard
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className="text-white hover:text-yellow-300">
            Home
          </Link>
          <a href="#about" className="text-white hover:text-yellow-300">
            About
          </a>
          <a
            href="https://theguard-research.netlify.app"
            target="_blank"
            className="text-white hover:text-yellow-300"
          >
            Research
          </a>
          <a href="/portal" className="text-white hover:text-yellow-300">
            Portal
          </a>
          <a href="#contact" className="text-white hover:text-yellow-300">
            Contact
          </a>
          {!user ? (
            <Link to="/login" className="button-yellow-outline">
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={logout}
                className="text-white hover:text-yellow-300"
              >
                Logout
              </button>
              <Link to="/chat">
                <button className="button-yellow-outline">AI Chat</button>
              </Link>
              <Link to="/profile" className="text-white">
                <CircleUserRound />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
