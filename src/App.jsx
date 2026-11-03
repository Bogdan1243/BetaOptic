import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProcessTimelineSection from './components/ProcessTimelineSection';
import AtelierSection from './components/AtelierSection';
import LensBrandsSection from './components/LensBrandsSection';
import FrameBrandsSection from './components/FrameBrandsSection';
// InstagramSection is hidden until real posts are available (re-enable import + JSX below)
// import InstagramSection from './components/InstagramSection';
import LocationSection from './components/LocationSection';
import DoctorsPage from './components/DoctorsPage';
import OutletPage from './components/OutletPage';
import { AtelierGalleryModal, ExtraFramesModal, OffersModal } from './components/Modals';

function getViewFromHash(hash) {
  if (hash === '#medici') return 'doctors';
  if (hash === '#outlet' || hash.startsWith('#outlet-')) return 'outlet';
  return 'home';
}

export default function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFramesModalOpen, setIsFramesModalOpen] = useState(false);
  const [activeOfferTab, setActiveOfferTab] = useState(null);

  const [currentView, setCurrentView] = useState(() => {
    return getViewFromHash(window.location.hash);
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getViewFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close any open modal with the Escape key
  useEffect(() => {
    if (!isGalleryOpen && !isFramesModalOpen && !activeOfferTab) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsGalleryOpen(false);
        setIsFramesModalOpen(false);
        setActiveOfferTab(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isGalleryOpen, isFramesModalOpen, activeOfferTab]);

  const navigateTo = (view) => {
    if (view === 'doctors') {
      window.location.hash = 'medici';
    } else if (view === 'outlet') {
      window.location.hash = 'outlet';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentView(view);
  };

  if (currentView === 'doctors') {
    return <DoctorsPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'outlet') {
    return <OutletPage onBack={() => navigateTo('home')} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#0F172A] selection:bg-[#0F172A] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      
      {/* Secțiunea 1: Hero / Introducere */}
      <HeroSection
        onOpenDoctors={() => navigateTo('doctors')}
        onOpenOffer={(tab) => setActiveOfferTab(tab || 'luna')}
        onOpenOutlet={() => navigateTo('outlet')}
      />

      {/* Secțiunea 2: Pașii către o viziune mai bună (Optotip Blur-Focus + Horizontal Timeline) */}
      <ProcessTimelineSection />

      {/* Secțiunea 3: Atelierul Nostru */}
      <AtelierSection onOpenGallery={() => setIsGalleryOpen(true)} />

      {/* Secțiunea 4: Branduri Lentile + Pictograme */}
      <LensBrandsSection />

      {/* Secțiunea 5: Branduri Rame + Pictograme */}
      <FrameBrandsSection onOpenExtraFrames={() => setIsFramesModalOpen(true)} />

      {/* Secțiunea 7: Instagram (hidden until real posts are available) */}
      {/* <InstagramSection /> */}

      {/* Secțiunea 8: Locație */}
      <LocationSection />

      {/* Modal Pop-ups for Sections 1, 3, 4, and 5 */}
      <OffersModal
        isOpen={Boolean(activeOfferTab)}
        activeTab={activeOfferTab || 'luna'}
        onTabChange={(tab) => setActiveOfferTab(tab)}
        onClose={() => setActiveOfferTab(null)}
      />

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
