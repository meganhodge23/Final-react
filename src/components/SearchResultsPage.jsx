import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function SearchResultsPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=2b045dad&s=${query}`);
        const data = await response.json();

        if (data.Search) {
          // Fetch detailed info for each movie
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

  return (
    <div className="p-6 text-black bg-black min-h-screen font-roboto">
      <h1 className="full-width-title">Find a Movie</h1>

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
          className="bg-yellow-500 text-black px-4 py-2 rounded-r-md hover:shadow-[0_0_10px_rgba(255,215,0,0.7)] transition"
        >
          Search
        </button>
      </div>

      {/* Genre Filter */}
      <div className="search-box-container">
        <label htmlFor="genre" className="mr-2">Filter by genre:</label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-gray-800 text-black px-4 py-2 rounded"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Results */}
      {query && (
        <h2 className="text-xl font-semibold mb-4 text-center">
          Results for "{query}" {genre !== "All" && `in ${genre}`}
        </h2>
      )}

      {filteredMovies.length > 0 ? (
        <div className="movie-card-container">
          {filteredMovies.map((movie) => (
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