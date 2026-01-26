import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, 
  Brain, 
  Trophy, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Twitter,
  LayoutGrid,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onStartTraining: () => void;
}

// --- Components ---

const PromoBar = () => (
  <div className="w-full bg-gradient-to-r from-orange-600/20 via-orange-500/40 to-orange-600/20 py-2 border-b border-orange-500/20 relative z-50">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-xs md:text-sm font-medium text-orange-100 tracking-wide">
        New: Blitzmate Puzzle Mode is live ⚡ <span className="underline cursor-pointer ml-1">Train like Lichess — Free forever</span>
      </p>
    </div>
  </div>
);

const Navbar: React.FC<{ onStartTraining: () => void }> = ({ onStartTraining }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'px-4' : 'px-0'}`}>
      <div className={`max-w-6xl mx-auto transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-3 px-8 shadow-2xl' : 'py-6 px-4'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform">
              <Swords className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Blitzmate</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'How it Works', 'FAQ'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

          <button 
            onClick={onStartTraining}
            className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Start Training
          </button>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 md:hidden"
          >
            {['Home', 'Features', 'How it Works', 'FAQ'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="text-lg font-medium text-gray-300" onClick={() => setIsOpen(false)}>
                {link}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                onStartTraining();
              }}
              className="w-full bg-white text-black py-4 rounded-xl font-bold"
            >
              Start Training
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero: React.FC<{ onStartTraining: () => void }> = ({ onStartTraining }) => (
  <section className="relative pt-48 pb-20 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-600/20 blur-[120px] -z-10 rounded-full" />
    
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Blitzmate fuels improvement</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]"
      >
        Train Chess Tactics Like a Pro With <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Blitzmate</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Pick your rating, solve puzzles from real games, and improve your tactics with instant feedback, hints, and streak tracking.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
      >
        <button 
          onClick={onStartTraining}
          className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] flex items-center gap-2 group"
        >
          Get Started — It's Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg transition-all backdrop-blur-md">
          View Features
        </button>
      </motion.div>

      {/* The Glow Slab */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 25 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-4xl h-32 md:h-48 rounded-[40px] perspective-1000 mb-10"
        style={{ perspective: '1000px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-red-800 rounded-[40px] blur-[2px] opacity-80 shadow-[0_40px_100px_rgba(234,88,12,0.6)]" />
        <div className="absolute inset-x-4 top-4 bottom-[-20px] bg-black/60 backdrop-blur-3xl rounded-[40px] border border-white/10 overflow-hidden flex items-center justify-center">
            <div className="flex gap-4 opacity-20">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-12 h-12 border border-white/20" />
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-20 border-y border-white/5 relative bg-black/20">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-12">
        Trusted by 2,000+ chess learners
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale">
        {['ChessHub', 'TacticPro', 'MateLab', 'BlitzRank', 'OpenBoard'].map(logo => (
          <span key={logo} className="text-2xl md:text-3xl font-black italic tracking-tighter text-white hover:opacity-100 transition-opacity cursor-default">
            {logo}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      title: "Rating-based puzzles",
      desc: "Enter your Elo and get puzzles matched to your level. No more frustration with impossibly hard tasks.",
      icon: <Target className="w-6 h-6 text-orange-400" />
    },
    {
      title: "Smart hints",
      desc: "Get the best move direction like Lichess-style hint system. Learn the 'why' behind every tactic.",
      icon: <Lightbulb className="w-6 h-6 text-orange-400" />
    },
    {
      title: "Progress tracking",
      desc: "Track streaks, accuracy, and improvement over time with detailed charts and history.",
      icon: <TrendingUp className="w-6 h-6 text-orange-400" />
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] -z-10 group-hover:bg-orange-500/20 transition-colors" />
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Choose rating", text: "Select your current Elo or take a placement test to calibrate your puzzle stream." },
    { n: "02", title: "Solve puzzles", text: "Dive into a curated list of puzzles sourced from top-tier competitive matches." },
    { n: "03", title: "Improve daily", text: "Consistency is key. Follow our daily streaks and watch your tactics rating soar." }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">How It Works</h2>
          <div className="space-y-12">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-orange-500 font-black text-2xl opacity-50">{s.n}</span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-gray-400 max-w-sm">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full" />
          <div className="relative bg-black/40 border border-white/10 p-4 rounded-3xl backdrop-blur-xl aspect-square flex flex-col items-center justify-center overflow-hidden">
            <div className="grid grid-cols-4 gap-2 w-full h-full opacity-40">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`rounded ${ (i + Math.floor(i/4)) % 2 === 0 ? 'bg-white/10' : 'bg-transparent'}`} />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-white/5 rounded-2xl border border-white/20 backdrop-blur-md">
                    <Brain className="w-16 h-16 text-orange-500 animate-bounce" />
                    <p className="mt-4 text-white font-bold text-center">Finding Puzzle...</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Alex Rivers", rating: "1200 Elo", text: "Blitzmate finally gave me puzzles that aren't either too easy or impossible. My tactical vision improved in weeks." },
    { name: "Sarah Chen", rating: "1850 Elo", text: "The hint system is top-notch. It doesn't just give the answer; it guides you to think like a Grandmaster." },
    { name: "Marcus Thorne", rating: "2100 Elo", text: "Best tactical training tool I've used. Simple, fast, and the streaks keep me coming back every single day." }
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16 italic">"The secret weapon for club players."</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 relative">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500" />
                 <div>
                   <h5 className="text-white font-bold">{r.name}</h5>
                   <span className="text-orange-500 text-xs font-bold uppercase">{r.rating}</span>
                 </div>
               </div>
               <p className="text-gray-300 italic">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [active, setActive] = useState(0);
  const questions = [
    { q: "Is Blitzmate free?", a: "Yes, Blitzmate is free to use forever. We believe tactical improvement should be accessible to everyone." },
    { q: "Are puzzles from real games?", a: "Absolutely. Every puzzle in our database is harvested from high-level matches on platforms like Lichess and Chess.com." },
    { q: "How does rating selection work?", a: "You can manually set your Elo or take a 10-puzzle calibration test when you first sign up." },
    { q: "Does it work on mobile?", a: "Blitzmate is fully responsive. You can solve puzzles on your phone, tablet, or desktop seamlessly." },
    { q: "Is it like Lichess training?", a: "It's similar, but with a heavier focus on streaks, smart directional hints, and personalized progression paths." }
  ];

  return (
    <section id="faq" className="py-32">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border-b border-white/10 overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? -1 : i)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${active === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-gray-400 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA: React.FC<{ onStartTraining: () => void }> = ({ onStartTraining }) => (
  <section className="py-32 relative">
    <div className="max-w-5xl mx-auto px-4">
      <div className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center border border-white/10 bg-gradient-to-br from-orange-600/20 to-black">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#ea580c33,transparent_70%)]" />
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to sharpen your tactics?</h2>
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto relative z-10">Join thousands of players who are already dominating the board with Blitzmate.</p>
        <button 
          onClick={onStartTraining}
          className="relative z-10 px-10 py-5 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
        >
          Start Training Now
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center">
          <Swords className="text-white w-4 h-4" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Blitzmate</span>
      </div>
      
      <p className="text-gray-500 text-sm">© 2026 Blitzmate. Built for chess improvement.</p>
      
      <div className="flex items-center gap-6">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </a>
        <a href="https://github.com/AmanVilvas/BlitzMate-trainer" target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

// --- Main Landing Page Component ---

const LandingPage: React.FC<LandingPageProps> = ({ onStartTraining }) => {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-orange-500/30 font-sans">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
      
      {/* Global Background Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,#ff5d2211,transparent_50%)] pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-[radial-gradient(ellipse_at_bottom,#ff5d2211,transparent_50%)] pointer-events-none" />

      <PromoBar />
      <Navbar onStartTraining={onStartTraining} />
      
      <main>
        <Hero onStartTraining={onStartTraining} />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FinalCTA onStartTraining={onStartTraining} />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
