import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface Tile {
  id: string;
  standard: string;
  title: string;
  description: string;
  to?: string;
  comingSoon?: boolean;
  accent: string; // tailwind "from-…" token used for the dot
}

const WORK_TYPES: Tile[] = [
  { id: 'solar-pv', standard: 'MCS · MIS 3002', title: 'Solar PV', description: 'Roof-mounted & ground array installations', to: '/electrician/inspection-testing/solar-pv/new', accent: 'from-yellow-500' },
  { id: 'battery', standard: 'IET CoP', title: 'Battery Storage', description: 'BESS design & commissioning', to: '/electrician/inspection-testing/bess/new', accent: 'from-emerald-500' },
  { id: 'ev', standard: 'IET CoP · Doc S', title: 'EV Charging', description: 'Charge-point installation certificate', to: '/electrician/inspection-testing/ev-charging/new', accent: 'from-cyan-500' },
  { id: 'heat-pump', standard: 'MCS · MIS 3005', title: 'Heat Pump', description: 'ASHP electrical supply & certificate', comingSoon: true, accent: 'from-orange-500' },
];

const GRID_CONNECTION: Tile[] = [
  { id: 'g98', standard: 'EREC G98', title: 'G98 Commissioning', description: 'Micro-generation ≤16A/phase — DNO notification', to: '/electrician/inspection-testing/g98-commissioning/new', accent: 'from-blue-500' },
  { id: 'g99', standard: 'EREC G99', title: 'G99 Commissioning', description: 'Generation > 16A/phase — DNO application', to: '/electrician/inspection-testing/g99-commissioning/new', accent: 'from-indigo-500' },
];

const JOURNEY = ['Design', 'Quote', 'Install', 'Commission', 'Certify', 'Handover'];

const SectionLabel = ({ children, count }: { children: React.ReactNode; count?: number }) => (
  <div className="flex items-end justify-between gap-3 px-0.5 mb-2.5">
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{children}</h2>
    {count != null && <span className="text-[10.5px] text-white/30 tabular-nums">{count}</span>}
  </div>
);

const TileGrid = ({ tiles }: { tiles: Tile[] }) => {
  const navigate = useNavigate();
  const needsFiller = tiles.length % 2 === 1;
  return (
    <div className="relative grid grid-cols-2 gap-[1.5px] bg-white/[0.14] border border-white/[0.14] rounded-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
      {tiles.map((t) => {
        const dot = t.accent.replace('from-', 'bg-');
        return (
          <button
            key={t.id}
            type="button"
            disabled={t.comingSoon}
            onClick={() => t.to && navigate(t.to)}
            className={cn(
              'group relative flex flex-col text-left min-h-[118px] p-4 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50',
              t.comingSoon ? 'opacity-55' : 'hover:bg-elec-yellow/[0.05] active:bg-white/[0.05]'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className={cn('mt-1 w-2 h-2 rounded-full shrink-0', dot)} aria-hidden />
              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0 text-right">{t.standard}</span>
            </div>
            <h3 className="mt-3 text-[16.5px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">{t.title}</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 line-clamp-2">{t.description}</p>
            <div className="flex-grow min-h-[10px]" />
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow">
              {t.comingSoon ? 'Coming soon' : 'Open'}
              {!t.comingSoon && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />}
            </span>
          </button>
        );
      })}
      {needsFiller && <div className="bg-[hsl(0_0%_11%)]" aria-hidden />}
    </div>
  );
};

export default function RenewablesHub() {
  const navigate = useNavigate();
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2 mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate('/electrician')} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Renewables</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main variants={container} initial="hidden" animate="visible" className="px-4 sm:px-6 py-4 mx-auto w-full max-w-5xl space-y-6">
        {/* Intro + journey */}
        <motion.div variants={item}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow/90">Design to certificate</p>
          <p className="text-[12.5px] text-white/55 mt-1.5 leading-relaxed">
            Everything for a renewable install in one place — UK-code-aware (BS 7671 A4:2026, MCS, G98/G99).
          </p>
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {JOURNEY.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-medium text-white/70 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">{step}</span>
                {i < JOURNEY.length - 1 && <span className="text-white/25 text-[11px]">→</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Work types */}
        <motion.section variants={item}>
          <SectionLabel count={WORK_TYPES.length}>Work types</SectionLabel>
          <TileGrid tiles={WORK_TYPES} />
        </motion.section>

        {/* Grid connection */}
        <motion.section variants={item}>
          <SectionLabel count={GRID_CONNECTION.length}>Grid connection</SectionLabel>
          <TileGrid tiles={GRID_CONNECTION} />
        </motion.section>

        {/* Design suite — coming */}
        <motion.section variants={item}>
          <SectionLabel>Coming next</SectionLabel>
          <div className="rounded-2xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4">
            <p className="text-[13px] font-semibold text-white">Solar Design Suite</p>
            <p className="text-[12px] text-white/60 mt-1 leading-relaxed">
              Size the system from panel + inverter data (string config, temperature correction, DC/AC cabling, SPD/AFDD, PVGIS yield),
              auto-generate the single-line diagram, then pre-fill the MCS certificate and a quote — no spreadsheets.
            </p>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
