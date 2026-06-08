import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

// Editorial tile — mirrors DocCard on the Labels & Warnings page: an accent dot
// + a mono standard badge, a big tracking-tight title, the scope line, and a
// single yellow "Open →". Sits inside a seam grid with hairline separators.
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
  // Solid accent dot derived from the gradient's "from-" token.
  const dot = cert.accentColor.split(' ')[0].replace('from-', 'bg-');

  return (
    <div className="relative flex flex-col bg-[hsl(0_0%_11%)]">
      <button
        type="button"
        onClick={() => !disabled && onOpen()}
        disabled={disabled}
        className={cn(
          'group relative flex flex-1 flex-col text-left min-h-[120px] p-4 transition-colors touch-manipulation',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50',
          disabled ? 'opacity-50' : 'hover:bg-elec-yellow/[0.05] active:bg-white/[0.05]'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className={cn('mt-1 w-2 h-2 rounded-full shrink-0', dot)} aria-hidden />
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0">
            {cert.standard}
          </span>
        </div>

        <h3 className="mt-3 text-[16.5px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
          {cert.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 line-clamp-2">
          {cert.description}
        </p>

        <div className="flex-grow min-h-[10px]" />

        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow">
          {disabled ? 'Coming soon' : draft ? 'New' : 'Open'}
          {!disabled && (
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          )}
        </span>
      </button>

      {/* Resume strip — only when in-progress drafts of this type exist */}
      {!disabled && draft && (
        <button
          type="button"
          onClick={onResume}
          className="group flex w-full items-center justify-between gap-2 border-t border-elec-yellow/15 bg-elec-yellow/[0.06] px-4 py-2 text-left transition-colors touch-manipulation hover:bg-elec-yellow/[0.1] active:bg-elec-yellow/[0.14] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-elec-yellow/90">
            {draft.count} in progress
          </span>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-elec-yellow">
            Resume
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
      )}
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
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Specialist Certificates</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {GROUPS.map((group) => {
          const certs = specialistCerts.filter((c) => c.category === group.key);
          if (certs.length === 0) return null;
          // A 2-col seam grid with an odd count would leave one cell showing the
          // light seam colour — fill it with a matching dark cell instead.
          const needsFiller = certs.length % 2 === 1;

          return (
            <motion.section key={group.key} variants={itemVariants} className="space-y-2.5">
              <div className="flex items-end justify-between gap-3 px-0.5">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {group.label}
                </h2>
                <span className="text-[10.5px] text-white/30 tabular-nums">{certs.length}</span>
              </div>
              <div className="relative grid grid-cols-2 gap-[1.5px] bg-white/[0.14] border border-white/[0.14] rounded-2xl overflow-hidden">
                {/* Single gold hairline along the top of the whole grid */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
                {certs.map((cert) => (
                  <SpecCard
                    key={cert.id}
                    cert={cert}
                    draft={drafts?.[cert.id]}
                    onOpen={() => navigate(`/electrician/inspection-testing/${cert.id}/new`)}
                    onResume={() =>
                      navigate(
                        `/electrician/inspection-testing/${cert.id}/${drafts?.[cert.id]?.latestReportId}`
                      )
                    }
                  />
                ))}
                {needsFiller && <div className="bg-[hsl(0_0%_11%)]" aria-hidden />}
              </div>
            </motion.section>
          );
        })}
      </motion.main>
    </div>
  );
};

export default SpecialistSection;
