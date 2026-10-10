import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AIInstallationDesigner } from '@/components/electrician-tools/circuit-designer/AIInstallationDesigner';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';

function dateLine(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

const CircuitDesigner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const fromAgentSelector = location.state?.fromAgentSelector;

  const firstName = useMemo(() => {
    const full = profile?.full_name?.trim();
    if (!full) return null;
    return full.split(/\s+/)[0] ?? null;
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
              aria-label={
                fromAgentSelector ? 'Back to AI Design Consultation' : 'Back to Electrician Hub'
              }
              className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{fromAgentSelector ? 'AI Design Consultation' : 'Electrician Hub'}</span>
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                Circuit designer
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
          <motion.p variants={itemVariants} className="text-[13px] text-white">
            {dateLine()}
            {firstName ? ` · Signed in as ${firstName}` : ''}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[34px]"
          >
            Circuit designer
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white sm:text-[15px]"
          >
            Brief the designer with your project, supply and circuits. Get a BS 7671-compliant cable
            schedule, protective device selection and validation report back in minutes.
          </motion.p>

          <motion.p variants={itemVariants} className="mt-3 text-[13px] text-white tabular-nums">
            BS 7671:2018 · Amendment A4:2026 · 18th Edition
          </motion.p>
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
