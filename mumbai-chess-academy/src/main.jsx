import React, { Suspense, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Html, OrbitControls } from '@react-three/drei';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Clock3, Crown, GraduationCap, Menu, MoveUpRight, Sparkles, Target, Trophy, X } from 'lucide-react';
import './styles.css';

const WHATSAPP = 'https://wa.me/917039192057';
const phone = '+91 70391 92057';
const academyImages = {
  founder: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-15-at-5.32.54-PM-1-768x1024.jpeg',
  sarvesh: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-15-at-5.32.54-PM-2-768x1024.jpeg',
  aniket: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-15-at-5.32.54-PM-768x1024.jpeg',
  tournament: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-17-at-11.43.28-PM-1024x768.jpeg',
  winners: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-17-at-11.45.05-PM-1024x768.jpeg',
  event: 'https://mumbaichessacademy.in/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-17-at-11.43.29-PM.jpeg'
};

function Piece({ type, color, position, onHover, active }) {
  const material = color === 'white' ? '#f3ead7' : '#25352b';
  const edge = color === 'white' ? '#b8a98b' : '#72806c';
  const common = { color: material, roughness: 0.27, metalness: 0.18 };
  const trim = { color: edge, roughness: 0.35, metalness: 0.24 };
  const scale = active ? 1.09 : 1;
  return <group position={position} scale={scale} onPointerOver={(e) => { e.stopPropagation(); onHover(type, color); }} onPointerOut={(e) => { e.stopPropagation(); onHover(null, null); }}>
    <mesh position={[0, .09, 0]} castShadow receiveShadow><cylinderGeometry args={[.29, .32, .14, 32]} /><meshStandardMaterial {...trim} /></mesh>
    <mesh position={[0, .19, 0]} castShadow><cylinderGeometry args={[.22, .28, .1, 32]} /><meshStandardMaterial {...common} /></mesh>
    {type === 'pawn' && <><mesh position={[0,.38,0]} castShadow><cylinderGeometry args={[.11,.2,.28,24]} /><meshStandardMaterial {...common}/></mesh><mesh position={[0,.59,0]} castShadow><sphereGeometry args={[.15,24,24]}/><meshStandardMaterial {...common}/></mesh></>}
    {type === 'rook' && <><mesh position={[0,.4,0]} castShadow><cylinderGeometry args={[.18,.23,.34,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.62,0]} castShadow><cylinderGeometry args={[.22,.22,.12,24]}/><meshStandardMaterial {...trim}/></mesh>{[-.13,0,.13].map((x)=><mesh key={x} position={[x,.72,0]} castShadow><boxGeometry args={[.07,.12,.12]}/><meshStandardMaterial {...common}/></mesh>)}</>}
    {type === 'knight' && <><mesh position={[0,.4,0]} castShadow><cylinderGeometry args={[.13,.21,.28,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.61,0]} rotation={[0,0,-.25]} castShadow><coneGeometry args={[.17,.37,4]}/><meshStandardMaterial {...common}/></mesh><mesh position={[.06,.74,.02]} castShadow><sphereGeometry args={[.08,16,16]}/><meshStandardMaterial {...trim}/></mesh></>}
    {type === 'bishop' && <><mesh position={[0,.4,0]} castShadow><cylinderGeometry args={[.13,.22,.3,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.65,0]} castShadow><sphereGeometry args={[.16,24,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.82,0]} castShadow><coneGeometry args={[.1,.18,24]}/><meshStandardMaterial {...trim}/></mesh></>}
    {type === 'queen' && <><mesh position={[0,.43,0]} castShadow><cylinderGeometry args={[.14,.23,.4,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.7,0]} castShadow><sphereGeometry args={[.17,24,24]}/><meshStandardMaterial {...common}/></mesh>{[0,1,2,3,4].map((n)=><mesh key={n} position={[Math.cos(n*Math.PI*2/5)*.17,.83,Math.sin(n*Math.PI*2/5)*.17]} castShadow><sphereGeometry args={[.055,12,12]}/><meshStandardMaterial {...trim}/></mesh>)}</>}
    {type === 'king' && <><mesh position={[0,.43,0]} castShadow><cylinderGeometry args={[.15,.24,.4,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.7,0]} castShadow><sphereGeometry args={[.17,24,24]}/><meshStandardMaterial {...common}/></mesh><mesh position={[0,.91,0]} castShadow><boxGeometry args={[.07,.28,.07]}/><meshStandardMaterial {...trim}/></mesh><mesh position={[0,.91,0]} castShadow><boxGeometry args={[.22,.07,.07]}/><meshStandardMaterial {...trim}/></mesh></>}
    {active && <pointLight position={[0, .7, 0]} intensity={1.3} color="#d7ed9b" distance={1.8}/>}
  </group>;
}

function ChessScene() {
  const [hovered, setHovered] = useState(null);
  const pieces = useMemo(() => {
    const out = [];
    const back = ['rook','knight','bishop','queen','king','bishop','knight','rook'];
    for (let i=0;i<8;i++) { out.push({type:back[i],color:'black',x:i,z:-3.5}); out.push({type:'pawn',color:'black',x:i,z:-2.5}); out.push({type:'pawn',color:'white',x:i,z:2.5}); out.push({type:back[i],color:'white',x:i,z:3.5}); }
    return out;
  }, []);
  return <Canvas shadows camera={{ position: [8, 8.8, 10], fov: 35 }} dpr={[1,1.7]}>
    <color attach="background" args={['#101512']} />
    <ambientLight intensity={1.35}/><directionalLight position={[4,9,4]} intensity={3.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
    <Suspense fallback={<Html center><span className="loading">Setting the board…</span></Html>}>
      <Float speed={1} rotationIntensity={0.025} floatIntensity={0.12}>
        <group rotation={[0, -0.12, 0]}>
          <mesh position={[0,-.12,0]} receiveShadow castShadow><boxGeometry args={[8.65,.35,8.65]}/><meshStandardMaterial color="#3b473c" roughness={.3} metalness={.15}/></mesh>
          {Array.from({length:8},(_,z)=>Array.from({length:8},(_,x)=>{
            const isLight=(x+z)%2===0; const isHover=hovered?.square===`${x}-${z}`;
            return <mesh key={`${x}-${z}`} position={[x-3.5,.065,z-3.5]} receiveShadow onPointerOver={(e)=>{e.stopPropagation();setHovered({square:`${x}-${z}`,type:null,color:null});}} onPointerOut={()=>setHovered(null)}>
              <boxGeometry args={[.99,.08,.99]}/><meshStandardMaterial color={isHover?'#c9e77b':(isLight?'#d9cfb6':'#344638')} emissive={isHover?'#7b9b3d':'#000000'} emissiveIntensity={isHover?.45:0} roughness={.32}/>
            </mesh>;
          }))}
          {pieces.map((p,i)=><Piece key={i} {...p} position={[p.x-3.5,.1,p.z]} active={hovered?.type===p.type&&hovered?.color===p.color} onHover={(type,color)=>setHovered(type?{type,color}:null)}/>)}
        </group>
      </Float>
      <ContactShadows position={[0,-.32,0]} opacity={.45} scale={13} blur={2.5} far={4}/>
      <Environment preset="city"/>
    </Suspense>
    <OrbitControls enablePan={false} minDistance={9} maxDistance={17} minPolarAngle={.45} maxPolarAngle={1.35} autoRotate autoRotateSpeed={.25}/>
  </Canvas>;
}

const programs = [
  {num:'01',icon:GraduationCap,title:'Beginner foundations',level:'START HERE',desc:'Learn the rules, piece movement, checkmate and your first winning ideas — one move at a time.'},
  {num:'02',icon:Target,title:'Intermediate coaching',level:'LEVEL UP',desc:'Build tactical awareness, opening principles, positional thinking and a stronger game plan.'},
  {num:'03',icon:Trophy,title:'Tournament preparation',level:'COMPETE',desc:'Practice calculation, endgames, time management and game analysis with a competitive mindset.'},
  {num:'04',icon:Sparkles,title:'Online & society classes',level:'LEARN YOUR WAY',desc:'Live coaching from home or group sessions in your society, with flexible learning options.'},
];

function App() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [faq,setFaq]=useState(0);
  const [level,setLevel]=useState('Beginner');
  const [age,setAge]=useState('Child (under 18)');
  const [mode,setMode]=useState('Online');
  const [name,setName]=useState('');
  const [sent,setSent]=useState(false);
  const waText = encodeURIComponent(`Hi Mumbai Chess Academy! I'd like to enquire about a free trial class. Name: ${name || 'Not provided'}; Level: ${level}; Student: ${age}; Preferred mode: ${mode}.`);
  const faqs=[['Who can join the classes?','Children and adults can start at beginner level, or join intermediate and advanced coaching if they already know the basics.'],['Are online classes available?','Yes. The academy offers live online coaching as well as offline and society-based classes in Mumbai.'],['Can I try a class before enrolling?','The academy advertises a free trial. Contact the team to confirm the available slot and format.']];
  return <div className="site-shell">
    <div className="announcement"><span className="pulse-dot"/> BUILD YOUR NEXT MOVE <span className="announcement-divider">/</span> FREE TRIAL CLASS ENQUIRIES OPEN <ArrowRight size={13}/></div>
    <header className="navbar">
      <a className="brand" href="#home" aria-label="Mumbai Chess Academy home"><span className="brand-mark">♞</span><span>MUMBAI CHESS ACADEMY<small>THINK · LEARN · PLAY</small></span></a>
      <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button>
      <nav className={menuOpen?'nav-links open':'nav-links'}><a href="#programs" onClick={()=>setMenuOpen(false)}>Programs</a><a href="#approach" onClick={()=>setMenuOpen(false)}>Our approach</a><a href="#coaches" onClick={()=>setMenuOpen(false)}>Our coaches</a><a href="#gallery" onClick={()=>setMenuOpen(false)}>Gallery</a><a href="#faq" onClick={()=>setMenuOpen(false)}>FAQs</a><a className="nav-cta" href="#trial" onClick={()=>setMenuOpen(false)}>Book a free trial <MoveUpRight size={15}/></a></nav>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> THE BOARD IS YOURS</div><h1>Every great mind<br/>makes a <em>move.</em></h1><p className="hero-sub">More than a game. A way to think ahead, stay curious, and grow with every move.</p><div className="hero-actions"><a className="button button-lime" href="#trial">Find your first move <ArrowRight size={17}/></a><a className="text-link" href="#programs">Explore our programs <ArrowDownRight size={17}/></a></div><div className="hero-proof"><div className="proof-stars">★★★★★ <span>4.8/5</span></div><div className="proof-caption">Google rating shown on the academy website</div></div><div className="hero-index"><span>01</span><span className="index-line"/><span>THE JOURNEY STARTS HERE</span></div></div>
        <div className="hero-visual"><div className="visual-topline"><span>THE CLASSIC GAME</span><span>64 SQUARES · INFINITE POSSIBILITIES</span></div><div className="board-frame"><ChessScene/><div className="board-caption"><span className="live-dot"/> INTERACTIVE BOARD <span>MOVE YOUR CURSOR TO EXPLORE</span></div></div><div className="floating-note"><span className="note-icon">♟</span><span><b>Think one move ahead.</b><small>Every move is a new possibility.</small></span></div><div className="visual-coordinates">A—H&nbsp;&nbsp; / &nbsp;&nbsp;1—8</div></div>
        <div className="hero-bottom"><span>COACHING FOR EVERY LEVEL</span><span>ONLINE & OFFLINE · MUMBAI</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="marquee" aria-label="Academy values"><div>THINK CLEARLY <span>✳</span> PLAY BOLDLY <span>✳</span> GROW EVERY DAY <span>✳</span> THINK CLEARLY <span>✳</span> PLAY BOLDLY <span>✳</span> GROW EVERY DAY <span>✳</span></div></section>
      <section className="intro section-pad" id="approach"><div className="section-label"><span>01 / OUR PHILOSOPHY</span><span>THE GAME, REIMAGINED</span></div><div className="intro-grid"><h2>Small moves.<br/><em>Big thinking.</em></h2><div className="intro-text"><p>Chess teaches you to pause, look closer, and see what others might miss. We make that journey structured, supportive, and exciting — whether it’s your very first game or your next tournament.</p><a href="#trial" className="under-link">Start your chess journey <ArrowRight size={16}/></a></div></div><div className="value-row"><div><span className="value-number">01</span><b>Think strategically</b><p>Build focus and plan with purpose.</p></div><div><span className="value-number">02</span><b>Learn by doing</b><p>Practice, analyse, and improve.</p></div><div><span className="value-number">03</span><b>Play with confidence</b><p>Grow at your own pace.</p></div></div></section>
      <section className="programs section-pad" id="programs"><div className="section-label"><span>02 / FIND YOUR GAME</span><span>YOUR NEXT CHAPTER</span></div><div className="programs-heading"><h2>There’s a place<br/>for <em>every player.</em></h2><p>Start with the basics or sharpen the skills you already have. Find the coaching that fits your goals.</p></div><div className="program-grid">{programs.map((p)=><article className="program-card" key={p.num}><div className="card-top"><span>{p.num} / 04</span><p.icon size={23} strokeWidth={1.5}/></div><div className="card-level">{p.level}</div><h3>{p.title}</h3><p className="card-desc">{p.desc}</p><a href="#trial" aria-label={`Enquire about ${p.title}`} className="card-arrow"><ArrowRight size={19}/></a></article>)}</div></section>
      <section className="coaches-section section-pad" id="coaches"><div className="section-label"><span>03 / MEET THE TEAM</span><span>REAL PEOPLE · REAL COACHING</span></div><div className="programs-heading"><h2>Good coaching<br/>changes <em>the game.</em></h2><p>Meet the team behind Mumbai Chess Academy. Learn with experienced coaches who help students build strong fundamentals and confidence.</p></div><div className="coach-grid"><article className="coach-card"><img src={academyImages.founder} alt="Abhishek Naidu, founder of Mumbai Chess Academy" loading="lazy"/><div className="coach-info"><span>FOUNDER · 5–6 YEARS EXPERIENCE</span><h3>Abhishek Naidu</h3><p>Leads curriculum planning and the academy’s coaching structure, helping students progress from beginner to competitive play.</p></div></article><article className="coach-card"><img src={academyImages.sarvesh} alt="Sarvesh Sonawane, co-founder of Mumbai Chess Academy" loading="lazy"/><div className="coach-info"><span>CO-FOUNDER · 4–5 YEARS EXPERIENCE</span><h3>Sarvesh Sonawane</h3><p>Supports coaching quality and day-to-day operations with a friendly, clear teaching approach.</p></div></article><article className="coach-card"><img src={academyImages.aniket} alt="Aniket Thombare, chess coach" loading="lazy"/><div className="coach-info"><span>CHESS COACH · 4–5 YEARS EXPERIENCE</span><h3>Aniket Thombare</h3><p>Works mainly with beginner and intermediate students, helping them learn steadily and comfortably.</p></div></article></div></section>
      <section className="gallery-section section-pad" id="gallery"><div className="section-label"><span>04 / LIFE AT THE ACADEMY</span><span>STUDENTS · EVENTS · PROGRESS</span></div><div className="programs-heading"><h2>Every game has<br/>a <em>story.</em></h2><p>A glimpse of the academy’s chess activities and students. Images are from the existing academy website.</p></div><div className="gallery-grid"><figure className="gallery-large"><img src={academyImages.tournament} alt="Students competing in a chess tournament" loading="lazy"/><figcaption><b>Over-the-board play</b><span>Practice, focus and tournament experience</span></figcaption></figure><figure><img src={academyImages.winners} alt="Students holding chess tournament trophies with coaches" loading="lazy"/><figcaption><b>Celebrating student progress</b><span>Trophy presentation at the academy</span></figcaption></figure><figure><img src={academyImages.event} alt="Young players taking part in a chess event" loading="lazy"/><figcaption><b>Chess community</b><span>Students learning and competing together</span></figcaption></figure></div><p className="gallery-note">Achievement details and tournament results should be added only when confirmed by the academy.</p></section>
      <section className="quote-band"><div className="quote-mark">“</div><blockquote>The goal isn’t just to play a better game.<br/>It’s to become a <em>better thinker.</em></blockquote><div className="quote-bottom"><span>THE MINDSET WE BUILD</span><span>ONE MOVE AT A TIME ↗</span></div></section>
      <section className="trial-section section-pad" id="trial"><div className="section-label"><span>03 / YOUR FIRST MOVE</span><span>LET’S GET STARTED</span></div><div className="trial-grid"><div className="trial-copy"><h2>Your next move<br/>starts <em>here.</em></h2><p>Tell us a little about the player. We’ll prepare a WhatsApp enquiry with your preferences so the academy can help you find a suitable trial class.</p><div className="trial-detail"><span className="detail-icon"><Clock3 size={18}/></span><span><b>Flexible learning</b><small>Online and offline options</small></span></div><div className="trial-detail"><span className="detail-icon"><Crown size={18}/></span><span><b>All skill levels</b><small>From first moves to tournament prep</small></span></div><div className="contact-small">Prefer to call? <a href="tel:+917039192057">{phone}</a></div></div><form className="trial-form" onSubmit={(e)=>{e.preventDefault();setSent(true);window.open(WHATSAPP+'?text='+waText,'_blank','noopener,noreferrer');}}><div className="form-heading"><span>FREE TRIAL ENQUIRY</span><span className="form-step">01 — 04</span></div><label htmlFor="student-name">Your name <span>(optional)</span></label><input id="student-name" value={name} onChange={e=>setName(e.target.value)} placeholder="How should we address you?"/><label>Current chess level</label><div className="choice-row">{['Beginner','Intermediate','Advanced'].map(v=><button type="button" key={v} className={level===v?'choice active':'choice'} onClick={()=>setLevel(v)}>{v}</button>)}</div><label>Who is learning?</label><div className="choice-row">{['Child (under 18)','Adult'].map(v=><button type="button" key={v} className={age===v?'choice active':'choice'} onClick={()=>setAge(v)}>{v}</button>)}</div><label>Preferred class format</label><div className="choice-row">{['Online','Offline / society'].map(v=><button type="button" key={v} className={mode===v?'choice active':'choice'} onClick={()=>setMode(v)}>{v}</button>)}</div><button type="submit" className="button button-lime form-submit">Continue on WhatsApp <ArrowRight size={17}/></button><p className="form-note"><Check size={13}/> Opens WhatsApp with your enquiry ready to send.</p>{sent&&<p className="sent-note">If WhatsApp did not open, contact the academy directly at {phone}.</p>}</form></div></section>
      <section className="faq-section section-pad" id="faq"><div className="section-label"><span>05 / GOOD TO KNOW</span><span>THE QUICK ANSWERS</span></div><div className="faq-grid"><h2>A few things<br/>you might <em>wonder.</em></h2><div className="faq-list">{faqs.map(([q,a],i)=><div className={'faq-item '+(faq===i?'expanded':'')} key={q}><button onClick={()=>setFaq(faq===i?-1:i)} aria-expanded={faq===i}><span>{q}</span><ChevronDown size={18}/></button>{faq===i&&<p>{a}</p>}</div>)}</div></div></section>
      <section className="final-cta"><div className="cta-chess">♞</div><div><span>READY WHEN YOU ARE</span><h2>Make your<br/><em>next move.</em></h2></div><a className="button button-dark" href={WHATSAPP} target="_blank" rel="noreferrer">Chat with the academy <MoveUpRight size={17}/></a></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">♞</span><span>MUMBAI CHESS ACADEMY<small>THINK · LEARN · PLAY</small></span></a><div className="footer-contact"><span>LET’S TALK CHESS</span><a href="tel:+917039192057">{phone}</a><a href="tel:+919833804395">+91 98338 04395</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp the academy ↗</a></div><div className="footer-address">B 10, Balgovindas Society, Ground Floor, Taikalwadi Road, near Star City Cinema, Mahim, Mumbai, Maharashtra 400016</div><div className="footer-bottom"><span>© {new Date().getFullYear()} MUMBAI CHESS ACADEMY</span><span>MADE FOR THE LOVE OF THE GAME ♟</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
