import { BrowserRouter, Routes, Route } from "react-router-dom";
import VelesPressHero from "./components/VelesPressHero.jsx";
import VelesPressBody from "./components/VelesPressBody.jsx";
import BookPage from "./pages/BookPage.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}
