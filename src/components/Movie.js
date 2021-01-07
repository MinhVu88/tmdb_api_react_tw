import React from "react";
import { useMovieFetch } from "./hooks/useMovieFetch";
import Actor from "./elements/Actor";
import Grid from "./elements/Grid";
import MovieInfo from "./elements/MovieInfo";
import MovieInfoBar from "./elements/MovieInfoBar";
import Navigation from "./elements/Navigation";
import Spinner from "./elements/Spinner";

const Movie = ({ movieId }) => {
  const [movie, loading, error] = useMovieFetch(movieId);

  console.log("\na movie's details | useMovieFetch ->", movie);

  if (error)
    return (
      <div>
        <h1>Something's wrong</h1>
      </div>
    );

  if (loading) return <Spinner />;

  return (
    <>
      <Navigation movieTitle={movie.original_title} />

      <MovieInfo movieInfo={movie} />

      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />

      <Grid header="Actors">
        {movie.actors.map(actor => (
          <Actor key={actor.cast_id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
