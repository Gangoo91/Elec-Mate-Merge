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
    id: 'patm2-s4-selvdef',
    question: 'SELV (Separated Extra-Low Voltage) is defined by which set of conditions?',
    options: [
      'Voltage below 230 V.',
      'Voltage not exceeding 50 V ac (or 120 V ripple-free dc), supplied from a safety isolating transformer to BS EN 61558 (or from batteries / engine-driven generator separated from earth), AND the SELV circuit is electrically separated from earth and from any higher-voltage circuits including PELV. The three conditions — voltage limit, source type, separation — are all required.',
      'Any voltage from a transformer.',
      'Battery only, regardless of voltage.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 / BS EN 61140 define SELV by all three conditions. The voltage limit alone is not SELV (PELV has the same voltage limit but is not separated from earth). The source alone is not SELV (a 12 V output from a non-safety transformer fails the source test). All three conditions must be met.',
  },
  {
    id: 'patm2-s4-pelv',
    question: 'How does PELV (Protective Extra-Low Voltage) differ from SELV?',
    options: [
      'PELV is at higher voltage.',
      'PELV has the same voltage limits and source requirements as SELV, but is NOT separated from earth — the PELV circuit may have a deliberate connection to earth (typically for functional reasons). PELV provides protection against electric shock by extra-low voltage but is not as fully separated as SELV. PAT scope and treatment differ.',
      'PELV uses higher current.',
      'PELV is for outdoor use only.',
    ],
    correctIndex: 1,
    explanation:
      'SELV and PELV share voltage limits and source requirements but differ on earth separation. SELV is fully separated from earth; PELV may be earthed. The distinction matters because the protective architecture is different — SELV provides isolation as well as voltage limit, PELV provides only voltage limit.',
  },
  {
    id: 'patm2-s4-isolating',
    question: 'A "safety isolating transformer" must conform to which standard?',
    options: [
      'BS 7671 only.',
      'BS EN 61558 (specifically BS EN 61558-2-6 for safety isolating transformers). The standard prescribes the construction, the insulation between primary and secondary, the basic-and-supplementary insulation between live parts and accessible parts, and the overall safety case. A "transformer" that is not a BS EN 61558 safety isolating transformer cannot create a SELV circuit, regardless of its turns ratio.',
      'BS 7671 only.',
      'IET CoP only.',
    ],
    correctIndex: 1,
    explanation:
      "BS EN 61558 is the standard for the safety isolating transformer. A bell transformer or a generic mains transformer with a 12 V secondary is NOT automatically a safety isolating transformer — and a 12 V circuit it supplies is NOT automatically SELV. The transformer's standards conformance is part of the SELV verification.",
  },
  {
    id: 'patm2-s4-classiii-test',
    question: 'The IET CoP test methodology for Class III equipment is fundamentally what?',
    options: [
      'Same as Class I.',
      'Verify the SELV supply integrity (the BS EN 61558 transformer or battery source, and the separation from earth and from higher-voltage circuits) and perform a functional check on the equipment. NO IR or PE-continuity test on the SELV side in the conventional sense — the supply IS the protection, and the test focus is on verifying the supply is genuinely SELV.',
      'Same as Class II.',
      'No test at all.',
    ],
    correctIndex: 1,
    explanation:
      'Class III protection is provided by the SELV supply. The verification is therefore at the supply, not at the equipment. The transformer or charger that creates the SELV is itself Class I or Class II on the mains side and is tested under that class. The Class III equipment downstream gets a functional check.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the protective architecture of Class III equipment per BS EN 61140?',
    options: [
      'Double insulation.',
      'SELV — Separated Extra-Low Voltage. Supplied from a safety isolating transformer (BS EN 61558) or batteries, with voltage not exceeding 50 V ac or 120 V dc, AND separated from earth and from higher-voltage circuits. The supply itself is the protective measure: even direct contact with the live conductors at SELV voltage cannot deliver enough current through the body to cause electric shock injury.',
      'Basic insulation + CPC.',
      'No insulation needed.',
    ],
    correctAnswer: 1,
    explanation:
      'Class III uses SELV as the protective measure. The voltage level is the protection. The architecture is fundamentally different from Class I (CPC + disconnection) or Class II (insulation). All three conditions of SELV must be met: voltage limit, source type, and separation.',
  },
  {
    id: 2,
    question: 'The voltage limits for SELV are which of the following?',
    options: [
      '110 V ac and 230 V dc.',
      '50 V ac (rms) or 120 V dc (ripple-free) — measured between conductors and between any conductor and earth. These are the upper bounds. Most common SELV applications operate at 12 V or 24 V dc.',
      '230 V ac, no dc limit.',
      '12 V only.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 / BS EN 61140 set 50 V ac and 120 V dc as the SELV voltage limits. The figures derive from the body-impedance / current research on safe touch voltages. Common applications (door entry, low-voltage lighting, telecoms, signalling) operate at 12 V, 24 V or 48 V dc — well within the limits.',
  },
  {
    id: 3,
    question:
      'A device runs from 4 x AAA batteries at 6 V dc. It has no charger function. What is its class?',
    options: [
      'Class I.',
      'Class III. The supply is from batteries, the voltage is well below 50 V ac / 120 V dc, and the supply is electrically separated from any higher-voltage source. PAT scope on the device itself is essentially formal-visual under PUWER Reg 6 — there is no mains energy and no significant electrical danger. Where the device has a charger, the charger is tested as Class I or Class II separately.',
      'Class II.',
      'Class 0.',
    ],
    correctAnswer: 1,
    explanation:
      'Battery-only equipment satisfies the Class III architecture (SELV from batteries, separated). The PAT focus is the formal visual; the combined inspection-and-test does not apply in the conventional sense because there is no mains-side circuit to test.',
  },
  {
    id: 4,
    question:
      'A 12 V garden lighting system is supplied from a transformer. Under what condition is the 12 V circuit genuinely SELV?',
    options: [
      'Always.',
      'Only if the transformer is a BS EN 61558 safety isolating transformer (or equivalent), AND the 12 V circuit is separated from earth, AND it is separated from any higher-voltage circuit. A bell transformer or a generic mains transformer with a 12 V secondary does NOT automatically create a SELV circuit — the standards conformance and the separation are required.',
      'Only outdoors.',
      'If the cable is buried.',
    ],
    correctAnswer: 1,
    explanation:
      "The 12 V output voltage alone is not SELV. The transformer's conformance to BS EN 61558 (specifically BS EN 61558-2-6 for safety isolating transformers) and the circuit's separation from earth and from higher-voltage circuits are integral to the SELV definition.",
  },
  {
    id: 5,
    question: 'Why does the IET CoP NOT prescribe a 500 V dc IR test on Class III equipment?',
    options: [
      'It is forgotten.',
      'Because the protective measure of Class III is the SELV supply itself, not the insulation of the SELV equipment. The test focus is on verifying the supply is genuinely SELV (transformer conformance, separation), not on testing the insulation of the SELV-side equipment. Applying 500 V dc to a 12 V SELV circuit could damage the equipment without verifying the protective measure.',
      'The instrument cannot do it.',
      'It is required separately.',
    ],
    correctAnswer: 1,
    explanation:
      'The class drives the test method. Class I = CPC test. Class II = insulation test. Class III = supply test. Mis-applying the test methodology across classes is a methodology error. The IET CoP is consistent: each class has its own test approach calibrated to its protective architecture.',
  },
  {
    id: 6,
    question:
      'A door-entry system has a 24 V dc handset, supplied from a panel powered by a BS EN 61558 safety isolating transformer in the riser cupboard. What is in PAT scope?',
    options: [
      'Just the handset.',
      'The transformer (mains-side, Class I or Class II per its rating plate) — full PAT regime including PE-continuity if Class I. The 24 V dc panel and handsets — formal visual + functional check. The SELV cabling between panel and handsets — visual inspection (no IR or PE test on SELV cabling). The boundary between mains-side and SELV-side dictates the test methodology.',
      'Just the transformer.',
      'Nothing — door entry is exempt.',
    ],
    correctAnswer: 1,
    explanation:
      'The PAT scope follows the energy: mains-side gets the full regime under its class; SELV-side gets formal visual + functional check, with the supply integrity as the core verification. The transformer that creates the SELV is the focal item.',
  },
  {
    id: 7,
    question: 'How is the SELV "separation from higher-voltage circuits" verified in practice?',
    options: [
      'Visual inspection only.',
      'Visual inspection of the supply unit (BS EN 61558 marking, internal construction if accessible, cable routing keeping SELV conductors separated from mains conductors), AND insulation-resistance testing between the SELV side and the mains side at the supply unit (typically a Class I or Class II IR test of the transformer that incidentally verifies the secondary-to-primary insulation). The IET CoP §15 covers the methodology.',
      'Test continuity between SELV and mains.',
      'Apply 500 V dc to the SELV circuit.',
    ],
    correctAnswer: 1,
    explanation:
      "Separation is verified at the supply boundary. The transformer's IR (mains-side) verifies the primary-to-secondary insulation, which is the structural separation between mains and SELV. Cable routing checks ensure SELV conductors do not run alongside mains conductors in shared trays without separation. The combination of visual + transformer test verifies the SELV separation.",
  },
  {
    id: 8,
    question: 'A USB-charged device — is the charger in Class I, Class II, or Class III?',
    options: [
      'Class III.',
      'The mains-powered USB charger is Class II (typical construction for plug-in PSUs — double insulation). The 5 V dc USB output is Class III / SELV. The charger itself is tested as Class II; the device powered from USB is treated as Class III on the SELV side (formal visual + functional check). The class differs by which side of the supply boundary you are on.',
      'Class I.',
      'Class 0.',
    ],
    correctAnswer: 1,
    explanation:
      'The classification depends on the side of the boundary. Most plug-in USB chargers are Class II on the mains side (no CPC, double insulation between mains and 5 V output). The 5 V output is SELV and any device powered from it is Class III for protection purposes. The mains side gets the Class II test; the SELV side gets the Class III treatment.',
  },
  {
    id: 9,
    question: 'PELV is similar to SELV but differs in what way?',
    options: [
      'Higher voltage.',
      'PELV has the same voltage limits (≤ 50 V ac / ≤ 120 V dc) and source requirements (BS EN 61558 transformer or equivalent) as SELV, but is NOT separated from earth — the PELV circuit may have a deliberate connection to earth, typically for functional / interference reasons. PELV provides protection against electric shock by extra-low voltage AND additional safeguards for the earth connection; SELV provides protection by extra-low voltage AND full electrical separation. PAT treatment differs accordingly.',
      'PELV is for high-voltage equipment.',
      'PELV is obsolete.',
    ],
    correctAnswer: 1,
    explanation:
      'SELV and PELV share the voltage limits but differ on earth treatment. SELV = fully separated from earth. PELV = may be deliberately earthed. The architectural difference matters because some Class III equipment is supplied from PELV (e.g. equipment with chassis bonded to earth for EMC) and the test approach must reflect that.',
  },
  {
    id: 10,
    question: 'Why does the IET CoP treat Class III as the "least invasive" PAT category?',
    options: [
      'Because it is unimportant.',
      'Because the protective measure is the supply, not anything inherent to the SELV equipment itself. The SELV equipment cannot deliver dangerous voltage even on direct contact with its conductors. The PAT effort focuses on verifying the supply (the transformer / source) and on functional integrity of the SELV equipment — there is no IR test, no PE-continuity test, no leakage test on the SELV side. The protective verification is at the supply boundary.',
      'Because tests are too expensive.',
      'Because it is rare.',
    ],
    correctAnswer: 1,
    explanation:
      'Class III is least-invasive on the SELV side because the protective measure is intrinsic to the supply. The verification effort is concentrated at the supply boundary — making sure the SELV is genuinely SELV. This is a different paradigm from Class I (test the CPC) and Class II (test the insulation), and the test methodology reflects it.',
  },
];

const PATTestingModule2Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Class III — extra-low voltage and SELV | PAT Module 2.4 | Elec-Mate',
    description:
      'BS EN 61140 Class III: SELV — Separated Extra-Low Voltage. Voltage ≤ 50 V ac / ≤ 120 V dc, supplied from a BS EN 61558 safety isolating transformer or batteries, separated from earth. Why the PAT focus is the supply, not the equipment.',
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
            eyebrow="Module 2 · Section 4"
            title="Class III — extra-low voltage and SELV"
            description="Class III uses the supply itself as the protective measure. Voltage limited, source-defined, and separated from earth and from higher-voltage circuits. The PAT focus is the supply boundary, not the SELV equipment."
            tone="yellow"
          />

          <TLDR
            points={[
              'Class III = SELV (Separated Extra-Low Voltage). Voltage ≤ 50 V ac (rms) or ≤ 120 V dc (ripple-free), supplied from a BS EN 61558 safety isolating transformer or batteries, separated from earth and from higher-voltage circuits.',
              'The supply IS the protection. Even direct contact with SELV conductors cannot deliver enough current through the body to cause electric shock injury — the voltage is below the threshold.',
              'PELV is similar but NOT separated from earth (deliberate earth connection allowed for functional reasons). Same voltage limits; different separation.',
              'The transformer that creates SELV must conform to BS EN 61558 (specifically BS EN 61558-2-6 for safety isolating transformers). A generic mains transformer with a 12 V secondary is NOT automatically SELV.',
              'PAT focus: verify the SELV supply (transformer / battery source, separation, voltage limit). The transformer itself is Class I or Class II on the mains side and is tested under that class. The SELV side gets formal visual + functional check.',
              'NO IR test, NO PE-continuity test on SELV-side equipment in the conventional sense. The protective measure is intrinsic to the supply, not to the equipment.',
              'Common Class III applications: door entry (12 V / 24 V), low-voltage lighting (12 V garden / display), telecoms / signalling, battery-operated equipment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define SELV by all three conditions: voltage limit, source type, and separation',
              'Distinguish SELV from PELV — same voltage limits, different earth treatment',
              'Identify the BS EN 61558 safety isolating transformer as the SELV source standard, and explain why a generic transformer at 12 V is not SELV',
              'Apply the Class III PAT methodology: verify supply (transformer / source), functional check on the SELV equipment, no IR or PE test on the SELV side',
              'Trace the boundary between mains-side and SELV-side in a typical installation (door entry, low-voltage lighting, USB charger)',
              'Explain why Class III is the "least invasive" PAT category — the protective measure is the supply, not anything inherent to the equipment',
              'Recognise the BS EN 61140 Class III SELV symbol on equipment and use it to drive the test approach',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What SELV actually is</ContentEyebrow>

          <ConceptBlock
            title="The three conditions of SELV"
            plainEnglish="SELV — Separated Extra-Low Voltage — is a protective measure defined by THREE simultaneous conditions: a voltage limit (≤ 50 V ac or ≤ 120 V dc), a specific source type (safety isolating transformer or battery / SELV-rated source), and electrical separation from earth and from higher-voltage circuits. All three conditions must be met for a circuit to be SELV. Voltage alone is not SELV; source alone is not SELV; separation alone is not SELV."
            onSite="When evaluating Class III / SELV equipment, work through all three conditions explicitly. Tick each. If any is not met, the circuit is not SELV — it may be PELV (similar but earthed), or it may be unprotected ELV which has different safety implications."
          >
            <p>The three conditions in detail:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Voltage limit.</strong> Not exceeding 50 V ac (rms) or 120 V dc
                (ripple-free), measured between conductors and between any conductor and earth.
                Common applications use 12 V, 24 V or 48 V — well within the limits.
              </li>
              <li>
                <strong>Source type.</strong> Supply from a safety isolating transformer conforming
                to BS EN 61558 (specifically BS EN 61558-2-6 for safety isolating transformers), OR
                from batteries, OR from an engine-driven generator electrically separated from
                earth. Generic mains transformers with low-voltage secondaries are NOT safety
                isolating transformers and do NOT create SELV.
              </li>
              <li>
                <strong>Separation.</strong> The SELV circuit is electrically separated from earth
                AND from any higher-voltage circuit (including PELV). The separation must be at
                least equivalent to that between mains and SELV in a safety isolating transformer.
              </li>
            </ol>
            <p>
              The "Separated" in SELV is the operative word. The voltage limit alone produces ELV —
              Extra-Low Voltage — which can be touched safely under most conditions but is not
              formally a protective measure under BS EN 61140. SELV adds separation from earth and
              higher-voltage circuits, which is what makes it a recognised protective architecture.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 414 (Protection by SELV and PELV)"
            clause={
              <>
                Protection by means of SELV (Separated Extra-Low Voltage) consists of meeting all of
                the following requirements: the nominal voltage cannot exceed 50 V ac or 120 V dc;
                the supply must be from one of the sources specified in Reg 414.3; the conditions of
                installation specified in Reg 414.4 must be fulfilled, including electrical
                separation from any other source.
              </>
            }
            meaning="Reg 414 makes SELV one of the protective measures in BS 7671. The 'all of the following' wording is the structural point: voltage AND source AND separation. Missing any one element means the circuit is not SELV under BS 7671."
          />

          <ConceptBlock
            title="SELV vs PELV vs FELV"
            plainEnglish="Three closely-related concepts share the voltage limits but differ on earth and source treatment. Knowing which is which is essential for correct PAT application."
          >
            <p>The three ELV variants:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Type</th>
                    <th className="text-left text-white/80 py-2">Voltage</th>
                    <th className="text-left text-white/80 py-2">Source</th>
                    <th className="text-left text-white/80 py-2">Earth</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>SELV</strong>
                    </td>
                    <td>≤ 50 V ac / ≤ 120 V dc</td>
                    <td>BS EN 61558 / battery / equivalent</td>
                    <td className="text-emerald-300">Separated from earth</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>PELV</strong>
                    </td>
                    <td>≤ 50 V ac / ≤ 120 V dc</td>
                    <td>BS EN 61558 / battery / equivalent</td>
                    <td className="text-amber-300">May be earthed</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>FELV</strong>
                    </td>
                    <td>≤ 50 V ac / ≤ 120 V dc</td>
                    <td>NOT a safety source (e.g. autotransformer)</td>
                    <td>Not protective; treated as LV</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>SELV</strong> equipment is Class III and gets the Class III PAT treatment
                (supply verification, functional check).
              </li>
              <li>
                <strong>PELV</strong> equipment is also Class III in BS EN 61140 terms but the PAT
                approach must include verification of the earth connection and any additional
                protective measures the PELV system relies on.
              </li>
              <li>
                <strong>FELV</strong> is NOT a protective measure — the supply does not provide the
                protection, and the equipment effectively must rely on Class I or Class II
                construction on its mains-equivalent side. Treat as the relevant class on the LV
                side.
              </li>
            </ul>
            <p>
              Most modern Class III equipment in workplaces is genuinely SELV — door entry, low
              voltage lighting, telecoms. PELV is more common in industrial control panels. FELV is
              the rarer category, typically a legacy design that has not been upgraded.
            </p>
          </ConceptBlock>

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

          <ContentEyebrow>The safety isolating transformer — BS EN 61558</ContentEyebrow>

          <ConceptBlock
            title="What makes a transformer a safety isolating transformer"
            plainEnglish="BS EN 61558-2-6 prescribes the construction and safety case of a safety isolating transformer. The standard requires double or reinforced insulation between primary and secondary windings, basic-and-supplementary insulation between live parts and accessible parts, and specific markings indicating SELV / PELV use. A transformer marked compliant with BS EN 61558-2-6 has the required insulation and separation; one without that conformance does not."
          >
            <p>The structural features of a BS EN 61558-2-6 safety isolating transformer:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reinforced or double insulation between windings.</strong> The primary
                (mains) winding and the secondary (SELV) winding are separated by insulation
                equivalent to the Class II protective measure — so a single insulation failure
                cannot bring mains voltage onto the SELV secondary.
              </li>
              <li>
                <strong>Class II construction on the casing.</strong> Most safety isolating
                transformers are Class II, providing double insulation between live parts and any
                accessible conductive part.
              </li>
              <li>
                <strong>
                  Marked with the BS EN 61558 reference, the SELV symbol, and the rating.
                </strong>{' '}
                Inspectors look for these markings as confirmation of the transformer\'s standards
                conformance.
              </li>
              <li>
                <strong>Output impedance limited.</strong> Some safety isolating transformers have
                output impedance characteristics designed to limit short-circuit current, providing
                additional safety on the SELV side.
              </li>
              <li>
                <strong>Distinct from autotransformers and bell-transformers.</strong> An
                autotransformer (single winding with a tap) is NOT a safety isolating transformer
                because primary and secondary share the same winding — there is no galvanic
                separation.
              </li>
            </ul>
            <p>
              When PAT-testing a SELV system, the transformer is the critical item. Verify the BS EN
              61558 marking, verify the Class II markings on its casing, and apply the Class II PAT
              regime (IR test on the mains side, functional check). Any defect at the transformer
              affects the entire SELV-side system downstream.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61558-2-6:2009 · Particular requirements for safety isolating transformers and power supply units"
            clause={
              <>
                Safety isolating transformers are designed to supply circuits operating at extra-low
                voltage with an electrical separation between input and output windings that is at
                least equivalent to that between primary and basic insulation. Equipment shall be
                marked with the symbol of the safety isolating transformer and with the rated
                voltage, current and frequency.
              </>
            }
            meaning="The standard makes the separation explicit: equivalent to primary-to-basic-insulation in a Class II construction. That is the structural reason a 61558-compliant transformer creates a genuine SELV circuit while a generic transformer does not."
          />

          <SectionRule />

          <ContentEyebrow>The Class III PAT methodology</ContentEyebrow>

          <ConceptBlock
            title="Test methodology — supply-focused"
            plainEnglish="Class III PAT focuses on the SELV supply, not on the SELV equipment downstream. The supply unit (BS EN 61558 transformer, charger, or battery system) is tested under its OWN class (typically Class I or Class II on the mains side). The SELV side gets a formal visual and a functional check. There is no IR or PE-continuity test on the SELV-side equipment because the protective measure is the supply itself, not anything inherent to the equipment."
            onSite="When you encounter a Class III system, identify the supply unit first. That is your PAT focus. The downstream SELV equipment gets formal visual + functional. The supply integrity verifies the protection."
          >
            <p>The Class III test workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify the SELV supply.</strong> BS EN 61558 transformer in a riser
                cupboard, a battery system, a charger / PSU, etc. Verify the standards markings.
              </li>
              <li>
                <strong>Test the supply under its OWN class.</strong> If the transformer is Class I
                (rare for safety isolating transformers but possible), run PE-continuity + IR. If
                Class II (most common), run IR or substitute leakage. Record the results as the
                supply\'s test history.
              </li>
              <li>
                <strong>Verify the SELV separation.</strong> The supply\'s own IR test incidentally
                verifies the primary-to-secondary insulation. Visual checks confirm the SELV cabling
                is separated from mains cabling in cable management. The output voltage is verified
                within SELV limits with a multimeter.
              </li>
              <li>
                <strong>Formal visual on SELV-side equipment.</strong> Each item in the SELV circuit
                (handsets, lights, panels) gets a formal visual — physical condition, connections
                secure, no signs of damage or misuse.
              </li>
              <li>
                <strong>Functional check.</strong> The SELV equipment operates as intended.
              </li>
              <li>
                <strong>NO IR test, NO PE-continuity test</strong> on the SELV side. Applying 500 V
                dc to a 12 V SELV circuit could damage the equipment without verifying the
                protective measure.
              </li>
              <li>
                <strong>Record.</strong> Each item — supply unit and downstream SELV equipment — has
                its own register entry and test record. The supply\'s test results are the
                load-bearing evidence; the SELV-side records are formal-visual + functional.
              </li>
            </ol>
            <p>
              The methodology is fundamentally different from Class I and Class II because the
              protective architecture is fundamentally different. The supply IS the protection, so
              the supply IS the test focus.
            </p>
          </ConceptBlock>

          <Scenario
            title="Door entry system with 24 V handsets"
            situation="A residential block has a door-entry system: a panel at the entrance, handsets in each apartment. The supply is a BS EN 61558-2-6 safety isolating transformer in the riser cupboard, with a 24 V dc secondary feeding the panel and handsets. The system has been in service for 8 years; one handset has stopped working. The duty-holder asks for a PAT inspection of the system."
            whatToDo="Identify the supply: the safety isolating transformer in the riser. Verify its BS EN 61558 marking. Check the casing class — typically Class II for these — and apply Class II PAT (IR test, functional). Test the mains side of the transformer (typically a Class I or II PAT regime depending on its construction). Visually inspect the SELV cabling between transformer, panel and handsets — looking for signs of damage, mains-cable proximity, intact terminations. Formal visual on the panel and each handset (including the failed one). Functional check on each handset. The failed handset is investigated and replaced; the new handset enters the register and gets formal visual + functional. Record all of this. The transformer\'s test history is the load-bearing evidence; the handset records are formal-visual + functional."
            whyItMatters="Door-entry systems are common and frequently mis-tested. Inspectors trained on Class I / Class II equipment sometimes apply 500 V dc IR tests to the SELV side — risking damage to the handsets and the panel and not verifying the actual protective measure (which is at the supply). The Class III methodology is genuinely different and must be followed for the test to be meaningful."
          />

          <CommonMistake
            title="Applying 500 V dc IR test to SELV-side equipment"
            whatHappens="An inspector encounters a 12 V dc garden lighting system and runs the standard PAT IR test on each light fitting — 500 V dc applied to the 12 V circuit. The fittings either survive (showing high IR) or are damaged by the over-voltage. Either way, the test does not verify the actual protective measure (which is the SELV supply at the transformer end of the system) and may have damaged equipment. The inspector records readings that are meaningless for Class III verification."
            doInstead="Test the supply, not the SELV equipment. Identify the BS EN 61558 transformer; apply the test methodology for its mains-side class (Class I or Class II). Verify SELV separation (transformer markings, cable routing, output voltage measurement). Formal visual on the lights. Functional check. The 500 V dc IR test on the 12 V circuit is NOT a Class III verification — it is a methodology error that risks damage."
          />

          <CommonMistake
            title="Treating a generic mains transformer as a SELV source"
            whatHappens="A retail unit uses a 240 V to 12 V transformer to drive a low-voltage display lighting system. The transformer is a generic mains transformer (not BS EN 61558 marked). The duty-holder believes the 12 V output is SELV and treats the system as Class III. In fact, the transformer primary-to-secondary insulation is not built to safety-isolating standards, and a primary-to-secondary fault could put 240 V onto the nominally-12-V circuit. The system is NOT genuinely SELV; it is FELV at best."
            doInstead="Verify the transformer standards conformance. BS EN 61558-2-6 marking on the rating plate is the confirmation. A generic transformer at 12 V output is FELV — not a protective measure. Replace with a BS EN 61558 safety isolating transformer, or treat the 12 V system as if it were mains for PAT purposes (apply IR and continuity tests on the LV side as for Class I or II equipment, and ensure RCD protection upstream)."
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

          <ContentEyebrow>Common Class III applications</ContentEyebrow>

          <ConceptBlock
            title="Where you encounter Class III in practice"
            plainEnglish="Class III is widespread in modern installations. Recognising the patterns helps the inspector apply the correct methodology quickly."
          >
            <p>Common Class III applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Door entry / video entry systems</strong> — typically 12-24 V dc, supplied
                from a BS EN 61558 transformer in a riser or cupboard. Handsets, panels, cameras all
                SELV-side.
              </li>
              <li>
                <strong>Low-voltage lighting</strong> — display lighting, garden lighting,
                under-cabinet lighting. 12 V or 24 V from a BS EN 61558 transformer or LED driver.
                The transformer / driver is the supply unit; the lights are SELV.
              </li>
              <li>
                <strong>Telecoms / signalling</strong> — telephone lines, fire-alarm cabling
                (depending on the system, may be SELV or fire-rated separation), security
                signalling.
              </li>
              <li>
                <strong>USB-powered equipment</strong> — the USB charger / PSU is mains-side Class
                II; the USB output is SELV; the device is Class III for protection purposes.
              </li>
              <li>
                <strong>Battery-powered equipment</strong> — torches, battery tools (when used
                without charger connected), portable electronics.
              </li>
              <li>
                <strong>Industrial control panels</strong> — 24 V dc control circuits often derived
                from a safety isolating transformer; sometimes SELV, sometimes PELV depending on
                whether the 24 V is earthed.
              </li>
              <li>
                <strong>Audio-visual equipment</strong> — speaker-level connections (typically
                SELV), HDMI / display interfaces (SELV-equivalent under standards).
              </li>
            </ul>
            <p>
              Each application has the same Class III PAT logic: identify the supply, test the
              supply under its mains-side class, verify the SELV separation, formal-visual +
              functional on the SELV-side equipment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Class III = SELV. Three conditions: voltage ≤ 50 V ac / ≤ 120 V dc, BS EN 61558 source, separation from earth and from higher-voltage circuits. ALL three required.',
              'PELV is similar but earthed. FELV is similar voltage but not from a safety source — not a protective measure.',
              'A BS EN 61558-2-6 safety isolating transformer is the canonical SELV source. Generic mains transformers at 12 V output are NOT safety isolating transformers.',
              'PAT focus = the SUPPLY. The transformer / source is tested under its OWN class (Class I or Class II on the mains side). SELV-side equipment gets formal visual + functional check.',
              'NO IR test, NO PE-continuity test on SELV-side equipment. The protective measure is the supply, not the equipment.',
              'A 500 V dc IR test applied to a 12 V SELV circuit is methodologically wrong and risks damaging equipment without verifying the protective measure.',
              'Common applications: door entry, low-voltage lighting, telecoms, USB-charged equipment, batteries, control panels, AV equipment.',
              'Class III is the "least invasive" PAT category because protection is intrinsic to the supply, not to the equipment downstream.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What is SELV?',
                answer:
                  'Separated Extra-Low Voltage. A protective measure defined by three conditions: voltage ≤ 50 V ac (or ≤ 120 V dc), supply from a BS EN 61558 safety isolating transformer / battery / equivalent SELV source, AND separation from earth and from higher-voltage circuits. All three conditions are required for a circuit to be SELV.',
              },
              {
                question: 'How is SELV different from PELV?',
                answer:
                  'Same voltage limits, same source requirements — but PELV may have a deliberate earth connection, while SELV is fully separated from earth. PELV provides protection by extra-low voltage with the earth connection allowed for functional reasons; SELV provides protection by extra-low voltage AND full electrical separation. PAT treatment differs slightly because the earth connection in PELV requires verification.',
              },
              {
                question: 'Can I use a generic mains transformer to create a SELV circuit?',
                answer:
                  'No. A SELV source must be a BS EN 61558 safety isolating transformer (or equivalent battery / SELV-rated source). Generic mains transformers do not have the prescribed insulation between primary and secondary, and a primary-to-secondary fault could put mains voltage onto the "low voltage" circuit. The transformer\'s standards conformance is part of the SELV definition.',
              },
              {
                question: 'How is Class III PAT different from Class I or Class II?',
                answer:
                  'The protective measure is the SUPPLY, not anything inherent to the equipment. The PAT focus is therefore on verifying the supply (the BS EN 61558 transformer or other SELV source) and on functional integrity of the SELV-side equipment. There is no IR test or PE-continuity test on the SELV side — the supply is tested under its OWN class (typically Class I or Class II on the mains side), and the SELV-side equipment gets formal visual + functional check.',
              },
              {
                question: 'A USB charger and the device it powers — what classes are involved?',
                answer:
                  'Two classes, on opposite sides of the supply boundary. The mains-side USB charger is typically Class II (double insulation between mains and 5 V output) and is tested under Class II. The 5 V dc USB output is SELV, and the device powered from it is Class III for protection purposes. The charger gets the full Class II PAT regime; the device gets formal visual + functional. The detachable USB lead is a separate item with its own visual inspection (no IR or PE test, since it is SELV-rated).',
              },
              {
                question: 'Are battery-only tools in PAT scope?',
                answer:
                  'In battery-only use, generally outside the EAWR scope (no mains energy, no electrical danger in the BS EN 61140 sense). The charger IS in scope (Class I or Class II per its rating plate). Best practice is to bring battery tools into the formal-visual programme under PUWER Reg 6 even though combined inspection-and-test does not apply to the tool itself.',
              },
              {
                question: 'Can I apply a 500 V IR test to SELV equipment to "be thorough"?',
                answer:
                  'No. The 500 V dc IR test is not the Class III verification method, and applying 500 V dc to a 12 V or 24 V SELV circuit can damage the equipment. The Class III protective measure is verified at the supply boundary (the transformer / source). The SELV-side equipment is verified by formal visual + functional check. The instrument manual will direct the test method per equipment class; do not improvise.',
              },
              {
                question: 'What does the BS EN 61140 Class III SELV symbol look like?',
                answer:
                  'A Roman numeral III enclosed in a diamond shape. The symbol indicates the equipment is Class III and intended for connection to a SELV supply. Some equipment additionally carries a "safety isolating transformer" symbol (a stylised representation of the transformer with double-line separation between primary and secondary). Both symbols are inspector cues to apply Class III methodology.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Class III — extra-low voltage and SELV — Module 2.4"
            questions={quizQuestions}
          />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Identifying class by markings
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

export default PATTestingModule2Section4;
