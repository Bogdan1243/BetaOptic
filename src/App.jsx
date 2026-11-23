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
import { LensesSeoPage, FramesSeoPage, AtelierSeoPage } from './components/SeoLandingPages';
import { AtelierGalleryModal, ExtraFramesModal, OffersModal, ActiveOffersSection } from './components/Modals';
import { VoucherSection, PrivacyPolicyPage, UnsubscribePage } from './components/VoucherGdprSection';

export const PAGE_TITLES = {
  home: 'Beta Optic Timișoara - Optică Medicală, Ochelari, Lentile, Oftalmologie',
  outlet: 'Beta Optic Outlet Timișoara: Rame, Ochelari de Soare & Consult Oftalmologic',
  doctors: 'Medici Oftalmologi Colaboratori — Beta Optic Timișoara',
  lenses: 'Lentile de Ochelari Timișoara — Nikon, Zeiss, Hoya, Essilor | Beta Optic',
  frames: 'Rame de Ochelari și Ochelari de Soare Timișoara | Beta Optic',
  atelier: 'Atelier Montaj Lentile și Ajustare Ochelari Timișoara | Beta Optic',
  privacy: 'Politica de Confidențialitate (GDPR) & Regulament Voucher | Beta Optic Timișoara',
  unsubscribe: 'Dezabonare Comunicații Comerciale WhatsApp | Beta Optic Timișoara',
};

export function getViewFromLocation(pathname = '/', hash = '') {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  if (cleanPath === '/medici') return 'doctors';
  if (cleanPath === '/outlet') return 'outlet';
  if (cleanPath === '/lentile-ochelari-timisoara') return 'lenses';
  if (cleanPath === '/rame-ochelari-timisoara') return 'frames';
  if (cleanPath === '/atelier-montaj-ochelari') return 'atelier';
  if (cleanPath === '/politica-de-confidentialitate') return 'privacy';
  if (cleanPath === '/dezabonare') return 'unsubscribe';
  if (hash === '#medici') return 'doctors';
  if (hash === '#outlet' || hash.startsWith('#outlet-')) return 'outlet';
  return 'home';
}

export function getPathForView(view) {
  if (view === 'doctors') return '/medici';
  if (view === 'outlet') return '/outlet';
  if (view === 'lenses') return '/lentile-ochelari-timisoara';
  if (view === 'frames') return '/rame-ochelari-timisoara';
  if (view === 'atelier') return '/atelier-montaj-ochelari';
  if (view === 'privacy') return '/politica-de-confidentialitate';
  if (view === 'unsubscribe') return '/dezabonare';
  return '/';
}

export default function App({ initialView = 'home' }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFramesModalOpen, setIsFramesModalOpen] = useState(false);
  const [activeOfferTab, setActiveOfferTab] = useState(null);

  const [currentView, setCurrentView] = useState(initialView);

  useEffect(() => {
    const syncViewFromUrl = () => {
      const { pathname, hash } = window.location;
      const view = getViewFromLocation(pathname, hash);

      // Upgrade legacy hash URLs (#outlet, #medici) to clean paths
      if (hash === '#medici' || hash === '#outlet') {
        window.history.replaceState({}, '', getPathForView(view));
      }

      setCurrentView(view);
      document.title = PAGE_TITLES[view] || PAGE_TITLES.home;
    };

    syncViewFromUrl();
    window.addEventListener('popstate', syncViewFromUrl);
    window.addEventListener('hashchange', syncViewFromUrl);
    return () => {
      window.removeEventListener('popstate', syncViewFromUrl);
      window.removeEventListener('hashchange', syncViewFromUrl);
    };
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
    const targetPath = getPathForView(view);
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentView(view);
    document.title = PAGE_TITLES[view] || PAGE_TITLES.home;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'doctors') {
    return <DoctorsPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'outlet') {
    return <OutletPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'lenses') {
    return <LensesSeoPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'frames') {
    return <FramesSeoPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'atelier') {
    return <AtelierSeoPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'privacy') {
    return <PrivacyPolicyPage onBack={() => navigateTo('home')} />;
  }

  if (currentView === 'unsubscribe') {
    return <UnsubscribePage onBack={() => navigateTo('home')} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#172554] selection:bg-[#172554] selection:text-[#FAF8F5] font-sans antialiased overflow-x-hidden">
      <main>
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

        {/* Secțiunea 6: Oferte Active (Vizibile & Indexabile SEO) */}
        <ActiveOffersSection onOpenOffer={(tab) => setActiveOfferTab(tab || 'luna')} />

        {/* Secțiunea 6B: Voucher 100 RON pe WhatsApp (cu consimțământ GDPR) */}
        <VoucherSection />

        {/* Secțiunea 7: Instagram (hidden until real posts are available) */}
        {/* <InstagramSection /> */}
      </main>

      {/* Secțiunea 8: Locație & Footer */}
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
