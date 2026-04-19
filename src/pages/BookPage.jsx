import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BOOKS } from "../data/books.js";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    const el = ref.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const fx = (v, d = 0, dir = "up") => ({
  opacity: v ? 1 : 0,
  transform: v ? "translate(0,0)"
    : dir === "up" ? "translateY(40px)"
    : dir === "left" ? "translateX(-30px)"
    : "translateX(30px)",
  transition: `opacity 0.9s ease ${d}s, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${d}s`,
});

function ChapterReader({ book }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useInView(0.05);
  const isPlaceholder = !book.chapter || book.chapter === "CHAPTER_PLACEHOLDER";

  return (
    <section ref={ref} style={{
      borderTop: "1px solid rgba(201,168,76,0.08)",
      padding: "80px 0",
    }}>
      {/* Section label */}
      <div style={{ ...fx(vis, 0), display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
        <div style={{ width: 28, height: 1, background: "rgba(201,168,76,0.33)" }} />
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5, color: "rgba(201,168,76,.62)", textTransform: "uppercase" }}>
          Read Free
        </div>
        <div style={{ width: 28, height: 1, background: "rgba(201,168,76,0.33)" }} />
      </div>

      <h2 style={{ ...fx(vis, 0.1), fontFamily: "'Cinzel',serif", fontSize: "clamp(24px,2.5vw,38px)", fontWeight: 700, color: "#EDE8DF", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
        {book.chapterTitle || "Chapter One"}
      </h2>

      {isPlaceholder ? (
        <div style={{ ...fx(vis, 0.2) }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "rgba(237,232,223,.4)", fontStyle: "italic", marginBottom: 32 }}>
            The first chapter will be available here ahead of publication.
          </p>
          <a
            href="mailto:press@velespress.com?subject=Notify me — First Chapter"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "13px 32px", border: "1px solid rgba(201,168,76,.4)",
              fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
              textTransform: "uppercase", color: "#C9A84C", textDecoration: "none",
              transition: "all .3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Notify Me When Available
          </a>
        </div>
      ) : (
        <div style={fx(vis, 0.15)}>
          {/* Preview — first 300 chars */}
          {!open && (
            <>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: 20,
                lineHeight: 1.9, color: "rgba(237,232,223,.65)",
                maxWidth: 680, marginBottom: 0,
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                maxHeight: 200, overflow: "hidden",
              }}>
                {book.chapter.split("\n").slice(0, 6).map((p, i) => (
                  p.trim() ? <p key={i} style={{ marginBottom: "1.4em" }}>{p}</p> : null
                ))}
              </div>
              <button
                onClick={() => setOpen(true)}
                style={{
                  marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "13px 32px", border: "1px solid #C9A84C",
                  fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
                  textTransform: "uppercase", color: "#C9A84C", background: "transparent",
                  cursor: "pointer", position: "relative", overflow: "hidden", transition: "all .4s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#0D0F14"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}
              >
                Read Chapter One
              </button>
            </>
          )}

          {/* Full chapter */}
          {open && (
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: 20,
                lineHeight: 1.95, color: "rgba(237,232,223,.7)",
                maxWidth: 680, animation: "fadeIn .5s ease",
              }}>
                {book.chapter.split("\n").map((p, i) => (
                  p.trim()
                    ? <p key={i} style={{ marginBottom: "1.6em" }}>{p}</p>
                    : <div key={i} style={{ height: "0.8em" }} />
                ))}
              </div>
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(201,168,76,.08)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                {book.amazonUrl && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "13px 32px", border: "1px solid #C9A84C",
                      fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
                      textTransform: "uppercase", color: "#C9A84C", textDecoration: "none",
                      background: "transparent", transition: "all .4s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#0D0F14"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}
                  >
                    Continue Reading — Order Now →
                  </a>
                )}
                <button
                  onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{
                    padding: "13px 24px", border: "none", background: "transparent",
                    fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
                    textTransform: "uppercase", color: "rgba(237,232,223,.4)", cursor: "pointer",
                    transition: "color .3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#EDE8DF"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(237,232,223,.4)"; }}
                >
                  Close Chapter
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function BookPage() {
  const { slug } = useParams();
  const book = BOOKS.find(b => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (book) {
      document.title = `${book.title} — Veles Press`;
    }
  }, [slug]);

  if (!book) {
    return (
      <div style={{ background: "#0D0F14", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(201,168,76,.6)", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", marginBottom: 24 }}>Not Found</div>
          <Link to="/" style={{ color: "#C9A84C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none" }}>← Return to Catalogue</Link>
        </div>
      </div>
    );
  }

  const isPlaceholderSynopsis = !book.synopsis || book.synopsis === "SYNOPSIS_PLACEHOLDER";
  const seriesBooks = BOOKS.filter(b => b.seriesId === book.seriesId && b.slug);

  return (
    <div style={{ background: "#0D0F14", minHeight: "100vh", fontFamily: "'Cormorant Garamond',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>

      {/* Nav bar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(13,15,20,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>V</div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 4, color: "#EDE8DF" }}>VELES PRESS</div>
        </Link>
        <Link to="/" style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 4, color: "rgba(201,168,76,.6)", textDecoration: "none", textTransform: "uppercase", transition: "color .3s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(201,168,76,.6)"; }}
        >
          ← Back to Catalogue
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 48px 60px" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "50%", left: "40%", transform: "translateY(-50%)", width: 600, height: 600, background: `radial-gradient(circle, ${book.color}08 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 80px,rgba(201,168,76,.01) 80px,rgba(201,168,76,.01) 81px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 72, alignItems: "flex-start", flexWrap: "wrap", position: "relative" }}>

          {/* Cover */}
          <div style={{ flexShrink: 0, position: "relative", animation: "float 6s ease-in-out infinite" }}>
            <div style={{ position: "absolute", inset: -40, background: `radial-gradient(circle, ${book.color}08 0%, transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", width: 240, height: 384 }}>
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", border: `1px solid ${book.color}36`, boxShadow: `-16px 16px 48px rgba(0,0,0,.88), 0 0 32px ${book.color}12` }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: `linear-gradient(140deg, #1a1e2c, #0D0F14, ${book.color}14)`, border: `1px solid ${book.color}36` }} />
              )}
              {/* Page edge */}
              <div style={{ position: "absolute", top: 3, right: -7, width: 7, height: "100%", background: "linear-gradient(to right, #222, #333)", transform: "skewY(-.5deg)" }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: "1 1 320px", paddingTop: 8 }}>
            {/* Series + number */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5, color: `${book.color}80`, textTransform: "uppercase" }}>{book.series}</span>
              <div style={{ width: 20, height: 1, background: `${book.color}40` }} />
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 3, color: `${book.color}55`, textTransform: "uppercase" }}>Book {book.number}</span>
            </div>

            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(32px,4vw,58px)", fontWeight: 900, color: "#EDE8DF", letterSpacing: 2, textTransform: "uppercase", lineHeight: 1, marginBottom: 20 }}>
              {book.title}
            </h1>

            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, lineHeight: 1.65, color: "rgba(237,232,223,.7)", fontStyle: "italic", marginBottom: 28, maxWidth: 520 }}>
              "{book.blurb}"
            </p>

            {/* Status + genre badges */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ padding: "4px 14px", border: `1px solid ${book.color}30`, fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: book.color }}>
                {book.series.includes("Patient") ? "Geopolitical Thriller" : "Dark Fantasy"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: book.status === "available" ? "#C9A84C" : "rgba(237,232,223,.2)", boxShadow: book.status === "available" ? "0 0 7px rgba(201,168,76,.8)" : "none" }} />
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: book.status === "available" ? "rgba(201,168,76,.7)" : "rgba(237,232,223,.3)" }}>
                  {book.status === "available" ? `Available · ${book.year}` : `Forthcoming · ${book.year}`}
                </span>
              </div>
            </div>

            {/* Synopsis */}
            {!isPlaceholderSynopsis ? (
              <div style={{ marginBottom: 36 }}>
                <div style={{ width: 40, height: 1, background: `linear-gradient(to right, ${book.color}50, transparent)`, marginBottom: 24 }} />
                {book.synopsis.split("\n").filter(p => p.trim()).map((p, i) => (
                  <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, lineHeight: 1.85, color: "rgba(237,232,223,.55)", marginBottom: "1.4em" }}>{p}</p>
                ))}
              </div>
            ) : (
              <div style={{ marginBottom: 36 }}>
                <div style={{ width: 40, height: 1, background: `linear-gradient(to right, ${book.color}50, transparent)`, marginBottom: 24 }} />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, lineHeight: 1.85, color: "rgba(237,232,223,.3)", fontStyle: "italic" }}>Synopsis coming soon.</p>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "13px 32px", border: "1px solid #C9A84C",
                    fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
                    textTransform: "uppercase", color: "#C9A84C", textDecoration: "none",
                    background: "transparent", transition: "all .4s", position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#0D0F14"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}
                >
                  Order on Amazon →
                </a>
              )}
              <a
                href="#chapter"
                onClick={e => { e.preventDefault(); document.getElementById("chapter-section")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "13px 24px", border: "none", background: "transparent",
                  fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 3,
                  textTransform: "uppercase", color: "rgba(237,232,223,.45)", cursor: "pointer",
                  textDecoration: "none", transition: "color .3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#EDE8DF"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(237,232,223,.45)"; }}
              >
                Read Chapter One ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter reader */}
      <div id="chapter-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        <ChapterReader book={book} />
      </div>

      {/* Other books in series */}
      {seriesBooks.length > 1 && (
        <section style={{ borderTop: "1px solid rgba(201,168,76,.06)", padding: "72px 48px", background: "rgba(28,32,48,.2)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: 5, color: "rgba(201,168,76,.55)", textTransform: "uppercase", marginBottom: 36 }}>
              More from {book.series}
            </div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {seriesBooks.filter(b => b.slug !== slug).map(b => (
                <Link key={b.id} to={`/books/${b.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 12, cursor: "pointer" }}>
                  <div style={{ width: 120, height: 192, flexShrink: 0, position: "relative", overflow: "hidden", border: `1px solid ${b.color}36`, boxShadow: `-8px 8px 24px rgba(0,0,0,.7)`, transition: "transform .4s cubic-bezier(.16,1,.3,1)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {b.coverUrl
                      ? <img src={b.coverUrl} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                      : <div style={{ width: "100%", height: "100%", background: `linear-gradient(140deg,#1a1e2c,#0D0F14,${b.color}12)` }} />
                    }
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cinzel',serif", fontSize: 9.5, fontWeight: 600, color: "rgba(237,232,223,.7)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{b.title}</div>
                    <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "rgba(201,168,76,.5)" }}>Book {b.number}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer strip */}
      <footer style={{ borderTop: "1px solid rgba(201,168,76,.06)", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 26, height: 26, border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>V</div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 4, color: "rgba(237,232,223,.5)" }}>VELES PRESS</div>
        </Link>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "rgba(237,232,223,.2)", fontStyle: "italic" }}>
          © 2026 Veles Press. Conrad Bachman is a pen name.
        </div>
      </footer>
    </div>
  );
}
