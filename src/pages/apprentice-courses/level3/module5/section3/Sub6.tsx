/**
 * Module 5 · Section 3 · Subsection 6 — Earth electrode resistance (Reg 643.7.2)
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.2
 *   AC 6.2 — "specify the methods for measuring earth electrode resistance for TT systems, generators and transformers"
 * Layered: 2357 ELTK06 / earth electrode testing
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Earth electrode resistance — TT systems and generators | Level 3 Module 5.3.6 | Elec-Mate';
const DESCRIPTION =
  'Earth electrode testing per BS 7671 Reg 643.7.2 — three methods (E1 three-stake, E2 stakeless / clamp, EFLI loop method). When each method applies, instrument selection, the Ra × IΔn ≤ 50 V criterion (Reg 411.5.3), and BS 7430 design references for TT, generator and transformer electrodes.';

const checks = [
  {
    id: 'm5-s3-sub6-when-required',
    question: 'Earth electrode resistance testing is required for:',
    options: [
      'TT installations, TN systems with an additional consumer electrode, and installations with generators or static converters.',
      'TN-C-S installations only, where the combined PEN conductor relies on a low consumer-end electrode resistance to keep Ze within limits.',
      'Every domestic installation, because main protective bonding always terminates at an earth electrode that must be verified.',
      'Only installations rated above 100 A, since smaller supplies use the supplier earth and never need a consumer electrode.',
    ],
    correctIndex: 0,
    explanation:
      'TT is the principal case — the consumer\'s earth electrode IS the protective earth path back to the supply transformer. Its resistance directly affects ADS via Zs and the Ra × IΔn calculation for RCD-based protection. TN systems with additional electrodes (often for PV, EVSE, generators) also need verification. Generators and transformers per BS 7430 reference for design and Reg 643.7.2 for verification.',
  },
  {
    id: 'm5-s3-sub6-method-e1',
    question: 'Test method E1 (three-stake / fall-of-potential) per GN3:',
    options: [
      'Clamps around the earthing conductor and reads resistance via induced current, with no stakes driven, testing the electrode in service.',
      'Uses a loop impedance tester between line and the electrode, reading the loop which on TT approximates electrode resistance.',
      'Drives a current stake (C2) 30-50 m away and a movable potential stake (P2), plotting voltage against distance to find the plateau.',
      'Measures the resistance between two electrodes driven 1 m apart, then halves it to give a single electrode\'s resistance to earth.',
    ],
    correctIndex: 2,
    explanation:
      'Method E1 — the three-stake fall-of-potential method — is the gold standard. Inject test current between the electrode under test and a remote current stake (C2). Measure voltage at a movable potential stake (P2) along the line. Plot voltage against distance — for a sufficiently distant C2, the plot has a flat zone in the middle. The voltage at the flat zone divided by the injected current = the true electrode resistance. GN3 explicitly: "the most accurate of these is test method E1."',
  },
  {
    id: 'm5-s3-sub6-rcd-criterion',
    question: 'Per BS 7671 Reg 411.5.3(b), for an RCD-based TT installation the maximum acceptable earth electrode resistance Ra is determined by:',
    options: [
      'Ra ≤ Ze − R1 − R2 — the electrode resistance must leave enough loop headroom for the device to operate in its disconnection time.',
      'Ra × IΔn ≤ 50 V — the product of electrode resistance and the RCD rated residual operating current must not exceed 50 V.',
      'Ra ≤ 200 Ω as a fixed maximum for all TT installations regardless of RCD rating, beyond which the electrode is ineffective.',
      'Ra × IΔn ≤ 230 V — the product must stay below the nominal supply voltage so a fault cannot raise the electrode above line voltage.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.5.3(b) — Ra × IΔn ≤ 50 V (or ≤ 25 V in agricultural / horticultural locations per Section 705). The principle: in a TT earth fault, current returns via the electrode through Ra. The voltage developed across Ra is V = I × R. If this exceeds 50 V (the touch-voltage limit) for the duration before the RCD trips, exposed metal is hazardous. For a 30 mA RCD, Ra up to 1667 Ω is theoretically acceptable — but in practice GN3 recommends keeping Ra well below this for reliability under varying soil conditions.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A TT installation has a single earth electrode for the whole consumer side. The protective device is a 30 mA RCD on the incoming supply. The electrode is freshly installed and you measure Ra = 85 Ω. Is this compliant?',
    options: [
      'Fail. 85 Ω exceeds the 50 Ω maximum electrode resistance BS 7671 allows for a TT installation, so the electrode must be improved.',
      'Pass. Ra × IΔn = 85 × 0.030 = 2.55 V, well below 50 V, so the electrode satisfies Reg 411.5.3(b).',
      'Fail. Ra × IΔn = 85 × 30 = 2550, which exceeds the 50 V limit by a wide margin, so the electrode is non-compliant.',
      'Pass, but only because the supply is freshly installed; once the soil settles the reading will rise above the 1667 Ω limit.',
    ],
    correctAnswer: 1,
    explanation:
      'Mathematically Ra × IΔn ≤ 50 V is the acceptance criterion. 85 Ω × 30 mA = 2.55 V — passes by a wide margin. However, Ra varies with soil moisture (typically rises in dry summer months), so engineers often size the electrode for a target Ra well below the absolute maximum to maintain compliance year-round. 200 Ω is a common practical upper limit for a single-electrode TT installation; below 100 Ω is preferred for new installations.',
  },
  {
    id: 2,
    question: 'Test method E2 (stakeless / clamp) per GN3:',
    options: [
      'Drives a current stake and a potential stake and plots voltage against distance to find the plateau, needing space for the stakes.',
      'Disconnects the earthing conductor and connects an EFLI tester between line and the electrode, reading loop impedance as the resistance.',
      'A stakeless / clamp-type tester that clamps the earthing conductor and reads resistance via induced current, needing a parallel earth path.',
      'Measures soil resistivity with four equally spaced stakes (Wenner array) and derives electrode resistance from resistivity and electrode size.',
    ],
    correctAnswer: 2,
    explanation:
      'Method E2 — clamp-type earth electrode tester. Induces a known current via one transformer in the clamp, measures the resulting voltage via another. Calculates resistance. Works because in a multi-electrode or parallel-path system, the test current returns to the source via the other earth paths. Convenient for periodic inspection of urban TT installations where you cannot drive stakes into paving. Less accurate than E1 (no plateau check), and gives a misleading reading if the tested electrode is the only earth path.',
  },
  {
    id: 3,
    question: 'EFLI (earth fault loop impedance) method for measuring TT electrode resistance:',
    options: [
      'Clamps two transformer cores around the earthing conductor and induces current to read resistance, needing no disconnection and no isolation.',
      'Drives a remote current stake 30-50 m away and a movable potential stake, plotting voltage against distance to find the plateau.',
      'Injects a DC test current between the electrode and a buried plate, measuring the voltage rise independently of the supply network.',
      'Uses an EFLI tester to read the loop from the supply, with the earthing conductor disconnected from the electrode and wired to the tester.',
    ],
    correctAnswer: 3,
    explanation:
      'EFLI method per GN3: isolate the installation, disconnect the earthing conductor from the electrode, connect the EFLI tester between the line conductor at the source and the electrode via the disconnected earthing conductor. Test. The reading is essentially the electrode resistance (since supply network impedance is small for TT). CRITICAL safety step per GN3: ensure the earthing conductor is reconnected BEFORE re-energising the supply, or the installation will lose its protective earth.',
  },
  {
    id: 4,
    question: 'Per BS 7671, the agricultural / horticultural location touch-voltage limit (Section 705) reduces the Ra × IΔn product to:',
    options: [
      '≤ 25 V. Wet ground and livestock contact reduce body resistance, so the criterion halves the allowable electrode resistance.',
      '≤ 12 V. Livestock buildings are treated as wet locations on a par with SELV, dropping the threshold to the SELV ceiling of 12 V.',
      '≤ 50 V. Section 705 keeps the ordinary touch-voltage limit but requires a 30 mA RCD on every final circuit serving the premises.',
      '≤ 30 V. The limit is reduced in proportion to the higher conductivity of farm soil, sitting between the standard 50 V and SELV.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Section 705 (agricultural and horticultural premises) tightens the Ra × IΔn product to ≤ 25 V. Wet conditions, conductive flooring (concrete in barns, soil), and livestock contact reduce body resistance dramatically — the touch-voltage limit must be lower. For a 30 mA RCD: Ra ≤ 25 / 0.030 = 833 Ω. For a 100 mA RCD: Ra ≤ 250 Ω. Plan TT electrode design accordingly on farm installations.',
  },
  {
    id: 5,
    question: 'Before disconnecting the earthing conductor for an electrode test, you must:',
    options: [
      "Energise the installation first to confirm the earthing conductor carries no current before removing it — a clamp meter reading of zero proves it safe.",
      "Safely isolate the installation from the supply before disconnecting the earthing conductor, so no exposed-conductive-part is left undefined relative to earth.",
      "Fit a temporary bonding link between the electrode and the metal water pipe to keep an earth reference while you disconnect the main earthing conductor.",
      "Switch off only the RCD protecting the test circuit, leaving the main switch closed, so the rest of the installation stays in service during the test.",
    ],
    correctAnswer: 1,
    explanation:
      "GN3 mandatory safety step: 'FOR SAFETY REASONS, THE INSTALLATION SHALL BE ISOLATED FROM THE SUPPLY BEFORE DISCONNECTING THE EARTHING CONDUCTOR.' During the brief window the earthing conductor is disconnected, exposed-conductive-parts have no defined relationship to earth — a fault during this window would put line voltage on accessible metal with no path to disconnect. Isolation removes the supply so this risk vanishes. Reconnect the earthing conductor BEFORE re-energising.",
  },
  {
    id: 6,
    question: 'BS 7430 is the British Standard for:',
    options: [
      'Surge protection devices — selection, installation and co-ordination of SPDs at the origin and distribution boards, per BS 7671 Section 534.',
      'Electrical installations in caravans and motor caravans — site-supply connection, RCD protection and earthing arrangements for the special location.',
      'Protective earthing of electrical installations — earth electrode design, materials, installation and target resistance values.',
      'Periodic inspection and testing reporting — the model forms, classification codes (C1, C2, C3, FI) and recommended inspection intervals for an EICR.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7430 — Code of practice for protective earthing of electrical installations. Covers electrode types (rod, plate, mat, structural foundations), depth, materials (copper-bonded steel, stainless steel, copper), array design for low resistance targets, and soil treatment. BS 7671 references BS 7430 explicitly for installations with generators/static converters per GN3, and for TT design where engineering of the electrode array is needed.',
  },
  {
    id: 7,
    question: 'GN3 EFLI method critical step at completion of test:',
    options: [
      'Record the loop impedance and subtract a standard 0.35 Ω supply-network allowance before entering Ra, so the figure reflects the electrode alone.',
      'Leave the earthing conductor disconnected until the RCD trip-time test is complete, so test current cannot leak to earth and distort the result.',
      'Re-null the EFLI tester leads against the electrode, repeat the reading three times, and record the average as the definitive electrode resistance.',
      'Reconnect the earthing conductor BEFORE re-energising the supply, so the installation never operates without its protective earth path restored.',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 explicit safety step: "On completion of the EFLI earth electrode test, ensure that the earthing conductor is reconnected BEFORE the supply is energized (or re-energized). This is an explicit procedural safety requirement." Energising with the earthing conductor still disconnected is a major safety violation — exposed-conductive-parts remain ungrounded and a single fault could put line voltage on touchable metal with no protection.',
  },
  {
    id: 8,
    question: 'For a TT installation, the typical target electrode resistance for design (not the absolute maximum) is:',
    options: [
      'Below 200 Ω for general installations, with below 100 Ω preferred, giving compliance margin year-round as soil dries out in summer.',
      'Below 1 Ω, matching the Ze expected on a TN-C-S supply, so the same MCB disconnection times can be relied on without an RCD.',
      'Exactly the 1667 Ω maximum for a 30 mA RCD, since designing to the limit makes the most economical use of a single short rod.',
      'Below 23 Ω, the long-standing maximum stated in BS 7671 for any earth electrode regardless of the protective device fitted.',
    ],
    correctAnswer: 0,
    explanation:
      'Engineering practice — design for an electrode resistance that gives generous compliance margin under all expected soil conditions. For 30 mA RCD TT: theoretical maximum Ra = 1667 Ω; common target Ra ≤ 200 Ω; preferred Ra ≤ 100 Ω. Soil dries in summer — Ra can rise 2-3 × from a wet winter measurement. Design to the worst case so the installation remains compliant year-round without needing seasonal re-testing or remediation.',
  },
];

const faqs = [
  {
    question: 'Why does Ra (electrode resistance) matter so much on TT and not on TN-C-S?',
    answer:
      'On TN-C-S the protective earth comes from the supply network — a low-impedance path back to the transformer star point via the combined PEN conductor. Ze is typically 0.10-0.35 Ω, giving comfortable Zs values for any RCD or MCB. On TT, the protective earth IS the consumer\'s electrode plus the soil mass between it and the supply transformer\'s electrode — typically 30-200+ Ω. ADS by overcurrent device alone is not feasible (Zs would be far too high to clear an MCB in time), so TT installations rely on RCDs for ADS, with the Ra × IΔn ≤ 50 V criterion as the verification.',
  },
  {
    question: 'Can I use the EFLI method on a TT installation with the RCD still in circuit?',
    answer:
      'Carefully — the EFLI test current can trip the RCD if it exceeds IΔn. Modern EFLI testers have a "no-trip" mode that limits the test current below the trip threshold for typical 30 mA RCDs, but accuracy is reduced. For a definitive electrode resistance reading, isolate the RCD by removing or shunting it during the test (with the supply isolated for safety), or use the three-stake method E1.',
  },
  {
    question: 'What if my electrode reading is over 1000 Ω on a TT installation with 30 mA RCD?',
    answer:
      'Mathematically still under the 1667 Ω theoretical maximum for the Ra × IΔn ≤ 50 V criterion, but well above sensible engineering practice. Investigate: is the electrode bonded correctly? Is the soil exceptionally dry / rocky / sandy? Consider additional electrodes in parallel (electrodes act in parallel — two 1000 Ω electrodes give 500 Ω combined, three give 333 Ω). Soil treatment (chemical conditioning) can also reduce resistance but is a maintenance burden. For a difficult site, multiple electrodes plus a deep driven rod are the engineering solution.',
  },
  {
    question: 'How does soil type affect electrode resistance?',
    answer:
      'Hugely. Wet clay soil might give 50-100 Ω for a single 1.2 m rod. Dry sand might give 1000+ Ω for the same rod. Rocky / gravelly soil is usually high-resistance. Soil resistivity varies with moisture content, temperature (worse in winter freeze), salt content (sea air helps; inland salt depleted soil is worse), and compaction. BS 7430 has soil resistivity tables and design charts. On a difficult site, a Wenner four-stake soil resistivity test informs the electrode design before installation.',
  },
  {
    question: 'When do I retest the electrode resistance?',
    answer:
      'Initial verification — always. Periodic inspection (EICR) — usually a sample test rather than full retest; the EICR cycle for TT installations is typically tighter (3-5 years) than TN (5-10 years) because electrode performance degrades. Also retest after any work that disturbs the electrode (groundworks, drainage, additional bonding) and seasonally if the installation is borderline (dry summer test compared to wet winter test gives the worst-case envelope).',
  },
  {
    question: 'What about installations with multiple parallel electrodes — how do I test individual electrodes?',
    answer:
      'For a designed parallel array (e.g. four electrodes around a building tied to a common bonding bar), test the array as a whole with E1 or E2 to get the system Ra. To test individual electrodes, temporarily disconnect each from the array and test in isolation — useful for fault-finding when array Ra has risen unexpectedly. Methods: E1 with each electrode tested separately; or use a clamp tester that can be applied to each electrode\'s drop conductor in turn.',
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 6"
            title="Earth electrode resistance — TT systems and generators"
            description="Three GN3 methods (E1 three-stake, E2 stakeless / clamp, EFLI loop). When each method applies, the Ra × IΔn ≤ 50 V criterion for RCD-based TT installations, and BS 7430 design references."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.7.2 mandates earth electrode resistance verification for TT installations and any installation with an additional consumer electrode (generators, PV, EVSE, transformers per BS 7430).',
              'Three GN3 methods: E1 (three-stake fall-of-potential — most accurate); E2 (stakeless / clamp — quick, in-service); EFLI (loop impedance — when stakes unavailable).',
              'Acceptance criterion (Reg 411.5.3(b)): Ra × IΔn ≤ 50 V (or ≤ 25 V in agricultural per Section 705). For 30 mA RCD: Ra ≤ 1667 Ω theoretical, ≤ 200 Ω practical.',
              'Critical safety step: isolate supply BEFORE disconnecting the earthing conductor. Reconnect earthing conductor BEFORE re-energising — never re-energise without the protective earth path restored.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the three earth electrode test methods (E1 three-stake, E2 clamp, EFLI loop) per IET GN3 (AC 6.2).',
              'Identify when each method is appropriate — initial verification, in-service testing, generator commissioning.',
              'Apply the Ra × IΔn ≤ 50 V acceptance criterion per Reg 411.5.3(b) and the ≤ 25 V criterion in agricultural locations per Section 705.',
              'Cite BS 7430 as the design reference for earth electrode systems including generators and static converters.',
              'Plan and execute a safe E1 three-stake test on a TT installation including isolation, electrode disconnection, current/potential stake placement.',
              'Recognise factors affecting electrode resistance — soil type, moisture, temperature, electrode geometry — and design for worst-case compliance.',
              'Document electrode test results on the EIC including method used, Ra value, and the Ra × IΔn calculation against the 50 V limit.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why TT installations need electrode verification</ContentEyebrow>

          <ConceptBlock
            title="On TT, the consumer's earth electrode IS the protective earth path"
            plainEnglish="In TN-C-S the supplier provides a low-impedance combined neutral-earth conductor — the consumer's earth ties back to the transformer's star point with typical Ze of 0.10-0.35 Ω. In TT, no such metallic path exists. The consumer drives an earth electrode into the soil, and earth-fault current returns via the soil mass back to the supply transformer's electrode. That soil path has resistance — typically 30-200+ Ω depending on soil and electrode design — and ADS via an overcurrent device is impossible. RCDs are the protective measure, and the electrode resistance directly affects the touch-voltage during a fault."
            onSite="On a rural TT installation, the supply transformer might be 200 m away across fields. Earth-fault current goes from the consumer's exposed metal, through the broken insulation, down the CPC to the MET, out via the consumer's earth electrode, through the soil back to the transformer's electrode, up the transformer earth, and into the windings. That soil path is the consumer's responsibility."
          >
            <p>The earthing system difference that matters for verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME / PNB):</strong> Supplier provides a combined PEN conductor.
                Ze typically 0.10-0.35 Ω. Earth-fault current returns to supply via supplier\'s
                metallic infrastructure. ADS via MCB or RCBO is straightforward; Zs values fit
                comfortably under Table 41.3 limits.
              </li>
              <li>
                <strong>TN-S:</strong> Supplier provides a separate earth (typically the cable
                sheath of a paper-insulated lead-covered cable). Ze typically 0.20-0.50 Ω.
                Similar story to TN-C-S for ADS.
              </li>
              <li>
                <strong>TT:</strong> Consumer provides an earth electrode. Ra typically
                30-200 Ω, occasionally 500+ Ω in difficult soil. Ze (the loop external to the
                installation) effectively equals Ra plus the supply network impedance — for
                TT calculation, Ze ≈ Ra. Zs values are far too high for an MCB to clear in
                Reg 411.3.2 disconnection times. RCDs are mandatory for ADS; Reg 411.5.3
                governs the criteria.
              </li>
            </ul>
            <p>
              <strong>Reg 411.5.3 — TT systems with RCD protection.</strong> Two requirements
              for ADS via RCD:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Disconnection times per Table 41.1.</strong> 30 mA RCD operating at
                IΔn or 5 IΔn meets the 0.4 s / 0.2 s requirements by design — confirmed by the
                live RCD trip-time test (Section 4).
              </li>
              <li>
                <strong>(b) Ra × IΔn ≤ 50 V.</strong> The product of electrode resistance and
                rated residual operating current limits touch-voltage. This is the criterion
                verified by the electrode resistance test.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (TT system, automatic disconnection by RCD)"
            clause="Where an RCD provides automatic disconnection of supply for a TT system, the following conditions shall be met: (a) the disconnection time required by Regulation 411.3.2.2 shall be met; and (b) RA × IΔn shall not exceed 50 V, where RA is the sum of the resistance in ohms of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts, and IΔn is the rated residual operating current of the RCD in amperes."
            meaning={
              <>
                The two-condition test for compliance of TT installations with RCD-based ADS.
                Condition (a) is the disconnection time (verified by live test). Condition (b)
                is the touch-voltage limit (verified by electrode resistance test). 50 V is the
                touch-voltage threshold above which the installation cannot be guaranteed safe
                to touch during a fault. For a 30 mA RCD: Ra ≤ 1667 Ω theoretical maximum.
                Practical engineering targets are much lower for reliability across seasons.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.5.3."
          />

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Ze on a TT supply — earth electrode loop"
            caption="On a TT system Ze IS the earth electrode resistance plus the conductor back to the MET. The Ze test walks through the loop that the RA × IΔn ≤ 50 V check relies on."
          />

          <SectionRule />

          <ContentEyebrow>Method E1 — three-stake fall-of-potential (the gold standard)</ContentEyebrow>

          <ConceptBlock
            title="Inject current at C2, measure voltage at P2 along the line"
            plainEnglish="Method E1 drives a remote current stake (C2) at least 30-50 m from the electrode under test. A movable potential stake (P2) is placed along the line between the electrode and C2. Inject test current between the electrode and C2; measure the voltage at P2 for each position. Plot voltage vs distance — the flat plateau in the middle is the true electrode resistance."
            onSite="The plateau check is what makes E1 reliable. Take readings at 25 %, 50 % and 75 % of the C2 distance. If the readings are within a few percent, you're in the plateau and the middle reading IS the electrode resistance. If the readings vary significantly, move C2 further out and repeat — you weren't far enough away from the electrode's voltage gradient."
          >
            <p>Step-by-step E1 method on a TT installation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify safe isolation of the installation supply.</li>
              <li>
                Disconnect the earthing conductor at the MET — the electrode under test must be
                isolated from any parallel earth paths during the test.
              </li>
              <li>
                Drive the current stake (C2) into the ground at 30-50 m from the electrode in a
                straight line — use the longer distance if soil is poorly conductive. Connect
                C2 to the C2 terminal on the earth electrode tester.
              </li>
              <li>
                Drive the potential stake (P2) at the midpoint between the electrode and C2.
                Connect P2 to the P2 terminal.
              </li>
              <li>
                Connect the electrode under test to the C1 and P1 terminals (most testers use
                a single connection point for both).
              </li>
              <li>
                Press TEST. Note the resistance reading. Move P2 by ±5-10 m (toward the
                electrode and toward C2). Re-test. If the three readings (P2 closer to
                electrode, midpoint, P2 closer to C2) agree within a few percent, the midpoint
                reading is the true electrode resistance.
              </li>
              <li>
                If the readings vary significantly, move C2 further out and repeat. Variation
                means the potential stake is in the voltage gradient zone of either the
                electrode or C2.
              </li>
              <li>
                Document the resistance value, methodology used, and the ground conditions at
                test (dry / wet, temperature).
              </li>
              <li>
                Reconnect the earthing conductor at the MET BEFORE re-energising the supply.
              </li>
            </ol>
            <p>
              <strong>When E1 is the right choice:</strong> initial verification of a TT
              installation, design verification of electrode arrays, fault investigation when
              electrode resistance is suspected as the cause of unwanted RCD trips. Requires
              physical access to drive stakes 30-50 m from the building.
            </p>
            <p>
              <strong>When E1 is impractical:</strong> urban TT installations on paved areas
              with no soil access; periodic in-service testing where disconnecting the
              earthing conductor causes too much disruption; multi-storey buildings where the
              electrode is buried under foundations.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Method E2 — stakeless / clamp tester</ContentEyebrow>

          <ConceptBlock
            title="Clamp around the earthing conductor, induced current method"
            plainEnglish="A clamp-type earth electrode tester encloses the earthing conductor with two transformer cores. One core injects a known voltage, inducing current that flows through the electrode and returns via parallel earth paths in the system. The other core measures the resulting current. The tester computes resistance from the V/I relationship. No stakes, no soil access required."
            onSite="The clamp method only works when there's a parallel earth path — multi-electrode arrays, or TT with bonding to extraneous-conductive-parts that connect back via building services. Single-electrode systems with no parallel path will give meaningless readings — the induced current has nowhere to go."
          >
            <p>How the clamp method works (E2):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Clamp encloses the earthing conductor with two transformer windings.
              </li>
              <li>
                Injection winding induces a known voltage on the conductor.
              </li>
              <li>
                Resulting current flows out through the electrode under test, returns through
                the parallel earth path (other electrodes, bonded extraneous parts, building
                services).
              </li>
              <li>
                Sense winding measures the current.
              </li>
              <li>
                Tester displays Ra = V/I, the loop resistance from the conductor through the
                tested electrode and back via the parallel paths.
              </li>
            </ul>
            <p>
              <strong>Strengths:</strong> No stakes, no isolation of the installation required,
              quick (10-20 seconds per test), suitable for in-service periodic testing.
            </p>
            <p>
              <strong>Limitations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Requires a parallel earth path (multi-electrode, or TT with bonding network
                acting as a parallel path).
              </li>
              <li>
                Less accurate than E1 (no plateau check available).
              </li>
              <li>
                Reading includes the parallel path resistance — useful for system Ra, less
                useful for assessing the individual tested electrode.
              </li>
              <li>
                Conductor must be accessible at a point where the clamp can fit around it
                cleanly.
              </li>
            </ul>
            <p>
              <strong>When E2 is the right choice:</strong> EICR sampling on multi-electrode TT
              installations, periodic verification where the system Ra rather than individual
              electrode Ra is the metric, urban TT where stakes are impossible.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EFLI method — loop impedance via the supply</ContentEyebrow>

          <ConceptBlock
            title="Use an EFLI tester to measure the loop including the electrode"
            plainEnglish="The EFLI method uses a standard earth fault loop impedance tester to drive a small test current through a loop made up of the supply, the electrode under test, and back to source. With the earthing conductor temporarily disconnected from the electrode and connected to the EFLI tester instead, the meter reads the total loop impedance — which for TT is essentially the electrode resistance plus the small supply network impedance."
            onSite="EFLI is the method when stakes are impossible AND there's no parallel earth path for the clamp method to work. Requires careful safety procedure — the temporary disconnection of the earthing conductor demands isolation BEFORE the disconnection and reconnection BEFORE re-energising."
          >
            <p>EFLI method procedure for TT electrode resistance:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate the installation from the supply.</strong> Lock off, prove dead
                per the safe isolation procedure. This is GN3-mandatory for safety.
              </li>
              <li>
                Disconnect the earthing conductor from the electrode at the MET or the
                electrode\'s test point.
              </li>
              <li>
                Connect the EFLI tester between the line conductor at the source (the cut-out
                outgoing terminal) and the disconnected earthing conductor — the tester is now
                in the loop that goes line → tester → earthing conductor → electrode → soil →
                supply transformer earth.
              </li>
              <li>
                Press TEST. The EFLI tester drives test current and computes the loop impedance.
                For a TT installation, this loop is dominated by the electrode resistance Ra
                (the supply impedance is small in comparison).
              </li>
              <li>
                Note the reading. This is essentially the electrode resistance plus a small
                network component.
              </li>
              <li>
                Disconnect the EFLI tester. Reconnect the earthing conductor to the electrode.
                Verify the connection is mechanically tight.
              </li>
              <li>
                <strong>Re-energise the supply ONLY after the earthing conductor is verified
                reconnected.</strong>
              </li>
              <li>
                Document the test method, the result, and confirmation that the earthing
                conductor was reconnected.
              </li>
            </ol>
            <p>
              <strong>Why GN3 stresses the safety steps so heavily:</strong> the temporary
              disconnection of the earthing conductor leaves exposed-conductive-parts undefined
              relative to earth. Re-energising in this state means a single insulation fault
              would put line voltage on accessible metal with no protective trip. The procedural
              discipline — isolate FIRST, reconnect BEFORE re-energising — eliminates this risk.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET GN3 9th Ed:2022 — Section 2 / Chapter 4 (earth electrode methods E1, E2, EFLI) and safety procedure"
            clause="The most accurate of these is test method E1. Test method E2 is defined as using a dedicated earth electrode tester that is stakeless or clamp-type. EFLI procedural sequence: isolate the installation from the supply; disconnect the earthing conductor; connect the EFLI tester between the line conductor at the source and the earth electrode via the earthing conductor; perform the test and record the impedance; reconnect the earthing conductor before re-energising the supply. FOR SAFETY REASONS, THE INSTALLATION SHALL BE ISOLATED FROM THE SUPPLY BEFORE DISCONNECTING THE EARTHING CONDUCTOR. On completion of the EFLI earth electrode test, ensure that the earthing conductor is reconnected BEFORE the supply is energized (or re-energized)."
            meaning={
              <>
                GN3 codifies the three methods and the safety-critical procedural sequence for
                EFLI. E1 is the gold standard for accuracy. E2 is convenient but requires a
                parallel earth path. EFLI is the fallback when neither stakes nor a parallel
                path are available — but demands strict isolation discipline.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition (2022, A4 corrected), Chapter 4, Section concerning earth electrode resistance testers."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Generators, static converters and BS 7430</ContentEyebrow>

          <ConceptBlock
            title="Soil resistivity and electrode design — what controls Ra"
            plainEnglish="Earth electrode resistance Ra depends on the soil the electrode sits in (resistivity in ohm-metres), the electrode geometry (rod, plate or tape) and the contact area. Wet clay reads tens of ohm-metres; dry sand or gravel hundreds; rock thousands. The same 1.2 m copper-bonded rod sees Ra of 50 ohms in clay and 500 ohms in dry sand. Knowing the soil context tells you whether to expect a one-rod install or a parallel array."
            onSite="Most domestic TT installs use a single 1.2 m or 2.4 m copper-bonded steel rod hammered straight in. Verify Ra meets Ra × IΔn ≤ 50 V; for a 30 mA RCD the limit is 1666 ohms but engineering practice targets under 200 ohms for stability. If the first rod reads too high, options are: longer rod (2.4 m gives roughly half the Ra of 1.2 m), parallel rods spaced at least the rod length apart, or change electrode type. Document the rod length, type and depth on the EIC."
          >
            <p>
              Soil resistivity bands and electrode strategy:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wet loam / clay (10-100 ohm-m)</strong> — single 1.2 m rod
                usually achieves Ra below 100 ohms.
              </li>
              <li>
                <strong>Damp sand / gravel (100-500 ohm-m)</strong> — single 2.4 m rod
                or two 1.2 m rods in parallel typically needed.
              </li>
              <li>
                <strong>Dry sand / gravel (500-1000 ohm-m)</strong> — multiple rods,
                possibly with bentonite backfill to lower the contact resistance.
              </li>
              <li>
                <strong>Rock (above 1000 ohm-m)</strong> — buried tape arrays, plate
                electrodes, or chemical electrodes. Civil works increase substantially.
              </li>
              <li>
                <strong>Conductor type</strong> — copper-bonded steel is the UK
                domestic standard. Solid copper rod for harsh chemical environments.
                Galvanised steel where copper would set up a galvanic cell against
                buried steel structures.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Seasonal variation — Ra rises in summer drought and freezes"
            plainEnglish="Earth electrode resistance is not a fixed number. Ra rises in dry summer weather as the soil dries out around the electrode, and again in deep winter as the surface metres of soil freeze. A measurement taken in March or October may understate the worst-case Ra by a factor of two or three. Engineering practice on TT installs is to allow margin so the worst-case Ra still meets Ra × IΔn ≤ 50 V."
            onSite="On a fresh TT install, target Ra well below the absolute regulatory maximum — typically under 200 ohms even though the 30 mA RCD math allows up to 1666 ohms. The margin absorbs seasonal variation. On a periodic test (EICR) compare the Ra reading against any history; a rising trend year-on-year hints at a deteriorating electrode (corrosion, soil washout, root intrusion) that needs investigation. Record the test date and weather conditions on the EIC so the next inspector can interpret the reading in context."
          >
            <p>
              Seasonal Ra effects to recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Summer drought</strong> — dry soil reads higher resistivity; Ra
                rises 2-3x. Test reads pass in winter, fail in late August.
              </li>
              <li>
                <strong>Winter freeze</strong> — frozen surface soil isolates the top
                of the electrode; Ra rises until the thaw.
              </li>
              <li>
                <strong>New install</strong> — freshly disturbed soil takes weeks to
                consolidate; Ra often drops 10-30 percent over the first month as the
                soil settles around the electrode.
              </li>
              <li>
                <strong>Long-term trend</strong> — Ra trending up year-on-year suggests
                corrosion or soil washout; investigate before the trend reaches the
                trip threshold.
              </li>
              <li>
                <strong>Bentonite backfill</strong> — moisture-retentive backfill
                around the electrode dampens seasonal swing on dry-soil sites.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Installations with generators or inverters need their own earth electrode design"
            plainEnglish="Standby generators (running independently of the public supply during outages) and static converters (PV inverters, battery storage, EVSE that can supply backwards) all create scenarios where the building has its own source of supply. The earthing arrangement for those scenarios is governed by BS 7430 — typically requiring a dedicated earth electrode for the generator/inverter side that meets the same Ra × IΔn ≤ 50 V criterion as a TT installation."
            onSite="On a building with PV and battery storage that islands during a power cut, the installation is briefly TT (because the supplier earth is disconnected). The on-site electrode must perform under those conditions — verify per BS 7430 / Reg 411.5.3 to give confidence the system stays safe during the islanding."
          >
            <p>Why generators and static converters need electrode verification per BS 7430:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standby generators</strong> running during a public-supply outage become
                the supply for the installation. The supply earth is no longer the supplier\'s
                MET — it must come from the building\'s own electrode arrangement.
              </li>
              <li>
                <strong>PV / battery / EVSE static converters</strong> with islanding capability
                (G98 / G99 grid-tie inverters with battery backup) similarly disconnect from
                the public supply during outages and supply the building from their own source.
                During those periods the building is effectively TT relative to the inverter
                output.
              </li>
              <li>
                <strong>BS 7430 design references</strong> govern electrode sizing, depth,
                materials, and target resistance for these scenarios. Typical targets for
                generator earthing match TT engineering practice — Ra well below the absolute
                regulatory maximum to ensure safety under all operating conditions.
              </li>
            </ul>
            <p>
              <strong>Verification approach</strong> for a building with backup generation /
              storage:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Identify the earthing arrangement during normal operation (typically TN-C-S
                with the supply earth) and during islanding (TT with the dedicated electrode).
              </li>
              <li>
                Verify electrode resistance per E1 / E2 / EFLI as appropriate.
              </li>
              <li>
                Compute Ra × IΔn for the protective devices that act during islanded operation
                — usually the inverter\'s integrated RCD or a separate device on the inverter
                output.
              </li>
              <li>
                Document on the EIC: the earthing arrangement during normal and islanded
                operation, the electrode Ra, the Ra × IΔn calculation, and any BS 7430
                reference values used in the design.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Multiple electrodes in parallel — spacing rules and combined Ra"
            plainEnglish="When a single electrode cannot achieve the target Ra, electrodes can be installed in parallel. The combined Ra is lower than any single electrode, but the spacing matters — electrodes too close together overlap their resistance fields and gain less than the parallel-resistor maths would predict. Engineering practice spaces parallel rods at least the length of one rod (1.2 m for short rods, 2.4 m for longer) — wider is better but rarely available on a constrained domestic site."
            onSite="Two 2.4 m rods spaced 2.4 m apart give a combined Ra approximately 0.55 of a single rod (not 0.5 — the field overlap costs you about 10 percent). Three rods in line at 2.4 m spacing give about 0.4 of a single rod. Bond every rod to the MET with 16 mm² copper minimum. Test each rod individually first to confirm none is faulty (a single bad rod can pull the parallel reading badly out)."
          >
            <p>
              Parallel-electrode design rules of thumb:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minimum spacing</strong> — at least one rod-length apart;
                preferably more if site allows.
              </li>
              <li>
                <strong>Combined Ra reduction</strong> — two rods well-spaced give about
                55 percent of single-rod Ra; three rods about 40 percent; four rods
                about 30 percent. Diminishing returns.
              </li>
              <li>
                <strong>Bonding conductor</strong> — minimum 16 mm² copper from each
                rod to the MET, mechanically and corrosion-protected at the
                connection.
              </li>
              <li>
                <strong>Test each rod individually first</strong> — disconnect the
                others at the test point, measure each rod's Ra. Reject any
                outlier (failed connection, broken rod, contaminated soil pocket).
              </li>
              <li>
                <strong>Documentation</strong> — site plan showing rod positions,
                individual Ra per rod, combined Ra at the MET. Lives in the EIC
                and the customer file.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Forgetting to reconnect the earthing conductor before re-energising after EFLI test"
            whatHappens={
              <>
                You complete the EFLI electrode test. Reading is good. You pack up the test gear
                and head to the CU to switch the supply back on — forgetting that the earthing
                conductor is still disconnected from the electrode at the MET. Supply
                re-energises with the installation effectively floating relative to earth.
                Exposed-conductive-parts have no defined potential. A single insulation fault
                downstream now puts line voltage on accessible metal with no protective trip.
                The first user to touch a faulted appliance gets the full fault.
              </>
            }
            doInstead={
              <>
                Make the reconnection step part of the test procedure, not an afterthought.
                Check the earthing conductor is reconnected as the LAST step before re-energising
                — visually confirm the connection at the MET, mechanically verify it is tight,
                test continuity from the MET to the electrode (back to a normal continuity
                test in the dead-test sequence). Only then close the supply isolator. Many
                experienced electricians do a final R2 wander-lead check to the electrode after
                EFLI test as the formal confirmation before re-energising.
              </>
            }
          />

          <Scenario
            title="TT electrode test on a rural cottage refurbishment — Megger MFT1741+"
            situation={
              <>
                Old stone cottage in the Welsh hills. Refurbishment includes a new CU, RCD-
                main switch (30 mA), six final circuits. Supply is overhead TT — the cable
                drops to a single fused cut-out, then to the new CU. The original earth
                electrode is a 1.2 m copper rod next to the property, installed 20 years ago.
                You need to verify the electrode resistance during commissioning — first time
                the new CU is being signed off as Reg 411.5.3 compliant.
              </>
            }
            whatToDo={
              <>
                Plan the E1 three-stake test (the most accurate method, and you have plenty of
                space in the field next to the cottage). Safe isolation at the supplier cut-out,
                lock off, prove dead. At the MET, disconnect the earthing conductor from the
                electrode\'s test clamp. Drive the C2 current stake into the field 40 m from
                the cottage in a straight line away from the electrode. Drive the P2 potential
                stake at 20 m (the midpoint). Connect to the Megger MFT1741+ in earth electrode
                test mode. Press TEST — reads 67 Ω. Move P2 to 15 m, re-test — 65 Ω. Move P2 to
                25 m, re-test — 69 Ω. Three readings within ±3 % — you\'re in the plateau, the
                true electrode resistance is approximately 67 Ω. Compute Ra × IΔn = 67 × 0.030
                = 2.01 V. Well below the 50 V limit per Reg 411.5.3(b) — pass with comfortable
                margin. Reconnect the earthing conductor at the MET, verify continuity from MET
                to electrode (R2 wander-lead test reads 0.04 Ω — clean termination). Close the
                supply isolator, perform the live RCD trip-time test (Section 4 Sub 3) to
                verify the 30 mA RCD trips within Table 41.1 disconnection time. Document on
                the EIC: method E1, Ra = 67 Ω, Ra × IΔn = 2.01 V, complies with Reg 411.5.3(b).
                Note ground conditions — moist after recent rainfall, summer reading would be
                expected higher.
              </>
            }
            whyItMatters={
              <>
                TT installations live or die by their electrode resistance. A 67 Ω electrode in
                wet conditions might rise to 150 Ω in a dry summer, and even then Ra × IΔn =
                4.5 V — still well below 50 V limit. The engineering target of keeping Ra well
                below the absolute maximum gives year-round compliance. The E1 plateau-check
                method gives you confidence in the absolute number, the documentation of soil
                conditions explains seasonal variation to future inspectors, and the Ra × IΔn
                calculation against Reg 411.5.3(b) demonstrates the regulatory chain has been
                followed. Combined with the live RCD trip-time test in the next section, the
                TT system is verified as ADS-compliant.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.2 (RCD or overcurrent device for TT fault protection)"
            clause={
              <>
                One or more of the following types of protective device shall be used, the
                former being preferred: (a) an RCD; (b) an overcurrent protective device. NOTE
                1: An appropriate overcurrent protective device may be used for fault protection
                provided a suitably low value of Zs is permanently and reliably assured. NOTE 2:
                Where an RCD is used for fault protection the circuit should also incorporate an
                overcurrent protective device in accordance with Chapter 43.
              </>
            }
            meaning={
              <>
                For TT systems the RCD is the preferred fault-protection route — a low Zs
                cannot be reliably assured against an electrode that varies with soil
                conditions. The overcurrent device sits alongside for short-circuit and
                overload, not for fault. The Ra × IΔn ≤ 50 V check from 411.5.3 then closes the
                ADS calculation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.5.2 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 643.7.2 + 411.5.3 — earth electrode resistance must be verified for TT installations and any with additional consumer electrodes (generators, PV, EVSE).',
              'Acceptance criterion: Ra × IΔn ≤ 50 V (Reg 411.5.3(b)) or ≤ 25 V in agricultural locations (Section 705). For 30 mA RCD: Ra ≤ 1667 Ω theoretical max, ≤ 200 Ω practical target.',
              'GN3 method E1 — three-stake fall-of-potential, the most accurate. C2 stake 30-50 m away, P2 movable. Plateau check: three readings at ±5 m of midpoint should agree within a few %.',
              'GN3 method E2 — clamp / stakeless. Quick, no isolation needed, but requires a parallel earth path (multi-electrode systems or bonded extraneous-conductive-parts).',
              'EFLI method — uses a standard EFLI tester, requires temporary disconnection of the earthing conductor. Demands strict isolation discipline.',
              'CRITICAL safety: isolate supply BEFORE disconnecting earthing conductor; reconnect earthing conductor BEFORE re-energising supply. Do NOT re-energise without the earth path restored.',
              'BS 7430 is the design reference for earth electrodes including generators and static converters. Engineering targets keep Ra well below regulatory max for season-round reliability.',
              'Soil moisture is the dominant variable — Ra in dry summer can be 2-3× wet winter readings. Design and document for worst-case to maintain year-round compliance.',
            ]}
          />

          <Quiz title="Earth electrode resistance — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.5 Polarity verification
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.1 Live tests — Zs measurement
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
