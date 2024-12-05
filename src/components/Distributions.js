import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ganre = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

function Distributions() {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const api_key = "9b702a6b89b0278738dab62417267c49";
    const main_url = "https://api.themoviedb.org/3";

    const fetchMoviesByGenre = async (genreId) => {
        const url = `${main_url}/discover/movie?api_key=${api_key}&with_genres=${genreId}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const searchMovies = async (query) => {
        if (!query) {
            if (selectedGenre) fetchMoviesByGenre(selectedGenre);
            return;
        }
        const url = `${main_url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(
            query
        )}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId);
        fetchMoviesByGenre(genreId);
    };

    useEffect(() => {
        if (ganre.length > 0) {
            handleGenreChange(ganre[0].id);
        }
    }, []);

    useEffect(() => {
        searchMovies(searchTerm);
    }, [searchTerm]);

    return (
        <div className="distributions">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="genres">
                {ganre.map((genre) => (
                    <button
                        key={genre.id}
                        className={genre.id === selectedGenre ? "active" : ""}
                        onClick={() => handleGenreChange(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
            <div className="movies-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Distributions;
