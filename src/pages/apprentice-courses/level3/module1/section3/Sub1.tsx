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
  { id: 'l3-m1-s3-sub1-static-vs-dynamic', question: 'You arrive at site with a 3-week-old RAMS and the conditions are clearly different. What\'s the L3 supervisor call?', options: [
    'Proceed exactly as the RAMS says — it was signed off by a competent person, so following it cannot be wrong.',
    'Carry on with the work but make a mental note of the differences in case anyone asks afterwards.',
    'Down tools and send the team home until a brand-new RAMS is issued, whatever the scale of the change.',
    'Stop, dynamically re-assess the new hazards to supplement the RAMS, and escalate for a fresh RAMS if conditions differ wildly.',
  ], correctIndex: 3, explanation: 'The RAMS is the baseline; it can\'t cover what\'s changed since the survey. Walk the site, write a dynamic risk assessment supplementing the RAMS, and decide whether work can safely proceed. Where conditions are wildly different, escalate for a fresh RAMS rather than manage on the fly. Dynamic assessment supplements static; the L3 add is judging when dynamic isn\'t enough. Document the decision either way.' },
  { id: 'l3-m1-s3-sub1-hierarchy', question: 'Apply the hierarchy of control to "drilling silica-bearing masonry":', options: [
    'Issue an FFP3 mask to the operative and proceed — the dust mask is the simplest and most effective single control.',
    'Open the windows for ventilation and sweep up the dust regularly throughout the task.',
    'Eliminate or substitute first, then on-tool extraction and water suppression, with the FFP3 mask only as the last layer.',
    'Damp down the masonry first, then drill quickly to minimise the time spent generating dust.',
  ], correctIndex: 2, explanation: 'Work the full hierarchy: (1) Eliminate — avoid the chase (surface mount)? (2) Substitute — different fixing? (3) Engineer — on-tool extraction with M-class vacuum, water suppression. (4) Administrative — limit duration, restrict access. (5) PPE — FFP3 mask LAST. Mask-only on routine silica is rarely defensible under COSHH Reg 7. The L3 judgement is on the hierarchy ABOVE PPE, not just the PPE selection.' },
  { id: 'l3-m1-s3-sub1-five-steps', question: 'What\'s HSE\'s "five steps to risk assessment"?', options: [
    'Plan, Do, Check, Act, Review — the continuous-improvement loop applied to safety management.',
    'Identify hazards, decide who might be harmed and how, evaluate risks and precautions, record and implement, then review.',
    'Eliminate, Substitute, Engineer, Administrate, PPE — the hierarchy of control applied as a five-step sequence.',
    'Isolate, lock off, prove dead, earth where needed, sign the permit — the safe-isolation procedure.',
  ], correctIndex: 1, explanation: 'The HSE INDG163 five steps — identify hazards; decide who might be harmed and how; evaluate risks and decide on precautions; record the significant findings and implement them; review and update — are the practical structure for a "suitable and sufficient" assessment under MHSWR Reg 3. Each step needs evidence on the assessment record.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal source of the risk-assessment duty?', options: [
    'RIDDOR 2013, which requires employers to assess and report specified workplace injuries and dangerous occurrences.',
    'MHSWR 1999 Reg 3, which requires a "suitable and sufficient" assessment of risks to employees and others affected.',
    'HASAWA 1974 Section 6, which places the duty on manufacturers and suppliers of articles for use at work.',
    'BS 7671, which requires a documented risk assessment before any electrical installation work is carried out.',
  ], correctAnswer: 1, explanation: 'MHSWR Reg 3 is the statutory hook — every employer or self-employed person makes a suitable-and-sufficient assessment of risks to employees and to non-employees affected, with recording mandatory at 5+ employees. This is where RAMS lives.' },
  { id: 2, question: 'What\'s the difference between a Risk Assessment and a Method Statement?', options: [
    'A Risk Assessment is written by the client and a Method Statement by the contractor; otherwise they are identical documents.',
    'A Risk Assessment is a legal requirement but a Method Statement is purely voluntary and rarely produced.',
    'A Risk Assessment identifies hazards and controls; a Method Statement sets out the safe sequence of work, people and equipment.',
    'A Risk Assessment covers the whole project while a Method Statement covers only the electrical elements of it.',
  ], correctAnswer: 2, explanation: 'RA tells you WHAT the risks are; MS tells you HOW to do the work safely (sequence, people, equipment, controls in operation). Together they form the combined RAMS document — two complementary perspectives on the same job.' },
  { id: 3, question: 'What does "dynamic risk assessment" mean?', options: [
    'A risk assessment carried out by a software tool that automatically updates as site data changes.',
    'A risk assessment that only covers fast-moving or rapidly-changing machinery on site.',
    'A risk assessment that is reviewed and re-signed every hour during the working day.',
    'A real-time assessment of the actual conditions found on arrival, by the operative(s) doing the work.',
  ], correctAnswer: 3, explanation: 'Dynamic = real-time, on the day, in the rooms. It catches what the static RAMS couldn\'t have known. MHSWR Reg 3 expects a current assessment; the dynamic version is the gap-closing mechanism. The static RAMS doesn\'t replace it, and it doesn\'t replace the RAMS.' },
  { id: 4, question: 'What is the correct order of the hierarchy of control?', options: [
    'Eliminate → Substitute → Engineering controls → Administrative controls → PPE, with PPE the last line.',
    'PPE → Administrative controls → Engineering controls → Substitute → Eliminate, working up from the cheapest control first.',
    'Engineering controls → PPE → Substitute → Eliminate → Administrative controls, in order of how quickly each can be applied.',
    'Eliminate → PPE → Engineering controls → Substitute → Administrative controls, prioritising worker-worn protection early.',
  ], correctAnswer: 0, explanation: 'Eliminate, then substitute, engineer, administer, and PPE LAST. The hierarchy applies across H&S regs (COSHH Reg 7, MHSWR ACOP, HSG48). The L3 supervisor value-add is judgement on the hierarchy above PPE.' },
  { id: 5, question: 'What does "as low as reasonably practicable" (ALARP) mean?', options: [
    'Risk reduced to whatever level can be achieved at the lowest possible cost to the employer.',
    'Risk reduced until the cost of further reduction becomes grossly disproportionate to the residual risk.',
    'Risk reduced to exactly zero, because any residual risk is unacceptable in law.',
    'Risk reduced only as far as the workforce are personally willing to accept it.',
  ], correctAnswer: 1, explanation: 'Cost here means money, time and trouble. ALARP is the SFAIRP-equivalent established in Edwards v NCB [1949], with the dutyholder bearing the burden of proof. Reducing risk to zero is rarely required; reducing it to ALARP / SFAIRP is the legal standard.' },
  { id: 6, question: 'Who can write a method statement?', options: [
    'Only an external health and safety consultant accredited by the HSE.',
    'Any operative on site, regardless of their training or experience.',
    'A competent person — typically the supervisor, contracts manager or technical lead.',
    'Only the client or building owner, since it is their premises being worked on.',
  ], correctAnswer: 2, explanation: 'Competence is required. At L3 you may contribute to the MS or write a short one for a small job, but the formal MS is normally the supervisor\'s document and the RAMS is signed off by a designated competent person; full sign-off responsibility usually sits with a more senior person.' },
  { id: 7, question: 'What\'s "POCMR" in MHSWR Reg 5?', options: [
    'Prepare, Operate, Calibrate, Measure, Record — the test-instrument procedure for inspection and testing.',
    'Protect, Observe, Communicate, Manage, Report — the supervisor\'s daily site-safety routine.',
    'Permit, Open, Check, Make-safe, Re-energise — the steps of a safe isolation permit.',
    'Plan, Organise, Control, Monitor, Review — the management cycle that runs the preventive measures.',
  ], correctAnswer: 3, explanation: 'Reg 5 requires effective arrangements for the planning, organisation, control, monitoring and review of the preventive and protective measures. Risk assessment is one part; running the POCMR cycle is what Reg 5 demands over time.' },
  { id: 8, question: 'When should a RAMS be reviewed?', options: [
    'When conditions change, after a near-miss, when equipment, operatives or regulations change, and periodically.',
    'Only once, at the start of the project, since the document is fixed thereafter.',
    'Only when the HSE serves an improvement notice requiring it to be revised.',
    'Only at the end of the project as part of the handover documentation pack.',
  ], correctAnswer: 0, explanation: 'Review is continuous — change-driven (new conditions, near-miss or incident, new equipment/substances, new operatives, regulation changes) and periodic (typically annually as a baseline). MHSWR Reg 3 requires the assessment to remain current.' },
];

const faqs = [
  { question: 'Can a generic RAMS be used for similar jobs?', answer: 'A generic RAMS is fine as a starting point but must be customised for each site. "Suitable and sufficient" requires engagement with the specific hazards on this job. A pure copy-paste RAMS fails the test.' },
  { question: 'How long should a dynamic risk assessment be?', answer: 'Brief — a job-pack note, a short form, a few sentences. Five minutes of writing for ten minutes of walking. Quality of thinking matters more than length of writing.' },
  { question: 'Who keeps the dynamic assessment record?', answer: 'Operative\'s job pack, photographed back to the firm\'s system, retained with the job records. After an incident the inspector will ask for it; contemporaneous notebook entries are gold.' },
  { question: 'What if the customer refuses to sign the RAMS?', answer: 'They don\'t have to sign — RAMS is the firm\'s document. They should be briefed on relevant parts (welfare, exclusion zones, emergency plan). If they obstruct work, document and escalate.' },
  { question: 'How is RAMS different from a CDM Construction Phase Plan?', answer: 'CPP is the project-level plan required by CDM 2015 Reg 12 / 16. RAMS is task-level and may be referenced by the CPP. On a single-contractor project the CPP can be very brief (HSE CIS80 template).' },
  { question: 'What\'s the L3 add over L2 risk assessment?', answer: 'L2 followed RAMS. L3 reviews them, signs off the dynamic version, decides when they don\'t fit, escalates for fresh ones. The judgement on when the assessment is "suitable and sufficient" is the L3 step.' },
  { question: 'How are risk assessments communicated to operatives who weren&apos;t at the survey?', answer: 'MHSWR Reg 10 requires the employer to provide comprehensible information to employees on the risks identified by the assessment and the preventive and protective measures. In practice this is a pre-start briefing (toolbox talk style), the operative signing the RAMS to confirm they have received it, and the supervisor checking understanding. Reg 13 layers in training where the work requires specific competence.' },
  { question: 'What records does a Reg 7 competent person actually keep on the assessment side?', answer: 'A register of risk assessments (which activity, which version, when reviewed, who signed), a list of significant findings cross-referenced to the firm&apos;s control measures, a near-miss / incident review log feeding the periodic review, and a training matrix linking competence to roles. The Reg 7 person doesn&apos;t write every RAMS but oversees the system.' },
  { question: 'Is the dynamic assessment legally required or just good practice?', answer: 'MHSWR Reg 3 expects assessments to be &apos;current&apos; — i.e. reflect the actual situation in which the work is done. The dynamic assessment is the operational mechanism by which that currency is maintained on the day. Without it, the static RAMS becomes outdated the moment site conditions diverge. Inspectors expect to see evidence of dynamic assessment in some recorded form (job-pack note, briefing record, digital app entry).' },
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
            "MHSWR Reg 4 + Schedule 1 — the nine principles of prevention sit underneath the hierarchy and form the structured audit framework a court will use.",
            "Reverse burden under HASAWA s.40 — once the prosecution shows the risk existed, the dutyholder must prove they did everything reasonably practicable. Paperwork is the defence.",
            "Reg 5 POCMR cycle — Plan, Organise, Control, Monitor, Review. Risk assessment is one part; running the cycle is what discharges the duty over time.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the procedure for producing risk assessments and method statements at L3 — review, supplement, escalate.",
            "Apply HSE's 5-step framework: identify, who-might-be-harmed, evaluate, record, review.",
            "Apply the hierarchy of control (Eliminate / Substitute / Engineer / Administer / PPE) to a typical electrical job.",
            "Distinguish static RAMS from dynamic risk assessment and the role of each.",
            "State the ALARP / SFAIRP standard and the reverse burden of proof under Edwards v NCB.",
            "Recognise the L3 step from RAMS-following (L2) to RAMS-reviewing and dynamic sign-off.",
            "Identify the MHSWR Reg 4 + Schedule 1 nine principles of prevention as the audit framework underneath the hierarchy.",
            "Locate the risk assessment within the HSG65 Plan-Do-Check-Act management system cycle.",
            "Distinguish the HASAWA s.2(3) safety policy from the MHSWR Reg 3(6) significant findings record.",
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

          <RegsCallout source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1)" clause={<>"Every employer shall make a suitable and sufficient assessment of — (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking."</>} meaning={<>The risk assessment duty. Suitable and sufficient is the legal test. 5+ employees = recording mandatory (Reg 3(6)).</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3." />

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
          <ConceptBlock
            title="A worked 5-step example — replacing a domestic CU"
            plainEnglish="The five steps are easier to remember when you&apos;ve walked through a worked example. Take a typical L3 task: replacing a domestic consumer unit on an occupied property. Run each step against the task and you get a complete suitable-and-sufficient assessment."
            onSite="When writing or reviewing a RAMS, mentally run the 5 steps in the same order. If any step is empty or trivial, the assessment is incomplete."
          >
            <p>Step-by-step worked example — CU change on an occupied flat:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Hazards identified</strong> — electrical (live working hazard during isolation,
                inadvertent re-energisation, possible TT system without RCDs upstream), manual handling
                (CU weight + access), dust (CU surround often plaster), working at height (CU mounting
                position), tools (drilling fixings), customer environment (children / pets / vulnerable
                household members), waste (old CU contains polymers and Pb-Sn solder).
              </li>
              <li>
                <strong>2. Who might be harmed and how</strong> — operative (electric shock, manual
                handling injury, cuts, dust inhalation, falls), customer (loss of supply with vulnerable
                medical equipment at risk, exposure to dust, exposure to tools and trip hazards),
                children / pets (work area exposure, inquisitive access), neighbours (rare but live
                conductors exposed in shared cupboards).
              </li>
              <li>
                <strong>3. Evaluate the risks and decide on precautions</strong> — electric shock risk
                evaluated as MEDIUM (controllable by safe isolation), MITIGATED via prove-test-prove and
                lock-off. Manual handling risk LOW with two-person lift; trip hazards LOW with tidy work
                area; vulnerable customer risk MEDIUM, mitigated by prior survey, customer briefing and
                pre-arranged supply restoration window.
              </li>
              <li>
                <strong>4. Record the significant findings</strong> — written RAMS retained, sign-on
                /sign-off by operatives, photo evidence of pre-work state, schedule of inspections /
                tests.
              </li>
              <li>
                <strong>5. Review and update</strong> — dynamic re-assessment on arrival (was the
                survey accurate? has the customer&apos;s circumstance changed? unforeseen hazard?);
                debrief after the work; any near miss fed into the firm&apos;s register; full RAMS
                review on changes to the standard work pack.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reasonably practicable in practice — Edwards v NCB unpacked"
            plainEnglish="Edwards v National Coal Board [1949] 1 KB 704 is the foundational case on &apos;reasonably practicable&apos;. Asquith LJ said: &apos;Reasonably practicable&apos; is a narrower term than &apos;physically possible&apos; and implies that a computation must be made in which the quantum of risk is placed in one scale and the sacrifice involved in the measures necessary for averting the risk (whether in money, time or trouble) is placed in the other; and that if it be shown that there is a gross disproportion between them — the risk being insignificant in relation to the sacrifice — the defendants discharge the onus on them. This judgement is the practical engine of every SFAIRP / ALARP decision UK courts make."
            onSite="The L3 reading: the test is gross disproportion, not equal balance. The dutyholder doesn&apos;t have to spend the last marginal pound to eliminate the last unit of residual risk; they have to spend until the cost of the next control would be grossly disproportionate to the risk it would remove. The case framework is what makes &apos;we did everything reasonable&apos; a defendable position; what it doesn&apos;t support is &apos;we did what was cheap.&apos;"
          >
            <p>How a court / inspector tests SFAIRP using the Edwards framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What was the risk?</strong> — likelihood × severity, taking into account who
                was exposed and for how long.
              </li>
              <li>
                <strong>What did the dutyholder do?</strong> — controls actually in place at the time,
                evidenced by RAMS, training records, supervision records, equipment maintenance logs.
              </li>
              <li>
                <strong>What else could the dutyholder have done?</strong> — controls that were
                available, reasonable, in industry use, recognised in HSE guidance.
              </li>
              <li>
                <strong>What would those additional controls have cost?</strong> — money, time,
                disruption, operational impact.
              </li>
              <li>
                <strong>Is there gross disproportion?</strong> — comparing the residual risk that
                would have been removed against the cost of the additional controls.
              </li>
              <li>
                <strong>If yes</strong> — SFAIRP discharged; defence sustained.
              </li>
              <li>
                <strong>If no</strong> — SFAIRP not discharged; the dutyholder should have done more.
              </li>
              <li>
                <strong>The burden of proof</strong> — under HASAWA s.40, the dutyholder must prove
                they did everything SFAIRP. The prosecution doesn&apos;t prove they didn&apos;t; the
                dutyholder proves they did.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Static RAMS sets the plan; dynamic assessment confirms or amends it" plainEnglish="Static RAMS = the written plan in advance, after a survey, in an office. Dynamic assessment = the walk-round on the day, by the operative, in real time. Static sets strategy; dynamic confirms strategy still fits. Both required by MHSWR Reg 3 in practice." onSite="L3 add: the supervisor signs off the dynamic and decides when conditions are too far off the RAMS to proceed without a fresh one. Document the decision either way.">
            <p>When dynamic isn't enough — fresh RAMS needed:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conditions wildly different from those described in RAMS.</li>
              <li>New hazards present that aren&apos;t covered (asbestos suspicion, structural concerns).</li>
              <li>Different operatives required (competence mismatch).</li>
              <li>Different work scope requested by customer (scope creep).</li>
              <li>Significant change in occupancy / vulnerable persons present.</li>
              <li>Equipment or substance change.</li>
              <li>Weather / environmental change that affects access or safe-isolation.</li>
              <li>Emergency arrangements (first aider, emergency contact, fire exit) materially different.</li>
              <li>Pattern of near-misses on similar work suggests systemic re-think needed.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 5(1)" clause={<>"Every employer shall make and give effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures."</>} meaning={<>Reg 5 — the management system. Risk assessment is just one part; the POCMR cycle is what turns it into ongoing protection.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 5." />

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

          <ConceptBlock title="Risk matrix — likelihood × severity in practice" plainEnglish="Most firms use a 3x3 or 5x5 matrix. Likelihood scale (rare to almost certain) on one axis; severity scale (minor to catastrophic) on the other. Score = product. Matrix categorises (low / medium / high / very high) and triggers the level of control required. Some firms further weight by population at risk (one operative vs many) or by reversibility of harm (recoverable vs permanent / fatal)." onSite="The matrix isn&apos;t mathematical precision — it&apos;s structured judgement. Two assessors looking at the same hazard should land within 1-2 score points. Wide divergence means the assessment isn&apos;t calibrated. Periodic calibration exercises (the H&amp;S manager runs the same scenario past several supervisors and compares scores) maintain inter-rater consistency.">
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

          <RegsCallout source="HASAWA 1974 — s.40 (Reverse burden of proof)" clause={<>"In any proceedings for an offence under any of the relevant statutory provisions consisting of a failure to comply with a duty or requirement to do something so far as is practicable or so far as is reasonably practicable, or to use the best practicable means to do something, it shall be for the accused to prove (as the case may be) that it was not practicable or not reasonably practicable to do more than was in fact done to satisfy the duty or requirement, or that there was no better practicable means than was in fact used to satisfy the duty or requirement."</>} meaning={<>s.40 is the statutory expression of the reverse burden. Once the prosecution shows the risk existed, the defendant proves SFAIRP was met. The paperwork (RAMS, training, supervision records) is the proof.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.40." />

          <SectionRule />
          <ContentEyebrow>Common mistakes</ContentEyebrow>
          <CommonMistake title="Generic \'standard electrical install' RAMS" whatHappens={<>Firm uses identical generic RAMS for every job; HSE inspector reviews after near-miss; finds RAMS doesn&apos;t engage with site-specific hazards. &quot;Suitable and sufficient&quot; test fails. Reg 3 breach noted; FFI invoiced; firm reputation damaged.</>} doInstead={<>Generic templates are fine as starting points. Customise to site every time — even two minutes of site-specific additions is better than zero.</>} />
          <CommonMistake title="Inverting the hierarchy of control" whatHappens={<>Supervisor decides &quot;just give them masks&quot; for silica work without considering on-tool extraction or water suppression. COSHH inspector finds the hierarchy was inverted. Reg 7 breach; FFI; remedial PPE-plus-engineering-controls plan demanded.</>} doInstead={<>Always work down the hierarchy: eliminate first, PPE last. Document why each higher-level control was rejected if you reach PPE — that&apos;s the evidence the hierarchy was considered.</>} />

          <Scenario
            title="The unexpected vulnerable household member"
            situation={
              <>
                You arrive at a domestic CU change. The survey RAMS describes a healthy adult
                customer and a small dog. On arrival the customer&apos;s 89-year-old mother is also
                in the property — she has dementia, uses a stairlift powered from a circuit on the
                existing CU, and is currently in the lounge watching television. The existing CU is
                a TT install with no upstream RCD; isolation will be via the cut-out fuse on a
                supply with no service-position fuse cap. The L2 mate is loading the van.
              </>
            }
            whatToDo={
              <>
                Stop the start of work. The dynamic risk assessment has just found three
                significant changes from the static RAMS: (1) an additional vulnerable household
                member with a medical-relevant electrical dependency (the stairlift); (2) cognitive
                impairment that may affect ability to follow safety instructions; (3) presence of an
                additional non-employee changing the s.3 risk profile. Phone the supervisor;
                explain; agree a plan. Options include: rescheduling for a day when the mother is
                at the day-care centre; arranging temporary alternative supply for the stairlift
                from another circuit before isolation; bringing in a third operative to ensure
                continuous customer supervision while works proceed. Brief the customer on the plan
                in writing; ensure the elderly mother is aware in language she can engage with;
                document the decision and the controls. Do not proceed on the original RAMS.
              </>
            }
            whyItMatters={
              <>
                The L3 dynamic risk assessment is the gate that catches what the static RAMS
                couldn&apos;t have known. The original RAMS wasn&apos;t wrong; it was incomplete.
                Pushing on with the original plan would have created a stairlift outage with no
                alternative for a person who couldn&apos;t communicate distress effectively, an
                s.3 duty failure, a safeguarding gap. The five-minute pause, the supervisor call,
                the documented decision and the revised plan all sit inside MHSWR Reg 3 and Reg
                14. This is the kind of decision the L3 supervisor is expected to make
                autonomously.
              </>
            }
          />

          <Scenario title="Reviewing a RAMS that doesn't match the site" situation={<>You arrive at a 1980s school for a small lighting upgrade. The RAMS says "single-storey building, no asbestos register required, occupied premises but work in school holidays". Walking the site you find: (1) the building is two-storey with the ground floor being old kitchens you\'ll need to traverse; (2) the asbestos register IS available and shows AIB lining in the ceiling void where you need to run cable; (3) it\'s term-time and there are children in the building because the school runs an inset day. The supervisor isn\'t on site.</>} whatToDo={<>Stop. The RAMS no longer fits — three significant divergences. Apply the L3 supervisor decision: (1) AIB asbestos in the cable route is a CAR 2012 issue requiring a re-think of the route or a licensed asbestos contractor to handle the disturbance; the existing RAMS doesn&apos;t cover it. (2) Two-storey building changes access requirements, possibly working-at-height equipment. (3) Children present changes the s.3 risk profile and the PEEP / safeguarding considerations. Phone supervisor / contracts manager immediately; explain divergences; request fresh RAMS. Don&apos;t proceed with the work today on the existing RAMS. Document the conversation in writing (text + follow-up email). Brief the school&apos;s responsible person on the situation. The lighting upgrade can wait; an asbestos disturbance with children in the building cannot.</>} whyItMatters={<>The L3 supervisor judgement on RAMS adequacy is what stops bad work happening. The original RAMS wasn&apos;t maliciously wrong — the surveyor probably didn&apos;t have the asbestos register or visit during term-time — but it&apos;s no longer suitable. Pushing on regardless would be a Reg 3 / CAR 2012 / s.3 cascade. Refusing to proceed and escalating IS the right answer; ERA s.44 protects you.</>} />

          <SectionRule />
          <ContentEyebrow>Reg 3(6) — recording and the &quot;5+ employees&quot; threshold</ContentEyebrow>

          <ConceptBlock
            title="Why the recording duty triggers at five and why your firm almost certainly crosses it"
            plainEnglish="MHSWR Reg 3(6) requires the significant findings of the risk assessment to be recorded where the employer has five or more employees. Below five, the duty to assess is the same but the recording can be verbal. In practice almost every electrical contracting firm crosses the five-employee threshold once apprentices, admin staff and labour-only operatives are counted. The recording duty is not just bureaucracy — it is the evidence under HASAWA s.40 reverse burden that the assessment was actually done."
            onSite="The L3 supervisor reading: if the firm has 5+ employees, you should expect to see a written RAMS for every significant task. If you don&apos;t, that&apos;s a Reg 3(6) gap. Raise it in writing. The firm&apos;s s.40 defence (when it eventually faces an inspector after an incident) rests on the existence and quality of the written record."
          >
            <p>What the recorded assessment should contain (per HSE INDG163 and ACOP):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The significant hazards</strong> — not trivia; the ones that could
                cause real harm given the activity.
              </li>
              <li>
                <strong>Who might be harmed and how</strong> — employees, contractors, public,
                vulnerable persons; the route of exposure.
              </li>
              <li>
                <strong>Existing control measures</strong> — what&apos;s already in place that
                reduces the risk.
              </li>
              <li>
                <strong>Residual risk evaluation</strong> — what risk remains after existing
                controls; likelihood and severity.
              </li>
              <li>
                <strong>Further action required</strong> — concrete additional controls with
                a named owner and timescale.
              </li>
              <li>
                <strong>Sign-off</strong> — by a competent person; dated; identifying the
                assessor.
              </li>
              <li>
                <strong>Review trigger</strong> — circumstances that would prompt review
                (change of work, near miss, periodic).
              </li>
              <li>
                <strong>Communication record</strong> — how the assessment was briefed to
                the operatives doing the work.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3(6)"
            clause={
              <>
                &quot;Where the employer employs five or more employees, he shall record — (a) the
                significant findings of the assessment; and (b) any group of his employees
                identified by it as being especially at risk.&quot;
              </>
            }
            meaning={
              <>
                The recording threshold. The duty to ASSESS applies to all employers
                regardless of size; the duty to RECORD applies once five employees are
                reached. In practice almost every electrical contracting firm crosses the
                threshold. The record is the evidence under HASAWA s.40 reverse burden that
                the assessment exists; without it, defending a SFAIRP allegation becomes
                much harder.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3."
          />

          <SectionRule />
          <ContentEyebrow>The principles of prevention — MHSWR Schedule 1</ContentEyebrow>

          <ConceptBlock
            title="The nine principles that sit underneath the hierarchy of control"
            plainEnglish="MHSWR Reg 4 requires preventive and protective measures to be implemented on the basis of the principles in Schedule 1. The Schedule lists nine principles that sit beneath the more familiar hierarchy of control. Together they form the structured framework a court will use to test whether a firm&apos;s controls were chosen rationally or thrown together."
            onSite="The L3 supervisor reading a RAMS asks not just &apos;are the controls listed?&apos; but &apos;were they chosen using the principles?&apos;. A RAMS that puts FFP3 masks first without considering avoidance, substitution or engineering controls has failed Principle (a) and (c) before the operative gets to site. The principles are the audit framework."
          >
            <p>MHSWR 1999 Schedule 1 — General principles of prevention:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Avoiding risks</strong>.
              </li>
              <li>
                <strong>(b) Evaluating the risks which cannot be avoided</strong>.
              </li>
              <li>
                <strong>(c) Combating the risks at source</strong>.
              </li>
              <li>
                <strong>(d) Adapting the work to the individual</strong> — design of
                workplaces, choice of equipment, working methods.
              </li>
              <li>
                <strong>(e) Adapting to technical progress</strong> — using newer, safer
                methods as they become available.
              </li>
              <li>
                <strong>(f) Replacing the dangerous by the non-dangerous or the less
                dangerous</strong>.
              </li>
              <li>
                <strong>(g) Developing a coherent overall prevention policy</strong>.
              </li>
              <li>
                <strong>(h) Giving collective protective measures priority over
                individual</strong> — engineering controls before PPE.
              </li>
              <li>
                <strong>(i) Giving appropriate instructions to employees</strong>.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="L3 reviewing a contractor-supplied RAMS that doesn&apos;t pass the test"
            situation={
              <>
                Your firm has been engaged as a sub-contractor on a refurbishment project led
                by a principal contractor. The principal contractor has issued a RAMS for the
                electrical works for your operatives to sign and proceed. On reading the
                document you find: (1) the site address is wrong (refers to a different
                project of theirs); (2) the operative names are blank; (3) the welfare
                arrangements section says &quot;as per main project welfare&quot; with no
                detail; (4) the asbestos register is referenced but not attached; (5) the
                emergency arrangements specify a first-aider name who you know left the
                principal contractor six months ago. The principal contractor&apos;s site
                manager has pushed the document to your supervisor with &quot;just sign it,
                we need to get going by 8am tomorrow&quot;.
              </>
            }
            whatToDo={
              <>
                Refuse to sign and proceed without resolution. The RAMS as presented is not
                suitable and sufficient under MHSWR Reg 3 — every single observed defect
                indicates a failure of engagement with the specific job. Phone your supervisor
                and the principal contractor&apos;s site manager. Itemise the defects in
                writing (text or email same day). Request: corrected site address, named
                operatives, specific welfare arrangements, attached asbestos register,
                current first-aider name. Note that proceeding on the document as written
                would expose both firms to s.2 / s.3 / Reg 3 breach, and the individual
                operatives to s.7. ERA s.44 protects you for the refusal. Document the
                interaction.
              </>
            }
            whyItMatters={
              <>
                Principal contractors sometimes use generic RAMS as commercial speed-up tools,
                expecting sub-contractors to sign and proceed. The HSE&apos;s view (informed
                by cases like Cape Industrial Services) is unambiguous: the RAMS must engage
                with the specific job. Sub-contractor operatives signing a manifestly
                defective document do not transfer the risk to the principal contractor;
                they add themselves to the duty list. The L3 supervisor reflex protects both
                firms by forcing the document to be corrected before work starts.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Case study — R v Cape Industrial Services [2017] and the limits of generic RAMS</ContentEyebrow>

          <ConceptBlock
            title="A £600k fine for a copy-paste risk assessment"
            plainEnglish="Cape Industrial Services was fined £600,000 at Liverpool Crown Court in 2017 after a maintenance worker was seriously injured when a section of cladding fell from a height during demolition work at a Cheshire chemical site. The HSE&apos;s investigation found that the firm&apos;s risk assessment for the work was a generic template that had been used for similar jobs across the firm&apos;s portfolio. It had not been customised to the specific structure, the specific condition of the cladding, or the specific access constraints on the site. The court was told the firm&apos;s competent persons had not visited the site before signing off the RAMS. The Sentencing Council guideline placed the breach in the &apos;high culpability&apos; band partly because the failure to customise was systemic across the firm&apos;s operations, not a one-off oversight."
            onSite="The L3 reading: a generic RAMS used as-is for a specific site is not a &apos;suitable and sufficient&apos; assessment under MHSWR Reg 3. The test is engagement with the actual hazards on this site, on this date, with these operatives. Two-minute customisation (site address, specific operatives, specific access constraints, specific hazards observed during the survey) is the absolute minimum. If you find yourself reading a RAMS that could have been written for any job of this type at any time in the last five years, the assessment is failing the test."
          >
            <p>What &apos;customised&apos; means in practice — Cape and similar cases:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site-specific identifiers</strong> — full address, building name,
                room / area, date of survey, surveyor name.
              </li>
              <li>
                <strong>Site-specific hazards</strong> — what was actually observed during
                the survey, not what is typically present for jobs of this type.
              </li>
              <li>
                <strong>Site-specific controls</strong> — what will be done on THIS site,
                with THIS access, with THESE operatives. Not what is typically done.
              </li>
              <li>
                <strong>Site-specific population</strong> — who is on or near the site,
                including non-employees, vulnerable persons, other trades.
              </li>
              <li>
                <strong>Site-specific emergency arrangements</strong> — where is the
                nearest A&amp;E? Who is the first aider? Where is the fire exit?
              </li>
              <li>
                <strong>Site-specific welfare</strong> — toilets, washing, breaks, weather
                shelter at THIS site.
              </li>
              <li>
                <strong>Site-specific waste</strong> — disposal route for the materials
                generated by THIS work at THIS site.
              </li>
              <li>
                <strong>Survey evidence</strong> — survey photos attached or referenced;
                surveyor signature; date.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Step-by-step procedure — running the 5 steps on an EICR survey</ContentEyebrow>

          <ConceptBlock
            title="The 5-step framework applied to a small commercial EICR"
            plainEnglish="The 5-step framework is easier to remember when you run it through a concrete worked example. Take a typical L3 task: an EICR survey on a small commercial unit (retail or office, ~100m², single-phase + three-phase distribution, 30-year-old installation). Walk each step against the task and you get a complete &apos;suitable and sufficient&apos; assessment that would defend any inspector challenge."
            onSite="The procedure is the same as for any other task — only the specifics change. The L3 supervisor running an EICR follows the same five steps that would apply to a CU change, a fault-find, a small install or a domestic safety inspection. The framework is the universal one; the content is task-specific."
          >
            <p>Step-by-step worked example — EICR survey on small commercial unit:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify hazards</strong> — electrical (live working, inadvertent
                re-energisation, faulty isolators, missing labels), manual handling
                (covers, panels, fault-finding equipment), working at height (high-level
                circuits, ceiling void access), dust (older premises, drilling for sample
                exposures), customer environment (occupied premises during business hours,
                public access).
              </li>
              <li>
                <strong>Who might be harmed and how</strong> — operative (electric shock,
                manual handling injury, falls, dust exposure), customer / staff (loss of
                supply during isolations, exposure to open panels and exposed conductors,
                trip hazards from test leads), public / visitors (where premises are
                customer-facing, exclusion arrangements needed).
              </li>
              <li>
                <strong>Evaluate the risks and decide on precautions</strong> — electric
                shock risk MEDIUM (controllable by safe isolation per circuit, prove-test-prove,
                lock-off); loss-of-supply risk MEDIUM (mitigated by booking outside business
                hours, customer briefing, agreed restoration windows); fall risk LOW with
                use of approved access equipment; public exclusion MEDIUM (signage,
                barriers, escorted access).
              </li>
              <li>
                <strong>Record the significant findings</strong> — written RAMS with site
                address, survey date, surveyor name, operative names, key hazards and
                controls, emergency arrangements, signed and dated.
              </li>
              <li>
                <strong>Review and update</strong> — dynamic re-assessment on arrival (has
                the customer&apos;s situation changed? are there new occupants? is the
                premises configuration as surveyed?). Brief any change to the firm and
                document the dynamic assessment. Full RAMS review on changes to the
                standard EICR work pack or after near-misses on similar surveys.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>HSG65 — the HSE&apos;s management system framework</ContentEyebrow>

          <ConceptBlock
            title="The Plan-Do-Check-Act cycle that turns assessments into a system"
            plainEnglish="HSG65 (&apos;Managing for Health and Safety&apos;, third edition 2013) is the HSE&apos;s flagship guidance on running a health and safety management system. It replaced earlier &apos;POPMAR&apos; framework with a Plan-Do-Check-Act (PDCA) cycle. The framework is consistent with ISO 45001 (occupational health and safety management systems, 2018) which is increasingly required by PQQs. The risk assessment is the &apos;Plan&apos; phase; control measures are the &apos;Do&apos;; monitoring is the &apos;Check&apos;; review and improvement is the &apos;Act&apos;. The L3 supervisor sits inside this cycle."
            onSite="The L3 contribution to the PDCA cycle is concrete: contributing to risk assessment authoring or review (Plan); delivering toolbox talks and supervising compliance with controls (Do); spotting and recording near-misses and procedure failures (Check); feeding lessons back into RAMS updates and training (Act). A firm that runs the cycle visibly tends to have lower incident rates and lower fines after incidents. A firm that does paperwork without the cycle tends to find the paperwork doesn&apos;t protect them when needed."
          >
            <p>HSG65 Plan-Do-Check-Act unpacked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — policy, leadership commitment, risk profile, risk
                assessments, planning objectives.
              </li>
              <li>
                <strong>Do</strong> — implementing controls, training, communication,
                operational delivery.
              </li>
              <li>
                <strong>Check</strong> — proactive monitoring (inspections, audits,
                near-miss reports), reactive monitoring (incident investigation, RIDDOR).
              </li>
              <li>
                <strong>Act</strong> — review of performance, lessons-learned,
                continuous improvement, management review.
              </li>
              <li>
                <strong>Leadership and worker involvement</strong> — runs through every
                stage; not a one-off task.
              </li>
              <li>
                <strong>Risk profile</strong> — the firm&apos;s overall H&amp;S exposure
                map; inputs the RAMS prioritisation.
              </li>
              <li>
                <strong>Performance indicators</strong> — leading (near-miss rate,
                training completion) and lagging (RIDDOR rate, claims).
              </li>
              <li>
                <strong>External alignment</strong> — ISO 45001 certification, PQQ
                requirements, framework agreements.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference — MHSWR Reg 3 vs HASAWA s.2(3) safety policy</ContentEyebrow>

          <ConceptBlock
            title="The two parallel recording duties at the 5-employee threshold"
            plainEnglish="At the 5-employee threshold two parallel recording duties apply: MHSWR Reg 3(6) requires the significant findings of the risk assessment to be recorded, AND HASAWA s.2(3) requires the employer to prepare a written safety policy with general statement, organisation and arrangements. The two documents serve different purposes: the safety policy sets out HOW the firm manages safety generally; the risk assessments sets out WHAT controls apply to specific tasks. Both required; neither substitutes for the other. The L3 supervisor knows both exist and reads both."
            onSite="When starting at a new firm: ask for the safety policy AND the risk assessment library. The safety policy should name the responsible persons, the consultation arrangements, the training arrangements, the emergency procedures. The risk assessments should be task- or activity-specific. Gaps in either document are flags that the firm&apos;s management system is incomplete."
          >
            <p>The two recording duties compared:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HASAWA s.2(3) safety policy</strong> — strategic document about how
                safety is managed firm-wide. General statement of commitment;
                organisational responsibilities; arrangements (consultation, emergency,
                training, monitoring). Reviewed periodically.
              </li>
              <li>
                <strong>MHSWR Reg 3(6) significant findings record</strong> — operational
                document(s) about how specific risks are controlled. Site-specific or
                activity-specific. Customised to the actual hazards.
              </li>
              <li>
                <strong>Threshold</strong> — both trigger at 5+ employees; below 5 the
                duty to do exists but recording is not mandatory.
              </li>
              <li>
                <strong>Form</strong> — safety policy normally one document, dated and
                signed by the senior responsible person; risk assessments many documents
                spanning the firm&apos;s activities.
              </li>
              <li>
                <strong>Audience</strong> — safety policy provided to employees on
                induction; risk assessments briefed task-by-task before the work.
              </li>
              <li>
                <strong>Update trigger</strong> — safety policy on firm-wide change
                (restructure, new senior responsible person, regulatory change); risk
                assessment on change of conditions or after near-miss.
              </li>
              <li>
                <strong>Inspector check</strong> — both should be producible on request;
                gaps in either are noted.
              </li>
            </ul>
          </ConceptBlock>

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
            "Dynamic assessment supplements static; doesn't replace it. L3 signs off the dynamic version.",
            "When divergence from RAMS is significant, escalate for a fresh RAMS — don't 'manage on the fly'.",
            "Cape Industrial Services £600k (2017) — generic RAMS used as-is for a specific site failed the suitable-and-sufficient test.",
            "MHSWR Reg 4 + Schedule 1 nine principles of prevention — the audit framework underneath the hierarchy.",
            "HASAWA s.2(3) safety policy and MHSWR Reg 3(6) significant findings record — two parallel duties at the 5+ employee threshold.",
            "Reg 10 communication of risks + Reg 13 training — the RAMS must reach the operatives who do the work, not just sit on a shelf.",
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
