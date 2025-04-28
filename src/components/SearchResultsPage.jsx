import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function SearchResultsPage() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=2b045dad&s=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch(error => console.error("Error fetching movies:", error));
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Results for "{query}"</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;