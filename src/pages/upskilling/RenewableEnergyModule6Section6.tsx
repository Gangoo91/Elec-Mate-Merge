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
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s6-type-2-standard',
    question:
      'What standard defines the Type 2 EV connector used on UK 2025-26 domestic Mode 3 installs?',
    options: [
      'BS 1363 (UK 3-pin)',
      'BS EN IEC 62196-2:2022 — dimensional compatibility and interchangeability requirements for AC pin and contact-tube accessories for conductive EV charging. Superseded BS EN 62196-2:2017. The 2022 edition is the current normative reference for new installs',
      'IEC 60884 (general plugs)',
      'No standard',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 62196-2:2022 — "Plugs, socket-outlets, vehicle connectors and vehicle inlets. Conductive charging of electric vehicles. Dimensional compatibility and interchangeability requirements for AC pin and contact-tube accessories". The 2017 edition was withdrawn and replaced by the 2022 edition. UK / EU standard Type 2 connector — 7-pin (3-phase + neutral + PE + CP + PP). Reg 722.421.1.7.201 AFDD conjunctive exception requires this conformity declared on the wallbox DoC.',
  },
  {
    id: 'm6s6-cp-signal',
    question: 'What is the Control Pilot (CP) signal in a Mode 3 install?',
    options: [
      'Mains voltage AC',
      'A ±12 V signal between the wallbox and the vehicle, PWM duty-cycle modulated. The duty cycle communicates the maximum available current (e.g. 53% duty = 32 A). The CP signal coordinates contactor closure, current limit announcement, charging-in-progress monitoring, and error states',
      'Battery voltage',
      'Earth conductor',
    ],
    correctIndex: 1,
    explanation:
      'Control Pilot (CP) per BS EN 61851-1 / IEC 61851-1 — ±12 V PWM signal between wallbox and vehicle through a dedicated wire in the Type 2 cable. PWM duty cycle announces the maximum current available: 53% = 32 A; 25% = 16 A; 16% = 10 A; etc. Per IEC 61851-1 Annex A. The vehicle reads the duty cycle and complies. CP also signals: vehicle detected (CP-PE voltage drops from 12 V to 9 V on plug-in); vehicle ready to charge (transitions to 6 V); fault / unplug detected. Wallbox does not close the contactor until CP signalling confirms readiness.',
  },
  {
    id: 'm6s6-pp-signal',
    question: 'What does the Proximity Pilot (PP) signal communicate?',
    options: [
      'Same as CP',
      'PP is a resistance-coded signal in the Type 2 cable that identifies the cable’s current rating to the wallbox. The cable contains a resistor between PP and PE whose value encodes the maximum current capacity (e.g. 1.5 kΩ = 13 A; 680 Ω = 20 A; 220 Ω = 32 A; 100 Ω = 63 A). The wallbox reads PP to ensure it doesn’t exceed the cable’s rating regardless of CP duty cycle',
      'Battery state',
      'Customer’s ID',
    ],
    correctIndex: 1,
    explanation:
      'Proximity Pilot (PP) is a resistance-coded signal in the Type 2 cable. The cable contains a resistor between PP and PE at the wallbox-side connector whose value encodes the cable’s maximum current rating. Standard PP values (IEC 61851-1 Annex B): 1.5 kΩ = 13 A; 680 Ω = 20 A; 220 Ω = 32 A; 100 Ω = 63 A. The wallbox reads the PP value at plug-in and limits its CP duty-cycle current announcement to no more than the cable’s rating. Prevents a 13 A cable being driven at 32 A regardless of wallbox capability. Cert evidence bundle records: untethered wallbox + customer cable rating; tethered wallbox + integrated cable rating.',
  },
  {
    id: 'm6s6-tethered-vs-untethered',
    question: 'Tethered vs untethered wallbox — what’s the install consideration?',
    options: [
      'No difference',
      'Tethered = cable permanently attached to wallbox (manufacturer-supplied, integrated PP rating, cable holster on wallbox). Customer convenience: just plug into vehicle. Cable limited to single rating. Untethered = socket on wallbox; customer brings their own Type 2 cable (typical 5 m, kept in vehicle boot). Flexibility: customer can match cable rating to vehicle. Lower install cost. UK 2025-26: ~50/50 split; tethered preferred by less technical customers',
      'Tethered is illegal',
      'Untethered is illegal',
    ],
    correctIndex: 1,
    explanation:
      'Tethered = cable attached to wallbox. Pros: customer convenience (just plug in), cable rating fixed and known. Cons: cable damage means replacing the wallbox or paying for cable-replacement service; cable rating limits future upgrades. Untethered = socket on wallbox. Pros: customer cable in vehicle boot; can match cable to vehicle; cable replaceable; works with any Type 2-compliant cable. Cons: customer must remember to plug both ends; cable left out gets damaged / stolen; PP signalling reads customer cable rating which may be lower than expected. UK 2025-26: split market; tethered preferred by less technical customers + new EV buyers; untethered by enthusiasts + multi-vehicle households.',
  },
];

const quizQuestions = [
  {
    question:
      'The customer’s wallbox shows the EV is plugged in but won’t start charging. What’s the first diagnostic step?',
    options: [
      'Replace the wallbox',
      'Check the CP / PP signalling. Common causes: (1) vehicle reporting not ready (CP voltage not transitioning correctly); (2) PP resistor in cable damaged → wallbox reads no cable / wrong rating; (3) firmware mismatch between wallbox and vehicle; (4) wallbox configured for higher current than cable PP allows. Use the wallbox app diagnostic screen + try a different cable to isolate. Most "won’t charge" complaints are signalling not power',
      'Reset the consumer unit',
      'Call the DNO',
    ],
    correctAnswer: 1,
    explanation:
      'CP/PP signalling diagnostics first. The wallbox’s display / app typically shows the signalling state. Common diagnoses: (1) CP not transitioning to 6 V = vehicle not ready (battery full, vehicle firmware paused, charge schedule active); (2) PP unreadable = damaged cable resistor, dirty connector pins; (3) firmware mismatch = wallbox or vehicle firmware update needed (manufacturer support); (4) charge schedule = wallbox waiting for off-peak window (smart-charging regs M6.7). Power-side diagnostics (CB tripped, RCBO not closed) come second. Manufacturer support line is the next step where signalling reveals nothing obvious.',
  },
  {
    question: 'BS EN IEC 62196-2:2022 — what changed from the 2017 edition?',
    options: [
      'Nothing',
      'The 2022 edition supersedes the 2017 edition with updated dimensional + interchangeability requirements + clarifications. UK installer practice: when verifying wallbox conformity, check the manufacturer DoC cites the current 2022 edition. Reg 722 cross-references the latest edition. Most 2025-26 wallboxes declare 2022 edition; some older inventory may still cite 2017',
      '2022 added DC fast charging to Type 2',
      '2022 removed Type 2',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN IEC 62196-2:2022 supersedes the 2017 edition. The standard family covers connector dimensions, interchangeability, durability, electrical performance and safety. The 2022 update reflects refinements + clarifications + alignment with the latest IEC text. UK installer practice: check the wallbox DoC cites BS EN IEC 62196-2:2022 (or the IEC equivalent). Most reputable UK 2025-26 wallbox manufacturers updated their DoCs to the 2022 edition. Older inventory may still cite 2017 (technically superseded; UK regulators usually accept transition). Cert evidence bundle records the standard edition cited.',
  },
  {
    question:
      'DLM (Dynamic Load Management) communicates the throttled current limit to the vehicle via what mechanism?',
    options: [
      'Wi-Fi message',
      'The Control Pilot (CP) PWM duty cycle. As the wallbox dynamically calculates the available current, it changes the CP PWM duty cycle to communicate the new limit; the vehicle reads the changed duty cycle and adjusts its charge draw. This happens in real time with sub-second response',
      'Mobile phone app',
      'Manual switch',
    ],
    correctAnswer: 1,
    explanation:
      'DLM modulates the CP PWM duty cycle to announce the available current limit. The vehicle continuously reads CP and adjusts its draw. Example: household load drops, wallbox can offer more current → CP duty cycle increases (e.g. from 25% / 16 A to 53% / 32 A); vehicle ramps up draw. Conversely, household load rises → CP duty cycle decreases; vehicle ramps down. The CP signalling protocol (per BS EN 61851-1) supports this dynamic adjustment by design. No customer-side intervention; happens automatically.',
  },
  {
    question:
      'A customer has a tethered 7.4 kW wallbox with a damaged cable end. What’s the remediation path?',
    options: [
      'Use Mode 2 instead',
      'Tethered wallboxes have manufacturer-specific cable replacement options: (1) some have replaceable connector-end assemblies (warranty service or DIY-friendly kit); (2) some require full cable replacement by manufacturer engineer; (3) some require full wallbox replacement (cable not separately serviceable). Customer’s warranty status + manufacturer support determine the path. EICR finding: damaged connector cable end = C2 (potential danger)',
      'Replace the EV',
      'Tape it up',
    ],
    correctAnswer: 1,
    explanation:
      'Tethered wallbox damaged cable is a real UK 2025-26 service scenario. Manufacturer-specific paths: some wallboxes have replaceable Type 2 connector heads on the cable (e.g. some Wallbox / Andersen models); some require the manufacturer engineer to replace the cable assembly; some require full wallbox replacement. Customer’s warranty status + age of unit determine cost. EICR coding: damaged connector / cable end with exposed conductors = C2 (potential danger, urgent remediation). Cable damage at strain-relief point near the connector is the typical failure mode after a few years of UK weather + plugging cycles.',
  },
  {
    question:
      'A customer’s untethered wallbox + their own 13 A-rated Mode 3 cable. Vehicle requests 32 A. What happens?',
    options: [
      'Cable burns out at 32 A',
      'The wallbox reads the PP resistor in the cable (1.5 kΩ = 13 A rating); the wallbox’s CP PWM duty cycle is capped to announce no more than 13 A regardless of the vehicle’s capability or the wallbox’s upstream supply. Vehicle draws ≤ 13 A. The PP signalling prevents the cable being driven beyond its rating',
      'Wallbox refuses to start',
      'No effect',
    ],
    correctAnswer: 1,
    explanation:
      'PP signalling protects the cable from over-driving. The cable’s PP resistor identifies its rating to the wallbox; the wallbox caps its CP duty cycle to that rating. Example: 7.4 kW wallbox (32 A capable) + customer’s 13 A travel cable → wallbox announces 13 A via CP PWM (16% duty cycle approximately); vehicle draws ≤ 13 A even though both sides are nominally capable of more. The protective signalling makes the Type 2 connector + cable family safe across the rating range (13 / 16 / 20 / 32 / 63 A). Customer-facing implication: charge speed limited by cable rating; recommend a 32 A cable for daily use with a 7 kW wallbox.',
  },
  {
    question:
      'How does the CP signal indicate that the customer has unplugged their vehicle mid-charge?',
    options: [
      'No indication',
      'The CP voltage transitions back to +12 V (open-circuit) when the connector is removed from the vehicle inlet. The wallbox detects this transition and immediately opens the internal contactor, removing AC from the cable. The Type 2 connector’s PP signal also breaks when unplugged — providing a redundant detection path. Combined response < 1 second',
      'Customer phones in',
      'Wallbox waits 30 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'CP voltage transition is the unplug detection. Plugged-in vehicle ready: CP at ±6 V. Vehicle unplugged: CP returns to ±12 V (open circuit). Wallbox immediately opens contactor; cable de-energised. The Type 2 connector also includes a mechanical latch that locks the connector while charging — vehicle must signal "OK to unlock" before the customer can pull the connector. PP signal also breaks at unplug (redundant detection path). The whole sequence (vehicle stops drawing → wallbox detects → contactor opens) completes in well under 1 second. Customer safety: pulling the connector mid-charge is mechanically prevented by the latch + electrically resolved by the signalling protocol.',
  },
];

const faqs = [
  {
    question: 'Can the customer use any Type 2 cable with an untethered wallbox?',
    answer:
      'Yes, provided the cable conforms to BS EN IEC 62196-2 (the connector standard) and BS EN 61851-1 (the Mode 3 charging protocol). Cable current rating (identified via PP signalling) limits the achievable charge rate. UK 2025-26 typical: 32 A 5-7 m Mode 3 cable for daily use; 13 A 1-3 m emergency travel cable. Customer-supplied cable shifts cable maintenance burden to customer. Cert evidence bundle records the wallbox SKU; customer cable is outside the install scope.',
  },
  {
    question: 'Why do some EVs charge slower than the wallbox rating?',
    answer:
      'Two reasons. (1) Vehicle’s on-board charger has a maximum AC charge rate — some EVs cap at 11 kW (3-phase 16 A) or 22 kW (3-phase 32 A) regardless of wallbox capability; UK single-phase 7.4 kW is the maximum the AC side can deliver anyway. (2) DLM is throttling — household load high, wallbox limits available current via CP. Customer education: charging speed is the LOWER of (vehicle max AC rate, wallbox rate, cable PP rating, DLM-available current). Cert evidence bundle records the wallbox + cable rating; vehicle rate is customer-side.',
  },
  {
    question:
      'How does the wallbox prevent the customer from accidentally pulling out the connector?',
    answer:
      'The Type 2 connector includes a mechanical latch that engages when plugged in. While the wallbox’s contactor is closed (charging in progress), the latch is locked and the connector cannot be pulled. To disconnect: customer presses unlock on the vehicle (key fob or app, depending on model); vehicle signals to wallbox "OK to disconnect" via CP; wallbox opens contactor; latch releases; customer can pull the connector. The whole sequence prevents arcing on disconnect (which would damage the connector pins). Some wallboxes also have a manual emergency-release on the wallbox itself.',
  },
  {
    question: 'How does the customer set the charging schedule?',
    answer:
      'Three layers, in order of priority: (1) Vehicle-side scheduling — most EVs have an in-vehicle scheduler ("charge between 02:00-05:00 on weekdays"); (2) Wallbox-side scheduling via the manufacturer app — overrides or coordinates with vehicle scheduler; (3) Tariff-side smart scheduling — Octopus Intelligent Go reads vehicle state + tariff windows + coordinates via the wallbox’s API. UK 2025-26 reality: most customers use a combination of vehicle scheduler + tariff smart-charging integration; manufacturer wallbox app is the override. Section 6.7 covers tariff integration in depth.',
  },
  {
    question: "What's the typical lifespan of a Type 2 connector / cable?",
    answer:
      'BS EN IEC 62196-2 specifies 10,000 mating cycles for the connector. UK 2025-26 daily charging customer plugs in ~365 times per year × 10 years = ~3,650 cycles — well within rating. Real-world failure modes: cable bend stress at the connector end (most common failure point); connector pin wear after many years; cable sheath UV degradation; physical damage from vehicles running over loose cable. Practical service life: 7-10 years for typical UK domestic usage with reasonable cable care. Tethered wallbox cables replace at 7-10 years; customer untethered cables similar.',
  },
];

export default function RenewableEnergyModule6Section6() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Connector, CP/PP signalling & dynamic load management | Renewable Energy 6.6 | Elec-Mate',
    description:
      'BS EN IEC 62196-2:2022 Type 2 connector standard. Tethered vs untethered wallbox decision. Control Pilot (CP) PWM signalling per BS EN 61851-1. Proximity Pilot (PP) resistance coding for cable rating. Dynamic Load Management (DLM) coordination via CP duty cycle.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · BS 7671:2018+A4:2026 · BS EN IEC 62196-2:2022 + BS EN 61851-1"
            title="Connector, CP/PP signalling & dynamic load management"
            description="The Type 2 connector standard (BS EN IEC 62196-2:2022), tethered vs untethered choice, Control Pilot (CP) PWM signalling protocol, Proximity Pilot (PP) cable-rating identification, and how DLM coordinates the EV charge rate via CP duty cycle."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN IEC 62196-2:2022 — Type 2 connector standard (supersedes 2017 edition). Dimensional + interchangeability + durability requirements for AC pin and contact-tube accessories. UK / EU standard EV connector.',
              'Type 2 connector — 7 pins: 3 phases (L1, L2, L3 — single-phase uses L1), Neutral, PE, CP (Control Pilot), PP (Proximity Pilot). Universal across UK / EU domestic and most public AC chargers.',
              'Tethered vs untethered. Tethered = cable permanent on wallbox; customer convenience. Untethered = socket on wallbox; customer cable in vehicle boot; flexibility. UK 2025-26: ~50/50 split.',
              'Control Pilot (CP) — ±12 V PWM signal between wallbox and vehicle. PWM duty cycle communicates the maximum available current (53% = 32 A; 16% = 10 A; etc.). Coordinates contactor closure, charging state, error detection.',
              'Proximity Pilot (PP) — resistance-coded signal in the cable. Resistor between PP and PE encodes cable rating (1.5 kΩ = 13 A; 220 Ω = 32 A; 100 Ω = 63 A). Wallbox caps its CP announcement to cable rating.',
              'CP voltage states: +12 V open (no vehicle); ±9 V (vehicle plugged in); ±6 V (vehicle ready, charging); other voltages = fault states. Vehicle unplug returns CP to +12 V; wallbox opens contactor.',
              'Dynamic Load Management (DLM) — wallbox throttles CP duty cycle in real time based on household current draw; vehicle reads and adjusts. Sub-second response. Reg 722.311.201 regulatory underpinning (M6.4).',
              'Mechanical latch on Type 2 connector locks while charging — vehicle signals OK before customer can disconnect. Prevents arcing on disconnect and accidental unplug.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify BS EN IEC 62196-2:2022 as the current Type 2 connector standard; verify wallbox DoC cites the 2022 edition.',
              'Compare tethered vs untethered wallbox install scenarios and select per customer needs + site exposure.',
              'Explain CP signalling: ±12 V PWM duty-cycle modulation announcing max available current; vehicle state transitions; contactor coordination.',
              'Decode PP signalling: cable resistor encodes current rating; wallbox caps CP announcement to PP-declared rating.',
              'Explain DLM operation via CP modulation: wallbox throttles in real time; vehicle complies; sub-second response.',
              'Diagnose common signalling faults: vehicle won’t start, intermittent disconnect, slower-than-expected charge rate.',
              'Apply mechanical latch logic: vehicle signals OK before customer can disconnect; prevents arcing.',
              'Document the connector + cable + signalling configuration in the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Type 2 plug looks simple. The signalling underneath is what makes Mode 3 a system
            instead of a socket.
          </Pullquote>

          <ContentEyebrow>Type 2 connector and the BS EN IEC 62196-2:2022 standard</ContentEyebrow>

          <ConceptBlock
            title="Type 2 — the UK / EU AC EV connector"
            plainEnglish="Type 2 is the universal UK / EU AC EV charging connector. 7-pin design: 3 phases + Neutral + PE + CP (Control Pilot) + PP (Proximity Pilot). Single-phase uses only L1 + N; three-phase uses L1, L2, L3 + N. Same physical connector covers both. Defined by BS EN IEC 62196-2:2022."
            onSite="Every UK 2025-26 EV ships with a Type 2 vehicle inlet (sometimes called the “Mennekes” connector after the original designer). Every UK Mode 3 wallbox provides a Type 2 socket (untethered) or tethered Type 2 cable. The connector standard guarantees interchangeability across vehicle / wallbox / cable brands."
          >
            <p>Type 2 connector details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">7 pins</strong> — L1, L2, L3 (three phases), N
                (neutral), PE (protective earth), CP (Control Pilot ±12 V signalling), PP (Proximity
                Pilot resistance-coded cable rating)
              </li>
              <li>
                <strong className="text-white">Single-phase use</strong> — L1 + N + PE + CP + PP
                active; L2 + L3 unused. UK 2025-26 domestic 7 kW wallbox single-phase
              </li>
              <li>
                <strong className="text-white">Three-phase use</strong> — L1 + L2 + L3 + N + PE + CP
                + PP all active. UK 2025-26 three-phase 22 kW wallbox (rare domestic, common
                commercial / fleet — M7 scope)
              </li>
              <li>
                <strong className="text-white">Current rating</strong> — BS EN IEC 62196-2 connector
                rated up to 63 A. PP signalling identifies the cable’s rating (13 / 20 / 32 / 63 A);
                the lower of cable / wallbox / vehicle limits charge speed
              </li>
              <li>
                <strong className="text-white">Mechanical latch</strong> — connector locks into
                vehicle inlet while charging. Prevents accidental unplug and arcing on disconnect
              </li>
              <li>
                <strong className="text-white">Standard family</strong> — BS EN IEC 62196-1
                (general); -2 (AC accessories — Type 2); -3 (DC accessories — CCS Combo 2 for Mode 4
                DC fast)
              </li>
              <li>
                <strong className="text-white">2022 edition</strong>
                supersedes 2017. Reputable UK 2025-26 wallboxes declare BS EN IEC 62196-2:2022
                conformity. Reg 722.421.1.7.201 AFDD exception requires this declaration
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.551.7.2 + BS EN IEC 62196-2:2022"
            clause="EV charging equipment shall include socket-outlets or vehicle connectors complying with BS EN IEC 62196-2:2022 (or current edition). Withdrawn: BS EN 62196-2:2017 — superseded for new conformity assessments."
            meaning="Reg 722.551.7.2 references the Type 2 connector standard. UK 2025-26 installer verifies the wallbox DoC cites BS EN IEC 62196-2:2022 (the current edition). The 2017 edition was withdrawn — older inventory may still cite it; UK regulators usually accept transition. Reg 722.421.1.7.201 AFDD conjunctive exception explicitly requires BS EN IEC 62196-2 conformity AND BS EN 61851 series conformity — both needed for AFDD to be omitted. Cert evidence bundle records the connector standard edition + manufacturer DoC reference."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Tethered vs untethered — the install decision</ContentEyebrow>

          <Pullquote>
            Tethered = wallbox carries the cable. Untethered = customer carries the cable. Both
            compliant; customer preference drives the choice.
          </Pullquote>

          <ConceptBlock
            title="Tethered wallbox"
            plainEnglish="The Type 2 cable is permanently attached to the wallbox (manufacturer-supplied, typically 5-7 m). Customer plugs the cable into their vehicle. Cable rating is fixed at the factory (typically 32 A for 7 kW models). Cable holster on the wallbox for storage between charges."
            onSite="Lower customer friction (no cable to remember in vehicle boot). Cable rating known and recorded in cert evidence bundle. Cable damage means manufacturer service call. Some brands have replaceable connector heads (DIY-friendly cable replacement); some require full cable assembly replacement."
          >
            <p>Tethered considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Customer convenience</strong> — plug into vehicle,
                charge, stow cable. No cable to remember
              </li>
              <li>
                <strong className="text-white">Cable rating fixed</strong> — typically 32 A for 7 kW
                wallboxes. Factory-matched to wallbox capability
              </li>
              <li>
                <strong className="text-white">Length trade-off</strong> — 5 m typical; 7 m for some
                models. Customer’s parking position must reach from wallbox
              </li>
              <li>
                <strong className="text-white">Damage repair</strong> — manufacturer-specific. Some
                replaceable connector heads; some full cable replacement; some full wallbox
                replacement
              </li>
              <li>
                <strong className="text-white">UK brands (typical)</strong> — Andersen A2, Hypervolt
                Home 3, MyEnergi Zappi (tethered variant), PodPoint Solo Tethered, EO Mini Pro 3
                Tethered
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — records wallbox SKU
                (tethered variant), cable length, cable rating, manufacturer serial number
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Untethered wallbox"
            plainEnglish="The wallbox provides a Type 2 socket; the customer brings their own Type 2 cable. Cable lives in the vehicle boot. Customer plugs both ends — one in wallbox, one in vehicle. Cable rating is whatever the customer has bought (typically 32 A for daily use)."
            onSite="Lower install cost (wallbox without integrated cable typically £50-100 cheaper). Customer flexibility on cable length / rating. Cable maintenance is customer responsibility. Cable theft / loss is a small but real risk if left out."
          >
            <p>Untethered considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Customer cable</strong> — kept in vehicle boot;
                typical domestic cable 5 m 32 A; emergency cable 1-3 m 13 A
              </li>
              <li>
                <strong className="text-white">Lower wallbox cost</strong> — ~£50-100 less than
                tethered equivalent
              </li>
              <li>
                <strong className="text-white">Cable flexibility</strong> — customer can buy longer
                cable, higher-rating, or specialist (e.g. coiled cable for tight parking)
              </li>
              <li>
                <strong className="text-white">Cable rating</strong> — PP signalling reads the
                cable’s resistor; wallbox caps its CP duty cycle accordingly. 13 A cable on a 32 A
                wallbox → charge limited to 13 A
              </li>
              <li>
                <strong className="text-white">UK brands (untethered variants)</strong> — PodPoint
                Solo Universal, Wallbox Pulsar Plus, EO Mini Pro 3 Universal, Easee Home, Tesla Wall
                Connector Gen 3
              </li>
              <li>
                <strong className="text-white">Cable storage</strong>— customer keeps cable in
                vehicle; wallbox socket covered when not in use (manufacturer-supplied socket cap or
                cover)
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — records wallbox SKU
                (untethered variant); customer cable not part of install scope (customer
                responsibility)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>CP and PP signalling protocol</ContentEyebrow>

          <ConceptBlock
            title="Control Pilot (CP) — the brain of the Mode 3 protocol"
            plainEnglish="Control Pilot is the ±12 V PWM signal between wallbox and vehicle that coordinates the entire charging sequence. The signal communicates: vehicle detection, vehicle readiness, max available current (via PWM duty cycle), charging in progress, faults, and disconnection. Without a healthy CP, no power flows."
            onSite="CP diagnostics are essential when troubleshooting “wallbox won’t charge” complaints. The wallbox’s app or display typically shows the CP voltage state. Manufacturer support can interpret unusual CP behaviour."
          >
            <p>CP signalling sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">No vehicle (open circuit)</strong> — CP voltage at
                +12 V, no PWM. Wallbox contactor open
              </li>
              <li>
                <strong className="text-white">Vehicle plugged in</strong> — vehicle adds resistance
                to CP-PE; CP voltage drops to +9 V. Wallbox detects "vehicle attached". PWM begins
                announcing available current
              </li>
              <li>
                <strong className="text-white">Vehicle ready to charge</strong> — vehicle further
                drops CP to +6 V signalling "ready". Wallbox closes contactor; AC flows; charging
                begins
              </li>
              <li>
                <strong className="text-white">Charging in progress</strong> — CP remains at ±6 V
                with PWM. Vehicle draws up to the PWM-announced current limit
              </li>
              <li>
                <strong className="text-white">Vehicle unplugged</strong> — CP returns to +12 V.
                Wallbox opens contactor within milliseconds. Power removed
              </li>
              <li>
                <strong className="text-white">Fault state</strong> — CP voltage outside the normal
                ±12 V / ±9 V / ±6 V states. Wallbox enters fault mode; display / app shows error
                code; contactor open
              </li>
              <li>
                <strong className="text-white">PWM duty cycle = current</strong> — IEC 61851-1 Annex
                A: 53% = 32 A; 40% = 24 A; 25% = 16 A; 16% = 10 A; 9% = 6 A (minimum Mode 3 charge
                rate). Wallbox modulates the duty cycle in real time for DLM
              </li>
              <li>
                <strong className="text-white">±12 V swing</strong> — CP is a bipolar signal.
                Positive half-cycle signals charging state; negative half-cycle is for vehicle
                acknowledgement timing. The bipolar nature also provides electrical safety isolation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Proximity Pilot (PP) — cable rating signalling"
            plainEnglish="Proximity Pilot is a static resistance signal in the cable that identifies the cable’s current rating to the wallbox. A resistor between PP and PE at each end of the cable encodes the rating. The wallbox reads PP at plug-in and limits its CP announcement to no more than the cable rating."
            onSite="PP signalling is what makes the Type 2 cable family safe — any cable can be used with any wallbox; the cable’s own resistor tells the wallbox the cable’s limit. Standard PP resistance values are defined by BS EN 61851-1 Annex B."
          >
            <p>Standard PP resistance codes (BS EN 61851-1 Annex B):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1.5 kΩ</strong> — cable rated 13 A (small emergency /
                travel cables)
              </li>
              <li>
                <strong className="text-white">680 Ω</strong> — cable rated 20 A
              </li>
              <li>
                <strong className="text-white">220 Ω</strong> — cable rated 32 A (most common UK
                domestic cable)
              </li>
              <li>
                <strong className="text-white">100 Ω</strong> — cable rated 63 A (commercial /
                fleet)
              </li>
              <li>
                <strong className="text-white">PP failure modes</strong> — damaged resistor inside
                cable connector body; cable read as no-PP-signal; wallbox won’t charge or charges at
                lowest safe rate
              </li>
              <li>
                <strong className="text-white">Diagnostic</strong> — check PP-to-PE resistance with
                multimeter at the cable end; should match one of the standard codes. Out-of-range =
                damaged cable, replace
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Type 2 connector cross-section + CP/PP signalling diagram. Left: Type 2 connector pin layout — 7 pins (L1, L2, L3, N, PE, CP, PP). Right: CP signalling timeline — +12 V no vehicle → +9 V vehicle plugged → +6 V vehicle ready + PWM announcing current → +12 V on unplug. Bottom: PP resistance values table (1.5 kΩ / 680 Ω / 220 Ω / 100 Ω = 13/20/32/63 A). Annotations: BS EN 61851-1 Annex A (CP) and Annex B (PP); BS EN IEC 62196-2:2022 connector dimensions; DLM modulates CP duty cycle in real time for current throttling."
            filename="renewable/m6s6-type-2-signalling.png"
          />

          <SectionRule />

          <ContentEyebrow>DLM coordination via CP modulation</ContentEyebrow>

          <ConceptBlock
            title="Real-time DLM through CP duty-cycle modulation"
            plainEnglish="Dynamic Load Management coordinates the EV charge rate by modulating the CP PWM duty cycle in real time. Wallbox reads household current → calculates available current for EV → updates CP duty cycle → vehicle reads new limit and adjusts draw. Sub-second response cycle."
            onSite="DLM is what makes Reg 722.311.201 load curtailment honest in the max demand calc. The hardware does the curtailment; the CP signalling delivers it to the vehicle; the vehicle complies. No customer-side intervention. Section 6.4 covered DLM from the regulatory + cable side; this section covers the signalling mechanism."
          >
            <p>DLM signalling sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Initial charge start</strong> — wallbox sets CP to
                announce full available current (e.g. 53% PWM = 32 A); vehicle begins drawing
              </li>
              <li>
                <strong className="text-white">Household load rises</strong> — electric shower
                starts; wallbox’s CT clamp reads increased household current; calculation says less
                available for EV (e.g. 16 A); wallbox modulates CP PWM to 25% duty (16 A); vehicle
                reads new limit and reduces draw within sub-second
              </li>
              <li>
                <strong className="text-white">Household load falls</strong> — shower stops; CT
                reads reduced household current; wallbox calculates more available (32 A again); CP
                PWM increases to 53%; vehicle ramps draw back up
              </li>
              <li>
                <strong className="text-white">Minimum charge rate</strong> — IEC 61851-1 sets 6 A
                as the minimum Mode 3 charge rate. If DLM calculation would require less than 6 A,
                the wallbox pauses charging entirely (CP held at vehicle-detected state without PWM
                signalling current). Vehicle waits. When more current becomes available, charging
                resumes
              </li>
              <li>
                <strong className="text-white">Coordination</strong>— sub-second cycle. Vehicle
                doesn’t experience abrupt changes; the on-board charger adjusts smoothly. No
                customer-visible disruption
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Customer reports wallbox won’t start charging"
            situation="Customer calls: plugged the EV in, the wallbox shows green ready light, but no charging is happening. EV displays “waiting for charging” message. Customer has tried unplugging and re-plugging twice."
            whatToDo="Signalling diagnostic first, not power-side. Open the wallbox manufacturer app — should show CP state. Common CP-side causes: (1) vehicle’s built-in scheduler is active — set to charge only off-peak (e.g. 02:00-05:00 on Octopus Intelligent Go); customer plugged in at 18:00, vehicle waiting until 02:00. Check vehicle scheduler. (2) PP signal showing no-cable-detected; manufacturer app reports cable error; try a different cable. (3) Vehicle firmware paused charging (over-temperature, battery management). Vehicle support line. (4) Wallbox firmware mismatch with vehicle firmware (recent OTA on either side); manufacturer support for firmware reset. (5) Tariff-side smart scheduling holding back; check Octopus app. Power-side checks (CB tripped, RCBO open) come after signalling diagnostics. Most “won’t charge” calls resolve as scheduler / signalling, not power."
            whyItMatters="UK 2025-26 reality: most “won’t charge” customer support calls are signalling or scheduler problems, not electrical faults. The wallbox is healthy, the cable is healthy, the supply is healthy — but the CP signalling is in a state the customer doesn’t expect. Customer education at handover should cover the scheduler logic (vehicle scheduler + wallbox app + tariff smart-charging) so the customer knows where to look first."
          />

          <CommonMistake
            title="Customer using a 13 A travel cable with their 7 kW wallbox and complaining of slow charging"
            whatHappens="Customer’s daily charging routine is using the emergency 13 A travel cable that came with their EV — not the 32 A daily-use cable. PP signalling reads 1.5 kΩ → wallbox caps current to 13 A → charge rate ~3 kW instead of 7 kW. Customer complains the install is slow."
            doInstead="Diagnostic: ask the customer to send a photo of the cable they’re using. Look for the cable’s rating on its label (13 A vs 32 A). Educate the customer that the wallbox + their daily-use cable both need to match for full 7 kW charging. Recommend a dedicated 32 A 5-7 m Mode 3 cable for home use (~£100-200 cost); keep the 13 A travel cable for emergency away-from-home use. PP signalling is doing its job (protecting the 13 A cable from being overdrawn); the customer just has the wrong cable for the use case."
          />

          <CommonMistake
            title="Connecting CP / PP signal wires to the wrong terminals"
            whatHappens="During wallbox install, the installer terminates the cable into the wallbox without checking the CP / PP signal terminals — accidentally crossing them or shorting one to PE. The wallbox refuses to detect the vehicle (CP shows no signal change on plug-in) or reads incorrect cable rating (PP misread). Customer can’t charge."
            doInstead="Follow the wallbox manufacturer’s terminal diagram exactly. For tethered wallboxes, the factory cable termination handles this; the installer just needs to verify nothing was disturbed. For untethered wallboxes, the manufacturer’s Type 2 socket has clearly-marked CP and PP terminals; cross-reference the wiring diagram. Cert evidence bundle includes a wiring photo at handover for future EICR reference."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN IEC 62196-2:2022 is the current Type 2 connector standard. Supersedes 2017 edition. UK / EU domestic AC charging connector.',
              'Type 2 has 7 pins: L1, L2, L3, N, PE, CP, PP. Single-phase uses L1; three-phase uses all three. Same connector covers both.',
              'Tethered = cable on wallbox, customer convenience. Untethered = socket on wallbox, customer cable in vehicle, flexibility. UK 2025-26: ~50/50 split.',
              'Control Pilot (CP) = ±12 V PWM signal between wallbox and vehicle per BS EN 61851-1. PWM duty cycle communicates max current (53% = 32 A; 16% = 10 A; etc.).',
              'CP voltage states: +12 V no vehicle; +9 V vehicle plugged; +6 V vehicle ready (charging); back to +12 V on unplug. Wallbox uses CP voltage to control contactor.',
              'Proximity Pilot (PP) = resistance-coded signal identifying cable current rating. 1.5 kΩ = 13 A; 220 Ω = 32 A; 100 Ω = 63 A. Wallbox caps CP announcement to PP rating.',
              'DLM (Dynamic Load Management) throttles via CP duty cycle modulation in real time. Sub-second response. Reg 722.311.201 regulatory underpinning (M6.4).',
              'Type 2 connector mechanical latch locks during charging; vehicle signals OK before customer can disconnect. Prevents arcing and accidental unplug.',
              'Diagnostics: most "won’t charge" customer complaints are signalling / scheduler issues, not electrical faults. Check CP state via wallbox app first.',
              'Cert evidence bundle: wallbox SKU (tethered or untethered), cable rating (tethered = factory; untethered = customer responsibility), BS EN IEC 62196-2 edition, signalling commissioning test result.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Outdoor install — IP, location, mounting
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.7 Smart Charge Points Regulations + tariffs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
