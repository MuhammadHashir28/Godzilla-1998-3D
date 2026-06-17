"use client";

import Image from "next/image";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ChevronRight,
  Crosshair,
  Eye,
  Maximize2,
  Play,
  Radar,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModelStage from "./ModelStage";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  src: string;
  title: string;
  className: string;
};

const godzillaAssets = {
  full: "/assets/godzilla-full.png",
  profile: "/assets/godzilla-profile.png",
  side: "/assets/godzilla-side.png",
  roar: "/assets/godzilla-roar.png"
};

const stats = [
  ["Height", "54 m"],
  ["Length", "90 m"],
  ["Weight", "500 tons"],
  ["Speed", "68 mph"],
  ["Classification", "Iguana mutation"]
];

const timeline = [
  ["French Polynesia", "A nuclear test leaves something impossible moving beneath the water."],
  ["The Footprint", "A fishing vessel vanishes. Manhattan receives a warning carved into steel."],
  ["First Contact", "Sirens, power cuts, and one impossible shadow crossing Fifth Avenue."],
  ["Madison Square", "The nest is discovered under the city, turning rescue into containment."],
  ["Brooklyn Bridge", "The final chase burns blue through fog, steel cables, and searchlights."]
];

const fieldNotes = [
  "Size matters.",
  "This is not an attack pattern. It is migration.",
  "Every camera lies about scale until the street disappears.",
  "Containment is a theory. Manhattan is the test."
];

const gallery: GalleryItem[] = [
  { src: godzillaAssets.roar, title: "Roar Study", className: "md:row-span-2" },
  { src: godzillaAssets.side, title: "Full Body Profile", className: "" },
  { src: godzillaAssets.profile, title: "Scale Reference", className: "md:col-span-2" },
  { src: godzillaAssets.full, title: "Dorsal Detail", className: "" }
];

const navItems = ["Home", "3D Model", "Awakening", "Siege", "Profile", "Gallery"];

const platformBadges = ["IMAX", "NYC", "1998", "GLB"];

export default function CinematicExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      gsap.to(".mouse-depth", {
        x: x * 28,
        y: y * 18,
        rotateY: x * 3,
        rotateX: -y * 3,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy .reveal-line > *",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: "power4.out", delay: 1.1 }
      );

      gsap.to(".godzilla-hero", {
        yPercent: -12,
        scale: 1.14,
        filter: "drop-shadow(0 0 2.8rem rgba(0, 191, 255, 0.4))",
        scrollTrigger: {
          trigger: ".hero-scene",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".nyc-backdrop", {
        yPercent: 18,
        scale: 1.08,
        scrollTrigger: {
          trigger: ".hero-scene",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.utils.toArray<HTMLElement>(".cinematic-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, filter: "blur(16px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%"
            }
          }
        );
      });

      gsap.to(".building", {
        rotate: () => gsap.utils.random(-2.8, 2.8),
        x: () => gsap.utils.random(-14, 14),
        duration: 0.18,
        repeat: 18,
        yoyo: true,
        ease: "rough({ strength: 1.2, points: 20, template: none.out, taper: none, randomize: true, clamp: false})",
        scrollTrigger: {
          trigger: ".siege-section",
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      gsap.fromTo(
        ".explosion",
        { scale: 0, opacity: 0 },
        {
          scale: 5,
          opacity: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".siege-section",
            start: "top 45%",
            end: "70% center",
            scrub: true
          }
        }
      );

      gsap.to(".profile-beast", {
        rotateY: 10,
        rotateZ: -2,
        scale: 1.04,
        scrollTrigger: {
          trigger: ".profile-section",
          start: "top 70%",
          end: "bottom 30%",
          scrub: true
        }
      });

      gsap.to(".timeline-track", {
        x: () => {
          const track = document.querySelector(".timeline-track");
          if (!track) return 0;
          return -(track.scrollWidth - window.innerWidth + 80);
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          document.documentElement.style.setProperty("--scroll-progress", self.progress.toFixed(4));
        }
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="cinematic-page">
      <div className="grain" aria-hidden />
      <div className="spine-meter" aria-hidden>
        <span />
      </div>

      <header className="site-nav">
        <a href="#" className="brand-mark" aria-label="Godzilla 1998 home">
          <span>G</span>
          <strong>Godzilla</strong>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "-")}`}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="https://www.youtube.com/results?search_query=Godzilla+1998+trailer" target="_blank" rel="noreferrer">
          <Play size={14} /> Trailer
        </a>
      </header>

      <section className="hero-scene relative grid min-h-screen place-items-center px-5">
        <div className="nyc-backdrop mouse-depth" aria-hidden />
        <div className="skyline absolute inset-0" aria-hidden />
        <div className="fog-layer" aria-hidden />
        <div className="fog-layer two" aria-hidden />
        <div className="dorsal-glow mouse-depth" aria-hidden />

        <div className="hero-model-stage mouse-depth absolute bottom-[-9vh] right-[-12vw] z-[12] h-[108vh] w-[78vw] min-w-[58rem] max-w-[86rem]">
          <ModelStage model="a" variant="hero" />
        </div>

        <div className="hero-copy relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start gap-5 pt-20">
          <div className="reveal-line">
            <p className="hero-platform inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-atomic">
              <Radar size={14} /> Manhattan impact alert
            </p>
          </div>
          <div className="reveal-line">
            <h1
              className="hero-title font-display font-black uppercase leading-[0.76] tracking-[0.025em] text-white"
              style={{ fontSize: "clamp(4.1rem, 8.4vw, 7.9rem)" }}
            >
              Godzilla
            </h1>
          </div>
          <div className="reveal-line">
            <p className="hero-subtitle max-w-2xl text-xl font-black uppercase tracking-[0.22em] text-white/86 sm:text-3xl">
              Size matters. New York is only the frame.
            </p>
          </div>
          <p className="hero-body max-w-xl text-sm font-bold uppercase leading-7 tracking-[0.08em] text-white/66 sm:text-base">
            A dark interactive launch page built around scale, street-level panic, and two full 3D creature studies.
          </p>
          <div className="reveal-line">
            <div className="action-rail flex flex-wrap gap-3 pt-2">
              <a
                href="#awakening"
                className="primary-action"
              >
                Enter The City <ChevronRight size={17} />
              </a>
              <a
                href="https://www.youtube.com/results?search_query=Godzilla+1998+trailer"
                className="secondary-action"
                target="_blank"
                rel="noreferrer"
              >
                <Play size={16} /> Watch Trailer
              </a>
            </div>
          </div>
          <div className="platform-row">
            {platformBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="3d-model" className="model-section section-shell overflow-hidden bg-[linear-gradient(180deg,#050505,#06140d_52%,#050505)]">
        <div className="absolute inset-0 opacity-30 hud-grid" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="cinematic-reveal relative z-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-scale">Interactive 3D Model</p>
            <h2 className="section-title">Specimen View</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              A strong character stage should feel intentional: heavy silhouette, crisp rim lights, restrained copy, and enough negative space for the model to dominate.
            </p>
            <div className="mt-8 grid gap-3">
              {fieldNotes.map((note, index) => (
                <motion.div
                  key={note}
                  className="field-note rounded-lg p-4"
                  whileHover={{ x: 12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-atomic">Field note 0{index + 1}</span>
                  <p className="mt-2 text-lg font-black uppercase tracking-[0.04em] text-white">{note}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="cinematic-reveal model-frame relative z-10 min-h-[42rem] overflow-hidden rounded-lg border border-white/10 bg-black/45 shadow-scale">
            <div className="model-label absolute left-5 top-5 z-10 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-scale backdrop-blur">
              Model A / Drag
            </div>
            <ModelStage model="b" variant="showcase" />
          </div>
        </div>
      </section>

      <section id="awakening" className="section-shell overflow-hidden bg-[linear-gradient(180deg,#050505,#0b1112_52%,#050505)]">
        <div className="fog-layer two" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="cinematic-reveal relative min-h-[32rem]">
            <div className="absolute inset-x-8 bottom-8 h-24 rounded-[50%] bg-atomic/20 blur-3xl" />
            <Image
              src={godzillaAssets.side}
              alt="Godzilla 1998 full body profile"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain drop-shadow-[0_2rem_3rem_rgba(0,0,0,0.7)]"
            />
          </div>
          <div className="cinematic-reveal editorial-panel rounded-lg p-6 sm:p-10">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-scale">
              <Eye size={15} /> Section 01
            </p>
            <h2 className="section-title">The Awakening</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
              Something prehistoric tears through the harbor fog. Sirens echo between towers as the city realizes this is not a disaster scene. It is a living camera move at impossible scale.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Seismic", "Thermal", "Bio-signal"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-black/35 p-4">
                  <div className="h-1 w-full overflow-hidden rounded bg-white/10">
                    <motion.span
                      className="block h-full bg-atomic"
                      initial={{ width: "10%" }}
                      whileInView={{ width: `${62 + Math.random() * 30}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    />
                  </div>
                  <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/55">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="siege" className="siege-section section-shell overflow-hidden bg-carbon">
        <div className="absolute inset-0 opacity-35 hud-grid" aria-hidden />
        <Image
          src={godzillaAssets.full}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.08] grayscale"
          aria-hidden
        />
        <div className="cinematic-reveal relative z-10 mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-atomic">Section 02</p>
          <h2 className="section-title max-w-5xl">New York Under Siege</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Scroll-triggered impact waves ripple through the city grid while emergency lights fracture through steel, glass, and fog.
          </p>
        </div>
        <div className="city-board siege-board relative z-10 mx-auto mt-12 h-[38rem] max-w-7xl overflow-hidden rounded-lg p-5">
          <Image
            src={godzillaAssets.full}
            alt=""
            fill
            sizes="100vw"
            className="siege-bg object-cover"
            aria-hidden
          />
          <div className="siege-overlay" aria-hidden />
          <div className="relative z-20 grid h-full grid-cols-1 gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="siege-brief self-start">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-scale">Emergency broadcast active</p>
              <h3 className="mt-5 text-4xl font-black uppercase leading-none tracking-[0.06em] text-white sm:text-5xl">
                Midtown breach
              </h3>
              <p className="mt-5 max-w-sm text-sm font-bold uppercase leading-7 tracking-[0.08em] text-white/62">
                Power fails across six blocks. Searchlights sweep the skyline while impact readings climb past safe range.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["Grid", "Offline"],
                  ["Impact", "9.1"],
                  ["Range", "3 km"]
                ].map(([label, value]) => (
                  <div key={label} className="siege-mini">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative self-end">
              <div className="siege-radar" aria-hidden />
              <div className="siege-cityline grid grid-cols-10 items-end gap-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="building relative rounded-t"
                    style={{ height: `${28 + ((index * 19) % 62)}%` }}
                  >
                    <span />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="debris-dot absolute z-20"
              style={{ left: `${8 + ((index * 17) % 84)}%`, top: `${18 + ((index * 29) % 55)}%` }}
            />
          ))}
          {[18, 42, 66, 78].map((left, index) => (
            <span key={left} className="explosion absolute bottom-[30%]" style={{ left: `${left}%`, top: `${36 + index * 8}%` }} />
          ))}
        </div>
      </section>

      <section id="profile" className="profile-section section-shell overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(0,191,255,0.14),transparent_30rem),#050505]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="cinematic-reveal">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-scale">Section 03</p>
            <h2 className="section-title">Monster Profile</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
              A tactical HUD locks onto the creature, translating impossible biology into hard numbers while the dorsal spines pulse through haze and searchlight bloom.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {stats.map(([label, value]) => (
                <div key={label} className="stat-card rounded-lg p-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-atomic">{label}</p>
                  <p className="mt-2 text-2xl font-black uppercase text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cinematic-reveal profile-stage relative min-h-[36rem] rounded-lg p-4 hud-grid">
            <div className="absolute left-5 top-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-atomic">
              <Crosshair size={16} /> Target locked
            </div>
            <div className="absolute bottom-5 right-5 text-xs font-bold uppercase tracking-[0.2em] text-scale">Dorsal energy rising</div>
            <div className="profile-beast absolute inset-0">
              <ModelStage model="a" variant="showcase" />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell bg-carbon">
        <div className="cinematic-reveal mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-atomic">Section 04</p>
          <h2 className="section-title">Gallery</h2>
          <div className="mt-10 grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3">
            {gallery.map((item) => (
              <button
                key={item.title}
                type="button"
                className={`gallery-card group relative text-left ${item.className}`}
                onClick={() => setLightbox(item)}
                aria-label={`Open ${item.title}`}
              >
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-white">
                  <Maximize2 size={16} /> {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section section-shell overflow-hidden bg-void">
        <div className="cinematic-reveal relative z-10 mb-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-scale">Section 05</p>
          <h2 className="section-title">Timeline</h2>
        </div>
        <div className="timeline-track flex gap-5 pr-[20vw]">
          {timeline.map(([title, body], index) => (
            <article key={title} className="glass relative h-[28rem] w-[min(76vw,28rem)] rounded-lg p-7">
              <span className="text-sm font-black uppercase tracking-[0.28em] text-atomic">0{index + 1}</span>
              <h3 className="mt-12 text-4xl font-black uppercase tracking-[0.08em] text-white">{title}</h3>
              <p className="mt-5 leading-7 text-white/65">{body}</p>
              <span className="absolute bottom-8 left-7 right-7 h-px bg-gradient-to-r from-atomic via-scale to-transparent" />
            </article>
          ))}
        </div>
      </section>

      <section className="ending-fog section-shell grid place-items-center overflow-hidden text-center">
        <div className="fog-layer" aria-hidden />
        <div className="relative h-[46vh] w-full max-w-5xl opacity-45">
          <ModelStage model="b" variant="footer" />
        </div>
        <div className="cinematic-reveal relative z-10 -mt-20 max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-atomic">
            <Activity size={15} /> Signal fading
          </p>
          <h2 className="section-title">The city remembers</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/70">
            The footprints cool. Neon returns to the street glass. Somewhere beyond the fog, the impossible keeps moving.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[130] grid place-items-center bg-black/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close gallery image"
            >
              <X size={20} />
            </button>
            <motion.div
              className="relative h-[82vh] w-full max-w-6xl"
              initial={{ scale: 0.94, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.94, filter: "blur(10px)" }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={lightbox.src} alt={lightbox.title} fill sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
