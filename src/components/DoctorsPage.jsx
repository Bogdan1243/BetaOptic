import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Eye,
  MapPin,
  MessageCircle,
  Send,
  Stethoscope,
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctorsData';

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

  // Close the booking modal with the Escape key
  useEffect(() => {
    if (!selectedDoctorForModal) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeBookingModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#0F172A] selection:bg-[#0F172A] selection:text-[#FAF8F5] font-sans antialiased">
      
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#0F172A]/10 px-6 md:px-16 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Back Button + Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0F172A]/20 bg-[#F4EFE6] hover:bg-[#0F172A] hover:text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xs group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#FAF8F5] group-hover:-translate-x-1 transition-transform" />
              <span>Pagina Principală</span>
            </button>

            <div className="h-6 w-px bg-[#0F172A]/15 hidden sm:block" />

            <button
              onClick={onBack}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full border border-[#0F172A]/30 flex items-center justify-center bg-[#FAF8F5] text-[#0F172A] group-hover:border-[#C5A059] transition-colors">
                <Eye className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="hidden sm:block">
                <span className="serif-title text-lg font-bold tracking-widest text-[#0F172A] uppercase leading-none block">
                  BETA OPTIC
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#0F172A]/60 uppercase font-medium">
                  Timișoara
                </span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section of Doctors Page */}
      <section className="pt-16 pb-14 px-6 md:px-16 w-full relative overflow-hidden bg-gradient-to-b from-[#F4EFE6]/60 to-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0F172A]/15 bg-[#F4EFE6] text-[#0F172A] text-xs uppercase tracking-widest mb-6"
          >
            <Stethoscope className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Cabinet Oftalmologic & Optometrie Clinică</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="serif-title text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0F172A] leading-tight mb-6"
          >
            Medicii și Specialiștii Beta Optic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#0F172A]/80 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-8"
          >
            O echipă de medici oftalmologi și optometriști dedicați acuității tale vizuale. Combinăm rigoarea diagnosticului medical modern cu arta montajului de precizie.
          </motion.p>

          {/* Key Value Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-[#0F172A]/85"
          >
            <div className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#0F172A]/15 flex items-center gap-2 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Aparatură de Diagnostic Avansat</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#0F172A]/15 flex items-center gap-2 shadow-2xs">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>Medici Primari & Specialiști Certificați</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#0F172A]/15 flex items-center gap-2 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Cabinet Integrat cu Atelierul Nostru</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main Doctors Cards Grid Section */}
      <section className="py-16 px-6 md:px-16 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {DOCTORS_DATA.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              id={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] p-8 sm:p-10 shadow-xs hover:shadow-md hover:border-[#0F172A]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
                    {doctor.title}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#0F172A]/5 text-[#0F172A]/70 text-[11px] font-medium border border-[#0F172A]/10">
                    Beta Optic
                  </span>
                </div>

                <h2 className="serif-title text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-2">
                  {doctor.name}
                </h2>
              </div>

              {/* Program consultații (schedule) - lăsat comentat */}
              {/*
              {doctor.schedule && (
                <div className="pt-6 mt-6 border-t border-[#0F172A]/10 flex items-center gap-2 text-xs text-[#0F172A]/70">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Program: {doctor.schedule}</span>
                </div>
              )}
              */}

              {/* Booking CTA Button (comentat) */}
              {/*
              <div className="pt-6 mt-6 border-t border-[#0F172A]/10">
                <button
                  onClick={() => setSelectedDoctorForModal(doctor)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Programează Consult</span>
                </button>
              </div>
              */}
            </motion.div>
          ))}

        </div>
      </section>

      {/* Bottom Visit & Atelier Invitation Section */}
      <section className="py-20 px-6 md:px-16 w-full bg-[#0F172A] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5]/10 text-[#C5A059] flex items-center justify-center mx-auto border border-[#FAF8F5]/20">
            <Eye className="w-7 h-7 stroke-[1.5]" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block">
              Consultare & Atelier de Precizie
            </span>
            <h2 className="serif-title text-3xl sm:text-5xl font-bold text-[#FAF8F5]">
              Te Așteptăm la Beta Optic Timișoara
            </h2>
            <p className="text-base sm:text-lg text-[#FAF8F5]/75 max-w-xl mx-auto font-light leading-relaxed">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/75 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-[#FAF8F5] text-[#0F172A] rounded-3xl p-6 sm:p-8 border border-[#E5DEC9] shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#0F172A]/10 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  Programare Consultație
                </span>
                <h3 id="booking-modal-title" className="serif-title text-2xl font-bold text-[#0F172A]">
                  {selectedDoctorForModal.name}
                </h3>
                <p className="text-xs text-[#0F172A]/60">
                  {selectedDoctorForModal.title}
                </p>
              </div>

              <button
                onClick={closeBookingModal}
                aria-label="Închide"
                className="w-8 h-8 rounded-full border border-[#0F172A]/20 flex items-center justify-center hover:bg-[#0F172A] hover:text-[#FAF8F5] text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="serif-title text-2xl font-bold text-[#0F172A]">
                  Continuă în WhatsApp
                </h4>
                <p className="text-xs text-[#0F172A]/75 max-w-xs mx-auto">
                  Mulțumim{patientName ? `, ${patientName}` : ''}! Am deschis WhatsApp cu mesajul precompletat — apasă „Trimite” acolo, iar noi te contactăm la <strong>{patientPhone}</strong> pentru confirmarea orei exacte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
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
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
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
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
                    Ziua Preferată (Opțional)
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={patientDate}
                    onChange={(e) => setPatientDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="w-1/2 py-3 rounded-xl border border-[#0F172A]/20 text-xs uppercase font-semibold text-[#0F172A] hover:bg-[#F4EFE6] transition-colors"
                  >
                    Anulează
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-xl bg-[#0F172A] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0F172A] text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2"
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
