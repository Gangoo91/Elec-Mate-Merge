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
  { id: 'l3-m1-s5-sub5-supervisor', question: 'What\'s the L3 supervisor add over L2 RA?', options: ['Same.', 'Reviewing the static RAMS, signing off the dynamic version, deciding when conditions diverge enough to need a fresh RAMS, contributing to writing RAMS for routine jobs, coaching L2 mates through assessment.', 'Less.', 'Random.'], correctIndex: 1, explanation: 'L3 = reviewer / signer / decider / contributor / coach. L2 = follower.' },
  { id: 'l3-m1-s5-sub5-suitable', question: 'How is "suitable and sufficient" judged?', options: ['By gut feel.', 'By reference to the actual hazards present, the controls implemented, and whether industry good practice (HSG guidance, BS 7671 etc) was followed. The HSE inspector after an incident asks: did this RA engage with the actual conditions?', 'By colour.', 'By price.'], correctIndex: 1, explanation: 'Objective test against actual conditions and good practice. Templates that don\'t engage fail the test.' },
  { id: 'l3-m1-s5-sub5-conflict', question: 'What if the static RAMS and the dynamic conditions clearly conflict?', options: ['Use static anyway.', 'Stop. Write a fresh dynamic assessment that supplements the RAMS. If divergences are significant, escalate for a fresh RAMS rather than try to manage on the fly. Document the decision.', 'Use neither.', 'Customer decides.'], correctIndex: 1, explanation: 'Significant divergence = escalate. Don\'t paper over with a tweaked dynamic assessment.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the L3 supervisor RA mindset?', options: ['Compliance tick.', 'Active engagement — does the RAMS match the site? Are the controls in place AND working? Is anyone slipping? What\'s changed since last visit? The mindset is operational, not paperwork.', 'Random.', 'Customer-led.'], correctAnswer: 1, explanation: 'Active engagement; operational mindset; verification not just compliance.' },
  { id: 2, question: 'What\'s the legal source of the RA duty?', options: ['BS 7671.', 'MHSWR 1999 Reg 3 — every employer makes a "suitable and sufficient" assessment of risks to employees and non-employees. 5+ employees = recording mandatory.', 'Customer ask.', 'Council bylaws.'], correctAnswer: 1, explanation: 'Reg 3 is the statutory hook.' },
  { id: 3, question: 'What\'s the Reg 5 link?', options: ['No link.', 'MHSWR Reg 5 — effective arrangements for planning, organising, controlling, monitoring, reviewing the preventive measures (POCMR). RA is one input; Reg 5 runs the system that operationalises it.', 'Same as Reg 3.', 'Random.'], correctAnswer: 1, explanation: 'Reg 3 = assess. Reg 5 = run the system. POCMR cycle.' },
  { id: 4, question: 'How does the L3 supervisor verify "suitable and sufficient"?', options: ['Take the customer\'s word.', 'Compare RAMS to actual site conditions; check controls are in place; observe operatives; ask &quot;could anyone reading this assessment understand the hazards and controls?&quot;; verify any HSE / industry guidance has been considered.', 'Random.', 'Customer-led.'], correctAnswer: 1, explanation: 'Verification by comparison and observation. Templates that fail the &quot;could anyone reading this understand?&quot; test fail suitable and sufficient.' },
  { id: 5, question: 'What\'s the role of HSE INDG163 (5 steps)?', options: ['Just guidance.', 'Withdrawn but still the conceptual basis — Identify hazards / Decide who might be harmed / Evaluate risks / Record significant findings / Review. Practical structure for any RA.', 'Mandatory law.', 'Customer doc.'], correctAnswer: 1, explanation: '5 steps remain the conceptual structure even though INDG163 itself withdrawn.' },
  { id: 6, question: 'When should L3 escalate for a fresh RAMS rather than tweak the dynamic?', options: ['Never.', 'When divergences from the original RAMS are significant — different conditions, different hazards, different occupancy, different scope. Tweaking is for minor divergences; fresh RAMS for significant ones.', 'Always.', 'Random.'], correctAnswer: 1, explanation: 'Significant divergence = fresh RAMS. Tweaking only for minor.' },
  { id: 7, question: 'What\'s the L3 contribution to the firm\'s RAMS process?', options: ['Nothing.', 'Feedback from site (what\'s actually working / not); contribution to writing RAMS for routine jobs; review of generic templates; coaching of L2 mates on dynamic assessment; near-miss data feeding the next RAMS update.', 'Customer service.', 'Sales.'], correctAnswer: 1, explanation: 'L3 increasingly contributes to the firm\'s RAMS process. Site experience feeds template improvement.' },
  { id: 8, question: 'How does the L3 supervisor coach L2 mates on RA?', options: ['Tell them.', 'Walk them through hazard identification on real jobs; ask "what hazards do you see here?"; explain reasoning behind controls; show them how to write a dynamic assessment note; review their attempts; correct calibration over time.', 'Random.', 'Read aloud.'], correctAnswer: 1, explanation: 'Coaching by guided practice. Building L2 RA capability is part of the L3 supervisor contribution.' },
];

const faqs = [
  { question: 'Is dynamic risk assessment formal documentation required?', answer: 'A short written record (job pack note, app entry, dated and timed) is enough. The format isn\'t prescribed; the existence of a contemporaneous record is what matters.' },
  { question: 'What if no fresh RAMS can be obtained on the day?', answer: 'Don\'t proceed with significant work that the existing RAMS doesn\'t cover. Escalate to firm. Contained portions of the work that ARE covered may proceed if cleanly separable; the rest waits.' },
  { question: 'Can the L3 sign off the firm\'s RAMS?', answer: 'Sign-off authority varies by firm. L3 typically signs the dynamic assessment and may contribute to / sign minor RAMS for routine jobs. Major RAMS sign-off usually held by Qualified Supervisor / contracts manager.' },
  { question: 'What if the customer pushes back on a RAMS-driven decision?', answer: 'Explain the basis briefly; document the conversation; escalate to contracts manager if the customer persists. The RAMS isn\'t negotiable on safety grounds; commercial concerns are for the contracts manager to handle.' },
  { question: 'How does the L3 use near-miss data in RA?', answer: 'Near-misses are leading indicators of where the next incident will occur. Feed near-miss data into the next RAMS review — &quot;these hazards have been identified in practice, so RAMS should address them more directly&quot;.' },
  { question: 'What\'s the relationship between RAMS and the CDM construction phase plan?', answer: 'CPP is project-level; RAMS is task-level. CPP may reference RAMS. Both required where CDM applies. CPP minimum content per CIS80 template; RAMS per task.' },
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
            "MHSWR Reg 3 \"suitable and sufficient\" is judged objectively against actual conditions and good practice.",
            "Reg 5 POCMR cycle - RA is one input; running the system is the broader supervisor duty.",
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

          <RegsCallout source="MHSWR 1999 — Reg 3(1)" clause={<>&quot;Every employer shall make a suitable and sufficient assessment of - (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking.&quot;</>} meaning={<>The umbrella RA duty. Same scope as HASAWA s.2 + s.3 combined. &quot;Suitable and sufficient&quot; judged objectively - did it engage with actual hazards and reflect industry good practice?</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 3 - verbatim from legislation.gov.uk." />

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

          <RegsCallout source="MHSWR 1999 — Reg 4 (Principles of prevention)" clause={<>&quot;Where an employer implements any preventive and protective measures he shall do so on the basis of the principles specified in Schedule 1 to these Regulations.&quot;</>} meaning={<>Reg 4 cross-refers to Schedule 1 which sets out the nine principles of prevention. These are essentially the hierarchy of control plus collective-over-individual measures, training, and worker involvement. The L3 supervisor uses the Schedule 1 principles when selecting controls from the RA outputs.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 4 + Schedule 1 — verbatim from legislation.gov.uk." />

          <RegsCallout source="MHSWR 1999 — Reg 5 (Health and safety arrangements)" clause={<>&quot;Every employer shall make and give effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures.&quot;</>} meaning={<>The POCMR cycle — Planning, Organisation, Control, Monitoring, Review. Reg 5 runs the management system that operationalises the Reg 3 risk assessment. Five-employee threshold for written arrangements. The L3 supervisor&apos;s active engagement with RAMS is the operational expression of Reg 5 in daily work.</>} cite="Source: MHSWR 1999 (SI 1999/3242), Reg 5 — verbatim from legislation.gov.uk." />

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
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 3.1 - RAMS is static + dynamic. At L3 you actively engage as supervisor.",
            "L3 RA = active engagement; review, dynamic sign-off, escalate, contribute, coach.",
            "MHSWR Reg 3 \"suitable and sufficient\" judged objectively against actual conditions.",
            "Reg 5 POCMR cycle - RA is one input; running the management system is the broader duty.",
            "Dynamic patch enough for minor divergences; fresh RAMS for significant ones.",
            "L3 contributes to firm RAMS process - feedback, template improvement, writing routine RAMS.",
            "Coach L2 mates on RA through guided practice on real jobs.",
            "Scope change is the most common path to RA inadequacy; recognise and escalate.",
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
