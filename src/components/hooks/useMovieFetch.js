import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

export const useMovieFetch = movieId => {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchData = useCallback(async () => {
		setError(false);

		setLoading(true);

		try {
			const endpoint0 = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
			const movieDetails = await (await fetch(endpoint0)).json();

			const endpoint1 = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
			const movieCredits = await (await fetch(endpoint1)).json();

			const directors = movieCredits.crew.filter(member => member.job === "Director");

			setMovie({ ...movieDetails, actors: movieCredits.cast, directors });
		} catch (error) {
			setError(true);

			console.log(error);
		}

		setLoading(false);
	}, [movieId]);

	useEffect(() => {
		if (localStorage.getItem(movieId)) {
			console.log("\nfetching data from local storage | useMovieFetch\n\n");

			setMovie(JSON.parse(localStorage.getItem(movieId)));

			setLoading(false);
		} else {
			console.log("\nfetching data from the API | useMovieFetch\n\n");

			const fetch_data = async () => await fetchData();

			fetch_data();
		}
	}, [fetchData, movieId]);

	useEffect(() => {
		localStorage.setItem(movieId, JSON.stringify(movie));
	}, [movieId, movie]);

	return [movie, loading, error];
};
