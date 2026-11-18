import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import doctorPlaceholder from '../assets/doctors/doctor-placeholder.webp';
import glassesLogo from '../assets/glasses-logo.webp';
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  CheckCircle2,
  Send,
  Stethoscope,
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctorsData';
import { MobileCarouselGrid } from './CardCarousel';

const WHATSAPP_NUMBER = '40721316224';

export default function DoctorsPage({ onBack }) {
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientDate, setPatientDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeBookingModal = () => {
    setSelectedDoctorForModal(null);
    setBookingSuccess(false);
  };

  // Close the booking modal with the Escape key and lock body scroll while open
  useEffect(() => {
    if (!selectedDoctorForModal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeBookingModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedDoctorForModal]);

  // Appointment submission via WhatsApp
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const name = patientName.trim().slice(0, 100);
    const phone = patientPhone.trim().slice(0, 30);
    if (!name || !phone) return;

    const lines = [
      `Bună ziua! Aș dori o programare la ${selectedDoctorForModal.name} (Beta Optic).`,
      `Nume: ${name}`,
      `Telefon: ${phone}`,
    ];
    if (patientDate) lines.push(`Ziua preferată: ${patientDate}`);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setBookingSuccess(true);
    setTimeout(() => {
      closeBookingModal();
      setPatientName('');
      setPatientPhone('');
      setPatientDate('');
    }, 4000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#172554]/10 px-4 sm:px-6 md:px-16 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Back Button + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  if (onBack) onBack();
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 md:py-2 min-h-[44px] md:min-h-0 rounded-full border border-[#172554]/20 bg-[#F4EFE6] hover:bg-[#172554] hover:text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#FAF8F5] group-hover:-translate-x-1 transition-transform shrink-0" />
              <span>Pagina Principală</span>
            </a>

            <div className="h-6 w-px bg-[#172554]/15 hidden sm:block" />

            <a
              href="/"
              aria-label="Beta Optic Timișoara — Pagina Principală"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  if (onBack) onBack();
                }
              }}
              className="flex items-center justify-center sm:justify-start gap-2.5 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full border border-[#172554]/30 flex items-center justify-center bg-[#FAF8F5] p-1.5 group-hover:border-[#C5A059] transition-colors shrink-0">
                <img
                  src={glassesLogo}
                  alt="Sigla Beta Optic Timișoara"
                  width="36"
                  height="26"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="serif-title text-lg font-bold tracking-widest text-[#172554] uppercase leading-none block">
                  BETA OPTIC<sup className="text-[10px] font-bold align-super ml-0.5">®</sup>
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#172554]/60 uppercase font-medium">
                  Timișoara
                </span>
              </div>
            </a>
          </div>

        </div>
      </header>

      <main>
      {/* Hero Section of Doctors Page */}
      <section className="pt-10 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 md:px-16 w-full relative overflow-hidden bg-gradient-to-b from-[#F4EFE6]/60 to-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-2xl sm:rounded-full border border-[#172554]/15 bg-[#F4EFE6] text-[#172554] text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest mb-5 sm:mb-6"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>Cabinet Oftalmologic & Optometrie Clinică</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="serif-title text-3xl sm:text-6xl md:text-7xl font-semibold text-[#172554] leading-tight mb-5 sm:mb-6"
          >
            Medici <span className="sr-only">Oftalmologi </span>Colaboratori Beta Optic<span className="sr-only"> Timișoara — Consult Oftalmologic și Optometrie Clinică</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#172554]/80 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-0 sm:mb-8"
          >
          </motion.p>

          {/* Key Value Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#172554]/85"
          >
            <div className="px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#172554]/15 flex items-center gap-2 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Aparatură de Diagnostic Avansat</span>
            </div>
            <div className="px-3.5 sm:px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#172554]/15 flex items-center gap-2 shadow-2xs">
              <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Medici Primari & Specialiști Certificați</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main Doctors Cards Grid Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-16 w-full max-w-7xl mx-auto">
        <MobileCarouselGrid
          desktopClassName="md:grid md:grid-cols-2 max-w-2xl mx-auto md:gap-6"
          label="Medici oftalmologi colaboratori Beta Optic"
        >
          {DOCTORS_DATA.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              id={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] p-6 shadow-xs hover:shadow-md hover:border-[#172554]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Avatar with Eye */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5DEC9] flex items-center justify-center p-6 mb-5 shadow-2xs group-hover:border-[#172554]/20 transition-colors">
                  <img
                    src={doctorPlaceholder}
                    alt={`Portret ilustrativ — ${doctor.name}, ${doctor.title} la Beta Optic Timișoara`}
                    width="600"
                    height="600"
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8A6928] lg:text-[#C5A059] block mb-1.5">
                  {doctor.title}
                </span>

                <h2 className="serif-title text-2xl font-bold text-[#172554] leading-snug">
                  {doctor.name}
                </h2>
              </div>

              {/* Program consultații (schedule) - lăsat comentat */}
              {/*
              {doctor.schedule && (
                <div className="pt-4 mt-4 border-t border-[#172554]/10 flex items-center gap-2 text-xs text-[#172554]/70">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Program: {doctor.schedule}</span>
                </div>
              )}
              */}

              {/* Booking CTA Button (comentat) */}
              {/*
              <div className="pt-4 mt-4 border-t border-[#172554]/10">
                <button
                  onClick={() => setSelectedDoctorForModal(doctor)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#172554] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#172554] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Programează Consult</span>
                </button>
              </div>
              */}
            </motion.div>
          ))}
        </MobileCarouselGrid>
      </section>
      </main>

      {/* Bottom Visit & Atelier Invitation Section */}
      <section className="py-14 sm:py-20 max-sm:pb-[max(3.5rem,calc(2rem+env(safe-area-inset-bottom)))] px-4 sm:px-6 md:px-16 w-full bg-[#172554] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5]/90 p-2.5 flex items-center justify-center mx-auto border border-[#FAF8F5]/30">
            <img
              src={glassesLogo}
              alt="Sigla Beta Optic Timișoara"
              width="48"
              height="34"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block">
              Consultare & Atelier de Precizie
            </span>
            <h2 className="serif-title text-3xl sm:text-5xl font-bold text-[#FAF8F5]">
              Te Așteptăm la Beta Optic Timișoara
            </h2>
            <p className="text-sm sm:text-lg text-[#FAF8F5]/75 max-w-xl mx-auto font-light leading-relaxed">
              Fie că ai nevoie de o evaluare medicală a dioptriilor, de adaptarea lentilelor progresive sau de ajustarea ramelor preferate, medicii și optometriștii noștri sunt alături de tine.
            </p>
          </div>

          <div className="pt-8 text-xs text-[#FAF8F5]/50 border-t border-[#FAF8F5]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>Strada Lucian Blaga 7, Timișoara • Luni - Vineri: 09:00 - 18:00</span>
            <span>Beta Optic © {new Date().getFullYear()}</span>
          </div>

        </div>
      </section>

      {/* Appointment Booking Modal (lăsat pregătit / comentat dacă este necesar) */}
      {selectedDoctorForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172554]/75 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-[#FAF8F5] text-[#172554] rounded-3xl p-6 sm:p-8 border border-[#E5DEC9] shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#172554]/10 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  Programare Consultație
                </span>
                <h3 id="booking-modal-title" className="serif-title text-2xl font-bold text-[#172554]">
                  {selectedDoctorForModal.name}
                </h3>
                <p className="text-xs text-[#172554]/60">
                  {selectedDoctorForModal.title}
                </p>
              </div>

              <button
                onClick={closeBookingModal}
                aria-label="Închide"
                className="w-11 h-11 md:w-8 md:h-8 rounded-full border border-[#172554]/20 flex items-center justify-center hover:bg-[#172554] hover:text-[#FAF8F5] text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#172554] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="serif-title text-2xl font-bold text-[#172554]">
                  Continuă în WhatsApp
                </h4>
                <p className="text-xs text-[#172554]/75 max-w-xs mx-auto">
                  Mulțumim{patientName ? `, ${patientName}` : ''}! Am deschis WhatsApp cu mesajul precompletat — apasă „Trimite” acolo, iar noi te contactăm la <strong>{patientPhone}</strong> pentru confirmarea orei exacte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold uppercase tracking-wider text-[#172554]/70 mb-1.5">
                    Nume și Prenume *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="ex. Popescu Ion"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#172554]/20 text-[#172554] text-base sm:text-sm focus:outline-none focus:border-[#172554]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#172554]/70 mb-1.5">
                    Număr de Telefon *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    maxLength={30}
                    pattern="[0-9+()\s.\-]{6,30}"
                    title="Introdu un număr de telefon valid"
                    autoComplete="tel"
                    placeholder="ex. 0721 000 000"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#172554]/20 text-[#172554] text-base sm:text-sm focus:outline-none focus:border-[#172554]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wider text-[#172554]/70 mb-1.5">
                    Ziua Preferată (Opțional)
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={patientDate}
                    onChange={(e) => setPatientDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#172554]/20 text-[#172554] text-base sm:text-sm focus:outline-none focus:border-[#172554]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="w-1/2 py-3 min-h-[44px] rounded-xl border border-[#172554]/20 text-xs uppercase font-semibold text-[#172554] hover:bg-[#F4EFE6] transition-colors"
                  >
                    Anulează
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 min-h-[44px] rounded-xl bg-[#172554] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#172554] text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Trimite pe WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}
