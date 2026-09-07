/**
 * CollegeSettingsSection — the settings index, on the shared hub language.
 * Content only; the masthead is CollegeDashboard's.
 *
 * Three rows in one list card. Curriculum and operational settings are the
 * two settings pages that exist; the third row goes to the LTI / VLE
 * integration section, which the Settings tool card on the overview already
 * promises ("…integrations…") but nothing linked to from here.
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const ROWS: { id: string; title: string; reason: string; to: string }[] = [
  {
    id: 'curriculum',
    title: 'Lesson plan settings',
    reason: 'British values, stretch and challenge, inclusive practice and safeguarding context for the AI',
    to: '/college/settings/curriculum',
  },
  {
    id: 'operational',
    title: 'Quality thresholds',
    reason: 'IQA sampling rate, audit window, attendance bands and EPA verdict scoring',
    to: '/college/settings/operational',
  },
  {
    id: 'lti',
    title: 'VLE integration',
    reason: 'Connect Canvas, Moodle or Blackboard over LTI 1.3',
    to: '/college?section=ltisettings',
  },
];

export function CollegeSettingsSection() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <motion.section variants={itemVariants} className="space-y-3">
        <HubSectionHeading>Settings</HubSectionHeading>
        <div className={LIST_CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {ROWS.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => navigate(row.to)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                >
                  <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {row.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {row.reason}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
}
