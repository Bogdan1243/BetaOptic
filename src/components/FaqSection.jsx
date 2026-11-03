import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/opticData';

export default function FaqSection() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id || null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="intrebari-frecvente"
      aria-labelledby="faq-heading"
      className="py-28 px-6 md:px-16 w-full bg-[#FAF8F5] text-[#0F172A] border-t border-[#0F172A]/10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-4 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
            <span>Informații Utile</span>
          </motion.div>

          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="serif-title text-4xl sm:text-6xl font-semibold text-[#0F172A] leading-tight mb-4"
          >
            Întrebări Frecvente
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#0F172A]/75 text-base md:text-lg font-normal"
          >
            Răspunsuri clare despre consultațiile oftalmologice, montajul în atelierul propriu și colecțiile Beta Optic Timișoara.
          </motion.p>
        </div>

        {/* Accessible Accordion List — all answers remain in the DOM at all times */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const buttonId = `${item.id}-button`;
            const panelId = `${item.id}-panel`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F4EFE6] border-[#0F172A]/30 shadow-md'
                    : 'bg-[#F4EFE6]/70 border-[#E5DEC9] hover:border-[#0F172A]/25'
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <span className="serif-title text-xl sm:text-2xl font-bold text-[#0F172A] group-hover:text-[#0F172A] leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#0F172A] border-[#0F172A] text-[#C5A059] rotate-180'
                          : 'bg-[#FAF8F5] border-[#0F172A]/20 text-[#0F172A] group-hover:border-[#0F172A]'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 pt-1 border-t border-[#0F172A]/10 text-[#0F172A]/85 text-sm sm:text-base leading-relaxed">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
