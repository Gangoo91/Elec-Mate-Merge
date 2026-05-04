import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CostEngineerInterface from '@/components/electrician-tools/cost-engineer/CostEngineerInterface';
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

const CostEngineerPage = () => {
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
                Cost Engineer
              </h1>
            </div>
            <button
              type="button"
              onClick={() => navigate('/electrician/cost-engineer/quotes')}
              className="text-[12px] font-medium text-white/70 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              My Quotes
            </button>
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
            <span className="text-elec-yellow">Cost</span>{' '}
            <span className="text-white">Engineer.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
          >
            Brief the engineer with your scope, region and constraints. Get a fully-priced quote
            with three tiers, profit analysis and a client-ready PDF in minutes.
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

        {/* INTERFACE — wizard, streaming or results */}
        <motion.section variants={itemVariants}>
          <CostEngineerInterface />
        </motion.section>
      </motion.main>
    </div>
  );
};

export default CostEngineerPage;
