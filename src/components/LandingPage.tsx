import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Experience } from './3d/Experience';


interface LandingPageProps {
  onStartTraining: () => void;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar: React.FC<{ onStartTraining: () => void }> = ({ onStartTraining }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <span className="text-base font-bold tracking-[0.25em] uppercase text-[#f5f5dc]">
          Blitzmate
        </span>

        {/* Nav links */}
        <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-semibold text-[#f5f5dc]/60">
          <a href="#how-it-works" className="hover:text-[#f5f5dc] transition-colors">How It Works</a>
        </div>

        {/* CTA */}
        <button
          id="nav-cta"
          onClick={onStartTraining}
          className="text-xs font-bold tracking-[0.2em] uppercase text-[#f5f5dc] border-b border-[#f5f5dc]/60 pb-0.5 hover:border-[#f5f5dc] hover:opacity-100 opacity-80 transition-all"
        >
          Enter Exhibition →
        </button>
      </div>
    </nav>
  );
};

// ─── Editorial Section ─────────────────────────────────────────────────────────
interface EditorialSectionProps {
  lines: string[];
  subtitle?: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}
const EditorialSection: React.FC<EditorialSectionProps> = ({ lines, subtitle, align = 'center', className = '' }) => {
  const alignClass = align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <section className={`h-screen w-full flex flex-col justify-center px-8 md:px-20 lg:px-32 relative z-10 pointer-events-none ${className}`}>
      <div className={`flex flex-col ${alignClass} max-w-5xl ${align === 'right' ? 'ml-auto' : align === 'center' ? 'mx-auto' : ''}`}>
        <h2
          className="font-black uppercase text-[#f5f5dc] leading-[0.92] mb-8"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.01em',
          }}
        >
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        {subtitle && (
          <p
            className="text-[#f5f5dc]/55 max-w-md leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)', fontFamily: "'Inter', sans-serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};


// ─── How It Works ──────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Choose your rating", text: "Select your current Elo. Blitzmate calibrates your puzzle stream instantly — no onboarding friction." },
    { n: "02", title: "Solve the puzzle",   text: "Dive into a curated stream of puzzles sourced from real high-level competitive games." },
    { n: "03", title: "Improve daily",       text: "Consistency is the edge. Follow daily streaks, review your accuracy, and watch your tactics climb." },
  ];

  return (
    <section id="how-it-works" className="relative z-10 py-32 px-8 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-16">
          The Method
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="border-t border-[#f5f5dc]/10 pt-8">
              <span className="text-[#c9a96e]/40 font-black text-3xl block mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.n}
              </span>
              <h4 className="font-bold text-[#f5f5dc] mb-4 text-lg tracking-tight">{s.title}</h4>
              <p className="text-[#f5f5dc]/50 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { name: "Alex Rivers",    rating: "1200 Elo", text: "Blitzmate gave me puzzles that aren't either too easy or impossible. My tactical vision improved in weeks." },
    { name: "Sarah Chen",     rating: "1850 Elo", text: "The hint system is top-notch. It doesn't just give the answer — it guides you to think like a Grandmaster." },
    { name: "Marcus Thorne",  rating: "2100 Elo", text: "Best tactical training tool I've used. Simple, fast, and the streaks keep me coming back every single day." },
  ];

  return (
    <section className="relative z-10 py-32 px-8 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
          Trusted by 2,000+ players
        </p>
        <blockquote
          className="text-[#f5f5dc] mb-20 italic leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontFamily: "'Playfair Display', serif" }}
        >
          "The secret weapon for club players."
        </blockquote>
        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <div key={i} className="border-t border-[#f5f5dc]/10 pt-8">
              <p className="text-[#f5f5dc]/70 italic text-sm leading-relaxed mb-6">"{r.text}"</p>
              <div>
                <p className="text-[#f5f5dc] font-bold text-sm">{r.name}</p>
                <p className="text-[#c9a96e] text-xs font-bold uppercase tracking-widest">{r.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// ─── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA: React.FC<{ onStartTraining: () => void }> = ({ onStartTraining }) => (
  <section className="relative z-10 h-screen flex flex-col items-center justify-center px-8 pointer-events-auto">
    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9a96e] mb-10">
      Begin
    </p>
    <h2
      className="font-black uppercase text-[#f5f5dc] text-center leading-[0.9] mb-14"
      style={{
        fontSize: 'clamp(3rem, 9vw, 8rem)',
        fontFamily: "'Playfair Display', serif",
      }}
    >
      MASTER<br />THE ART.
    </h2>
    <button
      id="final-cta"
      onClick={onStartTraining}
      className="text-[#0c0b0a] bg-[#f5f5dc] px-14 py-5 font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#c9a96e] transition-colors duration-300"
    >
      Start Training — It's Free
    </button>
  </section>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative z-10 border-t border-[#f5f5dc]/10 py-12 px-8 md:px-20">
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#f5f5dc]/50">
        Blitzmate
      </span>
      <p className="text-xs text-[#f5f5dc]/30">© 2026 Blitzmate. Built for chess improvement.</p>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/amanvilvas04/" target="_blank" rel="noopener noreferrer"
           className="text-xs text-[#f5f5dc]/40 hover:text-[#f5f5dc] transition-colors uppercase tracking-widest">
          LinkedIn
        </a>
        <a href="https://github.com/AmanVilvas" target="_blank" rel="noopener noreferrer"
           className="text-xs text-[#f5f5dc]/40 hover:text-[#f5f5dc] transition-colors uppercase tracking-widest">
          GitHub
        </a>
        <a href="mailto:amanvilvas04@gmail.com"
           className="text-xs text-[#f5f5dc]/40 hover:text-[#f5f5dc] transition-colors uppercase tracking-widest">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

// ─── Main Landing Page ─────────────────────────────────────────────────────────
const LandingPage: React.FC<LandingPageProps> = ({ onStartTraining }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#0c0b0a] text-[#f5f5dc] selection:bg-[#8b6d4f]/50 selection:text-[#fffaf0]">
      {/* 3D Canvas — fixed in background */}
      <Experience />

      <Navbar onStartTraining={onStartTraining} />

      <main id="landing-content">
        {/* ── HERO — camera is top-down here */}
        <EditorialSection
          lines={["NOT JUST", "A MOVE."]}
          align="center"
        />

        {/* ── PAWN section — camera descends as you scroll */}
        <EditorialSection
          lines={["PLAY."]}
          subtitle="Every pawn holds the potential for transformation. The board is a stage, every piece a character in a masterpiece."
          align="left"
        />

        {/* ── KNIGHT section */}
        <EditorialSection
          lines={["COMPETE."]}
          subtitle="Power without precision is wasted. Control the center, anticipate your opponent, dominate the critical lines."
          align="right"
        />

        {/* ── QUEEN section */}
        <EditorialSection
          lines={["IMPROVE."]}
          subtitle="True mastery is forged in analysis. Understanding why you lost is the very first step to never losing again."
          align="left"
        />

        {/* ── Divider — 3D fades here, site content begins */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#f5f5dc]/10 to-transparent mx-8 md:mx-20" />

        {/* Site content sections */}
        <HowItWorks />
        <Testimonials />
        <FinalCTA onStartTraining={onStartTraining} />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
