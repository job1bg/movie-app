import React from "react";
import "../styles.css";
import { Movie } from "../models/Movie";

const MovieCard: React.FC<{
  movie: Movie;
  isWatchlisted: Boolean;
  toggleWatchlist: (movieId: string) => void;
}> = ({ movie, isWatchlisted, toggleWatchlist }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "images/default.jpg";
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 8) {
      return "rating-good";
    } else if (rating >= 5 && rating < 8) {
      return "rating-ok";
    } else {
      return "rating-bad";
    }
  };
  return (
    <div className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={isWatchlisted ? true : false}
            onChange={() => toggleWatchlist(movie.id)}
          ></input>
          <span className="slider">
            <span className="slider-label">
              {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default MovieCard;
