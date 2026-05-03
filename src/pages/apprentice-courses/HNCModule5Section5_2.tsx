/**
 * Module 5 · Section 5 · Subsection 2 — Electrical Commissioning
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   BS 7671 verification, switchgear energisation, functional performance and certification — proving the electrical installation works safely and as designed.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical Commissioning - HNC Module 5 Section 5.2';
const DESCRIPTION =
  'Master electrical commissioning procedures: BS 7671 verification requirements, initial verification testing, EIC/EICR certification, test sequences, energisation procedures and switchgear commissioning.';

const quickCheckQuestions = [
  {
    id: 'initial-verification',
    question: 'What must be completed before any electrical installation is energised?',
    options: [
      'Client sign-off only',
      'Initial verification testing',
      'Final account payment',
      'Building control approval',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Regulation 610.1 requires that every electrical installation shall be inspected and tested during erection and on completion, before being put into service. Initial verification must be completed before energisation.',
  },
  {
    id: 'dead-testing',
    question: 'Which tests must be carried out with the supply disconnected (dead testing)?',
    options: [
      'Voltage drop only',
      'Prospective fault current only',
      'Continuity and insulation resistance',
      'Earth loop impedance only',
    ],
    correctIndex: 2,
    explanation:
      'Dead tests include continuity of protective conductors, continuity of ring final circuit conductors, insulation resistance, and polarity. These must be completed before live testing commences.',
  },
  {
    id: 'eic-purpose',
    question: 'What is the purpose of an Electrical Installation Certificate (EIC)?',
    options: [
      'To request DNO connection',
      'To certify initial verification of a new installation',
      'To record periodic inspection findings',
      'To approve design only',
    ],
    correctIndex: 1,
    explanation:
      'The EIC certifies that a new installation, or addition/alteration to an existing installation, has been designed, constructed, inspected and tested in accordance with BS 7671.',
  },
  {
    id: 'test-sequence',
    question: 'Why is the correct sequence of testing important?',
    options: [
      'To save time only',
      'To ensure earlier tests validate later test results',
      'To satisfy insurance requirements',
      'To reduce equipment costs',
    ],
    correctIndex: 1,
    explanation:
      'The test sequence ensures safety and accuracy - for example, insulation resistance must be verified before live testing, and continuity of protective conductors must be confirmed before earth fault loop testing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to BS 7671, what is the minimum insulation resistance for a 230V circuit?',
    options: ['0.5 megohms', '1.0 megohm', '2.0 megohms', '10 megohms'],
    correctAnswer: 1,
    explanation:
      'For circuits up to and including 500V, BS 7671 Table 61 requires a minimum insulation resistance of 1.0 megohm when tested at 500V DC.',
  },
  {
    id: 2,
    question: 'What must be disconnected before carrying out insulation resistance testing?',
    options: [
      'Nothing - test with all equipment connected',
      'Only lighting circuits',
      'Electronic equipment, surge protective devices, and voltage-sensitive devices',
      'Only socket outlets',
    ],
    correctAnswer: 2,
    explanation:
      'Electronic equipment, SPDs, PIRs, and other voltage-sensitive equipment must be disconnected as the 500V DC test voltage could damage them. Lamps should also be removed.',
  },
  {
    id: 3,
    question: 'When testing ring final circuit continuity, what confirms the ring is complete?',
    options: [
      'High resistance reading',
      'Equal readings at each socket',
      'Resistance at mid-point approximately equal to end-to-end values',
      'Zero resistance throughout',
    ],
    correctAnswer: 2,
    explanation:
      'With cross-connected leads at the distribution board, readings at each socket should be substantially the same and approximately equal to the initial end-to-end measurement. This confirms the ring is continuous.',
  },
  {
    id: 4,
    question: 'What document must accompany every new electrical installation?',
    options: [
      'Minor Works Certificate',
      'EICR',
      'Electrical Installation Certificate (EIC)',
      'Domestic Installation Certificate only',
    ],
    correctAnswer: 2,
    explanation:
      'An Electrical Installation Certificate (EIC) must be issued for every new installation. It includes design, construction and inspection/test schedules, signed by the responsible persons.',
  },
  {
    id: 5,
    question: 'What is the maximum permitted Zs for a 32A Type B MCB on a TN-S system?',
    options: ['0.69 ohms', '1.09 ohms', '1.37 ohms', '2.19 ohms'],
    correctAnswer: 2,
    explanation:
      'For a 32A Type B MCB, the maximum Zs from BS 7671:2018+A4:2026 Table 41.3 is 1.37 ohms (Cmin = 0.95 applied; the 0.8 factor for ambient measurement gives a field test maximum of approximately 1.10 ohms).',
  },
  {
    id: 6,
    question: 'When should RCD operation be tested during commissioning?',
    options: [
      'Only at final inspection',
      'During dead testing phase',
      'After all other tests are satisfactory and supply is energised',
      'Before insulation resistance testing',
    ],
    correctAnswer: 2,
    explanation:
      'RCD testing requires a live supply and is part of live testing. It should only be carried out after dead tests and earth fault loop impedance tests confirm the installation is safe to energise.',
  },
  {
    id: 7,
    question: 'What is the purpose of functional testing during switchgear commissioning?',
    options: [
      'To check cable colours only',
      'To verify protection settings, interlocks and control circuits operate correctly',
      'To measure insulation resistance only',
      'To confirm nameplate details',
    ],
    correctAnswer: 1,
    explanation:
      'Functional testing verifies that protection relays operate at correct settings, mechanical and electrical interlocks function properly, and control/indication circuits perform as designed.',
  },
  {
    id: 8,
    question: 'Who must sign Schedule 1 (design) of an Electrical Installation Certificate?',
    options: [
      'The installing electrician only',
      'The client',
      'The person responsible for the design of the installation',
      'Any competent person',
    ],
    correctAnswer: 2,
    explanation:
      'Schedule 1 must be signed by the person responsible for the design, confirming it complies with BS 7671. This may be different from the installer if design and installation are by separate parties.',
  },
  {
    id: 9,
    question: 'What documentation should be provided for LV switchgear commissioning?',
    options: [
      'Visual inspection only',
      'Test certificates, relay settings, protection coordination studies and as-built drawings',
      'Manufacturer catalogues only',
      'Installation photographs only',
    ],
    correctAnswer: 1,
    explanation:
      'Switchgear commissioning documentation includes factory test certificates, site test results, protection relay settings, coordination studies, cable schedules, and as-built single line diagrams.',
  },
  {
    id: 10,
    question:
      'Before energising a new installation, what must be verified regarding the DNO supply?',
    options: [
      'Only the meter serial number',
      'PSCC/PFC and Ze are within design parameters',
      'The supply cable colour only',
      'Nothing - just connect',
    ],
    correctAnswer: 1,
    explanation:
      'The prospective short circuit current (PSCC) and external earth fault loop impedance (Ze) must be verified to confirm the installation protective devices are adequate and discrimination is maintained.',
  },
  {
    id: 11,
    question:
      'What is the trip time requirement for a 30mA RCD at 5 times rated residual current (150mA)?',
    options: ['40ms maximum', '200ms maximum', '300ms maximum', '1 second maximum'],
    correctAnswer: 0,
    explanation:
      "When tested at 5 times the rated residual current (5 x 30mA = 150mA), a general-use RCD must trip within 40ms. This tests the RCD's ability to provide supplementary protection against electric shock.",
  },
  {
    id: 12,
    question: 'Why is phased energisation recommended for large installations?',
    options: [
      'To save electricity costs',
      'To allow systematic fault identification and prevent cascading failures',
      'To satisfy insurance only',
      'It is not recommended',
    ],
    correctAnswer: 1,
    explanation:
      'Phased energisation allows faults to be identified and isolated to specific sections, prevents overloading during initial energisation, and enables systematic verification of each section before proceeding.',
  },
];

const faqs = [
  {
    question: 'What is the difference between initial verification and periodic inspection?',
    answer:
      'Initial verification (documented on an EIC) is carried out on new installations or additions/alterations before being put into service. It confirms compliance with design and BS 7671. Periodic inspection (documented on an EICR) assesses the ongoing safety of an existing installation, identifying deterioration, damage, or departures from current standards. The test scope and acceptance criteria differ between the two.',
  },
  {
    question: 'Can I energise an installation with minor defects?',
    answer:
      'Minor defects (Classification Code C3 - improvement recommended) do not prevent energisation but should be recorded and communicated to the client. However, installations with dangerous conditions (C1) or potentially dangerous conditions (C2) must not be energised until these are rectified. The responsible person must make a professional judgement on safety.',
  },
  {
    question: 'What testing is required for an addition to an existing installation?',
    answer:
      'The new circuits must undergo full initial verification testing. Additionally, you must verify the existing installation can safely supply the addition - check Ze, PSCC, and main protective devices. The characteristics of the existing installation affecting the addition must be recorded on Schedule of Inspections. Issue an EIC for the addition.',
  },
  {
    question: 'How do I commission emergency lighting systems?',
    answer:
      'Emergency lighting commissioning includes: verification of luminaire positions against design, functional testing of each luminaire, duration testing (full rated duration), verification of central battery systems, testing of monitoring and fault indication, and documentation of as-installed details. Follow BS 5266-1 requirements and provide commissioning certificates.',
  },
  {
    question: 'What records should be kept for switchgear commissioning?',
    answer:
      'Maintain comprehensive records including: factory test certificates, site acceptance test results, protection relay settings and test reports, primary injection test results where applicable, insulation resistance values, contact resistance measurements, functional test results, and as-commissioned single line diagrams with protection settings annotated.',
  },
  {
    question: 'Who can sign an Electrical Installation Certificate?',
    answer:
      'The EIC has three parts: Schedule 1 (design) - signed by the designer, Schedule 2 (construction) - signed by the installer/constructor, and Schedule 3 (inspection and test) - signed by the person responsible for inspection and testing. One person may sign all three if they were responsible for all aspects, or different persons sign their respective schedules.',
  },
];

const HNCModule5Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 2"
            title="Electrical Commissioning"
            description="Testing procedures, verification requirements and certification for building services electrical systems."
            tone="purple"
          />

          <TLDR
            points={[
              "Electrical commissioning = BS 7671 initial verification + functional testing + integration with BMS/fire/lighting controls.",
              "BS 7671 Part 6 sequence: inspection, testing (continuity → IR → polarity → Zs → RCD → functional), certification (EIC).",
              "Energisation procedures: lock-off → witness → progressive energisation → load test → handover — not flick-and-hope.",
              "Functional testing verifies system behaviour: lighting controls switch as designed, fire alarm causes isolations, PFI captures harmonics.",
              "Documentation: EIC + Schedule of Inspections + Schedule of Test Results — these are the legal record of compliance.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1 (Certification — General)"
            clause="Upon completion of the verification of a new installation, or changes to an existing installation, an Electrical Installation Certificate, together with a Schedule of Inspections and a Schedule of Test Results, shall be given to the person ordering the work."
            meaning={
              <>
                The EIC + Schedules are the formal, legal record that the installation has been verified and meets BS 7671. They are signed by the designer, constructor and verifier (often the same person on small jobs). Issuing without proper verification is a regulatory breach and a criminal exposure under EAWR. Treat certification as the closure of commissioning, not a paperwork chore.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 644.1."
          />


          <LearningOutcomes
            outcomes={[
              'Apply BS 7671 verification requirements to building services installations',
              'Execute the correct sequence of initial verification tests',
              'Complete Electrical Installation Certificates accurately',
              'Commission LV switchgear and distribution systems',
              'Implement safe energisation procedures',
              'Document test results and certification requirements',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="BS 7671 Verification Requirements">
            <p>
              BS 7671 Part 6 establishes the mandatory requirements for inspection and testing of
              electrical installations. Initial verification must be carried out on every new
              installation, addition or alteration before the installation is put into service.
            </p>
            <p>
              <strong>Key regulatory requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulation 610.1:</strong> Every installation shall be inspected and tested
                during erection and on completion
              </li>
              <li>
                <strong>Regulation 610.2:</strong> Precautions shall be taken to avoid danger to
                persons and damage to property
              </li>
              <li>
                <strong>Regulation 631.1:</strong> Certification shall be provided confirming
                compliance with BS 7671
              </li>
              <li>
                <strong>Regulation 632.1:</strong> Schedule of test results shall accompany
                certification
              </li>
            </ul>
            <p>
              <strong>Inspection requirements (Chapter 61):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Connection of conductors:</strong> Visual inspection for security and
                correctness
              </li>
              <li>
                <strong>Identification of conductors:</strong> Colour coding per Table 51
              </li>
              <li>
                <strong>Routing of cables:</strong> Compliance with prescribed zones
              </li>
              <li>
                <strong>Protective devices:</strong> Correct type and rating for circuit
              </li>
              <li>
                <strong>Enclosures and barriers:</strong> IP rating suitable for environment
              </li>
              <li>
                <strong>Labelling and notices:</strong> Warning signs, circuit identification
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Inspection shall precede testing. Many tests rely on
              visual confirmation that the installation is correctly assembled.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Test Sequences and Procedures">
            <p>
              The sequence of testing is critical - each test validates the safety of subsequent
              tests and confirms results of previous tests. Dead tests must always precede live
              tests.
            </p>
            <p>
              <strong>Dead Tests (Supply Isolated):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Continuity of protective conductors (including main and supplementary bonding)
              </li>
              <li>Continuity of ring final circuit conductors</li>
              <li>Insulation resistance</li>
              <li>Polarity (initial check)</li>
              <li>Earth electrode resistance (TT systems)</li>
            </ul>
            <p>
              <strong>Live Tests (Supply Energised):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Polarity verification (live confirmation)</li>
              <li>Earth fault loop impedance (Zs)</li>
              <li>Prospective fault current (PSCC)</li>
              <li>RCD operation</li>
              <li>Functional testing</li>
            </ul>
            <p>
              <strong>Key test parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity (R1+R2):</strong> Low resistance ohmmeter — Compare with
                calculated values
              </li>
              <li>
                <strong>Insulation resistance:</strong> 500V DC (for 230V circuits) — 1.0 megohm
                minimum
              </li>
              <li>
                <strong>Earth electrode (TT):</strong> AC earth electrode tester — RA x Idn not
                greater than 50V
              </li>
              <li>
                <strong>Loop impedance (Zs):</strong> Live at 230V — Not greater than tabulated
                maximum
              </li>
              <li>
                <strong>RCD (30mA):</strong> Live at 230V — ≤300ms at IΔn (BS 7671:2018+A4:2026 Reg
                643.3 — single AC test, all RCD Types)
              </li>
            </ul>
            <p>
              <strong>Ring final circuit testing — three-step ring test confirms continuity and
              identifies interconnections:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Measure end-to-end resistance of line conductors (r1)
              </li>
              <li>
                <strong>Step 2:</strong> Measure end-to-end resistance of cpc conductors (r2)
              </li>
              <li>
                <strong>Step 3:</strong> Cross-connect L1 to L2 and cpc1 to cpc2, measure at each
                socket
              </li>
              <li>
                Readings at each socket should be substantially equal and approximately (r1+r2)/4
              </li>
            </ul>
            <p>
              <strong>Building services note:</strong> Large installations require systematic
              testing by distribution board, with clear marking of tested circuits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Certification and Documentation">
            <p>
              Proper certification is a legal requirement under BS 7671 and the Building
              Regulations. The type of certificate depends on the nature of the work undertaken.
            </p>
            <p>
              <strong>Electrical Installation Certificate (EIC):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New installations</li>
              <li>Additions to existing installations</li>
              <li>Alterations to existing installations</li>
              <li>Three schedules: design, construction, inspection</li>
              <li>Must include test results schedule</li>
            </ul>
            <p>
              <strong>EICR (Condition Report):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Periodic inspection of existing installations</li>
              <li>Reports condition, not compliance</li>
              <li>Classification codes (C1, C2, C3, FI)</li>
              <li>Recommends next inspection interval</li>
              <li>Limitations of inspection recorded</li>
            </ul>
            <p>
              <strong>EIC schedule requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Schedule 1 - Design:</strong> Signed by Designer — Confirms design complies
                with BS 7671
              </li>
              <li>
                <strong>Schedule 2 - Construction:</strong> Signed by Constructor/Installer —
                Confirms work constructed to design and BS 7671
              </li>
              <li>
                <strong>Schedule 3 - Inspection:</strong> Signed by Inspector — Confirms inspected
                and tested, complies with BS 7671
              </li>
              <li>
                <strong>Test Results Schedule:</strong> Signed by Tester — Individual circuit test
                values
              </li>
            </ul>
            <p>
              <strong>Building services certification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Large installations:</strong> Multiple EICs may be issued for phased
                completion
              </li>
              <li>
                <strong>Part P notification:</strong> Required for notifiable domestic work
              </li>
              <li>
                <strong>Building control:</strong> EIC forms part of completion evidence
              </li>
              <li>
                <strong>O&M manuals:</strong> Include copies of all certification
              </li>
            </ul>
            <p>
              <strong>Professional duty:</strong> Certification is a declaration of compliance. Sign
              only work you are responsible for and have verified.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Switchgear Commissioning and Energisation">
            <p>
              LV switchgear commissioning requires systematic verification of protection settings,
              mechanical operation and control circuits. Energisation procedures must ensure safety
              and allow fault identification.
            </p>
            <p>
              <strong>Pre-energisation checks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Visual inspection complete</li>
              <li>Busbar torque settings verified</li>
              <li>Insulation resistance tested</li>
              <li>Protection relay settings confirmed</li>
              <li>CT/VT polarity checked</li>
              <li>Mechanical interlocks tested</li>
              <li>Earthing connections secure</li>
            </ul>
            <p>
              <strong>Functional testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circuit breaker operation (manual)</li>
              <li>Protection relay trip testing</li>
              <li>Indication and metering circuits</li>
              <li>Remote control operation</li>
              <li>Auto-changeover systems</li>
              <li>Alarm and fault indication</li>
              <li>Key interlock systems</li>
            </ul>
            <p>
              <strong>Safe energisation procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preparation:</strong> Confirm all dead tests complete, area secured,
                personnel briefed
              </li>
              <li>
                <strong>DNO liaison:</strong> Confirm supply availability, agree energisation time
              </li>
              <li>
                <strong>Initial energisation:</strong> Energise incomer only, verify voltage and
                phase rotation
              </li>
              <li>
                <strong>Sectional energisation:</strong> Close outgoing circuits systematically,
                verify loads
              </li>
              <li>
                <strong>Load proving:</strong> Gradually apply load, monitor for abnormal conditions
              </li>
              <li>
                <strong>Live testing:</strong> Complete Zs, PSCC and RCD tests as circuits are
                energised
              </li>
            </ul>
            <p>
              <strong>Protection coordination verification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main incomer:</strong> PSCC within device rating, coordination with DNO fuse
              </li>
              <li>
                <strong>Submain protection:</strong> Discrimination with upstream, let-through
                energy
              </li>
              <li>
                <strong>Distribution board MCBs:</strong> Correct type and rating for cable/load
              </li>
              <li>
                <strong>Final circuit devices:</strong> Zs within limits, RCD protection where
                required
              </li>
            </ul>
            <p>
              <strong>Energisation safety precautions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All personnel clear of switchgear during energisation</li>
              <li>Appropriate PPE worn (arc flash rated where required)</li>
              <li>Rescue equipment and trained first aider available</li>
              <li>Communications established with control room/DNO</li>
              <li>Permit to work system in place for HV systems</li>
            </ul>
            <p>
              <strong>Real-world example:</strong> A new commercial office block with 1000A main
              switchboard requires phased energisation - main incomer first, then floor distribution
              boards sequentially, with load proving at each stage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Insulation resistance testing:</strong> A distribution board with
              12 circuits requires insulation resistance testing. Three circuits have electronic
              dimmers.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Isolate supply to distribution board</li>
              <li>Step 2: Disconnect electronic dimmers from L and N</li>
              <li>Step 3: Link all L and N conductors together at DB</li>
              <li>Step 4: Test between linked L-N and Earth</li>
              <li>Reading: 85 megohms</li>
              <li>
                <strong>Result:</strong> Pass (minimum 1.0 megohm required)
              </li>
              <li>Reconnect dimmers after testing complete</li>
            </ul>
            <p>
              <strong>Example 2 — Loop impedance verification:</strong> Verify a socket circuit
              protected by 32A Type B MCB meets disconnection requirements.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From BS 7671:2018+A4:2026 Table 41.3:</li>
              <li>Maximum Zs for 32A Type B = 1.37 ohms (Cmin = 0.95 applied)</li>
              <li>Applying 0.8 correction for ambient testing:</li>
              <li>Field test maximum = 1.37 × 0.8 = 1.10 ohms</li>
              <li>Measured Zs at furthest socket: 0.92 ohms</li>
              <li>
                <strong>Result:</strong> Pass (0.92 &lt; 1.10 ohms)
              </li>
            </ul>
            <p>
              <strong>Example 3 — RCD testing requirements:</strong> A 30mA RCD protecting socket
              circuits requires full commissioning tests.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required tests for 30mA Type A RCD:</li>
              <li>
                <strong>1. Test at rated residual current (30mA):</strong> Maximum trip time: 300ms
                — Measured: 28ms
              </li>
              <li>
                <strong>2. Test at 5× rated current (150mA):</strong> Maximum trip time: 40ms —
                Measured: 12ms
              </li>
              <li>
                <strong>3. Test button operation:</strong> Trips correctly
              </li>
              <li>Record all values on test results schedule</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Commissioning checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all visual inspection items before testing</li>
              <li>Follow mandatory test sequence - dead tests first</li>
              <li>Disconnect sensitive equipment before insulation testing</li>
              <li>Record all test values accurately</li>
              <li>Compare measured values with calculated/design values</li>
              <li>Complete certification before handover</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Minimum insulation resistance: <strong>1.0 megohm</strong> at 500V DC
              </li>
              <li>
                30mA RCD at IΔn (BS 7671:2018+A4:2026 Reg 643.3, single AC test):{' '}
                <strong>≤300ms</strong> maximum
              </li>
              <li>
                Temperature correction factor: <strong>0.8</strong> (Zs field testing)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Testing out of sequence</strong> — live testing before dead tests verified
                </li>
                <li>
                  <strong>Damaging equipment</strong> — insulation testing with electronics
                  connected
                </li>
                <li>
                  <strong>Incorrect Zs comparison</strong> — using tabulated values without 0.8
                  factor
                </li>
                <li>
                  <strong>Incomplete certification</strong> — missing schedules or signatures
                </li>
              </ul>
            }
            doInstead="Always run dead tests first, disconnect electronics before insulation testing, apply the 0.8 correction factor when comparing field-measured Zs to tabulated maxima, and complete all three EIC schedules with test results schedule attached."
          />

          <SectionRule />

          <Scenario
            title="Switchboard energisation without proper procedure"
            situation={
              <>
                A new 1600A LV switchboard is to be energised. The DNO transformer is live to the cable head. The electrical sub turns up on a Saturday with no method statement, no isolation procedure documented, no witness, and no schedule of test results. They energise the board cold; the upstream protection trips on a fault on a connected sub-main. The investigation is delayed because there are no contemporaneous records.
              </>
            }
            whatToDo={
              <>
                Stop. Energisation of LV switchgear is a high-risk activity requiring a documented procedure: confirm IR test passed and recorded, polarity verified, all downstream circuits isolated, witness present, energisation sequence (transformer secondary → busbar → outgoing breakers in turn), test under no-load then progressive load. Document each step. Re-brief the team on energisation discipline as an EAWR Reg 4 / BS 7671 requirement.
              </>
            }
            whyItMatters={
              <>
                Energisation is the moment when years of installation become live. Defects buried in cable, switchgear or terminations become safety hazards when energised. Discipline at this stage protects life, equipment and project — and creates the audit trail that supports the EIC.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Electrical commissioning = BS 7671 verification + functional + integration testing.",
              "BS 7671 Part 6 sequence: inspect, test, certify.",
              "Energisation procedure documented: lock-off, witness, progressive, load test.",
              "Functional testing of controls, lighting, BMS interfaces, fire isolations.",
              "Documentation: EIC + Schedule of Inspections + Schedule of Test Results = legal record.",
              "Test instruments calibrated UKAS-traceable; calibration certificates retained.",
              "Reg 644.1 makes EIC issue mandatory — issuing without verification is a regulatory breach.",
              "Hand over the EIC, schedules and test instruments calibration with the O&M.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Mechanical commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section5_2;
