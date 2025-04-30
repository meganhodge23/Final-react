import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Ensure you import the CSS

function HomePage() {
  const [stars, setStars] = useState([]);
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

  return (
    <div
      className="home-container bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1581905764498-7b7b55ecd2da?auto=format&fit=crop&w=1400&q=80')",
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

      <div className="bg-black bg-opacity-80 p-12 text-center">
        <h1 className="text-6xl font-bold text-gold-500 mb-4">Movie Explorer</h1>
        <p className="text-2xl text-gold-300 mb-8">Explore movies in style!</p>
      </div>
    </div>
  );
}

export default HomePage;
