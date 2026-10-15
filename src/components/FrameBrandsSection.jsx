import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Glasses, ChevronLeft, ChevronRight, Grid, Sparkles, Gem } from 'lucide-react';
import { FRAME_BRANDS_MAIN, FRAME_BRANDS_EXTRA } from '../data/opticData';

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
    <section class="py-28 px-6 md:px-16 w-full bg-[#FAF8F5] text-[#0F172A] border-t border-[#0F172A]/10">
      <div class="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div class="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4"
          >
            <Glasses class="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Colecții Bespoke & Haute Lunetterie</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            class="serif-title text-4xl sm:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
          >
            Branduri Partenere Rame
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            class="text-[#0F172A]/75 text-base md:text-lg font-normal"
          >
            Rame alese pentru personalitate, rigoare inginerească și nobilimea materialelor.
          </motion.p>
        </div>

        {/* Main Featured Frame Brands Grid (5 Exclusive Houses) */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {FRAME_BRANDS_MAIN.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              class={`p-8 sm:p-9 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs hover:shadow-xl hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Subtle background letter mark */}
              <div class="absolute -right-6 -bottom-6 opacity-5 text-[#0F172A] pointer-events-none font-serif text-9xl uppercase font-bold">
                {brand.name[0]}
              </div>

              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#0F172A] text-[#FAF8F5]">
                    {brand.tagline}
                  </span>
                  <Gem class="w-4 h-4 text-[#C5A059]" />
                </div>

                <h3 class="serif-title text-3xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0F172A] transition-colors">
                  {brand.name}
                </h3>
                
                <p class="text-xs font-semibold text-[#0F172A]/60 uppercase tracking-wider mb-6 flex items-center gap-1">
                  <span>Materiale:</span> {brand.materials}
                </p>

                <p class="text-[#0F172A]/85 text-sm sm:text-base leading-relaxed font-normal">
                  {brand.text}
                </p>
              </div>

              <div class="pt-6 mt-6 border-t border-[#0F172A]/10 flex items-center justify-between text-xs text-[#0F172A]/70">
                <span class="tracking-wider uppercase">Proba Anatomică în Atelier</span>
                <span class="font-medium text-[#0F172A]">Beta Optic Select</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Frame Brands Minimalist Horizontal Carousel */}
        <div class="p-8 rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9]">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h4 class="serif-title text-2xl font-semibold text-[#0F172A]">
                Alte Branduri de Rame Premium
              </h4>
              <p class="text-xs text-[#0F172A]/70">
                Case de design internaționale disponibile pentru probă fizică
              </p>
            </div>

            <div class="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                class="w-9 h-9 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all"
                aria-label="Carusel anterior"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                class="w-9 h-9 rounded-full border border-[#0F172A]/20 bg-[#FAF8F5] flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all"
                aria-label="Carusel următor"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Drag/Scroll Carousel */}
          <div
            ref={carouselRef}
            class="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          >
            {FRAME_BRANDS_EXTRA.map((item, i) => (
              <div
                key={i}
                class="flex-none min-w-[210px] p-4 rounded-xl bg-[#FAF8F5] border border-[#0F172A]/10 hover:border-[#0F172A]/30 transition-all flex items-center justify-between"
              >
                <div>
                  <h5 class="serif-title text-lg font-bold text-[#0F172A]">{item.name}</h5>
                  <span class="text-[11px] text-[#0F172A]/60 block">{item.origin}</span>
                </div>
                <div class="w-8 h-8 rounded-full bg-[#0F172A]/5 flex items-center justify-center text-[#0F172A]">
                  <Glasses class="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* See More Button triggering Modal Grid */}
          <div class="mt-6 pt-4 border-t border-[#0F172A]/10 flex justify-center">
            <button
              onClick={onOpenExtraFrames}
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all shadow-sm group"
            >
              <Grid class="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Vezi Toate Ramele Disponibile (Grid Modal)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
