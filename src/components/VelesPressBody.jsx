import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BOOKS, SERIES, FILTERS } from "../data/books.js";

function useInView(t=0.08){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:t});const el=ref.current;if(el)obs.observe(el);return()=>obs.disconnect();},[]);return[ref,v];}

const fx=(v,d=0,dir="up")=>({opacity:v?1:0,transform:v?"translate(0,0)":dir==="up"?"translateY(40px)":dir==="left"?"translateX(-30px)":"translateX(30px)",transition:`opacity 0.8s ease ${d}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${d}s`});

function Cover({book,w=148,ht=237}){
  const cr=Math.max(9,w*0.07);
  const radii=[w*0.33,w*0.22,w*0.1];
  return(
    <div style={{width:w,height:ht,flexShrink:0,position:"relative",overflow:"hidden",background:book.coverUrl?"#0D0F14":`linear-gradient(140deg,#1a1e2c,#0D0F14,${book.color}14)`,border:`1px solid ${book.color}44`,boxShadow:`-${Math.round(w*.07)}px ${Math.round(w*.07)}px ${Math.round(w*.2)}px rgba(0,0,0,.88)`}}>
      {book.coverUrl
        ?<img src={book.coverUrl} alt={book.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
        :<>
          <div style={{position:"absolute",top:Math.max(12,ht*.04),left:cr,right:cr,height:1,background:`linear-gradient(to right,transparent,${book.color}44,transparent)`}}/>
          <div style={{position:"absolute",bottom:Math.max(12,ht*.04),left:cr,right:cr,height:1,background:`linear-gradient(to right,transparent,${book.color}44,transparent)`}}/>
          {radii.map((r,i)=><div key={i} style={{position:"absolute",top:ht*.37-r,left:w/2-r,width:r*2,height:r*2,borderRadius:"50%",border:`1px solid ${book.color}${["26","44","76"][i]}`,background:i===2?`${book.color}20`:"transparent"}}/>)}
          <div style={{position:"absolute",bottom:Math.max(14,ht*.065),left:5,right:5,textAlign:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:Math.max(7,w*.046),fontWeight:700,color:book.color,letterSpacing:2,textTransform:"uppercase",lineHeight:1.3,marginBottom:3}}>{book.title}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:Math.max(6,w*.036),color:"rgba(237,232,223,.4)",letterSpacing:2,fontStyle:"italic"}}>Conrad Bachman</div>
          </div>
        </>
      }
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([vd,hd])=>(
        <div key={vd+hd} style={{position:"absolute",[vd]:7,[hd]:7,width:cr,height:cr,[`border${vd[0].toUpperCase()+vd.slice(1)}`]:`1px solid ${book.color}55`,[`border${hd[0].toUpperCase()+hd.slice(1)}`]:`1px solid ${book.color}55`}}/>
      ))}
      {book.status==="available"&&<div style={{position:"absolute",top:6,right:6,width:6,height:6,borderRadius:"50%",background:"#C9A84C",boxShadow:"0 0 8px rgba(201,168,76,1)"}}/>}
    </div>
  );
}

function Label({children,vis,delay=0}){return(<div style={{...fx(vis,delay),display:"flex",alignItems:"center",gap:14,marginBottom:20}}><div style={{width:28,height:1,background:"rgba(201,168,76,.4)"}}/><div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:5,color:"rgba(201,168,76,.8)",textTransform:"uppercase"}}>{children}</div><div style={{width:28,height:1,background:"rgba(201,168,76,.4)"}}/></div>);}

function OrnDivider(){return(<div style={{display:"flex",alignItems:"center",gap:12,padding:"0 48px"}}><div style={{flex:1,height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,.2))"}}/><div style={{width:5,height:5,border:"1px solid rgba(201,168,76,.35)",transform:"rotate(45deg)"}}/><div style={{width:3,height:3,background:"rgba(201,168,76,.3)",transform:"rotate(45deg)"}}/><div style={{width:5,height:5,border:"1px solid rgba(201,168,76,.35)",transform:"rotate(45deg)"}}/><div style={{flex:1,height:1,background:"linear-gradient(to left,transparent,rgba(201,168,76,.2))"}}/></div>);}

function FeaturedRelease(){
  const[ref,vis]=useInView(.07);
  const bk=BOOKS[0];
  return(
    <section ref={ref} id="featured" style={{position:"relative",padding:"96px 48px 80px",borderBottom:"1px solid rgba(201,168,76,.08)",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",right:"22%",transform:"translateY(-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:80,flexWrap:"wrap",position:"relative"}}>
        <div style={{flex:"1 1 340px",minWidth:0}}>
          <Label vis={vis}>Featured Release · 2026</Label>
          <div style={{...fx(vis,.08),marginBottom:12,fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.7)",textTransform:"uppercase"}}>The Names Beneath · Book One</div>
          <h2 style={{...fx(vis,.16),fontFamily:"'Cinzel',serif",fontSize:"clamp(40px,5vw,72px)",fontWeight:900,lineHeight:.95,letterSpacing:2,textTransform:"uppercase",marginBottom:24}}>
            <span style={{color:"#EDE8DF",display:"block"}}>Throne</span>
            <span style={{display:"block",background:"linear-gradient(90deg,#C9A84C 0%,#F5E6B8 40%,#C9A84C 60%,#8B6914 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>of Ashes</span>
          </h2>
          <div style={{...fx(vis,.24),display:"flex",alignItems:"center",gap:12,marginBottom:32,flexWrap:"wrap"}}>
            <div style={{padding:"5px 14px",border:"1px solid rgba(201,168,76,.4)",fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C"}}>Dark Fantasy</div>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#C9A84C",boxShadow:"0 0 10px rgba(201,168,76,1)"}}/>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C"}}>Available Now</span>
            </div>
          </div>
          <p style={{...fx(vis,.30),fontFamily:"'Cormorant Garamond',serif",fontSize:21,lineHeight:1.65,color:"rgba(237,232,223,.85)",fontStyle:"italic",maxWidth:480,marginBottom:16}}>"The first god-name has been spoken. Now the heir must learn what it costs to carry it."</p>
          <p style={{...fx(vis,.36),fontFamily:"'Cormorant Garamond',serif",fontSize:17.5,lineHeight:1.85,color:"rgba(237,232,223,.65)",maxWidth:460,marginBottom:40}}>In a mythologised Egypt where the old gods never left, a temple scribe who can read the hidden names beneath human skin discovers that the most dangerous name he has ever refused to look at belongs to his own brother.</p>
          <div style={{...fx(vis,.43),display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
            <a href={bk.amazonUrl} target="_blank" rel="noopener noreferrer" className="cta-btn"><span>Order on Amazon</span><span style={{fontSize:12}}>→</span></a>
            <Link to="/books/throne-of-ashes" className="cta-btn-2"><span>Read Chapter One</span></Link>
          </div>
          <div style={{...fx(vis,.52),marginTop:36,display:"flex",gap:24,paddingTop:24,borderTop:"1px solid rgba(201,168,76,.1)",flexWrap:"wrap"}}>
            {[{label:"ARC Reviews Open",href:"mailto:press@velespress.com?subject=ARC Request"},{label:"Goodreads · Add to Shelf",href:"https://www.goodreads.com/search?q=throne+of+ashes+bachman"},{label:"Dark Fantasy · 2026",href:null}].map(({label,href},i)=>
              href?<a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13.5,color:"rgba(201,168,76,.75)",fontStyle:"italic",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(201,168,76,.75)"}>{label}</a>
              :<div key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13.5,color:"rgba(237,232,223,.45)",fontStyle:"italic"}}>{label}</div>
            )}
          </div>
        </div>
        <div style={{...fx(vis,.1,"right"),flexShrink:0,position:"relative"}}>
          <div style={{position:"absolute",right:-44,top:-12,opacity:.28,transform:"rotate(3deg)"}}><Cover book={BOOKS[1]} w={150} ht={240}/></div>
          <div style={{position:"absolute",inset:-60,background:"radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 65%)",animation:"glowPulse 4s ease-in-out infinite",pointerEvents:"none"}}/>
          <Link to="/books/throne-of-ashes" style={{display:"block",position:"relative"}}>
            <Cover book={bk} w={270} ht={432}/>
            <div style={{position:"absolute",top:4,right:-8,width:8,height:432,background:"linear-gradient(to right,#252525,#353535)",transform:"skewY(-.5deg)"}}/>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BookCard({book,vis,delay}){
  const[hov,setHov]=useState(false);
  const hasPage=book.slug!=null;
  const inner=(
    <>
      <div style={{transform:hov?"translateY(-9px)":"translateY(0)",transition:"transform .4s cubic-bezier(.16,1,.3,1)",position:"relative"}}>
        <Cover book={book} w={148} ht={237}/>
        {hov&&book.blurb&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 8px 10px",background:`linear-gradient(to top,#0D0F14 ${book.coverUrl?"85%":"60%"},transparent)`,animation:"fadeIn .2s ease"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11.5,color:"rgba(237,232,223,.75)",fontStyle:"italic",lineHeight:1.5,textAlign:"center"}}>{book.blurb}</p></div>}
        {hasPage&&hov&&<div style={{position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"center",paddingTop:10,animation:"fadeIn .2s ease"}}><div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C",background:"rgba(13,15,20,.9)",padding:"5px 12px",border:"1px solid rgba(201,168,76,.35)"}}>View Book →</div></div>}
      </div>
      <div style={{marginTop:12,paddingLeft:2}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,fontWeight:600,color:hov?"#C9A84C":"rgba(237,232,223,.85)",letterSpacing:1.5,textTransform:"uppercase",lineHeight:1.4,marginBottom:4,transition:"color .3s"}}>{book.title}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12.5,color:"rgba(237,232,223,.5)",fontStyle:"italic",marginBottom:6}}>{book.series}</div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:5,height:5,borderRadius:"50%",flexShrink:0,background:book.status==="available"?"#C9A84C":"rgba(237,232,223,.2)",boxShadow:book.status==="available"?"0 0 7px rgba(201,168,76,.9)":"none"}}/>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:2,textTransform:"uppercase",color:book.status==="available"?"#C9A84C":"rgba(237,232,223,.38)"}}>{book.status==="available"?`Available · ${book.year}`:`Forthcoming · ${book.year}`}</span>
        </div>
      </div>
    </>
  );
  return hasPage
    ?<Link to={`/books/${book.slug}`} style={{...fx(vis,delay),display:"block",textDecoration:"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{inner}</Link>
    :<div style={{...fx(vis,delay)}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{inner}</div>;
}

function CatalogueGrid(){
  const[ref,vis]=useInView(.04);
  const[filter,setFilter]=useState("All");
  const filtered=filter==="All"?BOOKS:BOOKS.filter(b=>b.genre===filter);
  return(
    <section ref={ref} id="catalogue" style={{padding:"80px 48px 72px",borderBottom:"1px solid rgba(201,168,76,.08)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Label vis={vis}>Catalogue</Label>
        <div style={{...fx(vis,.08),display:"flex",flexWrap:"wrap",gap:0,marginBottom:40,borderBottom:"1px solid rgba(201,168,76,.1)",paddingBottom:16,marginTop:12}}>
          {FILTERS.map(g=>(
            <button key={g} onClick={()=>setFilter(g)} style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:3,textTransform:"uppercase",padding:"7px 18px",background:"transparent",border:"none",cursor:"pointer",color:filter===g?"#C9A84C":"rgba(237,232,223,.55)",borderBottom:filter===g?"2px solid #C9A84C":"2px solid transparent",transition:"all .3s",marginBottom:-2}}>{g}</button>
          ))}
          <div style={{marginLeft:"auto",fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(237,232,223,.45)",fontStyle:"italic",alignSelf:"center"}}>{filtered.length} titles</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:"36px 24px"}}>
          {filtered.map((book,i)=><BookCard key={book.id} book={book} vis={vis} delay={0.04+(i%8)*.04}/>)}
        </div>
      </div>
    </section>
  );
}

function SeriesRow({s,idx}){
  const[ref,vis]=useInView(.1);
  const even=idx%2===0;
  const sbooks=BOOKS.filter(b=>b.seriesId===s.id).slice(0,3);
  const firstBook=BOOKS.find(b=>b.seriesId===s.id&&b.slug);
  return(
    <div ref={ref} style={{padding:"64px 48px",borderBottom:"1px solid rgba(201,168,76,.08)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",[even?"left":"right"]:"-1%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Cinzel',serif",fontSize:"20vw",fontWeight:900,color:`${s.color}07`,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>{s.roman}</div>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:60,flexDirection:even?"row":"row-reverse",flexWrap:"wrap",position:"relative"}}>
        <div style={{flex:"1 1 300px",minWidth:0}}>
          <div style={{...fx(vis,0,even?"left":"right"),display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:5,color:s.color,textTransform:"uppercase"}}>Series {s.roman}</span>
            <div style={{width:20,height:1,background:`${s.color}50`}}/>
            <div style={{padding:"3px 10px",border:`1px solid ${s.color}50`,fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,textTransform:"uppercase",color:s.color}}>{s.genre}</div>
          </div>
          {firstBook
            ?<Link to={`/books/${firstBook.slug}`} style={{textDecoration:"none",display:"block"}}>
               <h3 style={{...fx(vis,.08,even?"left":"right"),fontFamily:"'Cinzel',serif",fontSize:"clamp(24px,2.8vw,44px)",fontWeight:700,color:"#EDE8DF",letterSpacing:2,textTransform:"uppercase",lineHeight:1.1,marginBottom:8,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="#EDE8DF"}>{s.title} <span style={{color:"#C9A84C",fontSize:"0.65em"}}>→</span></h3>
             </Link>
            :<h3 style={{...fx(vis,.08,even?"left":"right"),fontFamily:"'Cinzel',serif",fontSize:"clamp(24px,2.8vw,44px)",fontWeight:700,color:"#EDE8DF",letterSpacing:2,textTransform:"uppercase",lineHeight:1.1,marginBottom:8}}>{s.title}</h3>
          }
          <div style={{...fx(vis,.14,even?"left":"right"),fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"rgba(237,232,223,.6)",fontStyle:"italic",marginBottom:20}}>{s.sub}</div>
          <div style={{...fx(vis,.06,even?"left":"right"),width:40,height:1,background:`linear-gradient(to right,${s.color},transparent)`,marginBottom:20}}/>
          <p style={{...fx(vis,.2,even?"left":"right"),fontFamily:"'Cormorant Garamond',serif",fontSize:17.5,lineHeight:1.82,color:"rgba(237,232,223,.7)",maxWidth:480,marginBottom:28}}>{s.desc}</p>
          <div style={{...fx(vis,.28,even?"left":"right"),display:"flex",alignItems:"center",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:700,color:s.color,lineHeight:1}}>{s.count}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(237,232,223,.5)",fontStyle:"italic"}}>volume{s.count!==1?"s":""}</div>
            </div>
            <div style={{width:1,height:28,background:"rgba(201,168,76,.2)"}}/>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:s.color,textShadow:`0 0 12px ${s.color}80`}}>{s.status}</div>
          </div>
        </div>
        <div style={{...fx(vis,.06,even?"right":"left"),flexShrink:0,display:"flex",alignItems:"flex-end",gap:10}}>
          {sbooks.map((book,bi)=>(
            book.slug
              ?<Link key={book.id} to={`/books/${book.slug}`} style={{display:"block",textDecoration:"none",transform:`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`,opacity:1-bi*.15,transition:"transform .4s,opacity .4s"}} onMouseEnter={e=>{e.currentTarget.style.transform=`translateY(${bi===0?-8:bi===1?-22:-15}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`;e.currentTarget.style.opacity="1";}} onMouseLeave={e=>{e.currentTarget.style.transform=`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`;e.currentTarget.style.opacity=String(1-bi*.15);}}>
                <Cover book={book} w={bi===0?152:122} ht={bi===0?243:195}/>
              </Link>
              :<div key={book.id} style={{transform:`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`,opacity:1-bi*.15}}>
                <Cover book={book} w={bi===0?152:122} ht={bi===0?243:195}/>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeriesOverview(){
  const[ref,vis]=useInView(.04);
  return(
    <section id="series">
      <div ref={ref} style={{padding:"56px 48px 24px",borderBottom:"1px solid rgba(201,168,76,.08)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}><Label vis={vis}>Series</Label></div>
      </div>
      {SERIES.map((s,i)=><SeriesRow key={s.id} s={s} idx={i}/>)}
    </section>
  );
}

function About(){
  const[ref,vis]=useInView(.08);
  return(
    <section id="about" style={{borderBottom:"1px solid rgba(201,168,76,.08)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-8deg)",fontFamily:"'Cinzel',serif",fontSize:"16vw",fontWeight:900,color:"rgba(201,168,76,.018)",letterSpacing:5,pointerEvents:"none",userSelect:"none",whiteSpace:"nowrap"}}>VELES PRESS</div>
      <div ref={ref} style={{padding:"80px 48px",position:"relative"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:72,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{...fx(vis,0,"left"),flexShrink:0}}>
            <div style={{width:96,height:96,border:"1px solid rgba(201,168,76,.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <div style={{width:66,height:66,border:"1px solid rgba(201,168,76,.2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:34,fontWeight:900,color:"#C9A84C",lineHeight:1}}>V</div>
              </div>
              <div style={{position:"absolute",inset:-16,border:"1px dashed rgba(201,168,76,.1)",borderRadius:"50%"}}/>
            </div>
            <div style={{marginTop:18,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:4,color:"rgba(201,168,76,.5)",textTransform:"uppercase",textAlign:"center"}}>Est. MMXXVI<br/>Prague</div>
          </div>
          <div style={{flex:"1 1 300px"}}>
            <Label vis={vis}>About</Label>
            <h2 style={{...fx(vis,.1),fontFamily:"'Cinzel',serif",fontSize:"clamp(24px,2.6vw,40px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase",lineHeight:1.15,marginBottom:22}}>Veles Press</h2>
            <div style={{...fx(vis,.15),width:40,height:1,background:"linear-gradient(to right,rgba(201,168,76,.6),transparent)",marginBottom:22}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28}}>
              <p style={{...fx(vis,.2),fontFamily:"'Cormorant Garamond',serif",fontSize:17.5,lineHeight:1.85,color:"rgba(237,232,223,.72)"}}>Independent publishing house founded in Prague in 2026. Fiction rooted in myth, psychology, and the structures of power — work that takes the long view on what it means to be human.</p>
              <p style={{...fx(vis,.26),fontFamily:"'Cormorant Garamond',serif",fontSize:17.5,lineHeight:1.85,color:"rgba(237,232,223,.62)"}}>Six series. Three genres. One sustained conviction: that literature is a technology for understanding the self in relation to everything it fears and reaches toward.</p>
            </div>
            <div style={{...fx(vis,.34),marginTop:28}}>
              <Link to="/about" style={{display:"inline-flex",alignItems:"center",gap:10,fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C",textDecoration:"none",transition:"opacity .3s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Read More About Veles Press →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <OrnDivider/>
      <div style={{padding:"36px 48px 72px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
          {[{label:"Myth & Depth",text:"Every story is rooted in archetypal structures — the Egyptian divine system, the Jungian shadow, the Slavic underworld. We build from below."},{label:"Geopolitics & Mind",text:"The inner world and the outer world are not separate. Our fiction moves between state collapse and psychological crisis as if there were no border between them."},{label:"Independent",text:"We answer to the work. Founded in Prague, outside the major publishing centres, free to publish what larger houses cannot afford to believe in."}].map((p,i)=>{
            const[r2,v2]=useInView(.1);
            return(<div key={i} ref={r2} style={{...fx(v2,i*.1),padding:"28px 32px",borderLeft:i>0?"1px solid rgba(201,168,76,.08)":"none"}}><div style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:4,color:"#C9A84C",textTransform:"uppercase",marginBottom:14}}>{p.label}</div><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.85,color:"rgba(237,232,223,.65)"}}>{p.text}</p></div>);
          })}
        </div>
      </div>
    </section>
  );
}

function Newsletter(){
  const[ref,vis]=useInView(.08);
  const[email,setEmail]=useState("");
  const[sent,setSent]=useState(false);
  const[foc,setFoc]=useState(false);
  return(
    <section ref={ref} id="newsletter" style={{padding:"100px 48px",borderBottom:"1px solid rgba(201,168,76,.08)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:450,background:"radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:580,margin:"0 auto",textAlign:"center",position:"relative"}}>
        <div style={{opacity:vis?1:0,transform:vis?"scale(1)":"scale(.9)",transition:"opacity .9s ease,transform .95s cubic-bezier(.16,1,.3,1)",marginBottom:28}}>
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" style={{opacity:.8}}>
            <circle cx="32" cy="32" r="31" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".55"/>
            <circle cx="32" cy="32" r="22" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".35"/>
            <circle cx="32" cy="32" r="8" stroke="#C9A84C" strokeWidth="1" strokeOpacity=".75"/>
            <circle cx="32" cy="32" r="3" fill="#C9A84C" fillOpacity=".95"/>
            <line x1="32" y1="1" x2="32" y2="10" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".55"/>
            <line x1="32" y1="54" x2="32" y2="63" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".55"/>
            <line x1="1" y1="32" x2="10" y2="32" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".55"/>
            <line x1="54" y1="32" x2="63" y2="32" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".55"/>
          </svg>
        </div>
        <Label vis={vis} delay={.06}>The Archive</Label>
        <h2 style={{...fx(vis,.12),fontFamily:"'Cinzel',serif",fontSize:"clamp(26px,3vw,46px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase",lineHeight:1.1,marginBottom:16}}>Enter the Archive</h2>
        <p style={{...fx(vis,.2),fontFamily:"'Cormorant Garamond',serif",fontSize:19,lineHeight:1.8,color:"rgba(237,232,223,.7)",fontStyle:"italic",marginBottom:6}}>New releases. ARCs. First chapters before publication.</p>
        <p style={{...fx(vis,.26),fontFamily:"'Cormorant Garamond',serif",fontSize:15.5,color:"rgba(237,232,223,.5)",marginBottom:40}}>No noise. Only the work, when it is ready.</p>
        {!sent?(
          <div style={{...fx(vis,.32),display:"flex",maxWidth:430,margin:"0 auto"}}>
            <input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} style={{flex:1,padding:"14px 20px",background:"rgba(255,255,255,.03)",border:`1px solid ${foc?"rgba(201,168,76,.6)":"rgba(201,168,76,.28)"}`,borderRight:"none",color:"#EDE8DF",fontFamily:"'Cormorant Garamond',serif",fontSize:16,outline:"none",transition:"border-color .3s"}}/>
            <button onClick={()=>email&&setSent(true)} className="cta-btn" style={{borderLeft:"none",flexShrink:0}}><span>Subscribe</span></button>
          </div>
        ):(
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:"#C9A84C",fontStyle:"italic"}}>The archive has noted your name.</div>
        )}
        <p style={{...fx(vis,.42),marginTop:20,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,color:"rgba(237,232,223,.3)",textTransform:"uppercase"}}>Infrequent. Respectful. Always worth opening.</p>
      </div>
    </section>
  );
}

function Footer(){
  const[ref,vis]=useInView(.04);
  return(
    <footer ref={ref} style={{background:"#090B0F"}}>
      <OrnDivider/>
      <div style={{padding:"60px 48px 36px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1.8fr 1fr 1fr",gap:48,marginBottom:52,flexWrap:"wrap"}}>
          <div style={fx(vis,0)}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
              <div style={{width:32,height:32,border:"1px solid #C9A84C",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:"#C9A84C",flexShrink:0}}>V</div>
              <div><div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:4,color:"#EDE8DF",fontWeight:600}}>VELES PRESS</div><div style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,color:"rgba(201,168,76,.55)",marginTop:2}}>INDEPENDENT PUBLISHING</div></div>
            </div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15.5,lineHeight:1.85,color:"rgba(237,232,223,.55)",fontStyle:"italic",marginBottom:20,maxWidth:230}}>Fiction rooted in myth, psychology, and the structures of power. Founded in Prague, 2026.</p>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:4,color:"rgba(201,168,76,.45)",textTransform:"uppercase"}}>Est. MMXXVI · Prague, CZ</div>
          </div>
          <div style={fx(vis,.08)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.65)",textTransform:"uppercase",marginBottom:20}}>Series</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SERIES.map(s=>{
                const fb=BOOKS.find(b=>b.seriesId===s.id&&b.slug);
                return(<div key={s.id}>{fb?<Link to={`/books/${fb.slug}`} style={{textDecoration:"none",display:"block",fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:1.5,color:"rgba(237,232,223,.72)",textTransform:"uppercase",marginBottom:2,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.72)"}>{s.title}</Link>:<div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:1.5,color:"rgba(237,232,223,.45)",textTransform:"uppercase",marginBottom:2}}>{s.title}</div>}<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(237,232,223,.35)",fontStyle:"italic"}}>{s.sub}</div></div>);
              })}
            </div>
          </div>
          <div style={fx(vis,.14)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.65)",textTransform:"uppercase",marginBottom:20}}>Navigate</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[{label:"Catalogue",to:"/#catalogue"},{label:"Series",to:"/#series"},{label:"About",to:"/about"},{label:"Authors",to:"/authors"},{label:"ARC Programme",href:"mailto:press@velespress.com?subject=ARC Request"},{label:"Newsletter",to:"/#newsletter"}].map(({label,to,href})=>
                to?<Link key={label} to={to} style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:2,color:"rgba(237,232,223,.6)",textTransform:"uppercase",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.6)"}>{label}</Link>
                :<a key={label} href={href} style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:2,color:"rgba(237,232,223,.6)",textTransform:"uppercase",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.6)"}>{label}</a>
              )}
            </div>
          </div>
          <div style={fx(vis,.2)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.65)",textTransform:"uppercase",marginBottom:20}}>Contact</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[{label:"press@velespress.com",href:"mailto:press@velespress.com"},{label:"submissions@velespress.com",href:"mailto:submissions@velespress.com"},{label:"Instagram",href:"https://www.instagram.com/conradbachman"},{label:"Goodreads",href:"https://www.goodreads.com/search?q=conrad+bachman"},{label:"Amazon",href:"https://www.amazon.com/dp/B0G2GKK43H"}].map(({label,href})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(237,232,223,.55)",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.55)"}>{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(201,168,76,.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.35)",fontStyle:"italic"}}>© 2026 Veles Press. Conrad Bachman is a pen name.</div>
          <div style={{display:"flex",gap:20}}>
            {["Privacy","Terms","Rights & Permissions"].map(l=>(
              <span key={l} style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,color:"rgba(237,232,223,.3)",textTransform:"uppercase",cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="rgba(201,168,76,.65)"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.3)"}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function VelesPressBody(){
  return(
    <div style={{background:"#0D0F14",fontFamily:"'Cormorant Garamond',serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes glowPulse{0%,100%{opacity:.5;}50%{opacity:1;}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        .cta-btn{display:inline-flex;align-items:center;gap:10px;padding:13px 32px;border:1px solid #C9A84C;color:#C9A84C;font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;position:relative;overflow:hidden;transition:all .4s;text-decoration:none;}
        .cta-btn::before{content:'';position:absolute;inset:0;background:#C9A84C;transform:translateX(-100%);transition:transform .4s;z-index:0;}
        .cta-btn:hover::before{transform:translateX(0);}
        .cta-btn:hover{color:#0D0F14;}
        .cta-btn span{position:relative;z-index:1;}
        .cta-btn-2{display:inline-flex;align-items:center;gap:10px;padding:13px 20px;color:rgba(237,232,223,.7);font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;border:none;transition:color .3s;text-decoration:none;}
        .cta-btn-2:hover{color:#EDE8DF;}
        ::placeholder{color:rgba(237,232,223,.3);}
        input{caret-color:#C9A84C;}
      `}</style>
      <FeaturedRelease/>
      <CatalogueGrid/>
      <SeriesOverview/>
      <About/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}
