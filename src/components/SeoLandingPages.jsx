import React, { useEffect } from 'react';
import glassesLogo from '../assets/glasses-logo.webp';
import {
  ArrowLeft,
  Disc,
  ShieldCheck,
  Glasses,
  Gem,
  Sun,
  Cpu,
  Wrench,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  LENS_BRANDS_MAIN,
  FRAME_BRANDS_MAIN,
  SUNGLASS_BRANDS_MAIN,
  FRAME_BRANDS_EXTRA,
  PROCESS_STEPS,
  ATELIER_GALLERY,
} from '../data/opticData';
import { getBrandLogo } from '../data/brandLogos';
import LocationSection from './LocationSection';

const VIDEO_POSTER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";

function SeoPageHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#172554]/10 px-4 sm:px-6 md:px-16 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onBack) onBack();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full border border-[#172554]/20 bg-[#F4EFE6] hover:bg-[#172554] hover:text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#FAF8F5] group-hover:-translate-x-1 transition-transform shrink-0" />
            <span>Pagina Principală</span>
          </a>

          <div className="h-6 w-px bg-[#172554]/15 hidden sm:block" />

          <a
            href="/"
            aria-label="Beta Optic Timișoara — Pagina Principală"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                if (onBack) onBack();
              }
            }}
            className="flex items-center justify-center sm:justify-start gap-2.5 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-[#172554]/30 flex items-center justify-center bg-[#FAF8F5] p-1.5 group-hover:border-[#C5A059] transition-colors shrink-0">
              <img
                src={glassesLogo}
                alt="Sigla Beta Optic Timișoara"
                width="36"
                height="26"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="serif-title text-lg font-bold tracking-widest text-[#172554] uppercase leading-none block">
                BETA OPTIC<sup className="text-[10px] font-bold align-super ml-0.5">®</sup>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#172554]/60 uppercase font-medium">
                Timișoara • Str. Lucian Blaga 7
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * 1. /lentile-ochelari-timisoara
 * Dedicated SEO Landing Page for Eyeglass Lenses (Nikon, Zeiss, Hoya, Essilor, ItalLenti)
 */
export function LensesSeoPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <SeoPageHeader onBack={onBack} />

      <main>
        {/* Hero */}
        <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 md:px-16 w-full bg-gradient-to-b from-[#F4EFE6]/60 to-[#FAF8F5] border-b border-[#172554]/10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-xs uppercase tracking-widest mb-5">
              <Disc className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>Singurii Parteneri Oficiali Nikon în Timișoara</span>
            </div>

            <h1 className="serif-title text-3xl sm:text-6xl md:text-7xl font-semibold text-[#172554] leading-tight mb-5">
              Lentile de Ochelari în Timișoara — Nikon, Zeiss, Hoya, Essilor & ItalLenti
            </h1>

            <p className="text-[#172554]/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              La Beta Optic Timișoara (Strada Lucian Blaga 7), personalizăm lentile progresive,
              monofocale, degresive - office/calculator, fotocromatice și indici de subțiere, protecție UV, lentile degrade adaptate
              prescripției tale oftalmologice și montate computerizat în laboratorul nostru propriu.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#172554]/85">
              <span className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#172554]/15 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                Lentile Progresive & Monofocale Personalizate
              </span>
              <span className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#172554]/15 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                Protecție Lumină Albastră & Antireflex Premium
              </span>
            </div>
          </div>
        </section>

        {/* Partner Lens Brands from opticData.js */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="serif-title text-3xl sm:text-5xl font-semibold text-[#172554] mb-4">
              Producători Mondiali de Lentile Oftalmice
            </h2>
            <p className="text-[#172554]/75 text-sm sm:text-base">
              Alegem exclusiv producători care redefinesc performanța optică, puritatea cromatică și rezistența la zgârieturi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {LENS_BRANDS_MAIN.map((brand) => (
              <article
                key={brand.id}
                className="p-6 sm:p-10 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#172554] text-[#FAF8F5]">
                      {brand.badge}
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#172554]/60 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      {brand.origin}
                    </span>
                  </div>

                  <h3 className="serif-title text-3xl sm:text-4xl font-bold text-[#172554] mb-2">
                    Lentile {brand.name} Timișoara
                  </h3>
                  <p className="text-xs font-semibold text-[#8A6928] lg:text-[#C5A059] uppercase tracking-wider mb-5">
                    {brand.tagline}
                  </p>
                  <p className="text-[#172554]/85 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {brand.text}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#172554]/10 flex items-center justify-between text-xs text-[#172554]/70">
                  <span className="uppercase tracking-wider">Garanție Oficială ISO 8980</span>
                  <span className="font-semibold text-[#172554]">Disponibil la Beta Optic Timișoara</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <LocationSection />
    </div>
  );
}

/**
 * 2. /rame-ochelari-timisoara
 * Dedicated SEO Landing Page for Eyeglass Frames & Sunglasses (All 40+ Brands Visible)
 */
export function FramesSeoPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <SeoPageHeader onBack={onBack} />

      <main>
        {/* Hero */}
        <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 md:px-16 w-full bg-gradient-to-b from-[#F4EFE6]/60 to-[#FAF8F5] border-b border-[#172554]/10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-xs uppercase tracking-widest mb-5">
              <Glasses className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>Showroom Optică Medicală Timișoara</span>
            </div>

            <h1 className="serif-title text-3xl sm:text-6xl md:text-7xl font-semibold text-[#172554] leading-tight mb-5">
              Rame de Ochelari de Vedere și Ochelari de Soare în Timișoara
            </h1>

            <p className="text-[#172554]/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Portofoliul Beta Optic Timișoara reunește peste 35 de case internaționale de optică și
              haute lunetterie — rame din titan japonez pur, corn natural, aur laminat și acetați
              italieni, disponibile pentru probă și ajustare anatomică în showroom-ul de pe Str. Lucian Blaga 7.
            </p>
          </div>
        </section>

        {/* Main Luxury Frame Brands */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
          <h2 className="serif-title text-3xl sm:text-5xl font-semibold text-[#172554] text-center mb-10">
            Colecții Principale — Rame de Vedere
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-16">
            {FRAME_BRANDS_MAIN.map((brand) => {
              let colSpan = 'md:col-span-3 lg:col-span-2';
              if (brand.fullWidth) colSpan = 'md:col-span-6 lg:col-span-6';
              else if (brand.halfWidth) colSpan = 'md:col-span-3 lg:col-span-3';
              else if (brand.featured) colSpan = 'md:col-span-6 lg:col-span-4';

              return (
              <article
                key={brand.id}
                className={`p-6 sm:p-8 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs flex flex-col justify-between ${colSpan}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#172554] text-[#FAF8F5]">
                      {brand.tagline}
                    </span>
                    <Gem className="w-4 h-4 text-[#C5A059] shrink-0" />
                  </div>
                  <h3 className="serif-title text-3xl font-bold text-[#172554] mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#172554]/60 uppercase tracking-wider mb-4">
                    Materiale: {brand.materials}
                  </p>
                  <p className="text-[#172554]/85 text-sm leading-relaxed">
                    {brand.text}
                  </p>
                </div>
              </article>
              );
            })}
          </div>

          {/* Sunglasses */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-[#172554]/15" />
            <h2 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-xs uppercase tracking-widest">
              <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Ochelari de Soare cu Protecție UV & Polarizare</span>
            </h2>
            <div className="flex-1 h-px bg-[#172554]/15" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {SUNGLASS_BRANDS_MAIN.map((brand) => (
              <article
                key={brand.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#172554] text-[#FAF8F5] mb-4">
                    {brand.tagline}
                  </span>
                  <h3 className="serif-title text-3xl font-bold text-[#172554] mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#172554]/60 uppercase tracking-wider mb-4">
                    Materiale: {brand.materials}
                  </p>
                  <p className="text-[#172554]/85 text-sm leading-relaxed">
                    {brand.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Full Catalog of All Extra Frame Brands Visibly Rendered for SEO */}
          <h2 className="serif-title text-3xl sm:text-4xl font-semibold text-[#172554] text-center mb-8">
            Catalog Complet Branduri de Rame Disponibile în Showroom
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FRAME_BRANDS_EXTRA.map((f, idx) => (
              <article
                key={idx}
                className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#172554] text-[#FAF8F5]">
                      {f.origin}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-white border border-[#172554]/10 flex items-center justify-center overflow-hidden shrink-0">
                      {getBrandLogo(f.name) ? (
                        <img
                          src={getBrandLogo(f.name)}
                          alt={`Rame ochelari ${f.name} Timișoara`}
                          width="32"
                          height="32"
                          className="w-7 h-7 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <Glasses className="w-4 h-4 text-[#C5A059]" />
                      )}
                    </div>
                  </div>
                  <h3 className="serif-title text-2xl font-bold text-[#172554] mb-1">
                    {f.name}
                  </h3>
                  <p className="text-xs text-[#172554]/70 mb-1 font-medium">{f.category}</p>
                  <p className="text-xs text-[#172554]/80 font-light">Materiale: {f.material}</p>
                  {f.desc && (
                    <p className="text-xs text-[#172554]/80 leading-relaxed mt-2">{f.desc}</p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-[#172554]/10 text-[11px] text-[#8A6928] lg:text-[#C5A059] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Disponibil pentru probă la Beta Optic Timișoara</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <LocationSection />
    </div>
  );
}

/**
 * 3. /atelier-montaj-ochelari
 * Dedicated SEO Landing Page for Custom Lens Mounting, Adjustments & Optical Lab in Timișoara
 */
export function AtelierSeoPage({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <SeoPageHeader onBack={onBack} />

      <main>
        {/* Hero */}
        <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 px-4 sm:px-6 md:px-16 w-full bg-gradient-to-b from-[#F4EFE6]/60 to-[#FAF8F5] border-b border-[#172554]/10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-xs uppercase tracking-widest mb-5">
              <Cpu className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>Laborator Propriu Nidek & Essilor Mr. Blue</span>
            </div>

            <h1 className="serif-title text-3xl sm:text-6xl md:text-7xl font-semibold text-[#172554] leading-tight mb-5">
              Atelier Montaj Lentile și Ajustare Ochelari în Timișoara
            </h1>

            <p className="text-[#172554]/80 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              La Beta Optic Timișoara (Str. Lucian Blaga 7), montajul lentilelor oftalmice se
              realizează direct în laboratorul nostru propriu, echipat cu sisteme computerizate de
              șlefuire și centrare Nidek și Essilor Mr. Blue, conform standardelor ISO 8980.
            </p>
          </div>
        </section>

        {/* Gallery & Lab Equipment */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {ATELIER_GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-[#172554] border border-[#E5DEC9] shadow-md aspect-[4/3]"
              >
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER_SVG}
                    aria-label={item.title}
                    className="w-full h-full object-cover"
                  >
                    {item.mobileVideo && (
                      <source src={item.mobileVideo} type="video/mp4" media="(max-width: 767px)" />
                    )}
                    <source src={item.image} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.image}
                    srcSet={item.srcSet}
                    sizes={item.sizes}
                    alt={item.title}
                    width="1200"
                    height="800"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* 7 Process Steps */}
          <h2 className="serif-title text-3xl sm:text-5xl font-semibold text-[#172554] text-center mb-10">
            Cei 7 Pași ai Montajului și Personalizării Ochelarilor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.number}
                className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#172554] text-[#FAF8F5] flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-[#C5A059]" />
                    </span>
                    <span className="serif-title text-2xl font-bold text-[#172554]/40">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="serif-title text-xl font-bold text-[#172554] mb-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-sm text-[#172554]/80 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <LocationSection />
    </div>
  );
}
