import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="absolute z-10 top-0 py-4 w-full bg-transparent">
      <div className="wrapper flex-between">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex-center gap-2">
            <img src="/icon.png" alt="TPP Logo" className="h-8 md:h-12" />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:block space-x-6 font-medium">
          <Link to="/" className="text-white hover:text-yellow-300">
            Home
          </Link>
          <a href="#about" className="text-white hover:text-yellow-300">
            About
          </a>
          <Link to="/portal" className="text-white hover:text-yellow-300">
            Portal
          </Link>
          <a href="#benefits" className="text-white hover:text-yellow-300">
            Benefits
          </a>
          <a href="#contact" className="text-white hover:text-yellow-300">
            Contact
          </a>

          <Link to="/chat">
            <button className="button-yellow-outline">AI Chat</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
