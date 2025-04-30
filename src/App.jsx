import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import MovieDetailPage from "./components/MovieDetailPage";
import AboutPage from "./components/AboutPage";
import SearchResultsPage from "./components/SearchResultsPage"; // Add SearchResultsPage

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar stays across all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home Page */}
        <Route path="/search" element={<SearchResultsPage />} />  {/* Search Page */}
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />  {/* Movie Detail Page */}
        <Route path="/about/:movieId" element={<AboutPage />} />  {/* About Page */}
      </Routes>
    </Router>
  );
}

export default App;
