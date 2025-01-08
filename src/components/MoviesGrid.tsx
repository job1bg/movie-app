import React, { useState } from "react";
import "../styles.css";
import { Movie } from "../models/Movie";
import MovieCard from "./MovieCard";

const MoviesGrid: React.FC<{
  movies: Movie[];
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
}> = ({ movies, watchlist, toggleWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.currentTarget.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(e.currentTarget.value);
  };

  const matchesGenre = (movie: Movie, genre: string) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie: Movie, searchTerm: string) => {
    return movie.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  };

  const matchesRating = (movie: Movie, rating: string) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Okay":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter((movie: Movie) => {
    return (
      matchesGenre(movie, genre) &&
      matchesSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Okay</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie: Movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
