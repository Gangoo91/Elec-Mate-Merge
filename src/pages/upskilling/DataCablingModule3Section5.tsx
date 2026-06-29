import { ArrowLeft, ChevronRight } from 'lucide-react';
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m3s5-tier1-vs-tier2',
    question:
      'A specification calls for "Tier 1 + Tier 2 commissioning, bidirectional, dual-wavelength". What two test instruments must the contractor bring on site?',
    options: [
      'A multimeter and an insulation-resistance tester (megger).',
      'An OLTS for Tier 1 insertion loss and an OTDR for Tier 2 characterisation.',
      'A fibre microscope only, used for endface inspection of every connector.',
      'A continuity tester only, used to confirm the fibre is unbroken end-to-end.',
    ],
    correctIndex: 1,
    explanation:
      'Tier 1 = OLTS / LSPM (Light Source + Power Meter): calibrated injection at one end, calibrated measurement at the other, the difference is certified channel insertion loss. Tier 2 = OTDR: per-event characterisation. Both are required by most modern fibre commissioning specifications — Tier 1 for the warranty pass / fail, Tier 2 for the diagnostic baseline. Bidirectional + dual-wavelength is the gold-standard discipline; both instruments support it. Launch / tail cords are also required (different lengths for OLTS reference vs OTDR dead-zone displacement).',
  },
  {
    id: 'datacabling-m3s5-reference-method',
    question:
      'What does "one-cord, two-cord or three-cord reference method" mean for an OLTS test, and why does it matter?',
    options: [
      'It refers to how the launch and tail cords are physically bundled together.',
      'It sets how the OLTS is referenced, which decides which end connectors are included.',
      'It is an image-capture setting on the fibre microscope / video probe.',
      'It refers to the number of fibre cores tested in a single sweep.',
    ],
    correctIndex: 1,
    explanation:
      'The reference method controls which connectors are included in the OLTS measurement. Method 1 (one-cord reference) is the most stringent — it includes the connector pair at each end of the link. Method 2 / Method 3 (two-cord / three-cord) progressively exclude end connectors. The standards (IEC 61280-4-1 / TIA-526-14 for MM, IEC 61280-4-2 / TIA-526-7 for SM) specify which method applies to which test scenario. The same physical link will measure DIFFERENTLY under different reference methods — the certification document MUST state which method was used.',
  },
  {
    id: 'datacabling-m3s5-encircled-flux',
    question: 'For multimode OLTS testing, why is the "encircled flux" launch condition specified?',
    options: [
      'It is a marketing requirement with no effect on the measured loss.',
      'It standardises the modal launch profile so MM measurements are repeatable across instruments.',
      'It only applies to single-mode fibre, never to multimode.',
      'It is just another name for the channel reference configuration.',
    ],
    correctIndex: 1,
    explanation:
      'Multimode launch conditions affect the measurement. Over-filled launches (LED-style) populate all modes including high-order modes that are quickly stripped by macrobends and connectors — producing pessimistic readings. Under-filled launches (laser-style without controlled modal launch) produce optimistic readings. Encircled flux is the standardised modal launch profile that sits between the two — repeatable across instruments and laboratories, and the basis for all modern modal-launch-controlled OLTS measurements. Modern field test instruments either include EF-compliant launches or come with EF-mandrels that wrap the launch cord to filter modes.',
  },
  {
    id: 'datacabling-m3s5-warranty-trigger',
    question:
      'A manufacturer\u2019s warranty for a structured fibre cabling system requires what testing evidence at commissioning?',
    options: [
      'A simple continuity test confirming light reaches the far end.',
      'A full package: Tier 1 OLTS, Tier 2 OTDR, endface inspection and documented as-built records.',
      'A dated photo of the patch panel and labelling for the project file.',
      'Only a power-on test showing the active link carries traffic.',
    ],
    correctIndex: 1,
    explanation:
      'Manufacturer cabling-system warranties (15-25 year typical for major brands) require a documented commissioning package: Tier 1 OLTS, Tier 2 OTDR, endface inspection per IEC 61300-3-35, as-built records per BS EN 50174-1 / TIA-606-D, conformance to the manufacturer\u2019s installation guidelines, and (often) certification by a manufacturer-trained installer. Skipping documentation is the most common reason warranty claims fail — the cable was fine, the install was fine, but the records do not exist.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the practical difference between Tier 1 and Tier 2 fibre testing?',
    options: [
      'Tier 1 OLTS is the certified end-to-end insertion-loss pass / fail; Tier 2 OTDR is per-event characterisation.',
      'Tier 1 is simply a faster version of the Tier 2 test, using the same OTDR instrument.',
      'Tier 1 is used for outdoor (external) fibre and Tier 2 for indoor (in-building) fibre.',
      'Tier 2 is entirely optional and is never required for any manufacturer warranty.',
    ],
    correctAnswer: 0,
    explanation:
      'Tier 1 = OLTS = certified channel insertion loss vs the calculated budget. Tier 2 = OTDR = per-event characterisation. Both are typically required at commissioning of a permanent fibre system. Tier 1 is the formal pass / fail; Tier 2 is the loss-profile baseline used for future fault-finding and any service upgrade re-verification. The manufacturer warranty typically requires both.',
  },
  {
    id: 2,
    question:
      'What does "reference method" mean in OLTS testing, and why does the standard specify three methods?',
    options: [
      'It is simply a calibration setting that has no effect on the measured loss value.',
      'It refers to the speed at which the OLTS test sweeps through the link.',
      'It sets how the OLTS is referenced against the cords, deciding which end connectors are measured.',
      'It refers to which of the two test wavelengths is used as the primary reference.',
    ],
    correctAnswer: 2,
    explanation:
      'The reference method is part of the OLTS test specification — IEC 61280-4-1 (multimode) and IEC 61280-4-2 (single-mode) define Methods 1, 2 and 3, with TIA-526-14 (MM) and TIA-526-7 (SM) being the equivalent North American specifications. The choice of method affects WHICH connector pairs are included in the measured loss. The certification document must always state the method used so the result is reproducible and defensible.',
  },
  {
    id: 3,
    question:
      'For multimode OLTS testing, what is the role of the "encircled flux" launch condition?',
    options: [
      'Encircled flux applies only to single-mode fibre, never to multimode.',
      'Encircled flux is a connector polish grade, like UPC or APC.',
      'Encircled flux is a fibre core size, distinguishing 50 µm from 62.5 µm cores.',
      'It is the standardised modal launch profile that makes MM loss measurements repeatable.',
    ],
    correctAnswer: 3,
    explanation:
      'Multimode launch matters. An over-filled launch populates high-order modes that are stripped by bends; an under-filled launch under-populates them. Either gives a different measured loss to a controlled launch. Encircled flux is the standardised launch profile defined by ratio thresholds at specific radii from the fibre axis. Modern instruments either include EF-compliant launches or use mandrel-wrap of the launch cord (typically 5 turns around a 25 mm or 50 mm mandrel for 50/125 µm) to strip high-order modes and approximate EF.',
  },
  {
    id: 4,
    question:
      'What does "permanent link" vs "channel" mean for fibre testing, and which is typically the warranty-tested entity?',
    options: [
      'For fibre the two terms describe exactly the same tested entity.',
      'Permanent link is the installed cable (no patches); channel adds the patch leads and is port-to-port. Warranty is usually against the permanent link.',
      'Channel testing is simply the cheaper of the two test set-ups.',
      'Permanent link is a copper-only concept and does not apply to fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Permanent link / fixed link = the installed cable (no patch leads). Channel = active port to active port (with patch leads). The same physical fibre cabling can be tested either way; the test set-up and the budget are different. Manufacturer warranties typically apply to the installed permanent link — the contractor\u2019s installed asset — so the warranty test is permanent-link Tier 1 OLTS against the permanent-link budget. Many projects also test the channel for service-readiness verification.',
  },
  {
    id: 5,
    question:
      'A specification calls for testing at 1310 nm and 1550 nm. Why both, and what does each catch?',
    options: [
      'They are the two SM windows; bends attenuate 1550 nm far more, so dual testing catches bend loss.',
      'It is done purely for completeness; one wavelength would give the same compliance result.',
      'Only multimode fibre requires testing at the two wavelengths; single-mode needs just one.',
      'BS 7671 explicitly mandates testing single-mode fibre at both 1310 nm and 1550 nm.',
    ],
    correctAnswer: 0,
    explanation:
      'Dual-wavelength testing is mandatory for defensible certification because macrobends are wavelength-dependent. A link tested only at 1310 may pass; the same link at 1550 may fail. Modern services increasingly use 1550 (DWDM, long-haul, RF over fibre) or both wavelengths, so a 1310-only certification could approve a link that fails in service at 1550. Both wavelengths together = defensible result.',
  },
  {
    id: 6,
    question: 'What is the role of IEC 61300-3-35 in fibre certification?',
    options: [
      'It governs fibre attenuation limits in dB/km for each grade of fibre.',
      'It is a connector body (housing) mechanical specification for SC and LC connectors.',
      'It is the visual acceptance standard for connector endfaces — inspection zones and defect pass / fail.',
      'It is a copper twisted-pair cabling test standard, not a fibre standard.',
    ],
    correctAnswer: 2,
    explanation:
      'IEC 61300-3-35 is the visual-acceptance standard for connector endfaces. It is what makes "this connector is clean enough" a defensible measurement rather than an opinion. Modern field test sets capture endface images and apply 61300-3-35 automatically. The certification deliverable typically includes a per-connector pass / fail report alongside the OLTS / OTDR data.',
  },
  {
    id: 7,
    question:
      'What documentation does a manufacturer typically require to honour a 15-25 year cabling-system warranty?',
    options: [
      'A dated photograph of the completed building exterior.',
      'A full commissioning package: Tier 1 OLTS, Tier 2 OTDR, endface inspection, as-built records and installer conformance.',
      'Only the OLTS insertion-loss test results for each channel.',
      'A signed acceptance letter from the client confirming handover.',
    ],
    correctAnswer: 1,
    explanation:
      'Cabling-system warranties (15-25 years from major manufacturers) are warranty against the system performing to specified Class / OM grade for the warranty period — provided the documentation proves the install was done correctly. The required package is typically OLTS + OTDR + endface inspection + as-built records + manufacturer-installer certification. Missing documentation is the most common warranty-claim failure mode.',
  },
  {
    id: 8,
    question:
      'A small contractor delivers an OLTS test report only — no OTDR, no endface inspection. What is the warranty / certification consequence?',
    options: [
      'No consequence — provided the cable works, the OLTS report is sufficient on its own.',
      'Only the OTDR test is actually required; the OLTS test the contractor supplied is redundant.',
      'There is no certification standard for fibre, so any single test report is acceptable.',
      'An OLTS-only report typically fails the warranty conditions; the manufacturer warranty is not earned.',
    ],
    correctAnswer: 3,
    explanation:
      'Documentation IS the warranty trigger. An OLTS-only test report meets some specifications but does not meet typical commercial cabling-system warranty conditions. The risk runs both ways — client loses warranty cover, contractor is exposed for any future failure. The professional discipline is the full commissioning package: Tier 1 + Tier 2 + endface inspection + as-built records + (where required) manufacturer-installer certification.',
  },
  {
    id: 9,
    question:
      'Why must the certification record always state the OLTS reference method (1, 2 or 3)?',
    options: [
      'Because the same link measures differently under each method, so the loss number is ambiguous without it.',
      'Purely for administrative neatness; the method has no effect on the measured value.',
      'Because BS 7671 explicitly requires the OLTS reference method to be stated on the certificate.',
      'Because the standards bodies hold copyright over the method names and require attribution.',
    ],
    correctAnswer: 0,
    explanation:
      'The certification number is meaningless without the reference method. IEC 61280-4-1 / -4-2 and the TIA equivalents define Methods 1, 2 and 3. The same link will measure differently under each. The certification document must always state the method used so the test is reproducible and defensible. Modern field test instruments record the method automatically in the test report.',
  },
  {
    id: 10,
    question:
      'Why is it considered good practice to perform a bidirectional OLTS test rather than just from end A to end B?',
    options: [
      'Bidirectional testing is required by law and a single-direction test is unlawful.',
      'Bidirectional testing is simply faster than testing once from end A to end B.',
      'Measuring from each end catches asymmetric install faults a single direction would miss.',
      'Single-direction testing is acceptable for single-mode fibre but never for multimode.',
    ],
    correctAnswer: 2,
    explanation:
      'Bidirectional testing is the certification gold standard. Some installation faults appear asymmetrically — direction-dependent connector cleanliness issues, modal-launch asymmetries on MM, splicer artefacts. A single-direction test could pass a marginal link; bidirectional catches the asymmetry. Modern field test sets perform bidirectional OLTS automatically and report the worst-case (or average per spec) result.',
  },
];

const faqs = [
  {
    question: 'What is included in a typical fibre commissioning package?',
    answer: (
      <>
        A complete commissioning package for a fibre installation typically contains: Tier 1 OLTS /
        LSPM bidirectional dual-wavelength insertion-loss test results for every channel against the
        calculated budget; Tier 2 OTDR bidirectional dual-wavelength traces for every channel; IEC
        61300-3-35 endface inspection records for every connector; as-built records per BS EN
        50174-1 / TIA-606-D (cable labels, port identifiers, panel layouts, splice tray layouts,
        drawings); contractor declaration of installation conformance to the manufacturer\u2019s
        installation guidelines; and (where required) a manufacturer-trained installer certification
        statement. The package is presented to the client and forms part of the commercial sign-off.
      </>
    ),
  },
  {
    question: 'How long should certification documents be retained?',
    answer: (
      <>
        For the design life of the cabling — typically 15-25 years. The documents are the
        warranty-claim evidence and the future-fault-finding baseline. Modern projects archive
        digitally (PDF reports + native test-set files) to the cabling administration system, with
        backups on secure cloud storage. Hard-copy archive is appropriate for small projects but
        rapidly becomes unmanageable at scale. The administration discipline (BS EN 50174-1 §6 /
        TIA-606-D) covers the labelling and identifier scheme that ties test reports to physical
        cables.
      </>
    ),
  },
  {
    question: 'Does BS 7671:2018+A4:2026 require fibre testing or certification?',
    answer: (
      <>
        BS 7671 does not directly require fibre cabling performance testing — that lives in BS EN
        50174-1 / -2 (cabling installation), BS EN 50346 (testing of installed cabling) and the IEC
        61280 series (fibre test methods). BS 7671 §444.4.9 (verbatim — "Where different buildings
        have separate equipotential bonding systems, metal-free optical fibre cables or other
        non-conducting systems are preferred for signal and data transmission") prefers metal-free
        fibre between buildings, and §521.10.202 (verbatim — fire-collapse support rules) applies to
        fibre containment. The cabling performance certification, including Tier 1 / Tier 2 testing,
        sits in the cabling-installation standards layer rather than in BS 7671.
      </>
    ),
  },
  {
    question: 'What\u2019s the difference between channel testing and permanent-link testing?',
    answer: (
      <>
        Permanent link testing measures the installed cable run only — connector at each end of the
        field cable, no patch leads. Channel testing measures from active equipment port to active
        equipment port — adds the patch leads. The same fibre run will measure differently on each
        because the patch-lead connectors and cord lengths add loss in the channel measurement.
        Manufacturer warranties typically apply to the permanent link (the installed asset), so the
        warranty certification is generally permanent-link Tier 1. Many specifications also test the
        channel for service-readiness.
      </>
    ),
  },
  {
    question: 'My OLTS test passes but my OTDR shows a connector at 0.7 dB. Is the link OK?',
    answer: (
      <>
        Possibly — but investigate. A 0.7 dB connector pair is at the high end of the typical range
        (~0.2-0.5 dB) and suggests contamination or marginal polish. The OLTS pass against the
        budget shows the LINK works overall, but the OTDR is flagging that one connector as a future
        risk. Best practice: inspect that connector with a fibre microscope per IEC 61300-3-35,
        clean if it does not pass, re-test. The OTDR characterisation is exactly the diagnostic
        baseline that lets you catch this kind of issue at commissioning rather than when the
        transceiver power drifts in three years.
      </>
    ),
  },
  {
    question:
      'A client asks for "BSI / UKAS calibration evidence" for the test set. What does that mean?',
    answer: (
      <>
        Test instruments that produce certified measurements must themselves be calibrated and
        traceable to national standards. UKAS (United Kingdom Accreditation Service) accredits
        calibration laboratories that operate to ISO/IEC 17025; their calibration certificates are
        accepted internationally. Field test sets typically need annual recalibration — OLTS / OTDR
        / fibre microscope all included. The calibration certificate is part of the commissioning
        documentation package; without it, the measurement is not formally traceable. Most
        manufacturer warranties require evidence of in-calibration test instruments at
        commissioning.
      </>
    ),
  },
];

const DataCablingModule3Section5 = () => {
  const navigate = useNavigate();

  useSEO(
    'Fibre Testing and Certification | Data Cabling Module 3.5 | Elec-Mate',
    'Fibre certification practice — Tier 1 OLTS vs Tier 2 OTDR, reference methods 1 / 2 / 3, encircled-flux multimode launch, bidirectional dual-wavelength testing, permanent link vs channel, IEC 61300-3-35 endface inspection records, and the manufacturer-warranty documentation package.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5"
            title="Fibre Testing and Certification"
            description="The certification framework — Tier 1 OLTS for end-to-end insertion-loss certification, Tier 2 OTDR for per-event characterisation, reference Methods 1 / 2 / 3, encircled-flux multimode launch, bidirectional dual-wavelength testing, permanent link vs channel definitions, and the IEC 61300-3-35 endface-inspection records that round out the manufacturer-warranty package."
            tone="yellow"
          />

          <TLDR
            points={[
              'Tier 1 (OLTS / LSPM) is the certified end-to-end insertion-loss test — calibrated source + meter, the formal warranty pass / fail. Tier 2 (OTDR) is the per-event characterisation test — diagnostic baseline. Both at commissioning, both bidirectional, both dual-wavelength. The certification record must state both.',
              'Reference Methods 1 (one-cord), 2 (two-cord) and 3 (three-cord) — defined in IEC 61280-4-1 (MM) and -4-2 (SM) — control which connector pairs are included in the OLTS measurement. The same link measures differently under different methods. The certification document MUST state which method was used.',
              'Multimode launch matters. Encircled flux (EF) is the standardised modal launch profile per IEC 61280-4-1 / TIA-526-14-C; without EF (or mandrel-wrap equivalent) the same link gives different measurements with different instruments. EF is mandatory for repeatable MM certification.',
              'Manufacturer 15-25 year warranties require a complete commissioning package: Tier 1 + Tier 2 + IEC 61300-3-35 endface inspection + BS EN 50174-1 / TIA-606-D as-built records + (often) manufacturer-trained-installer certification. Missing documentation is the most common warranty-claim failure.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Tier 1 OLTS / LSPM testing from Tier 2 OTDR testing and explain the role of each in a commissioning package',
              'Apply the OLTS reference methods (1 / 2 / 3) per IEC 61280-4-1 / -4-2 and TIA-526 series, and state the method used in every certification document',
              'Apply the encircled-flux launch condition for multimode OLTS testing — built-in EF source or mandrel-wrap equivalent — and explain why it is required for repeatability',
              'Distinguish permanent-link testing from channel testing and identify which is the typical manufacturer-warranty-tested entity',
              'Perform bidirectional dual-wavelength testing (1310 + 1550 SM, 850 + 1300 MM) and explain why each axis is required for defensible certification',
              'Compile a complete fibre commissioning package — Tier 1 + Tier 2 + IEC 61300-3-35 endface inspection + BS EN 50174-1 / TIA-606-D as-built records — and present it to the client',
              'Identify the manufacturer-warranty triggers and explain why missing documentation typically voids a 15-25 year warranty regardless of physical install quality',
              'Maintain test-instrument calibration discipline (UKAS / ISO 17025 traceability, annual recalibration) and include calibration evidence in the certification deliverable',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Tier 1 OLTS — the certified insertion-loss test</ContentEyebrow>

          <ConceptBlock
            title="Calibrated injection at one end, calibrated measurement at the other"
            plainEnglish="Tier 1 testing uses an OLTS (Optical Loss Test Set), also called an LSPM (Light Source + Power Meter). A calibrated optical source is connected at one end of the link; a calibrated optical power meter is connected at the other end. The difference between the launched power and the received power is the channel insertion loss. This is the certified, warranty-pass / fail measurement of a fibre link."
            onSite="Tier 1 testing is the formal commissioning step for any permanent fibre installation. Setup: connect launch / tail cords matched to fibre type and polish; reference the OLTS through the cords (Method 1 / 2 / 3 per the project specification); insert the link to be tested; record the measurement. Repeat from the other end (bidirectional). Repeat at the second wavelength (1310 + 1550 SM, 850 + 1300 MM). Compare each measurement against the calculated channel budget."
          >
            <p>The Tier 1 process, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Calibrate / reference.</strong> Connect the calibration cords as specified
                by the reference method (1, 2 or 3 per IEC 61280-4-1 / -4-2). Set the meter to zero
                (set reference) at each wavelength.
              </li>
              <li>
                <strong>Insert the link.</strong> Disconnect from the reference configuration,
                insert the link to be tested between the launch and tail cords, reconnect.
              </li>
              <li>
                <strong>Measure.</strong> Read the meter at each wavelength. Record the value.
              </li>
              <li>
                <strong>Reverse direction.</strong> Swap source and meter to the opposite end,
                re-reference, re-measure. The two readings should be similar; the certification
                value is typically the worst-case or the average per the project spec.
              </li>
              <li>
                <strong>Compare to budget.</strong> Check each direction at each wavelength against
                the calculated link budget. All four results must be inside budget for a pass.
              </li>
            </ul>
            <p>
              The OLTS reading is the defensible certification number. It is calibrated (UKAS / ISO
              17025 traceability), reproducible (reference method stated), repeatable (bidirectional
              + dual-wavelength + EF launch for MM), and documented (per-channel pass / fail vs the
              budget). This is what the client receives at handover and what the warranty
              manufacturer requires.
            </p>
          </ConceptBlock>

          {/* OLTS test setup diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Tier 1 OLTS test setup — bidirectional dual-wavelength reference method
            </h4>
            <svg
              viewBox="0 0 900 540"
              className="w-full h-auto"
              role="img"
              aria-label="A Tier 1 OLTS test arrangement laid out left to right. From left to right: light source, launch cord, the link under test, tail cord, power meter. Each element sits in its own cell with its name above and its role below. A second row indicates the bidirectional swap. A legend at the bottom records the reference method, encircled-flux launch for multimode, dual-wavelength discipline and calibration requirements."
            >
              {/* ===== Component-name row (above) ===== */}
              <text
                x="90"
                y="34"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SOURCE
              </text>
              <text
                x="240"
                y="34"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAUNCH CORD
              </text>
              <text
                x="450"
                y="34"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LINK UNDER TEST
              </text>
              <text
                x="660"
                y="34"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TAIL CORD
              </text>
              <text
                x="810"
                y="34"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                METER
              </text>

              {/* ===== Element row (y = 60 to 140) — clear vertical zone, no labels overlap ===== */}
              {/* Source */}
              <rect
                x="40"
                y="60"
                width="100"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="90"
                y="96"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                λ source
              </text>
              <text
                x="90"
                y="114"
                textAnchor="middle"
                fill="#FAF5FF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                1310 / 1550 SM
              </text>
              <text
                x="90"
                y="128"
                textAnchor="middle"
                fill="#FAF5FF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                850 / 1300 MM
              </text>

              {/* Launch cord */}
              <rect
                x="170"
                y="92"
                width="140"
                height="16"
                rx="4"
                fill="rgba(252,211,77,0.30)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* Link under test (highlight) */}
              <rect
                x="340"
                y="60"
                width="220"
                height="80"
                rx="10"
                fill="rgba(234,179,8,0.16)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="450"
                y="96"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PERMANENT LINK
              </text>
              <text
                x="450"
                y="114"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                field cable + connectors at each end
              </text>
              <text
                x="450"
                y="130"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                measured against budget
              </text>

              {/* Tail cord */}
              <rect
                x="590"
                y="92"
                width="140"
                height="16"
                rx="4"
                fill="rgba(252,211,77,0.30)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />

              {/* Meter */}
              <rect
                x="760"
                y="60"
                width="100"
                height="80"
                rx="10"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="810"
                y="96"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                power meter
              </text>
              <text
                x="810"
                y="114"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                calibrated
              </text>
              <text
                x="810"
                y="128"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                reads dB or dBm
              </text>

              {/* ===== Role row (BELOW element row) ===== */}
              <text
                x="90"
                y="166"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                light injector
              </text>
              <text
                x="240"
                y="166"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                reference cord (mandrel for MM)
              </text>
              <text
                x="450"
                y="166"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                field cable plus end connectors
              </text>
              <text
                x="660"
                y="166"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                reference cord
              </text>
              <text
                x="810"
                y="166"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10"
                fontFamily="system-ui"
              >
                light receiver
              </text>

              {/* ===== Direction row (further below, dedicated zone) ===== */}
              <rect
                x="40"
                y="200"
                width="820"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.30)"
                strokeWidth="1.4"
              />
              <text
                x="60"
                y="222"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                DIRECTION 1
              </text>
              <text x="180" y="222" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                source on the left → meter on the right
              </text>
              <text
                x="60"
                y="248"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                DIRECTION 2
              </text>
              <text x="180" y="248" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                swap ends — source on the right → meter on the left
              </text>

              {/* ===== Legend / footer band ===== */}
              <rect
                x="40"
                y="280"
                width="820"
                height="240"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="60"
                y="306"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                METHOD · LAUNCH · WAVELENGTH · CALIBRATION
              </text>

              <text
                x="60"
                y="332"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                METHOD
              </text>
              <text x="160" y="332" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Reference Method 1 / 2 / 3 per IEC 61280-4-1 (MM) or -4-2 (SM)
              </text>
              <text x="160" y="348" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                state which method on the certificate
              </text>

              <text
                x="60"
                y="376"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                EF (MM)
              </text>
              <text x="160" y="376" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Encircled-flux launch — EF-compliant source or mandrel-wrap of launch cord
              </text>
              <text x="160" y="392" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                SM has no modal-launch ambiguity
              </text>

              <text
                x="60"
                y="420"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                DIR
              </text>
              <text x="160" y="420" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Bidirectional — measure both ways, report worst-case or average per spec
              </text>

              <text
                x="60"
                y="448"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                λ
              </text>
              <text x="160" y="448" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Dual-wavelength — 1310 + 1550 nm SM · 850 + 1300 nm MM
              </text>

              <text
                x="60"
                y="476"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CAL
              </text>
              <text x="160" y="476" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                UKAS / ISO 17025 traceable instrument calibration — annual recalibration
              </text>

              <line
                x1="60"
                y1="492"
                x2="840"
                y2="492"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="510"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Tier 1 OLTS = certification pass / fail · Tier 2 OTDR = characterisation / fault
                location
              </text>
            </svg>
          </div>

          <RegsCallout
            source="IEC 61280-4-1 (multimode) / IEC 61280-4-2 (single-mode) — paraphrased"
            clause={
              <>
                Insertion-loss measurements of installed multimode (or single-mode) optical fibre
                cabling shall be performed using a Light Source and Power Meter (LSPM) test method,
                with reference cords appropriate to the chosen reference method (Method 1, 2 or 3).
                Multimode tests shall be performed under encircled-flux launch conditions (built-in
                EF or mandrel-wrap equivalent). Tests shall be performed at the wavelengths
                appropriate to the cabling type and intended applications. The reference method,
                launch condition, instrument identification, calibration date and test results shall
                be recorded.
              </>
            }
            meaning="The fibre OLTS / LSPM test discipline is fully specified in IEC 61280-4-1 (MM) and -4-2 (SM), with the TIA equivalents (TIA-526-14, TIA-526-7) covering the same ground in North American practice. Reference method, encircled-flux launch, dual-wavelength, calibrated-instrument traceability, and documented results are all specified. The certification document must capture all of these to be defensible."
            cite="Paraphrased from IEC 61280-4-1 and IEC 61280-4-2 — refer to the printed standard for the verbatim clause text"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Multimode launch — encircled flux</ContentEyebrow>

          <ConceptBlock
            title="The standardised modal launch profile that makes MM measurements repeatable"
            plainEnglish="Multimode fibre supports many propagation modes. The way light is launched into the fibre — over-filled (LED-style, populates all modes including high-order ones), under-filled (laser-style without controlled modal launch), or controlled to encircled-flux specification — changes how those modes are populated. High-order modes are stripped quickly by macrobends and connectors, while low-order modes propagate. So the SAME physical link will measure differently depending on launch profile. Encircled flux is the standardised modal launch profile that makes MM measurements repeatable across instruments, days and operators."
            onSite="Modern field test instruments either include EF-compliant launches built in, or come with a mandrel-wrap technique: wrap the launch cord 5 times around a 25 mm or 50 mm-diameter mandrel before the link, which strips high-order modes and approximates EF. The mandrel size depends on fibre core size (50 µm or 62.5 µm) and cord jacket type. Modern OLTS field test sets handle this automatically — but the technician must still understand that MM is launch-sensitive and that EF is the certification baseline."
          >
            <p>The launch options, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Over-filled launch (OFL).</strong> Legacy LED-based source that populates
                all modes, including high-order modes that quickly leak out. Pessimistic readings.
                Mostly obsolete for OLTS.
              </li>
              <li>
                <strong>Under-filled launch (UFL).</strong> Laser-style source without controlled
                modal launch — populates only low-order modes. Optimistic readings. Not suitable for
                defensible certification.
              </li>
              <li>
                <strong>Encircled flux (EF).</strong> Standardised modal launch profile per IEC
                61280-4-1 / TIA-526-14-C — defined by ratio thresholds at specific radii from the
                fibre axis. Repeatable, reproducible, the certification baseline.
              </li>
              <li>
                <strong>Mandrel-wrap.</strong> Field practice equivalent to EF — wrap the launch
                cord around a specified-diameter mandrel for a specified number of turns to strip
                high-order modes. Cheap, instrument-agnostic, gives EF-equivalent results.
              </li>
            </ul>
            <p>
              EF compliance applies to multimode only. Single-mode fibre supports only one
              propagation mode by construction, so there is no modal-launch ambiguity to resolve.
              The discipline for SM is bidirectional + dual-wavelength + reference method —
              modal-launch profile is not in scope.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Permanent link vs channel · the warranty package</ContentEyebrow>

          <ConceptBlock
            title="What gets warrantied, what gets tested, and how the documentation comes together"
            plainEnglish='Permanent link (sometimes "fixed link") = the installed cable from one termination to the other, including connectors at each end of the field cable but EXCLUDING patch leads. Channel = active equipment port to active equipment port, INCLUDING patch leads at each end. Manufacturer cabling-system warranties typically apply to the permanent link — the contractor\u2019s installed asset — so the warranty test is permanent-link Tier 1 OLTS against the permanent-link budget. Many specifications also require channel testing for service-readiness verification.'
            onSite="The commissioning package brings together everything required for the manufacturer warranty: Tier 1 OLTS results bidirectional dual-wavelength against the calculated permanent-link budget; Tier 2 OTDR characterisation; IEC 61300-3-35 endface inspection records for every connector; BS EN 50174-1 / TIA-606-D as-built records (labelling, drawings, identifiers, splice tray layouts); contractor declaration of installation conformance to the manufacturer\u2019s install guidelines; manufacturer-trained installer certification statement; and instrument-calibration evidence (UKAS / ISO 17025 traceability). Any missing piece typically voids the warranty."
          >
            <p>The standard certification deliverable, item by item:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Tier 1 OLTS test reports.</strong> Per channel, bidirectional, dual-
                wavelength, against the calculated permanent-link budget. Reference method stated.
                Pass / fail per channel per wavelength per direction.
              </li>
              <li>
                <strong>Tier 2 OTDR traces.</strong> Per channel, bidirectional, dual-wavelength.
                Per-event loss tabulated. End-to-end loss per direction. Used as the
                characterisation baseline for future fault-finding.
              </li>
              <li>
                <strong>IEC 61300-3-35 endface inspection records.</strong> Per connector. Pass /
                fail with image evidence per the standard\u2019s zone / defect criteria.
              </li>
              <li>
                <strong>As-built records.</strong> Per BS EN 50174-1 §6 / TIA-606-D. Cable labels,
                port identifiers, panel layouts, splice tray layouts, drawings, administration
                records — typically held in a cabling administration system.
              </li>
              <li>
                <strong>Contractor declaration of conformance.</strong> A signed statement that the
                installation has followed the manufacturer\u2019s guidelines. Some manufacturers
                require manufacturer-trained-installer certification (e.g. CommScope SP, Panduit
                CIP).
              </li>
              <li>
                <strong>Calibration evidence.</strong> UKAS / ISO 17025 calibration certificates for
                OLTS, OTDR, fibre microscope. Annual recalibration is the typical cadence.
              </li>
            </ul>
            <p>
              The warranty is the COMMERCIAL value of doing the documentation well. A 15-25 year
              cabling-system warranty against a Class EA / OM4 / OS2 specification is what the
              client buys when they accept a slightly more expensive structured-cabling tender.
              Missing documentation is the most common reason warranty claims fail — the install was
              correct, the cable performs, but the records are not there to prove it.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Manufacturer 15-25 year cabling-system warranty — typical evidence requirements"
            source="Composite of major-manufacturer warranty programmes (CommScope, Panduit, Corning, Excel)"
            headers={['Evidence', 'Standard', 'Frequency / scope']}
            rows={[
              [
                'Tier 1 OLTS test (bidirectional, dual-wavelength)',
                'IEC 61280-4-1 / -4-2',
                'Every channel, both wavelengths, both directions',
              ],
              [
                'Tier 2 OTDR characterisation',
                'IEC 61280-4-3 / -4-4',
                'Every channel, both wavelengths, both directions',
              ],
              ['Connector endface inspection', 'IEC 61300-3-35', 'Every connector pre-mate'],
              [
                'As-built records (labels, drawings, IDs)',
                'BS EN 50174-1 §6 / TIA-606-D',
                'Every cable, port, panel, splice tray',
              ],
              [
                'Conformance declaration',
                'Manufacturer guidelines',
                'Signed by responsible installer',
              ],
              [
                'Manufacturer-trained-installer cert',
                'Manufacturer specific',
                'Where required by the warranty programme',
              ],
              [
                'Instrument calibration evidence',
                'UKAS / ISO 17025',
                'Annual recalibration, valid at commissioning',
              ],
            ]}
            notes="Warranty conditions vary by manufacturer; always check the specific warranty programme requirements at tender time. Missing or incomplete documentation is the most common warranty-claim failure mode."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Delivering only an OLTS report at handover and assuming the warranty is earned"
            whatHappens={
              <>
                Contractor delivers a single OLTS test report to the client at handover. No OTDR. No
                IEC 61300-3-35 endface inspection. No as-built drawings. No instrument calibration
                evidence. The client signs off on the strength of the OLTS pass. Two years later, a
                service issue is reported on a single channel; the client raises a manufacturer
                warranty claim. The manufacturer rejects the claim because the commissioning
                evidence is incomplete. The cost of the channel re-pull falls on the client; the
                contractor is exposed if the original install is found wanting.
              </>
            }
            doInstead={
              <>
                Deliver the complete commissioning package at handover, every time: Tier 1 OLTS +
                Tier 2 OTDR + IEC 61300-3-35 endface inspection + BS EN 50174-1 / TIA-606-D as-built
                records + conformance declaration + (where required) manufacturer- trained-installer
                certification + calibration evidence. Treat the documentation as the COMMERCIAL
                deliverable, not the after-thought. The warranty is what the client paid for — earn
                it.
              </>
            }
          />

          <Scenario
            title="Commissioning a 96-channel office fit-out to manufacturer 25-year warranty"
            situation={
              <>
                A new commercial office fit-out: 96 Cat6A horizontal channels on copper, 24 fibre
                channels on OM4 multimode for the floor uplinks, all going to a single
                manufacturer\u2019s cabling system with a 25-year warranty. You are the install
                contractor. The client expects a complete handover package at practical completion.
              </>
            }
            whatToDo={
              <>
                For the fibre side: run Tier 1 OLTS bidirectional at 850 + 1300 nm against the
                calculated permanent-link budget for each channel, with EF launch (instrument or
                mandrel-wrap), Method 1 reference. Run Tier 2 OTDR bidirectional at both wavelengths
                with appropriate launch / tail cords. Inspect every connector with a fibre
                microscope per IEC 61300-3-35; clean and re-inspect any failures; document pass /
                fail per connector with image evidence. Compile the as-built record per BS EN
                50174-1 §6 / TIA-606-D — every fibre labelled, every port identified, every
                splice-tray layout drawn. Sign the conformance declaration. Provide the instrument
                calibration certificates. For the copper side, run the equivalent permanent-link
                Class EA tests per the appropriate standard. Compile everything into a single
                commissioning package and present at handover. Confirm the manufacturer warranty
                registration is filed.
              </>
            }
            whyItMatters={
              <>
                The 25-year warranty is the commercial value the client paid for in the structured-
                cabling specification. A complete commissioning package earns the warranty; an
                incomplete one does not. The cost of the documentation discipline is small (a few
                technician-days in a project of months) and the value is enormous. Skipping it is
                false economy — the cable performs the same either way; the difference is whether
                anyone can prove it in 2030 when a service issue arises.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Tier 1 OLTS = certified end-to-end insertion-loss test (warranty pass / fail). Tier 2 OTDR = per-event characterisation (diagnostic baseline). Both, both directions, both wavelengths.',
              'Reference Methods 1 / 2 / 3 (IEC 61280-4-1 / -4-2) control which connectors are included in the OLTS measurement. STATE the method in every certification document.',
              'Multimode launch matters. Encircled flux (or mandrel-wrap equivalent) is mandatory for repeatable MM certification. Single-mode has no equivalent — by construction one mode propagates.',
              'Permanent link = installed cable, no patches. Channel = active port to active port, includes patches. Manufacturer warranty is typically against the permanent link.',
              'Manufacturer 15-25 year warranties require a complete commissioning package: Tier 1 + Tier 2 + IEC 61300-3-35 + BS EN 50174-1 / TIA-606-D records + conformance + calibration. Documentation IS the warranty trigger.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Loss budgets and OTDR
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-6')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Fault finding, handover and maintenance
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section5;
