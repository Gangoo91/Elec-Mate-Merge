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
    id: 'mod5-s5-pfc-definition',
    question:
      'A multifunction tester displays "PFC = 4.8 kA" at the origin of a TN-C-S supply. What does that single number actually represent?',
    options: [
      'Just the PSCC (line-to-neutral) reading',
      "The greater of the meter's PSCC (L–N) and PEFC (L–E) measurements — the meter latches the higher value as PFC for breaking-capacity comparison",
      'A peak instantaneous current that must be divided by √2',
      'The Ze loop test result',
    ],
    correctIndex: 1,
    explanation:
      'A modern instrument measures both PSCC and PEFC and reports the greater as PFC. Reg 643.7.3.201 names both flavours; Reg 434.5.1 then asks the protective device to handle "the maximum prospective fault current at the point where the device is installed" — that is the PFC value used for breaking-capacity selection.',
  },
  {
    id: 'mod5-s5-three-phase',
    question:
      'On a three-phase TN-S supply you measure single-phase PSCC (L–N) at the origin as 8.1 kA. What is the approximate three-phase symmetrical fault current at the same point?',
    options: [
      '8.1 kA — same as single-phase',
      '~4.7 kA (8.1 ÷ √3)',
      '~14.0 kA (8.1 × √3)',
      '~24.3 kA (8.1 × 3)',
    ],
    correctIndex: 2,
    explanation:
      'For a transformer-dominated source, the balanced three-phase symmetrical fault current is approximately √3 × the single-phase L–N value. 8.1 × 1.732 ≈ 14.0 kA. The protective device at the origin must be rated for the higher three-phase value — sizing breaking capacity off the single-phase reading alone is a common and dangerous error.',
  },
  {
    id: 'mod5-s5-cu-relief',
    question:
      'A dwelling has a BS EN 61439-3 consumer unit and the distributor declares 16 kA at the origin. Reg 643.7.3.201 — what does BS 7671 permit?',
    options: [
      'You must always measure PFC at the origin regardless',
      "PFC at the origin need not be measured or calculated — the consumer unit's 16 kA conditional rating (Annex ZB) covers the case for dwellings or similar premises",
      'You can also skip the Zs and Ze measurements',
      'The relief applies only to commercial premises',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 grants origin-only relief in dwellings or similar premises where a BS EN 61439-3 consumer unit is used and the distributor has declared 16 kA. The conditional short-circuit rating in Annex ZB of BS EN 61439-3 covers the breaking-capacity question at that point. Downstream sub-boards still require their own PFC consideration.',
  },
  {
    id: 'mod5-s5-breaking-capacity',
    question:
      'A 6 kA breaking-capacity MCB is installed on a circuit where the measured PFC at the board is 9.2 kA. Reg 434.5.1 — what is the verdict?',
    options: [
      'Compliant — the MCB will simply trip faster on a 9.2 kA fault',
      'Non-compliant and dangerous. The device must be capable of breaking any overcurrent up to the PFC at its installed point. A 6 kA MCB on a 9.2 kA fault risks contact welding, sustained arc, and enclosure rupture',
      'Compliant if there is an upstream RCD',
      'Compliant only on TT systems',
    ],
    correctIndex: 1,
    explanation:
      'Reg 434.5.1 is unambiguous: every protective device shall be capable of breaking any overcurrent up to and including the maximum PFC at its installed point. Asking a 6 kA-rated device to clear a 9.2 kA fault is asking it to perform outside its tested rating. Either replace the MCB with one rated above 9.2 kA, or use back-up (cascading) protection from a published, type-tested combination.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which two prospective fault currents does Reg 643.7.3.201 require you to determine at the origin and at other relevant points?',
    options: [
      'Prospective short-circuit current and prospective earth fault current',
      'Prospective overload current and prospective leakage current',
      'PSCC and Zs',
      'Ze and PFC only',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.7.3.201 names the two flavours explicitly: prospective short-circuit current (PSCC, line-to-neutral) and prospective earth fault current (PEFC, line-to-earth). The greater of the two is the prospective fault current (PFC) used for breaking-capacity assessment under Reg 434.5.1.',
  },
  {
    id: 2,
    question:
      'A meter shows 4.8 kA on the PFC range at the origin of a TN-C-S supply. What does that single number actually represent?',
    options: [
      'PSCC only',
      'PEFC only',
      "The greater of the meter's PSCC (L–N) and PEFC (L–E) measurements — the meter latches the higher value as PFC",
      'A peak instantaneous current',
    ],
    correctAnswer: 2,
    explanation:
      'A modern multifunction tester measures both PSCC (line-to-neutral) and PEFC (line-to-earth) and reports the greater of the two as PFC. That is the value you compare against the breaking capacity of the protective device at that point per Reg 434.5.1.',
  },
  {
    id: 3,
    question:
      'A 6 kA breaking-capacity MCB is installed on a circuit where the measured PFC at the board is 9.2 kA. Why is this dangerous and what does Reg 434.5.1 require?',
    options: [
      'Not dangerous — the MCB will simply trip faster',
      "The fault current exceeds the device's breaking capacity. Under Reg 434.5.1, the device must be capable of breaking any overcurrent up to and including the maximum prospective fault current at its installed point. A 6 kA MCB on a 9.2 kA fault risks contact welding, arc-flash and sustained fault current",
      'The MCB will simply re-arc and clear',
      'It is acceptable provided an RCD is upstream',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 434.5.1 is unambiguous: the device shall be capable of breaking, and for a circuit-breaker making, any overcurrent up to and including the maximum prospective fault current at the point where the device is installed. A device asked to break more than its rating may not clear the fault — contacts can weld, the arc can sustain, and the enclosure may rupture.',
  },
  {
    id: 4,
    question:
      'In a dwelling with a BS EN 61439-3 consumer unit and a distributor declaration of 16 kA at the origin, what does BS 7671 permit?',
    options: [
      'You must still measure PFC at the origin',
      'It is not necessary to measure or calculate the prospective fault current at the origin of the supply',
      'You can skip Zs measurement as well',
      'The consumer unit is exempt from any breaking-capacity assessment',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 grants relief in dwellings or similar premises where a BS EN 61439-3 consumer unit is used and the distributor has declared 16 kA: the PFC at the origin need not be measured or calculated. The consumer unit's 16 kA conditional rating (Annex ZB) covers the case. The relief is origin-only — downstream points still demand thought.",
  },
  {
    id: 5,
    question:
      'On a three-phase TN-S supply you measure single-phase PSCC (L–N) at the origin as 8.1 kA. Roughly what is the three-phase symmetrical fault current at the same point?',
    options: ['8.1 kA', '4.7 kA', '14.0 kA', '24.3 kA'],
    correctAnswer: 2,
    explanation:
      'For a balanced three-phase fault, the symmetrical short-circuit current is approximately √3 × the single-phase L–N value when the source impedance is dominated by the transformer. 8.1 × √3 ≈ 14.0 kA. The protective device at the origin must be rated for the higher three-phase value — a common error is to size on the L–N reading alone.',
  },
  {
    id: 6,
    question:
      'Which formula best describes the prospective short-circuit current at any point in the installation, when the supply impedance Z is known?',
    options: ['I = U₀ × Z', 'I = U₀ / Z', 'I = Z / U₀', 'I = U₀² / Z'],
    correctAnswer: 1,
    explanation:
      "PSCC = U₀ / Z, where U₀ is the nominal line-to-earth voltage and Z is the loop impedance from the source to the point. The same Ohm's-law relationship gives PEFC when Z is the earth-fault loop. The meter does the same calculation internally — it injects a small current, measures voltage drop, and divides U₀ by the inferred Z.",
  },
  {
    id: 7,
    question:
      'The BS 7671 Cmin minimum voltage factor for an LV ESQCR-compliant supply is 0.95. Where does this factor sit in the PFC story?',
    options: [
      'It increases PFC to allow for over-voltage',
      'It reduces effective U₀ in the Zs × Ia ≤ U₀ × Cmin verification — it does not enter the PFC value itself, but it does enter the disconnection-time check that PFC enables',
      'It replaces √3 in three-phase calculations',
      "It is the meter's internal correction factor",
    ],
    correctAnswer: 1,
    explanation:
      'Cmin = 0.95 (per ESQCR low-voltage supply) reduces U₀ in the Zs × Ia ≤ U₀ × Cmin requirement under Reg 411.4.4. PFC itself is U₀ / Z at nominal voltage. Cmin matters when you take the PFC reading forward into a worst-case disconnection check — the design verification, not the meter reading.',
  },
  {
    id: 8,
    question:
      'A modern multifunction tester displays PFC as a peak (kA peak) value where some older meters reported RMS. What is the practical consequence?',
    options: [
      'No consequence — peak and RMS are the same',
      'Always divide the peak by √2 before comparing to device breaking capacity',
      'Manufacturer breaking-capacity ratings are typically RMS symmetrical (Icn / Icu / Ics). If your meter reports a peak, read the meter manual — most modern instruments report symmetrical RMS by default and pre-scale internally; do not blindly apply √2 unless the meter explicitly reports peak',
      'Peak readings are always invalid for device selection',
    ],
    correctAnswer: 2,
    explanation:
      'Device ratings (Icn / Icu / Ics for circuit-breakers, kA RMS for fuses) are symmetrical RMS. Some testers historically reported peak; modern instruments report symmetrical RMS or display both. Read the meter manual before applying any conversion factor — assuming a √2 correction blindly will under-state PFC and pick an under-rated device.',
  },
  {
    id: 9,
    question:
      "You are commissioning a sub-board fed from a TP&N origin where measured PFC is 12 kA. The manufacturer's data sheet for the upstream device shows it can act as a back-up that limits let-through to 6 kA. The downstream MCBs are 6 kA breaking. What is the procedural rule?",
    options: [
      'Always treat the downstream device as needing 12 kA breaking',
      'Cascading (back-up protection) is permitted only where the manufacturer has type-tested the specific device combination and published the let-through data. You must verify the combination is in the published cascading table — never assume cascading on un-tested combinations',
      'Cascading is never permitted in BS 7671',
      'Halve the upstream rating and use that for the downstream device',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 (and Reg 434.5.1) permits back-up protection where the upstream device has been type-tested with the downstream device and the combination is published. Without that documented combination you cannot rely on cascading — each downstream device must independently meet the local PFC. The manufacturer's table is the gating evidence.",
  },
  {
    id: 10,
    question:
      'During testing the meter PFC reading at the origin disagrees with the DNO-declared value by a wide margin (declared 16 kA, measured 9 kA). Which is the correct interpretation and action?',
    options: [
      'The meter is wrong — always use the DNO value',
      'The DNO value is the worst-case declared at network conditions; the measured value reflects the supply on the day. Record both, design to the higher (declared) value for breaking-capacity selection, and investigate any unexpected discrepancy that suggests a poor service connection',
      'Use the lower value — measurement always wins',
      'Average the two and use that',
    ],
    correctAnswer: 1,
    explanation:
      'The DNO declaration is a worst-case figure for that point on the network and is the value designers must use for breaking-capacity selection. A measured value that is much lower than declared is normal (network not at fault levels on the day) but should be recorded. A measured value that is much higher than declared is the diagnostic flag — investigate before energising.',
  },
];

const InspectionTestingModule5Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Prospective fault current calculation | I&T Module 5.5 | Elec-Mate',
    description:
      "Reg 643.7.3.201 + Reg 434.5.1: PSCC, PEFC and PFC = U₀/Z, the meter's reading vs the DNO declaration, single-phase to three-phase scaling, and how PFC governs the breaking-capacity selection that keeps a board safe.",
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
            eyebrow="Module 5 · Section 5"
            title="Prospective fault current calculation"
            description="PSCC, PEFC and PFC — what the meter is actually measuring, what the DNO is actually declaring, and how the number on the screen decides whether the board on the wall is safe."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.7.3.201 requires the prospective short-circuit current and the prospective earth fault current to be measured, calculated or otherwise determined at the origin and at other relevant points in the installation.',
              'PSCC is the line-to-neutral (or line-to-line) prospective fault current. PEFC is the line-to-earth prospective fault current. PFC is the greater of the two — that is the value used for breaking-capacity selection under Reg 434.5.1.',
              'PFC = U₀ / Z at any point. The meter measures Z by injecting a small test current and applying U₀ / Z internally; the displayed kA is a calculated value, not a directly measured fault current.',
              'Under Reg 434.5.1, every protective device must be capable of breaking any overcurrent up to and including the maximum prospective fault current at the point where the device is installed. A 6 kA MCB on a 10 kA fault is non-compliant and dangerous.',
              'Three-phase symmetrical PSCC is approximately √3 × the single-phase L–N value when the source is transformer-dominated. For dwellings with BS EN 61439-3 consumer units and a 16 kA distributor declaration, BS 7671 permits the origin PFC measurement to be omitted.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 643.7.3.201 requires you to determine, and what Reg 434.5.1 then requires you to do with the result',
              'Distinguish PSCC, PEFC and PFC by definition, by what the meter measures, and by which one feeds the breaking-capacity decision',
              'Calculate PFC from U₀ / Z at any relevant point and reason about three-phase symmetrical fault current as √3 × the single-phase value',
              'Reconcile a measured PFC with a DNO-declared value and decide which one drives the design',
              "Read a multifunction tester PFC reading correctly — peak vs RMS, the meter's internal calculation, and the limits of the test",
              'Record PFC on the EIC / EICR origin schedule and judge when a downstream point demands its own measurement',
            ]}
          />

          <ContentEyebrow>The regulation that makes you measure it</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.7.3.201 — prospective fault current at the origin and at relevant points"
            plainEnglish="Measure, calculate or otherwise determine the prospective short-circuit current AND the prospective earth fault current. Do it at the origin, and do it at any other point on the installation where the answer matters for device selection."
            onSite="The reg tells you what to determine and where, but not how. A meter PFC reading is one valid method; a calculation from DNO data and known cable impedances is another. The acceptable answer is whichever is reasoned, defensible, and recorded on the EIC."
          >
            <p>
              Reg 643.7.3.201 was the A4:2026 amendment that pulled prospective fault current into
              Part 6 testing as a hard duty. Two flavours of prospective fault current must be
              determined at the origin and at any other relevant point:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Prospective short-circuit current (PSCC)</strong> — the line-to-neutral (or,
                on three-phase, line-to-line) prospective fault current. The current that would flow
                between live conductors if a bolted short occurred at that point.
              </li>
              <li>
                <strong>Prospective earth fault current (PEFC)</strong> — the line-to-earth
                prospective fault current. The current that would flow from line to the protective
                conductor / earth path on a bolted earth fault.
              </li>
            </ul>
            <p>
              The reg uses three permissible verbs: measured, calculated, or determined by another
              method. On a typical EIC the PFC at the origin is measured directly with a
              multifunction tester. At downstream points it is usually calculated from the origin
              PFC and the known cable impedances back to the source. Both are equally valid provided
              the reasoning is recorded.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3.201"
            clause={
              <>
                The prospective short-circuit current and prospective earth fault current shall be
                measured, calculated or determined by another method, at the origin and at other
                relevant points in the installation.
              </>
            }
            meaning="Two prospective fault currents, two locations as a minimum. The duty is on the inspector to determine both at every relevant point — not just the one the meter happens to display by default. Appendix 14 of BS 7671 carries the supporting determination guidance."
          />

          <SectionRule />

          <ContentEyebrow>The three flavours — PSCC, PEFC and PFC</ContentEyebrow>

          <ConceptBlock
            title="What each one is, what causes it, and which one ends up on the schedule"
            plainEnglish="PSCC and PEFC are two different prospective faults. PFC — the value you typically see on the schedule — is the higher of the two. Whichever is greater drives the breaking-capacity selection of the protective device."
          >
            <p>Treat the three terms as a set, not as synonyms:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Term</th>
                    <th className="text-left text-white/80 py-2">Fault path</th>
                    <th className="text-left text-white/80 py-2">Formula</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-medium">PSCC</td>
                    <td className="py-2">Line to neutral (or line to line on 3φ)</td>
                    <td className="py-2">
                      U₀ / Z<sub>L–N</sub>
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 font-medium">PEFC</td>
                    <td className="py-2">Line to earth (loop via CPC / electrode)</td>
                    <td className="py-2">
                      U₀ / Z<sub>L–E</sub>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-elec-yellow">PFC</td>
                    <td className="py-2">The greater of PSCC and PEFC</td>
                    <td className="py-2">max(PSCC, PEFC)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              On a typical TN-C-S domestic supply the PSCC is usually the higher value because the
              line-to-neutral loop is shorter than the line-to-earth loop. On a TT installation with
              a high earth-electrode resistance the PEFC may be very small relative to the PSCC,
              with disconnection-time consequences that you handle separately under Reg 411.5.3
              (covered in §6). On a TN-S installation with a low Ze, the two values can be close.
            </p>
            <p>
              The schedule on an EIC asks for PFC. That single number is the worst case at the
              origin (or at the relevant point) and is the value compared against breaking capacity
              under Reg 434.5.1. If a meter has a single &ldquo;PFC&rdquo; reading, that is what it
              latches: the higher of the two internal measurements. Some meters expose PSCC and PEFC
              separately on a sub-screen — read both, record the larger as PFC, and write the
              smaller in the comments where it matters for design (TT systems are a common case).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 434.5.1"
            clause={
              <>
                A device providing protection against both overload and fault current shall be
                capable of breaking, and for a circuit-breaker making, any overcurrent up to and
                including the maximum prospective fault current at the point where the device is
                installed.
              </>
            }
            meaning="The device rating must be ≥ the maximum prospective fault current at its installed point. PFC drives the selection — not the design current, not In, not Zs. A device under-rated for the local PFC will fail to clear the fault; the worst case is contact welding and a sustained fault current that takes out the upstream device or, worse, ruptures the enclosure."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The maths — U₀ / Z, every time</ContentEyebrow>

          <ConceptBlock
            title="PFC = U₀ / Z — the same Ohm's law in three contexts"
            plainEnglish="At any point in the installation, prospective fault current is the nominal line-to-earth voltage divided by the loop impedance from the source to that point. The meter does this calculation internally; you can do it on paper from DNO and cable data."
            onSite="If the meter says PFC = 4.2 kA at a board where U₀ = 230 V, the implied loop impedance is 230 / 4 200 ≈ 0.055 Ω. Reverse the calculation as a sanity check whenever a reading looks wrong."
          >
            <p>Three ways the same formula gets used:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Origin PFC (single-phase, TN-C-S):</strong> Z is the source impedance back
                to the transformer plus the service cable. A typical 100 A urban TN-C-S service
                gives a measured PFC in the 1.5–6 kA range. The DNO declaration for the same point
                will be 16 kA (the worst-case network design figure).
              </li>
              <li>
                <strong>Origin PFC (three-phase symmetrical):</strong> for a balanced three-phase
                fault, symmetrical PSCC ≈ √3 × the single-phase L–N PSCC when the source impedance
                is dominated by the transformer (which it is, on most LV networks). A 5 kA L–N
                reading at the origin implies ≈ 8.7 kA three-phase symmetrical at the same point.
              </li>
              <li>
                <strong>Downstream PFC:</strong> at a sub-board fed by a 25 m run of 25 mm² cable,
                the cable impedance adds to the source impedance. Z<sub>sub</sub> = Z
                <sub>origin</sub> + Z<sub>cable</sub>. A higher Z means a lower PFC further into the
                installation — which is why the PFC at a final-circuit MCB is much lower than at the
                consumer-unit incomer.
              </li>
            </ol>
            <p>
              The cable contribution is small in absolute ohms but matters in PFC terms. A 25 m run
              of 25 mm² cable adds roughly 25 × (0.727 + 0.727) mΩ/m ≈ 0.036 Ω at 20°C — enough to
              drop a 6 kA origin PFC down to about 3.9 kA at the sub-board. That is why a 6 kA MCB
              at the sub-board can be defensible even though the origin PFC exceeds 6 kA.
            </p>
          </ConceptBlock>

          <Scenario
            title="Worked example — sizing a sub-board MCB on a 8.4 kA origin"
            situation="A 100 A TN-C-S service has measured PFC at the origin = 8.4 kA. A 16 mm² sub-main runs 18 m to a sub-board carrying B-curve MCBs. The MCB manufacturer data lists the device as Icn = 6 kA / Ics = 6 kA. Cable r1 = 1.15 mΩ/m, r2 = 1.91 mΩ/m at 20°C."
            whatToDo={
              <>
                <span className="block">
                  Cable impedance contribution (L + N path): 18 × 1.15 × 2 = 41.4 mΩ ≈ 0.041 Ω.
                </span>
                <span className="block">
                  Origin loop impedance implied by 8.4 kA PFC at U₀ = 230 V: 230 / 8 400 = 0.0274 Ω.
                </span>
                <span className="block">Sub-board loop impedance: 0.0274 + 0.041 = 0.068 Ω.</span>
                <span className="block">Sub-board PFC: 230 / 0.068 = 3 380 A ≈ 3.4 kA.</span>
                <span className="block">
                  3.4 kA &lt; 6 kA MCB rating → Reg 434.5.1 satisfied at the sub-board. The same MCB
                  would NOT be compliant at the origin (8.4 kA). Document both PFC values on the
                  schedule and the breaking-capacity calculation in the comments.
                </span>
              </>
            }
            whyItMatters="The temptation is to apply the worst-case origin PFC across every device on the installation. That over-specifies sub-boards and final circuits — and obscures the actual safety margin. The correct approach is to calculate PFC at each device's installed point and verify Reg 434.5.1 there. The meter usually agrees with the calculation within ±10 % when the cable data is good."
          />

          {/* PFC vs Breaking Capacity diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              PFC vs breaking capacity — compliant and non-compliant configurations
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="Two side-by-side board configurations. Left: a 16 kA DNO declaration at the origin feeds a consumer unit with 6 kA MCBs — flagged dangerous. Right: the same 16 kA origin feeds a sub-board through cable that drops PFC to 3.4 kA, and the 6 kA MCBs at the sub-board are compliant under Reg 434.5.1."
            >
              {/* Left: DANGER configuration */}
              <rect
                x="20"
                y="20"
                width="370"
                height="340"
                rx="10"
                fill="rgba(239,68,68,0.05)"
                stroke="rgba(239,68,68,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="205"
                y="42"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="12"
                fontWeight="bold"
              >
                DANGEROUS — Reg 434.5.1 breach
              </text>

              <rect
                x="50"
                y="60"
                width="100"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                DNO
              </text>
              <text
                x="100"
                y="100"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                PFC = 16 kA
              </text>
              <text x="100" y="114" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (declared)
              </text>

              <line x1="150" y1="90" x2="240" y2="90" stroke="#EF4444" strokeWidth="2" />
              <text x="195" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                short tails
              </text>

              <rect
                x="240"
                y="60"
                width="120"
                height="200"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="300"
                y="80"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                Consumer Unit
              </text>
              <text
                x="300"
                y="96"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                PFC ≈ 15 kA
              </text>

              <rect
                x="255"
                y="115"
                width="90"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.15)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text
                x="300"
                y="130"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                B32 MCB · 6 kA
              </text>
              <rect
                x="255"
                y="145"
                width="90"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.15)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text
                x="300"
                y="160"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                B16 MCB · 6 kA
              </text>
              <rect
                x="255"
                y="175"
                width="90"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.15)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text
                x="300"
                y="190"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                B6 MCB · 6 kA
              </text>

              <rect
                x="40"
                y="280"
                width="330"
                height="70"
                rx="6"
                fill="rgba(239,68,68,0.1)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="205"
                y="300"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                ⚠ 15 kA fault on a 6 kA device
              </text>
              <text x="205" y="316" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Contacts may weld. Arc may sustain.
              </text>
              <text x="205" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Enclosure may rupture under fault energy.
              </text>
              <text x="205" y="344" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Selection breaches Reg 434.5.1.
              </text>

              {/* Right: COMPLIANT configuration */}
              <rect
                x="410"
                y="20"
                width="370"
                height="340"
                rx="10"
                fill="rgba(34,197,94,0.05)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="595"
                y="42"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                COMPLIANT — Reg 434.5.1 satisfied
              </text>

              <rect
                x="440"
                y="60"
                width="100"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="490"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                DNO
              </text>
              <text
                x="490"
                y="100"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                PFC = 16 kA
              </text>
              <text x="490" y="114" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (declared)
              </text>

              <line
                x1="540"
                y1="90"
                x2="630"
                y2="90"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="6,3"
              />
              <text x="585" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                25 m × 16 mm² sub-main
              </text>
              <text x="585" y="106" textAnchor="middle" fill="#FBBF24" fontSize="9">
                +0.041 Ω
              </text>

              <rect
                x="630"
                y="60"
                width="120"
                height="200"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="690"
                y="80"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                Sub-board
              </text>
              <text
                x="690"
                y="96"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                PFC = 3.4 kA
              </text>

              <rect
                x="645"
                y="115"
                width="90"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.15)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="690"
                y="130"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                B32 MCB · 6 kA ✓
              </text>
              <rect
                x="645"
                y="145"
                width="90"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.15)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="690"
                y="160"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                B16 MCB · 6 kA ✓
              </text>
              <rect
                x="645"
                y="175"
                width="90"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.15)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="690"
                y="190"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                B6 MCB · 6 kA ✓
              </text>

              <rect
                x="430"
                y="280"
                width="330"
                height="70"
                rx="6"
                fill="rgba(34,197,94,0.1)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="595"
                y="300"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                3.4 kA &lt; 6 kA breaking capacity
              </text>
              <text x="595" y="316" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Cable impedance has dropped PFC sufficiently.
              </text>
              <text x="595" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Each MCB rated above local PFC.
              </text>
              <text x="595" y="344" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reg 434.5.1 satisfied at this point.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What the meter is actually doing</ContentEyebrow>

          <ConceptBlock
            title="The PFC reading is calculated, not measured"
            plainEnglish="No multifunction tester injects 6 kA. The meter injects a small test current (typically a few amps), measures the resulting voltage drop, infers Z by Ohm's law, and divides U₀ by Z to display kA. The kA on the screen is the answer to a calculation, not a direct measurement."
            onSite="That is why the meter's reading depends on having a stable supply voltage during the test. A weak service connection, a borrowed neutral, or a high-impedance joint somewhere upstream will perturb the measurement and shift the displayed PFC. If a reading looks anomalous, repeat it — and check the supply voltage at the same time."
          >
            <p>Two implications for how you read the result:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Symmetrical RMS, not peak:</strong> manufacturer breaking-capacity ratings
                (Icn, Icu, Ics) are symmetrical RMS values. Modern multifunction testers report PFC
                as symmetrical RMS by default. Some legacy instruments report peak (kA peak). Check
                the meter manual before applying any conversion factor — assuming a √2 scale blindly
                will under-state PFC and put you in the wrong column on the device data sheet.
              </li>
              <li>
                <strong>The reading reflects the day, not the design case:</strong> a measured PFC
                of 4 kA at an origin where the DNO declares 16 kA does not contradict the
                declaration. The DNO figure is the network worst case (low-impedance fault at
                low-load conditions); the measurement is what was available on the day. Record both.
                Design to the higher (declared) value for breaking-capacity selection. A measurement
                that exceeds the declaration is the diagnostic flag — investigate the service
                connection or the meter test setup.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Recording the meter PFC and ignoring the DNO declaration"
            whatHappens="A domestic EIC records PFC at the origin as 3.8 kA from the meter and that value is used to justify 6 kA MCBs throughout. The DNO declaration for the area is 16 kA. Six months later the network is reconfigured (a fault on a parallel feeder is repaired) and the actual fault current available at the service rises towards the declared value. A fault occurs on a final circuit, the 6 kA MCB welds, and the consumer unit fails."
            doInstead="The DNO declaration is the design-case PFC at the origin for breaking-capacity selection. Record the meter reading separately as the &lsquo;measured PFC on the day&rsquo; — useful for diagnostic context — and use the declared figure when selecting devices. For dwellings with a BS EN 61439-3 consumer unit, the 16 kA conditional rating (Annex ZB) covers the standard case and BS 7671 explicitly permits the origin PFC measurement to be omitted."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Annex / commentary on BS EN 61439-3 consumer units"
            clause={
              <>
                In dwellings (household) or similar premises, where a consumer unit to BS EN 61439-3
                is used and the maximum prospective fault current declared by the distributor is 16
                kA, it is not necessary to measure or calculate prospective fault current at the
                origin of the supply.
              </>
            }
            meaning="The relief is conditional on a BS EN 61439-3 consumer unit AND a 16 kA distributor declaration. Both must hold. Different distribution-board types do not get the relief. The declaration must be confirmed (DNO connection letter / network data) — not assumed because 'it's a domestic'."
          />

          <SectionRule />

          <ContentEyebrow>Three-phase — the √3 step</ContentEyebrow>

          <ConceptBlock
            title="Single-phase PSCC to three-phase symmetrical fault current"
            plainEnglish="On a three-phase supply the meter typically measures L–N (single-phase) PSCC. The three-phase symmetrical fault current is approximately √3 × the L–N value when the source impedance is dominated by the transformer. That is the value you compare to a three-phase device's breaking capacity."
            onSite="A 5 kA L–N reading at a TP&N origin implies ≈ 8.7 kA three-phase symmetrical PSCC. A 10 kA-rated three-phase MCB is fine; a 6 kA-rated single-phase MCB used as one phase of a balanced three-phase load needs the L–N value (5 kA) for selection — it sees its L–N fault as the worst case."
          >
            <p>
              The √3 relationship comes out of the symmetrical-component analysis of a balanced
              three-phase fault. Practically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Three-phase (3φ) MCB / breaker:</strong> rated breaking capacity must be ≥
                three-phase symmetrical PSCC ≈ √3 × L–N value at that point.
              </li>
              <li>
                <strong>Single-phase MCB on a TP&amp;N board:</strong> the device sees an L–N fault.
                Its breaking capacity must be ≥ the L–N PSCC value at the busbar — the same number
                the meter reads when the L–N test probes are placed across one phase and neutral.
              </li>
              <li>
                <strong>Line-to-line (L–L) fault on a 3φ board:</strong> approximately √3/2 × the
                three-phase symmetrical value. Almost never the worst case once the three-phase
                value has been considered.
              </li>
            </ul>
            <p>
              On a TT installation or where the source impedance is not dominated by the transformer
              (e.g. a generator-fed installation), the √3 approximation breaks down. In those cases
              the supply equipment manufacturer or the design calculation must give the three-phase
              value directly — the meter's L–N reading × √3 will be wrong.
            </p>
          </ConceptBlock>

          <Scenario
            title="A TP&N commercial board with mixed device ratings"
            situation="A 200 A TP&N origin has measured single-phase L–N PSCC of 7.2 kA. The board has: a 100 A 4-pole isolator (rated 25 kA), 32 A 3-pole MCBs (rated 10 kA), and 16 A 1-pole MCBs (rated 6 kA) feeding single-phase final circuits. Origin Ze is low; cable impedance from origin to the busbar is negligible."
            whatToDo={
              <>
                <span className="block">
                  Three-phase symmetrical PSCC ≈ √3 × 7.2 = 12.5 kA. The 4-pole isolator (25 kA) and
                  the 3-pole MCBs (10 kA on the 3φ load) need this value.
                </span>
                <span className="block">
                  3-pole MCBs at 10 kA &lt; 12.5 kA →{' '}
                  <strong className="text-red-300">non-compliant</strong> on the three-phase fault.
                  Replace with 16 kA-rated devices, or insert cable impedance to drop PFC, or add a
                  back-up cascading device with a published combination.
                </span>
                <span className="block">
                  1-pole MCBs feeding L–N circuits see 7.2 kA at the busbar. 6 kA &lt; 7.2 kA →{' '}
                  <strong className="text-red-300">non-compliant</strong>. Same options:
                  higher-rated device, cascading, or downstream of cable that drops PFC below 6 kA.
                </span>
                <span className="block">
                  Both findings go on the EIC schedule with PFC values stated for L–N (7.2 kA) and
                  3φ (12.5 kA). Each device line shows its rating against the relevant PFC.
                </span>
              </>
            }
            whyItMatters="The single-phase reading on the meter is the right number for the single-phase MCBs and the wrong number for the three-phase MCBs. Inspectors who quote one PFC for the whole board commit two errors at once: they over-state for L–N devices (occasionally) and under-state for 3φ devices (always). The schedule needs both values when the board is mixed."
          />

          <CommonMistake
            title="Treating a three-phase MCB as if its rating is on the L–N PSCC"
            whatHappens="A 25 kA-rated 3-pole MCB is fitted at a TP&N origin. The schedule lists the L–N PSCC as 8 kA and notes the device as &lsquo;25 kA — comfortable headroom&rsquo;. The actual three-phase symmetrical PSCC is √3 × 8 ≈ 13.9 kA. The headroom is real, but the comparison was made against the wrong number — and the next inspector inherits a board where the assessment looks correct on paper but used the wrong PFC."
            doInstead="On any three-phase board, calculate three-phase symmetrical PSCC = √3 × measured L–N PSCC and compare three-phase device ratings against that value. Single-phase devices on the same board compare against the L–N value directly. Note both PFCs on the schedule with a comment such as &lsquo;3φ symmetrical PSCC = 13.9 kA, L–N PSCC = 8 kA&rsquo;."
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

          <ContentEyebrow>Recording on the EIC / EICR</ContentEyebrow>

          <ConceptBlock
            title="What goes on the schedule and what goes in the comments"
            plainEnglish="The EIC has a PFC field at the origin. That is the single greater-of-two value (max of PSCC, PEFC) at the origin — the meter's default reading or the DNO declaration, whichever drives the design. Anything else of consequence goes in the comments column."
          >
            <p>Three rules for the A4:2026 schedule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>PFC at the origin:</strong> the value used for breaking-capacity selection —
                the DNO declaration if available, otherwise the measured value. State the source in
                the comments (&lsquo;DNO declared 16 kA&rsquo; / &lsquo;measured at origin 4.8 kA,
                no DNO declaration available&rsquo;).
              </li>
              <li>
                <strong>PFC at distribution boards / sub-mains:</strong> calculated from the origin
                value plus the cable impedance back to the source, or measured directly with the
                tester. Include the value on the schedule of distribution-board details for each
                board where Reg 434.5.1 is verified.
              </li>
              <li>
                <strong>Comments:</strong> any of the following — three-phase symmetrical value
                derived from L–N reading, PEFC value separately where it differs significantly from
                PSCC (typical on TT systems), cascading combination relied upon, BS EN 61439-3 + 16
                kA relief invoked.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.7.3.201 requires PSCC and PEFC determination at the origin and at every relevant point — not just the origin.',
              "PFC = max(PSCC, PEFC) = U₀ / Z. The same Ohm's law holds at every point in the installation.",
              'Reg 434.5.1: every device must break any overcurrent up to and including the maximum prospective fault current at its installed point. PFC drives breaking-capacity selection.',
              "The meter's PFC reading is calculated internally from a low-current Z measurement — it is not a direct fault-current measurement. Confirm peak vs RMS in the meter manual.",
              'DNO declaration is the design-case worst PFC. Use it for selection; record measured value separately for diagnostic context.',
              'Three-phase symmetrical PSCC ≈ √3 × the single-phase L–N PSCC when source impedance is transformer-dominated.',
              'BS EN 61439-3 consumer units in dwellings with a 16 kA distributor declaration are exempt from origin PFC measurement (relief applies to origin only).',
              'Cable impedance reduces PFC downstream. Use the local PFC, not the origin PFC, when assessing devices at sub-boards.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What is the difference between PFC, PSCC and PEFC?',
                answer:
                  'PSCC is line-to-neutral (or line-to-line) prospective fault current. PEFC is line-to-earth prospective fault current. PFC is the greater of the two — the worst-case prospective fault current used for device breaking-capacity selection under Reg 434.5.1. On a TN-C-S domestic supply PSCC is usually the higher value; on a TT system with a high earth electrode PEFC may be very small relative to PSCC.',
              },
              {
                question:
                  'Do I need to measure PFC at every distribution board, or only at the origin?',
                answer:
                  "Reg 643.7.3.201 says 'at the origin and at other relevant points in the installation'. A 'relevant point' is any location where the breaking-capacity selection of a protective device depends on the local PFC — typically every distribution board fed by sub-main cable. You can either measure directly with the meter or calculate from the origin PFC and the known cable impedance. Both are acceptable provided the calculation is recorded.",
              },
              {
                question:
                  'My meter shows PFC and the DNO declaration is different. Which do I use?',
                answer:
                  'Use the higher value (almost always the DNO declaration) for breaking-capacity selection under Reg 434.5.1. The DNO declaration is the network worst-case PFC at that connection — designed-in. The meter reading reflects the supply on the day and is usually lower because real network impedance exceeds the worst-case assumed in the declaration. Record both on the schedule and design to the declared value.',
              },
              {
                question:
                  'When can I rely on the BS EN 61439-3 16 kA relief and skip the origin PFC measurement?',
                answer:
                  'Only when both conditions hold: (a) the distribution board at the origin is a consumer unit complying with BS EN 61439-3, and (b) the distributor has declared the maximum PFC at the origin as 16 kA. Both must be true. The relief is origin-only — downstream points (sub-boards, sub-mains) still require PFC determination per Reg 434.5.1. Confirm the distributor declaration in writing or from network data; do not assume 16 kA because the property is domestic.',
              },
              {
                question:
                  'How do I get from a single-phase PSCC reading to a three-phase symmetrical PSCC?',
                answer:
                  'Multiply the L–N reading by √3 (≈ 1.732) when the source impedance is dominated by the transformer — true on most LV TN networks. So a 6 kA L–N reading at a TP&N origin implies ≈ 10.4 kA three-phase symmetrical PSCC. The √3 factor breaks down on generator-fed or non-transformer-dominated supplies, where the manufacturer or design calculation must give the three-phase value directly. State the three-phase value separately on the schedule whenever it differs from the L–N value.',
              },
              {
                question: 'Why is breaking capacity (Icn / Icu / Ics) a different number from In?',
                answer:
                  'In is the rated current of the device — the load it can carry continuously. Icn / Icu / Ics are the breaking-capacity ratings — the maximum fault current the device can interrupt without damage or with rated post-fault performance. A B32 MCB has In = 32 A and (typically) Icn = 6 kA. Reg 434.5.1 requires the breaking capacity, not the rated current, to exceed the local PFC. Confusing the two is a common selection error; In is for normal load, Icn / Icu / Ics is for the fault.',
              },
              {
                question:
                  'What about cascading (back-up protection) — can a 6 kA downstream device be used on a 10 kA fault?',
                answer:
                  "Only where the upstream and downstream devices have been type-tested as a combination by the manufacturer and the let-through current has been published in a cascading table. Without that documented combination you cannot rely on cascading. Each downstream device must independently meet the local PFC under Reg 434.5.1 unless the manufacturer's combination table demonstrably covers the case. Cascading is a manufacturer-evidence concept, not a rule of thumb.",
              },
              {
                question:
                  'A measured PFC at the origin is wildly higher than the DNO declaration. What now?',
                answer:
                  'That is a diagnostic flag, not a number to take forward. The DNO declaration is the network worst case; a measurement that exceeds it suggests an unusual supply condition — a borrowed neutral, a parallel service path, or a meter test setup error. Investigate before energising: check the supply phase angle and voltage during the test, repeat the measurement, and contact the DNO if the result persists. Do not size devices to the unexplained measurement.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Prospective fault current — Module 5.5" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-5/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 EFLI testing of RCD-protected circuits
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

export default InspectionTestingModule5Section5;
