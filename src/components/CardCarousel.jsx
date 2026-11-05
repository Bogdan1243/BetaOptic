import React, { useState, useEffect, useCallback } from 'react';
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
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const stepPage = useCallback(
    (delta, isUserAction) => {
      if (totalPages <= 1) return;
      if (isUserAction) {
        setAutoplayStopped(true);
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
    [totalPages]
  );

  const goToPage = useCallback(
    (targetPage, isUserAction) => {
      if (totalPages <= 1) return;
      if (isUserAction) {
        setAutoplayStopped(true);
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
    [totalPages]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    if (totalPages <= 1 || !e.touches || e.touches.length === 0) return;
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e) => {
    if (totalPages <= 1 || !touchStart || !e.changedTouches || e.changedTouches.length === 0) {
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

      {/* Stacked pages grid: all pages remain mounted in the DOM at all times */}
      <div className="grid grid-cols-1 overflow-hidden w-full">
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
              aria-hidden={isActive ? undefined : 'true'}
              inert={isActive ? undefined : true}
              className={`col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${
                isActive ? 'z-10' : 'z-0 pointer-events-none select-none'
              }`}
            >
              {pageCards.map((card, idxInPage) => {
                const globalIndex = pageIdx * safePageSize + idxInPage;
                return (
                  <div
                    key={globalIndex}
                    className="p-6 rounded-2xl bg-[#FAF8F5]/90 border border-[#0F172A]/10 shadow-sm backdrop-blur-md hover:border-[#0F172A]/30 transition-all duration-300 flex items-start gap-4 group"
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
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Cardurile anterioare"
            onClick={() => stepPage(-1, true)}
            className="w-10 h-10 rounded-full bg-[#FAF8F5]/85 border border-[#0F172A]/20 hover:bg-[#0F172A] hover:border-[#0F172A] text-[#0F172A] hover:text-[#FAF8F5] backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {pages.map((_, idx) => {
              const isActive = idx === currentPage;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Pagina ${idx + 1} din ${totalPages}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goToPage(idx, true)}
                  className={
                    isActive
                      ? 'w-6 h-2.5 rounded-full bg-[#C5A059] transition-all duration-300 cursor-pointer'
                      : 'w-2.5 h-2.5 rounded-full bg-[#0F172A]/20 hover:bg-[#0F172A]/40 transition-all duration-300 cursor-pointer'
                  }
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Cardurile următoare"
            onClick={() => stepPage(1, true)}
            className="w-10 h-10 rounded-full bg-[#FAF8F5]/85 border border-[#0F172A]/20 hover:bg-[#0F172A] hover:border-[#0F172A] text-[#0F172A] hover:text-[#FAF8F5] backdrop-blur-md shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
