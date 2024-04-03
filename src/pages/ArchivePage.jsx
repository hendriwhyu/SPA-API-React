import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import useNote from "../hooks/useNote";
import { LocaleContext } from "../contexts/LocaleContext";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, loading] = useNote(getArchivedNotes);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { value: locale } = useContext(LocaleContext);

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
        <h2>{locale === "Indonesia" ? "Catatan Arsip" : "Archived Notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">
            {locale === "Indonesia" ? "Memuat....." : "Loading ....."}
          </p>
        </section>
      </section>
    );
  }

  if (notes.length < 1 || filteredNotes.length < 1) {
    return (
      <section className="archives-page">
        <h2>{locale === "Indonesia" ? "Catatan Arsip" : "Archived Notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
        <section className="notes-list-empty">
          <p className="notes-list__empty">
            {locale === "Indonesia" ? "Tidak ada catatan" : "Not found notes"}
          </p>
        </section>
      </section>
    );
  }

  return (
    <section className="archives-page">
      <h2>{locale === "Indonesia" ? "Catatan Arsip" : "Archived Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
      <NoteList notes={notes} />
    </section>
  );
}

export default ArchivePage;
