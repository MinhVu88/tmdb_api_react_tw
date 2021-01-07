import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";

export const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async endpoint => {
    setError(false);

    setLoading(true);

    /*
    - this checks if "page" exists in an endpoint

    - if it does, then movies are being loaded

    - loading movies takes place both in the popular movies page & 
      the search results page

    - However between the 2 pages, there's a distinct difference in 
      the nature of loading movies when the Load More button is clicked
    */
    const moviesBeingLoaded = endpoint.search("page");

    try {
      const data = await (await fetch(endpoint)).json();

      // use a update callback in setState()
      setState(previousState => ({
        ...previousState,

        /*
        - The search() method searches a string for a specified value

        - The search value can be string or a regular expression ("page" in this case)

        - This method returns -1 if no match is found

        - If it returns something other than -1, "page" is found in an endpoint & 
          the movies are being loaded

        - Now the distinct difference is...

        - In the popular movies page, when the Load More button is clicked, 
          the new movies are appended to the previously shown ones 
          -> [...previousState.movies, ...data.results]

        - In the search results page, only the movies that are directly related to the 
          search term in the search movie input field are loaded/show up on the page 
          -> [...data.results]
        */
        movies:
          moviesBeingLoaded !== -1
            ? [...previousState.movies, ...data.results]
            : [...data.results],

        heroImage: previousState.heroImage || data.results[0],

        currentPage: data.page,

        totalPages: data.total_pages
      }));
    } catch (error) {
      setError(true);

      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const getPopularMovies = async () => await fetchMovies(POPULAR_BASE_URL);

    getPopularMovies();
  }, []);

  return [{ state, loading, error }, fetchMovies];
};
