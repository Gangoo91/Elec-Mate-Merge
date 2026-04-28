/**
 * Module 1 · Section 3 · Subsection 6 — Safe isolation supervision and EAWR Reg 13
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.8 + AC 3.9
 *   AC 3.8 — "specify and demonstrate the procedures for ensuring electrical systems
 *            are safe to work on"
 *   AC 3.9 — "state the implications of carrying out safe isolation procedures and not
 *            carrying out safe isolation procedures"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe isolation supervision and EAWR Reg 13 (3.8 / 3.9) | Level 3 Module 1.3.6 | Elec-Mate';
const DESCRIPTION = 'L3 supervision of safe isolation — auditing the L2 procedure, EAWR Reg 13 implications, and what happens (legally and practically) when isolation goes wrong.';

const checks = [
  { id: 'l3-m1-s3-sub6-procedure', question: 'L2 mate is about to start safe isolation. What\'s the L3-grade observation list?', options: ['Just trust them.', 'Verify: (1) approved voltage indicator (GS38) selected; (2) test on a known live source first (prove); (3) tested on the conductors to be isolated (test); (4) re-test on the known live source (prove again); (5) lock-off device fitted; (6) tag-out / warning notice; (7) keys held by the operative who locked it; (8) re-check before starting work. Six-step procedure all present.', 'Wave hi.', 'Take a coffee break.'], correctIndex: 1, explanation: 'Remember from L2 — prove-test-prove + lock-off + tag-out. The L3 supervisor verifies the procedure is followed every time, not just on Mondays.' },
  { id: 'l3-m1-s3-sub6-implications', question: 'What are the legal implications of NOT carrying out safe isolation?', options: ['None.', 'EAWR Reg 13 breach (failure to take adequate precautions). EAWR Reg 14 breach (de facto live working without the three-test). HASAWA s.2 / s.3 / s.7 breaches. RIDDOR if injury. Insurance void. Personal HASAWA s.7 prosecution. Firm prosecution. The cascade is severe and well-documented in HSE prosecution case law.', 'Just a warning.', 'Free pizza.'], correctIndex: 1, explanation: 'The implications are legal (multiple Acts), commercial (insurance, contracts), reputational (public register) and personal (s.7). Not isolating is one of the most-prosecuted electrical safety failures.' },
  { id: 'l3-m1-s3-sub6-audit', question: 'You\'re auditing the firm\'s isolation practice across teams. What\'s the L3 supervisor\'s primary metric?', options: ['Number of locks bought.', 'Compliance with the six-step procedure on every job, every time. Audit by observation (visiting jobs unannounced or scheduled), record review (locks, voltage indicators in date and tested), training records (operatives current on procedure), incident / near-miss data (any events related to isolation failure). Trend tracked; intervention where slippage is seen.', 'Speed of work.', 'Customer satisfaction.'], correctIndex: 1, explanation: 'Audit is the verification that the documented procedure is the actual practice. Observation is the gold standard; records and training are supporting evidence.' },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the EAWR Reg 13 duty?', options: ['Wear PPE.', 'Adequate precautions to prevent equipment which has been made dead from becoming electrically charged during the work, if danger may thereby arise. In practice: lock-off, tag-out, prove-test-prove, control of the isolation point.', 'Make tea.', 'Take photos.'], correctAnswer: 1, explanation: 'Reg 13 is the legal hook for safe isolation. Compliance = the six-step procedure.' },
  { id: 2, question: 'What\'s the prove-test-prove procedure?', options: ['One test only.', '(1) PROVE the voltage indicator works on a known live source (proving unit OR a known live circuit). (2) TEST the conductors to be isolated — line-to-earth, line-to-neutral, line-to-line, neutral-to-earth. (3) PROVE the voltage indicator works AGAIN on the same known live source. Confirms the indicator wasn\'t faulty during the test.', 'Test once.', 'Trust the breaker.'], correctAnswer: 1, explanation: 'Prove-test-prove guards against indicator failure giving a false dead reading. Skipping the second prove is a common shortcut and a common cause of incidents.' },
  { id: 3, question: 'What\'s a "GS38" voltage indicator?', options: ['A type of cable.', 'A voltage indicator that complies with HSE Guidance Note GS38 — purpose-built for proving dead, not a multimeter. Features: physically robust, non-current-limiting fuse, finger barriers, suitable probes, low loop impedance through the indicator. A multimeter on the wrong setting can give a false dead reading; GS38 indicators are designed to fail safe.', 'A wiring colour.', 'A type of socket.'], correctAnswer: 1, explanation: 'GS38 is the HSE guidance for selection and use of test instruments and probes. Voltage indicators meeting GS38 are the appropriate tool for proving dead.' },
  { id: 4, question: 'What\'s the lock-off and tag-out procedure?', options: ['Padlock anything.', 'Each operative working on the isolated circuit fits their own lock to the isolation point (or to a hasp / multi-lock if multiple operatives). Tag identifies the operative, the circuit, the date / time, and the work. Lock removed only by the operative who fitted it (and only when their work is complete and safe to re-energise).', 'No need.', 'Customer holds the key.'], correctAnswer: 1, explanation: 'Lock-off + tag-out is per-operative. Each operative\'s lock means that operative controls when the supply can be restored. Multi-lock hasps allow multiple operatives on one isolation point.' },
  { id: 5, question: 'What\'s the implication of bypassing safe isolation?', options: ['Faster work.', 'EAWR Reg 13/14 breach; HASAWA s.2/3/7 breach; potential RIDDOR; insurance void; personal prosecution; firm prosecution; reputational damage on HSE Public Register; possible JIB / scheme-body deregistration; criminal record for individuals at director level under s.37.', 'No issue.', 'Customer praise.'], correctAnswer: 1, explanation: 'The implication cascade is severe across legal, commercial and personal dimensions. Bypassing is one of the lowest-effort, highest-consequence safety failures.' },
  { id: 6, question: 'What\'s the L3 supervisor\'s role in safe isolation?', options: ['Watch silently.', 'Verify the procedure is followed on every job — observation, audit, record review. Intervene immediately if shortcuts are seen. Coach junior operatives through the procedure until competent. Update the firm\'s training record. Escalate persistent non-compliance.', 'Sign and forget.', 'Replace operatives.'], correctAnswer: 1, explanation: 'L3 supervisor = procedure custodian. The personal responsibility for ensuring isolation actually happens, not just that it\'s on paper.' },
  { id: 7, question: 'What\'s a "permit-to-work" in the isolation context?', options: ['Customer permission.', 'A formal written authorisation that defines the isolation, the work to be done, the personnel authorised, the time period, and the sign-off conditions. Used for high-hazard or complex isolations (multiple sources, large industrial sites, safety-critical systems). Issued by the issuing authority; signed-on by the operative; signed-off when complete and safe to re-energise.', 'A type of cert.', 'A driving licence.'], correctAnswer: 1, explanation: 'Permits formalise the isolation procedure for higher-hazard scenarios. The L3 operative may be the named person on a permit.' },
  { id: 8, question: 'What does HSG85 cover?', options: ['Wiring colours.', 'HSE guidance "Electricity at Work — Safe Working Practices". Detailed practitioner guidance on EAWR compliance including isolation procedures, live working defences, competence and supervision. The non-statutory companion to EAWR.', 'Battery types.', 'Customer service.'], correctAnswer: 1, explanation: 'HSG85 is the practitioner reference. Knowing it exists and what it covers is L3-essential.' },
];

const faqs = [
  { question: 'Can I rely on the customer\'s isolation device alone?', answer: 'No. Use your own lock; verify the customer\'s isolation independently. The customer\'s isolation may be operated by someone else; your own lock keeps you in control.' },
  { question: 'What if there\'s no built-in isolation point?', answer: 'Withdrawal of the supplier\'s main fuse with the DNO\'s consent (DNO controls cut-out fuses); installation of a temporary isolation device; or escalation to a different isolation strategy. Do not work without isolation.' },
  { question: 'How do I test a multi-source circuit (PV, generator backup, UPS)?', answer: 'Identify ALL sources before starting. Isolate each one. Lock and tag each isolation point. Apply prove-test-prove from all directions. PV in particular can back-feed during daylight even with the AC isolated; check DC isolation too.' },
  { question: 'What\'s the role of the voltage indicator beyond proving dead?', answer: 'Confirming neutral integrity (N-E reading), checking for parasitic voltages, identifying mis-wired returns. The indicator is a diagnostic tool as well as a safety device; trained use is part of L3 competence.' },
  { question: 'Are battery-powered "test pens" suitable for proving dead?', answer: 'No — most test pens are not GS38 compliant. They can give false readings (capacitive coupling can light a non-contact pen on a dead conductor; conversely a low-battery pen may not light on a live one). Use a proper GS38 voltage indicator with a separate proving unit or known live source.' },
  { question: 'How does the L3 supervisor verify training is current?', answer: "Firm's training matrix tracks operatives' EAWR / safe-isolation training; refreshers typically every 2-3 years. Practical observation periodically confirms the procedure is being followed correctly. Combine record review + observation." },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 6" title="Safe isolation supervision and EAWR Reg 13" description="Remember from L2 — prove-test-prove, lock-off, tag-out. At L3 you supervise the procedure, audit it across the team, and explain the implications when it goes wrong." tone="emerald" />
          <TLDR points={[
            "EAWR Reg 13 is the legal hook for safe isolation. Compliance = six-step procedure: prove voltage indicator, test conductors, prove indicator again, lock-off, tag-out, re-check before work.",
            "GS38-compliant voltage indicator + known live source / proving unit. Multimeter on wrong setting can give false dead.",
            "Implications of bypass: EAWR + HASAWA + RIDDOR + insurance void + personal s.7 + s.37 director liability + reputational damage on HSE Public Register.",
          ]} />
          <LearningOutcomes outcomes={[
            "Specify and demonstrate the procedures for ensuring electrical systems are safe to work on.",
            "State the implications of carrying out safe isolation procedures and NOT carrying them out.",
            "Apply EAWR Reg 13 and HSG85 in practice.",
            "Audit the safe isolation procedure across a team — observation, record review, training currency.",
            "Recognise multi-source isolation requirements (PV, generator, UPS, dual feed).",
            "Identify when a permit-to-work formalises the isolation for higher-hazard scenarios.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The six-step procedure</ContentEyebrow>
          <ConceptBlock title="Prove-test-prove + lock-off + tag-out + re-check" plainEnglish="The six steps: (1) prove the voltage indicator on a known live source; (2) test the conductors to be isolated; (3) prove the indicator again on the same known live source; (4) fit lock-off device to the isolation point; (5) attach tag identifying operative, circuit, time, work; (6) re-check before starting work. Repeat after any break in the work." onSite="Each step has a purpose. Skipping any one of them creates a failure mode. The L3 supervisor\'s job is to verify all six on every job — observation in the moment, record review afterwards.">
            <p>Why each step matters:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1 (prove)</strong> — confirms voltage indicator is working before relying on it.</li>
              <li><strong>Step 2 (test)</strong> — confirms the conductors are dead.</li>
              <li><strong>Step 3 (prove again)</strong> — confirms the indicator didn&apos;t fail during step 2.</li>
              <li><strong>Step 4 (lock-off)</strong> — physical barrier to re-energisation.</li>
              <li><strong>Step 5 (tag-out)</strong> — identifies who locked it, why, when, what work.</li>
              <li><strong>Step 6 (re-check)</strong> — guards against intervening events between isolation and work start.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="EAWR 1989 — Reg 13" clause={<>"Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during the work if danger may thereby arise."</>} meaning={<>The legal hook for safe isolation. &quot;Adequate precautions&quot; = the six-step procedure in practice. Lock-off and tag-out are how the regulation is discharged. Skipping them is a Reg 13 breach regardless of whether re-energisation actually occurred — the duty is on the precautions, not on the outcome.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 13 — verbatim from legislation.gov.uk." />

          <RegsCallout source="HSE Guidance Note GS38" clause={<>HSE guidance on the selection and use of test instruments and leads — voltage indicators must be: purpose-designed for the application, robust, with non-current-limiting fuses, finger barriers, suitable probe shrouding, and able to fail safe (false-dead reading not credible).</>} meaning={<>GS38 is non-statutory but is treated as the practitioner standard. Voltage indicators meeting GS38 are the appropriate tool for proving dead. A general-purpose multimeter is NOT GS38 compliant; it can give false dead readings if set to the wrong range.</>} cite="Source: HSE Guidance Note GS38 — Electrical test equipment for use on low voltage electrical systems — published by HSE." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Implications of compliance and non-compliance</ContentEyebrow>
          <ConceptBlock title="What happens when isolation is done right" plainEnglish="Compliance with EAWR Reg 13 = legal duty discharged on the isolation point. Operative protected from re-energisation. Firm\'s defence position strong. Insurance valid. Reputation intact. Audit trail clean." onSite="The cost of doing it right is small (5-10 minutes per circuit, plus equipment). The cost of doing it wrong is enormous. Done-right is the default for L3 operatives.">
            <p>Positive implications of compliant isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Personal protection from electric shock.</li>
              <li>EAWR Reg 13 duty discharged.</li>
              <li>HASAWA s.2/3/7 protected.</li>
              <li>Insurance cover preserved.</li>
              <li>Defensible position if any incident occurs (your evidence is solid).</li>
              <li>Customer / client confidence — they can see professional practice.</li>
              <li>Apprentices learn correct method by seeing it modelled.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What happens when isolation is bypassed" plainEnglish="Non-compliance with EAWR Reg 13 cascades: regulatory breach, prosecution risk, RIDDOR if injury, insurance void, reputational damage on the HSE Public Register, scheme-body deregistration risk, personal s.7 / s.37 prosecution. The HSE prosecutes isolation-failure cases harshly because the consequences are usually fatal." onSite="The cascade is real. Multiple cases on the HSE Public Register show firms and operatives prosecuted for isolation bypass; many cases include custodial sentences for directors under s.37.">
            <p>Negative implications of non-compliant isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk of electric shock — typically fatal in commercial DBs and switchgear.</li>
              <li>EAWR Reg 13 + Reg 14 breach (de facto live working).</li>
              <li>HASAWA s.2 / s.3 / s.7 breach.</li>
              <li>RIDDOR if injury — F2508 + immediate phone for specified injury.</li>
              <li>Insurance void — PI / EL won&apos;t cover wilful safety breach.</li>
              <li>Sentencing Council Definitive Guideline applies.</li>
              <li>Personal prosecution under s.7 and (for directors) s.37.</li>
              <li>Reputational damage on HSE Public Register — lost contracts, framework disqualification.</li>
              <li>Scheme-body (NICEIC / NAPIT) deregistration risk.</li>
              <li>Civil liability to injured persons.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Audit and supervision</ContentEyebrow>
          <ConceptBlock title="L3 audit of the isolation procedure" plainEnglish="The L3 supervisor verifies the documented procedure is the actual practice. Methods: observation on jobs (planned and unannounced); record review (locks, voltage indicators, calibration, training); incident / near-miss data review; equipment audit." onSite="Audit isn\'t \'gotcha' — it's verifying the system works. Most operatives respond well to a culture of mutual verification once it\'s clear the purpose is safety, not blame.">
            <p>Audit dimensions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Procedure</strong> — six-step compliance observed in practice.</li>
              <li><strong>Equipment</strong> — voltage indicators in date, tested, GS38 compliant; locks and tags available; proving units present.</li>
              <li><strong>Records</strong> — operative training matrix current; safe-isolation refreshers within validity.</li>
              <li><strong>Documentation</strong> — RAMS reference safe isolation; permits-to-work used appropriately.</li>
              <li><strong>Incident data</strong> — any events related to isolation failure; trend tracking.</li>
              <li><strong>Coaching</strong> — observed shortcomings corrected; non-compliance escalated.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Multi-source isolation" plainEnglish="Modern installations increasingly have multiple sources — PV, battery storage, generator backup, UPS, dual incoming feeds. Each source must be identified, isolated, locked and tagged. Apply prove-test-prove from all directions; PV in particular can back-feed during daylight even with the AC side isolated." onSite="The L3 supervisor\'s first question on any modern installation: \'how many sources are there?'. Walk-through identifies them; isolation strategy addresses each one. PV DC isolation, battery DC isolation, UPS internal battery, generator transfer switch — all need attention.">
            <p>Common multi-source scenarios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PV system</strong> — DC + AC sides; battery if hybrid; isolate both.</li>
              <li><strong>Battery storage</strong> — battery DC contactor + AC side.</li>
              <li><strong>UPS</strong> — internal battery; mains input; bypass switch position.</li>
              <li><strong>Generator</strong> — Auto Transfer Switch position; engine start interlock.</li>
              <li><strong>Dual mains feed</strong> — both incomers + tie breaker.</li>
              <li><strong>Microgeneration</strong> — small wind / hydro can back-feed unexpectedly.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>EAWR Reg 14, competence and the wider system</ContentEyebrow>
          <ConceptBlock title="EAWR Reg 14 — when live working is permitted" plainEnglish="Reg 14 is the &apos;exception&apos; to the general dead-working principle. Live work is only permitted if THREE conditions are ALL met: (a) it&apos;s unreasonable to work dead; (b) it&apos;s reasonable to work live; (c) suitable precautions are in place. All three. Failing any one means dead working is required." onSite="The L3 supervisor reads &apos;unreasonable to work dead&apos; strictly — convenience and customer time pressure don&apos;t qualify. Live testing for diagnostic purposes is often defensible (you can&apos;t diagnose dead); routine installation work almost never is.">
            <p>The Reg 14 three-test:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test 1 (unreasonable to be dead)</strong> — the work cannot reasonably be done with the equipment isolated. Diagnostic / fault-finding may meet; routine install almost never does.</li>
              <li><strong>Test 2 (reasonable to be live)</strong> — the risk of working live is justified by the benefit. Customer convenience alone doesn&apos;t justify.</li>
              <li><strong>Test 3 (suitable precautions)</strong> — insulating PPE, insulated tools, second person, permit-to-work, restricted access, all controls actually in place.</li>
              <li>All three required; failing any = dead working required.</li>
              <li>Document the three-test reasoning; the documentation is the defence.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EAWR Reg 16 — competence and the L3 step" plainEnglish="Reg 16 requires that no person engages in any electrical work where technical knowledge or experience is necessary unless they have that knowledge / experience or are under appropriate supervision. The L3 supervisor is often the &apos;appropriate supervision&apos; for L2 mates and apprentices." onSite="The supervision must be APPROPRIATE — close enough to intervene before harm. Phone-call distance often isn&apos;t. The L3 supervisor on site, observing, available to intervene, is what discharges Reg 16 for the team. Leaving an L2 mate alone on an unfamiliar installation may be a Reg 16 breach.">
            <p>Appropriate supervision factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Proximity — supervisor reachable in time to prevent harm.</li>
              <li>Competence ratio — supervisor competent for the work being done.</li>
              <li>Workload — supervisor not overwhelmed by parallel demands.</li>
              <li>Experience of the supervised — newer = closer supervision.</li>
              <li>Hazard level — high-hazard work = closer supervision.</li>
              <li>Documentation — supervision arrangements recorded on RAMS.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="HSG85 — the practitioner reference" plainEnglish="HSE Guidance HSG85 &apos;Electricity at Work — Safe Working Practices&apos; is the detailed practitioner guidance on EAWR compliance. Covers isolation, live working defences, competence, supervision, system design, equipment standards. Non-statutory but treated as the practitioner standard; courts cite it." onSite="L3 should know HSG85 exists and what it covers. Reading the relevant sections before any non-routine job adds defence-in-depth to the firm&apos;s position. HSE inspectors expect competent operatives to be familiar with HSG85.">
            <p>HSG85 sections relevant to L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System design and maintenance (Reg 4).</li>
              <li>Isolation procedures and equipment (Reg 13).</li>
              <li>Live working — three-test, precautions, permits (Reg 14).</li>
              <li>Competence and supervision (Reg 16).</li>
              <li>PPE and tools.</li>
              <li>Specific scenarios — switchgear, transformers, batteries, capacitors, generators.</li>
              <li>Emergency response.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="EAWR 1989 — Reg 14" clause={<>"No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."</>} meaning={<>The three-test for live working. ALL THREE must be met. Default = dead working under Reg 13. Reg 14 is the narrow exception with strict gates. Documentation of the three-test reasoning is the defence if challenged.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Skipping the second 'prove' on the voltage indicator" whatHappens={<>Operative proves indicator on a known live, tests circuit shows dead, doesn&apos;t prove indicator again. Indicator was actually faulty and gave false dead reading. Operative touches conductors that are still live; shocked. Investigation finds the procedure shortcut. EAWR Reg 13 prosecution; firm + operative under HASAWA s.2/s.7.</>} doInstead={<>Always prove-test-prove. The second prove is the safety net against indicator failure. 30 seconds saved isn&apos;t worth a hospital visit.</>} />

          <CommonMistake title="One operative removes another's lock to \'save time'" whatHappens={<>Two operatives working on isolated circuit; one finishes early, sees the other&apos;s lock still on, removes it to allow re-energisation for the customer. Other operative touches what they thought was still isolated; shocked. Multi-prosecution event. Lock removal by anyone other than the operative who fitted it is a fundamental procedure violation.</>} doInstead={<>One lock per operative; only that operative removes their own lock. Multi-lock hasps for multiple operatives on one isolation point. Re-energisation only when ALL locks are removed by their owners.</>} />

          <Scenario title="Auditing the firm's isolation practice" situation={<>You\'ve been asked to spend a day auditing the safe-isolation practice across the firm\'s operatives. Three teams currently on different jobs: Team A on a domestic CU change, Team B on a commercial DB upgrade, Team C on a small fault-finding visit at an industrial customer.</>} whatToDo={<>Visit each team unannounced. Observe the procedure in action: prove-test-prove sequence; equipment used (GS38 indicator, proving unit); lock-off and tag-out; multi-lock hasp where multiple operatives; record-keeping. Talk to operatives — what&apos;s the procedure for THIS site? Where do you use the prove? What if this is a multi-source site? Check equipment — voltage indicators in calibration; locks and tags available; proving units present. Review training matrix back at office — when was each operative&apos;s last safe-isolation refresher? Cross-reference any near-misses logged in the past 6 months — anything related to isolation? Compile findings: what&apos;s working well; what&apos;s slipping; what needs intervention. Feedback to firm&apos;s H&amp;S manager and to the teams individually. Plan: refresher training where due; equipment replacement where indicators are out of calibration; toolbox talk on the most common slippage observed; follow-up audit in 3 months.</>} whyItMatters={<>The audit is what verifies the documented procedure is the actual practice. Without audit, the firm has policy on paper and unknown reality on site — that&apos;s how isolation incidents happen and that&apos;s what the HSE finds when they investigate. Periodic audit + intervention + retraining is the cycle that keeps isolation practice current. The L3 supervisor doing this work is contributing directly to the firm&apos;s POCMR cycle under MHSWR Reg 5.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — prove-test-prove, lock-off, tag-out. At L3 you supervise, audit and explain implications.",
            "EAWR Reg 13 is the legal hook. Compliance = six-step procedure on every job, every time.",
            "GS38-compliant voltage indicator + known live source / proving unit. Multimeter is NOT GS38.",
            "Bypass implications cascade: EAWR + HASAWA + RIDDOR + insurance void + s.7 / s.37 personal prosecution + reputational damage.",
            "Multi-source isolation is increasingly common (PV, battery, UPS, generator, dual feed). Identify all sources; isolate each.",
            "Lock-off + tag-out: per operative. Only the operative who fitted the lock removes it. Multi-lock hasps for shared isolation points.",
            "Permits-to-work formalise the isolation procedure for higher-hazard scenarios.",
            "L3 supervisor audits the procedure: observation + records + training currency + incident data. Intervention where slippage seen.",
          ]} />
          <Quiz title="Safe isolation supervision — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.5 Safe practices supervision</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Section 4 — Hazards in the work environment</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
