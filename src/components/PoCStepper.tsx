// src/components/PoCStepper.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PoC } from '@/data/walkthroughs';
import { ScreenVisual } from './ScreenVisual';

interface PoCStepperProps {
  poc: PoC;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

export function PoCStepper({ poc }: PoCStepperProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const isFirstScreen = currentScreen === 0;
  const isLastScreen = currentScreen === poc.screens.length - 1;
  const progress = ((currentScreen + 1) / poc.screens.length) * 100;
  const screen = poc.screens[currentScreen];

  const navigate = (next: number) => {
    setDirection(next > currentScreen ? 1 : -1);
    setCurrentScreen(next);
  };

  const handleNext = () => { if (!isLastScreen) navigate(currentScreen + 1); };
  const handlePrev = () => { if (!isFirstScreen) navigate(currentScreen - 1); };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Progress bar */}
      <div className="h-[3px] bg-slate-900/50 flex-shrink-0">
        <div
          className="h-full bg-gradient-to-r from-taupe-500 to-taupe-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentScreen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-7"
            >
              {/* Hook — tier1 as hero */}
              {screen.tier1 && (
                <h2 className="font-display font-bold text-white leading-snug text-3xl md:text-4xl lg:text-[42px] max-w-2xl">
                  {screen.tier1}
                </h2>
              )}

              {/* Sub-copy — content field */}
              <p className="text-[15px] text-slate-400 leading-relaxed max-w-xl">
                {screen.content}
              </p>

              {/* Visual panel */}
              <div className="rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/[0.06] p-7">
                <ScreenVisual slug={poc.slug} screenIndex={currentScreen} />
              </div>

              {/* Tech pill — tier2, only if present */}
              {screen.tier2 && (
                <div className="inline-flex items-center gap-2 bg-taupe-500/[0.08] border border-taupe-500/20 rounded-full px-3 py-1.5 w-fit">
                  {poc.mcp && (
                    <span className="text-[11px] font-semibold text-taupe-400">
                      {poc.mcp}
                    </span>
                  )}
                  {poc.mcp && <span className="text-taupe-500/40 select-none">·</span>}
                  <span className="text-[11px] text-taupe-500">{screen.tier2}</span>
                </div>
              )}

              {/* Last screen CTA */}
              <AnimatePresence>
                {isLastScreen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex justify-center pt-2"
                  >
                    <a
                      href="https://idyllwoodlab.com/#ai-consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-taupe-500 to-taupe-400 text-slate-950 font-semibold text-[15px] hover:opacity-90 transition-opacity shadow-lg shadow-taupe-900/20"
                    >
                      Build this for my team
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="flex-shrink-0 border-t border-white/[0.05] bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={isFirstScreen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/[0.05] text-sm font-medium text-slate-300"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="flex items-center gap-2">
            {poc.screens.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Go to screen ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width:      i === currentScreen ? 10 : 7,
                  height:     i === currentScreen ? 10 : 7,
                  background: i === currentScreen ? '#a39785' : '#1e293b',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isLastScreen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/[0.05] text-sm font-medium text-slate-300"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
