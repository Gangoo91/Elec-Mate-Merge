/**
 * Module 4 · Section 2 · Subsection 4 — Short-Circuit Withstand
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Adiabatic equation S = √(I²t)/k, BS 7671 Regulation 434.5.2 verification, k values
 *   from Table 43.1, let-through energy (I²t) and protective device coordination for
 *   cable fault protection.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Short-Circuit Withstand - HNC Module 4 Section 2.4';
const DESCRIPTION =
  'Master the adiabatic equation, let-through energy calculations and protective device coordination for cable fault protection in building services.';

const quickCheckQuestions = [
  {
    id: 'adiabatic-purpose',
    question: 'What does the adiabatic equation determine for cable protection?',
    options: [
      'Changes in legislation, organisation, or after incidents',
      'Widens the temperature deadband to reduce plant operation',
      'Minimum cable size to withstand fault current for disconnection time',
      'Create immediate positive feedback or rewards after completing the habit',
    ],
    correctIndex: 2,
    explanation:
      'The adiabatic equation S = √(I²t)/k determines the minimum conductor cross-sectional area (S) required to withstand the thermal energy from fault current without damage.',
  },
  {
    id: 'k-value-meaning',
    question: "What does the 'k' value in the adiabatic equation represent?",
    options: [
      'Cable thermal constant based on conductor and insulation materials',
      'Delta primary, star secondary with neutral, 330 degrees (11 o\\\\\\\\\\\\\\\'clock) phase shift',
      'Functional testing of detection and alarm systems',
      'Reduced voltage, RCD protection, and robust equipment',
    ],
    correctIndex: 0,
    explanation:
      "The k value is a constant that depends on the conductor material (copper/aluminium) and insulation type (PVC/XLPE). It represents the cable's ability to absorb thermal energy.",
  },
  {
    id: 'i2t-definition',
    question: 'What is I²t (let-through energy)?',
    options: [
      'Total energy let through by a protective device during fault clearance',
      'The engine speed (and therefore the output frequency)',
      'A motor designed to run on single-phase supply using starting mechanisms',
      'By opening and closing to regulate air passage through ducts',
    ],
    correctIndex: 0,
    explanation:
      'I²t is the let-through energy - the thermal stress the protective device allows through to the cable during fault clearance. Lower I²t values mean better cable protection.',
  },
  {
    id: 'fault-withstand-check',
    question:
      'For a cable to be adequately protected against fault current, which condition must be satisfied?',
    options: [
      'S ≥ I²t',
      'I²t ≥ k²S²',
      'k ≥ I²t',
      'k²S² ≥ I²t',
    ],
    correctIndex: 3,
    explanation:
      "The cable's thermal withstand (k²S²) must be greater than or equal to the let-through energy (I²t) of the protective device. This ensures the cable won't be damaged during a fault.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the adiabatic equation used in cable fault protection?',
    options: [
      'S = I × t',
      'S = √(I²t) / k',
      'S = I² × t × k',
      'S = k × I × t',
    ],
    correctAnswer: 1,
    explanation:
      'S = √(I²t) / k gives the minimum conductor size (S in mm²) where I is fault current, t is disconnection time, and k is the cable thermal constant.',
  },
  {
    id: 2,
    question: 'The k value for copper conductors with PVC insulation (70°C) is:',
    options: [
      '143',
      '76',
      '115',
      '100',
    ],
    correctAnswer: 2,
    explanation:
      'From BS 7671 Table 43.1: k = 115 for copper conductors with 70°C PVC insulation. This is a commonly used value in building services calculations.',
  },
  {
    id: 3,
    question: 'A 4mm² copper/PVC cable (k=115) has what maximum I²t withstand?',
    options: [
      '2,116 A²s',
      '460 A²s',
      '1,840 A²s',
      '211,600 A²s',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum I²t = k²S² = 115² × 4² = 13,225 × 16 = 211,600 A²s. This is the thermal energy limit the cable can withstand.',
  },
  {
    id: 4,
    question: 'Why is fault current highest at the origin of an installation?',
    options: [
      'Lower cable impedance between supply and fault point',
      'Circuits are grouped by function with clear labelling',
      'Adjacent to delivery access with good ground conditions',
      'They inject test current through the earth path',
    ],
    correctAnswer: 0,
    explanation:
      "Fault current is inversely proportional to circuit impedance. At the origin, there's minimal impedance between the supply transformer and fault point, resulting in maximum fault current.",
  },
  {
    id: 5,
    question: 'What happens to fault withstand time (t) if cable size is doubled?',
    options: [
      'Time halves',
      'Time quadruples',
      'Time remains the same',
      'Time doubles',
    ],
    correctAnswer: 1,
    explanation:
      'From t = k²S²/I², if S doubles (×2), then S² quadruples (×4). The permissible fault duration increases by a factor of 4 for a given fault current.',
  },
  {
    id: 6,
    question: 'An MCB has I²t let-through of 50,000 A²s. Which cable sizes are protected? (k=115)',
    options: [
      '4mm² and above',
      '2.5mm² and above',
      '1.5mm² and above',
      '6mm² and above',
    ],
    correctAnswer: 2,
    explanation:
      'Required S = √(50,000)/115 = 223.6/115 = 1.95mm². Therefore 2.5mm² is the minimum (1.5mm² is marginal at k²S² = 29,756 A²s). In practice, 2.5mm² would be specified.',
  },
  {
    id: 7,
    question: "What is 'current limitation' by an MCB?",
    options: [
      'The degree of protection against solid objects (5) and water (5)',
      'Store intermediate logic states without driving physical outputs',
      'Record clearly and investigate thoroughly',
      'Tripping before prospective fault current reaches peak',
    ],
    correctAnswer: 3,
    explanation:
      'Current-limiting MCBs trip so quickly that they disconnect before the prospective fault current reaches its peak value. This significantly reduces the I²t let-through energy.',
  },
  {
    id: 8,
    question: 'Why do XLPE cables have higher k values than PVC?',
    options: [
      'XLPE can withstand higher temperatures (90°C vs 70°C) before damage',
      'The process of measuring quantities from drawings for pricing',
      'Local networking, events, and professional support',
      'Pressure measured relative to atmospheric pressure',
    ],
    correctAnswer: 0,
    explanation:
      'XLPE insulation can withstand higher temperatures (250°C short-circuit limit vs 160°C for PVC). This allows the conductor to absorb more thermal energy, giving k = 143 for copper/XLPE.',
  },
  {
    id: 9,
    question: 'At what point in a circuit is fault current verification most critical?',
    options: [
      'The electrician assigned to install it',
      'At the origin (closest to supply)',
      '1.67 times the live conductor resistance',
      'They consume the most energy in a building',
    ],
    correctAnswer: 1,
    explanation:
      "The highest fault current occurs at the origin where impedance is lowest. If the cable can withstand this maximum fault, it's protected throughout its length.",
  },
  {
    id: 10,
    question: 'A 6kA fault lasting 0.1s flows through a cable. What is the I²t?',
    options: [
      '600 A²s',
      '60,000 A²s',
      '3,600,000 A²s',
      '360,000 A²s',
    ],
    correctAnswer: 2,
    explanation:
      'I²t = I² × t = 6000² × 0.1 = 36,000,000 × 0.1 = 3,600,000 A²s. This would require careful verification that cable k²S² exceeds this value.',
  },
];

const faqs = [
  {
    question: 'What is the difference between prospective fault current and let-through current?',
    answer:
      "Prospective fault current (PSCC) is the theoretical maximum current that would flow if the protective device didn't operate - it depends on supply impedance. Let-through current is the actual peak current that flows before the device trips. Current-limiting devices can significantly reduce let-through below prospective levels.",
  },
  {
    question: 'When is adiabatic calculation unnecessary?',
    answer:
      "Adiabatic calculations can be avoided when using manufacturer's I²t data that confirms cable protection, or when cable has been selected using BS 7671 tables that inherently include fault protection for the installation method. However, for high fault levels or long disconnection times, explicit verification is good practice.",
  },
  {
    question: 'How do I find the I²t let-through of a protective device?',
    answer:
      'Manufacturer data sheets provide I²t characteristics, often as curves showing I²t vs prospective fault current. For MCBs, the I²t values are typically given at maximum rated fault current. For fuses, I²t varies with prospective current - lower fault currents mean longer clearance times and higher I²t.',
  },
  {
    question: 'What if my cable fails the adiabatic check?',
    answer:
      'Options include: 1) Use a larger cable size (increases k²S²), 2) Use a more current-limiting protective device (reduces I²t), 3) Use cable with higher temperature rating like XLPE (higher k value), or 4) Reduce fault level by increasing supply impedance (add impedance or use longer/smaller incoming cable).',
  },
  {
    question: 'Does the neutral conductor need fault withstand verification?',
    answer:
      'Yes, neutral conductors can carry fault current during line-to-neutral faults. For circuits with reduced neutral (e.g., 4-core with reduced neutral), ensure the neutral can withstand the fault energy. Line-to-neutral faults may have lower current than line-to-line faults due to higher loop impedance.',
  },
  {
    question: 'What k value applies to the CPC (protective conductor)?',
    answer:
      'The CPC uses different k values from Table 54.3 because it only carries current during faults. For example, copper CPC with PVC insulation: k = 115 (same as line conductor). Steel conduit as CPC has k = 47. The CPC must also satisfy the adiabatic equation for earth fault current.',
  },
];

const HNCModule4Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 4"
            title="Short-Circuit Withstand"
            description="Ensuring cables can safely withstand fault currents until protective devices operate."
            tone="purple"
          />

          <TLDR
            points={[
              'Adiabatic equation: S = √(I²t) / k — or k²S² ≥ I²t. Cables must survive the fault without exceeding their limiting temperature.',
              'k values come from BS 7671 (Cu/PVC = 115, Cu/XLPE = 143, Al/PVC = 76, Al/XLPE = 94) — depends on conductor material and insulation.',
              'I²t (let-through energy) comes from the protective device manufacturer&rsquo;s data sheet — current-limiting fuses dramatically reduce I²t vs MCBs.',
              'Verification: k²S² (cable withstand) ≥ I²t (device let-through) at the maximum prospective fault current at the cable origin.',
              'BS 7671 Reg 434.5.2 requires the protective device to have an operating characteristic that protects the load-side wiring against fault current.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 434.5.2 (Operating characteristic for fault-current protection)"
            clause="Where Regulation 434.2.2 permits installation of the protective device on the supply side of a change, that device shall possess an operating characteristic such that it protects the wiring situated on the load side against fault current, in accordance with Regulation 434.5.2. See Regulation 434.5.2 for the detailed requirements on operating characteristics and protection levels."
            meaning={
              <>
                Reg 434.5.2 is the regulatory anchor for the adiabatic check. The protective
                device must clear the prospective fault current quickly enough that the cable
                does not exceed its limiting temperature. The standard formula t ≤ k²S² / I²
                lives inside Reg 434.5.2 itself — verifying it is mandatory for any non-trivial
                circuit, especially long cable runs and reduced-CSA CPCs where fault current is
                modest but disconnection time stretches.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 434.5.2; manufacturer time-current and I²t data; BS 7671 Table 43.1 (k values)."
          />

          <LearningOutcomes
            outcomes={[
              'Apply the adiabatic equation to verify cable fault protection',
              'Use k values from BS 7671 for different conductor and insulation types',
              'Calculate cable thermal withstand (k²S²)',
              'Understand I²t let-through energy from protective devices',
              'Verify protective device coordination with cable size',
              'Determine minimum cable sizes for given fault levels',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="The Adiabatic Equation">
            <p>
              During a fault, massive current flows through the cable for a short time before the
              protective device operates. This current causes rapid heating. The adiabatic equation
              ensures the cable won't be damaged before the fault is cleared.
            </p>
            <p>
              <strong>The adiabatic equation:</strong> S = √(I²t) / k — or rearranged: k²S² ≥ I²t.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S</strong> = conductor cross-sectional area (mm²)
              </li>
              <li>
                <strong>I</strong> = fault current (A)
              </li>
              <li>
                <strong>t</strong> = disconnection time (s)
              </li>
              <li>
                <strong>k</strong> = cable thermal constant
              </li>
            </ul>
            <p>
              <strong>Why 'adiabatic'?</strong> The term 'adiabatic' means no heat transfer. During
              a very short fault (typically &lt;5 seconds), the heating is so rapid that heat
              doesn't have time to dissipate from the conductor — it's all absorbed by the
              conductor itself. This is the worst-case thermal scenario.
            </p>
            <p>
              <strong>BS 7671 Regulation 434.5.2:</strong> "The characteristics of protective
              devices protecting a conductor against fault current shall be such that the energy
              let through (I²t) does not exceed that which the conductor can withstand (k²S²)."
            </p>
            <p>
              <strong>Simple rule:</strong> Cable withstand (k²S²) must be greater than device
              let-through (I²t).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="k Values and Thermal Constants">
            <p>
              The k value depends on the conductor material and insulation type. It represents the
              cable's thermal capacity — higher k values indicate better ability to absorb fault
              energy without damage.
            </p>
            <p>
              <strong>k values from BS 7671 Table 43.1 (conductor / insulation / k / max temp °C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper / PVC 70°C / k = 115 / 160°C</li>
              <li>Copper / XLPE 90°C / k = 143 / 250°C</li>
              <li>Copper / Rubber 60°C / k = 100 / 200°C</li>
              <li>Copper / Mineral (bare) / k = 135 / 250°C</li>
              <li>Aluminium / PVC 70°C / k = 76 / 160°C</li>
              <li>Aluminium / XLPE 90°C / k = 94 / 250°C</li>
            </ul>
            <p>
              <strong>Calculating k²S² (Cu/PVC, k = 115):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                1.5mm²: 115² × 1.5² = <strong>29,756 A²s</strong>
              </li>
              <li>
                2.5mm²: 115² × 2.5² = <strong>82,656 A²s</strong>
              </li>
              <li>
                4mm²: 115² × 4² = <strong>211,600 A²s</strong>
              </li>
              <li>
                6mm²: 115² × 6² = <strong>476,100 A²s</strong>
              </li>
              <li>
                10mm²: 115² × 10² = <strong>1,322,500 A²s</strong>
              </li>
              <li>
                16mm²: 115² × 16² = <strong>3,385,600 A²s</strong>
              </li>
            </ul>
            <p>
              <strong>XLPE advantage:</strong> With k = 143 vs PVC k = 115, XLPE cables have ~55%
              higher fault withstand capacity for the same conductor size.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Let-Through Energy (I²t)">
            <p>
              The let-through energy I²t is the thermal stress the protective device allows the
              cable to experience during fault clearance. It depends on the fault current level
              and how quickly the device operates.
            </p>
            <p>
              <strong>I²t calculation:</strong> I²t = I² × t, where I = RMS fault current (A) and
              t = disconnection time (s).
            </p>
            <p>
              <strong>Typical I²t values by device type (device / rating / I²t A²s / min cable Cu/PVC):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCB Type B / 16A / 15,000 / 1.5mm²</li>
              <li>MCB Type B / 32A / 35,000 / 2.5mm²</li>
              <li>MCB Type C / 32A / 50,000 / 2.5mm²</li>
              <li>BS 88 Fuse / 32A / 8,000 / 1.5mm²</li>
              <li>MCCB / 63A / 150,000 / 4mm²</li>
              <li>MCCB / 100A / 300,000 / 6mm²</li>
            </ul>
            <p>
              <strong>Current-limiting devices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Trip before peak current reached</li>
              <li>Significantly reduce I²t let-through</li>
              <li>BS 88 HRC fuses are excellent limiters</li>
              <li>Some MCCBs have current-limiting features</li>
            </ul>
            <p>
              <strong>Factors affecting I²t:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher PSCC = faster operation = lower I²t</li>
              <li>Lower PSCC = slower operation = higher I²t</li>
              <li>Device type (fuse vs MCB vs MCCB)</li>
              <li>Device manufacturer and model</li>
            </ul>
            <p>
              <strong>Note:</strong> I²t values vary with prospective fault current. Always check
              manufacturer data for the actual installation PSCC.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Protective Device Coordination">
            <p>
              For complete protection, the cable's thermal withstand must exceed the protective
              device's let-through energy at all possible fault levels. This is verified using the
              k²S² ≥ I²t check.
            </p>
            <p>
              <strong>Verification process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine the prospective short-circuit current (PSCC) at the circuit origin</li>
              <li>Find the protective device I²t at this PSCC from manufacturer data</li>
              <li>Calculate cable k²S² using conductor size and k value</li>
              <li>Verify that k²S² ≥ I²t</li>
              <li>If not satisfied, increase cable size or use more current-limiting device</li>
            </ul>
            <p>
              <strong>Example verification:</strong> 32A MCB Type B protecting 4mm² Cu/PVC cable;
              PSCC at origin: 6kA; MCB I²t at 6kA (from data): 35,000 A²s; cable k²S² = 115² × 4²
              = <strong>211,600 A²s</strong>; check: 211,600 ≥ 35,000 — cable adequately
              protected.
            </p>
            <p>
              <strong>High fault level warning:</strong> Near main switchboards, PSCC can exceed
              20kA. At these levels:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I²t values increase significantly</li>
              <li>Small cables may not be adequately protected</li>
              <li>Use current-limiting fuses (BS 88) where possible</li>
              <li>Verify coordination carefully for sub-main cables</li>
            </ul>
            <p>
              <strong>Maximum disconnection time check:</strong> Alternatively, calculate the
              maximum time the cable can withstand a given fault current — t<sub>max</sub> = k²S²
              / I². The protective device must operate within this time at the given fault
              current.
            </p>
            <p>
              <strong>Design tip:</strong> Using XLPE cables (k=143) instead of PVC (k=115)
              provides approximately 55% more fault withstand margin.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — minimum cable size for MCB:</strong> An MCB has I²t = 45,000
              A²s. What is the minimum Cu/PVC cable size?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using S = √(I²t) / k</li>
              <li>S = √(45,000) / 115</li>
              <li>
                S = 212.1 / 115 = <strong>1.84mm²</strong>
              </li>
              <li>
                Next standard size up: <strong>2.5mm²</strong>
              </li>
              <li>Verify: k²S² = 115² × 2.5² = 82,656 A²s</li>
              <li>82,656 ≥ 45,000 — adequately protected</li>
            </ul>
            <p>
              <strong>Example 2 — maximum fault time:</strong> A 6mm² Cu/XLPE cable experiences a
              5kA fault. What is the maximum permissible disconnection time?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>k for Cu/XLPE = 143</li>
              <li>
                k²S² = 143² × 6² = 20,449 × 36 = <strong>736,164 A²s</strong>
              </li>
              <li>t = k²S² / I²</li>
              <li>t = 736,164 / 5000² = 736,164 / 25,000,000</li>
              <li>
                t = <strong>0.029s (29ms)</strong>
              </li>
              <li>Protective device must clear within 29ms at 5kA</li>
            </ul>
            <p>
              <strong>Example 3 — sub-main verification:</strong> 100A MCCB protects 25mm² Cu/PVC
              sub-main. PSCC = 15kA. I²t from data = 800,000 A²s. Is cable protected?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable k²S² = 115² × 25² = 13,225 × 625</li>
              <li>
                k²S² = <strong>8,265,625 A²s</strong>
              </li>
              <li>Check: 8,265,625 ≥ 800,000 — adequately protected (10× margin)</li>
              <li>Large margin allows for higher PSCC or different MCCB</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S = √(I²t) / k</strong> — minimum cable size
              </li>
              <li>
                <strong>k²S² ≥ I²t</strong> — protection verification
              </li>
              <li>
                <strong>t = k²S² / I²</strong> — maximum disconnection time
              </li>
              <li>
                <strong>I²t = I² × t</strong> — let-through energy
              </li>
            </ul>
            <p>
              <strong>Key k values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Copper/PVC: k = <strong>115</strong>
              </li>
              <li>
                Copper/XLPE: k = <strong>143</strong>
              </li>
              <li>
                Aluminium/PVC: k = <strong>76</strong>
              </li>
              <li>
                Steel conduit (as CPC): k = <strong>47</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong k value</strong> — must match actual conductor and insulation
                </li>
                <li>
                  <strong>Ignoring PSCC variation</strong> — I²t changes with fault level
                </li>
                <li>
                  <strong>Forgetting the CPC</strong> — protective conductor also needs verification
                </li>
                <li>
                  <strong>Using peak current</strong> — use RMS fault current in calculations
                </li>
              </ul>
            }
            doInstead="Always select the k value that matches the actual conductor metal and insulation type, look up I²t at the actual PSCC from manufacturer data rather than assuming a single value, run the adiabatic check on the CPC as well as the line conductor, and use RMS fault current (not peak) in every calculation."
          />

          <SectionRule />

          <Scenario
            title="Long sub-main with reduced CPC — adiabatic check on a small-CSA CPC"
            situation={
              <>
                A 70&nbsp;m sub-main runs from the main switchpanel to a remote DB. Live
                conductors are 50&nbsp;mm² Cu/XLPE. The CPC has been reduced to 25&nbsp;mm² Cu
                (Table 54.7 permits half-size CPC for 50&nbsp;mm² lives). Prospective earth-fault
                current at the DB calculated as 1.8&nbsp;kA. The 100&nbsp;A MCB upstream has a
                Type C characteristic with a 0.4&nbsp;s disconnection time at this fault level.
              </>
            }
            whatToDo={
              <>
                Apply Reg 434.5.2 adiabatic check on the 25&nbsp;mm² CPC: t = k²S² / I² = (143²
                × 25²) / 1800² = (20,449 × 625) / 3,240,000 ≈ 3.94&nbsp;s. The MCB clears in
                0.4&nbsp;s, so the CPC withstand (3.94&nbsp;s) easily exceeds the disconnection
                time. Pass. If the fault current dropped (longer cable, higher Z_s), recompute
                — the adiabatic check passes or fails on the prospective fault current that the
                cable actually sees at its origin. Document on the cable schedule.
              </>
            }
            whyItMatters={
              <>
                Reduced CPCs (Table 54.7) are common but they are the cable element most likely
                to fail an adiabatic check on long runs with modest fault currents. Reg 434.5.2
                makes the check mandatory. A failed check means upsizing the CPC or accepting
                a faster device — never just hoping it clears in time.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Adiabatic equation: t ≤ k²S² / I² — the maximum time the cable can carry the fault before exceeding its limiting temperature.',
              'k values (BS 7671 Table 43.1): Cu/PVC = 115, Cu/XLPE = 143, Al/PVC = 76, Al/XLPE = 94.',
              'Reg 434.5.2 is the regulatory anchor — protective device operating characteristic shall protect the load-side wiring against fault current.',
              'I²t (let-through energy) from the device data sheet — current-limiting fuses (HRC, gG) reduce I²t by an order of magnitude vs MCBs.',
              'Reduced-CSA CPCs (Table 54.7) are the most common adiabatic-check failures on long sub-mains — always verify, never assume.',
              'Verification = k²S² (cable withstand) ≥ I²t (device let-through) at the maximum prospective fault current at the cable origin.',
              'For three-phase: check both line-to-line and line-to-earth fault scenarios — the worst case drives the adiabatic.',
              'Document the adiabatic calculation on the cable schedule, including k, S, I_f and t — Part 6 verification audits this.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Thermal constraints
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Cable types and selection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_4;
