import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Cpu } from 'lucide-react';
import rightCardVideo from '../assets/Video_Atelier_Card_Dreapta.mp4';
import rightCardVideoMobile from '../assets/Video_Atelier_Card_Dreapta-mobile.mp4';

const VIDEO_POSTER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'/%3E";

export default function AtelierSection({ onOpenGallery }) {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-16 w-full overflow-hidden bg-[#0F172A] text-[#FAF8F5]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">

          {/* Left Column: Descriptive Text & Features */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/10 backdrop-blur-md text-xs uppercase tracking-widest text-[#C5A059]"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Laborator Bespoke</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="serif-title text-3xl sm:text-6xl lg:text-7xl font-semibold leading-tight text-[#FAF8F5]"
            >
              Atelierul Nostru — Tehnologie și Precizie
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#FAF8F5] text-base md:text-lg leading-relaxed font-semibold"
            >
              Nidek & Essilor Mr. Blue
            </motion.p>
            {/* Highlights Grid */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">

              
            </div>

            {/* Modal Trigger Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-2 sm:pt-4"
            >
              <button
                onClick={onOpenGallery}
                className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 min-h-[48px] md:min-h-0 rounded-full bg-[#FAF8F5] text-[#0F172A] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all duration-300 shadow-lg group cursor-pointer"
              >
                <Grid className="w-4 h-4 text-[#0F172A] group-hover:scale-110 transition-transform shrink-0" />
                <span>Vezi Galerie Foto & Video Atelier</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Card Preview Stack */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-[#FAF8F5]/20 shadow-2xl group"
            >
              {/* REPLACED IMAGE WITH VIDEO HERE */}
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={VIDEO_POSTER_SVG}
                  aria-label="Video din atelierul Beta Optic"
                  className="w-full h-[340px] sm:h-[450px] md:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              >
                <source src={rightCardVideoMobile} type="video/mp4" media="(max-width: 767px)" />
                {/* 2. Use the imported video here. Or, if using an external link, put the URL in quotes like src="https://..." */}
                <source src={rightCardVideo} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              {/* Floating Overlay Badge */}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
