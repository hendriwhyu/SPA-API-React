import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LocaleContext } from "../contexts/LocaleContext";

function SearchBar(props) {
  const { keyword, keywordChange } = props;
  const { value: locale } = useContext(LocaleContext);
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={
          locale === "Indonesia"
            ? "Cari berdasarkan judul ..."
            : "Search by title..."
        }
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
