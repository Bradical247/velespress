import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About — Veles Press";
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
      <section style={{ padding:"80px 48px 60px", position:"relative", overflow:"hidden", borderBottom:"1px solid rgba(201,168,76,.08)" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) rotate(-6deg)", ...S, fontSize:"18vw", fontWeight:900, color:"rgba(201,168,76,.018)", letterSpacing:5, pointerEvents:"none", userSelect:"none", whiteSpace:"nowrap" }}>VELES PRESS</div>
        <div style={{ maxWidth:860, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
            <div style={{ width:28, height:1, background:"rgba(201,168,76,.4)" }} />
            <div style={{ ...S, fontSize:9, letterSpacing:5, color:"rgba(201,168,76,.75)", textTransform:"uppercase" }}>About</div>
            <div style={{ width:28, height:1, background:"rgba(201,168,76,.4)" }} />
          </div>
          <h1 style={{ ...S, fontSize:"clamp(36px,5vw,72px)", fontWeight:900, color:cream, letterSpacing:2, textTransform:"uppercase", lineHeight:.95, marginBottom:32 }}>
            Veles Press
          </h1>
          <p style={{ ...G, fontSize:22, lineHeight:1.7, color:"rgba(237,232,223,.8)", fontStyle:"italic", maxWidth:680 }}>
            Independent publishing house. Founded in Prague, 2026. Fiction rooted in myth, psychology, and the structures of power.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding:"72px 48px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, marginBottom:64 }}>
          <div>
            <div style={{ width:40, height:1, background:`linear-gradient(to right,${gold},transparent)`, marginBottom:24 }} />
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:gold, marginBottom:20 }}>The Name</h2>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.72)", marginBottom:20 }}>
              The name is old. It belongs to whatever lives beneath the surface of things — to the part of a story that takes longest to reach, that resists easy naming, that reveals itself slowly or not at all.
            </p>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.62)" }}>
              We did not choose it for where it came from. We chose it for what it points toward.
            </p>
          </div>
          <div>
            <div style={{ width:40, height:1, background:`linear-gradient(to right,${gold},transparent)`, marginBottom:24 }} />
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:gold, marginBottom:20 }}>The Catalogue</h2>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.72)", marginBottom:20 }}>
              Six series. Three genres. Eighteen works in development. Dark fantasy set in mythologised Egypt. Geopolitical thriller drawn from the real fracture lines of the contemporary world. Historical women's fiction set across four eras of Prague.
            </p>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.62)" }}>
              Each series is architecturally complete — thematically distinct, built to stand alone, linked by a single sensibility about power, myth, and the cost of becoming who you are.
            </p>
          </div>
        </div>

        {/* Three pillars */}
        <div style={{ borderTop:"1px solid rgba(201,168,76,.08)", paddingTop:56, marginBottom:64 }}>
          <p style={{ ...G, fontSize:20, lineHeight:1.9, color:"rgba(237,232,223,.68)", fontStyle:"italic", maxWidth:640, marginBottom:28 }}>
            We do not know, when a book begins, where it will end up. We have learned not to pretend otherwise.
          </p>
          <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.55)", maxWidth:600 }}>
            What we can say is this: the work that finds its way here tends to be interested in depth over surface, in the long view over the immediate, in what a story costs rather than what it promises. It tends to trust the reader. It tends to be harder to categorise than it looks.
          </p>
        </div>

        {/* Location */}
        <div style={{ borderTop:"1px solid rgba(201,168,76,.08)", paddingTop:48, display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, marginBottom:64 }}>
          <div>
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"rgba(201,168,76,.7)", marginBottom:20 }}>Prague</h2>
            <p style={{ ...G, fontSize:18.5, lineHeight:1.9, color:"rgba(237,232,223,.68)" }}>
              The press is based in Prague — a city that has been overwritten by history so many times that its relationship to myth, power, and buried truth is architectural. It is a city where the past is not past. The right place to build something that looks below the surface.
            </p>
          </div>
          <div>
            <h2 style={{ ...S, fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"rgba(201,168,76,.7)", marginBottom:20 }}>Contact</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { label:"Press & Media", href:"mailto:press@velespress.com", text:"press@velespress.com" },
                { label:"ARC Requests", href:"mailto:press@velespress.com?subject=ARC Request", text:"press@velespress.com" },
                { label:"Submissions", href:"mailto:submissions@velespress.com", text:"submissions@velespress.com" },
              ].map(({label,href,text}) => (
                <div key={label}>
                  <div style={{ ...S, fontSize:8, letterSpacing:3, textTransform:"uppercase", color:"rgba(201,168,76,.5)", marginBottom:4 }}>{label}</div>
                  <a href={href} style={{ ...G, fontSize:16, color:"rgba(237,232,223,.65)", textDecoration:"none", transition:"color .3s" }} onMouseEnter={e=>e.target.style.color=gold} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.65)"}>{text}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ borderTop:"1px solid rgba(201,168,76,.08)", paddingTop:40, display:"flex", gap:20, flexWrap:"wrap" }}>
          <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 32px", border:`1px solid ${gold}`, ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:gold, textDecoration:"none", transition:"all .4s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e=>{e.currentTarget.style.background=gold;e.currentTarget.style.color="#0D0F14";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=gold;}}>
            Browse the Catalogue →
          </Link>
          <Link to="/authors" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 20px", ...S, fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(237,232,223,.65)", textDecoration:"none", transition:"color .3s" }}
            onMouseEnter={e=>e.currentTarget.style.color=cream} onMouseLeave={e=>e.currentTarget.style.color="rgba(237,232,223,.65)"}>
            Meet the Author
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
