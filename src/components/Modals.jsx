import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Disc, Glasses, Play, Image, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { ATELIER_GALLERY, FRAME_BRANDS_EXTRA } from '../data/opticData';

// Extended frame brands grid content for modal
const ALL_FRAME_BRANDS_GRID = [
  { name: "Brunello Cucinelli", origin: "Italia", category: "Haute Lunetterie", material: "Corn Natural & Titan" },
  { name: "Linda Farrow", origin: "Marea Britanie", category: "Piese de Moștenire", material: "Acetat Japonez & Aur 22K" },
  { name: "Blackfin", origin: "Italia", category: "Minimalism Arhitectural", material: "Titan Pur Dolomiți" },
  { name: "Alain Mikli", origin: "Franța", category: "Design Artistic", material: "Acetați Exclusivi" },
  { name: "Charmant", origin: "Japonia", category: "Inginerie Anatomică", material: "Excellence Titanium" },
  ...FRAME_BRANDS_EXTRA.map(f => ({
    ...f,
    category: f.category || "Colecții Premium Internaționale",
    material: f.material || "Materiale Nobiliare"
  }))
];

export function AtelierGalleryModal({ isOpen, onClose }) {
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
              className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DEC9] my-auto z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-8 py-6 bg-[#F4EFE6] border-b border-[#E5DEC9] flex items-center justify-between flex-none">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] block mb-1">Galerie Atelier Beta Optic</span>
                <h3 className="serif-title text-2xl sm:text-3xl font-bold text-[#0F172A]">Echipamente & Măiestrie Artizanală</h3>
              </div>
              <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all"
                  aria-label="Închide modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Gallery Grid */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ATELIER_GALLERY.map((item, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E5DEC9] group shadow-xs">

                      {/* Dynamic Media Container (Video or Image) */}
                      <div className="relative h-56 overflow-hidden bg-[#0F172A]">
                        {item.type === 'video' ? (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                            >
                              <source src={item.image} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                            />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0F172A]/80 text-[#FAF8F5] backdrop-blur-md flex items-center gap-1.5">
                      {item.type === 'video' ? <Play className="w-3 h-3 text-[#C5A059] fill-current" /> : <Image className="w-3 h-3 text-[#C5A059]" />}
                          {item.type === 'video' ? 'Filmare Laborator' : 'Cadru Fotografic'}
                    </span>
                      </div>

                      <div className="p-6">
                        <h4 className="serif-title text-xl font-bold text-[#0F172A] mb-1">{item.title}</h4>
                        <p className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-2">{item.subtitle}</p>
                        <p className="text-xs text-[#0F172A]/80 leading-relaxed font-normal">{item.detail}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 bg-[#F4EFE6] border-t border-[#E5DEC9] flex items-center justify-between flex-none text-xs text-[#0F172A]/70">
              <span>Standarde de montaj conform directivelor europene ISO 8980</span>
              <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-[#0F172A] text-[#FAF8F5] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#0F172A] transition-all"
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
              className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#0F172A] rounded-3xl shadow-2xl overflow-hidden border border-[#E5DEC9] my-auto z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-8 py-6 bg-[#F4EFE6] border-b border-[#E5DEC9] flex items-center justify-between flex-none">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] block mb-1">Catalog Rame Premium Grid</span>
                <h3 className="serif-title text-2xl sm:text-3xl font-bold text-[#0F172A]">Portofoliul Integrat de Rame & Ochelari</h3>
              </div>
              <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all"
                  aria-label="Închide modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Layout */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ALL_FRAME_BRANDS_GRID.map((f, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E5DEC9] hover:border-[#0F172A]/30 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0F172A] text-[#FAF8F5]">
                        {f.origin}
                      </span>
                          <Glasses className="w-4 h-4 text-[#C5A059]" />
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
            <div className="px-8 py-4 bg-[#F4EFE6] border-t border-[#E5DEC9] flex items-center justify-between flex-none text-xs text-[#0F172A]/70">
              <span>Serviciu gratuit de ajustare anatomică a ramelor</span>
              <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-[#0F172A] text-[#FAF8F5] uppercase tracking-wider font-semibold hover:bg-[#C5A059] hover:text-[#0F172A] transition-all"
              >
                Închide Catalogul
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
  );
}