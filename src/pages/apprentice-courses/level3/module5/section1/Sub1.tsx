/**
 * Module 5 · Section 1 · Subsection 1 — The statutory framework for inspection and testing
 * Maps to C&G 2365-03 / Unit 304 / LO1 / AC 1.1
 *   AC 1.1 — "state the requirements of the Electricity at Work Regulations for the safe inspection of electrical systems and equipment"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 1.1; 2366-03 Unit 302 / AC 1.1
 *
 * The L3 lift on EAWR — beyond the L2 "isolate before you touch it" framing
 * into the statutory chain that puts a duty on the duty holder, the competent
 * person, and the person carrying out the work. Reg 4(1), Reg 14, and the
 * BS 7671 link via Section 6 of the EAWR-supporting HSE guidance HSR25.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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

const TITLE = 'The statutory framework for inspection and testing | Level 3 Module 5.1.1 | Elec-Mate';
const DESCRIPTION =
  'The legal chain of custody behind every inspection and test — Electricity at Work Regulations 1989 (Reg 4, Reg 14, Reg 16), HSR25, BS 7671 Part 6, and how a competent person discharges those duties on site.';

const checks = [
  {
    id: 'm5-s1-sub1-eawr-reg4',
    question: 'Under EAWR Reg 4(1), the duty to construct, maintain and use systems so as to prevent danger applies to:',
    options: [
      'Absolute = MUST be met, no excuses. Reasonably practicable = balance the risk against the cost and trouble.',
      'Every "duty holder" — employer, self-employed person, and to a more limited extent every employee — in respect of the matters within their control.',
      '4V and 24V (per BS EN 61557-4) and a minimum short-circuit current of 200mA — to break through any film of oxide on connections',
      'Recommended for final circuits in dwellings, with mandatory installation in higher-risk residential buildings (HRRBs) under the Building Safety Act 2022',
    ],
    correctIndex: 1,
    explanation:
      'EAWR Reg 3 defines duty holders broadly. Reg 4(1) places the construct/maintain/use duty on every duty holder for the matters within their control. As an apprentice or qualified electrician working on a system you become a duty holder for the parts of the work in your control — your isolation, your testing, your terminations.',
  },
  {
    id: 'm5-s1-sub1-competent-person',
    question: 'EAWR Reg 16 (persons to be competent to prevent danger and injury) is satisfied by:',
    options: [
      'Possessing technical knowledge or experience appropriate to the nature of the work, such that danger and injury are prevented — proportionate to the work being undertaken.',
      'An underlying belief such as "They think I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m incompetent" or "They are always looking for someone to blame"',
      'An estimate allows flexibility for unforeseen work (hidden junction boxes, asbestos, damaged existing wiring), while a quote locks in a fixed price regardless of what is discovered',
      'Embodied carbon relates to the emissions from manufacturing, transporting, and constructing materials; operational carbon relates to emissions from the energy used to run the building during its lifetime',
    ],
    correctIndex: 0,
    explanation:
      'Reg 16 requires "such technical knowledge or experience as may be necessary to prevent danger and, where appropriate, injury". Competence is task-specific and proportionate. An apprentice carrying out continuity testing under supervision can be competent for that task; the same apprentice doing live testing on a 400 V switchboard alone would not be.',
  },
  {
    id: 'm5-s1-sub1-bs7671-link',
    question: 'How does BS 7671 connect to the Electricity at Work Regulations?',
    options: [
      'BS 7671 is a non-statutory standard, but compliance with it is widely accepted as evidence that the duty holder has taken the precautions required by the EAWR. HSE guidance HSR25 explicitly references this relationship.',
      'Inform the client in writing that they must appoint a principal designer (Reg 5) where more than one contractor is involved, and that without it the project cannot lawfully proceed',
      'Regular inspection of the electrical supply, control wiring, contactor condition, defrost system operation, refrigerant pressure/temperature readings, and compressor current draw — comparing with commissioning data to identify degradation',
      'Verify provision is adequate for the work; inspect kits before/during work; restock after use; ensure trained persons available; brief team on emergency procedures (location of kit, AED, trained persons, nearest A&E); maintain inspection records.',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 is a British Standard published by the IET — not a statutory instrument. But it is the recognised industry standard. Compliance with BS 7671 is accepted by HSE as evidence the duty holder met the precautions required by EAWR. HSR25 (the guidance to the regulations) makes this link explicit. Failing to comply with BS 7671 puts the duty holder in the position of having to prove some other equivalent precaution was taken.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'EAWR Reg 14 prohibits work on or near live equipment unless three conditions are met. Which one is NOT one of those conditions?',
    options: [
      'It is unreasonable in all the circumstances for it to be dead.',
      'A second person is always present as a safety observer.',
      'Suitable precautions (including, where necessary, the provision of suitable protective equipment) have been taken to prevent injury.',
      'It is reasonable for the work to be done live.',
    ],
    correctAnswer: 1,
    explanation:
      'EAWR Reg 14 has three conditions for working live: (a) unreasonable in all the circumstances for it to be dead, (b) reasonable for the work to be done live, (c) suitable precautions taken to prevent injury. Having a second person present is good practice and may form part of "suitable precautions", but it is not itself a Reg 14 condition. The default position under EAWR is dead working. Live working is the exception that must be justified case by case.',
  },
  {
    id: 2,
    question: 'During a Schedule of Test Results entry on a new install, who is the "person responsible for the safety of the electrical installation" referred to on the EIC?',
    options: [
      'Arrange reasonable adjustments: extra time, use of technology, verbal evidence methods, and support from the college\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2019s learning support team',
      'The insulation chemistry differs — standard thermoplastic (PVC) softens above ~70 °C, modern thermosetting (LSF, XLPE) cross-links and tolerates 90 °C continuously. The cable\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s tabulated CCC depends on which insulation it has.',
      'The client / building owner / occupier in whose name the EIC is issued — they take on the duty to maintain the installation in safe condition once the certificate is signed and handed over.',
      'At the origin of the installation, identifying every circuit, the type and composition, OCPD, and characteristics necessary for inspection and testing',
    ],
    correctAnswer: 2,
    explanation:
      'The EIC formally hands the duty for ongoing safety to the recipient — usually the client, building owner or occupier. From sign-off, they are the duty holder under EAWR Reg 4(2) for maintenance of the installation. This is why the certificate must be retained, why retest dates matter, and why an EICR is required to discharge that duty over time.',
  },
  {
    id: 3,
    question: 'A first-year apprentice is asked to carry out the dead tests on a kitchen rewire alone, with the supervisor on a different site. Under EAWR Reg 16:',
    options: [
      'Check the VSD fault log for diagnostic codes, assess the motor insulation resistance and phase balance, inspect the mechanical load, review recent changes or maintenance, and apply root cause analysis before implementing a permanent fix',
      'Are essential — they prevent re-energisation by another person who might assume the breaker is off because of a tripped fault. Multiple lock-offs allow each person working on the circuit to fit their own padlock.',
      'A thermistor has a highly non-linear resistance-temperature characteristic and a much larger change in resistance per degree, making it very sensitive but over a narrow range',
      'This is non-compliant — Reg 16 requires the person to have technical knowledge or experience proportionate to the work. A first-year solo on a full domestic dead-test sequence is unlikely to meet that bar without close supervision available.',
    ],
    correctAnswer: 3,
    explanation:
      'Competence under Reg 16 is proportionate. A first-year may be competent for individual tests under supervision but is unlikely to be competent for the full sequence solo. The duty falls jointly on the apprentice (for the matters within their control) and on the employer (for selecting and supervising the person doing the work). Phone access to a supervisor is not equivalent to direct supervision for safety-critical first-time tasks.',
  },
  {
    id: 4,
    question: 'BS 7671 Part 6 (Inspection and Testing) is divided into chapters. Which chapter contains the requirements for INITIAL verification?',
    options: [
      'Chapter 64.',
      'Chapter 62.',
      'Chapter 65.',
      'Chapter 66.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Part 6 structure: Chapter 64 = Initial verification (Reg 641-644). Chapter 65 = Periodic inspection and testing (Reg 651-653). Chapter 66 (added by A3) covers in-service inspection of electrical installations in caravans/motor caravans and similar special locations. Chapter 62 in older editions covered different content; current Part 6 starts at 641.',
  },
  {
    id: 5,
    question: 'HSR25 is:',
    options: [
      'Specific PPE (e.g. gowns, gloves, hand hygiene), no eating/drinking in clinical areas, controlled access through air-locked corridors',
      'The HSE-published guidance memorandum to the Electricity at Work Regulations 1989 — explains how HSE interprets and enforces the EAWR.',
      'It provides inherent fire resistance (maintaining circuit integrity at temperatures exceeding 1,000 degrees C) and is non-combustible',
      'What category of electrical environment the meter is rated to use safely on, and the max voltage in that category',
    ],
    correctAnswer: 1,
    explanation:
      'HSR25 — "Memorandum of Guidance on the Electricity at Work Regulations 1989" — is the HSE\'s official guidance on how the regulations are interpreted and enforced. It is not law itself, but it indicates how HSE will apply the law. It explicitly references compliance with BS 7671 as a way of meeting the EAWR precautions duty. Worth reading in full as a Level 3 apprentice.',
  },
  {
    id: 6,
    question: 'A duty holder who allows an unsafe electrical installation to remain in service after an EICR has identified a C2 (potentially dangerous) defect is potentially in breach of:',
    options: [
      'C2 — potentially dangerous; the hot Zs in service will probably exceed the Table 41.3 max, meaning ADS may not clear in time at the worst case.',
      '"I feel under pressure when timescales are tight because I want to deliver quality work. Could we discuss the programme?"',
      'EAWR Reg 4(2) — the duty to maintain systems in safe condition. This duty does not stop when an inspection finds a defect; it continues until the defect is remedied.',
      'A durable caution/danger notice or padlock-mounted tag identifying the person who applied the lock and the reason for isolation',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR Reg 4(2) puts a positive duty on the duty holder to maintain the system in a condition that prevents danger. An EICR identifying a C2 puts the duty holder on notice. Failure to act could be a Reg 4(2) breach. C1 is more serious — danger present, immediate action required. C3 is improvement recommended (no breach to leave it but worth fixing).',
  },
  {
    id: 7,
    question: 'You are inspecting an existing TT installation and find the earth electrode resistance has degraded to 800 Ω over time, with only an RCD as ADS. The C-coding for this on the EICR would be:',
    options: [
      'Neatly dressed conductors, correct bending radii, no strain on terminals, clear labelling, and segregation of power and control circuits where required',
      'Citizens Advice offers free guidance on consumer and employment rights, while the FSB provides legal advice, mediation support, and business guidance for members',
      'Withdraw, tell your site manager and the school\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Designated Safeguarding Lead — they decide next steps including any police involvement',
      'C2 — potentially dangerous. The RCD provides additional protection but the high electrode resistance compromises the disconnection-of-supply protection. The combination is unreliable in fault conditions.',
    ],
    correctAnswer: 3,
    explanation:
      'A TT system relies on the earth electrode for fault current path. With Ze of 800 Ω and a 30 mA RCD: Zs × IΔn ≈ 24 V — within the 50 V touch-voltage limit, just. But headroom is tiny, electrode could deteriorate further, and any RCD failure leaves the installation effectively unprotected. C2 (potentially dangerous) is the correct coding. Recommend electrode improvement and confirmation testing in the report.',
  },
  {
    id: 8,
    question: 'On a brand-new install, the contractor signs the EIC. They later discover a wiring error that creates a Class I metallic enclosure with no CPC connection. Their position under EAWR is:',
    options: [
      'They have a continuing duty under EAWR Reg 4 (system in safe condition) AND a contractual duty to put the work right. Failure to act on discovery, especially if anyone could be exposed to the danger, could be a criminal offence under EAWR. Notify the client immediately, isolate the affected circuit if necessary, return to remedy.',
      'Recommended (per the wording of Reg 421.1.7) — discuss with the customer, present the cost vs benefit, and let them decide. Document the conversation. AFDDs are a sensible choice for the bedroom and lounge socket circuits in particular; less of a priority on shower, immersion, hob and dedicated EV circuits.',
      'Empathy involves understanding and sharing another person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s feelings from their perspective, while sympathy involves feeling pity or sorrow for someone\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s situation from your own perspective — empathy says "I feel with you," sympathy says "I feel for you"',
      'Micro-expressions reveal genuine emotions that a person may be trying to conceal, providing empathic individuals with additional emotional data. Recognising a flash of fear or contempt that someone is hiding can help you respond to their actual emotional state rather than just their words',
    ],
    correctAnswer: 0,
    explanation:
      'Signing the EIC says you verified the install was compliant at the point of certification. Discovering a defect afterwards does not absolve the duty — it triggers a continuing duty to act. EAWR Reg 4 obliges the duty holder to maintain in safe condition. Knowingly leaving a danger in service after discovery is potentially a criminal breach. The right response: notify, isolate if needed, put it right. Document the discovery and the remediation.',
  },
];

const faqs = [
  {
    question: 'Is BS 7671 itself law?',
    answer:
      'No — BS 7671 is a non-statutory British Standard. It has no force of law on its own. But it is the recognised industry standard for compliance with the EAWR precautions duty. Failing to follow BS 7671 puts you in the position of having to prove some other equivalent precaution was taken — a hard argument in court if anything goes wrong. HSR25 (HSE guidance on EAWR) explicitly references BS 7671 as a way of meeting the precautions duty.',
  },
  {
    question: 'What is the difference between a duty holder, a competent person, and the person carrying out the work?',
    answer:
      'A duty holder (EAWR Reg 3) is anyone with control over an electrical system — employer, self-employed person, employee, occupier. Multiple people can be duty holders simultaneously. A competent person (Reg 16) is someone with technical knowledge or experience proportionate to the task. The person carrying out the work is the practical actor on site. On a typical job: the contractor is duty holder for the work; the supervising electrician is the competent person; the apprentice is the person carrying out the work — and is also a duty holder for the matters in their control. All three roles can attach to the same person on a one-person job, or be split across a team.',
  },
  {
    question: 'Where does Building Regulations Part P fit into the legal framework?',
    answer:
      'Part P of the Building Regulations (England) requires that electrical installation work in dwellings be safe. Designated notifiable work (consumer unit changes, work in special locations, new circuits) must be either certified by a registered competent person, or notified to building control. Part P does not replace EAWR or BS 7671 — it sits alongside them, adding a building-control compliance route for domestic work. Wales has its own equivalent. Scotland has Section 6 of the Building Standards. Northern Ireland follows similar requirements.',
  },
  {
    question: 'What happens legally if I sign an EIC for work that turns out to be defective?',
    answer:
      'You take on a continuing duty. The EIC is your professional declaration that the install meets BS 7671 at certification. If a defect is later found, the legal landscape depends on whether (a) the defect was reasonably discoverable at the time (in which case your verification process may have been inadequate — a competence question under Reg 16), (b) the defect arose later (in which case you are not liable but the new duty holder under EAWR Reg 4(2) is). Either way, on discovery the right action is to notify, isolate if necessary, and remedy. Insurance claims, scheme provider investigation, and in serious cases criminal proceedings under EAWR are all possible outcomes.',
  },
  {
    question: 'How do I balance "must work dead" (Reg 14) with the live tests required by BS 7671 (Zs, EFLI, RCD)?',
    answer:
      'Live testing for verification purposes is one of the categories where EAWR Reg 14 routinely justifies live working — the test cannot be performed dead, the precautions are well-established (HSE GS38 leads, single-pole probes, training, PPE), and the test duration is short and bounded. The default Reg 14 condition (a) "unreasonable for it to be dead" is satisfied because a Zs reading by definition requires the system to be live. The other two conditions still apply: it must be reasonable to do live (yes, for a short verification test by a competent person), and suitable precautions taken (GS38 leads, no exposed conductive parts handled, full attention).',
  },
  {
    question: 'Where in BS 7671 do the duties for inspection and testing actually sit?',
    answer:
      'Part 6 — Inspection and Testing. Specifically: Chapter 64 covers Initial Verification (Regulations 641 to 644 and Appendix 6 on the model forms). Chapter 65 covers Periodic Inspection and Testing (Regulations 651 to 653). Chapter 66 covers in-service inspection in special locations like caravans. The model forms (EIC, EICR, MWC, Schedule of Inspections, Schedule of Test Results) are in Appendix 6. Reg 132.13 (renumbered from 132.13 in earlier editions) requires the documentation/info to be provided. A4:2026 introduced Reg 421.1.7 recommending AFDDs in certain locations.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 1"
            title="The statutory framework for inspection and testing"
            description="EAWR 1989, HSR25, BS 7671 Part 6 and the chain of duty that turns every test you carry out into a legal act of verification. The L3 lift on what L2 introduced."
            tone="emerald"
          />

          <TLDR
            points={[
              'The Electricity at Work Regulations 1989 are statutory law. BS 7671 is a non-statutory British Standard — but compliance with it is the accepted way of meeting the EAWR precautions duty.',
              'EAWR creates duty holders (Reg 3), a duty to construct/maintain/use systems safely (Reg 4), the dead-working default (Reg 14), and the competence requirement (Reg 16).',
              'BS 7671 Part 6 chapters 64 (initial verification) and 65 (periodic) provide the technical framework. Appendix 6 holds the model forms — EIC, EICR, MWC, Schedule of Inspections, Schedule of Test Results.',
              'Signing a certificate is a legal act. It transfers a duty for ongoing safety to the recipient AND keeps a continuing duty on the signatory if defects are later found.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite the four key EAWR regulations relevant to inspection and testing — Reg 3 (duty holders), Reg 4 (system in safe condition), Reg 14 (no live work unless), Reg 16 (competence).',
              'Explain the legal status of BS 7671 and how compliance with it discharges the EAWR precautions duty.',
              'Describe how HSR25 relates to EAWR and BS 7671.',
              'Identify the chapters of BS 7671 Part 6 that govern initial verification and periodic inspection.',
              'Recognise the chain of legal duty as it transfers from the contractor (signing EIC) to the client/occupier (taking on Reg 4(2) maintenance duty).',
              'Articulate what "competence" means under Reg 16 and how it is proportionate to the task.',
              'Describe the consequences for the duty holder of failing to act on EICR codes C1 or C2.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The statutory base — EAWR 1989</ContentEyebrow>

          <ConceptBlock
            title="Why EAWR matters more than BS 7671 in court"
            plainEnglish="The Electricity at Work Regulations 1989 are an Act of Parliament — break them and you can be prosecuted. BS 7671 is a British Standard — break it and you have to defend why. Most prosecutions following electrical incidents are brought under EAWR, with BS 7671 cited as evidence of what compliance should have looked like."
            onSite="When you complete a test or sign a certificate, you are not just following an industry rulebook — you are discharging a statutory duty under the EAWR. That changes how seriously you treat each step."
          >
            <p>
              The Electricity at Work Regulations 1989 (SI 1989 No. 635) is a statutory instrument
              made under the Health and Safety at Work etc. Act 1974. It applies to all work
              activities involving electrical systems — domestic, commercial, industrial, special
              locations. It applies to the duty holder, the employer, the employee, the
              self-employed.
            </p>
            <p>
              The four regulations that bear most directly on your inspection and testing work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 3 — Duty holders.</strong> Defines who carries the duties imposed by
                the rest of the regulations. Multiple people can be duty holders for the same
                installation simultaneously, each in respect of the matters within their control.
              </li>
              <li>
                <strong>Reg 4 — Systems, work activities and protective equipment.</strong> Reg 4(1)
                requires systems to be constructed and maintained to prevent danger. Reg 4(2) — the
                ongoing maintenance duty — applies for the life of the installation. Reg 4(3) — work
                activities must not give rise to danger. Reg 4(4) — protective equipment must be
                suitable, properly maintained, and properly used.
              </li>
              <li>
                <strong>Reg 14 — Work on or near live conductors.</strong> The default position is
                dead working. Live work is permitted only when (a) it is unreasonable for the
                conductors to be dead, (b) it is reasonable in the circumstances for the work to be
                done live, AND (c) suitable precautions have been taken to prevent injury. All
                three conditions must be met.
              </li>
              <li>
                <strong>Reg 16 — Persons to be competent to prevent danger and injury.</strong> No
                person shall be engaged in any work activity where technical knowledge or
                experience is necessary to prevent danger or injury, unless they possess such
                knowledge or experience, or are under appropriate supervision.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4(2)"
            clause="As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."
            meaning={
              <>
                Reg 4(2) creates an ongoing maintenance duty that lives with the installation, not
                just with its installer. From the moment a client signs for an EIC, they (or
                whoever takes responsibility for the building) become the Reg 4(2) duty holder.
                That duty includes commissioning periodic inspection (the EICR), acting on
                identified defects, and not allowing the installation to deteriorate to the point
                of danger. This is the legal basis for retest intervals and the EICR coding
                framework you will use later in this module.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, SI 1989/635, Reg 4(2)."
          />

          <SectionRule />

          <ContentEyebrow>The competence requirement — Reg 16</ContentEyebrow>

          <ConceptBlock
            title="Competence is proportionate, not absolute"
            plainEnglish="Reg 16 doesn't say you must hold a particular qualification. It says you must have the technical knowledge or experience proportionate to the task — enough to prevent danger and injury. A first-year apprentice is competent for some things (under supervision) but not for others. A 30-year veteran might be highly competent for domestic work but less so for HV switching."
            onSite="If you ever feel a job is beyond your competence, say so and stop. That's not weakness — that's discharging your Reg 16 duty correctly. The bigger risk is pretending to be competent and getting it wrong."
          >
            <p>
              Reg 16 is one of the most-cited regulations in HSE prosecutions following electrical
              incidents. The test is not "do they have a card" — it is "did they have the technical
              knowledge or experience necessary to prevent the danger that materialised". This is
              an objective test applied with hindsight.
            </p>
            <p>
              Building competence for inspection and testing typically follows a path:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Theory grounding.</strong> The L2 dead-test sequence (Module 4 §6 of
                this course) plus L3 Unit 304 (this module) gives you the underpinning knowledge.
              </li>
              <li>
                <strong>Supervised practice.</strong> Do the tests under direct supervision until
                you are competent enough to be relied upon.
              </li>
              <li>
                <strong>Independent practice on familiar circuits.</strong> Domestic dead tests,
                then live tests, before moving to commercial scale.
              </li>
              <li>
                <strong>Specialist progression.</strong> 2391 (initial verification + periodic),
                2394 (initial), 2395 (periodic) industry quals build on Unit 304 and demonstrate
                competence to scheme providers and employers.
              </li>
              <li>
                <strong>Continuing development.</strong> A4:2026 changed RCD test methods and
                introduced AFDD recommendations. Stay current — competence is not a one-shot
                achievement.
              </li>
            </ol>
            <p>
              On site, the practical test for whether you are competent for a task: could you
              defend your decision to take it on if asked by an HSE inspector after an incident?
              If the honest answer is "I was guessing", stop and escalate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 16"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                Reg 16 sits on both you and on the person who engaged you. If your supervisor
                assigned you work beyond your competence with no supervision, the Reg 16 duty has
                been breached at two levels: by them for assigning it, and by you for accepting it
                if you knew you were not competent. The "appropriate supervision" clause is what
                allows apprentices to develop competence — but supervision must be appropriate to
                the task, not theoretical.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, SI 1989/635, Reg 16."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The dead-working default — Reg 14</ContentEyebrow>

          <ConceptBlock
            title="Reg 14 — three conditions, all must be met"
            plainEnglish="EAWR's default is dead working. To work live you must satisfy three tests: it must be unreasonable for the conductors to be dead, it must be reasonable to do the work live, and suitable precautions must be in place. Live testing for verification (Zs, RCD trip times, EFLI) almost always satisfies all three — but the burden is on you to show it."
            onSite="Live testing is not a free pass. It's a Reg 14 exception. That means GS38 leads, single-pole probes, no exposed conductive parts handled while live, and only by a competent person — and only for the duration of the test."
          >
            <p>The Reg 14 three-part test, applied to common electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live cable termination.</strong> (a) Easy to make dead — fail. (b) No
                special urgency — fail. Dead work required. Live termination is not justified
                under Reg 14 in normal circumstances.
              </li>
              <li>
                <strong>Live earth fault loop impedance test (Zs).</strong> (a) Cannot be done
                dead by definition — pass. (b) Test is necessary for verification — pass. (c) GS38
                leads, single-pole probe, brief duration — pass. Reg 14 satisfied.
              </li>
              <li>
                <strong>Live RCD trip time test.</strong> Same logic as Zs — must be live for the
                test to be meaningful. Reg 14 satisfied with proper precautions.
              </li>
              <li>
                <strong>Switch replacement.</strong> Easy to make dead at the CU — fail (a). Live
                work not justified. Isolate, prove dead, work, reinstate.
              </li>
              <li>
                <strong>Tracing intermittent faults on a live commercial system that cannot be
                shut down.</strong> May satisfy (a) if downtime cost is genuinely unreasonable
                — but (b) and (c) require careful planning, additional precautions, and competent
                operators. Often a permit-to-work is needed.
              </li>
            </ul>
            <p>
              The default is dead. Every live activity needs the Reg 14 test applied
              consciously. For verification testing this is straightforward — the tests by their
              nature must be live. For other live work the bar is high and the precautions must
              match the risk.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating BS 7671 as the only authority and ignoring EAWR"
            whatHappens={
              <>
                You verify a circuit complies with BS 7671 — Ze, R1+R2, Zs all pass. The certificate
                gets issued. Six months later, an exposed conductive part on a defective accessory
                gives someone a shock because the supplementary bonding to a non-conductive
                surface was never installed and BS 7671 didn't catch it on the schedule. HSE
                investigate. They prosecute under EAWR Reg 4(2), not BS 7671. Your defence — "we
                followed BS 7671" — only goes so far if a competent person should have seen the
                wider safety issue.
              </>
            }
            doInstead={
              <>
                Treat BS 7671 as the technical floor, not the ceiling. Use the EAWR test —
                "is this system in safe condition for the use it will be put to?" — alongside the
                BS 7671 checklist. If something doesn\'t look right but BS 7671 doesn\'t have a
                specific clause for it, raise it as an observation on the EIC or as a C2/C3 on
                the EICR. Document the concern. EAWR cares about danger; BS 7671 codifies the
                main paths to preventing it but does not cover every possible danger.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 Part 6 — the technical framework</ContentEyebrow>

          <ConceptBlock
            title="The structure of BS 7671 Part 6"
            plainEnglish="Part 6 of BS 7671 is the inspection and testing rulebook. Three chapters: 64 for initial verification (new installs), 65 for periodic (existing installs over time), 66 for in-service inspection of special locations. All the model certificates and report forms live in Appendix 6."
          >
            <p>The Part 6 chapter map:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 64 — Initial verification.</strong> Reg 641 (general — verify
                before placing into service), Reg 642 (visual inspection items list), Reg 643
                (testing — sequence, dead tests, live tests), Reg 644 (certification and reporting).
              </li>
              <li>
                <strong>Chapter 65 — Periodic inspection and testing.</strong> Reg 651 (general —
                verify periodically), Reg 652 (frequency — based on installation type and use),
                Reg 653 (the periodic inspection report — EICR).
              </li>
              <li>
                <strong>Chapter 66 — Inspection in special locations.</strong> Caravans,
                motor caravans, marinas — added in A3 to address recurring issues with leisure
                installations.
              </li>
              <li>
                <strong>Appendix 6 — model forms.</strong> EIC, MWC, EICR, Schedule of Inspections,
                Schedule of Test Results. The forms are model templates — schemes (NICEIC, NAPIT,
                Stroma) publish their own branded versions but the content must include all
                required fields from the model.
              </li>
            </ul>
            <p>
              A4:2026 made specific changes to Part 6: simplified RCD test method (single AC test
              at 1×IΔn under Reg 643.7.3, replacing the older multi-test sequence at multiples of
              IΔn), updated Schedule of Inspections columns, AFDD recommendation under Reg 421.1.7
              (with HRRB-specific requirements coming via Building Safety Act 2022). Documentation
              requirements moved to Reg 132.13 (was 132.13 in earlier editions).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 641.1 (Initial verification, general)"
            clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of the Regulations have been met."
            meaning={
              <>
                Reg 641.1 establishes the cardinal duty: verify BEFORE energising. This applies
                to every installation, not just new ones — additions and alterations also need
                their verification before energising. The phrase "so far as is reasonably
                practicable" mirrors the EAWR formulation, tying BS 7671 verification directly
                to the statutory framework.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 641.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where the certificate fits</ContentEyebrow>

          <ConceptBlock
            title="Signing the certificate is a legal act"
            plainEnglish="Putting your signature on an EIC isn\'t paperwork — it\'s a formal statutory declaration that the installation meets BS 7671 at certification. It transfers the maintenance duty to the recipient AND keeps a continuing duty on you if defects are later found."
            onSite="Treat every signature like a deed. If you wouldn\'t be comfortable defending it in court, don\'t sign it. If a colleague pressures you to sign for work you didn\'t fully verify, refuse — the EAWR consequences land on you, not them."
          >
            <p>The legal cascade triggered by signing an EIC:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>You declare the installation complies with BS 7671 at certification.</strong>
                Specifically — design (per Section 1 of the EIC if you designed it), construction
                (per Section 2 if you constructed it), and inspection/testing (per Section 3 always).
              </li>
              <li>
                <strong>The duty for ongoing safe condition (EAWR Reg 4(2)) transfers.</strong>
                The recipient — typically the client / building owner / occupier — becomes the
                duty holder for keeping the installation safe in use.
              </li>
              <li>
                <strong>A retest interval is recommended.</strong> Per BS 7671 Section 651 and
                IET Guidance Note 3 frequency tables — domestic owner-occupied 10 years, rented
                domestic 5 years, commercial 5 years, industrial 3 years, others case by case.
              </li>
              <li>
                <strong>You retain a continuing duty if defects are found.</strong> If a defect
                attributable to your work later comes to light, you have a duty to act on
                notification. Failure to act could be a Reg 4 breach plus a contractual breach.
              </li>
              <li>
                <strong>Records must be kept.</strong> The EIC, schedules, and test results form
                the legal record. The duty holder must retain them for the life of the installation
                (best practice). Scheme registration (NICEIC etc.) often requires the contractor
                to retain copies too.
              </li>
            </ol>
            <p>
              The MWC (Minor Works Certificate) carries similar weight for additions and
              alterations not requiring a full EIC. The EICR (Electrical Installation Condition
              Report) is the periodic equivalent — verifies an existing installation is still safe
              and codes the defects found. All three are legally significant documents.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="The duty cascade — who carries what after sign-off"
            plainEnglish="EAWR puts duty on every duty holder. Signing the EIC starts a cascade — design duty closed by designer, construction duty closed by installer, verification duty closed by inspector, ongoing maintenance duty opens for the recipient. Multiple parties carry duty simultaneously for different aspects of the same installation."
            onSite="Know which part of the duty chain you sit in for each job. On a one-person domestic install, you sit in all four roles. On a commercial fit-out, your role may be just inspection — but you still take Reg 16 competence duty for that specific role."
          >
            <p>The EAWR duty cascade unpacked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designer.</strong> Reg 4(1) — system constructed to prevent danger.
                Discharged at sign-off of the design block on the EIC. Continuing duty if a design
                defect is later found.
              </li>
              <li>
                <strong>Installer / constructor.</strong> Reg 4(1) — execution per design without
                introducing danger. Reg 16 — competent to install. Discharged at sign-off of the
                construction block.
              </li>
              <li>
                <strong>Inspector / verifier.</strong> Reg 4(1) discharged at sign-off of I&amp;T
                block. Reg 16 — competent to verify. Continuing duty if a verification omission
                later contributes to harm.
              </li>
              <li>
                <strong>Duty holder post-handover.</strong> Reg 4(2) ongoing maintenance duty.
                Engages competent persons for periodic, acts on EICR codes, retains documentation.
              </li>
              <li>
                <strong>Person carrying out subsequent work.</strong> Reg 16 competence duty for
                their specific scope, plus Reg 14 dead-working duty during their work.
              </li>
            </ul>
            <p>
              Multiple duties co-exist. Signing the EIC closes the active verification duty but
              opens the ongoing duty on the recipient. Both parties have continuing exposure if
              defects emerge — one for the original work, the other for failure to maintain.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="HSE enforcement — improvement and prohibition notices"
            plainEnglish="HSE enforces EAWR via the Health and Safety at Work Act 1974 enforcement framework. Improvement notice requires a defect to be remedied within a stated period. Prohibition notice stops the activity immediately because of imminent risk. Both are formal legal instruments — appealable to an employment tribunal but defaultly enforceable."
            onSite="If an HSE inspector turns up on a job and identifies a serious electrical defect, they can issue an immediate prohibition notice — work stops, supply may be ordered isolated, no resumption until remedied and re-inspected. Don't argue on site; comply, then escalate via the formal appeal route if you disagree."
          >
            <p>Enforcement mechanisms relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Improvement notice (HSWA s.21).</strong> Specifies a contravention and
                requires remediation by a stated date. Failure to comply is a separate criminal
                offence. Common for documentation gaps, missing labels, undersized bonding
                discovered without immediate danger.
              </li>
              <li>
                <strong>Prohibition notice (HSWA s.22).</strong> Used where the activity involves
                or will involve a risk of serious personal injury. Takes effect immediately or
                deferred per the notice. Common for live working without justification, exposed
                live parts in public areas, defective protective devices on a high-PFC supply.
              </li>
              <li>
                <strong>Prosecution.</strong> For serious or repeat breaches, breaches that
                contributed to injury / death, or refusal to comply with notices. EAWR Reg 4 / 14 /
                16 are the most-cited regulations in electrical prosecutions.
              </li>
              <li>
                <strong>Cost recovery (FFI — Fee For Intervention).</strong> Where HSE finds a
                material breach during inspection, the duty holder pays HSE costs — currently
                around £174/hour. Adds significant financial weight to enforcement.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 132.13 — the documentation duty that closes the loop"
            plainEnglish="Reg 132.13 (renumbered from 132.13 in earlier editions of BS 7671) requires the designer / installer to provide the user with the information needed to operate, maintain, inspect and test the installation safely. This is the documentation half of the EAWR cascade — the duty holder cannot maintain what they cannot identify."
            onSite="Hand over more than the EIC. The duty holder needs circuit charts, isolator identification, RCD test instructions, AFDD test instructions, SPD status interpretation, manufacturer literature for protective devices, single-line diagrams for anything more complex than a small domestic, and the next inspection date. Without this, your verification is technically complete but the ongoing duty handover is not."
          >
            <p>The Reg 132.13 documentation set typically includes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification chart.</strong> Per Reg 514.9 — fixed at or near
                the consumer unit / DB. Lists every circuit, the protective device, the area
                served, the RCD coverage.
              </li>
              <li>
                <strong>Single-line diagram.</strong> For installations beyond a single small
                consumer unit. Shows distribution architecture, sub-mains, sub-DBs, key
                switchgear.
              </li>
              <li>
                <strong>Manufacturer literature.</strong> Protective devices, RCDs, AFDDs, SPDs,
                EVSEs, PV inverters — installation, operation and test instructions.
              </li>
              <li>
                <strong>Test method notices.</strong> RCD test button operation, AFDD test
                routine, SPD status check, EVSE diagnostic procedures.
              </li>
              <li>
                <strong>Inspection date notice (Reg 514.12).</strong> Recommended next inspection
                date, contractor / scheme details, contact information.
              </li>
              <li>
                <strong>EIC + Schedule of Inspections + Schedule of Test Results.</strong> The
                verification record itself.
              </li>
              <li>
                <strong>Building Regulations Compliance Certificate.</strong> For Part P notifiable
                work, issued by the scheme.
              </li>
              <li>
                <strong>O&amp;M manual for larger installations.</strong> Commercial / industrial
                projects assemble this into a structured operating and maintenance manual.
              </li>
            </ul>
            <p>
              Failure to provide adequate Reg 132.13 documentation is a verification omission and
              undermines the duty holder's ability to discharge the ongoing Reg 4(2) duty.
              Document the handover; ideally have the recipient sign that they received the pack.
            </p>
          </ConceptBlock>

          <Scenario
            title="The continuing duty after a defect is found"
            situation={
              <>
                You signed the EIC for a small commercial fit-out three months ago. Today the
                client phones — an electrician carrying out unrelated work has flagged that one
                of your circuits has a bonding error: a metallic equipment frame appears to have
                no CPC connection back to the MET. The client asks "what now?".
              </>
            }
            whatToDo={
              <>
                Three things at once. First — establish whether anyone is currently exposed to
                danger. If yes, instruct immediate isolation of the affected circuit pending
                investigation. Second — arrange a return visit at the earliest opportunity to
                investigate, confirm the defect, and remedy it. Third — document everything: the
                client notification, your response, the investigation findings, the remedial work,
                and a re-test that confirms the issue is resolved. Issue a corrected MWC or EIC
                amendment as appropriate. Notify your scheme provider if your scheme rules require
                it. Keep the records — you have just discharged your continuing EAWR Reg 4 duty
                and you may need to evidence that.
              </>
            }
            whyItMatters={
              <>
                Discovering a defect after sign-off is not a contractual problem to be argued — it
                is an EAWR matter. The right response cascades from "is anyone in danger now?"
                through to "is it remedied and documented?". Acting fast and documenting fully is
                the only way to discharge the continuing duty cleanly. Trying to argue the client
                is at fault, or that the defect was not yours, while leaving the danger in place,
                is the route to prosecution.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EAWR 1989 is statutory law. BS 7671 is a non-statutory standard but is the recognised way of meeting the EAWR precautions duty. Most prosecutions are brought under EAWR with BS 7671 cited as the technical benchmark.',
              'Reg 4(2) creates an ongoing duty to maintain the system in safe condition. This duty lives with the installation and transfers from contractor to client/occupier when the EIC is signed.',
              'Reg 14 makes dead working the default. Live work needs all three conditions met: unreasonable to be dead, reasonable to do live, suitable precautions taken. Verification live tests (Zs, EFLI, RCD) routinely satisfy all three.',
              'Reg 16 requires technical knowledge or experience proportionate to the task. Apprentices build competence under appropriate supervision. The test is objective and applied with hindsight in any HSE investigation.',
              'BS 7671 Part 6 chapter map: Ch 64 initial verification, Ch 65 periodic, Ch 66 special locations. Appendix 6 holds the model EIC, MWC, EICR, Schedule of Inspections, and Schedule of Test Results.',
              'Signing a certificate is a statutory declaration. It transfers the Reg 4(2) duty to the recipient AND keeps a continuing duty on you if defects are later found and not remedied.',
              'A4:2026 changes that bear on Part 6: simplified RCD test (single AC at 1×IΔn under Reg 643.7.3), AFDD recommendation under Reg 421.1.7 (HRRB requirement via Building Safety Act 2022), Reg 132.13 documentation, updated Table 41.3 max Zs values.',
              'Discovering a defect after certification triggers a continuing duty to act. Notify, isolate if needed, remedy, document. Failure to act on a known defect can be a criminal offence under EAWR Reg 4.',
            ]}
          />

          <Quiz title="Statutory framework — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div />
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 BS 7671 Part 6 in detail
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
