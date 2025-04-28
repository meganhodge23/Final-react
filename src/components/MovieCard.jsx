function MovieCard({ movie }) {
    return (
      <div className="border p-2 rounded shadow hover:shadow-lg">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
          className="w-full h-60 object-cover mb-2"
        />
        <h2 className="text-md font-semibold">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </div>
    );
  }
  
  export default MovieCard;