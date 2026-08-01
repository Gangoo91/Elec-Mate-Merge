import { motion } from 'framer-motion';
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
      {/* Header — quiet, no rules or eyebrows; the cards carry the page */}
      <div className="px-4 lg:px-8 pt-3 pb-1">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Certificates
          </h1>
          <span className="text-[13px] text-white/50">Choose a type to start</span>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 lg:px-8"
      >
        {/* 2×2 card grid — equal heights, aligned action rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:max-w-[1600px]">
          {coreCerts.map((cert) => {
            const draft = drafts?.[cert.id];

            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl p-5 sm:p-6',
                  'bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/[0.12]',
                  'transition-all duration-200 hover:border-white/[0.22] hover:from-white/[0.09] hover:to-white/[0.05]',
                  'hover:shadow-[0_10px_32px_rgba(0,0,0,0.35)] focus-within:border-elec-yellow/50'
                )}
              >
                {/* accent mark + standard badge */}
                <div className="relative flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] border border-white/[0.12] shrink-0">
                    <span className="h-3 w-3 rounded-full bg-elec-yellow" aria-hidden />
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 border border-white/[0.16] rounded px-1.5 py-0.5 shrink-0">
                    {cert.standard}
                  </span>
                </div>

                <h3 className="relative mt-4 text-[22px] sm:text-2xl font-semibold tracking-tight leading-[1.1] text-white">
                  {cert.title}
                </h3>
                <p className="relative mt-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/50 leading-snug">
                  {cert.subtitle}
                </p>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-white/65">
                  {cert.description}
                </p>

                {/* Action row — pinned to the card base so all four cards align */}
                <div className="relative mt-auto pt-5 flex items-center justify-between gap-3">
                  {draft ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(cert.id, draft.latestReportId, cert.id)}
                      className={cn(
                        'h-11 px-4 rounded-xl text-[13px] font-semibold text-elec-yellow',
                        'border border-elec-yellow/40 bg-elec-yellow/[0.08]',
                        'touch-manipulation active:scale-[0.97] transition-all hover:bg-elec-yellow/[0.14]'
                      )}
                    >
                      Resume
                      <span className="ml-1.5 text-elec-yellow/70 tabular-nums">{draft.count}</span>
                    </button>
                  ) : (
                    <span className="text-[11.5px] text-white/40">No drafts</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigate(cert.id)}
                    className={cn(
                      'h-11 px-7 rounded-xl text-[14px] font-bold bg-elec-yellow text-black',
                      'touch-manipulation active:scale-[0.97] transition-transform',
                      'shadow-[0_4px_16px_rgba(245,184,28,0.2)]'
                    )}
                  >
                    New
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.main>
    </div>
  );
};

export default CertificatesSection;
