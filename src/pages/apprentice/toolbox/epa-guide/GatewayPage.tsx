/**
 * EPA · GatewayPage — editorial guide to Gateway and EPA readiness.
 *
 * The formal readiness checkpoint before EPA. Gateway requirements, AM2,
 * the meeting, readiness checklist, what to do if not ready, portfolio
 * structure template, EPAO understanding, and timeline.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lock,
  CalendarDays,
  Award,
  ClipboardList,
} from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const gatewayRequirements = [
  {
    title: 'Completed learning programme',
    description:
      'All mandatory training modules, college sessions, and on-the-job learning completed and signed off.',
  },
  {
    title: 'Level 2 English and Maths (minimum)',
    description:
      'GCSE grade 4 or above, or Functional Skills Level 2. Since August 2025, adults aged 19+ must study towards Functional Skills but are no longer required to pass the exams.',
  },
  {
    title: 'AM2 practical assessment passed',
    description:
      'You must have passed AM2 at a NET centre before Gateway. Separate from the EPA practical observation.',
  },
  {
    title: 'Portfolio of evidence',
    description:
      'Comprehensive portfolio with evidence against all KSBs in the apprenticeship standard. Reviewed and confirmed as sufficient.',
  },
  {
    title: 'Employer confirmation of readiness',
    description:
      'Your employer confirms you are competent and ready based on workplace performance. Signs the gateway declaration form.',
  },
  {
    title: 'Training provider confirmation',
    description:
      'Training provider confirms all required training is complete. Reviews portfolio, progress records, and assessment results.',
  },
  {
    title: 'Minimum duration met',
    description:
      'Minimum 12 months on programme. Typical duration for Level 3 electrical is 42–48 months.',
  },
  {
    title: '20% off-the-job training completed',
    description:
      'Evidence that you completed at least 20% of working hours as off-the-job training throughout your apprenticeship.',
  },
];

const am2Facts = [
  'Duration: typically 2 days at a NET assessment centre',
  'Tasks: multiple practical installation tasks under timed conditions',
  'Skills tested: installation, termination, testing, fault finding, safe working practices',
  'Graded: Pass or Fail (no Merit/Distinction)',
  'Cost: funded within the £23,000 funding band — you shouldn\'t pay',
  'Booking: arranged by your training provider with NET',
  'Results: typically available within 5 working days',
];

const gatewayMeetingSteps = [
  {
    step: 1,
    title: 'Evidence review',
    description:
      'Training provider reviews your portfolio, qualifications, and progress records to confirm everything is complete.',
  },
  {
    step: 2,
    title: 'Employer assessment',
    description:
      'Your employer confirms your workplace competence — strengths, development areas, and confirms you\'re performing at the expected level.',
  },
  {
    step: 3,
    title: 'Apprentice self-assessment',
    description:
      'You may be asked to reflect on readiness. Your chance to raise concerns or request additional support.',
  },
  {
    step: 4,
    title: 'Decision',
    description:
      'All three parties must agree you\'re ready. If anyone has concerns, Gateway can be postponed.',
  },
  {
    step: 5,
    title: 'Gateway declaration',
    description:
      'A formal declaration form signed by all parties confirming Gateway is passed. Sent to your EPAO.',
  },
  {
    step: 6,
    title: 'EPA scheduling',
    description:
      'Training provider contacts the EPAO to schedule your EPA components within the 3-month assessment window.',
  },
];

const readinessChecklist = [
  'I have completed all required training modules and college sessions',
  'I have passed my AM2 practical assessment',
  'I have Level 2 English and Maths (or Functional Skills equivalent)',
  'My portfolio covers all KSBs in the apprenticeship standard',
  'My portfolio is well-organised with clear evidence mapping',
  'I can perform safe isolation confidently and correctly every time',
  'I can carry out the full testing sequence from memory',
  'I am confident using my test instruments and know they are calibrated',
  'I can work from technical drawings and specifications',
  'I have practised under timed conditions for the practical assessment',
  'I have completed mock knowledge tests and scored consistently well',
  'I have had at least one mock professional discussion',
  'My employer is happy with my workplace performance',
  'I feel ready to demonstrate my competence to an independent assessor',
];

const notReadyOptions = [
  {
    title: 'You can delay Gateway',
    description:
      'If you, your employer, or your training provider feel you\'re not ready, Gateway can be postponed. There\'s no penalty — it just extends your end date.',
  },
  {
    title: 'Request additional support',
    description:
      'If you have specific areas of weakness, ask for targeted support — extra college sessions, additional practical time, focused revision.',
  },
  {
    title: 'Don\'t feel pressured',
    description:
      'Some employers or providers may push for early Gateway to meet targets. You have the right to say you\'re not ready. It\'s in everyone\'s interest you pass first time.',
  },
  {
    title: 'Use self-assessment tools',
    description:
      'The EPA Readiness Simulator in this app can help you assess readiness objectively. Identify weak areas and focus your preparation.',
  },
];

const portfolioSections = [
  {
    section: 'Section 1 — Personal details & introduction',
    contents:
      'Name, employer, training provider, apprenticeship start date, expected end date, pathway (Installation or Maintenance), brief personal statement about your apprenticeship journey.',
  },
  {
    section: 'Section 2 — KSB mapping grid',
    contents:
      'Table listing every Knowledge, Skill, and Behaviour from the standard, with columns showing which evidence covers each. Essential — shows the assessor everything is covered at a glance.',
  },
  {
    section: 'Section 3 — Qualifications & certificates',
    contents:
      'AM2 certificate, English and Maths qualifications, additional certificates (PASMA, IPAF, asbestos awareness, first aid, ECS card), and your EAL / C&G qualification certificates.',
  },
  {
    section: 'Section 4 — Work evidence: photographs',
    contents:
      'Photos of completed work with descriptions explaining what was done, regulations followed, and challenges overcome. Include before / during / after where possible.',
  },
  {
    section: 'Section 5 — Test results & documentation',
    contents:
      'Completed test certificates (initial verification schedules, periodic inspection schedules, EIC / MEIWC forms), annotated to show which tests you personally carried out.',
  },
  {
    section: 'Section 6 — Risk assessments & method statements',
    contents:
      'Examples of RAMS you created or contributed to. Annotate to show your understanding of hazard identification and control measures.',
  },
  {
    section: 'Section 7 — Witness testimonies',
    contents:
      'Statements from your employer, supervisor, or colleagues confirming your competence in specific areas. Each testimony should reference specific KSBs.',
  },
  {
    section: 'Section 8 — Reflective accounts',
    contents:
      'Written reflections on significant pieces of work, challenges overcome, mistakes learned from, and professional development. Use the STAR format.',
  },
  {
    section: 'Section 9 — CPD records',
    contents:
      'Log of all training, courses, workshops, self-study, and professional development activities throughout your apprenticeship.',
  },
  {
    section: 'Section 10 — Progress reviews',
    contents:
      'Copies of your 12-weekly progress review records showing your development over time.',
  },
];

const epaoInfo = [
  {
    title: 'Who selects the EPAO?',
    description:
      'Usually your training provider, based on existing contracts. Your employer may also have a preference. Common EPAOs include Smart Assessor, City & Guilds, EAL, and Highfield.',
  },
  {
    title: 'What does the EPAO do?',
    description:
      'Appoints independent assessors, sets assessment tasks, manages scheduling, conducts quality assurance, and determines your grade. Completely independent from your training provider and employer.',
  },
  {
    title: 'Who is the assessor?',
    description:
      'An experienced electrical professional employed or contracted by the EPAO. Holds relevant qualifications and is trained in assessment. No connection to your training provider or employer.',
  },
  {
    title: 'Assessor impartiality',
    description:
      'EPAO assessors must be impartial. They cannot have previously taught or employed you. Any conflict of interest = a different assessor.',
  },
  {
    title: 'Assessment materials',
    description:
      'The EPAO provides knowledge test papers, practical assessment briefs, and professional discussion question banks. Standardised across all candidates using that EPAO.',
  },
];

const timeline = [
  { period: 'Day 0', event: 'Gateway meeting — all parties agree you\'re ready, declaration signed' },
  { period: 'Wk 1–2', event: 'Training provider contacts EPAO to register you for EPA' },
  { period: 'Wk 2–4', event: 'EPAO schedules your assessment components and assigns assessors' },
  { period: 'Wk 3–6', event: 'Knowledge test (usually first)' },
  { period: 'Wk 4–8', event: 'Practical observation (scheduled around your work and venue)' },
  { period: 'Wk 6–10', event: 'Professional discussion (usually last)' },
  { period: 'Wk 8–12', event: 'All components completed within the 3-month window' },
  { period: 'Wk 10–14', event: 'Results available (10–15 working days after final component)' },
  { period: 'Wk 14–22', event: 'Apprenticeship certificate issued by ESFA (4–8 weeks after results)' },
];

const GatewayPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/end-point-assessment')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · EPA"
          title="Gateway & readiness"
          description="The formal readiness checkpoint before EPA. A structured meeting where you, your employer, and your training provider must agree you're ready to be assessed."
          tone="yellow"
        />
      </motion.div>

      {/* ── What is Gateway ─────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-elec-yellow/85" />
            <Eyebrow>What is the Gateway?</Eyebrow>
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            The Gateway is the formal readiness checkpoint before you enter
            EPA. A structured meeting between you, your employer, and your
            training provider — all three parties must agree you're ready. You
            cannot start EPA until Gateway is passed. It exists to protect you
            from being entered for assessment before you're prepared.
          </p>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">When does Gateway happen?</span>{' '}
              Typically the final 3–6 months of your apprenticeship — once
              you've completed the learning programme, passed AM2, and built a
              comprehensive portfolio. Your training provider will schedule it
              when they believe you're ready.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Gateway requirements ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Gateway requirements"
          title="Eight boxes that must tick"
          meta="All must be met before Gateway can pass"
        />
        <ul className="space-y-2">
          {gatewayRequirements.map((req) => (
            <li
              key={req.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                    {req.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── AM2 ──────────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="The AM2 assessment"
          title="Practical prerequisite to Gateway"
          meta="Different from the EPA practical observation"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            The AM2 (Achievement Measurement 2) is a practical assessment run
            by NET that tests your installation competence. Separate from your
            EPA practical observation but a prerequisite for Gateway.
          </p>
          <div className="space-y-2">
            <Eyebrow>AM2 key facts</Eyebrow>
            <ul className="space-y-1.5">
              {am2Facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">AM2 vs EPA practical — what's different?</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">AM2:</span> tests
              basic installation competence — can you wire circuits, make
              connections, and test safely? Standardised conditions at a NET
              centre. Pass / Fail only.
            </p>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">EPA practical:</span>{' '}
              assesses overall competence as an electrician — planning,
              installation, testing, quality, problem-solving, compliance. Graded
              Pass / Merit / Distinction. More comprehensive and counts towards
              your final grade.
            </p>
          </div>
          <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-red-300">If you fail AM2:</span>{' '}
                you can re-sit, but it will delay Gateway and EPA. Your training
                provider will arrange additional support. Most apprentices pass
                first time with proper preparation — use the AM2 Simulator in
                this app to practise.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Gateway meeting ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="The gateway meeting"
          title="Six steps from evidence to scheduling"
          meta="Formal review where all three parties decide"
        />
        <ol className="space-y-2">
          {gatewayMeetingSteps.map((item) => (
            <li
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* ── Readiness checklist ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Readiness checklist"
          title="14 statements you should agree with"
          meta="Tick honestly — your time and reputation matter"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {readinessChecklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Not ready? ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="If you're not ready"
          title="Delay beats failing"
          meta="You have the right to say you're not ready"
        />
        <ul className="space-y-2">
          {notReadyOptions.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-elec-yellow tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Portfolio template ──────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Portfolio structure"
          title="A 10-section template that works"
          meta="A well-structured portfolio makes Gateway easier"
        />
        <ul className="space-y-2">
          {portfolioSections.map((item) => (
            <li
              key={item.section}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="h-3.5 w-3.5 text-elec-yellow/85" />
                <h3 className="text-[13px] font-semibold text-elec-yellow tracking-tight">
                  {item.section}
                </h3>
              </div>
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                {item.contents}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── EPAO info ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Understanding your EPAO"
          title="Who runs your assessment"
          meta="Independent body — separate from your provider and employer"
        />
        <ul className="space-y-2">
          {epaoInfo.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5"
            >
              <div className="flex items-start gap-2.5">
                <Award className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Timeline ────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Timeline"
          title="From Gateway to your certificate"
          meta="Typical 14–22 weeks from meeting to ESFA certificate"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-2">
            {timeline.map((item) => (
              <li key={item.period} className="flex items-start gap-3">
                <CalendarDays className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span className="text-[11.5px] font-mono uppercase tracking-[0.14em] text-elec-yellow min-w-[70px] flex-shrink-0">
                  {item.period}
                </span>
                <span className="text-[12.5px] text-white/85 leading-relaxed">
                  {item.event}
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Note:</span>{' '}
              Timelines vary depending on EPAO availability, venue scheduling,
              and your personal readiness. Your training provider will keep you
              updated as dates are confirmed.
            </p>
          </div>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default GatewayPage;
