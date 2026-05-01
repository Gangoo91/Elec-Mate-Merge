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
    id: 'mod5-s1-zs-definition',
    question:
      'BS 7671 defines Zs as the impedance of a loop with three components in series. Which best describes those components for a fault at a kitchen socket on a TN-C-S supply?',
    options: [
      'Line conductor only — earth return is negligible',
      'Source impedance + line conductor up to the fault + protective conductor between the fault and the source',
      'Ze + the supplementary bonding to the kitchen sink',
      'The earth electrode + the soil + the substation only',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 defines Zs as the impedance of the fault loop comprising (a) the source, (b) the line conductor up to the point of the fault and (c) the protective conductor between the point of the fault and the source. Practically, that decomposes into Ze (everything outside the installation) + R1 + R2 (the final-circuit conductors). Bonding does not appear in the Zs sum.',
  },
  {
    id: 'mod5-s1-tt-rcd',
    question:
      'A TT installation has a 30 mA RCD providing fault protection. Measured loop impedance Zs at the test point is 95 Ω. Reg 411.5.3 / Table 41.5 — compliant?',
    options: [
      'No — Zs must be below 0.4 Ω',
      'Yes — 95 Ω × 0.030 A = 2.85 V, well under the 50 V touch-voltage limit, and 95 Ω is far below the Table 41.5 maximum of 1667 Ω for a 30 mA RCD at Uo = 230 V',
      'No — TT requires an electrode below 1 Ω',
      'Only if Ze is also below 0.35 Ω',
    ],
    correctIndex: 1,
    explanation:
      'On TT with an RCD, Reg 411.5.3 sets the touch-voltage condition Ra × IΔn ≤ 50 V (or Zs in lieu of Ra). 95 × 0.030 = 2.85 V — well below 50 V. Table 41.5 publishes 1667 Ω as the maximum Zs for a 30 mA RCD at 230 V; 95 Ω is comfortably inside. Both compliance routes pass.',
  },
  {
    id: 'mod5-s1-zs-vs-ze',
    question:
      'You measure Ze at the origin as 0.21 Ω. A 32 A B-curve MCB final circuit at the furthest socket has a calculated R1+R2 of 0.62 Ω at 70 °C. What is the predicted Zs and is it compliant against the 1.37 Ω Table 41.3 limit?',
    options: [
      '0.62 Ω — only R1+R2 matters at the far end',
      '0.83 Ω = Ze + R1+R2 corrected; comfortably below 1.37 Ω → compliant',
      '0.21 Ω — Ze is the verification value',
      '1.37 Ω — exactly on the limit',
    ],
    correctIndex: 1,
    explanation:
      'Zs = Ze + R1 + R2 (corrected to operating temperature). 0.21 + 0.62 = 0.83 Ω. The Table 41.3 maximum permitted Zs for a 32 A Type B device at 230 V is 1.37 Ω, so 0.83 Ω is compliant with comfortable headroom. Treating Ze alone as Zs misses the conductor contribution at the worst-case fault point.',
  },
  {
    id: 'mod5-s1-pen-rule',
    question:
      'Reg 411.4.3 (with the A4 amendment) prohibits which specific practice in a TN-C-S installation?',
    options: [
      'Sleeving the PEN conductor blue',
      'Inserting any switching or isolating device in a PEN conductor',
      'Using SWA cable for the PEN',
      'Bonding the PEN to a water pipe',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.4.3 expressly states that no switching or isolating device shall be inserted in a PEN conductor. Reg 461.2 echoes the rule. Interrupting the PEN breaks the metallic fault-return path — the entire premise of TN-C-S protection — and can leave exposed-conductive-parts at full line voltage above earth.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671:2018+A4:2026 defines Zs as the impedance of the fault loop comprising three elements. Which three?',
    options: [
      'Line conductor, neutral conductor, transformer secondary',
      'The source, the line conductor up to the point of the fault, and the protective conductor between the point of the fault and the source',
      'Ze, R1 and R2 only — the source is not part of Zs',
      'The earth electrode, the bonding conductors, and the CPC',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 defines Zs as the impedance in ohms of the fault loop comprising (a) the source, (b) the line conductor up to the point of the fault and (c) the protective conductor between the point of the fault and the source. This is the loop the fault current travels through — every part contributes resistance, every part is in the Zs sum.',
  },
  {
    id: 2,
    question:
      'In a TN-C-S (PME) installation, what is the actual return path for an earth fault current from an exposed-conductive-part back to the transformer star point?',
    options: [
      'Through the general mass of earth via an earth electrode',
      'Up the CPC to the MET, into the meter tails N, along the supply PEN conductor back to the transformer where N and PE separate',
      'Down the gas pipe to the gas main',
      'Through the building structure',
    ],
    correctAnswer: 1,
    explanation:
      'TN-C-S (PME) defines the neutral and protective functions as combined in a single PEN conductor in part of the supply system. The fault current returns from the MET via the supply neutral / PEN conductor back to the source — a low-impedance metallic path. The general mass of earth is not the return path in TN; that is the TT system.',
  },
  {
    id: 3,
    question:
      'Reg 411.3.2.2 sets a maximum disconnection time of 0.4 s for a final circuit ≤ 32 A on a 230 V TN system. What does that disconnection time depend on at the moment of the fault?',
    options: [
      'The supply voltage alone',
      'The Zs of the circuit at the point of the fault — Zs determines the prospective fault current (If ≈ Uo / Zs), which in turn determines how quickly the protective device operates on its time-current characteristic',
      'The size of the line conductor only',
      'The ambient temperature inside the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      'Disconnection time is set by how much current the loop allows to flow during a fault. If ≈ Uo / Zs. A higher Zs means a lower fault current and a slower trip. This is why Reg 411.3.2.2 disconnection time is enforced through Reg 411.4.4 / Tables 41.2–41.4 maximum-Zs values: keep Zs below the table value and the device will operate within 0.4 s by design.',
  },
  {
    id: 4,
    question:
      'A TT installation has Ra (earth electrode + CPC) of 80 Ω. The protective device is a 30 mA RCD. Does Reg 411.5.3 condition Ra × IΔn ≤ 50 V hold?',
    options: [
      'No — 80 × 0.03 = 2.4 V, fail',
      'Yes — 80 × 0.03 = 2.4 V, well below 50 V',
      'Reg 411.5.3 does not apply to RCD-protected TT circuits',
      'Only if Ze is also below 200 Ω',
    ],
    correctAnswer: 1,
    explanation:
      '80 × 0.030 = 2.4 V, which is comfortably below 50 V. Reg 411.5.3 sets the touch-voltage limit for RCD-based fault protection in TT systems: Ra × IΔn ≤ 50 V. The note in the regulation also points out that where Ra is not known, Zs may be used in its place, and Table 41.5 gives maximum Zs values for RCD ratings (1667 Ω for a 30 mA RCD) which is the practical headroom on a TT circuit.',
  },
  {
    id: 5,
    question:
      'Why does Zs matter more than Ze when verifying a circuit at the furthest point on a final circuit?',
    options: [
      'Zs is easier to measure',
      'Ze is the impedance only up to the MET. The fault could occur anywhere on the circuit, and the protective device sees the loop as Ze + R1 + R2 at the fault point. Only Zs reflects the actual disconnection condition at the fault location',
      'Ze is no longer required by BS 7671',
      'They are interchangeable',
    ],
    correctAnswer: 1,
    explanation:
      'Ze is the external loop impedance up to the origin of the installation. The disconnection condition has to be verified at the fault location, which can be anywhere on the circuit — including the worst-case furthest point. Zs = Ze + R1 + R2 is the impedance the fault current actually sees, so it is Zs that has to satisfy the Reg 411.4.4 / Table 41 limits, not Ze.',
  },
  {
    id: 6,
    question:
      'In a TN-S installation (separate N and PE throughout), what physically conducts the earth fault return current back to the transformer?',
    options: [
      'The supply neutral, which doubles as PE',
      'A separate metallic protective conductor (often the cable sheath / armour or a dedicated PE core) that runs all the way back to the transformer, where PE is bonded to the supply neutral at the source',
      'The gas pipe via main bonding',
      'The earth electrode at the consumer position',
    ],
    correctAnswer: 1,
    explanation:
      'TN-S is defined as having separate neutral and protective conductors throughout the system. The protective conductor (PE) may be the metallic covering of the supply cable (sheath/armour) or a separate conductor. All exposed-conductive-parts are bonded to that PE via the MET. Fault current returns metallically all the way to the transformer where PE bonds to N at the source.',
  },
  {
    id: 7,
    question:
      'A 6 mm² / 2.5 mm² T&E radial circuit is 28 m long. Ze at the origin is 0.27 Ω. From GN3 Table BI at 20°C, r1 + r2 = 10.49 mΩ/m. Estimate Zs at 70°C operating temperature.',
    options: ['0.62 Ω', '0.27 Ω', '0.94 Ω', '0.62 Ω at 20°C; ~0.62 Ω corrected'],
    correctAnswer: 0,
    explanation:
      'R1+R2 at 20°C = 28 × 10.49 = 293.7 mΩ ≈ 0.29 Ω. Multiply by ~1.20 for 70°C operating temperature → 0.35 Ω. Zs = Ze + (R1+R2 corrected) = 0.27 + 0.35 = 0.62 Ω. That is the value to compare against the relevant Table 41.3 or A4 max-permitted-Zs limit for the protective device.',
  },
  {
    id: 8,
    question:
      'Reg 411.4.3 (with the A4 amendment) adds a specific prohibition about the PEN conductor in TN-C-S. What is it?',
    options: [
      'The PEN must be undersized',
      'No switching or isolating device shall be inserted in a PEN conductor',
      'The PEN must be sleeved blue',
      'The PEN must terminate at the earth electrode only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.4.3 expressly states that no switching or isolating device shall be inserted in a PEN conductor. Reg 461.2 echoes the same rule: in TN-C and TN-C-S systems the PEN shall not be isolated or switched. The PEN is the return path for both load and fault current — interrupting it can leave exposed-conductive-parts at full line voltage above earth.',
  },
  {
    id: 9,
    question:
      'You measure Ze at the origin of a TN-C-S installation as 0.18 Ω. At a socket on a 32 A B-curve MCB final circuit you measure Zs as 0.91 Ω. Table 41.3 max-permitted Zs for that device is 1.09 Ω. The reading complies. What is the implied R1+R2 from that data?',
    options: [
      '0.91 Ω — you measured it',
      '0.73 Ω — Zs minus Ze (0.91 − 0.18) gives the R1+R2 contribution at the test temperature',
      '1.09 Ω — the table value',
      '0.18 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'Zs = Ze + R1 + R2, so R1+R2 = Zs − Ze = 0.91 − 0.18 = 0.73 Ω at the temperature the cable was at when the live test was run. This is one of the most useful sanity checks on site: a measured Zs that disagrees with Ze + (calculated/measured R1+R2) by more than the expected temperature correction is the flag to investigate before signing the schedule.',
  },
  {
    id: 10,
    question:
      'NOTE 1 to Reg 643.7.3 warns that the validity of Zs readings can be adversely affected by what type of equipment in modern installations?',
    options: [
      'Tungsten-filament lamps',
      'Power-converting equipment such as inverters (PV, battery storage, EV chargers)',
      'Linear transformers',
      'Resistive heating loads',
    ],
    correctAnswer: 1,
    explanation:
      'NOTE 1 to Reg 643.7.3 (carried into Reg 826.7 for prosumer installations) warns that the validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power-converting equipment, such as inverters. The harmonic content / fast switching of inverters can confuse the loop tester. Where this applies, Reg 826.7 requires an alternative method for determining prospective fault current and earth fault loop impedance.',
  },
];

const InspectionTestingModule5Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Earth fault path principles | I&T Module 5.1 | Elec-Mate',
    description:
      'Reg 411.3.2 + Reg 411.4 / 411.5 / 411.6 + Reg 643.7.3: the earth fault loop end-to-end — transformer → MET → CPC → fault → exposed-conductive-part → return through N / PEN / earth — and why Zs = Ze + R1 + R2 governs disconnection time.',
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
            eyebrow="Module 5 · Section 1"
            title="Earth fault path principles"
            description="The earth fault loop from transformer star point to MET to CPC and back. Why Zs = Ze + R1 + R2 governs disconnection time, and how TN, TT and IT differ on the return path."
            tone="yellow"
          />

          <TLDR
            points={[
              'Zs is the impedance of the entire fault loop: source → line conductor to the fault → CPC back to the source. BS 7671 defines it explicitly — every segment is in the sum.',
              'Reg 411.4 (TN), Reg 411.5 (TT) and Reg 411.6 (IT) define three different return paths. TN: metallic, via PEN/PE back to the transformer star point. TT: through the general mass of earth via an earth electrode at the installation. IT: high-impedance / not deliberately earthed at the source.',
              'Reg 411.3.2.2 fixes the disconnection time (typically 0.4 s for ≤ 32 A final circuits at 230 V TN). That time is achieved by holding Zs below the maximum value in Tables 41.2 / 41.3 / 41.4 — because If ≈ Uo / Zs and the protective device operates on a current-vs-time curve.',
              'The maths: Zs = Ze + R1 + R2. Ze is everything outside the installation (source impedance + supply cable + earthing arrangement). R1 + R2 is the line conductor plus CPC of the final circuit. Add them and you have the loop impedance the fault current actually sees at the worst-case point.',
              'Why Zs matters more than Ze: the disconnection condition has to be true at the fault location, which can be at the furthest point of any circuit. Ze alone tells you nothing about what happens at the end of a long radial.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Trace the earth fault loop end-to-end on TN-S, TN-C-S and TT systems and identify each segment that contributes to Zs',
              'State the BS 7671 definition of Zs and what each of the three components (source, line, CPC) represents physically',
              'Explain why disconnection time depends on Zs via If ≈ Uo / Zs and the device time-current characteristic',
              'Read Tables 41.2 / 41.3 / 41.4 / 41.5 against a measured Zs and judge compliance with Reg 411.3.2.2',
              'Apply Reg 411.5.3 (Ra × IΔn ≤ 50 V) for RCD-based fault protection on TT systems',
              'Recognise where IT systems differ (Reg 411.6) and what verification looks like there',
              'Identify when modern equipment (inverters, EVSE, battery storage) invalidates a standard loop test reading per Reg 643.7.3 / Reg 826.7',
            ]}
          />

          <ContentEyebrow>The earth fault loop, end-to-end</ContentEyebrow>

          <ConceptBlock
            title="What &lsquo;earth fault&rsquo; actually means"
            plainEnglish="An earth fault is an unintended low-impedance path from a live conductor to an exposed-conductive-part, an extraneous-conductive-part, the protective conductor, or the general mass of earth. The fault current that flows is what trips the protective device — and what kills somebody if it doesn't trip fast enough."
            onSite="Every earth fault has a loop. Identify the loop and you have identified what your protective device is relying on."
          >
            <p>
              Reg 411.3.2 of BS&nbsp;7671:2018+A4:2026 sets out the principle: when an earth fault
              of negligible impedance occurs between a line conductor and an exposed-conductive-part
              or a protective conductor, a protective device shall automatically disconnect the
              supply within the disconnection time required by Reg 411.3.2.2. The whole regulation
              rests on the assumption that the fault current can flow round a complete loop — out
              via the line conductor, through the fault, back via the protective conductor and the
              supply earthing arrangement to the source. If any segment of that loop is broken or
              high-impedance, the device cannot operate. That is the entire reason the loop is
              tested.
            </p>
            <p>
              The loop has a name, a symbol, and a regulatory definition. It is called the earth
              fault loop. Its impedance is Zs. And BS&nbsp;7671 says Zs is the impedance of the loop
              comprising (a) the source, (b) the line conductor up to the point of the fault, and
              (c) the protective conductor between the point of the fault and the source.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Definition of Zs"
            clause={
              <>
                Zs is defined as the impedance in ohms (Ω) of the fault loop comprising: (a) the
                source; (b) the line conductor up to the point of the fault; and (c) the protective
                conductor between the point of the fault and the source.
              </>
            }
            meaning="Three components, all in series. The source itself has impedance (transformer winding + supply transformer earthing). The line conductor adds resistance over its run. The protective conductor adds resistance over its run back to the source. Add them and you have the loop the fault current actually travels through."
          />

          <ConceptBlock
            title="Trace the loop on a TN-C-S (PME) supply — the most common UK case"
            plainEnglish="On a typical UK domestic or small commercial PME supply, the earth fault loop is metallic from end to end. There is no earth electrode on the consumer side; the protective function is delivered by the supply PEN conductor running back to the transformer star point."
            onSite="Visualise the loop in segments. Each segment has resistance. The total is Zs. The fault current is approximately Uo divided by Zs."
          >
            <p>The TN-C-S loop, segment by segment, for a fault at a socket-outlet:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Transformer secondary winding</strong> — the source. The secondary winding
                has internal impedance (typically a small fraction of an ohm at the LV side). The
                star point is the reference earth for the system.
              </li>
              <li>
                <strong>Distribution network — line conductor</strong> — from the transformer LV
                terminal out along the underground / overhead supply cable to the cut-out at the
                consumer position.
              </li>
              <li>
                <strong>Service cut-out and meter tails (line)</strong> — the supplier&rsquo;s
                cut-out, the line meter tail to the meter, the meter, the line tail from the meter
                to the consumer unit / origin.
              </li>
              <li>
                <strong>Final-circuit line conductor (R1)</strong> — from the protective device
                terminal at the consumer unit, along the line conductor of the final circuit, all
                the way to the fault point.
              </li>
              <li>
                <strong>The fault itself</strong> — assumed to be of negligible impedance for the
                purposes of the regulation. A real fault may have some arc resistance; design
                assumes zero so that the worst case (highest current) is captured.
              </li>
              <li>
                <strong>Final-circuit protective conductor (R2)</strong> — back from the fault point
                along the CPC of the circuit to the earthing terminal of the consumer unit / MET.
              </li>
              <li>
                <strong>MET → meter tail (neutral) → meter → service cut-out (neutral)</strong> —
                because TN-C-S combines the protective and neutral functions in the supply PEN
                conductor, the protective return joins the neutral path at the meter position.
              </li>
              <li>
                <strong>Supply PEN conductor</strong> — from the cut-out neutral terminal, along the
                underground / overhead supply PEN conductor all the way back to the transformer star
                point. This is the longest single segment outside the installation and forms most of
                the external Ze.
              </li>
              <li>
                <strong>Transformer star point</strong> — the loop closes here. The current
                completes its journey back into the transformer secondary, ready to flow round
                again.
              </li>
            </ol>
            <p>
              Add the impedance of every segment and you have Zs. The first three segments plus
              segment 7 and the supply PEN of segment 8 are <em>external</em> to the installation;
              their sum is Ze, what you measure at the origin with the line tail disconnected. The
              line conductor of segment 4 is R1; the protective conductor of segment 6 is R2. So Zs
              for that fault location = Ze + R1 + R2.
            </p>
          </ConceptBlock>

          {/* Earth fault loop diagram - TN-C-S */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The earth fault loop on TN-C-S (PME) — every segment that contributes to Zs
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Earth fault loop on a TN-C-S supply. The current path is traced from transformer star point along the supply line to the cut-out, through the meter, into the consumer unit, along the final-circuit line conductor R1 to the fault, into the exposed-conductive-part, back along the CPC R2 to the MET, out via the meter neutral and the supply PEN conductor back to the transformer star point. Each segment is annotated with its impedance label."
            >
              <circle
                cx="80"
                cy="230"
                r="40"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="80"
                y="218"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                XFMR
              </text>
              <text x="80" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                11 kV / 400 V
              </text>
              <text x="80" y="246" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                star point
              </text>
              <circle cx="80" cy="260" r="3" fill="#FBBF24" />
              <text x="80" y="285" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Source impedance
              </text>

              <line x1="120" y1="220" x2="320" y2="220" stroke="#EF4444" strokeWidth="2.5" />
              <text
                x="220"
                y="212"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Supply line conductor (part of Ze)
              </text>

              <rect
                x="320"
                y="180"
                width="120"
                height="100"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="380"
                y="200"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                CUT-OUT / METER
              </text>
              <text x="380" y="216" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (origin of installation)
              </text>
              <circle cx="340" cy="240" r="3" fill="#EF4444" />
              <text x="334" y="253" textAnchor="end" fill="#EF4444" fontSize="9">
                L
              </text>
              <circle cx="340" cy="265" r="3" fill="#3B82F6" />
              <text x="334" y="270" textAnchor="end" fill="#3B82F6" fontSize="9">
                PEN
              </text>

              <line x1="440" y1="240" x2="540" y2="240" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="440" y1="265" x2="540" y2="265" stroke="#3B82F6" strokeWidth="2.5" />

              <rect
                x="540"
                y="160"
                width="160"
                height="180"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="620"
                y="180"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="620" y="195" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                MCB / RCBO
              </text>
              <rect
                x="555"
                y="290"
                width="50"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="580"
                y="305"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                MET
              </text>
              <line
                x1="605"
                y1="265"
                x2="605"
                y2="301"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="3,2"
              />
              <text x="618" y="285" textAnchor="start" fill="#FBBF24" fontSize="9">
                N–PE link
              </text>

              <line x1="700" y1="220" x2="780" y2="220" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="700" y1="301" x2="780" y2="301" stroke="#22C55E" strokeWidth="2.5" />

              <path
                d="M780,220 L820,220 L820,360 L660,360"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
              />
              <text
                x="745"
                y="350"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                R1 — line conductor
              </text>

              <path
                d="M780,301 L800,301 L800,380 L660,380"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
              />
              <text
                x="745"
                y="400"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                R2 — CPC
              </text>

              <rect
                x="540"
                y="345"
                width="120"
                height="50"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <text
                x="600"
                y="364"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Exposed-c-p
              </text>
              <text x="600" y="378" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (fault: L → enclosure)
              </text>
              <text
                x="600"
                y="390"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                ⚠ FAULT
              </text>

              <path d="M340,265 Q210,300 120,260" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
              <text
                x="220"
                y="312"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                Supply PEN conductor (return — part of Ze)
              </text>

              <line
                x1="80"
                y1="270"
                x2="80"
                y2="310"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
              />
              <line
                x1="60"
                y1="310"
                x2="100"
                y2="310"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <line
                x1="65"
                y1="316"
                x2="95"
                y2="316"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
              />
              <line
                x1="70"
                y1="322"
                x2="90"
                y2="322"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
              />
              <text x="80" y="340" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                source earthing
              </text>

              <rect
                x="40"
                y="20"
                width="800"
                height="44"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="40"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Zs = Ze + R1 + R2
              </text>
              <text x="440" y="56" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                External (Ze): source + supply L + supply PEN. Internal: R1 (final-circuit line) +
                R2 (final-circuit CPC).
              </text>

              <rect
                x="40"
                y="420"
                width="800"
                height="32"
                rx="6"
                fill="rgba(251,191,36,0.04)"
                stroke="rgba(251,191,36,0.18)"
                strokeWidth="1"
              />
              <text x="440" y="438" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Fault current: out via line, through fault into exposed-c-p, back via CPC to MET →
                meter N → supply PEN → transformer star point.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.1"
            clause={
              <>
                In a TN system, the integrity of the earthing of the installation depends on the
                reliable and effective connection of the PEN or PE conductors to Earth. Where the
                earthing is provided from a public or other supply system, compliance with the
                necessary conditions external to the installation is the responsibility of the
                distributor.
              </>
            }
            meaning="The TN earth fault loop is metallic. Its integrity depends on the supply PEN/PE conductor — a part of the loop the consumer-side installer cannot see and cannot test. That is why ESQCR Regulation 8(4) prohibits PEN conductors in consumer installations and Reg 411.4.3 prohibits switching/isolating a PEN. Break the PEN and the loop is broken."
          />

          <ConceptBlock
            title="Reg 411.4.2 — the supply earthing point"
            plainEnglish="The neutral point or midpoint of the supply transformer must be earthed at the source. If a neutral or midpoint is not available, a line conductor is earthed instead. Exposed-conductive-parts of the consumer's installation are connected to that earthed point via a protective conductor running through the MET."
            onSite="The MET is the consumer-side terminal of the loop. Everything earthed in the building bonds back to MET; MET bonds back to the source via the supply earthing arrangement. The whole loop hinges on those two reference points."
          >
            <p>
              Reg 411.4.2 also adds, since the A4 amendment, a recommendation that an additional
              connection to Earth by means of an earth electrode in accordance with Chapter 54 is
              made to the main earthing terminal — except for outbuildings of dwellings served by
              the installation. This recommendation does not change the loop topology: the primary
              fault-return path on TN remains the metallic supply PEN/PE. The supplementary earth
              electrode is a parallel path of much higher impedance.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The three system types — three different return paths</ContentEyebrow>

          <ConceptBlock
            title="TN system (Reg 411.4) — metallic return"
            plainEnglish="In a TN system, exposed-conductive-parts of the installation are connected by a protective conductor to the earthed neutral of the supply. The fault return path is metallic from MET back to the transformer. Subdivisions: TN-S (separate N and PE throughout), TN-C-S / PME (combined PEN in part of the supply, split at the meter), TN-C (combined PEN throughout — not used for new UK consumer installations)."
            onSite="If you are working on a UK domestic or small commercial supply, you are almost certainly on TN-C-S (PME) or TN-S. Read the supply earthing arrangement off the cut-out label and confirm by inspection — not by assumption."
          >
            <p>
              On TN-S, the protective conductor (PE) is separate from the neutral throughout — it
              may be the metallic sheath / armour of the supply cable or a discrete PE core. On
              TN-C-S, the supply uses a combined PEN conductor up to the cut-out, and the consumer
              earthing is taken off that PEN at the supplier&rsquo;s terminal block. Reg 411.4.3
              permits a single conductor to serve as both protective and neutral conductor (a PEN
              conductor) only in fixed installations and only subject to Reg 543 conductor-sizing
              rules; the A4 amendment also adds that no switching or isolating device shall be
              inserted in a PEN conductor.
            </p>
            <p>
              For TN-C-S in particular, all exposed-conductive-parts of the installation are
              connected to the PEN conductor via the main earthing terminal and the neutral
              terminal, with these terminals linked together at the origin. Open-PEN risk on PME is
              the well-known consequence of this topology — and the reason BS&nbsp;7671 imposes
              additional bonding and protection requirements on EV charging and similar high-risk
              circuits.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TT system (Reg 411.5) — return through the general mass of earth"
            plainEnglish="In a TT installation, the consumer's exposed-conductive-parts are connected to a local earth electrode (typically a rod driven into the ground at the building). The supply neutral is earthed at the transformer. Fault current flows out via the line, through the fault, down the CPC to the local electrode, through the soil to the supply earth electrode, and back to the transformer."
            onSite="The soil path has high impedance — tens to hundreds of ohms is typical. That makes the fault current too small for an overcurrent device to operate within Reg 411.3.2.2 times. TT therefore relies almost universally on RCD-based fault protection."
          >
            <p>
              Reg 411.5.1 requires that every exposed-conductive-part to be protected by a single
              protective device shall be connected via the MET to a common earth electrode (or, for
              devices in series, to separate electrodes corresponding to each device). Reg 411.5.2
              names two protective device options — an RCD or an overcurrent device — with the
              former being preferred. NOTE 1 to 411.5.2 acknowledges that an overcurrent device may
              be used &ldquo;provided a suitably low value of Zs is permanently and reliably
              assured&rdquo;, which on a TT system is rare in practice.
            </p>
            <p>
              The acceptance condition for RCD-based fault protection on TT is the touch-voltage
              equation in Reg 411.5.3: Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances of
              the earth electrode and the protective conductor connecting it to the
              exposed-conductive-parts, and IΔn is the rated residual operating current of the RCD.
              The note to Reg 411.5.3 permits Zs to be used in place of Ra where Ra is not known —
              and Table 41.5 publishes maximum Zs values for non-delayed and S-type RCDs for Uo of
              230 V (1667 Ω for a 30 mA RCD; 500 Ω for a 100 mA RCD; 167 Ω for 300 mA; 100 Ω for 500
              mA).
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
                exposed-conductive-parts (in ohms), and IΔn is the rated residual operating current
                of the RCD.
              </>
            }
            meaning="On a TT system this is the practical sizing rule for the earth electrode. A 30 mA RCD allows up to 1667 Ω of Ra and still satisfies the 50 V touch-voltage limit on paper — but Note 2 to Table 41.5 warns that values above 200 Ω may not be stable, and lower is always better for reliability."
          />

          <ConceptBlock
            title="IT system (Reg 411.6) — high-impedance / no deliberate earthing at source"
            plainEnglish="In an IT system, live parts are isolated from earth, or the source is connected to earth through a high impedance. A first earth fault produces only a small fault current — too small to be dangerous and too small to require automatic disconnection. The system stays running. A second fault on a different live conductor is treated as a TN-like or TT-like situation depending on the earthing arrangement."
            onSite="IT systems are not common on UK consumer premises. They appear in industrial process supplies, medical locations (BS 7671 Section 710), some specialist machinery, and standby supplies where uninterrupted operation under a single fault is essential. Verification differs significantly from TN/TT and is governed by Reg 411.6 and Reg 643.7.3 item (c)."
          >
            <p>
              Reg 411.6.1 requires that live parts shall be either insulated from earth or connected
              to earth through a sufficiently high impedance, and exposed-conductive-parts shall be
              earthed individually, in groups, or collectively. Reg 411.6.2 sets the touch-voltage
              condition Ra × Id ≤ 50 V for the first fault, where Id is the first fault current
              taking account of leakage and total earthing impedance.
            </p>
            <p>
              Reg 411.6.3 lists the monitoring and protective devices that may be used: insulation
              monitoring devices (IMDs), residual current monitoring devices (RCMs), insulation
              fault location systems (IFLS), overcurrent protective devices (OCPDs), and RCDs. Reg
              411.6.4 requires that where an IT system is designed not to disconnect on the first
              fault, the first-fault occurrence shall be indicated by an audible and/or visual
              signal which continues for as long as the fault persists.
            </p>
            <p>
              For verification, Reg 643.7.3 item (c) sets out two cases: where conditions are
              similar to a TT system, verify as for a TT system; where similar to a TN system,
              verify by measuring the loop impedance with a deliberate connection of negligible
              impedance between a live conductor and earth at the origin and confirm that the
              measured value is less than 50 % of the maximum allowed loop impedance.
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

          <ContentEyebrow>From the loop to disconnection time</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.2 — what the regulation actually requires"
            plainEnglish="A protective device shall automatically interrupt the supply to the line conductor of a circuit or equipment in the event of an earth fault of negligible impedance, within a stated maximum disconnection time. Times depend on system type (TN/TT) and circuit role (final / distribution)."
            onSite="The disconnection time is what makes the difference between a brief, harmless fault and an electrocution. Sub-second disconnection on a final circuit is what BS 7671 demands because the body's tolerance to current at 50 Hz drops sharply with duration."
          >
            <p>
              Reg 411.3.2.2 sets the table of maximum disconnection times that apply to final
              circuits with a rated current not exceeding 63 A with one or more socket-outlets, or
              32 A supplying only fixed connected current-using equipment. For a 230 V TN system,
              the limit is 0.4 s. For a 230 V TT system, the limit is 0.2 s — reflecting the higher
              touch-voltage risk on a system where Zs is dominated by an earth-electrode path.
            </p>
            <p>
              Reg 411.3.2.3 permits a longer disconnection time of 5 s for distribution circuits and
              circuits not covered by 411.3.2.2 in TN systems. Reg 411.3.2.4 permits 1 s for the
              equivalent on TT.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.4 / Compliance test"
            clause={
              <>
                Compliance with Regulation 411.4.4 is achieved when the calculated or measured
                values fulfil Zs × Ia ≤ Up × Cmin. If the inequality holds, the protective device
                characteristics together with circuit impedances provide disconnection within the
                required time limits.
              </>
            }
            meaning="Zs and the device-operating current Ia together determine whether disconnection occurs in time. Up × Cmin is the worst-case voltage available to drive the fault current (Cmin = 0.95). Rearrange and you have If ≥ Ia required, with If ≈ Up × Cmin / Zs. The Tables 41.2–41.4 max-Zs values are the pre-solved compliance limits for the listed devices."
          />

          <ConceptBlock
            title="Why Zs governs the disconnection time"
            plainEnglish="The protective device operates faster the more current flows through it. Zs sets the fault current. Therefore Zs sets the disconnection time."
          >
            <p>
              For a fault of negligible impedance from line to earth at the worst-case point on the
              circuit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Prospective fault current <strong>If ≈ Uo × Cmin / Zs</strong>, where Uo is the
                nominal line-to-earth voltage (230 V on UK 230/400 V three-phase), and Cmin is a
                voltage factor (0.95) that accounts for variations in supply voltage on the low
                side.
              </li>
              <li>
                For a Type B 32 A MCB, the magnetic-trip current Ia is approximately 5 × In (the
                worst case used in Tables 41.3) — so 5 × 32 = 160 A.
              </li>
              <li>
                To trip within 0.1 s on the magnetic curve, Zs must be no greater than Uo × Cmin /
                Ia = 230 × 0.95 / 160 = 1.366 Ω → that is the value in Table 41.3 for a 32 A Type B
                circuit-breaker.
              </li>
            </ul>
            <p>
              Tables 41.2 (BS 88 / BS 3036 / BS 1362 fuses), 41.3 (Type B / C / D MCBs and RCBOs)
              and 41.4 (5 s fuse limits) pre-solve this for every common protective device, so on
              site you compare the measured Zs against the table value rather than recalculating.
              Note 2 to each table is the same: the Zs values shall not be exceeded when the line
              conductors are at maximum permitted operating temperature and the CPCs at the assumed
              initial temperature; if the conductors are at a different temperature when tested, the
              reading should be adjusted.
            </p>
          </ConceptBlock>

          <Scenario
            title="Worked example — 32 A B-curve MCB on a TN-C-S socket circuit"
            situation="A 32 A B-curve MCB protects a 2.5/1.5 mm² T&E radial. Length 24 m. Ze at the origin measured as 0.31 Ω. Cable in service runs hotter than 20°C — assume up to 70°C maximum operating temperature."
            whatToDo={
              <>
                <span className="block">
                  R1+R2 at 20&deg;C from GN3 Table BI: 19.51 mΩ/m × 24 m = 0.468 Ω.
                </span>
                <span className="block">R1+R2 at 70&deg;C: 0.468 × 1.20 = 0.562 Ω.</span>
                <span className="block">Predicted Zs at 70&deg;C: 0.31 + 0.562 = 0.872 Ω.</span>
                <span className="block">
                  Table 41.3 max-permitted Zs for a 32 A Type B device at 230 V is 1.37 Ω (0.4 s
                  disconnection). 0.872 Ω vs 1.37 Ω → compliant with comfortable headroom.
                </span>
                <span className="block">
                  Estimated If: 230 × 0.95 / 0.872 ≈ 250 A. That is comfortably above the 5 × In =
                  160 A magnetic threshold, so the device will operate on the instantaneous portion
                  of its time-current curve in well under 0.1 s.
                </span>
              </>
            }
            whyItMatters="The whole sequence from Ze measurement → R1+R2 calculation → Zs prediction → Table 41 comparison is the regulatory chain that justifies the disconnection time. Skip a step and the chain breaks. Sign off the schedule with that chain intact and you can defend the certificate against any future challenge."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The role of the protective conductor</ContentEyebrow>

          <ConceptBlock
            title="The CPC, MET and bonding — what each one does in the loop"
            plainEnglish="The CPC carries fault current from an exposed-conductive-part back to the MET. The MET is the consumer-side terminal of the earth fault loop. Main protective bonding ties extraneous-conductive-parts (gas, water, structural metalwork) to the MET to limit touch voltage during a fault, but it is the CPC, not the bonding, that carries the fault current."
            onSite="A common confusion: bonding does not protect against electric shock by carrying fault current. Bonding limits the voltage difference between simultaneously accessible conductive parts during a fault. The CPC, sized per Reg 543.1, is the dedicated fault-current return."
          >
            <p>
              The protective conductor of a final circuit (R2) is the second leg of the earth fault
              loop after R1. Its resistance contributes directly to Zs and therefore directly to
              disconnection time. Reg 543.2.4 requires a CPC of types (a) to (d) of Reg 543.2.1 and
              of cross-sectional area 10 mm² or less to be of copper — the dominant material
              assumption underlying GN3 Table BI&rsquo;s mΩ/m values.
            </p>
            <p>
              At the MET the CPC of every circuit terminates. Main protective bonding conductors
              terminate here too. The MET is then bonded to the supply earthing arrangement — the
              supplier&rsquo;s earth terminal in TN-C-S, the cable sheath / armour in TN-S, or the
              local earth electrode in TT. The MET is the single point where the consumer side of
              the loop meets the supply side.
            </p>
            <p>
              Supplementary equipotential bonding (e.g. in a bathroom under Reg 415.2) is a
              touch-voltage limiter, not a fault-current carrier. It does not appear in the Zs sum
              for the relevant circuit; it appears as a parallel path that can affect a continuity
              measurement (relevant for Module 3) but does not change the regulated disconnection
              time in Reg 411.3.2.2.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating Ze as Zs for verification"
            whatHappens="The inspector measures Ze at the origin (0.18 Ω on a TN-C-S supply) and treats that as the Zs for every circuit on the board. Disconnection-time compliance is not actually verified at the worst-case fault point; circuits with long radials and reduced CPCs may have Zs significantly above the Ze figure and could fail the Table 41.3 limits without anyone noticing."
            doInstead="Ze is the external loop impedance, measured once at the origin. Zs has to be either measured at every circuit's worst-case point or calculated as Ze + R1 + R2 (corrected to operating temperature) for each final circuit. Both approaches are acceptable; treating Ze alone as proof is not."
          />

          <CommonMistake
            title="Forgetting that Reg 411.3.2.2 applies to a fault at the worst-case point"
            whatHappens="An installer measures Zs at a convenient socket near the consumer unit (low Zs because R1+R2 is short) and signs off. The actual furthest socket on the same radial has Zs = Ze + (full R1+R2) and may exceed the Table 41.3 limit. The schedule looks compliant; the installation is not."
            doInstead="Reg 643.7.3 measurement obligation is for the whole circuit. The test point is the worst-case point — the furthest accessory the circuit feeds. If a circuit feeds multiple branches, each branch&rsquo;s furthest point should be tested or the calculation should use the longest branch&rsquo;s R1+R2."
          />

          <CommonMistake
            title="Assuming the supply earthing arrangement makes Zs irrelevant on TT"
            whatHappens="On a TT installation with a 30 mA RCD, the inspector waves Reg 411.5.3 around and skips Zs measurement because Ra × IΔn ≤ 50 V is &lsquo;obviously&rsquo; satisfied. Reg 643.7.3 still requires verification of the protective device — for an RCD that is the trip test at IΔn — and the loop impedance is still the parameter that determines whether the RCD will see enough residual current to operate. Skipping it is non-compliance."
            doInstead="On TT, measure Ra (or Zs in lieu) and trip-test the RCD per Reg 643.7.3 NOTE: 300 ms maximum for general non-delay type, 130–500 ms for S-type. Both checks together are what the regulation requires. The Reg 411.5.3 calculation is the design check, not the verification step."
          />

          <SectionRule />

          <ContentEyebrow>Where Zs verification is going wrong on modern installs</ContentEyebrow>

          <ConceptBlock
            title="Inverters, EVSE and battery storage — the loop tester problem"
            plainEnglish="A standard fault-loop-impedance tester injects a brief fault current and measures the resulting voltage drop. Inverters, EV chargers and battery storage units inject their own current waveforms into the supply at the same time, which can corrupt the meter's measurement. The reading is unreliable, sometimes wildly so."
            onSite="If the installation includes a PV inverter, battery storage, EV charge point or any inverter-driven load that is energised during the test, the loop tester reading may be invalid. Disconnect / power down the prosumer equipment before the live test, or use the alternative method permitted by Reg 826.7."
          >
            <p>
              NOTE 1 to Reg 643.7.3 carries an explicit warning: the validity of test readings taken
              with a fault loop impedance test instrument may be adversely affected by power
              converting equipment, such as inverters. Reg 826.7 (the prosumer chapter introduced
              alongside the A4 amendment) addresses the same issue: where validity of test readings
              taken with a fault loop impedance test instrument may be adversely affected by power
              converting equipment within the prosumer&rsquo;s installation, an alternative method
              of determining prospective fault current and earth fault loop impedance shall be used.
            </p>
            <p>
              The practical alternative methods are: (1) calculate Zs from a known Ze at the origin
              plus a measured / calculated R1+R2 — the same chain Module 3 builds; (2) measure Zs
              with the prosumer equipment isolated; (3) use a loop tester with active inverter
              compensation if the manufacturer specifies and validates that mode.
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

          <ContentEyebrow>Recording on the Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Where Zs goes on the A4:2026 model forms"
            plainEnglish="The Schedule of Test Results has dedicated columns for Ze, R1+R2 (per circuit) and Zs (per circuit). The Schedule of Circuit Details has a column for the maximum permitted Zs for that circuit as designed. Both schedules are part of the certificate — they have to agree."
          >
            <p>Three rules for recording, every time:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Ze column:</strong> measured value at the origin, in ohms to two decimal
                places. Recorded once per installation, alongside the supply earthing arrangement
                (TN-S / TN-C-S / TT).
              </li>
              <li>
                <strong>R1+R2 column (per circuit):</strong> measured value at the worst-case point
                of the circuit, recorded for every final circuit.
              </li>
              <li>
                <strong>Zs column (per circuit):</strong> either a measured live Zs or a calculated
                Zs (Ze + corrected R1+R2). Note in the comments which it is. The A4 model forms
                introduced an explicit max-permitted-Zs column on the Schedule of Circuit Details —
                record the design value there, and verify the measured Zs is below it.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Zs is the impedance of the entire fault loop: source + line conductor to the fault + CPC back to the source. BS 7671 defines it explicitly.',
              'TN: metallic return via supply PEN/PE. TT: return through soil + earth electrode. IT: high-impedance / no deliberate source earthing.',
              'Reg 411.3.2.2 disconnection time depends on Zs, because If ≈ Uo × Cmin / Zs and the device operates on a current-vs-time curve.',
              'Tables 41.2 / 41.3 / 41.4 give pre-solved maximum Zs values for the listed protective devices. Measured Zs ≤ table value = compliant disconnection.',
              'Reg 411.5.3 (TT, RCD): Ra × IΔn ≤ 50 V. Where Ra is not known, Zs may be used (Table 41.5).',
              'Zs matters more than Ze because the disconnection condition has to hold at the fault location, which is the worst-case point on the circuit.',
              'Reg 411.4.3 / Reg 461.2 prohibit switching or isolating a PEN conductor — break the PEN and the TN-C-S loop is broken.',
              'Reg 643.7.3 NOTE 1 / Reg 826.7: inverters, EVSE and battery storage can invalidate a standard loop-tester reading. Isolate prosumer equipment or use an alternative method.',
              'The chain is Ze → R1+R2 (per circuit) → Zs → Table 41 comparison. Each step has its own column on the schedule. Each step has its own regulation.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What is the simplest one-line definition of Zs?',
                answer:
                  'Zs is the impedance of the earth fault loop: from the source, out along the line conductor to the fault, and back via the protective conductor to the source. BS 7671 defines it as the sum of those three components in ohms. Lower Zs = higher fault current = faster disconnection.',
              },
              {
                question: 'Why does TT rely on RCDs while TN can use overcurrent devices?',
                answer:
                  'On TT, the return path goes through the general mass of earth via an earth electrode. Soil resistance is high — Ra in the tens to hundreds of ohms is normal. That makes If far too small to operate an MCB or fuse within the Reg 411.3.2.2 time. An RCD does not depend on Zs directly; it operates on residual current at IΔn, which is measured in milliamps. So RCDs work where overcurrent devices cannot. NOTE 1 to Reg 411.5.2 still permits an overcurrent device "provided a suitably low value of Zs is permanently and reliably assured" — rare on TT in practice.',
              },
              {
                question: 'What is the difference between Ze and Zs, in one sentence each?',
                answer:
                  'Ze is the external earth fault loop impedance — everything outside the installation, measured at the origin. Zs is the total earth fault loop impedance at the actual fault point — Ze plus the line conductor and CPC of the final circuit (R1 + R2). Zs is what determines disconnection at the worst-case point.',
              },
              {
                question: 'I have a Ze of 0.35 Ω on a TN-C-S supply. Is that good or bad?',
                answer:
                  '0.35 Ω is a typical TN-C-S figure and gives plenty of headroom for the Table 41.3 max-Zs values on common protective devices. For comparison, the BS 7671 design limit for a TN-C-S supply Ze is sometimes referenced at 0.35 Ω as a maximum; 0.21 Ω is also commonly used as a TN-C-S design Ze when better data is unavailable. The actual Ze depends on the supply transformer, the cable run length and the supply earthing arrangement — measure it, do not assume it.',
              },
              {
                question:
                  'Does the A4 amendment change anything about earth fault loop principles?',
                answer:
                  'A4:2026 keeps the underlying principle (Zs = Ze + R1 + R2; Reg 411.3.2 disconnection times) unchanged, but tightens around the edges. Reg 411.4.3 now expressly prohibits switching or isolating a PEN conductor. Reg 411.4.2 now recommends an additional connection to earth via an earth electrode at the MET (except outbuildings of dwellings). Reg 826.7 codifies the inverter-loop-tester problem for prosumer installations. The model forms also add an explicit max-permitted-Zs column to the Schedule of Circuit Details so the design figure is recorded alongside the measured value.',
              },
              {
                question:
                  'How does an open-PEN fault on a PME supply create the well-known EV charging risk?',
                answer:
                  'If the supply PEN conductor is broken between the consumer and the transformer, the consumer-side MET — and everything bonded to it — can rise to nearly full line voltage above true earth, because there is no longer a low-impedance return path to the source. An EV charging outdoors with the car body bonded to MET is then a step-touch hazard for anyone touching the car while standing on damp ground. BS 7671 deals with this through dedicated EV charging requirements (Section 722) that either prohibit the PME earth from EV outlets or require an open-PEN detection device. The earth fault loop principle is what makes the hazard intelligible: break the loop, and the touch-voltage limit no longer holds.',
              },
              {
                question:
                  'Is the source impedance significant compared to R1+R2 on a typical domestic install?',
                answer:
                  'On a typical UK TN-C-S supply, the source side (transformer + supply cable + supply PEN) gives a Ze of 0.2–0.35 Ω. The R1+R2 of a final circuit is typically 0.2–0.8 Ω depending on cable size and length. So both are roughly the same order of magnitude — neither dominates. That is why Zs has to be the sum, not just one or the other. On a TT system, Ra (the local electrode + CPC) can be 30–200 Ω, so the consumer side dominates Zs by orders of magnitude.',
              },
              {
                question:
                  'Why does BS 7671 use the symbol Cmin = 0.95 in the Zs × Ia ≤ Uo × Cmin compliance test?',
                answer:
                  'Cmin is the minimum voltage factor — it accounts for the fact that the supply voltage at the time of a fault may be a few percent below the nominal Uo. Worst case is the lowest voltage available to drive the fault current; that is the case the design has to handle. 0.95 is the BS 7671 conservative value. Multiply it through and you get the table Zs values published in 41.2 / 41.3 / 41.4 with that safety margin already baked in.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Earth fault path principles — Module 5.1" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-5/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Zs testing methods
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

export default InspectionTestingModule5Section1;
