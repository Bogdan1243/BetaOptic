import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Sparkles, Camera } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/opticData';

// Custom Instagram SVG Icon
function InstagramIcon({ classNames = "w-4 h-4" }) {
  return (
    <svg className={classNames} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section className="py-24 px-6 md:px-16 w-full bg-[#FAF8F5] border-t border-[#0F172A]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-3"
            >
              <InstagramIcon classNames="w-3.5 h-3.5 text-[#C5A059]" />
              <span>@betaoptic.official</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="serif-title text-4xl sm:text-5xl font-semibold text-[#0F172A]"
            >
              Universul Nostru Vizual pe Instagram
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#0F172A]/30 text-[#0F172A] text-xs uppercase font-semibold tracking-wider hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-all self-start md:self-auto shadow-xs"
          >
            <InstagramIcon classNames="w-4 h-4" />
            <span>Urmărește Profilul Oficial</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </motion.a>
        </div>

        {/* Instagram Grid (Square Placeholders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm bg-[#F4EFE6] cursor-pointer"
            >
              <img
                src={post.image}
                alt={`Instagram Beta Optic ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-[1.03]"
              />

              {/* Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-[#0F172A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-[#FAF8F5]">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-current text-[#C5A059]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-current text-[#FAF8F5]" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-[#FAF8F5]/90 line-clamp-4 font-light">
                  {post.caption}
                </p>

                <div className="text-[11px] uppercase tracking-widest text-[#C5A059] font-medium flex items-center gap-1">
                  <span>Vezi Postarea</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
