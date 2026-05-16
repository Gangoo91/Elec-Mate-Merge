import { ArrowLeft, AlertTriangle, CheckCircle2222, Search } from 'lucide-react';

const essentialDocs = [
  'Training logs with dates, start/end times, and total duration',
  'Course certificates and completion records',
  'Assignment submissions and marked feedback',
  'Photographic evidence of practical work',
  'Witness testimonials from trainers or supervisors',
  'Learning reflections and progress notes',
  'College attendance records and registers',
  'Online learning platform completion screenshots',
];

const qualityStandards = [
  'Clear, legible, and professionally presented',
  'Chronologically organised and dated',
  'Directly linked to apprenticeship standard KSBs',
  'Authenticated by appropriate personnel',
  'Regularly updated and maintained',
  'Accessible for assessment and verification',
];

const portfolioBestPractices = [
  'Use cloud storage (Google Drive, OneDrive) for backup and accessibility',
  'Maintain consistent file naming: YYYY-MM-DD_ActivityType_Topic',
  'Create separate folders for each learning activity type',
  'Include metadata and tags for easy searching',
  'Schedule weekly backups to prevent data loss',
  'Keep both digital and paper copies of signed documents',
];

const commonMistakes = [
  {
    mistake: 'Vague descriptions',
    example: '"College" or "Online learning"',
    fix: 'Write what you actually learned: "BS 7671 Part 4 — protection against electric shock, including ADS and double insulation"',
  },
  {
    mistake: 'Missing dates or times',
    example: 'Logging "8 hours" with no date',
    fix: 'Always include: date, start time, end time, and total hours',
  },
  {
    mistake: 'No KSB mapping',
    example: 'Not linking activities to the standard',
    fix: 'Reference which KSBs each session covers — your provider should give you a mapping sheet',
  },
  {
    mistake: 'Bulk logging at the end of term',
    example: 'Writing up 3 months of logs in one sitting',
    fix: 'Log every session on the same day. Auditors can tell when logs were bulk-written',
  },
  {
    mistake: 'No supervisor sign-off',
    example: 'Unsigned training logs',
    fix: 'Get your trainer or supervisor to countersign weekly — unsigned logs may be rejected',
  },
];

const auditorExpectations = [
  'A clear training plan showing planned vs actual hours',
  'Consistent, contemporaneous records (written at the time, not retrospectively)',
  'Evidence that activities are genuinely separate from productive work',
  'Supervisor or trainer signatures confirming attendance',
  'KSB mapping showing coverage across the full standard',
  'Evidence of quality — not just quantity — of learning',
  'Records of any missed sessions and how hours were made up',
];

const photoTips = [
  {
    title: 'What to photograph',
    items: [
      'Completed practical exercises (wiring, terminations, testing)',
      'Whiteboard notes or presentations from theory sessions',
      'Test results and instrument readings',
      'Workshop setups before and after',
      'Certificates, awards, or completion screens',
    ],
  },
  {
    title: 'How to capture it properly',
    items: [
      'Ensure good lighting — avoid blurry or dark images',
      'Include a date stamp (enable date overlay on your phone camera)',
      'Add a brief caption explaining what the photo shows',
      'Take close-ups of detailed work and wide shots for context',
      'Never photograph other apprentices without their permission',
    ],
  },
  {
    title: 'Organising your photos',
    items: [
      'Create monthly folders on your phone or cloud storage',
      'Name files clearly: 2025-09-15_CableTermination_Workshop.jpg',
      'Back up to cloud storage immediately — do not rely on your phone alone',
      'Cross-reference photos in your training log entries',
    ],
  },
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const EvidencePage = () => {
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
          title="Evidence Collection"
          tone="yellow"
        />
      </motion.div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-2">Evidence Requirements</h2>
          <p className="text-white text-sm leading-relaxed">
            Proper documentation of your off-the-job training is essential for
            apprenticeship completion. You must maintain comprehensive evidence to
            demonstrate you have completed the fixed training hours required by your
            standard. Poor evidence is one of the most common reasons apprentices face
            issues at gateway.
          </p>
        </div></div>

      {/* Example Log Entry */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Example Evidence Log Entry</span></div></div>

        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
          <div className="p-4 sm:p-5 space-y-2">
            <p className="text-white text-sm font-medium">
              This is what a good log entry looks like:
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-1 text-sm text-white">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>15 September 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>09:00 — 16:30 (6.5 hrs)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>City College Workshop B</span>
              </div>
              <div>
                <span className="font-medium">Activity:</span>
                <span className="ml-1">
                  Practical workshop — single-phase consumer unit installation and testing.
                  Completed wiring to BS 7671 requirements, performed initial verification
                  (insulation resistance, continuity, polarity). Trainer demonstrated RCD
                  testing procedure.
                </span>
              </div>
              <div>
                <span className="font-medium">KSBs covered:</span>
                <span className="ml-1">K4, K8, S1, S3, S7</span>
              </div>
              <div>
                <span className="font-medium">Trainer signature:</span>
                <span className="ml-1">J. Smith</span>
              </div>
            </div>
          </div></div>
      </div>

      {/* Essential Documentation */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Essential Documentation</span></div></div>

        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
          <div className="p-4 sm:p-5">
            <ul className="space-y-2">
              {essentialDocs.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-elec-yellow/70 mt-0.5">·</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div></div>
      </div>

      {/* Common Mistakes */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">Common Mistakes to Avoid</span></div></div>

        {commonMistakes.map((item) => (
          <div key={item.mistake} className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-red-400 text-sm">{item.mistake}</h3>
              </div>
              <p className="text-white text-sm ml-7">
                <span className="text-white">Bad: </span>
                {item.example}
              </p>
              <div className="flex items-start gap-2 ml-7">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">{item.fix}</p>
              </div>
            </div></div>
        ))}
      </div>

      {/* What Auditors Look For */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">What ESFA Auditors Look For</span></div></div>

        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Search className="h-4 w-4 text-amber-400" />
              <p className="text-white text-sm font-medium">
                Auditors check your provider, but your evidence matters too
              </p>
            </div>
            <ul className="space-y-2">
              {auditorExpectations.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-elec-yellow/70 mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div></div>
      </div>

      {/* Quality Standards */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Quality Standards</span></div></div>

        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
          <div className="p-4 sm:p-5">
            <ul className="space-y-2">
              {qualityStandards.map((std) => (
                <li key={std} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-elec-yellow/70 mt-0.5">·</span>
                  {std}
                </li>
              ))}
            </ul>
          </div></div>
      </div>

      {/* Photo Evidence Tips */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Photo Evidence Tips</span></div></div>

        {photoTips.map((section) => (
          <div key={section.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 sm:p-5">
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-elec-yellow/70 mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div></div>
        ))}
      </div>

      {/* Digital Portfolio */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Digital Portfolio Best Practices</span></div></div>

        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
          <div className="p-4 sm:p-5 space-y-3">
            <p className="text-white text-sm">
              Modern apprentices benefit from digital evidence management:
            </p>
            <ul className="space-y-2">
              {portfolioBestPractices.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-elec-yellow/70 mt-0.5">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div></div>
      </div>
    </PageFrame>
  );
};

export default EvidencePage;
