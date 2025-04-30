import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function SearchResultsPage() {
  const [input, setInput] = useState("");     // Text in the search bar
  const [query, setQuery] = useState("");     // Triggers API request
  const [movies, setMovies] = useState([]);

  // Fetch movies when `query` changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=2b045dad&s=${query}`);
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  // Called when search is submitted
  const handleSearch = () => {
    if (input.trim()) {
      setQuery(input);
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen font-roboto">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Find a Movie</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
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
          className="bg-yellow-500 text-black px-4 py-2 rounded-r-md hover:shadow-[0_0_10px_rgba(255,215,0,0.7)] transition"
        >
          Search
        </button>
      </div>

      {/* Movie Results */}
      {query && (
        <h2 className="text-xl font-semibold mb-4 text-center">
          Results for "{query}"
        </h2>
      )}

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        query && <p className="text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;