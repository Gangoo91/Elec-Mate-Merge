import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AIInstallationDesigner } from '@/components/electrician-tools/circuit-designer/AIInstallationDesigner';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';

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

const CircuitDesigner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const fromAgentSelector = location.state?.fromAgentSelector;

  const firstName = useMemo(() => {
    const full = profile?.full_name?.trim();
    if (!full) return null;
    return full.split(/\s+/)[0]?.toUpperCase() ?? null;
  }, [profile?.full_name]);

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
              aria-label={fromAgentSelector ? 'Back to AI Design Consultation' : 'Back to Electrician Hub'}
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
                Circuit Designer
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
        {/* HERO */}
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
            <span className="text-elec-yellow">Circuit</span>{' '}
            <span className="text-white">Designer.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
          >
            Brief the designer with your project, supply and circuits. Get a BS 7671-compliant
            cable schedule, protective device selection and validation report back in minutes.
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

        {/* STANDARD STRIP — flat on mobile, gridline cells on tablet+ */}
        <motion.section variants={itemVariants}>
          {/* Mobile — flat inline labels */}
          <div className="sm:hidden flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-b border-white/[0.06] py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Standard
              </span>
              <span className="text-[13px] font-semibold text-white tabular-nums">
                BS 7671:2018
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Amendment
              </span>
              <span className="text-[13px] font-semibold text-elec-yellow tabular-nums">
                A4:2026
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Edition
              </span>
              <span className="text-[13px] font-semibold text-white">18th</span>
            </div>
          </div>
          {/* Tablet+ — gridline cells */}
          <div className="hidden sm:grid grid-cols-3 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Standard
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white tabular-nums">
                BS 7671:2018
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Amendment
              </div>
              <div className="mt-1 text-[13px] font-semibold text-elec-yellow tabular-nums">
                A4:2026
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Edition
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white">18th</div>
            </div>
          </div>
        </motion.section>

        {/* WIZARD */}
        <motion.section variants={itemVariants}>
          <AIInstallationDesigner />
        </motion.section>
      </motion.main>
    </div>
  );
};

export default CircuitDesigner;
