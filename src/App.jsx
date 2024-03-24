import React from "react";
import Navigation from "./components/Navigation";
import { Link, Route, Routes } from "react-router-dom";
import HomePageWrapper from "./pages/HomePage";
import DetailPageWrapper from "./pages/DetailPage";
import ArchivePage from "./pages/ArchivePage";
import CreatePage from "./pages/CreatePage";
import PageNotFound from "./pages/PageNotFound";
import ArchivePageWrapper from "./pages/ArchivePage";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to={"/"}>Aplikasi Catatan</Link>
        </h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePageWrapper />} />
          <Route path="/notes/new" element={<CreatePage />} />
          <Route path="/notes/:id" element={<DetailPageWrapper />} />
          <Route path="/archives" element={<ArchivePageWrapper />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
