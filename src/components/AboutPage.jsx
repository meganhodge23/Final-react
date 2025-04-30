import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AboutPage() {
  const { movieId } = useParams(); // Match the route param ("/about/:id")
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=2b045dad`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movieDetails) {
    return <div className="text-center text-white p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white font-roboto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <img
          src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.jpg"}
          alt={movieDetails.Title}
          className="w-72 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{movieDetails.Title}</h1>
          <p className="text-lg text-gray-300 mb-4">{movieDetails.Plot}</p>
          <ul className="space-y-2 text-base text-gray-200">
            <li><span className="font-semibold text-yellow-500">Year:</span> {movieDetails.Year}</li>
            <li><span className="font-semibold text-yellow-500">Director:</span> {movieDetails.Director}</li>
            <li><span className="font-semibold text-yellow-500">Actors:</span> {movieDetails.Actors}</li>
            <li><span className="font-semibold text-yellow-500">Rated:</span> {movieDetails.Rated}</li>
            <li><span className="font-semibold text-yellow-500">Genre:</span> {movieDetails.Genre}</li>
            <li><span className="font-semibold text-yellow-500">Runtime:</span> {movieDetails.Runtime}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;