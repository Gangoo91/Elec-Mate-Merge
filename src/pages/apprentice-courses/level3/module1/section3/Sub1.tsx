/**
 * Module 1 · Section 3 · Subsection 1 — Risk assessment as a supervisor
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.1
 *   AC 3.1 — "state the procedure for producing risk assessments and method statements
 *            in accordance with their level of responsibility"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 3.1 + 3.2 — risk assessments and method statements;
 *     working in accordance with provided pre-determined arrangements
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk assessment as a supervisor (3.1) | Level 3 Module 1.3.1 | Elec-Mate';
const DESCRIPTION = 'L3 risk assessment depth — moving from L2 RAMS-following to L3 RAMS-reviewing, dynamic-assessment sign-off and the supervisor judgement on when the static RAMS no longer fits.';

const checks = [
  { id: 'l3-m1-s3-sub1-static-vs-dynamic', question: 'You arrive at site with a 3-week-old RAMS and the conditions are clearly different. What\'s the L3 supervisor call?', options: ['Use the RAMS as written.', 'Stop. The RAMS is the baseline; it can\'t cover what\'s changed since the survey. Walk the site, identify the new hazards, write a dynamic risk assessment that supplements the RAMS, decide whether the work can safely proceed today. If the conditions are wildly different, escalate for a fresh RAMS rather than try to manage on the fly.', 'Ignore the differences.', 'Send the RAMS back to the office to be redone before you start work.'], correctIndex: 1, explanation: 'Remember from L2 — dynamic assessment supplements static. L3 add: judgement on when dynamic isn\'t enough and you need a fresh RAMS. Document the decision either way.' },
  { id: 'l3-m1-s3-sub1-hierarchy', question: 'Apply the hierarchy of control to "drilling silica-bearing masonry":', options: ['Just wear a mask.', '(1) Eliminate — can the chase be avoided (surface mount)? (2) Substitute — different fixing approach? (3) Engineer — on-tool extraction with M-class vacuum, water suppression. (4) Administrative — limit duration, restrict access, time-box. (5) PPE — FFP3 mask LAST. Mask-only on routine silica is rarely defensible under COSHH Reg 7.', 'Just open a window.', 'Just wear gloves.'], correctIndex: 1, explanation: 'Hierarchy of control puts PPE last. The L3 supervisor judgement is on the hierarchy ABOVE PPE, not just the PPE selection.' },
  { id: 'l3-m1-s3-sub1-five-steps', question: 'What\'s HSE\'s "five steps to risk assessment"?', options: ['Five tools.', '(1) Identify the hazards. (2) Decide who might be harmed and how. (3) Evaluate the risks and decide on precautions. (4) Record the significant findings and implement them. (5) Review the assessment and update if necessary. (HSE INDG163, withdrawn but still the conceptual basis of MHSWR Reg 3 in practice.)', 'Five layers of PPE.', 'Five visits per year.'], correctIndex: 1, explanation: 'The 5-step framework is the practical structure for a "suitable and sufficient" assessment under MHSWR Reg 3. Each step needs evidence on the assessment record.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal source of the risk-assessment duty?', options: ['No source.', 'Management of Health and Safety at Work Regulations 1999 Reg 3 — every employer / self-employed person makes a "suitable and sufficient" assessment of risks to employees and to non-employees affected. Recording mandatory if 5+ employees.', 'BS 7671.', 'Local council bylaws.'], correctAnswer: 1, explanation: 'MHSWR Reg 3 is the statutory hook. Remember from L2 — this is where RAMS lives.' },
  { id: 2, question: 'What\'s the difference between a Risk Assessment and a Method Statement?', options: ['Same thing.', 'Risk Assessment = identifies hazards, evaluates risks, specifies controls. Method Statement = sets out the safe sequence of work, the people, the equipment, the controls in operation. RAMS is the combined document. RA tells you WHAT the risks are; MS tells you HOW to do the work safely.', 'RA is for offices, MS is for sites.', 'RA is for paper, MS is for digital.'], correctAnswer: 1, explanation: 'RA = hazards. MS = method. Together = RAMS. Two complementary perspectives on the same job.' },
  { id: 3, question: 'What does "dynamic risk assessment" mean?', options: ['Done quickly.', 'On-site assessment of the actual conditions found on arrival, by the operative(s) doing the work, in real time. Catches what the static RAMS couldn\'t have known. MHSWR Reg 3 expects current assessment; the dynamic version is the closing-the-gap mechanism.', 'Done dynamically.', 'Done with movement.'], correctAnswer: 1, explanation: 'Dynamic = real-time, on the day, in the rooms. The static RAMS doesn\'t replace it; the dynamic doesn\'t replace the RAMS.' },
  { id: 4, question: 'Apply the hierarchy of control:', options: ['PPE first.', 'Eliminate → Substitute → Engineering controls → Administrative controls → PPE. PPE is the LAST line. The hierarchy applies across H&S regs (COSHH Reg 7, MHSWR ACOP, HSG48).', 'Random order.', 'Cheapest first.'], correctAnswer: 1, explanation: 'Hierarchy of control is the universal framework. L3 supervisor judgement on the hierarchy above PPE is the value-add.' },
  { id: 5, question: 'What does "as low as reasonably practicable" (ALARP) mean?', options: ['Cheapest possible.', 'Risk reduced to a level where the cost of further reduction (money, time, trouble) becomes grossly disproportionate to the residual risk. Edwards v NCB [1949] / SFAIRP test. The dutyholder bears the burden of proof.', 'Below 0%.', 'Above 0%.'], correctAnswer: 1, explanation: 'ALARP = SFAIRP-equivalent. Reducing risk to zero is rarely required; reducing it to ALARP / SFAIRP is the legal standard.' },
  { id: 6, question: 'Who can write a method statement?', options: ['Anyone.', 'A competent person — typically the supervisor, contracts manager, technical lead. At L3 you may contribute to the MS or write a short one for a small job, but the formal MS is normally the supervisor\'s document. The RAMS is signed off by a designated competent person.', 'Only the customer.', 'Only the HSE.'], correctAnswer: 1, explanation: 'Competence required. L3 increasingly contributes; full sign-off responsibility usually sits with a more senior person.' },
  { id: 7, question: 'What\'s "POCMR" in MHSWR Reg 5?', options: ['A type of cable.', 'Plan, Organise, Control, Monitor, Review. The cycle that turns risk assessment into operational reality. Reg 5 requires effective arrangements for the planning, organisation, control, monitoring and review of the preventive measures.', 'A type of breaker.', 'A wire colour.'], correctAnswer: 1, explanation: 'POCMR is the management-system framework. Risk assessment is one part; the cycle of running it is what Reg 5 demands.' },
  { id: 8, question: 'When should a RAMS be reviewed?', options: ['Never.', 'When conditions change; after a near-miss or incident; when new equipment / substances are introduced; when new operatives are involved; when regulations change; periodically (typically annually as a baseline). Review is part of MHSWR Reg 3 obligations.', 'Once a decade.', 'Only if HSE asks.'], correctAnswer: 1, explanation: 'Review is continuous — change-driven and periodic. Reg 3 requires the assessment to remain current.' },
];

const faqs = [
  { question: 'Can a generic RAMS be used for similar jobs?', answer: 'A generic RAMS is fine as a starting point but must be customised for each site. "Suitable and sufficient" requires engagement with the specific hazards on this job. A pure copy-paste RAMS fails the test.' },
  { question: 'How long should a dynamic risk assessment be?', answer: 'Brief — a job-pack note, a short form, a few sentences. Five minutes of writing for ten minutes of walking. Quality of thinking matters more than length of writing.' },
  { question: 'Who keeps the dynamic assessment record?', answer: 'Operative\'s job pack, photographed back to the firm\'s system, retained with the job records. After an incident the inspector will ask for it; contemporaneous notebook entries are gold.' },
  { question: 'What if the customer refuses to sign the RAMS?', answer: 'They don\'t have to sign — RAMS is the firm\'s document. They should be briefed on relevant parts (welfare, exclusion zones, emergency plan). If they obstruct work, document and escalate.' },
  { question: 'How is RAMS different from a CDM Construction Phase Plan?', answer: 'CPP is the project-level plan required by CDM 2015 Reg 12 / 16. RAMS is task-level and may be referenced by the CPP. On a single-contractor project the CPP can be very brief (HSE CIS80 template).' },
  { question: 'What\'s the L3 add over L2 risk assessment?', answer: 'L2 followed RAMS. L3 reviews them, signs off the dynamic version, decides when they don\'t fit, escalates for fresh ones. The judgement on when the assessment is "suitable and sufficient" is the L3 step.' },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 1" title="Risk assessment as a supervisor" description="Remember from L2 — RAMS is the static plan, dynamic assessment closes the gap. At L3 you start REVIEWING the static RAMS, signing off the dynamic version, and judging when the static no longer fits the actual site." tone="emerald" />
          <TLDR points={[
            "MHSWR Reg 3 — every employer makes a 'suitable and sufficient' assessment. 5+ employees = recording mandatory.",
            "RAMS = Risk Assessment + Method Statement. Static (in-advance) supplemented by dynamic (on-site, on-the-day).",
            "Hierarchy of control: Eliminate → Substitute → Engineer → Administer → PPE. L3 supervisor judgement is on the hierarchy ABOVE PPE, not just PPE selection.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the procedure for producing risk assessments and method statements at L3 — review, supplement, escalate.",
            "Apply HSE's 5-step framework: identify, who-might-be-harmed, evaluate, record, review.",
            "Apply the hierarchy of control (Eliminate / Substitute / Engineer / Administer / PPE) to a typical electrical job.",
            "Distinguish static RAMS from dynamic risk assessment and the role of each.",
            "State the ALARP / SFAIRP standard and the reverse burden of proof under Edwards v NCB.",
            "Recognise the L3 step from RAMS-following (L2) to RAMS-reviewing and dynamic sign-off.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The five-step framework</ContentEyebrow>
          <ConceptBlock title="The structure that satisfies 'suitable and sufficient'" plainEnglish="HSE's classic 5-step framework: identify hazards, decide who might be harmed and how, evaluate risks and controls, record significant findings, review and update. The framework gives MHSWR Reg 3 its operational shape." onSite="Each step needs evidence on the assessment record. A RAMS that skips any step (e.g. doesn't identify who's at risk) fails the suitable-and-sufficient test.">
            <p>The 5 steps unpacked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Identify hazards</strong> — what could cause harm? Walk-round, prior knowledge, near-miss data, manufacturer data sheets, HSG guidance.</li>
              <li><strong>Who might be harmed and how</strong> — employees, customers, public, vulnerable persons, other trades. The s.3 / Reg 3(b) population.</li>
              <li><strong>Evaluate the risks and decide on precautions</strong> — likelihood × severity; hierarchy of control; ALARP.</li>
              <li><strong>Record the significant findings and implement</strong> — the document and the actual on-site application.</li>
              <li><strong>Review and update</strong> — change-driven and periodic.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1)" clause={<>"Every employer shall make a suitable and sufficient assessment of — (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking."</>} meaning={<>The risk assessment duty. Suitable and sufficient is the legal test. 5+ employees = recording mandatory (Reg 3(6)).</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Hierarchy of control</ContentEyebrow>
          <ConceptBlock title="PPE is the LAST resort" plainEnglish="The hierarchy of control runs from most-effective (eliminate the hazard entirely) to least-effective (PPE — relies on individual compliance and equipment performance). The L3 supervisor judgement is on the hierarchy ABOVE PPE: can we avoid the hazard, substitute it, engineer it out, or limit exposure administratively, before we hand the operative a mask?" onSite="Mask-only on routine silica chasing is the textbook hierarchy-inversion example. COSHH Reg 7 specifically requires the hierarchy be considered. Inspectors check whether engineering controls were considered before PPE.">
            <p>Hierarchy applied to common electrical hazards:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Live electrical work</strong> — Eliminate (isolate). Substitute (different design avoiding live work). Engineer (insulated tools, voltage indicators). Administrative (permit, time-limit, second person). PPE (insulating gloves, FR clothing).</li>
              <li><strong>Working at height</strong> — Eliminate (relocate work to ground). Substitute (cherry-picker not ladder). Engineer (scaffold with handrails). Administrative (training, time-limit, weather check). PPE (harness as last resort).</li>
              <li><strong>Silica dust</strong> — Eliminate (avoid chase). Substitute (different fixing). Engineer (on-tool extraction, water suppression, M-class vacuum). Administrative (time-limit, restricted access). PPE (FFP3).</li>
              <li><strong>Manual handling</strong> — Eliminate (mechanical handling). Substitute (smaller items). Engineer (trolley, hoist). Administrative (team lift, training). PPE (gloves, knee pads).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ALARP and the SFAIRP test" plainEnglish="Risk reduction stops when the cost of further reduction becomes grossly disproportionate to the residual risk. ALARP (As Low As Reasonably Practicable) and SFAIRP (So Far As Is Reasonably Practicable) are the same concept under different acronyms. Edwards v NCB [1949] is the case." onSite="The reverse burden — once the prosecution proves a risk existed, the dutyholder proves they did everything ALARP — is what makes paperwork the defence. RAMS, training records, near-miss logs, toolbox talks all feed the ALARP evidence.">
            <p>Factors a court weighs in the ALARP judgement:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Probability of harm.</li>
              <li>Severity of harm.</li>
              <li>Cost of further controls (money, time, trouble).</li>
              <li>Industry good practice / HSE-published guidance.</li>
              <li>State of knowledge at the time.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Static vs dynamic — both are required</ContentEyebrow>
          <ConceptBlock title="Static RAMS sets the plan; dynamic assessment confirms or amends it" plainEnglish="Static RAMS = the written plan in advance, after a survey, in an office. Dynamic assessment = the walk-round on the day, by the operative, in real time. Static sets strategy; dynamic confirms strategy still fits. Both required by MHSWR Reg 3 in practice." onSite="L3 add: the supervisor signs off the dynamic and decides when conditions are too far off the RAMS to proceed without a fresh one. Document the decision either way.">
            <p>When dynamic isn't enough — fresh RAMS needed:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conditions wildly different from those described in RAMS.</li>
              <li>New hazards present that aren&apos;t covered (asbestos suspicion, structural concerns).</li>
              <li>Different operatives required (competence mismatch).</li>
              <li>Different work scope requested by customer (scope creep).</li>
              <li>Significant change in occupancy / vulnerable persons present.</li>
              <li>Equipment or substance change.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 5(1)" clause={<>"Every employer shall make and give effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures."</>} meaning={<>Reg 5 — the management system. Risk assessment is just one part; the POCMR cycle is what turns it into ongoing protection.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 5 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Deeper supervisor judgement</ContentEyebrow>
          <ConceptBlock title="Suitable and sufficient — what the test actually means" plainEnglish="Suitable = appropriate for the actual hazards on this job, with controls matched to the risk. Sufficient = comprehensive enough to identify the significant risks; not exhaustive of trivia. The test is judged against industry good practice and HSE guidance, not perfection." onSite="The L3 supervisor read of a RAMS asks: does it engage with the SPECIFIC hazards on this job? Does it identify the significant ones? Does it specify controls that match the hazards? If yes, it&apos;s suitable and sufficient. Generic templates fail the test the moment they&apos;re used unaltered.">
            <p>Test components per HSE INDG163 guidance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Identifies all significant risks</strong> — not trivia, not exhaustive — the ones that could cause harm.</li>
              <li><strong>Considers all who might be affected</strong> — employees, contractors, customers, public, vulnerable persons.</li>
              <li><strong>Reflects what is happening on the job</strong> — site-specific, current, not last year&apos;s template.</li>
              <li><strong>Specifies the precautions</strong> — concrete controls, not vague aspirations.</li>
              <li><strong>Records the conclusions</strong> — written record, signed, dated.</li>
              <li><strong>Reviewed when conditions change</strong> — change-driven and periodic.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Risk matrix — likelihood × severity in practice" plainEnglish="Most firms use a 3x3 or 5x5 matrix. Likelihood scale (rare to almost certain) on one axis; severity scale (minor to catastrophic) on the other. Score = product. Matrix categorises (low / medium / high / very high) and triggers the level of control required." onSite="The matrix isn&apos;t mathematical precision — it&apos;s structured judgement. Two assessors looking at the same hazard should land within 1-2 score points. Wide divergence means the assessment isn&apos;t calibrated.">
            <p>Typical 5x5 score bands:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1-4 (low)</strong> — proceed with standard controls.</li>
              <li><strong>5-9 (medium)</strong> — additional controls / monitoring.</li>
              <li><strong>10-15 (high)</strong> — significant control measures; escalation considered.</li>
              <li><strong>16-25 (very high)</strong> — work should not proceed without major intervention.</li>
              <li>Modify for population exposed (one operative vs the public).</li>
              <li>Modify for reversibility of harm (recoverable vs permanent / fatal).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Method statement structure — what good looks like" plainEnglish="A method statement reads as the operative&apos;s job-day script. Headed sections: scope, sequence of work, tools and equipment, materials, controls in place at each stage, named persons and competence, emergency arrangements, sign-on / sign-off." onSite="The L3 supervisor often writes a short MS for routine work. Keep it concrete: \&quot;at step 3, isolate the circuit using the lock-off kit and prove dead with the GS38 indicator before...\&quot;. Vague MS = vague follow-through.">
            <p>Headline MS sections:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Scope and location</strong> — what work, where, what&apos;s out of scope.</li>
              <li><strong>Sequence of work</strong> — step-by-step in operational order.</li>
              <li><strong>Tools, equipment, materials</strong> — what&apos;s used at each stage.</li>
              <li><strong>Controls at each stage</strong> — RAMS-derived controls applied to the sequence.</li>
              <li><strong>Personnel and competence</strong> — who&apos;s named, what they&apos;re competent for.</li>
              <li><strong>Emergency arrangements</strong> — first aid, fire, evacuation, escalation contacts.</li>
              <li><strong>Sign-on / sign-off</strong> — operative confirms understanding before start; supervisor closes out at end.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Reverse burden of proof — why paperwork is the defence" plainEnglish="Once the prosecution proves a risk existed (Edwards v NCB principle), the dutyholder must prove they did everything reasonably practicable to control it. The burden flips. The defence is the documented evidence of risk assessment, controls, training, supervision, monitoring." onSite="Every RAMS sign-off, toolbox talk attendance log, near-miss entry and intervention record contributes to the ALARP defence. The L3 supervisor&apos;s habit of recording is what protects the firm 18 months later when the inspector arrives.">
            <p>Evidence categories that build the ALARP defence:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk assessments and method statements (current, signed, site-specific).</li>
              <li>Training records and competence assessments.</li>
              <li>Toolbox talk attendance logs.</li>
              <li>Near-miss reports and learning actions.</li>
              <li>Equipment inspection / calibration records.</li>
              <li>Intervention records (informal coaching, formal disciplinary).</li>
              <li>Incident investigation reports.</li>
              <li>Periodic review records of the management system.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.40 (Reverse burden of proof)" clause={<>"In any proceedings for an offence under any of the relevant statutory provisions consisting of a failure to comply with a duty or requirement to do something so far as is practicable or so far as is reasonably practicable, or to use the best practicable means to do something, it shall be for the accused to prove (as the case may be) that it was not practicable or not reasonably practicable to do more than was in fact done to satisfy the duty or requirement, or that there was no better practicable means than was in fact used to satisfy the duty or requirement."</>} meaning={<>s.40 is the statutory expression of the reverse burden. Once the prosecution shows the risk existed, the defendant proves SFAIRP was met. The paperwork (RAMS, training, supervision records) is the proof.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.40 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <ContentEyebrow>Common mistakes</ContentEyebrow>
          <CommonMistake title="Generic \'standard electrical install' RAMS" whatHappens={<>Firm uses identical generic RAMS for every job; HSE inspector reviews after near-miss; finds RAMS doesn&apos;t engage with site-specific hazards. &quot;Suitable and sufficient&quot; test fails. Reg 3 breach noted; FFI invoiced; firm reputation damaged.</>} doInstead={<>Generic templates are fine as starting points. Customise to site every time — even two minutes of site-specific additions is better than zero.</>} />
          <CommonMistake title="Inverting the hierarchy of control" whatHappens={<>Supervisor decides &quot;just give them masks&quot; for silica work without considering on-tool extraction or water suppression. COSHH inspector finds the hierarchy was inverted. Reg 7 breach; FFI; remedial PPE-plus-engineering-controls plan demanded.</>} doInstead={<>Always work down the hierarchy: eliminate first, PPE last. Document why each higher-level control was rejected if you reach PPE — that&apos;s the evidence the hierarchy was considered.</>} />

          <Scenario title="Reviewing a RAMS that doesn't match the site" situation={<>You arrive at a 1980s school for a small lighting upgrade. The RAMS says "single-storey building, no asbestos register required, occupied premises but work in school holidays". Walking the site you find: (1) the building is two-storey with the ground floor being old kitchens you\'ll need to traverse; (2) the asbestos register IS available and shows AIB lining in the ceiling void where you need to run cable; (3) it\'s term-time and there are children in the building because the school runs an inset day. The supervisor isn\'t on site.</>} whatToDo={<>Stop. The RAMS no longer fits — three significant divergences. Apply the L3 supervisor decision: (1) AIB asbestos in the cable route is a CAR 2012 issue requiring a re-think of the route or a licensed asbestos contractor to handle the disturbance; the existing RAMS doesn&apos;t cover it. (2) Two-storey building changes access requirements, possibly working-at-height equipment. (3) Children present changes the s.3 risk profile and the PEEP / safeguarding considerations. Phone supervisor / contracts manager immediately; explain divergences; request fresh RAMS. Don&apos;t proceed with the work today on the existing RAMS. Document the conversation in writing (text + follow-up email). Brief the school&apos;s responsible person on the situation. The lighting upgrade can wait; an asbestos disturbance with children in the building cannot.</>} whyItMatters={<>The L3 supervisor judgement on RAMS adequacy is what stops bad work happening. The original RAMS wasn&apos;t maliciously wrong — the surveyor probably didn&apos;t have the asbestos register or visit during term-time — but it&apos;s no longer suitable. Pushing on regardless would be a Reg 3 / CAR 2012 / s.3 cascade. Refusing to proceed and escalating IS the right answer; ERA s.44 protects you.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — RAMS is static plan + dynamic walk-round. At L3 you also REVIEW the static and decide when it no longer fits.",
            "MHSWR Reg 3 — suitable and sufficient assessment, recording mandatory at 5+ employees.",
            "5-step framework: identify, who-harmed, evaluate, record, review. Each step needs evidence.",
            "Hierarchy of control: Eliminate → Substitute → Engineer → Administer → PPE. PPE is LAST.",
            "ALARP / SFAIRP — Edwards v NCB. Reverse burden of proof; paperwork is the defence.",
            "Reg 5 POCMR cycle — risk assessment is one part; running the cycle is what discharges the duty.",
            "Dynamic assessment supplements static; doesn\'t replace it. L3 signs off the dynamic version.",
            "When divergence from RAMS is significant, escalate for a fresh RAMS — don\'t \'manage on the fly\'.",
          ]} />
          <Quiz title="Risk assessment as a supervisor — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Back</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 3 — Landing</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.2 PPE hierarchy of control</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
