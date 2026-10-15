import React from 'react';
import { motion } from 'framer-motion';
import { Play, Grid, Camera, Award, Cpu, ShieldCheck } from 'lucide-react';
import rightCardVideo from '../assets/Video_Atelier_Card_Dreapta.mp4';

export default function AtelierSection({ onOpenGallery }) {
  return (
    <section class="relative py-28 px-6 md:px-16 w-full overflow-hidden bg-[#0F172A] text-[#FAF8F5]">
      {/* Background Video / Atmospheric Footage */}
      <div class="absolute inset-0 w-full h-full opacity-35 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1582142839970-2b9e058a6963?auto=format&fit=crop&w=1920&q=80"
          class="w-full h-full object-cover filter contrast-125 saturate-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-optician-checking-glasses-with-equipment-41585-large.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette Overlay */}
        <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Descriptive Text & Features */}
          <div class="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/10 backdrop-blur-md text-xs uppercase tracking-widest text-[#C5A059]"
            >
              <Cpu class="w-3.5 h-3.5" />
              <span>Secțiunea 3 • Laborator Bespoke</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              class="serif-title text-4xl sm:text-6xl lg:text-7xl font-semibold leading-tight text-[#FAF8F5]"
            >
              Atelierul Nostru — Sanctuarul Preciziei Optice
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              class="text-[#FAF8F5]/80 text-base md:text-lg leading-relaxed font-light"
            >
              În atelierul Beta Optic, știința optică întâlnește măiestria artizanală. Fiecare pereche de ochelari este asamblată cu echipamente germane și japoneze de ultimă generație, garantând centrare tridimensională exactă și o ergonomie desăvârșită.
            </motion.p>

            {/* Highlights Grid */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div class="p-5 rounded-xl border border-[#FAF8F5]/15 bg-[#FAF8F5]/5 backdrop-blur-md">
                <ShieldCheck class="w-6 h-6 text-[#C5A059] mb-3" />
                <h4 class="serif-title text-xl font-semibold text-[#FAF8F5] mb-1">Toleranță Zero la Erori</h4>
                <p class="text-xs text-[#FAF8F5]/70 leading-relaxed">
                  Centrare digitală cu precizie de 0.1mm pentru reducerea la minim a efortului de acomodare pupilară.
                </p>
              </div>

              <div class="p-5 rounded-xl border border-[#FAF8F5]/15 bg-[#FAF8F5]/5 backdrop-blur-md">
                <Award class="w-6 h-6 text-[#C5A059] mb-3" />
                <h4 class="serif-title text-xl font-semibold text-[#FAF8F5] mb-1">Tratamente Protejate</h4>
                <p class="text-xs text-[#FAF8F5]/70 leading-relaxed">
                  Montaj acustic fără tensiuni mecanice pe marginea lentilei pentru durabilitatea antireflexului.
                </p>
              </div>
            </div>

            {/* Modal Trigger Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              class="pt-4"
            >
              <button
                onClick={onOpenGallery}
                class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF8F5] text-[#0F172A] font-semibold text-sm uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all duration-300 shadow-lg group"
              >
                <Grid class="w-4 h-4 text-[#0F172A] group-hover:scale-110 transition-transform" />
                <span>Vezi Galerie Foto & Video Atelier</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Card Preview Stack */}
          <div class="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              class="relative rounded-3xl overflow-hidden border border-[#FAF8F5]/20 shadow-2xl group"
            >
              {/* REPLACED IMAGE WITH VIDEO HERE */}
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              >
                {/* 2. Use the imported video here. Or, if using an external link, put the URL in quotes like src="https://..." */}
                <source src={rightCardVideo} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              {/* Floating Overlay Badge */}
              <div class="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0F172A]/85 backdrop-blur-md border border-[#FAF8F5]/15">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-xs uppercase tracking-widest text-[#C5A059] block mb-1">Echipament De Vârf</span>
                    <h3 class="serif-title text-xl font-semibold text-[#FAF8F5]">Visucore 500 & NIDEK Edging</h3>
                  </div>
                  <button
                    onClick={onOpenGallery}
                    class="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#0F172A] flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Deschide videoclip"
                  >
                    <Play class="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
