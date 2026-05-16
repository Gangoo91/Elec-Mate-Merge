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
  { question: 'What records should I keep of a safe-isolation procedure?', answer: 'Many firms now require a per-circuit safe-isolation certificate — operative name, circuit ID, isolation point, lock-off device fitted, voltage indicator serial and last calibration, proving method, test readings (L-E, L-N, L-L, N-E), date, time, signature. Retained with the job pack. After any incident this is the contemporaneous record that demonstrates the procedure was followed.' },
  { question: 'How does safe isolation interact with BS 7671 testing?', answer: 'Dead testing (continuity, IR) requires safe isolation as a precondition. Live testing (loop impedance, RCD operation) requires the circuit re-energised. The L3 supervisor sequences the testing — all dead tests first while the isolation is in place; then restoration; then live tests; then close out. Mixing the sequences leads to errors and incidents.' },
  { question: 'What about working on isolated DC PV-array conductors?', answer: 'PV DC stays energised during daylight as long as modules are illuminated. The DC isolator between modules and inverter must be opened, locked and tagged. Even with the inverter off, the modules continue to produce voltage; touching the array-side conductors without isolation can deliver lethal DC shock. PV-specific safe-isolation training is increasingly part of L3 competence.' },
  { question: 'How does the firm prove the indicator&apos;s calibration to an inspector?', answer: 'Calibration certificate from manufacturer or certified calibrator; indicator typically calibrated annually; certificate referenced by serial number; firm&apos;s asset register lists current calibration date for each indicator. Out-of-calibration indicator used in a safe-isolation procedure is treated by inspectors as effectively no isolation having occurred.' },
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
            "BS 7671 Sections 462 / 463 / 537 specify the device-level requirements that allow EAWR Reg 13 to be discharged operationally.",
            "Multi-source installations (PV, BESS, generator, UPS, dual feed) require sequential isolation of every source and prove-test-prove from every direction.",
            "EAWR Reg 12 covers the design duty to provide means of isolation; Reg 13 the operational duty to use them; Reg 14 the narrow live-working exception; Reg 16 competence.",
          ]} />
          <LearningOutcomes outcomes={[
            "Specify and demonstrate the procedures for ensuring electrical systems are safe to work on.",
            "State the implications of carrying out safe isolation procedures and NOT carrying them out.",
            "Apply EAWR Reg 13 and HSG85 in practice.",
            "Audit the safe isolation procedure across a team — observation, record review, training currency.",
            "Recognise multi-source isolation requirements (PV, generator, UPS, dual feed).",
            "Identify when a permit-to-work formalises the isolation for higher-hazard scenarios.",
            "Map BS 7671 Sections 462 / 463 / 537 to the EAWR Reg 12 / 13 duty chain.",
            "Apply the EAWR Reg 14 three-test for genuine live-working defence with documented reasoning.",
            "Apply Reg 16 supervision proportionate to operative competence and task hazard.",
            "Apply structured restoration discipline mirroring the isolation procedure.",
            "Walk through an HSE inspector audit pattern and self-test the firm&apos;s isolation system.",
            "Recognise the cascade of multi-defendant prosecution (operative / supervisor / director / firm) in isolation-failure cases.",
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
              <li><strong>After any break</strong> — repeat the prove-test-prove on return; conditions may have changed.</li>
              <li><strong>Identify the correct isolation point</strong> — circuit ID verified by drawing, label, or trace; a confidently-misidentified isolator is one of the commonest failure modes.</li>
              <li><strong>Brief any second person</strong> — if a colleague will be exposed to the area, they need to know what is isolated, what is not, and where the locks are.</li>
              <li><strong>Document the isolation</strong> — circuit, isolator, lock number, time, operative, voltage readings.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="EAWR 1989 — Reg 13" clause={<>"Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during the work if danger may thereby arise."</>} meaning={<>The legal hook for safe isolation. &quot;Adequate precautions&quot; = the six-step procedure in practice. Lock-off and tag-out are how the regulation is discharged. Skipping them is a Reg 13 breach regardless of whether re-energisation actually occurred — the duty is on the precautions, not on the outcome.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 13." />

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
              <li>Corporate Manslaughter and Corporate Homicide Act 2007 exposure where senior management failure was a substantial element.</li>
              <li>Defective Premises Act 1972 + BSA 2022 30-year retrospective liability for higher-risk buildings.</li>
              <li>Lost productivity from RIDDOR investigation, internal investigation, customer notification, regulatory cooperation.</li>
              <li>Long-term insurance market consequences — premium uplift, cover restriction, market exclusion.</li>
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

          <ConceptBlock title="Common audit findings and remediation patterns" plainEnglish="The L3 supervisor running periodic audits sees patterns. Some findings recur across teams and merit firm-wide intervention; others are individual coaching items. Recognising the patterns lets the supervisor target effort efficiently." onSite="Audit isn&apos;t complete until findings are tracked through to closure. The L3 supervisor maintains a simple log: finding, severity, action, owner, due date, closed date. Trends become visible after a few audit cycles.">
            <p>Common audit findings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Indicator out of calibration — equipment management gap; replace and reset cycle.</li>
              <li>Lock-off device missing — kit gap; restock and audit van inventories firm-wide.</li>
              <li>Tag-out illegible or unsigned — discipline gap; coach and re-audit.</li>
              <li>Second prove skipped — procedure shortcut; coach and observe; toolbox talk if firm-wide.</li>
              <li>Single operative on multi-source kit — RAMS gap; review and amend.</li>
              <li>Operative training lapsed — training matrix gap; book refresher.</li>
              <li>Restoration done without final visual check — discipline gap; coach.</li>
              <li>Records absent for past work — recording gap; remind of firm policy.</li>
              <li>Customer&apos;s isolation relied on without firm&apos;s own lock — independence principle violation; coach.</li>
              <li>Cumulative slippage — many small findings indicate cultural drift; escalate to firm H&amp;S.</li>
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
              <li><strong>EV charging infrastructure</strong> — may have V2G capability; bi-directional flow possible.</li>
              <li><strong>CHP units</strong> — combined heat and power; can back-feed during operation.</li>
              <li><strong>Capacitor banks</strong> — stored energy after AC isolation; discharge time required.</li>
              <li><strong>Inductive loads</strong> — motors, transformers; back-EMF during disconnection.</li>
              <li><strong>Other-contractor equipment in same DB</strong> — verify scope of isolation; do not assume one feed.</li>
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
              <li><strong>Limb (a) examples that pass</strong> — taking a continuous-supply diagnostic reading on a fault-finding job; commissioning verification that requires live operation; emergency intervention on a system that cannot be safely isolated.</li>
              <li><strong>Limb (a) examples that fail</strong> — &quot;customer wants the lights on&quot;; &quot;we&apos;re behind schedule&quot;; &quot;the isolator is in an awkward place&quot;.</li>
              <li><strong>Limb (b) considerations</strong> — operative competence verified; equipment in place; supervision arrangement; environmental conditions; consequence if event occurs.</li>
              <li><strong>Limb (c) precautions</strong> — Class 0 gloves (1000V AC), arc-flash PPE matched to incident energy, insulated tools to IEC 60900, second person trained in rescue, restricted-access zone, fire watch where appropriate, permit-to-work.</li>
              <li><strong>Documentation</strong> — three-test reasoning recorded in writing; signed by issuing authority; signed by operative; retained.</li>
              <li><strong>Inspector treatment</strong> — Reg 14 is read narrowly; the burden of demonstrating each limb sits with the dutyholder; absent documentation is treated as no three-test.</li>
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
              <li>Communication — clear chain of escalation when something unexpected occurs.</li>
              <li>Briefing — pre-task briefing of supervised operative on hazards and the supervision arrangement.</li>
              <li>Competence assessment — periodic verification by observation; not just qualification certificates on file.</li>
              <li>Reg 16 covers electrical knowledge specifically — for general construction-site hazards CDM Reg 8 and MHSWR Reg 13 cover supervision separately.</li>
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

          <RegsCallout source="EAWR 1989 — Reg 14" clause={<>"No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."</>} meaning={<>The three-test for live working. ALL THREE must be met. Default = dead working under Reg 13. Reg 14 is the narrow exception with strict gates. Documentation of the three-test reasoning is the defence if challenged.</>} cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14." />

          <SectionRule />
          <CommonMistake title="Skipping the second 'prove' on the voltage indicator" whatHappens={<>Operative proves indicator on a known live, tests circuit shows dead, doesn&apos;t prove indicator again. Indicator was actually faulty and gave false dead reading. Operative touches conductors that are still live; shocked. Investigation finds the procedure shortcut. EAWR Reg 13 prosecution; firm + operative under HASAWA s.2/s.7.</>} doInstead={<>Always prove-test-prove. The second prove is the safety net against indicator failure. 30 seconds saved isn&apos;t worth a hospital visit.</>} />

          <CommonMistake title="One operative removes another's lock to \'save time'" whatHappens={<>Two operatives working on isolated circuit; one finishes early, sees the other&apos;s lock still on, removes it to allow re-energisation for the customer. Other operative touches what they thought was still isolated; shocked. Multi-prosecution event. Lock removal by anyone other than the operative who fitted it is a fundamental procedure violation.</>} doInstead={<>One lock per operative; only that operative removes their own lock. Multi-lock hasps for multiple operatives on one isolation point. Re-energisation only when ALL locks are removed by their owners.</>} />

          <Scenario title="Auditing the firm's isolation practice" situation={<>You\'ve been asked to spend a day auditing the safe-isolation practice across the firm\'s operatives. Three teams currently on different jobs: Team A on a domestic CU change, Team B on a commercial DB upgrade, Team C on a small fault-finding visit at an industrial customer.</>} whatToDo={<>Visit each team unannounced. Observe the procedure in action: prove-test-prove sequence; equipment used (GS38 indicator, proving unit); lock-off and tag-out; multi-lock hasp where multiple operatives; record-keeping. Talk to operatives — what&apos;s the procedure for THIS site? Where do you use the prove? What if this is a multi-source site? Check equipment — voltage indicators in calibration; locks and tags available; proving units present. Review training matrix back at office — when was each operative&apos;s last safe-isolation refresher? Cross-reference any near-misses logged in the past 6 months — anything related to isolation? Compile findings: what&apos;s working well; what&apos;s slipping; what needs intervention. Feedback to firm&apos;s H&amp;S manager and to the teams individually. Plan: refresher training where due; equipment replacement where indicators are out of calibration; toolbox talk on the most common slippage observed; follow-up audit in 3 months.</>} whyItMatters={<>The audit is what verifies the documented procedure is the actual practice. Without audit, the firm has policy on paper and unknown reality on site — that&apos;s how isolation incidents happen and that&apos;s what the HSE finds when they investigate. Periodic audit + intervention + retraining is the cycle that keeps isolation practice current. The L3 supervisor doing this work is contributing directly to the firm&apos;s POCMR cycle under MHSWR Reg 5.</>} />

          <SectionRule />
          <ContentEyebrow>Safe isolation in BS 7671 — the 462/463 framework</ContentEyebrow>

          <ConceptBlock
            title="How the Wiring Regulations cross-reference EAWR Reg 13"
            plainEnglish="BS 7671 doesn&apos;t replicate EAWR; it provides the design and installation standards that allow EAWR&apos;s general duties to be discharged in practice. Section 462 covers isolation; Section 463 covers switching for mechanical maintenance and emergency switching. Section 537 in Chapter 53 sets out the requirements for isolating and switching devices. These regulations work together — EAWR Reg 13 is the legal duty; BS 7671 462/463 is the practical specification of devices that meet it."
            onSite="The L3 supervisor reading a design checks the isolation provisions against BS 7671: is there a means of isolating each circuit, accessible without exposure to live parts, securable in the off position to prevent inadvertent re-energisation? Where shared isolation points serve multiple circuits, does the design provide for individual circuit isolation when required? Without these design provisions, the on-site safe-isolation procedure becomes impossible regardless of operative skill."
          >
            <p>BS 7671 isolation requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 462.1.1</strong> — every circuit shall be capable of being
                isolated from every live supply conductor.
              </li>
              <li>
                <strong>Reg 462.1.2</strong> — provision shall be made to prevent any
                electrical equipment from becoming inadvertently energised during isolation.
              </li>
              <li>
                <strong>Reg 462.1.3</strong> — adequate means shall be provided for securing
                an isolator in the open position.
              </li>
              <li>
                <strong>Reg 462.1.4</strong> — the position of the isolator shall be readily
                identifiable.
              </li>
              <li>
                <strong>Section 537.2</strong> — characteristics of devices for isolation.
              </li>
              <li>
                <strong>Section 537.3</strong> — switching off for mechanical maintenance.
              </li>
              <li>
                <strong>Section 537.4</strong> — emergency switching.
              </li>
              <li>
                <strong>Section 537.5</strong> — functional switching.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 16 (Persons to be competent to prevent danger and injury)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical knowledge
                or experience is necessary to prevent danger or, where appropriate, injury,
                unless he possesses such knowledge or experience, or is under such degree of
                supervision as may be appropriate having regard to the nature of the
                work.&quot;
              </>
            }
            meaning={
              <>
                Reg 16 — the competence-or-supervision rule. Either the operative possesses
                the technical knowledge / experience or they work under appropriate
                supervision. The L3 supervisor is often the &apos;appropriate supervision&apos;
                for L2 mates and apprentices. &apos;Appropriate&apos; is judged by hazard
                level, supervised operative&apos;s competence, proximity, workload and the
                ability of the supervisor to intervene before harm. Phone-call distance is
                often insufficient. Reg 16 breaches are commonly cited alongside Reg 13 / Reg
                14 in prosecutions where a junior operative was left effectively unsupervised
                on a hazardous task.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 16."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4(1) and 4(4)"
            clause={
              <>
                &quot;All systems shall at all times be of such construction as to prevent, so
                far as is reasonably practicable, danger.&quot; (Reg 4(1)) &quot;All systems
                shall be maintained so as to prevent, so far as is reasonably practicable,
                such danger.&quot; (Reg 4(2)) &quot;Every work activity, including operation,
                use and maintenance of a system and work near a system, shall be carried out
                in such a manner as not to give rise, so far as is reasonably practicable, to
                danger.&quot; (Reg 4(3)) &quot;Any equipment provided under these Regulations
                for the purpose of protecting persons at work on or near electrical equipment
                shall be suitable for the use for which it is provided, be maintained in a
                condition suitable for that use, and be properly used.&quot; (Reg 4(4))
              </>
            }
            meaning={
              <>
                Reg 4 is the umbrella system duty — construction, maintenance, work activity
                and protective equipment. The L3 supervisor verifying the voltage indicator
                is fit for purpose, the lock-off devices are functional, the protective
                gloves are within their inspection period — all sit within Reg 4(4). The
                framework reads upward: Reg 4 (system level), Reg 12 (means of isolation
                provided), Reg 13 (isolation precautions), Reg 14 (live working
                exception), Reg 16 (competence). A breach often engages multiple regulations
                simultaneously.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 4."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 12"
            clause={
              <>
                &quot;Where necessary to prevent danger, suitable means (including, where
                appropriate, methods of identifying circuits) shall be available for — (a)
                cutting off the supply of electrical energy to any electrical equipment; and (b)
                the isolation of any electrical equipment.&quot;
              </>
            }
            meaning={
              <>
                Reg 12 — the duty to PROVIDE the means of isolation. This is the design-stage
                companion to Reg 13&apos;s operational isolation duty. Without compliant means
                of isolation at the design stage, the operational isolation procedure becomes
                impossible. The duty captures both the cutting-off function (switching for
                operational purposes) and the isolation function (securing for safe work).
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 12."
          />

          <SectionRule />
          <ContentEyebrow>The voltage indicator — selection, use, calibration</ContentEyebrow>

          <ConceptBlock
            title="GS38 in detail — what makes a voltage indicator fit for purpose"
            plainEnglish="HSE Guidance GS38 sets out the selection and use requirements for test equipment, leads and probes intended for proving dead on low-voltage electrical systems. Indicators that meet GS38 are designed to fail safe — that is, when the device fails its failure mode is to indicate live rather than to indicate dead. They have purpose-built probes with finger barriers, non-current-limiting fuses where appropriate, shrouding to prevent short-circuit during test, robust construction, and clear high-contrast visual indication. The two main types are two-pole voltage indicators (sometimes called proving units&apos; companion devices) and digital voltage indicators with phase-rotation function. Multimeters set to AC volts ranges are not GS38 compliant for proving dead — they can give false-dead readings if set to the wrong range, if the battery is low, or if the input impedance is too high to register the actual voltage."
            onSite="The L3 supervisor verifies the indicator on the van or in the team&apos;s kit meets GS38 by checking the manufacturer&apos;s specification, the probes&apos; condition, and the calibration certificate. Indicators that have been dropped, soaked, or are showing erratic behaviour are taken out of service immediately. The proving unit (a self-contained known-live source) accompanies the indicator and is used for prove-test-prove sequences where no other known live source is convenient. Both pieces of equipment have calibration cycles and the firm maintains records."
          >
            <p>GS38 voltage indicator characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fail-safe design</strong> — failure modes indicate live not dead;
                low-battery alerts visible.
              </li>
              <li>
                <strong>Probe construction</strong> — finger barriers to prevent slip onto
                live conductors; insulated to the rated voltage.
              </li>
              <li>
                <strong>Shrouded tips</strong> — minimum exposed metal to prevent
                short-circuit between adjacent conductors.
              </li>
              <li>
                <strong>Non-current-limiting fuse</strong> — internal protection within the
                indicator.
              </li>
              <li>
                <strong>Robust mechanical design</strong> — suitable for site use; impact
                resistance; ingress protection.
              </li>
              <li>
                <strong>Clear visual indication</strong> — high-contrast LED, audible tone;
                visible in poor lighting.
              </li>
              <li>
                <strong>Voltage range</strong> — appropriate to the system (typically
                12-690V AC / 12-1000V DC for LV).
              </li>
              <li>
                <strong>Polarity tolerance</strong> — works either way round; no risk of
                operator error.
              </li>
              <li>
                <strong>Calibration cycle</strong> — typically annual; certificate retained
                on firm&apos;s asset register.
              </li>
              <li>
                <strong>Proving unit companion</strong> — known-live source for prove
                steps; battery-powered; self-contained.
              </li>
              <li>
                <strong>Multimeter NOT suitable</strong> — wrong setting risk; battery
                dependence; input impedance issues.
              </li>
              <li>
                <strong>Non-contact pen NOT suitable for proving dead</strong> — capacitive
                coupling can light on dead conductor; low battery can fail to light on live.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>PV, battery and ESS — the multi-source isolation problem</ContentEyebrow>

          <ConceptBlock
            title="Why traditional safe-isolation procedures fail on hybrid systems"
            plainEnglish="A traditional installation has one isolation point: the main switch or the MCB. A modern hybrid system has multiple sources operating in parallel: solar PV with its DC isolators and AC inverter, battery energy storage with its own DC contactor and AC inverter, possibly a generator with auto-transfer switch, possibly a UPS with internal battery, and the conventional grid supply. Each source can back-feed if the others are isolated; PV in particular can deliver dangerous DC voltages whenever there is daylight, regardless of the AC-side state."
            onSite="The L3 supervisor on any modern installation starts with a system survey — list every source, locate every isolation device, understand the operational logic. The safe-isolation procedure becomes a sequence: isolate AC mains, isolate PV DC at module-array switch, isolate battery DC at battery breaker, isolate generator at engine stop and ATS lockout, isolate UPS at bypass and internal battery contactor. Each gets its own lock and tag. Prove-test-prove from all directions before any work proceeds. The conventional &apos;isolate the MCB&apos; mental model is wholly inadequate."
          >
            <p>Multi-source isolation sequence for a hybrid PV + battery + grid installation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify all sources</strong> — drawing review, on-site walk, label
                check.
              </li>
              <li>
                <strong>Isolate the AC mains</strong> — main switch off, locked, tagged.
              </li>
              <li>
                <strong>Isolate PV DC</strong> — DC isolator between modules and inverter,
                off, locked.
              </li>
              <li>
                <strong>Isolate battery DC</strong> — battery breaker open, locked.
              </li>
              <li>
                <strong>Isolate generator</strong> — engine stop, ATS in maintenance
                position, locked.
              </li>
              <li>
                <strong>Discharge any stored energy</strong> — wait for inverter capacitors
                to discharge (typically 5 minutes), confirm via voltage indicator.
              </li>
              <li>
                <strong>Prove voltage indicator on known live source</strong>.
              </li>
              <li>
                <strong>Test for absence of voltage at the work point</strong> — from every
                direction: between phases, phase to neutral, phase to earth, on the PV DC
                side, on the battery DC side.
              </li>
              <li>
                <strong>Re-prove voltage indicator on known live source</strong> — confirm
                indicator still working.
              </li>
              <li>
                <strong>Tag isolation points</strong> — name, date, contact, expected
                duration.
              </li>
              <li>
                <strong>Begin work</strong> — under the protection of confirmed isolation.
              </li>
              <li>
                <strong>On completion</strong> — work area cleared, covers replaced, all
                operatives accounted for, then sequential restoration in reverse order with
                operational checks at each stage.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>HSG85 — the practitioner reference for safe electrical working</ContentEyebrow>

          <ConceptBlock
            title="What HSG85 actually says and why the L3 supervisor should have read it"
            plainEnglish="HSG85 &apos;Electricity at Work: Safe Working Practices&apos; is HSE&apos;s detailed practitioner guidance on the Electricity at Work Regulations 1989. It is non-statutory but is treated as the practitioner standard; courts cite it routinely. The document covers system design and maintenance (Reg 4); isolation procedures and equipment (Reg 13); live working — the three-test, suitable precautions, permits (Reg 14); competence and supervision (Reg 16); and specific scenarios — switchgear, transformers, batteries, capacitors, generators, photovoltaic systems, battery energy storage, electric-vehicle charging. The guidance was substantially updated in recent revisions to reflect modern installation types including PV and ESS. Reading the relevant sections before any non-routine job is a defence-in-depth investment the L3 supervisor should make a habit."
            onSite="On any non-routine job — first time on this type of equipment, unfamiliar customer, larger-scale than usual — the L3 supervisor checks the relevant HSG85 section as part of pre-job preparation. Most firms hold a current copy in PDF; HSE keeps the latest version on its website. The guidance is the bridge between the regulation text and on-site practice; inspectors expect competent operatives to be familiar with it."
          >
            <p>HSG85 sections most relevant at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>System design and maintenance</strong> — Reg 4 expansion; what
                competent design and maintenance looks like.
              </li>
              <li>
                <strong>Isolation procedures</strong> — Reg 13 expansion; equipment
                requirements; lock-off; tag-out.
              </li>
              <li>
                <strong>Live working</strong> — Reg 14 three-test detail; suitable
                precautions; permits-to-work; the second-person principle.
              </li>
              <li>
                <strong>Competence and supervision</strong> — Reg 16 expansion; assessing
                competence; appropriate supervision.
              </li>
              <li>
                <strong>PPE and tools</strong> — selection criteria; standards; maintenance.
              </li>
              <li>
                <strong>Switchgear</strong> — specific safe-working procedures.
              </li>
              <li>
                <strong>Transformers</strong> — high-voltage considerations; oil filling;
                stored energy.
              </li>
              <li>
                <strong>Batteries</strong> — DC hazards; stored energy; thermal runaway;
                lithium-ion considerations.
              </li>
              <li>
                <strong>Capacitors</strong> — stored energy after isolation; discharge
                procedures.
              </li>
              <li>
                <strong>Generators</strong> — multi-source isolation; transfer-switch
                interlocks.
              </li>
              <li>
                <strong>Photovoltaic systems</strong> — DC-side isolation; daylight
                hazard.
              </li>
              <li>
                <strong>Battery energy storage</strong> — modern ESS considerations; BS EN
                IEC standards.
              </li>
              <li>
                <strong>Emergency response</strong> — rescue from contact with live
                conductors; first aid; RIDDOR.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>HSE prosecution case-law — what isolation-bypass actually costs</ContentEyebrow>

          <ConceptBlock
            title="Worked example — the cascade from one skipped prove to a multi-defendant prosecution"
            plainEnglish="A small commercial electrical contractor pleaded guilty to breaches of HSWA s.2 and EAWR Reg 13 after a 24-year-old operative received a fatal electric shock during a routine sub-board upgrade. Investigation revealed: the operative had proved the voltage indicator on a known live source, tested the conductors and found them dead, but had not re-proved the indicator on the known live source before commencing work. The voltage indicator was later found to have an intermittent fault that gave false-dead readings approximately 1 in 20 uses. The firm had not implemented a calibration regime; the indicator&apos;s last calibration was 14 months earlier (the firm&apos;s policy required annual). The operative was working alone with no second person; the firm&apos;s RAMS for the activity required a second person for any work in commercial switchgear. The supervisor had signed off the RAMS that morning without verifying the equipment or the personnel arrangements matched what was specified. Sentencing Council Definitive Guideline applied: high culpability (multiple failures, departure from own policy), Category 1 harm (death). Firm fined a six-figure sum; the director was sentenced under HSWA s.37 to a suspended custodial sentence and personally fined; the supervisor was prosecuted under HSWA s.7 and given a community order. The case appeared on the HSE Public Register and several framework contracts were withdrawn."
            onSite="The lessons: the six-step procedure is non-negotiable not because the HSE says so but because the indicator can fail. Calibration cycles must be maintained and visible. RAMS that specifies a second person must mean a second person, not a supervisor signature alone. The supervisor sign-off is a verification act, not a formality. The cascade reaches from operative (s.7) through supervisor (s.7) to director (s.37) to firm (s.2) in routine HSE practice; one set of facts often produces four defendants."
          >
            <p>Patterns the HSE looks for in isolation-failure prosecutions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Procedure shortcut</strong> — second prove skipped, lock-off omitted,
                tag-out unsigned.
              </li>
              <li>
                <strong>Equipment failure</strong> — out-of-calibration indicator, missing
                proving unit, damaged probes.
              </li>
              <li>
                <strong>Lone working</strong> — second-person provision specified in RAMS but
                absent on site.
              </li>
              <li>
                <strong>Time pressure</strong> — commercial deadline, customer complaint,
                end-of-shift commitment.
              </li>
              <li>
                <strong>Supervisor sign-off without verification</strong> — RAMS approved on
                paper but conditions not checked on site.
              </li>
              <li>
                <strong>Training records lapsed</strong> — operative&apos;s safe-isolation
                refresher expired or never undertaken.
              </li>
              <li>
                <strong>Culture indicators</strong> — recent near-misses unreported or
                ignored, audit findings not actioned.
              </li>
              <li>
                <strong>Multi-defendant outcome</strong> — firm under s.2, director under
                s.37, supervisor under s.7, operative under s.7 if surviving.
              </li>
              <li>
                <strong>Custodial sentence available for individuals</strong> — Sentencing
                Council guideline puts individual custody on the table for high
                culpability / Category 1 harm.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Inspector walkthrough — what an HSE audit of isolation practice looks like</ContentEyebrow>

          <ConceptBlock
            title="The structured way an HSE inspector tests whether the firm&apos;s isolation system is real"
            plainEnglish="HSE inspectors auditing a firm&apos;s isolation practice work through a structured pattern. They start with the firm&apos;s written safety policy (s.2(3)) and the firm&apos;s EAWR / safe-isolation procedure document. They then move to records — calibration certificates for voltage indicators; training records for operatives; permit registers where applicable; near-miss / incident logs; previous audit findings. They then move to assets — the indicators themselves, the proving units, the lock-off devices, the tags. Finally they move to site — unannounced visit to observe the procedure in action; question operatives about what they do; cross-reference the operative&apos;s account against the documentation. Discrepancies at any level (policy, records, assets, site) feed the inspector&apos;s judgement on whether the system is real or paper-only."
            onSite="The L3 supervisor in advance of any inspection should be confident the firm can survive each stage. The documentation should match practice; the practice should match documentation. Either alone fails the audit. Mock audits within the firm — the L3 supervisor running through the inspector&apos;s pattern as a self-check — are a high-yield investment of an afternoon."
          >
            <p>Inspector audit sequence and what passes / fails each stage:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — written policy and procedure</strong> — current, signed,
                dated, brought to operatives&apos; notice; references EAWR Reg 13 and the
                six-step procedure.
              </li>
              <li>
                <strong>Stage 2 — calibration records</strong> — voltage indicators all in
                date; proving units functional; lock-off devices fit for purpose.
              </li>
              <li>
                <strong>Stage 3 — training records</strong> — operatives current on
                safe-isolation training; refresher cycle adhered to; competence assessed
                practically not just by certificate.
              </li>
              <li>
                <strong>Stage 4 — permit and isolation certificate register</strong> —
                completed forms; sign-on / sign-off; archive of past permits.
              </li>
              <li>
                <strong>Stage 5 — near-miss / incident log</strong> — any events related to
                isolation; actions taken; trend tracking.
              </li>
              <li>
                <strong>Stage 6 — audit history</strong> — previous internal audits;
                findings; actions closed.
              </li>
              <li>
                <strong>Stage 7 — site observation</strong> — unannounced visit to a live
                job; observe the procedure; verify equipment used matches the registered
                kit.
              </li>
              <li>
                <strong>Stage 8 — operative interview</strong> — &quot;walk me through what
                you did this morning&quot;; verify operative can articulate the six steps,
                the equipment, the reasoning.
              </li>
              <li>
                <strong>Stage 9 — supervisor interview</strong> — verify supervisor
                understands the procedure, the audit regime, the firm&apos;s wider safety
                framework.
              </li>
              <li>
                <strong>Stage 10 — final judgement</strong> — coherence across all stages
                indicates the system is real; inconsistencies trigger improvement /
                prohibition notice or prosecution depending on severity.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Restoration after work — the under-emphasised second half of the procedure"
            situation={<>You and an L2 mate have finished the isolated work on a small commercial DB — three circuits modified, terminations made, RCBOs replaced. All testing complete. Time to restore the supply. Customer is keen to be back online. Your locks and the L2&apos;s locks are still on the main switch.</>}
            whatToDo={<>Restoration deserves the same discipline as isolation. (1) Final visual check inside the DB — no tools left behind, no loose conductors, all terminations tight, no debris. (2) Re-cover and re-seal — interior covers refitted, blanking plates in place, gland nuts tightened, cover screws torqued. (3) Both operatives confirm work area cleared, tools accounted for, no third party in the danger zone. (4) Pre-energisation IR test repeated where applicable. (5) Lock-off devices removed by the operatives who fitted them — only by the operatives who fitted them. (6) Main switch closed; check no breakers trip on energisation; check indicators show healthy. (7) Re-energise sub-circuits one by one; watch for trip; confirm operation. (8) Final live testing — loop impedance, RCD operation, polarity at outlets. (9) Brief the customer — what was done, what to expect, any post-work instructions. (10) Document — restoration time, tests carried out, any anomalies. The L2 mate&apos;s lock should not be removed by you; they remove their own.</>}
            whyItMatters={<>Many isolation-related incidents happen during restoration, not during the isolated work itself. Tools left behind cause short circuits when energised. Loose terminations heat up and fail later. Removing someone else&apos;s lock removes the human accountability that the lock provided. Inspectors recognise &apos;restoration discipline&apos; as a separate competence — many firms train the isolation procedure carefully but treat restoration as the easy reverse. It isn&apos;t. The L3 supervisor models the structured restoration that mirrors the structured isolation; the team learns by watching.</>}
          />

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
            "BS 7671 Section 462 / 463 / 537 provide the device-level requirements that allow EAWR Reg 13 to be discharged.",
            "EAWR Reg 12 is the design duty (provide means); Reg 13 the operational duty (use them); Reg 14 the narrow live-working exception; Reg 16 competence.",
            "Restoration discipline mirrors isolation discipline — final visual check, re-cover, sequential energisation, live testing, customer brief.",
            "Inspector audit pattern moves policy → records → assets → site → operative interview. Coherence across all stages is required.",
            "Calibration regime for voltage indicators is part of the safe-isolation system; out-of-calibration indicator treated as no isolation.",
            "Multi-defendant prosecution outcomes are routine — operative s.7, supervisor s.7, director s.37, firm s.2 from one set of facts.",
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
