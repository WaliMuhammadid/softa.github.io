
import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import AIStrategist from './components/AIStrategist';
import Footer from './components/Footer';
import { fetchWeb3Trends } from './services/geminiService';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [tickerMsg, setTickerMsg] = useState('SYNCING GLOBAL PROTOCOLS...');
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const xSet = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const ySet = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const fxSet = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const fySet = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xSet(e.clientX - 3);
      ySet(e.clientY - 3);
      fxSet(e.clientX - 17);
      fySet(e.clientY - 17);
    };

    const handleHoverStart = () => {
      gsap.to(follower, {
        scale: 2,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 0,
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.2
      });
    };

    const handleHoverEnd = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderWidth: 1,
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const attachListeners = () => {
      const interactives = document.querySelectorAll('button, a, .group, input, .cursor-grow, [role="button"]');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    attachListeners();
    const interval = setInterval(attachListeners, 2000);

    const updateTicker = async () => {
      try {
        const trends = await fetchWeb3Trends();
        setTickerMsg(trends.toUpperCase());
      } catch (e) {
        console.error("Ticker update failed", e);
      }
    };
    updateTicker();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
      <div ref={followerRef} className="custom-cursor-follower hidden md:block">
        <div className="custom-cursor-inner"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="py-12 md:py-16 border-y border-white/5 overflow-hidden bg-black">
          <div className="flex gap-12 md:gap-24 animate-[marquee_45s_linear_infinite] whitespace-nowrap">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-12 md:gap-20">
                <div className="flex items-center gap-3">
                  <span className="text-6xl md:text-8xl font-heading font-black outline-text-stat leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>01</span>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-[8px] md:text-[10px] text-purple-500 uppercase tracking-widest font-bold">Market Cap Secured</span>
                    <span className="text-2xl md:text-4xl font-heading font-bold">1.8B+</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-6xl md:text-8xl font-heading font-black text-transparent leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>02</span>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-[8px] md:text-[10px] text-purple-500 uppercase tracking-widest font-bold">Core Deployments</span>
                    <span className="text-2xl md:text-4xl font-heading font-bold">120+</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-6xl md:text-8xl font-heading font-black text-transparent leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>03</span>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-[8px] md:text-[10px] text-purple-500 uppercase tracking-widest font-bold">Uptime Reliability</span>
                    <span className="text-2xl md:text-4xl font-heading font-bold">100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Services />
        <Projects />
        <Process />
        <AIStrategist />
        <Team />
        <FAQ />
        <Testimonials />
        
        <section className="min-h-[60vh] md:min-h-[80vh] flex items-center bg-black text-center relative overflow-hidden py-24 md:py-32" id="contact">
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-[8rem] font-heading font-black uppercase tracking-tighter mb-8 md:mb-12 leading-none">
              JOIN THE <span className="text-purple-600">NETWORK</span>
            </h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16 font-light leading-relaxed">
              Ready to architect your digital legacy? Our strategy leads are waiting to initialize your project nodes.
            </p>
            <div className="flex justify-center">
               <button className="px-10 py-6 md:px-16 md:py-8 bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-700 text-[10px] font-bold uppercase tracking-[0.5em] shadow-2xl">
                  Initialize Project_
               </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-purple-900/10 to-transparent pointer-events-none"></div>
        </section>
      </main>

      <Footer />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .outline-text-stat {
            -webkit-text-stroke: 1px rgba(255,255,255,0.1);
            color: transparent;
        }
        .bg-radial-gradient {
            background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </div>
  );
};

export default App;
