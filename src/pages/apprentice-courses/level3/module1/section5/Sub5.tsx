/**
 * Module 1 · Section 5 · Subsection 5 — Risk assessment AS A SUPERVISOR
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 — supervisor-level RA judgement
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk assessment as a supervisor | Level 3 Module 1.5.5 | Elec-Mate';
const DESCRIPTION = 'L3 supervisor RA judgement — beyond compliance, the suitable-and-sufficient test, dynamic-vs-static, escalation when RAMS no longer fits, contributing to firm RAMS process.';

const checks = [
  { id: 'l3-m1-s5-sub5-supervisor', question: 'What\'s the L3 supervisor add over L2 RA?', options: [
    'The ratio of useful heat output to electrical energy input — a COP of 3.0 means the heat pump delivers 3 kW of heat for every 1 kW of electricity consumed, by extracting additional energy from the air, ground or water source',
    'Under-tightened connections can overheat and cause fires; over-tightened connections can damage conductors and terminals — correct torque ensures safe, durable connections',
    'The construction phase plan should be developed using the pre-construction information as a key input, building on the hazard and risk information it contains to set out how the construction phase will be managed safely',
    'Reviewing the static RAMS, signing off the dynamic version, deciding when conditions diverge enough to need a fresh RAMS, contributing to writing RAMS for routine jobs, coaching L2 mates through assessment.',
  ], correctIndex: 3, explanation: 'L3 = reviewer / signer / decider / contributor / coach. L2 = follower.' },
  { id: 'l3-m1-s5-sub5-suitable', question: 'How is "suitable and sufficient" judged?', options: [
    'By reference to the actual hazards present, the controls implemented, and whether industry good practice (HSG guidance, BS 7671 etc) was followed. The HSE inspector after an incident asks: did this RA engage with the actual conditions?',
    'CAR 2012 Reg 10 — anyone who is or may be exposed to asbestos must receive adequate training. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline for trades. Higher levels (non-licensed work, licensed work) require more advanced training.',
    'Adequate lighting of the tower and surrounding area, increased fatigue risk in night workers, reduced visibility for inspections, and the availability of rescue personnel throughout the night',
    'Providing genuine value beyond the contracted scope — such as helpful maintenance advice, energy-saving tips, or pointing out potential issues — without expecting immediate return',
  ], correctIndex: 0, explanation: 'Objective test against actual conditions and good practice. Templates that don\'t engage fail the test.' },
  { id: 'l3-m1-s5-sub5-conflict', question: 'What if the static RAMS and the dynamic conditions clearly conflict?', options: [
    'Acknowledge promptly, investigate fairly, respond in writing within a stated timescale, signpost to ADR (e.g. scheme provider) if unresolved',
    'On the Schedule of Inspections, item 6 (connection of conductors), as ✗ with a brief description; flag the supervisor and fix before energising.',
    'In the Blind Spot \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2014 the mentor should provide specific, factual feedback using the SBI model to bring it into the Open area',
    'Stop. Write a fresh dynamic assessment that supplements the RAMS. If divergences are significant, escalate for a fresh RAMS rather than try to manage on the fly. Document the decision.',
  ], correctIndex: 3, explanation: 'Significant divergence = escalate. Don\'t paper over with a tweaked dynamic assessment.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the L3 supervisor RA mindset?', options: [
    'Boredom or apathy — because the challenge is too low relative to their skill level, offering no opportunity for engagement or growth',
    'Active engagement — does the RAMS match the site? Are the controls in place AND working? Is anyone slipping? What\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s changed since last visit? The mindset is operational, not paperwork.',
    'The health and safety arrangements and site rules for the construction phase, and specific measures concerning work falling within Schedule 3',
    'Recommended; the recommendation strengthens to a requirement in higher-risk residential buildings (HRRBs) under the Building Safety Act 2022 framework',
  ], correctAnswer: 1, explanation: 'Active engagement; operational mindset; verification not just compliance.' },
  { id: 2, question: 'What\'s the legal source of the RA duty?', options: [
    'Prepare to cease operations and lower the platform to a safe position, as gusts may exceed 12.5 m/s and conditions are deteriorating',
    'Ensure all personnel, tools, and materials are removed from the platform and the height is reduced if required',
    'MHSWR 1999 Reg 3 — every employer makes a "suitable and sufficient" assessment of risks to employees and non-employees. 5+ employees = recording mandatory.',
    'The dynamic and concentrated forces from hoisting can exceed the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s design capacity and cause collapse or overturning',
  ], correctAnswer: 2, explanation: 'Reg 3 is the statutory hook.' },
  { id: 3, question: 'What\'s the Reg 5 link?', options: [
    'The total amount of greenhouse gases produced directly and indirectly by an activity, individual, organisation, or product, expressed as carbon dioxide equivalent (CO2e)',
    'Indirectly - 30-year DPA liability, competence framework changes, Building Regs amendments (Approved Doc B fire safety especially), regulatory direction-of-travel emphasising traceability and certified competence.',
    'Arc-rated clothing matched to the prospective incident energy, insulated gloves rated to the working voltage, eye/face protection, and insulated footwear',
    'MHSWR Reg 5 — effective arrangements for planning, organising, controlling, monitoring, reviewing the preventive measures (POCMR). RA is one input; Reg 5 runs the system that operationalises it.',
  ], correctAnswer: 3, explanation: 'Reg 3 = assess. Reg 5 = run the system. POCMR cycle.' },
  { id: 4, question: 'How does the L3 supervisor verify "suitable and sufficient"?', options: [
    'Compare RAMS to actual site conditions; check controls are in place; observe operatives; ask &quot;could anyone reading this assessment understand the hazards and controls?&quot;; verify any HSE / industry guidance has been considered.',
    'Thank the worker for reporting the concern, investigate the allegation confidentially, take appropriate action against the unsafe management practice, reinforce that safety procedures are non-negotiable, and protect the worker from retaliation',
    'Auto-disconnection occurs in the same disconnection times as the equivalent TN system (Table 41.1) — once a second fault establishes a fault loop through the protective conductor, fault current flows like a TN line-to-earth fault and the protective device disconnects',
    'Segregate at source — recyclable cable scrap, WEEE for accessories with electronics, mixed waste, and asbestos suspect material handled separately under CAR 2012 / HSG264',
  ], correctAnswer: 0, explanation: 'Verification by comparison and observation. Templates that fail the &quot;could anyone reading this understand?&quot; test fail suitable and sufficient.' },
  { id: 5, question: 'What\'s the role of HSE INDG163 (5 steps)?', options: [
    'Timed exclusion zones with physical barriers and signage, a dedicated banksman, a traffic management plan, and coordination with the local authority',
    'Withdrawn but still the conceptual basis — Identify hazards / Decide who might be harmed / Evaluate risks / Record significant findings / Review. Practical structure for any RA.',
    '50–150 Ω — typical for a single 1.2 m rod in damp clay loam. Rocky or sandy / dry soils give substantially higher figures (200–500+ Ω) and may need a longer rod, multiple rods, or a different electrode geometry.',
    'Non-approved spare parts are fitted, the drive is opened by non-authorised personnel, parameter settings are changed without manufacturer approval, or the drive is operated outside its specified environmental conditions',
  ], correctAnswer: 1, explanation: '5 steps remain the conceptual structure even though INDG163 itself withdrawn.' },
  { id: 6, question: 'When should L3 escalate for a fresh RAMS rather than tweak the dynamic?', options: [
    'Receive and verify the gateway submission from the training provider, confirm that all mandatory pre-requisites have been met, and then schedule the EPA assessment components within the specified timeframe',
    'A root cause is the fundamental reason the failure occurred; a contributing factor increases the likelihood or severity but would not cause the failure alone',
    'When divergences from the original RAMS are significant — different conditions, different hazards, different occupancy, different scope. Tweaking is for minor divergences; fresh RAMS for significant ones.',
    'That you have completed all required on-programme qualifications, achieved the learning outcomes, built a portfolio that meets the minimum requirements, and are educationally ready for the EPA',
  ], correctAnswer: 2, explanation: 'Significant divergence = fresh RAMS. Tweaking only for minor.' },
  { id: 7, question: 'What\'s the L3 contribution to the firm\'s RAMS process?', options: [
    'Empathetic listening to acknowledge feelings, SOLER body language to show presence, reflective statements to validate, and clear signposting to appropriate support services',
    'The plan must rely entirely on self-rescue and on-site assisted rescue by trained personnel with rescue equipment, a satellite communication device should be provided, and the nearest emergency services response time must be factored into planning',
    'He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help',
    'Feedback from site (what\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s actually working / not); contribution to writing RAMS for routine jobs; review of generic templates; coaching of L2 mates on dynamic assessment; near-miss data feeding the next RAMS update.',
  ], correctAnswer: 3, explanation: 'L3 increasingly contributes to the firm\'s RAMS process. Site experience feeds template improvement.' },
  { id: 8, question: 'How does the L3 supervisor coach L2 mates on RA?', options: [
    'Walk them through hazard identification on real jobs; ask "what hazards do you see here?"; explain reasoning behind controls; show them how to write a dynamic assessment note; review their attempts; correct calibration over time.',
    'Connected load, diversity factor with source citation, category Ib, sub-main coincidence with source, sub-main Ib, origin coincidence with source, origin Ib, per-phase distribution, phase imbalance percent, and supply rating with margin.',
    'Still largely at demonstration and pre-commercial stage in the UK, with several prototype devices being tested in Scottish waters and the Severn Estuary — they offer predictable generation but face engineering challenges from the harsh marine environment',
    'Atmospheric conditions can change rapidly during work — continuous monitoring provides real-time warning of deteriorating conditions so workers can evacuate before reaching dangerous levels',
  ], correctAnswer: 0, explanation: 'Coaching by guided practice. Building L2 RA capability is part of the L3 supervisor contribution.' },
];

const faqs = [
  { question: 'Is dynamic risk assessment formal documentation required?', answer: 'A short written record (job pack note, app entry, dated and timed) is enough. The format isn\'t prescribed; the existence of a contemporaneous record is what matters.' },
  { question: 'What if no fresh RAMS can be obtained on the day?', answer: 'Don\'t proceed with significant work that the existing RAMS doesn\'t cover. Escalate to firm. Contained portions of the work that ARE covered may proceed if cleanly separable; the rest waits.' },
  { question: 'Can the L3 sign off the firm\'s RAMS?', answer: 'Sign-off authority varies by firm. L3 typically signs the dynamic assessment and may contribute to / sign minor RAMS for routine jobs. Major RAMS sign-off usually held by Qualified Supervisor / contracts manager.' },
  { question: 'What if the customer pushes back on a RAMS-driven decision?', answer: 'Explain the basis briefly; document the conversation; escalate to contracts manager if the customer persists. The RAMS isn\'t negotiable on safety grounds; commercial concerns are for the contracts manager to handle.' },
  { question: 'How does the L3 use near-miss data in RA?', answer: 'Near-misses are leading indicators of where the next incident will occur. Feed near-miss data into the next RAMS review — these hazards have been identified in practice, so RAMS should address them more directly.' },
  { question: 'What is the relationship between RAMS and the CDM construction phase plan?', answer: 'CPP is project-level; RAMS is task-level. CPP may reference RAMS. Both required where CDM applies. CPP minimum content per CIS80 template; RAMS per task.' },
  { question: 'How does the L3 supervisor handle conflict between two RAMS on a multi-trade site?', answer: 'Multi-trade sites often have overlapping RAMS — each trade\'s task RAMS plus the principal contractor\'s CPP. Where conflicts arise (one trade\'s isolation method conflicts with another\'s permit), the principal contractor coordinates resolution. The L3 supervisor flags the conflict promptly and waits for resolution rather than picking a side.' },
  { question: 'What happens when a vulnerable person is unexpectedly affected by the work?', answer: 'Stop. The original RA may not have captured the vulnerability. Dynamic-assess: who is present, what is their capacity to follow instruction, what additional controls are needed. Often the answer is to pause the work and brief the responsible person before continuing; sometimes a fresh RAMS is needed.' },
  { question: 'Is the firm\'s template RAMS suitable, or does each job need bespoke?', answer: 'Generic templates are starting points but every job needs site-specific adjustment. The "suitable and sufficient" test requires engagement with the actual hazards present. A template-only RAMS without site adjustment fails the test routinely on HSE inspection.' },
  { question: 'How does the L3 supervisor handle a refused dynamic-assessment escalation?', answer: 'If the firm refuses to provide fresh RAMS / refuses to escalate / pressures the L3 to proceed under inadequate RAMS, the L3\'s ERA s.44 protection covers the refusal. PIDA 1998 protects external escalation to HSE if internal route fails. The duty under s.7 is to refuse the unsafe work; the protection mechanisms make that refusal sustainable.' },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 5" title="Risk assessment AS A SUPERVISOR" description="Remember from Section 3.1 — RAMS is static + dynamic. Here we go deeper on the L3 SUPERVISOR judgement: beyond compliance to active operational engagement." tone="emerald" />
          <TLDR points={[
            "L3 RA is active engagement, not paperwork compliance. Review, sign off dynamic, escalate when divergence significant, contribute to firm process, coach L2 mates.",
            "MHSWR Reg 3 suitable and sufficient is judged objectively against actual conditions and good practice.",
            "Reg 5 POCMR cycle — RA is one input; running the system is the broader supervisor duty.",
            "Hierarchy of control governs the choice of measures: eliminate, substitute, engineering, admin, PPE. PPE-only solutions are weak and rarely defensible alone.",
            "ALARP (Edwards v NCB 1949) is the practical limit — controls applied until further reduction is grossly disproportionate to marginal risk reduction.",
            "Dynamic-vs-fresh-RAMS decision: minor divergence = dynamic patch; significant change in hazards / scope / occupancy = fresh RAMS, escalate.",
          ]} />
          <LearningOutcomes outcomes={[
            "Apply the L3 supervisor mindset to risk assessment - active engagement over paperwork compliance.",
            "Evaluate \"suitable and sufficient\" objectively.",
            "Decide when dynamic-assessment supplementation is enough vs when fresh RAMS is needed.",
            "Contribute to the firm's RAMS process - feedback, template improvement, RAMS writing for routine jobs.",
            "Coach L2 mates on hazard identification and dynamic assessment.",
            "Apply MHSWR Reg 5 POCMR cycle as the broader management framework.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Active engagement vs paperwork compliance</ContentEyebrow>
          <ConceptBlock title="The L3 supervisor mindset shift" plainEnglish="L2 followed RAMS. L3 actively engages with it - does it match the site? Are the controls in place AND working? Is anyone slipping? What has changed? The mindset is operational; the question 'is this suitable and sufficient TODAY?' runs continuously." onSite="The L3 supervisor does not treat RAMS as a one-time read; it is a continuous reference point against which observed reality is compared.">
            <p>What active engagement looks like:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Read the RAMS BEFORE walking the site (so you know what to verify).</li>
              <li>Walk-round comparing what you see to what the RAMS says.</li>
              <li>Note divergences in writing on the dynamic assessment.</li>
              <li>Brief operatives on what the RAMS requires AND what the dynamic adds.</li>
              <li>Observe during work; check controls are still in place.</li>
              <li>Update at end of day; flag persistent divergences for next-job RAMS update.</li>
              <li>Feed near-miss data into the firm&apos;s RAMS-improvement process.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 3(1)" clause={<>&quot;Every employer shall make a suitable and sufficient assessment of - (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking.&quot;</>} meaning={<>The umbrella RA duty. Same scope as HASAWA s.2 + s.3 combined. &quot;Suitable and sufficient&quot; judged objectively - did it engage with actual hazards and reflect industry good practice?</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 3." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Static, dynamic and the escalation point</ContentEyebrow>
          <ConceptBlock title="When does dynamic-assessment supplementation become inadequate?" plainEnglish="Static RAMS is the baseline; dynamic supplementation handles small divergences. But sometimes conditions diverge enough that no amount of dynamic-assessment patching is enough - the RAMS itself needs replacing. The L3 supervisor judges where the line is." onSite="Examples of divergence requiring fresh RAMS: significantly different occupancy (vacant survey, occupied with kids on the day); new hazards (asbestos found mid-job); different scope (customer change request); equipment unavailable / different from planned; weather forcing significant alteration to method.">
            <p>Decision criteria - dynamic patch vs fresh RAMS:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dynamic patch enough</strong> - minor divergences (cable route slightly different; minor housekeeping; weather adjusting timing).</li>
              <li><strong>Fresh RAMS needed</strong> - significant change in hazards, scope, occupancy, equipment, controls, competence requirements.</li>
              <li>If in doubt, escalate. Better to delay 30 minutes for a fresh RAMS than work to an inadequate one.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Contributing to firm process and coaching</ContentEyebrow>
          <ConceptBlock title="L3 contributes to the firm's RA capability" plainEnglish="L3 isn't just a consumer of RAMS - they're a contributor. Site experience, near-miss observations, intervention learnings all feed back to improve the firm's RAMS templates and process." onSite="Submit feedback after jobs - what worked, what didn't, what near-misses suggest improvements. Most firms have a quarterly RAMS review; L3 contributes to it.">
            <p>Contribution channels:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>End-of-job RAMS feedback - what was missing, what could be better.</li>
              <li>Near-miss reports feeding into RAMS review.</li>
              <li>Writing RAMS for routine jobs (reviewed by senior).</li>
              <li>Suggesting template improvements.</li>
              <li>Coaching L2 mates on RA - building team capability.</li>
              <li>Intervention learnings feeding RAMS update.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Coaching L2 mates on dynamic assessment" plainEnglish="Building the L2's capability to do RA is part of the L3 supervisor contribution. Walk them through hazard identification on real jobs; ask &quot;what do you see here?&quot;; explain controls reasoning; review their dynamic-assessment notes." onSite="The coaching is operational, not academic. Each job is an opportunity for the L2 to grow; the L3 supervisor's consistent attention to RA in practice teaches more than any classroom session.">
            <p>Coaching practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>On arrival: &quot;walk the site with me, what hazards do you see?&quot;.</li>
              <li>Explain reasoning: &quot;the control here is X because the hazard is Y&quot;.</li>
              <li>Show your dynamic-assessment note; explain what you wrote and why.</li>
              <li>Have the L2 attempt their own; review and correct.</li>
              <li>Discuss near-misses without blame - what could have been spotted earlier?.</li>
              <li>Cumulative growth over months; calibration improves over jobs.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The hierarchy of control — the engineering reflex</ContentEyebrow>
          <ConceptBlock title="Eliminate, substitute, engineering, admin, PPE" plainEnglish="The hierarchy of control prioritises stronger controls over weaker ones. Eliminate the hazard altogether (best); substitute with a safer alternative; engineering controls (guards, isolation, interlocks); administrative controls (procedures, training, signage); PPE (last resort, weakest control). The L3 supervisor selects controls from the top down, only descending where higher-tier controls are not reasonably practicable." onSite="The reflex on a hazard: can we eliminate? (work dead instead of live). Can we substitute? (battery tool instead of mains). Engineering? (RCD, guard, isolation). Admin? (permit, briefing). PPE? (safety glasses, gloves). PPE-only solutions are weak and rarely defensible alone — there is almost always a higher-tier control available.">
            <p>Hierarchy in operation for electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Eliminate</strong> — work dead (safe isolation), remove the conductor altogether.</li>
              <li><strong>Substitute</strong> — battery tool instead of mains; lower-voltage system; less hazardous material.</li>
              <li><strong>Engineering</strong> — RCD protection, fixed guards, interlocks, fire stopping, ventilation.</li>
              <li><strong>Administrative</strong> — permit-to-work, RAMS, briefing, signage, supervision.</li>
              <li><strong>PPE</strong> — gloves, eye protection, arc-flash PPE, RPE.</li>
              <li>PPE never alone — always supplements higher-tier controls.</li>
              <li>Rationale for descending the hierarchy must be documented (why higher-tier was not practicable).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 4 (Principles of prevention)" clause={<>&quot;Where an employer implements any preventive and protective measures he shall do so on the basis of the principles specified in Schedule 1 to these Regulations.&quot;</>} meaning={<>Reg 4 cross-refers to Schedule 1 which sets out the nine principles of prevention. These are essentially the hierarchy of control plus collective-over-individual measures, training, and worker involvement. The L3 supervisor uses the Schedule 1 principles when selecting controls from the RA outputs.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 4 + Schedule 1." />

          <RegsCallout source="MHSWR 1999 — Reg 5 (Health and safety arrangements)" clause={<>&quot;Every employer shall make and give effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures.&quot;</>} meaning={<>The POCMR cycle — Planning, Organisation, Control, Monitoring, Review. Reg 5 runs the management system that operationalises the Reg 3 risk assessment. Five-employee threshold for written arrangements. The L3 supervisor&apos;s active engagement with RAMS is the operational expression of Reg 5 in daily work.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 5." />

          <ConceptBlock title="Method statement vs risk assessment — what each does" plainEnglish="The risk assessment identifies hazards and controls; the method statement describes HOW the work will be done step-by-step incorporating those controls. RA = what could go wrong; MS = how we are going to do this safely. Together they form RAMS. The L3 supervisor reviews both — the RA for hazard coverage, the MS for practical sequence." onSite="Common failure: a great RA but no MS — workers know hazards but no agreed sequence. Or a detailed MS with weak RA — sequence is laid out but hazards unaddressed. Both must be present and aligned. The MS often lives in the construction phase plan / job pack; the RA is the underlying assessment.">
            <p>Distinguishing RA and MS:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RA</strong> — identifies hazards, evaluates risks, specifies controls, identifies who might be harmed.</li>
              <li><strong>MS</strong> — describes the work step-by-step, sequence, equipment, personnel, time.</li>
              <li><strong>Together (RAMS)</strong> — operational document for the team to follow.</li>
              <li>Both should be referenced in the construction phase plan.</li>
              <li>Both should be briefed to operatives before work starts.</li>
              <li>Both should be reviewed when conditions change.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The 5-step HSE structure that still anchors RA" plainEnglish="HSE INDG163 (now withdrawn but conceptually intact) set out five steps: (1) Identify the hazards; (2) Decide who might be harmed and how; (3) Evaluate the risks and decide on precautions; (4) Record significant findings and implement them; (5) Review the assessment and update if necessary. The structure remains the practical scaffold for any RA the L3 supervisor reviews or contributes to." onSite="The L3 reflex on a weak RA: walk it through the 5 steps. Most weak RAs miss step 2 (who else? — non-employees, vulnerable users) or step 5 (when was this last reviewed?). The structure exposes gaps quickly. Use it as a checklist when the firm asks for feedback on a template.">
            <p>The 5 steps in operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1 — Identify hazards</strong> — walk-round, history, near-miss data, designer information.</li>
              <li><strong>Step 2 — Decide who might be harmed and how</strong> — employees, contractors, customers, public, vulnerable users.</li>
              <li><strong>Step 3 — Evaluate risks and decide on precautions</strong> — apply hierarchy of control to ALARP.</li>
              <li><strong>Step 4 — Record significant findings and implement</strong> — RAMS document; brief operatives; implement controls.</li>
              <li><strong>Step 5 — Review and update</strong> — periodic review + trigger reviews on changes / incidents / near-misses.</li>
              <li>Five-step structure aligns with MHSWR Reg 3 + Reg 5 POCMR cycle.</li>
              <li>Structure works for any hazard category — electrical, working at height, manual handling, asbestos.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ALARP and the practical limit of risk reduction" plainEnglish="ALARP — As Low As Reasonably Practicable. Risk reduction continues until the cost / time / trouble of further reduction becomes grossly disproportionate to the marginal risk avoided (Edwards v NCB 1949). ALARP is the practical limit of the SFAIRP duty under HASAWA. The L3 supervisor uses ALARP as the framing for accepting residual risk: we have done what is reasonably practicable; further reduction is grossly disproportionate." onSite="The ALARP demonstration is a documentary act — the RA shows hazards identified, controls applied, residual risk accepted. The L3 supervisor&apos;s judgement on whether further controls are practicable forms part of the ALARP demonstration. Conservative bias — when in doubt about whether a control is reasonably practicable, apply it.">
            <p>ALARP in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify the hazard and the unmitigated risk level.</li>
              <li>Apply hierarchy-of-control measures from the top.</li>
              <li>For each potential additional control, weigh sacrifice against marginal risk reduction.</li>
              <li>Continue until further reduction is grossly disproportionate.</li>
              <li>Document the residual risk and the basis for accepting it.</li>
              <li>Industry good practice (HSG guidance, BS standards, ACOPs) sets the ALARP baseline.</li>
              <li>Conservative bias — if unsure, apply the control.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Reading the RAMS once and not referring back" whatHappens={<>L3 reads RAMS at start of project; doesn't reference back during the work; conditions change; controls slip; an incident occurs that the RAMS would have predicted if anyone had been actively engaging with it. HSE finds RA was suitable on paper but not in operation. Reg 3 + Reg 5 breach.</>} doInstead={<>Treat RAMS as continuous reference. Read at start; re-read during the day; verify controls; update dynamic version. Active engagement, not one-time compliance.</>} />

          <CommonMistake title="Tweaking dynamic assessment when fresh RAMS is needed" whatHappens={<>Conditions diverge significantly from RAMS; L3 patches the dynamic with successive notes; assessment becomes a layered mess that doesn\'t reflect the work being done. Inspector finds the assessment isn\'t suitable and sufficient. Reg 3 breach.</>} doInstead={<>Recognise the threshold for fresh RAMS - significant divergence, scope change, new hazards. Escalate; don\'t patch. The 30-minute delay for a fresh RAMS is far better than the hours of patching that follow an inadequate one.</>} />

          <Scenario title="Site conditions diverge significantly mid-project" situation={<>3-day commercial install; day 1 went per RAMS; day 2 morning the customer announces extensive scope change - additional sockets in a different room previously not surveyed. Customer wants the work done by end of day 2.</>} whatToDo={<>Pause. The scope change creates new hazards - new room not surveyed; possibly different fabric; possibly different occupancy; possibly different services concealed. The RAMS doesn\'t cover the additional room. Three options: (1) refuse the additional work today; complete original scope; new room added to a fresh RAMS for a future visit. (2) Phone contracts manager; agree extension to scope; request fresh RAMS / addendum delivered today. (3) Dynamic-assessment a contained portion only if cleanly separable from the unsurveyed work. Recommend option 1 or 2 to customer in writing - explains why the work can\'t be added on the fly. Document the decision. ERA s.44 protects refusal. Customer pressure isn\'t a Reg 3 override.</>} whyItMatters={<>Scope change is the most common path to RA inadequacy. The L3 supervisor recognising it and escalating - rather than trying to patch via dynamic - is what keeps the firm on the right side of Reg 3 and protects the team. Customer pressure is real but commercial; safety is regulatory; the L3 supervisor\'s judgement on the priority is what discharges the duty.</>} />

          <SectionRule />
          <ContentEyebrow>The MHSWR Reg 5 POCMR cycle in practice</ContentEyebrow>

          <ConceptBlock
            title="Plan, Organise, Control, Monitor, Review — the management-system framework"
            plainEnglish="MHSWR 1999 Reg 5 requires every employer to make and give effect to such arrangements as are appropriate for the effective Planning, Organisation, Control, Monitoring and Review (POCMR) of the preventive and protective measures. POCMR is the management-system framework. Risk assessment is one input; running the cycle is what discharges the broader duty. HSE&apos;s HSG65 (Managing for health and safety) walks through the POCMR cycle in operational detail and is the practitioner reference."
            onSite="The L3 supervisor lives inside the POCMR cycle without always realising it. Planning the day&apos;s work against the RAMS = planning. Briefing the team and assigning roles = organising. On-site supervision and intervention = controlling. Toolbox observations, near-miss review = monitoring. End-of-week debrief, lessons learned = reviewing. The cycle isn&apos;t paperwork on top of work; it&apos;s the structure that turns RAMS and policy into actual safety."
          >
            <p>POCMR mapped to L3 supervisor activities:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — read RAMS, plan day&apos;s sequence, identify
                resources needed, identify expected hazards.
              </li>
              <li>
                <strong>Organise</strong> — brief team, assign roles, confirm
                competence, distribute PPE, set check-in cadence.
              </li>
              <li>
                <strong>Control</strong> — on-site supervision, intervene early on
                unsafe acts, manage interfaces with other trades.
              </li>
              <li>
                <strong>Monitor</strong> — toolbox observations, near-miss logging,
                attendance records, equipment inspection.
              </li>
              <li>
                <strong>Review</strong> — end-of-day / end-of-week debrief, lessons
                fed back to firm system, RAMS update where appropriate.
              </li>
              <li>
                <strong>HSG65</strong> — the HSE&apos;s management-system reference;
                worth reading at L3.
              </li>
              <li>
                <strong>ISO 45001</strong> — the international H&amp;S management
                system standard; aligned with POCMR; some larger firms accredited.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Toolbox talks — the briefing discipline</ContentEyebrow>

          <ConceptBlock
            title="Why the 10-minute briefing matters more than the 50-page RAMS"
            plainEnglish="A toolbox talk is a short focused briefing — typically 10-15 minutes at the start of a shift or before a particular task — covering hazards, controls, lessons from recent near-misses and any site-specific issues for the day. The talk is the operational expression of the RAMS — the moment the assessment becomes knowledge the operatives actually carry. A perfect RAMS that has not been briefed delivers no safety; a sound RAMS that has been briefed clearly is what changes behaviour. The L3 supervisor delivers toolbox talks routinely and records them — names, date, time, topic."
            onSite="Format: short, focused, two-way. Pick one or two key hazards. Reference the RAMS but do not read it. Invite questions. Capture any concerns raised. Sign-in sheet completed. Common topics: isolation discipline, working at height for the day&apos;s tasks, manual handling, asbestos awareness, near-miss feedback from previous job, weather conditions. Keep the talk current — recycling the same generic content monthly stops engaging operatives within weeks."
          >
            <p>Effective toolbox talk elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Short (10-15 minutes) and focused (one or two topics).</li>
              <li>Site-specific not generic.</li>
              <li>Two-way — invites questions and concerns.</li>
              <li>References RAMS but does not read from it.</li>
              <li>Acknowledges recent near-misses and lessons.</li>
              <li>Sign-in sheet — names, date, topic.</li>
              <li>Held at start of shift or before particular task.</li>
              <li>Records retained as evidence of competence briefing.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Human factors and the HSG48 perspective</ContentEyebrow>

          <ConceptBlock
            title="Why people behave the way they do — the HSG48 framework"
            plainEnglish="HSG48 (Reducing error and influencing behaviour) is the HSE&apos;s human-factors reference. It frames safety performance as the product of the job, the individual, and the organisation. The job: physical demands, time pressure, complexity, displays, controls. The individual: competence, training, attitude, fatigue, distraction. The organisation: culture, leadership, resources, supervision, communication. The L3 supervisor uses this lens to understand near-misses and incidents — not as individual failure, but as system signal. The standard reflex changes from &quot;why did they make that mistake?&quot; to &quot;what conditions made the mistake likely?&quot; and &quot;what controls would catch the next one?&quot;"
            onSite="Practical L3 reflex on a near-miss: ask the HSG48 questions. Was the job physically tough or time-pressured? Was the individual fatigued, distracted, undertrained? Was the organisation under-resourcing the work, supervising inadequately, communicating poorly? The answer usually involves all three. The corrective action then addresses the system, not just the person. Blame-only responses to near-misses kill reporting; system-aware responses improve it. The HSG48 framing is what makes the firm&apos;s near-miss programme genuinely safety-improving rather than just paperwork."
          >
            <p>HSG48 framework elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>The Job</strong> — physical demands, time pressure, complexity, displays, controls, environment.</li>
              <li><strong>The Individual</strong> — competence, training, attitude, fatigue, distraction, motivation.</li>
              <li><strong>The Organisation</strong> — culture, leadership, resources, supervision, communication, planning.</li>
              <li>Errors classified as slips, lapses, mistakes (rule-based, knowledge-based), violations (routine, situational, exceptional).</li>
              <li>Just culture — separating blameworthy violations from system-driven errors.</li>
              <li>Reporting culture — operatives report near-misses because they trust the response will be constructive.</li>
              <li>Learning culture — lessons feed back into job design, training, organisation.</li>
              <li>L3 supervisor models the just-and-learning culture through everyday response to near-misses.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>HSG65 and the management-system view of safety</ContentEyebrow>

          <ConceptBlock
            title="From task RA to firm-level management system"
            plainEnglish="HSG65 (Managing for health and safety) is the HSE&apos;s flagship management-system guidance. It frames safety management as a Plan-Do-Check-Act cycle aligned with ISO 45001 and modern quality-management practice. The L3 supervisor lives in the Do and Check phases — implementing controls, monitoring compliance, capturing near-misses, briefing operatives. But understanding the wider framework gives perspective: task-level RA feeds firm-level policy; near-miss data feeds management review; lessons learned feed into next year&apos;s plan. The cycle never stops."
            onSite="Practical L3 awareness: the firm&apos;s annual H&amp;S plan, the periodic management review, the policy refresh, the audit findings — all draw on data the L3 supervisor contributes daily. Near-miss logs, training records, dynamic assessments, end-of-job feedback are the inputs that make the management system real. A firm with strong inputs has strong outputs; a firm with thin inputs has nothing to manage. The supervisor&apos;s discipline matters because it accumulates into the firm&apos;s system."
          >
            <p>HSG65 Plan-Do-Check-Act cycle:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — H&amp;S policy, leadership commitment,
                worker involvement, planning, risk profiling, objectives, resource.
              </li>
              <li>
                <strong>Do</strong> — implement controls, organise for safety
                (responsibilities, competence, communication), control work
                activities (RA, RAMS, permits, monitoring).
              </li>
              <li>
                <strong>Check</strong> — measure performance (proactive: inspection,
                audit; reactive: incidents, near-misses), investigate, learn
                lessons.
              </li>
              <li>
                <strong>Act</strong> — review performance against objectives,
                update policy and controls, embed learning into the system.
              </li>
              <li>
                <strong>Continuous improvement</strong> — cycle restarts; not a
                one-time set of activities but an ongoing management discipline.
              </li>
              <li>
                <strong>Alignment with ISO 45001</strong> — the international
                H&amp;S management system standard uses the same PDCA framework.
              </li>
              <li>
                <strong>Worker involvement</strong> — central to HSG65; supervisors
                bring worker voice into the system.
              </li>
              <li>
                <strong>Leadership and culture</strong> — HSG65 stresses these as
                the foundation; system controls alone do not produce safety
                without culture.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MHSWR 1999 — Reg 7 (Health and safety assistance)"
            clause={
              <>
                &quot;Every employer shall, subject to paragraphs (6) and (7),
                appoint one or more competent persons to assist him in undertaking
                the measures he needs to take to comply with the requirements and
                prohibitions imposed upon him by or under the relevant statutory
                provisions and by Part II of the Fire Precautions (Workplace)
                Regulations 1997.&quot;
              </>
            }
            meaning={
              <>
                Reg 7 is the competent-person duty. Every employer must appoint
                competent assistance to comply with H&amp;S statute. For an
                electrical contracting firm this typically includes a Qualified
                Supervisor (per scheme requirements), a designated H&amp;S manager
                or external H&amp;S consultant, and trade-specific competence (BS
                7671 / EAWR knowledge). The L3 supervisor often grows into Reg 7
                competence over time as part of career progression.
              </>
            }
            cite="Source: MHSWR 1999 (SI 1999/3242), Reg 7."
          />

          <SectionRule />
          <ContentEyebrow>Documenting RA decisions — what good looks like</ContentEyebrow>

          <ConceptBlock
            title="The evidential bar for a defensible RA"
            plainEnglish="An HSE inspector after an incident asks: did the RA engage with the actual conditions, identify the hazards that materialised, specify controls proportionate to the risk, and reflect industry good practice? A defensible RA can demonstrate each. The bar is not perfection — it is engagement and proportionality, evidenced contemporaneously. Records that look like cut-and-paste from a template, fail to mention the specific site features, do not reference industry guidance and were not communicated to the operatives, fail the test. Records that show site-specific assessment, named persons at risk, hierarchy applied, controls specified, briefing recorded and review dates set, pass the test."
            onSite="L3 supervisor practical guidance: when writing a dynamic assessment or contributing to a RAMS, include enough detail that another competent person could pick it up and understand what was assessed. Use site-specific details (room location, equipment, occupancy, time of day). Cite the relevant standard or guidance where it informs the control choice. Date and sign. Brief the team and record the briefing. The half-hour spent on a thorough RA saves the day-of-incident reconstruction that never quite carries the same weight."
          >
            <p>Evidential elements of a good RA:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site-specific detail — room, equipment, occupancy, time, conditions.</li>
              <li>Named persons at risk — employees, contractors, customers, vulnerable users.</li>
              <li>Specific hazards identified — not generic template wording.</li>
              <li>Hierarchy of control applied — top-down, with rationale for descent.</li>
              <li>Industry guidance cited — HSG, ACOP, BS standards referenced where applicable.</li>
              <li>Controls specified — what, when, how, by whom.</li>
              <li>Residual risk acknowledged — what cannot be eliminated, why accepted.</li>
              <li>Briefing recorded — names, date, time, RAMS version.</li>
              <li>Review date set — when this RA will be revisited.</li>
              <li>Signed and dated by competent assessor.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Risk matrices — useful tool or misleading abstraction?"
            plainEnglish="Many firms use a 5x5 risk matrix (likelihood x severity) to quantify risk and prioritise controls. The tool is useful when handled with judgement and dangerous when handled mechanically. Risk matrices can hide qualitative differences — a low-likelihood-very-severe risk and a high-likelihood-low-severity risk may produce the same score but warrant very different responses. Matrices can also encourage a tick-box approach where the score is recorded but the underlying hazard is not engaged with. The L3 supervisor uses the matrix as a communication tool but does not let it substitute for thinking."
            onSite="Practical L3 approach: where the firm&apos;s system requires a matrix score, complete it but include narrative around it that explains the actual hazard, control rationale and residual risk. A score without narrative tells the inspector very little; a narrative with a score tells them the assessor was engaging. Avoid &apos;Likelihood 1 x Severity 1 = 1, no further action&apos; entries on hazards that warrant real consideration. Conversely, do not inflate scores to drive action that is not warranted — that distorts the firm&apos;s overall risk profile and credibility."
          >
            <p>Matrix-use principles:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Matrix is a communication tool, not a substitute for judgement.</li>
              <li>Always include narrative explanation of the hazard and controls.</li>
              <li>Be alert to qualitative differences hidden by matching scores.</li>
              <li>Low-likelihood-very-severe risks (fatality) often warrant more attention than the score suggests.</li>
              <li>Avoid inflated scores to drive unwarranted action.</li>
              <li>Avoid deflated scores to avoid required action.</li>
              <li>Review matrix scores when conditions change or new information emerges.</li>
              <li>Inspector reads narrative more than the score — write for the inspector.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Permit-to-work systems and high-risk activities</ContentEyebrow>

          <ConceptBlock
            title="When a permit-to-work formalises the RAMS for high-risk tasks"
            plainEnglish="A permit-to-work (PTW) is a formal written authorisation issued by a specifically designated person for a specifically defined high-risk task at a specified time on a specified item of plant. The PTW is the operational expression of the RAMS for tasks where the consequence of getting it wrong is severe — live working (EAWR Reg 14), entry into confined spaces (Confined Spaces Regs 1997), hot work in fire-sensitive environments, high-voltage switching, work on energised pressure systems. HSG250 (Guidance on permit-to-work systems) is the practitioner reference. The L3 supervisor on a PTW site reads, understands, accepts and complies with the permit conditions; they do not negotiate them informally."
            onSite="Standard PTW elements: identification of task, identification of plant / location, identification of hazards, controls required (isolation, prove-dead, lock-off, sentry, RPE, escape arrangements), authorised period, named issuer, named acceptor, sign-on / sign-off. The L3 supervisor receiving a PTW reads it carefully and asks questions before signing acceptance. The PTW expires at the stated end time even if work is not complete — a new permit is required. Cross-shift handovers require formal re-issue. Permit-to-work failures (expired permits, scope drift, informal extensions) are a leading cause of high-consequence incidents."
          >
            <p>Common permit-to-work categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical live working permit</strong> — under EAWR Reg 14
                three-test (not reasonable to dead-work + properly-judged risk +
                suitable precautions). Signed by competent person.
              </li>
              <li>
                <strong>Confined space entry permit</strong> — Confined Spaces Regs
                1997; pre-entry gas testing, rescue arrangements, communications,
                authorisation.
              </li>
              <li>
                <strong>Hot work permit</strong> — welding, grinding, soldering in
                fire-sensitive environments. Fire watch required during and after.
              </li>
              <li>
                <strong>High-voltage switching permit</strong> — formal switching
                programme, lock-off, prove-dead, earthing where needed.
              </li>
              <li>
                <strong>Working at height permit</strong> — for high-consequence
                falls, often on plant or scaffolding above standard height
                thresholds.
              </li>
              <li>
                <strong>Excavation permit</strong> — for digging where buried
                services are present; CAT-and-Genny survey, hand-dig requirements.
              </li>
              <li>
                <strong>Roof access permit</strong> — fragile roofs, edge protection
                check, weather conditions.
              </li>
              <li>
                <strong>HSG250</strong> — HSE guidance on permit-to-work systems;
                practitioner reference for design and operation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Reg 4(2)"
            clause={
              <>
                &quot;No person at work shall enter a confined space to carry out
                work for any purpose unless it is not reasonably practicable to
                achieve that purpose without such entry.&quot;
              </>
            }
            meaning={
              <>
                The confined-space hierarchy. First question: can the work be done
                without entering the space? Only if not reasonably practicable does
                entry proceed, and then only with a safe system of work (Reg 4(1)),
                which in practice means a permit-to-work covering gas testing,
                breathing apparatus, communications, emergency arrangements. The L3
                supervisor on confined-space work applies the hierarchy: eliminate
                entry first, then control if entry necessary.
              </>
            }
            cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4."
          />

          <ConceptBlock
            title="Hazard categories L3 supervisors recurrently assess"
            plainEnglish="The L3 supervisor&apos;s working hazard taxonomy covers the major categories that appear repeatedly in electrical trade RAMS — each with its own regulatory framework, control hierarchy and common mistakes. Knowing the framework for each enables faster, more confident risk assessment on each new job. HSE produces HSG (Health and Safety Guidance) series documents for the major hazard categories — these are the practitioner references and form the benchmark for ALARP."
            onSite="The L3 supervisor builds a mental hazard-category map over time. Each category brings its own regulatory framework, its own technical guidance, its own common mistakes. The faster the supervisor can recognise the category and reach for the controls, the better the operational reflex. A senior supervisor scans the job and identifies eight to twelve recurring categories within seconds; an apprentice supervisor may need to walk through them deliberately. Calibration improves over time."
          >
            <p>Recurring hazard categories in electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical (EAWR 1989; BS 7671)</strong> — shock, arc-flash,
                burns. Hierarchy: dead-work / isolation / proving. HSG85 (electricity
                at work) + HSG107 (maintaining portable and transportable
                electrical equipment).
              </li>
              <li>
                <strong>Working at height (WAHR 2005)</strong> — falls of persons or
                objects. Hierarchy: avoid / prevent / mitigate. INDG401 / INDG405.
              </li>
              <li>
                <strong>Manual handling (MHOR 1992)</strong> — back / shoulder
                injury. Hierarchy: avoid / assess / reduce. L23.
              </li>
              <li>
                <strong>Hand-arm vibration (CVWR 2005)</strong> — HAVS. Tool
                selection, exposure limit values, monitoring. L140.
              </li>
              <li>
                <strong>Noise (CNWR 2005)</strong> — hearing damage. Action levels,
                hearing protection zones. L108.
              </li>
              <li>
                <strong>Asbestos (CAR 2012)</strong> — pre-2000 buildings;
                management plan; survey before disturbance. HSG264.
              </li>
              <li>
                <strong>COSHH (substance hazards)</strong> — cleaning chemicals,
                adhesives, dust, fumes. COSHH 2002; SDS; control. L5.
              </li>
              <li>
                <strong>Fire safety (RRFSO 2005)</strong> — hot work, fire risk
                assessment, evacuation. HSG65 / HSG259.
              </li>
              <li>
                <strong>Confined spaces (CS Regs 1997)</strong> — risers, plant
                rooms, tanks. L101.
              </li>
              <li>
                <strong>Lone working</strong> — emergency contact, dynamic check-in.
                INDG73.
              </li>
              <li>
                <strong>Welfare and fatigue</strong> — CDM 2015 welfare Sched 2; HSG48
                human factors.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Multiple hazard categories converging on one task"
            situation={
              <>
                You arrive to install a 3-phase distribution board in a basement
                plant room of a 1950s commercial property. The job pack notes:
                possible asbestos in the ceiling lagging (not yet surveyed beyond
                visual), restricted headroom (1.85m in part of the room), single
                access door, no natural ventilation, customer wants the work done
                during occupied hours, and the existing DB is energised serving
                production equipment that the customer wants kept running. The
                supervisor is in another building. Your L2 mate is with you.
              </>
            }
            whatToDo={
              <>
                Stop and walk through the hazard categories before doing anything.
                (1) Asbestos — the ceiling lagging is a pre-2000 material in a
                pre-2000 building. CAR 2012 Reg 4 requires a management survey
                identifying ACMs before disturbance. The job pack note about
                &quot;possible asbestos&quot; is a stop signal — no work proceeds
                until refurbishment / demolition survey conducted by competent
                surveyor. (2) Confined-space-adjacency — the plant room may meet
                the Confined Spaces Reg 1 definition (specified risks present: fire,
                gas, lack of oxygen) given lack of natural ventilation. Gas testing
                / mechanical ventilation may be required. (3) Electrical (EAWR
                Reg 14) — keeping production running while installing a new DB
                points towards live working, which engages the three-test. (4)
                Working at height — restricted headroom and overhead working at
                ceiling level. (5) Manual handling — DB and cabling weight in a
                space with limited access. Brief your L2 mate clearly: this is not
                a today job. Phone the supervisor and the contracts manager.
                Document the hazard categories identified, the RAMS gaps, and the
                escalation. Plan ahead: an asbestos refurbishment survey,
                ventilation provision, agreed live/dead working strategy with the
                customer (likely scheduling around production), updated RAMS, fresh
                briefing. Don&apos;t proceed under the current RAMS — the
                divergence from the briefed scope is severe.
              </>
            }
            whyItMatters={
              <>
                Real jobs routinely converge multiple hazard categories on a single
                task. The L3 supervisor&apos;s job is to recognise the
                convergence, identify each category&apos;s regulatory framework,
                and escalate when the existing RAMS does not engage with the actual
                conditions. Proceeding under an inadequate RAMS because &quot;the
                customer wants it done today&quot; is exactly the failure mode the
                MHSWR Reg 3 suitable-and-sufficient test exists to prevent.
                Asbestos disturbance without survey is a CAR 2012 offence; live
                working without three-test is an EAWR Reg 14 offence; confined-
                space entry without safe system is a CS Regs 1997 offence. The
                stop-and-escalate response protects everyone.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Vulnerable persons and the s.3 dimension of RA</ContentEyebrow>

          <ConceptBlock
            title="When non-employees raise the suitable-and-sufficient bar"
            plainEnglish="MHSWR Reg 3(1)(b) requires risk assessment for non-employees affected by the work. Reg 3(3) requires specific assessment for young persons (under 18) and (4) for new and expectant mothers. Reg 16 of MHSWR contains the young-persons-specific assessment factors — inexperience, lack of awareness of risks, immaturity. The L3 supervisor on a customer site routinely encounters non-employees whose risk profile is higher than the average worker — elderly residents, young children, persons with mobility / sensory impairment, persons whose health is already compromised. The RA bar rises in proportion."
            onSite="Practical L3 reflex on arrival at a customer site: who else is in the building? Are there vulnerable users? Children, elderly residents, residents with health conditions, residents who may not understand or follow site barriers? The dynamic assessment must capture these and the controls must reflect them. Standard barriers may not be enough for a resident with dementia; standard noise warnings may not reach a deaf resident; standard isolation may not protect a resident dependent on a stair lift. The L3 supervisor often pauses and reroutes the work to accommodate vulnerability rather than expecting vulnerable residents to accommodate the work."
          >
            <p>Vulnerable-person RA categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Children</strong> — curiosity, low height, inability to read
                or comply with signs. Physical barriers, locked tools, brief
                parents.
              </li>
              <li>
                <strong>Young workers under 18 (MHSWR Reg 19)</strong> —
                inexperience, capacity, immaturity. Specific risk assessment
                required.
              </li>
              <li>
                <strong>Elderly residents</strong> — mobility, balance, response
                time. Stair lift / medical equipment dependency may be safety-
                critical.
              </li>
              <li>
                <strong>Residents with dementia / cognitive impairment</strong> —
                may not understand or remember barriers. Active supervision /
                family communication.
              </li>
              <li>
                <strong>Hearing or visual impairment</strong> — standard warnings
                may not reach. Alternative communication required.
              </li>
              <li>
                <strong>Mobility impairment</strong> — wheelchair access, evacuation
                considerations, PEEP-style planning.
              </li>
              <li>
                <strong>Health-condition-dependent residents</strong> — medical
                equipment, dialysis, oxygen, refrigerated medication. Isolation
                may threaten dependency.
              </li>
              <li>
                <strong>New and expectant mothers (MHSWR Reg 18)</strong> —
                specific assessment for both workers and as non-employees affected
                by work.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 19"
            clause={
              <>
                &quot;Every employer shall ensure that young persons employed by him
                are protected at work from any risks to their health or safety which
                are a consequence of their lack of experience, or absence of
                awareness of existing or potential risks or the fact that young
                persons have not yet fully matured.&quot;
              </>
            }
            meaning={
              <>
                The young-persons protection. Mirrors the s.3 / Reg 3 framework but
                adds specific assessment criteria — experience, awareness,
                maturity. Applies both to young employees (the L2 / L3 apprentice
                workforce) and to young persons as non-employees affected by work
                (children on customer premises, students on educational sites). The
                L3 supervisor working alongside L2 mates or on customer sites with
                children present applies Reg 19 alongside Reg 3.
              </>
            }
            cite="Source: MHSWR 1999 (SI 1999/3242), Reg 19."
          />

          <SectionRule />
          <ContentEyebrow>The RAMS lifecycle and continuous improvement</ContentEyebrow>

          <ConceptBlock
            title="From job pack to learnings — closing the loop"
            plainEnglish="A mature RAMS process is not one-shot. It runs as a lifecycle: pre-job survey identifies hazards; static RAMS captures them and specifies controls; dynamic assessment validates and updates against site reality; daily briefings communicate to operatives; in-work observations monitor compliance; near-miss capture surfaces emerging issues; end-of-job debrief feeds back what worked and what did not; firm-level review aggregates learnings across jobs; template RAMS is updated; new jobs benefit from accumulated learnings. The L3 supervisor contributes at every stage but particularly at the dynamic / observation / debrief / feedback points."
            onSite="The continuous improvement discipline is what separates a mature firm from one that does paperwork-as-compliance. The L3 supervisor whose firm runs a real lifecycle sees the same template improved over months; the supervisor whose firm does not, sees the same gaps recurring on every job. Contributing to the lifecycle is part of the L3 role; the contribution is operational (feedback, near-miss logs, template suggestions) rather than authorial (writing the formal RAMS, which is usually a Qualified Supervisor / contracts manager role)."
          >
            <p>RAMS lifecycle stages:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-job survey</strong> — site walk, hazard identification, photograph, designer information.</li>
              <li><strong>Static RAMS preparation</strong> — formal document, hierarchy of control applied, controls specified.</li>
              <li><strong>Operative briefing</strong> — RAMS communicated before work starts; questions answered.</li>
              <li><strong>Dynamic assessment</strong> — first thing on site, validation against actual conditions, written record.</li>
              <li><strong>Daily briefings</strong> — short, focused, on the day&apos;s hazards and changes.</li>
              <li><strong>In-work observations</strong> — supervisor walks, checks controls in place, intervenes early on unsafe acts.</li>
              <li><strong>Near-miss capture</strong> — every near-miss logged with date / location / brief description.</li>
              <li><strong>End-of-job debrief</strong> — what worked, what did not, lessons learned.</li>
              <li><strong>Firm-level review</strong> — aggregates learnings, updates template, identifies systemic issues.</li>
              <li><strong>Template update</strong> — new RAMS reflects accumulated learnings; cycle restarts.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 3.1 — RAMS is static + dynamic. At L3 you actively engage as supervisor.",
            "L3 RA = active engagement; review, dynamic sign-off, escalate, contribute, coach.",
            "MHSWR Reg 3 suitable and sufficient judged objectively against actual conditions.",
            "Reg 5 POCMR cycle — RA is one input; running the management system is the broader duty.",
            "Dynamic patch enough for minor divergences; fresh RAMS for significant ones.",
            "L3 contributes to firm RAMS process — feedback, template improvement, writing routine RAMS.",
            "Coach L2 mates on RA through guided practice on real jobs.",
            "Scope change is the most common path to RA inadequacy; recognise and escalate.",
            "Hierarchy of control governs measure selection: eliminate / substitute / engineering / admin / PPE. PPE-only is weak.",
            "ALARP (Edwards v NCB 1949) — controls applied until further reduction is grossly disproportionate.",
            "5-step HSE framework (INDG163, withdrawn but conceptually intact) — identify / decide who harmed / evaluate / record / review.",
            "Permit-to-work formalises RAMS for high-risk tasks — live working, confined space, hot work, HV switching.",
            "Vulnerable persons (children, elderly, dementia, mobility) raise the suitable-and-sufficient bar via MHSWR Reg 3(1)(b) and Reg 19.",
            "RAMS lifecycle: survey → static → brief → dynamic → observe → near-miss → debrief → review → template update.",
          ]} />
          <Quiz title="Risk assessment as supervisor - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.4 RIDDOR specified injuries</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.6 Legal vs commercial</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
