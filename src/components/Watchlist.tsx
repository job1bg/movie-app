import React from "react";
import "../styles.css";
import { Movie } from "../models/Movie";
import MovieCard from "./MovieCard";

const Watchlist: React.FC<{
  movies: Movie[];
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
}> = ({ movies, watchlist, toggleWatchlist }) => {
  return (
    <div>
      <h1 className="title">Your Watchlist</h1>
      <div className="watchlist">
        {watchlist.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return movie ? (
            <MovieCard
              key={id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={true}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Watchlist;
