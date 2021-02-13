import React from "react"
import PropTypes from "prop-types"
import MovieThumb from "./MovieThumb"
import { StyledMovieInfo } from "../styles/StyledMovieInfo"
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config"
import NoImage from "../images/no_image.jpg"

const MovieInfo = ({ movieInfo }) => {
  return (
    <StyledMovieInfo backdrop={movieInfo.backdrop_path}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              movieInfo.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieInfo.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </div>

        <div className="movieinfo-text">
          <h1>{movieInfo.title}</h1>
          <h3>PLOT</h3>
          <p>{movieInfo.overview}</p>
          <div className="rating-director">
            <div>
              <h3>IMDB RATING</h3>
              <div className="score">{movieInfo.vote_average}</div>
            </div>

            <div className="director">
              <h3>DIRECTOR{movieInfo.directors.length > 1 ? "S" : ""}</h3>
              {movieInfo.directors.map(director => (
                <p key={director.id}>{director.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledMovieInfo>
  )
}

MovieInfo.propTypes = { movieInfo: PropTypes.object }

export default MovieInfo
