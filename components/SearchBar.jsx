import React from "react";
import SearchIcon from "./icons/SearchIcon";

export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <form action="" className="searchbar-form">
        <input
          autoComplete="off"
          placeholder="Search accounts"
          type="text"
          className="searchbar-input"
        />
        <div className=""></div>
        <span className="searchbar-border"></span>
        <button className="searchbar-icon">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
