import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProcessTimelineSection from './components/ProcessTimelineSection';
import AtelierSection from './components/AtelierSection';
import LensBrandsSection from './components/LensBrandsSection';
import FrameBrandsSection from './components/FrameBrandsSection';
import QAFormSection from './components/QAFormSection';
import InstagramSection from './components/InstagramSection';
import LocationSection from './components/LocationSection';
import DoctorsPage from './components/DoctorsPage';
import { AtelierGalleryModal, ExtraFramesModal } from './components/Modals';

export default function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFramesModalOpen, setIsFramesModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#medici' ? 'doctors' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#medici' ? 'doctors' : 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    if (view === 'doctors') {
      window.location.hash = 'medici';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentView(view);
  };

  if (currentView === 'doctors') {
    return <DoctorsPage onBack={() => navigateTo('home')} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#0F172A] selection:bg-[#0F172A] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      
      {/* Secțiunea 1: Hero / Introducere */}
      <HeroSection onOpenDoctors={() => navigateTo('doctors')} />

      {/* Secțiunea 2: Pașii către o viziune mai bună (Optotip Blur-Focus + Horizontal Timeline) */}
      <ProcessTimelineSection />

      {/* Secțiunea 3: Atelierul Nostru */}
      <AtelierSection onOpenGallery={() => setIsGalleryOpen(true)} />

      {/* Secțiunea 4: Branduri Lentile + Pictograme */}
      <LensBrandsSection />

      {/* Secțiunea 5: Branduri Rame + Pictograme */}
      <FrameBrandsSection onOpenExtraFrames={() => setIsFramesModalOpen(true)} />

      {/* Secțiunea 6: Formular (Q&A) */}
      <QAFormSection />

      {/* Secțiunea 7: Instagram */}
      <InstagramSection />

      {/* Secțiunea 8: Locație */}
      <LocationSection />

      {/* Modal Pop-ups for Sections 3, 4, and 5 */}
      <AtelierGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      <ExtraFramesModal
        isOpen={isFramesModalOpen}
        onClose={() => setIsFramesModalOpen(false)}
      />
    </div>
  );
}
