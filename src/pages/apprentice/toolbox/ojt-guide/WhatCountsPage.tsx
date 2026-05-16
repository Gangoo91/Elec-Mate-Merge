import { ArrowLeft, CheckCircle2222, AlertTriangle, HelpCircle, Clock } from 'lucide-react';

const activitiesThatCount = [
  {
    title: 'Theory lessons and lectures',
    desc: 'Classroom-based learning covering electrical theory, regulations, and principles',
  },
  {
    title: 'Practical workshops',
    desc: 'Hands-on training in controlled environments away from live projects',
  },
  {
    title: 'Shadowing and mentoring',
    desc: 'Structured observation and guidance from experienced professionals',
  },
  {
    title: 'Online learning modules',
    desc: 'Digital courses, webinars, and educational resources during paid hours',
  },
  {
    title: 'Industry visits',
    desc: 'Educational trips to suppliers, manufacturers, or exemplar installations',
  },
  {
    title: 'Research and assignments',
    desc: 'Independent study projects and coursework during paid time',
  },
  {
    title: 'Mock exams and revision',
    desc: 'Structured exam preparation sessions and practice assessments during paid hours',
  },
  {
    title: 'Manufacturer training days',
    desc: 'Product-specific training run by manufacturers (e.g. consumer unit training, EV charger installation)',
  },
];

const activitiesThatDont = [
  {
    title: 'Regular work duties',
    desc: 'Normal installation, maintenance, or repair work on live projects',
  },
  {
    title: 'Tea breaks and lunch',
    desc: 'General break times do not constitute learning activity',
  },
  {
    title: 'Travel time',
    desc: 'Journey time between sites (unless structured learning occurs during travel)',
  },
  {
    title: 'Unpaid study time',
    desc: 'Learning outside contracted working hours, including unpaid evening classes, does not qualify',
  },
  {
    title: 'Induction periods',
    desc: 'General workplace orientation and standard safety briefings',
  },
  {
    title: 'Progress reviews',
    desc: 'Routine meetings with your assessor to discuss progress (unless they include actual teaching)',
  },
];

const greyAreaScenarios = [
  {
    scenario: 'Your employer sends you to a manufacturer training day on a new consumer unit range',
    verdict: true,
    explanation:
      'Yes — this counts. It is structured learning away from normal duties, directly relevant to your standard, and within paid hours.',
  },
  {
    scenario: 'You watch YouTube tutorials about wiring at home in the evening',
    verdict: false,
    explanation:
      'No — this does not count. It is outside your contracted working hours and is not directed by your training provider.',
  },
  {
    scenario: 'Your supervisor explains BS 7671 regulations while you wire a board together on site',
    verdict: false,
    explanation:
      'No — learning that happens during normal productive work does not count. The teaching must be separate from your work duties.',
  },
  {
    scenario: 'You attend a structured team session where your supervisor teaches cable sizing calculations',
    verdict: true,
    explanation:
      'Yes — a structured teaching session separate from productive work counts, even if it happens on site, provided it is planned and logged.',
  },
  {
    scenario: 'You study for your AM2 exam at college during a scheduled revision day',
    verdict: true,
    explanation:
      'Yes — scheduled revision at college counts. It is structured, within paid hours, and directly relevant to your apprenticeship.',
  },
  {
    scenario: 'You help a qualified electrician on a domestic rewire, learning as you go',
    verdict: false,
    explanation:
      'No — this is on-the-job learning (valuable, but different). OJT must be separate from productive work, even if you are learning.',
  },
];

const trackingTips = [
  'Log every OJT activity on the same day — do not leave it until the end of the week',
  'Record the date, start time, end time, and total hours for each session',
  'Write a brief description of what you learned, not just "college" or "online"',
  'Note which KSBs (knowledge, skills, behaviours) the session covered',
  'Get your trainer or supervisor to sign off weekly if your provider requires it',
  'Keep a running total so you always know how many hours you have left',
  'Use your training provider\'s official log template — ESFA auditors expect a specific format',
  'If a session is cancelled, log that too — it helps if you need to claim catch-up time',
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const WhatCountsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/toolbox/off-job-training-guide')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · OJT"
          title="What Counts as OJT"
          tone="yellow"
        />
      </motion.div>

      {/* Activities That Count */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Activities That Count</span></div></div>

        {activitiesThatCount.map((item) => (
          <div key={item.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 sm:p-5 flex items-start gap-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            </div></div>
        ))}
      </div>

      {/* Activities That Don't Count */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">What Does NOT Count</span></div></div>

        {activitiesThatDont.map((item) => (
          <div key={item.title} className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
            <div className="p-4 sm:p-5 flex items-start gap-3">
              <AlertTriangle className="h-3.5 w-3.5 text-red-300 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            </div></div>
        ))}
      </div>

      {/* Grey Area Scenarios */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Grey Area Scenarios</span></div></div>

        <p className="text-white text-sm">
          Not sure if something counts? Here are real-world examples with verdicts:
        </p>

        {greyAreaScenarios.map((item) => (
          <div key={item.scenario} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm font-medium">{item.scenario}</p>
              </div>
              <div className="flex items-start gap-2 ml-7">
                {item.verdict ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-red-300 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-white text-sm">{item.explanation}</p>
              </div>
            </div></div>
        ))}
      </div>

      {/* Hours Tracking Tips */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Hours Tracking Tips</span></div></div>

        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-3.5 w-3.5 text-elec-yellow/85" />
              <p className="text-white text-sm font-medium">
                Keep accurate records from day one
              </p>
            </div>
            <ul className="space-y-2">
              {trackingTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-elec-yellow/70 mt-0.5">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div></div>
      </div>

      {/* ST0152 Note */}
      <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
        <div className="p-4 sm:p-5">
          <p className="text-white text-sm leading-relaxed">
            All off-the-job training must be directly relevant to apprenticeship standard
            ST0152 v1.2. Your training provider should map each activity to specific
            knowledge, skills, and behaviours (KSBs) in the standard. If you are unsure
            whether an activity qualifies, ask your training provider before logging it.
          </p>
        </div></div>
    </PageFrame>
  );
};

export default WhatCountsPage;
