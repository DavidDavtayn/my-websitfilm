import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);

    const api_key = "9b702a6b89b0278738dab62417267c49";
    const main_url = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(
                    `${main_url}/movie/${id}?api_key=${api_key}`
                );
                const data = await response.json();
                setMovie(data);

                const creditsResponse = await fetch(
                    `${main_url}/movie/${id}/credits?api_key=${api_key}`
                );
                const creditsData = await creditsResponse.json();
                setCast(creditsData.cast || []);

                const videosResponse = await fetch(
                    `${main_url}/movie/${id}/videos?api_key=${api_key}`
                );
                const videosData = await videosResponse.json();
                const officialTrailer = videosData.results.find(
                    (video) => video.type === "Trailer"
                );
                setTrailer(officialTrailer || null);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div className="movie-detailss">
            {movie && (
                <div className="movie-imgess">
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>
            )}
            {trailer && (
                <div className="trailer">
                    <h2>Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={trailer.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
