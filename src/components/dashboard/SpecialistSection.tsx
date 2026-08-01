import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useResumeDrafts, type ResumeDraftInfo } from '@/hooks/inspection/useResumeDrafts';

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

/** Card — same anatomy as the core Certificates page: dot + standard badge,
 * title, scope line, then an action row pinned to the base so rows align. */
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
  const disabled = !!cert.comingSoon;
  // Route overrides open an area (log book) rather than starting a cert.
  const primaryLabel = disabled ? 'Coming soon' : cert.route ? 'Open' : 'New';

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl p-5',
        'bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/[0.12]',
        'transition-all duration-200',
        disabled
          ? 'opacity-50'
          : 'hover:border-white/[0.22] hover:from-white/[0.09] hover:to-white/[0.05] hover:shadow-[0_10px_32px_rgba(0,0,0,0.35)] focus-within:border-elec-yellow/50'
      )}
    >
      <div className="relative flex items-center justify-between gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06] border border-white/[0.12] shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow" aria-hidden />
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 border border-white/[0.16] rounded px-1.5 py-0.5 shrink-0">
          {cert.standard}
        </span>
      </div>

      <h3 className="relative mt-4 text-[19px] font-semibold tracking-tight leading-[1.15] text-white">
        {cert.title}
      </h3>
      <p className="relative mt-1.5 text-[13px] leading-relaxed text-white/65 line-clamp-2">
        {cert.description}
      </p>

      <div className="relative mt-auto pt-5 flex items-center justify-between gap-2">
        {!disabled && draft ? (
          <button
            type="button"
            onClick={onResume}
            className={cn(
              'h-11 px-3.5 rounded-xl text-[12.5px] font-semibold text-elec-yellow',
              'border border-elec-yellow/40 bg-elec-yellow/[0.08]',
              'touch-manipulation active:scale-[0.97] transition-all hover:bg-elec-yellow/[0.14]'
            )}
          >
            Resume
            <span className="ml-1.5 text-elec-yellow/70 tabular-nums">{draft.count}</span>
          </button>
        ) : (
          <span aria-hidden />
        )}
        <button
          type="button"
          onClick={() => !disabled && onOpen()}
          disabled={disabled}
          className={cn(
            'h-11 px-5 rounded-xl text-[13px] font-bold touch-manipulation transition-transform',
            disabled
              ? 'bg-white/[0.08] text-white/50'
              : 'bg-elec-yellow text-black active:scale-[0.97] shadow-[0_4px_16px_rgba(245,184,28,0.18)]'
          )}
        >
          {primaryLabel}
        </button>
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
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Specialist Certificates
          </h1>
          <span className="text-[13px] text-white/50">Fire, renewables, EV and more</span>
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
                <span className="text-[12px] text-white/40 tabular-nums">{certs.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
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
