import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardCarousel({
  cards = [],
  pageSize = 4,
  autoplayMs = 8000,
  label = 'Informații utile Beta Optic',
}) {
  const safePageSize = Math.max(1, pageSize);
  const pages = [];
  for (let i = 0; i < cards.length; i += safePageSize) {
    pages.push(cards.slice(i, i + safePageSize));
  }
  const totalPages = pages.length;

  const [state, setState] = useState({
    currentPage: 0,
    prevPage: null,
    direction: 1,
  });
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const mobileTrackRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setReducedMotion(motionQuery.matches);
    setIsMobileView(mobileQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    const handleMobileChange = (e) => setIsMobileView(e.matches);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
      mobileQuery.addEventListener('change', handleMobileChange);
      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
        mobileQuery.removeEventListener('change', handleMobileChange);
      };
    } else if (motionQuery.addListener) {
      motionQuery.addListener(handleMotionChange);
      mobileQuery.addListener(handleMobileChange);
      return () => {
        motionQuery.removeListener(handleMotionChange);
        mobileQuery.removeListener(handleMobileChange);
      };
    }
  }, []);

  const scrollMobileByCard = useCallback((delta) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('[data-carousel-card]');
    const step = firstCard ? firstCard.getBoundingClientRect().width + 12 : track.clientWidth * 0.85;
    track.scrollBy({ left: delta * step, behavior: 'smooth' });
  }, []);

  const scrollMobileToPage = useCallback(
    (targetPage) => {
      const track = mobileTrackRef.current;
      if (!track || totalPages <= 1) return;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const targetLeft = (targetPage / (totalPages - 1)) * maxScroll;
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    },
    [totalPages]
  );

  const handleMobileScroll = useCallback(() => {
    if (!isMobileView || totalPages <= 1) return;
    const track = mobileTrackRef.current;
    if (!track) return;
    const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    const ratio = track.scrollLeft / maxScroll;
    const approxPage = Math.min(totalPages - 1, Math.max(0, Math.round(ratio * (totalPages - 1))));
    setState((prev) =>
      prev.currentPage === approxPage
        ? prev
        : { currentPage: approxPage, prevPage: prev.currentPage, direction: 1 }
    );
  }, [isMobileView, totalPages]);

  const stepPage = useCallback(
    (delta, isUserAction) => {
      if (totalPages <= 1) return;
      if (isUserAction) {
        setAutoplayStopped(true);
      }
      if (isMobileView && isUserAction) {
        scrollMobileByCard(delta);
        return;
      }
      setState((prev) => {
        const nextPage = (prev.currentPage + delta + totalPages) % totalPages;
        return {
          currentPage: nextPage,
          prevPage: prev.currentPage,
          direction: delta >= 0 ? 1 : -1,
        };
      });
    },
    [totalPages, isMobileView, scrollMobileByCard]
  );

  const goToPage = useCallback(
    (targetPage, isUserAction) => {
      if (totalPages <= 1) return;
      if (isUserAction) {
        setAutoplayStopped(true);
      }
      if (isMobileView && isUserAction) {
        scrollMobileToPage(targetPage);
      }
      setState((prev) => {
        if (targetPage === prev.currentPage) return prev;
        const direction = targetPage > prev.currentPage ? 1 : -1;
        return {
          currentPage: targetPage,
          prevPage: prev.currentPage,
          direction,
        };
      });
    },
    [totalPages, isMobileView, scrollMobileToPage]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || isMobileView) return;
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (
      !autoplayMs ||
      autoplayMs <= 0 ||
      totalPages <= 1 ||
      autoplayStopped ||
      isHovered ||
      hasFocusInside ||
      reducedMotion ||
      prefersReduced
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      stepPage(1, false);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [
    autoplayMs,
    totalPages,
    autoplayStopped,
    isHovered,
    hasFocusInside,
    reducedMotion,
    isMobileView,
    stepPage,
  ]);

  const handleKeyDown = (e) => {
    if (totalPages <= 1) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepPage(-1, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepPage(1, true);
    }
  };

  const handleTouchStart = (e) => {
    if (isMobileView || totalPages <= 1 || !e.touches || e.touches.length === 0) return;
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e) => {
    if (
      isMobileView ||
      totalPages <= 1 ||
      !touchStart ||
      !e.changedTouches ||
      e.changedTouches.length === 0
    ) {
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    setTouchStart(null);

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        stepPage(1, true);
      } else {
        stepPage(-1, true);
      }
    }
  };

  const { currentPage, prevPage, direction } = state;

  if (totalPages === 0) return null;

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocusInside(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHasFocusInside(false);
        }
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="max-w-4xl w-full text-left touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-2xl"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Pagina ${currentPage + 1} din ${totalPages}`}
      </div>

      {/* Stacked pages grid on md+; horizontal CSS scroll-snap swipe row on mobile (<768px) */}
      <div
        ref={mobileTrackRef}
        onScroll={handleMobileScroll}
        className="max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:pb-2 max-md:px-[9%] max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:max-md:-mx-6 sm:max-md:w-[calc(100%+3rem)] max-md:scroll-smooth no-scrollbar md:grid md:grid-cols-1 md:overflow-hidden w-full"
      >
        {pages.map((pageCards, pageIdx) => {
          const isActive = pageIdx === currentPage;
          const isPrev = pageIdx === prevPage;

          let animateProps;
          let transitionProps;

          if (reducedMotion || prevPage === null) {
            animateProps = {
              x: '0%',
              opacity: isActive ? 1 : 0,
            };
            transitionProps = { duration: 0 };
          } else if (isActive) {
            animateProps = {
              x: [direction > 0 ? '100%' : '-100%', '0%'],
              opacity: [0, 1],
            };
            transitionProps = {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            };
          } else if (isPrev) {
            animateProps = {
              x: ['0%', direction > 0 ? '-100%' : '100%'],
              opacity: [1, 0],
            };
            transitionProps = {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            };
          } else {
            animateProps = {
              x: '100%',
              opacity: 0,
            };
            transitionProps = { duration: 0 };
          }

          return (
            <motion.div
              key={pageIdx}
              initial={false}
              animate={animateProps}
              transition={transitionProps}
              aria-hidden={isActive || isMobileView ? undefined : 'true'}
              inert={isActive || isMobileView ? undefined : true}
              className={`max-md:contents max-md:!opacity-100 max-md:!transform-none max-md:!pointer-events-auto max-md:!select-auto md:col-start-1 md:row-start-1 md:grid md:grid-cols-2 md:gap-4 w-full ${
                isActive ? 'z-10' : 'z-0 pointer-events-none select-none'
              }`}
            >
              {pageCards.map((card, idxInPage) => {
                const globalIndex = pageIdx * safePageSize + idxInPage;
                return (
                  <div
                    key={globalIndex}
                    data-carousel-card
                    className="max-md:w-full max-md:shrink-0 max-md:snap-center p-5 sm:p-6 rounded-2xl bg-[#FAF8F5]/90 border border-[#0F172A]/10 shadow-sm backdrop-blur-md hover:border-[#0F172A]/30 transition-all duration-300 flex items-start gap-3.5 sm:gap-4 group"
                  >
                    <span className="serif-title text-xl font-medium text-[#C5A059] group-hover:scale-110 transition-transform">
                      {String(globalIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[#0F172A]/90 text-sm md:text-base leading-relaxed font-semibold">
                        {card.question}
                      </h3>
                      <p className="text-[#0F172A]/90 text-sm md:text-base leading-relaxed font-normal">
                        {card.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* Controls: centered below the grid */}
      {totalPages > 1 && (
        <div className="mt-4 md:mt-5 flex items-center justify-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Cardurile anterioare"
            onClick={() => stepPage(-1, true)}
            className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-[#FAF8F5]/85 border border-[#0F172A]/20 hover:bg-[#0F172A] hover:border-[#0F172A] text-[#0F172A] hover:text-[#FAF8F5] backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            {pages.map((_, idx) => {
              const isActive = idx === currentPage;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Pagina ${idx + 1} din ${totalPages}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goToPage(idx, true)}
                  className="min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={
                      isActive
                        ? 'block w-6 h-2.5 rounded-full bg-[#C5A059] transition-all duration-300'
                        : 'block w-2.5 h-2.5 rounded-full bg-[#0F172A]/20 hover:bg-[#0F172A]/40 transition-all duration-300'
                    }
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Cardurile următoare"
            onClick={() => stepPage(1, true)}
            className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-[#FAF8F5]/85 border border-[#0F172A]/20 hover:bg-[#0F172A] hover:border-[#0F172A] text-[#0F172A] hover:text-[#FAF8F5] backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
