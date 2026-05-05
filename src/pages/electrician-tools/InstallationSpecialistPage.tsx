import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InstallationSpecialistInterface from '@/components/electrician-tools/installation-specialist/InstallationSpecialistInterface';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';

function partOfDay(): 'MORNING' | 'AFTERNOON' | 'EVENING' {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
}

function dateEyebrow(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
}

const InstallationSpecialistPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const fromAgentSelector = location.state?.fromAgentSelector;
  const fromSavedResults = (location.state as { fromSavedResults?: boolean } | null)
    ?.fromSavedResults;

  const firstName = useMemo(() => {
    const full = profile?.full_name?.trim();
    if (!full) return null;
    return full.split(/\s+/)[0]?.toUpperCase() ?? null;
  }, [profile?.full_name]);

  // Pull design context from URL / sessionStorage so a Circuit Designer
  // handoff lands on the briefing pre-filled with the chosen design.
  const [designerContext, setDesignerContext] = React.useState<unknown>(null);
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('sessionId');
    if (sessionId) {
      const stored = sessionStorage.getItem(sessionId);
      if (stored) {
        try {
          setDesignerContext(JSON.parse(stored));
          sessionStorage.removeItem(sessionId);
        } catch {
          /* ignore malformed payload */
        }
      }
      return;
    }
    const ctx = params.get('designContext');
    if (ctx) {
      try {
        setDesignerContext(JSON.parse(decodeURIComponent(ctx)));
      } catch {
        /* ignore malformed payload */
      }
    }
  }, [location.search]);

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() =>
                navigate(fromAgentSelector ? '/electrician/agent-selector' : '/electrician')
              }
              aria-label={
                fromAgentSelector ? 'Back to AI Design Consultation' : 'Back to Electrician Hub'
              }
              className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{fromAgentSelector ? 'AI Design Consultation' : 'Electrician Hub'}</span>
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                Installation Specialist
              </h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-4 space-y-7 sm:space-y-10"
      >
        {/* HERO — only on briefing view; hidden once streaming/results
            because those screens render their own full-bleed layouts. */}
        {!fromSavedResults && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative pt-2 sm:pt-4"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow>{dateEyebrow()}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
            >
              <span className="text-elec-yellow">Installation</span>{' '}
              <span className="text-white">Specialist.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
            >
              Brief the install. Get a step-by-step method statement with safety calls, tooling,
              materials and BS 7671 sign-off — printable in minutes.
            </motion.p>

            {firstName && (
              <motion.p
                variants={itemVariants}
                className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/60"
              >
                Logged in as {firstName}
              </motion.p>
            )}
          </motion.section>
        )}

        {/* INTERFACE — briefing, streaming or results */}
        <motion.section variants={itemVariants}>
          <InstallationSpecialistInterface designerContext={designerContext} />
        </motion.section>
      </motion.main>
    </div>
  );
};

export default InstallationSpecialistPage;
