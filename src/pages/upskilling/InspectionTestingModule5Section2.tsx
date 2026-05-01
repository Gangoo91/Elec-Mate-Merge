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
    id: 'mod5-s2-meter-equation',
    question:
      "A loop tester reports Zs = 0.42 Ω. Internally it measured Uo = 232 V open-circuit and Uloaded = 226 V with its internal load drawing 14.3 A. Confirm the meter's arithmetic.",
    options: [
      'Zs = 232 / 14.3 ≈ 16.2 Ω',
      'Zs = (Uo − Uloaded) / Itest = (232 − 226) / 14.3 ≈ 0.42 Ω — the displayed value',
      'Zs = Uloaded / Uo ≈ 0.97 Ω',
      'Zs = 226 × 14.3 / 1000 ≈ 3.23 Ω',
    ],
    correctIndex: 1,
    explanation:
      "Every loop tester is solving the same equation: Zs = ΔU / Itest. (232 − 226) / 14.3 = 6 / 14.3 ≈ 0.42 Ω. The meter is doing Ohm's law against its own known internal load — there is no magic, which is why a noisy supply or a power converter can corrupt the answer.",
  },
  {
    id: 'mod5-s2-rcd-trip',
    question:
      'You select the high-current Zs mode on a circuit fed by a 30 mA RCBO. The injected test current is roughly 22 A line-to-earth. What does the RCBO see and why does it trip?',
    options: [
      '22 A flowing on L and returning on N — RCBO does not detect this',
      '22 A flowing on L returning on PE = 22 000 mA residual current. IΔn is 30 mA, so the residual is ~700× the trip threshold and the RCBO trips within milliseconds',
      'Only when Zs > 1 Ω will the RCBO trip',
      '0 mA residual — high-current mode bypasses the RCBO',
    ],
    correctIndex: 1,
    explanation:
      'The high-current loop tester pushes its test current out on L and back on PE — that is exactly the pattern an RCBO is designed to detect. 22 A vs 30 mA IΔn means the device sees 700× its trip current and operates well within its stated 300 ms maximum. The no-trip method exists for this reason.',
  },
  {
    id: 'mod5-s2-prerequisite',
    question:
      'Reg 643.7.3 names a specific test that must be completed before any Zs measurement is taken. Which one and why?',
    options: [
      'Insulation resistance — to prove the circuit is dry',
      'Continuity of protective conductors per Reg 643.2 — Zs is measured through the CPC, so the loop only exists if the CPC is verified continuous first; a Zs reading on a broken CPC is unstable or actively misleading',
      'Functional check of the RCBO',
      'Polarity at the consumer unit only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.7.3 explicitly references Reg 643.2 continuity as the prerequisite. The loop tester sends current down L and back via the CPC — if the CPC is open the meter has no defined return path and reports an unstable / saturated value. Module 3 continuity proves the loop has the geometry the Zs test assumes.',
  },
  {
    id: 'mod5-s2-temp-correction',
    question:
      'Cold-cable Zs at 20 °C reads 1.18 Ω on a 32 A B-curve circuit. Table 41.3 maximum permitted Zs for that device at 70 °C is 1.37 Ω. Apply the 0.8 rule and state the verdict.',
    options: [
      'Pass — 1.18 Ω < 1.37 Ω',
      'Fail — 0.8 × 1.37 = 1.10 Ω, and 1.18 Ω exceeds that. The cold reading does not have enough headroom to remain compliant once corrected to 70 °C operating temperature',
      'Pass — temperature correction is informative only',
      'Fail — any reading above 1.00 Ω is non-compliant',
    ],
    correctIndex: 1,
    explanation:
      '0.8 × 1.37 ≈ 1.10 Ω. The measured cold Zs of 1.18 Ω exceeds the corrected limit, meaning the same circuit at full operating temperature would sit around 1.18 × 1.20 ≈ 1.42 Ω — above the table value. Investigate before accepting; the rigorous Appendix 3 calculation gives the same conclusion.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A modern multifunction tester offers two live Zs modes: a high-current loop test and a low-current "no-trip" test. What is the principal reason the no-trip test exists?',
    options: [
      'It is faster',
      'It is required for cable lengths over 50 m',
      'The high-current method draws enough current (typically 20–25 A for ~10–40 ms) to trip an upstream 30 mA RCD; the no-trip method uses a current pulse low enough to keep the RCD latched, so Zs can be measured live downstream of the RCD',
      'It uses less battery',
    ],
    correctAnswer: 2,
    explanation:
      "The high-current loop test injects a current of around 20–25 A for a few mains cycles. That residual current is well above any 30 mA or 100 mA RCD's IΔn, so the RCD trips. The no-trip method uses a much smaller current (typically a few hundred mA) injected over many cycles, and the meter resolves the small voltage drop with signal-processing. The result is a measurement of the same Zs without disconnecting the supply downstream.",
  },
  {
    id: 2,
    question:
      'From first principles, how does any fault-loop-impedance tester actually arrive at a Zs reading?',
    options: [
      'It measures resistance directly with an ohmmeter',
      'It briefly creates a controlled connection between line and earth via an internal resistor, measures the voltage drop and the test current, and applies R = (Uo − Uloaded) / I to compute Zs',
      'It compares the supply voltage to a reference value',
      'It uses a Hall-effect coil around the live conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Every loop tester works on the same principle: connect a known load between L and earth for a brief moment, measure the open-circuit voltage Uo and the loaded voltage Uloaded across the supply, calculate the test current via the internal load, and apply Zs = (Uo − Uloaded) / Itest. The high-current and no-trip methods differ only in the size of the test current and how the meter filters out mains noise and load fluctuations.',
  },
  {
    id: 3,
    question:
      'Reg 643.7.3 tells you to verify earth fault loop impedance and prospective fault current. NOTE 1 to the same regulation contains an explicit warning. What about?',
    options: [
      'A warning about LED lighting',
      'A warning that the validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment, such as inverters',
      'A warning about test-lead null',
      'A warning about cold cables',
    ],
    correctAnswer: 1,
    explanation:
      'NOTE 1 to Reg 643.7.3 reads: "The validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment, such as inverters." That is the regulation acknowledging that PV / battery / EV-charger inverters can corrupt loop-tester readings. Reg 826.7 (prosumer installations) requires an alternative method where this applies.',
  },
  {
    id: 4,
    question:
      'You are testing a kitchen socket circuit on a board where every final circuit is RCBO-protected (30 mA). You select the high-current Zs test on your meter and press Test. What happens, and what should you have done?',
    options: [
      'The test runs cleanly — there is no issue',
      'The RCBO trips. You should have selected the no-trip Zs mode (or the meter\'s "RCD" / "low" setting) so the test current stays below the RCBO IΔn and the breaker remains in service while the measurement is taken',
      'The high-current test bypasses the RCBO and is preferred',
      'The test gives a reading of zero',
    ],
    correctAnswer: 1,
    explanation:
      'The high-current method on most testers injects a current well above 30 mA. On any RCD or RCBO with IΔn = 30 mA the residual current trips the device, dropping the circuit. Any modern multifunction tester provides a no-trip mode for exactly this case — that is the mode for testing live downstream of a 30 mA RCD/RCBO without disconnecting the supply.',
  },
  {
    id: 5,
    question:
      'A no-trip Zs reading typically takes longer than a high-current reading and is slightly less precise. Why?',
    options: [
      'The meter is slower',
      'The test current is small (often hundreds of mA), so the voltage drop is small relative to mains noise. The meter has to integrate over many cycles and apply digital filtering to extract a stable Zs from a small signal — that is why it takes longer and why the resolution is typically 0.01 Ω rather than 0.001 Ω',
      'No-trip tests use DC',
      'The test leads are different',
    ],
    correctAnswer: 1,
    explanation:
      'Smaller signal, more noise to reject, more averaging required. The trade-off is intentional: you accept a slightly slower test and a slightly coarser reading in exchange for not tripping the RCD. For most circuits this resolution is more than enough — a Zs of 0.42 Ω vs 0.43 Ω makes no compliance difference against a Table 41.3 limit of 1.37 Ω.',
  },
  {
    id: 6,
    question:
      'Before any live Zs measurement, BS 7671 requires you to have completed a specific dead test first. Which one, and why?',
    options: [
      'Polarity, because the loop tester needs the right L and N',
      'Insulation resistance, because Zs is part of insulation',
      'Continuity of protective conductors per Reg 643.2, because Zs depends on the integrity of the CPC and a loop test on a broken CPC will give a meaningless or dangerous reading',
      'Functional, because the meter needs the breaker on',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.2 continuity must be done before Reg 643.7.3 Zs measurement. The loop tester sends a test current down the line and back via the CPC; if the CPC is open, the meter will register an unstable or saturated reading and the operator may not realise the CPC integrity is the issue. The continuity test (Module 3) is the prerequisite that proves the loop is even there to measure.',
  },
  {
    id: 7,
    question:
      'GN3 Ch 2 sets out the live-test procedure for Zs. Which step is correct for a TN-C-S socket-outlet circuit?',
    options: [
      'Switch off, isolate, then connect the loop tester between L and N',
      'Connect the loop tester between L and PE at the test point with the circuit live (with the supply on, the protective device closed and continuity already verified). Take the reading. Confirm Zs against the relevant max-Zs limit in Table 41.2 / 41.3 / 41.4.',
      'Connect between L and CPC at the consumer unit only',
      'Use a megger on the lowest range',
    ],
    correctAnswer: 1,
    explanation:
      'Live Zs testing is done at the test point of the circuit (typically the furthest socket-outlet for a final radial). The circuit is energised, the protective device closed, and the tester is plugged in or connected L to PE at the test point. Continuity must already have been verified per Reg 643.2. The reading is then compared against the relevant Table 41.2 / 41.3 / 41.4 / 41.5 max-Zs.',
  },
  {
    id: 8,
    question:
      'You measure Zs at a socket as 1.42 Ω on a circuit protected by a 32 A Type B circuit-breaker. Table 41.3 max-permitted Zs is 1.37 Ω. Strictly, the reading fails. What is the correct next step before you write that on the schedule?',
    options: [
      'Record as fail and move on',
      'Apply the temperature correction (Note 2 to Table 41.3): readings taken with cold cables are higher than the design figure, which assumes maximum operating temperature. The 0.8 rule of thumb (or rigorous correction per Appendix 3) often brings a borderline reading inside the limit',
      'Re-test until you get a passing reading',
      'Use Table 41.5 instead',
    ],
    correctAnswer: 1,
    explanation:
      'The Table 41.3 values are stated at maximum operating temperature (typically 70°C for thermoplastic) per Note 2. A Zs measured cold will read higher than the same Zs would at 70°C. BS 7671 Appendix 3 / OSG / GN3 publish the correction; a common shorthand is to compare measured Zs against 0.8 × Table 41.3 value, or correct the measurement back. Always document which approach was used.',
  },
  {
    id: 9,
    question:
      'On a TT installation with a 30 mA RCD, Reg 411.5.3 NOTE 2 says "Where Ra is not known, it may be replaced by Zs." What does that allow you to do practically on site?',
    options: [
      'Skip the Zs test entirely',
      'Measure Zs at the test point and treat that as the Ra value when checking IΔn × Zs ≤ 50 V (or against the Table 41.5 figure of 1667 Ω for 30 mA)',
      'Convert Ra to Zs using a chart',
      'Use the supply Ze instead',
    ],
    correctAnswer: 1,
    explanation:
      'Where the earth-electrode resistance Ra has not been separately measured, the live Zs reading at the test point can stand in. A 30 mA RCD allows Zs up to 1667 Ω on Table 41.5 to satisfy the 50 V touch-voltage limit, although Note 2 to that table warns values above 200 Ω may not be stable in practice. The substitution is permitted by the regulation and is the routine approach in TT installations.',
  },
  {
    id: 10,
    question:
      "A loop tester reading on a circuit downstream of a Type AC 30 mA RCD reads cleanly with the no-trip mode, but the same reading taken with the inverter on a nearby PV system live shows a different value (varies by 20–40 %) when retried minutes apart. What's the correct response?",
    options: [
      'Take the average of the two readings',
      'Power down the inverter (and any battery/EV-charger inverter) before retesting per Reg 826.7. If readings still drift, document use of the alternative method (Ze + R1+R2 calculation) on the certificate. Loop-tester readings affected by power-converting equipment per Reg 643.7.3 NOTE 1 are not trustworthy',
      'Use the lower reading',
      'Use the higher reading',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.7.3 NOTE 1 explicitly warns that power-converting equipment can affect loop-tester validity. Reg 826.7 requires an alternative method in that case. The procedure is: isolate / power down the inverter, retest, and if the reading is still unstable, fall back to Zs = Ze + R1+R2 from a measured Ze and a calculated/measured R1+R2 corrected to operating temperature. Document the method used.',
  },
];

const InspectionTestingModule5Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Zs testing methods | I&T Module 5.2 | Elec-Mate',
    description:
      'Reg 643.7.3 + GN3 Ch 2: high-current loop test vs the low-current no-trip method, why the no-trip method exists for RCD-protected circuits, the meter mechanics behind R = (Uo − Uloaded) / I, and Reg 826.7 alternative methods for inverter-affected installations.',
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
            eyebrow="Module 5 · Section 2"
            title="Zs testing methods"
            description="High-current loop test vs the low-current no-trip method. What the meter is doing internally, why one trips RCDs and the other doesn't, and when the regulation requires an alternative method altogether."
            tone="yellow"
          />

          <TLDR
            points={[
              'Every loop tester works on the same principle: briefly load L–E with a known impedance, measure the supply voltage drop, apply Zs = (Uo − Uloaded) / Itest. The high-current and no-trip methods differ only in test-current size and signal-processing time.',
              'High-current method (typical 20–25 A for a few mains cycles) is fast, precise (~0.01 Ω), and the original loop-test method. It also trips any 30 mA RCD upstream of the test point, so cannot be used live on RCD-protected circuits.',
              'No-trip method uses a much smaller test current (typically hundreds of mA) over many cycles. The residual current stays below RCD IΔn, so the RCD remains latched. Slightly slower, slightly coarser resolution — but it works downstream of a 30 mA RCD without dropping the circuit.',
              'Reg 643.7.3 requires Zs measurement after Reg 643.2 continuity has been verified. NOTE 1 to Reg 643.7.3 / Reg 826.7 warns that inverters and other power-converting equipment can adversely affect loop-tester readings — alternative methods (calculated Zs from Ze + R1+R2) are explicitly permitted in that case.',
              'Always temperature-correct: Table 41 limits assume cables at maximum operating temperature. A cold-cable measurement reads higher than the design figure; a 0.8 × Table-41 rule of thumb (or rigorous Appendix 3 correction) is what saves a borderline pass.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the meter mechanics of a loop test from first principles — current injection L→E, voltage measurement, R = ΔV / I',
              'Distinguish high-current from low-current (no-trip) Zs methods and select the right one for a given circuit topology',
              'State why the no-trip method is mandatory practice on any circuit protected by a 30 mA RCD or RCBO',
              'Apply Reg 643.7.3 procedure correctly: continuity first, polarity confirmed, instrument leads to L–PE at the test point',
              'Apply temperature correction so a cold-cable reading is fairly compared against the Table 41.3 maximum permitted Zs',
              'Recognise when a reading is unreliable due to power-converting equipment (Reg 643.7.3 NOTE 1 / Reg 826.7) and switch to the alternative method',
              'Record the result on the A4:2026 Schedule of Test Results with the right method, the right column, and the right comments',
            ]}
          />

          <ContentEyebrow>What the meter is doing — first principles</ContentEyebrow>

          <ConceptBlock
            title="The mechanics of a loop test, distilled"
            plainEnglish="A fault-loop-impedance tester briefly creates a low-impedance connection between line and earth, measures the resulting drop in supply voltage and the current through the test connection, and divides one by the other. The result is the impedance of the loop the test current travelled through — same loop a real fault would travel."
            onSite="The meter is not 'magic'. It is doing Ohm's law against a known internal load. Once you know that, you know exactly why it sometimes lies."
          >
            <p>The internal sequence inside any loop tester:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Measure the open-circuit (no-load) voltage Uo across L and PE at the test point.
                This is the &ldquo;before&rdquo; reference.
              </li>
              <li>
                Switch in an internal resistive load between L and PE. The internal load is the
                meter&rsquo;s known impedance (a few ohms for a high-current tester; a much larger
                impedance for a low-current tester).
              </li>
              <li>
                Measure the loaded voltage Uloaded across L and PE while the load is in. The supply
                voltage sags by an amount that depends on the impedance of everything between the
                test point and the source — i.e. Zs.
              </li>
              <li>
                Measure the test current Itest flowing through the internal load, or compute it from
                Uloaded / Rinternal.
              </li>
              <li>
                Solve for Zs: <strong>Zs = (Uo − Uloaded) / Itest</strong>. The voltage sag divided
                by the test current equals the loop impedance.
              </li>
              <li>
                Disconnect the internal load. Total test duration: a few mains cycles for the
                high-current method (~10–40 ms); several hundred milliseconds to a few seconds for
                the no-trip method.
              </li>
            </ol>
            <p>
              That is the entire physics of the test. The two methods (high-current and no-trip)
              differ only in (a) the size of the internal load — and therefore the size of Itest —
              and (b) how the meter filters out mains noise and load fluctuations to extract the
              real Zs from a noisy signal.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3 — Earth fault loop impedance and prospective fault current"
            clause={
              <>
                The earth fault loop impedance shall be measured, or determined by an alternative
                method. The instrument shall be capable of measuring the relevant loop paths (line
                to earth via the protective conductor and source). The measured earth fault loop
                impedance shall then be compared with Chapter 41 requirements. Continuity of
                protective conductors as per Regulation 643.2 shall be verified before measurement.
                NOTE 1: The validity of test readings taken with a fault loop impedance test
                instrument may be adversely affected by power converting equipment, such as
                inverters.
              </>
            }
            meaning="Three rules in one regulation: (1) Zs is measured (or determined by an alternative method) — direct measurement is the default. (2) Continuity (Module 3) must be done first. (3) Inverters can corrupt the reading; if so, use an alternative method (Reg 826.7)."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The high-current method — fast, precise, RCD-tripping</ContentEyebrow>

          <ConceptBlock
            title="High-current loop test (the original method)"
            plainEnglish="The high-current method injects a test current of approximately 20–25 A between L and earth for a brief period (typically a few mains cycles, ~10–40 ms). The voltage drop across the supply is large enough to be measured cleanly, so the result is precise (often 0.01 Ω resolution) and the test is fast."
            onSite="This is the method the loop test was historically based on. On a circuit with no upstream RCD it is still the right choice. On any circuit protected by a 30 mA RCD anywhere upstream, it will trip the RCD."
          >
            <p>Why high current trips RCDs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The test current flows L → meter internal load → PE — that is, line out, earth back.
                From the RCD&rsquo;s perspective, this is a residual current: current going out on L
                that does not return on N.
              </li>
              <li>
                A 30 mA Type AC RCD is required by BS&nbsp;EN 61008-1 / 61009-1 to trip at IΔn ≤ 30
                mA. Reg 643.7.3 NOTE confirms a 300 ms maximum disconnection time for general
                non-delay RCDs at IΔn.
              </li>
              <li>
                A test current of 20–25 A is roughly 700× the IΔn of a 30 mA RCD. The device sees
                the test current as a massive earth fault and trips, almost certainly within
                milliseconds.
              </li>
              <li>
                Even a 100 mA or 300 mA upstream S-type RCD will see 20–25 A as far above its IΔn
                and will trip on its time-delay curve.
              </li>
            </ul>
            <p>
              Use the high-current method only where (a) there is no RCD upstream of the test point,
              or (b) you have intentionally bridged out the RCD for the duration of the test (which
              defeats the safety system and is rarely justified) or (c) the meter explicitly
              supports a non-tripping high-resolution mode validated by the manufacturer for that
              circuit configuration.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The no-trip method — essential post-A2:2022</ContentEyebrow>

          <ConceptBlock
            title="Low-current no-trip method"
            plainEnglish="The no-trip method uses a much smaller test current — typically a few hundred milliamps maximum — injected over many mains cycles. The meter integrates and digitally filters the resulting voltage drop to extract Zs from a noisy signal. The residual current stays below the RCD's IΔn, so the RCD remains latched and the circuit stays live."
            onSite="On any modern UK consumer-unit installation, every final circuit will be RCBO-protected at 30 mA. The no-trip method is therefore the default Zs method for almost every test you will do."
          >
            <p>How it stays under IΔn:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The internal test load is much higher impedance than for the high-current method.
                Test currents are typically 15 mA peak instantaneously or below — well under the 30
                mA IΔn of a Type AC / Type A / Type F RCD.
              </li>
              <li>
                Many modern testers use specific test waveforms (e.g. half-cycle pulses with an
                averaging algorithm, or DC-shaped pulses for Type B RCDs) so the residual current
                seen by the RCD is below trip threshold even momentarily.
              </li>
              <li>
                Test duration is longer (a few seconds rather than a fraction of one) because the
                small voltage drop has to be averaged over many cycles to reject mains noise and
                load fluctuations from other appliances on the same supply.
              </li>
            </ul>
            <p>
              Trade-offs you accept for the no-trip mode: typical resolution of ~0.01 Ω rather than
              0.001 Ω; longer test duration; sensitivity to load noise on the same supply; and
              vulnerability to inverter / power-converter interference (which is true of all loop
              tests but more so when the signal is small).
            </p>
          </ConceptBlock>

          {/* Diagram: high-current vs no-trip method */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              High-current loop test vs no-trip method — what the RCD sees
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison of high-current loop test versus no-trip loop test. Both diagrams show the supply, an upstream 30 mA RCD, the test point downstream, and a fault loop tester. In the high-current diagram a 25 A test current flows L to E through the meter, and the RCD sees this as a 25 A residual current and trips. In the no-trip diagram a 15 mA test current flows L to E and the RCD remains latched because the residual current is below its 30 mA IΔn."
            >
              {/* Title bars */}
              <rect
                x="20"
                y="20"
                width="410"
                height="32"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.2"
              />
              <text
                x="225"
                y="40"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                HIGH-CURRENT (~25 A) — RCD TRIPS
              </text>
              <rect
                x="450"
                y="20"
                width="410"
                height="32"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="655"
                y="40"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                NO-TRIP (~15 mA) — RCD HOLDS
              </text>

              {/* Left side: high-current */}
              {/* Supply */}
              <rect
                x="40"
                y="80"
                width="80"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text x="80" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Supply
              </text>
              <text x="80" y="115" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (Uo)
              </text>
              <circle cx="80" cy="128" r="3" fill="#EF4444" />

              {/* RCD */}
              <rect
                x="160"
                y="80"
                width="80"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="200"
                y="100"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                RCD
              </text>
              <text x="200" y="115" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                30 mA
              </text>
              <text
                x="200"
                y="130"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                ⚠ TRIPS
              </text>

              {/* L line out */}
              <line x1="120" y1="110" x2="160" y2="110" stroke="#EF4444" strokeWidth="2" />
              <line x1="240" y1="110" x2="320" y2="110" stroke="#EF4444" strokeWidth="2" />

              {/* Tester */}
              <rect
                x="320"
                y="80"
                width="100"
                height="120"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="370"
                y="100"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                LOOP TESTER
              </text>
              <text x="370" y="116" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                High-current
              </text>
              <text x="370" y="130" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                mode
              </text>
              <text
                x="370"
                y="155"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                25 A test
              </text>
              <text x="370" y="172" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                ~10–40 ms
              </text>
              {/* tester L terminal */}
              <circle cx="320" cy="110" r="3" fill="#EF4444" />
              {/* tester E terminal */}
              <circle cx="320" cy="170" r="3" fill="#22C55E" />

              {/* Earth path back */}
              <path
                d="M320,170 L260,170 L260,210 L100,210 L100,140 L120,140"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text x="200" y="226" textAnchor="middle" fill="#22C55E" fontSize="9">
                PE return path
              </text>

              {/* Annotation: residual current seen by RCD */}
              <rect
                x="40"
                y="240"
                width="380"
                height="38"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text x="230" y="258" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Test current goes out on L, returns on PE.
              </text>
              <text
                x="230"
                y="272"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Residual seen by RCD = 25 000 mA. IΔn = 30 mA. Device trips.
              </text>

              {/* Right side: no-trip */}
              <rect
                x="470"
                y="80"
                width="80"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text x="510" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Supply
              </text>
              <text x="510" y="115" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (Uo)
              </text>
              <circle cx="510" cy="128" r="3" fill="#EF4444" />

              <rect
                x="590"
                y="80"
                width="80"
                height="60"
                rx="6"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="630"
                y="100"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RCD
              </text>
              <text x="630" y="115" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                30 mA
              </text>
              <text
                x="630"
                y="130"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                ✓ holds
              </text>

              <line x1="550" y1="110" x2="590" y2="110" stroke="#EF4444" strokeWidth="2" />
              <line x1="670" y1="110" x2="750" y2="110" stroke="#EF4444" strokeWidth="2" />

              <rect
                x="750"
                y="80"
                width="100"
                height="120"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="800"
                y="100"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                LOOP TESTER
              </text>
              <text x="800" y="116" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                No-trip
              </text>
              <text x="800" y="130" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                mode
              </text>
              <text
                x="800"
                y="155"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                15 mA test
              </text>
              <text x="800" y="172" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                ~1–5 s
              </text>
              <circle cx="750" cy="110" r="3" fill="#EF4444" />
              <circle cx="750" cy="170" r="3" fill="#22C55E" />

              <path
                d="M750,170 L690,170 L690,210 L530,210 L530,140 L550,140"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text x="640" y="226" textAnchor="middle" fill="#22C55E" fontSize="9">
                PE return path
              </text>

              <rect
                x="470"
                y="240"
                width="380"
                height="38"
                rx="6"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text x="660" y="258" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Test current is small enough that the RCD sees it as
              </text>
              <text
                x="660"
                y="272"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                a non-trip residual: 15 mA &lt; 30 mA IΔn. Device stays latched.
              </text>

              {/* Common formula bar */}
              <rect
                x="40"
                y="305"
                width="800"
                height="44"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="325"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Both methods solve the same equation: Zs = (Uo − Uloaded) / Itest
              </text>
              <text x="440" y="341" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Only the size of Itest, the test duration and the digital filtering differ.
              </text>

              {/* Bottom caption */}
              <rect
                x="40"
                y="365"
                width="800"
                height="80"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="440" y="385" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                High-current: typical resolution 0.01 Ω, test duration 10–40 ms. Trips any 30 mA RCD
                upstream.
              </text>
              <text x="440" y="403" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                No-trip: typical resolution 0.01 Ω, test duration 1–5 s. Holds 30 mA RCDs because
                Itest &lt; IΔn.
              </text>
              <text
                x="440"
                y="421"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Default for any RCD-protected circuit (i.e. nearly every modern install): no-trip.
              </text>
              <text x="440" y="438" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Reg 643.7.3 NOTE 1: power converting equipment can adversely affect both methods.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The procedure — Reg 643.7.3 + GN3 Ch 2</ContentEyebrow>

          <ConceptBlock
            title="Live Zs measurement, step by step"
            plainEnglish="Continuity must already have been verified per Reg 643.2. The supply is on. The protective device is closed. You are connecting an instrument to a live circuit at the test point and reading Zs from the screen. The whole procedure takes a few seconds per test point — but every step matters."
            onSite="Loop testing is a live test. Treat the meter and its leads as live equipment. PPE, well-maintained leads with shrouded probes (BS EN 61010), and a methodical approach are not optional."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Confirm continuity (Reg 643.2) is complete.</strong> Without verified
                continuity of protective conductors, a Zs reading is meaningless or actively
                misleading.
              </li>
              <li>
                <strong>Confirm polarity is correct.</strong> The loop tester wants line on the L
                terminal and PE on the E terminal. A reversed polarity at a socket-outlet will give
                a wrong (often very low) reading.
              </li>
              <li>
                <strong>Select the right method.</strong> No-trip if any RCD is upstream of the test
                point at IΔn ≤ 30 mA (or 100 mA, etc., depending on the meter and the tolerance you
                want); high-current only if no RCD is upstream or if you have intentionally bypassed
                it.
              </li>
              <li>
                <strong>Connect the meter at the test point.</strong> For a socket-outlet, plug in
                the dedicated socket lead. For a fixed-wired test point (FCU, isolator, lighting
                accessory), use shrouded probes connected L to PE. Keep N out of the test (Zs is an
                L-to-E measurement; some testers will measure Z line-line via N if you connect
                wrongly).
              </li>
              <li>
                <strong>Initiate the test.</strong> Press the test button. The meter handles the
                load-switching internally. Wait for the reading to stabilise (a few hundred
                milliseconds for high-current; a few seconds for no-trip).
              </li>
              <li>
                <strong>Read Zs.</strong> Note the value to at least two decimal places in ohms.
                Some meters also display Ipf (prospective fault current) which is Uo / Zs at the
                tester&rsquo;s assumed Uo (typically 230 V). Record both if your form has columns.
              </li>
              <li>
                <strong>Compare against the limit.</strong> Use Table 41.2 / 41.3 / 41.4 / 41.5 for
                the relevant device, or the design max-Zs from the Schedule of Circuit Details
                (which uses the A4 max-permitted-Zs column). Apply temperature correction if the
                cable is well below operating temperature when measured.
              </li>
              <li>
                <strong>Move on.</strong> Repeat for every test point on the schedule — typically
                the worst-case (furthest) point of every final circuit, plus distribution circuit
                tests at the relevant boards.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2 / Sequence"
            clause={
              <>
                An electrical continuity test shall be carried out according to Regulation 643.2
                before carrying out the earth fault loop impedance measurement. This continuity test
                verifies the continuity of protective conductors and bonding required prior to
                performing Zs measurements.
              </>
            }
            meaning="Continuity is a prerequisite, not a parallel activity. A loop test on a circuit with a discontinuous CPC will give an unstable, often inflated reading — and will not reveal that the CPC is the actual problem. The Module 3 sequence (continuity → IR → polarity → Zs → RCD) exists for this reason."
          />

          <Scenario
            title="Worked test — kitchen socket on a 32 A B-curve RCBO"
            situation="Domestic consumer unit. Each circuit has its own 30 mA Type A RCBO. The test point is the furthest socket on a kitchen radial. Ze at the origin was measured as 0.21 Ω. Cable is 2.5/1.5 mm² T&E, 18 m. Calculated R1+R2 at 20°C = 18 × 19.51 = 0.351 Ω. At 70°C: 0.351 × 1.20 = 0.421 Ω. Predicted Zs at 70°C: 0.21 + 0.421 = 0.63 Ω."
            whatToDo={
              <>
                <span className="block">
                  1. Continuity already verified (Module 3) — R1+R2 measured 0.36 Ω, within
                  &plusmn;5% of calculation.
                </span>
                <span className="block">2. Polarity confirmed at the test socket.</span>
                <span className="block">
                  3. Select <strong>no-trip</strong> mode on the loop tester (RCBO is 30 mA).
                </span>
                <span className="block">4. Plug in the socket lead. Press test.</span>
                <span className="block">
                  5. Reading: <strong>0.58 Ω</strong> — measured cold, so a little below the
                  predicted 70&deg;C value. Cable is well below operating temperature; the reading
                  is consistent with the calculation.
                </span>
                <span className="block">
                  6. Compare against Table 41.3 max-permitted Zs for 32 A Type B RCBO at 230 V: 1.37
                  Ω. Compliance margin: 0.58 vs 1.37 → comfortable pass.
                </span>
                <span className="block">
                  7. RCBO has not tripped. Circuit remains live. Move to next test point.
                </span>
              </>
            }
            whyItMatters="The whole sequence took ~30 seconds. The no-trip mode meant no occupants lost their fridge / oven / lighting during the test. The temperature correction explains the small difference between measured cold Zs and predicted 70°C Zs without a panic. The schedule entry — measured 0.58 Ω, design limit 1.37 Ω, method 'no-trip live test' — is defensible to any insurer or court."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Temperature correction — the gotcha</ContentEyebrow>

          <ConceptBlock
            title="Why a cold cable reads higher Zs than a hot cable"
            plainEnglish="Conductor resistance rises with temperature. At maximum operating temperature (typically 70°C for thermoplastic insulated cable), R1+R2 — and therefore Zs — is roughly 1.20× the 20°C value. Table 41 limits are stated at the maximum operating temperature. So a cold-cable measurement reads higher than the design Zs would at full load."
            onSite="The Note 2 to every Table 41 (41.2, 41.3, 41.4, 41.5) is the same: 'The Zs values given in the table should not be exceeded when (a) the line conductors are at the appropriate maximum permitted operating temperature, and (b) the circuit protective conductors are at the appropriate assumed initial temperature. If the conductors are at a different temperature when tested, the reading should be adjusted accordingly. See Appendix 3.'"
          >
            <p>Three options for handling the temperature gap, in order of rigour:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Rigorous (Appendix 3):</strong> measure cable temperature, apply the exact
                correction factor from Appendix 3 of BS&nbsp;7671 to recalculate the equivalent
                70&deg;C Zs, compare against the table value.
              </li>
              <li>
                <strong>Common shorthand (the &ldquo;0.8 rule&rdquo;):</strong> compare the cold
                measured Zs against 0.8 × the Table 41.3 value. If the measured cold Zs is below
                that, the corrected hot Zs will also be below the table value. This is widely used
                in industry and is conservative.
              </li>
              <li>
                <strong>Modern multifunction tester:</strong> select the cable type and temperature
                in the meter setup; the tester applies the correction automatically and displays a
                temperature-adjusted Zs.
              </li>
            </ol>
            <p>
              The 0.8 rule comes from: 1 / 1.20 ≈ 0.833. So a cold reading at 80&nbsp;% of the
              published limit corresponds to roughly the published limit at full operating
              temperature. The 0.8 figure is the practical inverse rounded down for safety. Some
              guidance uses 0.75 as an even more conservative shorthand.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When the meter lies — power-converting equipment</ContentEyebrow>

          <ConceptBlock
            title="Inverters, EV chargers and battery storage — Reg 826.7"
            plainEnglish="A loop tester assumes the supply voltage is a clean 230 V sinusoid. Inverters and other power-converting equipment inject harmonics, switching noise and load fluctuations onto the supply. The tester's voltage measurement is corrupted, and the resulting Zs reading can be wrong by tens of percent — sometimes silently."
            onSite="If the installation includes a PV inverter, battery storage, EV chargepoint or any inverter-driven equipment that is energised during testing, treat every loop reading with suspicion until you have confirmed it against an alternative method."
          >
            <p>The two regulations that govern this:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 643.7.3 NOTE 1:</strong> &ldquo;The validity of test readings taken with
                a fault loop impedance test instrument may be adversely affected by power converting
                equipment, such as inverters.&rdquo; This is the warning.
              </li>
              <li>
                <strong>Reg 826.7 (prosumer chapter, A4:2026):</strong> &ldquo;Where validity of
                test readings taken with a fault loop impedance test instrument may be adversely
                affected by power converting equipment within the prosumer&rsquo;s installation, an
                alternative method of determining prospective fault current and earth fault loop
                impedance shall be used.&rdquo; This is the obligation.
              </li>
            </ul>
            <p>The practical workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Default:</strong> isolate the inverter / battery storage / EV chargepoint
                before live testing. With the prosumer equipment off, a normal loop test should give
                a clean reading.
              </li>
              <li>
                <strong>If isolating is not feasible:</strong> use Reg 826.7 alternative — calculate
                Zs from a measured Ze at the origin (taken with everything in the installation
                de-energised) plus a measured / calculated R1+R2 corrected to operating temperature.
              </li>
              <li>
                <strong>Document the method on the certificate.</strong> Note in the comments column
                that prosumer equipment was present, the loop reading was unreliable, and Zs was
                determined by Ze + R1+R2 calculation. This is exactly what Reg 826.7 contemplates.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Using the high-current method on an RCD-protected circuit and treating the trip as &lsquo;normal&rsquo;"
            whatHappens="Inspector presses test on the loop tester in high-current mode. The 30 mA RCBO trips, dropping the kitchen circuit. Inspector resets, re-presses, RCD trips again. Eventually the inspector either bridges out the RCBO (defeating the safety system for the rest of the day) or moves on without a Zs reading. The certificate ends up with a missing column or a calculated-only value with no indication that the live test was abandoned."
            doInstead="Switch to the no-trip mode before the first press. Every modern multifunction tester has it; learn the menu position on your meter. If your meter does not have a no-trip mode, you cannot live-test downstream of a 30 mA RCD without disconnecting the supply — that is a meter limitation, not a regulation gap, and it means buying a current-generation meter is part of being able to do the work."
          />

          <CommonMistake
            title="Recording a no-trip Zs without confirming continuity first"
            whatHappens="Inspector skips the Reg 643.2 continuity test (or does it after the live tests). The Zs reading at a socket comes back as 0.45 Ω — looks fine. The CPC is actually broken at the third socket on the radial; the loop reading is being made through a parallel earth path via metal containment that the inspector has not noticed. Years later, that parallel path is removed during refurb, the CPC has been broken throughout, and the disconnection time is now non-compliant — but the original certificate said 0.45 Ω."
            doInstead="Reg 643.2 continuity is a prerequisite. Reg 643.7.3 explicitly references the order. Continuity proves the loop has the geometry you think it does; Zs measures the impedance of that loop. Reverse the order and Zs is measuring an unknown loop."
          />

          <CommonMistake
            title="Forgetting temperature correction on a borderline reading"
            whatHappens="Cold-cable Zs reads 1.32 Ω. Table 41.3 limit for that device is 1.37 Ω. Inspector calls it a pass without applying any correction. At full operating temperature the cable's R1+R2 is about 1.20× higher, so the actual Zs at 70°C will be ~1.55 Ω — well above the limit. The disconnection time at full load is non-compliant, but the schedule shows compliance."
            doInstead="On any reading within ~20% of the Table 41.3 limit, apply the temperature correction explicitly. The 0.8 rule is the quick check: if cold Zs < 0.8 × Table 41 limit, you have headroom for the temperature rise. If not, do the rigorous Appendix 3 calculation or fail the circuit."
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 schedule</ContentEyebrow>

          <ConceptBlock
            title="What goes in the Zs column — and what goes alongside"
            plainEnglish="The Schedule of Test Results has a Zs column for the measured value and (in A4:2026) a max-permitted Zs column on the Schedule of Circuit Details for the design figure. The two columns must agree: measured Zs ≤ design max Zs."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zs column:</strong> measured Zs at the worst-case point, in ohms, two
                decimal places. State whether the value is the live measurement or a calculated Zs
                (Ze + R1+R2 corrected) in the comments.
              </li>
              <li>
                <strong>Max permitted Zs column (A4:2026 Schedule of Circuit Details):</strong> the
                design value for the circuit&rsquo;s protective device, taken from Table 41.2 / 41.3
                / 41.4 / 41.5 or, where stricter, the design calculation.
              </li>
              <li>
                <strong>Method note in comments:</strong> &ldquo;no-trip live test&rdquo; vs
                &ldquo;high-current live test&rdquo; vs &ldquo;calculated (inverter present, Reg
                826.7)&rdquo; — the next inspector should be able to read the form and know exactly
                how the value was obtained.
              </li>
              <li>
                <strong>Temperature correction note in comments:</strong> if the reading is cold and
                the limit is the 70&deg;C value, note &ldquo;measured at &lt;temp&gt;&deg;C,
                corrected via Appendix 3&rdquo; or &ldquo;measured cold, &lt; 0.8 × Table 41
                limit&rdquo;.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Every loop tester does R = (Uo − Uloaded) / Itest. The two methods only differ in test current size and signal-processing time.',
              'High-current method (~25 A): fast, precise, 0.01 Ω resolution — but trips any 30 mA RCD upstream. Use only on circuits with no upstream RCD.',
              'No-trip method (~15 mA): slightly slower, slightly coarser — but stays below RCD IΔn. Default for almost every modern UK final circuit.',
              'Reg 643.2 continuity must be done before Reg 643.7.3 Zs measurement. The order is not optional.',
              'Polarity correct, leads to L–PE at the test point, test point = worst-case (furthest) accessory of the circuit.',
              'Compare measured Zs against Table 41.2 / 41.3 / 41.4 / 41.5, or against the A4 max-permitted Zs column on the Schedule of Circuit Details.',
              'Temperature correction matters: Table 41 limits assume 70°C cable; cold readings need Appendix 3 correction or a 0.8-rule shorthand.',
              'Reg 643.7.3 NOTE 1 / Reg 826.7: inverters and other power-converting equipment can corrupt loop-tester readings. Isolate prosumer equipment or use the calculated-Zs alternative.',
              'Document method, temperature, any prosumer-equipment situation, and any departure from a clean live measurement in the comments column.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Which method should I use by default — high-current or no-trip?',
                answer:
                  'No-trip, almost always. Modern UK consumer-unit installations use 30 mA RCDs / RCBOs on every final circuit. The high-current method will trip those devices. The no-trip method works downstream of a 30 mA RCD without disconnecting the supply. The only common case where high-current is the right choice is testing at the origin (e.g. Ze) before any RCD is in the path.',
              },
              {
                question: 'How accurate is the no-trip method versus the high-current method?',
                answer:
                  'Resolution is typically the same on a modern instrument (around 0.01 Ω). The high-current method has slightly better noise rejection because the signal it is measuring is larger relative to mains noise. In practice, both methods give readings well within the precision needed to compare against a Table 41.3 limit. If your meter and the cable are stable, you should not see meaningful differences between the two methods on the same circuit.',
              },
              {
                question: 'Do I have to test Zs at every accessory, or just one per circuit?',
                answer:
                  'Reg 643.7.3 requires the loop impedance to be measured. Best practice — and what GN3 Ch 2 describes — is to test at the worst-case (furthest) accessory of every final circuit. That gives you the highest Zs the circuit will ever see and is the value compared against the Table 41 limits. Testing more points is fine and useful for diagnostics; testing fewer than the furthest point is not enough to verify compliance.',
              },
              {
                question:
                  'My meter reads Zs lower than the calculated value at the same point. Should I worry?',
                answer:
                  'Possibly. A measured Zs lower than calculated usually means parallel earth paths — metal containment, bonded gas/water pipework, supplementary bonding routes — are providing a parallel return that shorts the CPC. The reading is real, but it is not the Zs the protective device will see during a fault if any of those parallel paths are later removed (e.g. during refurb). For Zs verification of disconnection time, prefer the higher of (a) measured live Zs and (b) calculated Zs from Ze + corrected R1+R2; or note the parallel paths in the comments and use the calculated value.',
              },
              {
                question: 'Can I just use Ze + R1+R2 calculated and skip the live test?',
                answer:
                  'Reg 643.7.3 requires Zs to be measured "or determined by an alternative method". A calculated Zs from a measured Ze and a measured R1+R2 (corrected to operating temperature) is a recognised alternative method, used routinely where live testing is impractical (e.g. inverter installations, occupied premises where power-down is not possible). On a routine new-work install with no inverter, you would normally do the live test as well — partly because Reg 643.7.3 expects it, partly because the live test is your sanity check on the calculation chain.',
              },
              {
                question:
                  'Why does the loop tester give Ipf as well as Zs, and which is more useful?',
                answer:
                  "Ipf (prospective fault current) is just Zs expressed differently: Ipf = Uo / Zs at the meter's assumed Uo (typically 230 V). It is the current that would flow during a real earth fault at the test point. For verifying disconnection time against Table 41, Zs is what you compare. For sizing fault-rated equipment (Reg 434), Ipf at the origin is what you compare. Most modern testers display both; record both if the schedule has columns for both.",
              },
              {
                question:
                  'My meter shows a "Zs" reading on a TT installation but the value seems unreasonably low. What is going on?',
                answer:
                  'Some loop testers, when set to L-N rather than L-PE, will report a fault-loop reading that is actually the line-neutral loop impedance — typically much lower than Zs because it does not include the earth-electrode path. On TT, always confirm the test is L-PE, not L-N. The TT Zs (which includes Ra at the consumer electrode and the earthing arrangement at the source) is normally tens of ohms, not the small fraction of an ohm typical of TN.',
              },
              {
                question:
                  'A circuit fails the cold-Zs reading by a small margin. Can I retest later when the cables are warmer?',
                answer:
                  'No — the regulation requires verification at the time of test. If the cold reading is above 0.8 × Table 41.3 (or above the rigorous Appendix 3 corrected limit), the circuit fails. The right responses are: (1) re-check the calculation and the test setup; (2) investigate parallel paths, lead-null errors and joint-resistance issues; (3) if the result genuinely exceeds the limit, the circuit needs design changes (larger CPC, shorter run, different protective device) — not a warmer day.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Zs testing methods — Module 5.2" questions={quizQuestions} />

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
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-5/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Ze testing at origin
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

export default InspectionTestingModule5Section2;
