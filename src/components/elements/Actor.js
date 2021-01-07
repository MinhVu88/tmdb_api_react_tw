import React from "react";
import { StyledActor } from "../styles/StyledActor";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../images/no_image.jpg";

const Actor = ({ actor }) => {
  return (
    <StyledActor>
      <img
        src={
          actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : NoImage
        }
        alt="actor-portrait"
      />
      <span className="actor-name">{actor.name}</span>
      <span className="actor-character">{actor.character}</span>
    </StyledActor>
  );
};

export default Actor;
