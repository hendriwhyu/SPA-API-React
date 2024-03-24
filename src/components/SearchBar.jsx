import React from "react";

function SearchBar(props) {
  const { keyword, keywordChange } = props;
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Cari berdasarkan judul ..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </section>
  );
}

export default SearchBar;
