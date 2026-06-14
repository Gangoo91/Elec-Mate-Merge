import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { DEFAULT_OTJ_STANDARD } from '@/data/otjStandards';

interface Section {
  number: string;
  eyebrow: string;
  title: string;
  slug: string;
  description: string;
  meta: string;
  tone: Tone;
}

const SECTIONS: Section[] = [
  {
    number: '01',
    eyebrow: 'Foundations',
    title: 'Time fundamentals',
    slug: 'fundamentals',
    description:
      'Where the time goes — site, study, college, life. A real picture of a 168-hour week and where the slack actually lives.',
    meta: '7 min read',
    tone: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Plan',
    title: 'Schedule planning',
    slug: 'scheduling',
    description:
      'Weekly + monthly planning that survives a real apprenticeship. Calendars, reminders, the day you reset everything that drifted.',
    meta: '7 min read',
    tone: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'Pressure',
    title: 'Stress & wellbeing',
    slug: 'stress',
    description:
      'Spotting overload before it tips into burnout. Practical techniques that work on site, not just in mindfulness apps.',
    meta: '8 min read',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Life',
    title: 'Work-life balance',
    slug: 'balance',
    description:
      'Family, partners, mates, hobbies — keeping the rest of your life going while doing a 4-year apprenticeship.',
    meta: '6 min read',
    tone: 'purple',
  },
  {
    number: '05',
    eyebrow: 'Output',
    title: 'Productivity tools',
    slug: 'productivity',
    description:
      "Apps, methods, paper systems — what actually helps and what just makes you feel like you're working without doing the work.",
    meta: '6 min read',
    tone: 'orange',
  },
  {
    number: '06',
    eyebrow: 'Try it',
    title: 'Interactive tools',
    slug: 'interactive',
    description:
      "Built-in tools — workload calculator, study planner, energy audit — to help you map your actual week against the time you've got.",
    meta: '5 min read',
    tone: 'cyan',
  },
];

const TimeManagement = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Balance"
          title="There are 168 hours in a week"
          description="40 on site. College and off-the-job training (1,066 hours across the apprenticeship for an Installation & Maintenance Electrician). Some study. Some sleep. Some life. The maths only works if you're honest about where the time actually goes — and ruthless about what you protect."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Sections" title="Six chapters" />
        <HubGrid columns={3}>
          {SECTIONS.map((s) => (
            <HubCard
              key={s.slug}
              number={s.number}
              eyebrow={s.eyebrow}
              title={s.title}
              description={s.description}
              meta={s.meta}
              tone={s.tone}
              onClick={() => navigate(`/apprentice/toolbox/time-management/${s.slug}`)}
            />
          ))}
        </HubGrid>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Template" title="A week that actually fits" />
        <div className="rounded-none sm:rounded-xl border-y sm:border border-white/[0.06] bg-transparent sm:bg-[hsl(0_0%_10%)] -mx-4 px-4 py-4 sm:mx-0 sm:p-5 space-y-3">
          <p className="text-[12.5px] text-white/70 leading-relaxed">
            A realistic Level 3 week — not a perfect one. Spread across the apprenticeship,{' '}
            {DEFAULT_OTJ_STANDARD.otjHours.toLocaleString()} hours of off-the-job training is
            roughly five to six hours a week on average, but it rarely lands evenly. Block-release
            and college weeks pull it forward; quiet site weeks leave room to catch up.
          </p>
          <ul className="space-y-2.5">
            {[
              {
                day: 'Mon–Thu',
                plan: 'On site, 8 hours. Log one thing for your portfolio each day while it is fresh — a photo, a measurement, a method. Two minutes now saves an hour later.',
              },
              {
                day: 'Friday',
                plan: 'College or block-release day, or a counted off-the-job session at work — shadowing, toolbox talks, a manufacturer demo. This is paid working time, not your own.',
              },
              {
                day: 'One weeknight',
                plan: 'Ninety minutes of study — revision, a calculation set, writing up the week. One protected slot beats three you keep skipping.',
              },
              {
                day: 'Weekend',
                plan: 'Off. Recovery is part of the programme, not a reward for finishing it. Pull a short catch-up session in only on the weeks you have genuinely fallen behind.',
              },
            ].map((row) => (
              <li
                key={row.day}
                className="flex flex-col gap-1 sm:flex-row sm:gap-3 text-[12.5px] leading-relaxed"
              >
                <span className="text-elec-yellow/85 font-medium sm:w-28 flex-shrink-0">
                  {row.day}
                </span>
                <span className="text-white/85">{row.plan}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-white/45 leading-relaxed pt-1">
            Your exact split depends on your employer and training provider — confirm your
            off-the-job arrangement with them.
          </p>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Your rights" title="Time you're owed" />
        <div className="rounded-none sm:rounded-xl border-y sm:border border-white/[0.06] bg-transparent sm:bg-[hsl(0_0%_10%)] -mx-4 px-4 py-4 sm:mx-0 sm:p-5 space-y-2.5">
          <p className="text-[12px] uppercase tracking-[0.18em] text-elec-yellow/85 font-medium">
            Off-the-job training is paid working time
          </p>
          <ul className="space-y-2">
            {[
              `Off-the-job training is a fixed total — ${DEFAULT_OTJ_STANDARD.otjHours.toLocaleString()} hours across the apprenticeship for an ${DEFAULT_OTJ_STANDARD.name} (ST0152). It is not 20% and not a set weekly quota.`,
              'It is paid and must happen during your normal working hours — never "in your own time".',
              'Your average working week is capped at 48 hours (unless you have personally opted out in writing), and you keep your statutory rest breaks.',
              'Apprentices are entitled to at least the apprentice National Minimum Wage — £8.00/hr from 1 April 2026. Once you are 21+ you must get at least the National Living Wage.',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[12.5px] text-white/85 leading-relaxed"
              >
                <span className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow/85 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-white/45 leading-relaxed pt-1">
            Sources: gov.uk apprenticeship funding rules (off-the-job training), ACAS (working time
            and rest breaks), gov.uk National Minimum Wage rates.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default TimeManagement;
