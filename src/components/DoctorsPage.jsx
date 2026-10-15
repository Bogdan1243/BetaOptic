import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Stethoscope,
  GraduationCap,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Eye,
  CheckCircle2,
  Award,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/doctorsData';

export default function DoctorsPage({ onBack }) {
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientDate, setPatientDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientPhone.trim()) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctorForModal(null);
      setPatientName('');
      setPatientPhone('');
      setPatientDate('');
    }, 3000);
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

          {/* Quick Call Header CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+40721316224"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#0F172A] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0F172A] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Programări:</span>
              <span>0721 316 224</span>
            </a>
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
      <section className="py-16 px-6 md:px-16 w-full max-w-7xl mx-auto">
        <div className="space-y-16">
          
          {DOCTORS_DATA.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-3xl bg-[#F4EFE6] border border-[#E5DEC9] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Doctor Portrait & Quick Info Column (Left) */}
                <div className="lg:col-span-4 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5DEC9]">
                  <div className="space-y-6">
                    
                    {/* Portrait Image Container */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0F172A]/5 shadow-inner">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-top filter contrast-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                      
                      {/* Badge Top Left */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#FAF8F5]/90 backdrop-blur-md text-[#0F172A] border border-[#0F172A]/10">
                        {doctor.badge}
                      </span>

                      {/* Experience Bottom Left */}
                      <div className="absolute bottom-3 left-3 right-3 text-[#FAF8F5]">
                        <span className="block text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
                          Experiență Clinică
                        </span>
                        <strong className="text-sm font-bold">
                          {doctor.experienceYears}
                        </strong>
                      </div>
                    </div>

                    {/* Schedule & Availability Box */}
                    <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/10 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
                        <Clock className="w-4 h-4 text-[#C5A059] flex-none" />
                        <span>Program Consultații:</span>
                      </div>
                      <p className="text-[#0F172A]/80 font-medium pl-6">
                        {doctor.schedule}
                      </p>
                      <p className="text-[11px] text-[#0F172A]/60 italic pl-6">
                        {doctor.contactNote}
                      </p>
                    </div>

                  </div>

                  {/* Booking CTA Button on Left Column */}
                  <div className="pt-6">
                    <button
                      onClick={() => setSelectedDoctorForModal(doctor)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0F172A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0F172A] transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Programează Consult</span>
                    </button>
                  </div>
                </div>

                {/* Doctor Bio & Deep Experience Details (Right) */}
                <div className="lg:col-span-8 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    
                    {/* Header: Name and Title */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
                          {doctor.title}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-[#0F172A]/5 text-[#0F172A]/70 text-[11px] font-medium border border-[#0F172A]/10">
                          Beta Optic Specialist
                        </span>
                      </div>

                      <h2 className="serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">
                        {doctor.name}
                      </h2>
                      
                      <p className="text-xs sm:text-sm font-medium text-[#0F172A]/75 mt-1">
                        {doctor.credentials}
                      </p>
                    </div>

                    {/* Specialties Pill Badges */}
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#0F172A]/60 mb-2.5">
                        Arii de Competență & Specializări:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#0F172A]/15 text-[#0F172A] text-xs font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio / Lorem Ipsum Block (Editable by User) */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#0F172A]/60">
                        Profil Profesional & Detalii Clinice:
                      </span>
                      
                      <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F172A]/10 space-y-3 text-sm text-[#0F172A]/85 leading-relaxed font-normal">
                        <p className="font-medium text-[#0F172A]">
                          {doctor.experienceSummary}
                        </p>
                        <p className="text-[#0F172A]/80 leading-relaxed font-light">
                          {doctor.bio}
                        </p>
                      </div>
                    </div>

                    {/* Education & Accreditations */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-[#0F172A]/60">
                        Educație & Acreditări Profesionale:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {doctor.education.map((edu, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#FAF8F5]/70 border border-[#0F172A]/10 flex items-start gap-2.5 text-xs text-[#0F172A]/80 font-medium"
                          >
                            <GraduationCap className="w-4 h-4 text-[#C5A059] flex-none mt-0.5" />
                            <span>{edu}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Direct Contact Footer Line */}
                  <div className="pt-6 border-t border-[#0F172A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#0F172A]/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C5A059]" />
                      <span>Cabinet Beta Optic, Str. Lucian Blaga 7, Timișoara</span>
                    </div>

                    <a
                      href={`https://wa.me/40721316224?text=${encodeURIComponent(
                        `Bună ziua! Aș dori să programez o consultație cu ${doctor.name} la Beta Optic.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#C5A059] font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#C5A059]" />
                      <span>Întrebare rapidă pe WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>
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

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:+40721316224"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C5A059] text-[#0F172A] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Sună pentru Programare: 0721 316 224</span>
            </a>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF8F5]/10 hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#0F172A] border border-[#FAF8F5]/20 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Înapoi la Pagina Principală</span>
            </button>
          </div>

          <div className="pt-8 text-xs text-[#FAF8F5]/50 border-t border-[#FAF8F5]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>Strada Lucian Blaga 7, Timișoara • Luni - Vineri: 09:00 - 18:00</span>
            <span>Beta Optic © {new Date().getFullYear()}</span>
          </div>

        </div>
      </section>

      {/* Appointment Booking Modal */}
      {selectedDoctorForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/75 backdrop-blur-sm">
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
                <h3 className="serif-title text-2xl font-bold text-[#0F172A]">
                  {selectedDoctorForModal.name}
                </h3>
                <p className="text-xs text-[#0F172A]/60">
                  {selectedDoctorForModal.title}
                </p>
              </div>

              <button
                onClick={() => setSelectedDoctorForModal(null)}
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
                  Solicitare Înregistrată!
                </h4>
                <p className="text-xs text-[#0F172A]/75 max-w-xs mx-auto">
                  Mulțumim{patientName ? `, ${patientName}` : ''}! Te vom contacta în scurt timp la <strong>{patientPhone}</strong> pentru confirmarea orei exacte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
                    Nume și Prenume *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Popescu Ion"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
                    Număr de Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="ex. 0721 000 000"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70 mb-1.5">
                    Ziua Preferată (Opțional)
                  </label>
                  <input
                    type="date"
                    value={patientDate}
                    onChange={(e) => setPatientDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6] border border-[#0F172A]/20 text-[#0F172A] text-sm focus:outline-none focus:border-[#0F172A]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctorForModal(null)}
                    className="w-1/2 py-3 rounded-xl border border-[#0F172A]/20 text-xs uppercase font-semibold text-[#0F172A] hover:bg-[#F4EFE6] transition-colors"
                  >
                    Anulează
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-xl bg-[#0F172A] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#0F172A] text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmă</span>
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
