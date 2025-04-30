import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Make sure this includes your star animation styles

function HomePage() {
  const [stars, setStars] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const generateStars = (num) => {
    const starsArray = [];
    for (let i = 0; i < num; i++) {
      const xPos = Math.random() * window.innerWidth;
      const yPos = Math.random() * window.innerHeight;
      const size = Math.random() * 3 + 2;
      const delay = Math.random() * 5 + "s";
      const duration = Math.random() * 3 + 3 + "s";
      starsArray.push({ xPos, yPos, size, delay, duration });
    }
    return starsArray;
  };

  useEffect(() => {
    const generatedStars = generateStars(150);
    setStars(generatedStars);
  }, []);

  const handleSearch = () => {
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input)}`);
    }
  };

  return (
    <div
      className="home-container bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581905764498-7b7b55ecd2da?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="stars-container">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              left: `${star.xPos}px`,
              top: `${star.yPos}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
      <div className="bg-black bg-opacity-80 p-12">
        <h1 className="full-width-title">Movie Explorer</h1>
        <p className="full-width-subtitle">Explore movies in style!</p>

        {/* Search Bar */}
        <div className="search-box-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a movie..."
            className="w-full max-w-md p-2 rounded-l-md bg-gray-800 text-black focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;