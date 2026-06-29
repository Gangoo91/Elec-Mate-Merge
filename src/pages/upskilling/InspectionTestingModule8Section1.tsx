import { ArrowLeft, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod8-s1-order',
    question:
      'You arrive at a tenanted EICR. The tenant is at home and has plugged in a freezer they do not want disconnected. What does Reg 642.1 require you to do first?',
    options: [
      'Begin testing immediately, as Reg 642.1 applies only to new initial verification work',
      'Carry out the visual inspection first, with the part normally disconnected from the supply',
      'Energise everything to confirm the installation is functional, then inspect what you can reach',
      'Test the circuits first, then inspect afterwards if there is time before you leave',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642.1 applies to initial verification AND periodic inspection. Inspection precedes testing; the part under inspection is normally disconnected. Where disconnection is not reasonably practicable (freezer contents, medical equipment), live inspection is permitted with a documented risk assessment and safe system of work — but the inspect-before-test order is non-negotiable.',
  },
  {
    id: 'mod8-s1-642-2-limbs',
    question:
      'A 32 A MCB at the consumer unit shows light scorching at the cable entry. Which of the three Reg 642.2 limbs has failed?',
    options: [
      '(a) — compliance with Section 511',
      '(b) — correct selection and erection to BS 7671 with manufacturers’ instructions',
      '(c) — not visibly damaged or defective so as to impair safety',
      'None of them — scorch marks are cosmetic',
    ],
    correctIndex: 2,
    explanation:
      'Reg 642.2(c) requires the equipment to be “not visibly damaged or defective so as to impair safety”. Evidence of overheating at a terminal is the textbook fail of limb (c) — even if the device is correctly rated and standards-marked, the heat damage is the defect to address before testing proceeds.',
  },
  {
    id: 'mod8-s1-afdd-eicr',
    question:
      'On a 2018 domestic consumer unit with no AFDDs anywhere, the EICR inspector is considering the right code. What does GN3 say?',
    options: [
      'Code C1 — danger present, immediate remedial action required',
      'Code C2 — potentially dangerous, urgent remedial action required',
      'No defect code — record the absence as an observation, as AFDDs were a designer decision',
      'Refuse to issue the EICR until AFDDs have been fitted to every final circuit',
    ],
    correctIndex: 2,
    explanation:
      'GN3 is explicit: “the inspector cannot comment on omission of AFDDs where their use was a matter for the designer to decide”. Reg 421.1.7 recommends, it does not require, AFDDs in general installations. Absence is recorded as an observation in the schedule comments — not as a coded defect.',
  },
  {
    id: 'mod8-s1-section-d-recall',
    question:
      'You are about to leave an existing RCBO in service while completing additions and alterations to a domestic consumer unit. What does the A4:2026 Section D recall duty actually require?',
    options: [
      'A full audit of the recall status of every device in the installation, on every visit',
      'Verify the switches and circuit-breakers being reused are not subject to a product recall',
      'Trust the consumer unit label, as recalls are entirely the manufacturer’s responsibility',
      'Only check for product recalls in the event that the householder specifically asks you to',
    ],
    correctIndex: 1,
    explanation:
      'The A4:2026 guidance is targeted, not blanket. The recall check is triggered by additions and alterations that involve protective and switching devices (including RCBOs and RCCBs) being reused or left in service — typically by checking the OPSS recall list or the manufacturer’s notices and noting the check on the certificate. The Section D disclaimer captures the limit — the inspector is not warranting against future recalls or equipment outside the scope of the work.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 642.1 places one duty before another in the verification sequence. Which way around, and why does it matter?',
    options: [
      'Testing precedes inspection, and shall normally be done with the part energised',
      'Inspection follows testing wherever the installation under test is left energised',
      'Inspection and testing are concurrent, with the order left to the inspector’s discretion',
      'Inspection precedes testing, and shall normally be done with the part disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 642.1 reads "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply." The order is fixed: an obvious mechanical defect found by eye must be addressed before voltage or test current is applied, otherwise the test is either invalid or unsafe.',
  },
  {
    id: 2,
    question:
      'Reg 642.2 sets the three things the inspection must verify about installed equipment. Which set is correct?',
    options: [
      'Compliant with Section 511, correctly selected/erected to BS 7671 with manufacturers’ instructions, and not visibly damaged or defective so as to impair safety',
      'CE-marked, fitted by a competent person, and tested within the last six months',
      'Compliant with Part P, in working order, and supplied with a user manual',
      'Manufactured in the UK, certified by NICEIC, and within design life',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 642.2 requires the inspection to verify the equipment is (a) compliant with Section 511, (b) correctly selected and erected in accordance with BS 7671 taking into account manufacturers’ instructions, and (c) not visibly damaged or defective so as to impair safety. Compliance with 511 may be ascertained by mark or by certification furnished by the installer or the manufacturer.',
  },
  {
    id: 3,
    question:
      'Reg 642.3 lists items the inspection shall include "where relevant". Which of the following is NOT one of those listed items?',
    options: [
      'Connection of conductors',
      'Identification of conductors',
      'Calibration certificate of the multifunction tester',
      'Routing of cables in prescribed zones, or protection against mechanical damage',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 642.3 lists items (a) to (t), beginning with connection of conductors, identification of conductors, and routing of cables in prescribed zones. Calibration of the inspector’s instrument is a separate competence/equipment requirement under Reg 643.1, not an item to inspect on the installation itself.',
  },
  {
    id: 4,
    question:
      'A4:2026 introduces a new item 4.23 on the Schedule of Inspections checklist. What does it cover?',
    options: [
      'AFDD operational indication',
      'SPD operational indication',
      'Generator parallel arrangements',
      'Earth electrode resistance value',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 cross-references the checklist tag 4.23 to AFDD operational indication, mirroring the new AFDD recommendation introduced by Reg 421.1.7 in A4:2026. Item 4.19 covers SPD indication; 4.22 covers generator parallel arrangements. AFDD presence and a healthy operational indication are now an inspection item in their own right.',
  },
  {
    id: 5,
    question:
      'A4:2026 changed item 5.12 of the Schedule of Inspections to reflect a new RCD requirement. Which circuit type now requires explicit confirmation of 30 mA RCD additional protection in domestic premises?',
    options: [
      'Socket-outlet circuits below 32 A only',
      'Cooker circuits in kitchens',
      'EV charging circuits only',
      'AC final circuits supplying luminaires',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 411.3.4 (A4:2026) requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. Item 5.12 of the inspection schedule confirms this on every domestic property.',
  },
  {
    id: 6,
    question:
      'You are starting an EICR on a tenanted flat. The tenant is at home. What does Reg 642.1 require you to do before opening test leads?',
    options: [
      'Carry out the visual inspection first, normally with the part disconnected from the supply',
      'Nothing in particular, because Reg 642.1 applies only to new installation work',
      'Energise everything to confirm the installation is functional, and only then inspect it',
      'Test all the circuits first, then carry out the inspection afterwards if there is time',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 642.1 applies to initial verification AND periodic inspection. The duty to inspect first, with the part disconnected, is the same. Where disconnection is not reasonably practicable on a tenanted EICR (e.g. fridge contents, medical equipment), live inspection with appropriate controls is permitted, but the inspection still precedes the testing.',
  },
  {
    id: 7,
    question:
      'During a domestic EICR you find a 4-way consumer unit with no AFDDs anywhere. Reg 421.1.7 was introduced in A4:2026 as a recommendation. What is the correct EICR position?',
    options: [
      'Code C1 — danger present',
      'Code C2 — potentially dangerous',
      'No code — AFDDs are a designer decision; record absence as observation, not non-compliance',
      'Refuse to issue the EICR until AFDDs are fitted',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 is explicit: the inspector cannot comment on omission of AFDDs where their use was a matter for the designer to decide. Record the absence as an observation/note, not as a defect code, unless local guidance directs otherwise. Reg 421.1.7 recommends, it does not require, AFDDs in general installations.',
  },
  {
    id: 8,
    question:
      'A4:2026 introduces a Section D disclaimer in the EICR around safety alerts and product recalls. What is the inspector’s duty in practice?',
    options: [
      'Carry out a manufacturer-by-manufacturer recall search at every visit',
      'Trust the consumer unit label — recalls are the manufacturer’s responsibility, not the installer’s',
      'Only check for recalls if the householder asks',
      'Verify, when undertaking additions and alterations, that switches and circuit-breakers (including RCBOs and RCCBs) are not the subject of any product recall',
    ],
    correctAnswer: 3,
    explanation:
      'The A4:2026 guidance in this area is that when undertaking additions and alterations, the installer shall verify that switches and circuit-breakers (including RCBOs and RCCBs) are not subject to any product recall before they are accepted for reuse or left in service. The Section D disclaimer captures the limit of the inspector’s scope.',
  },
  {
    id: 9,
    question:
      'You complete the visual inspection and find a partially burnt cable entry to a 32 A MCB at the consumer unit. What does Reg 642 require next?',
    options: [
      'Address the defect before any test current is applied to that part of the installation',
      'Continue straight to testing, simply recording the burn mark in the schedule comments',
      'Test only the affected circuit to confirm the fault, then move on to the next circuit',
      'Energise the board and observe the behaviour of the affected MCB under normal load',
    ],
    correctAnswer: 0,
    explanation:
      'Testing shall not commence until the inspection required by Reg 642.1 has been completed and any defects that would render testing unsafe or invalid have been addressed. A partially burnt cable entry is an obvious safety defect: it is fixed, isolated, or recorded with controls in place before any test is applied.',
  },
  {
    id: 10,
    question:
      'Which of the following items appears explicitly in the Reg 642.3 list of inspection items?',
    options: [
      'Maximum demand calculation for the whole installation',
      'Schedule of works value agreed with the client',
      'Building Regulations Part P notification reference',
      'Presence of fire barriers, seals and protection against thermal effects',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 642.3(g) explicitly lists "presence of fire barriers, suitable seals and protection against thermal effects". The other items are commercial or notification matters that sit outside the Reg 642.3 visual inspection list.',
  },
];

const InspectionTestingModule8Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Initial visual inspection checklist | I&T Module 8.1 | Elec-Mate',
    description:
      'Reg 642 inspection: the duty that precedes testing, the 642.3 checklist of items, the model Schedule of Inspections in Appendix 6, and the A4:2026 changes — AFDD item 4.23, luminaire-RCD item 5.12, and the new Section D safety alerts and recalls disclaimer.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1"
            title="Initial visual inspection checklist"
            description="The duty that precedes every test. Reg 642 sets the order, the 642.3 list of items, and the Appendix 6 Schedule of Inspections — updated for A4:2026 with AFDDs, luminaire RCDs and a Section D recalls disclaimer."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 642.1 fixes the order: inspection precedes testing, and shall normally be done with the part disconnected from the supply. A defect spotted by eye is fixed (or controlled) before any test current is applied.',
              'Reg 642.2 sets the three verification questions: compliant with Section 511, correctly selected and erected to BS 7671 with manufacturers’ instructions, and not visibly damaged or defective so as to impair safety.',
              'Reg 642.3 names the checklist — items (a) to (t), 33 items in total — covering everything from connection and identification of conductors through to SPDs and measures against electromagnetic disturbances.',
              'Appendix 6 publishes the model Schedule of Inspections. A4:2026 simplified the schedule for initial verification and added an example checklist of items requiring inspection (guidance only, not required to be issued with the certificate).',
              'A4:2026 highlights: item 4.23 — AFDD operational indication (Reg 421.1.7); item 5.12 — luminaire-RCD additional protection in domestic premises (Reg 411.3.4); and a Section D disclaimer covering product recalls and safety alerts on switches, RCBOs and RCCBs encountered during additions and alterations.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 642.1 requires, when it bites, and the one circumstance under which the "normally disconnected" rule may be relaxed',
              'List the three verification limbs of Reg 642.2 and explain how each is evidenced on site',
              'Walk the Reg 642.3 checklist of inspection items from (a) connection of conductors through to (t) measures against electromagnetic disturbances, and identify which apply to a given circuit',
              'Locate the model Schedule of Inspections in Appendix 6 and explain the A4:2026 simplification for initial verification',
              'Carry the A4:2026 changes — AFDD item 4.23, luminaire RCD item 5.12, and the Section D recalls disclaimer — onto the live form without ambiguity',
              'Sequence isolate → prove dead → inspect → test, and recognise the defects that must be remediated before testing may proceed',
            ]}
          />

          <ContentEyebrow>The duty that precedes testing</ContentEyebrow>

          <ConceptBlock
            title="Reg 642.1 — inspection first, supply normally disconnected"
            plainEnglish="You inspect before you test. The part being inspected is normally disconnected from the supply. The order is not negotiable, and the disconnection is the default — not the exception."
            onSite="On every initial verification and every EICR, the first thing on the test sheet is the inspection. The multifunction tester stays in the bag until the visual checklist is walked. Energising before inspecting either invalidates the test (a loose CPC reads as continuous because the metalwork is doing the work) or puts the inspector on a board with a defect they have not yet seen."
          >
            <p>
              Reg 642.1 is the gate to the whole of Part 6. It is a single sentence with two
              non-negotiables: <em>inspection shall precede testing</em>, and the part of the
              installation under inspection{' '}
              <em>shall normally be done with that part disconnected from the supply</em>.
              &ldquo;Normally&rdquo; is the operative word — disconnection is the default; live
              inspection is the exception, permitted only where disconnection is not reasonably
              practicable, and only with a documented safe system of work.
            </p>
            <p>
              The safety rationale is twofold. First, the inspector is not exposed to live parts
              while looking inside a consumer unit, lifting an accessory front, or following a cable
              run. Second, an obvious defect found by eye — a partially burnt cable, a loose CPC
              under a clamp, a single-pole switch in the neutral — is addressed before any test
              current is pushed through it. Test current applied to a defective conductor either
              reads as a fail (forcing a re-test after remediation), or worse, reads as a pass
              because parallel paths are doing the work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.1"
            clause={
              <>
                Inspection shall precede testing and shall normally be done with that part of the
                installation under inspection disconnected from the supply.
              </>
            }
            meaning="Two duties in one sentence: (1) order — inspect before test, every time; (2) state — disconnect the part under inspection by default. The word 'normally' permits live inspection only where disconnection is not reasonably practicable, and even then a documented risk assessment and safe system of work are required."
          />

          <ConceptBlock
            title="Reg 642.2 — the three verification limbs"
            plainEnglish="The inspection has three jobs: (a) confirm equipment complies with Section 511, (b) confirm correct selection and erection to BS 7671 taking manufacturers’ instructions into account, and (c) confirm there is no visible damage or defect impairing safety. All three must be discharged before testing begins."
          >
            <p>
              Reg 642.2 turns the abstract duty of &ldquo;inspect the installation&rdquo; into three
              concrete questions. Each has a different evidence base on site:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>(a) Compliance with Section 511</strong> — equipment shall comply with the
                applicable British or harmonised standard. Evidence is normally the conformity mark
                on the device, or certification furnished by the installer or the manufacturer.
                Section 511 is the gateway: a CE/UKCA mark plus a statement of conformity to the
                relevant product standard usually closes this limb in seconds for branded
                consumer-unit components.
              </li>
              <li>
                <strong>
                  (b) Correctly selected and erected to BS 7671, taking manufacturers’ instructions
                  into account
                </strong>{' '}
                — the design choice (cable size, OCPD rating, accessory type) shall match the BS
                7671 requirements AND the manufacturer’s installation instructions. This is where
                unspecified socket-outlets in shower zones, under-rated MCBs on EV circuits, and DIY
                consumer-unit modifications fall over.
              </li>
              <li>
                <strong>(c) Not visibly damaged or defective so as to impair safety</strong> — the
                everyday damage check. Cracked accessories, melted entries, signs of overheating,
                conductor strands cut and pinched, glands missing, IP rating defeated by removed
                blanks. The threshold is &ldquo;impair safety&rdquo; — superficial scuffs do not,
                evidence of heat does.
              </li>
            </ul>
            <p>
              GN3 is explicit that compliance with 511 &ldquo;may be ascertained by mark or by
              certification furnished by the installer or the manufacturer&rdquo;. You do not need
              to re-test or re-certify a CE/UKCA-marked accessory at every visit — but you do need
              to read the mark, and you do need to flag where one is missing or damaged beyond
              recognition.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.2"
            clause={
              <>
                The inspection shall be made to verify that the installed electrical equipment is:
                (a) in compliance with the requirements of Section 511 (this may be ascertained by
                mark or by certification furnished by the installer or the manufacturer); and (b)
                correctly selected and erected in accordance with BS 7671, taking into account
                manufacturers’ instructions; and (c) not visibly damaged or defective so as to
                impair safety.
              </>
            }
            meaning="Three limbs, all three must be answered yes for the inspection to pass at this gate. Limb (a) is the standards-compliance question. Limb (b) is the design and erection question. Limb (c) is the damage and defect question. Each is a separate column, and the EICR coding flows directly from which limb fails."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Reg 642.3 list — items the inspection shall include</ContentEyebrow>

          <ConceptBlock
            title="Items (a) to (t) — the 33-item checklist, where relevant"
            plainEnglish="Reg 642.3 lists the items the inspection shall include — items (a) through (t), some with multiple sub-items, totalling around 33 distinct checks. The list is not exhaustive but it is the floor: the inspection shall include at least these items where relevant to the installation."
            onSite="Walk the list in order. Skip an item only when it is genuinely not relevant to the installation in front of you (e.g. SPDs on a board with no SPD fitted, where you also confirm none was required by design). Annotate the schedule of inspections with N/A and a brief reason — silent gaps look like missed items."
          >
            <p>
              The Reg 642.3 list is the spine of the visual inspection. Each item maps to one or
              more line entries on the Schedule of Inspections in Appendix 6. The list begins with
              the connection-and-identification fundamentals and ends with surge protection and EMC.
              The headlines:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>(a) connection of conductors</strong> — terminations tight, no hairs,
                correct conductor in correct terminal, no double-occupancy in single-conductor
                terminals.
              </li>
              <li>
                <strong>(b) identification of conductors</strong> — colour codes per Reg 514.4,
                correct sleeving on switched lines and on protective conductors at terminations.
              </li>
              <li>
                <strong>
                  (c) routing of cables in prescribed zones, or protection against mechanical
                  damage, in compliance with Section 522
                </strong>
                .
              </li>
              <li>
                <strong>
                  (d) selection of conductors for current-carrying capacity and voltage drop, in
                  accordance with the design
                </strong>
                .
              </li>
              <li>
                <strong>
                  (e) connection of single-pole devices for protection or switching in line
                  conductors only
                </strong>
                .
              </li>
              <li>
                <strong>(f) correct connection of accessories and equipment</strong>.
              </li>
              <li>
                <strong>
                  (g) presence of fire barriers, suitable seals and protection against thermal
                  effects
                </strong>{' '}
                — penetrations sealed, fire-stopping intact, no signs of overheating in the consumer
                unit.
              </li>
              <li>
                <strong>(h) methods of protection against electric shock</strong> — basic and fault
                protection, additional protection (RCDs, supplementary bonding).
              </li>
              <li>
                <strong>(i) prevention of mutual detrimental influence</strong>.
              </li>
              <li>
                <strong>
                  (j) presence of appropriate devices for isolation and switching correctly located
                </strong>
                .
              </li>
              <li>
                <strong>(k) presence of undervoltage protective devices</strong>.
              </li>
              <li>
                <strong>(l) labelling of protective devices, switches and terminals</strong> — links
                directly to Section 2 of this module.
              </li>
              <li>
                <strong>
                  (m) selection of equipment and protective measures appropriate to external
                  influences
                </strong>
                .
              </li>
              <li>
                <strong>(n) adequacy of access to switchgear and equipment</strong>.
              </li>
              <li>
                <strong>(o) presence of danger notices and other warning signs</strong>.
              </li>
              <li>
                <strong>(p) presence of diagrams, instructions and similar information</strong>.
              </li>
              <li>
                <strong>(q) selection and erection of wiring systems</strong>.
              </li>
              <li>
                <strong>(r) erection methods</strong>.
              </li>
              <li>
                <strong>(s) selection and installation of suitable SPDs where required</strong>.
              </li>
              <li>
                <strong>(t) measures against electromagnetic disturbances</strong>.
              </li>
            </ul>
            <p>
              Item (h) on protection against electric shock has its own substantial sub-list:
              SELV/PELV, double or reinforced insulation, basic protection (insulation, barriers,
              obstacles, placing out of reach), fault protection (ADS, alternative source
              arrangements, choice and setting of devices, earthing arrangements, protective
              conductors), non-conducting locations, earth-free local equipotential bonding,
              electrical separation, and additional protection. This is the spine of Chapter 41 made
              into a checklist.
            </p>
            <p>
              The closing line of Reg 642.3 is important: &ldquo;The inspection shall include all
              particular requirements for special installations or locations (Part 7).&rdquo;
              Bathrooms (Section 701), agricultural premises (Section 705), construction sites
              (704), EV charging (722), solar PV (712) — each adds its own inspection items on top
              of the base 642.3 list.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.3 (extract)"
            clause={
              <>
                The inspection shall include at least the checking of the following items where
                relevant: (a) connection of conductors; (b) identification of conductors; (c)
                routing of cables in prescribed zones, or protection against mechanical damage, in
                compliance with Section 522; (d) selection of conductors for current-carrying
                capacity and voltage drop, in accordance with the design; (e) connection of
                single-pole devices for protection or switching in line conductors only; (f) correct
                connection of accessories and equipment; (g) presence of fire barriers, suitable
                seals and protection against thermal effects; (h) methods of protection against
                electric shock; … The inspection shall include all particular requirements for
                special installations or locations (Part 7).
              </>
            }
            meaning="The 'where relevant' is the reasonableness gate — you do not record an inspection on items that genuinely do not exist on the installation. But the closing sentence about Part 7 is mandatory: every special location adds its own items on top of the base list, and those items are NOT optional once the location applies."
          />

          {/* Visual inspection check-points diagram — annotated CU */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Visual-inspection check points on a consumer unit (A4:2026 aware)
            </h4>
            <svg
              viewBox="0 0 820 480"
              className="w-full h-auto"
              role="img"
              aria-label="Annotated consumer unit diagram showing the seven key visual-inspection check points: cover security, conductor identification, polarity at protective devices, RCD presence and type, AFDD presence and operational indication per item 4.23, SPD status per item 4.19, bonding strap visible, and absence of signs of overheating."
            >
              <rect
                x="60"
                y="60"
                width="700"
                height="280"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="410"
                y="84"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontWeight="bold"
              >
                CONSUMER UNIT — VISUAL INSPECTION POINTS
              </text>
              <text x="410" y="100" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                (Isolated and locked off — Reg 642.1 default state)
              </text>

              <rect
                x="80"
                y="120"
                width="80"
                height="50"
                rx="4"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="120"
                y="142"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                MAIN SW
              </text>
              <text x="120" y="156" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                100 A DP
              </text>

              <rect
                x="170"
                y="120"
                width="60"
                height="50"
                rx="4"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="200"
                y="142"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                SPD
              </text>
              <text x="200" y="156" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Type 2
              </text>

              <rect
                x="240"
                y="120"
                width="60"
                height="50"
                rx="4"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="270"
                y="140"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                AFDD/
              </text>
              <text
                x="270"
                y="152"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                RCBO
              </text>
              <text x="270" y="164" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Lights
              </text>

              <rect
                x="310"
                y="120"
                width="60"
                height="50"
                rx="4"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="340"
                y="140"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                RCBO
              </text>
              <text x="340" y="152" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                30 mA
              </text>
              <text x="340" y="164" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Sockets
              </text>

              <rect
                x="380"
                y="120"
                width="50"
                height="50"
                rx="4"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <text x="405" y="142" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                MCB
              </text>
              <text x="405" y="156" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                32 A
              </text>

              <rect
                x="440"
                y="120"
                width="50"
                height="50"
                rx="4"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <text x="465" y="142" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                MCB
              </text>
              <text x="465" y="156" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                16 A
              </text>

              <rect
                x="500"
                y="120"
                width="240"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="620"
                y="134"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                EARTH BAR (MET)
              </text>

              <line x1="500" y1="160" x2="740" y2="160" stroke="#22C55E" strokeWidth="2" />
              <text x="620" y="176" textAnchor="middle" fill="#22C55E" fontSize="9">
                Bonding strap (10 mm² g/y)
              </text>

              <line
                x1="120"
                y1="120"
                x2="120"
                y2="200"
                stroke="#EF4444"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="120"
                y="218"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                1
              </text>
              <text x="120" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Cover &amp; main
              </text>
              <text x="120" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                switch security
              </text>

              <line
                x1="200"
                y1="120"
                x2="200"
                y2="200"
                stroke="#A855F7"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="200"
                y="218"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                2
              </text>
              <text x="200" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                SPD status
              </text>
              <text x="200" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                item 4.19
              </text>

              <line
                x1="270"
                y1="120"
                x2="270"
                y2="260"
                stroke="#FBBF24"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="270"
                y="278"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                3
              </text>
              <text x="270" y="292" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                AFDD operational
              </text>
              <text x="270" y="305" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                indication — item 4.23
              </text>

              <line
                x1="340"
                y1="120"
                x2="340"
                y2="260"
                stroke="#22C55E"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="340"
                y="278"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                4
              </text>
              <text x="340" y="292" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                RCD ≤ 30 mA on
              </text>
              <text x="340" y="305" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                lighting — item 5.12
              </text>

              <line
                x1="405"
                y1="120"
                x2="405"
                y2="200"
                stroke="#FBBF24"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="405"
                y="218"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                5
              </text>
              <text x="405" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Polarity at OCPD
              </text>
              <text x="405" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                — line side only
              </text>

              <line
                x1="620"
                y1="140"
                x2="620"
                y2="200"
                stroke="#22C55E"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="620"
                y="218"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                6
              </text>
              <text x="620" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Bonding visible &amp;
              </text>
              <text x="620" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                terminated tight
              </text>

              <line
                x1="710"
                y1="120"
                x2="710"
                y2="260"
                stroke="#EF4444"
                strokeDasharray="3,3"
                strokeWidth="1.2"
              />
              <text
                x="710"
                y="278"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                7
              </text>
              <text x="710" y="292" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                No signs of
              </text>
              <text x="710" y="305" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                overheating ⚠
              </text>

              <rect
                x="60"
                y="370"
                width="700"
                height="90"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="410" y="392" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Seven check points = a single visual sweep of the consumer unit. Each maps to a Reg
                642.3 list item and a line on the Schedule of Inspections.
              </text>
              <text x="410" y="410" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                A4:2026 added items 4.23 (AFDD operational indication) and 5.12 (luminaire RCD ≤ 30
                mA in domestic premises).
              </text>
              <text
                x="410"
                y="432"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Inspection precedes testing — Reg 642.1.
              </text>
              <text x="410" y="450" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Defect found at any point → remediate or document control before any test current is
                applied.
              </text>
            </svg>
          </div>

          <CommonMistake
            title="Walking the visual inspection without a written schedule"
            whatHappens="The inspector relies on memory. Items (i) prevention of mutual detrimental influence, (k) undervoltage protective devices, and (t) measures against electromagnetic disturbances are forgotten. The schedule of inspections is signed off with all items ticked because the inspector ‘has done that before’. On audit, three items have no evidence behind the tick — the schedule is rejected and the certificate is withdrawn."
            doInstead="Print or fill the Schedule of Inspections from Appendix 6 line by line at the time of the inspection. Tick what was inspected, mark N/A for what genuinely does not apply (with a reason), and leave nothing blank. The schedule is the audit trail — and per the A4:2026 model forms, the EIC is only complete if the Schedule of Inspections is included with it."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Appendix 6 — the model Schedule of Inspections</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 simplification and the new example checklist"
            plainEnglish="Appendix 6 publishes the model Schedule of Inspections referenced by the EIC. A4:2026 simplified the schedule for initial verification and added an example checklist of items requiring inspection. The example checklist is guidance only — it is not required to be issued with the certificate, but it is the cleanest way to walk the Reg 642.3 list."
          >
            <p>
              The Appendix 6 model Schedule of Inspections is not a free-form note pad. It is a
              structured form keyed to Reg 642.3, divided into broad headings (intake equipment,
              installation earthing and bonding, consumer unit, distribution circuits, final
              circuits, special locations, isolation and switching, safety services, identification
              and notices, accessories and current-using equipment) with a tick-box and a comment
              column against each line. Per A4:2026:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule simplified for initial verification</strong> — fewer redundant
                lines, better grouped by Reg 642.3 family. The cert is leaner without losing the
                audit trail.
              </li>
              <li>
                <strong>New example checklist of items requiring inspection</strong> — additional
                guidance, not required to be provided with the certificate, but the closest thing
                BS&nbsp;7671 publishes to a &ldquo;what good looks like&rdquo; example.
              </li>
              <li>
                <strong>Schedule line items use numeric tags</strong> — checklist items 4.19, 4.22,
                4.23, 5.12 etc. cross-reference specific BS&nbsp;7671 clauses, so the schedule line
                acts as a hyperlink back into the regulations.
              </li>
              <li>
                <strong>Each line item shall have an entry</strong> — the inspector shall not leave
                items unrecorded; absence or defect shall be explicitly stated. Blank rows look like
                missed items on audit.
              </li>
            </ul>
            <p>
              The numeric tags matter: GN3 cross-references &ldquo;tag 4.23&rdquo; to AFDD
              operational indication, &ldquo;tag 5.12&rdquo; to luminaire RCD requirements, and so
              on. The tag is not a page number — it is a stable reference into the regulations,
              which is why the same tag appears on the example checklist, the schedule of
              inspections, and the underlying Reg.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4:2026 changes that bite at inspection stage</ContentEyebrow>

          <ConceptBlock
            title="Item 4.23 — AFDD operational indication (Reg 421.1.7)"
            plainEnglish="Reg 421.1.7 was introduced in A4:2026 recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents. Where AFDDs are installed, item 4.23 of the inspection schedule confirms each one provides an operational indication (status LED or test function) that can be observed during inspection."
            onSite="The inspector’s job is twofold: (i) confirm presence/absence of AFDDs against the design intent, and (ii) where AFDDs are fitted, confirm the operational indication (LED or test display) is healthy. AFDDs without an indication that the device is powered and able to indicate a healthy state are not fit for purpose at inspection — they pass the visual ‘is it there’ test but fail the ‘does it work’ test."
          >
            <p>
              The AFDD recommendation is just that — a recommendation, not a requirement, in general
              installations. GN3 is explicit that &ldquo;the inspector cannot comment if AFDDs are
              not installed when their use was a matter for the designer to decide&rdquo;. So the
              EICR coding flow is:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>AFDDs designed-in and present, indicators healthy</strong> — pass against
                item 4.23.
              </li>
              <li>
                <strong>AFDDs designed-in and present, indicator dark or showing fault</strong> — C2
                (potentially dangerous): the device is fitted but its status cannot be confirmed.
                Investigate or replace.
              </li>
              <li>
                <strong>AFDDs not designed-in (designer decision)</strong> — record as observation /
                note, NOT as a non-compliance. Reg 421.1.7 is a recommendation in general premises.
              </li>
              <li>
                <strong>
                  AFDDs prohibited (Section 710 medical group 0/2 circuits, supply from a medical IT
                  system)
                </strong>{' '}
                — the prohibition under Reg 710.421.1.7 / 710.421.1.7.101 bites; presence of AFDDs
                on those circuits is itself a non-compliance.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc fault
                detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a
                fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning="Recommendation, not requirement, in general installations — so absence is recorded but not coded as a defect. Where AFDDs are fitted, the operational indication is the inspection point (item 4.23). Section 710 (medical) keeps its specific prohibitions."
          />

          <ConceptBlock
            title="Item 5.12 — luminaire-RCD additional protection in domestic premises (Reg 411.3.4)"
            plainEnglish="Reg 411.3.4 (A4:2026) requires that, within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. Item 5.12 of the inspection schedule confirms this on every domestic property — and ‘Lighting’ for the purpose of the regulation includes luminaires, control equipment and wiring."
          >
            <p>
              This is a hard requirement, not a recommendation. The inspection sequence on a
              domestic EICR:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Identify the AC final circuits supplying luminaires (often labelled
                &ldquo;lights&rdquo; or &ldquo;lighting&rdquo;).
              </li>
              <li>
                Confirm each one is provided with additional protection by an RCD whose rated
                residual operating current is ≤ 30 mA. Evidence: device markings on the protective
                device (RCBO label or shared RCD), consumer-unit labelling, and circuit
                identification on the schedule.
              </li>
              <li>
                Where the lighting circuit is on a Type B MCB only (no RCD), record the
                non-compliance with Reg 411.3.4 and apply the appropriate observation code
                (typically C3 for non-compliance with current standards on an existing installation;
                consider C2 where touch shock risk is elevated).
              </li>
            </ol>
            <p>
              The exception path for older installations is the standard EICR coding judgement, not
              an exception from the inspection. The inspector still records the absence of RCD
              protection — the question is which code to apply, not whether to comment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4"
            clause={
              <>
                Regulation 411.3.4 requires that, within domestic (household) premises, additional
                protection by an RCD with a rated residual operating current not exceeding 30 mA
                shall be provided for AC final circuits supplying luminaires.
              </>
            }
            meaning="A4:2026 closes the lighting-circuit gap. Domestic AC final circuits supplying luminaires get 30 mA RCD additional protection — full stop. Inspection item 5.12 confirms it on every property; new work that omits it fails initial verification."
          />

          <Scenario
            title="A 1990s 6-way split-load board on a domestic EICR"
            situation="Three-bedroom semi, last full rewire 1995. Consumer unit is split-load: one 30 mA RCD covers four circuits (sockets and immersion); the other side is on the main switch only and feeds two lighting circuits and a cooker. No AFDDs anywhere. The lighting circuits are protected by Type B 6 A MCBs only — no RCD coverage."
            whatToDo="At inspection stage: (1) record presence of split-load RCD on item 5.12 partial — sockets covered, lights NOT covered. Reg 411.3.4 (A4:2026) non-compliance recorded against the lighting circuits; suggested code C3 (does not comply with current edition) with explanatory note. (2) Item 4.23 — AFDDs absent; observation only, designer decision. (3) Item 4.19 — SPD absent; same treatment unless required by design / risk assessment. (4) The Section D ‘safety alerts and recalls’ disclaimer is added to the EICR cover."
            whyItMatters="The 1995 install was compliant when fitted — but A4:2026 raises the bar for new and altered work. The EICR’s job is to capture the gap: the homeowner is told, on a documented certificate, that the lighting circuits do not have 30 mA RCD additional protection that current standards require. Quoting for an upgrade flows directly from the C3 entries on the report."
          />

          <ConceptBlock
            title="Section D — safety alerts and product recalls disclaimer"
            plainEnglish="A4:2026 introduces a Section D disclaimer on the EICR around safety alerts and product recalls. The inspector’s practical duty is narrow: when undertaking additions and alterations, verify that switches and circuit-breakers (including RCBOs and RCCBs) are not the subject of any product recall before they are accepted for reuse or left in service. The disclaimer captures the limit of scope."
          >
            <p>
              The recall check is not a manufacturer-by-manufacturer audit at every visit. It is a
              targeted check applied at the point where new work touches existing equipment:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Trigger</strong> — additions and alterations that involve switches,
                circuit-breakers, RCBOs or RCCBs being reused or left in service alongside new work.
              </li>
              <li>
                <strong>Action</strong> — verify (typically via the Office for Product Safety and
                Standards recall list, or the manufacturer’s own published recall notices) that the
                model and batch of each affected device is not subject to recall.
              </li>
              <li>
                <strong>Evidence</strong> — note the check on the certificate or the schedule
                comments. The Section D disclaimer caveats that the inspection cannot identify
                future recalls or recalls of equipment outside the scope of the additions or
                alterations.
              </li>
            </ul>
            <p>
              The same principle is in the GN3 note: &ldquo;the recall check applies not only to
              named items but to similar protective devices and switching equipment encountered
              during additions and alterations&rdquo;. The wording &ldquo;switch, circuit-breakers,
              RCBOs, RCCBs, etc.&rdquo; is illustrative — the duty is to recall-check protective and
              switching devices generally, not just the four specifically named.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating ‘recommended’ AFDDs as a hard fail on EICR"
            whatHappens="Inspector finds no AFDDs in a 2018 consumer unit. Records C2 (potentially dangerous) on the EICR. The homeowner is told their installation is unsafe and must be rectified urgently. In fact Reg 421.1.7 is a recommendation in general installations and AFDD use was a designer decision. The C2 is removed on appeal, the inspector’s reputation takes a hit, and the homeowner has been alarmed without cause."
            doInstead="Apply the GN3 framing: ‘the inspector cannot comment on omission of AFDDs where their use was a matter for the designer to decide’. Record absence as an observation in the schedule comments — typically a note that AFDDs are now recommended by Reg 421.1.7 and the homeowner may wish to consider retrofitting at next consumer-unit upgrade. C2 is reserved for specific circumstances (medical IT systems where AFDDs are present and prohibited; other defined cases)."
          />

          <CommonMistake
            title="Inspecting energised because ‘the tenant won’t let me turn the power off’"
            whatHappens="The flat occupant refuses isolation because the freezer is full and the smart meter ‘doesn’t restart properly’. The inspector skips isolation, opens the consumer-unit cover with the supply on, and works around live tails. A loose neutral arcs to the casing during the inspection; the inspector takes a flash burn and the cover assembly is destroyed. The EICR cannot be completed. The tenant is now without power AND has a damaged board."
            doInstead="Reg 642.1 says the part under inspection ‘shall normally be done with that part disconnected’. Where disconnection is genuinely not reasonably practicable, document the risk assessment, use insulated tools, full PPE (arc-rated where the prospective fault current warrants), and a safe system of work. If the tenant refuses isolation outright, the safer outcome is often to abort, write to the landlord, and reschedule. ‘I went anyway’ is not a defence after the event."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The sequence on site</ContentEyebrow>

          <ConceptBlock
            title="Isolate → prove dead → inspect → test"
            plainEnglish="The four-step sequence is the practical implementation of Reg 642.1. Each step has its own evidence and its own failure mode. Skip a step and the next one is either invalid or unsafe."
            onSite="Treat each step as a tick on the test sheet, not a memory item. The schedule of inspections is the audit trail for the inspect step; the test sheet is the audit trail for everything else."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate</strong> — open the appropriate isolation device. Confirm the
                isolator location is suitable for the part being inspected. Lock off where the
                isolator is remote from the work or accessible to others.
              </li>
              <li>
                <strong>Prove dead</strong> — voltage indicator tested against a known live source
                (proving unit), then on each conductor under inspection, then back to the proving
                unit. The &ldquo;test–test–test&rdquo; sequence is non-negotiable.
              </li>
              <li>
                <strong>Inspect</strong> — walk the Reg 642.3 list, ticking the schedule of
                inspections. Address any defect that would render testing unsafe or invalid before
                proceeding.
              </li>
              <li>
                <strong>Test</strong> — only now does the multifunction tester come out. Tests of
                Reg 643.2 to 643.6 are carried out in that order before energisation; tests of Reg
                643.7 onwards follow energisation.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="GN3 (extract on Reg 642.1)"
            clause={
              <>
                Testing shall not commence until the inspection required by Regulation 642.1 has
                been completed and any defects that would render testing unsafe or invalid have been
                addressed.
              </>
            }
            meaning="The inspect step is not a polite preamble — it is a gatekeeper. Defects that compromise safety or invalidate test results are addressed BEFORE the next test current is applied. ‘I’ll come back to it’ is not a compliant approach if the defect changes the outcome of the next test."
          />

          <SectionRule />

          <ContentEyebrow>Where the inspection feeds the rest of the certificate</ContentEyebrow>

          <ConceptBlock
            title="From Schedule of Inspections to EIC / EICR coding"
            plainEnglish="Each line on the Schedule of Inspections either passes, fails, or is N/A. Each fail flows into the comments on the certificate (EIC for new work, EICR for periodic). The line tag on the schedule is the cross-reference that makes the certificate auditable."
          >
            <p>The flow is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pass</strong> — tick the line, no further entry needed.
              </li>
              <li>
                <strong>N/A</strong> — annotate with a brief reason (&ldquo;no SPD fitted, not
                required by design&rdquo;) so a future inspector knows it was considered, not
                skipped.
              </li>
              <li>
                <strong>Fail (initial verification, EIC)</strong> — the certificate cannot be issued
                until the defect is remediated. New work that does not pass inspection is not
                certified, full stop.
              </li>
              <li>
                <strong>Fail (periodic, EICR)</strong> — code the defect (C1 / C2 / C3 / FI) per
                guidance, record on Section I (existing installation comments), and reflect in the
                overall classification of the installation as satisfactory or unsatisfactory.
              </li>
            </ul>
            <p>
              On A4:2026 EICRs, the Section D &ldquo;next inspection&rdquo; recommendation and the
              new safety alerts / recalls disclaimer sit alongside this coded outcome. The
              recommendation interval is the designer’s judgement; the disclaimer is the inspector’s
              scope-of-work caveat.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 642.1 is the gate: inspection precedes testing, and the part under inspection is normally disconnected from the supply. The order and the state are not negotiable.',
              'Reg 642.2 has three limbs — Section 511 compliance, correct selection and erection to BS 7671 with manufacturers’ instructions, and no visible damage or defect impairing safety. All three must answer yes.',
              'Reg 642.3 lists items (a) to (t) — the spine of the visual inspection. Walk the list in order, tick the schedule, mark N/A for items that genuinely do not apply, leave nothing blank.',
              'Special locations (Part 7) add their own inspection items on top of the base 642.3 list — bathrooms, EV charging, solar PV, etc.',
              'A4:2026 item 4.23 — AFDD operational indication. Recommendation only in general premises (Reg 421.1.7); record absence as observation, not non-compliance.',
              'A4:2026 item 5.12 — domestic AC final circuits supplying luminaires shall have additional protection by an RCD ≤ 30 mA (Reg 411.3.4). This is a hard requirement, not a recommendation.',
              'Section D safety alerts and recalls disclaimer — when undertaking additions and alterations, verify switches, circuit-breakers, RCBOs and RCCBs are not subject to product recall.',
              'Sequence: isolate → prove dead → inspect → test. Defects that would make testing unsafe or invalid are addressed before any test current is applied.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Does Reg 642.1 ever permit live inspection?',
                answer:
                  'Yes, where disconnection from the supply is not reasonably practicable. The wording "shall normally be done" allows the exception, but it requires a documented risk assessment, suitable PPE, insulated tools, and a safe system of work. Examples: a tenanted EICR with critical refrigerated stock, life-supporting medical equipment, or a 24/7 server room. The inspection step is still done before the test step — only the disconnection default is relaxed.',
              },
              {
                question: 'How many items are in the Reg 642.3 inspection list?',
                answer:
                  'Items (a) to (t) — about 20 top-level items. Item (h) on protection against electric shock has its own substantial sub-list covering basic protection, fault protection, additional protection, non-conducting locations, electrical separation and so on. Counting sub-items, the practical floor is around 33 distinct checks. The list is the minimum: "the inspection shall include at least" these items where relevant.',
              },
              {
                question: 'Where do I find the model Schedule of Inspections to print?',
                answer:
                  'Appendix 6 of BS 7671:2018+A4:2026. The schedule is grouped by Reg 642.3 family — intake, earthing/bonding, consumer unit, distribution, final circuits, special locations, isolation/switching, identification, accessories. A4:2026 simplified the schedule for initial verification and added a separate example checklist of items requiring inspection (guidance only, not required to be issued with the certificate).',
              },
              {
                question:
                  'Is item 5.12 (luminaire RCD ≤ 30 mA) only for new installations or for EICRs too?',
                answer:
                  'Both. New installations in domestic premises shall comply with Reg 411.3.4 — no RCD on the lighting circuit, no certificate. EICRs record the compliance position: where the existing installation predates the requirement, the absence is typically C3 (non-compliance with current standards) unless other factors elevate it. The inspector still records the absence at item 5.12 either way.',
              },
              {
                question: 'What evidence do I need that I checked for product recalls?',
                answer:
                  'A note on the certificate or schedule comments stating that recall status was checked at the time of the additions or alterations, and the source consulted (typically the OPSS recall list or manufacturer notices). The Section D disclaimer in A4:2026 captures that the check is point-in-time and limited to the equipment within scope of the work — it does not warrant against future recalls or equipment outside the work scope.',
              },
              {
                question:
                  'Item (h) is huge — basic, fault, and additional protection. Do I really inspect every sub-item on every job?',
                answer:
                  'Where relevant. SELV and PELV applications do not appear on a typical domestic EICR — N/A those lines with a note. Earth-free local equipotential bonding is a niche measure — N/A in normal premises. Automatic disconnection of supply (ADS) is the default protective measure on TT and TN systems, so its sub-items always bite. The "where relevant" gate is real, but it does not let you skip ADS, basic insulation, or additional protection in a typical domestic or commercial install.',
              },
              {
                question:
                  'If AFDDs are absent, when does that become a defect rather than an observation?',
                answer:
                  'When AFDDs are required by another regulation rather than recommended by Reg 421.1.7. Examples: Reg 710.421.1.7 prohibits AFDDs on medical group 0/2 circuits — presence is the defect there. Reg 422.3 (rooms with risk of fire) historically tightened the AFDD requirement; check the specific clause for the location. In ordinary domestic and commercial premises, absence is observation only; the EICR cannot be downgraded to unsatisfactory on the strength of missing AFDDs alone.',
              },
              {
                question: 'Can I sign off the EIC with the Schedule of Inspections incomplete?',
                answer:
                  'No. An EIC compliant with Reg 644.3 is only complete if it includes (a) Schedule(s) of Inspection and (b) Schedule(s) of Circuit Details and Schedule(s) of Test Results, all based on the Appendix 6 models. Missing one of these schedules constitutes non-conformance — the certificate is not valid. The same is true on partial certifications: even where the EIC covers only part of the installation, the schedules included shall still be based on the Appendix 6 models for that scope.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Initial visual inspection — Module 8.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-8/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.2 Identification and labelling
              </div>
            </button>
          </div>

          <div className="hidden">
            <ClipboardList />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule8Section1;
