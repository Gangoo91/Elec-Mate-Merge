/**
 * Module 3 · Section 4 · Subsection 3 — Turns, voltage, current ratio worked examples (AC 1.3)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.3
 *   AC 1.3 — "determine values of voltage, current and turns ratios in transformers"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 6.7
 *
 * Pure calculation practice. Real-world transformer ratio problems including
 * 3-phase delta/star variants and CT ratios.
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
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Transformer ratios — worked examples | Level 3 Module 3.4.3 (AC 1.3) | Elec-Mate';
const DESCRIPTION =
  'Voltage, current and turns ratios applied to single-phase, 3-phase delta/star, instrument transformers and CTs. The arithmetic patterns you\'ll see in any L3 paper.';

const checks = [
  {
    id: 'l3-m3-4-3-3ph',
    question:
      'A Dyn11 transformer has primary 11 kV (line-line), secondary 400 V (line-line). What is the turns ratio per phase (delta primary winding to star secondary winding)?',
    options: [
      '6350:230.9',
      '11000:400',
      '47.6:1',
      'all of these (different reference points)',
    ],
    correctIndex: 2,
    explanation:
      'Delta primary winding sees 11 000 V line. Star secondary winding sees 400/√3 = 230.9 V phase. Ratio per winding = 11000 / 230.9 = 47.6:1. Note: the line-to-line voltage ratio is 11000/400 = 27.5:1 — different from the per-winding turns ratio.',
  },
  {
    id: 'l3-m3-4-3-ct',
    question:
      'A 1000 / 5 A current transformer has a primary current of 600 A. Secondary current is:',
    options: [
      '1.2 A',
      '5 A',
      '3 A',
      '120 A',
    ],
    correctIndex: 2,
    explanation:
      'CT ratio is 1000:5 = 200:1. Secondary = primary / 200 = 600 / 200 = 3 A.',
  },
  {
    id: 'l3-m3-4-3-eff-current',
    question:
      'A 25 kVA, 230/400 V single-phase transformer (step-up). Rated primary current is:',
    options: [
      '108.7 A',
      '500 A',
      '62.5 A',
      '5750 A',
    ],
    correctIndex: 0,
    explanation:
      "I_primary = S / V_primary = 25 000 / 230 = 108.7 A. Secondary current would be 25000/400 = 62.5 A.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'For an 11 kV / 230 V step-down distribution transformer, the turns ratio is approximately:',
    options: [
      '1:48',
      '48:1',
      '11:230',
      '23:11',
    ],
    correctAnswer: 1,
    explanation: '11 000 / 230 = 47.83:1. Primary has many more turns than secondary.',
  },
  {
    id: 2,
    question: 'A 100 kVA, 400 V secondary transformer has rated secondary current:',
    options: [
      '400 A',
      '100 A',
      '250 A',
      '144 A',
    ],
    correctAnswer: 2,
    explanation:
      'Single-phase: I = S / V = 100 000 / 400 = 250 A. (3-phase: divide by √3 → 144 A line, 250 A phase in delta.) Question implies single-phase context.',
  },
  {
    id: 3,
    question:
      "A 100 kVA 3-phase 400 V star secondary. Line current is:",
    options: [
      '250 A',
      '100 A',
      '433 A',
      '144 A',
    ],
    correctAnswer: 3,
    explanation: 'I_line = S / (√3 × V_L) = 100 000 / (1.732 × 400) = 144.3 A.',
  },
  {
    id: 4,
    question:
      'Voltage transformer (VT) ratio 11 000 / 110 V. With primary 9 kV, secondary reads:',
    options: [
      '90 V',
      '110 V',
      '900 V',
      '1000 V',
    ],
    correctAnswer: 0,
    explanation: 'V2 = V1 × (N2/N1) = 9000 × (110/11000) = 9000 × 0.01 = 90 V.',
  },
  {
    id: 5,
    question:
      'Why are CT secondaries always rated 1 A or 5 A?',
    options: [
      'The overvoltage withstand capability appropriate to the measurement location in the installation',
      'Match standard switchboard ammeters and protective relays designed for 1 A or 5 A inputs',
      'All electrical systems are constructed, maintained and worked on so as to prevent danger',
      'Safety data sheets with hazard information and control measures',
    ],
    correctAnswer: 1,
    explanation:
      'Standardised so any CT can drive any standard relay or meter. UK convention 5 A; many European systems 1 A.',
  },
  {
    id: 6,
    question:
      'NEVER open a CT secondary with primary energised because:',
    options: [
      'Test type, results, instruments used, environmental conditions, and acceptance criteria',
      'The total required delay exceeds the maximum value of a single timer instruction',
      'Open secondary = no secondary current = uncontrolled flux → very high voltage induced (kV) → insulation failure',
      'Ensure cables don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t compromise fire barriers and coordinate emergency supplies',
    ],
    correctAnswer: 2,
    explanation:
      'CTs operate in saturation with secondary loaded. Open the load and the magnetising current goes huge, induced voltage spikes to several kV — kills the CT, kills you. Always short the secondary terminals before disconnecting.',
  },
  {
    id: 7,
    question:
      'A 200 kVA 3-phase transformer 11 kV / 400 V (Dyn11). Rated primary line current:',
    options: [
      '288.7 A',
      '17.5 A',
      '60 A',
      '10.5 A',
    ],
    correctAnswer: 3,
    explanation: 'I_primary line = S / (√3 × V_L1) = 200 000 / (1.732 × 11 000) = 10.5 A.',
  },
  {
    id: 8,
    question:
      'Same 200 kVA transformer. Rated secondary line current:',
    options: [
      '288.7 A',
      '500 A',
      '10.5 A',
      '866 A',
    ],
    correctAnswer: 0,
    explanation: 'I_secondary line = S / (√3 × V_L2) = 200 000 / (1.732 × 400) = 288.7 A.',
  },
];

const faqs = [
  {
    question: 'Why is the per-winding ratio different from the line-line ratio in delta-star transformers?',
    answer:
      "Because the delta winding sees the full line voltage but the star winding sees only line/√3. So a 11 kV/400 V Dyn-style transformer has line ratio 11000/400 = 27.5:1, but each pair of windings has turns ratio 11000/(400/√3) = 47.6:1. Both 'ratios' are valid — they describe different things.",
  },
  {
    question: 'Why are big transformers always star secondary?',
    answer:
      "To bring out a neutral. Most LV distribution serves single-phase loads (between line and neutral) as well as 3-phase. A neutral is essential. Delta secondary has no natural neutral and is rare except in industrial machine supplies.",
  },
  {
    question: 'How do I know if a clamp meter is reading a CT secondary correctly?',
    answer:
      "Multiply by the CT ratio. A 1000/5 CT reading 4 A on the secondary means primary = 4 × 200 = 800 A. The clamp meter reads 4 A unless you set it for the CT ratio. Check at commissioning by clamping the primary AND the CT secondary simultaneously and comparing.",
  },
  {
    question: 'Why does the primary draw current even with no secondary load?',
    answer:
      "That's the magnetising current — the current required to set up the flux in the core. Typically 1-5 % of rated current. It's mostly reactive (lags 90°), with a small real component for iron loss. The transformer is never a perfect open-circuit on the supply side.",
  },
  {
    question: 'Can I parallel two transformers?',
    answer:
      "Yes, but only if (1) same voltage ratio; (2) same vector group; (3) similar per-unit impedance (within ~10 %); (4) same phase rotation. Mismatched units share load unequally and circulating currents flow between them. Always check the nameplates and do a phase-rotation check before paralleling.",
  },
  {
    question: 'What happens to the ratio under load?',
    answer:
      "The output voltage drops slightly under load due to series winding impedance — this is the 'regulation' figure (typically 3-7 % for distribution units). The TURNS ratio doesn't change, but the OUTPUT voltage does. Tap changers compensate by adjusting the effective turns ratio.",
  },
];

export default function Sub3() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 3"
            title="Turns, voltage and current ratio — worked examples"
            description="Pure ratio practice. Single-phase, 3-phase delta/star, instrument transformers, current transformers."
            tone="yellow"
          />

          <TLDR
            points={[
              'Single-phase: V1/V2 = N1/N2; I1/I2 = N2/N1; V1×I1 = V2×I2.',
              '3-phase: line ratio differs from per-winding turns ratio when configurations differ (Dy, Yd).',
              'CTs: standardised secondaries 1 A or 5 A. Ratio set by primary turns and core sizing.',
              'NEVER open a CT secondary with primary live — induced voltage spikes destroy the CT.',
              'VTs: high voltage on primary, 110 V or 100 V secondary for metering relays.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply single-phase ratio formulas to find unknown V, I or N.',
              'Calculate per-winding ratio for a 3-phase delta/star transformer correctly.',
              'Calculate primary or secondary current for a CT given the ratio.',
              'Calculate primary or secondary voltage for a VT given the ratio.',
              'Determine rated current from kVA rating and voltage in single- or 3-phase.',
            ]}
            initialVisibleCount={3}
          />

          <TransformerSchematic />

          <ContentEyebrow>Single-phase worked examples</ContentEyebrow>

          <ConceptBlock
            title="The standard chain — V, I, N, S"
            plainEnglish="Given any two of voltage, current, turns or kVA, you can derive the rest using ratios and power conservation."
          >
            <p>Worked example 1 — finding turns ratio:</p>
            <p>
              A 5 kVA single-phase transformer is to be wound with 230 V primary and 24 V
              secondary. Primary has 1000 turns. Secondary turns?
              <br />
              N2 = N1 × (V2/V1) = 1000 × (24/230) = 104.3 turns → use 104 turns (round to whole
              number, accept slight ratio error).
            </p>
            <p>Worked example 2 — finding rated currents:</p>
            <p>
              I1 = S / V1 = 5000 / 230 = 21.74 A primary.
              <br />
              I2 = S / V2 = 5000 / 24 = 208.3 A secondary.
              <br />
              Check ratio: I1/I2 = 21.74 / 208.3 = 0.1043 = N2/N1 = 104/1000. Tick.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>3-phase worked examples</ContentEyebrow>

          <ConceptBlock
            title="Per-winding vs line ratio"
            plainEnglish="In a delta/star transformer, the per-winding ratio is what defines the actual turns. The line-line ratio is what shows on the plate. They differ by √3 because of the way star/delta connect."
          >
            <p>Worked example: 1 MVA 11 kV / 415 V Dyn11 transformer.</p>
            <p>
              Line ratio = 11000 / 415 = 26.5:1.
              <br />
              Per winding ratio = 11000 / (415/√3) = 11000 / 239.6 = 45.91:1.
              <br />
              Rated primary line current = S / (√3 × V_L1) = 1 000 000 / (1.732 × 11 000) = 52.5 A.
              <br />
              Rated secondary line current = 1 000 000 / (1.732 × 415) = 1391 A.
              <br />
              Per-winding currents (primary delta winding sees line/√3 of the line current):
              I_phase_primary = 52.5/√3 = 30.3 A. Secondary star winding I_phase = I_line = 1391 A.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <VideoCard
            url={videos.transformers.url}
            title={videos.transformers.title}
            channel={videos.transformers.channel}
            duration={videos.transformers.duration}
            topic={videos.transformers.topic}
          />

          <SectionRule />

          <ContentEyebrow>Instrument transformers</ContentEyebrow>

          <ConceptBlock
            title="CTs — current transformers"
            plainEnglish="A CT steps a large primary current down to a standard 1 A or 5 A secondary that's safe to feed into ammeters and relays. The primary is usually a single conductor passing through the core; secondary is hundreds or thousands of turns."
            onSite="On a 1000 A switchboard incomer, you'll see a CT around each line conductor. Secondary conductors run to the ammeter and protection panel. Always short the CT terminals before opening the secondary circuit — induced voltage on an open CT can be lethal."
          >
            <p>Standard CT ratios: 100/5, 200/5, 400/5, 800/5, 1000/5, 1600/5, 2500/5.</p>
            <p>
              Accuracy classes (BS EN 61869-2): Class 0.2 for revenue metering; Class 1 for
              standard metering; Class 5P for protection relays (allowed wider error at fault
              currents).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="VTs — voltage transformers"
            plainEnglish="Steps high voltage down to a safe metering voltage (typically 110 V or 100 V phase-to-phase) for relays and meters."
          >
            <p>
              Standard VT ratios: 11 000/110, 33 000/110, 132 000/110.
              <br />
              On metering and protection panels, you'll see two CT lugs and three VT cores
              feeding a multifunction meter that calculates V, A, kW, kVA, kVAr, pf, kWh.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <RegsCallout
            source="BS EN 61869-2:2012 — Instrument transformers — Additional requirements for current transformers"
            clause="The secondary winding of a current transformer in service shall not be opened with primary current flowing. Where it is necessary to disconnect a measuring or protection device, the secondary terminals of the CT shall first be short-circuited by means of a shorting link or by closing the test block shorting contacts."
            meaning={
              <>
                Open-circuiting an energised CT secondary is the most dangerous mistake on a
                switchboard. The induced voltage can hit several kV, destroying the CT, melting
                the test leads and killing the operator. Always short the secondary first.
              </>
            }
            cite="Source: BS EN 61869-2:2012."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.14.1 (Single-pole devices in line conductor)"
            clause="A single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only."
            meaning={
              <>
                On three-phase distribution boards every line conductor needs its own pole; the
                neutral is never single-pole interrupted. Reg 132.14.1 is why three-phase MCBs
                are inherently triple-pole, and why neutral disconnection must be linked. CT
                metering and protection circuits sit on top of this rule — protection always
                acts on the line conductors.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.14.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.14.2 (Switching the neutral)"
            clause="No switch or circuit-breaker, except where linked, or fuse, shall be inserted in an earthed neutral conductor. Any linked switch or linked circuit-breaker inserted in an earthed neutral conductor shall be arranged to break all the related line conductors."
            meaning={
              <>
                Three-phase isolation must break all live conductors together. A single-pole
                switch in the neutral leg can leave the load energised through a fault current
                path — extremely dangerous. Linked switching (4-pole isolators on TN-C-S, mandatory
                on TT) is the regulation answer. Star-connected loads with a faulty neutral
                develop large voltage imbalance — same physics, same regulation lock-down.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.14.2."
          />

          <SectionRule />

          <CommonMistake
            title="Treating line voltage and per-winding voltage as the same in 3-phase"
            whatHappens={
              <>
                Apprentice on a Dyn11 transformer install reads "11 kV / 400 V" and assumes a
                turns ratio of 27.5:1. Calculates expected magnetising current with that ratio.
                Result is 1.73× off, every secondary calc downstream is wrong.
              </>
            }
            doInstead={
              <>
                On a Dy or Yd transformer, the per-winding ratio is what is actually wound. Either
                use line voltages with the line-ratio formula AND remember the configuration, or
                resolve to phase voltages first then apply the simple per-winding turns ratio.
                Pick one approach and stick to it.
              </>
            }
          />

          <Scenario
            title="Sizing CT primaries for a 600 A switchboard"
            situation={
              <>
                Designer specifies a 3-phase 630 A switchboard. You need to fit CTs for the
                ammeter and the multifunction meter (5 A secondary). What ratio CTs do you order,
                and why not exact match?
              </>
            }
            whatToDo={
              <>
                Pick the next standard ratio above the rated current. 800/5 is the natural choice
                for a 630 A switchboard. Reasons:
                <br />
                — Primary will run at ~80 % of CT rating (630/800), comfortably in the meter
                accuracy band.
                <br />
                — Surge or fault current up to 800 A still gives a valid 5 A secondary; above
                that the CT saturates (predictably).
                <br />
                — Standard ratio means you can swap the meter or relay without re-sourcing the CT.
              </>
            }
            whyItMatters={
              <>
                Match CT to switchboard, not to instrument. Standard ratios mean off-the-shelf
                replacements forever. Custom CT ratios cost 5× more and add weeks to delivery.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — applying ratios on the bench</ContentEyebrow>

          <ConceptBlock
            title="Verifying turns ratio with a TTR test"
            plainEnglish="A Transformer Turns Ratio (TTR) tester applies a low voltage to the HV winding and measures the LV winding voltage. The ratio reading should match the nameplate within ~0.5 %. Significant error means a shorted turn or a tap-changer in the wrong position."
            onSite="Standard L3 commissioning procedure. Use a Megger TTR (or similar) on each phase pair. For a Dyn11 transformer: HV terminals ABC paired with LV terminals abc and neutral. The TTR reads ratio, polarity, phase shift in degrees. Pass criteria: ratio within ±0.5 %, phase shift exactly 30° (Dyn11 lag). Record on test sheet alongside insulation results."
          >
            <p>What different TTR results mean:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Within 0.5 %</strong> → healthy, ready for service.</li>
              <li><strong>0.5-2 % off</strong> → check tap changer position; verify against plate.</li>
              <li><strong>Wildly off (5%+)</strong> → likely shorted turns; transformer needs winding repair.</li>
              <li><strong>Phase shift wrong</strong> → wrong vector group OR misconnected. Re-check terminal markings.</li>
              <li><strong>Polarity reversed</strong> → swap a winding, then re-test.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Burden — what limits a CT or VT secondary"
            plainEnglish="The 'burden' is the load (in VA) that a CT or VT can drive on its secondary while staying within its accuracy class. Typical CT burdens: 5 VA, 10 VA, 15 VA, 30 VA. Adding more meters or longer cable runs increases burden — exceed the rating and accuracy degrades."
            onSite="Common L3 fault: technician adds a second meter to an existing CT secondary loop. Original CT was rated 5 VA. New meter draws 4 VA on its own. Plus original 3 VA. Plus cable losses 1 VA. Total 8 VA — over rating. Meter readings now ~5 % low at full load. Either upgrade to 10 VA CT or remove the second meter."
          >
            <p>Burden calculation for a CT secondary loop:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VA per device (from data sheet) — meters typically 1-3 VA, relays 0.5-2 VA.</li>
              <li>Cable burden = I² × R, where R is total loop resistance (out and back).</li>
              <li>For 5 A secondary, 2.5 mm² cable, 30 m loop: R ≈ 0.43 Ω. Burden = 25 × 0.43 = 10.7 VA — significant on a 15 VA CT.</li>
              <li>Use 1 A CTs instead of 5 A on long runs — burden is 25× lower for the same cable resistance.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tap changers — how a 5 % adjustment works"
            plainEnglish="A tap changer adds or removes a small percentage of the primary turns (usually ±2.5 %, ±5 %). With fewer primary turns, secondary voltage rises slightly (because V/N stays constant). With more primary turns, secondary voltage drops."
            onSite="On any distribution transformer, the tap changer is a rotary or slide selector accessible by removing an inspection cover. NEVER operate an off-circuit tap changer with the transformer energised — the arc will weld the contacts. Standard procedure: isolate, lock-out, drain residual charge, then turn. Re-energise and verify output voltage with a meter."
          >
            <p>Standard tap positions on a UK 11 kV/433 V transformer:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tap 1: +5 % (10 450 V primary, output ↑) — use when supply is low.</li>
              <li>Tap 2: +2.5 % (10 725 V primary).</li>
              <li>Tap 3: nominal (11 000 V primary, output 433 V at no load).</li>
              <li>Tap 4: -2.5 % (11 275 V primary, output ↓) — use when supply is high.</li>
              <li>Tap 5: -5 % (11 550 V primary) — use when supply is consistently above nominal.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Per-unit (pu) impedance — what 6 %Z really means"
            plainEnglish="The %Z on the nameplate is the percentage of rated voltage you have to apply to the primary (with secondary shorted) to circulate rated current. It is the per-unit equivalent series impedance — and it determines BOTH voltage regulation under load AND fault current at the secondary."
            onSite="The two formulas you actually use: (1) Voltage regulation at full load ≈ %Z × pf factor (3-7 % typical drop). (2) PSCC at LV terminals = 100 / %Z × I_rated. So a 1000 kVA 6 %Z transformer has PSCC = 100/6 × 1334 A = 22.2 kA. That number drives switchgear breaking-capacity selection."
          >
            <p>Worked: 500 kVA 11 kV/433 V, %Z = 4.5.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I_rated_LV = 500 000 / (√3 × 433) = 667 A.</li>
              <li>PSCC at LV terminals = 100 / 4.5 × 667 = 14.8 kA.</li>
              <li>Switchgear breaking capacity needed: ≥ 16 kA standard rating.</li>
              <li>Voltage regulation at full load, pf 0.85: ≈ 4.5 × (cos φ × R/Z + sin φ × X/Z) ≈ 3.5 % drop.</li>
              <li>So 433 V no-load → ~418 V at full load. Tap +1 (-2.5 %) brings it back to ~428 V.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Single-phase ratio: V1/V2 = N1/N2; I1/I2 = N2/N1; V1×I1 = V2×I2.',
              '3-phase: per-winding ratio differs from line ratio by √3 in Dy or Yd configurations.',
              'CT secondary always 1 A or 5 A; standard primary ratings 100, 200, 400, 800, 1600, 2500 A.',
              'NEVER open a CT secondary with primary energised.',
              'VTs commonly 11 000/110 V or 33 000/110 V for metering and protection.',
              'Pick CTs/VTs at next standard rating above expected primary value.',
              "Accuracy classes: 0.2 (revenue), 1 (general), 5P (protection).",
            ]}
          />

          <Quiz title="Transformer ratios knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 Transformer principles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Transformer losses (Cu and Fe)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
