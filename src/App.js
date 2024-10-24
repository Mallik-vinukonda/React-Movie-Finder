// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=7db9afba";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [darkMode, setDarkMode] = useState(false);

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();

		if (data.Search) {
			setMovies(data.Search);
		}
	};

	useEffect(() => {
		const randomMovies = [
			"Inception",
			"Matrix",
			"Titanic",
			"Interstellar",
			"Avatar",
		];
		const randomTitle =
			randomMovies[Math.floor(Math.random() * randomMovies.length)];
		searchMovies(randomTitle);
	}, []);

	return (
		<div className="app">
			<h1>My Movies</h1>

			<div className="search">
				<input
					placeholder="Search for movies"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No Movies Found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
