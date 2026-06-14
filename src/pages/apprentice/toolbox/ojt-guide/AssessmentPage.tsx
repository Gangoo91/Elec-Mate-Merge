import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const knowledgeCards = [
  {
    title: 'Electrical Science & Theory',
    desc: 'Classroom theory, online modules, and practical demonstrations that build fundamental understanding tested in the AM2S knowledge test.',
  },
  {
    title: 'Regulations & Standards',
    desc: 'Structured study of BS 7671:2018+A4:2026, building regulations, and safety standards through guided reading and interpretation exercises.',
  },
  {
    title: 'Design & Planning',
    desc: 'Project-based learning covering circuit design, load calculations, and installation planning methodologies.',
  },
];

const skillsCards = [
  {
    title: 'Practical Competencies',
    desc: 'Workshop-based skill development that directly maps to the AM2S installation and termination tasks and to workplace observations.',
  },
  {
    title: 'Testing & Inspection',
    desc: 'Hands-on training with test equipment, measurement techniques, and certification procedures assessed in the AM2S inspection and testing section.',
  },
  {
    title: 'Problem Solving',
    desc: 'Scenario-based learning that develops diagnostic skills and systematic fault-finding approaches tested in the AM2S fault diagnosis section.',
  },
];

// The EPA for ST0152 is the integrated AM2S, run by NET — a single assessment
// of roughly 18.5 hours across five sections. Section timings from the NET/TESP
// AM2S assessment plan. There is no separate "professional discussion".
const epaSections = [
  {
    title: 'A1 — Safe working & planning',
    duration: '~1 hour',
    desc: 'Plan the installation, interpret drawings and specifications, and confirm safe working practices before starting.',
    ojtLink:
      'Planning exercises, drawing interpretation, and method-statement work at college prepare you here.',
  },
  {
    title: 'A2-A6 — Composite installation',
    duration: '~10.5 hours',
    desc: 'Install and terminate a composite of circuits and wiring systems to BS 7671 — the largest part of the assessment.',
    ojtLink:
      'Workshop practice and structured site installation activities build the hands-on skills assessed here.',
  },
  {
    title: 'B — Inspection, testing & certification',
    duration: '~3.5 hours',
    desc: 'Carry out initial verification (continuity, insulation resistance, polarity, earth fault loop, RCD) and complete the certification.',
    ojtLink:
      'Hands-on training with test instruments and certification procedures prepares you for this section.',
  },
  {
    title: 'C — Safe isolation',
    duration: '~30 minutes',
    desc: 'Prove and demonstrate a safe isolation procedure to the required standard.',
    ojtLink:
      'Repeated supervised practice of safe isolation at college and on site builds the precision required.',
  },
  {
    title: 'D — Fault diagnosis & rectification',
    duration: '~2 hours',
    desc: 'Find and rectify faults on an installation using a systematic diagnostic approach.',
    ojtLink: 'Scenario-based fault-finding exercises develop the systematic method assessed here.',
  },
  {
    title: 'E — Online knowledge test',
    duration: '45 MCQs · ~1.5 hours',
    desc: 'An online multiple-choice test of electrical science, regulations, health and safety, and installation principles, embedded within the AM2S.',
    ojtLink:
      'Theory lessons, structured reading of BS 7671, and revision sessions prepare you for the knowledge test.',
  },
];

const gatewayRequirements = [
  'Completed the required fixed training hours (as defined in your training plan)',
  'Achieved Level 2 English and maths (or equivalents) — for apprentices aged 19+ this requirement may be relaxed at provider/employer discretion since the February 2025 changes',
  'Completed all mandatory qualifications (e.g. the Level 3 Diploma)',
  'Compiled a portfolio of evidence demonstrating KSB coverage',
  'Employer, training provider, and apprentice all agree readiness (tripartite sign-off)',
  'Training provider has confirmed all OJT hours are logged and verified',
];

const referralReasons = [
  {
    reason: 'Insufficient portfolio evidence',
    detail:
      'Portfolio does not demonstrate coverage across all KSBs. Gaps in knowledge or skills areas.',
    prevention:
      'Map your evidence to KSBs throughout your apprenticeship, not just at the end. Use the KSB mapping sheet from your provider.',
  },
  {
    reason: 'Safe isolation or testing errors',
    detail:
      'A mistake in the safe isolation or inspection and testing section — any single section fail fails the whole AM2S.',
    prevention:
      'Practise safe isolation and the full test sequence until they are second nature. Do not rush — accuracy matters more than speed.',
  },
  {
    reason: 'Practical skills gaps',
    detail:
      'Unable to complete the installation or fault diagnosis tasks to the required standard within the time allowed.',
    prevention:
      'Maximise your workshop time. Practise timed tasks. Do not skip college practical sessions even when you feel confident.',
  },
  {
    reason: 'Knowledge test failure',
    detail: 'Score below the pass mark on the online knowledge test.',
    prevention:
      'Regular revision throughout your apprenticeship. Use flashcards, mock exams, and study groups. Do not leave revision until the last month.',
  },
  {
    reason: 'Incomplete training hours',
    detail: 'Training logs show you have not completed the required fixed hours of OJT.',
    prevention:
      'Track your hours from day one. Raise shortfalls early. Do not assume your provider is tracking them for you.',
  },
];

const timeline = [
  {
    phase: '12+ months before EPA',
    actions: [
      'Ensure your training plan is up to date and you understand your total OJT hours',
      'Start building your portfolio — do not wait until the end',
      'Ask your provider for the KSB mapping sheet and begin cross-referencing evidence',
    ],
  },
  {
    phase: '6 months before EPA',
    actions: [
      'Conduct a gap analysis — which KSBs are you missing evidence for?',
      'Schedule catch-up OJT for any hours shortfall',
      'Begin mock exams and timed practical exercises',
      'Practise the AM2S sections — safe isolation, installation, testing, fault finding',
    ],
  },
  {
    phase: '3 months before EPA',
    actions: [
      'Complete and organise your portfolio — have your provider review it',
      'Confirm you have all required qualifications (English, maths, Diploma)',
      'Intensive practice of the AM2S practical sections',
      'Intensive revision for the online knowledge test',
    ],
  },
  {
    phase: 'Gateway (4-6 weeks before EPA)',
    actions: [
      'Gateway meeting with employer, provider, and you — formal agreement that you are ready',
      'Final portfolio review and submission',
      'Confirm your AM2S date with your assessment organisation',
      'Final timed practice and knowledge-test revision',
    ],
  },
  {
    phase: 'AM2S week',
    actions: [
      'Sit the AM2S across roughly 2.5 days — installation, testing, safe isolation, fault diagnosis and the online knowledge test',
      'Bring your ID and any required tools or PPE',
      'Stay calm — your OJT has prepared you for this',
    ],
  },
];

const portfolioCards = [
  {
    title: 'Continuous Documentation',
    desc: 'Record learning outcomes from each training session with reflection on how it applies to your apprenticeship standard. Aim for quality over quantity — one detailed entry is worth more than ten vague ones.',
  },
  {
    title: 'Evidence Mapping',
    desc: "Cross-reference every training activity to specific EPA criteria and KSBs. Use a spreadsheet or your provider's tracking tool to ensure comprehensive coverage with no gaps.",
  },
  {
    title: 'Progress Monitoring',
    desc: 'Review your portfolio coverage at every progress review (minimum 12-weekly). Identify gaps early and plan targeted OJT activities to fill them before gateway.',
  },
];
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const AssessmentPage = () => {
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
        <PageHero eyebrow="Apprentice · OJT" title="Assessment & EPA" tone="yellow" />
      </motion.div>

      {/* OJT & EPA Connection */}
      <div className="sm:rounded-xl sm:border sm:border-elec-yellow/25 sm:bg-elec-yellow/[0.04]">
        <div className="sm:p-5">
          <h2 className="text-white font-semibold text-sm mb-2">OJT & EPA connection</h2>
          <p className="text-white text-sm leading-relaxed">
            Your off-the-job training directly prepares you for the End Point Assessment (EPA). For
            an Installation & Maintenance Electrician (ST0152) the EPA is the integrated AM2S, run
            by NET — a single assessment of around 18.5 hours over roughly 2.5 days. Every learning
            activity should contribute towards the knowledge, skills, and behaviours required by
            your standard. The AM2S determines your grade — Pass, Merit, or Distinction.
          </p>
        </div>
      </div>

      {/* AM2S Section Breakdown */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              AM2S sections
            </span>
          </div>
        </div>

        <p className="text-white text-sm">
          The AM2S is one integrated assessment, not several separate exams. It has five sections.
          There is no separate "professional discussion". Grading is Pass, Merit or Distinction —
          but a fail in any single section fails the whole AM2S.
        </p>

        {epaSections.map((sec) => (
          <div
            key={sec.title}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4 space-y-2">
              <h3 className="font-medium text-sm text-white">{sec.title}</h3>
              <div className="text-xs text-white/85">Duration: {sec.duration}</div>
              <p className="text-white text-sm">{sec.desc}</p>
              <div className="bg-white/5 rounded p-2 mt-1">
                <p className="text-white text-xs">
                  <span className="text-elec-yellow font-medium">How OJT prepares you: </span>
                  {sec.ojtLink}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gateway Requirements */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Gateway Requirements
            </span>
          </div>
        </div>

        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]">
          <div className="sm:p-5 space-y-3">
            <p className="text-white text-sm">
              Before you can sit your EPA, you must pass through "gateway" — a formal check that you
              are ready:
            </p>
            <ul className="space-y-2">
              {gatewayRequirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Common Referral Reasons */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              Common Reasons for EPA Referral
            </span>
          </div>
        </div>

        <p className="text-white text-sm">
          These are the pitfalls that most commonly cause apprentices to fail. Avoid them:
        </p>

        {referralReasons.map((item) => (
          <div key={item.reason} className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-red-400 text-sm">{item.reason}</h3>
              </div>
              <p className="text-white text-sm ml-7">{item.detail}</p>
              <div className="flex items-start gap-2 ml-7">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="text-elec-yellow font-medium">Prevention: </span>
                  {item.prevention}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline to EPA */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Timeline to EPA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-3.5 w-3.5 text-elec-yellow/85" />
          <p className="text-white text-sm font-medium">Key milestones and preparation</p>
        </div>

        {timeline.map((phase) => (
          <div
            key={phase.phase}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4 space-y-2">
              <h3 className="font-medium text-sm text-white">{phase.phase}</h3>
              <ul className="space-y-1">
                {phase.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-elec-yellow/70 mt-0.5">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Knowledge Alignment */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Knowledge Alignment
            </span>
          </div>
        </div>

        {knowledgeCards.map((card) => (
          <div
            key={card.title}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4">
              <h3 className="font-medium text-sm text-white">{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Development */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Skills Development
            </span>
          </div>
        </div>

        {skillsCards.map((card) => (
          <div
            key={card.title}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4">
              <h3 className="font-medium text-sm text-white">{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Strategy */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Portfolio Strategy
            </span>
          </div>
        </div>

        {portfolioCards.map((card) => (
          <div
            key={card.title}
            className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="sm:p-5 py-4">
              <h3 className="font-medium text-white text-sm">{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PageFrame>
  );
};

export default AssessmentPage;
