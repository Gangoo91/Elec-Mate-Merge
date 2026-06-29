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
    id: 'mod4-s1-dc-not-ac',
    question: 'Why does the insulation resistance test use DC and not AC?',
    options: [
      'DC reads the steady-state leakage as true resistance; AC would be dominated by cable capacitance',
      'AC becomes unsafe at the high test voltages required, whereas DC of the same magnitude is safe',
      'DC is cheaper and simpler to generate from the battery inside a portable tester than an AC supply',
      'The regulations permit only DC for the insulation test purely for operator electrical-safety reasons',
    ],
    correctIndex: 0,
    explanation:
      'A length of insulated cable behaves as a long capacitor. Under AC the capacitive reactance dominates and you read a value that reflects geometry, not insulation health. Under DC, the capacitance charges, the dielectric absorption decays, and what is left is the steady-state leakage current that gives R = V/I.',
  },
  {
    id: 'mod4-s1-table64',
    question:
      'A 230 V lighting circuit is being tested. What test voltage and minimum acceptance does Reg 643.3.2 / Table 64 require?',
    options: [
      '250 V DC, minimum 0.5 MΩ',
      '500 V DC, minimum 0.5 MΩ',
      '1000 V DC, minimum 1.0 MΩ',
      '500 V DC, minimum 1.0 MΩ',
    ],
    correctIndex: 3,
    explanation:
      'Table 64 row 2: circuits up to and including 500 V (other than SELV/PELV) — test at 500 V DC, minimum 1.0 MΩ. A 230 V lighting circuit sits in this row.',
  },
  {
    id: 'mod4-s1-floor-not-target',
    question:
      'You measure a 230 V circuit and get 1.2 MΩ at 500 V DC. The Table 64 minimum is 1.0 MΩ. What is the right action?',
    options: [
      'Record it as a clean pass and move on, since 1.2 MΩ is above the 1.0 MΩ minimum',
      'Fail the circuit outright, because a reading this close to the minimum cannot be accepted',
      'Treat the minimum as a floor — 1.2 MΩ is poor for healthy cable, so investigate the cause',
      'Re-test at 1000 V DC to confirm the reading, since the higher voltage gives a better figure',
    ],
    correctIndex: 2,
    explanation:
      'GN3 Ch 2 frames Table 64 minimums as the floor below which the test fails outright, not as a target. A reading within an order of magnitude of the floor is a deteriorated-cable signal. Investigate before recording — disconnect connected equipment, dry damp accessories, clean contaminated surfaces, then re-test.',
  },
  {
    id: 'mod4-s1-a4-redraft',
    question:
      'A4:2026 redrafted Reg 643.3.3. After equipment is reconnected, what test is now explicitly required?',
    options: [
      'A 250 V DC test between live conductors and the protective conductor, minimum 1 MΩ',
      'A repeat of the full Table 64 test at 500 V DC, now with all the equipment connected',
      'A separate continuity test on the protective conductor of each piece of connected equipment',
      'No further test — the Table 64 step performed before reconnection is sufficient on its own',
    ],
    correctIndex: 0,
    explanation:
      'The A4 redraft codifies the two-step approach: Table 64 voltage with current-using equipment disconnected (cable alone), then 250 V DC after connection between live conductors and the protective conductor with a 1 MΩ minimum. The 250 V step is the new explicit clarification.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is insulation resistance actually a measurement OF, and why is the test conducted with DC rather than AC?',
    options: [
      'The high resistance of the insulation between live conductors and earth, read as DC leakage',
      'The resistance of the conductor itself, measured with AC for accuracy at the test frequency',
      'The AC impedance of the cable, combining its resistance and reactance into one value',
      'The earth fault loop impedance of the circuit, derived from a rectified AC measurement',
    ],
    correctAnswer: 0,
    explanation:
      'Insulation resistance is the resistance offered by the insulation between conductors that should be electrically isolated from each other and from earth. A DC test voltage is applied and the steady-state leakage current is read; resistance = V/I. DC is used because cable capacitance would otherwise dominate an AC measurement and mask the true insulation property.',
  },
  {
    id: 2,
    question:
      'Reg 643.3.2 (Table 64) sets minimum insulation resistance values. What are they for SELV/PELV, for circuits up to 500 V, and for circuits above 500 V?',
    options: [
      'A single value of 1 MΩ for every circuit, regardless of voltage or whether it is SELV/PELV',
      'SELV/PELV: 1 MΩ; up to 500 V: 2 MΩ; above 500 V: 5 MΩ, tested at the nominal circuit voltage',
      'Reg 643.3.2 sets the test voltages but leaves the minimum acceptance values to GN3',
      'SELV/PELV: 0.5 MΩ at 250 V DC; up to 500 V: 1.0 MΩ at 500 V DC; above 500 V: 1.0 MΩ at 1000 V DC',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 in Reg 643.3.2: SELV and PELV — 250 V DC, minimum 0.5 MΩ. Circuits up to and including 500 V (other than SELV/PELV) — 500 V DC, minimum 1.0 MΩ. Circuits above 500 V — 1000 V DC, minimum 1.0 MΩ.',
  },
  {
    id: 3,
    question:
      'A4:2026 redrafted Reg 643.3.3. What is the headline change in the test procedure when connected equipment may be damaged or may influence the test?',
    options: [
      'No change — the test stays at 500 V DC throughout, before and after equipment connection',
      'The insulation resistance test is omitted entirely where vulnerable equipment is connected',
      'A 250 V DC test is applied AFTER connection of equipment, between live conductors and the protective conductor, with a minimum acceptance value of 1 MΩ',
      'A 1000 V AC test is now required to verify the insulation with equipment connected',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.3.3 (A4 redraft) clarifies the post-connection step. The Table 64 voltage (typically 500 V DC) is applied PRIOR to connection of vulnerable equipment. AFTER connection, a 250 V DC test is applied between live conductors and the protective conductor, with a minimum acceptance of 1 MΩ. The 250 V step is the new clarified requirement.',
  },
  {
    id: 4,
    question:
      'Why is a 250 V DC test used for the post-connection step rather than just continuing at 500 V DC?',
    options: [
      'Because 500 V DC can damage connected electronics (LED drivers, SPDs, dimmers); 250 V is gentler',
      'Because a 250 V DC test is inherently more accurate than 500 V at reading insulation resistance',
      'Because the cable insulation itself cannot withstand 500 V DC once equipment is connected to it',
      'For consistency with EU standards that mandate 250 V DC for all post-connection testing',
    ],
    correctAnswer: 0,
    explanation:
      'Connected equipment — particularly switched-mode power supplies, LED drivers, surge protective devices (which clamp at much lower voltages), and dimmers — can be damaged by a 500 V DC test or can themselves distort the result. 250 V DC is a controlled stress that does not damage modern equipment while still revealing gross insulation breakdown. The acceptance of 1 MΩ at 250 V is the new explicit threshold.',
  },
  {
    id: 5,
    question:
      'A 230 V circuit reads insulation resistance of 0.7 MΩ at 500 V DC. What does Table 64 say, and what is the next step?',
    options: [
      'Pass — anything above 0.5 MΩ is acceptable for a low-voltage final circuit',
      'Pass, with a schedule note recording the relatively low value for future comparison',
      'The insulation resistance test does not apply to 230 V final circuits in this way',
      'Fail — 0.7 MΩ is below the 1 MΩ minimum; disconnect equipment and re-test the cable',
    ],
    correctAnswer: 3,
    explanation:
      "Table 64 sets 1.0 MΩ as the minimum at 500 V DC for circuits up to and including 500 V. 0.7 MΩ is below the minimum. Reg 643.3.3 NOTE recognises that connected equipment may influence the result — so the immediate next step is to confirm the test was performed with current-using equipment disconnected (per Reg 643.3.2's 'all final circuits connected but with current-using equipment disconnected'). Re-test if needed before condemning.",
  },
  {
    id: 6,
    question:
      'Insulation resistance and continuity are both resistance measurements. What is the fundamental practical difference between them?',
    options: [
      'There is no fundamental difference; both are resistance readings on the same instrument',
      'Continuity uses an AC test current while insulation resistance uses DC — the key distinction',
      'Continuity reads low resistance of an intended path; insulation reads high resistance of isolation',
      'Insulation resistance is done on live circuits while continuity is done on dead circuits',
    ],
    correctAnswer: 2,
    explanation:
      "Continuity is a low-resistance test — typical R1+R2 values are tenths of an ohm — and uses a meter that pushes enough current to reveal poor terminations. Insulation resistance is a high-resistance test — typical good values are tens to hundreds of MΩ — performed by applying a known DC voltage and measuring the tiny leakage current that flows. The instruments are different, the orders of magnitude are different, and what they're each diagnosing is different.",
  },
  {
    id: 7,
    question:
      'You measure a circuit and get an initial high reading that drops over the first few seconds before stabilising. What is the likely explanation?',
    options: [
      'The cable charges like a capacitor; let it settle and record the steady-state reading',
      'A faulty meter is giving an unstable reading and should be replaced before continuing',
      'A real fault is developing in the cable and the circuit should be failed immediately',
      'The reading is unreliable whenever it changes during the test and should be discarded',
    ],
    correctAnswer: 0,
    explanation:
      'A cable is a long capacitor with the conductor as one plate, the insulation as the dielectric, and earth (or the other conductor) as the other plate. When you apply DC, an initial charging current flows and the resistance reading appears low; as the dielectric polarises, the current decays and the reading rises to its steady-state value. Wait for the reading to stabilise — typical dwell time is the duration the meter applies the test voltage automatically.',
  },
  {
    id: 8,
    question:
      'A low insulation resistance is measured on a circuit that has heaters and SPDs connected. Before condemning the cable, what is the procedural sequence per Reg 643.3.3?',
    options: [
      'Condemn the cable straight away, since the low reading proves the insulation has failed',
      'Re-apply the test at 1000 V DC, the higher voltage giving a more reliable insulation figure',
      'Skip the insulation test on this circuit because the connected SPDs make it unreliable',
      'Test the cable alone at Table 64 voltage, then 250 V DC ≥ 1 MΩ with equipment reconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.3.2 reads the Table 64 test as performed with all final circuits connected but with current-using equipment disconnected. Reg 643.3.3 then specifies that AFTER connection of equipment likely to influence or be damaged by the test, a 250 V DC test between live conductors and the protective conductor is applied, with a minimum 1 MΩ acceptance. The two-step approach — full Table 64 voltage on the cable alone, then 250 V DC with equipment back in — is what the A4 redraft codifies.',
  },
  {
    id: 9,
    question:
      'A circuit reads infinite (open) on the insulation resistance test. What does this MEAN for that circuit, and is it the result you want?',
    options: [
      'It is a fail and the circuit should be re-tested, because no genuine reading was obtained',
      'It means the cable conductor is broken (an open circuit) somewhere along its length',
      'It is the ideal result — no measurable leakage; record the meter ceiling (e.g. > 999 MΩ)',
      'It indicates a faulty meter that has lost its connection to the circuit under test',
    ],
    correctAnswer: 2,
    explanation:
      "Infinite is the goal. A perfect insulator allows zero leakage current at any DC voltage, which the meter reports as 'beyond range' or '> 999 MΩ'. Record the upper-range value on the schedule (most testers will store this as a numeric ceiling). The test is asking the question 'how good is the insulation?'; an off-the-scale-good answer is exactly what compliant cable should deliver.",
  },
  {
    id: 10,
    question:
      'You test a cable circuit and get 5 MΩ at 500 V DC. The reading is above the 1 MΩ Table 64 minimum, so you record it as a pass. Two weeks later the cable develops a phase-to-earth fault. What does the reading have told you that you missed?',
    options: [
      '5 MΩ passes the floor but is far below a healthy cable — deteriorating insulation to investigate',
      'Nothing — the reading was a clear pass against the Table 64 minimum and gave no useful warning',
      'The meter was reading wrongly, and a correctly calibrated instrument would have shown a fault',
      'You should have tested at 1000 V DC, which would have revealed the impending phase-to-earth fault',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Ch 2 frames Table 64 minimums as the FLOOR, not a target. A healthy thermoplastic insulated cable in dry conditions typically reads in the hundreds of MΩ range. 5 MΩ is technically a pass but is symptomatically poor — the cable is on a degradation curve. A pass without context is a record-and-forget; a pass with context flags the circuit for monitoring or remediation.',
  },
];

const InspectionTestingModule4Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Principles of insulation testing | I&T Module 4.1 | Elec-Mate',
    description:
      'Reg 643.3 framework: what insulation is and what fails it, the 500 V DC test concept, leakage current vs cable capacitance, Table 64 minimums, and the Reg 643.3.3 A4:2026 redraft (250 V DC after equipment connection, ≥ 1 MΩ).',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1"
            title="Principles of insulation testing"
            description="Reg 643.3, Table 64 and the A4:2026 redraft of 643.3.3. What insulation actually is, what fails it, why the test is DC, and how the 250 V/500 V/1000 V test voltages map to circuit type."
            tone="yellow"
          />

          <TLDR
            points={[
              'Insulation resistance is the resistance offered by cable insulation BETWEEN conductors that should be electrically isolated — live to earth, line to neutral, line to line. The test applies a known DC voltage and measures the tiny leakage current that flows: resistance = V / I.',
              'Reg 643.3.2 + Table 64 sets the test voltages and minimum values. SELV/PELV → 250 V DC, ≥ 0.5 MΩ. Up to and including 500 V → 500 V DC, ≥ 1.0 MΩ. Above 500 V → 1000 V DC, ≥ 1.0 MΩ.',
              'A4:2026 redrafted Reg 643.3.3. Where connected equipment may be damaged or influence the test, the Table 64 test is applied PRIOR to connection (cable alone). AFTER connection, a 250 V DC test between live conductors and the protective conductor verifies ≥ 1 MΩ. The 250 V step is the explicit A4 clarification.',
              'DC, not AC. AC measurements would be dominated by cable capacitance — the cable acts like a long capacitor, with the conductor as one plate, insulation as the dielectric and earth as the other plate. DC settles to a steady-state leakage current that reads the resistance, not the reactance.',
              'A low IR is not always a fault. Connected equipment, surface contamination, moisture, parallel-loaded equipment all reduce the reading. Investigate the CAUSE before condemning the cable. Reg 643.3.3 NOTE explicitly anticipates this.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define insulation resistance as a measurement of leakage current under applied DC voltage, and contrast it with continuity (which measures conductor resistance)',
              'State the Table 64 test voltages and minimum acceptance values for each circuit type, and apply them on site without ambiguity',
              'Explain the A4:2026 redraft of Reg 643.3.3 — why the 250 V DC step was added, when it applies, and what the 1 MΩ post-connection acceptance means',
              'Describe the cable-as-capacitor model and explain why initial charging current decays to a steady-state leakage current, and why dwell time matters',
              'Identify the four common reasons for a low IR reading that are not cable defects (connected equipment, moisture, surface contamination, parallel loads), and the procedural steps to discriminate',
              'Recognise that Table 64 minimums are the floor, not the target — a healthy cable reads orders of magnitude above the minimum, and a near-minimum pass is a deteriorating-cable signal',
              'Know how the test fits the wider Reg 643 sequence and how its result is recorded on the A4:2026 Schedule of Test Results',
            ]}
          />

          <ContentEyebrow>What insulation actually is — and what fails it</ContentEyebrow>

          <ConceptBlock
            title="Insulation is the boundary between conductors that should not touch"
            plainEnglish="Every cable in an installation has a conductor that should carry current and an insulating sheath that should keep that current confined. Insulation resistance tests verify the sheath is doing its job — it is high-resistance enough that practically no current leaks from the conductor to anything else."
            onSite="Think of it as the inverse of a continuity test. Continuity asks &lsquo;is the path I want low-resistance enough?&rsquo;. Insulation resistance asks &lsquo;is the boundary I want HIGH-resistance enough?&rsquo;. Same instrument family, opposite direction."
          >
            <p>
              An ideal insulator has infinite resistance — no current leaks across it at any applied
              voltage. Real insulators (PVC, XLPE, EPR, mineral) have very high but finite
              resistance, typically in the hundreds of megohms to gigohms range when new and dry.
              The test measures how close to ideal the real insulation is.
            </p>
            <p>Insulation fails by four mechanisms, and the IR test reveals all of them:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mechanical damage.</strong> A cable nicked by a screw, a sheath cut by metal
                swarf, a conductor compressed under a clip until the insulation cold-flows. The
                conductor is exposed to a path it should not have.
              </li>
              <li>
                <strong>Thermal damage.</strong> Insulation cooked by sustained overload, by a
                high-resistance joint heating from within, or by external heat (cable in a hot cable
                run, insulation behind a halogen luminaire). Polymer chains break down, resistance
                drops.
              </li>
              <li>
                <strong>Moisture ingress.</strong> Water sitting in a junction box, condensation
                inside an outdoor enclosure, water tracking along a cable in a flooded duct. Water
                itself has measurable conductivity, especially with dissolved minerals.
              </li>
              <li>
                <strong>Surface contamination.</strong> Conductive dust, salts, carbon deposits from
                arcing, oil films. Insulation may be intact but the surface across it provides a
                parallel low-resistance path.
              </li>
            </ul>
            <p>
              Each of these reduces the measured insulation resistance below the value a healthy
              cable would deliver. The test does not tell you WHICH mechanism is at work — that is
              the inspector&rsquo;s diagnostic job — but a low reading reliably tells you that one
              or more of them is.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.2"
            clause={
              <>
                The insulation resistance measured with the test voltages indicated in Table 64
                shall be considered satisfactory if the main switchboard and each distribution
                circuit tested separately, with all its final circuits connected but with
                current-using equipment disconnected, has an insulation resistance not less than the
                appropriate value given in Table 64.
              </>
            }
            meaning="Acceptance is the Table 64 minimum value at the Table 64 test voltage, with all final circuits connected but with current-using equipment disconnected. The phrase &lsquo;current-using equipment disconnected&rsquo; is the gate — anything that draws current under normal operation comes out of the test path before the measurement."
          />

          <SectionRule />

          <ContentEyebrow>The DC test concept</ContentEyebrow>

          <ConceptBlock
            title="Why the test is DC, not AC"
            plainEnglish="A length of insulated cable is electrically a long thin capacitor. The conductor is one plate, the insulation is the dielectric, and earth (or the other conductor) is the other plate. Apply AC and the cable's capacitance dominates — the meter reads reactance, not resistance. Apply DC and once the capacitance has charged, the only current that can flow is the tiny leakage current through the insulation itself. Resistance = applied voltage / steady-state leakage current."
            onSite="This is why an insulation tester is sometimes called a &lsquo;megger&rsquo; — the original instruments were branded Megger and the name stuck. The instrument generates the DC test voltage internally (typically from a battery + DC-DC converter), applies it across the conductor and earth, and reads the leakage current to compute resistance in megohms."
          >
            <p>Three consequences of using DC follow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Initial charging current.</strong> When the test voltage is first applied, a
                charging current flows that has nothing to do with insulation resistance — it is
                purely the cable&rsquo;s capacitance charging. The reading appears low, then rises
                as the dielectric polarises. Wait for it to stabilise before recording.
              </li>
              <li>
                <strong>Discharge after the test.</strong> When the test ends, the cable holds the
                test voltage as a stored charge — a 100 m run of T&amp;E at 500 V DC can hold enough
                charge to give a noticeable shock. Modern testers automatically discharge through an
                internal resistor at the end of the test; do not assume this on older instruments
                and never disconnect probes from a tested cable without confirming the discharge.
              </li>
              <li>
                <strong>Polarity.</strong> The test is between two specified conductors (e.g. line
                and earth, or live conductors and protective conductor). Polarity of the applied DC
                matters less than that the test points are correct — but the cable does see a
                polarity-dependent stress, and consistent polarity across periodic inspections makes
                deterioration tracking easier.
              </li>
            </ul>
          </ConceptBlock>

          {/* Insulation tester schematic */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The IR test — DC source, leakage current, two cable scenarios
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Schematic of an insulation resistance test. A DC test voltage source applies its voltage between a conductor and earth. In a healthy cable, the leakage current is tiny and the measured resistance is high. In a compromised cable with damaged insulation, more leakage current flows and the measured resistance is low. The instrument computes resistance equals voltage divided by current."
            >
              {/* IR Tester block */}
              <rect
                x="40"
                y="60"
                width="180"
                height="120"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="130"
                y="84"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                IR TESTER
              </text>
              <text x="130" y="102" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                500 V DC source
              </text>
              <text x="130" y="120" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                R = V / I
              </text>
              {/* terminals */}
              <circle cx="80" cy="160" r="5" fill="#EF4444" />
              <text x="80" y="178" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                + (L)
              </text>
              <circle cx="180" cy="160" r="5" fill="#22C55E" />
              <text x="180" y="178" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                − (E)
              </text>

              {/* Healthy cable scenario top */}
              <text
                x="500"
                y="50"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                HEALTHY CABLE — high IR
              </text>
              <rect
                x="280"
                y="70"
                width="440"
                height="90"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.4"
              />
              {/* conductor */}
              <line x1="300" y1="100" x2="700" y2="100" stroke="#EF4444" strokeWidth="3" />
              <text x="320" y="92" fill="#EF4444" fontSize="9" fontWeight="bold">
                L conductor
              </text>
              {/* insulation visualisation */}
              <rect
                x="300"
                y="105"
                width="400"
                height="14"
                fill="rgba(255,255,255,0.10)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
              <text x="500" y="116" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                INSULATION (intact, no defects)
              </text>
              {/* earth path */}
              <line x1="300" y1="135" x2="700" y2="135" stroke="#22C55E" strokeWidth="3" />
              <text x="320" y="152" fill="#22C55E" fontSize="9" fontWeight="bold">
                Earth
              </text>
              {/* tiny leakage arrow */}
              <line
                x1="500"
                y1="103"
                x2="500"
                y2="132"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text x="510" y="122" fill="rgba(34,197,94,0.8)" fontSize="9">
                tiny I
              </text>
              {/* result */}
              <text
                x="500"
                y="155"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                Reading: &gt; 999 MΩ (off scale, ideal)
              </text>

              {/* Connection lines from tester to healthy cable */}
              <line x1="80" y1="160" x2="80" y2="100" stroke="#EF4444" strokeWidth="1.6" />
              <line
                x1="80"
                y1="100"
                x2="300"
                y2="100"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="3,3"
              />
              <line x1="180" y1="160" x2="180" y2="135" stroke="#22C55E" strokeWidth="1.6" />
              <line
                x1="180"
                y1="135"
                x2="300"
                y2="135"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="3,3"
              />

              {/* Compromised cable scenario bottom */}
              <text
                x="500"
                y="220"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="12"
                fontWeight="bold"
              >
                COMPROMISED CABLE — low IR
              </text>
              <rect
                x="280"
                y="240"
                width="440"
                height="90"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <line x1="300" y1="270" x2="700" y2="270" stroke="#EF4444" strokeWidth="3" />
              <text x="320" y="262" fill="#EF4444" fontSize="9" fontWeight="bold">
                L conductor
              </text>
              {/* damaged insulation */}
              <rect
                x="300"
                y="275"
                width="400"
                height="14"
                fill="rgba(239,68,68,0.10)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
              <text x="500" y="286" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                INSULATION (mechanical damage / moisture / contamination)
              </text>
              {/* multiple leakage arrows */}
              <line x1="380" y1="273" x2="380" y2="302" stroke="#EF4444" strokeWidth="1.5" />
              <polygon points="380,302 376,294 384,294" fill="#EF4444" />
              <line x1="500" y1="273" x2="500" y2="302" stroke="#EF4444" strokeWidth="1.5" />
              <polygon points="500,302 496,294 504,294" fill="#EF4444" />
              <line x1="620" y1="273" x2="620" y2="302" stroke="#EF4444" strokeWidth="1.5" />
              <polygon points="620,302 616,294 624,294" fill="#EF4444" />
              <text
                x="500"
                y="298"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                significant leakage current
              </text>
              <line x1="300" y1="305" x2="700" y2="305" stroke="#22C55E" strokeWidth="3" />
              <text x="320" y="322" fill="#22C55E" fontSize="9" fontWeight="bold">
                Earth
              </text>
              <text
                x="500"
                y="325"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Reading: 0.7 MΩ — fail (Table 64 min = 1 MΩ at 500 V DC)
              </text>

              {/* Connection lines tester to compromised cable */}
              <line
                x1="80"
                y1="180"
                x2="80"
                y2="270"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="2,2"
                opacity="0.4"
              />
              <line
                x1="80"
                y1="270"
                x2="300"
                y2="270"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              <line
                x1="180"
                y1="180"
                x2="180"
                y2="305"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="2,2"
                opacity="0.4"
              />
              <line
                x1="180"
                y1="305"
                x2="300"
                y2="305"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="3,3"
                opacity="0.4"
              />

              {/* Bottom legend */}
              <rect
                x="40"
                y="360"
                width="720"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="382"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                The instrument applies a known DC voltage and measures the steady-state leakage
                current.
              </text>
              <text x="400" y="402" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                R = V / I. A healthy cable: tiny I → MΩ in the hundreds or above. A compromised
                cable: more I → MΩ drops.
              </text>
              <text x="400" y="420" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Cable capacitance charges first; the steady-state reading after dwell is the true
                insulation resistance.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Table 64 — the test voltages and minimums</ContentEyebrow>

          <ConceptBlock
            title="Three rows on Table 64, three test voltages, three acceptance floors"
            plainEnglish="Reg 643.3.2 publishes Table 64. The test voltage is selected by the circuit's nominal voltage, not by the meter's most aggressive setting. The minimum acceptance is in megohms — anything below that minimum is a fail at Table 64 even before equipment-influence considerations are applied."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Circuit nominal voltage</th>
                    <th className="text-center text-white/80 py-2">Test voltage (DC)</th>
                    <th className="text-center text-elec-yellow py-2">Minimum IR (MΩ)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SELV and PELV</td>
                    <td className="text-center">250 V</td>
                    <td className="text-center text-elec-yellow">0.5</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Up to and including 500 V (other than SELV/PELV)</td>
                    <td className="text-center">500 V</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                  <tr>
                    <td className="py-2">Above 500 V</td>
                    <td className="text-center">1000 V</td>
                    <td className="text-center text-elec-yellow">1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Three judgement points the table does NOT spell out:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The minimum is a FLOOR. A healthy cable typically reads orders of magnitude higher
                than the minimum — tens to hundreds of MΩ for a domestic radial in dry conditions. A
                reading just above the minimum is a deteriorating-cable signal, not a comfortable
                pass.
              </li>
              <li>
                FELV circuits are tested at the same test voltage as the primary side of the source,
                and must meet all the test requirements for low-voltage circuits (per Reg 643.3.2
                wording). FELV is not the SELV/PELV row — read carefully.
              </li>
              <li>
                Table 64 is also applied when verifying insulation resistance between non-earthed
                protective conductors and Earth (per the closing sentence of 643.3.2) — relevant for
                IT systems and certain bonded-but-not-earthed configurations.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.2 — Table 64"
            clause={
              <>
                Table 64 — Minimum values of insulation resistance. SELV and PELV: test voltage 250
                V DC, minimum insulation resistance 0.5 MΩ. Up to and including 500 V with the
                exception of the above systems: test voltage 500 V DC, minimum insulation resistance
                1.0 MΩ. Above 500 V: test voltage 1000 V DC, minimum insulation resistance 1.0 MΩ.
                Table 64 shall be applied when verifying insulation resistance between non-earthed
                protective conductors and Earth. FELV circuits shall be tested at the same test
                voltage as that applied to the primary side of the source and shall meet all the
                test requirements for low voltage circuits.
              </>
            }
            meaning="Three rows, three test voltages, two minimum values. The minimum is the FLOOR for a satisfactory test, not a target. A healthy cable reads orders of magnitude higher. A reading just above the floor is the cable telling you it has begun to deteriorate."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The A4:2026 redraft of Reg 643.3.3</ContentEyebrow>

          <ConceptBlock
            title="Why 643.3.3 was redrafted — and what changed"
            plainEnglish="Modern installations contain a lot of vulnerable electronics. LED drivers, dimmers, electronic transformers, switched-mode PSUs, surge protective devices (SPDs). A 500 V DC test can damage these or be distorted by them. The pre-A4 wording left ambiguity about how to test once equipment was reconnected. A4:2026 redrafted Reg 643.3.3 to spell out a two-step approach explicitly."
            onSite="Read 643.3.3 with 643.3.2 next to it. 643.3.2 is the cable-alone test (or with the cable plus its connected wiring but without current-using equipment). 643.3.3 is what you do when the equipment that had to be disconnected for the cable test is plugged back in — the 250 V DC step."
          >
            <p>The two-step procedure A4 codifies:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Step 1 — cable alone, Table 64 voltages.</strong> With current-using
                equipment disconnected (per 643.3.2), apply the Table 64 test voltage for the
                circuit type — typically 500 V DC for a 230 V circuit. Verify ≥ 1.0 MΩ. The cable,
                its accessories and any directly-wired non-vulnerable apparatus form the test scope.
              </li>
              <li>
                <strong>Step 2 — equipment connected, 250 V DC.</strong> Reconnect equipment that
                was disconnected for step 1. Apply 250 V DC between live conductors and the
                protective conductor connected to the earthing arrangement. Verify ≥ 1.0 MΩ. The 250
                V controlled stress is low enough to spare the equipment but high enough to reveal
                gross insulation breakdown.
              </li>
            </ol>
            <p>
              The 1 MΩ acceptance applies in both steps. Manufacturer&rsquo;s instructions may still
              recommend disconnecting some equipment even at 250 V — Reg 643.3.3 NOTE acknowledges
              this — and you must follow those instructions where they exist. SPDs are a particular
              case: most data sheets ask for SPD disconnection during IR testing because the
              clamping diodes start conducting at much lower voltages than 250 V DC.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3"
            clause={
              <>
                Where connected equipment is likely to influence the measurement or result of the
                test, or be damaged, the test shall be applied prior to the connection of such
                equipment, in accordance with Table 64. Following connection of the equipment, a
                test at 250 V DC shall be applied between live conductors and the protective
                conductor connected to the earthing arrangement. The insulation resistance shall
                have a value of at least 1 MΩ. NOTE: Manufacturer&rsquo;s instructions may recommend
                some equipment to be disconnected during 250 V DC insulation resistance tests as it
                may influence the results of the test.
              </>
            }
            meaning="Two tests, in sequence. First the Table 64 voltage on the cable with vulnerable equipment removed. Then 250 V DC after the equipment is reconnected, between live conductors and the protective conductor, with a 1 MΩ minimum. The 250 V step is the new explicit clarification — the previous wording left this implicit and inspectors interpreted it inconsistently."
          />

          <Scenario
            title="A new lighting circuit with LED drivers — applying the two-step procedure"
            situation="A new commercial lighting circuit with 24 LED drivers connected. The cable is 1.5 mm² T&E from a 6 A B-curve MCB. SPDs are fitted at the consumer unit. You need to verify insulation resistance per Reg 643.3.2 and Reg 643.3.3."
            whatToDo={
              <>
                <span className="block">
                  Step 1 (cable alone, 500 V DC): isolate the circuit at the MCB. Disconnect each
                  LED driver at the luminaire — the connector blocks at the driver are the test
                  boundary. SPDs at the consumer unit also disconnected per the SPD
                  manufacturer&rsquo;s data sheet. Apply 500 V DC between L+N to E and L to N.
                  Verify ≥ 1 MΩ for each test (typical reading on a new dry circuit is several
                  hundred MΩ).
                </span>
                <span className="block">
                  Step 2 (equipment back, 250 V DC): reconnect the LED drivers and the SPDs. Apply
                  250 V DC between L+N (linked) and the protective conductor connected to the
                  earthing arrangement. Verify ≥ 1 MΩ. This is the post-connection acceptance test
                  required by the A4 redraft of 643.3.3.
                </span>
                <span className="block">
                  Record both results on the Schedule of Test Results — the 500 V DC reading from
                  step 1 in the IR column, and a comment noting the 250 V DC post-connection test
                  was performed and met 1 MΩ. The audit trail demonstrates A4:2026 compliance.
                </span>
              </>
            }
            whyItMatters="Skipping step 2 misses any insulation issue introduced by the connection of equipment — including a driver with a damaged input filter, an SPD that has degraded, or a luminaire wiring fault that only manifests once the driver is plugged in. Skipping step 1 risks damaging the drivers with a 500 V DC pulse. Both steps together is what the regulation now explicitly requires."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Insulation resistance vs continuity — same family, different question
          </ContentEyebrow>

          <ConceptBlock
            title="Two resistance measurements pointing in opposite directions"
            plainEnglish="A low-resistance ohmmeter (continuity) and an insulation resistance tester are both measuring resistance, but at different orders of magnitude and with different objectives. Mixing them up — or using the wrong one — is a common procedural error."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Aspect</th>
                    <th className="text-left text-white/80 py-2">Continuity (Reg 643.2)</th>
                    <th className="text-left text-elec-yellow py-2">
                      Insulation resistance (Reg 643.3)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">What is measured</td>
                    <td>Conductor resistance (intended path)</td>
                    <td className="text-elec-yellow">
                      Insulation resistance (between conductors that should be isolated)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Test voltage</td>
                    <td>Low (typically a few volts DC)</td>
                    <td className="text-elec-yellow">250 V / 500 V / 1000 V DC per Table 64</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Test current</td>
                    <td>Up to ~200 mA per BS EN 61557-4</td>
                    <td className="text-elec-yellow">Microamp leakage current</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Typical good result</td>
                    <td>0.1–1.0 Ω</td>
                    <td className="text-elec-yellow">
                      Tens to hundreds of MΩ (often beyond range)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Acceptance reference</td>
                    <td>Calculated from cable data ± 10 %</td>
                    <td className="text-elec-yellow">Table 64 minimum (floor, not target)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Question being asked</td>
                    <td>Is the path I want low-R enough?</td>
                    <td className="text-elec-yellow">Is the boundary I want HIGH-R enough?</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The same multifunction tester usually does both — but with different ranges, different
              test voltages, and a clear selector for which test you are doing. Press the wrong
              button and you can apply 500 V DC to a continuity probe (damaging the tester) or push
              200 mA through an insulation tester probe (damaging nothing but giving you a useless
              reading).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Why a low IR reading is not always a fault</ContentEyebrow>

          <ConceptBlock
            title="The four common causes of a low IR reading that are not cable defects"
            plainEnglish="Low IR doesn't always mean broken insulation. Connected equipment, moisture, surface contamination and parallel-loaded equipment can all reduce the reading without there being any cable fault. Investigate the cause before condemning the cable."
            onSite="Reg 643.3.3 NOTE explicitly anticipates this: &lsquo;Manufacturer&rsquo;s instructions may recommend some equipment to be disconnected during 250 V DC insulation resistance tests as it may influence the results of the test.&rsquo; The note is in the regulation precisely because false-low readings are common in modern installations."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Connected equipment.</strong> Switched-mode PSUs, electronic dimmers, EMC
                filters, RFI suppressors, motor windings, transformer windings — all of these have
                an internal path to earth via Y-capacitors or the winding insulation that reads as
                parallel resistance during an IR test. Disconnect, re-test on the cable alone, and
                the reading typically rises to its true value.
              </li>
              <li>
                <strong>Moisture.</strong> A junction box that has taken on water, a luminaire with
                condensation, an outdoor enclosure with a defective gland. Water across an
                insulation surface gives a measurable conductive path. Dry the affected area,
                re-test, and watch the reading recover. If it doesn&rsquo;t, the cable or
                termination has absorbed moisture and is on a deterioration trajectory.
              </li>
              <li>
                <strong>Surface contamination.</strong> Carbon deposits from a previous arc,
                conductive dust on terminal blocks, dirt or oil on accessory faces. The insulation
                itself may be intact, but the surface across it provides a parallel low-resistance
                path. Clean and re-test.
              </li>
              <li>
                <strong>Surge protective devices (SPDs).</strong> SPDs by design conduct above a
                clamping voltage. Some types start to conduct at well below 500 V DC — and even at
                250 V DC, certain MOV-based SPDs can show measurable leakage. Most SPD data sheets
                specify disconnection during IR testing. Follow the manufacturer instructions and
                document the disconnection in comments.
              </li>
            </ul>
            <p>
              The procedural fix in every case is the same: disconnect the suspected cause, re-test,
              and observe whether the reading recovers. If it recovers to a healthy value (orders of
              magnitude above the Table 64 minimum), the cause was the connected equipment /
              moisture / contamination, not the cable insulation. If it does not recover, the cable
              insulation itself is degraded.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the Table 64 minimum as a target rather than a floor"
            whatHappens="An inspector tests a 230 V circuit, gets 1.2 MΩ at 500 V DC, and records it as a pass — &lsquo;above the 1 MΩ minimum&rsquo;. Six months later the circuit develops a phase-to-earth fault. The 1.2 MΩ reading was technically above the minimum, but a healthy cable in dry conditions reads in the hundreds of MΩ. 1.2 MΩ was a cable already deep into deterioration — the pass on Table 64 disguised an installation that was weeks away from failing."
            doInstead="Read Table 64 minimums as the absolute floor below which the test fails outright. Compare the actual reading to a healthy-cable expectation (hundreds of MΩ for thermoplastic in dry conditions, tens of MΩ even in damp environments). Anything within an order of magnitude of the Table 64 minimum is a degraded-cable signal. Investigate the cause and either remediate or flag for early re-inspection."
          />

          <CommonMistake
            title="Forgetting to discharge cable capacitance after the test"
            whatHappens="A 100 m run of T&E has been tested at 500 V DC. The inspector unclips the test leads and walks away. The cable holds the test voltage as a stored charge — there is no path for it to discharge. The next person to touch the conductors at the far end gets a noticeable shock; on a longer run with greater capacitance, the shock can be uncomfortable or dangerous."
            doInstead="Modern testers automatically discharge the cable through an internal resistor at the end of the test — the displayed reading drops as the cable discharges, and the meter typically shows &lsquo;discharging&rsquo; or holds the probes connected for a few seconds. Wait for this. Older instruments may not have automatic discharge — short the conductor to earth manually with a discharge wand or insulated screwdriver before disconnecting probes. Never assume."
          />

          <CommonMistake
            title="Applying 500 V DC to a circuit with SELV equipment connected"
            whatHappens="A 12 V DC LED strip is connected via a 230 V/12 V driver. The inspector tests the 230 V circuit at 500 V DC with the driver still plugged in. The 500 V DC pulse passes through the driver&rsquo;s input filter and reaches the secondary side, exceeding the 12 V rating of the LED strip. Smoke and a replacement bill follow."
            doInstead="Disconnect vulnerable equipment before applying 500 V DC — that is the whole point of Reg 643.3.2&rsquo;s &lsquo;current-using equipment disconnected&rsquo; phrase. Then, for the post-connection check, use 250 V DC per Reg 643.3.3. The two-step approach A4:2026 codified is precisely to prevent this kind of damage. Do not skip step 1, and do not perform step 2 at 500 V."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How dwell time affects the reading</ContentEyebrow>

          <ConceptBlock
            title="Cable capacitance, dielectric absorption and the steady-state reading"
            plainEnglish="When the test voltage is first applied, three things happen in sequence: charging current flows into the cable's geometric capacitance, dielectric absorption current decays as polar molecules in the insulation align, and finally a steady-state leakage current settles. The reading you record is the steady-state value — typically after a few seconds for short cables, longer for cable runs in the hundreds of metres."
            onSite="Modern testers automatically apply the test voltage for a fixed dwell time and store the steady-state value. Older or simpler testers display a live reading that you watch settle. If the meter is held until the reading stops climbing, that is the value to record. If it never settles, you have a continuing leakage that is itself diagnostic — moisture or surface contamination drawing current that does not decay."
          >
            <p>Three diagnostic patterns over time:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reading rises smoothly to a high steady value.</strong> Healthy cable.
                Charging and dielectric absorption complete; steady-state leakage is tiny;
                resistance reads high. Record the steady-state value.
              </li>
              <li>
                <strong>Reading rises to a low steady value.</strong> Insulation has a defect
                (mechanical, thermal, age) but is stable. Leakage is significant but not growing.
                Compare to Table 64 minimum and to the healthy-cable expectation.
              </li>
              <li>
                <strong>Reading rises briefly then falls.</strong> Surface contamination or moisture
                creating a path that gets worse as the test voltage warms it / drives current
                through it. Dielectric absorption is being overwhelmed by genuine conduction.
                Investigate before recording.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the test sits in the Reg 643 sequence</ContentEyebrow>

          <ConceptBlock
            title="Insulation resistance follows continuity and precedes polarity / live tests"
            plainEnglish="Reg 643 sequences the dead tests in a specific order. Continuity (643.2), then insulation resistance (643.3), then polarity (643.6), then earth fault loop impedance (643.7) and RCD operation (643.8). Each test verifies a different property; each test gates the safety of the next."
          >
            <p>Why insulation resistance is second in the sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Continuity proves the protective conductor is in place before any voltage is
                applied. Without continuity, applying 500 V DC to a circuit means the test voltage
                has no defined return path and the result is meaningless.
              </li>
              <li>
                Insulation resistance proves the conductors that should be isolated ARE isolated.
                Until you know this, you cannot safely energise the circuit for the live tests that
                follow — a phase-to-earth or phase-to-neutral fault would short-circuit the supply
                at first energisation.
              </li>
              <li>
                The result of insulation resistance is independent of the live tests that follow, so
                a fail on IR can be remediated and re-tested without restarting the entire test
                sequence. A fail on IR is a STOP point — you do not move to polarity or live tests
                until insulation is verified.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What goes in the IR columns — and what goes in comments"
            plainEnglish="The Schedule of Test Results carries IR readings in megohms. Most schedule layouts have separate columns for L–E, N–E and L–N (or 'between live conductors'). Record the lowest measured value if a single column is provided, with all values noted in comments."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>IR (L–E) and IR (N–E):</strong> the line-to-earth and neutral-to-earth
                values at the Table 64 test voltage, in megohms. If the meter reads &lsquo;beyond
                range&rsquo; or &gt; 999 MΩ, record the upper-range value the meter displays (e.g.
                &gt; 999 MΩ).
              </li>
              <li>
                <strong>IR (L–N):</strong> the line-to-neutral value, applicable on circuits tested
                with L and N separated. On RCD-protected circuits this can be problematic if the RCD
                prevents L-N separation — record per the schedule template, with a note in comments.
              </li>
              <li>
                <strong>Comments column:</strong> the 250 V DC post-connection test result (per Reg
                643.3.3 redraft), any equipment that was disconnected for the test, SPDs
                disconnected and reconnected, and any non-standard procedure. The next inspector
                should be able to read your test sequence from the comments alone.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Insulation resistance = applied DC voltage / steady-state leakage current. The test asks &lsquo;is the boundary HIGH-resistance enough?&rsquo;, not &lsquo;is the path low-resistance enough?&rsquo; — opposite question to continuity.',
              'Table 64 test voltages: 250 V DC for SELV/PELV, 500 V DC for circuits up to 500 V, 1000 V DC for circuits above 500 V. Minimums: 0.5 MΩ (SELV/PELV), 1.0 MΩ (others).',
              'A4:2026 Reg 643.3.3 redraft: Table 64 voltage on cable alone first, THEN 250 V DC after equipment connection between live conductors and protective conductor with ≥ 1 MΩ acceptance.',
              'Table 64 minimums are the FLOOR, not the target. Healthy thermoplastic cable in dry conditions reads in the hundreds of MΩ. Anything within an order of magnitude of the minimum is a degraded-cable signal.',
              'Cable acts as a capacitor under DC test. Wait for the reading to settle to its steady-state value before recording. Modern testers handle dwell automatically; older instruments require manual observation.',
              'Always discharge cable capacitance after the test. Modern testers do this automatically; older ones require a manual short-to-earth via discharge wand.',
              'A low IR is not always a cable fault — connected equipment, moisture, surface contamination and SPDs can all create false-low readings. Investigate the cause before condemning the cable.',
              'Reg 643 sequence: continuity FIRST, insulation resistance SECOND. A fail on IR is a STOP point — do not move to polarity or live tests until insulation is verified.',
              'Record measured values on the Schedule of Test Results in megohms. Comments column flags the 250 V DC post-connection test, equipment disconnections, and any non-standard procedure.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My meter reads &gt; 999 MΩ. Is that a pass or do I need to record an actual number?',
                answer:
                  '> 999 MΩ (or whatever upper-range value your tester displays) is the pass — record the upper-range value as displayed. Most digital insulation testers max out somewhere between 999 MΩ and 99 GΩ depending on the model. The exact number above the maximum is not meaningful (the meter cannot resolve it), so the schedule entry is the displayed maximum with a > sign. The next inspector reads this as &lsquo;beyond range, ideal&rsquo;, which is exactly correct.',
              },
              {
                question: 'Can I test with the RCD in place?',
                answer:
                  'For L-E and N-E tests at the Table 64 voltage on the cable alone, yes — the RCD is in series with the test path and does not influence the result (the test current is microamp-level leakage, far below any RCD trip threshold). For L-N tests, the RCD often prevents true L-N separation because the test current path goes through the RCD&rsquo;s sensing transformer; some testers handle this gracefully, others not. If your meter cannot give a clean L-N reading with the RCD in place, isolate the RCD&rsquo;s outgoing N from the load N for the test, and reconnect after. Comment in the schedule.',
              },
              {
                question:
                  'When does the 250 V DC post-connection test apply, and when is just the Table 64 voltage enough?',
                answer:
                  "The 250 V DC step applies whenever Reg 643.3.3's trigger condition is met — that is, when connected equipment is likely to influence the measurement or be damaged. In practice, that's most modern installations: LED lighting, electronic dimmers, switched-mode PSUs, SPDs, certain motor controllers. On a fully passive installation (e.g. immersion heater elements, standard incandescent lighting, no SPDs) you may be able to keep equipment connected throughout and apply only the Table 64 voltage. The default assumption on any new build should be that 643.3.3 applies and both tests are performed.",
              },
              {
                question: 'I get 0.4 MΩ on a SELV circuit at 250 V DC. Is that a pass?',
                answer:
                  'No — Table 64 sets 0.5 MΩ as the minimum for SELV/PELV at 250 V DC. 0.4 MΩ is below the floor. Investigate the cause: connected equipment, moisture in the SELV wiring (common in bathrooms / pool areas where SELV is used precisely because of damp environments), or genuine cable degradation. The 0.5 MΩ floor is lower than the 1 MΩ for higher-voltage circuits because SELV insulation is thinner and the leakage current at 250 V DC is correspondingly higher even for healthy insulation — but 0.4 MΩ is still under the floor and is a fail.',
              },
              {
                question: 'Do I have to disconnect SPDs for the IR test?',
                answer:
                  'Per the SPD manufacturer&rsquo;s data sheet — almost always yes. Most SPDs use MOVs (metal-oxide varistors) or gas-discharge tubes that begin to conduct at voltages below the typical 500 V DC IR test voltage, and even at 250 V DC certain SPD types show measurable leakage. The Reg 643.3.3 NOTE explicitly mentions this. Disconnect SPDs at the consumer-unit terminals before either step of the IR test, complete both steps, and reconnect. Document the disconnection in the comments column.',
              },
              {
                question: 'Why is the SELV minimum (0.5 MΩ) lower than the LV minimum (1.0 MΩ)?',
                answer:
                  'SELV insulation is generally thinner than LV insulation because the working voltage is lower and the manufacturing standards reflect this. At a 250 V DC test voltage on thinner insulation, the geometric leakage current is naturally higher than at 500 V DC on thicker LV insulation, so the absolute resistance reads lower for the same insulation health. The 0.5 MΩ minimum reflects the physics, not a relaxation of standards. A SELV cable reading 0.5 MΩ at 250 V DC is at the same proportionate health as an LV cable reading 1 MΩ at 500 V DC.',
              },
              {
                question:
                  'What about &lsquo;polarisation index&rsquo; tests I read about for HV cables — do they apply here?',
                answer:
                  'Polarisation index (PI) is the ratio of the IR reading at 10 minutes to the reading at 1 minute, used in HV motor and transformer winding tests to assess insulation health under sustained voltage. It is not part of BS 7671 LV verification — Reg 643.3 simply asks for a steady-state reading at the Table 64 voltage, not a time-ratio. A PI-style approach can be informative on suspect circuits (a healthy reading that holds steady across a longer dwell is more reassuring than one that climbs only because dielectric absorption is still completing), but it is not a regulatory requirement for normal installation work.',
              },
              {
                question:
                  'My multifunction tester does both continuity and IR — how do I make sure I do not select the wrong one?',
                answer:
                  'Three procedural steps. First, before each test, look at the meter display and confirm the test voltage shown matches the test you intend (e.g. &lsquo;500 V&rsquo; in the corner before pressing test on an IR test, &lsquo;continuity&rsquo; or &lsquo;Ω&rsquo; for a continuity test). Second, use brightly-coloured leads consistently — many inspectors keep a dedicated set of IR leads with a 1 kV rating and a separate set of continuity leads, even on the same multifunction tester. Third, if you get a reading that does not make sense (a continuity reading in MΩ, or an IR reading in tenths of an ohm), stop and check the function selector before re-testing — wrong-function readings can fool the meter as much as the inspector.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Principles of insulation testing — Module 4.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-4/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Test voltages and applications
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

export default InspectionTestingModule4Section1;
