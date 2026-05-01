import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    id: 'patm2-s3-double',
    question: 'Class II "double insulation" comprises which two layers?',
    options: [
      'Two layers of the same insulation.',
      'BASIC insulation (the working insulation around the live conductors, the same as is used in any general construction) PLUS a separate, independent SUPPLEMENTARY insulation between the basic insulation and the accessible conductive parts. The two layers are independent, so a single mechanical or thermal failure does not pierce both.',
      'A metal layer and a plastic layer.',
      'Insulation and a CPC.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61140 §6.3 defines double insulation as basic + supplementary, two independent layers. The independence is the key — a single failure event cannot defeat both. "Reinforced insulation" is an alternative single-layer engineered design that provides equivalent protection.',
  },
  {
    id: 'patm2-s3-IRpoint',
    question: 'Where is the test probe applied for the Class II IR test?',
    options: [
      'On the earth pin of the plug.',
      'On any accessible conductive part of the equipment itself — the casing, a metal handle insert, a metal trim, conductive parts that the user can touch. There is no earth pin to use because Class II equipment has no protective conductor by design. The accessible part IS the test point.',
      'On both the earth pin and the live pin.',
      'Inside the equipment.',
    ],
    correctIndex: 1,
    explanation:
      'The Class II IR test methodology is fundamentally different from Class I. The earth pin is not the test point because there is no protective conductor. The accessible conductive parts of the equipment are the test point. The probe is held physically against the casing or handle while the test runs.',
  },
  {
    id: 'patm2-s3-acceptance',
    question: 'IET CoP §15.5 acceptance for Class II IR is...?',
    options: [
      '≥ 1 MΩ (same as Class I).',
      '≥ 2 MΩ — TIGHTER than Class I, because in Class II the insulation IS the protection. There is no CPC backup if insulation fails. The tighter acceptance reflects the higher integrity expected of the load-bearing protective measure.',
      '≥ 0.5 MΩ.',
      '≥ 10 MΩ.',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP §15.5 sets a higher minimum IR for Class II than Class I. The reasoning: Class II depends entirely on insulation integrity; there is no protective conductor as a second line of defence. Failed insulation in Class I has the CPC as backup; failed insulation in Class II is failed protection.',
  },
  {
    id: 'patm2-s3-allparts',
    question:
      'For a Class II appliance with multiple accessible conductive parts (metal trim, metal handle insert, metal sole plate), what does the IET CoP IR test require?',
    options: [
      'Test the largest one.',
      'Test EACH accessible conductive part separately. The probe is moved from part to part. Each is its own IR reading. Acceptance is met only if ALL readings meet ≥ 2 MΩ. A single low reading on any one part means insulation has failed at that location, even if other parts pass.',
      'Test just the casing.',
      'Average the readings.',
    ],
    correctIndex: 1,
    explanation:
      'The test verifies insulation integrity at every point a user can touch. Each accessible conductive part is a separate test point. Recording a single reading from the casing while ignoring the handle would miss insulation breakdown localised to the handle area.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the protective architecture of Class II equipment per BS EN 61140?',
    options: [
      'Basic insulation + CPC.',
      'Double insulation (basic + supplementary, two independent layers) OR reinforced insulation (a single engineered layer giving equivalent protection). NO protective conductor by design — the insulation alone is the protection. Failure of one insulation layer is not catastrophic because the second layer remains intact.',
      'SELV supply.',
      'No insulation.',
    ],
    correctAnswer: 1,
    explanation:
      'Class II uses double or reinforced insulation as the sole protective measure. No CPC; no automatic disconnection on earth fault (because there is no earth path in the equipment). The insulation IS the protection.',
  },
  {
    id: 2,
    question:
      'Why is the IET CoP acceptance value for Class II IR (≥ 2 MΩ) tighter than for Class I (≥ 1 MΩ)?',
    options: [
      'Convention.',
      'Because in Class II, the insulation IS the protection — there is no CPC + protective device combination as a second line of defence if insulation fails. The acceptance value reflects the higher integrity expected of a load-bearing protective measure. In Class I, a degraded insulation can still be safe because the CPC + protective device contains the resulting fault.',
      'Different test current.',
      'Different test voltage.',
    ],
    correctAnswer: 1,
    explanation:
      'The acceptance values reflect the consequence of failure. Class II has no second line; failed insulation = failed protection. Class I has the CPC as second line; degraded insulation can be tolerated longer because the CPC contains the fault. The IR acceptance values are calibrated to those different failure sensitivities.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT a typical Class II construction feature?',
    options: [
      'Plastic external casing.',
      'No CPC connection at the supply terminals.',
      'Double-square symbol on the rating plate.',
      'A metal casing connected to the earth pin of the plug.',
    ],
    correctAnswer: 3,
    explanation:
      'A metal casing connected to the earth pin is the Class I construction. Class II equipment has either non-conductive enclosures throughout, or metal enclosures that are insulated from internal live parts by both basic AND supplementary insulation. The hallmark of Class II is the absence of a protective conductor, not the presence of plastic.',
  },
  {
    id: 4,
    question:
      'A drill is marked Class II (double-square symbol) but has a 3-pin BS 1363 plug on its supply lead. What is the correct interpretation?',
    options: [
      'The marking is wrong — it is Class I.',
      'The 3-pin plug is required to operate UK socket-outlet shutters (BS 1363 design). The third pin may or may not be electrically connected internally — sometimes it terminates to internal earth for filtering / EMC, sometimes it is unconnected. The class symbol on the rating plate takes precedence: Class II testing applies. The IEC lead, if detachable, is a separate item and is tested as a Class I lead in its own right.',
      'It is Class I despite the symbol.',
      'Apply both Class I and Class II tests.',
    ],
    correctAnswer: 1,
    explanation:
      'The 3-pin plug on a Class II appliance is a UK convention for operating socket shutters, not a class indicator. The class is determined by the construction (double / reinforced insulation, no protective bonding of accessible parts in the safety sense). Test as Class II.',
  },
  {
    id: 5,
    question: 'Why is PE-continuity testing INAPPROPRIATE on genuinely Class II equipment?',
    options: [
      'It is dangerous.',
      'There is no protective conductor to test. Class II equipment has no CPC by design — the protective measure is double / reinforced insulation. Applying PE-continuity gives a meaningless result (typically open-circuit or some artefact), and recording it as a "fail" is wrong because the equipment was never designed to provide a CPC.',
      'It is too slow.',
      'It uses too much current.',
    ],
    correctAnswer: 1,
    explanation:
      'PE-continuity tests the CPC. Class II has no CPC. The test does not apply. Modern PAT testers in "Class II" mode skip the PE-continuity step automatically. Applying Class I tests to Class II equipment is a methodology error that produces no useful information.',
  },
  {
    id: 6,
    question:
      'A Class II appliance has a plastic casing — entirely non-conductive externally. How is the IR test conducted?',
    options: [
      'Skip the test.',
      'For an entirely non-conductive accessible enclosure, the IR test typically uses a test probe applied to the metal trim, the conductive plug pins (with the appliance switched OFF), or a substitute method (touch-current / leakage at operating voltage). The IET CoP §15 provides for these alternatives where the standard live-to-accessible-part method is impractical.',
      'Apply the probe to the air.',
      'Apply both Class I and Class II methods.',
    ],
    correctAnswer: 1,
    explanation:
      'Genuinely all-plastic Class II construction without any conductive accessible parts is rare on professional equipment but does occur. The IET CoP provides for alternative methods — typically substitute leakage or touch current — to verify protective insulation integrity in those cases.',
  },
  {
    id: 7,
    question:
      'A Class II hair drier shows the double-square symbol on the rating plate but has an internal metal heating element shroud, an internal metal shaft for the fan motor, and an external plastic casing with a small metal screen. The PE-continuity test from the earth pin reads "open". What is happening?',
    options: [
      'Failure.',
      'Working as designed. Class II equipment has no CPC connecting the earth pin to internal or external metal parts. The "open" reading is the EXPECTED result; the inspector should not be running the test. The test should switch to Class II mode: IR test from live conductors to the external metal screen (an accessible conductive part).',
      'Apply Class I tests.',
      'Reject the equipment.',
    ],
    correctAnswer: 1,
    explanation:
      'Inappropriate test method, not equipment failure. The Class II architecture explicitly does not provide a protective conductor; an "open" PE-continuity reading is what the architecture produces. The correct test is the Class II IR — probe on the external accessible metal screen.',
  },
  {
    id: 8,
    question:
      'IET CoP §15 also references "substitute leakage" or "touch current" tests for Class II equipment. When are these used?',
    options: [
      'Always instead of IR.',
      'As alternatives or supplements to the Class II IR test, particularly when (a) the equipment has electronic components that bias an IR reading downward, (b) the construction is largely non-conductive making a probe placement difficult, or (c) the equipment-specific guidance directs the alternative method. The substitute leakage method applies operating voltage and measures the leakage current through the accessible parts; touch-current does similar with a body-impedance simulator.',
      'For Class I only.',
      'They are obsolete.',
    ],
    correctAnswer: 1,
    explanation:
      'The IR test is the headline Class II verification, but is not always practical. Substitute leakage and touch-current tests are the IET CoP-sanctioned alternatives — the same protective measure (insulation integrity) verified through different test methods.',
  },
  {
    id: 9,
    question: 'What does the BS EN 61140 double-square symbol look like, and where is it placed?',
    options: [
      'A square inside another square, on the rating plate.',
      "Two concentric squares — a smaller square nested inside a larger one — placed on the rating plate or on the equipment in a clearly visible position. Mandated by BS EN 61140 / BS EN 60335 for Class II equipment. The symbol is the inspector's primary visual cue to apply Class II test methods.",
      'A single square.',
      'A circle inside a square.',
    ],
    correctAnswer: 1,
    explanation:
      'The double-square (square within a square) is one of the most distinctive and widely-used safety symbols in electrical equipment. Recognising it triggers the Class II test sequence; missing it triggers Class I testing on what may be Class II equipment, which is a methodology error.',
  },
  {
    id: 10,
    question: 'What is the MOST critical failure mode of Class II equipment that PAT must catch?',
    options: [
      'Power supply failure.',
      'Insulation breakdown — particularly through moisture absorption in the insulation, mechanical damage to the supplementary insulation layer, thermal stress reducing dielectric strength, or contamination of the insulation surface. Because Class II has no CPC backup, an insulation failure leaves the equipment with no protective measure. The IR test is the primary detection mechanism; substitute leakage / touch current are alternatives where IR is impractical.',
      'Switch failure.',
      'Cosmetic damage.',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation integrity is the load-bearing element of Class II protection. Once it goes, there is nothing else. The IR test (and its alternatives) is the load-bearing PAT test for Class II equipment, just as PE-continuity is for Class I.',
  },
];

const PATTestingModule2Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Class II — double insulation principles | PAT Module 2.3 | Elec-Mate',
    description:
      'BS EN 61140 Class II: double or reinforced insulation as the sole protective measure. The two-layer architecture, why no CPC, the IET CoP §15.5 IR test (≥ 2 MΩ tighter than Class I), and the methodology errors to avoid.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3"
            title="Class II — double insulation principles"
            description="BS EN 61140 Class II: two independent layers of insulation, no protective conductor, no CPC. The insulation alone is the protection — and it is verified by an IR test with a tighter acceptance than Class I, because there is no second line of defence."
            tone="yellow"
          />

          <TLDR
            points={[
              'Class II = double insulation (basic + supplementary, two independent layers) OR reinforced insulation (a single engineered layer giving equivalent protection). NO protective conductor by design.',
              'The insulation IS the protection. There is no CPC backup; no automatic disconnection on earth fault (no earth path in the equipment).',
              'Marked with the BS EN 61140 double-square symbol (a square within a square) on the rating plate.',
              'IET CoP §15.5 IR test acceptance: ≥ 2 MΩ at 500 V dc — TIGHTER than Class I (≥ 1 MΩ), because there is no protective conductor as second line of defence.',
              'Test probe is applied to ANY accessible conductive part of the equipment — the casing, a metal handle insert, conductive trim. NOT on the earth pin (there is no protective CPC).',
              'PE-continuity test does NOT apply. The equipment has no protective conductor; the test gives a meaningless result.',
              'Substitute leakage and touch-current tests are IET CoP-sanctioned alternatives where IR is impractical (electronic components in series, all-plastic accessible enclosure).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the Class II protective architecture: double insulation (basic + supplementary) or reinforced insulation, and explain why no protective conductor is provided',
              'Recognise the BS EN 61140 double-square Class II marking and use it to drive the test sequence',
              'Apply the IET CoP §15.5 Class II IR test method: probe on accessible conductive part, 500 V dc, acceptance ≥ 2 MΩ',
              'Explain why the Class II IR acceptance is tighter than Class I, by reference to the absence of a CPC second-line of defence',
              'Identify why PE-continuity testing does NOT apply to genuine Class II equipment, and resolve the "Class II with 3-pin plug" pattern correctly',
              'Apply substitute leakage and touch-current tests as IET CoP-sanctioned alternatives to the IR test where construction makes IR impractical',
              'Diagnose insulation defects (moisture absorption, mechanical damage, thermal stress) as the dominant Class II failure mode',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>How Class II protection works</ContentEyebrow>

          <ConceptBlock
            title="Two independent layers of insulation"
            plainEnglish="Class II protection rests on two independent layers of insulation between live conductors and any accessible conductive part. The first layer is BASIC insulation — the same insulation level used in any general construction, which prevents normal-condition contact with live parts. The second layer is SUPPLEMENTARY insulation — a separate insulation layer that protects against fault conditions if the basic insulation fails. The two layers are independent: a single mechanical, thermal, or chemical event cannot fail both simultaneously. The user is protected by the redundancy of the insulation, not by a separate earth path."
            onSite="When testing Class II equipment, think of the insulation as the load-bearing element. The IR test measures it; any reading materially below the acceptance value is the protective measure failing."
          >
            <p>The two architectures BS EN 61140 recognises:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Double insulation</strong> — two physically separate layers of insulation
                between live conductors and accessible parts. Basic + supplementary. Each layer is
                independently capable of providing the protective function. Failure of one layer
                (e.g. mechanical pinhole in the supplementary layer) does not defeat the other.
              </li>
              <li>
                <strong>Reinforced insulation</strong> — a single insulation layer engineered to
                give protection equivalent to double insulation. Achieved through thicker material,
                higher dielectric strength, or specific construction (e.g. multi-layer bonded
                films). Used where two physical layers are impractical (small electronics, thin
                profile equipment).
              </li>
            </ul>
            <p>
              Both architectures are equally Class II from the inspector\'s point of view. The
              double-square symbol applies to either; the test methodology is the same. The
              construction difference matters at design and manufacturing stages.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61140:2016 · Clause 6.3 (Class II equipment)"
            clause={
              <>
                For Class II equipment, the protection against electric shock relies on the
                application of double or reinforced insulation. There is no provision for the
                connection of accessible conductive parts to a protective conductor. The user is
                protected by the insulation alone.
              </>
            }
            meaning="Two phrases earn close reading. 'Double or reinforced insulation' — both architectures qualify as Class II. 'No provision for the connection of accessible conductive parts to a protective conductor' — there is no CPC by design, and applying tests that assume there is one is a methodology error."
          />

          <ConceptBlock
            title="Why Class II has no CPC"
            plainEnglish="A protective conductor exists to provide a path for fault current when basic insulation fails. In Class II construction, the SUPPLEMENTARY insulation layer (or the reinforced insulation) prevents fault current ever reaching accessible parts. There is no fault current to drain to earth, so there is nothing for a CPC to do. Adding one would not improve protection; it would just create a redundant component."
          >
            <p>The architectural reasoning:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Class I needs a CPC because basic insulation alone cannot be relied on (single point
                of failure). The CPC + protective device combination contains the consequence of
                insulation failure.
              </li>
              <li>
                Class II avoids the single-point-of-failure problem differently — by adding a second
                independent insulation layer. The need for a CPC + disconnection architecture is
                eliminated by the redundancy in the protective measure itself.
              </li>
              <li>
                Equipment can be Class II AND have an internal "functional earth" for filtering /
                EMC purposes. This conductor is NOT a protective conductor in the BS EN 61140 sense;
                it does not bond accessible parts to earth for fault protection. It exists for noise
                / interference reasons only.
              </li>
            </ul>
            <p>
              The test methodology must respect the architecture. Class II equipment is tested for
              insulation integrity (the IR test); it is NOT tested for CPC integrity (no CPC
              exists). Applying Class I tests to Class II equipment is a methodology error.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Class II diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Class II — double insulation cross-section
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Cross-section of a Class II appliance showing four concentric layers: live conductors L+N at the centre, basic insulation around them, supplementary insulation around that, then the accessible enclosure that the user touches. No protective conductor is provided. The double-square Class II symbol is shown to the right."
            >
              {/* Probe label — clear of viewBox left edge with proper padding */}
              <g>
                <text
                  x="100"
                  y="200"
                  textAnchor="end"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  IR test probe
                </text>
                <text x="100" y="216" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  500 V DC
                </text>
                <text x="100" y="230" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  ≥ 2 MΩ acceptance
                </text>
                {/* Probe arrow */}
                <line x1="115" y1="208" x2="178" y2="208" stroke="#FBBF24" strokeWidth="2" />
                <polygon points="178,208 170,204 170,212" fill="#FBBF24" />
              </g>

              {/* Outer Class II appliance frame */}
              <rect
                x="180"
                y="60"
                width="500"
                height="320"
                rx="14"
                fill="rgba(168,85,247,0.05)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              <text
                x="430"
                y="86"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="13"
                fontWeight="bold"
              >
                CLASS II APPLIANCE
              </text>
              <text x="430" y="102" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="10">
                cross-section through casing
              </text>

              {/* Layer 4 — Accessible enclosure (outermost) */}
              <rect
                x="208"
                y="120"
                width="444"
                height="200"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.6"
              />
              <text x="218" y="138" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="bold">
                4 · Accessible enclosure
              </text>
              <text x="218" y="151" fill="rgba(255,255,255,0.5)" fontSize="9">
                (what the user touches)
              </text>

              {/* Layer 3 — Supplementary insulation */}
              <rect
                x="240"
                y="166"
                width="380"
                height="138"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="6,3"
              />
              <text x="252" y="184" fill="#22D3EE" fontSize="10" fontWeight="bold">
                3 · Supplementary insulation
              </text>
              <text x="252" y="197" fill="rgba(255,255,255,0.55)" fontSize="9">
                (second independent layer)
              </text>

              {/* Layer 2 — Basic insulation */}
              <rect
                x="276"
                y="212"
                width="308"
                height="78"
                rx="6"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
                strokeDasharray="5,3"
              />
              <text x="288" y="230" fill="#FBBF24" fontSize="10" fontWeight="bold">
                2 · Basic insulation
              </text>
              <text x="288" y="243" fill="rgba(255,255,255,0.55)" fontSize="9">
                (working insulation)
              </text>

              {/* Layer 1 — Live conductors L + N (innermost) */}
              <rect
                x="332"
                y="258"
                width="196"
                height="22"
                rx="4"
                fill="rgba(239,68,68,0.15)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <circle cx="356" cy="269" r="4" fill="#EF4444" />
              <text x="370" y="273" fill="#EF4444" fontSize="10" fontWeight="bold">
                L
              </text>
              <circle cx="492" cy="269" r="4" fill="#3B82F6" />
              <text x="478" y="273" textAnchor="end" fill="#3B82F6" fontSize="10" fontWeight="bold">
                N
              </text>
              <text
                x="430"
                y="273"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
              >
                1 · Live conductors
              </text>

              {/* Class II marking — double square symbol */}
              <g>
                <rect
                  x="708"
                  y="166"
                  width="84"
                  height="84"
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="2.5"
                />
                <rect
                  x="720"
                  y="178"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="2.5"
                />
                <text
                  x="750"
                  y="270"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Class II mark
                </text>
                <text
                  x="750"
                  y="284"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  (rating plate)
                </text>
              </g>

              {/* No-CPC warning strip — separated from the appliance frame */}
              <rect
                x="180"
                y="396"
                width="500"
                height="36"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="430"
                y="411"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                ✗ No protective conductor
              </text>
              <text x="430" y="425" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Two independent layers replace the CPC + ADS architecture of Class I
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The Class II IR test — IET CoP §15.5</ContentEyebrow>

          <ConceptBlock
            title="Test method"
            plainEnglish="The Class II IR test verifies that the insulation between live conductors and accessible conductive parts is intact and of high resistance. The PAT instrument applies 500 V dc between the line and neutral conductors (commoned together) and a TEST PROBE held against an accessible conductive part of the equipment. The reading is the insulation resistance in megohms. Acceptance per IET CoP §15.5 is ≥ 2 MΩ — tighter than the Class I value because there is no second line of defence."
          >
            <p>The test sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual prerequisite.</strong> Confirm the equipment is Class II
                (double-square marking, construction matches Class II principles, no protective
                conductor provided).
              </li>
              <li>
                <strong>Plug into the PAT instrument.</strong> Switch the equipment ON so any series
                switches in the supply path are closed.
              </li>
              <li>
                <strong>Probe placement.</strong> Hold the test probe firmly against an accessible
                conductive part — typically the metal trim, a metal handle insert, the metal screen
                of an enclosure, or any conductive part the user can touch.
              </li>
              <li>
                <strong>Run the test.</strong> The instrument applies 500 V dc and measures the
                resistance between live conductors and the probe.
              </li>
              <li>
                <strong>Read result.</strong> Acceptance ≥ 2 MΩ. Significantly higher readings (tens
                or hundreds of MΩ) are typical and indicate strong insulation. Readings close to or
                below 2 MΩ indicate insulation degradation.
              </li>
              <li>
                <strong>Multiple parts.</strong> Walk the probe to every accessible conductive part.
                Each is its own test point. The recorded reading for the equipment is the worst
                (lowest) of the per-part readings.
              </li>
              <li>
                <strong>Functional / load test.</strong> Verify operation as intended.
              </li>
            </ol>
            <p>
              The IR test is fast and decisive. A strong pass (tens of MΩ) confirms intact
              insulation. A reading near or below acceptance indicates insulation degradation —
              moisture absorption, mechanical damage, contamination, age. The defect is invisible to
              user check and to formal visual; only the IR test catches it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §15.5 (Insulation resistance, Class II)"
            clause={
              <>
                For Class II equipment, the insulation resistance shall be measured at 500 V dc
                between the live conductors (line and neutral commoned) and any accessible
                conductive part of the equipment, with the test probe applied to the accessible
                conductive part. The minimum acceptable value is 2 MΩ.
              </>
            }
            meaning="The 2 MΩ acceptance is tighter than Class I (1 MΩ) because Class II has no protective conductor as second line of defence. The test probe is held against the accessible part — that is the user-facing surface whose insulation from live conductors must be verified."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Substitute leakage and touch current — alternatives</ContentEyebrow>

          <ConceptBlock
            title="When the IR test is impractical"
            plainEnglish="The 500 V dc IR test is the headline method for Class II. But some equipment makes it impractical. Examples: equipment with electronic components (surge devices, varistors, EMI filters) in series with the protective insulation path that bias the IR reading downward; entirely non-conductive accessible enclosures with no metal trim or insert; equipment-specific guidance from the manufacturer indicating an alternative method. The IET CoP §15 provides for substitute leakage and touch-current tests as alternatives."
          >
            <p>The alternative methods:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Substitute leakage test.</strong> The PAT instrument applies a voltage close
                to operating voltage (typically 40-50 V ac, scaled internally) to the appliance and
                measures the leakage current that would flow under operating conditions. The result
                is reported in mA. Acceptance per IET CoP §15.6 — typically &le; 0.25 mA for general
                equipment, with tighter values for some categories.
              </li>
              <li>
                <strong>Touch-current test.</strong> A more elaborate version where the appliance is
                energised at full operating voltage and the current that would flow through a user
                touching the accessible part (simulated via a body-impedance network) is measured.
                Reflects real-world conditions more closely. Acceptance values per IET CoP and
                equipment-specific standards.
              </li>
              <li>
                <strong>PE leakage test.</strong> For equipment with a "functional earth" path,
                measures the current flowing through that path during operation. Useful for
                detecting insulation degradation that produces increased leakage but is not severe
                enough to fail the IR test.
              </li>
            </ul>
            <p>
              Modern multifunction PAT testers offer all three alternatives in addition to IR. The
              instrument manual will direct which to use for which equipment category. The
              underlying principle remains: verify the protective insulation is providing adequate
              protection.
            </p>
          </ConceptBlock>

          <Scenario
            title="The all-plastic Class II hand drier"
            situation="A wall-mounted hand drier has an entirely plastic external casing — no metal trim, no metal screen, no accessible conductive parts at all. The unit shows the Class II double-square symbol. The inspector connects the PAT instrument and prepares to apply the IR probe to an accessible conductive part — and finds none."
            whatToDo="Apply the substitute leakage or touch-current test as the IET CoP §15.6 alternative. The instrument applies operating-voltage equivalent to the equipment and measures the leakage current that would flow if a user were touching the accessible enclosure. Acceptance per the instrument-specific guidance and IET CoP. The principle is unchanged — verify the insulation integrity — but the implementation adapts to the construction. Document the test method used (e.g. 'IET CoP §15.6 substitute leakage') alongside the reading."
            whyItMatters="All-plastic Class II construction is increasingly common in modern equipment. The IR test assumption of an accessible conductive probe point does not always hold. The IET CoP-sanctioned alternatives ensure the protective measure is verified regardless of construction. An inspector who skips the test because there is 'nowhere to put the probe' has not understood the alternatives and has not verified the safety case."
          />

          <CommonMistake
            title="Recording a single IR reading and ignoring multiple accessible parts"
            whatHappens="A Class II steam iron has multiple accessible conductive parts: a metal sole-plate, a metal handle insert, a metal water-tank cap. The inspector probes only the sole-plate, reads 50 MΩ, records pass. The handle insert has actually become contaminated with moisture and reads 0.8 MΩ — a fail. The fail is invisible because the inspector did not test that part. Months later, an internal fault produces a low-leakage path through the handle. The user receives a sustained, low-current shock through the handle."
            doInstead="Walk the probe to every accessible conductive part. Each is a separate test point. The recorded reading for the equipment is the WORST (lowest) reading. A strong reading on the sole-plate does not redeem a weak reading on the handle. The IET CoP §15.5 expects every accessible conductive part to meet ≥ 2 MΩ."
          />

          <CommonMistake
            title="Confusing functional earth with protective earth on Class II equipment"
            whatHappens="A Class II IT equipment item has a 3-pin BS 1363 plug whose earth pin terminates to internal 'earth' inside the equipment (an EMC chassis bond). The inspector treats this as a Class I CPC and runs the PE-continuity test. The reading is, say, 5 Ω — a Class I fail. The inspector records 'Class I PE-continuity fail' and removes the equipment from service. In fact, the equipment is genuinely Class II and the chassis bond is functional earth (for noise filtering), not a protective conductor. The protective measure is the double insulation, which is intact."
            doInstead="Read the class symbol first. Class II = double-square = no protective conductor for safety purposes. The 3-pin plug is a UK convention for socket-shutter operation. Apply Class II tests — IR or substitute leakage — not PE-continuity. The chassis bond may give a low PE-continuity reading, but that reading is not a Class I verification because the equipment is not Class I. The class symbol is the controlling signal."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class II in service — what fails, what to check</ContentEyebrow>

          <ConceptBlock
            title="Insulation failure modes"
            plainEnglish="Class II insulation degrades through specific mechanisms. Knowing them tells you what to look for at the formal visual and what the IR test reading is signalling."
          >
            <p>The dominant Class II insulation failure modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Moisture absorption.</strong> Hygroscopic insulation materials (some
                paper-based, some polymer composites) absorb moisture from humid environments, wet
                cleaning, or condensation. The absorbed moisture creates conductive paths through
                what should be insulator. IR reading drops; substitute leakage rises. Drying the
                equipment in a controlled environment can sometimes restore IR; severe or repeated
                absorption is a permanent defect.
              </li>
              <li>
                <strong>Mechanical damage.</strong> Drops, impacts, vibration, repeated handling.
                Most concerning when it punctures the supplementary layer; the basic layer alone is
                then the only protection — the equipment has effectively reverted to Class 0
                response on insulation failure. The visual inspection looks for signs of impact; the
                IR test catches the electrical consequence.
              </li>
              <li>
                <strong>Thermal stress.</strong> Repeated heat cycling, operation above rated
                temperature, ambient heat sources. Polymer insulation degrades thermally — becomes
                brittle, crazes, loses dielectric strength. Long-term failure mode common in heating
                appliances and high-power equipment.
              </li>
              <li>
                <strong>Chemical contamination.</strong> Solvents, cleaning products, oils, dust
                with conductive content. Surface conductivity rises; IR reading drops. Cleaning the
                contamination can sometimes restore insulation; some chemicals leave permanent
                damage.
              </li>
              <li>
                <strong>Age.</strong> Cumulative effect of all of the above plus material ageing.
                Old Class II equipment trends downward in IR readings even without obvious
                stressors. The IR trend over multiple test cycles is the diagnostic.
              </li>
            </ul>
            <p>
              The four pillars of HSG107 are calibrated to catch these in different ways. User
              checks catch obvious mechanical damage. Formal visual catches less-obvious damage and
              signs of contamination / overheating. Combined inspection-and-test (IR or substitute
              leakage) catches the invisible: moisture, thermal degradation, age.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Class II = double insulation (basic + supplementary, two independent layers) OR reinforced insulation. NO CPC by design — the insulation IS the protection.',
              'Marked with the BS EN 61140 double-square symbol on the rating plate.',
              'IET CoP §15.5 IR test acceptance: ≥ 2 MΩ at 500 V dc — TIGHTER than Class I (≥ 1 MΩ). No CPC backup means the insulation must be more reliable.',
              'Test probe on ANY accessible conductive part of the equipment. Walk the probe to every accessible part; record the worst reading.',
              'PE-continuity test does NOT apply. There is no protective conductor; the test gives a meaningless result. Modern PAT testers in Class II mode skip it automatically.',
              'Substitute leakage and touch-current tests are IET CoP-sanctioned alternatives where IR is impractical (electronic components in path, all-plastic accessible enclosure).',
              'A 3-pin plug on a Class II appliance is a UK convention for socket-shutter operation; the third pin may be functional earth (filtering) but is not a protective conductor.',
              'Insulation failure modes: moisture absorption, mechanical damage, thermal stress, chemical contamination, age. The IR test catches the invisible defects user checks and formal visual cannot see.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'What is the difference between double insulation and reinforced insulation?',
                answer:
                  "Double insulation is two physically separate layers of insulation (basic + supplementary). Reinforced insulation is a single insulation layer engineered to provide protection equivalent to double insulation. From the inspector's perspective, both qualify as Class II under BS EN 61140 and are tested identically. The construction difference is design-stage; the test methodology is the same.",
              },
              {
                question:
                  'Why is the Class II IR acceptance value (≥ 2 MΩ) tighter than Class I (≥ 1 MΩ)?',
                answer:
                  'Because Class II depends entirely on insulation integrity — there is no CPC + protective device combination as a second line of defence. In Class I, basic insulation can degrade and the CPC + protective device contains the consequence; in Class II, insulation degradation IS the protection failing. The tighter acceptance reflects the higher integrity expected of the load-bearing protective measure.',
              },
              {
                question: 'My Class II laptop charger has a 3-pin plug — is it really Class II?',
                answer:
                  'Yes, if the rating plate carries the double-square symbol. The 3-pin plug is a UK convention required to operate BS 1363 socket-outlet shutters. The third pin in the plug may be terminated to internal "functional earth" inside the brick (for EMC filtering) or left unconnected — neither makes the equipment Class I. The class symbol on the rating plate takes precedence.',
              },
              {
                question: 'Can I run a PE-continuity test on Class II equipment "just to check"?',
                answer:
                  'You can, but the result is meaningless. Class II has no protective conductor by design. The PE-continuity reading will be either "open" (no connection found) or some artefact of internal functional-earth bonding (typically high resistance, not a Class I-compliant reading). Recording the result as a PAT outcome is misleading. Modern PAT testers in Class II mode skip the PE-continuity step automatically.',
              },
              {
                question: 'What if my Class II appliance has no accessible metal parts at all?',
                answer:
                  'Apply the substitute leakage or touch-current test as the IET CoP §15.6 alternative. The instrument applies operating-voltage equivalent to the appliance and measures leakage that would flow through a user touching the accessible enclosure. Acceptance per IET CoP and instrument guidance. The principle — verify insulation integrity — is unchanged; only the implementation adapts.',
              },
              {
                question: 'Should I test every accessible conductive part, or just the largest?',
                answer:
                  'Every part. Each accessible conductive part is a separate test point. Insulation defects can be localised — the casing may pass while a metal handle insert fails. The recorded reading for the equipment is the WORST (lowest) reading across all tested parts. The IET CoP §15.5 requires every accessible conductive part to meet ≥ 2 MΩ.',
              },
              {
                question: 'How does Class II equipment fail, in practice?',
                answer:
                  'Insulation breakdown. Common mechanisms: moisture absorption (humid environments, wet cleaning, condensation), mechanical damage (drops, vibration, handling), thermal stress (operation above rated temperature, repeated heat cycling), chemical contamination (cleaning solvents, oils, conductive dust), and age. The IR test catches the consequence of all of these — readings trend downward over time. The trend itself is diagnostic.',
              },
              {
                question: 'Is Class II inherently safer than Class I?',
                answer:
                  'Neither. They are different protective architectures, both fully compliant when correctly implemented. Class I depends on a working CPC and protective device disconnection — vulnerable to CPC discontinuity. Class II depends on insulation integrity — vulnerable to insulation breakdown. Each architecture has a load-bearing element; the PAT regime verifies that element.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Class II — double insulation — Module 2.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Class III — SELV
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule2Section3;
