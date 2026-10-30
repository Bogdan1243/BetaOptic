import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Glasses, ChevronLeft, ChevronRight, Grid, Gem, Sun } from 'lucide-react';
import { FRAME_BRANDS_MAIN, SUNGLASS_BRANDS_MAIN, FRAME_BRANDS_EXTRA } from '../data/opticData';
import { getBrandLogo } from '../data/brandLogos';

// Renders a featured brand card (shared by eyeglasses and sunglasses grids)
const renderBrandCard = (brand, index) => {
  const isWide = brand.featured || brand.id === "brunello-cucinelli" || brand.id === "henry-jullien";

  return (
      <motion.div
          key={brand.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className={`p-8 sm:p-9 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs hover:shadow-xl hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
              isWide ? 'md:col-span-2 lg:col-span-2' : ''
          }`}
      >
        {/* Subtle background letter mark */}
        <div className="absolute -right-6 -bottom-6 opacity-5 text-[#0F172A] pointer-events-none font-serif text-9xl uppercase font-bold">
          {brand.name[0]}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#0F172A] text-[#FAF8F5]">
          {brand.tagline}
        </span>
            <Gem className="w-4 h-4 text-[#C5A059]" />
          </div>

          <h3 className="serif-title text-3xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0F172A] transition-colors">
            {brand.name}
          </h3>

          <p className="text-xs font-semibold text-[#0F172A]/60 uppercase tracking-wider mb-6 flex items-center gap-1">
            <span>Materiale:</span> {brand.materials}
          </p>

          <p className="text-[#0F172A]/85 text-sm sm:text-base leading-relaxed font-normal">
            {brand.text}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[#0F172A]/10 flex items-center justify-between text-xs text-[#0F172A]/70">
          <span className="tracking-wider uppercase">Proba Anatomică în Atelier</span>
          <span className="font-medium text-[#0F172A]">Beta Optic Select</span>
        </div>
      </motion.div>
  );
};

export default function FrameBrandsSection({ onOpenExtraFrames }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.6;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
      <section className="py-28 px-6 md:px-16 w-full bg-[#FAF8F5] text-[#0F172A] border-t border-[#0F172A]/10">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4"
            >
              <Glasses className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Colecții Bespoke & Haute Lunetterie</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="serif-title text-4xl sm:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
            >
              Branduri Rame de Ochelari
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#0F172A]/75 text-base md:text-lg font-normal"
            >
              Rame alese pentru personalitate, rigoare inginerească și nobilimea materialelor.
            </motion.p>
          </div>

          {/* Main Featured Frame Brands Grid (Eyeglasses) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {FRAME_BRANDS_MAIN.map((brand, index) => renderBrandCard(brand, index))}
          </div>

          {/* Divider: Eyeglasses vs. Sunglasses */}
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 sm:gap-6 mb-16"
              role="separator"
              aria-label="Ochelari de Soare"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0F172A]/20 to-[#0F172A]/30" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest whitespace-nowrap">
              <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Ochelari de Soare</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#0F172A]/20 to-[#0F172A]/30" />
          </motion.div>

          {/* Sunglasses Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {SUNGLASS_BRANDS_MAIN.map((brand, index) => renderBrandCard(brand, index))}
          </div>

          {/* Secondary Frame Brands Minimalist Horizontal Carousel */}
          <div className="p-8 rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="serif-title text-2xl font-semibold text-[#0F172A]">
                  Alte Branduri de Rame Premium
                </h4>
                <p className="text-xs text-[#0F172A]/70">
                  Case de design internaționale disponibile pentru probă fizică
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                    onClick={() => scrollCarousel('left')}
                    className="w-9 h-9 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all cursor-pointer"
                    aria-label="Carusel anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={() => scrollCarousel('right')}
                    className="w-9 h-9 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all cursor-pointer"
                    aria-label="Carusel următor"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Drag/Scroll Carousel */}
            <div
                ref={carouselRef}
                className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
            >
              {FRAME_BRANDS_EXTRA.map((item, i) => (
                  <div
                      key={i}
                      className="flex-none min-w-[240px] p-4 rounded-xl bg-[#FAF8F5] border border-[#0F172A]/10 hover:border-[#0F172A]/30 transition-all flex items-center justify-between"
                  >
                    <div>
                      <h5 className="serif-title text-lg font-bold text-[#0F172A]">{item.name}</h5>
                      <span className="text-[11px] text-[#0F172A]/60 block">{item.origin}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white border border-[#0F172A]/10 flex items-center justify-center text-[#0F172A] overflow-hidden shrink-0 ml-3">
                      {getBrandLogo(item.name) ? (
                          <img
                              src={getBrandLogo(item.name)}
                              alt={`Logo ${item.name}`}
                              className="w-8 h-8 object-contain"
                              loading="lazy"
                          />
                      ) : (
                          <Glasses className="w-5 h-5" />
                      )}
                    </div>
                  </div>
              ))}
            </div>

            {/* See More Button triggering Modal Grid */}
            <div className="mt-6 pt-4 border-t border-[#0F172A]/10 flex justify-center">
              <button
                  onClick={onOpenExtraFrames}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all shadow-sm group cursor-pointer"
              >
                <Grid className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Vezi Toate Ramele Disponibile</span>
              </button>
            </div>
          </div>

        </div>
      </section>
  );
}