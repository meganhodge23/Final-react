import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Ensure you import the CSS

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  // Function to generate random star properties
  const generateStars = (num) => {
    const starsArray = [];
    for (let i = 0; i < num; i++) {
      const xPos = Math.random() * window.innerWidth; // Random x position
      const yPos = Math.random() * window.innerHeight; // Random y position
      const size = Math.random() * 3 + 2; // Random star size
      const delay = Math.random() * 5 + "s"; // Random animation delay
      const duration = Math.random() * 3 + 3 + "s"; // Random animation duration

      starsArray.push({ xPos, yPos, size, delay, duration });
    }
    return starsArray;
  };

  // Set the stars on mount
  useEffect(() => {
    const generatedStars = generateStars(150); // Generate 150 stars
    setStars(generatedStars);
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=2b045dad`
      );
      const data = await response.json();
      setMovieResults(data.Search || []);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/about/${movieId}`);  // Navigate to AboutPage with movieId
  };

  return (
    <div
      className="home-container bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581905764498-7b7b55ecd2da?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Floating Stars */}
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

      <div className="bg-black bg-opacity-80 p-12 text-center">
        <h1 className="text-6xl font-bold text-gold-500 mb-4">Movie Explorer</h1>
        <p className="text-2xl text-gold-300 mb-8">Search your favorite movies with style!</p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie name..."
          className="p-3 rounded-lg w-72 text-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gold-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-gold-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {movieResults.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-black bg-opacity-70 p-4 rounded-lg cursor-pointer hover:scale-105 transition-all"
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
              alt={movie.Title}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
