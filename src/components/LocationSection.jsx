import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  return (
    <section id="locatie" className="py-28 px-6 md:px-16 w-full bg-[#0F172A] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/10 text-xs uppercase tracking-widest text-[#C5A059] mb-4"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Sediul Central Beta Optic</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="serif-title text-4xl sm:text-6xl font-semibold text-[#FAF8F5] leading-tight mb-4"
          >
            Te Așteptăm în Atelierul Nostru
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#FAF8F5]/70 text-base md:text-lg font-light"
          >
            O atmosferă primitoare, degustare de cafea de origine și servicii dedicate vederii tale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Box: Contact & Address Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#FAF8F5]/5 border border-[#FAF8F5]/15 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <h3 className="serif-title text-3xl font-bold text-[#FAF8F5] mb-2">Beta Optic Timișoara</h3>
                <p className="text-xs uppercase tracking-widest text-[#C5A059]">Atelier & Showroom Flagship</p>
              </div>

              <div className="space-y-6 text-sm text-[#FAF8F5]/90">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">Adresă Sediu Principal</strong>
                    <span>Strada Lucian Blaga 7, Timișoara</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">Program Programări & Consult</strong>
                    <span>Luni - Vineri: 09:00 - 18:00</span><br />
                    <span>Sâmbătă: 09:00 - 13:00 (Duminică închis)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">Telefon & WhatsApp</strong>
                    <a href="tel:+40721316224" className="hover:text-[#C5A059] transition-colors">+40 (721) 316 224</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 flex items-center justify-center text-[#C5A059] flex-none">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#FAF8F5]/50 mb-1">Email Oficial</strong>
                    <a href="mailto:contact@betaoptic.ro" className="hover:text-[#C5A059] transition-colors">contact@betaoptic.ro</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#FAF8F5]/15">
              <a
                href="https://www.google.com/maps/place/Beta+Optic/@45.7540572,21.2251246,17z/data=!3m1!4b1!4m6!3m5!1s0x47455d7ff8235135:0xa3750d3f6ff5eecc!8m2!3d45.7540535!4d21.2277049!16s%2Fg%2F11c1n9nsmq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF8F5] text-[#0F172A] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all shadow-md group"
              >
                <Navigation className="w-4 h-4 text-[#0F172A] group-hover:scale-110 transition-transform" />
                <span>Deschide Navigația Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </motion.div>

          {/* Right Box: Google Maps Visual Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#FAF8F5]/15 shadow-2xl relative min-h-[400px] bg-[#1E293B]"
          >
            {/* Google Maps Embed iframe */}
            <iframe
              title="Locație Beta Optic Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.8547802408234!2d21.2251246!3d45.7540572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d7ff8235135%3A0xa3750d3f6ff5eecc!2sBeta%20Optic!5e0!3m2!1sro!2sro!4v1710000000000!5m2!1sro!2sro"
              className="w-full h-full min-h-[420px] border-0 filter contrast-125 saturate-75 opacity-90"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Soft Pin Card Badge */}

          </motion.div>

        </div>

        {/* Footer Copyright */}
        <div className="mt-20 pt-8 border-t border-[#FAF8F5]/10 text-center text-xs text-[#FAF8F5]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Beta Optic. Toate drepturile rezervate.</span>
          <span className="serif-title text-base font-semibold tracking-widest text-[#FAF8F5]/80 uppercase">
            „Vizibilitatea ta, viziunea noastră”
          </span>
        </div>

      </div>
    </section>
  );
}
