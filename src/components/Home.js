import React, { useState } from "react"
import Grid from "./elements/Grid"
import HeroImage from "./elements/HeroImage"
import LoadMoreBtn from "./elements/LoadMoreBtn"
import MovieThumb from "./elements/MovieThumb"
import SearchBar from "./elements/SearchBar"
import Spinner from "./elements/Spinner"
import { useHomeFetch } from "./hooks/useHomeFetch" // custom hook
import NoImage from "./images/no_image.jpg"
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  POPULAR_BASE_URL,
  SEARCH_BASE_URL
} from "../config"

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const [{ state, loading, error }, fetchMovies] = useHomeFetch(searchTerm)

  console.log("\npopular movies | useHomeFetch ->", state)

  if (!state.movies[0]) return <Spinner />

  if (error)
    return (
      <div>
        <h1>Something's wrong</h1>
      </div>
    )

  const loadMoreMovies = () => {
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${
      state.currentPage + 1
    }`

    const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`

    const endpoint = searchTerm ? searchEndpoint : popularEndpoint

    fetchMovies(endpoint)
  }

  const searchMovie = movie => {
    const endpoint = movie ? SEARCH_BASE_URL.concat(movie) : POPULAR_BASE_URL

    setSearchTerm(movie)

    fetchMovies(endpoint)
  }

  return (
    <>
      {!searchTerm && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
          title={state.heroImage.original_title}
          text={state.heroImage.overview}
        />
      )}

      <SearchBar callback={searchMovie} />

      <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
        {state.movies.map(movie => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>

      {loading && <Spinner />}

      {/* the Load More button won't show up at the last page */}
      {state.currentPage < state.totalPages && !loading && (
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      )}
    </>
  )
}

export default Home
