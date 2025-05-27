import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircleUserRound } from "lucide-react";
import { Icon } from "../assets";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = isScrolled
    ? "text-gray-700 hover:text-green-600"
    : "text-white hover:text-yellow-300";

  const buttonClass = isScrolled
    ? "text-gray-700 hover:text-white border-green-600 hover:bg-green-600"
    : "text-white hover:text-black border-yellow-300 hover:bg-yellow-300";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", href: "#about" },
    {
      label: "Research",
      href: "https://theguard-research.netlify.app",
      external: true,
    },
    { label: "Portal", href: "/portal" },
    { label: "TeaWedha", href: "/teawedha" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="wrapper flex-between">
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <div className="flex-center gap-2">
            <img src={Icon} alt="TheGuard Logo" className="h-8" />
          </div>
          <div className="hidden sm:block">
            <h1
              className={`font-heading text-xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              ThéGuard
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map(({ label, to, href, external }) =>
            to ? (
              <Link key={label} to={to} className={textClass}>
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={textClass}
              >
                {label}
              </a>
            )
          )}

          {!user ? (
            <Link
              to="/login"
              className={`px-4 py-1.5 border-2 rounded-lg transition-colors duration-300 ${buttonClass}`}
            >
              Login
            </Link>
          ) : (
            <>
              <button onClick={logout} className={textClass}>
                Logout
              </button>
              <Link to="/chat">
                <button
                  className={`px-4 py-1.5 border-2 rounded-lg transition-colors duration-300 ${buttonClass}`}
                >
                  AI Chat
                </button>
              </Link>
              <Link
                to="/profile"
                className={isScrolled ? "text-gray-700" : "text-white"}
              >
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
