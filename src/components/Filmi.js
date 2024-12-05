import React, { useEffect, useState } from "react";

const api_key = "9b702a6b89b0278738dab62417267c49";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

function Filmi() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const movieIds = [299536, 27205, 155, 121, 2752, 856, 157336, 1371];

    const fetchMovies = async () => {
        try {
            const moviesData = await Promise.all(
                movieIds.map((id) =>
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
                    ).then((response) => response.json())
                )
            );

            const moviesDetails = moviesData.map((response) => ({
                title: response.title,
                duration: response.runtime ? `${response.runtime}` : "Not",
                plot: response.overview || "No",
                posterUrl: response.poster_path
                    ? `${imageBaseUrl}${response.poster_path}`
                    : null,
            }));

            setMovies(moviesDetails);
        } catch (error) {
            console.error("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="kinoner">
            <div className="movies-list">
                {movies.map((movie, index) => (
                    <div key={index} className="movie-item">
                        {movie.posterUrl && (
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        )}
                        {/* <h3>{movie.title}</h3> */}
                        <p>Duration: {movie.duration}min</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filmi;
