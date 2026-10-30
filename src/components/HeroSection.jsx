import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/Beta_Optic_afara2.webp';
import { Eye, Stethoscope, ArrowRight } from 'lucide-react';
import { HERO_DATA } from '../data/opticData';

export default function HeroSection({ onOpenDoctors }) {
  return (
      <section className="relative min-h-[75vh] md:min-h-[80vh] w-full flex flex-col justify-between overflow-hidden bg-[#FAF8F5]">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Storefront photo with subtle dark/beige ambient overlay */}
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="w-full h-full object-cover scale-100 filter brightness-80 contrast-[1.05]"
        />

        {/* Layered Luxury Overlay for Perfect Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/75 via-[#FAF8F5]/60 to-[#FAF8F5]" />
        <div className="absolute inset-0 bg-[#0F172A]/10 mix-blend-overlay" />
      </div>

      {/* Top Ambient Branding Watermark & Doctors Button */}
      <div className="relative z-10 w-full pt-10 px-8 md:px-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full border border-[#0F172A]/30 flex items-center justify-center bg-[#FAF8F5]/60 backdrop-blur-md text-[#0F172A]">
            <Eye className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="serif-title text-2xl font-bold tracking-widest text-[#0F172A] uppercase">
              BETA OPTIC
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#0F172A]/70 uppercase font-medium">
              Timișoara
            </span>
          </div>
        </motion.div>

        {/* Top-Right Button: Access to Doctors Page */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          onClick={onOpenDoctors}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF8F5]/85 hover:bg-[#0F172A] border border-[#0F172A]/20 hover:border-[#0F172A] backdrop-blur-md text-[#0F172A] hover:text-[#FAF8F5] transition-all duration-300 shadow-sm cursor-pointer group"
        >
          <Stethoscope className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Medicii Noștri
          </span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </motion.button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center justify-center my-auto">
        {/* Subtle Luxury Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        </motion.div>

        {/* Main Slogan strictly requested */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="serif-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-[#0F172A] tracking-tight leading-none mb-10 lowercase"
        >
          „{HERO_DATA.slogan}”
        </motion.h1>

        {/* Welcoming Statements Grid / Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full text-left"
        >
          {HERO_DATA.welcomeMessages.map((msg, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#FAF8F5]/90 border border-[#0F172A]/10 shadow-sm backdrop-blur-md hover:border-[#0F172A]/30 transition-all duration-300 flex items-start gap-4 group"
            >
              <span className="serif-title text-xl font-medium text-[#C5A059] group-hover:scale-110 transition-transform">
                0{index + 1}
              </span>
              <p className="text-[#0F172A]/90 text-sm md:text-base leading-relaxed font-normal">
                "{msg}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>


    </section>
  );
}
