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
    id: 'mod3-s5-200ma-rationale',
    question:
      'Why does BS EN 61557-4 require a low-resistance ohmmeter to push at least 200 mA into a 0.5 Ω load, rather than the few mA a typical multimeter applies?',
    options: [
      '200 mA penetrates oxide and partial-contact joints that read OK at 1 mA.',
      'To deliberately trip the upstream RCD during the test and confirm its operation.',
      'To match the device rated current so the conductor is tested at its design load.',
      'To raise the open-circuit test voltage above 25 V for realistic shock conditions.',
    ],
    correctIndex: 0,
    explanation:
      'A multimeter at 1 mA cannot break through corrosion, oxide or a single-strand pinch — the reading looks low because the small current cannot reveal the contact-resistance fingerprint. 200 mA does. This is exactly why Reg 643.2.1 requires a measurement of resistance and not a buzzer beep, and why a multimeter is not a Reg 643.1 compliant alternative for continuity.',
  },
  {
    id: 'mod3-s5-lead-subtract',
    question:
      'Your meter has no null function. You touch the leads together and read 0.16 Ω. You then measure across a supplementary bond and read 0.49 Ω. Per GN3 Reg 2.13, what do you record on the schedule?',
    options: [
      '0.49 Ω exactly as measured, since lead resistance cannot be deducted without a null.',
      '0.16 Ω, the lead resistance, because the leads dominate a reading this low.',
      'Raw 0.49 Ω and corrected 0.33 Ω, with a comment noting the manual subtraction.',
      'The average of the two readings, 0.325 Ω, to split the difference between lead and bond.',
    ],
    correctIndex: 2,
    explanation:
      'GN3 Reg 2.13 permits the measure-and-subtract method as the explicit alternative to nulling. Best practice is to record both the raw measured value and the corrected (deducted) value with a note in the comments column — that gives a future inspector the audit trail to verify your arithmetic.',
  },
  {
    id: 'mod3-s5-contact-fingerprint',
    question:
      'A 25 m radial in 2.5/1.5 mm² T&E. Calculated R_bulk at 20 °C ≈ 0.49 Ω (25 × 19.51 mΩ/m). You measure R1+R2 at the far end and read 0.78 Ω. What does the excess of 0.29 Ω over calculated tell you?',
    options: [
      'The cable temperature has risen above 20 °C — apply a ×1.20 correction to reconcile.',
      'The meter is reading high; re-null and repeat before drawing any conclusion.',
      'The R1+R2 column accepts ±50% of the calculated value, so 0.78 Ω is in tolerance.',
      'The 0.29 Ω excess is cumulative contact resistance — a joint is degrading in the run.',
    ],
    correctIndex: 3,
    explanation:
      'R_measured = R_bulk + Σ R_contact. The excess over calculated bulk is the cumulative contact-resistance fingerprint. Method 1 gives a single number that hides which joint is bad; Method 2 (wandering lead) walks the run and shows where the contact resistance jumps — that is the diagnostic value of switching methods on a high reading.',
  },
  {
    id: 'mod3-s5-comparative-method',
    question:
      'You are doing an EICR on a 1970s house with no design records. Cable lengths are unknown. Upstairs lighting reads 0.41 Ω end-to-end; downstairs lighting reads 0.76 Ω. Both circuits are 1.0/1.0 mm² T&E feeding similar numbers of points. What is the right interpretation?',
    options: [
      'Both circuits fail — readings of this magnitude are too high for a lighting final circuit.',
      'There is no way to judge either circuit without first establishing the cable lengths.',
      'Comparative method: downstairs is ~1.85× upstairs, so investigate it for a high-resistance joint.',
      'Average the two readings and accept the mean as representative of both circuits.',
    ],
    correctIndex: 2,
    explanation:
      'Without design data the absolute method (compare to calculated) is impossible. The comparative method uses the installation as its own reference: where two paths should be similar, asymmetry is the diagnostic. Document the methodology on the certificate so the next inspector understands why readings without calculated benchmarks were accepted.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Reg 643.1 specifies how measuring instruments must be chosen. What is the rule?',
    options: [
      'Any electrical multimeter is acceptable provided it can read down to fractions of an ohm',
      'Instruments must be calibrated annually by a UKAS-accredited laboratory before they may be used',
      'Only test instruments carrying a recognised UK certification mark for installation testing are permitted',
      'Instruments and methods shall comply with BS EN 61557; other equipment must be no less safe or capable',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.1 is the gateway: BS EN 61557 (and its sub-parts) is the specification for installation testing instruments. The "no lesser degree of performance and safety" clause permits non-61557 equipment only if it can be demonstrated to be at least as good — a high bar in practice. For continuity, the relevant sub-part is BS EN 61557-4.',
  },
  {
    id: 2,
    question:
      'BS EN 61557-4 is the standard for low-resistance ohmmeters used in installation testing. What does it specify about test current and open-circuit voltage?',
    options: [
      'Open-circuit voltage of 4–24 V and a current able to deliver at least 200 mA into 0.5 Ω',
      'A fixed test current of exactly 200 mA, maintained at all times throughout the measurement',
      'An open-circuit voltage of 230 V, matching the nominal supply so the test reflects service',
      'A test current of 30 mA RMS, aligned with the rating of a typical final-circuit RCD',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61557-4 specifies the instrument is capable of measuring resistance values down to fractions of an ohm. The classic spec — open-circuit voltage 4–24 V, current ≥ 200 mA into 0.5 Ω — comes from earlier editions; the current edition reads more functionally ("capable of low-resistance measurement") but the 200 mA test current remains the practical benchmark for instruments sold to UK electricians.',
  },
  {
    id: 3,
    question:
      'Why does BS EN 61557-4 demand a relatively high test current (≥ 200 mA) rather than a few mA like a multimeter?',
    options: [
      'To deliberately trip an upstream RCD and confirm it operates during the continuity test',
      'To match the rated current of the circuit protective device that is being tested',
      'High test current penetrates oxide and partial joints that read "OK" at 1 mA',
      'It is an arbitrary historical figure carried over from earlier instrument designs',
    ],
    correctAnswer: 2,
    explanation:
      'A multimeter at 1 mA gives a deceptively low reading on a partial joint because the small current cannot break through corrosion, oxidation, or a thin pinch on a single strand. The 200 mA test current reveals the true joint resistance under realistic conditions. This is why a buzzer continuity tester (which typically pushes only a few mA) cannot be used for compliance testing under Reg 643.2.1.',
  },
  {
    id: 4,
    question:
      'You have just changed the test leads on your low-resistance ohmmeter. What is the procedural consequence?',
    options: [
      'No action is needed — the test leads do not contribute to the measured resistance',
      'Wait 24 hours for the meter to recalibrate itself to the new leads before testing',
      'Reduce every subsequent reading by a nominal 10% to allow for the new lead resistance',
      'Re-null the leads immediately — the previous null is invalid and every reading inherits the error',
    ],
    correctAnswer: 3,
    explanation:
      'Lead resistance is in the same numeric ballpark as a real R1+R2 reading. Changing leads — even to a nominally identical pair — invalidates the previous null. Re-null at the start of every session, after any lead swap, and ideally between every few readings on a long job to catch lead-end wear that increases resistance over time.',
  },
  {
    id: 5,
    question:
      'You are continuity-testing a long supplementary bond and your meter does not have a zeroing function. The leads measure 0.18 Ω against each other. The reading at the bond end is 0.42 Ω. What is the actual bond resistance and what should you record?',
    options: [
      'Bond = 0.42 − 0.18 = 0.24 Ω; record both the raw and the deducted value with a comment',
      'Record 0.42 Ω exactly as measured, since manual subtraction is not permitted without a null',
      'Record 0.18 Ω, the lead resistance, as the bond reading because the leads dominate it',
      'The bond resistance cannot be determined without a meter that provides an automatic null',
    ],
    correctAnswer: 0,
    explanation:
      'The "measure-and-subtract" method is the explicit alternative to nulling. Lead resistance is 0.18 Ω; measured reading is 0.42 Ω; actual bond resistance is 0.24 Ω. Best practice is to record the measured raw value AND the corrected value with a comment, so a future reader can audit your arithmetic.',
  },
  {
    id: 6,
    question:
      'What is the difference between contact resistance and conductor resistance in a low-resistance measurement?',
    options: [
      'They are two names for the same quantity and always read identically on the meter',
      'Contact resistance matters only when buzz-testing and has no bearing on a measured value',
      'Conductor resistance is the cable bulk (mΩ/m × length); contact resistance is each joint — the meter reads the sum',
      'Conductor resistance is always near zero, so any reading above zero is pure contact resistance',
    ],
    correctAnswer: 2,
    explanation:
      'Total measured resistance = bulk conductor + sum of contact resistances at every joint in the path. The bulk part is calculable from cable data. When the measured value exceeds the calculated bulk by a meaningful margin, the difference IS the cumulative contact resistance — which localises to one or more degraded joints. Method 2 (wandering lead) along the run is the diagnostic technique because it shows where the contact resistance jumps.',
  },
  {
    id: 7,
    question:
      'Polarised vs non-polarised low-resistance ohmmeters — when does the distinction matter in installation testing?',
    options: [
      'Always — a polarised meter is mandatory for every installation continuity measurement',
      'Only on TT systems, where the earth path runs through the general mass of earth',
      'Only when the meter carries a CAT IV overvoltage rating for use at the origin',
      'Rarely on copper — it matters only where oxide or junction effects can rectify the current',
    ],
    correctAnswer: 3,
    explanation:
      'Most modern multifunction testers use a low-frequency AC test current (or alternating-polarity DC) that auto-handles polarisation effects. The textbook concern — that a corroded copper-aluminium joint can act as a partial rectifier — is real but uncommon in modern UK installations. Where you do encounter mixed metals or a suspected semiconductor effect (e.g. zinc oxide on galvanised steel), take the reading in both polarities and record the larger value.',
  },
  {
    id: 8,
    question:
      'When should you use the "comparative" method versus the "absolute" method in low-resistance measurement?',
    options: [
      'Absolute = compare a reading to the calculated R1+R2; comparative = compare two similar paths',
      'They are interchangeable and the choice between them is purely a matter of preference',
      'The comparative method is reserved for new work and the absolute method for periodic inspection',
      'The absolute method requires an analogue meter while the comparative method requires a digital one',
    ],
    correctAnswer: 0,
    explanation:
      'Absolute: you have the GN3 Table BI value, you know the length, you calculate the expected resistance and compare to your reading. Comparative: you have two parallel or symmetrical conductors in the same circuit and you compare them — if they should be similar but differ by 50%, one is degraded. The ring final continuity test (r1, r2, rn) is implicitly comparative when you check that r1 ≈ rn ≈ r2/1.67.',
  },
  {
    id: 9,
    question:
      'You are using a multifunction tester with a "auto-null" feature. The user manual says auto-null reads lead resistance once at power-on. What is the procedural risk?',
    options: [
      'There is no risk — an auto-null feature is fool-proof and needs no further attention',
      'Auto-null permanently locks to a factory-set value and ignores the leads actually fitted',
      'It captures the lead resistance only at power-on, so a later lead change invalidates it silently',
      'Auto-null deliberately adds a fixed 0.10 Ω margin to every reading as a safety allowance',
    ],
    correctAnswer: 2,
    explanation:
      'Auto-null at power-on is convenient but treats lead resistance as a constant for the whole session. Real lead resistance drifts with temperature, contact wear and connector oxidation. The professional habit is to re-null on demand at the start of every test, after any lead change, and again at the end of the job to confirm nothing has drifted. The manual null button on the front of every quality MFT is there for this reason.',
  },
  {
    id: 10,
    question:
      'Reg 643.11 (and the surrounding apparatus regulations) — what does the safety obligation require of you when selecting test instruments?',
    options: [
      'Always select the most expensive instrument available, as cost correlates directly with safety',
      'Only instruments with a built-in results printer satisfy the apparatus safety requirements',
      'The measured lead resistance must be permanently marked on the meter housing before use',
      'Instrument, leads and probes must carry a CAT rating suited to the location — the chain takes the lowest',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 61010 governs CAT ratings. CAT IV = origin of supply; CAT III = distribution; CAT II = single-phase loads. The chain rule is critical: a CAT IV meter with a CAT III lead becomes CAT III overall. The wet/damp conditions warning is in Reg 643.11 territory — the test current itself becomes a shock hazard above 25 V AC / 60 V DC in wet locations, so use a meter with a "wet test" mode or a tongue-tester that limits open-circuit voltage.',
  },
];

const InspectionTestingModule3Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Low resistance measurement techniques | I&T Module 3.5 | Elec-Mate',
    description:
      'Reg 643.1 + GN3 Ch 1 & 2 + BS EN 61557-4: instrument requirements for low-resistance measurement, the 200 mA test current characteristic, lead-resistance nulling versus measure-and-subtract, contact vs conductor resistance, polarised vs non-polarised instruments, comparative vs absolute method.',
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
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5"
            title="Low resistance measurement techniques"
            description="What the meter is doing inside, why the 200 mA test current matters, how lead nulling actually works, and when to trust an absolute reading versus a comparative one."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.1: measuring instruments shall be chosen in accordance with the relevant parts of BS EN 61557 — for low-resistance measurement that is BS EN 61557-4. Other instruments are permitted only if they provide no lesser degree of performance and safety.',
              'BS EN 61557-4 specifies an instrument capable of low-resistance measurement. The classic characteristic — open-circuit voltage 4–24 V, test current ≥ 200 mA into a 0.5 Ω load — was an explicit minimum in earlier editions and remains the practical benchmark in current editions.',
              'The high test current (≥ 200 mA) penetrates oxide films and partial-contact joints that a multimeter or buzzer at 1 mA simply cannot reveal. This is why Reg 643.2.1 requires a measurement of resistance, not a continuity beep.',
              'Total measured resistance = bulk conductor (calculable from GN3 Table BI) + sum of contact resistances at every joint. When the measured value exceeds calculated, the excess IS the contact-resistance fingerprint of a degraded joint.',
              'Null the test leads before every test session. If the meter has no null, measure the leads against each other and subtract by hand — GN3 Reg 2.13 explicitly permits both methods. Skipping the null is the single most common cause of false fails on R1+R2.',
              'Comparative vs absolute: absolute = measure and compare to a calculated value (cable maths). Comparative = compare two similar paths and look for a mismatch. Both are legitimate; pick the right one for the situation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the relevant parts of BS EN 61557 that govern installation test instruments and explain the Reg 643.1 selection rule',
              'State the test-current characteristic of a BS EN 61557-4 low-resistance ohmmeter and explain why the 200 mA benchmark exists',
              'Null the test leads on a multifunction tester and explain when nulling fails (auto-null after lead change, drift across a long job)',
              'Use the measure-and-subtract method correctly when the meter has no zeroing function — including the right way to record the result',
              'Distinguish contact resistance from conductor resistance in a measurement and use the difference to localise a degraded joint',
              'Choose between polarised and non-polarised instruments where rectifying joints may be present, and apply the dual-polarity reading method',
              'Choose between the comparative method and the absolute method for any given low-resistance verification on site',
              'Read the CAT rating chain on test instruments and select an appropriate combination for the location',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.1 — the instrument selection rule"
            plainEnglish="BS 7671 does not list specific brands or models. It anchors instrument selection to BS EN 61557 — a multi-part international standard covering every common installation test (insulation resistance, low-resistance ohmmeter, loop impedance, RCD, earth electrode, etc.). For low-resistance / continuity measurement, BS EN 61557-4 is the relevant sub-part."
            onSite="When sourcing a new MFT, check the spec sheet for explicit BS EN 61557 conformity. The headline number is which sub-parts the instrument complies with — a typical UK MFT covers 61557-1 (general), -2 (insulation), -3 (loop impedance), -4 (low-resistance), -6 (RCD) and -10 (combined)."
          >
            <p>
              The regulation has two limbs. First: instruments shall be chosen in accordance with
              the relevant parts of BS EN 61557. Second: if other measuring equipment is used, it
              shall provide no lesser degree of performance and safety. The second limb is
              deliberately a high bar — it does not mean &ldquo;cheaper instruments are fine if they
              roughly work&rdquo;, it means an alternative instrument must be demonstrably as
              capable as a 61557-compliant equivalent across measurement accuracy, test current,
              safety category, and protection against operator error.
            </p>
            <p>The relevant sub-parts of BS EN 61557 for our purposes:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Sub-part</th>
                    <th className="text-left text-white/80 py-2">Covers</th>
                    <th className="text-left text-elec-yellow py-2">Test method this enables</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS EN 61557-1</td>
                    <td>General requirements</td>
                    <td className="text-elec-yellow">Common safety, accuracy, environmental</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS EN 61557-2</td>
                    <td>Insulation resistance</td>
                    <td className="text-elec-yellow">Reg 643.3 IR test (Module 3.6)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS EN 61557-3</td>
                    <td>Loop impedance</td>
                    <td className="text-elec-yellow">Reg 643.7.3 Zs measurement (Module 4)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS EN 61557-4</td>
                    <td>Low-resistance ohmmeter</td>
                    <td className="text-elec-yellow">Reg 643.2.1 continuity (this section)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS EN 61557-6</td>
                    <td>RCD test equipment</td>
                    <td className="text-elec-yellow">Reg 643.8 RCD test</td>
                  </tr>
                  <tr>
                    <td className="py-2">BS EN 61557-10</td>
                    <td>Combined instruments</td>
                    <td className="text-elec-yellow">Multifunction testers (MFTs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1"
            clause={
              <>
                Measuring instruments and monitoring equipment and methods shall be chosen in
                accordance with the relevant parts of BS EN 61557. If other measuring equipment is
                used, it shall provide no lesser degree of performance and safety.
              </>
            }
            meaning="The mandatory selection rule. BS EN 61557 (and its sub-parts) is the default; alternatives are permitted only on a demonstrated equivalence of performance and safety, not on cost or convenience."
          />

          <SectionRule />

          <ContentEyebrow>Inside the instrument — what it actually does</ContentEyebrow>

          <ConceptBlock
            title="The functional schematic — constant-current source + voltmeter"
            plainEnglish="A low-resistance ohmmeter is conceptually two things wired together: (1) a constant-current source that pushes a known current through the conductor under test, and (2) a high-impedance voltmeter that measures the voltage drop across the conductor. Resistance is then computed as R = V/I via Ohm's law."
            onSite="The reason it works at very low resistance values (down to 0.01 Ω) is the constant-current source. A normal multimeter applies a fixed voltage and measures current — at low resistance the current would be huge and the meter scales it down. A low-resistance ohmmeter inverts this: known current, measured voltage drop, computed resistance."
          >
            <p>The block diagram is consistent across BS EN 61557-4 instruments:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Battery / supply.</strong> Internal rechargeable cells provide the
                open-circuit voltage (4–24 V across the BS EN 61557-4 spec range).
              </li>
              <li>
                <strong>Constant-current source.</strong> An active circuit regulates the test
                current to a fixed value (typically 200 mA into 0.5 Ω, i.e. into a low-resistance
                load) regardless of small variations in conductor resistance under test.
              </li>
              <li>
                <strong>Test leads.</strong> Two leads from the instrument to the conductor under
                test. A four-terminal (Kelvin) configuration on high-end instruments separates the
                current path from the voltage measurement path, eliminating lead resistance from the
                reading.
              </li>
              <li>
                <strong>Voltmeter.</strong> High-impedance voltmeter measures the voltage drop
                across the conductor. The high impedance means it draws negligible current, so the
                full constant-current goes through the conductor under test.
              </li>
              <li>
                <strong>Computed display.</strong> R = V / I_test. The instrument knows I_test
                because it is regulating it, and measures V, so R falls out automatically.
              </li>
              <li>
                <strong>Lead-resistance null block.</strong> Software or analogue circuit that
                stores a measured lead resistance and subtracts it from subsequent readings — the
                &ldquo;zero&rdquo; or &ldquo;null&rdquo; function.
              </li>
            </ol>
            <p>
              The four-terminal (Kelvin) sensing on premium instruments deserves a note. In a
              standard two-terminal measurement, the lead resistance is part of the measurement path
              and must be nulled out. In a four-terminal arrangement, two leads carry the test
              current and two separate leads sense the voltage drop directly across the conductor
              under test — the voltage-sensing leads carry essentially no current and their
              resistance is irrelevant. UK installation testers are mostly two-terminal with a null
              function; bench instruments and dedicated micro-ohmmeters are four-terminal.
            </p>
          </ConceptBlock>

          {/* Instrument schematic */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Inside a low-resistance ohmmeter — constant-current source + voltmeter + null block
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Schematic of a low-resistance ohmmeter showing battery, constant-current source pushing 200 mA, voltmeter measuring V across the conductor under test, and a lead-resistance null subtraction block."
            >
              {/* Instrument case */}
              <rect
                x="40"
                y="40"
                width="360"
                height="280"
                rx="14"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="220"
                y="65"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontWeight="bold"
              >
                LOW-Ω OHMMETER (BS EN 61557-4)
              </text>

              {/* Battery */}
              <rect
                x="70"
                y="90"
                width="80"
                height="40"
                rx="6"
                fill="rgba(96,165,250,0.10)"
                stroke="#60A5FA"
                strokeWidth="1.4"
              />
              <text
                x="110"
                y="115"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="10"
                fontWeight="bold"
              >
                BATTERY
              </text>

              {/* Constant current source */}
              <rect
                x="180"
                y="90"
                width="120"
                height="40"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="240"
                y="108"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                CONST-I SOURCE
              </text>
              <text x="240" y="123" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                I = 200 mA
              </text>

              {/* Wires to leads */}
              <line
                x1="150"
                y1="110"
                x2="180"
                y2="110"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
              />
              <line x1="300" y1="110" x2="380" y2="110" stroke="#EF4444" strokeWidth="2" />

              {/* Voltmeter */}
              <circle
                cx="240"
                cy="200"
                r="34"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="240"
                y="200"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="14"
                fontWeight="bold"
              >
                V
              </text>
              <text x="240" y="215" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                hi-Z
              </text>

              {/* Null block */}
              <rect
                x="70"
                y="240"
                width="120"
                height="50"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="130"
                y="262"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                NULL BLOCK
              </text>
              <text x="130" y="278" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                R_disp = R_meas − R_lead
              </text>

              {/* Display */}
              <rect
                x="220"
                y="240"
                width="160"
                height="50"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="300"
                y="265"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                0.18 Ω
              </text>
              <text x="300" y="282" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                LCD display
              </text>

              {/* Wires from voltmeter */}
              <line
                x1="206"
                y1="200"
                x2="170"
                y2="200"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />
              <line
                x1="170"
                y1="200"
                x2="170"
                y2="170"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />
              <line
                x1="170"
                y1="170"
                x2="380"
                y2="170"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />
              <line
                x1="274"
                y1="200"
                x2="310"
                y2="200"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />
              <line
                x1="310"
                y1="200"
                x2="310"
                y2="160"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />
              <line
                x1="310"
                y1="160"
                x2="380"
                y2="160"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
              />

              {/* Test leads */}
              <line
                x1="400"
                y1="110"
                x2="500"
                y2="110"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="6,3"
              />
              <text x="450" y="100" textAnchor="middle" fill="#EF4444" fontSize="9">
                R_lead+
              </text>
              <line
                x1="400"
                y1="170"
                x2="500"
                y2="170"
                stroke="rgba(34,197,94,0.6)"
                strokeWidth="1.5"
                strokeDasharray="5,3"
              />
              <text x="450" y="186" textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize="9">
                V-sense
              </text>

              {/* Conductor under test */}
              <rect
                x="500"
                y="80"
                width="240"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <text
                x="620"
                y="105"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                CONDUCTOR UNDER TEST
              </text>
              <line x1="510" y1="140" x2="730" y2="140" stroke="#22C55E" strokeWidth="3" />
              <text x="620" y="158" textAnchor="middle" fill="#22C55E" fontSize="9">
                R = R_bulk + Σ R_contact
              </text>
              <text x="620" y="175" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                V drop = I × R = 200 mA × 0.18 Ω = 36 mV
              </text>

              {/* Caption box */}
              <rect
                x="40"
                y="335"
                width="720"
                height="20"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="349"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                Constant current pushes 200 mA. Voltmeter measures V across the conductor. R = V/I,
                with R_lead pre-subtracted by the null block.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The 200 mA test current — why it matters</ContentEyebrow>

          <ConceptBlock
            title="What 200 mA actually does — penetration of partial joints"
            plainEnglish="A clean copper-to-copper joint with a tight termination has a contact resistance of microohms. A degraded joint — corrosion, partial strand contact, paint film — can have a contact resistance of milliohms or even ohms, but only at low current. At higher current, the contact resistance changes (often non-linearly) because the larger current physically modifies the contact area or punches through thin oxide layers."
            onSite="A multimeter at 1 mA reads through a corroded clamp and gives a low value. The same clamp at 200 mA reads dramatically higher, exposing the defect. This is why the BS EN 61557-4 instrument and a multimeter give different answers on the same suspect joint, and why only the BS EN 61557-4 reading is the compliance answer."
          >
            <p>
              The earlier editions of BS EN 61557-4 stated the test current minimum explicitly: 200
              mA when measuring a 0.5 Ω load, with an open-circuit voltage between 4 V and 24 V (DC
              or AC). The later editions phrase it more functionally — &ldquo;capable of
              low-resistance measurement&rdquo; — but the 200 mA figure remains the de facto
              benchmark on UK MFT spec sheets, and any instrument that does not push at least 200 mA
              at low impedance is unlikely to satisfy the &ldquo;no lesser degree of
              performance&rdquo; clause in Reg 643.1.
            </p>
            <p>
              The open-circuit voltage range (4–24 V) is also significant. Below 4 V you cannot push
              200 mA through a few-ohm load (Ohm&rsquo;s law: 4 V / 0.5 Ω = 8 A briefly, regulated
              down to 200 mA by the constant-current source — fine; 1 V / 0.5 Ω = 2 A, still
              adequate; 0.5 V / 0.5 Ω = 1 A, marginal). Above 24 V the open-circuit voltage becomes
              a touch-voltage hazard in wet/damp conditions, which is why Reg 643.11 singles out
              tests above 25 V AC / 60 V DC for special care.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.11 (and surrounding instrument-safety regulations)"
            clause={
              <>
                Particular attention shall be paid to safety aspects associated with any tests
                performed with instruments capable of generating a test voltage greater than 25 V AC
                or 60 V DC in wet or damp conditions. The equivalent overvoltage category for a test
                arrangement is the lowest overvoltage category of any equipment, including test
                instruments, leads, probes, connectors, and similar, connected in the test
                arrangement.
              </>
            }
            meaning="Two safety duties: (1) wet/damp conditions raise the bar above 25 V AC or 60 V DC test voltages — most low-resistance ohmmeters are below that threshold by design, but insulation testers (500 V) and loop testers (mains-derived) are not. (2) The CAT rating of a test arrangement is determined by its WEAKEST element — a CAT IV meter on CAT III leads is only CAT III overall."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lead resistance — the silent error source</ContentEyebrow>

          <ConceptBlock
            title="Why nulling matters — and what nulling actually does"
            plainEnglish="Test leads have resistance. Typical UK MFT leads measure 0.10 to 0.30 Ω end to end, depending on length and condition. That resistance is in series with whatever you are measuring, so without correction every reading is artificially inflated by the lead resistance."
            onSite="The null function captures the lead resistance once, stores it, and subtracts it from every subsequent reading. The display then shows the conductor-only resistance. The action takes three seconds at the start of every test session — and it is the single most impactful procedural step in low-resistance measurement."
          >
            <p>The procedure for nulling on a typical UK MFT (e.g. Megger MFT1741, Fluke 1664):</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Power on. Select the low-resistance / continuity range.</li>
              <li>
                Touch the two test-lead probes together with firm contact (or, on instruments with a
                null fixture, clip both leads into the fixture).
              </li>
              <li>
                Press the &ldquo;NULL&rdquo; or &ldquo;ZERO&rdquo; button. The display reads the
                lead resistance momentarily, then changes to 0.00 Ω. The lead resistance is now
                stored.
              </li>
              <li>
                Verify by separating the leads — display reads &ldquo;OL&rdquo; (open loop).
                Re-touch — display reads 0.00 Ω. Null is confirmed.
              </li>
              <li>
                Proceed with the test. Every reading from now on has the lead resistance subtracted
                automatically.
              </li>
            </ol>
            <p>Nulling fails silently in three common situations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lead change.</strong> The stored null is for the previous leads. New leads =
                new lead resistance = invalid null. Re-null after every lead change.
              </li>
              <li>
                <strong>Probe wear.</strong> Spring-loaded probes lose contact pressure over time;
                end-of-lead alligator clips oxidise. The null was correct when set but the actual
                lead resistance has drifted upward through the day. Re-null at the start of every
                test session, not just at job start.
              </li>
              <li>
                <strong>Auto-null at power-on.</strong> Some instruments null automatically at
                power-on. Convenient, but treats lead resistance as a session-long constant. If you
                power on with leads cold and disconnected, the auto-null may capture a misleadingly
                low value. Always manually re-null after the leads have been used for a few minutes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The measure-and-subtract alternative — when there is no null function"
            plainEnglish="Older meters and some lower-spec instruments do not have a null function. GN3 Reg 2.13 explicitly permits an alternative: measure the lead resistance manually, write it on the instrument body, and subtract it from every reading by hand."
            onSite="The advantage of the manual method is that it forces you to think about lead resistance on every reading. The disadvantage is arithmetic-under-pressure on a busy job. If the meter has a null function, use it; if not, write the lead resistance on a strip of tape on the instrument and subtract."
          >
            <p>The procedure:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Touch the two test-lead probes together. Read the resistance — say 0.18 Ω.</li>
              <li>
                Write &ldquo;LEADS = 0.18 Ω&rdquo; on a piece of tape stuck to the meter, or
                directly on the meter housing in marker.
              </li>
              <li>Take your measurement — say 0.42 Ω at the far end of an R1+R2 test.</li>
              <li>Subtract: 0.42 - 0.18 = 0.24 Ω. That is the conductor-only R1+R2.</li>
              <li>
                Record both values on the schedule of test results: &ldquo;Measured 0.42 Ω, lead
                resistance 0.18 Ω, R1+R2 = 0.24 Ω&rdquo;. The two-line entry is your audit trail.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A long testing session — when the null silently expires"
            situation="You are doing a periodic inspection on a 14-circuit consumer unit at a commercial unit. You null the leads at 09:00 and start testing R1+R2 / R2 readings. By 11:30 you are on circuit 9, a long radial to a remote storage area. The reading at the far end is 0.78 Ω against a calculated 0.51 Ω. The reading on the next circuit (circuit 10, similar length) is 0.74 Ω against 0.48 Ω. Both circuits look high in similar measure."
            whatToDo="Re-null. The pattern — multiple circuits all reading 0.20–0.30 Ω over calculated — is the fingerprint of a drifted null. Touch the leads together and check the residual reading; if it shows 0.20–0.30 Ω instead of zero, the null has expired (probably because of a clip oxidising or a worn probe tip). Re-null and re-measure circuits 9 and 10. If they now come in close to calculated, the original readings were a lead-drift artefact."
            whyItMatters="The temptation when readings are uniformly high is to add a 'cable temperature correction' or assume the calculated values were optimistic. That hides the real problem (lead drift) and bakes systematically wrong values into the test results. Re-null first, blame the cable second."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Contact vs conductor resistance</ContentEyebrow>

          <ConceptBlock
            title="Decomposing a low-resistance reading"
            plainEnglish="When you measure R between two points on a conductor, the reading is the SUM of two things: the bulk conductor resistance (the copper between the two points), and the contact resistance at every joint along the way (terminations, splices, accessory back-boxes, junction boxes)."
          >
            <p>The maths:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>R_bulk</strong> = (r1 + r2) × length, taken from GN3 Table BI / OSG Table I1
                at 20°C. Calculable to two decimal places from cable size and length.
              </li>
              <li>
                <strong>Σ R_contact</strong> = sum of contact resistances at every joint in the test
                path. For a clean, well-made joint this is microohms (≪ 0.001 Ω); for a degraded
                joint it can be milliohms to ohms.
              </li>
              <li>
                <strong>R_measured</strong> = R_bulk + Σ R_contact. The measured value over the bulk
                value IS the cumulative contact resistance.
              </li>
            </ul>
            <p>
              In practical terms: a 22 m radial in 2.5/1.5 mm² T&E has R_bulk ≈ 0.43 Ω at 20°C (from
              the Module 3.1 worked example). If your reading is 0.45 Ω, the cumulative contact
              resistance is 0.02 Ω — well within tolerance. If it is 0.78 Ω, the cumulative contact
              resistance is 0.35 Ω — that is a degraded joint somewhere in the run, and Method 2
              (wandering lead) is how you find it.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating &lsquo;close to calculated&rsquo; as proof of every joint being good"
            whatHappens="A reading of 0.45 Ω against calculated 0.43 Ω passes acceptance but does not prove every joint is good — it proves the SUM of contact resistances is small. A single bad joint of 0.40 Ω would push the reading to 0.83 Ω; a string of ten OK-but-not-great joints at 0.04 Ω each would also push the reading to 0.83 Ω. Method 1 cannot distinguish them."
            doInstead="Where you suspect a specific joint or want to verify joint quality on a critical circuit, use Method 2 along the run. The diagnostic capability of Method 2 is the joint-level localisation that Method 1 hides."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Polarised vs non-polarised instruments</ContentEyebrow>

          <ConceptBlock
            title="When the polarity of the test current matters"
            plainEnglish="Most low-resistance measurements on copper conductors are independent of test-current polarity — copper-to-copper joints are ohmic and behave the same in both directions. But mixed-metal joints (copper-aluminium, copper-tin, galvanised steel) can develop oxide layers that act as partial rectifiers, reading differently in each polarity."
            onSite="On a routine R1+R2 / R2 / bonding measurement on copper, a non-polarised instrument is fine. On a suspected mixed-metal joint or where a previous reading is suspiciously asymmetric (e.g. very different on retest), take a reading in both polarities and use the larger value."
          >
            <p>
              Modern UK MFTs typically apply a low-frequency AC test current (or alternating-DC) to
              auto-handle polarisation effects. The reading you see is the magnitude of the
              resistance, polarity-independent. The textbook concern — that an oxidised
              copper-aluminium joint reads 0.05 Ω in one direction and 0.30 Ω in the other — is real
              but uncommon in modern UK installations because aluminium conductors are rare in fixed
              wiring (more common in service heads and meter tails, where they are not normally
              accessible during continuity testing).
            </p>
            <p>The dual-polarity reading method:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Take the reading in the &ldquo;normal&rdquo; orientation (red lead on L, black on E,
                or as your meter convention requires).
              </li>
              <li>Swap the leads. Take the reading again.</li>
              <li>
                If the two readings differ by more than a few percent, the joint has a
                polarity-dependent component. Use the LARGER value as the worst case for acceptance.
              </li>
              <li>Note the swap on the schedule comments.</li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Comparative vs absolute method</ContentEyebrow>

          <ConceptBlock
            title="Two ways to judge a low-resistance reading"
            plainEnglish="Absolute method: measure the resistance and compare to a calculated value derived from cable data. Comparative method: measure two similar paths and compare them to each other, looking for asymmetry."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Absolute method.</strong> You know the cable size and length. You calculate
                expected R_bulk from GN3 Table BI. You measure. You compare. If your reading is
                within ±10 % of calculated, the conductor is electrically fine. This is the standard
                method for new work where you have the design data.
              </li>
              <li>
                <strong>Comparative method.</strong> You do not know the exact length, or the cable
                history is uncertain. You measure two paths that should be similar (e.g. r1 vs rn on
                a ring final, or two CPCs in parallel, or two identical sub-circuits) and look for a
                mismatch. If they should be similar but differ by 30 %, one is degraded. This is the
                standard method on periodic inspection of older installations.
              </li>
            </ul>
            <p>
              The comparative method is the implicit logic behind the ring final continuity test.
              You measure r1, r2 and rn end-to-end. r1 should equal rn (both line conductors) and r2
              should be 1.67× the line value (1.5 mm² CPC vs 2.5 mm² line). If r1 ≠ rn by more than
              a small tolerance, one leg of the ring is broken or has a high-resistance joint. The
              diagnostic does not require a calculated absolute value — it is purely comparative.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 1970s installation with no design records — comparative method to the rescue"
            situation="You are doing an EICR on a 1970s house. The owner has no electrical drawings, no original certificates, and the cable runs are buried in plaster. Cable sizes are visible at the consumer unit (mostly 2.5 mm² T&E radials and a 2.5 mm² ring final) but lengths are unknown. You measure R1+R2 on the lighting radial and get 0.76 Ω. Calculated? You cannot — the length is unknown."
            whatToDo="Switch to comparative. There are two lighting circuits in the house: upstairs and downstairs, both 1.0/1.0 mm² T&E, both feeding similar numbers of points. Measure R1+R2 on both. Upstairs reads 0.41 Ω; downstairs reads 0.76 Ω. The downstairs circuit is roughly 1.85× the upstairs reading, but the two circuits are similar in size and topology — the asymmetry is the diagnostic. Investigate the downstairs circuit for a high-resistance joint or excessive run length. If both readings had been similar (e.g. 0.74 Ω and 0.76 Ω), neither would be flagged on a comparative basis — and you would treat them as 'normal for this house'."
            whyItMatters="Without design data, the absolute method is impossible. The comparative method gives you a defensible engineering judgement using the installation itself as its own reference. Document the methodology on the certificate so the next inspector understands why you accepted readings that have no calculated benchmark."
          />

          <CommonMistake
            title="Using a multimeter on the lowest ohm range as a substitute"
            whatHappens="The inspector uses a digital multimeter set to the 200 Ω range to test continuity. The reading is 0.5 Ω on a circuit that should be 0.25 Ω. The multimeter pushes maybe 1 mA through the conductor — not enough to penetrate a partial-contact joint, and below the resolution of most multimeters at the bottom of the range. The reading is double-counting display granularity and probably masking a real defect that a 200 mA test would reveal."
            doInstead="Use a BS EN 61557-4 instrument. The 200 mA test current is not optional and not equivalent to a multimeter on its lowest range. Reg 643.1 anchors the instrument selection to BS EN 61557 — a multimeter is permitted only if it can be demonstrated to provide no lesser degree of performance and safety, which a typical handheld multimeter cannot."
          />

          <CommonMistake
            title="Not checking the CAT rating of the leads"
            whatHappens="The inspector buys a CAT IV-rated MFT and uses it with the leads from a previous, lower-spec instrument. The leads are CAT III. The whole arrangement is CAT III by the chain rule. On a CAT IV measurement (e.g. a continuity test at a meter tail position with an unrestricted prospective fault current), the leads are the weak link — if a fault occurs during testing, the leads are the failure point and the inspector is the casualty."
            doInstead="CAT rating of the leads must equal or exceed the CAT rating required by the location. Premium instruments come with matched leads; replacement leads must be specified to the same CAT. The CAT chain is only as strong as its weakest link — Reg 643.11 / BS EN 61010 covers this directly."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Calibration and confidence</ContentEyebrow>

          <ConceptBlock
            title="When to calibrate, and what calibration actually proves"
            plainEnglish="BS 7671 does not mandate annual calibration of installation test instruments. It does require that the instrument is fit for purpose under Reg 643.1. In practice, calibration certificates from a UKAS-accredited lab on an annual cadence are the industry default — and they are what a court or insurer expects to see if a measurement is later challenged."
          >
            <p>
              Calibration proves that the instrument&rsquo;s reading agrees with a known reference
              within the manufacturer&rsquo;s stated accuracy. It does not prove the instrument gave
              the right reading on a specific job — that depends on technique (nulling, lead
              integrity, probe contact). Three habits that strengthen the calibration record:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Annual UKAS calibration.</strong> The certificate is the audit trail. Keep
                it filed by serial number and accessible if a measurement is challenged.
              </li>
              <li>
                <strong>Field check.</strong> A 1.0 Ω calibration resistor (a small precision
                resistor with a known value to ±0.5 %) tells you in seconds whether the instrument
                is reading near-nominal. Carry one in the test kit.
              </li>
              <li>
                <strong>Documented checks on the meter housing.</strong> A small label with the last
                calibration date, the next due date, and the lead-resistance value is all a court
                needs to see for due-diligence.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.1: instruments shall be chosen in accordance with BS EN 61557. For low-resistance measurement, that means BS EN 61557-4.',
              'BS EN 61557-4: instrument capable of low-resistance measurement, classic spec ≥ 200 mA test current at 4–24 V open circuit. The 200 mA is what penetrates partial joints — a multimeter at 1 mA cannot.',
              'A low-resistance ohmmeter is conceptually a constant-current source plus a high-impedance voltmeter. R = V / I_test, with lead resistance subtracted by the null block.',
              'Null the leads at every test session and after every lead change. Lead resistance (0.10–0.30 Ω) is comparable to a real reading — skipping the null inflates every result.',
              'No null function? Measure the leads and subtract by hand — GN3 Reg 2.13 permits this. Record both the measured and the corrected values.',
              'Total reading = bulk conductor + Σ contact resistances. The excess over calculated bulk IS the contact-resistance fingerprint — Method 2 localises which joint.',
              'Polarised vs non-polarised: take a dual-polarity reading on suspect mixed-metal joints; use the larger value.',
              'Absolute method (vs calculated) for new work; comparative method (vs similar paths) for periodic inspection without design data. Both are legitimate.',
              'CAT rating chain: the test arrangement is only as good as its weakest element. Match leads to the meter spec.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is the 200 mA minimum test current still in the current edition of BS EN 61557-4?',
                answer:
                  'The current edition is more functional in its wording — the instrument shall be "capable of low-resistance measurement" — and removes the explicit numeric minimum from the headline requirement. However the 200 mA / 4–24 V open-circuit characteristic is preserved as the de facto benchmark in the standard&rsquo;s detailed requirements and in every UK-market MFT spec sheet. Any instrument that cannot push 200 mA at low impedance is unlikely to satisfy the "no lesser degree of performance" clause in Reg 643.1.',
              },
              {
                question:
                  'My MFT auto-nulls when I press the test button. Do I still need to manually null?',
                answer:
                  'Auto-null on test typically captures the lead resistance momentarily before the actual measurement. That is better than no null, but it depends on the leads being in firm contact with each other or a known-zero fixture at the start of every test. In practice, manual null at the start of every session — and after any lead change — is the safer habit. Auto-null is a backstop, not a substitute.',
              },
              {
                question: 'How often should I have my MFT calibrated?',
                answer:
                  'Annually is the UK industry default for UKAS-accredited calibration. BS 7671 does not mandate this frequency, but insurers, scheme providers (NICEIC, NAPIT, ELECSA, Stroma) and most QA frameworks expect an annual certificate. Between calibrations, a 1.0 Ω calibration resistor in your test kit lets you do a daily field check; if the reading drifts more than ±0.05 Ω from nominal, send the instrument for recalibration before its annual due date.',
              },
              {
                question:
                  'Can I use an insulation-resistance tester switched to "ohms" for continuity?',
                answer:
                  'No. An insulation-resistance tester switched to ohms typically pushes a few mA — far below the 200 mA benchmark. It is fine for confirming a conductor is connected (yes/no continuity), but not for the Reg 643.2.1 measurement of resistance. Use a dedicated low-resistance ohmmeter or an MFT&rsquo;s low-Ω range. The instruments are physically distinct because the test currents are orders of magnitude apart.',
              },
              {
                question:
                  'My readings are systematically 0.10 Ω higher than calculated across multiple circuits. Is the cable cold?',
                answer:
                  'Cable temperature is one possibility — at 5°C, copper resistance is about 6 % below the 20°C value (so cold cable should read LOWER, not higher). A systematic upward bias across multiple circuits is much more likely a lead-drift artefact. Re-null and re-measure one circuit; if the new reading is closer to calculated, the systematic offset was your lead resistance creeping up. Replace lead-end probes if they look worn, or have a spare set on the bench.',
              },
              {
                question:
                  'Four-terminal Kelvin sensing — should I be using this in installation testing?',
                answer:
                  'Rarely. Kelvin sensing is the gold standard for laboratory micro-ohm measurements and for very low-resistance bond testing on critical equipment (e.g. medical earth bonds, tower earthing schemes), but UK installation testing instruments are almost universally two-terminal with a null function. Where you encounter a verification that demands sub-milliohm accuracy, a dedicated four-terminal micro-ohmmeter is the right tool — but you would know if you were on that job, because the spec would explicitly demand it.',
              },
              {
                question: 'How does the CAT rating chain affect my choice of leads?',
                answer:
                  'The CAT rating of a test arrangement equals the LOWEST CAT rating of any element — instrument, leads, probes, clips, fuses. If your meter is CAT IV 600 V but your leads are CAT III 600 V, the arrangement is CAT III. CAT III is fine for distribution-board work; CAT IV is the requirement at meter-tail / origin-of-supply positions. Always check the leads&rsquo; CAT rating against the location you will be measuring at. Replacement leads must equal or exceed the meter&rsquo;s rating; cheap leads are a category-rating downgrade.',
              },
              {
                question:
                  'Wet/damp conditions and the >25 V test voltage warning — does this apply to a low-resistance ohmmeter?',
                answer:
                  'Mostly no. BS EN 61557-4 instruments operate at 4–24 V open circuit, which is below the 25 V AC threshold even at the top of their range. The Reg 643.11 warning is more relevant to insulation testing (500 V) and loop impedance testing (mains-derived) where the test voltage is genuinely a touch-shock hazard in wet conditions. That said, even a 24 V tester deserves caution on a saturated job — no test voltage should be applied carelessly when standing in water.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Low resistance measurement techniques — Module 3.5"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-3/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Interpreting continuity results
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

export default InspectionTestingModule3Section5;
