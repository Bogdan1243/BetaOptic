import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Disc, Glasses, Sparkles, ShieldCheck, Check, Gift, Calendar } from 'lucide-react';
import { ATELIER_GALLERY, FRAME_BRANDS_EXTRA } from '../data/opticData';
import { getBrandLogo } from '../data/brandLogos';
import ofertaLuniiImage from '../assets/oferta-lunii-nikon.webp';
import ofertaLuniiImage640 from '../assets/oferta-lunii-nikon-640w.webp';
import ofertaLuniiImage960 from '../assets/oferta-lunii-nikon-960w.webp';
import ofertaSaptamaniiImage from '../assets/oferta-saptamanii-gigi.webp';
import ofertaSaptamaniiImage640 from '../assets/oferta-saptamanii-gigi-640w.webp';
import ofertaSaptamaniiImage960 from '../assets/oferta-saptamanii-gigi-960w.webp';

const VIDEO_POSTER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";

// Extended frame brands grid content for modal
const ALL_FRAME_BRANDS_GRID = [
  { name: "Brunello Cucinelli", origin: "Italia", category: "Haute Lunetterie", material: "Corn Natural & Titan" },
  { name: "Linda Farrow", origin: "Marea Britanie", category: "Piese de Moștenire", material: "Acetat Japonez & Aur 22K" },
  { name: "Blackfin", origin: "Italia", category: "Minimalism Arhitectural", material: "Titan Pur Dolomiți" },
  { name: "Alain Mikli", origin: "Franța", category: "Design Artistic", material: "Acetați Exclusivi" },
  { name: "Charmant", origin: "Japonia", category: "Inginerie Anatomică", material: "Excellence Titanium" },
  { name: "Henry Jullien", origin: "Franța", category: "Artizanat Istoric Francez", material: "Aur Dublat Laminat & Titan" },
  { name: "Charriol", origin: "Elveția", category: "Eleganță Elvețiană", material: "Cablu din Oțel Nobil & Aur 22K" },
  { name: "Miu Miu", origin: "Italia", category: "Avangardă Chic", material: "Acetat Sculptural & Cristale" },
  { name: "Oakley", origin: "SUA", category: "Performanță Sportivă", material: "O-Matter & Aliaje C-5" },
  { name: "Maui Jim", origin: "SUA", category: "Claritate Polarizată", material: "Lentile PolarizedPlus2® & Titan" },
  ...FRAME_BRANDS_EXTRA.map(f => ({
    ...f,
    category: f.category || "Colecții Premium Internaționale",
    material: f.material || "Materiale Nobiliare"
  }))
];

function useLockBodyScroll(isOpen) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);
}

export function AtelierGalleryModal({ isOpen, onClose }) {
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DEC9] my-auto z-10 max-h-[90dvh] md:max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 bg-[#F4EFE6] border-b border-[#E5DEC9] flex items-center justify-between gap-3 flex-none">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] block mb-1">Galerie Atelier Beta Optic</span>
                <h3 className="serif-title text-xl sm:text-3xl font-bold text-[#0F172A]">Echipamente & Măiestrie Artizanală</h3>
              </div>
              <button
                  onClick={onClose}
                  className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all cursor-pointer"
                  aria-label="Închide modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Gallery Grid */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {ATELIER_GALLERY.map((item, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#E5DEC9] group shadow-xs">

                      {/* Media fills the whole card (Video or Image), no overlays/text */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {item.type === 'video' ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                poster={VIDEO_POSTER_SVG}
                                aria-label={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-8 py-4 bg-[#F4EFE6] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 flex-none text-xs text-[#0F172A]/70">
              <span>Standarde de montaj conform directivelor europene ISO 8980</span>
              <button
                  onClick={onClose}
                  className="px-6 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full bg-[#0F172A] text-[#FAF8F5] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#0F172A] transition-all cursor-pointer"
              >
                Închide Galeria
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
  );
}

export function ExtraFramesModal({ isOpen, onClose }) {
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md"
          />

          <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DEC9] my-auto z-10 max-h-[90dvh] md:max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 bg-[#F4EFE6] border-b border-[#E5DEC9] flex items-center justify-between gap-3 flex-none">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] block mb-1">Catalog Rame Premium</span>
                <h3 className="serif-title text-xl sm:text-3xl font-bold text-[#0F172A]">Portofoliul Integrat de Rame & Ochelari</h3>
              </div>
              <button
                  onClick={onClose}
                  className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all cursor-pointer"
                  aria-label="Închide modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Layout */}
            <div className="p-5 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {ALL_FRAME_BRANDS_GRID.map((f, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] hover:border-[#0F172A]/30 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0F172A] text-[#FAF8F5]">
                        {f.origin}
                      </span>
                          <div className="w-12 h-12 rounded-full bg-white border border-[#0F172A]/10 flex items-center justify-center overflow-hidden shrink-0">
                            {getBrandLogo(f.name) ? (
                                <img
                                    src={getBrandLogo(f.name)}
                                    alt={`Logo ${f.name}`}
                                    width="32"
                                    height="32"
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                />
                            ) : (
                                <Glasses className="w-5 h-5 text-[#C5A059]" />
                            )}
                          </div>
                        </div>
                        <h4 className="serif-title text-2xl font-bold text-[#0F172A] mb-1">{f.name}</h4>
                        <p className="text-xs text-[#0F172A]/70 mb-2 font-medium">{f.category}</p>
                        <p className="text-xs text-[#0F172A]/80 font-light">Materiale: {f.material}</p>
                        {f.desc && <p className="text-xs text-[#0F172A]/80 leading-relaxed mt-2">{f.desc}</p>}
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#0F172A]/10 text-[11px] text-[#C5A059] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Disponibil pentru probă în showroom</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-8 py-4 bg-[#F4EFE6] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 flex-none text-xs text-[#0F172A]/70">
              <span>Serviciu gratuit de ajustare anatomică a ramelor</span>
              <button
                  onClick={onClose}
                  className="px-6 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full bg-[#0F172A] text-[#FAF8F5] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#0F172A] transition-all cursor-pointer"
              >
                Închide Catalogul
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
  );
}

const OFFER_TABS = [
  { id: 'saptamana', label: 'Oferta săptămânii', icon: Calendar, hasActiveOffer: true },
  { id: 'luna', label: 'Oferta lunii', icon: Gift, hasActiveOffer: true },
];

export function OffersModal({ isOpen, activeTab = 'luna', onTabChange, onClose }) {
  const [selectedTab, setSelectedTab] = useState(activeTab || 'luna');
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (activeTab) {
      setSelectedTab(activeTab);
    }
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  const handleSelectTab = (tabId) => {
    setSelectedTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DEC9] my-auto z-10 max-h-[92dvh] md:max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="px-5 sm:px-8 py-4 sm:py-5 bg-[#F4EFE6] border-b border-[#E5DEC9] flex flex-col gap-3 sm:gap-4 flex-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Promoții Exclusive Beta Optic
                </span>
                <h3 className="serif-title text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Ofertele Noastre
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-11 h-11 md:w-10 md:h-10 shrink-0 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all cursor-pointer"
                aria-label="Închide modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Tabs: Oferta săptămânii / Oferta lunii */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DEC9]">
              {OFFER_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`relative flex items-center justify-center gap-2 py-2.5 px-3 min-h-[44px] sm:min-h-0 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0F172A] text-[#FAF8F5] shadow-sm'
                        : 'text-[#0F172A]/75 hover:text-[#0F172A] hover:bg-[#F4EFE6]/70'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-[#C5A059]" />
                    <span className="truncate">{tab.label}</span>
                    {tab.hasActiveOffer && (
                      <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1">
            {selectedTab === 'luna' ? (
              <motion.div
                key="luna"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Offer Poster Image */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#E5DEC9] shadow-lg flex items-center justify-center">
                  <img
                    src={ofertaLuniiImage}
                    srcSet={`${ofertaLuniiImage640} 640w, ${ofertaLuniiImage960} 819w`}
                    sizes="(max-width: 767px) 360px, 819px"
                    alt="Oferta lunii Nikon - 1+1 Cadou lentile progresive Presio Z"
                    width="819"
                    height="1024"
                    loading="lazy"
                    className="w-full max-h-[55svh] md:max-h-[62vh] object-contain"
                  />
                </div>

                {/* Offer Details */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#0F172A] border border-[#C5A059]/40 text-[11px] uppercase tracking-wider font-bold">
                      <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                      Oferta Lunii • Activă
                    </span>

                    <h4 className="serif-title text-2xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
                      Nikon 1+1 Cadou
                    </h4>

                    <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wider">
                      Vezi bine. Economisești inteligent.
                    </p>

                    <p className="text-sm text-[#0F172A]/85 leading-relaxed">
                      La achiziția unei perechi de lentile progresive <strong>Nikon Presio Z</strong>, primești <strong>CADOU</strong> încă o pereche de lentile progresive.*
                    </p>

                    <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] space-y-2 text-xs text-[#0F172A]/80">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Oferta perfectă pentru o pereche de rezervă sau o a doua ramă!</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Tehnologia Z Suite Progressives — puterea contrastului și o nouă eră de lentile progresive.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DEC9] space-y-1.5 text-[11px] text-[#0F172A]/60 leading-relaxed">
                    <p>*Acordarea perechii gratuite este condiționată de achiziția unei rame noi din magazinul partener.</p>
                    <p>*Promoție valabilă până la data de 31 decembrie 2026.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="saptamana"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Offer Poster Image */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#E5DEC9] shadow-lg flex items-center justify-center">
                  <img
                    src={ofertaSaptamaniiImage}
                    srcSet={`${ofertaSaptamaniiImage640} 640w, ${ofertaSaptamaniiImage960} 960w, ${ofertaSaptamaniiImage} 1200w`}
                    sizes="(max-width: 767px) 360px, 819px"
                    alt="Rame de vedere Gigi Studios în showroom-ul Beta Optic"
                    width="1200"
                    height="900"
                    loading="lazy"
                    className="w-full max-h-[55svh] md:max-h-[62vh] object-cover"
                  />
                </div>

                {/* Offer Details */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#0F172A] border border-[#C5A059]/40 text-[11px] uppercase tracking-wider font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      Oferta Săptămânii • Activă
                    </span>

                    <h4 className="serif-title text-2xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
                      40% Reducere la ramele de vedere Gigi Studios
                    </h4>

                    <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wider">
                      Design Independent din Barcelona
                    </p>

                    <p className="text-sm text-[#0F172A]/85 leading-relaxed">
                      Săptămâna aceasta beneficiezi de <strong>40% reducere</strong> la colecția de rame și ochelari <strong>Gigi Studios</strong> disponibilă în showroom-ul Beta Optic.
                    </p>

                    <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] space-y-2 text-xs text-[#0F172A]/80">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Rame realizate din Titan Japonez și Acetat Italian de înaltă densitate.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>Disponibile pentru probă și consiliere personalizată în showroom-ul Beta Optic Timișoara.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DEC9] space-y-1.5 text-[11px] text-[#0F172A]/60 leading-relaxed">
                    <p>*Ofertă valabilă în limita stocului disponibil în showroom-ul Beta Optic.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-8 py-4 bg-[#F4EFE6] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 flex-none text-xs text-[#0F172A]/70">
            <span>Te așteptăm în showroom-ul Beta Optic Timișoara pentru detalii</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full bg-[#0F172A] text-[#FAF8F5] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#0F172A] transition-all cursor-pointer"
            >
              Închide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}