/**
 * Module 1 · Section 1 · Subsection 3 — MHSWR 1999 + CDM 2015: the planning duty
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.1 — own roles and responsibilities and those of others
 *   - 2357 Unit 601 ELTK01 / AC 1.2 — particular Health and Safety risks
 *
 * MHSWR Reg 3 (suitable and sufficient), Reg 5 (effective arrangements) and the
 * CDM 2015 dutyholder framework. L3 starts to carry the planning duty — and
 * may be the Contractor (Reg 9) on a small job before realising it.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'MHSWR + CDM 2015 — the planning duty (1.1) | Level 3 Module 1.1.3 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on the Management of Health and Safety at Work Regulations 1999 and CDM 2015 — Reg 3 risk assessment, Reg 5 effective arrangements, dutyholder roles, and the L2-to-L3 shift from Worker to Contractor.';

const checks = [
  {
    id: 'l3-m1-s1-sub3-mhswr-r5',
    question:
      "What does MHSWR 1999 Reg 5 (Health and Safety arrangements) actually require?",
    options: [
      "That every job has a written method statement.",
      "That every employer makes and gives effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures. Where there are five or more employees these arrangements must be recorded.",
      "That the boss buys the tea.",
      "That every job has a CDM phase plan.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 5 is the operational backbone — Reg 3 says 'do the assessment'; Reg 5 says 'now actually run the system that delivers the controls'. In a real firm, Reg 5 manifests as the H&S management system, the toolbox talks, the near-miss reporting, the audit cycle. At L3 you start to be visible inside Reg 5 — your sign-off contributes to it.",
  },
  {
    id: 'l3-m1-s1-sub3-cdm-contractor',
    question:
      "You're an L3 apprentice running a small two-day commercial socket installation job for a high-street retail client. No principal contractor is appointed. Are you a CDM 2015 'Contractor'?",
    options: [
      "No — you're an apprentice.",
      "Potentially yes. CDM 2015 Reg 2 defines a 'contractor' as any person (including a company) who in the course or furtherance of a business carries out, manages or controls construction work. If your firm is the only one carrying out construction work for the client, your firm is the contractor. As the operative on site you carry the Reg 8 (general worker) and Reg 15 (cooperation) duties, plus your firm carries Reg 9 (contractor duties — plan, manage, monitor). Contractor status is a function of the role, not the title.",
      "No — CDM only applies to projects over £50,000.",
      "No — CDM only applies to new builds.",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 covers any 'construction work' — install, alteration, refurbishment, demolition. The £50k threshold doesn't exist. The trap is assuming CDM is 'big-site stuff' — a two-day socket install in a retail shop is construction work and CDM applies. The L2-to-L3 shift is realising your firm becomes the Contractor by default on small jobs, and your supervisor (and increasingly you) carry the Reg 9 duties.",
  },
  {
    id: 'l3-m1-s1-sub3-mhswr-r3',
    question:
      "Under MHSWR Reg 3, who must the risk assessment cover?",
    options: [
      "Only employees.",
      "(a) Employees while at work; AND (b) persons not in the employer's employment but who may be affected by the work. So it covers your apprentice mate, your customer, the customer's family, the public passing the work area, and any other trades on site.",
      "Only the public.",
      "Only people over 18.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 3(1) explicitly covers both employees AND non-employees affected by the work — the same scope as HASAWA s.2 + s.3 combined. The 'suitable and sufficient' qualifier is the technical bar. The 5+ employees recording threshold (Reg 3(6)) is the same threshold HASAWA s.2 uses for the written safety policy.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is MHSWR 1999 Reg 3 the foundation of the modern UK risk-assessment regime?",
    options: [
      "Because it abolishes risk assessments.",
      "Because it requires every employer (and self-employed person) to make a 'suitable and sufficient' assessment of the risks to employees and to non-employees affected by the work, AND to record the significant findings where there are 5+ employees. This is the legal source of every risk assessment, RAMS, dynamic assessment and toolbox talk.",
      "Because it is voluntary.",
      "Because it only applies in 1999.",
    ],
    correctAnswer: 1,
    explanation:
      "Remember from L2 — Reg 3 is the risk-assessment hook. At L3 the depth: 'suitable and sufficient' is a legal test, not a corporate phrase. After an incident the inspector reads the assessment and judges whether it was 'suitable and sufficient' against the actual hazards present. Templates and copy-paste don't satisfy it.",
  },
  {
    id: 2,
    question: "What does MHSWR Reg 5 (Health and safety arrangements) add beyond Reg 3?",
    options: [
      "It just repeats Reg 3.",
      "It requires effective planning, organisation, control, monitoring and review of the preventive measures. Reg 3 is 'do the assessment'; Reg 5 is 'run the management system that turns the assessment into actual on-site protection'. The 5+ employees recording threshold also applies.",
      "It abolishes risk assessment.",
      "It only applies in November.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 5 is what an HSE inspector audits during a 'systems' visit — not just the paper, but the cycle of planning, doing, checking and reviewing. The 'POCMR' acronym (Plan, Organise, Control, Monitor, Review) maps directly to ISO 45001 and HSG65.",
  },
  {
    id: 3,
    question: "What does MHSWR Reg 7 require?",
    options: [
      "Only that the kettle works.",
      "That every employer appoint one or more competent persons to assist them in undertaking the measures needed to comply with the requirements and prohibitions imposed on them by the relevant statutory provisions. Often this is a designated H&S manager or external consultant.",
      "Only that the kettle is electric.",
      "Only that the kettle is yellow.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 7 is the 'competent person' regulation — every employer must have someone with the technical know-how to advise them on H&S. In a small electrical firm this is usually the Qualified Supervisor or the JIB-graded contracts manager.",
  },
  {
    id: 4,
    question: "What does MHSWR Reg 14 place on the employee?",
    options: [
      "Nothing.",
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
      "Only attendance at the Christmas party.",
      "Only that the employee shaves.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 14 is the employee's MHSWR duty — sister to HASAWA s.7 and EAWR Reg 3(2). The reporting duty (limb b) is the legal basis for raising near-misses and shortcomings — and ERA 1996 s.44 protects you from detriment for doing so.",
  },
  {
    id: 5,
    question: "Under CDM 2015, what's the key threshold for a 'notifiable' project?",
    options: [
      "£10,000 contract value.",
      "Construction work expected to (a) last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR (b) exceed 500 person-days. The client must notify the HSE via Form F10 before the work starts. CDM still applies to non-notifiable projects — only the F10 notification differs.",
      "Any work in central London.",
      "Any work above 1 metre.",
    ],
    correctAnswer: 1,
    explanation:
      "Notifiability triggers the F10. CDM duties apply regardless — Reg 4 (client), Reg 8 (general duties), Reg 9 (contractor duties), Reg 13 (principal contractor on multi-contractor projects), Reg 15 (worker duties). A small one-day job is still a 'project' and CDM applies; only the F10 falls away.",
  },
  {
    id: 6,
    question: "Under CDM 2015 Reg 9, what are a contractor's main duties?",
    options: [
      "Just to do the work.",
      "Plan, manage and monitor construction work carried out either by the contractor or by workers under their control, to ensure that, so far as reasonably practicable, it is carried out without risks to health or safety. Includes complying with any directions of the principal designer / principal contractor and applying the general principles of prevention.",
      "Just to invoice the client.",
      "Just to wear hi-vis.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 9 is the contractor's planning and oversight duty. The L2-to-L3 step: at L2 you were a 'worker' under Reg 15. At L3 your firm (and increasingly you, as you supervise junior trades) sit inside Reg 9.",
  },
  {
    id: 7,
    question: "Under CDM 2015 Reg 15, what duty does a worker owe?",
    options: [
      "None.",
      "To co-operate with the client, principal designer, principal contractor, contractor and any other person performing a duty under CDM, AND to report to the principal contractor (or contractor where there is no principal contractor) anything that they consider is likely to endanger their own or another person's health or safety, AND to comply with the requirements of CDM.",
      "Only to clock in on time.",
      "Only to keep the van clean.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 15 is the personal duty for everyone on a CDM site — sister duty to HASAWA s.7. Co-operation includes attending site induction, following site rules, raising near-misses through the contractor's reporting route. Knowing Reg 15 by name lets you push back on 'just crack on' instructions with regulatory authority.",
  },
  {
    id: 8,
    question:
      "What's the L2-to-L3 conceptual shift in how CDM 2015 applies to you?",
    options: [
      "There isn't one.",
      "At L2 you sat firmly inside Reg 15 (worker). At L3 you start carrying weight inside Reg 9 (contractor) — you may run a small job alone, you may be the senior trade on site, your firm may be 'the Contractor' for a domestic job where the homeowner is the client. Recognising that the contractor duties apply to your firm (and to your conduct as the firm's representative) is the planning-duty step.",
      "It only applies on three-phase work.",
      "It only applies in winter.",
    ],
    correctAnswer: 1,
    explanation:
      "The L3 step is moving from 'someone else plans, I just do' to 'I'm starting to carry the planning duty too'. Reg 9 contractor duties are about the system, not just the task. Pre-task briefings, dynamic risk assessments, near-miss reporting upwards — all sit inside Reg 9.",
  },
];

const faqs = [
  {
    question: "Does MHSWR Reg 3 require a written risk assessment for every single job?",
    answer:
      "Not literally every job — it requires the assessment itself. Recording is mandatory for the significant findings where there are 5+ employees, but a job-pack template, a dynamic-assessment notebook entry or a job-app form all count as 'recording'. The point is contemporaneous evidence that the assessment happened. Inspectors don't expect a fresh War and Peace for a five-minute call-out, but they do expect to see the cycle in operation.",
  },
  {
    question: "What's the relationship between MHSWR Reg 3 and a CDM construction phase plan?",
    answer:
      "MHSWR Reg 3 is the broad employer duty. The CDM construction phase plan (Reg 12 / Reg 16 — written by the principal contractor on multi-contractor projects, by the contractor on single-contractor projects) is the specific document that covers the construction project. They overlap — the construction phase plan is essentially the project-specific risk assessment plus the operational arrangements (Reg 5). One feeds the other.",
  },
  {
    question: "Who's the 'client' on a domestic refurbishment under CDM 2015?",
    answer:
      "The homeowner is the client, but CDM 2015 has a domestic carve-out — the client duties (Reg 4) cascade to the principal contractor (or contractor on single-contractor projects). So a domestic homeowner doesn't have to write a construction phase plan; the contractor does. This is a relatively recent change (2015 onwards) — pre-2015 domestic clients were exempt entirely.",
  },
  {
    question: "If I'm the only contractor on a domestic job, do I need a construction phase plan?",
    answer:
      "Yes. CDM 2015 Reg 12(2) requires a construction phase plan for every project, single-contractor or multi. For a small project this can be very brief — the HSE 'CIS80' guide gives a one-page template that's adequate for most domestic and small commercial work. The plan must be in place before construction starts.",
  },
  {
    question: "What's the practical difference between MHSWR Reg 3 and EAWR Reg 4?",
    answer:
      "MHSWR Reg 3 is general — every employer assesses every risk. EAWR Reg 4 is specific to electrical systems — every system is constructed and maintained safe. They overlap on electrical work. After an electrical incident the prosecution will routinely cite both — the broad assessment failure (MHSWR) and the specific electrical-system failure (EAWR).",
  },
  {
    question: "Can a single person be both the CDM client AND the contractor on a small domestic job?",
    answer:
      "Yes. A self-builder doing their own electrics is both the client and the contractor. The CDM duties stack on the same person. For your average L3 working for a firm, it's the firm that's the contractor and the homeowner that's the client — but in some self-employed contexts the same person carries multiple hats.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 3"
            title="MHSWR 1999 + CDM 2015 — the planning duty"
            description="Remember from L2 — MHSWR Reg 3 is where risk assessment lives. At L3 you also start carrying weight inside CDM 2015 Reg 9 (contractor) — sometimes before you realise."
            tone="emerald"
          />

          <TLDR
            points={[
              'MHSWR 1999 is the regulation that puts risk assessment on the statute book. Reg 3 (suitable and sufficient assessment), Reg 5 (effective arrangements), Reg 7 (competent persons), Reg 14 (employee duty to report shortcomings).',
              "CDM 2015 covers all construction work — including small electrical refurbs. There's no monetary threshold; the £50k myth is a myth. Notifiability (&gt;30 days/20 workers OR &gt;500 person-days) only changes whether an F10 is filed.",
              "L2-to-L3 shift: at L2 you sat in CDM Reg 15 (worker). At L3 your firm sits in Reg 9 (contractor) and you increasingly act as the firm's representative on site — the planning duty starts to land on your shoulders.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the duties under MHSWR 1999 Reg 3 (risk assessment), Reg 5 (effective arrangements), Reg 7 (competent persons) and Reg 14 (employee duty to report).",
              "Identify the CDM 2015 dutyholder roles — Client (Reg 4), Designer (Reg 9 of designer regs), Principal Designer, Principal Contractor (Reg 13), Contractor (Reg 9), Worker (Reg 15).",
              "Explain when CDM applies — to all construction work — and when it becomes notifiable (F10 threshold).",
              "Recognise the L2-to-L3 shift from Worker (Reg 15) to Contractor representative (Reg 9 / firm) and the planning duties that come with it.",
              "Describe how MHSWR Reg 3 risk assessments and CDM construction phase plans interlock on a real project.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>MHSWR — the risk assessment regime</ContentEyebrow>

          <ConceptBlock
            title="Reg 3 — 'suitable and sufficient'"
            plainEnglish="Every employer (and self-employed person) must assess the risks to (a) employees and (b) non-employees affected by the work. The assessment must be 'suitable and sufficient' — a legal test, not a corporate slogan. Where there are 5+ employees the significant findings must be recorded."
            onSite="Remember from L2 — Reg 3 is what gives RAMS its statutory grounding. At L3 the depth shifts to the legal test of 'suitable and sufficient'. After an incident the inspector reads the assessment and asks: did it identify the actual hazard? Were the controls proportionate? Was it kept current? A template that says 'standard electrical risks' fails the test instantly."
          >
            <p>What 'suitable and sufficient' means in HSE practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identifies all significant hazards</strong> — not a generic checklist;
                actually thinks about the job, the place, the people.
              </li>
              <li>
                <strong>Assesses the risk realistically</strong> — likelihood × severity, with
                evidence behind both.
              </li>
              <li>
                <strong>Specifies proportionate controls</strong> — the hierarchy of controls
                (eliminate, substitute, engineer, administer, PPE).
              </li>
              <li>
                <strong>Identifies who is at risk</strong> — including non-employees and
                vulnerable persons.
              </li>
              <li>
                <strong>Is kept current</strong> — reviewed when conditions change, after a
                near-miss, after an incident, periodically.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1)"
            clause={
              <>
                &quot;Every employer shall make a suitable and sufficient assessment of — (a) the
                risks to the health and safety of his employees to which they are exposed whilst
                they are at work; and (b) the risks to the health and safety of persons not in
                his employment arising out of or in connection with the conduct by him of his
                undertaking, for the purpose of identifying the measures he needs to take to
                comply with the requirements and prohibitions imposed upon him by or under the
                relevant statutory provisions and by Part II of the Fire Precautions (Workplace)
                Regulations 1997.&quot;
              </>
            }
            meaning={
              <>
                The umbrella risk-assessment duty. Same scope as HASAWA s.2 + s.3 combined.
                &quot;Suitable and sufficient&quot; is a legal test that operates by reference to
                the actual hazards present. The 5+ employees recording threshold (Reg 3(6))
                catches almost every electrical contracting firm.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3."
          />

          <SectionRule />

          <ContentEyebrow>Reg 5 — turning assessment into operations</ContentEyebrow>

          <ConceptBlock
            title="The Plan-Organise-Control-Monitor-Review cycle"
            plainEnglish="Reg 3 says 'assess\'. Reg 5 says 'run the system that turns the assessment into actual on-site protection\'. POCMR — Plan, Organise, Control, Monitor, Review. This is the management system, not the paperwork. HSG65 'Managing for Health and Safety' is the HSE\'s go-to guide and ISO 45001 is the international standard."
            onSite="At L3 you become visible inside Reg 5 — your sign-off contributes to it, your near-miss reports feed the 'monitor' phase, your toolbox talk attendance is part of the 'control' phase. Knowing the cycle exists changes how you treat the routine paperwork."
          >
            <p>POCMR in practice for an electrical contracting firm:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — H&S policy, RAMS templates, training matrix,
                competence requirements, equipment registers.
              </li>
              <li>
                <strong>Organise</strong> — roles defined (Qualified Supervisor, contracts
                manager, site supervisor, operative), reporting routes, document control.
              </li>
              <li>
                <strong>Control</strong> — toolbox talks, RAMS sign-off, PPE issue, EICR cycles,
                inspection regimes for ladders/leads/test instruments.
              </li>
              <li>
                <strong>Monitor</strong> — near-miss logging, incident reporting, audit visits,
                supervisor walk-rounds.
              </li>
              <li>
                <strong>Review</strong> — annual H&S review, post-incident lessons-learned,
                policy updates after regulation changes.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>CDM 2015 — dutyholder roles</ContentEyebrow>

          <ConceptBlock
            title="The five CDM duties — and where you sit"
            plainEnglish="CDM 2015 stacks duties on five roles: Client, Designer, Principal Designer, Principal Contractor (only on multi-contractor projects), Contractor and Worker. On a small single-contractor job the Principal Designer and Principal Contractor duties don't apply, but the Contractor and Worker duties always do."
            onSite="The L3 question to ask on every job: who's the client, who\'s the contractor, am I the worker or am I starting to act as the contractor\'s representative? The answer determines which duties apply to me directly today."
          >
            <p>The five CDM dutyholders:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client (Reg 4)</strong> — anyone for whom a project is carried out.
                Domestic clients have most duties cascaded to the contractor.
              </li>
              <li>
                <strong>Designer</strong> — anyone preparing or modifying designs (architect,
                consulting engineer, in-house designer at the contractor). Design duties under
                Reg 9–11.
              </li>
              <li>
                <strong>Principal Designer (Reg 11–12)</strong> — appointed by the client on
                multi-contractor projects to coordinate design risk.
              </li>
              <li>
                <strong>Principal Contractor (Reg 13–14)</strong> — appointed by the client on
                multi-contractor projects to coordinate construction phase. Site induction,
                construction phase plan, welfare, prevention of unauthorised access.
              </li>
              <li>
                <strong>Contractor (Reg 8–10)</strong> — anyone carrying out, managing or
                controlling construction work. Plan, manage and monitor own work and workers'
                work.
              </li>
              <li>
                <strong>Worker (Reg 15)</strong> — every individual on site. Co-operate, comply,
                report risks.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 9(1)"
            clause={
              <>
                &quot;A contractor must not carry out construction work in relation to a project
                unless satisfied that the client is aware of the duties owed by the client under
                these Regulations.&quot;
              </>
            }
            meaning={
              <>
                Reg 9(1) is the &quot;contractor-must-check-client&quot; duty. Before starting
                work on a domestic project the contractor must satisfy themselves the homeowner
                knows their CDM client duties (or, more commonly, that the contractor is taking
                them on by default). On a commercial project the contractor verifies the client
                knows their duties. The L3 step: this conversation often falls to the L3 or
                Approved Electrician on a small job — &quot;does the client know what
                they&apos;re signing up to under CDM?&quot; isn&apos;t a project-manager-only
                question.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 9."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 15"
            clause={
              <>
                &quot;A worker must — (a) co-operate with the client, the principal designer,
                the principal contractor, any contractor and any other person performing a duty
                under these Regulations as is necessary to enable that person to perform that
                duty or function; (b) report to the principal contractor or, where there is no
                principal contractor, the contractor any defect or unsafe practice which they
                believe is likely to endanger their own health or safety or that of any other
                person.&quot;
              </>
            }
            meaning={
              <>
                Reg 15 is the worker&apos;s personal CDM duty. Limb (b) — the reporting duty —
                is the legal basis for raising near-misses and unsafe practices. It runs in
                parallel with HASAWA s.7 and MHSWR Reg 14. At L3 you may be both the worker
                under Reg 15 and the contractor&apos;s representative receiving the report from
                an L2 mate — both directions of the duty are live.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The L2-to-L3 shift — Worker becomes Contractor representative</ContentEyebrow>

          <ConceptBlock
            title="From \'just doing the job' to 'planning, managing, monitoring'"
            plainEnglish="At L2 you carry the Reg 15 worker duty — co-operate, comply, report. At L3 your firm carries the Reg 9 contractor duty (plan, manage, monitor) and you increasingly act as the firm's eyes and ears on site. When you brief an L2 mate, you\'re inside Reg 9. When you sign off the dynamic risk assessment, you\'re inside Reg 9. When you decide whether the work can safely proceed today, you\'re inside Reg 9."
            onSite="The honest test: am I just executing what was planned, or am I now contributing to the planning, monitoring and control? At L3 the answer increasingly tilts towards the second. Recognising it is the start of supervisor competence."
          >
            <p>What Reg 9 contractor duties look like in L3 day-to-day terms:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — pre-task briefing, dynamic risk assessment on arrival,
                checking the RAMS matches the conditions actually found.
              </li>
              <li>
                <strong>Manage</strong> — running an L2 mate\'s work, deciding sequencing,
                allocating tasks within competence, escalating where appropriate.
              </li>
              <li>
                <strong>Monitor</strong> — observing safe-isolation procedure being followed,
                spotting near-misses, checking PPE compliance, intervening when necessary.
              </li>
              <li>
                <strong>Coordinate</strong> — talking to other trades, the principal contractor
                (where one\'s appointed), the customer, raising issues to the supervisor.
              </li>
              <li>
                <strong>Report</strong> — feeding observations and near-misses up the firm\'s
                reporting chain. Reg 9 contains a coordination duty, Reg 15 has the personal
                reporting duty — at L3 both apply.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The hierarchy of control — turning assessment into action</ContentEyebrow>

          <ConceptBlock
            title="ERIC PD — the order MHSWR Schedule 1 actually requires"
            plainEnglish="MHSWR Schedule 1 sets out the &apos;general principles of prevention&apos; — the order you must apply controls. ERIC PD is the practitioner mnemonic: Eliminate the hazard; Reduce or substitute; Isolate (engineering controls); Control (procedural controls); Personal protective equipment; Discipline (training and supervision). PPE is near the bottom for a reason — it depends on the wearer using it correctly every time, which is the weakest control."
            onSite="The L3 framing: when you write or review a RAMS, walk down the hierarchy. Can the hazard be designed out? Can a safer method be used? Can the work be done remotely or behind a barrier? Only when those have been considered does the answer become &apos;wear PPE&apos;. RAMS that lead with PPE are the ones an inspector reads first looking for &quot;suitable and sufficient&quot; failure."
          >
            <p>How ERIC PD applies to a typical electrical task — chasing a wall in a 1980s commercial building (silica risk):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Eliminate</strong> — surface-mounted trunking instead of chasing.
              </li>
              <li>
                <strong>Reduce / Substitute</strong> — drill-and-fix conduit clips instead of
                long chase runs; resin-bonded chase saw (lower dust) instead of hammer / bolster.
              </li>
              <li>
                <strong>Isolate (engineering)</strong> — on-tool extraction connected to an
                M-class vacuum; water suppression where compatible.
              </li>
              <li>
                <strong>Control (procedural)</strong> — limit duration; rotate operatives;
                restrict the area; clear at end of task.
              </li>
              <li>
                <strong>PPE</strong> — FFP3 mask, eye protection, gloves. PPE assumes the higher
                controls are already in place.
              </li>
              <li>
                <strong>Discipline</strong> — training in the technique, supervision of the
                novice, refresher on the COSHH assessment.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>MHSWR Reg 13 — capabilities and training</ContentEyebrow>

          <ConceptBlock
            title="The competence regulation that runs in parallel with EAWR Reg 16"
            plainEnglish="MHSWR Reg 13 is the general &apos;capabilities and training&apos; duty. The employer must consider workers&apos; capabilities when entrusting them with a task and provide adequate training on recruitment, on changes of role or equipment, and where new or changed risks arise. EAWR Reg 16 is the electrical-specific competence regulation; MHSWR Reg 13 is the broader employer duty that catches everything else."
            onSite="Where Reg 13 lands at L3: when the firm puts you on a task type you haven&apos;t done before (first three-phase commercial; first hazardous-area job; first MEWP use), Reg 13 requires training appropriate to the change in risk. &apos;You&apos;ll pick it up&apos; is exactly what Reg 13 doesn&apos;t allow."
          >
            <p>What Reg 13 expects to see in the firm&apos;s evidence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Training matrix</strong> — what each person has been trained in and when
                refresher is due.
              </li>
              <li>
                <strong>Induction records</strong> — confirming workers have been briefed on the
                firm&apos;s arrangements (Reg 5).
              </li>
              <li>
                <strong>Task-specific briefings</strong> — toolbox talks, RAMS sign-off, permit
                discussions.
              </li>
              <li>
                <strong>Re-training triggers</strong> — equipment change, regulation change,
                near-miss outcome, role change.
              </li>
              <li>
                <strong>Working time and fatigue</strong> — Reg 13(2) requires consideration of
                workers&apos; capabilities &quot;as regards health and safety&quot; — which
                includes fatigue and working hours.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 13"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 13(1)</strong> — &quot;Every employer shall, in entrusting tasks to
                  his employees, take into account their capabilities as regards health and
                  safety.&quot;
                </p>
                <p>
                  <strong>Reg 13(2)</strong> — &quot;Every employer shall ensure that his
                  employees are provided with adequate health and safety training — (a) on their
                  being recruited into the employer&apos;s undertaking; and (b) on their being
                  exposed to new or increased risks because of — (i) their being transferred or
                  given a change of responsibilities within the employer&apos;s undertaking, (ii)
                  the introduction of new work equipment into or a change respecting work
                  equipment already in use within the employer&apos;s undertaking, (iii) the
                  introduction of new technology into the employer&apos;s undertaking, or (iv)
                  the introduction of a new system of work into or a change respecting a system
                  of work already in use within the employer&apos;s undertaking.&quot;
                </p>
              </>
            }
            meaning={
              <>
                The general capabilities-and-training duty. Reg 13(3) adds that the training
                must be repeated periodically where appropriate, adapted to take account of new
                or changed risks, and take place during working hours. At L3 this is the
                regulation behind your CPD, your refresher courses and your firm&apos;s
                pre-task briefings. Working in a way that wasn&apos;t covered by your training
                is a Reg 13 + EAWR Reg 16 + HASAWA s.7 issue all at once.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 13."
          />

          <SectionRule />

          <ContentEyebrow>CDM 2015 — the construction phase plan in practice</ContentEyebrow>

          <ConceptBlock
            title="The construction phase plan isn&apos;t optional — even on small jobs"
            plainEnglish="CDM 2015 Reg 12(2) requires a construction phase plan for EVERY project, regardless of size. On a single-contractor job the contractor produces it; on a multi-contractor project the principal contractor produces it. There is no monetary or duration threshold below which the plan is optional. The HSE&apos;s CIS80 short guide gives a one-page template that satisfies the duty for small jobs."
            onSite="L3 reflex on a small commercial or domestic job: before tools come out, is there a construction phase plan? If you&apos;re running the job for your firm, you&apos;re acting on its behalf as the contractor under Reg 9 — the plan needs to exist and you need to have read it. A pre-printed template adapted to the actual site (5-10 minutes of work) is enough for most small jobs."
          >
            <p>What a small-job construction phase plan should cover:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Project description, address, dates, duration.
              </li>
              <li>
                Client details and confirmation of CDM client awareness.
              </li>
              <li>
                Site hazards identified and significant controls (RAMS reference).
              </li>
              <li>
                Welfare arrangements (toilet, hand wash, rest area).
              </li>
              <li>
                Emergency procedures — fire, evacuation, casualty handling, isolation points.
              </li>
              <li>
                First aid arrangements and nearest A&amp;E location.
              </li>
              <li>
                Site induction expectations for any subcontractors or visitors.
              </li>
              <li>
                Communication with the client and any neighbouring occupants.
              </li>
              <li>
                Programme and sequencing where it affects safety.
              </li>
              <li>
                Review and update mechanism if conditions change.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming CDM doesn\'t apply because \'it\'s just a small job\'"
            whatHappens={
              <>
                Firm takes on a one-day socket installation in a high-street retail unit. No
                CDM thinking applied — &quot;it&apos;s a single contractor for one day, CDM
                doesn&apos;t apply&quot;. No construction phase plan, no client awareness
                check, no formal RAMS issued. Apprentice runs an extension lead across an
                emergency exit route to power tools. Customer&apos;s elderly visitor trips
                and breaks a hip. HSE attends, asks for the construction phase plan
                (it doesn&apos;t exist), the RAMS (a one-line generic template), and the
                Reg 9 evidence (none). Firm prosecuted under CDM Reg 9 + HASAWA s.3 + MHSWR
                Reg 3.
              </>
            }
            doInstead={
              <>
                CDM 2015 applies to all construction work, no monetary threshold. For a
                small single-contractor job the construction phase plan can be brief (HSE
                CIS80 template), but it must exist before work starts. The client awareness
                check (Reg 9(1)) is a 30-second conversation. The RAMS must reflect the
                actual hazards. None of this takes long; all of it is mandatory.
              </>
            }
          />

          <ConceptBlock
            title="MHSWR Reg 14 — the employee duty most apprentices forget exists"
            plainEnglish="MHSWR Reg 14 is the employee&apos;s personal duty under the management regs — sister duty to HASAWA s.7 and EAWR Reg 3(2). Two limbs. (a) use machinery, equipment, dangerous substances, transport equipment, means of production or safety devices in accordance with the training and instructions provided. (b) inform the employer of any work situation a person with the training given would reasonably consider represented a serious and immediate danger, AND of any matter the same person would consider a shortcoming in the employer&apos;s protection arrangements."
            onSite="The (b) limb is the legal basis for the &apos;raise it&apos; instinct. &apos;Shortcoming in the employer&apos;s protection arrangements&apos; is wide — missing PPE issue, training gap, RAMS that doesn&apos;t match conditions, broken equipment, customer behaviour creating risk. The L3 reflex of writing things down and raising them up the chain is exactly Reg 14(b) in operation."
          >
            <p>What Reg 14(b) requires you to report:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Serious and immediate danger to yourself or others.
              </li>
              <li>
                Equipment defects that compromise safety.
              </li>
              <li>
                Training gaps you&apos;ve identified in yourself or in colleagues.
              </li>
              <li>
                RAMS or method statements that don&apos;t match the actual conditions on site.
              </li>
              <li>
                PPE not issued, not appropriate or not maintained.
              </li>
              <li>
                Procedural shortcuts that have become normal but compromise safety.
              </li>
              <li>
                Customer or third-party behaviour creating risk to your work.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Templating the risk assessment from a previous job"
            whatHappens={
              <>
                Apprentice copies last week&apos;s domestic CU change RAMS for this
                week&apos;s domestic CU change because &quot;they&apos;re basically the
                same&quot;. Last week the property was vacant; this week it&apos;s
                occupied with two children. Last week the meter was modern; this week
                it&apos;s a pre-2000 unit with no main switch. The RAMS doesn&apos;t
                identify either. Inspector reviews after a near-miss; finds the RAMS is
                a near-identical copy of an old job. &quot;Suitable and sufficient&quot;
                test fails — the assessment didn&apos;t engage with the actual hazards.
              </>
            }
            doInstead={
              <>
                Templates are fine as a starting point but must be adjusted to the actual
                site. Two minutes per job to add the site-specific hazards (occupancy,
                vulnerable persons, building condition, services found, weather) is the
                minimum. The dynamic risk assessment on arrival catches what the template
                cannot.
              </>
            }
          />

          <Scenario
            title="L3 leading a single-contractor job for the first time"
            situation={
              <>
                Your firm has been engaged to install a new ring final and three sockets
                in a small private dental practice during their two-day weekend closure.
                The contracts manager asks you to lead the job — &quot;you&apos;ve done
                three of these now, you can run it&quot;. He hands you a one-page generic
                RAMS marked &quot;commercial socket installation&quot;. The dental
                practice owner (the client) is going to drop the keys off and disappear
                for the weekend. You&apos;ll have one L2 apprentice with you.
              </>
            }
            whatToDo={
              <>
                Pause and treat this as the L3 step it is. Your firm is the Contractor
                under CDM Reg 9. There&apos;s no Principal Contractor because it&apos;s
                single-contractor. The dental practice owner is the Client; the domestic-
                style cascade doesn&apos;t apply (this is a non-domestic client, so the
                client retains the client duties under Reg 4). On arrival: (1) check the
                client knows their CDM duties or the contractor&apos;s taking them on,
                (2) walk through and update the RAMS to reflect the actual site —
                clinical waste, X-ray equipment, dental chairs you can&apos;t move,
                &quot;in case of weekend emergency&quot; building access, gas/water
                isolation positions, fire alarm zones, (3) brief the L2 apprentice on the
                Reg 15 worker duty and the day&apos;s plan, (4) decide as a competent
                contractor whether the planned safe-isolation strategy works. If
                anything looks wrong, ring the contracts manager and the client before
                tools come out. Document the dynamic assessment in the job pack.
              </>
            }
            whyItMatters={
              <>
                This is the moment the L2-to-L3 shift becomes real. At L2 you&apos;d have
                done what the contracts manager said and got on with it. At L3 you&apos;re
                acting as the firm&apos;s Reg 9 representative on site — the planning,
                managing and monitoring duty falls on you for the day. A generic RAMS is
                not &quot;suitable and sufficient&quot; under MHSWR Reg 3, and a CDM
                client-awareness conversation is part of Reg 9(1). Doing both takes 15
                minutes; not doing either is what an HSE prosecution rests on if anything
                goes wrong over the weekend.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Remember from L2 — MHSWR Reg 3 is the risk assessment hook. At L3 the depth shift is the legal test of "suitable and sufficient" and the consequences of templating.',
              "MHSWR Reg 5 is the management-system regulation — POCMR (Plan, Organise, Control, Monitor, Review). HSG65 and ISO 45001 are the practitioner references.",
              "MHSWR Reg 7 requires a competent person; Reg 14 requires the employee to comply with training and to report shortcomings.",
              "CDM 2015 applies to all construction work — there is no £50k threshold. Notifiability (&gt;30 days/20 workers OR &gt;500 person-days) only changes whether an F10 is filed.",
              "CDM dutyholders: Client (Reg 4), Designer, Principal Designer, Principal Contractor (multi-contractor only, Reg 13), Contractor (Reg 9), Worker (Reg 15).",
              "Domestic clients have most duties cascaded to the contractor. Non-domestic clients keep their own client duties.",
              "L2-to-L3 shift: from Reg 15 (worker) to acting as the firm's Reg 9 (contractor) representative — planning, managing and monitoring.",
              "The construction phase plan is mandatory for every project, single- or multi-contractor. For small projects the HSE CIS80 one-page template is adequate.",
            ]}
          />

          <Quiz title="MHSWR + CDM 2015 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 EAWR — competence and supervision
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 RIDDOR, PUWER, COSHH, LOLER — depth refresher
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
