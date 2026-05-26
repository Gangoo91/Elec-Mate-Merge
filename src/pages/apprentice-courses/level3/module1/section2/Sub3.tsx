/**
 * Module 1 · Section 2 · Subsection 3 — Limits of responsibility: knowing when to escalate
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.3
 *   AC 2.3 — "state the actions to be taken in situations which exceed their level of
 *            responsibility for Health and Safety in the workplace"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.3 — limitations of responsibilities
 *   - 2357 Unit 601 ELTK01 / AC 2.4 — actions exceeding responsibility
 *
 * L3 expands the limits but they still exist. ERA 1996 s.44 protects you for
 * crossing the line upwards.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario,
  KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Limits of responsibility — knowing when to escalate (2.3) | Level 3 Module 1.2.3 | Elec-Mate';
const DESCRIPTION = 'L3 refresher on limits of responsibility — competence boundaries, escalation routes, ERA 1996 s.44 protection and the supervisor judgement call.';

const checks = [
  {
    id: 'l3-m1-s2-sub3-comp',
    question: 'A customer asks you to disconnect their gas hob so they can renovate the kitchen. What\'s the L3 response?',
    options: [
      'Zs = Ze + (R1 + R2 × temperature multiplier), where Ze is the declared external earth fault loop impedance, R1 is the line conductor resistance, R2 is the CPC resistance, and the multiplier (typically 1.20 for 70 °C thermoplastic) brings the cold cable resistance up to operating temperature.',
      'Refuse. Gas work is restricted to Gas Safe registered engineers under the Gas Safety (Installation and Use) Regulations 1998. As an electrician you are not competent — and not lawfully authorised — to disturb the gas connection. Recommend the customer engage a Gas Safe engineer for the disconnection. You can isolate the electrical supply to the appliance once the gas is safe.',
      'Explaining the situation in person, leading with the safety reason ("I have found a section of wiring that does not meet current safety standards"), showing the specific issue where possible, expressing empathy for the inconvenience ("I understand this is not what you were expecting"), presenting options rather than a single demand, and giving the client time to process before requiring a decision',
      'Apps reduce the friction of recording — entries can be made on the phone in the moment, photos and locations can be attached automatically, the data is searchable later. They also make sharing with the supervisor and the training provider easier. Paper diaries still work fine if maintained; digital tools just lower the barrier to actually keeping them current.',
    ],
    correctIndex: 1,
    explanation: 'Competence boundaries are statutory in some areas — gas work, F-Gas refrigerant work, asbestos licensed work, HV work all require specific certification you cannot acquire by good intention. The L3 reflex: refuse politely, signpost the right contractor, document.',
  },
  {
    id: 'l3-m1-s2-sub3-escalate',
    question: 'You\'re on site and your supervisor isn\'t answering the phone. The customer is pressing you to do something you\'re not sure about. What\'s the L3 escalation?',
    options: [
      'Reg 510.3 — \\\\\\\\\\\\\\\'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers\\\\\\\\\\\\\\\' instructions.\\\\\\\\\\\\\\\' Selection AND erection. The \\\\\\\\\\\\\\\'take account of manufacturers\\\\\\\\\\\\\\\' instructions\\\\\\\\\\\\\\\' clause is what makes the data sheet effectively part of the standard.',
      'BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present',
      'Escalate up the chain — contracts manager, technical manager, Qualified Supervisor, director. Document every attempt to reach someone in writing (text/email). If no-one responds and the work cannot wait safely, decline to proceed and inform the customer in writing of the reason. EAWR Reg 16, HASAWA s.7 and ERA 1996 s.44 all protect this position.',
      'Isolate the supply, lock off the main switch, prove dead at every point, then disconnect the bond at one end (typically the MET end) so the test current flows only through the bond cable being tested and not through parallel paths via other bonds, the earthing conductor or the supply network.',
    ],
    correctIndex: 2,
    explanation: 'Escalation upwards is your right and your duty. The chain doesn\'t stop at the immediate supervisor; senior managers and the firm\'s Qualified Supervisor are the next steps. Document everything in writing as it happens.',
  },
  {
    id: 'l3-m1-s2-sub3-era44',
    question: 'Your firm punishes you (demotion, removal from a job, disciplinary) for refusing an unsafe task. What protection do you have?',
    options: [
      'Employment Rights Act 1996 s.44 — right not to suffer detriment for raising a health and safety concern, refusing dangerous work, or leaving the workplace in serious and imminent danger. Plus Public Interest Disclosure Act 1998 (whistleblowing) for qualifying disclosures. Tribunal route. Compensation can be substantial; reinstatement may be ordered.',
      'UK charity providing financial, welfare and mental health support specifically for people working in the electrical and energy industries (and their families). Services include financial grants in hardship, mental health support, bereavement support, family services. Confidential helpline 0800 652 1618. Website electricalcharity.org. Funded by industry donations and contributions.',
      'Inside the lid of the consumer unit (manufacturer label), or in the manufacturer\\\\\\\\\\\\\\\'s data sheet for the device, or in the manufacturer\\\\\\\\\\\\\\\'s mobile app. Hager\\\\\\\\\\\\\\\'s typical circuit terminal torque is 1.2 Nm; incomers are higher (3.5 Nm). Hitting that value with a calibrated torque screwdriver is what discharges BS 7671 Reg 526.1 (durable connections) and Reg 510.3 (selection and erection in line with mfr instructions).',
      'Proving before use confirms the indicator is working correctly (it will detect voltage); proving after use confirms it was still working when the \\\\\\\\\\\\\\\'dead\\\\\\\\\\\\\\\' reading was taken — this eliminates the risk of relying on a faulty indicator that falsely shows \\\\\\\\\\\\\\\'dead\\\\\\\\\\\\\\\'',
    ],
    correctIndex: 0,
    explanation: 'ERA 1996 s.44 is the protection that makes refusal sustainable. Without it, the threat of demotion or sacking would silence safety concerns. Knowing it exists changes the conversation when you push back.',
  },
];

const quizQuestions = [
  { id: 1, question: 'What\'s the legal source of an L3 apprentice\'s personal duty?', options: [
    'Reducing unnecessary site visits through remote monitoring, enabling predictive maintenance, and allowing fault diagnosis before travelling to site',
    'HASAWA s.7 (personal H&S duty), EAWR Reg 16 (competence), MHSWR Reg 14 (cooperate and report), CDM 2015 Reg 15 (worker), and any specific regulation duty (e.g. PUWER Reg 9 training).',
    'Planning work sequences, gathering materials in advance, coordinating with other teams, communicating realistic timescales and adapting priorities when circumstances change',
    'The Department for Levelling Up, Housing and Communities (DLUHC, now MHCLG) — administered by Building Control bodies (local authority Building Control or Approved Inspectors).',
  ], correctAnswer: 1, explanation: 'Multiple parallel duties; same conclusion — refuse the unsafe instruction and escalate.' },
  { id: 2, question: 'When is escalation upwards justified?', options: [
    'The shortfall must be addressed before the gateway can be opened — your employer and training provider should agree a plan to complete the remaining hours within a realistic timeframe',
    'UKATA / IATP-certified providers offer asbestos awareness (1 day, refresher periodic). Higher levels (non-licensed work, licensed work) require more advanced certified training. CAR 2012 Reg 10 requires adequate training for anyone who may be exposed.',
    'Whenever the situation exceeds your competence, when an unsafe instruction is given, when an inspector arrives, when a serious near-miss occurs, when documents you need don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t exist, when a customer requests work outside your scope.',
    'Explain the rationale for different maintenance strategies, carry out both planned and reactive maintenance tasks competently, provide feedback on equipment condition during PM visits, and contribute to continuous improvement of the maintenance programme',
  ], correctAnswer: 2, explanation: 'L3 escalation is part of normal supervision discipline, not failure. The firm\'s safety system depends on it.' },
  { id: 3, question: 'What does ERA 1996 s.44 protect?', options: [
    'The fire safety design and construction requirements for new buildings and building works, including means of escape, internal fire spread, external fire spread, and access for fire services',
    'Systematic monitoring of workers\\\\\\\\\\\\\\\' health through questionnaires, physical checks, or clinical examinations to detect early signs of MSDs, required where the risk assessment identifies a residual risk of MSDs',
    'Insulation resistance testing at 500 V DC (minimum 1 megohm per BS 7671), winding resistance balance check (within 2%), rotation direction verification, no-load current measurement, and vibration check after coupling to the driven equipment',
    'Right not to suffer detriment for raising a H&S concern, refusing dangerous work, leaving the workplace in serious and imminent danger, or being a designated H&S representative. Detriment = sacking, demotion, removal from job, disciplinary, victimisation, harassment.',
  ], correctAnswer: 3, explanation: 'The single most-important employment-law protection for safety conduct. Tribunal claim if breached.' },
  { id: 4, question: 'What does PIDA 1998 (whistleblowing) protect?', options: [
    'Workers making a "qualifying disclosure" — a disclosure of information that the worker reasonably believes shows malpractice, including criminal offences, breach of legal obligations, miscarriage of justice, danger to health and safety, environmental damage. Protects from detriment and dismissal.',
    'Manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s website (always the latest version), the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s COSHH register (in paper or app form — common apps include Sypol and Alcumus), and the product packaging at the point of purchase. Many manufacturers print QR codes on the can that link directly to the latest SDS.',
    'You must replace or repair the earth electrode and earthing conductor as part of the installation works — TT earth electrodes are CUSTOMER-side assets. Test Ze, RA and confirm RCD discrimination after replacement.',
    'All construction work in Great Britain, with proportionate duties based on project type and size. Notifiable projects (more than 30 working days with 20+ workers simultaneously, or exceeding 500 person-days) trigger additional duties including HSE notification (F10) and the appointment of Principal Designer and Principal Contractor for multi-contractor projects.',
  ], correctAnswer: 0, explanation: 'PIDA extends ERA s.44 protection for wider disclosures, including those made externally to a regulator. The key test is "reasonable belief".' },
  { id: 5, question: 'What\'s a "designated competent person" under MHSWR Reg 7?', options: [
    'Voltage (all phases), frequency, phase sequence and phase angle — comparing each against programmable thresholds to determine if the source is acceptable for load connection',
    'A person appointed by the employer to assist in undertaking measures to comply with H&S duties. Often the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s H&S manager or contracts manager. Must have appropriate training, knowledge and experience.',
    'Information and instructions on the installation, including diagrams, charts and tables that may be required for inspection, testing and maintenance, to be provided to the user/duty holder.',
    'Selected and erected to provide adequate mechanical protection — by cable type (SWA, MICC), enclosure (conduit, trunking), or location (out of reach). Risk-assessed against the level of damage expected.',
  ], correctAnswer: 1, explanation: 'Knowing who the designated competent person is in your firm is the L3 escalation address. Often the contracts manager, sometimes a separate H&S manager, sometimes an external consultant.' },
  { id: 6, question: 'What\'s the difference between competence and authority?', options: [
    'Establishes personal liability for company directors, managers, secretaries and similar officers where a corporate offence is committed with their consent, connivance or attributable to their neglect. Allows the HSE to prosecute the individual as well as (or instead of) the company.',
    'That the installation has more than one source of supply (mains plus PV, battery, generator, etc.), that opening the main switch does NOT isolate the entire installation, what additional isolation is needed, and where each isolation point is located. Critical for anyone working on the system because back-feed from PV/battery can energise the install with the main switch open.',
    'Competence = having the technical knowledge / skill / experience to do the work safely. Authority = being permitted by the firm or a regulator to do it. Both are required. An L3 may be competent on a task but not authorised (e.g. EIC sign-off requires Qualified Supervisor authority); or authorised by job title but not yet competent on a specific item (e.g. CompEx work).',
    'Mandatory medical assessment. ECG to check for cardiac arrhythmia (which can develop hours after the event). Examination for entry / exit burns (often deep with little surface marking). Assessment for muscle damage and rhabdomyolysis. Even a brief 230V shock warrants A&E.',
  ], correctAnswer: 2, explanation: 'Both required; L3 sits in the gap on many tasks. Honesty about which limb is missing keeps you on the right side of EAWR Reg 16.' },
  { id: 7, question: 'How should refusal of an unsafe task be documented?', options: [
    'UKATA / IATP-certified providers offer asbestos awareness (1 day, refresher periodic). Higher levels (non-licensed work, licensed work) require more advanced certified training. CAR 2012 Reg 10 requires adequate training for anyone who may be exposed.',
    'G98 covers parallel-connected generation up to and including 16 A per phase (informal post-installation notification to the DNO); G99 covers generation greater than 16 A per phase (full pre-installation application to the DNO, with the DNO able to refuse or impose conditions).',
    'Source phase winding → line conductor → fault at appliance → exposed-conductive-part → CPC → MET → earthing conductor → service position → DNO PEN → source neutral terminal — protective device sees the high fault current and disconnects.',
    'In writing, contemporaneously. Text or email to the supervisor; CC to a senior manager or H&S manager; copy retained. State what was asked, what you said, and the reason (regulation cited or risk identified). Time-stamped. The contemporaneous written record is the strongest evidence in any subsequent ERA s.44 claim or HSE prosecution.',
  ], correctAnswer: 3, explanation: 'Writing it down at the time is what makes the protection real. Reconstructed accounts months later are much weaker.' },
  { id: 8, question: 'L2 to L3 — has the limit of responsibility changed?', options: [
    'No — it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s shifted. At L2 the limits were tighter (most things needed supervisor sign-off). At L3 you can do more without immediate supervision, but the limits still exist (EIC sign-off, complex three-phase, hazardous areas, F-Gas, gas, asbestos licensed work). Honestly knowing where YOUR current limit sits is the L3 judgement skill.',
    'Around year 10 or a defined number of full-equivalent cycles (often 6,000-10,000 cycles), whichever comes first. The threshold is usually 70-80% of nameplate usable capacity. A 10 kWh battery delivering around 7 kWh after a decade is at typical end-of-warranty capacity; whether the customer replaces depends on the economics of remaining capacity vs replacement cost.',
    'While the core requirements (qualifications, sign-off, portfolio) are set by the standard, EPAOs may specify additional requirements such as minimum evidence quantities, specific evidence formats, or additional documentation in their EPA specification',
    'Site induction covering the relevant parts of the construction phase plan, the site rules, the welfare arrangements, the emergency procedures, and the specific hazards on that site. Plus access to relevant information from the pre-construction phase. CDM 2015 Reg 13 makes this a duty on the principal contractor and Reg 15 makes it a duty on the worker to co-operate with it.',
  ], correctAnswer: 0, explanation: 'The L3 limit isn\'t fixed — it grows with experience and certification. The skill is honest self-assessment of where it sits today, for this task.' },
];

const faqs = [
  { question: 'My supervisor says "stop being so cautious, just do it" — what now?', answer: 'Document the conversation. Refuse if you genuinely judge the task unsafe or outside your competence. Escalate to a senior manager. ERA 1996 s.44 protects you from detriment for the refusal. PIDA 1998 protects you for raising it externally if internal escalation fails.' },
  { question: 'Can I refuse to work for a customer who\'s being unreasonable about safety?', answer: 'Yes. The customer\'s commercial pressure doesn\'t override your s.7 duty. Politely explain the reason, document it in writing, escalate to your firm\'s contracts manager. The firm may decide to withdraw from the job; that\'s their commercial call but your safety position is sound.' },
  { question: 'What if I genuinely don\'t know whether a task is within my competence?', answer: 'Default to "no" until you\'ve checked with someone competent. EAWR Reg 16 second-limb supervision is the appropriate route — work alongside someone competent, ask, observe, learn. The "I had a go" approach is what creates incidents.' },
  { question: 'How do I escalate without burning bridges with my supervisor?', answer: 'Frame it as "I want to make sure I\'m doing this safely — can you help me think through it?". Most supervisors respond well to honesty. The minority who don\'t are the ones you needed to escalate around anyway. ERA s.44 gives you cover.' },
  { question: 'Is there a tribunal time limit for an ERA s.44 claim?', answer: 'Yes — generally 3 months less one day from the act complained of. Get advice early; legal aid is rare for tribunal but unions and CAB offer help. Document everything contemporaneously.' },
  { question: 'Can I be prosecuted personally if I do follow an unsafe instruction?', answer: 'Yes — HASAWA s.7 is a personal duty. "I was told to" is no defence. The HSE has prosecuted operatives who carried out unsafe instructions. Refusal + escalation + documentation is the personal-protection sequence.' },
  { question: 'I\'m an L3 supervising an L2 mate — what happens if THEY do something unsafe?', answer: 'You carry the EAWR Reg 16(2) supervision-leg duty. If your supervision was inadequate — no brief, no check-ins, no intervention — you could be on the s.7 hook alongside them, and the firm on s.2. The L3 supervisor protection is being able to evidence the supervision: brief notes, check-in timestamps, the intervention you made.' },
  { question: 'What if the firm doesn\'t have a named Reg 7 competent person?', answer: 'That\'s a Reg 7 breach in itself. Raise it in writing — to the director if necessary. Ask who is acting as competent person in practice. If the answer is &quot;nobody&quot;, that&apos;s a serious gap and escalating externally to the HSE under PIDA may be justified if internal raising fails.' },
  { question: 'Does signing a job sheet or schedule count as &quot;sign-off&quot; in scheme terms?', answer: 'No. Schedules and job sheets are operational documents; the regulated sign-off is the EIC / MWC / EICR signed by the firm&apos;s Qualified Supervisor or Approved Electrician under the scheme registration. Signing the job sheet says &quot;I did the work&quot;; signing the certificate says &quot;the installation complies with BS 7671 and is safe for use&quot; and is the legal claim under Building Regs Approved Document P.' },
  { question: 'Can my refusal of an unsafe instruction be undermined by accepting the work afterwards if pressured?', answer: 'Yes — silence or compliance after an initial refusal weakens both the s.7 personal-duty defence and any ERA s.44 claim. Once you have refused, stand firm. If pressure escalates, escalate the escalation: raise to the next person in the chain, document the renewed refusal in writing, and request reassignment. A single firm refusal followed by escalation is stronger evidence than five wavering refusals followed by reluctant compliance.' },
  { question: 'Does the Building Safety Act 2022 change the limits on what I can sign for residential work?', answer: 'For Higher-Risk Residential Buildings (HRRB — 18m+ or 7+ storeys with 2+ residential units) the BSA 2022 / HRRB Regs 2023 add a separate competence and dutyholder regime above the existing Approved Doc P scheme limits. The principal designer / principal contractor / accountable person roles all carry specific BSA competence requirements. L3 alone does not qualify you for any of these roles. The BSA gateway 2 / 3 process requires evidence of competence assessed against the Engineering Council UK-SPEC framework or equivalent, mediated through the BSR.' },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero eyebrow="Module 1 · Section 2 · Subsection 3" title="Limits of responsibility — knowing when to escalate" description="Remember from L2 — limits exist and you escalate when in doubt. At L3 the limits expand but they're still real, and ERA 1996 s.44 / PIDA 1998 give you legal protection for the upward push." tone="emerald" />

          <TLDR points={[
            "L3 limits are wider than L2 but still exist. EIC sign-off, complex three-phase, hazardous areas, F-Gas, gas, asbestos licensed work — all sit outside the L3 scope.",
            "Escalation upwards is your right and your duty. Chain: supervisor → contracts manager → Qualified Supervisor → director. Document every attempt in writing.",
            "ERA 1996 s.44 protects you from detriment for refusing dangerous work or raising H&S concerns. PIDA 1998 (whistleblowing) extends protection for qualifying disclosures including external to regulators.",
            "Competence has two limbs — knowledge / skill / experience to do the work AND authority from the firm or regulator to do it. Both required; either missing means the work stops or escalates.",
            "Statutory competence boundaries are absolute. Gas Safe / F-Gas / Asbestos licensed / SAP HV / CompEx are not bendable for &apos;small jobs&apos; or favours. Refuse, signpost, document.",
            "Lone-working scenarios change the risk profile. Some tasks (live work, MEWP, confined space, CompEx) need a second person regardless of personal competence.",
          ]} />

          <LearningOutcomes outcomes={[
            'Identify the legal sources of personal H&S duty (HASAWA s.7, EAWR Reg 16, MHSWR Reg 14, CDM Reg 15).',
            'Distinguish competence from authority and identify situations where one is missing.',
            'Apply the L3 escalation chain — supervisor → contracts manager → Qualified Supervisor → director.',
            'State the protection under ERA 1996 s.44 (detriment) and PIDA 1998 (whistleblowing).',
            'Recognise statutory competence boundaries — gas (Gas Safe), F-Gas, asbestos licensed work, HV.',
            'Document refusals and escalations in writing contemporaneously.',
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The L3 limit — wider but still real</ContentEyebrow>

          <ConceptBlock title="What you can and can't do at L3" plainEnglish="L3 expands the scope from L2. You can run small jobs alone, supervise an L2 mate, sign off some testing under supervision. But statutory and competence limits still exist — EIC sign-off needs a Qualified Supervisor; gas needs Gas Safe; F-Gas needs Cat I-IV; asbestos licensed work needs the HSE-licensed contractor; HV needs SAP authorisation." onSite="Honesty about where YOUR limit sits today, for this task, is the L3 judgement. The limit moves over time as you gain experience and certifications. The risk is treating L3 as 'fully qualified' — it isn't.">
            <p>Statutory and scheme limits L3 cannot cross:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas work</strong> — Gas Safe Register only (Gas Safety (Installation and Use) Regs 1998).</li>
              <li><strong>F-Gas refrigerant</strong> — Cat I-IV certified (F-Gas Regulation).</li>
              <li><strong>Asbestos licensed work</strong> — HSE-licensed contractor only.</li>
              <li><strong>HV / SAP work</strong> — separate appointment and authorisation under EAWR Reg 16.</li>
              <li><strong>EIC sign-off</strong> — Qualified Supervisor / Approved Electrician under firm&apos;s scheme registration.</li>
              <li><strong>EICR coding</strong> — competent inspector with appropriate post-qualification experience.</li>
              <li><strong>CompEx hazardous-area work</strong> — CompEx-certified.</li>
              <li><strong>Notifiable Building Regs work in dwellings</strong> — Approved Doc P competent person scheme.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Employment Rights Act 1996 — s.44(1)(c)" clause={<>"An employee has the right not to be subjected to any detriment by any act, or any deliberate failure to act, by his employer done on the ground that — (c) being an employee at a place where (i) there was no such representative or safety committee, or (ii) there was such a representative or safety committee but it was not reasonably practicable for the employee to raise the matter by those means, he brought to his employer&apos;s attention, by reasonable means, circumstances connected with his work which he reasonably believed were harmful or potentially harmful to health or safety."</>} meaning={<>The s.44 protection is broad — any reasonable means of raising a H&amp;S concern is protected. Detriment includes sacking (s.100 makes that automatically unfair), demotion, removal from a job, disciplinary, victimisation. Tribunal claim within 3 months. Compensation can include loss of earnings, injury to feelings, reinstatement. The protection makes the refusal sustainable.</>} cite="Source: Employment Rights Act 1996 (1996 c.18), s.44." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Escalation chain</ContentEyebrow>

          <ConceptBlock title="Up the chain in writing" plainEnglish="When the immediate supervisor isn't available or won't accept the concern, escalate up. Contracts manager, technical manager, Qualified Supervisor, director. Document each step in writing — text, email, job-pack note. The contemporaneous written record is the evidence the protection rests on." onSite="The chain is yours to use. Most firms have a designated H&S manager (MHSWR Reg 7 competent person) who is often the right escalation address. If your firm doesn't have one named, ask — it's a Reg 7 requirement.">
            <p>Practical escalation sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Phone immediate supervisor first; document the call.</li>
              <li>If no answer or refusal, text and email — written trail.</li>
              <li>Contact contracts manager / project manager.</li>
              <li>Contact firm's Qualified Supervisor or H&S manager.</li>
              <li>Contact a director if the chain has failed.</li>
              <li>External (HSE / regulator) only after internal escalation has demonstrably failed; PIDA 1998 protects this.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Documenting the refusal" plainEnglish="Every refusal goes in writing at the time. State what was asked, what you said, why (regulation or risk). Time-stamped. Sent to the supervisor and a senior manager." onSite="A simple text \'Just to confirm what we discussed at 14:20: you asked me to live-work the DB; I declined under EAWR Reg 14; please confirm next steps' is enough. Email is better. The contemporaneous record is the evidence that makes ERA s.44 work in your favour later if needed.">
            <p>Elements of a defensible refusal record:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Date and time.</li>
              <li>Who asked and what was asked.</li>
              <li>Your response and the reason (regulation cited or hazard identified).</li>
              <li>Any escalation made and to whom.</li>
              <li>Any response received.</li>
              <li>Sent in writing (text/email) to the relevant parties same day.</li>
              <li>Copy retained by you.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Public Interest Disclosure Act 1998 — inserted into Employment Rights Act 1996 as s.43A onwards" clause={<>"In this Act a 'qualifying disclosure' means any disclosure of information which, in the reasonable belief of the worker making the disclosure, is made in the public interest and tends to show one or more of the following — (a) that a criminal offence has been committed, is being committed or is likely to be committed, (b) that a person has failed, is failing or is likely to fail to comply with any legal obligation to which he is subject, ... (d) that the health or safety of any individual has been, is being or is likely to be endangered, (e) that the environment has been, is being or is likely to be damaged."</>} meaning={<>PIDA extends ERA protections to "qualifying disclosures" — including raising the concern externally to a regulator like the HSE. The reasonable-belief test is wide; you don&apos;t have to be right, you have to reasonably believe. Internal disclosure is preferred but external (HSE etc) is protected if internal channels have failed.</>} cite="Source: Public Interest Disclosure Act 1998 (1998 c.23), s.1 inserting Part IVA into ERA 1996." />

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Competence vs authority — the L3 daily judgement</ContentEyebrow>

          <ConceptBlock
            title="Two parallel questions on every task"
            plainEnglish="At L3 every task carries two questions: am I competent to do this safely (do I have the knowledge, skill and experience)? And am I authorised to do this (does the firm, the regulator, the scheme permit me to)? Either can be missing. Competence without authority means you can do the work but the firm can&apos;t use the result (e.g. a perfectly tested EICR you can&apos;t sign). Authority without competence is the dangerous case (the regulator says you can but you don&apos;t actually have the experience yet)."
            onSite="The L3 honest answer changes by task. Routine domestic CU testing — likely both. Initial verification sign-off — competent maybe, authorised no (Qualified Supervisor signs). Three-phase commercial fault-finding — likely under supervision. CompEx hazardous area — neither without certification. The supervisor judgement is matching today&apos;s task to today&apos;s competence + authority status, not assuming one carries the other."
          >
            <p>Common L3 task types and where the line typically sits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic socket / lighting alteration</strong> — competent + authorised
                under firm&apos;s scheme registration. Reg 16 first limb usually applies.
              </li>
              <li>
                <strong>Initial verification testing</strong> — competent for the testing
                itself; sign-off authority sits with the Qualified Supervisor or Approved
                Electrician.
              </li>
              <li>
                <strong>EICR coding and sign-off</strong> — competent only with significant
                post-qualification experience; authority via scheme.
              </li>
              <li>
                <strong>Three-phase commercial</strong> — under supervision throughout L3
                unless the specific task is straightforward and the operative has prior
                experience.
              </li>
              <li>
                <strong>Hazardous area (CompEx)</strong> — neither without CompEx
                certification.
              </li>
              <li>
                <strong>Gas / F-Gas / asbestos licensed</strong> — neither; refer to certified
                contractors.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The PIDA disclosure framework — internal vs external</ContentEyebrow>

          <ConceptBlock
            title="Why internal first matters even when you suspect cover-up"
            plainEnglish="PIDA 1998 (inserted into ERA 1996 as Part IVA) protects &quot;qualifying disclosures&quot; — disclosures of information that the worker reasonably believes shows malpractice. Internal disclosure to the employer is the primary protected route. External disclosure to a prescribed person (HSE, Environment Agency, others) is also protected but generally requires either reasonable belief that internal disclosure would lead to detriment or destruction of evidence, OR that the matter has already been raised internally without action."
            onSite="The practical L3 sequence when you spot something serious: raise internally first, in writing, to the appropriate responsible person. Allow a reasonable period for response. Document what you raised, when, to whom, and the response (or absence of response). Only when the internal route has failed (or you have evidence it would fail) does external disclosure become both protected and proportionate. The exception is &apos;exceptionally serious&apos; matters — these can go straight external under s.43H ERA 1996."
          >
            <p>The PIDA disclosure tiers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.43C — internal to employer</strong>. Easiest to satisfy; reasonable
                belief test only.
              </li>
              <li>
                <strong>s.43D — to a legal adviser</strong>. Always protected.
              </li>
              <li>
                <strong>s.43E — to a Minister of the Crown</strong>. For workers in
                publicly-funded bodies.
              </li>
              <li>
                <strong>s.43F — to a prescribed person</strong>. For HSE / EA / SEPA / NRW /
                other regulators on relevant sectoral matters. Reasonable belief test plus
                substantially-true test.
              </li>
              <li>
                <strong>s.43G — wider disclosure</strong> (e.g. media, MP, professional body).
                Higher threshold including reasonable belief that internal disclosure would
                cause detriment or be ineffective.
              </li>
              <li>
                <strong>s.43H — exceptionally serious matters</strong>. Wider disclosure
                permitted where the matter is exceptionally serious; reasonable belief test
                still applies.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Employment Rights Act 1996 — s.43B(1)"
            clause={
              <>
                &quot;In this Part a &apos;qualifying disclosure&apos; means any disclosure of
                information which, in the reasonable belief of the worker making the disclosure,
                is made in the public interest and tends to show one or more of the following —
                (a) that a criminal offence has been committed, is being committed or is likely
                to be committed, (b) that a person has failed, is failing or is likely to fail
                to comply with any legal obligation to which he is subject, (c) that a
                miscarriage of justice has occurred, is occurring or is likely to occur, (d)
                that the health or safety of any individual has been, is being or is likely to
                be endangered, (e) that the environment has been, is being or is likely to be
                damaged, or (f) that information tending to show any matter falling within any
                one of the preceding paragraphs has been, is being or is likely to be
                deliberately concealed.&quot;
              </>
            }
            meaning={
              <>
                The qualifying disclosure definition. Six categories — criminal offence, breach
                of legal obligation, miscarriage of justice, health and safety endangerment,
                environmental damage, deliberate concealment of any of the above. The
                &quot;reasonable belief&quot; test means you don&apos;t have to be right; you
                have to reasonably believe. The &quot;public interest&quot; test was added by
                the Enterprise and Regulatory Reform Act 2013 to filter out purely personal
                workplace grievances. At L3 most safety concerns will satisfy at least
                limb (b) (legal obligation) and (d) (health or safety).
              </>
            }
            cite="Source: Employment Rights Act 1996 (1996 c.18), s.43B as inserted by Public Interest Disclosure Act 1998."
          />

          <SectionRule />
          <ContentEyebrow>Fitness for duty — the L3 honest self-assessment</ContentEyebrow>

          <ConceptBlock
            title="Tired, hungover, distressed — &apos;not today&apos; is a competence answer"
            plainEnglish="EAWR Reg 16 competence isn&apos;t just about training and qualifications — it&apos;s about being competent at the moment of the work. Fatigue, illness, alcohol or drug effects (including legitimate prescription drugs), grief or acute stress can all reduce your safe-working capacity. Working live circuits or in safety-critical environments while compromised is a Reg 16 + s.7 issue. The defensible response is to report fitness-for-duty concerns and accept reassignment for the day."
            onSite="The L3 supervisor reflex applies both to yourself and to the L2 mate working with you. If something looks off — slurred speech, smell of alcohol, obvious exhaustion, distraction at a level that affects task focus — pause the safety-critical work. Talk privately. Document the conversation. Reassign to lower-risk work or send home. The firm&apos;s drug and alcohol policy and the firm&apos;s welfare policy are the supporting documents."
          >
            <p>Practical fitness-for-duty considerations at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fatigue</strong> — long shifts, second jobs, poor sleep. Working Time
                Regulations 1998 limits and rest-break requirements support the safety case.
              </li>
              <li>
                <strong>Alcohol</strong> — even residual alcohol from the night before reduces
                cognitive function. Many firms apply zero-tolerance during work hours.
              </li>
              <li>
                <strong>Recreational and prescription drugs</strong> — sedating
                antihistamines, opioid painkillers, sleep aids all carry &quot;may impair&quot;
                warnings. Discuss with your GP or occupational health.
              </li>
              <li>
                <strong>Acute stress / grief / mental health</strong> — temporarily reduced
                concentration is a real safety factor. Talking to the firm&apos;s welfare lead
                or EAP is the right route.
              </li>
              <li>
                <strong>Illness</strong> — flu, food poisoning, vertigo. Working through can
                feel virtuous; in safety-critical roles it&apos;s a Reg 16 risk.
              </li>
              <li>
                <strong>The firm&apos;s response</strong> — should be supportive, not punitive.
                Punitive responses to honest fitness-for-duty disclosure drive concealment, which
                makes the safety risk worse.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Tribunal protection — the s.44 process in practice</ContentEyebrow>

          <ConceptBlock
            title="Time limits, evidence and what to expect"
            plainEnglish="If the firm subjects you to detriment for raising a safety concern or refusing dangerous work, ERA 1996 s.44 gives you a tribunal claim. The time limit is generally 3 months less one day from the act complained of (or the last in a series of acts). ACAS Early Conciliation is mandatory before lodging the claim — this can extend the time limit modestly. Most cases settle before hearing; tribunal awards include compensatory awards for loss of earnings and (where applicable) injury to feelings."
            onSite="If you find yourself heading towards a s.44 claim, the contemporaneous evidence trail is what makes or breaks the case. Texts, emails, job-pack notes from the time of the events are gold. ACAS, your union, Citizens Advice, or a no-win-no-fee employment solicitor can help. The protection is real; the procedure is technical and time-sensitive."
          >
            <p>Practical sequence if you&apos;re facing detriment after a refusal:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Document everything immediately</strong> — timeline, the safety
                concern, who you raised it to, the firm&apos;s response, the detriment imposed.
              </li>
              <li>
                <strong>Use the firm&apos;s grievance procedure</strong> — written grievance to
                the firm. Demonstrates you tried to resolve internally; supports the claim if
                the firm doesn&apos;t.
              </li>
              <li>
                <strong>Take advice early</strong> — ACAS helpline (0300 123 1100), union if
                you&apos;re a member, Citizens Advice, employment solicitor.
              </li>
              <li>
                <strong>ACAS Early Conciliation</strong> — mandatory before tribunal claim.
                ACAS contacts the employer and explores settlement. Issues a certificate
                whether settled or not.
              </li>
              <li>
                <strong>Tribunal claim (ET1)</strong> — within 3 months less one day of the
                detriment, extended by the EC period. Filed online or by post.
              </li>
              <li>
                <strong>Hearing or settlement</strong> — most cases settle. Hearings tend to be
                1-3 days for s.44 / s.47B cases.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The Reg 7 competent person — who exactly is it?</ContentEyebrow>

          <ConceptBlock
            title="The named H&S adviser the firm should have appointed"
            plainEnglish="MHSWR Reg 7 requires every employer to appoint one or more competent persons to assist in undertaking the measures needed to comply with the firm&apos;s statutory H&S duties. In a small electrical firm this might be the director themselves with appropriate training, or an external consultant retained on a service contract. In a larger firm it&apos;s typically a dedicated H&S manager or QHSE manager. The competent person is the practical escalation address for cross-site safety issues — when your immediate supervisor and contracts manager have run out of road, the Reg 7 person is the next step."
            onSite="Ask early — &apos;who&apos;s our Reg 7 competent person?&apos;. The induction pack should name them; if it doesn&apos;t, asking is itself a Reg 5 (arrangements) prompt to the firm. Knowing the name and contact details before you need them is the L3 discipline. A safety concern raised at 4pm on a Friday is much easier to escalate if you already know who the Reg 7 person is, where they are, and how to reach them."
          >
            <p>What &quot;competent&quot; means under Reg 7(5):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sufficient training and experience or knowledge</strong> — formal H&S
                qualification (NEBOSH General, NEBOSH Construction, IOSH Managing Safely as a
                minimum benchmark) plus practical experience in the firm&apos;s sector.
              </li>
              <li>
                <strong>Other qualities</strong> — communication skill, integrity, willingness to
                challenge senior decisions. The competent person who never says no isn&apos;t
                actually competent.
              </li>
              <li>
                <strong>Sufficient time and resources</strong> — to actually do the work; a name
                on the organisation chart without dedicated time is not Reg 7 compliance.
              </li>
              <li>
                <strong>Information about the firm&apos;s activities and risks</strong> — must
                be briefed on the operational reality, not just left to read the policy folder.
              </li>
              <li>
                <strong>Preference for internal appointment</strong> — Reg 7(8) expresses a
                preference for internal people over external consultants where competence
                exists internally.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 7(1)"
            clause={
              <>
                &quot;Every employer shall, subject to paragraphs (6) and (7), appoint one or more
                competent persons to assist him in undertaking the measures he needs to take to
                comply with the requirements and prohibitions imposed upon him by or under the
                relevant statutory provisions and by Part II of the Fire Precautions (Workplace)
                Regulations 1997.&quot;
              </>
            }
            meaning={
              <>
                The Reg 7 appointment duty. The competent person is the firm&apos;s named H&S
                adviser. In larger firms a QHSE manager; in smaller firms the director or a
                retained external consultant. They are the practical escalation address when the
                line-management chain has been exhausted. Knowing who they are before you need
                them is the L3 discipline — most firms list them in the induction pack.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 7."
          />

          <SectionRule />
          <ContentEyebrow>Approved Document P — the Building Regs competence overlay</ContentEyebrow>

          <ConceptBlock
            title="Why L3 alone doesn&apos;t equal &apos;competent person scheme&apos;"
            plainEnglish="Approved Document P of the Building Regulations sets out the rules for notifiable electrical work in dwellings. To self-certify notifiable work, the operative (or the firm) must be a member of a Competent Person Scheme — NICEIC, NAPIT, ELECSA, STROMA, BSI, Certsure. Scheme membership requires assessed competence, regular site assessment and Qualified Supervisor authority. L3 by itself doesn&apos;t confer scheme membership; the firm holds the scheme registration and the Qualified Supervisor signs off on the firm&apos;s behalf."
            onSite="What this means for the L3 daily reality: you can do the physical work in a domestic install but the certificate (EIC, Minor Works, EICR) must be signed by the firm&apos;s Qualified Supervisor or Approved Electrician. The signature isn&apos;t a courtesy formality — it&apos;s the regulatory hook that makes the work lawful self-certified rather than requiring Local Authority Building Control notification. Signing certificates as an L3 without scheme authority is an offence under the Building Regs."
          >
            <p>The Competent Person Scheme limitation in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notifiable work in dwellings</strong> — installation of new circuits,
                CU replacement, work in special locations (bathrooms, kitchens are no longer
                automatically notifiable in England but Wales remains broader).
              </li>
              <li>
                <strong>Scheme membership held by the firm</strong>, not the individual
                operative. Qualified Supervisor is the named scheme authority.
              </li>
              <li>
                <strong>Annual scheme assessment</strong> visits verify competence; the firm&apos;s
                ongoing registration depends on consistent compliance.
              </li>
              <li>
                <strong>If the firm isn&apos;t scheme-registered</strong>, notifiable work must
                be Building Control notified directly — a slow and expensive route most firms
                avoid by scheme membership.
              </li>
              <li>
                <strong>L3 contribution to scheme work</strong> — you can be the productive
                operative but not the certifier. Honest framing of this with the customer
                avoids confusion about who&apos;s signing the cert.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>The L3 supervisor of an L2 mate — your reverse duty</ContentEyebrow>

          <ConceptBlock
            title="When you become the supervisor in EAWR Reg 16(2) terms"
            plainEnglish="L3 introduces a duty most apprentices haven&apos;t carried before — supervising an L2 mate. EAWR Reg 16(2) treats supervision as the route by which less-experienced workers are made &apos;competent&apos;. If you&apos;re the L3 supervising an L2, you carry the supervision-leg duty. That means making sure the L2 is working within their competence, briefing them on the specific hazards, intervening when they&apos;re about to do something unsafe, and signing off on the completed work."
            onSite="The mirror image: you&apos;ve just experienced two-plus years of being supervised. Now you start doing it back. The discipline is the same — clear instructions, defined scope, periodic check-ins, immediate intervention on unsafe acts, debrief at the end. Don&apos;t treat &apos;supervising the L2&apos; as a tax — it&apos;s how the trade transfers competence. Done well, the L2 learns faster and you build the supervisor skills you&apos;ll need as a Qualified Electrician later."
          >
            <p>L3-supervising-L2 daily practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Brief at the start of the task</strong> — what we&apos;re doing, what
                you&apos;re doing, what I&apos;m doing, what to ask before progressing.
              </li>
                <li>
                <strong>Define the limits</strong> — what the L2 is competent to do unsupervised,
                what needs you watching, what you&apos;ll do yourself.
              </li>
              <li>
                <strong>Check-in cadence</strong> — every 20-30 minutes for unfamiliar work,
                less often for routine tasks.
              </li>
              <li>
                <strong>Intervene early</strong> — don&apos;t let an unsafe practice get to
                completion just to avoid embarrassment. Pause, explain, demonstrate, restart.
              </li>
              <li>
                <strong>Sign off the work</strong> — visually inspect, witness key tests,
                check the schedule against installation. Your signature on the dynamic
                assessment / schedule is the supervision evidence.
              </li>
              <li>
                <strong>Debrief at the end</strong> — what went well, what to do differently
                next time. Short, constructive, not punitive.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <ConceptBlock
            title="The lone-working scenario — when there&apos;s no supervisor to ask"
            plainEnglish="At L3 you increasingly work alone — domestic call-outs, small commercial jobs, fault-finding visits. Lone working changes the risk profile and the escalation route. There&apos;s no immediate second pair of hands to help if something goes wrong; phones can lose signal; the time-to-help is longer. The HSE&apos;s INDG73 (Working alone) sets out the reasonably-practicable controls."
            onSite="Practical L3 lone-working discipline: the firm should know where you are and when you&apos;ll check in (booking system or SMS schedule). A buddy check-in arrangement covers the gap if something goes wrong. The dynamic risk assessment on arrival should identify whether the task is appropriate to lone working — some tasks (live work, MEWP use, hazardous-area entry, complex three-phase) require a second person regardless of competence."
          >
            <p>Tasks that should not be done lone-worked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live working</strong> under EAWR Reg 14 — second person almost always
                required as part of the precautions.
              </li>
              <li>
                <strong>MEWP / hoist / lift operation</strong> — banksman or second person for
                rescue cover.
              </li>
              <li>
                <strong>Confined-space entry</strong> — Confined Spaces Regs 1997 require
                emergency arrangements that lone working cannot satisfy.
              </li>
              <li>
                <strong>Hazardous-area work</strong> (CompEx) — competence rules and
                rescue-cover requirements.
              </li>
              <li>
                <strong>Work at height in significant fall-risk locations</strong> — rescue
                cover essential.
              </li>
              <li>
                <strong>Visits to addresses with documented safeguarding concerns</strong> —
                lone-worker safety as well as customer.
              </li>
              <li>
                <strong>Out-of-hours work in remote or unfamiliar locations</strong> — without
                a check-in arrangement.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake title="Following an unsafe instruction because 'I was told to\'" whatHappens={<>Apprentice told by supervisor to live-work a small commercial DB; complies; arc-flash burns to forearm. HSE prosecution; firm under EAWR Reg 14; supervisor under HASAWA s.7 (encouraging an unsafe act); apprentice under HASAWA s.7 (personal duty). Apprentice&apos;s &quot;I was told to&quot; defence rejected.</>} doInstead={<>Refuse, escalate, document. ERA s.44 protects from detriment. The 5-minute conversation is far less painful than a HSE prosecution and a hospital visit.</>} />

          <CommonMistake title="Doing F-Gas / gas / asbestos work because \'it&apos;s only a small job\'" whatHappens={<>Apprentice disconnects a small refrigerant line on an old AC unit during electrical strip-out; releases R410A to atmosphere; not F-Gas certified; firm prosecuted under F-Gas Reg + environmental release; apprentice personally prosecuted under HASAWA s.7 for working outside competence.</>} doInstead={<>Statutory competence boundaries don&apos;t bend for small jobs. F-Gas, gas, asbestos licensed work all need certified contractors regardless of size. Refer the work; document the referral.</>} />

          <Scenario title="Customer pressure to do gas-related work" situation={<>You&apos;re replacing a kitchen socket and the customer says &quot;while you&apos;re here, can you just disconnect the gas hob so I can move it tomorrow?&quot;. They offer cash for the favour. Your supervisor isn&apos;t answering the phone. The hob has a flexible gas hose with a bayonet fitting; disconnecting at the bayonet is &quot;easy&quot; in physical terms.</>} whatToDo={<>Refuse. Gas work is restricted to Gas Safe registered engineers under the Gas Safety (Installation and Use) Regulations 1998 — you are not authorised regardless of physical ease. Politely explain to the customer: &quot;I&apos;m not Gas Safe registered so I can&apos;t lawfully disconnect the gas. I can recommend a Gas Safe engineer who can do it for you tomorrow morning&quot;. Don&apos;t accept the cash; don&apos;t do the work; document the conversation in your job-pack note that evening. If your firm has a Gas Safe sister-firm or a regular subcontractor, suggest them. If not, the customer can find a Gas Safe engineer via gassaferegister.co.uk.</>} whyItMatters={<>Customer cash-in-hand requests are the most common entry-route for un-authorised work. Doing it once is a HASAWA s.7 breach, a Gas Safety regulation breach, and a professional reputation risk. The customer&apos;s &quot;just this once&quot; doesn&apos;t protect you. Refusal + signposting + documentation is the L3 response, and the customer typically respects it once it&apos;s clearly explained.</>} />

          <Scenario
            title="The 'just sign here\' EIC pressure"
            situation={
              <>
                You&apos;ve been the productive operative on a 12-circuit CU change on a
                Friday afternoon. Testing is complete; the customer is waiting to be back in
                power before the weekend. Your firm&apos;s Qualified Supervisor is 90 minutes
                away at another job. The supervisor calls you and says &quot;just sign the EIC
                as &apos;designer / constructor / inspector&apos; — put my name as &apos;tester&apos;,
                the customer&apos;s not going to know the difference, I&apos;ll countersign on
                Monday&quot;. The certificate pad has the firm&apos;s scheme membership
                number on the header.
              </>
            }
            whatToDo={
              <>
                Refuse. Signing the EIC as &quot;inspector&quot; or &quot;tester&quot; when
                you are not the appointed scheme-authorised person is multiple breaches in
                one: a Building Regs offence (false declaration of compliance under Approved
                Doc P), a BS 7671 breach (the model form requires the named competent
                person), a scheme rules breach (potentially invalidating the firm&apos;s
                registration), and a HASAWA s.7 personal duty issue. Politely refuse and
                offer alternatives: customer can wait until Monday for the certificate while
                the installation is left energised under a job-pack note recording the
                position; or the QS can pull off the other job to come and sign tonight.
                Document the conversation in writing the same day — text the QS
                summarising and CC the firm&apos;s director. ERA s.44 covers you.
              </>
            }
            whyItMatters={
              <>
                Scheme certificates carry the firm&apos;s registration. A signature you
                weren&apos;t entitled to give can void the customer&apos;s scheme cover
                (handed to a buyer five years later, the certificate may be discovered to
                be invalid), expose the firm to scheme disqualification, and expose you to
                personal prosecution. The QS&apos;s &quot;I&apos;ll countersign Monday&quot; is
                not a legal route. The five-minute conversation is far less painful than
                the consequences if the certificate is later challenged.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Inspector visit walkthrough — what HSE asks for at the door</ContentEyebrow>

          <ConceptBlock
            title="The unannounced HSE visit and what the inspector requests in the first 30 minutes"
            plainEnglish="HSE inspectors have right of entry under HASAWA s.20 — they can enter any workplace at any reasonable time, with or without notice, and require production of documents. The first 30 minutes of an inspector visit are evidence-gathering. They will typically ask: (1) who is the responsible person on site? (2) can I see the current risk assessment and method statement for the work in progress? (3) can I see training and competence records for the operatives present? (4) what are the welfare arrangements? (5) for electrical work specifically — can I see the safe-isolation procedure and the most recent test instrument calibration certs? Knowing what is asked for, and being able to produce it without panic, is what separates a well-run firm from a poorly-run one in the inspector&apos;s eye."
            onSite="The L3 reflex when HSE arrives unannounced: stay calm, be polite, notify the firm&apos;s responsible person and Qualified Supervisor immediately, produce documents the inspector requests, do not volunteer interpretation or admit fault. The inspector is gathering facts not conducting a trial; cooperation tends to result in advice or notice, obstruction tends to result in prosecution. HASAWA s.33(1)(h) makes obstruction itself an offence."
          >
            <p>Documents and information the inspector typically requests on arrival:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identity of responsible person</strong> — name, role, contactable on
                site.
              </li>
              <li>
                <strong>Risk assessment and method statement for the current work</strong> —
                site-specific, signed, current.
              </li>
              <li>
                <strong>Operative competence evidence</strong> — qualifications, training
                records, scheme registrations.
              </li>
              <li>
                <strong>Equipment inspection / calibration records</strong> — test instruments
                in date, ladders / steps / podiums tagged, electrical kit PAT-tested.
              </li>
              <li>
                <strong>Safe-isolation procedure</strong> — written procedure, kit available
                (lock-off, voltage indicator, proving unit, GS38 leads).
              </li>
              <li>
                <strong>Welfare arrangements</strong> — toilets, washing, drinking water,
                rest break, shelter from weather.
              </li>
              <li>
                <strong>RIDDOR record</strong> — accident book, incident log for past 3
                years.
              </li>
              <li>
                <strong>Asbestos register</strong> — if pre-2000 building.
              </li>
              <li>
                <strong>Permits and notifications</strong> — for live work, hot work,
                excavation, confined space.
              </li>
              <li>
                <strong>F10 notification</strong> — if CDM-notifiable project.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Case study — R v Tata Steel UK [2017] and the limits of &apos;I followed the manager&apos;s instruction&apos;</ContentEyebrow>

          <ConceptBlock
            title="When the supervisor&apos;s direction is no defence to a s.7 prosecution"
            plainEnglish="Tata Steel UK was fined £1.4m at Cardiff Crown Court in 2017 after a maintenance worker suffered serious injuries when a steel slab fell during a lifting operation at the Port Talbot plant. The investigation found that the operative had been told by his supervisor to complete the lift using a sling that was not rated for the load. The operative complied. The HSE prosecuted Tata Steel under HASAWA s.2 and considered s.7 action against the operative; the supervisor was prosecuted personally under s.7 for actively directing the unsafe practice. The case illustrates the cascade: corporate liability for the firm under s.2; personal liability for the supervisor under s.7 for directing the breach; and the operative under s.7 personally — though the HSE did not in the end prosecute the operative on the operational facts, the option was clearly available."
            onSite="The L3 takeaway: &apos;I was told to&apos; is not a defence to s.7 personal liability. The HSE may choose not to prosecute the operative on a given set of facts (typically where the operative is junior, the supervisor is clearly directing the breach, and the operative had limited practical ability to refuse), but the option is statutorily available. What protects you is documented refusal at the time — not just hoping the HSE will exercise prosecutorial discretion in your favour. The supervisor in Tata Steel went to court personally; the next time, the operative may too."
          >
            <p>What the L3 operative can learn from prosecuted cases like this:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The supervisor&apos;s direction does not extinguish your s.7 duty</strong> —
                it adds the supervisor to the duty list, it does not remove you from it.
              </li>
              <li>
                <strong>The operative&apos;s ability to refuse is part of the analysis</strong> —
                a 17-year-old first-year apprentice at the start of their career has less practical
                ability to refuse than a 25-year-old L3 with three years of experience and an
                understanding of the regs. The HSE&apos;s prosecutorial discretion takes that into
                account; your s.7 exposure scales with your experience.
              </li>
              <li>
                <strong>Documented refusal is the single most protective act</strong> — a text or
                email to the supervisor at the moment of the unsafe direction shifts the evidential
                picture decisively in your favour.
              </li>
              <li>
                <strong>Group communications matter</strong> — if the unsafe direction was given in
                a team setting, ensure other operatives heard your refusal. Their account is your
                corroboration.
              </li>
              <li>
                <strong>The firm&apos;s subsequent response matters</strong> — if the firm
                disciplines you for the refusal, that is itself a s.44 / s.100 ERA 1996 issue
                separate from the underlying H&amp;S breach.
              </li>
              <li>
                <strong>Sentencing Council guideline (2016) applies</strong> — the operative
                conviction under s.7 carries a structured sentence range that for high culpability
                + serious harm includes immediate custody.
              </li>
              <li>
                <strong>Insurance and employability</strong> — a personal s.7 conviction
                materially affects future employability with reputable firms (PQQs ask), and may
                affect any future application for scheme registration as a Qualified Supervisor.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />

          <KeyTakeaways points={[
            "Remember from L2 — limits exist, escalate when in doubt. At L3 the limits are wider but still real.",
            "Statutory limits L3 can't cross: gas (Gas Safe), F-Gas (Cat I-IV), asbestos licensed work, HV (SAP), EIC sign-off (Qualified Supervisor), CompEx, Approved Doc P competent person scheme.",
            "Personal duty sources: HASAWA s.7, EAWR Reg 16, MHSWR Reg 14, CDM Reg 15. Multiple parallel duties; same conclusion — refuse and escalate when warranted.",
            "Escalation chain: supervisor → contracts manager → Qualified Supervisor → director. Document each step in writing contemporaneously.",
            "ERA 1996 s.44 protects you from detriment for refusing dangerous work or raising H&S concerns. Tribunal route; 3-month time limit.",
            "PIDA 1998 protects qualifying disclosures including those made externally to regulators when internal escalation has failed.",
            "'I was told to' is no defence to a s.7 prosecution. Refusal + documentation is the personal-protection sequence.",
            "L3 honesty about today's competence boundary is the judgement skill that distinguishes safe operators from incident-causers.",
            "Tata Steel UK (2017) and similar cases show the cascade — corporate s.2 fine, supervisor s.7 prosecution, operative s.7 exposure. Documented refusal is the single most-protective act.",
            "MHSWR Reg 7 competent person is the internal H&S escalation address. Know their name before you need it.",
            "Approved Doc P scheme membership is held by the firm, not the individual. L3 contributes to scheme work; QS signs the cert.",
          ]} />

          <Quiz title="Limits of responsibility — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.2 Emergency procedures</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.4 Reporting routes</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
