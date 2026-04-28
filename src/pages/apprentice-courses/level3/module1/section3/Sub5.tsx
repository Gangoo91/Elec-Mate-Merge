/**
 * Module 1 · Section 3 · Subsection 5 — Safe practices and procedures: supervision
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.7
 *   AC 3.7 — "describe and demonstrate safe practices and procedures for the use of
 *            equipment and materials in the working environment"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 3.8 — safe practices and procedures
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe practices and procedures — supervision (3.7) | Level 3 Module 1.3.5 | Elec-Mate';
const DESCRIPTION = 'L3 supervision of safe practices — toolbox talks, RAMS sign-off, observation, intervention, near-miss culture and the supervisor running the safety system.';

const checks = [
  { id: 'l3-m1-s3-sub5-toolbox', question: 'What\'s a toolbox talk and why does it matter?', options: ['A talk about tools.', 'Short (10-15 min), informal, on-site briefing covering a specific safety topic relevant to current work. Required by MHSWR Reg 13 (information). Demonstrates the firm\'s ongoing engagement with safety; the operative attendance log is the evidence after an incident that the topic was communicated. L3 supervisors increasingly deliver them.', 'A meeting room.', 'A break.'], correctIndex: 1, explanation: 'Toolbox talks are the operational delivery mechanism for ongoing safety communication. Topics: hazard of the week, near-miss lesson, regulation refresh, equipment update.' },
  { id: 'l3-m1-s3-sub5-intervention', question: 'You see a colleague about to do something unsafe. What\'s the L3-grade response?', options: ['Look the other way.', 'Intervene immediately. Politely but clearly: "stop, that\'s not safe — let\'s do it differently". Don\'t wait for an incident. Document the intervention and the corrected method. If the colleague refuses to change, escalate. Intervention is part of the L3 supervisor\'s s.7(b) cooperation duty.', 'Take a photo.', 'Wait and see.'], correctIndex: 1, explanation: 'Intervention culture is what stops near-misses becoming incidents. Polite, immediate, document. The peer-to-peer challenge is harder than the boss-to-worker challenge but is increasingly normalised in good firms.' },
  { id: 'l3-m1-s3-sub5-observe', question: 'You observe an L2 mate consistently skipping the prove-test-prove step on safe isolation. What do you do?', options: ['Nothing — they\'ll learn.', '(1) Stop them safely; coach them through the correct procedure on the spot. (2) Document the observation and intervention. (3) Notify the firm\'s training / supervision lead so the L2\'s competence record can be updated. (4) Follow up — observe future jobs to confirm the correction held. Repeated non-compliance escalates to formal training intervention.', 'Tell the customer.', 'Photograph it.'], correctIndex: 1, explanation: 'Observation + intervention + documentation + follow-up. The L3 supervisor\'s coaching role is one of the most valuable safety-system contributions and one of the lowest-effort prevention activities.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal source of the "safe practices" duty?', options: ['Nowhere.', 'HASAWA s.2(2)(a) — "the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health". Plus EAWR Reg 4, MHSWR Reg 5, and the specific regulations for each work activity (PUWER, COSHH, WAH, etc).', 'BS 7671 only.', 'Customer choice.'], correctAnswer: 1, explanation: 'HASAWA s.2(2)(a) plus the daughter regs. Safe practices are required across the regulatory regime.' },
  { id: 2, question: 'What\'s a Safe System of Work (SSoW)?', options: ['Just paperwork.', 'A formal procedure resulting from systematic examination of a task to identify hazards, define safe methods to eliminate or minimise those hazards. Documented in the Method Statement portion of RAMS. Permits-to-work are a specific form of SSoW for high-hazard activity.', 'A type of cable.', 'A wiring colour.'], correctAnswer: 1, explanation: 'SSoW = the safe procedure. Permit-to-work is one form. RAMS is the documented expression. Required under HASAWA s.2(2)(a) and embedded in MHSWR Reg 5 arrangements.' },
  { id: 3, question: 'What\'s a permit-to-work?', options: ['A driving licence.', 'A formal written authorisation that defines the work to be done, the hazards, the controls, the personnel authorised, the time period, and the sign-off conditions. Used for high-hazard activity (live working, hot work, confined space, work on safety-critical systems). Issued by the issuing authority; signed-on by the operative; signed-off when complete.', 'A type of badge.', 'A coffee voucher.'], correctAnswer: 1, explanation: 'Permits formalise the SSoW for high-hazard activity. The L3 operative may be the named person on a permit; the issuing authority signs off the conditions.' },
  { id: 4, question: 'What\'s the role of toolbox talks in the safety system?', options: ['Filler.', 'Ongoing safety communication mechanism — short, on-site, topic-specific. Required under MHSWR Reg 13 (information). Attendance logged as evidence. Topics often respond to recent near-misses, regulation changes, equipment updates, or seasonal risks.', 'A coffee break.', 'A fitness check.'], correctAnswer: 1, explanation: 'Toolbox talks turn the abstract safety policy into concrete, recent, relevant communication. The attendance log is the evidence that the topic was delivered.' },
  { id: 5, question: 'What\'s the L3 supervisor\'s observation duty?', options: ['None.', 'Observe operatives at work, identify unsafe practices, intervene immediately, coach to correct method, document, follow up. The observation is not a "checking up" exercise but part of the firm\'s monitoring under MHSWR Reg 5.', 'Watch silently.', 'Report secretly.'], correctAnswer: 1, explanation: 'Observation is part of POCMR (the M = Monitor). The L3 supervisor\'s eyes on site are how the firm\'s system actually functions in practice.' },
  { id: 6, question: 'How is intervention different from "telling on" a colleague?', options: ['It isn\'t.', 'Intervention is immediate, in-the-moment, focused on the unsafe act and the correction. Done politely. Documents the act and the correction; doesn\'t embarrass or punish. Followed up if the issue recurs. The HSE expects a strong intervention culture in firms with mature safety systems.', 'Same thing.', 'Always anonymous.'], correctAnswer: 1, explanation: 'Intervention is operational; "telling on" is escalation. Both have a place; the L3 supervisor uses intervention first.' },
  { id: 7, question: 'What\'s "near-miss culture"?', options: ['A type of fashion.', 'A culture in which near-misses are reported, analysed, learned from and used to improve the system. Typically supported by no-blame reporting, structured analysis (e.g. 5-whys), feedback to the team, and visible changes in practice. Heinrich\'s pyramid frames near-misses as the leading indicator of major incidents.', 'A type of insurance.', 'A type of hat.'], correctAnswer: 1, explanation: 'Near-miss culture is the high-impact preventive practice. Firms with strong near-miss reporting have lower major-incident rates over time.' },
  { id: 8, question: 'What\'s the L3 supervisor\'s sign-off role on RAMS / SSoW?', options: ['Just a signature.', 'Verify the RAMS / SSoW matches the actual site, brief the operatives on the relevant content, confirm understanding, sign as the responsible supervisor. The signature is evidence the handover was done. Increasingly L3 contributes to writing RAMS for routine jobs.', 'Random selection.', 'Always defer.'], correctAnswer: 1, explanation: 'Sign-off is a verification act, not a formality. The L3 supervisor takes ownership for the day\'s work plan being safe.' },
];

const faqs = [
  { question: 'Are toolbox talks the same as inductions?', answer: 'No — induction = first-time entry briefing (CDM Reg 13). Toolbox talk = ongoing topic-specific briefing during the work. Both are required mechanisms.' },
  { question: 'Who can deliver a toolbox talk?', answer: 'Any competent person on the topic — usually supervisor / contracts manager / H&S manager. Increasingly L3 operatives deliver toolbox talks on routine topics they\'re competent in.' },
  { question: 'How often should toolbox talks happen?', answer: 'Frequency varies. Common rhythm: weekly on bigger sites, fortnightly otherwise; topic-driven (after near-miss, equipment change, regulation change). Records kept.' },
  { question: 'What\'s the difference between intervention and bullying?', answer: 'Intervention is task-focused, immediate, polite, focused on the unsafe act and the safe alternative. Bullying targets the person, is repeated, may be aggressive. The HSE actively encourages intervention; ACAS guidance distinguishes from bullying.' },
  { question: 'How do I document an intervention?', answer: 'Brief note in the job pack — what was happening, what I said, the correction, the follow-up. Doesn\'t need to be punitive; the focus is the safety improvement, not the colleague\'s reputation.' },
  { question: 'What if my intervention is rebuffed by the colleague?', answer: 'Document and escalate. The intervention discharged your s.7(b) duty; the colleague\'s response is now a separate issue for the supervisor / firm to address. Don\'t engage in a confrontation; let the system handle the next step.' },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 5" title="Safe practices and procedures — supervision" description="Remember from L2 — follow safe practices. At L3 you start running the safety system on a small site — toolbox talks, RAMS sign-off, observation, intervention, near-miss culture." tone="emerald" />
          <TLDR points={[
            "Safe System of Work (SSoW) is the documented safe procedure for a task. RAMS is the typical expression. Permits-to-work formalise SSoW for high-hazard activity.",
            "Toolbox talks (MHSWR Reg 13 information duty) are the ongoing on-site safety communication mechanism. L3 increasingly delivers them.",
            "Observation + intervention + documentation + follow-up is the L3 supervisor's safety-system contribution. Near-miss culture is the high-impact preventive practice.",
          ]} />
          <LearningOutcomes outcomes={[
            "Describe and demonstrate safe practices and procedures for use of equipment and materials in electrical-trade work environments.",
            "Identify the legal sources — HASAWA s.2(2)(a), EAWR Reg 4, MHSWR Reg 5, daughter regs.",
            "Apply the Safe System of Work concept and identify when permits-to-work are appropriate.",
            "Deliver and record toolbox talks per MHSWR Reg 13 information duty.",
            "Apply the L3 supervisor's observation and intervention practice on site.",
            "Recognise the value of near-miss reporting and analysis culture.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Safe System of Work (SSoW)</ContentEyebrow>
          <ConceptBlock title="The documented safe procedure" plainEnglish="A SSoW is a procedure resulting from systematic examination of a task — what are the hazards, what are the controls, what's the safe sequence, who's authorised. RAMS is the typical documented expression. Permits-to-work formalise SSoW for high-hazard activity (live working, hot work, confined space)." onSite="Every job has a SSoW even if not formally written down. The L3 supervisor's job is to make sure the SSoW is documented (RAMS), briefed (toolbox), followed (observation) and signed off (sign-on/sign-off where permits apply).">
            <p>Common electrical-trade SSoWs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Safe isolation</strong> — prove-test-prove + lock-off + tag-out (EAWR Reg 13).</li>
              <li><strong>Live working</strong> — Reg 14 three-test + permit-to-work + insulating PPE + second person.</li>
              <li><strong>Confined space entry</strong> — risk assessment + permit + atmosphere monitoring + rescue plan + standby person.</li>
              <li><strong>Hot work</strong> — permit + fire watch + extinguisher + cooling-off period.</li>
              <li><strong>Working at height</strong> — WAH risk assessment + collective protection + harness as last resort.</li>
              <li><strong>Excavation / underground services</strong> — service detection + safe digging method + permits if appropriate.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.2(2)(a)" clause={<>"Without prejudice to the generality of an employer&apos;s duty under the preceding subsection, the matters to which that duty extends include in particular — (a) the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."</>} meaning={<>The legal source of the SSoW duty. &quot;Systems of work&quot; is the umbrella term for the documented safe procedures. SFAIRP applies — the duty is to make them as safe as reasonably practicable.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.2 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Toolbox talks and information duty</ContentEyebrow>
          <ConceptBlock title="MHSWR Reg 13 — the information duty operationalised" plainEnglish="Reg 13 requires the employer to provide employees with comprehensible and relevant information on H&S risks identified by the assessment, the preventive and protective measures, and procedures referred to in MHSWR Reg 8. Toolbox talks are the standard delivery mechanism." onSite="A 10-minute talk before work starts on Monday morning, on the topic most relevant to the week's work (silica dust this week, working at height next week, near-miss from last week's job the week after). Attendance log signed; topic noted; any actions captured.">
            <p>Effective toolbox-talk topics for an electrical contractor:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Recent near-miss from this team / firm.</li>
              <li>Seasonal hazards (winter — slip, ice, dark; summer — heat in lofts).</li>
              <li>Equipment update (new RCD tester, new harness model).</li>
              <li>Regulation change (BS 7671 amendment, BSA 2022 update).</li>
              <li>Specific high-hazard activity due this week.</li>
              <li>Customer / client-specific procedures (hospital site, school site).</li>
              <li>Refresh on basics that are showing slippage (PPE compliance, near-miss reporting).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 13(1) (Capabilities and training)" clause={<>"Every employer shall, in entrusting tasks to his employees, take into account their capabilities as regards health and safety. Every employer shall ensure that his employees are provided with adequate health and safety training — (a) on their being recruited into the employer&apos;s undertaking; and (b) on their being exposed to new or increased risks because of — (i) their being transferred or given a change of responsibilities within the employer&apos;s undertaking, (ii) the introduction of new work equipment into or a change respecting work equipment already in use within the employer&apos;s undertaking, (iii) the introduction of new technology into the employer&apos;s undertaking, or (iv) the introduction of a new system of work into or a change respecting a system of work already in use within the employer&apos;s undertaking."</>} meaning={<>Reg 13 is the training duty (companion to the information duty in Reg 10). Toolbox talks discharge ongoing training as work changes. The capability assessment under Reg 13(1) is what the L3 supervisor does informally every time they brief a team.</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 13 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Observation, intervention and near-miss culture</ContentEyebrow>
          <ConceptBlock title="Eyes on site = system in practice" plainEnglish="The L3 supervisor's observation is what turns the written safety policy into actual on-site protection. Watch operatives at work; spot unsafe practices; intervene immediately; coach to the safe method; document; follow up. Not surveillance — operational monitoring under MHSWR Reg 5 (the M in POCMR)." onSite="The L3 supervisor's value isn't issuing PPE or signing RAMS; it's the moment-to-moment intervention that prevents the next incident. Polite, immediate, focused on the act and the safe alternative. Builds the team's habit of noticing.">
            <p>Intervention in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>See the unsafe act → speak immediately, calmly: &quot;stop, that&apos;s not safe — let&apos;s do it this way&quot;.</li>
              <li>Coach the safe method on the spot — show, don&apos;t just tell.</li>
              <li>Confirm the operative understood and will continue safely.</li>
              <li>Note in the job pack: time, situation, intervention, correction.</li>
              <li>If the issue is likely to recur, follow up next day / next week.</li>
              <li>If repeated non-compliance, escalate to the firm&apos;s training / H&amp;S lead for formal action.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Near-miss culture" plainEnglish="Near-misses (events that could have caused injury but didn't) are the leading indicator of where the next incident will happen. Reporting, analysing and learning from them is the highest-impact preventive practice. Heinrich's pyramid (300:30:1 near-misses to minor to serious) frames the proportionality." onSite="L3 supervisors model the behaviour: report your own near-misses, encourage colleagues to report theirs, treat reports without blame, feed back lessons to the team, visibly change practice when learning emerges. The culture is built one report at a time.">
            <p>Elements of a strong near-miss culture:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No-blame reporting environment.</li>
              <li>Easy reporting mechanism (form, app, verbal-then-logged).</li>
              <li>Structured analysis (5-whys, simple root-cause).</li>
              <li>Feedback to the team — &quot;here&apos;s what we learned&quot;.</li>
              <li>Visible changes in practice driven by lessons.</li>
              <li>Celebrate reporting (the report, not the near-miss itself).</li>
              <li>Trend tracking — what categories are emerging?</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Permits, behavioural safety and incident learning</ContentEyebrow>
          <ConceptBlock title="Permit-to-work — formalising the SSoW for high-hazard activity" plainEnglish="A permit is a written authorisation that defines work scope, hazards, controls, named personnel, time period and sign-off conditions. Used for live working (EAWR Reg 14), confined space, hot work, work on safety-critical systems, multi-source isolation. Issued by the Issuing Authority; signed-on by the operative; signed-off when complete and safe to restore." onSite="The L3 may be the named operative on a permit. Read it carefully before sign-on; query anything unclear; refuse to sign if the conditions don&apos;t match the actual site. The permit is the legal record; signing accepts the conditions.">
            <p>Permit components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Work description</strong> — precise scope; what&apos;s in, what&apos;s out.</li>
              <li><strong>Location</strong> — specific equipment / area.</li>
              <li><strong>Hazards identified</strong> — energy sources, substances, environmental.</li>
              <li><strong>Isolation / control measures</strong> — what&apos;s done, by whom, when.</li>
              <li><strong>Named personnel</strong> — operatives authorised; competence verified.</li>
              <li><strong>PPE specified</strong> — required kit for this work.</li>
              <li><strong>Time period</strong> — start, end, validity (often shift-bounded).</li>
              <li><strong>Issuing Authority</strong> — competent person who controls the permit.</li>
              <li><strong>Sign-on</strong> — operative confirms understanding and acceptance.</li>
              <li><strong>Sign-off</strong> — work complete; equipment safe to restore.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Behavioural safety — the &apos;just do it&apos; layer above procedure" plainEnglish="Procedure tells you WHAT to do; behavioural safety addresses WHY operatives sometimes don&apos;t do it. Time pressure, peer pressure, complacency from familiarity, fear of looking incompetent, fatigue. Mature safety cultures address behaviour as well as procedure." onSite="The L3 supervisor has more behavioural influence than they realise. Visibly modelling safe behaviour, calling out shortcuts (your own and others&apos;), treating safety as the first priority not the &apos;tick after I get the work done&apos; — all shape what the team does when no-one&apos;s watching.">
            <p>Common behavioural failure modes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time pressure</strong> — \&quot;skip step to make the deadline\&quot;.</li>
              <li><strong>Peer pressure</strong> — \&quot;everyone else is doing it this way\&quot;.</li>
              <li><strong>Complacency</strong> — \&quot;done this 1000 times, it&apos;s fine\&quot;.</li>
              <li><strong>Fear of looking incompetent</strong> — won&apos;t ask, won&apos;t check.</li>
              <li><strong>Fatigue</strong> — late shift, long week, judgement degraded.</li>
              <li><strong>Goal conflict</strong> — production targets vs safety conscience.</li>
              <li><strong>Optimism bias</strong> — \&quot;won&apos;t happen to me\&quot;.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Incident investigation — root cause and lessons learned" plainEnglish="After any incident or significant near-miss, structured investigation. Not blame-finding — fact-finding and learning. Common methods: 5-whys (drill down through causation chain), fishbone diagram (Ishikawa, multiple contributing categories), Swiss cheese model (multiple barrier failures aligned). Output: lessons learned, action plan, system change." onSite="The L3 supervisor often contributes to investigations as the closest competent observer. Provide contemporaneous account; participate in 5-whys; help identify the system change that prevents recurrence. The lessons should travel through the firm — not just stay in the file.">
            <p>5-whys example for a near-miss:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>What happened</strong> — operative received shock from supposedly-isolated circuit.</li>
              <li><strong>Why 1</strong> — circuit was live when operative touched it.</li>
              <li><strong>Why 2</strong> — voltage indicator gave false dead reading.</li>
              <li><strong>Why 3</strong> — indicator&apos;s battery was low; second-prove step skipped.</li>
              <li><strong>Why 4</strong> — operative under time pressure; \&quot;just one circuit\&quot; mindset.</li>
              <li><strong>Why 5</strong> — supervisor brief framed the day&apos;s plan as \&quot;quick run-through\&quot; setting wrong tone.</li>
              <li><strong>Action</strong> — reframe brief language; reinforce procedure non-negotiables; battery check on indicators issued.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Heinrich&apos;s pyramid and the leading-indicator principle" plainEnglish="Heinrich&apos;s 1931 study suggested a ratio of ~300 near-misses : 30 minor injuries : 1 serious / fatal. The exact numbers debated since; the principle stands — near-misses are leading indicators, fatal incidents are lagging. Acting on near-misses prevents the rarer events." onSite="Firms that focus only on lost-time injury statistics miss the leading indicators. The L3 supervisor encouraging near-miss reporting (and the firm&apos;s response to those reports) is what shifts the safety culture from reactive to preventive.">
            <p>Leading vs lagging indicators:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Leading (predictive)</strong> — near-misses, observation findings, intervention rates, training currency, audit scores.</li>
              <li><strong>Lagging (reactive)</strong> — lost-time injuries, RIDDOR reports, prosecutions, claim costs.</li>
              <li>Mature safety systems track both; lead with leading indicators.</li>
              <li>Reporting culture is THE leading indicator that predicts everything else.</li>
              <li>Heinrich&apos;s exact ratios disputed; the principle (frequent low-severity events precede rare serious ones) holds.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Provision and Use of Work Equipment Regulations 1998 — Reg 4(1)" clause={<>"Every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided."</>} meaning={<>PUWER Reg 4 sits behind every SSoW that involves work equipment. The L3 supervisor verifying that the access platform, the cable puller, the rotary hammer, the multi-function tester or the test lead set is suitable for THIS job is discharging Reg 4 in practice. Suitability covers initial selection (Reg 4), ergonomic position (Reg 4(3)), specific risks (Reg 7), instructions (Reg 8) and inspection (Reg 6) — all converging in the toolbox-talk and pre-use check.</>} cite="Source: Provision and Use of Work Equipment Regulations 1998 (SI 1998/2306), Reg 4 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Watching unsafe practice and not intervening" whatHappens={<>L3 supervisor sees an L2 mate skipping safe-isolation steps; doesn&apos;t intervene because &quot;they&apos;ll learn&quot;. Two weeks later the L2 has a shock from a circuit they assumed was isolated. HSE prosecution; firm under EAWR Reg 13/16; L3 supervisor under HASAWA s.7 (failure to intervene where they had the duty to do so).</>} doInstead={<>Intervene immediately. Coaching is part of the s.7(b) co-operation duty. Failure to intervene where you saw the unsafe act AND had the responsibility to act is a personal s.7 failure.</>} />

          <CommonMistake title="Treating toolbox talks as a tick-box exercise" whatHappens={<>Firm runs &quot;toolbox talk&quot; by reading out a generic page from a folder; no engagement; no Q&amp;A; attendance signed but no understanding tested. Inspector reviews after near-miss; sees the talks happened on paper but operatives can&apos;t recall content; concludes information duty not effectively discharged.</>} doInstead={<>Make talks relevant — recent near-miss, this week&apos;s work, recent regulation change. Encourage Q&amp;A. Test understanding informally (&quot;so what would you do if X?&quot;). Records reflect what was actually discussed.</>} />

          <Scenario title="Running the safety system on a small fit-out" situation={<>You're leading a team of two L2 apprentices and one mate on a 5-day commercial small-power install. Day 1 you arrive on site with the customer-issued construction phase plan and your firm\'s RAMS. The customer\'s site induction is complete. You need to run the safety system for the project.</>} whatToDo={<>Day 1: 15-minute briefing — walk through RAMS with the team, identify the day&apos;s tasks, brief on key hazards (cable pulls through tight ceiling void today), confirm everyone has the right PPE, brief location of first-aid kit and AED, brief emergency procedure. Document attendance. Day 1 end: 5-minute debrief — anything go wrong today? Any near-miss? What&apos;s tomorrow look like? Day 2: short toolbox talk topic relevant to the day&apos;s work (working at height because tomorrow involves the upper-level cable runs) — 10 minutes; then on with the work. Throughout the day: observation. Spot the L2 reaching for tools without checking the platform was stable; intervene calmly; coach. Document. Mid-week: review of any near-misses; brief the team on lessons. End of week: written close-out summary feeding back to firm&apos;s safety system. Throughout: maintain attendance logs, RAMS sign-offs, near-miss log entries. The system runs through you, not despite you.</>} whyItMatters={<>This is what L3 supervisor work actually looks like in practice. The RAMS, toolbox talks, observation, intervention and documentation aren&apos;t separate activities — they&apos;re one integrated system that the L3 supervisor runs. Each individual element is small (5-15 minutes); together they are how the firm&apos;s safety policy becomes actual on-site protection. The HSE inspector reviewing your project records months later sees the integrated system or sees a paper trail with no substance behind it.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — follow safe practices. At L3 you run the system.",
            "HASAWA s.2(2)(a) requires safe systems of work. RAMS is the typical documented expression. Permits-to-work formalise SSoW for high-hazard.",
            "Common electrical SSoWs: safe isolation, live working (Reg 14 permit), confined space, hot work, working at height, excavation.",
            "Toolbox talks (MHSWR Reg 13) are the ongoing safety communication mechanism. L3 increasingly delivers them.",
            "Observation + intervention + documentation + follow-up is the L3 supervisor\'s safety-system contribution.",
            "Near-miss culture is the high-impact preventive practice. No-blame reporting, structured analysis, feedback, visible changes.",
            "RAMS sign-off is a verification act — confirm fit to site, brief team, sign as responsible supervisor.",
            "The system runs through you, not despite you. Each element is small; together they ARE the safety system in practice.",
          ]} />
          <Quiz title="Safe practices and procedures — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.4 First-aid facilities</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.6 Safe isolation supervision</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
