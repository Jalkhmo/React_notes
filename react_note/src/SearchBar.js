import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, handleClearSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Mots clé :"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-button" onClick={handleClearSearch}>X</button>
      )}
      <button className="search-button" onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default SearchBar;
