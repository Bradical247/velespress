import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const THRONE_COVER = "/covers/throne-of-ashes.jpg";
const RED_LAND_COVER = "/covers/red-land.jpg";
const GATHERING_FIELD_COVER = "/covers/gathering-field.jpg";
const LUMINOUS_DARK_COVER = "/covers/luminous-dark.jpg";
const PATIENT_EMPIRES_COVER = "/covers/patient-empires.jpg";
const UNRESOLVED_VARIABLE_COVER = "/covers/unresolved-variable.jpg";
const INHERITORS_COVER = "/covers/inheritors.jpg";


const SERIES = [
  { id:"names-beneath", roman:"I",   title:"The Names Beneath",     sub:"Dark Fantasy · Four Volumes",             count:4, genre:"Dark Fantasy",          color:"#C9A84C", status:"Books I–II Available",  desc:"In a mythologised Egypt where the old gods never left, four souls carry names that do not belong to them. A sequence about divine inheritance, forbidden knowledge, and the price of claiming your true nature." },
  { id:"carved-wall",   roman:"II",  title:"The Carved Wall",       sub:"Prequel Sequence · Three Volumes",        count:3, genre:"Dark Fantasy",          color:"#A84C4C", status:"Coming 2026–2027",      desc:"Before the Names were given, the Wall was raised. Three volumes tracing the divine compact that shaped the world of The Names Beneath — told from the perspective of those who built it." },
  { id:"borrowed-name", roman:"III", title:"The Borrowed Name",     sub:"Sequel Sequence · Three Volumes",         count:3, genre:"Dark Fantasy",          color:"#7A5C8A", status:"Coming 2027–2028",      desc:"After the final reckoning, those who survived must live inside the names they earned. Three volumes of consequence, legacy, and the long work of becoming what you chose." },
  { id:"patient",       roman:"IV",  title:"The Patient Empires",   sub:"Geopolitical Thriller · Trilogy",         count:3, genre:"Geopolitical Thriller",  color:"#4C7CA8", status:"Book I Available",      desc:"Near-future geopolitical collapse seen through four intelligence operatives whose loyalties span continents and ideologies. A fiction rooted in real frameworks of power and failure." },
  { id:"water",         roman:"V",   title:"What the Water Keeps",  sub:"Standalone Psychological Thriller",       count:1, genre:"Psychological Thriller", color:"#2E7C8E", status:"Coming 2027",           desc:"A woman returns to the village where her sister drowned fifteen years ago. What the water kept, it does not easily release. A novel of memory, guilt, and the things we bury." },
  { id:"prague",        roman:"VI",  title:"The Prague Variations", sub:"Historical Women's Fiction · Four Volumes", count:4, genre:"Women's Fiction",       color:"#9C8A6E", status:"Coming 2027–2028",      desc:"Four women in four eras of Prague — the Jewish Quarter at century's turn, the Occupation, the Velvet Revolution, and after — whose stories echo across decades. Each book follows a different attachment style: anxious, avoidant, secure, fearful-avoidant." },
];

const BOOKS = [
  { id:1,  title:"Throne of Ashes",           sid:"names-beneath", series:"The Names Beneath",      num:"I",   color:"#C9A84C", status:"available",   year:2026, coverUrl: THRONE_COVER, blurb:"The first god-name has been spoken. Now the heir must learn what it costs to carry it." },
  { id:2,  title:"The Red Land",               sid:"names-beneath", series:"The Names Beneath",      num:"II",  color:"#B05050", status:"available",   year:2026, coverUrl:RED_LAND_COVER, blurb:"Beyond the Black Land lies the Red — chaos, exile, and the god who dwells there willingly." },
  { id:3,  title:"The Gathering Field",         sid:"names-beneath", series:"The Names Beneath",      num:"III", color:"#2A6C3C", status:"forthcoming", year:2026, coverUrl:GATHERING_FIELD_COVER, blurb:"The field where the dead gather has been waiting for her since birth." },
  { id:4,  title:"The Luminous Dark",           sid:"names-beneath", series:"The Names Beneath",      num:"IV",  color:"#3C4C5C", status:"forthcoming", year:2027, coverUrl:LUMINOUS_DARK_COVER, blurb:"All names return to the source. All fires return to the flame." },
  { id:5,  title:"Before the Carving",         sid:"carved-wall",   series:"The Carved Wall",        num:"I",   color:"#8A4C3C", status:"forthcoming", year:2026, blurb:"The first mark was not written. It was remembered." },
  { id:6,  title:"The First Mark",             sid:"carved-wall",   series:"The Carved Wall",        num:"II",  color:"#7A4A3A", status:"forthcoming", year:2027, blurb:"To carve is to choose. To choose is to divide the world." },
  { id:7,  title:"What the Wall Remembers",    sid:"carved-wall",   series:"The Carved Wall",        num:"III", color:"#6A4030", status:"forthcoming", year:2027, blurb:"Walls do not forget. They wait." },
  { id:8,  title:"The Weight of It",           sid:"borrowed-name", series:"The Borrowed Name",      num:"I",   color:"#7A5C8A", status:"forthcoming", year:2027, blurb:"The war is over. The names remain. Now comes the harder work." },
  { id:9,  title:"A Name That Fits",           sid:"borrowed-name", series:"The Borrowed Name",      num:"II",  color:"#6A4C7A", status:"forthcoming", year:2027, blurb:"Borrowed things never feel entirely yours." },
  { id:10, title:"The Inheritance",            sid:"borrowed-name", series:"The Borrowed Name",      num:"III", color:"#5A3C6A", status:"forthcoming", year:2028, blurb:"What you pass on is never only what you intended." },
  { id:11, title:"The Patient Empires",        sid:"patient",       series:"Patient Empires",        num:"I",   color:"#4C7CA8", status:"available",   year:2026, coverUrl:PATIENT_EMPIRES_COVER, blurb:"Four operatives. Four governments. One collapse none of them could stop — or wanted to." },
  { id:12, title:"The Unresolved Variable",    sid:"patient",       series:"Patient Empires",        num:"II",  color:"#3C6C98", status:"forthcoming", year:2026, coverUrl:UNRESOLVED_VARIABLE_COVER, blurb:"The variable no model predicted has begun to move." },
  { id:13, title:"The Inheritors",             sid:"patient",       series:"Patient Empires",        num:"III", color:"#2C5C88", status:"forthcoming", year:2027, coverUrl:INHERITORS_COVER, blurb:"What empires leave behind outlasts the men who built them." },
  { id:14, title:"What the Water Keeps",       sid:"water",         series:"Standalone",             num:null,  color:"#2E7C8E", status:"forthcoming", year:2027, blurb:"Some things are hidden for good reason. She found them anyway." },
  { id:15, title:"The Longest Silence",        sid:"prague",        series:"The Prague Variations",  num:"I",   color:"#9C8A6E", status:"forthcoming", year:2027, blurb:"Prague, 1882. A pianist who abandoned her career on one man's word must learn to trust her own perception." },
  { id:16, title:"The Beautiful Distance",     sid:"prague",        series:"The Prague Variations",  num:"II",  color:"#8C7A5E", status:"forthcoming", year:2027, blurb:"The gap she maintains, aestheticised into a way of life. Until it catches fire." },
  { id:17, title:"What Remains",               sid:"prague",        series:"The Prague Variations",  num:"III", color:"#7C6A4E", status:"forthcoming", year:2028, blurb:"After grief, after pressure, after everything that tests a love built on solid ground." },
  { id:18, title:"The Trembling Threshold",    sid:"prague",        series:"The Prague Variations",  num:"IV",  color:"#6C5A3E", status:"forthcoming", year:2028, blurb:"Always at the door, never through it — the oscillation that defines a life." },
];

const FILTERS = ["All","Dark Fantasy","Geopolitical Thriller","Psychological Thriller","Women's Fiction"];

function useInView(t=0.08){
  const ref=useRef(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});
    const el=ref.current; if(el)obs.observe(el);
    return()=>obs.disconnect();
  },[]);
  return[ref,v];
}

const fx=(v,d=0,dir="up")=>({
  opacity:v?1:0,
  transform:v?"translate(0,0)":dir==="up"?"translateY(50px)":dir==="left"?"translateX(-40px)":"translateX(40px)",
  transition:`opacity 0.9s ease ${d}s, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${d}s`,
});

function Cover({book,w=140,ht=210,floating=false}){
  const cr=Math.max(9,w*0.07);
  const cx=w/2, cy=ht*0.37;
  const radii=[w*0.33,w*0.22,w*0.1];
  return(
    <div style={{width:w,height:ht,flexShrink:0,position:"relative",overflow:"hidden",
      background:book.coverUrl?"#0D0F14":`linear-gradient(140deg,#1a1e2c 0%,#0D0F14 52%,${book.color}12 100%)`,
      border:`1px solid ${book.coverUrl?"rgba(201,168,76,0.25)":book.color+"36"}`,
      boxShadow:`-${Math.round(w*.07)}px ${Math.round(w*.07)}px ${Math.round(w*.2)}px rgba(0,0,0,.88), 0 0 ${Math.round(w*.15)}px ${book.color}12, inset 0 1px 0 rgba(255,255,255,.04)`,
      animation:floating?"float 6s ease-in-out infinite":"none"}}>

      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
      ) : (
        <>
          <div style={{position:"absolute",top:Math.max(12,ht*.04),left:cr,right:cr,height:1,background:`linear-gradient(to right,transparent,${book.color}42,transparent)`}}/>
          <div style={{position:"absolute",bottom:Math.max(12,ht*.04),left:cr,right:cr,height:1,background:`linear-gradient(to right,transparent,${book.color}42,transparent)`}}/>
          {radii.map((r,i)=>(
            <div key={i} style={{position:"absolute",top:cy-r,left:cx-r,width:r*2,height:r*2,borderRadius:"50%",
              border:`1px solid ${book.color}${["24","42","72"][i]}`,
              background:i===2?`${book.color}1e`:"transparent"}}/>
          ))}
          {book.num&&<div style={{position:"absolute",top:Math.max(18,ht*.055),left:0,right:0,textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:Math.max(6,w*.041),letterSpacing:3,color:`${book.color}52`,textTransform:"uppercase"}}>{book.num}</div>}
          <div style={{position:"absolute",bottom:Math.max(14,ht*.062),left:5,right:5,textAlign:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:Math.max(7,w*.045),fontWeight:700,color:book.color,letterSpacing:2,textTransform:"uppercase",lineHeight:1.3,marginBottom:3}}>{book.title}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:Math.max(6,w*.036),color:"rgba(237,232,223,.27)",letterSpacing:2,fontStyle:"italic"}}>Conrad Bachman</div>
          </div>
        </>
      )}

      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([vd,hd])=>(
        <div key={vd+hd} style={{position:"absolute",[vd]:8,[hd]:8,width:cr,height:cr,
          [`border${vd[0].toUpperCase()+vd.slice(1)}`]:`1px solid ${book.coverUrl?"rgba(201,168,76,0.35)":book.color+"3e"}`,
          [`border${hd[0].toUpperCase()+hd.slice(1)}`]:`1px solid ${book.coverUrl?"rgba(201,168,76,0.35)":book.color+"3e"}`}}/>
      ))}
      {book.status==="available"&&<div style={{position:"absolute",top:6,right:6,width:5,height:5,borderRadius:"50%",background:"#C9A84C",boxShadow:"0 0 6px rgba(201,168,76,.95)"}}/>}
      {!book.coverUrl&&<div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.02) 2px,rgba(0,0,0,.02) 4px)",pointerEvents:"none"}}/>}
    </div>
  );
}

function SectionLabel({children,vis,delay=0}){
  return(
    <div style={{...fx(vis,delay),display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
      <div style={{width:28,height:1,background:"rgba(201,168,76,.33)"}}/>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:5,color:"rgba(201,168,76,.62)",textTransform:"uppercase"}}>{children}</div>
      <div style={{width:28,height:1,background:"rgba(201,168,76,.33)"}}/>
    </div>
  );
}

function OrnDivider(){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"0 48px"}}>
      <div style={{flex:1,height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,.13))"}}/>
      <div style={{width:5,height:5,border:"1px solid rgba(201,168,76,.2)",transform:"rotate(45deg)"}}/>
      <div style={{width:3,height:3,background:"rgba(201,168,76,.18)",transform:"rotate(45deg)"}}/>
      <div style={{width:5,height:5,border:"1px solid rgba(201,168,76,.2)",transform:"rotate(45deg)"}}/>
      <div style={{flex:1,height:1,background:"linear-gradient(to left,transparent,rgba(201,168,76,.13))"}}/>
    </div>
  );
}

function FeaturedRelease(){
  const[ref,vis]=useInView(.07);
  const bk=BOOKS[0];
  return(
    <section ref={ref} style={{position:"relative",padding:"96px 48px 80px",borderBottom:"1px solid rgba(201,168,76,.06)",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(135deg,transparent,transparent 80px,rgba(201,168,76,.011) 80px,rgba(201,168,76,.011) 81px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",right:"22%",transform:"translateY(-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:80,flexWrap:"wrap",position:"relative"}}>
        <div style={{flex:"1 1 340px",minWidth:0}}>
          <SectionLabel vis={vis}>Featured Release · 2026</SectionLabel>
          <div style={{...fx(vis,.1),marginBottom:12,fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.48)",textTransform:"uppercase"}}>The Names Beneath · Book One</div>
          <h2 style={{...fx(vis,.18),fontFamily:"'Cinzel',serif",fontSize:"clamp(40px,5vw,72px)",fontWeight:900,lineHeight:.95,letterSpacing:2,textTransform:"uppercase",marginBottom:24}}>
            <span style={{color:"#EDE8DF",display:"block"}}>Throne</span>
            <span style={{display:"block",background:"linear-gradient(90deg,#C9A84C 0%,#F5E6B8 40%,#C9A84C 60%,#8B6914 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 4s linear infinite"}}>of Ashes</span>
          </h2>
          <div style={{...fx(vis,.26),display:"flex",alignItems:"center",gap:12,marginBottom:32,flexWrap:"wrap"}}>
            <div style={{padding:"4px 12px",border:"1px solid rgba(201,168,76,.26)",fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C"}}>Dark Fantasy</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#C9A84C",boxShadow:"0 0 7px rgba(201,168,76,.8)"}}/>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"rgba(201,168,76,.68)"}}>Available Now</span>
            </div>
          </div>
          <p style={{...fx(vis,.32),fontFamily:"'Cormorant Garamond',serif",fontSize:20,lineHeight:1.65,color:"rgba(237,232,223,.7)",fontStyle:"italic",maxWidth:480,marginBottom:16}}>"The first god-name has been spoken. Now the heir must learn what it costs to carry it."</p>
          <p style={{...fx(vis,.38),fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.85,color:"rgba(237,232,223,.4)",maxWidth:460,marginBottom:40}}>In a mythologised Egypt where the old gods never left, a young heir discovers that names are not merely words — they are debts, weapons, and living things that devour those who speak them unprepared.</p>
          <div style={{...fx(vis,.45),display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <a href="https://www.amazon.com/dp/B0G2GKK43H" target="_blank" rel="noopener noreferrer" className="cta-btn"><span>Order on Amazon</span><span style={{fontSize:12}}>→</span></a>
            <button className="cta-btn-2"><span>Read First Chapter</span></button>
          </div>
          <div style={{...fx(vis,.55),marginTop:36,display:"flex",gap:24,paddingTop:24,borderTop:"1px solid rgba(201,168,76,.07)",flexWrap:"wrap"}}>
            {[{label:"ARC Reviews Open",href:"mailto:press@velespress.com?subject=ARC Request"},{label:"Goodreads · Add to Shelf",href:"https://www.goodreads.com/search?q=throne+of+ashes+bachman"},{label:"Dark Fantasy · 2026",href:null}].map(({label,href},i)=>(
              href ? <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.35)",fontStyle:"italic",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.35)"}>{label}</a> : <div key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.25)",fontStyle:"italic"}}>{label}</div>
            ))}
          </div>
        </div>
        <div style={{...fx(vis,.12,"right"),flexShrink:0,position:"relative"}}>
          <div style={{position:"absolute",right:-44,top:-12,opacity:.25,transform:"rotate(3deg)"}}>
            <Cover book={BOOKS[1]} w={150} ht={240}/>
          </div>
          <div style={{position:"absolute",inset:-60,background:"radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 65%)",animation:"glowPulse 4s ease-in-out infinite",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <Cover book={bk} w={270} ht={432} floating={true}/>
            <div style={{position:"absolute",top:4,right:-8,width:8,height:432,background:"linear-gradient(to right,#252525,#353535)",transform:"skewY(-.5deg)"}}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCard({book,vis,delay}){
  const[hov,setHov]=useState(false);
  const hasPage = book.slug != null;
  const inner = (
    <>
      <div style={{transform:hov?"translateY(-9px)":"translateY(0)",transition:"transform .45s cubic-bezier(.16,1,.3,1)",position:"relative"}}>
        <Cover book={book} w={148} ht={237}/>
        {hov&&book.blurb&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 8px 8px",background:`linear-gradient(to top,#0D0F14 ${book.coverUrl?"80%":"55%"},transparent)`,animation:"fadeIn .25s ease"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:"rgba(237,232,223,.6)",fontStyle:"italic",lineHeight:1.5,textAlign:"center"}}>{book.blurb}</p></div>}
        {hasPage&&hov&&<div style={{position:"absolute",top:8,left:0,right:0,display:"flex",justifyContent:"center"}}><div style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,textTransform:"uppercase",color:"#C9A84C",background:"rgba(13,15,20,.85)",padding:"4px 10px",animation:"fadeIn .2s ease"}}>View Book →</div></div>}
      </div>
      <div style={{marginTop:12,paddingLeft:2}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,fontWeight:600,color:hov?"#C9A84C":"rgba(237,232,223,.7)",letterSpacing:1.5,textTransform:"uppercase",lineHeight:1.4,marginBottom:4,transition:"color .3s"}}>{book.title}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(237,232,223,.26)",fontStyle:"italic",marginBottom:6}}>{book.series}</div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:4,height:4,borderRadius:"50%",flexShrink:0,background:book.status==="available"?"#C9A84C":"rgba(237,232,223,.12)",boxShadow:book.status==="available"?"0 0 5px rgba(201,168,76,.8)":"none"}}/>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:2,textTransform:"uppercase",color:book.status==="available"?"rgba(201,168,76,.56)":"rgba(237,232,223,.18)"}}>{book.status==="available"?`Available · ${book.year}`:`Forthcoming · ${book.year}`}</span>
        </div>
      </div>
    </>
  );
  return hasPage
    ? <Link to={`/books/${book.slug}`} style={{...fx(vis,delay),display:"block",textDecoration:"none"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{inner}</Link>
    : <div style={{...fx(vis,delay),cursor:"default"}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{inner}</div>;
}

function CatalogueGrid(){
  const[ref,vis]=useInView(.04);
  const[filter,setFilter]=useState("All");
  const filtered=filter==="All"?BOOKS:BOOKS.filter(b=>b.genre===filter);
  return(
    <section ref={ref} style={{padding:"88px 48px 72px",borderBottom:"1px solid rgba(201,168,76,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Cinzel',serif",fontSize:"26vw",fontWeight:900,color:"rgba(201,168,76,.013)",letterSpacing:6,pointerEvents:"none",userSelect:"none",whiteSpace:"nowrap"}}>ARCHIVE</div>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
        <SectionLabel vis={vis}>Complete Catalogue</SectionLabel>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:12}}>
          <h2 style={{...fx(vis,.1),fontFamily:"'Cinzel',serif",fontSize:"clamp(26px,3vw,48px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase"}}>18 Works in Development</h2>
          <p style={{...fx(vis,.18),fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(237,232,223,.32)",fontStyle:"italic"}}>Six series · Three genres · One vision</p>
        </div>
        <div style={{...fx(vis,.24),display:"flex",flexWrap:"wrap",gap:0,marginBottom:44,borderBottom:"1px solid rgba(201,168,76,.07)",paddingBottom:18,marginTop:28}}>
          {FILTERS.map(g=>(
            <button key={g} onClick={()=>setFilter(g)} style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:3,textTransform:"uppercase",padding:"7px 16px",background:"transparent",border:"none",cursor:"pointer",color:filter===g?"#C9A84C":"rgba(237,232,223,.3)",borderBottom:filter===g?"1px solid #C9A84C":"1px solid transparent",transition:"all .3s",marginBottom:-1}}>{g}</button>
          ))}
          <div style={{marginLeft:"auto",fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.22)",fontStyle:"italic",alignSelf:"center"}}>{filtered.length} title{filtered.length!==1?"s":""}</div>
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
  const sbooks=BOOKS.filter(b=>b.sid===s.id).slice(0,3);
  return(
    <div ref={ref} style={{padding:"64px 48px",borderBottom:"1px solid rgba(201,168,76,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",[even?"left":"right"]:"-1%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Cinzel',serif",fontSize:"20vw",fontWeight:900,color:`${s.color}06`,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>{s.roman}</div>
      <div style={{position:"absolute",[even?"right":"left"]:"8%",top:"50%",transform:"translateY(-50%)",width:450,height:450,background:`radial-gradient(circle,${s.color}05 0%,transparent 65%)`,pointerEvents:"none"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:60,flexDirection:even?"row":"row-reverse",flexWrap:"wrap",position:"relative"}}>
        <div style={{flex:"1 1 300px",minWidth:0}}>
          <div style={{...fx(vis,0,even?"left":"right"),display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:5,color:`${s.color}68`,textTransform:"uppercase"}}>Series {s.roman}</div>
            <div style={{width:20,height:1,background:`${s.color}38`}}/>
            <div style={{padding:"3px 9px",border:`1px solid ${s.color}26`,fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,textTransform:"uppercase",color:`${s.color}78`}}>{s.genre}</div>
          </div>
          {(() => {
            const firstBook = BOOKS.find(b => b.sid === s.id && b.slug);
            return firstBook
              ? <Link to={`/books/${firstBook.slug}`} style={{textDecoration:"none",display:"block"}}>
                  <h3 style={{...fx(vis,.1,even?"left":"right"),fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.6vw,40px)",fontWeight:700,color:"#EDE8DF",letterSpacing:2,textTransform:"uppercase",lineHeight:1.1,marginBottom:8,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="#EDE8DF"}>{s.title} →</h3>
                </Link>
              : <h3 style={{...fx(vis,.1,even?"left":"right"),fontFamily:"'Cinzel',serif",fontSize:"clamp(22px,2.6vw,40px)",fontWeight:700,color:"#EDE8DF",letterSpacing:2,textTransform:"uppercase",lineHeight:1.1,marginBottom:8}}>{s.title}</h3>;
          })()}
          <div style={{...fx(vis,.16,even?"left":"right"),fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(237,232,223,.32)",fontStyle:"italic",letterSpacing:1,marginBottom:24}}>{s.sub}</div>
          <div style={{...fx(vis,.07,even?"left":"right"),width:40,height:1,background:`linear-gradient(to right,${s.color}58,transparent)`,marginBottom:24}}/>
          <p style={{...fx(vis,.2,even?"left":"right"),fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.82,color:"rgba(237,232,223,.48)",maxWidth:480,marginBottom:28}}>{s.desc}</p>
          <div style={{...fx(vis,.28,even?"left":"right"),display:"flex",alignItems:"center",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:26,fontWeight:700,color:s.color,lineHeight:1}}>{s.count}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.28)",fontStyle:"italic"}}>volume{s.count!==1?"s":""}</div>
            </div>
            <div style={{width:1,height:24,background:"rgba(201,168,76,.14)"}}/>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,textTransform:"uppercase",color:`${s.color}58`}}>{s.status}</div>
          </div>
        </div>
        <div style={{...fx(vis,.06,even?"right":"left"),flexShrink:0,display:"flex",alignItems:"flex-end",gap:10}}>
          {sbooks.map((book,bi)=>(
            book.slug
              ? <Link key={book.id} to={`/books/${book.slug}`} style={{display:"block",textDecoration:"none",transform:`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`,opacity:1-bi*.2,transition:"opacity .3s, transform .3s"}} onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform=`translateY(${bi===0?-6:bi===1?-20:-13}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`;}} onMouseLeave={e=>{e.currentTarget.style.opacity=String(1-bi*.2);e.currentTarget.style.transform=`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`;}}>
                  <Cover book={book} w={bi===0?152:122} ht={bi===0?243:195}/>
                </Link>
              : <div key={book.id} style={{transform:`translateY(${bi===0?0:bi===1?-14:-7}px) rotate(${bi===0?-1.8:bi===1?1.2:2.8}deg)`,opacity:1-bi*.2}}>
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
    <section>
      <div ref={ref} style={{padding:"72px 48px 36px",borderBottom:"1px solid rgba(201,168,76,.06)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionLabel vis={vis}>Series</SectionLabel>
          <h2 style={{...fx(vis,.1),fontFamily:"'Cinzel',serif",fontSize:"clamp(26px,3vw,48px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>Six Worlds. One Author.</h2>
          <p style={{...fx(vis,.2),fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(237,232,223,.33)",fontStyle:"italic"}}>Each series is a complete architecture — thematically distinct, built to stand alone, and linked by a single sensibility.</p>
        </div>
      </div>
      {SERIES.map((s,i)=><SeriesRow key={s.id} s={s} idx={i}/>)}
    </section>
  );
}

function About(){
  const[ref,vis]=useInView(.07);
  const[ref2,vis2]=useInView(.08);
  return(
    <section style={{borderBottom:"1px solid rgba(201,168,76,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(-8deg)",fontFamily:"'Cinzel',serif",fontSize:"16vw",fontWeight:900,color:"rgba(201,168,76,.016)",letterSpacing:5,pointerEvents:"none",userSelect:"none",whiteSpace:"nowrap"}}>VELES PRESS</div>
      <div ref={ref} style={{padding:"92px 48px 72px",position:"relative"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:80,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{...fx(vis,0,"left"),flexShrink:0}}>
            <div style={{width:108,height:108,border:"1px solid rgba(201,168,76,.22)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <div style={{width:76,height:76,border:"1px solid rgba(201,168,76,.14)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:40,fontWeight:900,color:"#C9A84C",lineHeight:1}}>V</div>
              </div>
              <div style={{position:"absolute",inset:-18,border:"1px dashed rgba(201,168,76,.07)",borderRadius:"50%"}}/>
            </div>
            <div style={{marginTop:20,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:4,color:"rgba(201,168,76,.38)",textTransform:"uppercase",textAlign:"center"}}>Est. MMXXVI<br/>Prague</div>
          </div>
          <div style={{flex:"1 1 300px"}}>
            <SectionLabel vis={vis}>About Veles Press</SectionLabel>
            <h2 style={{...fx(vis,.1),fontFamily:"'Cinzel',serif",fontSize:"clamp(26px,2.8vw,44px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase",lineHeight:1.15,marginBottom:28}}>Stories That Take<br/>The Long View</h2>
            <div style={{...fx(vis,.17),width:44,height:1,background:"linear-gradient(to right,rgba(201,168,76,.48),transparent)",marginBottom:28}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:36}}>
              <p style={{...fx(vis,.24),fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.85,color:"rgba(237,232,223,.52)"}}>Veles Press is an independent publishing house founded in Prague in 2026. We publish fiction rooted in myth, psychology, and the structures of power — work that takes the long view on what it means to be human.</p>
              <p style={{...fx(vis,.30),fontFamily:"'Cormorant Garamond',serif",fontSize:17,lineHeight:1.85,color:"rgba(237,232,223,.42)"}}>Our catalogue spans dark fantasy, geopolitical thriller, psychological fiction, and historical women's fiction. Each title is built with the same conviction: that literature is a technology for understanding the self in relation to everything it fears and reaches toward.</p>
            </div>
          </div>
        </div>
      </div>
      <OrnDivider/>
      <div ref={ref2} style={{padding:"48px 48px 88px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:1}}>
          {[
            {label:"Myth & Depth",text:"Every story at Veles Press is rooted in archetypal structures — the Egyptian divine system, the Jungian shadow, the Slavic underworld. We build from below."},
            {label:"Geopolitics & Mind",text:"The inner world and the outer world are not separate. Our fiction moves between state collapse and psychological crisis as if there were no border between them — because there is not."},
            {label:"Independent & Uncompromising",text:"We answer to the work. Founded in Prague, operating outside the major publishing centres, we are free to publish what larger houses cannot afford to believe in."},
          ].map((p,i)=>(
            <div key={i} style={{...fx(vis2,i*.1),padding:"32px 36px",borderLeft:i>0?"1px solid rgba(201,168,76,.06)":"none"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:4,color:"rgba(201,168,76,.58)",textTransform:"uppercase",marginBottom:14}}>{p.label}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16.5,lineHeight:1.85,color:"rgba(237,232,223,.4)"}}>{p.text}</p>
            </div>
          ))}
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
    <section ref={ref} style={{padding:"108px 48px",borderBottom:"1px solid rgba(201,168,76,.06)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:450,background:"radial-gradient(ellipse,rgba(201,168,76,.04) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:640,margin:"0 auto",textAlign:"center",position:"relative"}}>
        <div style={{opacity:vis?1:0,transform:vis?"scale(1)":"scale(.9)",transition:"opacity .9s ease, transform .95s cubic-bezier(.16,1,.3,1)",marginBottom:32}}>
          <svg width="60" height="60" viewBox="0 0 64 64" fill="none" style={{opacity:.65}}>
            <circle cx="32" cy="32" r="31" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".32"/>
            <circle cx="32" cy="32" r="22" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".2"/>
            <circle cx="32" cy="32" r="8" stroke="#C9A84C" strokeWidth=".8" strokeOpacity=".52"/>
            <circle cx="32" cy="32" r="3" fill="#C9A84C" fillOpacity=".68"/>
            <line x1="32" y1="1" x2="32" y2="10" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".3"/>
            <line x1="32" y1="54" x2="32" y2="63" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".3"/>
            <line x1="1" y1="32" x2="10" y2="32" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".3"/>
            <line x1="54" y1="32" x2="63" y2="32" stroke="#C9A84C" strokeWidth=".6" strokeOpacity=".3"/>
          </svg>
        </div>
        <SectionLabel vis={vis} delay={.06}>The Archive</SectionLabel>
        <h2 style={{...fx(vis,.12),fontFamily:"'Cinzel',serif",fontSize:"clamp(28px,3.2vw,50px)",fontWeight:700,color:"#EDE8DF",letterSpacing:3,textTransform:"uppercase",lineHeight:1.1,marginBottom:18}}>Enter the Archive</h2>
        <p style={{...fx(vis,.2),fontFamily:"'Cormorant Garamond',serif",fontSize:19,lineHeight:1.8,color:"rgba(237,232,223,.44)",fontStyle:"italic",marginBottom:8}}>New releases. ARCs. First chapters before publication.</p>
        <p style={{...fx(vis,.26),fontFamily:"'Cormorant Garamond',serif",fontSize:15.5,color:"rgba(237,232,223,.26)",marginBottom:44}}>No noise. Only the work, when it is ready.</p>
        {!sent?(
          <div style={{...fx(vis,.32),display:"flex",maxWidth:460,margin:"0 auto"}}>
            <input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
              style={{flex:1,padding:"15px 22px",background:"rgba(255,255,255,.024)",border:`1px solid ${foc?"rgba(201,168,76,.52)":"rgba(201,168,76,.17)"}`,borderRight:"none",color:"#EDE8DF",fontFamily:"'Cormorant Garamond',serif",fontSize:16,outline:"none",transition:"border-color .3s"}}/>
            <button onClick={()=>email&&setSent(true)} className="cta-btn" style={{borderLeft:"none",flexShrink:0}}><span>Subscribe</span></button>
          </div>
        ):(
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:"rgba(201,168,76,.78)",fontStyle:"italic"}}>The archive has noted your name.</div>
        )}
        <p style={{...fx(vis,.42),marginTop:22,fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:3,color:"rgba(237,232,223,.16)",textTransform:"uppercase"}}>Infrequent. Respectful. Always worth opening.</p>
      </div>
    </section>
  );
}

function Footer(){
  const[ref,vis]=useInView(.04);
  return(
    <footer ref={ref} style={{background:"#090B0F"}}>
      <OrnDivider/>
      <div style={{padding:"64px 48px 36px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1.8fr 1fr 1fr",gap:48,marginBottom:56}}>
          <div style={fx(vis,0)}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{width:34,height:34,border:"1px solid #C9A84C",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,color:"#C9A84C",flexShrink:0}}>V</div>
              <div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:12.5,letterSpacing:4,color:"#EDE8DF",fontWeight:600}}>VELES PRESS</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,color:"rgba(201,168,76,.42)",marginTop:2}}>INDEPENDENT PUBLISHING</div>
              </div>
            </div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15.5,lineHeight:1.85,color:"rgba(237,232,223,.33)",fontStyle:"italic",marginBottom:24,maxWidth:240}}>Stories rooted in myth, psychology, and the structures of power. Founded in Prague, 2026.</p>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:4,color:"rgba(201,168,76,.28)",textTransform:"uppercase"}}>Est. MMXXVI · Prague, CZ</div>
          </div>
          <div style={fx(vis,.08)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.48)",textTransform:"uppercase",marginBottom:22}}>Series</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SERIES.map(s=>(
                <div key={s.id}>
                  {(() => {
                    const firstBook = BOOKS.find(b => b.sid === s.id && b.slug);
                    return firstBook
                      ? <Link to={`/books/${firstBook.slug}`} style={{textDecoration:"none",display:"block",fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:1.5,color:"rgba(237,232,223,.52)",textTransform:"uppercase",marginBottom:2,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.52)"}>{s.title}</Link>
                      : <div style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:1.5,color:"rgba(237,232,223,.52)",textTransform:"uppercase",marginBottom:2}}>{s.title}</div>;
                  })()}
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(237,232,223,.2)",fontStyle:"italic"}}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={fx(vis,.14)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.48)",textTransform:"uppercase",marginBottom:22}}>Navigate</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {["Catalogue","Featured Release","Series","About","ARC Programme","Newsletter"].map(l=>(
                <div key={l} style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:2,color:"rgba(237,232,223,.38)",textTransform:"uppercase",cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.38)"}>{l}</div>
              ))}
            </div>
          </div>
          <div style={fx(vis,.2)}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:5,color:"rgba(201,168,76,.48)",textTransform:"uppercase",marginBottom:22}}>Contact</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[{label:"press@velespress.com",href:"mailto:press@velespress.com"},{label:"submissions@velespress.com",href:"mailto:submissions@velespress.com"},{label:"Instagram",href:"https://www.instagram.com/conradbachman"},{label:"Goodreads",href:"https://www.goodreads.com/search?q=conrad+bachman"},{label:"Amazon",href:"https://www.amazon.com/dp/B0G2GKK43H"},{label:"@conradbachman",href:"https://www.instagram.com/conradbachman"},].map(({label,href})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13.5,color:"rgba(237,232,223,.32)",cursor:"pointer",transition:"color .3s",textDecoration:"none",display:"block"}} onMouseEnter={e=>e.target.style.color="#C9A84C"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.32)"}>{label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(201,168,76,.06)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(237,232,223,.18)",fontStyle:"italic"}}>© 2026 Veles Press. All rights reserved. Conrad Bachman is a pen name.</div>
          <div style={{display:"flex",gap:20}}>
            {["Privacy","Terms","Rights & Permissions"].map(l=>(
              <span key={l} style={{fontFamily:"'Cinzel',serif",fontSize:7.5,letterSpacing:3,color:"rgba(237,232,223,.18)",textTransform:"uppercase",cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="rgba(201,168,76,.55)"} onMouseLeave={e=>e.target.style.color="rgba(237,232,223,.18)"}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function VelesPressBody(){
  return(
    <div style={{background:"#0D0F14",fontFamily:"'Cormorant Garamond',serif",minWidth:0}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-13px) rotate(.7deg);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes glowPulse{0%,100%{opacity:.5;}50%{opacity:1;}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        .cta-btn{display:inline-flex;align-items:center;gap:11px;padding:13px 32px;border:1px solid #C9A84C;color:#C9A84C;font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;position:relative;overflow:hidden;transition:all .4s ease;}
        .cta-btn::before{content:'';position:absolute;inset:0;background:#C9A84C;transform:translateX(-100%);transition:transform .4s ease;z-index:0;}
        .cta-btn:hover::before{transform:translateX(0);}
        .cta-btn:hover{color:#0D0F14;}
        .cta-btn span{position:relative;z-index:1;}
        .cta-btn-2{display:inline-flex;align-items:center;gap:11px;padding:13px 20px;color:rgba(237,232,223,.42);font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;border:none;transition:color .3s;}
        .cta-btn-2:hover{color:#EDE8DF;}
        ::placeholder{color:rgba(237,232,223,.2);}
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
