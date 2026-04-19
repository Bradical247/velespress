import { BrowserRouter, Routes, Route } from "react-router-dom";
import VelesPressHero from "./components/VelesPressHero.jsx";
import VelesPressBody from "./components/VelesPressBody.jsx";
import BookPage from "./pages/BookPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AuthorsPage from "./pages/AuthorsPage.jsx";

function Home() {
  return (
    <>
      <VelesPressHero />
      <VelesPressBody />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:slug" element={<BookPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
