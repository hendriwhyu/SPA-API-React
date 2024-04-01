import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getActiveNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import useNote from "../hooks/useNote";
import { LocaleContext } from "../contexts/LocaleContext";

function HomePageAction() {
  const navigate = useNavigate();
  const navigateToAddNewNote = () => {
    navigate("notes/new");
  };
  return (
    <div className="homepage__action">
      <button
        className="action"
        type="button"
        title="Tambah"
        onClick={navigateToAddNewNote}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </button>
    </div>
  );
}

function HomePage() {
  const [notes, loading] = useNote(getActiveNotes);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  const changeSearchParams = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return (
      <section className="archives-page">
        <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">Loading .....</p>
        </section>
      </section>
    );
  }

  if (notes.length < 1 || filteredNotes.length < 1) {
    return (
      <section className="homepage">
        <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">Tidak ada catatan</p>
        </section>
        <HomePageAction />
      </section>
    );
  }

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
      <NoteList notes={filteredNotes} />
      <HomePageAction />
    </section>
  );
}

export default HomePage;
