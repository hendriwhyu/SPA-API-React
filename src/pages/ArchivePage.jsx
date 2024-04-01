import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import useNote from "../hooks/useNote";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, loading] = useNote(getArchivedNotes);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
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
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">Loading .....</p>
        </section>
      </section>
    );
  }

  if (notes.length < 1 || filteredNotes.length < 1) {
    return (
      <section className="archives-page">
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">Tidak ada catatan</p>
        </section>
    </section>
    );
  }

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArchivePage;
