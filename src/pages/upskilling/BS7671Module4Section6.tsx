import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s6-what-afdd-detects',
    question: 'What does an AFDD (Arc Fault Detection Device) detect that an MCB or RCD cannot?',
    options: [
      'Excessive current beyond the cable rating',
      'Earth-fault residual current on a TT system',
      'The characteristic high-frequency electrical signature of a series or parallel arc — a damaged conductor that is producing heat through arcing without necessarily drawing the high current that would trip an MCB',
      'Earth-fault loop impedance above the maximum',
    ],
    correctIndex: 2,
    explanation:
      'AFDDs detect the characteristic high-frequency electrical noise produced by arcing — a degraded contact, a damaged cable insulation, or a loose terminal where current is jumping a small gap and producing heat. The current may be well within the MCB rating (an arcing 13 A appliance plug looks like a normal load to the MCB) and there may be no residual current to ground (so the RCD is unaffected). The arc is the fire-risk signature; AFDDs catch it before it ignites the surrounding material.',
  },
  {
    id: 'm4s6-where-mandatory',
    question:
      'In BS 7671:2018+A4:2026, which of the following premises types has an EXPLICIT requirement that AFDDs SHALL be installed on single-phase socket circuits ≤ 32 A?',
    options: [
      'A standard 3-bed family home',
      'Houses in multiple occupation (HMOs), purpose-built student accommodation, care homes, and high-rise residential buildings (HRRBs)',
      'Industrial workshops only',
      'Any premises with combustible materials',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 mandates AFDDs ("shall") on single-phase AC final circuits supplying socket-outlets ≤ 32 A in: HMOs, purpose-built student accommodation, care homes, and high-rise residential buildings (HRRBs). For other premises (typical owner-occupied dwellings, commercial offices) Reg 421.1.7 currently RECOMMENDS AFDDs to mitigate fire risk — it does not yet mandate them, but specification by designers is increasingly common.',
  },
  {
    id: 'm4s6-where-prohibited',
    question: 'Reg 710.421.1.7 PROHIBITS AFDDs from certain medical-location circuits. Which?',
    options: [
      'All medical locations regardless of group',
      'Group 0 and Group 2 medical locations — where unwanted disconnection of supply would cause unacceptable risk to patients',
      'Group 1 only',
      'Operating theatres only',
    ],
    correctIndex: 1,
    explanation:
      "Reg 710.421.1.7: AFDDs shall NOT be used in circuits in medical locations of Group 0 or Group 2. The rationale is that AFDDs use complex signal-processing to detect arcs and can be triggered by certain switching transients or motor-start signatures — an unwanted disconnection in a Group 2 (life-supporting medical equipment) location is unacceptable. Group 1 medical locations may use AFDDs subject to manufacturer's coordination guidance.",
  },
  {
    id: 'm4s6-placement',
    question: 'When AFDDs are installed, where must they be placed within the protected circuit?',
    options: [
      'Anywhere along the circuit',
      'At the origin of the final circuit they protect — typically in the consumer unit / distribution board',
      'Close to the load only',
      'In each socket outlet',
    ],
    correctIndex: 1,
    explanation:
      'AFDDs shall be placed at the origin of the circuit to be protected — typically as a consumer-unit-mounted device in the same way as an MCB or RCBO. This ensures the entire downstream circuit is monitored. Most products are AFDD/RCBO combination devices that provide overcurrent + residual-current + arc-fault protection in a single way.',
  },
  {
    id: 'm4s6-product-standard',
    question: 'Which product standard does BS 7671 require AFDDs to comply with?',
    options: [
      'BS EN 60898 (MCBs)',
      'BS EN 61008 (RCDs)',
      'BS EN 62606 — the dedicated AFDD product standard',
      'BS 88 series (HRC fuses)',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 62606 is the IEC product standard for AFDDs — it defines the arc-detection performance requirements, the time/current-arc characteristic, the durability tests, and the marking requirements. Reg 421.1.7: AFDDs shall comply with BS EN 62606. Combined AFDD+RCBO devices comply with both BS EN 62606 and BS EN 61009 / 62423 for the overcurrent + RCD components.',
  },
  {
    id: 'm4s6-test-facility',
    question:
      "How do you verify an AFDD's manually-operated test facility on initial verification or EICR?",
    options: [
      'Use a generic RCD tester at IΔn',
      "Follow the manufacturer's recommendations — AFDDs use a manufacturer-specific test sequence; generic RCD testers do not exercise the arc-detection signal-processing",
      'No test is required',
      'Loop tester at the socket',
    ],
    correctIndex: 1,
    explanation:
      "AFDD test buttons are MANUFACTURER-SPECIFIC. Some need a single press; others a sustained press; some have an indicator that must change colour after the test sequence completes. Generic RCD testers do not exercise the arc-detection logic — only the AFDD's internal self-test does that. Reg 421.1.7 / GN3: verification of the manually-operated test facility shall be in accordance with the manufacturer's recommendations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A house in multiple occupation (HMO) is being rewired. The consumer unit has 6-way space. The lighting circuit (16 A) and 4 socket circuits (32 A each, single-phase) are present. What does Reg 421.1.7 demand?',
    options: [
      'AFDDs on all circuits',
      'AFDDs on the four 32 A single-phase socket circuits — Reg 421.1.7 mandates AFDDs on single-phase AC final circuits supplying socket-outlets ≤ 32 A in HMOs. Lighting circuits are not in scope of the mandatory AFDD requirement',
      'AFDDs on the lighting circuit only',
      'No AFDDs required — only RCDs',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 421.1.7 mandates AFDDs in HMOs on single-phase socket circuits ≤ 32 A. Lighting circuits, dedicated fixed-equipment circuits, and circuits exceeding 32 A or three-phase are not in the mandatory scope. Most domestic AFDDs are combined AFDD+RCBO devices, so the same way also satisfies Reg 411.3.3 (30 mA additional protection on the socket circuit).',
  },
  {
    id: 2,
    question: 'What is the difference between a series arc fault and a parallel arc fault?',
    options: [
      'No difference — both are the same',
      'Series arc — current passes through a damaged contact (e.g. loose terminal, broken conductor strand) generating heat at the gap; current is the normal load current. Parallel arc — current jumps between two conductors (e.g. line-to-neutral or line-to-PE) through degraded insulation; can be limited by load impedance to below MCB trip levels',
      'Series arc has higher current than parallel',
      'Only parallel arcs are detectable',
    ],
    correctAnswer: 1,
    explanation:
      "Series arc: current flows along the normal circuit path but jumps a small gap somewhere (loose terminal, broken strand, damaged plug pin). Power dissipation at the arc is small but localised — it produces extreme heat at the contact. Parallel arc: current finds a partial path between two conductors via degraded insulation — line-to-neutral or line-to-PE. Both are fire risks. Both produce the characteristic high-frequency electrical signature that AFDDs are designed to detect. MCBs see only RMS current — they're blind to both arc types as long as the magnitude stays below trip thresholds.",
  },
  {
    id: 3,
    question:
      'On a domestic owner-occupied dwelling (NOT an HMO, NOT high-rise, NOT care home), what is the BS 7671 status of AFDDs in 2026?',
    options: [
      'Mandatory',
      'Reg 421.1.7 RECOMMENDS the installation of AFDDs to mitigate fire risk in AC final circuits — it is a recommendation, not a mandatory requirement, in standard domestic dwellings',
      'Prohibited',
      'No mention',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 421.1.7 recommends AFDDs in standard domestic dwellings — it uses "consideration shall be given" language rather than "shall be installed". The mandatory requirement is restricted to HMOs, purpose-built student accommodation, care homes, and HRRBs. Designers may specify AFDDs as a default for standard domestic — many now do, particularly on bedroom socket circuits where the fire-risk consequence is greatest.',
  },
  {
    id: 4,
    question: 'Which equipment standard does an AFDD/RCBO COMBINATION device comply with?',
    options: [
      'BS EN 62606 only',
      'BS EN 62606 (for the arc-detection function) AND BS EN 61009 / 62423 (for the overcurrent + RCD functions)',
      'BS EN 60898 only',
      'BS 88 series',
    ],
    correctAnswer: 1,
    explanation:
      'A combined AFDD+RCBO device must satisfy BS EN 62606 for the arc-detection element AND BS EN 61009 (Type AC/A) or BS EN 62423 (Type F/B) for the overcurrent + residual-current functions. The product label will declare both standards. The advantage over separate devices: one DIN-rail position, one wiring connection, integrated coordination between the three protection functions.',
  },
  {
    id: 5,
    question:
      'A care-home rewire includes a 16 A lighting circuit, a 32 A socket ring, a 20 A fixed cooker outlet, and a 16 A immersion-heater radial. Where are AFDDs mandated?',
    options: [
      'All four',
      'On the 32 A socket ring only — Reg 421.1.7 mandates AFDDs on single-phase socket circuits ≤ 32 A in care homes. Lighting, fixed cooker outlet, and immersion heater (fixed equipment) are not in the mandatory scope',
      'Only on the lighting circuit',
      'Nothing — care homes are exempt',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs shall be provided on AC final circuits supplying SOCKET-OUTLETS ≤ 32 A in care homes. The cooker outlet is for fixed equipment (not a general-use socket); the lighting circuit and the immersion-heater radial are not socket circuits. Designers commonly extend AFDD coverage voluntarily to bedroom-related fixed circuits in care homes for additional fire-risk mitigation, but the mandatory regulation scope is the socket-outlet circuits.',
  },
  {
    id: 6,
    question:
      "An AFDD nuisance-trips on a customer's vacuum cleaner that has a worn brush. The customer asks whether the AFDD is faulty. What's the right response?",
    options: [
      'Replace the AFDD',
      "The AFDD is detecting a real arc fault — the worn carbon brush of the vacuum motor is producing arcing characteristic that the AFDD's signal-processing identifies. The vacuum needs servicing or replacement; the AFDD is doing exactly what it's specified to do",
      'Bypass the AFDD',
      'The customer needs a smaller appliance',
    ],
    correctAnswer: 1,
    explanation:
      "AFDDs sometimes detect arcing in failing motor brushes, contactors with degraded contacts, or appliances with damaged plug pins. The 'nuisance trip' is usually a real fire-risk indicator — the appliance has a fault that would eventually start a fire if not addressed. Resist customer pressure to bypass; explain that the AFDD has identified a maintenance issue. Modern AFDDs include diagnostic indicators (some via Bluetooth apps) that show whether the trip was overcurrent, residual-current or arc-fault — useful for explaining the cause.",
  },
  {
    id: 7,
    question: 'Why does BS 7671 prohibit AFDDs in medical Group 2 locations (Reg 710.421.1.7)?',
    options: [
      "AFDDs don't work at low voltage",
      'Group 2 medical locations support life-critical equipment where unwanted disconnection of supply could endanger patient life. AFDDs use signal-processing that may occasionally trip on transients that are not fires — the risk of an unwanted disconnection on life-support outweighs the fire-risk mitigation benefit',
      'Group 2 has higher voltages',
      'Medical equipment cannot use AFDDs',
    ],
    correctAnswer: 1,
    explanation:
      'Group 2 medical locations are operating theatres, intensive care units, and similar — where supply continuity is paramount. AFDDs occasionally false-trip on motor-start transients or specific switching signatures; in a normal building the disconnection is an inconvenience, in a Group 2 location it could be fatal. The trade-off favours continuity of supply over arc-fault detection. Group 0 (areas where no patient contact equipment is in use) is also prohibited; Group 1 is permitted with manufacturer guidance.',
  },
  {
    id: 8,
    question: 'What is the A4:2026 cert-form change related to AFDDs?',
    options: [
      'No change',
      'A4 added a column (item 4.23 / column 30 on the EIC schedule of inspection) for explicit recording of AFDD provision per circuit, plus an inspection item for confirming the AFDD test facility was operated successfully',
      'A4 deleted AFDDs from BS 7671',
      'A4 replaced AFDDs with RCDs',
    ],
    correctAnswer: 1,
    explanation:
      "The A4:2026 model EIC and EICR forms include explicit AFDD coverage: schedule of inspection item 4.23 (presence of AFDD where required), and an entry on the schedule of test results (column 30) confirming the AFDD's manually-operated test facility was successfully operated per the manufacturer's instructions. This makes AFDD provision and verification visible on every cert from 15 April 2026.",
  },
];

const faqItems = [
  {
    question: "What's the difference between an AFDD and an RCD?",
    answer:
      "Different physics. RCDs detect IMBALANCE between line and neutral currents (current going to earth instead of returning via neutral) — they protect against electric shock and earth-fault fires. AFDDs detect the HIGH-FREQUENCY ELECTRICAL SIGNATURE of arcing — they protect against fires from series and parallel arcs that don't produce earth-fault current. Both are fire-risk mitigation; they catch different failure modes. Combined AFDD+RCBO devices integrate both functions plus overcurrent.",
  },
  {
    question: 'Why are AFDDs not yet mandated everywhere domestic?',
    answer:
      'A staged rollout. Reg 421.1.7 mandates AFDDs in HMOs, purpose-built student accommodation, care homes, and high-rise residential buildings — premises where the consequence of a fire is highest (multiple occupants, escape difficulty). For owner-occupied single dwellings, the regulation currently RECOMMENDS rather than mandates. Industry practice is moving toward AFDD by default on bedroom socket circuits where someone might be asleep when a fire starts.',
  },
  {
    question: 'How much do AFDDs cost compared to MCBs / RCBOs?',
    answer:
      'Combined AFDD+RCBO devices currently retail for roughly 3-5× the price of an equivalent RCBO. The premium reflects the signal-processing electronics inside. Prices are dropping as production volumes rise. For an HMO consumer unit replacement, the AFDD requirement on socket circuits adds £200-400 to the cost depending on number of ways — a small premium against the fire-safety benefit.',
  },
  {
    question: 'Will AFDDs nuisance-trip on normal household appliances?',
    answer:
      "Modern Generation-3 AFDDs (post-2020) have substantially improved discrimination between real arcs and benign switching transients. Common false-trip causes that have been engineered out: vacuum motor starting, hair-dryer brushes, contactor switching, fluorescent ballast strikes. Genuine real-arc trips are usually pointing at a real maintenance issue — a worn brush, a loose terminal, a damaged plug pin. If trips are frequent and the cause isn't found, manufacturer support has diagnostic tools to interrogate the device's trip history.",
  },
  {
    question: 'Can I retrofit an AFDD to an existing consumer unit?',
    answer:
      'Yes, where the consumer unit has a compatible busbar arrangement and spare ways. Combined AFDD+RCBO devices fit a standard DIN-rail 1-module width; some manufacturers do 2-module variants with display indicators. The retrofit is usually straightforward in modern (post-2018) consumer units. Older 17th-edition split-load boards may need full replacement to accept AFDDs reliably — a CU upgrade rather than a single-way swap.',
  },
  {
    question: "What's the CPC arrangement for an AFDD?",
    answer:
      'AFDDs are wired the same way as RCBOs — line and neutral through the device, CPC routed externally (not through the AFDD body). The arc-detection sensors are on the line/neutral conductors. The combined AFDD+RCBO uses the same toroid principle as a standalone RCBO for the residual-current detection.',
  },
  {
    question: 'Are AFDDs required on existing installations on EICR?',
    answer:
      'AFDDs are NOT required retrospectively on existing installations during an EICR — Reg 421.1.7 applies to new design and significant alterations under the current edition. On an EICR, the absence of AFDDs in an HMO would be flagged as a deviation from the current edition and typically coded C3 (improvement recommended) for an older install — unless other risk factors push it to C2. New installs and significant rewires post-15 April 2026 must comply.',
  },
  {
    question: 'How long do AFDDs last?',
    answer:
      "Manufacturers typically state a 10-year design life with annual user-button testing. The signal-processing electronics are the wearout factor. The internal RCD element ages on the same curve as a standalone RCD. Annual user test (per the manufacturer's instructions — usually a button press with indicator confirmation) plus periodic-inspection RCD timing test catch ageing failures.",
  },
  {
    question: 'Should I specify AFDDs on every domestic socket circuit?',
    answer:
      'Best practice for new builds is increasingly yes, particularly for bedroom and high-occupancy areas. The cost premium is small relative to the project total. Where the customer is cost-sensitive, prioritise AFDDs on bedroom socket circuits (where occupants may be asleep when a fire starts) and circuits supplying high-fire-risk loads (older equipment, lots of plug-in appliances). Document the design choice on the EIC.',
  },
];

const BS7671Module4Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Arc Fault Detection Devices (AFDDs) | BS 7671:2018+A4:2026 | Module 4.6',
    description:
      'How AFDDs detect series and parallel arc faults that MCBs and RCDs cannot, where Reg 421.1.7 mandates them (HMOs, student accommodation, care homes, HRRBs) versus recommends them, where Reg 710.421.1.7 prohibits them (medical Groups 0 and 2), and the BS EN 62606 product standard.',
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
            eyebrow="Module 4 · Section 6 · Updated for A4:2026"
            title="Arc fault detection devices (AFDDs)"
            description="What an AFDD detects (series and parallel arc faults that MCBs and RCDs miss), where Reg 421.1.7 mandates them in BS 7671:2018+A4:2026, where Reg 710.421.1.7 prohibits them in medical locations, and how to install and verify them per BS EN 62606."
            actions={
              <>
                <RegBadge>421.1.7</RegBadge>
                <RegBadge>421.1.6</RegBadge>
                <AmendmentBadge regs={['421.1.7']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'AFDDs detect the high-frequency electrical signature of arcing — a fire-risk failure that MCBs (which see only current magnitude) and RCDs (which see only earth-fault residual) cannot detect.',
              'Mandatory ("shall") in BS 7671 on single-phase socket circuits ≤ 32 A in HMOs, purpose-built student accommodation, care homes, and high-rise residential buildings (HRRBs). Recommended ("consideration shall be given") in standard domestic.',
              'Prohibited in medical Group 0 and Group 2 locations (Reg 710.421.1.7) — supply-continuity to life-supporting equipment outweighs the fire-risk mitigation benefit. Comply with BS EN 62606.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the physical difference between a series arc and a parallel arc fault, and why neither MCBs nor RCDs detect them.',
              'Apply Reg 421.1.7 — identify premises where AFDDs are MANDATORY (HMOs, student accommodation, care homes, HRRBs) versus where they are RECOMMENDED.',
              'Recognise the medical-location prohibition (Reg 710.421.1.7 — Groups 0 and 2) and explain the supply-continuity rationale.',
              "Specify AFDDs correctly — at the origin of the protected circuit, BS EN 62606 product compliance, manufacturer's instructions for OCPD coordination — and verify the manually-operated test facility on initial verification / EICR.",
              'Identify the A4 cert-form additions for AFDD recording and complete EIC schedule entries accordingly.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What an AFDD detects (and what it misses)</ContentEyebrow>

          <ConceptBlock
            title="Series arc vs parallel arc — the two failure modes"
            plainEnglish="A series arc happens when current jumps a small gap in the normal circuit path — a loose terminal, a broken conductor strand, a damaged plug pin. The current is the normal load current; the gap dissipates power as localised heat. A parallel arc happens when current finds a partial path between two conductors through degraded insulation — line-to-neutral or line-to-earth via a carbonised dielectric."
            onSite="Both produce extreme localised heat. Both can ignite cable insulation, dust, stored materials, structural timber. Neither produces enough current rise to trip an MCB (the magnitude stays at or near the normal load current). Parallel arcs can produce some residual current that an RCD might catch — but the residual is often too small or too transient. Arcing is the most common ignition source in domestic electrical fires."
          >
            <p>
              The high-frequency electrical noise produced by an arc has a characteristic spectrum
              that signal-processing electronics can identify against the background of normal load
              currents. AFDDs (BS EN 62606) implement this detection in a DIN-rail package. The
              detection works on the current waveform alone — no need for voltage or earth-current
              sensing — though combined AFDD+RCBO devices add residual-current detection in the same
              housing.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Where Reg 421.1.7 mandates AFDDs</ContentEyebrow>

          <ConceptBlock
            title="The four mandatory premises types"
            plainEnglish="HMOs (houses in multiple occupation), purpose-built student accommodation, care homes, and high-rise residential buildings (HRRBs). The common factor: multiple occupants, escape difficulty, and a fire-fatality consequence higher than a single-family dwelling."
            onSite="The mandatory scope is single-phase socket-outlet circuits ≤ 32 A. Three-phase circuits, fixed-equipment circuits (cooker, immersion, fixed heating), and lighting circuits are NOT in the mandatory scope. Most installations satisfy the requirement with combined AFDD+RCBO devices on every socket way of the consumer unit — same wiring effort as a standard RCBO install, with the AFDD function added in."
          >
            <p>
              The premises selection is driven by fire-risk consequence analysis. HMOs and student
              accommodation typically have multiple occupants in shared sleeping accommodation; care
              homes have residents with reduced mobility and escape capability; HRRBs (above 18 m or
              7 storeys depending on definition) have vertical-escape constraints. In each, an
              arcing-fault fire that goes undetected for hours has a much higher fatality risk than
              the same fire in a single dwelling. The AFDD is targeted at this risk profile.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7 — Arc fault detection devices"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents. AFDDs shall comply with BS EN 62606. Where used, AFDDs shall be placed at the origin of the circuit to be protected."
            meaning="Reg 421.1.7 sets out the BASE recommendation for AFDDs in any AC final circuit. The MANDATORY scope (the 'shall' requirements) sits in the specific premises sections — HMOs, student accommodation, care homes, HRRBs — and applies to single-phase socket circuits ≤ 32 A. For standard domestic, the regulation is recommendation rather than mandate, but specification by designers is becoming common."
            cite="BS 7671:2018+A4:2026, Reg 421.1.7"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>How an AFDD actually works inside</ContentEyebrow>

          <ConceptBlock
            title="The signal-processing chain — what the device is doing 100 times a second"
            plainEnglish="Every AC half-cycle, the AFDD samples the current waveform at high speed (typically 25-50 kHz). It runs the samples through digital filters to extract specific frequency bands characteristic of arcing. If the high-frequency content matches the arc signature — and is sustained across multiple half-cycles, not just a single transient — the device trips."
            onSite="The 'sustained across multiple half-cycles' rule is what stops AFDDs from tripping on every motor start, every contactor click, every fluorescent ballast strike. Real arcing is persistent — a damaged contact or degraded insulation produces the signature continuously over many cycles, not a one-off spike. Modern Generation-3 AFDDs (post-2020) have substantially improved this discrimination."
          >
            <p>
              The detection algorithm has to balance sensitivity (catch real arcs early before they
              ignite something) against specificity (don't trip on benign transients). Different
              manufacturers tune the balance differently — Siemens, Hager, Schneider, ABB and Eaton
              all publish detection-test data per BS EN 62606's required waveform suite. The product
              standard requires the device to detect arcs at currents from 2.5 A up to the rated In,
              across cable lengths from short to long, with reproducible timing. The compliance test
              catalogue is one of the most demanding in BS EN product standards.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why MCBs and RCDs miss arc faults"
            plainEnglish="MCBs trip on the magnitude of the RMS current. A 13 A appliance with an arcing plug pin still draws ~13 A — the MCB sees a normal load. RCDs trip on imbalance between line and neutral. A series arc on the line conductor produces no imbalance — line and neutral currents are equal. A parallel arc may produce some residual but often below the 30 mA RCD threshold."
            onSite="This is why a fire investigator's report on an electrical fire often reads 'no fault found in the electrical installation; circuit protection did not operate'. The protection didn't operate because, by design, MCBs and RCDs aren't looking for arc signatures. The AFDD is the only device that catches the actual fire-ignition source — arcing — at the fire-precursor stage rather than after the cable insulation has already failed."
          >
            <p>
              A typical electrical fire timeline: (1) loose terminal develops an arc — a
              characteristic high-frequency electrical noise present at the terminal but with normal
              current magnitude, normal earth balance. MCB sees nothing. RCD sees nothing. (2) Arc
              heat carbonises adjacent insulation over hours / days / months. (3) Carbonised
              insulation eventually breaks down completely, producing a bolted line-to-neutral or
              line-to-earth short. (4) MCB or RCD trips — too late; the fire has already started.
              The AFDD intervenes at step 1, before step 2 irreversibly damages the surrounding
              material.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where Reg 710.421.1.7 prohibits AFDDs</ContentEyebrow>

          <ConceptBlock
            title="Medical Group 0 and Group 2 — supply-continuity wins"
            plainEnglish="Medical Group 0 (no patient contact / no medical equipment in use) and Group 2 (life-supporting medical equipment) prohibit AFDDs. The reason is supply-continuity: an unwanted AFDD trip on a Group 2 circuit could be fatal."
            onSite="Most general medical environments — outpatient clinics, GP surgeries, dental practices — are Group 1 medical locations and may use AFDDs subject to manufacturer guidance. The prohibition is targeted at the highest-criticality clinical areas where ANY disconnection risk is unacceptable."
          >
            <p>
              Reg 710.421.1.7: AFDDs shall not be used in circuits in medical locations of Group 0
              or Group 2. The signal-processing electronics that detect arcs occasionally false-trip
              on motor-start transients, certain switching signatures, or unusual waveforms — in a
              normal building the disconnection is an inconvenience, in a Group 2 operating theatre
              or ICU it could end a life. The trade-off favours uninterrupted supply over fire-risk
              mitigation. Group 1 (general medical examination / treatment locations) may use AFDDs
              subject to the manufacturer's coordination guidance.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Installation and verification</ContentEyebrow>

          <ConceptBlock
            title="Origin of the circuit, BS EN 62606, manufacturer coordination"
            plainEnglish="AFDDs go at the origin of the final circuit — typically a DIN-rail device in the consumer unit / distribution board. They must comply with BS EN 62606. Coordination with upstream OCPDs (in a combined-device install, the OCPD function is integrated; in a separate AFDD-only install, the upstream MCB ratings must be per the manufacturer's data sheet)."
            onSite="The most common product is the AFDD+RCBO combined device — single DIN-rail position, single line-neutral connection plus CPC, satisfies overcurrent + RCD + arc-fault all in one unit. Connect line and neutral through the device (per the polarity arrows on the housing); the CPC is routed externally to the earth bar. No special wiring tricks — same as installing a standard RCBO."
          >
            <p>
              Initial verification per Reg 643: continuity, IR, polarity, Zs, RCD operation (for the
              RCD element of a combined device). For the AFDD function, verify the manually-operated
              test facility per the manufacturer's recommendations — this is usually a button press
              with an indicator-LED confirmation that the arc-detection signal-processing has
              self-tested. Generic RCD testers do NOT exercise the AFDD function; only the device's
              own internal self-test does that. Record successful self-test on the EIC schedule of
              test results (column 30 in the A4 model form).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />
          <InlineCheck {...inlineChecks[4]} />
          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>BS EN 62606 — what the product standard actually tests</ContentEyebrow>

          <ConceptBlock
            title="The six arc-current waveforms the standard requires the device to detect"
            plainEnglish="BS EN 62606 specifies six characteristic arc-fault waveforms that the AFDD must reliably detect, each at currents from 2.5 A up to the rated In. The waveforms cover series-arc, parallel-arc and mixed scenarios with various cable lengths and load impedances."
            onSite="The compliance test is done at the manufacturer's facility under controlled conditions — not something an installer or inspector replicates in the field. The relevance to site work is that any device showing the BS EN 62606 mark has been independently verified to detect ALL six waveforms, with the timing data published in the data sheet. Don't get drawn into 'this brand detects more arcs than that one' marketing — the product standard is the floor and all compliant devices clear it."
          >
            <p>
              The six waveform tests cover: series arc on the line conductor through carbon path
              resistance; series arc through a 'cable cut' simulation; parallel arc line-to-neutral
              via carbonised insulation; parallel arc line-to-PE; arc with connected load
              (resistive, inductive, capacitive); arc test with masking-load (a deliberate adjacent
              normal load that could mask the arc signature). Each test is repeated at multiple
              current levels and cable-length conditions. The standard also requires immunity
              testing against false-trip on dozens of normal-operation waveforms — vacuum cleaners,
              power tools, switching transients, fluorescent ballasts. Compliance with both sides of
              this matrix — sensitivity to arcs AND specificity against false trips — is what BS EN
              62606 certification represents.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Combined devices vs separate AFDDs</ContentEyebrow>

          <ConceptBlock
            title="AFDD+RCBO — three protective functions in one DIN-rail position"
            plainEnglish="Modern installs almost always use combined devices that integrate AFDD (BS EN 62606) + RCD (BS EN 61009 / 62423) + MCB into a single 1-module-wide unit. Per-circuit overcurrent + residual-current + arc-fault protection in the same wiring effort as a standard RCBO."
            onSite="Cost and DIN-rail space are the two practical drivers. A combined AFDD+RCBO is roughly 3-4× the price of a basic RCBO but takes the same module width. For an HMO consumer unit with 6 socket circuits requiring AFDD coverage, the combined-device approach is the obvious choice — fitting 6 separate AFDD units alongside 6 separate RCBOs would more than double the consumer unit's width, which usually isn't physically possible."
          >
            <p>
              Pure AFDD-only devices (without integrated overcurrent and RCD) exist mainly for
              industrial applications where the upstream MCB and RCD are dedicated devices on their
              own DIN positions, allowing the AFDD to be added as a third device in the chain. The
              combined AFDD+RCBO is the dominant domestic / commercial product — data sheets list
              compatibility with each manufacturer's busbar systems, and all major brands now offer
              Type A AFDD+RCBO at minimum, with Type F and Type B variants available for VSD-heavy
              or three-phase mixed-load installations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where to place AFDDs when you don't have to install them everywhere"
            plainEnglish="If the regulation doesn't mandate AFDDs across the whole installation, focus the budget where the fire-risk consequence is highest. Bedroom socket circuits — occupants asleep, escape window is narrow. Loft / roof-space circuits — fire spreads through the structure. Long buried or chased runs where access is limited."
            onSite="Practical priority list for a domestic upgrade where budget is tight: (1) bedroom socket circuits (people asleep), (2) loft / roof-space junction-box-fed circuits (high cable-fault rate, slow fire detection), (3) kitchen socket ring (high-load appliances, frequent plug-pin damage), (4) garage / outbuilding sockets (water + mechanical damage), then everything else as the budget allows. Document the design choice; the EIC departure under Reg 120.3 explains the prioritisation logic."
          >
            <p>
              For commercial and industrial installations where the regulation doesn't mandate, the
              priority is fire-load-driven: areas with high concentrations of combustible materials
              (storage, archives, workshops with timber dust), areas with poor fire detection (large
              open-plan factories, agricultural buildings), and areas where electrical equipment is
              exposed to mechanical damage or moisture. Designers increasingly include AFDDs as
              standard on new commercial work — the cost premium against the project total is small
              and the fire-risk reduction is measurable.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating an HMO rewire like a standard domestic"
            whatHappens="Designer specifies a standard domestic CU with RCBOs throughout for an HMO conversion (4 separate bedsits sharing kitchen / bathrooms). No AFDDs. EICR or building-control inspection flags non-compliance with Reg 421.1.7 — AFDDs are mandatory on the single-phase socket circuits in HMOs. Cost to retrofit: replace every relevant RCBO with an AFDD+RCBO."
            doInstead="Confirm the premises classification AT THE DESIGN STAGE. Is it an HMO? (Multiple unrelated occupants sharing facilities — see local authority HMO licensing definitions.) Purpose-built student accommodation? Care home? HRRB? If yes to any, AFDDs are mandatory on single-phase socket circuits ≤ 32 A. Spec AFDD+RCBO devices on those circuits from the outset. Document the classification on the design sheet."
          />

          <CommonMistake
            title="Bypassing an AFDD that 'nuisance trips' on a vacuum cleaner"
            whatHappens="Customer reports the AFDD trips when they use their vacuum. Engineer (or worse, the customer) bridges the AFDD with a standard RCBO. Some weeks later the vacuum's worn motor brush ignites — exactly the failure mode the AFDD was detecting. Fire damage; insurance challenges the bypass."
            doInstead="AFDD trips are usually real arcing — failing motor brushes, worn contactors, damaged plug pins. Investigate the appliance, not the AFDD. Modern AFDDs include trip-event diagnostics (some Bluetooth-readable) showing whether the trip was overcurrent, residual-current or arc-fault. If the AFDD logs an arc-fault trip on a specific appliance, that appliance has a real maintenance need. Replace or service it; do not bypass the device."
          />

          <CommonMistake
            title="Misclassifying the premises type"
            whatHappens="Designer specifies a flat conversion as 'a domestic flat' — assuming AFDDs are recommended only. Building control inspector reviews the planning paperwork and notes the building has 4 floors and is over 18 m tall — meaning it falls within the high-rise residential building (HRRB) definition, where AFDDs are mandatory on single-phase socket circuits ≤ 32 A. Cost to retrofit: replace every flat's socket-circuit RCBO with an AFDD+RCBO."
            doInstead="Confirm the building's HRRB classification at the planning stage. The HRRB threshold has shifted in recent regulatory updates and is now generally defined as residential buildings of 18 m or above (or 7 storeys), aligned with Approved Document B. Any HRRB triggers the mandatory AFDD requirement under Reg 421.1.7. Same caution applies to HMO classification — the local authority's HMO definition (typically 3+ unrelated occupants sharing facilities) determines whether the regulation applies. Get the building classification confirmed in writing before finalising the consumer unit specification."
          />

          <CommonMistake
            title="Treating an AFDD trip log as 'just a nuisance trip' without investigation"
            whatHappens="The customer reports the AFDD has tripped three times in the last fortnight. Each time they reset it and carry on. Engineer arrives, presses the test button, AFDD passes, signs it off as 'OK on test'. Two weeks later the wall socket the AFDD was tripping on melts and ignites adjacent insulation — a fire that was preventable."
            doInstead="An AFDD that has tripped three times in two weeks is detecting something real. Modern AFDDs (Generation-3 onward) have trip-event logging — some via Bluetooth apps, some via on-device LEDs that indicate trip cause. Read the log. If the trips are recorded as arc-fault (not overcurrent or residual-current), the device has identified a real problem on the protected circuit. Investigate every plug, terminal and accessory on the circuit. The customer's perception of 'nuisance trip' is often the AFDD doing its job and saving the property — don't dismiss without diagnostic work."
          />

          <CommonMistake
            title="Verifying with a generic RCD tester instead of the manufacturer's test facility"
            whatHappens="Inspector tests an AFDD+RCBO using a multifunction tester's RCD-test mode at IΔn and 5×IΔn — passes the residual-current timing tests, records as 'AFDD verified'. The arc-detection signal-processing was never exercised. The AFDD's signal-processing has actually drifted; it would no longer reliably detect a real arc — but the EICR has missed it."
            doInstead="The AFDD's manually-operated test facility (the device's own button) is the regulated way to verify the arc-detection function. Reg 421.1.7 / GN3 — verification per the manufacturer's recommendations. The button initiates the device's internal self-test of its signal-processing chain; the indicator confirms a pass. Then run the standard RCD timing tests for the RCD element. Both are required. Record both on the cert."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Standard owner-occupied dwelling — design choice on AFDDs"
            situation="A new-build 4-bed family home in standard suburban estate. Standard TN-C-S supply, no LPS, not an HMO, not high-rise. Builder is asking whether AFDDs should be specified across the consumer unit or only on selected circuits."
            whatToDo="Reg 421.1.7 RECOMMENDS AFDDs in standard domestic — it doesn't mandate them. Practical design choice: spec AFDD+RCBO on bedroom socket circuits as a minimum (occupants asleep, escape window narrow on a developing fire), then extend to kitchen and lounge socket rings if the budget allows. Lighting circuits need the Reg 411.3.4 RCD additional protection but standard RCBO is fine. Total AFDD count: typically 4-5 ways out of a 12-way CU. Cost premium against pure RCBO: ~£150-250. Document the design choice on the EIC under design departures."
            whyItMatters="Standard domestic is where designers have the most latitude — and the most professional discretion. The conversation with the customer / developer about WHY AFDDs are in the design is part of the value the qualified electrician brings. A clear explanation of arc-fault risk, AFDD detection, and the cost/benefit trade-off is more valuable than a take-it-or-leave-it spec sheet. Many customers, once they understand, prefer AFDDs across the whole CU and accept the premium."
          />

          <Scenario
            title="HMO rewire — A4 in force"
            situation="Three-storey terraced property converted to a 5-bedroom HMO. New consumer unit needed. Loads per bedroom: lighting, two 13 A sockets (32 A radials), small electric heater. Shared kitchen has 32 A socket ring + 30 A cooker outlet + lighting. Communal stair lighting on its own circuit."
            whatToDo="Reg 421.1.7 mandate: AFDDs on single-phase socket circuits ≤ 32 A in HMOs. Design: AFDD+RCBO Type A 30 mA on each bedroom socket radial (5 ways), AFDD+RCBO Type A 30 mA on the kitchen socket ring. Standard RCBO Type A 30 mA on lighting circuits (Reg 411.3.4 — A4 luminaire requirement) and on the cooker outlet (fixed equipment, not in mandatory AFDD scope). Total AFDD count: 6 ways. Cost premium vs standard RCBO install: ~£250 — proportionate against the consequence of an HMO fire."
            whyItMatters="Premises classification is the design-defining decision. HMOs trigger mandatory AFDDs on socket circuits; the choice cascades into the consumer unit specification, the way count, and the device list. Designers who don't ask 'is this an HMO?' early in the design risk delivering a non-compliant install that costs more to retrofit than to do right first time."
          />

          <Scenario
            title="Student accommodation block — AFDDs across 80 bedsits"
            situation="A purpose-built student accommodation block with 80 single-room bedsits, each with its own consumer unit fed from a sub-board on each floor. Each bedsit has a 32 A socket ring, a 16 A lighting circuit, and a fixed 16 A immersion-heater radial. The developer is asking whether AFDDs are worth the cost."
            whatToDo="Reg 421.1.7 mandates AFDDs in purpose-built student accommodation on single-phase socket circuits ≤ 32 A — the developer's question is moot, the regulation answers it. Spec: combined AFDD+RCBO Type A 30 mA on each bedsit's 32 A socket ring (80 ways). Standard RCBO Type A 30 mA on lighting (Reg 411.3.4 luminaire requirement) and on the immersion heater (fixed equipment, not in mandatory AFDD scope). Total AFDD count across the block: 80. Cost premium: ~£3,200 against an estimated project total around £400k — under 1% of the project for a quantifiable fire-risk reduction across 80 sleeping rooms."
            whyItMatters="Premises-classification triggers cascade. Confirmation that this is purpose-built student accommodation triggers the AFDD requirement; from there the cost is fixed and the design simplifies. Designers who treat the AFDD requirement as 'optional' on this premises class will fail building control inspection and have to retrofit at much higher unit cost. The regulation is unambiguous — comply once, document the compliance, move on."
          />

          <Scenario
            title="GP surgery refurb — Group 1 medical, AFDD spec decision"
            situation="A small GP surgery is having its consumer unit replaced. The clinical examination rooms are Group 1 medical locations (patients in contact with applied parts but not life-support). The surgery's manager has asked whether AFDDs would be a good idea for fire safety."
            whatToDo="Group 1 is permitted to use AFDDs subject to manufacturer guidance — Reg 710.421.1.7 prohibits only Group 0 and Group 2. The relevant question is whether the manufacturer's data sheet identifies any AFDD coordination issues with medical-grade equipment (some imaging equipment, certain pathology lab machines have signatures that some AFDDs occasionally false-trip on). Spec: AFDD+RCBO on the general administrative / waiting-room socket circuits; standard RCBO on dedicated examination-room sockets where the manufacturer's coordination guidance is unclear; document the design rationale on the EIC. The surgery gets the fire-risk benefit on most of the install with the supply-continuity guarantee on the clinical sockets."
            whyItMatters="The medical-location AFDD discussion is one of the most nuanced in BS 7671 — prohibition for Group 0 / Group 2, permission with caution for Group 1. The right answer depends on the specific manufacturer's coordination guidance for the equipment in use. Designers must read the AFDD data sheet AND the medical equipment installation manuals together; document the design choice; never take a generic 'yes' or 'no' position."
          />

          <SectionRule />

          <ContentEyebrow>Putting it together — a designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Decision tree for AFDD specification on a new design"
            plainEnglish="Three questions answer the AFDD spec for any new install. (1) What are the premises? (2) What are the circuit ratings and types? (3) Are any medical Group 0 / Group 2 locations involved?"
            onSite="Use this every time you start a new design. It takes thirty seconds and removes the 'should we / shouldn't we' uncertainty that costs time later in the project."
          >
            <p>
              <strong>Question 1 — Premises type.</strong> HMO, purpose-built student accommodation,
              care home, or HRRB? If yes → AFDDs MANDATORY on single-phase socket circuits ≤ 32 A
              (Reg 421.1.7). Standard owner-occupied dwelling, commercial / industrial? AFDDs
              RECOMMENDED but not mandated; designer's choice.
              <strong> Question 2 — Circuit scope.</strong> The mandate applies to single-phase, AC,
              ≤ 32 A, supplying SOCKET-OUTLETS. Three-phase circuits, fixed-equipment circuits,
              lighting circuits and circuits over 32 A are out of mandatory scope — recommendation
              only.
              <strong> Question 3 — Medical Group 0 / 2.</strong> If the premises includes any Group
              0 or Group 2 medical locations, AFDDs are PROHIBITED on those circuits (Reg
              710.421.1.7). Group 1 medical may use AFDDs subject to the manufacturer's
              equipment-coordination guidance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading manufacturer trip-event diagnostics on Generation-3 AFDDs"
            plainEnglish="Modern AFDDs (post-2020) record every trip event with a cause code: overcurrent, residual current, or arc fault. Some manufacturers expose the log via an on-device LED sequence; others via a Bluetooth app on a phone; the most advanced via integration with a building-management dashboard."
            onSite="Always check the trip log before resetting. If the trip cause was arc-fault and the same circuit has tripped multiple times, the device is pointing at a real problem. The customer's perception of 'random nuisance trip' is often a degrading appliance, a loose terminal somewhere, or a damaged cable. The diagnostic output saves diagnostic time and turns a 'random fault' callout into a targeted maintenance visit."
          />

          <ConceptBlock
            title="The cost-benefit conversation with the customer"
            plainEnglish="Customers who hear the price premium of AFDD+RCBO devices over standard RCBOs often ask whether the upgrade is worth it. The honest answer: yes for the high-fire-consequence rooms (bedrooms, kitchens, lofts), debatable for the rest, depending on the customer's priorities and budget."
            onSite="A typical new-build domestic CU has 8-12 ways. Going from all RCBO to all AFDD+RCBO adds £200-400 to the project against an electrical works total of £4,000-£10,000. Going for AFDDs only on bedroom socket circuits (where occupants are asleep when a fire develops) adds £30-60 — almost always worth it. This is one of those upgrades where the financial cost is small, the safety benefit is real, and most customers say yes once the rationale is explained."
          >
            <p>
              For commercial work, the conversation is usually with the developer or facilities
              manager rather than the end occupant. The fire-risk reduction is quantifiable
              (insurance underwriters increasingly recognise AFDDs in risk-pricing models). The
              compliance argument cuts both ways: where AFDDs are mandated by Reg 421.1.7, the
              conversation is short — they go in, end of discussion. Where they're recommended, the
              design rationale gets documented on the EIC and the customer signs off on the design
              choice.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Future-proofing — what's coming after A4:2026</ContentEyebrow>

          <ConceptBlock
            title="The direction of travel — AFDD scope is widening"
            plainEnglish="A4:2026 mandated AFDDs in HMOs, student accommodation, care homes and HRRBs. The next BS 7671 amendment is widely expected to extend the mandate to all rented accommodation, then potentially to all new domestic dwellings. Industry signals point to AFDDs becoming the new-build domestic default within 5-7 years."
            onSite="Designs that meet only the current letter of A4 will be revisited at the next amendment. Designs that adopt AFDDs as the new-build domestic default — even where currently 'recommended only' — will scale forward without rework. The cost premium is small, the customer-safety benefit is real, and the fit-and-forget design choice de-risks future regulatory tightening."
          >
            <p>
              The IET / BSI / HSE direction of travel is informed by fire-statistic data: arc-fault
              ignitions are the single largest electrical-cause domestic-fire mode. As AFDD
              technology matures (Generation-3 devices have substantially fewer false-trip issues
              than first-generation), the historical 'too many nuisance trips' objection has
              weakened. The pattern matches RCDs through the late 1990s / 2000s — initially
              optional, then mandatory in stages, then default in new builds. AFDDs are at the
              'mandatory in stages' point now.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'AFDDs detect series and parallel arc faults — the most common ignition source in domestic electrical fires. MCBs (current magnitude) and RCDs (earth-fault residual) miss arc faults because the magnitude stays within normal limits.',
              'Mandatory in BS 7671:2018+A4:2026 on single-phase socket circuits ≤ 32 A in HMOs, purpose-built student accommodation, care homes, and HRRBs. Recommended elsewhere.',
              'Prohibited in medical Group 0 and Group 2 locations (Reg 710.421.1.7) — supply-continuity to life-supporting equipment outweighs fire-risk benefit.',
              "Comply with BS EN 62606. Place at the origin of the protected final circuit. Verify the manually-operated test facility per the manufacturer's recommendations — generic RCD testers do not exercise the arc-detection function.",
              'A4 cert-form: schedule of inspection item 4.23 (AFDD presence), schedule of test results column 30 (AFDD test facility operated successfully). Record on every EIC from 15 April 2026.',
              "Industry direction: AFDDs are moving toward becoming the new-build domestic default. Designs that adopt them now — even where currently 'recommended' — scale forward to the next amendment without rework.",
              "User test button = 'still alive' check. Inspector test = manufacturer's manually-operated facility per Reg 421.1.7. Generic RCD testers do NOT exercise the arc-detection function.",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
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
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4-section-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.7 Bidirectional protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section6;
