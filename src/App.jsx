import { useEffect, useRef, useState } from "react";
import { Crosshair, Maximize2, Play, Radio, ScanLine, ShieldAlert } from "lucide-react";
import ModelStage from "../components/ModelStage";
import MusicWidget from "../components/MusicWidget";


const STATS = [
  { label: "Height", value: "54m" },
  { label: "Mass", value: "500T" },
  { label: "Speed", value: "68mph" },
  { label: "Year", value: "1998" }
];

const TIMELINE = [
  { idx: "01", place: "French Polynesia", text: "Nuclear tests disturb something ancient beneath the Pacific." },
  { idx: "02", place: "Panama Canal", text: "A fishing fleet disappears. The Navy finds scale impressions in the seabed." },
  { idx: "03", place: "Manhattan", text: "The city loses power. Fifth Avenue fills with one shadow larger than the street." },
  { idx: "04", place: "Madison Square", text: "A nest discovered beneath the grid. Containment replaces rescue." },
  { idx: "05", place: "Brooklyn Bridge", text: "Searchlights and fog. The final chase burns blue through steel and cable." }
];

const GALLERY = [
  { label: "Roar Study", tag: "01", src: "/assets/godzilla-roar.png", large: true },
  { label: "Dorsal Profile", tag: "02", src: "/assets/godzilla-side.png" },
  { label: "Scale Reference", tag: "03", src: "/assets/godzilla-profile.png" },
  { label: "Full Body", tag: "04", src: "/assets/godzilla-full.png", wide: true }
];

const NAV = ["Awakening", "Siege", "Profile", "Gallery", "Timeline"];

function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}

function useInView(ref, threshold = 0.14) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`fade-up ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function HudCorners() {
  return (
    <>
      <span className="hud-corner top-left" />
      <span className="hud-corner top-right" />
      <span className="hud-corner bottom-left" />
      <span className="hud-corner bottom-right" />
    </>
  );
}

function GlitchTitle() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGlitch(true);
      window.setTimeout(() => setGlitch(false), 140);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`glitch-title ${glitch ? "is-glitching" : ""}`}>
      <h1>
        GODZILLA
      </h1>
      <span aria-hidden>
        GOD
        <br />
        ZILLA
      </span>
      <span aria-hidden>
        GOD
        <br />
        ZILLA
      </span>
    </div>
  );
}

function StatCard({ label, value, delay }) {
  return (
    <FadeUp delay={delay} className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </FadeUp>
  );
}

function TimelineCard({ idx, place, text, delay }) {
  return (
    <FadeUp delay={delay} className="timeline-card">
      <span>{idx}</span>
      <h3>{place}</h3>
      <p>{text}</p>
    </FadeUp>
  );
}

function Nav() {
  const scrollY = useScrollY();

  return (
    <nav className={`nav ${scrollY > 60 ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Godzilla home">
        <span>G</span>
        <strong>Godzilla</strong>
        <em>1998</em>
      </a>
      <div className="nav-links">
        {NAV.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </div>
      <a className="nav-button" href="https://st6.febspot.com/remote_control.php?file=B64YTo0OntzOjQ6InRpbWUiO2k6MTc4MTU2Mzk2NztzOjU6ImxpbWl0IjtpOjA7czo0OiJmaWxlIjtzOjM3OiIvdmlkZW9zLzQ4NjAwMC80ODY5ODUvNDg2OTg1XzcyMHAubXA0IjtzOjI6ImN2IjtzOjMyOiI1N2UxM2NmNWI5YTJhM2Q3MDMyNTNhYzBhNjRjYjY1YiI7fQ%3D%3D" target="_blank" rel="noreferrer">
        <Play size={14} /> Watch Movie
      </a>
    </nav>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const visible = useInView(heroRef, 0.01);

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="hero-bg" aria-hidden />
    
      <div className="hero-letter" aria-hidden>
                 <ModelStage
                  model="b" variant="hero" 
                  cameraPosition={[0, 1, 22]}
                  autoRotate={false} 
                  isLive={true}
                  />
      </div>
      <div className={`hero-content ${visible ? "is-visible" : ""}`}>
  
        <GlitchTitle />
        
        <p className="hero-kicker">Size matters. New York is only the frame.</p>
        <p className="hero-copy">
          A fast cinematic React landing page inspired by Godzilla 1998, built with focused sections, green HUD details, and large movie-style visuals.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href="#awakening">
            Enter the city
          </a>
          <a className="ghost-btn" href="https://www.youtube.com/results?search_query=Godzilla+1998+trailer" target="_blank" rel="noreferrer">
            <Play size={16} /> Watch trailer
          </a>
        </div>
      </div>
      <div className="scroll-hint">Scroll</div>
    </section>
  );
}

function Marquee() {
  const words = ["Manhattan Impact", "Iguana Mutant", "54 Meters", "500 Tons", "French Polynesia", "1998", "Nuclear Origin", "Scale Matters"];

  return (
    <div className="marquee">
      <div>
        {[0, 1, 2].map((group) => (
          <span key={group}>
            {words.map((word) => (
              <em key={`${group}-${word}`}>{word}</em>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function AwakeningSection() {
  return (
    <section id="awakening" className="section split-section">
      <div>
        <FadeUp>
          <p className="section-label">Section 01</p>
          <h2>The Awakening</h2>
          <p className="section-copy">
            Something prehistoric moves beneath the harbor fog. Sirens echo between towers as New York realizes this is not a disaster. It is a living thing.
          </p>
        </FadeUp>
        <div className="signal-grid">
          {[
            ["Seismic", "9.1"],
            ["Thermal", "+340 C"],
            ["Signal", "47Hz"]
          ].map(([key, value], index) => (
            <FadeUp key={key} delay={index * 0.08} className="signal-card">
              <span>{key}</span>
              <strong>{value}</strong>
            </FadeUp>
          ))}
        </div>
      </div>
      <FadeUp delay={0.18} className="image-panel">
        <HudCorners />
        <img src="/assets/godzilla-side.png" alt="Godzilla profile model" />
      </FadeUp>
    </section>
  );
}

function SiegeSection() {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);
  const buildings = Array.from({ length: 18 }, (_, index) => 32 + ((index * 29 + 9) % 56));

  return (
    <section id="siege" ref={ref} className="section siege-section">
      <FadeUp>
        <p className="section-label blue">Impact zone</p>
        <h2>
          New York
          <br />
          Under Siege
        </h2>
        <p className="section-copy">
          Emergency alerts broadcast across every channel. The grid flickers and dies as something impossible moves between the towers.
        </p>
      </FadeUp>
      <div className={`siege-board ${visible ? "is-active" : ""}`}>
        <img src="/assets/godzilla-full.png" alt="" aria-hidden />
        <div className="broadcast">
          <ShieldAlert size={18} />
          Emergency broadcast active
        </div>
        <div className="impact-panel">
          <p>Midtown breach</p>
          <h3>Impact readings exceed safe range</h3>
          <div>
            <span>Grid: Offline</span>
            <span>Range: 3km</span>
            <span>Output: 91%</span>
          </div>
        </div>
        <div className="cityline">
          {buildings.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }}>
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <section id="profile" ref={ref} className="section profile-section">
      <div>
        <FadeUp>
          <p className="section-label">Biological classification</p>
          <h2>
            Monster
            <br />
            Profile
          </h2>
          <p className="section-copy">
            A prehistoric iguana mutated by decades of Pacific nuclear testing. Not a weapon. Not a disaster. A living organism following instinct at continental scale.
          </p>
        </FadeUp>
        <div className="stats-grid">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.08} />
          ))}
        </div>
      </div>
      <FadeUp delay={0.18} className="hud-panel">
        <HudCorners />
        <p className="hud-title">
          <Crosshair size={15} /> HUD - Target acquired
        </p>
         <ModelStage
                  model="a" variant="showcase" 
                  cameraPosition={[12, 0, 2]}
                  autoRotate={true}
                    isLive={false}
                  />
      </FadeUp>
    </section>
  );
}

function GallerySection() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="section gallery-section">
      <FadeUp className="section-heading-row">
        <div>
          <p className="section-label">Section 04</p>
          <h2>Gallery</h2>
        </div>
        <span>4 Studies</span>
      </FadeUp>
      <div className="gallery-grid">
        {GALLERY.map((item, index) => (
          <FadeUp key={item.label} delay={index * 0.06} className={`gallery-card ${item.large ? "large" : ""} ${item.wide ? "wide" : ""}`}>
            <button type="button" onClick={() => setActive(item)}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <span>{item.tag}</span>
              <strong>
                <Maximize2 size={15} /> {item.label}
              </strong>
            </button>
          </FadeUp>
        ))}
      </div>
      {active && (
        <div className="lightbox" onClick={() => setActive(null)} role="button" tabIndex={0}>
          <img src={active.src} alt={active.label} />
          <p>Click anywhere to close</p>
        </div>
      )}
    </section>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="section timeline-section">
      <FadeUp>
        <p className="section-label blue">Section 05</p>
        <h2>Timeline</h2>
      </FadeUp>
      <div className="timeline-grid">
        {TIMELINE.map((item, index) => (
          <TimelineCard key={item.place} {...item} delay={index * 0.08} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <FadeUp>
        <p className="section-label">Signal fading</p>
        <h2>
          The city
          <br />
          remembers
        </h2>
        <p>The footprints cool. Neon returns to the glass. Beyond the fog, the impossible keeps moving.</p>
        <a className="primary-btn" href="#top">
          Back to top
        </a>
      </FadeUp>
      <div className="footer-bar">
        <span>Godzilla 1998 - Fan cinematic project</span>
        <span>React + Vite</span>
      </div>
    </footer>
  );
}

export default function App() {
  
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <AwakeningSection />
      <SiegeSection />
      <ProfileSection />
      <GallerySection />
      <TimelineSection />
      <Footer />
       <MusicWidget />
    </>
  );
}
