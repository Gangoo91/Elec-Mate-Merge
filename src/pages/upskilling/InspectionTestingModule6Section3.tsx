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
    id: 'mod6-s3-ramp-vs-trip',
    question:
      'A site spark says "I do the trip-time test, that gives me everything I need — ramp is just extra work". What is wrong with that view?',
    options: [
      'Nothing — the trip-time test at IΔn is the only test that is ever required.',
      'Ramp reveals the actual operating current and exposes drift that fixed-current trip-time misses.',
      'Ramp is only needed on Type B devices, never on Type AC or Type A.',
      'Ramp tests are deprecated in A4:2026 and no longer carried out.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61008-1 / 61009-1 require an RCD to operate between 50 % and 100 % of IΔn. A device that trips at 31 mA passes the trip-time test fine but is sitting near the upper limit. A ramp test at 18 mA also passes the trip-time test but exposes a device drifting toward over-sensitivity. Ramp gives the actual operating current; trip-time only confirms a binary at IΔn.',
  },
  {
    id: 'mod6-s3-acceptance',
    question: 'A 30 mA Type A RCBO ramps at 8 mA. Pass or fail under BS EN 61008-1 / 61009-1?',
    options: [
      'Pass — any ramp reading below the rated IΔn is acceptable.',
      'Pass — the device is over-protective, so it cannot cause harm.',
      'Fail — 8 mA is below the 15 mA (50 %) floor, so the device is over-sensitive.',
      'Pass — 8 mA is within the additional-protection threshold of the device.',
    ],
    correctIndex: 2,
    explanation:
      'The BS EN 61008-1 / 61009-1 product-standard window is 50-100 % of IΔn. For a 30 mA device that is 15-30 mA. 8 mA fails the lower bound — the device is over-sensitive and will trip on healthy leakage current. Replace it.',
  },
  {
    id: 'mod6-s3-type-instrument',
    question:
      'You ramp a 30 mA Type B RCBO with the meter set to "AC ramp" and read 24 mA. Is the result valid for a Type B device?',
    options: [
      'Yes — 24 mA sits within the 50-100 % operating window for the device.',
      'No — an AC ramp leaves the smooth-DC and high-frequency Type B paths unexercised.',
      'Yes — Type B is a superset of Type A, so a Type A test is conservative here.',
      'Only if the device IΔn happens to be above 100 mA on this circuit.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61557-6 instruments have separate ramp settings per RCD type. A Type B device must be ramped at AC, pulsating-DC and smooth-DC settings to verify each detection class operates within the BS EN 62423 acceptance band. Ramping only at AC leaves the smooth-DC and high-frequency paths unverified.',
  },
  {
    id: 'mod6-s3-recording',
    question:
      'On the Schedule of Test Results, where does the ramp result go for a 30 mA Type A RCBO that ramps at 22 mA?',
    options: [
      'In the IΔn column — overwrite the 30 mA rating with the 22 mA reading.',
      'In the trip-time column at IΔn × 1, alongside the timing result.',
      'In the comments column — ramp has no structured field, so note 22 mA against the device.',
      'It does not need recording anywhere once the trip-time test has passed.',
    ],
    correctIndex: 2,
    explanation:
      'GN3 model forms have structured columns for IΔn, trip-time at ×0.5 / ×1 / ×5, and the device standard / type. Ramp results are not a structured column — they sit in the comments column with the actual operating current and a note that the value is within the 50-100 % BS EN 61008/61009 window.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does an RCD ramp test actually measure, and how does it differ from a 1×IΔn trip-time test?',
    options: [
      'Ramp finds the residual current at which the device trips; trip-time finds how long it takes to operate at rated current',
      'Both tests measure the same thing — the operating time of the device at its rated residual current',
      'Ramp measures the earth fault loop impedance of the circuit; trip-time measures the prospective fault current',
      'Ramp confirms the RCD test button operates; trip-time confirms the instrument injection circuit is calibrated',
    ],
    correctAnswer: 0,
    explanation:
      'Per GN3 Ch 4 Reg 4.6, the ramp test injects a slowly rising residual current from below 50 % up to 110 % of IΔn and records the current at which the device operates — that is the tripping-current threshold. The 1×IΔn test (GN3 Reg 2.31) applies a fixed current at IΔn and records the operating time. Different tests, different answers, both required for a complete picture on a problem device.',
  },
  {
    id: 2,
    question:
      'A 30 mA Type AC RCD trips at 35 mA on the ramp. Compliant or non-compliant per the BS EN 61008 acceptance band?',
    options: [
      'Compliant — anything below 50 mA is fine',
      'Compliant — only the 1×IΔn time matters',
      'Non-compliant — the band is 50–100 % of IΔn, i.e. 15–30 mA. 35 mA is over the 100 % ceiling',
      'Compliant — manufacturers allow ±20 % tolerance',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 4.6 (and the GN3 Ch 2 / OSG Ch 11 cross-references) make the band explicit: an RCD shall not trip below 50 % of IΔn AND shall trip at or before 100 % of IΔn. For a 30 mA device that is 15–30 mA. 35 mA is above the ceiling — the device is non-compliant and shall be replaced.',
  },
  {
    id: 3,
    question: 'Per GN3 Ch 4 Reg 4.6, where does the ramp current start and where does it end?',
    options: [
      '0 mA, ramping up to exactly IΔn',
      '50 % of IΔn, ramping up to 5×IΔn',
      'IΔn, ramping up to 110 % of IΔn',
      'Less than 50 % of IΔn, ramping up to 110 % of IΔn',
    ],
    correctAnswer: 3,
    explanation:
      "GN3 Reg 4.6 is explicit: the ramp commences from a value less than 50 % of the RCD's operational rating and increases to 110 % of the rating. Starting below 50 % proves the non-trip lower bound; ending at 110 % captures any device that is sluggish at the 100 % threshold.",
  },
  {
    id: 4,
    question:
      'Why does the ramp test have to be run twice on a Type AC RCD — at 0° and 180° on the test instrument?',
    options: [
      'To check the meter is calibrated',
      'Because the RCD has two coils',
      'GN3 Reg 2.31 — the test waveform is started on both the positive and negative half-cycles of the AC wave; the device can behave differently on each, and the worst-case (longer / higher) value is the one recorded',
      'It is not required for ramp tests, only for trip-time',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 2.31 requires the test waveform to be started on both half-cycles, identified as 0° and 180° on the instrument. This applies to RCD timing tests; on a Type AC ramp, take the worst (highest trip-current) reading. On Type A / F / B, the ramp is also run with appropriate waveforms (pulsed DC for A/F, smooth DC for B) at the multipliers that the device standard sets.',
  },
  {
    id: 5,
    question:
      'A 30 mA RCD trips at 14 mA on the ramp test. The clamp meter shows 8 mA of standing earth-leakage on the circuit. What is the actual tripping threshold and is the device compliant?',
    options: [
      '14 mA + 8 mA = 22 mA — compliant, within the 15–30 mA band',
      '14 mA — non-compliant, because the meter reading alone is below the 15 mA floor',
      '8 mA (the standing leakage) — non-compliant, the device is over-sensitive',
      '14 mA − 8 mA = 6 mA — non-compliant, the leakage subtracts from the trip current',
    ],
    correctAnswer: 0,
    explanation:
      'Standing leakage current is in the same circuit and adds to the test current actually being seen at the toroid. Apparent trip = 14 mA from the tester, but real residual current at the moment of trip = 14 + 8 = 22 mA. 22 mA is within 15–30 mA → compliant. Always either disconnect leaky loads for the ramp test, or measure standing leakage and add it to the meter reading.',
  },
  {
    id: 6,
    question:
      'Why does Reg 643.8 of A4:2026 mandate an alternating-current test at IΔn regardless of RCD Type, but ramp testing is still kept on the agenda?',
    options: [
      'Ramp testing has been deleted from BS 7671 and may no longer be carried out during verification',
      'Ramp testing is now the mandatory effectiveness test, with the AC test at IΔn made supplementary',
      'The AC test at IΔn and the ramp test are the same test described under two different names',
      'Reg 643.8 is the minimum test (AC at IΔn); ramp stays supplementary for sensitivity and drift',
    ],
    correctAnswer: 3,
    explanation:
      'A4:2026 changed Reg 643.8 so the only mandatory verification is an AC test at IΔn (Table 3A was removed). Ramp testing is not required for compliance, but GN3 Ch 4 Reg 4.6 still describes it because it is the only practical way to read the actual trip threshold — invaluable for selectivity, fault-finding, and detecting drift on periodic inspection.',
  },
  {
    id: 7,
    question:
      'For a Type S (selective / time-delayed) 100 mA RCD upstream of a 30 mA RCD, what does GN3 expect to see at 1×IΔn timing?',
    options: [
      'Operate time shall be no faster than 130 ms (and not more than 500 ms) per Reg 643.7.3 / OSG Ch 11 Reg 11.3',
      'It should trip in less than 40 ms, matching the additional-protection limit at 5×IΔn',
      'It shall not trip at all at 1×IΔn, only operating at 5×IΔn to guarantee discrimination',
      'It should operate in the same time as the downstream 30 mA device so the two clear together',
    ],
    correctAnswer: 0,
    explanation:
      'OSG Ch 11 Reg 11.3 and BS 7671 Reg 643.7.3 set the Type S band: at 100 % IΔn, operate time ≥ 130 ms minimum (the deliberate delay that gives a downstream 30 mA device the chance to clear) and ≤ 500 ms maximum. Trip-time on Type S, therefore, has BOTH a floor and a ceiling — unlike a non-delay device which has only a ceiling.',
  },
  {
    id: 8,
    question:
      'During a ramp test on a 30 mA Type B RCD on an EV charger, the device trips at 18 mA on the AC ramp. Is that the only test you record?',
    options: [
      'Yes — 18 mA is a comfortable pass on the AC ramp, so the device can be signed off',
      'Yes — once the meter is switched to DC mode the AC reading covers all detection paths',
      'No — Type B RCDs cannot be ramp-tested at all and must rely on the test-button check',
      'No — a Type B device must also be exercised on smooth DC per BS EN 62423, not AC alone',
    ],
    correctAnswer: 3,
    explanation:
      'Type B (BS EN 62423) is required because the protected load can produce smooth DC residual current that a Type AC or A device cannot see. A pass on the AC ramp does not prove the smooth-DC sensing path. Modern Type B-capable testers run the ramp on AC, pulsed-DC and smooth-DC waveforms; record each. A pass on AC only would leave the DC fault path unverified.',
  },
  {
    id: 9,
    question:
      'During an EICR you record a 30 mA RCD trip at 28 mA on the ramp; on the previous EICR five years ago it tripped at 19 mA. Both are inside the band. What does this tell you?',
    options: [
      'Nothing — both readings pass the band, so there is no finding to record at all',
      'The earlier 19 mA result must have been a measurement error, since a device cannot drift',
      'The device is drifting up toward the 30 mA ceiling — still compliant, but note it and re-test sooner',
      'The RCD has become over-sensitive, since the trip current has changed between inspections',
    ],
    correctAnswer: 2,
    explanation:
      'Recording the actual ramp trip current (not just pass/fail) creates a baseline. Drift from 19 mA toward 28 mA is the diagnostic — both readings comply, but the trajectory is the story. A device drifting toward the ceiling is on its way to non-compliance; the inspector who recorded it is the one who catches it before someone gets a shock.',
  },
  {
    id: 10,
    question: 'A 30 mA RCD trips at 11 mA on the ramp. Standing leakage measures 1 mA. Compliant?',
    options: [
      'Yes — any trip current below the 30 mA rating passes, regardless of how low it is',
      'Yes — ramp testing has only an upper limit, so a low reading is always acceptable',
      'Cannot determine without first running a 5×IΔn trip-time test on the device',
      'No — actual trip is 12 mA (11 + 1), below the 15 mA floor, so over-sensitive: replace',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 Reg 4.6 acceptance is explicit: the device shall not trip below 50 % of IΔn. 12 mA is below 15 mA. Over-sensitive RCDs cause nuisance tripping, often blamed on "leaky appliances" when the device itself is the fault. The 50 % floor is a real compliance limit, not just a manufacturing tolerance.',
  },
];

const InspectionTestingModule6Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD ramp testing | I&T Module 6.3 | Elec-Mate',
    description:
      'GN3 Ch 4 Reg 4.6 + BS EN 61008 / 61009: ramp testing finds the actual residual trip current. The 50–100 % IΔn acceptance band, half-cycle (0°/180°) tests, standing leakage correction, Type A / F / B multiplied currents, and how A4:2026 Reg 643.8 sits alongside the ramp.',
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
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3"
            title="RCD ramp testing"
            description="The supplementary RCD test that finds the actual trip current. What ramp testing does that 1×IΔn trip-time testing cannot — and how to read the result against the BS EN 61008 acceptance band."
            tone="yellow"
          />

          <TLDR
            points={[
              'Ramp testing slowly raises injected residual current from below 50 % of IΔn up to 110 % of IΔn (GN3 Ch 4 Reg 4.6). The current at which the RCD trips is recorded as the actual tripping-current threshold.',
              'Acceptance band per BS EN 61008 / 61009 and the GN3 / OSG criteria: the device shall NOT trip below 50 % of IΔn, AND shall trip at or before 100 % of IΔn. For a 30 mA RCD that is 15–30 mA. Outside that band → fail.',
              'Reg 643.8 (A4:2026) makes the AC test at IΔn the only mandatory effectiveness test, regardless of RCD Type. Ramp testing is supplementary — used for diagnostics, discrimination checks, drift tracking, and Type B verification on power-electronic loads.',
              'Run the ramp on both half-cycles (0° / 180°, GN3 Reg 2.31) and record the worst reading. On Type A / F / B, the ramp is also run with the appropriate pulsed / smooth DC waveforms — the device standard (BS EN 61008-1 / 61009-1 / 62423) sets the multipliers.',
              'Standing earth-leakage current adds to the test current at the toroid. Either disconnect leaky loads, or measure standing leakage with a clamp and add it to the displayed trip current to get the real value.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define the RCD ramp test and state the start point (< 50 % IΔn) and end point (110 % IΔn) per GN3 Ch 4 Reg 4.6',
              'Apply the BS EN 61008 / 61009 acceptance band (50–100 % of IΔn) and decide pass / fail at any reading',
              'Distinguish ramp testing (finds the current) from 1×IΔn trip-time testing (finds the time) and explain why both are useful',
              'Account for standing earth-leakage current and half-cycle phase (0°/180°) when reading a ramp result',
              'Recognise when ramp testing is required: Type B verification, discrimination checks, drift detection on periodic inspection, and nuisance-trip investigation',
              'Record the actual trip current (mA) on the schedule of test results so the next inspection has a baseline to trend against',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.8 changed in A4:2026 — and where ramp testing now sits"
            plainEnglish="A4:2026 redrafted Reg 643.8. Table 3A (the old time/current performance table) has been deleted. The single mandatory test for any RCD Type is now an alternating-current test at the rated residual operating current (IΔn). Ramp testing is not mandatory for compliance — but GN3 Ch 4 Reg 4.6 keeps it on the testing menu because it is the only test that gives you the actual trip threshold."
            onSite="Compliance test = AC at IΔn within the published trip times (300 ms for non-delay, 130–500 ms for Type S). Diagnostic test = ramp. Both have a place; only one is required to certify."
          >
            <p>
              The change matters in court. Pre-A4 testing required time/current performance per
              Table 3A. Post-A4, the verification test is fixed: alternating current at IΔn,
              regardless of RCD Type, with the device disconnecting in 300 ms (non-delay) or between
              130 ms and 500 ms (Type S). Ramp testing was not removed from the toolkit — it was
              clarified as supplementary, with GN3 Ch 4 Reg 4.6 describing the procedure.
            </p>
            <p>
              In practice, you reach for the ramp when (a) you are investigating a nuisance trip,
              (b) you are verifying discrimination between a Type S upstream and a non-delay
              downstream, (c) you are commissioning a Type B device on power-electronic loads where
              smooth-DC sensing matters, or (d) you are recording a drift baseline on periodic
              inspection. None of these are mandatory tests; all of them prevent recalls.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 4 · Reg 4.6"
            clause={
              <>
                In addition to trip time testing, instruments may provide a tripping-current
                threshold test where a ramp current is applied starting from less than 50 % of the
                RCD rating and increasing to 110 % of the rating. The current at which the RCD trips
                is recorded as the measured tripping threshold.
              </>
            }
            meaning="The procedure is fixed: start below 50 % of IΔn, ramp up to 110 % of IΔn, record the trip point. The start point proves the non-trip floor (the device must not be over-sensitive); the end point captures any device that is sluggish at the 100 % ceiling."
          />

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 4 · Reg 4.6 — acceptance criterion"
            clause={
              <>
                An RCD shall not trip with fault currents less than 50 % of its operational rating.
                Test acceptance requires that the device remains non-tripping for applied currents
                below 50 % of the rated tripping current.
              </>
            }
            meaning="The 50 % floor is not a courtesy — it is an explicit acceptance criterion. An RCD that trips at 12 mA on a 30 mA rating is non-compliant, full stop. Over-sensitive devices cause nuisance trips that get the RCD bypassed by frustrated occupiers; the 50 % rule exists to protect against that misuse."
          />

          <ConceptBlock
            title="The 50–100 % band, written out for every common rating"
            plainEnglish="A compliant RCD trips somewhere between 50 % and 100 % of its rated IΔn. Below 50 % is over-sensitive (fail). Above 100 % is sluggish (fail — and unsafe, because protection is delayed beyond the rating)."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Rated IΔn</th>
                    <th className="text-center text-white/80 py-2">
                      50 % floor (do-not-trip below)
                    </th>
                    <th className="text-center text-white/80 py-2">100 % ceiling (must trip by)</th>
                    <th className="text-center text-elec-yellow py-2">Acceptance band</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">10 mA</td>
                    <td className="text-center">5 mA</td>
                    <td className="text-center">10 mA</td>
                    <td className="text-center text-elec-yellow">5–10 mA</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">30 mA (additional protection)</td>
                    <td className="text-center">15 mA</td>
                    <td className="text-center">30 mA</td>
                    <td className="text-center text-elec-yellow">15–30 mA</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">100 mA</td>
                    <td className="text-center">50 mA</td>
                    <td className="text-center">100 mA</td>
                    <td className="text-center text-elec-yellow">50–100 mA</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">300 mA (fire / time-delayed)</td>
                    <td className="text-center">150 mA</td>
                    <td className="text-center">300 mA</td>
                    <td className="text-center text-elec-yellow">150–300 mA</td>
                  </tr>
                  <tr>
                    <td className="py-2">500 mA</td>
                    <td className="text-center">250 mA</td>
                    <td className="text-center">500 mA</td>
                    <td className="text-center text-elec-yellow">250–500 mA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              For shock protection (additional protection per Reg 415.1), the 30 mA rating dominates
              — 50 % of 30 mA = 15 mA is the lower bound. For fire protection at 300 mA (Reg 422.3
              applications), 150 mA is the floor. The arithmetic is the same; the rating changes.
            </p>
          </ConceptBlock>

          {/* Diagram — ramp current vs time, with acceptance band shaded */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Ramp test — injected residual current vs time, with the 50–100 % IΔn acceptance band
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="Ramp test current vs time graph. The injected residual current rises linearly from below 50 percent of IΔn up to 110 percent. The 50 to 100 percent IΔn band is shaded as the acceptance window. A trip event below 50 percent is marked as a fail (over-sensitive) and a trip above 100 percent is marked as a fail (sluggish). A trip inside the shaded band is the pass region."
            >
              {/* Plot frame */}
              <rect
                x="60"
                y="30"
                width="700"
                height="280"
                rx="8"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Y-axis label */}
              <text
                x="20"
                y="170"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                transform="rotate(-90 20 170)"
              >
                Injected residual current
              </text>

              {/* X-axis label */}
              <text x="410" y="345" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">
                Time → (typically 2 s or more)
              </text>

              {/* Y-axis tick lines */}
              {/* 0 */}
              <line
                x1="60"
                y1="290"
                x2="760"
                y2="290"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="2,3"
              />
              <text x="50" y="294" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="10">
                0
              </text>
              {/* 50% IΔn */}
              <line
                x1="60"
                y1="200"
                x2="760"
                y2="200"
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <text x="50" y="204" textAnchor="end" fill="#22C55E" fontSize="10" fontWeight="bold">
                50 %
              </text>
              <text x="50" y="216" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="9">
                15 mA*
              </text>
              {/* 100% IΔn */}
              <line
                x1="60"
                y1="110"
                x2="760"
                y2="110"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <text x="50" y="114" textAnchor="end" fill="#FBBF24" fontSize="10" fontWeight="bold">
                100 %
              </text>
              <text x="50" y="126" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="9">
                30 mA*
              </text>
              {/* 110% IΔn */}
              <line
                x1="60"
                y1="92"
                x2="760"
                y2="92"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <text x="50" y="96" textAnchor="end" fill="#EF4444" fontSize="10">
                110 %
              </text>

              {/* Acceptance band shading (50–100 %) */}
              <rect
                x="60"
                y="110"
                width="700"
                height="90"
                fill="rgba(34,197,94,0.10)"
                stroke="none"
              />
              <text
                x="450"
                y="160"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="13"
                fontWeight="bold"
              >
                ACCEPTANCE BAND — 50–100 % of IΔn
              </text>
              <text x="450" y="178" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="10">
                BS EN 61008-1 / 61009-1 · GN3 Ch 4 Reg 4.6
              </text>

              {/* Fail zones */}
              <rect
                x="60"
                y="200"
                width="700"
                height="90"
                fill="rgba(239,68,68,0.06)"
                stroke="none"
              />
              <text x="120" y="260" fill="#EF4444" fontSize="10" fontWeight="bold">
                FAIL — over-sensitive
              </text>
              <text x="120" y="274" fill="rgba(239,68,68,0.7)" fontSize="9">
                trips below 50 % IΔn
              </text>

              <rect
                x="60"
                y="30"
                width="700"
                height="80"
                fill="rgba(239,68,68,0.06)"
                stroke="none"
              />
              <text x="120" y="60" fill="#EF4444" fontSize="10" fontWeight="bold">
                FAIL — sluggish / non-compliant
              </text>
              <text x="120" y="74" fill="rgba(239,68,68,0.7)" fontSize="9">
                trips above 100 % IΔn
              </text>

              {/* Ramp line */}
              <line x1="60" y1="290" x2="700" y2="92" stroke="#FBBF24" strokeWidth="2.5" />
              <text x="690" y="86" textAnchor="end" fill="#FBBF24" fontSize="10" fontWeight="bold">
                Injected ramp current
              </text>

              {/* Trip event marker — inside band, at ~75% IΔn */}
              <circle cx="480" cy="155" r="6" fill="#22C55E" stroke="white" strokeWidth="1.5" />
              <line
                x1="480"
                y1="155"
                x2="480"
                y2="320"
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text
                x="480"
                y="335"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Trip recorded — pass
              </text>

              {/* Caption */}
              <text x="410" y="365" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
                * Example values shown for a 30 mA RCD. The band scales with IΔn (e.g. 100 mA →
                50–100 mA, 300 mA → 150–300 mA).
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

          <ContentEyebrow>How to perform the test</ContentEyebrow>

          <ConceptBlock
            title="Ramp test — step by step"
            plainEnglish="The procedure is short, but each step matters. The ramp gives you a single number — the trip current — and that number is meaningless without the surrounding discipline (half-cycle, leakage, instrument calibration, recorded value)."
            onSite="Most modern multifunction testers (Megger MFT, Fluke 1660-series, Metrel MI 30xx-series) ramp automatically once you select ramp mode and the IΔn rating. The test runs in about 2 seconds."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm the EFLI / Ze of the circuit before applying any RCD test current. A
                high-impedance loop will pull more voltage onto the protective conductor than the
                ramp implies. GN3 Reg 2.31 wants this verified first.
              </li>
              <li>
                Select ramp test mode on the multifunction tester. Set the device&rsquo;s rated
                residual operating current (IΔn) — 10 mA, 30 mA, 100 mA, 300 mA, 500 mA — and the
                RCD type (AC, A, F, B). The instrument selects the correct waveform on the basis of
                the type setting.
              </li>
              <li>
                Connect tester leads at a socket / accessory downstream of the RCD: line and
                protective conductor (L&ndash;PE for single-phase). On a 3-phase device, follow the
                instrument&rsquo;s 3-phase ramp procedure.
              </li>
              <li>
                Initiate the test. The instrument injects current rising from below 50 % of IΔn up
                to 110 % of IΔn over approximately 2 seconds. The device trips; the instrument
                latches the trip current.
              </li>
              <li>
                Run the test on both half-cycles (0° and 180°, per GN3 Reg 2.31). Worst (highest)
                reading is the one to record.
              </li>
              <li>
                For Type A / F / B devices, also run the ramp on the appropriate pulsed-DC and (for
                Type B) smooth-DC waveforms — the instrument provides these. Each waveform produces
                its own trip current reading; all three should be inside the band for the device to
                be compliant.
              </li>
              <li>
                Account for standing leakage. Either disconnect downstream loads, OR measure
                standing earth leakage with a clamp meter on the CPC and add it to the displayed
                trip current. The result is the actual residual current at the toroid at the moment
                of trip.
              </li>
              <li>
                Record the actual trip current value (mA) — not just pass/fail — on the schedule of
                test results. This becomes the baseline for the next inspection.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A 30 mA Type A RCD on a domestic ring final — ramp result inside the band, trip-time fine, but client reports nuisance trips"
            situation="You ramp the RCD at 0° and 180°. Both readings sit at 17 mA — inside the 15–30 mA band, technically compliant, but right at the lower edge. The 1×IΔn trip-time is 22 ms (well within 300 ms). The 5×IΔn time is 18 ms. The customer reports the RCD trips ‘every now and then for no reason’."
            whatToDo="Reach for the clamp meter on the live CPC at the consumer unit. Measure standing earth-leakage with the circuit live and loaded. If the measurement is, say, 9 mA of standing leakage and the ramp is 17 mA, the actual current at the toroid at trip is 26 mA. The headroom between standing leakage (9 mA) and trip (17 mA) is 8 mA — any switching transient on a charger, IT load or bathroom heater can push the residual past 17 mA and trip the device. The RCD itself is fine; the circuit has too much standing leakage. Either split the loads onto two RCBOs (reduce per-RCD leakage) or replace problematic equipment."
            whyItMatters="The ramp test does not just give you a pass/fail. It gives you a number against which you can read other measurements. Without it, you have no way to explain to the customer why a compliant RCD is tripping in service — and they will pay a different electrician to ‘fix’ a device that does not need fixing."
          />

          <SectionRule />

          <ContentEyebrow>Ramp vs trip-time — what each test answers</ContentEyebrow>

          <ConceptBlock
            title="Two tests, two questions"
            plainEnglish="Ramp asks: at what current does the device trip? Trip-time asks: at the rated current, how quickly does the device trip? Different questions, different equipment settings, different acceptance criteria."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2 w-32">Aspect</th>
                    <th className="text-left text-white/80 py-2">Ramp test</th>
                    <th className="text-left text-white/80 py-2">Trip-time test</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold text-elec-yellow">Question</td>
                    <td className="py-2">At what current does it trip?</td>
                    <td className="py-2">How fast does it trip at IΔn?</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold text-elec-yellow">Source</td>
                    <td className="py-2">GN3 Ch 4 Reg 4.6 (supplementary)</td>
                    <td className="py-2">BS 7671 Reg 643.8 / 643.7.3 (mandatory)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold text-elec-yellow">Test current</td>
                    <td className="py-2">Slow ramp from &lt; 50 % to 110 % IΔn over ~2 s</td>
                    <td className="py-2">Fixed AC at IΔn (also 5×IΔn on diagnostic forms)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold text-elec-yellow">Records</td>
                    <td className="py-2">Trip current in mA</td>
                    <td className="py-2">Operate time in ms</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-semibold text-elec-yellow">Accept band</td>
                    <td className="py-2">50 %–100 % of IΔn</td>
                    <td className="py-2">≤ 300 ms (non-delay); 130–500 ms (Type S)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-elec-yellow">Use case</td>
                    <td className="py-2">Diagnostics, drift, discrimination, Type B</td>
                    <td className="py-2">Compliance verification (mandatory for cert)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              On a routine EICR you may run trip-time only; on a problem device, on a Type B
              installation, or on a periodic inspection where you have a previous ramp value to
              trend, you run both. Reg 643.8 of A4:2026 made the AC at IΔn test the only mandatory
              one, so a quiet, well-behaved board can be certified on trip-time alone.
            </p>
          </ConceptBlock>

          <Scenario
            title="A Type B 30 mA RCD on a 22 kW EV charger — passing AC ramp, failing the smooth-DC ramp"
            situation="You commission a Type B RCD on a 22 kW EV charger (Reg 722 / 712 application where the inverter does not provide simple separation). AC ramp: 21 mA at 0°, 22 mA at 180° — comfortably inside the band. Pulsed-DC ramp (Type A waveform): 24 mA — inside band. Smooth-DC ramp (Type B waveform): the device does not trip until 38 mA equivalent residual."
            whatToDo="Stop. The smooth-DC reading is above the equivalent 100 % ceiling. The Type B function (the reason this device was specified for an EV install per Reg 722.531.3.101) is not within band. The AC and pulsed-DC paths are fine; the smooth-DC sensing is not. The device is non-compliant for its intended application. Replace and re-test. Type AC or Type A here would be a defect because they cannot see smooth-DC residuals at all — but the Type B you fitted is also a defect because its smooth-DC sensitivity is out of band."
            whyItMatters="A pass on AC ramp does not prove a Type B device is doing its Type B job. The whole reason a Type B was specified is that the load can produce smooth-DC residual current that an AC- or A-only device cannot see. Without ramping all three waveforms, you have not verified the device is fit for the application — and the EV charger could be putting a smooth-DC residual onto a person without the RCD ever knowing."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The diagnostics — what the trip current actually tells you
          </ContentEyebrow>

          <ConceptBlock
            title="Reading the ramp result against four diagnostic outcomes"
            plainEnglish="A ramp result is more than a pass/fail. It places the device in one of four buckets, each with a different next step."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">
                  Inside band, comfortable middle (e.g. 18–25 mA on a 30 mA device).
                </strong>{' '}
                Pass. Record the actual mA value. This is the baseline against which next
                year&rsquo;s inspection will trend.
              </li>
              <li>
                <strong className="text-amber-300">
                  Inside band, near the 100 % ceiling (e.g. 28–30 mA on a 30 mA device).
                </strong>{' '}
                Pass, but the device is on its way out. Note on the report. If a previous inspection
                showed a lower value (say 19 mA), the trend is the diagnosis — recommend earlier
                re-test, consider replacement.
              </li>
              <li>
                <strong className="text-red-300">
                  Below the 50 % floor (e.g. 12 mA on a 30 mA device).
                </strong>{' '}
                Fail — over-sensitive. Either standing leakage is being added to the test current
                (check with a clamp), the device is faulty, or the device has been mis-rated. Do not
                certify.
              </li>
              <li>
                <strong className="text-red-300">
                  Above the 100 % ceiling (e.g. 35 mA on a 30 mA device).
                </strong>{' '}
                Fail — sluggish. The device is not providing the protection its rating implies. A 30
                mA-marked device that trips at 35 mA in service is a 35 mA device, regardless of
                what the label says. Replace.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Recording &lsquo;pass&rsquo; on the schedule and throwing the actual mA value away"
            whatHappens="At the next periodic inspection (5 years later, different inspector), the device reads 28 mA. They record &lsquo;pass&rsquo;. Five years before that, it read 19 mA. Twenty years before that, when commissioned, it read 16 mA. Each individual reading was inside the band; nobody saw the drift because nobody recorded the number. The day it crosses 30 mA, the device gets replaced — but now it has been a non-compliant 30 mA RCD for some unknown period."
            doInstead="Always record the actual ramp trip current in mA on the schedule of test results, alongside pass/fail. The number is what gives the next inspector a baseline. The cost is a single column on the schedule; the value is decades of trend visibility."
          />

          <CommonMistake
            title="Skipping the half-cycle (0° / 180°) test on a ramp"
            whatHappens="The instrument is left on the default phase. You take one ramp reading, it passes at 22 mA, and you move on. The next inspector takes the test on the opposite half-cycle and gets 17 mA. Both are inside the band, but the inspector who did half-cycle testing has a more conservative number — and per GN3 Reg 2.31, the worst reading is what should be recorded."
            doInstead="Run the ramp on both 0° and 180° starts (most modern multifunction testers automate this — Auto mode runs both and reports the worst). On Type A / F / B, also run the ramp on the pulsed-DC and smooth-DC waveforms. Worst reading from any phase / waveform is the one that goes on the schedule."
          />

          <CommonMistake
            title="Ignoring standing leakage and blaming the RCD"
            whatHappens="A 30 mA RCD trips at 14 mA on the ramp. You write &lsquo;over-sensitive, replace&rsquo;. Two days later, the new RCD trips at 13 mA. Now you suspect a bad batch; the customer is unimpressed. The actual issue: 9 mA of standing leakage on the circuit (Class I LED drivers, IT equipment, a leaky immersion). The new RCD is doing exactly the same thing as the old one — both are seeing 9 + (true ramp current) at the toroid."
            doInstead="Always measure standing earth leakage with a clamp on the CPC before running the ramp on a circuit you suspect is over-sensitive. If the apparent ramp trip plus standing leakage falls inside the band, the RCD is fine — the circuit needs splitting or de-leaking. Per OSG Ch 11 Reg 11.4, the RCD shall not trip below 50 % of IΔn at the toroid; that is the actual residual, not the test-current as displayed."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Type A / F / B — why ramp testing matters most</ContentEyebrow>

          <ConceptBlock
            title="Different RCD types, different waveforms, different ramps"
            plainEnglish="A Type AC RCD detects only sinusoidal AC residuals. A Type A also sees pulsed DC (rectifier loads). A Type F also sees mixed-frequency residuals (single-phase variable-frequency drives). A Type B also sees smooth DC residuals (3-phase drives, EV chargers). The ramp test on each type uses the waveform that type is designed to detect; passing the AC ramp does NOT prove the DC ramp."
          >
            <p>
              BS 7671 Reg 531.3.3 (and the special-installation regs that point back to it — 712,
              722, 705, 704) require the right RCD type for the load. Selecting the right type at
              design time gets you a compliant installation on paper. Verifying the type is doing
              its job at commissioning gets you a compliant installation in practice. The ramp test
              is the verification — and the only practical way to do it for the DC sensing paths.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Type AC (BS EN 61008-1):</strong> AC ramp only. Acceptance band 50–100 % of
                IΔn on the AC waveform. Increasingly disallowed for new circuits — most loads
                contain electronic switching and need at least Type A.
              </li>
              <li>
                <strong>Type A (BS EN 61008-1):</strong> AC ramp + pulsed-DC ramp. The pulsed-DC
                acceptance current is multiplied per the device standard (the multiplier and the
                exact waveform are baked into the multifunction tester&rsquo;s Type A mode). The
                instrument reports trip current for each waveform — both shall be inside band.
              </li>
              <li>
                <strong>Type F (BS EN 62423):</strong> AC + pulsed-DC + composite waveform (mixed-
                frequency, simulating single-phase VFD output). All three shall be inside band.
                Common on washing-machine / heat-pump circuits.
              </li>
              <li>
                <strong>Type B (BS EN 62423 / BS EN 60947-2):</strong> AC + pulsed-DC + smooth-DC.
                Smooth-DC test is the differentiator — only Type B is required to detect it. EV
                charger and 3-phase VFD installs require Type B unless an exception (simple
                separation, transformer windings, manufacturer statement) applies. Without the
                smooth-DC ramp, you have not verified the Type B function.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 2 · Reg 2.31"
            clause={
              <>
                When performing RCD tripping tests, readings shall be taken with the test waveform
                starting on both positive and negative half-cycles of the AC wave. These are usually
                identified as &lsquo;0°&rsquo; and &lsquo;180°&rsquo; on test instruments. The
                longer operating time recorded from the tests started on the two half-cycles shall
                be the value used.
              </>
            }
            meaning="Half-cycle (0° / 180°) testing applies on every RCD timing and ramp test. The instrument starts the test waveform at the start of either the positive or negative half-cycle of the AC wave; the device&rsquo;s response can differ between the two. Record the worst — that is the value the regulation expects on the certificate."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How the result feeds the schedule of test results</ContentEyebrow>

          <ConceptBlock
            title="Recording the actual trip current — the column the next inspector will thank you for"
            plainEnglish="Reg 653.4 (A4:2026) requires the schedule of test results to include RCD trip times and operating currents. &lsquo;Pass&rsquo; alone is not enough — record the actual mA value the ramp produced."
          >
            <p>
              The A4:2026 schedule of test results model forms (Appendix 6) include columns for RCD
              operating current and operating time. Practical guidance:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>RCD ½×IΔn time:</strong> shall NOT trip — record &lsquo;no trip&rsquo; or
                blank as the form specifies.
              </li>
              <li>
                <strong>RCD 1×IΔn time:</strong> the value (in ms) measured under the AC at IΔn test
                required by Reg 643.8.
              </li>
              <li>
                <strong>RCD 5×IΔn time:</strong> on instruments that take it (mostly retained for
                continuity with pre-A4 schedules and useful diagnostically).
              </li>
              <li>
                <strong>RCD ramp trip current:</strong> the actual mA value at which the device
                operates. Optional but strongly recommended — this is what the next inspector trends
                against.
              </li>
              <li>
                <strong>Half-cycle convention:</strong> always record the worst of 0° and 180°. Some
                forms have separate columns for each.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Ramp test starts below 50 % of IΔn, ramps to 110 % of IΔn, records the trip current. Source: GN3 Ch 4 Reg 4.6.',
              'Acceptance band per BS EN 61008-1 / 61009-1: trip shall NOT happen below 50 % AND SHALL happen at or before 100 %. For 30 mA → 15–30 mA.',
              'Reg 643.8 (A4:2026) made the AC at IΔn test the only mandatory effectiveness test — Table 3A is gone. Ramp is supplementary, not mandatory.',
              'Half-cycle test (0° / 180°) per GN3 Reg 2.31. Record the worst reading.',
              'Standing earth-leakage adds to the test current at the toroid. Either disconnect leaky loads or measure leakage with a clamp and add it to the displayed value.',
              'Type A / F / B — run the ramp on all the waveforms the device is rated for. AC pass alone does not prove the DC sensing path.',
              'Always record the actual mA trip current on the schedule. The number is the baseline; pass/fail alone discards the diagnostic.',
              'Drift toward the 100 % ceiling between two periodic inspections is the early warning. Catch it before the next reading goes over the limit.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is ramp testing mandatory on every RCD during an EICR?',
                answer:
                  'No. Reg 643.8 (A4:2026) made the AC at IΔn test the only mandatory effectiveness test, regardless of RCD Type. Ramp testing is supplementary — used for diagnostics, discrimination verification, drift tracking, and Type B verification on power-electronic loads. That said, it is good practice on any periodic inspection because it gives you a numeric baseline; without it you only have pass/fail history.',
              },
              {
                question: 'Why does the acceptance band start at 50 % and not 0 %?',
                answer:
                  'BS EN 61008-1 / 61009-1 say the device shall not trip below 50 % of IΔn. The 50 % floor is the manufacturer&rsquo;s tolerance for normal background leakage and component variation. An RCD that trips below 50 % is over-sensitive — in practice it gets bypassed by frustrated occupiers chasing nuisance trips, which is the worst possible safety outcome. The 50 % floor is therefore as much an acceptance criterion as the 100 % ceiling.',
              },
              {
                question:
                  'A 30 mA RCD trips at exactly 30 mA on the ramp. Compliant, or borderline fail?',
                answer:
                  'Compliant — the band is 50–100 % inclusive at 100 %. But practically borderline; most multifunction testers display 28–29 mA on a healthy 30 mA device. A reading right at 30 mA suggests the device is working at the edge of its tolerance. Note it on the schedule and recommend a re-test sooner than the nominal interval. If the next inspection reads 31 mA, replacement is the call.',
              },
              {
                question: 'Can ramp testing damage an RCD by repeated tripping?',
                answer:
                  'No. The currents involved (typically 5–500 mA for the ramp range) are far below the contact-rated breaking current. The contacts are designed to break much higher fault currents than this. What you should avoid is repeated 5×IΔn tests in quick succession (those are full-fault simulations) without rest, but ramp testing at IΔn-level currents does no harm.',
              },
              {
                question:
                  'Why test on both 0° and 180° half-cycles? The instrument injects the same current.',
                answer:
                  'The current is the same magnitude but starts at a different phase angle. The RCD&rsquo;s sensing electronics, the toroid&rsquo;s magnetisation history, and any nearby AC harmonics on the supply can all give a slightly different response on each half-cycle. GN3 Reg 2.31 codifies this — record the worst of the two readings. Modern testers (Auto mode) run both automatically and report the worst.',
              },
              {
                question: 'On a Type S (selective) RCD, does the same 50–100 % ramp band apply?',
                answer:
                  'Yes for the trip current. Type S devices still have to comply with the 50–100 % IΔn current band. What is different is the operating TIME at 100 % IΔn — for Type S that has a floor of 130 ms (deliberate delay to let downstream RCDs clear) and a ceiling of 500 ms. Ramp current band: same. Trip-time band: very different. Don&rsquo;t mix them up.',
              },
              {
                question:
                  'What if I cannot disconnect downstream loads to remove standing leakage?',
                answer:
                  'Measure the standing earth-leakage with a clamp meter on the live CPC and add it to the displayed ramp trip current. The result is the actual current at the toroid. Note both values on the schedule (e.g. &ldquo;ramp 14 mA, standing leakage 8 mA, actual 22 mA&rdquo;). The arithmetic is simple; the discipline of recording it is what makes the next inspection trustworthy.',
              },
              {
                question: 'Why specify Type B for an EV charger if a Type A passes the ramp test?',
                answer:
                  'Reg 722.531.3.101 (and Reg 712 for PV inverters) require Type B unless an exception applies, because the load can produce smooth-DC residual current. A Type A device cannot see smooth DC at all — its toroid is blind to it. So a Type A on an EV install can pass an AC ramp at 18 mA, look perfect, and then fail to detect a smooth-DC fault current that is putting voltage on a person. Type B is required for the LOAD, not the test result.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Ramp testing — Module 6.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-6/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 RCD test button vs instrument testing
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

export default InspectionTestingModule6Section3;
