import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import doctorPlaceholder from '../assets/doctors/doctor-placeholder.webp';
import outletExterior from '../assets/outlet-exterior.webp';
import outletInterior from '../assets/outlet-interior.webp';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Eye,
  Stethoscope,
  Gift,
  Clock,
  Calendar,
  Camera,
  Store,
  X,
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  Navigation,
  ExternalLink,
  Smile,
} from 'lucide-react';
import { OUTLET_DOCTORS_DATA } from '../data/doctorsData';

const OUTLET_OFFER_TABS = [
  {
    id: 'zi',
    label: 'Oferta zilei',
    subtitle: 'Promoție zilnică Outlet',
    icon: Clock,
    title: 'Oferta Zilei în Outlet',
    description:
        'În fiecare zi selectăm rame și ochelari de soare din colecțiile noastre la prețuri speciale de outlet. Vizitează-ne în showroom pentru a descoperi surpriza zilei!',
  },
  {
    id: 'saptamana',
    label: 'Oferta săptămânii',
    subtitle: 'Selecția săptămânală Outlet',
    icon: Calendar,
    title: 'Oferta Săptămânii în Outlet',
    description:
        'Săptămânal pregătim pachete avantajoase de rame + lentile dedicate exclusiv locației Beta Optic Outlet.',
  },
  {
    id: 'luna',
    label: 'Oferta lunii',
    subtitle: 'Promoția principală a lunii',
    icon: Gift,
    title: 'Oferta Lunii în Outlet',
    description:
        'Descoperă reducerile lunii la colecțiile de rame și ochelari de soare disponibile în Beta Optic Outlet.',
  },
];

// Add new Outlet gallery photos to this array when ready
export const OUTLET_GALLERY_IMAGES = [
  {
    id: 'outlet-ext',
    src: outletExterior,
    width: 1920,
    height: 1076,
    title: 'Fațada Beta Optic Outlet',
    caption: 'Exteriorul showroom-ului Beta Optic Outlet',
  },
  {
    id: 'outlet-int',
    src: outletInterior,
    width: 1200,
    height: 1600,
    title: 'Interiorul Beta Optic Outlet',
    caption: 'Spațiu modern de consiliere și expunere a ramelor',
  },
];

// Eye chart (optotip) rows: from smallest & blurriest at the top to largest & sharpest at the bottom
const EYE_CHART_ROWS = [
  { text: 'BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC', size: 'text-base md:text-xl', tracking: 'tracking-[0.1em]', blur: 2.9 },
  { text: 'BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC', size: 'text-lg md:text-2xl', tracking: 'tracking-[0.12em]', blur: 2.7 },
  { text: 'BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC', size: 'text-xl md:text-3xl', tracking: 'tracking-[0.15em]', blur: 2.5 },
  { text: 'BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC \u00A0 BETA OPTIC', size: 'text-2xl md:text-4xl', tracking: 'tracking-[0.18em]', blur: 2 },
  { text: 'BETA OPTIC \u00A0\u00A0 BETA OPTIC \u00A0\u00A0 BETA OPTIC', size: 'text-3xl md:text-5xl', tracking: 'tracking-[0.2em]', blur: 1.2 },
  { text: 'BETA OPTIC \u00A0\u00A0 BETA OPTIC', size: 'text-4xl md:text-6xl', tracking: 'tracking-[0.25em]', blur: 0.6 },
  { text: 'BETA OPTIC', size: 'text-6xl md:text-8xl lg:text-7xl', tracking: 'tracking-[0.3em]', blur: 0 },
];

// Decorative eye chart background — hidden from screen readers and search engines
function EyeChartBackground() {
  return (
      <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.5]"
      >
        {/* "Light Box" backlight glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85%] max-w-3xl h-[75%] bg-white/70 blur-[80px] rounded-full" />
        </div>

        {/* Eye chart rows */}
        <div className="relative z-10 select-none text-center w-full h-full flex flex-col justify-between py-24 md:py-32">
          {EYE_CHART_ROWS.map((row, i) => (
              <div
                  key={i}
                  className={`serif-title font-bold text-[#0F172A] ${row.tracking} leading-none whitespace-nowrap`}
                  style={{ filter: `blur(${row.blur}px)` }}
              >
                <span className={row.size}>{row.text}</span>
              </div>
          ))}
        </div>

        {/* Soft vignette for blending the edges */}
        <div
            className="absolute inset-0"
            style={{
              background:
                  'radial-gradient(ellipse at center, transparent 0%, rgba(250,248,245,0.4) 55%, #FAF8F5 100%)',
            }}
        />
      </div>
  );
}

export default function OutletPage({ onBack }) {
  const [selectedOfferTab, setSelectedOfferTab] = useState('luna');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  const activeOffer =
      OUTLET_OFFER_TABS.find((t) => t.id === selectedOfferTab) || OUTLET_OFFER_TABS[2];

  return (
      <div className="min-h-screen w-full bg-[#FAF8F5] text-[#0F172A] selection:bg-[#0F172A] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
        {/* Hero Section with Uploaded Outlet Pictures on the Background (same top bar layout as main page, non-sticky) */}
        <section className="relative min-h-[75vh] md:min-h-[80vh] w-full flex flex-col justify-between overflow-hidden bg-[#FAF8F5]">
          {/* Dual Background Photos (Exterior & Interior of Beta Optic Outlet) */}
          <div className="absolute inset-0 w-full h-full z-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden">
              <img
                  src={outletExterior}
                  alt="Fațada magazinului Beta Optic Outlet din Timișoara"
                  width="1920"
                  height="1076"
                  fetchPriority="high"
                  className="w-full h-full object-cover scale-100 filter brightness-75 contrast-[1.05]"
              />
            </div>
            <div className="relative w-full h-full overflow-hidden hidden md:block">
              <img
                  src={outletInterior}
                  alt="Interiorul magazinului Beta Optic Outlet din Timișoara"
                  width="1200"
                  height="1600"
                  className="w-full h-full object-cover scale-100 filter brightness-75 contrast-[1.05]"
              />
            </div>
            {/* Soft Luxury Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/70 to-[#FAF8F5]" />
            <div className="absolute inset-0 bg-[#0F172A]/10 mix-blend-overlay" />
          </div>

          {/* Top Bar inside Hero (matches main page HeroSection, does not follow on scroll) */}
          <header className="relative z-30 w-full pt-8 sm:pt-10 px-6 sm:px-8 md:px-16 flex flex-wrap items-center justify-between gap-4">
            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                onClick={onBack}
                className="flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-[#0F172A]/30 flex items-center justify-center bg-[#FAF8F5]/60 backdrop-blur-md text-[#0F172A]">
                <Eye className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
              <span className="font-[Arial] text-2xl font-bold tracking-widest text-[#0F172A] uppercase">
                BETA OPTIC
              </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#0F172A]/70 uppercase font-medium">
                Outlet Timișoara
              </span>
              </div>
            </motion.button>

            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                onClick={onBack}
                className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#FAF8F5]/85 hover:bg-[#0F172A] border border-[#0F172A]/20 hover:border-[#0F172A] backdrop-blur-md text-[#0F172A] hover:text-[#FAF8F5] transition-all duration-300 shadow-sm cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-semibold">
              Pagina Principală
            </span>
            </motion.button>
          </header>

          {/* Hero Foreground Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-16 md:py-24 text-center flex flex-col items-center justify-center my-auto">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5]/90 backdrop-blur-md text-[#0F172A] text-xs uppercase tracking-widest mb-6 shadow-xs"
            >
              <Store className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Showroom & Cabinet Oftalmologic • Beta Optic Outlet</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="serif-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-[#0F172A] leading-tight mb-6"
            >
              Beta Optic Outlet
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#0F172A]/85 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Aceeași grijă pentru vederea ta, colecții de rame atent selecționate la prețuri speciale.
            </motion.p>

            {/* Key Value Badges */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-[#0F172A]/90"
            >
              <div className="px-4 py-2 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#0F172A]/15 flex items-center gap-2 shadow-xs">
                <Stethoscope className="w-4 h-4 text-[#C5A059]" />
                <span>Consult Oftalmologic</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#0F172A]/15 flex items-center gap-2 shadow-xs">
                <Gift className="w-4 h-4 text-[#C5A059]" />
                <span>Colecții & Promoții Exclusive Outlet</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#0F172A]/15 flex items-center gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Calitate Garantată Beta Optic</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Eye chart (optotip) background wrapper: spans "Medicii Noștri" + "Oferte Beta Optic Outlet" */}
        <div className="relative overflow-hidden">
          <EyeChartBackground />

          {/* SECTION 1: Medici în cadrul Outlet-ului (Calaver, Costache, Zinculescu) */}
          <section
              id="outlet-medici"
              className="relative z-10 py-20 px-6 md:px-16 w-full max-w-7xl mx-auto"
          >
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4">
                <Stethoscope className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Cabinet Oftalmologic Outlet</span>
              </div>
              <h2 className="serif-title text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
                Medicii Noștri
              </h2>
              <p className="text-[#0F172A]/75 text-sm sm:text-base font-light">
                Echipa de medici specialiști oftalmologi care oferă consultații în cadrul locației Beta Optic Outlet.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {OUTLET_DOCTORS_DATA.map((doctor, index) => (
                  <motion.div
                      key={doctor.id}
                      id={doctor.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] p-6 shadow-xs hover:shadow-md hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Doctor Avatar with Eye */}
                      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5DEC9] flex items-center justify-center p-6 mb-5 shadow-2xs group-hover:border-[#0F172A]/20 transition-colors">
                        <img
                            src={doctorPlaceholder}
                            alt={doctor.name}
                            width="600"
                            height="600"
                            loading="lazy"
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <span className="text-[11px] uppercase tracking-widest font-semibold text-[#C5A059] block mb-1.5">
                    {doctor.title}
                  </span>

                      <h3 className="serif-title text-2xl font-bold text-[#0F172A] leading-snug">
                        {doctor.name}
                      </h3>
                    </div>
                  </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 2: Oferte Outlet (Inline Section with Oferta zilei / săptămânii / lunii) */}
          {/* Background lightened (/80 → /40) so the eye chart shows through */}
          <section
              id="outlet-oferte"
              className="relative z-10 py-20 px-6 md:px-16 w-full bg-[#F4EFE6]/40 border-y border-[#E5DEC9]"
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/15 bg-[#FAF8F5] text-[#0F172A] text-xs uppercase tracking-widest mb-4">
                  <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Promoții Dedicate Outlet</span>
                </div>
                <h2 className="serif-title text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
                  Oferte Beta Optic Outlet
                </h2>
                <p className="text-[#0F172A]/75 text-sm sm:text-base font-light">
                  Selectează categoria dorită pentru a vedea promoțiile dedicate exclusiv showroom-ului nostru Outlet.
                </p>
              </div>

              {/* Inline Category Selector: Oferta zilei / Oferta săptămânii / Oferta lunii */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 rounded-3xl bg-[#0F172A] border border-[#0F172A] shadow-lg mb-8">
                {OUTLET_OFFER_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = selectedOfferTab === tab.id;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setSelectedOfferTab(tab.id)}
                          aria-pressed={isSelected}
                          className={`flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                              isSelected
                                  ? 'bg-[#FAF8F5] text-[#0F172A] shadow-md'
                                  : 'hover:bg-[#FAF8F5]/10 text-[#FAF8F5]'
                          }`}
                      >
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                                isSelected
                                    ? 'bg-[#F4EFE6] border-[#E5DEC9] text-[#C5A059]'
                                    : 'bg-[#FAF8F5]/10 border-[#FAF8F5]/20 text-[#C5A059]'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                      <span className="block text-sm font-bold tracking-wide">
                        {tab.label}
                      </span>
                          <span
                              className={`block text-xs truncate ${
                                  isSelected ? 'text-[#0F172A]/60' : 'text-[#FAF8F5]/65'
                              }`}
                          >
                        {tab.subtitle}
                      </span>
                        </div>
                      </button>
                  );
                })}
              </div>

              {/* Active Outlet Offer Display Card */}
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeOffer.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl bg-[#0F172A] border border-[#0F172A] p-8 sm:p-12 shadow-2xl text-center max-w-3xl mx-auto space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 flex items-center justify-center mx-auto text-[#C5A059]">
                    <activeOffer.icon className="w-7 h-7 stroke-[1.5]" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#FAF8F5] text-[11px] uppercase tracking-widest font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    {activeOffer.label} • Outlet
                </span>

                  <h3 className="serif-title text-3xl sm:text-4xl font-bold text-[#FAF8F5]">
                    {activeOffer.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#FAF8F5]/80 leading-relaxed max-w-xl mx-auto">
                    {activeOffer.description}
                  </p>

                  <div className="pt-4">
                  <span className="inline-block px-5 py-2.5 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5]/75">
                    Noile postere promoționale pentru {activeOffer.label.toLowerCase()} vor fi afișate aici
                  </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* SECTION 3: Galerie Outlet */}
        <section
            id="outlet-galerie"
            className="py-20 px-6 md:px-16 w-full max-w-7xl mx-auto"
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4">
              <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Imagini Showroom</span>
            </div>
            <h2 className="serif-title text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
              Galeria Beta Optic Outlet
            </h2>
            <p className="text-[#0F172A]/75 text-sm sm:text-base font-light">
              Explorează atmosfera și colecțiile expuse în cadrul locației noastre Outlet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTLET_GALLERY_IMAGES.map((img, idx) => (
                <motion.div
                    key={img.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => setLightboxImage(img)}
                    className="group relative rounded-3xl overflow-hidden bg-[#0F172A] border border-[#E5DEC9] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
                >
                  <img
                      src={img.src}
                      alt={img.title}
                      width={img.width || 1200}
                      height={img.height || 900}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-6 text-[#FAF8F5]">
                    <h3 className="serif-title text-2xl font-bold leading-snug">
                      {img.title}
                    </h3>
                    {img.caption && (
                        <p className="text-xs text-[#FAF8F5]/80 mt-1">{img.caption}</p>
                    )}
                  </div>
                </motion.div>
            ))}

            {/* Placeholder Card for upcoming Outlet gallery uploads */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="rounded-3xl bg-[#F4EFE6] border-2 border-dashed border-[#E5DEC9] p-8 flex flex-col items-center justify-center text-center aspect-[4/3]"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5DEC9] flex items-center justify-center text-[#C5A059] mb-4">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] mb-1">
              Galerie în curs de actualizare
            </span>
              <h3 className="serif-title text-2xl font-bold text-[#0F172A] mb-2">
                Mai multe imagini în curând
              </h3>
              <p className="text-xs text-[#0F172A]/65 max-w-xs leading-relaxed">
                Vom adăuga curând fotografii noi cu ramele și colecțiile din Beta Optic Outlet.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: Locație Outlet (same style as LocationSection on main page) */}
        <section
            id="locatie-outlet"
            className="py-28 px-6 md:px-16 w-full bg-[#0F172A] text-[#FAF8F5] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/10 text-xs uppercase tracking-widest text-[#C5A059] mb-4"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locație Beta Optic Outlet</span>
              </motion.div>

              <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="serif-title text-4xl sm:text-6xl font-semibold text-[#FAF8F5] leading-tight mb-4"
              >
                Te Așteptăm la Beta Optic Outlet
              </motion.h2>

              <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[#FAF8F5]/70 text-base md:text-lg font-light"
              >
                O atmosferă primitoare, cu atenție la detalii și servicii dedicate vederii tale.
                <Smile
                    strokeWidth={1.25}
                    className="inline-block w-5 h-5 md:w-6 md:h-6 ml-2 -mt-1 text-[#C5A059] align-middle"
                />
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Box: Contact & Address Information */}
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#FAF8F5]/5 border border-[#FAF8F5]/15 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="serif-title text-3xl font-bold text-[#FAF8F5] mb-2">
                      Beta Optic Outlet Timișoara
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#C5A059]">
                      Oftalmologie-Optometrie-Optică medicală-Outlet
                    </p>
                  </div>

                  <address className="not-italic space-y-6 text-sm text-[#FAF8F5]/90">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">
                          Adresă Outlet
                        </strong>
                        <span>Strada Paris 2a, 300003 Timișoara</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                        <Clock className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">
                          Program Programări & Consult
                        </strong>
                        <span>Luni - Vineri: 10:00 - 18:00</span>
                        <br />
                        <span>Sâmbătă - Duminică: Închis</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">
                          Telefon & WhatsApp
                        </strong>
                        <a
                            href="tel:+40748241952"
                            className="hover:text-[#C5A059] transition-colors"
                        >
                          0748 241 952
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">
                          Email Oficial
                        </strong>
                        <a
                            href="mailto:betaoptic@yahoo.com"
                            className="hover:text-[#C5A059] transition-colors"
                        >
                          betaoptic@yahoo.com
                        </a>
                      </div>
                    </div>
                  </address>
                </div>

                <div className="pt-8 mt-8 border-t border-[#FAF8F5]/15">
                  <a
                      href="https://www.google.com/maps/search/?api=1&query=Strada+Paris+2a,+300003+Timi%C8%99oara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF8F5] text-[#0F172A] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all shadow-md group"
                  >
                    <Navigation className="w-4 h-4 text-[#0F172A] group-hover:scale-110 transition-transform" />
                    <span>Deschide Navigația Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </motion.div>

              {/* Right Box: Google Maps Visual Embed */}
              <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#FAF8F5]/15 shadow-2xl relative min-h-[400px] bg-[#1E293B]"
              >
                <iframe
                    title="Locație Beta Optic Outlet Google Maps"
                    src="https://www.google.com/maps?q=Strada+Paris+2a,+300003+Timisoara&output=embed"
                    className="w-full h-full min-h-[420px] border-0 filter contrast-125 saturate-75 opacity-90"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>

            {/* Footer Copyright */}
            <footer className="mt-20 pt-8 border-t border-[#FAF8F5]/10 text-center text-xs text-[#FAF8F5]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© {new Date().getFullYear()} Beta Optic. Toate drepturile rezervate.</span>
              <span className="serif-title text-base font-semibold tracking-widest text-[#FAF8F5]/80 uppercase">
              „Vizibilitatea ta, viziunea noastră”
            </span>
            </footer>
          </div>
        </section>

        {/* Lightbox Modal for Gallery Images */}
        <AnimatePresence>
          {lightboxImage && (
              <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#0F172A]/85 backdrop-blur-md"
                  onClick={() => setLightboxImage(null)}
              >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-4xl w-full bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-2xl"
                >
                  <button
                      onClick={() => setLightboxImage(null)}
                      aria-label="Închide imaginea"
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0F172A]/80 text-[#FAF8F5] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0F172A] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="bg-[#0F172A] flex items-center justify-center max-h-[75vh] overflow-hidden">
                    <img
                        src={lightboxImage.src}
                        alt={lightboxImage.title}
                        className="w-full max-h-[75vh] object-contain"
                    />
                  </div>
                  <div className="px-6 py-4 bg-[#FAF8F5] flex items-center justify-between">
                    <div>
                      <h4 className="serif-title text-xl font-bold text-[#0F172A]">
                        {lightboxImage.title}
                      </h4>
                      {lightboxImage.caption && (
                          <p className="text-xs text-[#0F172A]/70">{lightboxImage.caption}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
}