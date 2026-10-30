import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc, ShieldCheck } from 'lucide-react';
import { LENS_BRANDS_MAIN } from '../data/opticData';

export default function LensBrandsSection() {
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
            <Disc className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Optică de Precizie Incontestabilă</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="serif-title text-4xl sm:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
          >
            Branduri Partenere Lentile
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#0F172A]/75 text-base md:text-lg font-normal"
          >
            Alegem exclusiv producători mondiali care redefinesc performanța optică, puritatea cromatică și rezistența la zgârieturi.
          </motion.p>
        </div>

        {/* Featured Main Brands (4 Main Lens Giants) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {LENS_BRANDS_MAIN.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs hover:shadow-lg hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle background emblem */}
              <div className="absolute -right-8 -bottom-8 opacity-5 text-[#0F172A] pointer-events-none font-serif text-9xl uppercase font-bold">
                {brand.name[0]}
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0F172A] text-[#FAF8F5]">
                    {brand.badge}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#0F172A]/50 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    {brand.origin}
                  </span>
                </div>

                <h3 className="serif-title text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0F172A] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-6">
                  {brand.tagline}
                </p>

                <p className="text-[#0F172A]/85 text-sm sm:text-base leading-relaxed font-normal">
                  {brand.text}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#0F172A]/10 flex items-center justify-between text-xs text-[#0F172A]/70">
                <span className="tracking-wider uppercase">Garanție Oficială Premium</span>
                <span className="font-medium flex items-center gap-1 text-[#0F172A]">
                  Disponibil la Beta Optic
                </span>
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
