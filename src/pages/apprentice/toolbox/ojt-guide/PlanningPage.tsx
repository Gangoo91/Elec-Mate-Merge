import { ArrowLeft, AlertTriangle } from 'lucide-react';

const yearPhases = [
  {
    label: 'Year 1: Foundation Building',
    desc: 'Focus on electrical fundamentals, safety regulations, and basic practical skills. Typically more theory-heavy at this stage (illustrative, not a rule).',
    topics: [
      "Electrical science fundamentals (Ohm's law, power, energy)",
      'Health & safety regulations and safe working practices',
      'Basic wiring systems and cable types',
      'Introduction to BS 7671 and the IET Wiring Regulations',
      'Hand tool skills and basic termination techniques',
    ],
  },
  {
    label: 'Year 2-3: Skill Development',
    desc: 'Balance theory with practical application. Specialisation areas and advanced techniques, with more of a practical focus (illustrative, not a rule).',
    topics: [
      'Advanced circuit design and load calculations',
      'Three-phase systems and industrial installations',
      'Inspection and testing procedures (initial verification)',
      'Fault finding and diagnostic techniques',
      'Earthing and bonding — detailed study',
    ],
  },
  {
    label: 'Final year: Mastery & Assessment',
    desc: 'Portfolio completion, EPA preparation, and advanced troubleshooting. Assessment-focused learning.',
    topics: [
      'EPA preparation and mock assessments',
      'AM2S practical practice (installation, testing, safe isolation, fault diagnosis)',
      'Portfolio finalisation and KSB gap analysis',
      'Advanced fault diagnosis scenarios',
      'Online knowledge test revision',
    ],
  },
];

const monthlyAllocation = [
  { label: 'College / Training Centre', value: '40-60%' },
  { label: 'Online Learning', value: '20-30%' },
  { label: 'Practical Workshops', value: '15-25%' },
  { label: 'Industry Visits / Events', value: '5-15%' },
];

const sampleWeek = [
  { day: 'Monday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Tuesday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Wednesday', activity: 'College — theory and practical workshop', type: 'ojt' },
  { day: 'Thursday', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Friday AM', activity: 'On-site work (on-the-job)', type: 'work' },
  { day: 'Friday PM', activity: 'Online learning module + evidence logging', type: 'ojt' },
];

const catchUpStrategies = [
  {
    title: 'When training is cancelled',
    desc: 'Ask your provider to reschedule within the same month. Log the cancellation and the rescheduled date. If college cancels a session, it is their responsibility to offer a replacement.',
  },
  {
    title: 'When you fall behind on hours',
    desc: 'Speak to your training provider immediately — do not wait. They may offer additional sessions, online catch-up modules, or intensive blocks. Your employer must release you for make-up time.',
  },
  {
    title: 'When work is busy',
    desc: 'Your employer cannot cancel OJT because of workload. If this happens, document it and raise it at your next progress review. Training time is protected by your apprenticeship agreement.',
  },
  {
    title: 'Sickness or absence',
    desc: 'If you miss OJT due to illness, you will need to make up the hours. Work with your provider to plan catch-up sessions. Extended absence may require a break in learning.',
  },
];

const seasonalTips = [
  {
    season: 'Spring (Mar-May)',
    tip: 'Construction picks up — plan your OJT around the surge. Book college days well in advance and remind your employer early.',
  },
  {
    season: 'Summer (Jun-Aug)',
    tip: 'Peak construction season. Employers may push to skip training — do not let them. This is also when many colleges run intensive blocks, which is a good way to bank hours.',
  },
  {
    season: 'Autumn (Sep-Nov)',
    tip: 'New college year starts. Good time to reset your training plan and catch up on any shortfall from summer.',
  },
  {
    season: 'Winter (Dec-Feb)',
    tip: 'Construction slows down — ideal for extra OJT. Use quieter periods for online learning, portfolio work, and mock assessments.',
  },
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, SectionHeader, itemVariants } from '@/components/college/primitives';

const PlanningPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/off-job-training-guide')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · OJT" title="Planning Your Training" tone="yellow" />
      </motion.div>

      {/* Annual Approach */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Plan" title="Annual planning approach" />

        <p className="text-white text-sm">
          Your duration is set by your training plan (typically around 4 years, but it varies). The
          year-by-year structure below is a common pattern, not a standard-defined rule.
        </p>

        {yearPhases.map((phase) => (
          <div
            key={phase.label}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4 space-y-2">
              <h3 className="font-medium text-sm text-white">{phase.label}</h3>
              <p className="text-white text-sm">{phase.desc}</p>
              <ul className="space-y-1 mt-2">
                {phase.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-elec-yellow/70 mt-0.5">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Sample Weekly Schedule */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Example" title="Sample weekly schedule" />

        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="sm:p-5 space-y-2">
            <p className="text-white text-sm mb-3">A typical week for a day-release apprentice:</p>
            {sampleWeek.map((row) => (
              <div
                key={row.day}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-3 p-2 rounded ${
                  row.type === 'ojt' ? 'bg-elec-yellow/[0.08]' : 'bg-white/5'
                }`}
              >
                <span className="text-sm text-white font-medium shrink-0">{row.day}</span>
                <span
                  className={`text-sm sm:text-right break-words ${row.type === 'ojt' ? 'text-elec-yellow' : 'text-white'}`}
                >
                  {row.activity}
                </span>
              </div>
            ))}
            <p className="text-white text-xs mt-2">
              Highlighted rows = off-the-job training. Your schedule may differ — block release
              apprentices attend college full-time for 1-2 week blocks instead.
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Allocation */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Breakdown" title="Monthly allocation" />

        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="sm:p-5 space-y-3">
            <p className="text-white text-sm mb-2">
              How your OJT hours are typically split across activities:
            </p>
            {monthlyAllocation.map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span className="text-sm text-white">{row.label}</span>
                <span className="text-elec-yellow font-medium text-sm">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catching Up on Missed Hours */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              Catching up on missed hours
            </span>
          </div>
        </div>

        {catchUpStrategies.map((item) => (
          <div key={item.title} className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-white text-sm ml-6">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Considerations */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Timing" title="Seasonal considerations" />

        <p className="text-white text-sm">
          Construction work follows seasonal patterns — plan your OJT around them:
        </p>

        {seasonalTips.map((item) => (
          <div
            key={item.season}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4">
              <h3 className="font-medium text-sm text-white">{item.season}</h3>
              <p className="text-white text-sm mt-1">{item.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Planning Tip */}
      <div className="sm:rounded-xl sm:border sm:border-elec-yellow/25 sm:bg-elec-yellow/[0.04]">
        <div className="sm:p-5">
          <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight mb-2">
            Planning Tip
          </h3>
          <p className="text-white text-sm leading-relaxed">
            Coordinate with your employer to ensure your fixed training hours are protected and
            scheduled in advance. Last-minute changes can disrupt learning progression. Use the
            hours defined in your training plan, not an arbitrary percentage. Review your training
            plan at every progress review (minimum every 12 weeks) to check you are on track.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default PlanningPage;
