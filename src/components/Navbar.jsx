import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 relative">
      <div className="nav__wrapper">
        <h1 className="text-xl font-bold text-gold-400">MovieApp</h1>
        <button
          className="text-3xl text-gold-400 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          ☰ MENU
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuVisible && (
        <div className="absolute right-6 top-16 bg-gray-900 rounded-md shadow-md border border-gold-400 w-48 z-50">
          <ul className="flex flex-col text-center py-2">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gold-400 hover:text-black transition"
                onClick={() => setMenuVisible(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="block px-4 py-2 hover:bg-gold-400 hover:text-black transition"
                onClick={() => setMenuVisible(false)}
              >
                Find Movie
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-gold-400 hover:text-black transition"
                onClick={() => setMenuVisible(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;