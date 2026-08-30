import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useResumeDrafts, type ResumeDraftInfo } from '@/hooks/inspection/useResumeDrafts';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_NEUTRAL, CARD_DISABLED } from '@/components/ui/card-recipe';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface CertDef {
  id: string;
  title: string;
  description: string;
  standard: string;
  /** Tailwind gradient string — only the "from-" token is used, for the accent dot. */
  accentColor: string;
  comingSoon?: boolean;
  category: 'electrical' | 'fire-safety' | 'security' | 'renewables';
  /** Overrides the default /new cert route (e.g. the log book area). */
  route?: string;
}

const specialistCerts: CertDef[] = [
  // Electrical
  {
    /*
     * ELE-1262. Listed here as well as with the core three, because the two
     * moments a user reaches for it are different: on the core picker they are
     * choosing between this and a Minor Works Certificate; here they are
     * browsing what the app can produce.
     *
     * 🔴 `standard` is NOT "BS 7671". Part 6 specifies three model forms and
     * this is not one of them.
     */
    id: 'visual-condition',
    title: 'Visual Condition',
    description: 'Visual inspection only, no testing',
    standard: 'Visual only',
    accentColor: 'from-sky-500 via-sky-400 to-cyan-400',
    category: 'electrical',
  },
  {
    /*
     * ELE-1634. Sits next to Visual Condition on purpose — it is the same
     * document with a different reader, and someone reaching for one should
     * see the other.
     *
     * 🔴 `standard` is "Advisory", not "BS 7671" and not "Visual only". The
     * reader here is a house-buyer rather than a tradesperson, and this badge
     * is the first thing that tells them what they are being handed.
     */
    id: 'pre-purchase-survey',
    title: 'Pre-Purchase Survey',
    description: 'Photo-led advisory survey for a buyer',
    standard: 'Advisory',
    accentColor: 'from-violet-500 via-purple-400 to-fuchsia-400',
    category: 'electrical',
  },
  {
    /*
     * ELE-1110. Planned maintenance with an optional thermographic survey.
     *
     * 🔴 `standard` is NOT "BS 7671" — Part 6 has no model form for this, and
     * BS 7671 says nothing about thermography. The badge names the duty the
     * report supports: EAWR Regulation 4(2).
     */
    id: 'routine-inspection',
    title: 'Routine Inspection',
    description: 'Maintenance visit with optional thermal survey',
    standard: 'EAWR 1989',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
    category: 'electrical',
  },
  {
    id: 'ev-charging',
    title: 'EV Charging',
    description: 'Charge point installation',
    standard: 'IET CoP',
    accentColor: 'from-emerald-500 via-teal-400 to-cyan-400',
    category: 'electrical',
  },
  {
    id: 'pat-testing',
    title: 'PAT Testing',
    description: 'Portable appliance testing',
    standard: 'IET CoP',
    accentColor: 'from-cyan-500 via-cyan-400 to-blue-400',
    category: 'electrical',
  },
  {
    id: 'disconnection',
    title: 'Disconnection',
    description: 'Circuit & appliance disconnection',
    standard: 'BS 7671',
    accentColor: 'from-rose-500 via-pink-400 to-rose-400',
    category: 'electrical',
  },
  // Renewables & Energy
  {
    id: 'solar-pv',
    title: 'Solar PV',
    description: 'Photovoltaic systems',
    standard: 'MCS',
    accentColor: 'from-yellow-500 via-amber-400 to-orange-400',
    category: 'renewables',
  },
  {
    id: 'bess',
    title: 'Battery Storage',
    description: 'BESS commissioning',
    standard: 'IET CoP',
    accentColor: 'from-green-500 via-emerald-400 to-teal-400',
    category: 'renewables',
  },
  {
    id: 'g98-commissioning',
    title: 'G98 Commissioning',
    description: 'PV up to 16A/phase — DNO form',
    standard: 'EREC G98',
    accentColor: 'from-orange-500 via-amber-400 to-yellow-400',
    category: 'renewables',
  },
  {
    id: 'g99-commissioning',
    title: 'G99 Commissioning',
    description: 'Commercial PV/EV >16A/phase',
    standard: 'EREC G99',
    accentColor: 'from-orange-500 via-red-400 to-rose-400',
    category: 'renewables',
  },
  // Fire Alarm Suite (BS 5839-1:2025)
  {
    id: 'fire-alarm-design',
    title: 'FA Design (G1)',
    description: 'System design certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm',
    title: 'FA Install (G2)',
    description: 'Installation certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-rose-400 to-pink-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-commissioning',
    title: 'FA Commission (G3)',
    description: 'Commissioning certificate',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-red-400 to-orange-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-inspection',
    title: 'FA Inspection (G6)',
    description: 'Periodic test & service',
    standard: 'BS 5839-1',
    accentColor: 'from-rose-500 via-pink-400 to-red-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-modification',
    title: 'FA Modification (G7)',
    description: 'Extension & alteration',
    standard: 'BS 5839-1',
    accentColor: 'from-pink-500 via-rose-400 to-red-400',
    category: 'fire-safety',
  },
  {
    id: 'fire-alarm-log-books',
    title: 'FA Log Book',
    description: 'Live building log — weekly tests, faults, Annex H export',
    standard: 'BS 5839-1',
    accentColor: 'from-red-500 via-orange-400 to-amber-400',
    category: 'fire-safety',
    route: '/electrician/inspection-testing/fire-alarm-log-books',
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency Lighting',
    description: 'Safety illumination systems',
    standard: 'BS 5266',
    accentColor: 'from-amber-500 via-amber-400 to-yellow-400',
    category: 'fire-safety',
  },
  {
    id: 'smoke-co-alarm',
    title: 'Smoke & CO Alarm',
    description: 'Domestic alarm installation',
    standard: 'BS 5839-6',
    accentColor: 'from-red-500 via-orange-400 to-amber-400',
    category: 'fire-safety',
  },
  {
    id: 'lightning-protection',
    title: 'Lightning Protection',
    description: 'LPS test certificate',
    standard: 'BS EN 62305',
    accentColor: 'from-yellow-500 via-yellow-400 to-amber-400',
    category: 'fire-safety',
  },
];

const GROUPS: { key: CertDef['category']; label: string }[] = [
  { key: 'electrical', label: 'Electrical' },
  { key: 'renewables', label: 'Renewables & Energy' },
  { key: 'fire-safety', label: 'Fire & Life Safety' },
];

/**
 * Card — identical to the Inspection & Testing hub and the core Certificates
 * page: eyebrow, title, scope line, hairline footer with the meta on the left
 * and the action on the right. Body is a div because the footer holds two real
 * actions (Resume / New) and a button can't nest a button.
 */
const SpecCard = ({
  cert,
  onOpen,
  draft,
  onResume,
}: {
  cert: CertDef;
  onOpen: () => void;
  draft?: ResumeDraftInfo;
  onResume: () => void;
}) => {
  const haptic = useHaptic();
  const disabled = !!cert.comingSoon;
  // Route overrides open an area (log book) rather than starting a cert.
  const primaryLabel = cert.route ? 'Open' : 'New';

  /*
   * The WHOLE card opens the certificate, not just the "New" text (Andrew).
   *
   * It stays a `div` rather than a `button` because the footer holds a second
   * real action (Resume) and a button cannot nest a button — so it carries the
   * button role and keyboard handling itself, and the inner actions stop
   * propagation so Resume never reads as New.
   */
  const open = () => {
    if (disabled) return;
    haptic.light();
    onOpen();
  };

  return (
    <div
      role={disabled ? undefined : 'button'}
      tabIndex={disabled ? undefined : 0}
      aria-label={disabled ? undefined : `${primaryLabel} ${cert.title}`}
      onClick={open}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      className={cn(
        'group flex h-full flex-col rounded-2xl border p-3.5 text-left sm:p-4',
        'transition-[background-color,border-color] duration-150 ease-out',
        'outline-none focus-visible:border-elec-yellow',
        disabled ? CARD_DISABLED : `${CARD_NEUTRAL} cursor-pointer touch-manipulation active:scale-[0.995]`
      )}
    >
      <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        {cert.standard}
      </span>

      <h3 className="mt-1.5 text-[15px] font-bold leading-tight tracking-tight text-white sm:text-[17px]">
        {cert.title}
      </h3>
      <p className="mt-1 text-[11.5px] leading-snug text-white sm:text-[12.5px]">
        {cert.description}
      </p>

      <div className="flex-grow" />

      {/* Volt as TEXT, never a solid "New" button beside an outlined "Resume"
          one — two volt blocks per card across fifteen cards, and the outlined
          variant used bg-elec-yellow/[0.08], which reads muddy brown. */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.10] pt-1">
        {disabled ? (
          <span className="min-w-0 truncate text-[11px] text-white">Coming soon</span>
        ) : draft ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              haptic.light();
              onResume();
            }}
            className="-ml-1 flex h-11 min-w-0 items-center px-1 text-[11.5px] font-semibold text-white touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
          >
            <span className="truncate">
              Resume <span className="tabular-nums">{draft.count}</span>
            </span>
          </button>
        ) : (
          <span aria-hidden />
        )}
        {!disabled && (
          <button
            type="button"
            onClick={(e) => {
              /* The card already handles this — stop it running twice. */
              e.stopPropagation();
              haptic.light();
              onOpen();
            }}
            className="-mr-1 flex h-11 shrink-0 items-center px-1 text-[12px] font-bold text-elec-yellow touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
          >
            {primaryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

interface SpecialistSectionProps {
  onBack: () => void;
}

const SpecialistSection = ({ onBack }: SpecialistSectionProps) => {
  const navigate = useNavigate();
  const { data: drafts } = useResumeDrafts();

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
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Specialist Certificates
          </h1>
          <span className="text-[13px] text-white">Fire, renewables, EV and more</span>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 lg:px-8 space-y-7 lg:max-w-[1600px]"
      >
        {GROUPS.map((group) => {
          const certs = specialistCerts.filter((c) => c.category === group.key);
          if (certs.length === 0) return null;

          return (
            <motion.section key={group.key} variants={itemVariants} className="space-y-3">
              <div className="flex items-baseline gap-2.5 px-0.5">
                <h2 className="text-[15px] font-semibold tracking-tight text-white">
                  {group.label}
                </h2>
                <span className="text-[12px] text-white tabular-nums">{certs.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
                {certs.map((cert) => (
                  <SpecCard
                    key={cert.id}
                    cert={cert}
                    draft={drafts?.[cert.id]}
                    onOpen={() =>
                      navigate(cert.route ?? `/electrician/inspection-testing/${cert.id}/new`)
                    }
                    onResume={() =>
                      navigate(
                        `/electrician/inspection-testing/${cert.id}/${drafts?.[cert.id]?.latestReportId}`
                      )
                    }
                  />
                ))}
              </div>
            </motion.section>
          );
        })}
      </motion.main>
    </div>
  );
};

export default SpecialistSection;
