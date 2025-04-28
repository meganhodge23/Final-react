import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import MovieDetailPage from "./components/MovieDetailPage";
import AboutPage from "./components/AboutPage"; // Import AboutPage

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/about/:movieId" element={<AboutPage />} />  {/* Add AboutPage route */}
      </Routes>
    </Router>
  );
}

export default App;
