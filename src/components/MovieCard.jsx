import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/about/${movie.imdbID}`}>
      <div className="bg-gray-900 p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition">
        <img src={movie.Poster} alt={movie.Title} className="w-full h-auto rounded mb-2" />
        <h3 className="text-lg font-semibold text-white">{movie.Title}</h3>
        <p className="text-gray-400">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;