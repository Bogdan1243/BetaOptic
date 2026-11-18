import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../assets/PozaBuna.webp';
import heroImage640 from '../assets/PozaBuna-640w.webp';
import heroImage960 from '../assets/PozaBuna-960w.webp';
import heroImage1280 from '../assets/PozaBuna-1280w.webp';
import glassesLogo from '../assets/glasses-logo.webp';
import { Stethoscope, ArrowRight, Gift, ChevronDown, Calendar, Store } from 'lucide-react';
import { HERO_DATA } from '../data/opticData';
import CardCarousel from './CardCarousel';

const OFFER_MENU_ITEMS = [
  { id: 'saptamana', label: 'Oferta săptămânii', subtitle: '-40% Gigi Studios', icon: Calendar, badge: 'Activă' },
  { id: 'luna', label: 'Oferta lunii', subtitle: 'Nikon 1+1 Cadou', icon: Gift, badge: 'Activă' },
];

export default function HeroSection({ onOpenDoctors, onOpenOffer, onOpenOutlet }) {
  const [isOffersMenuOpen, setIsOffersMenuOpen] = useState(false);
  const offersMenuRef = useRef(null);

  useEffect(() => {
    if (!isOffersMenuOpen) return;
    const handleClickOutside = (e) => {
      if (offersMenuRef.current && !offersMenuRef.current.contains(e.target)) {
        setIsOffersMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOffersMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOffersMenuOpen]);

  return (
      <section className="relative min-h-[85svh] md:min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-[#FAF8F5]">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Storefront photo with subtle dark/beige ambient overlay */}
        <img
          src={heroImage}
          srcSet={`${heroImage640} 640w, ${heroImage960} 960w, ${heroImage1280} 1280w, ${heroImage} 1920w`}
          sizes="(max-width: 767px) 360px, (max-width: 1023px) 768px, 1920px"
          alt="Fațada și vitrina magazinului de optică medicală Beta Optic din Timișoara"
          width="1920"
          height="1440"
          fetchPriority="high"
          className="w-full h-full object-cover scale-100 filter brightness-80 contrast-[1.05]"
        />

        {/* Layered Luxury Overlay for Perfect Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/75 via-[#FAF8F5]/60 to-[#FAF8F5]" />
        <div className="absolute inset-0 bg-[#172554]/10 mix-blend-overlay" />
      </div>

      {/* Top Ambient Branding Watermark & Top-Right Action Buttons */}
      <header className="relative z-30 w-full pt-5 sm:pt-10 px-4 sm:px-8 md:px-16 flex flex-wrap items-start justify-between gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-start gap-3.5"
        >
          <div className="w-14 h-14 rounded-full border border-[#172554]/30 flex items-center justify-center bg-[#FAF8F5]/75 backdrop-blur-md p-2 shrink-0 mt-1 shadow-xs">
            <img
              src={glassesLogo}
              alt="Sigla Beta Optic Timișoara"
              width="48"
              height="34"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-[Arial] text-3xl sm:text-4xl font-black tracking-widest text-[#172554] uppercase block leading-tight">
              BETA OPTIC<sup className="text-base sm:text-lg font-bold align-super ml-0.5">®</sup>
            </span>
            <span className="block text-sm sm:text-base tracking-[0.2em] text-[#172554] uppercase font-extrabold mt-0.5 leading-snug">
              Strada Lucian Blaga nr.7<span className="sr-only">, Timișoara</span> <br/>
              0721 316 224
            </span>
            <ul className="mt-4 sm:mt-5 pt-1 space-y-1.5 text-[11px] sm:text-xs tracking-[0.15em] text-[#172554] uppercase font-bold">
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059] font-black">—</span>
                <span>Lentile personalizate progresive</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059] font-black">—</span>
                <span>Atelier propriu de montaj lentile</span>
              </li>

              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059] font-black">—</span>
                <span>Colecții ample de rame premium, de nișă și clasice</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Top-Right Action Group: Medicii Noștri + Oferte Dropdown + Outlet */}
        <nav aria-label="Navigare principală" className="relative flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* 1. Medicii Noștri Button */}
          <motion.a
            href="/medici"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onOpenDoctors) onOpenDoctors();
              }
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] md:min-h-0 rounded-full bg-[#FAF8F5]/85 hover:bg-[#172554] border border-[#172554]/25 hover:border-[#172554] backdrop-blur-md text-[#172554] hover:text-[#FAF8F5] transition-all duration-300 shadow-sm cursor-pointer group"
          >
            <Stethoscope className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold">
              <span className="sm:hidden" aria-hidden="true">Medici</span>
              <span className="sr-only sm:not-sr-only">Medicii Colaboratori</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block" />
          </motion.a>

          {/* 2. Oferte Button with Dropdown */}
          <div className="sm:relative" ref={offersMenuRef}>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
              onClick={() => setIsOffersMenuOpen((prev) => !prev)}
              aria-expanded={isOffersMenuOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 min-h-[44px] md:min-h-0 rounded-full border backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer group ${
                isOffersMenuOpen
                  ? 'bg-[#172554] border-[#172554] text-[#FAF8F5]'
                  : 'bg-[#FAF8F5]/85 hover:bg-[#172554] border-[#172554]/25 hover:border-[#172554] text-[#172554] hover:text-[#FAF8F5]'
              }`}
            >
              <span className="relative flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold">
                Oferte
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 shrink-0 ${
                  isOffersMenuOpen ? 'rotate-180 opacity-100' : 'group-hover:opacity-100'
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isOffersMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 sm:left-auto sm:right-0 mt-2.5 w-full max-w-[calc(100vw-2rem)] sm:w-64 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-xl border border-[#E5DEC9] shadow-xl p-2 z-40"
                >
                  <div className="px-3 py-1.5 border-b border-[#172554]/10 mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059]">
                      Alege categoria
                    </span>
                  </div>
                  <div className="space-y-1">
                    {OFFER_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setIsOffersMenuOpen(false);
                            if (onOpenOffer) onOpenOffer(item.id);
                          }}
                          className="w-full min-h-[44px] md:min-h-0 flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-[#172554] text-[#172554] hover:text-[#FAF8F5] transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-[#F4EFE6] group-hover:bg-[#FAF8F5]/15 border border-[#E5DEC9] group-hover:border-transparent flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4 text-[#C5A059]" />
                            </div>
                            <div className="truncate">
                              <span className="block text-xs font-semibold tracking-wide">
                                {item.label}
                              </span>
                              <span className="block text-[10px] text-[#172554]/60 group-hover:text-[#FAF8F5]/75 truncate">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-[#C5A059] text-[#172554] shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Outlet Button */}
          <motion.a
            href="/outlet"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onOpenOutlet) onOpenOutlet();
              }
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 min-h-[44px] md:min-h-0 rounded-full bg-[#FAF8F5]/85 hover:bg-[#172554] border border-[#172554]/25 hover:border-[#172554] backdrop-blur-md text-[#172554] hover:text-[#FAF8F5] transition-all duration-300 shadow-sm cursor-pointer group"
          >
            <Store className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform shrink-0" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold">
              Outlet
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:block" />
          </motion.a>
        </nav>
      </header>

      {/* Main Hero Content — pushed lower so the storefront sign in the background photo remains visible */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-44 md:pt-60 pb-10 sm:pb-14 md:pb-16 text-center flex flex-col items-center justify-end mt-auto w-full">
        {/* Subtle Luxury Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        </motion.div>

        {/* Main Slogan strictly requested */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="serif-title text-[2.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-[#172554] tracking-tight leading-none mb-6 sm:mb-10 lowercase"
        >
          <span className="sr-only">
            Beta Optic Timișoara — Optică Medicală, Consult Oftalmologic, Lentile și Rame de Ochelari —{' '}
          </span>
          „{HERO_DATA.slogan}”
        </motion.h1>

        <h2 className="sr-only">
          Întrebări frecvente despre Optică Medicală, Consult Oftalmologic și Ochelari la Beta Optic Timișoara
        </h2>

        {/* Welcoming Statements Grid / Cards */}
        <CardCarousel
          cards={HERO_DATA.cards}
          label="Întrebări și răspunsuri despre vizita la Beta Optic"
        />
      </div>


    </section>
  );
}
