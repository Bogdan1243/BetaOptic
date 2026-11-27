import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Glasses, Disc, Ruler, Sliders, Wrench, CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/opticData';
import { MobileCarouselGrid } from './CardCarousel';

// Map string icon names to Lucide icons
const iconMap = {
  Activity: Activity,
  Glasses: Glasses,
  Disc: Disc,
  Ruler: Ruler,
  Sliders: Sliders,
  Wrench: Wrench,
  CheckCircle2: CheckCircle2,
};

export default function ProcessTimelineSection() {
  return (
    <section id="proces" className="relative py-16 px-4 md:px-12 w-full overflow-hidden bg-[#FAF8F5] border-t border-[#172554]/10">
      
      {/* Background Visual: "BETA OPTIC" Eye Chart with Progressive Blur — fills entire section */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.5]">
        {/* NEW: The "Light Box" Backlight Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85%] max-w-3xl h-[75%] bg-white/70 blur-[40px] md:blur-[80px] rounded-full" />
        </div>

        {/* The Text Rows (Your existing text code goes here) */}
        <div className="relative z-10 select-none text-center w-full h-full flex flex-col justify-between pt-64 pb-16 md:py-80">
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.15em] md:tracking-[0.3em] leading-none whitespace-nowrap" style={{ filter: 'blur(0px)' }}>
            <span className="text-3xl sm:text-5xl md:text-8xl lg:text-7xl">BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.12em] md:tracking-[0.25em] leading-none whitespace-nowrap" style={{ filter: 'blur(0.6px)' }}>
            <span className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl">BETA OPTIC &nbsp;&nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.1em] md:tracking-[0.2em] leading-none whitespace-nowrap" style={{ filter: 'blur(1.2px)' }}>
            <span className="text-xl sm:text-3xl md:text-5xl lg:text-5xl">BETA OPTIC &nbsp;&nbsp; BETA OPTIC &nbsp;&nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.08em] md:tracking-[0.18em] leading-none whitespace-nowrap" style={{ filter: 'blur(2px)' }}>
            <span className="text-lg sm:text-2xl md:text-4xl lg:text-4xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.08em] md:tracking-[0.15em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.5px)' }}>
            <span className="text-base sm:text-xl md:text-3xl lg:text-3xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.06em] md:tracking-[0.12em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.7px)' }}>
            <span className="text-sm sm:text-lg md:text-2xl lg:text-2xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.06em] md:tracking-[0.1em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.9px)' }}>
            <span className="text-xs sm:text-base md:text-xl lg:text-xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div className="font-[Arial,sans-serif] font-bold text-[#172554] tracking-[0.05em] md:tracking-[0.08em] leading-none whitespace-nowrap" style={{ filter: 'blur(3.2px)' }}>
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
        </div>
        {/* Soft vignette overlay for blending edges */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F5]/40 to-[#FAF8F5]" />
      </div>

      {/* Section Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-xs uppercase tracking-widest mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Standardul Beta Optic</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="serif-title text-2xl sm:text-4xl md:text-5xl font-semibold text-[#172554] leading-tight mb-4"
          >
            <span className="sr-only">
              Optică Medicală și Consult Oftalmologic în Timișoara — Alegerea Ramelor și Lentilelor de Ochelari:{' '}
            </span>
            „Împreună vom selecta ramele care îți subliniază personalitatea"
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#172554]/70 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto"
          >
            Descoperă cei 7 pași meticuloși prin care transformăm nevoile tale vizuale într-o piesă optică perfect personalizată.
          </motion.p>
        </div>

        {/* Single DOM Tree: Horizontal Swipe Carousel on Mobile (<md), Alternating Vertical Timeline on Desktop (md+) */}
        <div className="relative">
          {/* Center vertical line — visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#172554]/5 via-[#172554]/25 to-[#172554]/5 -translate-x-1/2" />

          <MobileCarouselGrid
            desktopClassName="md:flex md:flex-col md:gap-10"
            label="Cei 7 pași către o viziune mai bună"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const IconComp = iconMap[step.icon] || Activity;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex items-stretch ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Center dot connector — desktop only */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-[3px] border-[#172554] bg-[#FAF8F5] shadow-md" />
                  </div>

                  <div
                    className={`w-full ${
                      isLeft
                        ? 'md:w-1/2 md:pr-12 md:flex md:justify-end'
                        : 'md:w-1/2 md:pl-12 md:flex md:justify-start'
                    }`}
                  >
                    <div className="w-full md:max-w-md h-full">
                      <TimelineCard step={step} idx={idx} IconComp={IconComp} />
                    </div>
                  </div>
                </div>
              );
            })}
          </MobileCarouselGrid>
        </div>
        
      </div>
    </section>
  );
}

/** Reusable timeline card component */
function TimelineCard({ step, idx, IconComp }) {
  return (
    <div className="h-full p-5 rounded-2xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs hover:shadow-md hover:border-[#172554]/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-xs group">
      
      {/* Top Step Badge & Icon */}
      <div className="flex items-center justify-between mb-4 relative">
        {/* Step Circle */}
        <div className="w-11 h-11 rounded-2xl bg-[#172554] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#C5A059] group-hover:text-[#172554] transition-all duration-300">
          <IconComp className="w-7 h-7 stroke-[1.5]" />
        </div>

        {/* Step Number */}
        <span className="serif-title text-3xl font-bold text-[#172554]/30 group-hover:text-[#172554] transition-colors">
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="serif-title text-2xl font-semibold text-[#172554] mb-3 group-hover:text-[#172554] transition-colors">
          {step.title}
        </h3>
        <p className="text-[#172554]/80 text-sm leading-relaxed font-normal">
          {step.description}
        </p>
      </div>

      {/* Progress indicator bar inside card */}
      <div className="w-full h-1 bg-[#172554]/10 rounded-full mt-6 overflow-hidden">
        <div 
          className="h-full bg-[#172554] group-hover:bg-[#C5A059] transition-all duration-500"
          style={{ width: `${((idx + 1) / 7) * 100}%` }}
        />
      </div>
    </div>
  );
}
