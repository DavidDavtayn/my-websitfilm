import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaImdb } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

function Kinoswiper() {
    const [movies, setMovies] = useState([]);
    const [trailers, setTrailers] = useState({});
    const api_key = "9b702a6b89b0278738dab62417267c49";
    const main_url = "https://api.themoviedb.org/3";

    const fetchMovies = useCallback(async () => {
        const url = `${main_url}/movie/popular?api_key=${api_key}&language=en-US&page=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                setMovies(data.results);
                fetchTrailers(data.results);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }, []);

    const fetchTrailers = async (movies) => {
        const trailersData = {};
        for (const movie of movies) {
            const url = `${main_url}/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                for (const video of data.results) {
                    if (video.type === "Trailer") {
                        trailersData[
                            movie.id
                        ] = `https://www.youtube.com/embed/${video.key}`;
                        break;
                    }
                }
            } catch (error) {
                console.error(
                    `Error fetching trailers for movie ID ${movie.id}:`,
                    error
                );
            }
        }
        setTrailers(trailersData);
    };

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div id="swiper">
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="movie-slide">
                            <img
                                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                alt={movie.title}
                                className="imgswiper"
                            />
                            <div className="movie-info">
                                <h2 className="movie-title">{movie.title}</h2>
                                <p className="movie-description">
                                    {movie.overview ||
                                        "No description available."}
                                </p>
                                <div className="movie-details">
                                    <p>
                                        <strong>Year:</strong>{" "}
                                        {new Date(
                                            movie.release_date
                                        ).getFullYear()}
                                    </p>
                                    <p>
                                        <FaImdb className="imdb-icon" />{" "}
                                        {movie.vote_average.toFixed(1)}
                                    </p>
                                </div>
                                <button className="play-button">
                                    <FaPlay className="play-icon" /> Watch Now
                                </button>
                            </div>
                            {trailers[movie.id] && (
                                <div className="trailer-container">
                                    <iframe
                                        className="trailer"
                                        src={trailers[movie.id]}
                                        title={`${movie.title} Trailer`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Kinoswiper;
