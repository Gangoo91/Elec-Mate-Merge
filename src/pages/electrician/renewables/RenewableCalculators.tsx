import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RENEWABLE_CALCS, type CalcDef } from '@/utils/renewables/calcEngine';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const GROUP_ORDER: CalcDef['group'][] = [
  'Solar',
  'Cabling',
  'Grid',
  'Battery',
  'Heat Pump',
  'EV',
  'Finance',
];
const GROUP_DOT: Record<CalcDef['group'], string> = {
  Solar: 'bg-yellow-500',
  Cabling: 'bg-cyan-500',
  Grid: 'bg-blue-500',
  Battery: 'bg-emerald-500',
  'Heat Pump': 'bg-orange-500',
  EV: 'bg-violet-500',
  Finance: 'bg-rose-500',
};

const Grid = ({ calcs }: { calcs: CalcDef[] }) => {
  const navigate = useNavigate();
  const needsFiller = calcs.length % 2 === 1;
  return (
    <div className="relative grid grid-cols-2 gap-[1.5px] bg-white/[0.14] border border-white/[0.14] rounded-2xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
      {calcs.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => navigate(`/electrician/renewables/calculators/${c.id}`)}
          className="group relative flex flex-col text-left min-h-[120px] p-4 bg-[hsl(0_0%_11%)] hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] transition-colors touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
        >
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn('mt-1 w-2 h-2 rounded-full shrink-0', GROUP_DOT[c.group])}
              aria-hidden
            />
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0 text-right">
              {c.standard}
            </span>
          </div>
          <h3 className="mt-3 text-[16px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
            {c.title}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 line-clamp-2">
            {c.description}
          </p>
          <div className="flex-grow min-h-[10px]" />
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow">
            Open
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      ))}
      {needsFiller && <div className="bg-[hsl(0_0%_11%)]" aria-hidden />}
    </div>
  );
};

export default function RenewableCalculators() {
  const navigate = useNavigate();
  const groups = GROUP_ORDER.map((g) => ({
    g,
    calcs: RENEWABLE_CALCS.filter((c) => c.group === g),
  })).filter((x) => x.calcs.length);

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-10 py-2 w-full">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician/renewables')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">
              Renewable Calculators
            </h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 lg:px-10 py-4 w-full space-y-6"
      >
        <motion.p variants={item} className="text-[12.5px] text-white/55 leading-relaxed">
          Purpose-built for renewables — grounded in the IET Code of Practice, BS 7671, MIS 3002 and
          G98/G99/G100.
        </motion.p>
        {groups.map(({ g, calcs }) => (
          <motion.section key={g} variants={item} className="space-y-2.5">
            <div className="flex items-end justify-between gap-3 px-0.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {g}
              </h2>
              <span className="text-[10.5px] text-white/30 tabular-nums">{calcs.length}</span>
            </div>
            <Grid calcs={calcs} />
          </motion.section>
        ))}
      </motion.main>
    </div>
  );
}
