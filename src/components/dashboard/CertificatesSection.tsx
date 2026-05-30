import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeDrafts } from '@/hooks/inspection/useResumeDrafts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface CertDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  standard: string;
  /** Tailwind gradient string — only the "from-" token is used, for the accent dot. */
  accentColor: string;
}

const coreCerts: CertDef[] = [
  {
    id: 'eicr',
    title: 'EICR',
    subtitle: 'Electrical Installation Condition Report',
    description: 'Periodic inspection & testing of existing installations',
    standard: 'BS 7671:2018+A4:2026',
    accentColor: 'from-blue-500 via-blue-400 to-cyan-400',
  },
  {
    id: 'eic',
    title: 'EIC',
    subtitle: 'Electrical Installation Certificate',
    description: 'New installations, rewires & consumer unit changes',
    standard: 'BS 7671:2018+A4:2026',
    accentColor: 'from-emerald-500 via-emerald-400 to-green-400',
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    subtitle: 'Minor Electrical Installation Works Certificate',
    description: 'Additions, alterations & circuit modifications',
    standard: 'BS 7671:2018+A4:2026',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
  },
  {
    id: 'testing-only',
    title: 'Testing Only',
    subtitle: 'Schedule of Tests Record',
    description: 'Lightweight testing record for subcontractors — SoT only, no company details',
    standard: 'BS 7671 Appendix 6',
    accentColor: 'from-purple-500 via-purple-400 to-pink-400',
  },
];

interface CertificatesSectionProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
  onBack: () => void;
}

const CertificatesSection = ({ onNavigate, onBack }: CertificatesSectionProps) => {
  const { data: drafts } = useResumeDrafts();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Certificates</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-2.5"
      >
        {/* Editorial section label — mirrors HubSection across the I&T pages */}
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-3 px-0.5">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Select a type
          </h2>
          <span className="text-[10.5px] text-white/30 tabular-nums">{coreCerts.length}</span>
        </motion.div>

        {/* Core cert types — framed list, hairline-separated, gold top hairline */}
        <motion.div
          variants={itemVariants}
          className="relative border border-white/[0.14] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
          <div className="divide-y divide-white/[0.18]">
            {coreCerts.map((cert) => {
              // Solid accent dot derived from the gradient's "from-" token.
              const dot = cert.accentColor.split(' ')[0].replace('from-', 'bg-');
              const draft = drafts?.[cert.id];

              return (
                <div key={cert.id} className="relative">
                  <button
                    type="button"
                    onClick={() => onNavigate(cert.id)}
                    className="group relative flex w-full flex-col text-left p-5 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
                  >
                    {/* accent dot + mono standard badge */}
                    <div className="flex items-start justify-between gap-3">
                      <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0', dot)} aria-hidden />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0">
                        {cert.standard}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[20px] sm:text-[22px] font-semibold tracking-tight leading-[1.1] text-white group-hover:text-elec-yellow transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/45 leading-snug">
                      {cert.subtitle}
                    </p>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">
                      {cert.description}
                    </p>

                    <div className="mt-4 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-elec-yellow">
                        New
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>

                  {/* Resume strip — only when in-progress drafts of this type exist */}
                  {draft && (
                    <button
                      type="button"
                      onClick={() => onNavigate(cert.id, draft.latestReportId, cert.id)}
                      className="group flex w-full items-center justify-between gap-2 border-t border-elec-yellow/15 bg-elec-yellow/[0.06] px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-elec-yellow/[0.1] active:bg-elec-yellow/[0.14] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
                    >
                      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-elec-yellow/90">
                        {draft.count} in progress
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-elec-yellow">
                        Resume
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default CertificatesSection;
