import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AboutPage() {
  const { movieId } = useParams();  // Getting the movieId from the URL
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch the movie details from the OMDB API
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=2b045dad`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  // If movieDetails is still loading
  if (!movieDetails) {
    return <div className="text-white">Loading movie details...</div>;
  }

  return (
    <div className="p-8 text-white">
      <div className="flex justify-center items-center">
        <img
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          className="w-72 h-auto rounded-lg"
        />
        <div className="ml-6">
          <h1 className="text-4xl font-bold text-gold-500">{movieDetails.Title}</h1>
          <p className="mt-4 text-lg text-gray-300">{movieDetails.Plot}</p>
          <p className="mt-2 text-lg">Year: {movieDetails.Year}</p>
          <p className="mt-2 text-lg">Director: {movieDetails.Director}</p>
          <p className="mt-2 text-lg">Actors: {movieDetails.Actors}</p>
          <p className="mt-2 text-lg">Rated: {movieDetails.Rated}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;