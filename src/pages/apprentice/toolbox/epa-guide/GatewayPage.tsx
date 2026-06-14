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
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const gatewayRequirements = [
  {
    title: 'Completed learning programme',
    description:
      'All mandatory training modules, college sessions, and on-the-job learning completed and signed off.',
  },
  {
    title: 'Level 2 English and Maths (minimum)',
    description:
      "GCSE grade 4 or above, or Functional Skills Level 2. Apprentices aged 16–18 must achieve Level 2. From August 2025, apprentices aged 19+ may complete without passing the Functional Skills exams, though many providers still expect them — confirm your own standard's gateway requirement.",
  },
  {
    title: 'On-programme practical competence demonstrated',
    description:
      'You must have completed the required on-programme qualifications and practical units (your EAL or C&G Level 3) and be assessed as occupationally competent. For ST0152 the practical end-point assessment itself is the AM2S, taken after Gateway, not before it.',
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
    title: 'Off-the-job training hours met',
    description:
      "Evidence you completed your standard's fixed off-the-job training requirement — 1,066 hours for the Installation & Maintenance Electrician (ST0152) — across the practical period. The old 20% rule was replaced by fixed hours per standard from 1 August 2025.",
  },
];

const am2sFacts = [
  'What it is: the AM2S is the ST0152 end-point assessment — one integrated practical and knowledge assessment, taken AFTER Gateway',
  'Run by: NET (National Electrotechnical Training) at approved AM2 assessment centres',
  'Duration: around 16.75 hours of assessment, spread across the sessions below',
  'Sections: Safe Isolation & Risk Assessment, Composite Installation, Inspection/Testing/Certification, Safe Isolation of circuits, Fault Diagnosis, plus an online Assessment of Applied Knowledge',
  "Cost: funded within the £23,000 funding band — you shouldn't pay",
  'Booking: arranged by your training provider with NET once Gateway is passed',
];

const am2Variants = [
  {
    name: 'AM2S',
    who: 'The apprentice end-point assessment for ST0152 (Installation & Maintenance Electrician). This is the one you take.',
  },
  {
    name: 'AM2E',
    who: 'The Experienced Worker route (2346-03 EWA) for qualified people without an apprenticeship — not the apprentice EPA.',
  },
  {
    name: 'AM2 / AM2ED',
    who: "Legacy and diagnostic variants. Don't confuse these with your AM2S.",
  },
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
      "Your employer confirms your workplace competence — strengths, development areas, and confirms you're performing at the expected level.",
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
      "All three parties must agree you're ready. If anyone has concerns, Gateway can be postponed.",
  },
  {
    step: 5,
    title: 'Gateway declaration',
    description:
      'A formal declaration form signed by all parties confirming Gateway is passed. Sent to NET to register you for the AM2S.',
  },
  {
    step: 6,
    title: 'AM2S scheduling',
    description:
      'Training provider registers you with NET to schedule your AM2S at an approved assessment centre within the assessment window.',
  },
];

const readinessChecklist = [
  'I have completed all required training modules and college sessions',
  'I have completed my Level 3 qualification and on-programme practical units',
  'I have Level 2 English and Maths (or Functional Skills equivalent)',
  'My portfolio covers all KSBs in the apprenticeship standard',
  'My portfolio is well-organised with clear evidence mapping',
  'I can perform safe isolation confidently and correctly every time',
  'I can carry out the full testing sequence from memory',
  'I am confident using my test instruments and know they are calibrated',
  'I can work from technical drawings and specifications',
  'I have practised under timed conditions for the practical assessment',
  'I have completed mock knowledge tests and scored consistently well',
  'I have rehearsed every AM2S section, including fault diagnosis, under timed conditions',
  'My employer is happy with my workplace performance',
  'I feel ready to demonstrate my competence to an independent assessor',
];

const notReadyOptions = [
  {
    title: 'You can delay Gateway',
    description:
      "If you, your employer, or your training provider feel you're not ready, Gateway can be postponed. There's no penalty — it just extends your end date.",
  },
  {
    title: 'Request additional support',
    description:
      'If you have specific areas of weakness, ask for targeted support — extra college sessions, additional practical time, focused revision.',
  },
  {
    title: "Don't feel pressured",
    description:
      "Some employers or providers may push for early Gateway to meet targets. You have the right to say you're not ready. It's in everyone's interest you pass first time.",
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
      'Your EAL / C&G Level 3 qualification certificates, English and Maths qualifications, and additional certificates (PASMA, IPAF, asbestos awareness, first aid, ECS card). The AM2S sits after Gateway, so its certificate is added once you pass it.',
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
    title: 'Who runs the ST0152 end-point assessment?',
    description:
      'For the Installation & Maintenance Electrician the AM2S is delivered by NET (National Electrotechnical Training) at approved AM2 assessment centres. It is not an open EPAO marketplace — NET is the assessment body for this standard. (Other apprenticeship standards do use a wider choice of EPAOs.)',
  },
  {
    title: 'What does NET do?',
    description:
      'Sets the AM2S assessment tasks and applied-knowledge test, provides trained independent assessors, manages scheduling at approved centres, conducts quality assurance, and confirms your result. Independent from your training provider and employer.',
  },
  {
    title: 'Who is the assessor?',
    description:
      'An experienced electrical professional approved by NET, trained in assessment, with no connection to your training provider or employer.',
  },
  {
    title: 'Assessor impartiality',
    description:
      'AM2S assessors must be impartial. They cannot have previously taught or employed you. Any conflict of interest means a different assessor.',
  },
  {
    title: 'Assessment materials',
    description:
      'NET provides the standardised practical assessment briefs and the online Assessment of Applied Knowledge. The same standard applies to every candidate at every approved centre.',
  },
];

const timeline = [
  {
    period: 'Day 0',
    event: "Gateway meeting — all parties agree you're ready, declaration signed",
  },
  { period: 'Wk 1–2', event: 'Training provider registers you with NET for the AM2S' },
  { period: 'Wk 2–6', event: 'NET schedules your AM2S at an approved assessment centre' },
  {
    period: 'Wk 4–10',
    event: 'AM2S sittings — practical sections and online applied-knowledge test',
  },
  { period: 'Wk 8–12', event: 'AM2S completed within the assessment window' },
  {
    period: 'Wk 10–14',
    event: 'Result confirmed (typically within a few weeks of your final section)',
  },
  {
    period: 'Wk 14–22',
    event: 'Apprenticeship certificate issued by ESFA (4–8 weeks after results)',
  },
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
            The Gateway is the formal readiness checkpoint before you enter EPA. A structured
            meeting between you, your employer, and your training provider — all three parties must
            agree you're ready. You cannot start EPA until Gateway is passed. It exists to protect
            you from being entered for assessment before you're prepared.
          </p>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">When does Gateway happen?</span>{' '}
              Typically the final 3–6 months of your apprenticeship — once you've completed the
              learning programme, your Level 3 qualification, and built a comprehensive portfolio.
              The AM2S end-point assessment comes after Gateway, not before it.
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
                  <p className="text-[13px] text-white/85 leading-relaxed">{req.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── AM2S = the EPA ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="The AM2S assessment"
          title="The AM2S is your end-point assessment"
          meta="Taken after Gateway — not a separate pre-gateway hurdle"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <p className="text-[13px] text-white/85 leading-relaxed">
            For ST0152 there is one practical end-point assessment: the AM2S (Achievement
            Measurement 2 Standard), run by NET. It is an integrated assessment of your practical
            and applied-knowledge competence, taken after you pass Gateway. There is no separate
            "AM2 before Gateway" plus a different "EPA practical" — the AM2S is the EPA.
          </p>
          <div className="space-y-2">
            <Eyebrow>AM2S key facts</Eyebrow>
            <ul className="space-y-1.5">
              {am2sFacts.map((fact) => (
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
            <Eyebrow className="text-elec-yellow/85">
              AM2 vs AM2S vs AM2E — don't get them confused
            </Eyebrow>
            {am2Variants.map((v) => (
              <p key={v.name} className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-elec-yellow">{v.name}:</span> {v.who}
              </p>
            ))}
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <Eyebrow className="text-elec-yellow/85">The correct sequence</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              On-programme learning + Level 3 qualification + functional skills + fixed off-the-job
              hours <span className="text-elec-yellow">→</span> Gateway sign-off{' '}
              <span className="text-elec-yellow">→</span> AM2S (the practical and knowledge
              end-point assessment by NET).
            </p>
          </div>
          <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-red-300">If you don't pass the AM2S:</span> you
                can re-sit. Your training provider arranges additional support first. Most
                apprentices pass first time with proper preparation — use the AM2 Simulator in this
                app to practise.
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
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
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
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
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
              <p className="text-[12.5px] text-white/85 leading-relaxed">{item.contents}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── EPAO info ──────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Who runs your assessment"
          title="NET delivers the AM2S"
          meta="Independent assessment body — separate from your provider and employer"
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
                  <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
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
                <span className="text-[12.5px] text-white/85 leading-relaxed">{item.event}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Note:</span> Timelines vary depending
              on NET centre availability, venue scheduling, and your personal readiness. Your
              training provider will keep you updated as dates are confirmed.
            </p>
          </div>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default GatewayPage;
