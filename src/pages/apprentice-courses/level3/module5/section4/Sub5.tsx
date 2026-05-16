/**
 * Module 5 · Section 4 · Subsection 5 — Prospective Fault Current (PFC) + PSCC + voltage drop
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.4
 *   AC 6.4 — "state the methods for verifying protection by automatic disconnection of supply"
 * Layered: GN3 PFC / PSCC measurement, BS 7671 Reg 643.7, voltage drop per Reg 525
 *
 * Frame: the supply-origin live tests that complement Zs and RCD verification
 * — Prospective Earth Fault Current (PEFC) from L-E loop, Prospective Short
 * Circuit Current (PSCC) from L-N loop, the higher of the two reported as
 * Ipf (PFC) for breaking-capacity check, and voltage drop measurement for
 * Reg 525 compliance verification on long runs.
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

const TITLE = 'PFC + PSCC + voltage drop measurement | Level 3 Module 5.4.5 | Elec-Mate';
const DESCRIPTION =
  'Prospective Fault Current (PFC) measurement at the supply origin — PEFC from L-E loop and PSCC from L-N loop, the higher reported as Ipf for protective device breaking-capacity check. Plus voltage drop verification under load per Reg 525 (typical 3 percent lighting / 5 percent other).';

const checks = [
  {
    id: 'm5-s4-sub5-pfc',
    question: 'Prospective Fault Current (PFC) reported on the EIC is:',
    options: [
      'The average of L-N and L-E readings.',
      'The HIGHER of the two: PSCC (Prospective Short Circuit Current, measured L-N) and PEFC (Prospective Earth Fault Current, measured L-E). The reported PFC is used to verify the breaking capacity of the protective devices — every device upstream of the test point must have a breaking capacity (Icn) at least equal to the PFC. For a typical UK domestic with TN-C-S supply: PSCC may be 800-2000 A; PEFC 400-1200 A; PFC reported is the higher value.',
      'Only the L-N reading.',
      'Only the L-E reading.',
    ],
    correctIndex: 1,
    explanation:
      'PFC = max(PSCC, PEFC). The higher value is what the protective devices must be able to break safely. On TN-C-S supplies PSCC is typically the higher value because the L-N path has lower impedance than L-E (the latter includes the consumer\'s neutral-earth bond and the supplier\'s combined PEN). Modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) compute PFC automatically from the dual L-N and L-E measurements during a 3-lead Zs test.',
  },
  {
    id: 'm5-s4-sub5-no-need-pfc',
    question: 'Under what condition does BS 7671 / GN3 say you do NOT need to measure or calculate PFC at the origin?',
    options: [
      'Always have to measure.',
      'In dwellings or similar premises where a consumer unit to BS EN 61439-3 is used AND the maximum prospective fault current declared by the distributor is 16 kA. The combination of a CU rated for 16 kA fault current AND the distributor\'s declared 16 kA cap means the PFC at the origin will not exceed the CU\'s breaking capacity by design — no measurement needed. Outside dwellings, or with a non-BS EN 61439-3 distribution board, or where the distributor declares above 16 kA, measurement / calculation IS required.',
      'Never have to measure.',
      'Only on commercial.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 specifically allows this exemption for typical UK domestic installations using a BS EN 61439-3 consumer unit (which is rated for 16 kA fault current) on a supply where the distributor confirms PFC will not exceed 16 kA. For these installations the design-by-conformance principle means the protective devices are matched to the supply by virtue of the standards. For commercial / industrial installations or non-conforming CUs, direct PFC measurement at the origin is required.',
  },
  {
    id: 'm5-s4-sub5-pfc-formula',
    question: 'How does an MFT derive the PFC from a loop impedance measurement?',
    options: [
      'It guesses.',
      'PFC = nominal mains voltage / measured loop impedance. For a UK 230 V supply with measured Zs of 0.5 Omega: PFC = 230 / 0.5 = 460 A. The instrument applies this formula automatically from its loop impedance measurement; some MFTs display PFC as a separate reading after the Zs test, others compute on demand. The formula assumes nominal supply voltage; for accurate PFC during periods of low supply voltage, multiply the displayed PFC by (actual voltage / 230) for correction.',
      'Multiplies by RCD I delta n.',
      'Divides by frequency.',
    ],
    correctIndex: 1,
    explanation:
      'PFC = U / Z is the basic Ohm\'s law derivation — voltage divided by loop impedance gives the prospective current. Modern MFTs do this automatically. The reading is "prospective" because it\'s the current that WOULD flow under a bolted (zero-impedance) fault at the test point — the actual fault current would be slightly less if there\'s any fault impedance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'On a typical UK domestic with TN-C-S supply, BS EN 61439-3 consumer unit, and a 100 A BS 1361 Type II main fuse upstream, what\'s the practical approach to PFC verification?',
    options: [
      'Detailed PFC measurement at every test point.',
      'GN3 allows omission of origin PFC measurement for this combination — BS EN 61439-3 CU rated 16 kA, TN-C-S supply with distributor-declared PFC at 16 kA maximum. Take the distributor\'s declared 16 kA as the design value, document on the EIC. For non-conforming installations or commercial / industrial work, direct measurement is required.',
      'Only measure on lighting circuits.',
      'No verification needed at all.',
    ],
    correctAnswer: 1,
    explanation:
      'The exemption is specific to dwellings with BS EN 61439-3 CUs on supplies where the distributor declares PFC at or below 16 kA. This covers the vast majority of UK domestic installations. For commercial / industrial premises or non-standard CUs, direct measurement is required. The EIC has a field for the recorded PFC; either fill in the measured value or note "16 kA per distributor declaration" for the exempt case.',
  },
  {
    id: 2,
    question: 'PSCC and PEFC are different. What does each represent?',
    options: [
      'Same thing.',
      'PSCC (Prospective Short Circuit Current) = the current that would flow in an L-N short-circuit fault, measured by the MFT applying brief test current via the L-N loop. Represents short-circuit fault scenarios. PEFC (Prospective Earth Fault Current) = the current that would flow in an L-E earth fault, measured by the MFT applying brief test current via the L-E loop. Represents earth-fault scenarios. The two are measured separately during a 3-lead Zs test; the higher value is reported as Ipf (PFC) for breaking-capacity verification.',
      'PSCC is for AC, PEFC is for DC.',
      'They\'re identical.',
    ],
    correctAnswer: 1,
    explanation:
      'The two prospective fault currents address different fault scenarios. PSCC for L-N short circuits (the fault current flowing through the line-neutral path); PEFC for L-E earth faults (the fault current flowing through the line-earth path). Both are quoted on the EIC; the higher of the two becomes the PFC against which protective device breaking capacity is verified.',
  },
  {
    id: 3,
    question: 'Why does the protective device breaking capacity (Icn) need to exceed the PFC at the device\'s installation point?',
    options: [
      'It doesn\'t.',
      'A protective device opens a fault circuit by interrupting fault current. The breaking capacity (Icn) is the maximum current the device can safely interrupt without damage to the device or risk of the fault current continuing across the device contacts. If the actual fault current (PFC) exceeds Icn, the device may fail to clear the fault — contacts may weld together, the device case may rupture, the fault may persist. For a typical Type B 32 A MCB the Icn is typically 6 kA; for a CU the busbar Icn is typically 16 kA. Both must exceed the PFC at their installation point.',
      'Random.',
      'Only on three-phase.',
    ],
    correctAnswer: 1,
    explanation:
      'The breaking capacity is the safety-critical specification. A device that can\'t break the prospective fault current safely is a hazard. This is why PFC measurement / declaration matters — it\'s how you verify the protective devices are fit for the supply they\'re on. Most UK domestic devices are rated 6 kA Icn, sufficient for typical UK supplies up to about 1 kA actual PFC. For commercial / industrial installations with higher PFC, higher-rated devices (10 kA, 25 kA) are needed.',
  },
  {
    id: 4,
    question: 'A4:2026 / BS 7671 Reg 525 voltage drop limits are typically:',
    options: [
      '50 percent for everything.',
      '3 percent for lighting circuits, 5 percent for other circuits (sockets, fixed loads). Measured from the origin of the installation to the load. Verified by calculation during design (cable size + length + load) and confirmed by measurement under load during commissioning if there\'s any doubt. On long runs (above 30-40 m), voltage drop becomes the limiting factor in cable size selection — often requiring a larger cable than overcurrent protection alone would dictate.',
      '20 percent universal.',
      '10 percent for lighting only.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525 sets the voltage drop limits for normal operation. 3 percent for lighting (because flicker on lighting is the most user-visible quality issue), 5 percent for other circuits (sockets, fixed appliances, motors). For a 230 V supply: 3 percent = 6.9 V; 5 percent = 11.5 V. These are the maximum permitted drops under full design load. Verify by calculation during design; spot-check by measurement under load on long runs.',
  },
  {
    id: 5,
    question: 'How do you measure voltage drop in service on a long socket-outlet circuit?',
    options: [
      'Just look at the breaker.',
      'Two-step measurement. (1) Measure the supply voltage at the consumer unit (or the origin of the circuit) under no-load — typically 235-245 V on UK 230 V supply. (2) Apply a known significant load at the furthest point of the circuit (e.g. plug in a 2 kW load — fan heater, kettle, test load resistor). Measure the voltage at the same point. Voltage drop = (no-load voltage) - (loaded voltage). Express as percentage of nominal: drop / 230 x 100. Compare against Reg 525 limits.',
      'Random.',
      'Only at design.',
    ],
    correctAnswer: 1,
    explanation:
      'The two-point measurement under load gives the actual voltage drop in service. A 2 kW load draws about 8.7 A — significant on a 32 A circuit. Voltage drop measured this way reflects the cable resistance and any termination losses. For a Reg 525 verification, compare to the 5 percent limit (11.5 V on 230 V) for socket circuits or 3 percent (6.9 V) for lighting.',
  },
  {
    id: 6,
    question: 'What\'s the relationship between Zs (loop impedance) and voltage drop?',
    options: [
      'Unrelated.',
      'They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.',
      'Same thing.',
      'Voltage drop only matters at fault.',
    ],
    correctAnswer: 1,
    explanation:
      'Both tests share the cable resistance contribution. A long run with high R1+R2 will have both a higher Zs (worse fault clearance) and a higher voltage drop (worse normal-operation quality). When one fails, check the other. The fixes are typically the same — larger cable, shorter run, fewer joints, better terminations.',
  },
  {
    id: 7,
    question: 'A 32 A radial socket circuit feeds an EV charger 35 m from the CU via 6 mm cable. What\'s the expected voltage drop at full charge (32 A)?',
    options: [
      '0.1 V.',
      'Approximately 4.6 V or 2.0 percent of 230 V. Calculation: 6 mm copper cable has approximately 7.3 mV per A per metre voltage drop. 32 A x 35 m x 7.3 mV = 8.18 V single-direction. For circuit voltage drop the full path is line + neutral so multiply by 2 / cable factors per GN1: but the standard cable tables give the per-A-per-m value already accounting for the full loop. Check GN1 Table A1 for the exact value for the cable type. For 6 mm flat T+E with thermosetting insulation: typical 7.3 mV/A/m so 32 x 35 x 7.3 / 1000 = 8.18 V or 3.6 percent — within 5 percent socket limit but close. Worth checking the EV charger spec for its actual demand under typical use (often 28-30 A continuous, not full 32 A).',
      '50 V.',
      'Cannot calculate.',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop calculation uses the cable\'s mV/A/m value from GN1 Table A1. For 6 mm copper cable approximately 7.3 mV/A/m. At 32 A x 35 m the drop is 8.18 V or 3.6 percent — within the 5 percent socket-circuit limit but noteworthy. EV chargers running at sustained high current can push borderline cable selections into measurable voltage drop in service. Quote bigger cable on long EV runs (10 mm not 6 mm) where the cost difference is small relative to the install cost.',
  },
  {
    id: 8,
    question: 'PFC verification at supply origin on a small commercial installation (200 A 3-phase TN-S supply): what would you expect to see?',
    options: [
      'Same as domestic.',
      'Higher than typical UK domestic. PSCC may be 5-15 kA depending on the supply transformer size and the cable run from substation to consumer. PEFC typically 50-80 percent of PSCC. Protective devices need higher Icn — typically 10 kA or 25 kA for the main switchgear and downstream MCBs / RCBOs at the distribution boards. Direct measurement at the origin is required (the BS EN 61439-3 16 kA exemption applies only to dwellings). Document on the EIC against the device Icn ratings.',
      'Always 16 kA.',
      'Always 1 kA.',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial supplies typically have higher PFC than domestic because the supply transformers are larger and the cables shorter. The 16 kA dwelling exemption does not apply. Direct measurement is required and the protective devices must have Icn meeting or exceeding the measured PFC. Modern industrial MCBs and switchgear are available with Icn up to 50 kA or higher.',
  },
];

const faqs = [
  {
    question: 'What does the distributor mean when they "declare" 16 kA PFC?',
    answer:
      'UK Distribution Network Operators (DNOs — National Grid, UKPN, Northern Powergrid, etc.) publish standard declared maximum prospective fault current values for typical supplies. For most domestic supplies the declared value is 16 kA. This is the worst-case value the DNO commits not to exceed at the consumer\'s cut-out. By using a BS EN 61439-3 consumer unit (rated 16 kA) the design is matched to the declared value — no measurement needed. For larger supplies (200 A 3-phase, three-phase commercial / industrial), the DNO may declare different values per supply — check the distributor\'s connection certificate.',
  },
  {
    question: 'My MFT shows PSCC = 1.2 kA and PEFC = 0.85 kA. What\'s the PFC?',
    answer:
      'The higher value: PFC = 1.2 kA (the PSCC). Document on the EIC as PFC = 1.2 kA. The protective devices need Icn at least 1.2 kA — typical UK domestic 6 kA MCBs / RCBOs comfortably exceed this. The PEFC is also documented (some EIC formats have separate fields for PSCC and PEFC); the PFC reported for breaking-capacity check is the higher of the two.',
  },
  {
    question: 'How do I measure voltage drop in practice?',
    answer:
      'Two-point measurement under load. (1) Measure no-load voltage at the consumer unit — typically 235-245 V on UK supply. (2) Apply a significant load at the furthest point of the circuit (a 2 kW heater is a useful test load — about 8.7 A on 230 V). Measure voltage at the same point under load. Drop = no-load minus loaded. Convert to percentage: drop / 230 x 100. Compare against Reg 525 limits (3 percent lighting, 5 percent other). For more accurate testing, use a dedicated voltage drop meter or an MFT with voltage drop function — modern instruments can apply a defined test load and compute drop automatically.',
  },
  {
    question: 'Does the supply voltage variation affect PFC readings?',
    answer:
      'Yes — PFC = U / Z, so a higher supply voltage gives a higher computed PFC for the same loop impedance. UK supply voltage varies in the 216-253 V range (230 V nominal, plus 10 percent / minus 6 percent). At 253 V supply the PFC for a 0.5 Omega loop is 506 A; at 216 V it\'s 432 A. The MFT typically uses 230 V nominal in its calculation; the actual PFC during a real fault depends on the supply voltage at that moment. For verification work the nominal-voltage calculation is sufficient — the breaking capacity check has built-in margin.',
  },
  {
    question: 'Why is voltage drop a separate test from Zs if both depend on cable resistance?',
    answer:
      'They measure different things. Zs measures the impedance of the L-E loop for fault-clearance verification (will the protective device disconnect within Table 41.1 time?). Voltage drop measures the L-N voltage loss under normal load for service-quality verification (will lights flicker, will motors run too slowly, will electronic loads operate within tolerance?). Both depend on cable resistance but the path is different (L-E for Zs, L-N for voltage drop) and the criteria are different (fault disconnection time for Zs, percentage drop under load for voltage drop). Both tests are part of complete commissioning verification.',
  },
  {
    question: 'What if PFC at the origin exceeds the device Icn?',
    answer:
      'Engineering action required. Options: (1) Replace the protective devices with higher-Icn versions (Type B MCBs are available up to 25 kA). (2) Add an upstream current-limiting device (HRC fuse) that reduces the let-through energy before it reaches the downstream MCB. (3) Re-design the supply to reduce PFC (rare — usually means working with the DNO on supply impedance). The simplest fix is typically higher-Icn devices; the cost premium is small for commercial / industrial installations and is mandatory for safety. Document the calculation and the chosen approach on the certificate.',
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 5"
            title="PFC + PSCC + voltage drop measurement"
            description="Prospective Fault Current at the supply origin — PSCC from L-N loop, PEFC from L-E loop, the higher reported as Ipf for protective device breaking-capacity check. Plus voltage drop verification under load per Reg 525 (3 percent lighting / 5 percent other)."
            tone="emerald"
          />

          <TLDR
            points={[
              "PFC = max(PSCC, PEFC). PSCC is L-N short-circuit prospective current; PEFC is L-E earth-fault prospective current. Both measured during 3-lead Zs test. Higher value reported as Ipf.",
              "PFC verifies protective device breaking capacity (Icn). Each device upstream of the test point must have Icn at least equal to the PFC at that point. Domestic 6 kA typical; commercial / industrial 10-25 kA.",
              "GN3 exempts dwellings using BS EN 61439-3 consumer unit on supplies where distributor declares 16 kA maximum — no PFC measurement needed. Outside dwellings or non-conforming CUs, measurement required.",
              "PFC formula: PFC = nominal voltage / measured loop impedance. UK 230 V at 0.5 Omega loop = 460 A prospective. MFTs compute automatically.",
              "Voltage drop per Reg 525: 3 percent lighting, 5 percent other. Verify by calculation at design; measure under load on long runs. EV chargers and other long high-current circuits often need bigger cable for voltage drop than overcurrent alone dictates.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish PSCC (L-N short circuit) from PEFC (L-E earth fault) and report the higher as PFC (Ipf) for breaking-capacity verification.",
              "Apply the GN3 exemption for typical UK dwellings (BS EN 61439-3 consumer unit + 16 kA distributor declaration) — no origin PFC measurement required.",
              "Carry out direct PFC measurement at the supply origin where required (commercial, industrial, non-conforming CUs).",
              "Verify protective device breaking capacity (Icn) against the measured / declared PFC at the device installation point.",
              "Apply Reg 525 voltage drop limits (3 percent lighting, 5 percent other) and measure voltage drop under load on long circuit runs.",
              "Calculate expected voltage drop from cable size, length and load using GN1 Table A1 mV/A/m values.",
              "Recognise the relationship between Zs and voltage drop — both depend on cable resistance; a borderline result on one often indicates a borderline result on the other.",
              "Document PFC, PSCC, PEFC and voltage drop on the EIC with appropriate reference to the test method and reported value.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>PFC, PSCC, PEFC — what each represents</ContentEyebrow>

          <ConceptBlock
            title="Three terms for prospective fault current"
            plainEnglish="PFC (Prospective Fault Current) is an umbrella term for the current that would flow in a fault — measured at a specific test point with assumed zero fault impedance. It comes in two flavours: PSCC (short-circuit, L-N path) and PEFC (earth fault, L-E path). The higher of the two is reported on the EIC as the design PFC for breaking-capacity verification."
            onSite="Most modern MFTs measure both PSCC and PEFC during a 3-lead Zs test and display the higher value as PFC. Document on the EIC: typically PFC reported alongside Ze and Zs at the supply origin. The reported PFC is what the protective devices must be able to break safely."
          >
            <p>The three terms in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PSCC (Prospective Short Circuit Current).</strong> Measured by the MFT
                applying brief test current via the L-N loop. Represents the worst-case current
                that would flow in an L-N bolted short circuit at the test point. Typical UK
                domestic origin: 800-2000 A.
              </li>
              <li>
                <strong>PEFC (Prospective Earth Fault Current).</strong> Measured by the MFT
                applying brief test current via the L-E loop. Represents the worst-case current
                that would flow in an L-E bolted earth fault at the test point. Typical UK
                domestic origin: 400-1200 A (typically lower than PSCC because the L-E path
                includes the supplier\'s earthing arrangement which has higher impedance than the
                pure L-N path).
              </li>
              <li>
                <strong>PFC (Prospective Fault Current).</strong> The higher of PSCC and PEFC.
                Reported on the EIC as Ipf. Used to verify protective device breaking capacity
                (Icn). The "headline" prospective fault current.
              </li>
              <li>
                <strong>Formula.</strong> PFC = nominal supply voltage / measured loop impedance.
                For UK 230 V at 0.5 Omega loop = 460 A. Modern MFTs apply this automatically from
                the loop impedance measurement.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — PFC measurement and the BS EN 61439-3 dwelling exemption"
            clause="In dwellings (household) or similar premises, where a consumer unit to BS EN 61439-3 is used and the maximum prospective fault current declared by the distributor is 16 kA, it is not necessary to measure or calculate prospective fault current at the origin of the supply."
            meaning={
              <>
                The exemption applies to dwellings using the standard UK domestic consumer unit
                (BS EN 61439-3, rated 16 kA fault current) on a supply where the DNO declares PFC
                at 16 kA maximum. The combination is matched by design. For commercial /
                industrial installations or non-conforming CUs, direct PFC measurement at the
                origin is required. Document the basis on the EIC: either the measured value or
                "16 kA per distributor declaration" for the exempt dwelling case.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, PFC measurement guidance."
          />

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Ze and PFC at the origin — single-phase supply"
            caption="The PFC measurement uses the same L-N and L-E loop test as Ze, just reported as prospective current rather than impedance. Same instrument, same connections, different output column on the EIC."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The dwelling exemption — when you don\'t have to measure</ContentEyebrow>

          <ConceptBlock
            title="The BS EN 61439-3 + 16 kA-declared shortcut"
            plainEnglish="GN3 lets you skip the origin PFC measurement on typical UK domestic installations because the design is pre-matched to the supply. A BS EN 61439-3 consumer unit is rated 16 kA fault current; UK DNOs typically declare 16 kA maximum PFC for domestic supplies. The combination means PFC at the origin will not exceed the CU\'s breaking capacity by design — no measurement needed."
            onSite={`On the EIC for a typical domestic install with BS EN 61439-3 CU, fill the PFC field as "16 kA per distributor declaration" or similar. No instrument measurement needed. For larger supplies, commercial / industrial premises, or non-conforming CUs, direct measurement is required.`}
          >
            <p>The exemption conditions (all must be true):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Premises type.</strong> Dwelling (household) or similar — typical
                domestic single occupancy, flat, maisonette. Not commercial, not industrial.
              </li>
              <li>
                <strong>Consumer unit.</strong> Conforms to BS EN 61439-3 (the UK consumer-unit
                product standard). Rated 16 kA fault current (the standard rating for this
                product category).
              </li>
              <li>
                <strong>Distributor declaration.</strong> The DNO declares maximum PFC at the
                supply of 16 kA. UK DNOs typically declare this for standard domestic supplies.
              </li>
            </ul>
            <p>When measurement is required (any of these):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Commercial premises.</strong> Office, retail, hospitality, light industrial.
              </li>
              <li>
                <strong>Heavy industrial.</strong> Manufacturing, processing, large workshop.
              </li>
              <li>
                <strong>Non-conforming distribution board.</strong> Bespoke industrial board, modular distribution panel, anything not BS EN 61439-3.
              </li>
              <li>
                <strong>DNO declares above 16 kA.</strong> Larger supplies (200 A 3-phase, dedicated commercial supplies) often have higher declared PFC. Check the connection certificate.
              </li>
              <li>
                <strong>Three-phase supplies.</strong> Even on dwellings, 3-phase supplies have different fault current characteristics and benefit from direct measurement.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Direct PFC measurement — the practical test</ContentEyebrow>

          <ConceptBlock
            title="Measuring PFC at the supply origin"
            plainEnglish="When direct PFC measurement is required, you take it at the supply origin (the incoming meter tails or the main switch). The MFT does it as part of the loop impedance test — apply the 3-lead Zs test, the instrument computes PSCC and PEFC from the L-N and L-E measurements, the higher is the PFC."
            onSite="On commercial / industrial installations the PFC measurement is part of the live verification at the supply origin. Sequence: connect to supply origin, set MFT to Zs / PFC mode, run 3-lead test, record PSCC and PEFC, document the higher as PFC. Typical commercial PFC values 5-15 kA, industrial 10-30 kA."
          >
            <p>Direct measurement procedure:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify supply energised.</strong> Main switch closed, supply voltage
                reading L-N within nominal range (216-253 V for UK 230 V).
              </li>
              <li>
                <strong>Connect MFT.</strong> 3-lead test connections to L, N, E at the supply
                origin (meter tails or main switch terminals). Use insulated probes per GS38.
              </li>
              <li>
                <strong>Set MFT to Zs / PFC mode.</strong> Modern MFTs combine Zs and PFC in a
                single test cycle. For older instruments, separate L-N (PSCC) and L-E (PEFC)
                tests may be needed.
              </li>
              <li>
                <strong>Press TEST.</strong> Instrument applies brief test currents via L-N and
                L-E, computes loop impedances, derives PSCC and PEFC. Display shows both readings
                and / or the higher value as PFC.
              </li>
              <li>
                <strong>Record both PSCC and PEFC.</strong> The EIC has fields for both (or for
                PFC alone — check the certificate format). Document the higher as the PFC for
                breaking-capacity verification.
              </li>
              <li>
                <strong>Cross-check against device Icn.</strong> Every protective device upstream
                of the test point must have Icn at least equal to the PFC. Verify each
                device\'s Icn rating from the manufacturer datasheet.
              </li>
              <li>
                <strong>If PFC exceeds Icn:</strong> Replace devices with higher-Icn versions, or
                add upstream current-limiting protection. Document the design action on the EIC.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="IET Guidance Note 3 — PFC derived from loop impedance"
            clause="To obtain the prospective fault current when using loop-impedance-based instruments, calculate the current by dividing the nominal mains voltage (expressed in volts) by the measured loop impedance value (expressed in ohms). The result is the prospective fault current in amperes. Test instruments used for loop impedance measurement may also offer additional facilities for deriving prospective fault current."
            meaning={
              <>
                The PFC formula is straightforward Ohm\'s law — voltage divided by impedance.
                Modern MFTs apply this automatically from the loop impedance reading. For UK
                230 V at a measured 0.5 Omega loop = 460 A prospective. The reading is
                "prospective" because it represents the current that WOULD flow under a bolted
                (zero-impedance) fault at the test point.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, PFC derivation guidance."
          />

          <SectionRule />

          <ContentEyebrow>Voltage drop — Reg 525 verification</ContentEyebrow>

          <ConceptBlock
            title="The Reg 525 voltage drop limits and how to verify them"
            plainEnglish="Reg 525 sets maximum voltage drop limits for normal operation: 3 percent for lighting, 5 percent for other circuits. The limits ensure lights don\'t flicker, motors run at design speed, and electronic loads operate within tolerance. Verify by calculation during design (cable size + length + load + GN1 Table A1 mV/A/m) and measure under load on long runs where the calculation is borderline."
            onSite="For typical short domestic runs (under 20 m), voltage drop is rarely the limiting factor — overcurrent protection sets the cable size. For longer runs (above 30-40 m), voltage drop becomes the limiting factor and may require a larger cable than overcurrent alone dictates. EV chargers, garden offices, outbuildings on long radial runs are the typical cases."
          >
            <p>The Reg 525 limits in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting circuits: 3 percent.</strong> 3 percent of 230 V = 6.9 V maximum
                drop from origin to load. Tighter limit because flicker is the most user-visible
                quality issue with lighting.
              </li>
              <li>
                <strong>Other circuits: 5 percent.</strong> 5 percent of 230 V = 11.5 V maximum
                drop. Covers sockets, fixed appliances, motors, water heaters, EV chargers.
              </li>
              <li>
                <strong>Verification by calculation (design phase).</strong> mV/A/m from GN1
                Table A1 x current x length. Compare against the limit. For 6 mm copper at
                7.3 mV/A/m, 32 A x 35 m = 8.18 V or 3.6 percent — within socket limit.
              </li>
              <li>
                <strong>Verification by measurement (commissioning, optional).</strong> Two-point
                voltage measurement under load: no-load voltage at origin minus loaded voltage
                at furthest point. Express as percentage of 230 V. Compare against limit.
              </li>
            </ul>
            <p>Typical mV/A/m values from GN1 Table A1 (copper, thermosetting insulation):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 mm:</strong> 44 mV/A/m
              </li>
              <li>
                <strong>1.5 mm:</strong> 29 mV/A/m
              </li>
              <li>
                <strong>2.5 mm:</strong> 18 mV/A/m
              </li>
              <li>
                <strong>4 mm:</strong> 11 mV/A/m
              </li>
              <li>
                <strong>6 mm:</strong> 7.3 mV/A/m
              </li>
              <li>
                <strong>10 mm:</strong> 4.4 mV/A/m
              </li>
              <li>
                <strong>16 mm:</strong> 2.8 mV/A/m
              </li>
            </ul>
            <p>
              For accurate calculation use the GN1 Table A1 value for the specific cable type
              (T+E, single-core, SY, SWA), insulation (PVC vs thermosetting), and arrangement
              (clipped direct, in conduit, in containment). The values above are typical for
              T+E thermosetting flat cable; SWA and other arrangements give slightly different
              values.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage drop in consumers\' installations)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                Reg 525.1 sets voltage drop as a verifiable design parameter. Appendix 4 gives the
                3 percent lighting / 5 percent other limits. Calculation is the primary
                verification (during design); measurement is the optional confirmation (during
                commissioning) for borderline runs. Voltage drop becomes the limiting factor on
                long high-current runs — EV chargers on long radials, outbuildings, garden offices.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 52, Regulation 525.1 and Appendix 4."
          />

          <ConceptBlock
            title="Breaking capacity (Icn) — what each device can interrupt"
            plainEnglish="Every protective device has a rated breaking capacity (Icn) — the maximum current it can safely interrupt without damage. The PFC at the device installation point must not exceed Icn. Modern UK domestic devices are typically 6 kA Icn; commercial / industrial devices range from 10 kA to 50 kA depending on application."
            onSite="Check the manufacturer datasheet for Icn — it\'s usually stamped on the device case alongside other ratings. The numbering: 6000 means 6 kA Icn, 10000 means 10 kA, etc. For a typical UK domestic supply with 16 kA declared PFC at the origin, downstream devices have lower PFC (because of the downstream cable adding impedance) — 6 kA Icn is generally sufficient at the consumer-unit level."
          >
            <p>Typical Icn values by device class:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic MCB / RCBO / AFDD-RCBO (BS EN 60898 / BS EN 61009 / BS EN 62606):</strong>
                Typically 6 kA Icn (Hager, Schneider, Wylex, Eaton standard ranges).
              </li>
              <li>
                <strong>Light commercial MCB (BS EN 60898 industrial range):</strong> Typically
                10 kA Icn.
              </li>
              <li>
                <strong>Industrial MCB (BS EN 60947-2):</strong> Typically 10-25 kA Icn
                depending on application.
              </li>
              <li>
                <strong>Moulded case circuit breaker (MCCB):</strong> Typically 25-50 kA Icn or
                higher.
              </li>
              <li>
                <strong>HRC fuse (BS 88):</strong> Very high breaking capacity — typically 80-
                120 kA. Used as upstream protection where downstream MCB Icn is exceeded.
              </li>
              <li>
                <strong>Consumer unit busbar (BS EN 61439-3):</strong> Typically 16 kA Icw
                (rated short-time withstand current).
              </li>
            </ul>
            <p>
              <strong>Cascading.</strong> Where downstream MCB Icn is exceeded by the local
              PFC, an upstream HRC fuse (or higher-Icn MCCB) can be used to current-limit the
              fault before it reaches the downstream device. The let-through energy from the
              upstream device must be within the downstream device\'s capability — manufacturer
              cascade tables document the verified combinations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The voltage drop calculation — applying GN1 Table A1"
            plainEnglish="Voltage drop on a cable is current x length x mV/A/m from GN1 Table A1, divided by 1000 to get volts. Compare against the Reg 525 limits (3 percent lighting = 6.9 V, 5 percent other = 11.5 V on 230 V supply). For long high-current runs (EV chargers, outbuildings), voltage drop often becomes the limiting factor in cable size — bigger cable than overcurrent alone would dictate."
            onSite="Carry the typical mV/A/m values in your head: 1.5 mm = 29, 2.5 mm = 18, 4 mm = 11, 6 mm = 7.3, 10 mm = 4.4. Quick mental check: at 32 A x 30 m on 6 mm = 32 x 30 x 7.3 / 1000 = 7 V or 3 percent — within socket limit but tight. Upsize for comfort."
          >
            <p>The voltage drop calculation in detail:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify cable size and type.</strong> 1 mm, 1.5 mm, 2.5 mm, 4 mm, 6
                mm, 10 mm, 16 mm. T+E (flat), single-core, SY, SWA — different mV/A/m values.
              </li>
              <li>
                <strong>Look up mV/A/m from GN1 Table A1.</strong> Per cable size, type and
                installation method. Typical T+E thermosetting: 1.5 mm = 29, 2.5 mm = 18, 4 mm
                = 11, 6 mm = 7.3, 10 mm = 4.4.
              </li>
              <li>
                <strong>Identify current and length.</strong> Design current (typically the
                circuit\'s rated current — 16 A, 32 A, etc.) and the route length from origin
                to load.
              </li>
              <li>
                <strong>Calculate voltage drop.</strong> Current (A) x length (m) x mV/A/m /
                1000 = voltage drop (V).
              </li>
              <li>
                <strong>Express as percentage of 230 V.</strong> Drop / 230 x 100.
              </li>
              <li>
                <strong>Compare against Reg 525 limit.</strong> 3 percent for lighting, 5
                percent for other. If exceeds, upsize cable.
              </li>
              <li>
                <strong>For high-current continuous loads,</strong> consider design margin —
                the limit is for full design current; if the load is continuous (EV charging,
                large heating) at near full current, voltage drop will be near the limit
                in service. Aim for under 3 percent on continuous high-current runs for
                comfortable margin.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase PFC — the higher complexity"
            plainEnglish="Three-phase supplies have multiple fault scenarios: three-phase short circuit (highest current), phase-to-phase short circuit, single phase to neutral, single phase to earth. The MFT measures each loop separately during commissioning. Three-phase PFC is typically higher than single-phase because the supply transformer can deliver more current."
            onSite="On a three-phase commercial install, expect to measure PSCC and PEFC for each phase combination — L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, plus phase-to-phase L1-L2, L2-L3, L1-L3. Modern MFTs offer a three-phase test sequence that prompts each combination. The reported PFC is the highest of all readings."
          >
            <p>Three-phase fault scenarios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three-phase short circuit (L1-L2-L3 bolted).</strong> Highest fault
                current. Used for switchgear breaking-capacity sizing.
              </li>
              <li>
                <strong>Phase-to-phase short circuit (L1-L2, L2-L3, L1-L3).</strong> Slightly
                lower than three-phase. Each combination measured separately.
              </li>
              <li>
                <strong>Phase to neutral (L1-N, L2-N, L3-N).</strong> Each phase\'s PSCC.
              </li>
              <li>
                <strong>Phase to earth (L1-E, L2-E, L3-E).</strong> Each phase\'s PEFC.
              </li>
              <li>
                <strong>The reported PFC.</strong> Highest of all readings — typically the
                three-phase short-circuit value.
              </li>
              <li>
                <strong>Practical commissioning.</strong> Three-phase MFTs measure all
                combinations in a single test cycle. Document the highest as PFC; document
                phase-to-neutral and phase-to-earth values separately if the schedule format
                requires.
              </li>
            </ul>
            <p>
              For typical UK commercial three-phase supplies (200 A or 400 A 3-phase), PFC at
              origin is often in the 5-25 kA range. Industrial supplies (large dedicated
              transformers) can reach 40-50 kA or higher. Switchgear Icn must match.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Documentation — PFC, PSCC, PEFC and voltage drop on the EIC"
            plainEnglish="The EIC has dedicated fields for the supply-origin measurements: Ze, PFC (or separately PSCC and PEFC depending on the certificate format), supply voltage, declared / measured PFC. Voltage drop is typically documented in the design notes or on the Schedule of Test Results notes column. Modern certification software auto-fills from the MFT data."
            onSite="On the EIC: PFC (Ipf) field at the supply origin. Some formats also have separate PSCC and PEFC fields. Record the higher value as PFC for the breaking-capacity check. Voltage drop on the schedule notes or in the design documentation. Always include the basis — measured directly, calculated from cable / load data, or per distributor declaration for the dwelling exemption."
          >
            <p>Documentation fields and typical entries:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ze (supply origin loop impedance).</strong> Measured value in ohms.
                Typical TN-C-S 0.1-0.35; TN-S 0.2-0.5; TT 30-200+.
              </li>
              <li>
                <strong>PFC (Ipf) at origin.</strong> Measured higher of PSCC / PEFC, OR
                "16 kA per distributor declaration" for the dwelling exemption case. Always
                state the basis.
              </li>
              <li>
                <strong>PSCC and PEFC (if separate fields).</strong> Both readings recorded
                where the certificate format provides separate fields.
              </li>
              <li>
                <strong>Supply voltage at test time.</strong> Typically 235-245 V on UK 230 V
                nominal supply. Useful for sanity-checking the PFC calculation.
              </li>
              <li>
                <strong>Protective device Icn vs PFC verification.</strong> Note that each
                device has Icn at least equal to PFC — typically a tick or "verified" entry on
                the certificate. Document any non-standard cascading arrangement.
              </li>
              <li>
                <strong>Voltage drop on long runs.</strong> Calculated value per circuit on the
                Schedule of Test Results notes, or in the design documentation pack. Borderline
                runs (above 3 percent for any circuit) noted for the customer\'s awareness.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Forgetting that PFC needs measuring on commercial premises"
            whatHappens={
              <>
                Apprentice familiar with domestic work assumes the BS EN 61439-3 / 16 kA
                exemption applies everywhere. On a small commercial install (200 A 3-phase
                supply, bespoke distribution board, not BS EN 61439-3), they fill the PFC field
                on the EIC with "16 kA per distributor" without measuring. Six months later an
                audit picks it up — the actual PFC is 22 kA on this supply, the downstream MCBs
                are 6 kA Icn, and the design is unsafe. Devices need replacing with 25 kA-rated
                versions; certificate needs re-issuing; the firm has a non-conformance against
                its scheme registration.
              </>
            }
            doInstead={
              <>
                Always check the exemption conditions. BS EN 61439-3 CU + dwelling + 16 kA
                distributor declaration = exempt. Anything else = direct measurement. Commercial
                / industrial / 3-phase / non-conforming CU all require direct PFC measurement at
                the origin. Modern MFTs make this a one-button test — no excuse for skipping.
              </>
            }
          />

          <CommonMistake
            title="Quoting a 6 mm cable for a long EV charger run that fails voltage drop"
            whatHappens={
              <>
                30 m radial from CU to EV charger position. 6 mm cable was sized correctly for
                32 A overcurrent protection (current-carrying capacity check passes). Apprentice
                installs and commissions. EV charger works but the customer notices charging
                takes longer than the manufacturer\'s claimed time and voltage at the charger
                drops to 218 V under full load. Investigation finds voltage drop is approximately
                7 V or 3 percent — within Reg 525 5 percent socket limit but at the edge, and
                the EV charger is performance-degraded. Customer requests upgrade to bigger
                cable; firm has to re-pull the run, additional labour and material cost.
              </>
            }
            doInstead={
              <>
                For long runs (above 25-30 m) with high continuous current loads (EV charging,
                workshop equipment, large heating loads), check voltage drop alongside
                current-carrying capacity. Use GN1 Table A1 mV/A/m: for 6 mm at 7.3 mV/A/m, 32 A
                x 30 m = 7 V or 3 percent. Within limit but tight. Consider 10 mm at 4.4 mV/A/m:
                32 A x 30 m = 4.2 V or 1.8 percent — comfortable margin and lets the EV charger
                work at design performance. Cost difference between 6 mm and 10 mm is small
                relative to total install cost.
              </>
            }
          />

          <Scenario
            title="Origin PFC + voltage drop verification on a small commercial fit-out — Kewtech KT64+"
            situation={
              <>
                Small commercial unit in an industrial estate near Reading. 100 A single-phase
                TN-S supply (DNO declared 12 kA PFC per the connection certificate). 12-way
                distribution board (not BS EN 61439-3 — bespoke industrial design, manufacturer
                rated 16 kA Icw). Six radial circuits including a 32 A workshop ring,
                a 32 A welding socket, a 16 A office ring, lighting, immersion, an extractor
                fan. Long workshop ring (45 m) and welding socket (28 m) — voltage drop worth
                checking under load.
              </>
            }
            whatToDo={
              <>
                Direct PFC measurement at origin (not exempt — commercial premises with bespoke
                DB). Connect Kewtech KT64+ at the main switch terminals, set Zs / PFC mode,
                run 3-lead test. Reading PSCC = 11.4 kA, PEFC = 9.8 kA. PFC = 11.4 kA (the
                higher). Document on the EIC: PFC 11.4 kA at origin, supply per DNO declaration
                12 kA. Cross-check device Icn: distribution board rated 16 kA Icw (exceeds PFC
                comfortably); MCBs and RCBOs in the board rated 10 kA Icn (also exceeds PFC).
                Pass — protective device breaking capacity verified. Move to voltage drop on the
                long runs. Workshop ring 45 m of 4 mm T+E cable. GN1 Table A1: 4 mm at
                11 mV/A/m. Calculated drop at 32 A: 32 x 45 x 11 / 1000 = 15.8 V or 6.9 percent
                — exceeds 5 percent Reg 525 limit. Investigate. Apply test load (2 kW heater)
                at furthest socket of workshop ring, measure voltage drop: no-load 242 V at CU,
                loaded 230 V at workshop socket = 12 V drop or 5.0 percent at 8.7 A. Scale to
                full 32 A: 12 V x 32 / 8.7 = 44 V — confirms the calculation. Conclusion: 4 mm
                cable is undersized for voltage drop on the 45 m run. Recommend upgrade to 6 mm
                (calculated drop at 32 A x 45 x 7.3 / 1000 = 10.5 V or 4.6 percent — comfortable
                pass). Document finding and recommendation. Continue verification on the
                shorter circuits — welding socket 28 m of 6 mm: drop 28 x 32 x 7.3 / 1000 =
                6.5 V or 2.8 percent, comfortable pass. Office ring 18 m of 2.5 mm:
                drop 18 x 16 x 18 / 1000 = 5.2 V or 2.3 percent, pass. Document everything on
                the EIC: PFC, PSCC, PEFC at origin; per-circuit Zs and voltage drop where
                relevant; the workshop ring upgrade recommendation as a Code 3 finding (or
                quote for immediate upgrade if the customer wants it before sign-off).
              </>
            }
            whyItMatters={
              <>
                The scenario demonstrates the full live verification at supply origin and per
                circuit. PFC measurement was required because commercial premises with a
                non-conforming DB — direct measurement gave 11.4 kA, comfortably within the
                10 kA Icn of the protective devices. Voltage drop verification on the long
                workshop ring caught an undersized cable that would have caused performance
                issues in service — the calculation showed it; the under-load measurement
                confirmed it; the recommendation gives the customer a clear path to remediation.
                Without the systematic PFC + voltage drop verification, the install would have
                shipped with one safety verification gap (PFC undocumented) and one performance
                problem (workshop ring voltage drop). Both caught by competent commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PFC = max(PSCC, PEFC). PSCC is L-N short-circuit prospective current; PEFC is L-E earth-fault prospective current. Higher value reported as Ipf for protective device breaking-capacity check.",
              "GN3 exempts dwellings using BS EN 61439-3 consumer unit on supplies where DNO declares 16 kA maximum — no origin PFC measurement needed. Document on EIC as \"16 kA per distributor declaration\".",
              "Outside dwellings, or non-conforming CUs, or DNO declared above 16 kA = direct PFC measurement required at supply origin.",
              "PFC = nominal voltage / measured loop impedance. UK 230 V at 0.5 Omega = 460 A prospective. Modern MFTs compute automatically from 3-lead Zs measurement.",
              "Each protective device upstream of the test point must have Icn at least equal to the PFC at that point. Domestic 6 kA typical; commercial / industrial 10-25 kA depending on supply.",
              "Reg 525 voltage drop limits: 3 percent lighting (6.9 V on 230 V), 5 percent other (11.5 V). Verify by calculation during design (mV/A/m from GN1 Table A1); measure under load on borderline long runs.",
              "Voltage drop becomes the limiting factor for cable size on long runs (above 25-30 m) with high continuous current. EV chargers, garden offices, outbuildings on long radials are typical cases.",
              "Zs and voltage drop both depend on cable resistance (R1+R2). Borderline result on one often correlates with borderline on the other. Fixes are typically the same — bigger cable, shorter run, better terminations.",
            ]}
          />

          <Quiz title="PFC + PSCC + voltage drop measurement" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 AFDD test sequence + Reg 421.1.7
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
