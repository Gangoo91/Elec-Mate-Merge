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
    id: 'mod5-s6-no-trip-mechanism',
    question:
      'How does the no-trip Zs method on a multifunction tester avoid tripping the 30 mA RCD it is testing through?',
    options: [
      'It bypasses the RCD electronically inside the meter',
      'It pulses a small test current well below the RCD IΔn (typically ≈ 15 mA for a 30 mA RCD) for a controlled number of half-cycles, integrates multiple pulses, and extrapolates Zs from the small voltage drop using U₀ / Z',
      'It uses DC, which the RCD does not detect',
      'It tests at a higher frequency than the RCD detects',
    ],
    correctIndex: 1,
    explanation:
      'The no-trip method keeps the residual current well below IΔn — typically around 15 mA for a 30 mA RCD — for a controlled number of half-cycles. The voltage drop is small, so the meter sums multiple pulses and applies digital filtering before reporting Zs. The RCD never sees enough residual current to operate within its time window.',
  },
  {
    id: 'mod5-s6-table-pick',
    question:
      'On a TN-C-S socket circuit, an MCB is the fault-protection device and a 30 mA RCD provides additional protection (Reg 415.1). No-trip Zs reads 1.21 Ω against an MCB Table 41.3 limit of 1.37 Ω. Which Zs limit governs?',
    options: [
      'Table 41.5 (1667 Ω) — the RCD is in the loop',
      'Table 41.3 (1.37 Ω) — the MCB is the fault-protection device; the RCD is additional protection per Reg 415.1, not Reg 411.5.3 fault protection. 1.21 < 1.37 → compliant',
      'Both 41.3 and 41.5 — record the lower as the limit',
      'No table applies because the RCD is present',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.5 only governs when the RCD itself is the fault-protection device under Reg 411.5.3 (TT, or TN where the overcurrent device cannot meet the time). On a TN-C-S socket circuit the MCB is the fault-protection device and Table 41.3 is the limit; the 30 mA RCD provides additional protection (Reg 415.1) but does not change the Zs ceiling.',
  },
  {
    id: 'mod5-s6-tt-rcd-limit',
    question:
      'A TT installation has a 30 mA RCD as the fault-protection device. No-trip Zs reads 220 Ω. Apply Table 41.5 and Reg 411.5.3.',
    options: [
      'Fail — anything over 100 Ω is non-compliant on TT',
      'Pass — 220 Ω is comfortably below the Table 41.5 maximum of 1667 Ω at 30 mA, and 220 × 0.030 = 6.6 V (under 50 V). Note that Table 41.5 NOTE 2 warns electrode resistance above 200 Ω may not be stable',
      'Fail — Table 41.3 governs and 220 Ω vastly exceeds it',
      'Pass only if a 100 mA RCD is fitted instead',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.5 caps Zs at 1667 Ω for a 30 mA RCD at 230 V; 220 Ω is well inside. Reg 411.5.3 sets Ra × IΔn ≤ 50 V; 220 × 0.030 = 6.6 V is under 50 V. Both compliance routes pass. NOTE 2 to Table 41.5 cautions that electrode resistance above 200 Ω may drift with soil drying / freezing — record the seasonal context or improve the electrode.',
  },
  {
    id: 'mod5-s6-trip-time',
    question:
      'After a no-trip Zs measurement on a 30 mA RCBO, you trip-test the device at IΔn per Reg 643.8. The displayed disconnection time is 36 ms. Verdict?',
    options: [
      'Fail — RCDs must operate within 10 ms',
      'Pass — BS 7671 deems effectiveness verified where a general non-delay RCD disconnects within 300 ms maximum at IΔn. 36 ms is comfortably inside that limit. Record the actual time on the schedule',
      'Pass only if also tripping at 5 × IΔn',
      'Fail — 30 mA RCDs must operate within 20 ms',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.8 / BS EN 61557-6 testing deems a general non-delay RCD effective where it disconnects within 300 ms maximum at IΔn. 36 ms is well inside the limit and typical of a healthy modern RCBO. S-type devices have a 130–500 ms band. Record the actual measured time so the next inspector has trend data, not just a pass/fail bit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On an RCD-protected circuit, why does a standard high-current loop test trip the RCD before it can give a Zs reading?',
    options: [
      'The RCD is faulty',
      'A high-current loop test injects ≥ a few amps L–E for several mains cycles. That residual current of several amps far exceeds the 30 mA IΔn — the RCD trips well before the meter completes the loop measurement',
      'The test current is too low for the RCD to detect',
      'The meter shorts out the RCD test winding',
    ],
    correctAnswer: 1,
    explanation:
      'A traditional loop test injects on the order of 10–25 A line-to-earth for several mains cycles. That is several hundred times a 30 mA RCD trip threshold. The RCD trips long before the meter has the cycles it needs to compute Zs — which is why the no-trip method exists.',
  },
  {
    id: 2,
    question:
      'How does the no-trip Zs method on a multifunction tester avoid tripping the RCD it is testing through?',
    options: [
      'It bypasses the RCD electronically',
      'It applies a much smaller test current (well below the RCD IΔn) for a controlled number of half-cycles, then mathematically extrapolates to the full Zs from the small voltage drop measured',
      'It uses DC instead of AC',
      'It tests at a higher frequency than the RCD detects',
    ],
    correctAnswer: 1,
    explanation:
      "The no-trip method injects a test current well below the RCD's rated residual operating current — typically around 15 mA for a 30 mA RCD — for a small number of half-cycles. The meter measures the resulting voltage drop, repeats the pulse to integrate the signal, and extrapolates Zs from U₀ / Z. The RCD stays closed because the residual current never reaches IΔn within the time window required to operate.",
  },
  {
    id: 3,
    question:
      'Reg 643.7.3 (and the supporting A4 NOTE) requires what when an RCD is the protective device against indirect contact?',
    options: [
      'Skip the Zs verification — RCD trip test is enough',
      'Verify disconnection time using suitable test equipment to BS EN 61557-6 to confirm the relevant requirements of Chapter 41 are met, taking the RCD operating characteristic into account',
      'Use a 5 A loop tester',
      'Replace the RCD with an MCB before testing',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.7.3 requires verification of automatic disconnection by RCDs using suitable test equipment to BS EN 61557-6 to confirm Chapter 41 disconnection-time requirements are met. The Zs of the protected circuit must still be known (per Reg 411.5.3 and Table 41.5) — the no-trip method is what lets you measure it without tripping the RCD on every test.',
  },
  {
    id: 4,
    question:
      'For a 30 mA RCD on a 230 V supply, what is the maximum permitted Zs from BS 7671 Table 41.5?',
    options: ['1667 Ω', '500 Ω', '167 Ω', '50 Ω'],
    correctAnswer: 0,
    explanation:
      'Table 41.5 in BS 7671:2018+A4:2026 gives the maximum Zs for non-delayed and S-type RCDs at Uy = 230 V. For IΔn = 30 mA the maximum Zs is 1667 Ω. The figure follows from Reg 411.5.3 (IΔn × Zs ≤ 50 V) and is the upper bound; the asterisked NOTE flags that earth-electrode resistance above 200 Ω may not be stable.',
  },
  {
    id: 5,
    question:
      'When does Reg 411.5.3 (RCD as the protective device for fault protection) typically apply, and what changes about the Zs limit?',
    options: [
      'Only on TN-S installations — Zs limit is the same as for MCBs',
      'On TT systems, where the earth-fault loop impedance is too high for an overcurrent device to disconnect within the required time. The Zs limit becomes the Table 41.5 value (1667 Ω at 30 mA, etc.) — far higher than a MCB-based limit, because the RCD operates on residual current not on Zs',
      'Only in bathrooms',
      'Only on circuits over 32 A',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.5.3 applies where an RCD is used for fault protection — almost always on TT systems (where electrode resistance keeps Zs too high for an overcurrent device to operate within the required time) and on parts of TN systems where the same logic applies. The Zs limit jumps to the Table 41.5 value because the RCD trips on residual current, not on a high fault current.',
  },
  {
    id: 6,
    question:
      "Your meter reports a no-trip Zs reading of 1.21 Ω on a 30 mA RCD-protected socket circuit (TN-C-S). Compare against the Table 41.3 limit for the upstream B32 MCB (1.37 Ω at 70°C). What's your conclusion?",
    options: [
      'Compliant — Zs is within the MCB Table 41.3 limit, so the MCB will operate within the required disconnection time. The RCD is in addition to (not instead of) the MCB on this circuit, and Table 41.5 does not bite because Reg 411.5.3 is not the protective measure',
      'Non-compliant — Zs must be within the Table 41.5 RCD limit (1667 Ω) only',
      'Both Table 41.3 and Table 41.5 limits must be applied — record the lower as the limit',
      'The reading is invalid because no-trip',
    ],
    correctAnswer: 0,
    explanation:
      'On a TN-C-S socket circuit the MCB is the fault-protection device (Reg 411.4 / Table 41.3 limits) and the 30 mA RCD is providing additional protection (Reg 415.1) — not Reg 411.5.3 fault protection. The applicable Zs limit is the MCB Table 41.3 figure. 1.21 Ω &lt; 1.37 Ω → compliant. Table 41.5 only governs when the RCD itself is the fault-protection device.',
  },
  {
    id: 7,
    question:
      'On a TT system with a 30 mA RCD as fault-protection, your no-trip Zs reads 220 Ω and the earth electrode resistance reads 180 Ω. What does Table 41.5 NOTE 2 / 411.5.3 commentary say about this?',
    options: [
      'Compliant — within 1667 Ω limit',
      'Compliant against the 1667 Ω limit but the earth-electrode resistance is approaching 200 Ω, where Table 41.5 NOTE warns the value may not be stable. Record the reading and either improve the electrode (additional rod / parallel arrangement) or repeat the test under different soil conditions to confirm',
      'Non-compliant — anything over 100 Ω fails',
      'Compliant only if a 100 mA RCD is fitted',
    ],
    correctAnswer: 1,
    explanation:
      'Table 41.5 NOTE 2 advises that earth electrode resistance values above 200 Ω may not be stable as soil conditions change due to drying and freezing. 180 Ω is below the limit but close enough that long-term stability is doubtful. Either improve the electrode or document the seasonal context and re-test.',
  },
  {
    id: 8,
    question:
      'You are testing an installation with a 100 mA time-delayed (S-type) upfront RCD and 30 mA RCBOs on every final circuit. The no-trip method works on the 30 mA RCBOs but the meter trips the 100 mA RCD on the upfront device whenever you try to test through it. What is the procedural fix?',
    options: [
      'Disable the 100 mA RCD for the test',
      'Use the no-trip Zs setting that targets the lower IΔn (the 30 mA limit) — the meter pulses below 30 mA, which is well below 100 mA. If the upfront 100 mA RCD still trips, check it for sensitivity drift or that you are actually on no-trip mode and not high-current loop',
      'Test at a different time of day',
      'Replace the upfront RCD',
    ],
    correctAnswer: 1,
    explanation:
      'The no-trip method pulses below the lowest RCD IΔn in the chain — typically below 30 mA for any RCD-protected installation. A 100 mA upstream RCD should never see enough current to trip during a no-trip test. If it does, either the RCD is over-sensitive (drifting in operating characteristic), or the meter is actually on high-current loop mode by error. Verify the meter setting first.',
  },
  {
    id: 9,
    question:
      'A no-trip Zs reading is reported by the meter as &lsquo;1.4 Ω ±18 %&rsquo;. Why is the no-trip accuracy band wider than the high-current method, and what does that mean for borderline readings?',
    options: [
      'The accuracy is the same — the meter is faulty',
      'No-trip works by extrapolation from a small voltage drop on a small test current, which inherently has a worse signal-to-noise ratio than a 25 A high-current test. BS EN 61557-3 / -6 allows the wider band. For borderline readings — within the meter accuracy of a Table 41.3 / 41.5 limit — repeat the test, record both readings, and apply engineering judgement against the calculated value',
      "It's a meter calibration issue",
      'Always halve the no-trip reading to get the real value',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-3 (loop impedance) and -6 (RCDs) permit a wider accuracy band on no-trip Zs measurements because the test signal is small and the meter relies on extrapolation. A typical published spec is ±15 % to ±20 % vs ±5 % on the high-current method. Borderline readings — within meter accuracy of the limit — need repetition and corroboration with the calculated R1+R2 + Ze, not blind acceptance.',
  },
  {
    id: 10,
    question:
      'After a no-trip Zs measurement you also need to confirm the RCD operates within its disconnection time. What does Reg 643.8 (additional protection) require for a 30 mA RCD?',
    options: [
      'No trip test required — Zs is enough',
      'Test using equipment to BS EN 61557-6 at the rated residual operating current (IΔn). Effectiveness is deemed verified where a general non-delay RCD disconnects within 300 ms maximum at IΔn (the BS 7671 stated limit). Most multifunction testers report the actual trip time — record it',
      'Trip at 5 × IΔn only',
      'Trip at half IΔn — anything above that is a fail',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.8 (additional protection) requires verification of RCD operation using equipment to BS EN 61557-6. BS 7671 states that effectiveness is deemed verified where a general non-delay RCD disconnects within 300 ms maximum at IΔn — that is the stated acceptance limit. Most multifunction testers record the actual trip time; record it on the schedule for the next inspector.',
  },
];

const InspectionTestingModule5Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'EFLI testing of RCD-protected circuits | I&T Module 5.6 | Elec-Mate',
    description:
      'Reg 643.7.3 + Reg 411.5.3: the no-trip Zs method, why high-current loop tests trip the RCD, the Table 41.5 limits for RCD-as-fault-protection, and how the meter pulses below IΔn to extrapolate Zs without disconnecting the supply.',
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6"
            title="EFLI testing of RCD-protected circuits"
            description="The no-trip Zs method, why a high-current loop test trips the RCD on every attempt, and the regulation that makes you measure Zs anyway. Reg 643.7.3, Reg 411.5.3 and Table 41.5."
            tone="yellow"
          />

          <TLDR
            points={[
              'A high-current loop test (≈ 10–25 A line-to-earth for several mains cycles) is far above the 30 mA IΔn of an RCD. The RCD trips before the meter can compute Zs.',
              'The no-trip Zs method on a multifunction tester injects a small pulse (typically ≈ 15 mA for a 30 mA RCD) for a controlled number of half-cycles, sums multiple pulses to extract a tiny voltage drop, and extrapolates Zs from U₀ / Z without ever reaching IΔn.',
              'Reg 643.7.3 requires verification of automatic disconnection by RCDs using equipment to BS EN 61557-6. Where an RCD is the protective device against indirect contact (Reg 411.5.3), the Zs limit becomes the Table 41.5 value — 1667 Ω for 30 mA at 230 V, dramatically higher than an MCB-based limit.',
              "Reg 411.5.3 applies primarily on TT systems (electrode-only earth means Zs is too high for overcurrent disconnection) and on parts of TN systems with the same constraint. Where an RCD is merely 'additional protection' (Reg 415.1) on a circuit whose fault protection is an MCB, the standard Table 41.3 Zs limits still apply.",
              'No-trip accuracy is typically ±15–20 % vs ±5 % for high-current. Borderline readings demand repetition and corroboration against R1+R2 + Ze before accepting.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why a traditional high-current loop test cannot be used through an RCD, and what the no-trip method does differently',
              'State exactly what Reg 643.7.3 requires for RCD verification, what Reg 411.5.3 adds when the RCD is the protective device, and what Table 41.5 sets as the Zs limit',
              'Apply Table 41.5 Zs limits correctly — knowing when 1667 Ω governs (RCD as fault protection) versus when Table 41.3 governs (MCB as fault protection, RCD as additional protection)',
              "Read a no-trip Zs reading with awareness of the meter's accuracy band and judge borderline values against R1+R2 + Ze",
              'Test through a chain of RCDs / RCBOs without nuisance trips, and diagnose when the upstream device trips inappropriately',
              'Record Zs and RCD trip-time results on the A4:2026 schedule with the correct distinctions for RCD-as-fault-protection vs RCD-as-additional-protection',
            ]}
          />

          <ContentEyebrow>Why a high-current loop test cannot be used</ContentEyebrow>

          <ConceptBlock
            title="The current arithmetic — why the RCD wins every time"
            plainEnglish="A high-current loop test pushes around 10–25 A from line to earth for several mains cycles. A 30 mA RCD is designed to trip on a residual current of 30 mA. The high-current test is hundreds of times the RCD trip threshold — the RCD trips well before the meter has the data it needs."
            onSite="If you set a multifunction tester to 'high-current loop' (sometimes labelled L-PE or equivalent) on an RCD-protected circuit, you'll trip the RCD every time. That is not a meter fault — it's the meter doing exactly what it's designed to do, and the RCD doing exactly what it's designed to do, in conflict."
          >
            <p>
              The traditional loop test method, used on circuits without RCDs, briefly creates a
              real (small) line-to-earth fault and measures the resulting voltage drop / current
              flow at the supply to infer the loop impedance. The injected current is in the order
              of 10–25 A for a few mains cycles — small enough not to harm the installation, large
              enough to give a clean reading on a low-impedance loop.
            </p>
            <p>
              On an RCD-protected circuit that approach fails. A 30 mA RCD operates when the
              residual current (vector sum of currents in line + neutral) exceeds 30 mA for long
              enough to operate the trip. A 25 A line-to-earth pulse is approximately 833 × IΔn —
              the RCD will operate within tens of milliseconds, well inside the test cycle window.
              The meter sees the supply disappear and reports an error.
            </p>
            <p>
              The same arithmetic applies on a 100 mA RCD (250 × over) and even on a 300 mA RCD (83
              × over). Any RCD-protected circuit needs a different test method.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3"
            clause={
              <>
                The effectiveness of automatic disconnection of supply by RCDs shall be verified
                using suitable test equipment according to BS EN 61557-6 to confirm that the
                relevant requirements of Chapter 41 are met, taking into account the operating
                characteristic of the device.
              </>
            }
            meaning="Two duties packed into one regulation. (1) Verify the RCD itself operates correctly using BS EN 61557-6 test equipment — this is the trip-time test. (2) Confirm the relevant requirements of Chapter 41 — which means verifying Zs against the relevant table (41.3 or 41.5 depending on whether the RCD is the fault-protection device). Both duties together demand a Zs reading that does not trip the RCD."
          />

          <SectionRule />

          <ContentEyebrow>How the no-trip method actually works</ContentEyebrow>

          <ConceptBlock
            title="Pulse-summation extrapolation — the meter's clever workaround"
            plainEnglish="The no-trip method injects a test current much smaller than the RCD's IΔn (typically about 15 mA for a 30 mA RCD), for a small number of half-cycles. It does this several times — pulsing on, pausing, pulsing on again — and integrates the resulting voltage drops to extract a clean signal. From the relationship Z = ΔU / Δi the meter calculates Zs, then displays it as kA equivalent or Ω as configured."
            onSite="The reason it works is the same arithmetic in reverse. 15 mA is half the RCD trip threshold and well within its non-operating zone for the few half-cycles required. Even after several pulses, the cumulative residual current never integrates above IΔn for the time window the RCD watches. The RCD stays closed; the meter gets enough voltage-drop data to extrapolate to Zs at U₀ / Z."
          >
            <p>The technique has three components:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sub-IΔn pulse:</strong> the meter applies a controlled L–E test current well
                below the RCD trip threshold. For a 30 mA RCD installation the typical figure is
                around 15 mA. The pulse is brief — fractions of a mains cycle to a few half-cycles —
                limited by the RCD's operating characteristic so that the pulse's contribution to
                the integrated residual current never reaches IΔn for the I²t profile of the RCD.
              </li>
              <li>
                <strong>Repeated pulses, signal averaging:</strong> a single sub-IΔn pulse produces
                a voltage drop too small to read accurately. The meter pulses several times and
                integrates the resulting waveforms to lift the signal above the noise floor of the
                supply. This is why a no-trip Zs measurement takes noticeably longer than a
                high-current measurement — the meter is gathering data, not just sampling.
              </li>
              <li>
                <strong>Extrapolation to Zs:</strong> from Ohm's law, Z = ΔU / Δi. The meter knows
                the test current it injected, measures the resulting voltage drop, and computes Z.
                That Z, multiplied through the U₀ / Z relationship, gives the prospective fault
                current at IΔn, which the meter back-converts to a Zs reading in ohms.
              </li>
            </ol>
            <p>
              The trade-off is accuracy. BS EN 61557-3 (loop impedance) and BS EN 61557-6 (RCDs)
              permit a wider accuracy band on no-trip than high-current — typically ±15 % to ±20 %
              vs ±5 %. That tolerance comes from the small-signal extrapolation: a real high-current
              test pushes a clean fault and reads it directly; a no-trip test infers from a much
              smaller signal and extrapolates. The reading is fit for purpose for compliance against
              the Table 41.3 / 41.5 limits, but borderline readings demand repetition.
            </p>
          </ConceptBlock>

          {/* High-current vs no-trip diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              High-current loop vs no-trip Zs — what the RCD sees in each
            </h4>
            <svg
              viewBox="0 0 800 440"
              className="w-full h-auto"
              role="img"
              aria-label="Two test methods compared. Top: high-current loop test injects 25 A line-to-earth. The current crosses the 30 mA RCD trip threshold by a factor of 833 — the RCD operates and the test fails. Bottom: no-trip Zs method injects 15 mA pulses below the 30 mA threshold, repeats them, and extrapolates Zs without operating the RCD."
            >
              {/* Top: HIGH-CURRENT METHOD */}
              <rect
                x="20"
                y="20"
                width="760"
                height="180"
                rx="10"
                fill="rgba(239,68,68,0.04)"
                stroke="rgba(239,68,68,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="12"
                fontWeight="bold"
              >
                HIGH-CURRENT LOOP TEST — RCD trips, no Zs reading
              </text>

              {/* Axis */}
              <line
                x1="60"
                y1="160"
                x2="740"
                y2="160"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text x="50" y="165" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9">
                0 mA
              </text>

              {/* IΔn threshold line */}
              <line
                x1="60"
                y1="135"
                x2="740"
                y2="135"
                stroke="#FBBF24"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <text x="50" y="139" textAnchor="end" fill="#FBBF24" fontSize="9">
                IΔn = 30 mA
              </text>

              {/* High pulse */}
              <rect x="200" y="60" width="80" height="100" fill="#EF4444" opacity="0.85" />
              <text x="240" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                25 A
              </text>
              <text x="240" y="178" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                test pulse
              </text>

              {/* Trip event */}
              <line
                x1="280"
                y1="60"
                x2="280"
                y2="170"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <polygon points="280,60 274,72 286,72" fill="#EF4444" />
              <text x="295" y="78" textAnchor="start" fill="#EF4444" fontSize="9" fontWeight="bold">
                ⚠ RCD operates here
              </text>
              <text x="295" y="92" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="9">
                833 × IΔn after &lt;40 ms
              </text>

              {/* Result */}
              <text x="500" y="135" textAnchor="start" fill="rgba(255,255,255,0.5)" fontSize="9">
                meter reports error · supply lost
              </text>
              <text
                x="500"
                y="178"
                textAnchor="start"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Cannot give Zs
              </text>

              {/* Bottom: NO-TRIP METHOD */}
              <rect
                x="20"
                y="220"
                width="760"
                height="200"
                rx="10"
                fill="rgba(34,197,94,0.04)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="244"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                NO-TRIP Zs METHOD — sub-IΔn pulses, RCD stays closed
              </text>

              {/* Axis */}
              <line
                x1="60"
                y1="380"
                x2="740"
                y2="380"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text x="50" y="385" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="9">
                0 mA
              </text>

              {/* IΔn threshold line (drawn LOW because we're well below it) */}
              <line
                x1="60"
                y1="320"
                x2="740"
                y2="320"
                stroke="#FBBF24"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <text x="50" y="324" textAnchor="end" fill="#FBBF24" fontSize="9">
                IΔn = 30 mA
              </text>

              {/* Five small pulses, each well below threshold */}
              <rect x="120" y="350" width="40" height="30" fill="#22C55E" opacity="0.85" />
              <rect x="180" y="350" width="40" height="30" fill="#22C55E" opacity="0.85" />
              <rect x="240" y="350" width="40" height="30" fill="#22C55E" opacity="0.85" />
              <rect x="300" y="350" width="40" height="30" fill="#22C55E" opacity="0.85" />
              <rect x="360" y="350" width="40" height="30" fill="#22C55E" opacity="0.85" />

              <text
                x="260"
                y="345"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Each pulse ≈ 15 mA · half RCD threshold
              </text>
              <text x="260" y="408" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Pulses repeat — meter integrates voltage drops
              </text>

              {/* Arrow to result */}
              <line
                x1="430"
                y1="365"
                x2="490"
                y2="365"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="490,365 482,361 482,369" fill="rgba(255,255,255,0.4)" />

              {/* Result box */}
              <rect
                x="500"
                y="320"
                width="220"
                height="80"
                rx="6"
                fill="rgba(34,197,94,0.1)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="610"
                y="342"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Z = ΔU / Δi · extrapolation
              </text>
              <text
                x="610"
                y="360"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
              >
                Zs = 1.21 Ω
              </text>
              <text x="610" y="376" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                ±18 % per BS EN 61557-3
              </text>
              <text x="610" y="392" textAnchor="middle" fill="#22C55E" fontSize="9">
                RCD never operated
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

          <ContentEyebrow>The Zs limit — Table 41.3 vs Table 41.5</ContentEyebrow>

          <ConceptBlock
            title="The decision tree — which limit applies, and when"
            plainEnglish="If the RCD is the only thing protecting against indirect contact (most often: a TT system), you compare Zs against the Table 41.5 RCD limit. If the RCD is just additional protection on a circuit whose fault protection is an MCB (most TN-C-S socket circuits), you compare against the standard Table 41.3 / A4:2026 limit for the MCB. Two limits, very different numbers — knowing which applies is the test of competence."
            onSite="The single question to ask: 'If this RCD failed, would the upstream MCB still disconnect within the Reg 411.3.2 time?' If yes, the MCB is the fault-protection device and Table 41.3 governs. If no — typically because Zs is too high for the MCB to operate fast enough — then the RCD is the fault-protection device under Reg 411.5.3 and Table 41.5 governs."
          >
            <p>Two regulations, two columns of the EIC schedule:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Scenario</th>
                    <th className="text-left text-white/80 py-2">Fault-protection device</th>
                    <th className="text-left text-white/80 py-2">Zs limit applies</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TN-C-S socket circuit · B32 MCB + 30 mA RCD</td>
                    <td className="py-2">MCB (Reg 411.4)</td>
                    <td className="py-2">Table 41.3 (≈1.37 Ω at 70°C)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TT installation · 30 mA RCD only</td>
                    <td className="py-2">RCD (Reg 411.5.3)</td>
                    <td className="py-2 text-elec-yellow">Table 41.5 (1667 Ω at 30 mA)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TN-S high-Zs run · 100 mA RCD as fault protection</td>
                    <td className="py-2">RCD (Reg 411.5.3)</td>
                    <td className="py-2 text-elec-yellow">Table 41.5 (500 Ω at 100 mA)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Bathroom · 30 mA RCBO</td>
                    <td className="py-2">RCBO O/C element (Reg 411.4)</td>
                    <td className="py-2">Table 41.3 for the O/C device</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The point of the table: Table 41.5's headline figure of 1667 Ω at 30 mA looks
              extraordinary compared to a 1.37 Ω MCB limit, and it is — because the RCD operates on
              residual current, not on Zs. The high Zs limit is what makes RCD fault-protection
              workable on TT installations where electrode-only earth pushes Zs into hundreds of
              ohms.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.5.3"
            clause={
              <>
                Where an RCD is used for fault protection, the following conditions shall be
                fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2
                or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances of the
                earth electrode and the protective conductor connecting it to the
                exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current
                of the RCD. The requirements of this regulation are met if the earth fault loop
                impedance of the circuit protected by the RCD meets the requirements of Table 41.5.
              </>
            }
            meaning="Two compliance routes for an RCD-as-fault-protection circuit. Route (a)+(b): demonstrate Ra × IΔn ≤ 50 V — the touch-voltage limit. Route (alternative): demonstrate Zs of the protected circuit meets Table 41.5. Either is acceptable. Most testers use Route 2 because Zs is what the no-trip test gives directly. The Ra × IΔn route is needed when the electrode is in series with the test loop and the meter cannot extract Ra alone."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Table 41.5 · Maximum earth fault loop impedance Zs for RCDs at Uy = 230 V"
            clause={
              <>
                Maximum earth fault loop impedance (Zs) for non-delayed and time delayed
                &lsquo;S&rsquo; type RCDs to BS EN 61008-1 and BS EN 61009-1 for Uy of 230 V: 30 mA
                → 1667 Ω*; 100 mA → 500 Ω*; 300 mA → 167 Ω; 500 mA → 100 Ω. Disconnection shall be
                within the times stated in Table 41.1. NOTE 2: * The resistance of the installation
                earth electrode should be as low as practicable. A value exceeding 200 Ω may not be
                stable.
              </>
            }
            meaning="The asterisks against the 30 mA and 100 mA values matter: at those rated residual currents the table-listed Zs is so high that the earth electrode dominates the loop. NOTE 2 is the warning that an electrode reading near 200 Ω is not a reliable design — soil drying / freezing will move it. Treat 200 Ω as a hard ceiling on the electrode regardless of the table Zs."
          />

          <Scenario
            title="A TT installation with a 30 mA RCD as the fault-protection device"
            situation="A rural property is supplied via TT (DNO does not provide a network earth). The installation has a single rod earth electrode measured at 65 Ω. The consumer unit has a 30 mA upfront main switch / RCD. A 32 A radial socket circuit is the test target — no-trip Zs reading at the furthest socket is 67.4 Ω."
            whatToDo={
              <>
                <span className="block">
                  Reg 411.5.3 applies — the RCD is the fault-protection device on a TT system. Table
                  41.5 limit at 30 mA = 1667 Ω.
                </span>
                <span className="block">
                  67.4 Ω &lt;&lt; 1667 Ω → compliant against Table 41.5.
                </span>
                <span className="block">
                  Cross-check Ra × IΔn ≤ 50 V: Ra ≈ 65 Ω (electrode); 65 × 0.030 = 1.95 V →
                  comfortably below 50 V. Both compliance routes pass.
                </span>
                <span className="block">
                  Earth electrode is well below the 200 Ω stability limit (Table 41.5 NOTE 2).
                  Record the electrode reading on the EIC origin schedule, record Zs at the furthest
                  socket (67.4 Ω), record the RCD trip time at IΔn from the trip-time test (per Reg
                  643.8 / 643.7.3, BS EN 61557-6, &lt;300 ms acceptance for non-delay).
                </span>
              </>
            }
            whyItMatters="A TT installation does not get the same Zs treatment as a TN-S/TN-C-S supply because the electrode is in series with every fault. The Table 41.5 limit is the lifeline that makes RCD fault-protection workable. Quoting a Table 41.3 limit on a TT system is a category error — the MCB will never operate fast enough at 67 Ω, and the RCD is the only thing standing between the user and a sustained earth fault."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Trip-time testing — the second half of Reg 643.7.3</ContentEyebrow>

          <ConceptBlock
            title="What Reg 643.8 / 643.7.3 say about RCD trip-time verification"
            plainEnglish="After the no-trip Zs measurement, the RCD itself needs to be tested for operation at its rated residual current. BS 7671 deems effectiveness verified when a general non-delay RCD operates within 300 ms maximum at IΔn — that is the regulatory acceptance limit. Most multifunction testers run the test automatically and record the actual trip time."
            onSite="The trip-time test is destructive in the sense that the RCD does open. Co-ordinate with the customer; a domestic test typically takes 30 seconds per RCD including the reset. On a board with several RCDs, take the trip-time tests at the end of the visit so any inadvertent loss of supply does not interfere with other tests."
          >
            <p>The two BS 7671 trip-time anchor points:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At IΔn (the rated residual operating current):</strong> for a general
                non-delay type RCD, BS 7671 deems effectiveness verified where the device operates
                within 300 ms maximum. Most working RCDs operate within 30–40 ms — well inside the
                limit. A trip time approaching 300 ms is a flag that the RCD is drifting and should
                be investigated.
              </li>
              <li>
                <strong>At 5 × IΔn (the additional protection trip-time check):</strong> Reg 415.1
                additional protection requires operation within 40 ms at 5 × IΔn. Most modern
                multifunction testers run this test as a separate step or on a different mode.
              </li>
            </ul>
            <p>
              Both trip-time results go on the schedule of test results, alongside the Zs reading
              from the no-trip method. The pair is the audit trail that demonstrates Reg 643.7.3 has
              been satisfied — Zs verified, and operating characteristic verified.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording &lsquo;RCD test passed&rsquo; without the trip-time number"
            whatHappens="An RCD operates on the test press of the trip-time button — so the inspector ticks &lsquo;Pass&rsquo; on the schedule and moves on. Six months later a different inspector tries to compare against trends and finds no actual numbers — just a tick. The RCD turns out to be drifting (older units lose sensitivity slowly), and by the time it is investigated the trip time at IΔn is 280 ms — almost out of compliance. Without a baseline number on the previous EIC there is no way to demonstrate the drift had been monitored."
            doInstead="Record the actual trip time in milliseconds on the schedule — both at IΔn (e.g. 31 ms) and at 5 × IΔn for additional-protection circuits (e.g. 18 ms). The schedule of test results has dedicated columns for these. A tick is not a record; a number is. Reg 643.7.3 is met by the number, not by the tick."
          />

          <CommonMistake
            title="Using the high-current loop test &lsquo;just to check&rsquo; on an RCD-protected circuit"
            whatHappens="The inspector knows the no-trip method should be used, but is unsure of the reading and tries a high-current loop test &lsquo;just to confirm&rsquo;. The RCD trips. The fridge defrosts in the customer's kitchen. The boiler clock resets. The customer is unimpressed. And the inspector still does not have a high-current Zs reading — the test was incomplete by design."
            doInstead="Always use the no-trip method on RCD-protected circuits. If the no-trip reading is suspicious, repeat it; cross-check against R1+R2 + Ze (calculated Zs); and record the agreement (or disagreement). The high-current method will trip the RCD every time on any circuit where it would actually be useful — the cases where you might be tempted to use it are exactly the cases where it cannot work."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diagnostic readings — what the no-trip Zs tells you</ContentEyebrow>

          <ConceptBlock
            title="Reading the result against expectations"
            plainEnglish="A no-trip Zs reading is one of four diagnostic outcomes: within the meter accuracy of the calculated R1+R2 + Ze, significantly higher (suspect joint or extended cable), significantly lower (parallel earth path), or open (broken CPC, no earth fault path)."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">
                  Agrees with calculated R1+R2 + Ze (within meter accuracy band, typically ±15–20
                  %).
                </strong>{' '}
                Pass. Record. The no-trip method is doing what it should.
              </li>
              <li>
                <strong className="text-amber-300">Significantly higher than calculated.</strong>{' '}
                Investigate as for any high Zs reading: loose terminal, corroded joint, longer cable
                than assumed, or wrong cable size somewhere in the run. Use Method 2 continuity from
                Module 3 to localise.
              </li>
              <li>
                <strong className="text-amber-300">Significantly lower than calculated.</strong>{' '}
                Suspect parallel earth paths via metallic containment, bonded pipework, or a
                supplementary bonding route shorting the CPC. Useful, but not the value to use in
                the Zs sum without investigating.
              </li>
              <li>
                <strong className="text-red-300">Open / very high reading on a TN system.</strong>{' '}
                Broken CPC, missing termination, or a wandering test probe. Fail. Stop and
                investigate before the trip-time test — running the trip-time test on a circuit with
                a broken CPC will not detect the fault.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="An upstream 100 mA RCD trips when testing a 30 mA RCBO downstream"
            situation="A small commercial board has a 100 mA time-delayed (S-type) main RCD upstream of a row of 30 mA RCBOs. The inspector is no-trip-Zs testing one of the 30 mA RCBOs and the 100 mA upstream RCD trips before the test completes."
            whatToDo={
              <>
                <span className="block">
                  Step 1: Confirm the meter is in no-trip mode (not high-current). The error is
                  almost always a misset.
                </span>
                <span className="block">
                  Step 2: If the meter is correctly set, the upstream 100 mA RCD is operating at
                  well below 30 mA — that is sensitivity drift. The S-type characteristic should
                  give a deliberate delay; if it is tripping on a sub-30 mA pulse it has lost
                  selectivity.
                </span>
                <span className="block">
                  Step 3: Conduct a trip-time test on the 100 mA upstream RCD at its IΔn (100 mA)
                  and at half-IΔn (50 mA — should not trip). Record both.
                </span>
                <span className="block">
                  Step 4: If the upstream RCD trips at well below its rated IΔn, it has failed
                  selectivity testing and must be replaced before further no-trip Zs work on the
                  downstream RCBOs.
                </span>
              </>
            }
            whyItMatters="Selectivity in a tiered RCD arrangement is a design assumption that gets quietly verified during commissioning. An RCD that trips below its IΔn is no longer selective with the device upstream of it — a downstream fault could now operate the upstream device, killing the whole board instead of one circuit. The no-trip test, by failing to behave as expected, has handed you the diagnostic at no extra cost."
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What goes in which column on an RCD-protected circuit"
            plainEnglish="The schedule wants Zs (from the no-trip test), the RCD type and IΔn, the trip time at IΔn, and (where additional protection per Reg 415.1 is in scope) the trip time at 5 × IΔn. Each value gets a dedicated column under the A4:2026 layout. Comments capture the fault-protection device decision."
          >
            <p>Three rules for recording RCD results:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zs column:</strong> the no-trip reading in ohms, two decimals. The same
                column used for any other Zs measurement. The schedule is silent on which method was
                used — the inspector knows from context (RCD presence) that the no-trip method is
                implied.
              </li>
              <li>
                <strong>RCD trip-time columns:</strong> at IΔn (the &lsquo;1×&rsquo; column) and at
                5 × IΔn for additional protection (the &lsquo;5×&rsquo; column). Times in
                milliseconds, whole numbers. Dashes for sections that do not apply (e.g. 5× column
                on a circuit where the RCD is not providing additional protection).
              </li>
              <li>
                <strong>Comments column:</strong> the fault-protection device when it differs from
                the obvious. On a TT installation, &lsquo;Reg 411.5.3 fault protection by RCD; Table
                41.5 applied&rsquo;. On a TN-C-S socket circuit, no comment is needed — Table 41.3
                governs by default. Where the Table 41.5 NOTE 2 stability concern applies (electrode
                approaching 200 Ω), record the electrode resistance and the seasonal context.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              "A high-current loop test on an RCD-protected circuit will always trip the RCD — that's the test working correctly, not a fault.",
              "The no-trip Zs method pulses below the RCD's IΔn (typically ≈ 15 mA for a 30 mA RCD), repeats, and extrapolates Zs from U₀ / Z. The RCD never sees enough residual current to operate.",
              'Reg 643.7.3 requires Zs verification AND RCD trip-time verification on RCD-protected circuits. Both go on the schedule.',
              'Reg 411.5.3 + Table 41.5 govern Zs limits where the RCD is the fault-protection device (typically TT systems). At 30 mA the limit is 1667 Ω.',
              'Where the RCD is only additional protection (Reg 415.1) and an MCB is the fault-protection device, the standard Table 41.3 limits apply — not Table 41.5.',
              'Earth electrode resistance approaching 200 Ω may not be stable per Table 41.5 NOTE 2. Treat 200 Ω as a hard ceiling on the electrode regardless of the table Zs.',
              'No-trip accuracy is wider (±15–20 %) than high-current. Borderline readings demand repetition and corroboration against R1+R2 + Ze.',
              'Record actual trip-time numbers in milliseconds on the schedule, not ticks. A drifting RCD is detected by trend, not by a pass/fail box.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why does a high-current loop test trip the RCD when a no-trip test does not?',
                answer:
                  "A high-current loop test injects 10–25 A line-to-earth for several mains cycles — hundreds of times the RCD's 30 mA IΔn. The RCD operates within tens of milliseconds. The no-trip method injects a much smaller test current (typically about 15 mA for a 30 mA RCD) for a controlled number of half-cycles, with pauses between pulses, so the integrated residual current never reaches IΔn within the I²t window the RCD watches. The RCD stays closed; the meter accumulates enough voltage-drop data to extrapolate Zs.",
              },
              {
                question:
                  'When does Table 41.5 apply, and when do I use the standard Table 41.3 limits?',
                answer:
                  'Table 41.5 applies when the RCD is the fault-protection device under Reg 411.5.3 — typically on TT systems, and on parts of TN systems where Zs is too high for the upstream overcurrent device to disconnect within the Reg 411.3.2 time. Where the RCD is merely additional protection (Reg 415.1) on a circuit whose fault protection is an MCB or RCBO overcurrent element, the standard Table 41.3 / A4:2026 max-permitted-Zs limits for that overcurrent device apply.',
              },
              {
                question:
                  'A 30 mA RCD has a Table 41.5 Zs limit of 1667 Ω. Is that real or theoretical?',
                answer:
                  'It is real. The figure derives directly from Reg 411.5.3(b): IΔn × Zs ≤ 50 V → Zs ≤ 50 / 0.030 = 1667 Ω. The RCD operates on residual current, not on fault current — so Zs can be much higher than for an MCB-based protective measure. The asterisk against 30 mA and 100 mA in Table 41.5 flags that the earth electrode dominates at those Zs values, and NOTE 2 advises that electrode resistance above 200 Ω may not be stable. Use the 1667 Ω figure as the limit but treat 200 Ω as a hard ceiling on the electrode itself.',
              },
              {
                question:
                  'My no-trip Zs reading disagrees with the calculated R1+R2 + Ze by 18 %. Pass or fail?',
                answer:
                  'Probably pass — that disagreement is within the typical no-trip method accuracy band (±15–20 % per BS EN 61557-3). Repeat the test once or twice to confirm the reading is stable. If both readings agree with each other and disagree with the calculated value by a consistent amount, accept the meter reading and note the calculated value in the comments. If the readings vary widely between repeats, that is a meter or supply problem and demands investigation before recording.',
              },
              {
                question:
                  'Do I have to do trip-time testing as well as no-trip Zs, or is one of them enough?',
                answer:
                  "Both. Reg 643.7.3 requires verification of automatic disconnection by RCDs using BS EN 61557-6 test equipment to confirm Chapter 41 requirements are met, taking into account the operating characteristic of the device. That phrase 'operating characteristic' means the trip-time test. The Zs measurement alone tells you the loop will let enough current flow to operate the RCD; the trip-time test confirms the RCD actually operates within the BS 7671 acceptance limit (300 ms at IΔn for general non-delay; 40 ms at 5 × IΔn for additional protection).",
              },
              {
                question:
                  'My multifunction tester does not have a no-trip Zs mode. What are my options?',
                answer:
                  'Replace the meter — a tester without no-trip Zs cannot perform Reg 643.7.3 / 411.5.3 verification on any RCD-protected circuit, which is most modern installations. As a stop-gap, you can disconnect each RCD-protected circuit at the board and high-current loop test back from there, then reconnect — but this is slow and disruptive, and creates risk every time you re-energise. The defensible answer is a current-generation multifunction tester with a documented no-trip mode and BS EN 61557-3 / -6 compliance.',
              },
              {
                question:
                  'On a TT system, do I have to record the earth electrode resistance separately or just the Zs?',
                answer:
                  'Both, and as separate values. The EIC origin schedule has a dedicated field for the earth electrode resistance (Ra, measured by an earth-electrode tester or by the loop method as appropriate). The Zs of each protected circuit goes in the schedule of test results. Table 41.5 NOTE 2 makes the electrode reading load-bearing in its own right (200 Ω stability ceiling), so an inspector who only records Zs and skips the electrode reading has not fully complied. Record both.',
              },
              {
                question:
                  'A 100 mA upstream RCD trips when I no-trip-test a 30 mA downstream RCBO. What is going on?',
                answer:
                  "The no-trip test pulses well below 30 mA — far below the 100 mA upstream RCD's IΔn. If the upstream RCD trips on this signal, it has lost sensitivity and is no longer selective with the downstream device. Verify your meter is genuinely in no-trip mode (not high-current), then perform a trip-time test on the upstream 100 mA RCD at its rated IΔn and at half-IΔn (which should NOT operate the device). If it operates at much less than 100 mA, replace it before continuing — selectivity has failed and any earth fault on the downstream RCBO will operate the upstream device too.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="EFLI testing of RCD-protected circuits — Module 5.6"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 6 overview
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

export default InspectionTestingModule5Section6;
