import { useState, useEffect, useRef } from "react";

const books = [
  {
    title: "Throne of Ashes",
    series: "The Names Beneath — I",
    genre: "Dark Fantasy",
    color: "#C9A84C",
    accent: "#E05C3A",
    year: "2026",
    coverUrl: "/covers/throne-of-ashes.jpg",
  },
  {
    title: "The Red Land",
    series: "The Names Beneath — II",
    genre: "Dark Fantasy",
    color: "#A84C4C",
    accent: "#C9A84C",
    year: "2026",
    coverUrl: "/covers/red-land.jpg",
  },
  {
    title: "The Patient Empires",
    series: "Patient Empires — I",
    genre: "Geopolitical Thriller",
    color: "#4C7CA8",
    accent: "#C9A84C",
    year: "2026",
    coverUrl: "/covers/patient-empires.jpg",
  },
];

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(#noise)' opacity='0.08'/></svg>`;

export default function VelesPressHero() {
  const [activeBook, setActiveBook] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorGlow, setCursorGlow] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 300);
    const t2 = setTimeout(() => setTitleVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveBook(prev => (prev + 1) % books.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const book = books[activeBook];

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 18;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 12;

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#0D0F14",
        fontFamily: "'Cinzel', serif",
        overflow: "hidden",
        position: "relative",
        cursor: cursorGlow ? "none" : "default",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes bookSlide {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes letterReveal {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to { clip-path: inset(0 0% 0 0); opacity: 1; }
        }
        @keyframes orbitSlow {
          from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-40px) translateX(20px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-80px) translateX(-10px) scale(0.8); opacity: 0; }
        }

        .nav-link {
          color: rgba(237,232,223,0.5);
          text-decoration: none;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .nav-link:hover { color: #C9A84C; }

        .book-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
        }
        .book-dot.active {
          background: #C9A84C;
          border-color: #C9A84C;
          box-shadow: 0 0 12px rgba(201,168,76,0.6);
        }
        .book-dot:hover { border-color: #C9A84C; }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          border: 1px solid #C9A84C;
          color: #C9A84C;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C9A84C;
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 0;
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { color: #0D0F14; }
        .cta-btn span { position: relative; z-index: 1; }

        .cta-btn-2 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          color: rgba(237,232,223,0.5);
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: color 0.3s ease;
        }
        .cta-btn-2:hover { color: #EDE8DF; }

        .book-card {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .genre-tag {
          display: inline-block;
          padding: 4px 12px;
          border: 1px solid rgba(201,168,76,0.3);
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C9A84C;
        }
        .scroll-indicator {
          animation: float 3s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #C9A84C 0%, #F5E6B8 40%, #C9A84C 60%, #8B6914 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #C9A84C;
          animation: particleDrift linear infinite;
        }
      `}</style>

      {/* Grain overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`,
        backgroundRepeat: "repeat",
        pointerEvents: "none",
        zIndex: 100,
        mixBlendMode: "overlay",
        opacity: 0.6,
      }} />

      {/* Cursor glow */}
      <div
        onMouseEnter={() => setCursorGlow(true)}
        onMouseLeave={() => setCursorGlow(false)}
        style={{
          position: "fixed",
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 1,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* Ambient background orbs */}
      <div style={{
        position: "fixed",
        top: "20%",
        right: "10%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)`,
        pointerEvents: "none",
        animation: "glowPulse 6s ease-in-out infinite",
        transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
        transition: "transform 0.3s ease",
      }} />
      <div style={{
        position: "fixed",
        bottom: "10%",
        left: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(224,92,58,0.04) 0%, transparent 70%)`,
        pointerEvents: "none",
        animation: "glowPulse 8s ease-in-out infinite 2s",
      }} />

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${10 + i * 12}%`,
          bottom: "0%",
          animationDuration: `${4 + i * 1.5}s`,
          animationDelay: `${i * 0.8}s`,
          opacity: 0.3 + (i % 3) * 0.1,
        }} />
      ))}

      {/* Vertical text — left side */}
      <div style={{
        position: "fixed",
        left: 32,
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        transformOrigin: "center center",
        color: "rgba(201,168,76,0.3)",
        fontFamily: "'Cinzel', serif",
        fontSize: 9,
        letterSpacing: 4,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 1.5s",
      }}>
        Est. MMXXVI — Prague, Czech Republic
      </div>

      {/* Vertical text — right side */}
      <div style={{
        position: "fixed",
        right: 32,
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "center center",
        color: "rgba(201,168,76,0.3)",
        fontFamily: "'Cinzel', serif",
        fontSize: 9,
        letterSpacing: 4,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 1.5s",
      }}>
        Veles Press — Independent Publishing House
      </div>

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "28px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
        background: "linear-gradient(to bottom, rgba(13,15,20,0.95) 0%, transparent 100%)",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 0.5s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 32,
            height: 32,
            border: "1px solid #C9A84C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C9A84C",
            fontSize: 14,
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
          }}>V</div>
          <div>
            <div style={{ color: "#EDE8DF", fontSize: 13, letterSpacing: 4, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>VELES PRESS</div>
            <div style={{ color: "rgba(201,168,76,0.5)", fontSize: 8, letterSpacing: 3, fontFamily: "'Cinzel', serif" }}>INDEPENDENT PUBLISHING</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 40 }}>
          {["Catalogue", "Series", "Authors", "About"].map(link => (
            <a key={link} className="nav-link">{link}</a>
          ))}
        </div>

        {/* CTA */}
        <button className="cta-btn" style={{ padding: "10px 24px", fontSize: 9 }}>
          <span>New Release</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        position: "relative",
        transform: `translateY(${scrollY * 0.15}px)`,
      }}>
        {/* Left content */}
        <div style={{ flex: 1, maxWidth: 620, position: "relative", zIndex: 10 }}>

          {/* Series tag */}
          <div style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            marginBottom: 32,
          }}>
            <span className="genre-tag">{book.genre}</span>
            <span style={{
              marginLeft: 16,
              color: "rgba(201,168,76,0.5)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              fontStyle: "italic",
              letterSpacing: 1,
            }}>{book.series}</span>
          </div>

          {/* Main title */}
          <div style={{ marginBottom: 32, overflow: "hidden" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-1px",
              color: "#EDE8DF",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(60px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}>
              {book.title.split(" ").map((word, i) => (
                <span key={i} className={i % 2 === 0 ? "" : "shimmer-text"}>
                  {word}{" "}
                </span>
              ))}
            </h1>
          </div>

          {/* Divider line */}
          <div style={{
            width: titleVisible ? 80 : 0,
            height: 1,
            background: `linear-gradient(to right, ${book.color}, transparent)`,
            marginBottom: 32,
            transition: "width 1s ease 0.8s",
          }} />

          {/* Description */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(237,232,223,0.6)",
            maxWidth: 480,
            fontStyle: "italic",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.9s",
            marginBottom: 48,
          }}>
            Stories that live in the space between myth and memory.
            Psychological depth. Atmospheric worlds. Literature
            that refuses easy answers.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 1.1s",
          }}>
            <button className="cta-btn"><span>Explore Catalogue</span></button>
            <button className="cta-btn-2">
              <span>Latest Release</span>
              <span style={{ color: book.color }}>→</span>
            </button>
          </div>

          {/* Book selector dots */}
          <div style={{
            display: "flex",
            gap: 12,
            marginTop: 64,
            alignItems: "center",
            opacity: titleVisible ? 1 : 0,
            transition: "opacity 0.8s ease 1.3s",
          }}>
            {books.map((b, i) => (
              <button
                key={i}
                className={`book-dot ${i === activeBook ? "active" : ""}`}
                onClick={() => {
                  setActiveBook(i);
                  clearInterval(intervalRef.current);
                }}
              />
            ))}
            <div style={{
              marginLeft: 8,
              color: "rgba(237,232,223,0.3)",
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}>
              {String(activeBook + 1).padStart(2, "0")} / {String(books.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Right — Book cover visual */}
        <div style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: `translateY(-50%) translateX(${parallaxX * -1}px) translateY(calc(-50% + ${parallaxY * -0.5}px))`,
          transition: "transform 0.2s ease",
          zIndex: 5,
        }}>

          {/* Glow behind book */}
          <div style={{
            position: "absolute",
            inset: -60,
            background: `radial-gradient(circle, ${book.color}18 0%, transparent 70%)`,
            animation: "glowPulse 4s ease-in-out infinite",
            transition: "background 1s ease",
          }} />

          {/* Book spine */}
          <div style={{
            key: activeBook,
            animation: "bookSlide 0.6s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
          }}>
            {/* Book cover */}
            <div style={{
              width: 280,
              height: 420,
              background: book.coverUrl ? "#0D0F14" : `linear-gradient(135deg, #1C2030 0%, #0D0F14 40%, ${book.color}22 100%)`,
              border: `1px solid ${book.color}44`,
              position: "relative",
              overflow: "hidden",
              boxShadow: `
                -20px 20px 60px rgba(0,0,0,0.8),
                0 0 40px ${book.color}22,
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
              animation: "float 6s ease-in-out infinite",
            }}>
              {/* Real cover image */}
              {book.coverUrl && (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              )}
              {/* Inner decorative elements — only shown without real cover */}
              {!book.coverUrl && <div style={{
                position: "absolute",
                top: 24,
                left: 24,
                right: 24,
                height: 1,
                background: `linear-gradient(to right, transparent, ${book.color}60, transparent)`,
              }} />}
              {!book.coverUrl && <div style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                height: 1,
                background: `linear-gradient(to right, transparent, ${book.color}60, transparent)`,
              }} />}

              {/* Central ornament + title — only shown without real cover */}
              {!book.coverUrl && (
                <>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    width: 120,
                    height: 120,
                    border: `1px solid ${book.color}30`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      border: `1px solid ${book.color}50`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        background: `${book.color}30`,
                        borderRadius: "50%",
                        border: `1px solid ${book.color}80`,
                      }} />
                    </div>
                  </div>
                  <div style={{
                    position: "absolute",
                    bottom: 40,
                    left: 24,
                    right: 24,
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: book.color,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}>{book.title}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10,
                      color: "rgba(237,232,223,0.4)",
                      letterSpacing: 2,
                      fontStyle: "italic",
                    }}>Conrad Bachman</div>
                  </div>
                </>
              )}

              {/* Corner detail */}
              <div style={{
                position: "absolute",
                top: 16,
                left: 16,
                width: 24,
                height: 24,
                borderTop: `1px solid ${book.color}50`,
                borderLeft: `1px solid ${book.color}50`,
              }} />
              <div style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 24,
                height: 24,
                borderTop: `1px solid ${book.color}50`,
                borderRight: `1px solid ${book.color}50`,
              }} />
              <div style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                width: 24,
                height: 24,
                borderBottom: `1px solid ${book.color}50`,
                borderLeft: `1px solid ${book.color}50`,
              }} />
              <div style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                width: 24,
                height: 24,
                borderBottom: `1px solid ${book.color}50`,
                borderRight: `1px solid ${book.color}50`,
              }} />

              {/* Scanline effect */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Book page edges */}
            <div style={{
              position: "absolute",
              top: 4,
              right: -8,
              width: 8,
              height: 420,
              background: "linear-gradient(to right, #2a2a2a, #3a3a3a)",
              transform: "skewY(-0.5deg)",
            }} />
          </div>
        </div>

        {/* Horizontal decorative lines */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: "45%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,168,76,0.08))",
          pointerEvents: "none",
        }} />
      </section>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{
        position: "fixed",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: loaded ? 0.6 : 0,
        transition: "opacity 1s ease 2s",
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 8,
          letterSpacing: 4,
          color: "rgba(201,168,76,0.6)",
          textTransform: "uppercase",
        }}>Scroll</div>
        <div style={{
          width: 1,
          height: 40,
          background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
        }} />
      </div>

      {/* STATS bar */}
      <section style={{
        borderTop: "1px solid rgba(201,168,76,0.08)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
        padding: "32px 80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(28,32,48,0.4)",
        backdropFilter: "blur(20px)",
      }}>
        {[
          { num: "17", label: "Books in Development" },
          { num: "6", label: "Active Series" },
          { num: "3", label: "Genres" },
          { num: "2026", label: "Founded Prague" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 36,
              fontWeight: 700,
              color: "#C9A84C",
              lineHeight: 1,
              marginBottom: 8,
            }}>{stat.num}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12,
              color: "rgba(237,232,223,0.4)",
              letterSpacing: 2,
              fontStyle: "italic",
            }}>{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
