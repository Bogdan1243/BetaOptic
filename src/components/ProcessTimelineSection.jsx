import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Glasses, Disc, Ruler, Sliders, Wrench, CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/opticData';

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
    <section id="proces" class="relative py-16 px-4 md:px-12 w-full overflow-hidden bg-[#FAF8F5] border-t border-[#0F172A]/10">
      
      {/* Background Visual: "BETA OPTIC" Eye Chart with Progressive Blur — fills entire section */}
      <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.5]">
        {/* NEW: The "Light Box" Backlight Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85%] max-w-3xl h-[75%] bg-white/70 blur-[80px] rounded-full" />
        </div>

        {/* The Text Rows (Your existing text code goes here) */}
        <div className="relative z-10 select-none text-center w-full h-full flex flex-col justify-between py-26 md:py-80">
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.3em] leading-none whitespace-nowrap" style={{ filter: 'blur(0px)' }}>
            <span class="text-6xl md:text-8xl lg:text-7xl">BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.25em] leading-none whitespace-nowrap" style={{ filter: 'blur(0.6px)' }}>
            <span class="text-4xl md:text-6xl lg:text-6xl">BETA OPTIC &nbsp;&nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.2em] leading-none whitespace-nowrap" style={{ filter: 'blur(1.2px)' }}>
            <span class="text-3xl md:text-5xl lg:text-5xl">BETA OPTIC &nbsp;&nbsp; BETA OPTIC &nbsp;&nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.18em] leading-none whitespace-nowrap" style={{ filter: 'blur(2px)' }}>
            <span class="text-2xl md:text-4xl lg:text-4xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.15em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.5px)' }}>
            <span class="text-xl md:text-3xl lg:text-3xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.12em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.7px)' }}>
            <span class="text-lg md:text-2xl lg:text-2xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.1em] leading-none whitespace-nowrap" style={{ filter: 'blur(2.9px)' }}>
            <span class="text-base md:text-xl lg:text-1xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
          <div class="serif-title font-bold text-[#0F172A] tracking-[0.08em] leading-none whitespace-nowrap" style={{ filter: 'blur(3.2px)' }}>
            <span class="text-sm md:text-lg lg:text-xl">BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC &nbsp; BETA OPTIC</span>
          </div>
        </div>
        {/* Soft vignette overlay for blending edges */}
        <div class="absolute inset-0 bg-radial from-transparent via-[#FAF8F5]/40 to-[#FAF8F5]" />
      </div>

      {/* Section Content */}
      <div class="relative z-10 max-w-6xl mx-auto">
        
        {/* Title Header */}
        <div class="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4 shadow-xs"
          >
            <Sparkles class="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Standardul Beta Optic</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            class="serif-title text-4xl sm:text-5xl md:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
          >
            „Ochelarii buni nu se aleg. Se construiesc corect."
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            class="text-[#0F172A]/70 text-base md:text-lg font-normal max-w-2xl mx-auto"
          >
            Descoperă cei 7 pași meticuloși prin care transformăm nevoile tale vizuale într-o piesă optică perfect personalizată.
          </motion.p>
        </div>

        {/* Vertical Alternating Timeline */}
        <div class="relative">
          
          {/* Center vertical line — visible on md+ */}
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0F172A]/5 via-[#0F172A]/25 to-[#0F172A]/5 -translate-x-1/2" />

          {/* Mobile left-side line */}
          <div class="block md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0F172A]/5 via-[#0F172A]/25 to-[#0F172A]/5" />

          <div class="flex flex-col gap-6 md:gap-10">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComp = iconMap[step.icon] || Activity;
              const isLeft = idx % 2 === 0; // even = left side, odd = right side

              return (
                <div
                  key={step.number}
                  class="relative flex items-center md:items-stretch"
                >
                  {/* ===== DESKTOP LAYOUT (md+) ===== */}

                  {/* Left column */}
                  <div class="hidden md:flex w-1/2 pr-12 justify-end">
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        class="w-full max-w-md"
                      >
                        <TimelineCard step={step} idx={idx} IconComp={IconComp} />
                      </motion.div>
                    ) : (
                      <div /> /* Empty placeholder */
                    )}
                  </div>

                  {/* Center dot connector — desktop */}
                  <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      class="w-5 h-5 rounded-full border-[3px] border-[#0F172A] bg-[#FAF8F5] shadow-md group-hover:bg-[#C5A059] transition-colors"
                    />
                  </div>

                  {/* Right column */}
                  <div class="hidden md:flex w-1/2 pl-12 justify-start">
                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        class="w-full max-w-md"
                      >
                        <TimelineCard step={step} idx={idx} IconComp={IconComp} />
                      </motion.div>
                    ) : (
                      <div /> /* Empty placeholder */
                    )}
                  </div>

                  {/* ===== MOBILE LAYOUT (below md) ===== */}

                  {/* Mobile dot connector */}
                  <div class="flex md:hidden absolute left-6 -translate-x-1/2 z-20 items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      class="w-4 h-4 rounded-full border-[2.5px] border-[#0F172A] bg-[#FAF8F5] shadow-sm"
                    />
                  </div>

                  {/* Mobile card — always on the right of the line */}
                  <div class="flex md:hidden w-full pl-14">
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      class="w-full"
                    >
                      <TimelineCard step={step} idx={idx} IconComp={IconComp} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}

/** Reusable timeline card component */
function TimelineCard({ step, idx, IconComp }) {
  return (
    <div class="h-full p-5 rounded-2xl bg-[#F4EFE6]/90 border border-[#E5DEC9] shadow-xs hover:shadow-md hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-xs group">
      
      {/* Top Step Badge & Icon */}
      <div class="flex items-center justify-between mb-4 relative">
        {/* Step Circle */}
        <div class="w-11 h-11 rounded-2xl bg-[#0F172A] text-[#FAF8F5] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#C5A059] group-hover:text-[#0F172A] transition-all duration-300">
          <IconComp class="w-7 h-7 stroke-[1.5]" />
        </div>

        {/* Step Number */}
        <span class="serif-title text-3xl font-bold text-[#0F172A]/30 group-hover:text-[#0F172A] transition-colors">
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 class="serif-title text-2xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#0F172A] transition-colors">
          {step.title}
        </h3>
        <p class="text-[#0F172A]/80 text-sm leading-relaxed font-normal">
          {step.description}
        </p>
      </div>

      {/* Progress indicator bar inside card */}
      <div class="w-full h-1 bg-[#0F172A]/10 rounded-full mt-6 overflow-hidden">
        <div 
          class="h-full bg-[#0F172A] group-hover:bg-[#C5A059] transition-all duration-500"
          style={{ width: `${((idx + 1) / 7) * 100}%` }}
        />
      </div>
    </div>
  );
}
