import React, { useState, useRef } from "react";
import FontAwesome from "react-fontawesome";
import {
  StyledSearchBar,
  StyledSearchBarContent
} from "../styles/StyledSearchBar";

const SearchBar = ({ callback }) => {
  const [state, setState] = useState("");

  const timeOut = useRef(null);

  const searchMovie = e => {
    console.log(e.target.value);

    const { value } = e.target;

    clearTimeout(timeOut.current);

    setState(value);

    timeOut.current = setTimeout(() => callback(value), 500);
  };

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <FontAwesome className="fa-search" name="Search" size="2x" />
        <input
          type="text"
          placeholder="Search movie..."
          value={state}
          onChange={e => searchMovie(e)}
        />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};

export default SearchBar;
