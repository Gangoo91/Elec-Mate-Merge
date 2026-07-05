/**
 * QuickAccessRow — role-based quick launchers for the tools people open most.
 *
 * Editorial style to match EditorialHubGrid: monochrome cards, numbered +
 * typographic, NO decorative icons — the single elec-yellow accent is the
 * "Open →" arrow, exactly like the hub cards. Sits at the top of the dashboard
 * so an electrician/employer gets one tap to Quotes, Invoices, Inspection &
 * Testing and Site Safety. Renders nothing for roles with no defined set.
 *
 * Routes verified against src/AppRouter.tsx.
 */
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface QuickTile {
  eyebrow: string;
  title: string;
  sub: string;
  path: string;
}

// Electricians and employers (who also run jobs) get the trade tools.
const TRADE_TILES: QuickTile[] = [
  { eyebrow: 'SALES', title: 'Quotes', sub: 'Build and send', path: '/electrician/quotes' },
  { eyebrow: 'BILLING', title: 'Invoices', sub: 'Get paid faster', path: '/electrician/invoices' },
  {
    eyebrow: 'TESTING',
    title: 'Inspection & Testing',
    sub: 'Certificates and schedules',
    path: '/electrician/inspection-testing',
  },
  { eyebrow: 'SAFETY', title: 'Site Safety', sub: 'RAMS and permits', path: '/electrician/site-safety' },
];

const QUICK_ACCESS: Record<string, QuickTile[]> = {
  electrician: TRADE_TILES,
  employer: TRADE_TILES,
  apprentice: [
    { eyebrow: 'LEARN', title: 'Study Centre', sub: 'Courses and revision', path: '/study-centre' },
    {
      eyebrow: 'PORTFOLIO',
      title: 'Apprentice Hub',
      sub: 'OTJ hours and evidence',
      path: '/apprentice',
    },
    { eyebrow: 'WELLBEING', title: 'Wellbeing', sub: 'Support and tools', path: '/mental-health' },
  ],
};

interface QuickAccessRowProps {
  label?: string;
}

export function QuickAccessRow({ label = 'QUICK ACCESS' }: QuickAccessRowProps) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const role = profile?.role || 'electrician';
  const tiles = QUICK_ACCESS[role];

  if (!tiles || tiles.length === 0) return null;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>{label}</Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid gap-[2px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black',
          // 2-up on mobile: four stacked 150px tiles was 600px of scrolling
          // before the first real content — compact launcher, not a wall
          'grid-cols-2',
          tiles.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        )}
      >
        {/* Single yellow hairline along the top of the whole grid */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0" />

        {tiles.map((tile, i) => (
          <button
            key={tile.path}
            type="button"
            onClick={() => navigate(tile.path)}
            className="group relative flex min-h-[112px] touch-manipulation flex-col bg-[hsl(0_0%_10%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_15%)] sm:min-h-[164px] sm:p-6"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:inline">
                · {tile.eyebrow}
              </span>
            </div>
            <h3 className="mt-2.5 text-[16px] font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow sm:mt-3 sm:text-[22px]">
              {tile.title}
            </h3>
            <p className="mt-1 hidden text-[12.5px] leading-relaxed text-white/55 sm:block">
              {tile.sub}
            </p>
            <div className="flex-grow" />
            <div className="mt-3 flex items-center justify-end border-t border-white/[0.05] pt-2.5 sm:mt-4 sm:pt-3">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow sm:text-[12.5px]">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default QuickAccessRow;
