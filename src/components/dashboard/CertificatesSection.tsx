import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useResumeDrafts } from '@/hooks/inspection/useResumeDrafts';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_NEUTRAL } from '@/components/ui/card-recipe';

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
}

const coreCerts: CertDef[] = [
  {
    id: 'eicr',
    title: 'EICR',
    subtitle: 'Electrical Installation Condition Report',
    description: 'Periodic inspection & testing of existing installations',
    standard: 'BS 7671:2018+A4:2026',
  },
  {
    id: 'eic',
    title: 'EIC',
    subtitle: 'Electrical Installation Certificate',
    description: 'New installations, rewires & consumer unit changes',
    standard: 'BS 7671:2018+A4:2026',
  },
  {
    id: 'minor-works',
    title: 'Minor Works',
    subtitle: 'Minor Electrical Installation Works Certificate',
    description: 'Additions, alterations & circuit modifications',
    standard: 'BS 7671:2018+A4:2026',
  },
  {
    id: 'testing-only',
    title: 'Testing Only',
    subtitle: 'Schedule of Tests Record',
    description: 'Lightweight testing record for subcontractors — SoT only, no company details',
    standard: 'BS 7671 Appendix 6',
  },
];

interface CertificatesSectionProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
  onBack: () => void;
}

const CertificatesSection = ({ onNavigate, onBack }: CertificatesSectionProps) => {
  const { data: drafts } = useResumeDrafts();
  const haptic = useHaptic();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header — quiet, no rules or eyebrows; the cards carry the page */}
      <div className="px-4 lg:px-8 pt-3 pb-1">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Certificates
          </h1>
          <span className="text-[13px] text-white">Choose a type to start</span>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 lg:px-8"
      >
        {/*
          Same card as the Inspection & Testing hub: eyebrow, title,
          description, hairline footer carrying the meta on the left and the
          action on the right. 2-up on phones — these were one full-width card
          per row at ~530px each, so choosing between four types meant
          scrolling three screens.

          The card body is a div rather than a button because the footer holds
          TWO real actions (Resume an existing draft, or start a New one) and a
          button can't nest a button. The footer keeps the hub's exact shape.
        */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:max-w-[1600px]">
          {coreCerts.map((cert) => {
            const draft = drafts?.[cert.id];

            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                /*
                 * The WHOLE card starts the certificate, not just the "New"
                 * text (Andrew). It stays a div rather than a button because
                 * the footer holds a second real action (Resume) and a button
                 * cannot nest a button — so it carries the role and keyboard
                 * handling, and the inner actions stop propagation.
                 */
                role="button"
                tabIndex={0}
                aria-label={`New ${cert.title}`}
                onClick={() => {
                  haptic.light();
                  onNavigate(cert.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    haptic.light();
                    onNavigate(cert.id);
                  }
                }}
                className={cn(
                  'group flex h-full flex-col rounded-2xl border p-3.5 text-left sm:p-4',
                  'transition-[background-color,border-color] duration-150 ease-out',
                  'cursor-pointer touch-manipulation outline-none active:scale-[0.995] focus-visible:border-elec-yellow',
                  CARD_NEUTRAL
                )}
              >
                {/* Short form: "BS 7671:2018+A4:2026" truncated to
                    "BS 7671:2018+A4:2…" in a half-width column, and the
                    amendment year isn't what you need when picking a type. */}
                <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  {cert.standard.replace(/:\d{4}\+A\d:\d{4}/, '')}
                </span>

                <h3 className="mt-1.5 text-[15px] font-bold leading-tight tracking-tight text-white sm:text-[17px]">
                  {cert.title}
                </h3>
                {/* The acronym expansion is gone — three lines of uppercase
                    grey restating the title is the biggest thing that made
                    these cards 530px tall, and the description says it better. */}
                <p className="mt-1 text-[11.5px] leading-snug text-white sm:text-[12.5px]">
                  {cert.description}
                </p>

                <div className="flex-grow" />

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.10] pt-1">
                  {draft ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        /* Resume must never read as New. */
                        e.stopPropagation();
                        haptic.light();
                        onNavigate(cert.id, draft.latestReportId, cert.id);
                      }}
                      className="-ml-1 flex h-11 min-w-0 items-center px-1 text-[11.5px] font-semibold text-white touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
                    >
                      <span className="truncate">
                        Resume <span className="tabular-nums">{draft.count}</span>
                      </span>
                    </button>
                  ) : (
                    <span className="min-w-0 truncate text-[11px] text-white">No drafts</span>
                  )}
                  {/* Volt as TEXT, matching "Open" on every other card. The
                      solid volt "New" button plus an outlined volt "Resume"
                      put two volt blocks on every card — and the outlined one
                      used bg-elec-yellow/[0.08], which reads muddy brown. */}
                  <button
                    type="button"
                    onClick={(e) => {
                      /* The card already handles this — stop it running twice. */
                      e.stopPropagation();
                      haptic.light();
                      onNavigate(cert.id);
                    }}
                    className="-mr-1 flex h-11 shrink-0 items-center px-1 text-[12px] font-bold text-elec-yellow touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
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
