import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="p-6 bg-black text-white">
      <div className="flex justify-between items-center">
        <button className="text-3xl" onClick={toggleMenu}>
          ☰ Menu
        </button>
        <div className={`nav-menu ${menuVisible ? "block" : "hidden"} space-x-6`}>
          <Link to="/" className="text-lg hover:text-gold-300">
            Home
          </Link>
          <Link to="/search" className="text-lg hover:text-gold-300">
            Find Movie
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;