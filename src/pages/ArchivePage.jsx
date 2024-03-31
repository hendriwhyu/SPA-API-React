import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const changeSearchParams = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const getNotes = async () => {
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (notes.length < 1) {
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
