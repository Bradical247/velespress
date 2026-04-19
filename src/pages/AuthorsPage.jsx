import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AuthorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Conrad Bachman — Veles Press";
  }, []);

  const S = { fontFamily:"'Cinzel',serif" };
  const G = { fontFamily:"'Cormorant Garamond',serif" };
  const gold = "#C9A84C";
  const cream = "#EDE8DF";

  return (
    <div style={{ background:"#0D0F14", minHeight:"100vh", fontFamily:"'Cormorant Garamond',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
      `}</style>

      {/* Nav */}
      <nav style={{ position:"sticky", top:0, zIndex:50, padding:"20px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(13,15,20,.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(201,168,76,.08)" }}>
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
          <div style={{ width:30, height:30, border:`1px solid ${gold}`, display:"flex", alignItems:"center", justifyContent:"center", ...S, fontSize:14, fontWeight:700, color:gold }}>V</div>
          <div style={{ ...S, fontSize:11, letterSpacing:4, color:cream }}>VELES PRESS</div>
        </Link>
        <Link to="/" style={{ ...S, fontSize:9, letterSpacing:4, color:"rgba(201,168,76,.6)", textDecoration:"none", textTransform:"uppercase" }}
          onMouseEnter={e=>{e.currentTarget.style.color=gold;}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(201,168,76,.6)";}}>
          ← Home
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ padding:"80px 48px 64px", borderBottom:"1px solid rgba(201,168,76,.08)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", right:"5%", width:500, height:500, background:"radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 65%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:960, margin:"0 auto", display:"flex", gap:72, alignItems:"center", flexWrap:"wrap", position:"relative" }}>

          {/* Monogram */}
          <div style={{ flexShrink:0, animation:"float 6s ease-in-out infinite" }}>
            <div style={{ width:180, height:180, border:`1px solid rgba(201,168,76,.25)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <div style={{ width:130, height:130, border:`1px solid rgba(201,168,76,.15)`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ ...S, fontSize:64, fontWeight:900, color:gold, lineHeight:1 }}>CB</div>
              </div>
              <div style={{ position:"absolute", inset:-20, border:"1px dashed rgba(201,168,76,.08)", borderRadius:"50%" }} />
            </div>
          </div>

          {/* Name + bio intro */}
          <div style={{ flex:"1 1 320px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <div style={{ width:28, height:1, background:"rgba(201,168,76,.4)" }} />
              <div style={{ ...S, fontSize:9, letterSpacing:5, color:"rgba(201,168,76,.75)", textTransform:"uppercase" }}>Author</div>
              <div style={{ width:28, height:1, background:"rgba(201,168,76,.4)" }} />
            </div>
            <h1 style={{ ...S, fontSize:"clamp(32px,4.5vw,62px)", fontWeight:900, color:cream, letterSpacing:2, textTransform:"uppercase", lineHeight:1, marginBottom:12 }}>
              Conrad<br/>Bachman
            </h1>
            <div style={{ ...S, fontSize:9, letterSpacing:4, color:"rgba(201,168,76,.6)", textTransform:"uppercase", marginBottom:28 }}>Pen Name · Prague</div>
            <p style={{ ...G, fontSize:20, lineHeight:1.75, color:"rgba(237,232,223,.8)", fontStyle:"italic", maxWidth:520, marginBottom:28 }}>
              "Fiction that operates where myth and psychology meet the real — where the structures of power become visible through the lens of the individual soul."
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <a href="https://www.amazon.com/dp/B0G2GKK43H" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"12px 28px", border:`1px solid ${gold}`, ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:gold, textDecoration:"none", transition:"all .4s", position:"relative", overflow:"hidden" }}
                onMouseEnter={e=>{e.currentTarget.style.background=gold;e.currentTarget.style.color="#0D0F14";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=gold;}}>
                View on Amazon →
              </a>
              <a href="https://www.instagram.com/conradbachman" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"12px 20px", ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(237,232,223,.65)", textDecoration:"none", transition:"color .3s" }}
                onMouseEnter={e=>e.currentTarget.style.color=cream} onMouseLeave={e=>e.currentTarget.style.color="rgba(237,232,223,.65)"}>
                @conradbachman
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ padding:"72px 48px", maxWidth:960, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:56, marginBottom:64 }}>
          <div>
            <div style={{ width:40, height:1, background:`linear-gradient(to right,${gold},transparent)`, marginBottom:24 }} />
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"rgba(201,168,76,.7)", marginBottom:24 }}>Biography</h2>

            <p style={{ ...G, fontSize:18.5, lineHeight:1.92, color:"rgba(237,232,223,.75)", marginBottom:20 }}>
              Conrad is a writer drawn to the fault lines where history fractures, power shifts, and the inner life collides with the outer world. His work spans genres and registers, shaped by a restless engagement with depth psychology, mythology, geopolitics, and the long arc of human experience — from the intimate to the civilisational.
            </p>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.92, color:"rgba(237,232,223,.65)", marginBottom:20 }}>
              Born in South Africa and now based in Prague, Conrad writes across genres without apology — finding that the best stories refuse to be filed neatly away. What holds his work together is not form but obsession: with how people are shaped by forces larger than themselves, and how they push back.
            </p>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.92, color:"rgba(237,232,223,.55)" }}>
              When he is not writing, Conrad works in technology infrastructure, reads widely across history and analytical psychology, and wanders the older parts of Central Europe looking for places where the past has not yet finished speaking.
            </p>
          </div>

          {/* Details sidebar */}
          <div style={{ paddingTop:4 }}>
            <div style={{ width:40, height:1, background:`linear-gradient(to right,${gold},transparent)`, marginBottom:24 }} />
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"rgba(201,168,76,.7)", marginBottom:24 }}>Details</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {[
                { label:"Based", value:"Prague, Czech Republic" },
                { label:"Background", value:"South African · Polish" },
                { label:"Publisher", value:"Veles Press (Independent)" },
                { label:"Genres", value:"Dark Fantasy · Geopolitical Thriller · Historical Fiction" },
                { label:"Series", value:"6 active, 18 works in development" },
                { label:"Instagram", value:"@conradbachman", href:"https://www.instagram.com/conradbachman" },
              ].map(({label,value,href}) => (
                <div key={label}>
                  <div style={{ ...S, fontSize:8, letterSpacing:3, textTransform:"uppercase", color:"rgba(201,168,76,.55)", marginBottom:4 }}>{label}</div>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...G, fontSize:16, color:"rgba(237,232,223,.65)", textDecoration:"none", transition:"color .3s" }} onMouseEnter={e=>e.target.style.color=gold} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.65)"}>{value}</a>
                    : <div style={{ ...G, fontSize:16, color:"rgba(237,232,223,.65)", lineHeight:1.5 }}>{value}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Influences */}
        <div style={{ borderTop:"1px solid rgba(201,168,76,.08)", paddingTop:48, marginBottom:56 }}>
          <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"rgba(201,168,76,.7)", marginBottom:32 }}>Influences & Architecture</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:28 }}>
            {[
              { label:"Philosophical", items:["Thelemic philosophy","Jungian depth psychology","Hermetic tradition"] },
              { label:"Mythological", items:["Egyptian / Kemetic","Slavic / Polish heritage","Archetypal systems"] },
              { label:"Structural", items:["Dugin's Foundations of Geopolitics","Jiang Xueqin's Predictive History","Network theory"] },
              { label:"Literary", items:["Atmospheric prose","Psychological realism","Multi-POV architecture"] },
            ].map(({label,items}) => (
              <div key={label}>
                <div style={{ ...S, fontSize:8.5, letterSpacing:4, textTransform:"uppercase", color:gold, marginBottom:14 }}>{label}</div>
                {items.map(item => (
                  <div key={item} style={{ ...G, fontSize:16, color:"rgba(237,232,223,.6)", marginBottom:6, paddingLeft:12, borderLeft:"1px solid rgba(201,168,76,.2)" }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Books CTA */}
        <div style={{ borderTop:"1px solid rgba(201,168,76,.08)", paddingTop:40, display:"flex", gap:20, flexWrap:"wrap", alignItems:"center" }}>
          <Link to="/books/throne-of-ashes" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 32px", border:`1px solid ${gold}`, ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:gold, textDecoration:"none", transition:"all .4s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=gold;e.currentTarget.style.color="#0D0F14";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=gold;}}>
            Read Chapter One — Throne of Ashes →
          </Link>
          <Link to="/" style={{ ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(237,232,223,.6)", textDecoration:"none", transition:"color .3s" }}
            onMouseEnter={e=>e.currentTarget.style.color=cream} onMouseLeave={e=>e.currentTarget.style.color="rgba(237,232,223,.6)"}>
            Full Catalogue
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:"1px solid rgba(201,168,76,.08)", padding:"28px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
          <div style={{ width:26, height:26, border:`1px solid ${gold}`, display:"flex", alignItems:"center", justifyContent:"center", ...S, fontSize:12, fontWeight:700, color:gold }}>V</div>
          <div style={{ ...S, fontSize:10, letterSpacing:4, color:"rgba(237,232,223,.5)" }}>VELES PRESS</div>
        </Link>
        <div style={{ ...G, fontSize:13, color:"rgba(237,232,223,.3)", fontStyle:"italic" }}>© 2026 Veles Press. Conrad Bachman is a pen name.</div>
      </footer>
    </div>
  );
}
