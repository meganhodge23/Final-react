import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./SearchResultsPage.css"

function SearchResultsPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const genres = [
    "All", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music",
    "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=2b045dad&s=${query}`);
        const data = await response.json();

        if (data.Search) {
          const detailedMovies = await Promise.all(
            data.Search.map(async (movie) => {
              const res = await fetch(`https://www.omdbapi.com/?apikey=2b045dad&i=${movie.imdbID}`);
              return res.json();
            })
          );
          setMovies(detailedMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = () => {
    if (input.trim()) {
      setQuery(input);
    }
  };

  const filteredMovies = genre === "All"
    ? movies
    : movies.filter((movie) => movie.Genre && movie.Genre.includes(genre));

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    const yearA = parseInt(a.Year);
    const yearB = parseInt(b.Year);

    if (isNaN(yearA) || isNaN(yearB)) return 0;
    return sortOrder === "Newest" ? yearB - yearA : yearA - yearB;
  });

  return (
    <div className="title">
      {/* Full-width Title */}
      <h1 className="full-width-title">Find a Movie</h1>

      {/* Full-width Search Bar */}
      <div className="search-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for a movie..."
          className="w-full sm:w-3/4 p-3 rounded-l-md bg-gray-800 text-black focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-yellow-500 text-black px-4 py-3 rounded-r-md hover:shadow-[0_0_10px_rgba(255,215,0,0.7)] transition"
        >
          Search
        </button>
      </div>

      {/* Genre & Sort Filters */}
      <div className="genre-box">
        <div className="flex items-center">
          <label htmlFor="genre" className="mr-2">Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-gray-800 text-black px-4 py-2 rounded"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="year-box">
          <label htmlFor="sortOrder" className="mr-2">Sort by year:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-800 text-black px-4 py-2 rounded"
          >
            <option value="Newest">Newest to Oldest</option>
            <option value="Oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>

      {/* Results Title */}
      {query && (
        <h2 className="results-container">
          Results for "{query}" {genre !== "All" && `in ${genre}`} ({sortedMovies.length})
        </h2>
      )}

      {/* Scrollable Movie Results */}
      {sortedMovies.length > 0 ? (
        <div className="scrollable-movie-grid">
          {sortedMovies.map((movie) => (
            <div key={movie.imdbID} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        query && <p className="text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;