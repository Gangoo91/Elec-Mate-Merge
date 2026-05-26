/**
 * Module 1 · Section 2 · Subsection 4 — Reporting routes: the right responsible person
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.4 + AC 2.6
 *   AC 2.4 — "specify appropriate responsible persons to whom Health and Safety and
 *            welfare related matters should be reported"
 *   AC 2.6 — "specify the current requirements and good working practices for processing
 *            waste on site"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.5 + 2.6 — reporting H&S issues; responsible persons
 *
 * Multiple parallel reporting routes. The L3 step is identifying the right
 * responsible person for each kind of issue.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Reporting routes — the right responsible person (2.4) | Level 3 Module 1.2.4 | Elec-Mate';
const DESCRIPTION = 'L3 refresher on H&S reporting routes — internal, RIDDOR, environmental, safeguarding, scheme bodies. Identifying the right responsible person for each kind of issue.';

const checks = [
  { id: 'l3-m1-s2-sub4-route', question: 'You discover a customer has been bypassing an RCD by clipping the test button down. They\'re elderly and have safeguarding concerns. What\'s the L3 reporting route?', options: [
    'That the installation incorporates an RCD, that the user should test it quarterly (or six-monthly per the older guidance) by pressing the test button, that the RCD should trip when tested, and that if it doesn\\\\\\\'t trip the user should call a competent electrician immediately. Maintains the protection by catching RCD failure before it matters.',
    'Protecting the client\\\\\\\'s personal information, security arrangements (alarm codes, key locations, access routines) and any commercially or personally sensitive matters you become aware of during the work. Casual chat about \\\\\\\'they\\\\\\\'ve got a nice setup\\\\\\\' can enable theft and breach the Data Protection Act 2018 if shared further.',
    'Multiple parallel routes: (1) restore safety — reinstate the RCD, document with photos; (2) inform the customer / their nominated representative; (3) escalate to your firm\\\\\\\\\\\\\\\'s contracts manager / H&S manager; (4) consider safeguarding referral if vulnerability is genuine — local authority adult social care; (5) document everything in writing in the job pack.',
    'Trust is significantly reduced because self-orientation is the denominator — it divides the total. The self-regulation skill needed is managing self-serving impulses and genuinely shifting attention to others\\\\\\\' needs, which requires ongoing emotional regulation of ego and need for recognition',
  ], correctIndex: 2, explanation: 'Multiple parallel duties = multiple parallel reports. The L3 step is recognising which routes apply to which kinds of issue.' },
  { id: 'l3-m1-s2-sub4-internal', question: 'What\'s the difference between an "internal" and an "external" report?', options: [
    'Internal = report within your firm to the responsible person (H&S manager, contracts manager, director). External = report to a regulator (HSE for H&S, Environment Agency for pollution, local authority for some EHO matters, scheme body like NICEIC for installation defects). Most issues need both — internal first, then the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s responsible person decides on external.',
    'Most providers run 5-10 days of taught content (often a mix of classroom and practical lab) plus the exam and practical assessment at the end. Some intensive 5-day courses; some part-time evening or weekend formats over 10-12 weeks. Self-study is possible but rare because the practical assessment requires specific equipment and witness-by-assessor.',
    'Part 6 has been completely restructured and renumbered to align with the CENELEC standard for inspection and testing. Pre-A4 regulation numbers (e.g. old 621.x, 631.x, 651.x) do not match the new 64x.x numbering. Old training materials, old EICR templates, and old citations all need cross-referencing — never quote a pre-A4 Part 6 reg number on a current report.',
    'Temperature. Copper has a temperature coefficient of approximately 0.004 / °C. A 1.5 mm² CPC reading 0.36 Ω at 20 °C will read approximately 0.43 Ω at 70 °C (full operating temperature) — a 20 % rise. This is why measured R1+R2 must be corrected (or the 0.8 factor applied to the table limit) before judging compliance against Table 41.3.',
  ], correctIndex: 0, explanation: 'Internal first is the discipline. The firm\'s responsible person makes the external-report decision unless the chain has demonstrably failed (then PIDA 1998 protects external escalation).' },
  { id: 'l3-m1-s2-sub4-near-miss', question: 'You spot a near-miss on site — a colleague nearly fell from a step-up because the rubber feet had perished. No injury. What do you do?', options: [
    'Around 1.2 Nm for the circuit terminals, around 3.5 Nm for the incomers (verify against the specific data sheet — values vary by product line and update cycle). Hager publishes the torques inside the CU lid, in the data sheet, and in the Hager Pro app. Wylex and Schneider have similar values for equivalent products.',
    'The landlord (within 28 days of the inspection), the existing tenants (within 28 days), any new tenants before they move in (with the EICR), the local authority on request (within 7 days), and the inspector retains a copy. The PRS Regs set explicit recipient and timescale requirements that are separate from the inspection itself.',
    'Log internally — most firms have a near-miss reporting system; if not, write it up. Pull the step-up out of service immediately and tag it. Notify the firm\\\\\\\\\\\\\\\'s H&S manager / contracts manager. Consider whether the issue affects other equipment in the firm\\\\\\\\\\\\\\\'s fleet — does the fleet need a recall? Near-misses are the leading indicator that prevents incidents; treating them seriously is what stops the next one.',
    'Alternative Dispute Resolution — out-of-court mechanisms for resolving consumer disputes (mediation, conciliation, arbitration). Under the Alternative Dispute Resolution for Consumer Disputes Regulations 2015 you must signpost customers to a certified ADR provider when an internal complaint is unresolved (you\\\\\\\'re not always required to USE ADR but you must offer it). MCS-registered installers must be members of an approved ADR scheme via RECC or HIES.',
  ], correctIndex: 2, explanation: 'Near-miss culture is the L3 supervisor mindset. Heinrich\'s ratio (300 near-misses : 30 minor injuries : 1 serious incident) is a useful framing — the near-miss is the cheapest possible chance to prevent the serious incident.' },
];

const quizQuestions = [
  { id: 1, question: 'Who is the "responsible person" for H&S reports within a firm?', options: [
    'The complete system of sensor, controller and final control element that measures a process variable, compares it to a setpoint, and adjusts the process accordingly',
    'Usually the MHSWR Reg 7 designated competent person — H&S manager, contracts manager, Qualified Supervisor, or director. Every firm with 5+ employees should have one named in the H&S policy.',
    'Record it as a defect (typically C3 improvement recommended or C2 if circuit identification is inadequate for safe isolation), and recommend the chart be updated as part of remedial works',
    'A progressive deterioration that requires investigation — possibly bearing wear, insulation degradation, ventilation blockage, or increasing load — before the motor fails catastrophically',
  ], correctAnswer: 1, explanation: 'Reg 7 designation. Knowing your firm\'s named person is L3-essential.' },
  { id: 2, question: 'What\'s the route for a RIDDOR-reportable incident?', options: [
    'Other apprentices on the same job, the Improver(s) (post-college, pre-AM2 colleagues), the Approved Electrician(s) you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re paired with, and the formally-allocated Mentor. The peer group is who you spend most of your time with day to day and who you learn the trade from in real time.',
    'One unfused spur per outlet on the ring is permitted, with the spur cable matching the ring conductor size. Detected in Step 3 testing as a single socket reading higher than the rest of the constant set — the extra resistance is the round-trip length of the spur cable.',
    'Internal first — to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s responsible person who is the "Reg 3 responsible person" under RIDDOR. They make the F2508 / F2508A submission via riddor.hse.gov.uk or phone 0345 300 9923 for fatalities/specified injuries. Your job is to escalate to them, not to make the report yourself unless you ARE the responsible person.',
    'Connect one MFT lead to the MET clamp and the other to the bonding clamp at the gas service — read directly. The reading proves end-to-end resistance of the conductor including both clamps. Acceptance: < 0.05 Ω as a practical rule of thumb.',
  ], correctAnswer: 2, explanation: 'RIDDOR responsibility is on the "responsible person" defined by Reg 3 — typically the employer. Operatives escalate; responsible person reports.' },
  { id: 3, question: 'What\'s the route for an environmental hazard / pollution incident?', options: [
    'MCS Certificate, manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s commissioning records, design documentation including heat-loss calculation, system schematic, controls programming details, maintenance instructions and a Building Regs compliance certificate',
    'Revised to apply to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary.',
    'You are entitled to a retake — the assessment plan specifies the process and timeframe for retakes, and your training provider will support you in addressing the areas that need improvement before you reattempt',
    'Internal to firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s responsible person; external to Environment Agency 0800 80 70 60 (24/7) in England, SEPA in Scotland, NRW in Wales. For controlled waters / water pollution / land contamination / hazardous-substance escape. Local authority for noise nuisance / contaminated land issues.',
  ], correctAnswer: 3, explanation: 'Environmental reporting has its own dedicated routes separate from H&S. The 24/7 EA hotline for pollution is the headline number to memorise.' },
  { id: 4, question: 'What\'s a "near-miss" and why does it matter?', options: [
    'An event that could have caused injury but didn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t — a slip without a fall, a near-contact, a tool drop without injury, a small fire that self-extinguished. Near-misses are the leading indicator of where the next incident will happen. Internal reporting and review of near-misses is one of the highest-impact preventive activities.',
    'No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.',
    'Competence is the combination of technical knowledge, practical skills, experience, and the ability to recognise and manage risk appropriate to the work being undertaken. The MOET apprenticeship develops all these elements through structured training, supervised workplace experience, and formal assessment',
    'CAR 2012 Reg 10 — anyone who is or may be exposed to asbestos must receive adequate training. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline for trades. Higher levels (non-licensed work, licensed work) require more advanced training.',
  ], correctAnswer: 0, explanation: 'Heinrich\'s pyramid (loosely) — many near-misses for each minor injury, many minor injuries for each serious incident. Tackle the near-miss and you reduce the major incident rate.' },
  { id: 5, question: 'What\'s the report route for a defective installation discovered during EICR?', options: [
    'Written communication carries emotional tone even without non-verbal cues. EI in writing means: considering how the reader will feel when they read it, choosing words that are clear and respectful, avoiding language that could be interpreted as blame or aggression, and re-reading messages before sending to check for unintended emotional impact — especially important when conveying criticism or bad news',
    'Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.',
    'Remove the cross-connection at the CU, re-land the line and neutral conductors into their correct terminals on the protective device, double-check polarity by visual inspection of the terminations, then proceed to insulation resistance testing (Sub 4) before energising.',
    'Yes — apprentices have the same legal right to join (or not join) a union as any other worker. Unions typically offer reduced \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'apprentice rate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' subscriptions. Apprentice membership is a personal choice; on JIB-graded sites the union shop steward is typically available to support apprentices through workplace issues even if they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re not yet members.',
  ], correctAnswer: 1, explanation: 'EICR coding is the L3-level professional reporting route for installation defects. The dutyholder receives the cert; their duty under EAWR Reg 4(2) is to act on the findings.' },
  { id: 6, question: 'When should you report a safeguarding concern about a customer?', options: [
    '£150-300 per notifiable job — varies by Local Authority. Each notifiable Part P job (consumer unit replacement, new circuit in kitchen/bathroom, full rewire) requires either a Building Notice or full Building Regulations application before work, plus an LABC inspection during/after. Cost adds up fast for a busy domestic installer; CPS membership pays for itself in a handful of jobs.',
    'Parallel paths — every circuit\\\\\\\\\\\\\\\'s insulation appears in parallel between the same L+N+E conductors at the CU. Twelve circuits each at 100 MΩ in parallel give 100/12 ≈ 8.3 MΩ. The reading is low because of summed leakage paths, not because of an insulation fault. Per-circuit testing is more diagnostically useful and is the recommended method.',
    'When you see signs of abuse, neglect, undue pressure, vulnerability or risk that go beyond the scope of an electrical job. Report internally to your firm\\\\\\\\\\\\\\\'s safeguarding lead (where one exists) or contracts manager; signpost to local authority adult/children\\\\\\\\\\\\\\\'s social care if appropriate. Care Act 2014 (England) places statutory duties on local authorities; you don\\\\\\\\\\\\\\\'t make the assessment but you can raise the concern.',
    'Sign in, get a brief visitor induction, wear correct PPE, and be escorted by the Site Manager or a senior member of the contractor\\\\\\\'s team. For a client representative the escort is usually the Project Manager or Site Manager because they\\\\\\\'ll want to talk through progress, snags and any commercial issues.',
  ], correctAnswer: 2, explanation: 'Safeguarding referrals go to local authority adult social services (or children\'s services if relevant). You raise; they assess. Some apprentice trades have formal safeguarding training; if your firm does, you\'ll be briefed.' },
  { id: 7, question: 'What\'s the route for a defect that may indicate a wider product fault?', options: [
    'Safely isolate the installation from the supply. The earthing conductor is the protective earth path — while the supply is live, removing it could leave exposed-conductive-parts undefined relative to earth, and any earth-fault current would have nowhere to go. GN3 explicit: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'For safety reasons, the installation shall be isolated from the supply before disconnecting the earthing conductor.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
    'A loose termination at one end has oxidised over the three years — surface oxide film grows when contact pressure is insufficient, contact resistance climbs, the cable resistance hasn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t changed but the joint has degraded. Investigate, identify the bad terminal, re-make the joint, retest.',
    '(1) Two-pole voltage tester with proving unit (Martindale VI-13800 + GVD2). (2) Clamp meter (Fluke 376FC, Megger DCM330). (3) MFT in continuity range (Megger MFT1741+, Fluke 1664FC). (4) Socket tester (Kewtech KT1717) — first pass only, NOT for sign-off. Four different tasks, four different instruments — each engineered for its specific job.',
    'Report internally; if the defect appears systemic (e.g. a brand of MCB failing prematurely across multiple installs), escalate to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s technical lead who can report to the manufacturer / RAPEX (Rapid Alert System for Non-Food Products) / Office for Product Safety and Standards. Product withdrawals and safety alerts come out of these channels.',
  ], correctAnswer: 3, explanation: 'Product-safety reporting is increasingly important. The Office for Product Safety and Standards (OPSS) issues alerts; the trade press covers them; firms maintain product-safety registers.' },
  { id: 8, question: 'How does the L3 supervisor decide which report route to use?', options: [
    'Map the issue: Personal injury / illness → RIDDOR + internal; equipment defect → internal + product reporting; environmental hazard → EA/SEPA/NRW + internal; safeguarding → local authority + internal; installation defect → EICR + customer + internal; near-miss → internal log; HSE notice → firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s legal/H&S team. Multiple routes can apply simultaneously.',
    'A digital, structured, accessible and current set of information about a higher-risk residential building (HRRB), maintained throughout the building\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life by the dutyholders (Accountable Person, Principal Accountable Person), used by the Building Safety Regulator and by anyone working on the building.',
    'Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.',
    'Three-point fall-of-potential method (most accurate, requires auxiliary spikes), OR earth fault loop impedance test method (Ze test on TT, gives an approximation including supply contribution), OR clamp-meter method (loop impedance via stake current/voltage)',
  ], correctAnswer: 0, explanation: 'The mapping skill is L3-essential. Knowing which route applies to which kind of issue means concerns get to the right place at the right time.' },
];

const faqs = [
  { question: 'What if my firm doesn\'t have a named H&S manager?', answer: 'They\'re required to have one if 5+ employees (MHSWR Reg 7). Ask the contracts manager or director who the designated competent person is. If the answer is "no-one", that\'s itself a Reg 7 breach — escalate to a director and consider raising it externally if necessary.' },
  { question: 'Can I report a concern anonymously?', answer: 'You can request anonymity from the firm\'s responsible person, and the HSE accepts anonymous tip-offs (though they\'re harder to act on). PIDA 1998 protections require you to be identifiable to claim them, but the act of reporting in good faith is protected regardless.' },
  { question: 'What\'s the timescale for raising a near-miss internally?', answer: 'Same day if practical. The next morning at the latest. Memory and detail fade fast; contemporaneous reports have more value.' },
  { question: 'Should I copy the customer on internal H&S reports?', answer: 'Generally no — internal reports are for the firm\'s management. The customer gets information relevant to them (e.g. EICR results, RIDDOR reports affecting their premises) through appropriate channels.' },
  { question: 'How do I report an HSE inspector\'s findings I disagree with?', answer: 'Through the firm\'s legal / H&S team. Improvement notices have a 21-day appeal route to Employment Tribunal; FFI invoices have an internal HSE disputes panel. Don\'t engage directly with HSE on the firm\'s behalf without the firm\'s authority.' },
  { question: 'Are scheme bodies (NICEIC, NAPIT) reporting bodies?', answer: 'They\'re registration bodies for installer competence, not regulators with statutory powers. But a serious installation defect or fraudulent cert can be reported to them and they can suspend / withdraw a firm\'s registration. Often the practical path for installer-level concerns when the firm itself is the issue.' },
  { question: 'How long should we keep records of an internal incident report?', answer: 'RIDDOR records are statutorily 3 years (Reg 12), but Defective Premises Act / BSA 2022 considerations push residential incident records to 30 years in practice. Most firms now retain incident records indefinitely on digital backup.' },
  { question: 'If we self-report a breach to the HSE, does it reduce the fine?', answer: 'Self-reporting and cooperation are explicit mitigating factors in the Sentencing Council Definitive Guideline for Health and Safety Offences (2016). They don\'t guarantee no prosecution, but they reduce the band considerably. The HSE Enforcement Management Model also gives weight to voluntary remediation. Honest self-reporting is almost always the lower-cost path.' },
  { question: 'What\'s the &quot;Concerns and Advice&quot; line at HSE for?', answer: 'It\'s for members of the public, workers and other interested parties to raise safety concerns about workplaces. Phone 0300 003 1647 or web form at hse.gov.uk/contact/concerns. The HSE triages and decides whether to act. Useful when internal escalation has failed and external route is appropriate under PIDA 1998.' },
  { question: 'How does the &quot;responsible person&quot; under RIDDOR differ from the MHSWR Reg 7 competent person?', answer: 'Different roles. The MHSWR Reg 7 competent person is the firm&apos;s designated H&amp;S adviser who assists in undertaking H&amp;S measures generally. The RIDDOR Reg 3 responsible person is whoever is responsible for making the formal report under that regulation — usually the employer (for employee incidents), the self-employed person (for themselves), or the person in control of premises (for some categories). The two can be the same person in practice but the statutory hooks are distinct. The L3 operative escalates to whichever role applies to the incident in front of them.' },
  { question: 'Are we required to publish near-miss data internally to operatives?', answer: 'Not by name, but Reg 13 of MHSWR requires the employer to provide employees with comprehensible information on the risks identified by the assessment. Many firms anonymise near-miss data and share monthly bulletins or toolbox talks summarising trends. Transparent near-miss reporting is one of the strongest leading indicators of safety culture; firms that hide near-miss data tend to be the ones where the next significant incident is brewing.' },
  { question: 'What happens if the firm refuses to submit a RIDDOR report I&apos;ve raised?', answer: 'Document the refusal in writing. Escalate to a director if the responsible person is refusing. If the firm persists in refusing what you reasonably believe is a reportable matter, PIDA 1998 protects external disclosure to the HSE (a prescribed person under s.43F ERA 1996). The HSE concerns line at 0300 003 1647 or the online form is the route. Failure to report is itself a separate offence under RIDDOR Reg 6 and HASAWA s.33.' },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 2</button>
          <PageHero eyebrow="Module 1 · Section 2 · Subsection 4" title="Reporting routes — the right responsible person" description="Remember from L2 — escalate to a responsible person. At L3 the depth is identifying WHICH responsible person for which kind of issue, and recognising that multiple parallel routes often apply simultaneously." tone="emerald" />
          <TLDR points={[
            'Multiple reporting routes exist in parallel — internal (firm), RIDDOR (HSE), environmental (EA/SEPA/NRW), safeguarding (local authority), scheme body (NICEIC/NAPIT), product safety (OPSS). One incident often needs several.',
            "The 'responsible person' under MHSWR Reg 7 is the firm's designated competent person — usually H&S manager, contracts manager, Qualified Supervisor or director.",
            "Internal first is the discipline — except where internal escalation has demonstrably failed (then PIDA 1998 protects external).",
            "Near-miss reports are the highest-value preventive activity. Whirlpool £15m (2018) shows unreported near-misses become aggravating factors after a fatality.",
            "EICR coding (C1 / C2 / C3 / FI) is the L3-professional report route for installation defects — formal, structured, addressed to the dutyholder.",
            "HASAWA s.20 inspector interviews are not the same as PACE-cautioned interviews. Know which you&apos;re in before answering questions that probe your own liability.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the responsible persons for different categories of H&S report — internal, RIDDOR, environmental, safeguarding, product, scheme.",
            "Apply the principle of parallel reporting (one incident = multiple appropriate routes).",
            "Distinguish near-miss from incident and apply same-day internal reporting discipline.",
            "Identify the EICR coding system as the formal report route for installation defects.",
            "Apply Care Act 2014 safeguarding awareness — raising the concern, not making the assessment.",
            "Recognise product-safety reporting routes via Office for Product Safety and Standards (OPSS) and trade body alerts.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Internal reporting — the firm's responsible person</ContentEyebrow>
          <ConceptBlock title="MHSWR Reg 7 designated competent person" plainEnglish="Every firm with 5+ employees must have a designated competent person to assist in undertaking H&S measures. This is your first internal escalation address — usually the H&S manager, contracts manager, Qualified Supervisor or a director." onSite="Find out who this is for YOUR firm on day one. The H&S policy will name them. If the policy doesn\'t exist or doesn\'t name them, that\'s itself a Reg 7 / s.2(3) breach to flag.">
            <p>Internal report categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Incidents and near-misses</strong> — same day report.</li>
              <li><strong>Equipment defects</strong> — pull from service, tag, internal report.</li>
              <li><strong>Procedure failures</strong> — RAMS doesn&apos;t match the site, instructions missing, training gap identified.</li>
              <li><strong>Customer / site concerns</strong> — vulnerable persons, dangerous occupant behaviour, safeguarding indicators.</li>
              <li><strong>Inspector visit</strong> — immediate phone notification of any HSE / EA visit.</li>
              <li><strong>Concerns about colleagues</strong> — competence, behaviour, fitness for duty.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Near-miss culture" plainEnglish="Near-misses are events that could have caused injury but didn\'t. Reporting them is the cheapest way to prevent the next incident — Heinrich\'s loose ratio of 300:30:1 (near-misses : minor : serious) is a memory aid." onSite="Most firms have an electronic near-miss reporting form. If yours doesn\'t, write a short note in the job pack. Make it routine — if the only thing that gets reported is actual injury, the firm misses the leading indicators.">
            <p>What counts as a near-miss worth reporting:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Slip without a fall.</li>
              <li>Tool drop from height with no injury.</li>
              <li>Stepladder wobble that didn&apos;t fall.</li>
              <li>Cable detector miss that didn&apos;t lead to a strike.</li>
              <li>Small fire that self-extinguished.</li>
              <li>Tripped breaker that wasn&apos;t expected.</li>
              <li>Safe-isolation lock-off bypass discovered.</li>
              <li>Customer behaviour that put you in difficulty (running children near work area, aggressive interaction).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Management of Health and Safety at Work Regulations 1999 — Reg 7(1)" clause={<>"Every employer shall, subject to paragraphs (6) and (7), appoint one or more competent persons to assist him in undertaking the measures he needs to take to comply with the requirements and prohibitions imposed upon him by or under the relevant statutory provisions and by Part II of the Fire Precautions (Workplace) Regulations 1997."</>} meaning={<>The Reg 7 competent person is the firm&apos;s &quot;responsible person&quot; for H&amp;S reporting. Reg 7(8) defines competence as having &quot;sufficient training and experience or knowledge and other qualities&quot; for the role. In a small electrical firm this is often the Qualified Supervisor (NICEIC / NAPIT designation); in a larger firm a separate H&amp;S manager.</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 7." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>External reporting routes</ContentEyebrow>
          <ConceptBlock title="Multiple regulators, multiple routes" plainEnglish="External reports go to the appropriate regulator depending on the issue type. RIDDOR-reportable injuries → HSE. Pollution → Environment Agency / SEPA / NRW. Safeguarding → local authority. Product safety → manufacturer + OPSS. Installation defects with scheme implications → NICEIC / NAPIT. Each has its own route and timescale." onSite="The L3 mapping skill: when an issue arises, identify which regulator(s) and route(s) apply. Internal first; then external via the firm\'s responsible person; then direct external (PIDA-protected) only if internal has failed.">
            <p>External regulator quick-reference:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HSE</strong> — workplace H&amp;S, RIDDOR. Online: hse.gov.uk; phone: 0345 300 9923.</li>
              <li><strong>Local Authority EHO</strong> — H&amp;S in retail/office/leisure/residential; statutory nuisance.</li>
              <li><strong>Environment Agency</strong> (England) — pollution, waste, contaminated land. 0800 80 70 60 (24/7).</li>
              <li><strong>SEPA</strong> (Scotland) — same scope, separate body.</li>
              <li><strong>NRW</strong> (Wales) — same scope, separate body.</li>
              <li><strong>Local Authority Adult/Children&apos;s Social Care</strong> — safeguarding referrals.</li>
              <li><strong>OPSS</strong> — product safety alerts and recalls.</li>
              <li><strong>NICEIC / NAPIT / Stroma / ELECSA</strong> — installer competence schemes; complaints and defective work.</li>
              <li><strong>Building Safety Regulator</strong> (BSR, within HSE) — HRRB matters under BSA 2022.</li>
              <li><strong>Fire and Rescue Service</strong> — RRFSO 2005 fire safety enforcement.</li>
              <li><strong>Gas Safe Register</strong> — gas safety / unauthorised gas work.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="EICR — the formal report route for installation defects" plainEnglish="Electrical Installation Condition Reports are the L3-relevant formal route for reporting installation defects. The coding system (C1/C2/C3/FI) is the structured way to communicate severity to the dutyholder." onSite="C1 = immediate danger; remedial action required immediately, often before leaving site. C2 = potentially dangerous; remedial action urgent. C3 = improvement recommended; not unsafe but doesn\'t comply with current edition. FI = further investigation needed. The EICR goes to the dutyholder; their EAWR Reg 4(2) duty drives the response.">
            <p>EICR coding shorthand:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>C1 — Danger present</strong>. Immediate action — make safe on the day or escalate.</li>
              <li><strong>C2 — Potentially dangerous</strong>. Remedial action urgent.</li>
              <li><strong>C3 — Improvement recommended</strong>. Not currently unsafe but doesn&apos;t meet current edition.</li>
              <li><strong>FI — Further investigation</strong>. Cause of finding cannot be established without intrusive work.</li>
              <li>Overall outcome: Satisfactory only if no C1 / C2 / FI present.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Safeguarding awareness</ContentEyebrow>
          <ConceptBlock title="Care Act 2014 — raise the concern, don\'t make the assessment" plainEnglish="Visiting electricians are sometimes the only outside contact a vulnerable adult has in a week. Recognising signs of abuse, neglect or undue pressure — and knowing how to raise it — is a real-world part of L3 trade work, even though it isn\'t the C&G syllabus headline." onSite="If something doesn\'t feel right — bruising the customer doesn\'t explain, a relative who pushes the customer around verbally, evidence of self-neglect, signs of cognitive impairment with no support visible — raise it. Internally to your firm; externally to local authority adult social care if you believe there\'s a safeguarding need. You raise; they assess.">
            <p>Practical signposting:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Internal — firm&apos;s safeguarding lead (where one exists) or contracts manager.</li>
              <li>Local authority — adult social care (Care Act 2014) for adults; children&apos;s social care (Children Act 1989) for children.</li>
              <li>Police — if you witness an immediate safeguarding crime in progress (assault etc).</li>
              <li>NSPCC helpline — if children are at risk and immediate police isn&apos;t appropriate.</li>
              <li>Document what you observed and what you reported. Don&apos;t investigate or interview the suspected victim.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>HSE concerns line — when external is the right route</ContentEyebrow>

          <ConceptBlock
            title="The 0300 003 1647 line and the online concerns form"
            plainEnglish="The HSE operates a Concerns and Advice line for members of the public, workers and others who want to report safety issues. Phone 0300 003 1647; web form via hse.gov.uk/contact/concerns. Reports can be anonymous (though anonymous reports are harder to act on). The HSE doesn&apos;t investigate every concern — they triage by risk, evidence and pattern — but every concern is logged and contributes to the inspector&apos;s intelligence picture."
            onSite="At L3 the external HSE concerns route is the option you reach for when internal escalation has demonstrably failed and the issue is significant enough to warrant external attention. PIDA 1998 protects the disclosure provided the conditions are met. Use it sparingly and seriously — the HSE relies on credible reporters and discounts vexatious or trivial complaints quickly."
          >
            <p>What to include in an HSE concerns report:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specific facts</strong> — what, where, when, who, how often. Photos if
                you have them lawfully.
              </li>
              <li>
                <strong>Regulation breached</strong> — name the relevant statute or regulation
                if you know it.
              </li>
              <li>
                <strong>Internal escalation history</strong> — what you raised internally, when,
                response received.
              </li>
              <li>
                <strong>Risk and harm</strong> — what could happen, who is at risk, has anyone
                been hurt yet.
              </li>
              <li>
                <strong>Your relationship to the issue</strong> — worker, contractor, customer,
                neighbour, member of the public.
              </li>
              <li>
                <strong>Contact details</strong> — anonymous reporting is allowed but
                contactable reports get follow-up that anonymous can&apos;t.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Scheme body complaints — when the firm is the issue</ContentEyebrow>

          <ConceptBlock
            title="NICEIC, NAPIT and the scheme&apos;s complaint route"
            plainEnglish="Competent Person Schemes — NICEIC, NAPIT, Stroma, ELECSA, Certsure — are voluntary registration bodies that audit firm and Qualified Supervisor competence. They run formal complaints processes. A complaint can result in re-audit, additional inspection visits, training requirements, suspension or removal of registration. For installation defects on registered firm work, the scheme is often the most practically effective route — particularly when the customer can&apos;t get the firm to put right defective work."
            onSite="At L3 the scheme route comes up most often when a customer engages your firm to remediate work done by another scheme-registered firm. Your firm typically has a duty to flag the defective work to the scheme; the scheme then investigates. Anonymity for the reporting firm is normally protected. The route is used regularly and works."
          >
            <p>When to use the scheme complaint route:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Defective work by a scheme-registered firm</strong> that the firm
                won&apos;t put right when challenged.
              </li>
              <li>
                <strong>Fraudulent certificates</strong> — EICs / EICRs / Minor Works that
                don&apos;t reflect work actually done.
              </li>
              <li>
                <strong>Work claimed as compliant under Approved Doc P that wasn&apos;t
                notified</strong> — the scheme should have notified Building Control on the
                firm&apos;s behalf.
              </li>
              <li>
                <strong>Use of scheme branding by an unregistered firm</strong> — passing-off
                fraud.
              </li>
              <li>
                <strong>Pattern of poor work across multiple jobs</strong> by a registered
                Qualified Supervisor.
              </li>
              <li>
                <strong>Failure to honour the scheme&apos;s warranty / consumer-protection
                provisions</strong>.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Pre-qualification questionnaires — the commercial-impact layer</ContentEyebrow>

          <ConceptBlock
            title="Why your firm&apos;s reporting record affects what work you can bid for"
            plainEnglish="Major clients (housing associations, NHS trusts, local authorities, framework agreements like CHAS / Constructionline / SafeContractor / Achilles) operate Pre-Qualification Questionnaires (PQQ) that ask for declarations of HSE notices, RIDDOR reports, prosecutions, FFI invoices and disciplinary actions in the past 3-5 years. A clean record opens doors; a poor record closes them. The PQQ effect is often the firm&apos;s biggest commercial driver of safety culture — bigger than fines."
            onSite="At L3 you contribute to the firm&apos;s PQQ record every time you raise a near-miss, close out an action, follow safe-isolation procedures and document the work properly. The accumulated record across the firm becomes the evidence at the next PQQ submission. The firm&apos;s ability to bid for the next major framework depends on what you and your colleagues did over the past 3 years."
          >
            <p>What PQQs typically ask:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSE notices in past 3-5 years</strong> — declared with detail.
              </li>
              <li>
                <strong>Convictions for H&amp;S offences</strong> — including under HASAWA,
                EAWR, CDM.
              </li>
              <li>
                <strong>RIDDOR-reportable incidents</strong> — number per year per 100,000
                hours worked. Comparison against industry average.
              </li>
              <li>
                <strong>Insurance claims experience</strong> — Employer&apos;s Liability and
                Public Liability claims.
              </li>
              <li>
                <strong>Training records</strong> — proportion of operatives with current
                qualifications and CPD.
              </li>
              <li>
                <strong>Scheme registrations and accreditations</strong> — NICEIC, NAPIT,
                CHAS, Constructionline, ISO 45001, ISO 14001.
              </li>
              <li>
                <strong>Sample RAMS and method statements</strong> — for similar projects.
              </li>
              <li>
                <strong>References</strong> — from previous projects of similar size and risk.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 12"
            clause={
              <>
                &quot;The responsible person must keep a record of any reportable injury,
                disease or dangerous occurrence which requires reporting under regulations 4, 5,
                6 or 7. The record must be kept for at least 3 years from the date on which it
                was made.&quot;
              </>
            }
            meaning={
              <>
                The 3-year retention duty. Most firms keep RIDDOR records far longer for PQQ
                purposes (clients commonly ask for 5+ years) and for Defective Premises Act
                purposes (BSA 2022 extension to 30-year retrospective limit on residential).
                The retention duty applies to the responsible person — usually the employer —
                and the records must be available for inspection.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 12."
          />

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 — s.37(1)"
            clause={
              <>
                &quot;Where an offence under any of the relevant statutory provisions committed
                by a body corporate is proved to have been committed with the consent or
                connivance of, or to have been attributable to any neglect on the part of, any
                director, manager, secretary or other similar officer of the body corporate or
                a person who was purporting to act in any such capacity, he as well as the
                body corporate shall be guilty of that offence and shall be liable to be
                proceeded against and punished accordingly.&quot;
              </>
            }
            meaning={
              <>
                Director-level personal liability. When an internal report is escalated and
                the &quot;responsible person&quot; chooses not to act, s.37 reaches them
                personally — not just the company. This is why robust internal reporting
                systems matter: the paper trail showing an issue was raised and ignored is
                exactly the evidence that converts a corporate prosecution into a personal
                one. The L3 escalation discipline (verbal plus written, copies retained)
                protects both you and forces the responsible person to engage.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974 (1974 c.37), s.37."
          />

          <SectionRule />
          <ContentEyebrow>Defective Premises Act &amp; the BSA 2022 retrospective tail</ContentEyebrow>

          <ConceptBlock
            title="Why electrical defects in dwellings can come back 30 years later"
            plainEnglish="The Defective Premises Act 1972 s.1 places a duty on anyone taking on work for or in connection with the provision of a dwelling to ensure the work is done in a workmanlike manner with proper materials and the dwelling is fit for habitation. Originally there was a 6-year limitation. The Building Safety Act 2022 s.135 extended this dramatically: for works completed before 28 June 2022, the limitation is 30 years retrospective; for works after that date, 15 years prospective. An electrical defect in a 2024 CU change can be litigated to 2039; in a 2010 install, until 2040. Reporting and record-keeping take on a different gravity at those timescales."
            onSite="The L3 reporting discipline directly shapes the firm&apos;s defensibility decades into the future. The job-pack note, the witness inspection record, the EICR coding, the customer briefing — all become the evidence base if the work is challenged years later by a future homeowner. Records that &apos;might as well be kept&apos; suddenly are the firm&apos;s primary defence."
          >
            <p>What needs to survive 30 years of records:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Original certificate</strong> (EIC, MWC, EICR) — model form,
                schedule of inspections, schedule of test results, signatures.
              </li>
              <li>
                <strong>Photos of installation</strong> — pre-, during-, and post-work
                conditions; cable routing; CU layout.
              </li>
              <li>
                <strong>Job-pack notes</strong> — what was done, what was found, what was
                left.
              </li>
              <li>
                <strong>Customer correspondence</strong> — emails, signed acceptance forms,
                briefings on remaining issues.
              </li>
              <li>
                <strong>Materials records</strong> — manufacturers, batch numbers, sources;
                relevant where a future product-defect claim might attach.
              </li>
              <li>
                <strong>Operative records</strong> — who did the work, what their
                qualifications were at the time.
              </li>
              <li>
                <strong>Scheme registration evidence</strong> — for the relevant period.
              </li>
              <li>
                <strong>Insurance records</strong> — PI / EL cover at the time of the work
                (claims-made vs occurrence basis matters here).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Internal incident-management triangle — RIDDOR + insurance + customer comms</ContentEyebrow>

          <ConceptBlock
            title="The three parallel streams after any significant incident"
            plainEnglish="Any significant incident generates three parallel reporting streams that must be managed together: the regulatory stream (RIDDOR via HSE, plus any environmental, fire or scheme regulator), the insurance stream (EL, PL, PI insurer notifications), and the customer/contractual stream (the customer or principal contractor, framework agreement notification obligations, possible PR/comms). Each has its own audience, timescale and legal weight. Confusion between the three is one of the most common ways firms get themselves into deeper trouble after an incident."
            onSite="L3 contribution to this triangle: feed the firm&apos;s responsible person clean, consistent facts. The same factual core should flow to all three streams; what differs is the framing, the level of detail, and the timescale. Resist the temptation to brief the customer differently from the regulator — inconsistent accounts get discovered and damage credibility."
          >
            <p>The three streams compared:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulatory (HSE / EA / scheme)</strong> — formal report under
                statute or scheme rules; timescale mandated; format prescribed (F2508
                etc); investigator follow-up expected.
              </li>
              <li>
                <strong>Insurance (EL / PL / PI)</strong> — &quot;notification of
                circumstances&quot; under policy terms; usually within 7-14 days from
                awareness; insurer assigns claims handler, may take conduct of any
                resulting claim.
              </li>
              <li>
                <strong>Customer / contractual</strong> — courtesy and contractual
                obligation; usually same-day for serious matters; tone is supportive,
                factual, professionally framed.
              </li>
              <li>
                <strong>Internal</strong> — root-cause analysis, lessons learned, fleet /
                procedure / training updates; weeks-to-months timescale.
              </li>
              <li>
                <strong>Press / public</strong> — only via firm&apos;s designated
                spokesperson; operatives should not comment to media.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title='"Just telling the supervisor" and assuming it goes from there' whatHappens={<>Apprentice spots a near-miss on a customer&apos;s site (faulty step-up). Mentions it to the supervisor verbally over the phone. Supervisor forgets. Three weeks later a different operative falls from the same step-up; injury results. Investigation finds the original near-miss wasn&apos;t logged. Firm prosecuted; original apprentice &quot;told someone&quot; but didn&apos;t document.</>} doInstead={<>Verbal + written. Phone the supervisor AND log the near-miss in the firm&apos;s system AND email the supervisor with the details. Triple-channel reporting for anything safety-relevant. The cost is two minutes; the benefit is creating a record that survives memory failure.</>} />

          <CommonMistake title="Reporting an HSE-reportable matter directly without internal escalation" whatHappens={<>Apprentice unilaterally calls HSE about a workplace concern without first escalating internally. HSE attends; firm is blindsided; the underlying concern was real but the relationship is destroyed; apprentice loses the protection of having gone through proper channels.</>} doInstead={<>Internal first — give the firm a reasonable opportunity to address the concern. PIDA 1998 protections for external disclosure require (in most cases) internal route to have been tried OR for there to be evidence internal route would be ineffective (e.g. firm complicit). Document the internal route; only go external when it&apos;s demonstrably failed.</>} />

          <Scenario title="Multiple parallel reports for one incident" situation={<>You arrive at a small commercial unit to investigate a flickering circuit. You find: (1) the customer has been bypassing the RCD by clipping the test button; (2) the customer is an elderly lone trader who seems confused; (3) there&apos;s a small smoke mark on the consumer unit suggesting a previous overheat event; (4) you notice the building&apos;s fire alarm is showing a fault and the panel says &quot;disabled&quot;; (5) the customer&apos;s landlord is on speakerphone pressuring them to &quot;not worry about all this stuff&quot;.</>} whatToDo={<>Map the multiple parallel routes. (1) Restore safe isolation immediately — reinstate the RCD if possible; if you can&apos;t make safe today, leave the supply isolated and document with photos. EICR coding C1 for the bypass; C2 / FI for the smoke mark depending on what you can determine. (2) Internal report to your firm&apos;s contracts manager / H&amp;S manager — pressure from landlord is a customer-care escalation; possible safeguarding concern about confused elderly customer. (3) Customer notification of the EICR findings in writing; copy to landlord if customer authorises. (4) Fire alarm disabled is a Regulatory Reform (Fire Safety) Order 2005 issue — the responsible person (likely the landlord) is in breach; advise the customer in writing; consider notifying the local Fire and Rescue Service if it&apos;s clearly a breach with risk to life. (5) Safeguarding concern about elderly customer with potentially undue pressure — consider local authority adult social care referral; raise with your firm first. Document everything. One incident; five potentially-required reports.</>} whyItMatters={<>The L3 reporting-route mapping is what stops issues falling through the cracks. Each of these issues sits with a different responsible person; failing to escalate any one of them leaves a duty unfulfilled. The firm&apos;s reputation for thoroughness is what wins repeat business and the operative&apos;s personal s.7 record stays clean.</>} />

          <Scenario
            title="The HSE concerns line — when internal has demonstrably failed"
            situation={
              <>
                You have raised concerns about your firm&apos;s deteriorating safe-isolation
                practice three times in writing over six weeks — to your supervisor, to the
                contracts manager, and finally to a director. Each raise has been
                acknowledged and quietly buried; no changes have been made. You have now
                witnessed a colleague work live on a 230V circuit at the direction of the
                same supervisor, and the contracts manager and director are aware of the
                ongoing practice.
              </>
            }
            whatToDo={
              <>
                Internal route has demonstrably failed. PIDA 1998 (ERA 1996 Part IVA) now
                protects external disclosure to the HSE as a prescribed person under s.43F.
                Use the HSE concerns line on 0300 003 1647 or the online form at
                hse.gov.uk/contact/concerns. Provide: specific facts (who, what, where,
                when, how often), the regulation breached (EAWR Reg 14), your three written
                internal raises with dates and recipients, and your contact details. Retain
                copies of everything. Inform your union if you have one. Consider seeking
                early ACAS / solicitor advice on any subsequent firm response.
              </>
            }
            whyItMatters={
              <>
                The PIDA protection is real but procedurally exacting. The HSE expects to
                see a documented internal escalation before they will treat the external
                disclosure as protected; bypassing internal where it has not demonstrably
                failed weakens the PIDA defence to any subsequent detriment claim. The
                three-raise sequence over six weeks plus the documented buried-acknowledgement
                pattern is the evidence trail that makes the external disclosure protected
                and proportionate.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>The contemporaneous record — what to capture in the first hour after an incident</ContentEyebrow>

          <ConceptBlock
            title="Why the first 60 minutes are evidentially decisive"
            plainEnglish="The single most valuable evidence in any subsequent investigation is what was written down in the first 60 minutes after an incident. Memory degrades; accounts merge with what was heard from others; mobile phones move; conditions change as people start cleaning up. The L3 supervisor reflex once any immediate first aid is dealt with is to start capturing — photos, contemporaneous notes from anyone present, screenshots of any system alerts, copies of any messages that preceded the event. Most of this work is impossible to do well two days later."
            onSite="Practical sequence in the first hour: scene control, photographs from multiple angles, individual witness write-downs done separately (so accounts don&apos;t cross-contaminate), retention of any failed equipment, system / app log preservation, communication trail (texts, emails, work-order app entries) screenshot and time-stamped. The firm&apos;s responsible person directs but the L3 supervisor on the ground is often the one executing."
          >
            <p>First-hour evidence checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scene photographs</strong> — wide context, medium detail, close detail.
                Include any safety signage / barriers, position of casualty (if appropriate
                and consensual), state of equipment, lighting, weather.
              </li>
              <li>
                <strong>Witness write-downs</strong> — separate sheets, in own words, signed
                and dated. Avoid prompting or suggesting.
              </li>
              <li>
                <strong>Equipment preservation</strong> — failed equipment kept intact; not
                modified, not cleaned, not disposed of.
              </li>
              <li>
                <strong>System logs</strong> — work-order app, vehicle telematics, electronic
                test instrument data, CCTV (if available, request preservation in writing
                same-day).
              </li>
              <li>
                <strong>Communication trail</strong> — texts, emails, app messages from
                before the event preserved with timestamps.
              </li>
              <li>
                <strong>Conditions log</strong> — weather, lighting, temperature, noise
                level, time of day, who was on shift.
              </li>
              <li>
                <strong>Your own account</strong> — your contemporaneous notes from the day
                of the incident; write before discussing the event in detail with anyone.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Case study — Whirlpool UK Appliances [2018] and the cost of late-and-incomplete reporting</ContentEyebrow>

          <ConceptBlock
            title="When £15m turns on the gap between incident and report"
            plainEnglish="Whirlpool UK Appliances was fined £15m in 2018 after an apprentice was crushed to death by a falling pallet at the Yate distribution centre. The HSE&apos;s investigation found multiple failings — but the prosecution&apos;s aggravating factors included the firm&apos;s delayed and incomplete RIDDOR submission, and earlier near-misses involving similar pallet stacks that had been observed by operatives but not reported through the firm&apos;s system. The Sentencing Council Definitive Guideline (2016) treats the firm&apos;s response, including transparency in reporting, as one of the factors moving the case up or down the harm × culpability matrix. Whirlpool&apos;s £15m sat in the very-large-turnover, high-culpability, Category 1 harm cell — partly because the firm could not show that earlier near-misses had been escalated and acted upon."
            onSite="The L3 reading: the firm&apos;s reporting record over years before an incident shapes the eventual sentence after one. Every near-miss you log, every internal report you make, every escalation you document is a building block in the firm&apos;s mitigation evidence if a serious incident ever occurs. Firms that have a culture of reporting and acting on near-misses receive significantly lower fines after fatal incidents than firms that did not — even where the underlying cause is similar. The aggregate of small reports is the long-term defence."
          >
            <p>What the Whirlpool case tells L3 operatives about reporting culture:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Near-miss reports are evidence of due diligence</strong> — they show
                the firm was tracking and acting on warning signs.
              </li>
              <li>
                <strong>Unreported near-misses become aggravating factors</strong> — if
                operatives observed similar issues but did not report (because reporting was
                discouraged or pointless), the HSE will note that as systemic.
              </li>
              <li>
                <strong>Late RIDDOR reports are separate offences</strong> — Reg 6 lateness
                stacks on top of the underlying breach.
              </li>
              <li>
                <strong>Incomplete RIDDOR reports invite re-investigation</strong> — partial
                facts trigger HSE follow-up that may uncover wider issues.
              </li>
              <li>
                <strong>The Sentencing Council guideline (2016)</strong> explicitly treats
                quality of reporting as a moving factor in the culpability × harm matrix.
              </li>
              <li>
                <strong>Senior management knowledge</strong> — if a director knew about
                similar near-misses and did not act, s.37 personal liability attaches.
              </li>
              <li>
                <strong>Internal communication of lessons</strong> — was the near-miss
                summarised in a toolbox talk? Was the operative briefed on the changes? These
                are evidence touchpoints.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Step-by-step procedure — running a near-miss through the firm&apos;s system</ContentEyebrow>

          <ConceptBlock
            title="From observation to closed-out action — what good looks like"
            plainEnglish="Most firms have a near-miss reporting form (paper or digital). The form is the entry point but the process around it is what creates value. The L3 supervisor reflex is to treat near-miss reports the way the firm treats invoices: every one gets logged, every one gets a reference number, every one gets reviewed, every one gets a closed-out action with a named owner, every one gets summarised in the next safety bulletin. The form on its own is administrative theatre; the process is what reduces the next incident."
            onSite="Step-by-step the L3 supervisor follows when a near-miss is observed: (1) make safe at the scene; (2) write a brief contemporaneous note; (3) photograph if relevant; (4) submit the firm&apos;s form same-day; (5) notify the responsible person verbally; (6) participate in any follow-up review; (7) ensure any agreed action is implemented; (8) check the firm&apos;s next bulletin to confirm the learning was shared. Skipping any step weakens the chain."
          >
            <p>The eight-step near-miss process unpacked:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Make safe at the scene</strong> — remove the immediate hazard, tag out
                of service if equipment, restrict access if environmental.
              </li>
              <li>
                <strong>Contemporaneous note</strong> — date, time, location, what happened,
                what could have happened, who was present, what was done.
              </li>
              <li>
                <strong>Photographs</strong> — equipment condition, location, any
                contributing factors (lighting, weather, clutter).
              </li>
              <li>
                <strong>Submit firm&apos;s form same-day</strong> — paper or digital. Memory
                degrades fast; same-day submission preserves accuracy.
              </li>
              <li>
                <strong>Notify responsible person verbally</strong> — phone or in-person
                briefing in addition to the form submission; ensures awareness.
              </li>
              <li>
                <strong>Follow-up review</strong> — usually within 7-14 days; root-cause
                analysis if pattern; action planning if change needed.
              </li>
              <li>
                <strong>Action implementation</strong> — fleet check, RAMS update, training
                refresh, supplier change, procedure rewrite as applicable.
              </li>
              <li>
                <strong>Lesson sharing</strong> — toolbox talk, safety bulletin, training
                module update; visible closure of the loop.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference table — which regulator for which kind of issue</ContentEyebrow>

          <ConceptBlock
            title="The L3 mapping table you should be able to recite cold"
            plainEnglish="When an issue arises the first question is &apos;who is the regulator?&apos;. Multiple regulators sit in parallel across H&amp;S, environmental, safeguarding, product, fire and building safety. Knowing the right one (or the right combination) for the issue in front of you is the L3 supervisor mapping skill that the AC 2.4 syllabus is testing."
            onSite="Carry the mapping in your head. When something goes wrong on site, the routing decision is part of the response — not something you research afterwards. Mis-routed reports get bounced back and wasted time may shift an incident into a fine."
          >
            <p>The regulator-mapping table by issue type:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Personal injury at work (employee)</strong> — RIDDOR via HSE +
                internal + insurance + customer (if affecting their premises).
              </li>
              <li>
                <strong>Personal injury at work (member of public on your site)</strong> —
                RIDDOR via HSE if hospitalised; internal; insurance; customer; police if
                criminal element suspected.
              </li>
              <li>
                <strong>Environmental release (water / land / hazardous substance)</strong> —
                Environment Agency 0800 80 70 60 (England), SEPA (Scotland), NRW (Wales);
                internal; local authority for some scenarios.
              </li>
              <li>
                <strong>Fire / smoke / fire alarm bypass</strong> — Fire and Rescue Service
                for active incidents; RRFSO 2005 responsible person (often the
                landlord/employer) for systemic issues; internal; insurance.
              </li>
              <li>
                <strong>Safeguarding concern (vulnerable adult)</strong> — local authority
                adult social care under Care Act 2014; police if immediate criminal element;
                internal safeguarding lead.
              </li>
              <li>
                <strong>Safeguarding concern (child)</strong> — local authority children&apos;s
                services under Children Act 1989; NSPCC helpline; police if immediate.
              </li>
              <li>
                <strong>Defective installation by another firm</strong> — scheme body
                (NICEIC, NAPIT, ELECSA, Stroma, Certsure) of the firm in question; customer;
                internal record for future PQQ.
              </li>
              <li>
                <strong>Product defect (manufacturer issue)</strong> — manufacturer +
                Office for Product Safety and Standards (OPSS); internal product-safety
                register.
              </li>
              <li>
                <strong>HRRB matter (BSA 2022)</strong> — Building Safety Regulator (within
                HSE); internal; principal accountable person.
              </li>
              <li>
                <strong>Gas concern</strong> — Gas Safe Register (for unauthorised gas work
                or competence issues); HSE (for incidents under GSIUR 1998).
              </li>
              <li>
                <strong>Asbestos disturbance / suspected exposure</strong> — HSE under CAR
                2012; licensed asbestos contractor for response; internal.
              </li>
              <li>
                <strong>Working time / pay / discrimination</strong> — ACAS; employment
                tribunal; HMRC for unpaid wages; internal grievance.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The s.20 inspector interview — what to do when asked &quot;what happened?&quot;</ContentEyebrow>

          <ConceptBlock
            title="HASAWA s.20 powers and how the L3 operative responds"
            plainEnglish="HASAWA s.20 gives the inspector power to require any person to answer questions and sign a declaration of truth. Refusing to answer is itself an offence under s.33(1)(e). BUT — and this is the critical distinction — answers given under s.20 cannot be used against the person who gave them in a criminal prosecution of that person. They CAN be used against the firm and against other parties. The L3 operative reflex is therefore to answer truthfully under s.20 while being clear that questions about your own potential liability shift the interview into PACE territory (where caution and right to silence apply). Know the difference."
            onSite="When an inspector starts asking questions: be polite, answer factually about what you saw and did, ask the inspector to clarify whether this is a s.20 interview or PACE-cautioned. Do not speculate about cause or blame; stick to what you directly observed. If the question feels like it&apos;s probing for your own personal s.7 liability, request a solicitor before continuing. The firm should provide one; insurer-funded legal support is standard."
          >
            <p>Practical responses to inspector questions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>&quot;What happened?&quot;</strong> — describe what you directly
                observed, in chronological order, in your own words. Stick to facts.
              </li>
              <li>
                <strong>&quot;Who was in charge?&quot;</strong> — name the person; the
                inspector can verify against documentation.
              </li>
              <li>
                <strong>&quot;Did you know this was unsafe?&quot;</strong> — this is a
                liability-probing question. Pause; ask whether this is s.20 or PACE; request a
                solicitor.
              </li>
              <li>
                <strong>&quot;Can I see your training records?&quot;</strong> — produce
                them; do not interpret what they show.
              </li>
              <li>
                <strong>&quot;Was the RAMS available before you started work?&quot;</strong> —
                factual; if you signed in to the RAMS, the inspector can see the timestamp.
              </li>
              <li>
                <strong>&quot;Why did you do X?&quot;</strong> — describe what you did and
                why you understood it to be appropriate at the time. Do not speculate about
                alternatives in hindsight without legal advice.
              </li>
              <li>
                <strong>&quot;Will you sign this statement?&quot;</strong> — read it
                carefully; correct any inaccuracies; do not sign anything you have not
                personally reviewed; ask for a copy.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — report H&S concerns to a responsible person. At L3 the depth is mapping the right person for each kind of issue.",
            "MHSWR Reg 7 designated competent person is the firm's internal H&S 'responsible person'. Find out who they are on day one.",
            "RIDDOR responsible person is the employer / self-employed; they make the F2508. Operatives escalate to them.",
            "Environmental hazards: EA (England, 0800 80 70 60), SEPA (Scotland), NRW (Wales). 24/7 hotlines.",
            "Safeguarding: local authority adult / children's social care. You raise; they assess.",
            "EICR coding (C1/C2/C3/FI) is the formal report route for installation defects.",
            "Near-miss reporting is the highest-value preventive activity. Same-day internal log.",
            "Multiple parallel routes apply to many issues. Map each one and escalate appropriately.",
            "Whirlpool £15m (2018) — unreported near-misses became aggravating factors after the fatality. Reporting culture is long-term defence.",
            "Eight-step near-miss process: make safe, note, photograph, submit form, notify verbally, review, action, share lesson.",
            "HASAWA s.20 vs PACE caution — answer factually under s.20; request solicitor and right-to-silence applies under PACE.",
            "Defective Premises Act 1972 + BSA 2022 s.135 — residential records may need to survive 30 years. Retain accordingly.",
          ]} />
          <Quiz title="Reporting routes — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.3 Limits of responsibility</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.5 RIDDOR F2508 process</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
