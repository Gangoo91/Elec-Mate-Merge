/**
 * Module 5 · Section 4 · Subsection 4 — AFDD test sequence + manufacturer test button protocol
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.4
 *   AC 6.4 — "state the methods for verifying protection by automatic disconnection of supply"
 * Layered: BS 7671 Reg 421.1.7 (A4:2026), BS EN 62606 (AFDD product standard)
 *
 * CRITICAL A4:2026 NUANCE:
 *   Reg 421.1.7 RECOMMENDS AFDDs in specified locations — it is NOT a
 *   mandatory requirement in BS 7671 itself. The Building Safety Act 2022
 *   makes AFDDs mandatory in Higher Risk Residential Buildings (HRRBs)
 *   via separate building regulations. The L3 apprentice needs to
 *   distinguish "recommending" (BS 7671) from "mandatory by other law"
 *   (HRRB via Building Regs).
 *
 * The Sub covers AFDD purpose (arc-fault fire protection — Reg 532.6),
 * the verification test sequence (functional test via the manufacturer
 * button, no instrument trip-time test like RCDs), the Reg 421.1.7
 * recommended locations, and the practical install + commissioning steps.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'AFDD test sequence + Reg 421.1.7 | Level 3 Module 5.4.4 | Elec-Mate';
const DESCRIPTION =
  'AFDD verification — Reg 421.1.7 recommends (NOT mandates) AFDDs in specified locations under BS 7671; HRRBs have separate mandatory requirements via Building Safety Act 2022. Test method is the manufacturer button (no instrument trip-time equivalent), Reg 532.6 product compliance, BS EN 62606 standard, single-phase 32 A socket-outlet circuits.';

const checks = [
  {
    id: 'm5-s4-sub4-recommending',
    question: 'Under A4:2026 BS 7671, Reg 421.1.7 is best described as:',
    options: [
      'Mandating — Reg 421.1.7 requires AFDDs on all final circuits supplying socket-outlets up to 32 A in every dwelling with no exceptions from A4:2026.',
      'Prohibiting — Reg 421.1.7 bans AFDDs on circuits below 32 A because the detection electronics nuisance-trip on small loads, restricting them to industrial circuits.',
      'Withdrawing — Reg 421.1.7 removed the previous AFDD requirement, leaving arc-fault protection entirely to the Building Safety Act 2022 with no mention in BS 7671.',
      'Recommending — Reg 421.1.7 recommends (not mandates) AFDDs in specified locations such as socket-outlet circuits up to 32 A in dwellings and sleeping accommodation.',
    ],
    correctIndex: 3,
    explanation:
      'A4:2026 used the word "recommending" deliberately in Reg 421.1.7. The IET considered making AFDDs mandatory but settled on a strong recommendation, leaving the building-regulations regime to mandate them where building-safety law dictates (HRRBs under the Building Safety Act 2022). For an L3 apprentice the practical effect is — quote AFDD on new domestic work as the recommended approach, install where customer / specifier agrees, mandatory only in HRRBs.',
  },
  {
    id: 'm5-s4-sub4-test-method',
    question: 'How is an installed AFDD verified for performance?',
    options: [
      'With the multifunction tester — the MFT injects a standard arc-fault waveform through its RCD test terminals and times the trip, the same way it verifies an RCD.',
      'Via the manufacturer test button, which injects a simulated arc-fault signature internally — there is no external instrument equivalent to the RCD trip-time test.',
      'By measuring the line-to-earth loop impedance — a low Zs at the AFDD confirms it can detect an arc fault, since detection depends on a high enough fault current.',
      'By an insulation resistance test at 500 V — a healthy reading across the AFDD confirms the arc-detection electronics are intact and will operate on a real fault.',
    ],
    correctIndex: 1,
    explanation:
      'AFDDs detect arc-fault waveform signatures using internal algorithms — there\'s no externally-injectable test that the multifunction tester can apply to verify performance. The manufacturer test button is the only practical verification method. Reg 132.13 documentation handover should include test-button operation instructions for the customer, with recommended quarterly testing similar to RCDs.',
  },
  {
    id: 'm5-s4-sub4-locations',
    question: 'Reg 421.1.7 specifies AFDD recommendation primarily for:',
    options: [
      'Single-phase socket-outlet final circuits up to 32 A in specified locations — dwellings, sleeping accommodation, educational and similar premises with occupants at risk.',
      'Lighting circuits in commercial premises only — the recommendation targets fixed luminaire wiring, where most arc-fault fires are said to start rather than at sockets.',
      'Outdoor and special-location circuits such as swimming pools and saunas, where moisture increases the chance of an arc fault across damaged insulation.',
      'Three-phase distribution circuits in industrial premises — recommended at the main switchboard because arc faults on high-current busbars carry the greatest fire energy.',
    ],
    correctIndex: 0,
    explanation:
      'AFDDs target the typical fire-cause profile in occupied premises — damaged flexes plugged into sockets, loose accessory terminations, deteriorated cable insulation. The 32 A socket-outlet circuit is the canonical case. Reg 421.1.7 enumerates the specific location types where the recommendation applies. Outside those locations, AFDDs are still permitted but not specifically recommended.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN 62606 is the product standard for AFDDs. What does it specify?',
    options: [
      'The maximum disconnection times for AFDDs in TN and TT systems, mirroring Table 41.1 but with tighter limits because arc faults develop into fire faster.',
      'The performance, safety and test requirements for arc-fault detection devices — the waveforms detected, response times, test-button function and nuisance-trip immunity.',
      'The recommended locations for AFDD installation in dwellings and sleeping accommodation — the application standard that tells the designer where AFDDs are required.',
      'The colour-coding and terminal markings so AFDDs cannot be confused with RCBOs at the consumer unit, along with the required durability of the device label.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62606 is the international product standard for AFDDs — analogous to BS EN 61008 / BS EN 61009 for RCDs. Conformance underpins device performance trust. UK AFDDs from major manufacturers (Hager, Schneider, Wylex, Eaton) all carry BS EN 62606 conformance. Specify the standard on procurement and certification documentation.',
  },
  {
    id: 2,
    question: 'A customer asks "do I need AFDDs in my new house?". Your answer:',
    options: [
      'No — AFDDs are banned in domestic premises because the detection electronics nuisance-trip on household appliances, so they are permitted only in industrial work.',
      'Yes — BS 7671 makes AFDDs mandatory on every circuit in every new dwelling from A4:2026, so the consumer unit must be fully populated to gain a certificate.',
      'BS 7671 Reg 421.1.7 recommends but does not mandate AFDDs for a typical house; they are mandatory only in Higher Risk Residential Buildings under the Building Safety Act 2022.',
      'Only if the house has solar PV or battery storage — AFDDs are mandated by Section 712 wherever a second source of supply is present, but not otherwise.',
    ],
    correctAnswer: 2,
    explanation:
      'The L3 apprentice needs to distinguish the two regimes — BS 7671 recommendation (Reg 421.1.7) and HRRB mandate (Building Safety Act 2022 + building regulations). For typical domestic / commercial work the recommendation is the practical specification driver; for HRRB work the mandate is binding. Customer briefing should set out the recommendation, the cost, and let the customer make the engineering decision.',
  },
  {
    id: 3,
    question: 'You\'ve installed an AFDD-RCBO on a new kitchen socket circuit. The verification test sequence at commissioning is:',
    options: [
      'Energise first, then operate the manufacturer test button only — an AFDD-RCBO needs no dead tests because the electronics replace continuity and IR checks.',
      'A single AC test at 1 times I delta n on the RCD portion, then a 5 times test to confirm the arc-detection half — the two trip tests verify all three functions.',
      'Continuity and insulation resistance only — the arc-fault function cannot be verified on site, so the device is accepted on its BS EN 62606 marking alone.',
      'Visual, continuity and IR (250 V if the electronics need it), then energise for the single AC test on the RCD half and the manufacturer button for the AFDD half.',
    ],
    correctAnswer: 3,
    explanation:
      'AFDD-RCBOs combine three protective functions (overcurrent, residual current, arc-fault) into a single device. Verification covers each — continuity and IR for the cabling, single AC at 1 x I delta n for the RCD half (per A4:2026 Reg 643.7.3), and the manufacturer test button for the AFDD half. Document each function tested on the schedule.',
  },
  {
    id: 4,
    question: 'An AFDD trips intermittently during normal kitchen use (kettle, microwave, blender). What\'s the diagnostic approach?',
    options: [
      'Investigate genuine loose connections first, then assess whether electronic loads are misleading the device, then consider the AFDD generation or condition.',
      'Increase the AFDD rating from 32 A to 40 A so the larger kitchen loads no longer push the device into its detection threshold, then re-test under normal use.',
      'Fit a filter on the kitchen circuit to smooth the appliance waveforms, since nuisance tripping is always caused by harmonics rather than any real fault.',
      'Replace the AFDD-RCBO with a plain RCBO — intermittent tripping confirms the arc-detection circuitry has failed and the fire protection is no longer needed.',
    ],
    correctAnswer: 0,
    explanation:
      'Nuisance tripping on AFDDs is a known issue, particularly with first-generation devices and certain modern electronic loads. The discipline is to investigate genuine loose connections first (real arc-fault risk), then assess whether the device is being misled by load characteristics. Bypassing or removing the AFDD is not a solution — it removes the fire protection and may breach Reg 421.1.7 expectations / building regulation HRRB requirements.',
  },
  {
    id: 5,
    question: 'Which of the following protective devices presents low resistance during an insulation resistance test, potentially affecting readings?',
    options: [
      'Only surge protective devices (SPDs) — RCBOs and AFDDs are electromechanical and present high resistance, so only the SPD varistor affects the reading.',
      'AFDDs, RCBOs, RCCBs and SPDs all have internal electronics that can present low resistance during a 500 V IR test, so disconnect or use 250 V.',
      'Only MCBs and fuses — overcurrent devices contain a bimetallic strip that conducts at 500 V, whereas residual-current and arc-fault devices are unaffected.',
      'None of them — all modern protective devices withstand a 500 V IR test indefinitely, so no disconnection is ever required before testing.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 lists AFDDs, RCBOs, RCCBs and SPDs as devices that can present low resistance during IR tests. The risk is twofold — the device may be damaged by 500 V on its electronics, and the reading may be skewed by the device\'s internal leakage. Standard practice is to disconnect or use 250 V where appropriate. Modern AFDD-RCBOs typically tolerate 500 V on the line side but always check the manufacturer manual.',
  },
  {
    id: 6,
    question: 'Higher Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 are typically defined as:',
    options: [
      'Any building containing five or more dwellings, regardless of height, because the number of occupants rather than the building height drives the classification.',
      'Any building over two storeys used for sleeping accommodation, including houses in multiple occupation, hotels and care homes of any size.',
      'Buildings of 18 m or more (typically 7 storeys or more) containing two or more residential units, administered by the Building Safety Regulator after Grenfell.',
      'Buildings of 11 m or more in height, aligned with the cladding-replacement threshold introduced after Grenfell rather than the 18 m fire-safety threshold.',
    ],
    correctAnswer: 2,
    explanation:
      'HRRBs are tall residential buildings — 18 m / 7 storeys or more with multiple dwellings. The Building Safety Act 2022 created the regulatory regime and the Building Safety Regulator. AFDDs are recommended (Reg 421.1.7) in HRRBs via building regulations; this is separate from the BS 7671 Reg 421.1.7 recommendation. Apprentices working on HRRB projects need to understand both regimes apply.',
  },
  {
    id: 7,
    question: 'Standard cost approximation for adding AFDD protection to a typical 10-circuit domestic CU upgrade:',
    options: [
      'Roughly 5-10 GBP per AFDD-RCBO times 10 circuits = 50-100 GBP — only marginally more than plain RCBOs because they share the same housing.',
      'Roughly 250-400 GBP per AFDD-RCBO times 10 circuits = 2,500-4,000 GBP — the arc-detection electronics make each device several times an RCBO price.',
      'No additional cost — AFDD protection comes from a single standalone unit at the origin that protects the whole board, so per-circuit RCBOs are unchanged.',
      'Roughly 60-100 GBP per AFDD-RCBO times 10 circuits = 600-1000 GBP over RCBO-only, with similar labour as each AFDD-RCBO simply replaces an RCBO.',
    ],
    correctAnswer: 3,
    explanation:
      'AFDD-RCBO devices are 60-100 GBP each at typical UK trade prices (Hager, Schneider, Wylex). Quote the upgrade as a clear price option — many domestic customers will choose AFDD when the fire-protection value is explained. As production volumes grow, prices are gradually falling; expect AFDD cost premium to narrow in the next 5-10 years.',
  },
  {
    id: 8,
    question: 'Reg 421.1.7 documentation under Reg 132.13 should brief the customer on:',
    options: [
      'The AFDD purpose (fire protection from arc faults), the quarterly test-button protocol, and what to do if the device trips repeatedly in service.',
      'The need to re-test the AFDD with a multifunction tester every six months, because the detection algorithm drifts and only an instrument can confirm it works.',
      'The requirement to keep a written log of every appliance plugged into the protected circuits, so a future nuisance trip can be traced to the offending device.',
      'The instruction never to operate the test button themselves, since the simulated arc fault is hazardous and must be triggered only by a qualified electrician.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 132.13 documentation handover is the legal requirement to give the customer the information they need to operate, maintain and test their installation. AFDDs need a brief equivalent to RCDs — purpose, test method, what to do on trip. Most manufacturers (Hager, Schneider, Wylex) provide customer-facing user information that can be included in the documentation pack.',
  },
];

const faqs = [
  {
    question: 'What\'s the difference between an AFDD, an RCBO and an AFDD-RCBO?',
    answer:
      'AFDD (Arc Fault Detection Device) — detects arc-fault waveform signatures, trips on detection, fire protection. Stand-alone device. RCBO (Residual Current Circuit-Breaker with Overcurrent protection) — combines overcurrent (MCB) and residual current (RCD) protection in a single device, shock and overload protection. AFDD-RCBO — combines all three: overcurrent + residual current + arc-fault detection. The AFDD-RCBO is the typical modern installation choice because it gives complete protection in a single device slot. Standalone AFDDs are used where the existing RCBO is fine and AFDD is added separately (typically a small enclosure upstream of the consumer unit).',
  },
  {
    question: 'Can I retrofit AFDDs to an existing consumer unit?',
    answer:
      'Often yes — AFDD-RCBOs are typically the same physical size as standard RCBOs and fit in the same DIN-rail position. Check that the AFDD-RCBO is compatible with the busbar and pin pitch of the existing CU (most modern brands are interchangeable, some older or imported CUs are not). For older CUs that won\'t accept AFDD-RCBOs, the alternative is to replace the CU entirely or fit a separate enclosure with AFDD protection upstream. Customer brief on the cost and the available options.',
  },
  {
    question: 'Why is there no instrument test for AFDD trip time like there is for RCDs?',
    answer:
      'AFDDs detect arc-fault waveform signatures using internal algorithms — the detection is sophisticated and proprietary to each manufacturer. There\'s no standardised "inject a signal that simulates an arc fault" test that an external instrument can perform reliably. The manufacturer test button injects a manufacturer-defined arc signature internally that the device should detect; external instrument testing isn\'t possible for the arc-detection function. This is unlike RCDs where the residual current test is well-defined (inject a known mA at 50 Hz, measure trip time) and can be standardised across instruments.',
  },
  {
    question: 'My customer asks "are AFDDs reliable, or do they nuisance trip a lot?"',
    answer:
      'Modern BS EN 62606 compliant AFDDs (post-2018 designs) have significantly better discrimination than first-generation devices. Nuisance tripping is rare on healthy installations with quality electrical accessories. Common nuisance-trip causes — damaged flex on a frequently-used appliance, marginal terminal on a worn socket, certain low-quality electronic loads (very cheap LED drivers, no-name PSUs). Stick to reputable AFDD brands (Hager, Schneider, Wylex, Eaton), use quality accessories, and the device performs well. For a customer worried about nuisance tripping, the most useful brief is — "if it trips, that\'s usually telling you something\'s wrong with a plug or appliance, not the device being faulty".',
  },
  {
    question: 'Is the AFDD test button operated by the customer or the inspector?',
    answer:
      'Both — like RCDs. Customer operates quarterly as a functional check (per Reg 132.13 documentation handover). Inspector operates at EICR intervals as part of the verification (since there\'s no other way to verify the AFDD function). Both record on the appropriate documentation — customer in their own records if they keep them; inspector on the EICR schedule. Failed test button at any point = replace the device.',
  },
  {
    question: 'What\'s the realistic lifespan of an AFDD?',
    answer:
      'Typical design life is 10-15 years, similar to RCBOs. The electronic detection circuitry has finite life — capacitors age, semiconductors drift, the trip mechanism wears with operations. Manufacturer warranties are typically 2-5 years; design life is longer. Replacement at CU age 10-15 years (often coinciding with a CU upgrade) is the standard expectation. Customer brief should set this expectation so AFDD replacement isn\'t a surprise when it comes due.',
  },
];

export default function Sub4() {
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
            eyebrow="Module 5 · Section 4 · Subsection 4"
            title="AFDD test sequence + Reg 421.1.7 (recommending)"
            description="A4:2026 Reg 421.1.7 RECOMMENDS (NOT mandates) AFDDs in specified locations under BS 7671. HRRBs have separate mandatory requirements via the Building Safety Act 2022. Verification is the manufacturer test button (no instrument trip-time equivalent), Reg 532.6 product compliance, BS EN 62606 standard."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 Reg 421.1.7 (A4:2026) RECOMMENDS AFDDs in specified locations — wording is \"recommending\", NOT mandating. Strong steer, not strict requirement.",
              "Building Safety Act 2022 mandates AFDDs in Higher Risk Residential Buildings (HRRBs — 18 m+ / 7 storeys+ multi-residential) via separate building regulations.",
              "AFDD verification is via the manufacturer test button — no external instrument equivalent to the RCD trip-time test. BS EN 62606 product standard governs detection performance.",
              "AFDD-RCBO combines overcurrent + residual current + arc-fault detection in one device. Typical add-on cost 60-100 GBP per circuit. Modern domestic CU upgrades increasingly include AFDDs as standard.",
              "Reg 132.13 documentation: brief the customer on test-button operation (quarterly), purpose (fire protection), and what to do if it trips repeatedly (investigate flex / appliance first).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish the BS 7671 Reg 421.1.7 recommendation from the Building Safety Act 2022 HRRB mandate — two different regimes, both relevant.",
              "Identify the locations where Reg 421.1.7 recommends AFDD protection — single-phase AC final circuits supplying socket-outlets up to 32 A in dwellings, sleeping accommodation, educational and similar premises.",
              "Verify an installed AFDD via the manufacturer test button — no external instrument equivalent to the RCD trip-time test exists for the arc-detection function.",
              "Apply BS EN 62606 product standard requirements when specifying or auditing AFDDs.",
              "Carry out the commissioning test sequence on an AFDD-RCBO — continuity, IR (with care for electronics), single AC at 1 x I delta n, manufacturer test button.",
              "Diagnose nuisance AFDD tripping — investigate loose connections / damaged flexes first, then assess load characteristics, then device discrimination.",
              "Brief the customer under Reg 132.13 on AFDD purpose, quarterly test-button protocol, and what to do on trip.",
              "Quote AFDD as a recommended fire-protection upgrade on new domestic CU work, with cost transparency.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Reg 421.1.7 — recommending, not mandating</ContentEyebrow>

          <ConceptBlock
            title={`The BS 7671 wording matters — and it's "recommending"`}
            plainEnglish={`A4:2026 Reg 421.1.7 uses the word "recommending" when it talks about AFDD installation in specified locations. That wording is deliberate. The IET considered making AFDDs strictly mandatory in BS 7671 but settled on a strong recommendation. The practical effect — AFDDs are not strictly required by BS 7671 for typical domestic / commercial work, but they are the recommended best practice and many specifiers now include them as standard. For Higher Risk Residential Buildings (HRRBs), separate building regulations under the Building Safety Act 2022 make AFDDs mandatory.`}
            onSite="Quote AFDDs on every domestic CU change as the recommended option. Give the customer the choice — AFDD-protected (recommended, slightly higher cost) or RCBO-only (compliant with BS 7671 minimum, lower cost). Many customers choose AFDD when the value is explained. For HRRB work the choice is removed — AFDDs are recommended (Reg 421.1.7)."
          >
            <p>The two regimes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 Reg 421.1.7 (A4:2026):</strong> Recommends AFDDs in specified
                locations — single-phase AC final circuits supplying socket-outlets up to 32 A in
                dwellings, premises with sleeping accommodation (HMOs, hotels, care homes),
                educational establishments, and similar locations where occupants may not be able
                to react quickly to a developing fire. Wording is "recommending" — not mandatory.
              </li>
              <li>
                <strong>Building Safety Act 2022 + building regulations:</strong> Mandates AFDDs
                in Higher Risk Residential Buildings (HRRBs — 18 m+ / 7 storeys+ multi-residential
                buildings). Administered by the Building Safety Regulator (HSE).
              </li>
              <li>
                <strong>Practical implication for L3 work:</strong> Quote AFDDs as recommended on
                domestic / general commercial work. Install where customer or specifier agrees.
                Mandatory only on HRRB projects.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc Fault Detection Devices)"
            clause="Single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in specified types of electrical installation are recommended to be provided with arc fault detection devices (AFDDs) to BS EN 62606."
            meaning={
              <>
                The wording is "recommending" — not mandating. AFDDs are the recommended best
                practice for socket-outlet circuits up to 32 A in dwellings, premises with
                sleeping accommodation, and similar high-occupancy locations. The recommendation
                is strong but not strict. Higher Risk Residential Buildings have separate
                mandatory requirements via the Building Safety Act 2022. The product standard for
                AFDDs is BS EN 62606.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 42, Regulation 421.1.7."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What an AFDD does — the arc-detection algorithm</ContentEyebrow>

          <ConceptBlock
            title="Detecting the waveform signature of an arc fault"
            plainEnglish="An AFDD monitors the current flowing in the circuit and looks for waveform signatures consistent with arc faults — characteristic high-frequency content, rapid current changes, intermittent connection patterns. When the algorithm detects an arc-fault signature it trips the device, disconnecting the circuit before the arc can ignite a fire. The algorithm has to discriminate between dangerous arcing (loose connection in a damaged plug) and benign arcing (switching arcs from contactors, motor brush sparking)."
            onSite="The detection is internal to the device — there\'s no external test signal that can verify the algorithm. The manufacturer test button is the only practical functional check. The device datasheet quotes BS EN 62606 conformance and the product\'s discrimination performance."
          >
            <p>What an AFDD detects (the dangerous arcs):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Series arcing in a damaged flex.</strong> A bent / broken conductor in a
                kettle flex, vacuum cleaner cord, lamp lead — current passes through an air gap
                and arcs continuously, generating heat that can ignite the surrounding insulation
                and adjacent combustibles.
              </li>
              <li>
                <strong>Loose terminal connections.</strong> A backed-off terminal screw at a
                socket back, an under-torqued strip connector, a loose backbox terminal — current
                arcs across the gap, generating localised heat.
              </li>
              <li>
                <strong>Damaged cable insulation.</strong> Where insulation has degraded enough
                for arcing to occur between conductors or between conductor and earth without
                tripping a standard MCB or RCD.
              </li>
              <li>
                <strong>Aged accessories.</strong> Worn socket contacts that no longer make a
                positive connection, cracked accessory plates with internal arcing.
              </li>
            </ul>
            <p>What an AFDD must NOT trip on (the benign arcs):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switching arcs.</strong> Contactor closing / opening on a motor circuit,
                relay operation, switch make / break.
              </li>
              <li>
                <strong>Motor brush sparking.</strong> Universal motor brushes (vacuum cleaners,
                food processors, hand tools) generate continuous low-level arcing during normal
                operation.
              </li>
              <li>
                <strong>Electronic load switching.</strong> Switch-mode PSUs, dimmers, variable-
                speed drives all create high-frequency current variations that can resemble
                arc-fault signatures to less-discriminating detection algorithms.
              </li>
            </ul>
            <p>
              Modern BS EN 62606 compliant devices have well-developed discrimination algorithms.
              First-generation AFDDs were more prone to nuisance tripping; recent designs are
              significantly better. Stick to reputable manufacturers and check device datasheets
              for compliance with the current BS EN 62606 edition.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Verification — the manufacturer test button</ContentEyebrow>

          <ConceptBlock
            title="No instrument test, only the test button"
            plainEnglish="Unlike RCDs (where the multifunction tester injects a known residual current and measures trip time), AFDDs cannot be externally tested for performance. The arc-detection algorithm is internal and proprietary; there\'s no standardised external test signal. The manufacturer test button is the only practical functional check — pressing it injects a manufacturer-defined arc-fault signature internally that the device should detect."
            onSite="Treat the manufacturer test button as the AFDD\'s equivalent of the RCD instrument test. Press at commissioning, press at every EICR, brief the customer to press quarterly. Failed test button = replace the device."
          >
            <p>The verification protocol:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At commissioning (new install).</strong> Standard test set on the cabling
                (continuity, IR, polarity, Zs). Single AC at 1 x I delta n on the RCD half (per
                A4:2026 Reg 643.7.3). Press the AFDD test button — device trips. Reset by
                switching back on. Document on the Schedule of Test Results.
              </li>
              <li>
                <strong>At EICR intervals (5-10 years).</strong> Same sequence as commissioning,
                including AFDD test button. Document on the EICR.
              </li>
              <li>
                <strong>Customer quarterly check (per Reg 132.13).</strong> Customer presses
                test button on each AFDD; if it fails to trip, call an electrician.
              </li>
              <li>
                <strong>Failed AFDD response.</strong> If the test button fails to trip the
                device, replace the AFDD. EICR coding C2 (potentially dangerous) for a failed
                AFDD on a circuit relying on it for fire protection.
              </li>
            </ol>
            <p>
              <strong>Why no instrument test?</strong> The arc-detection algorithm is proprietary
              and complex — different manufacturers use different signature analysis approaches.
              There\'s no standardised "inject this signal and measure response" test that
              external instruments can apply. The manufacturer test button is the only consistent
              functional check.
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

          <ContentEyebrow>Where Reg 421.1.7 applies — the location list</ContentEyebrow>

          <ConceptBlock
            title="The locations the recommendation targets"
            plainEnglish="Reg 421.1.7 enumerates specific location types where AFDD installation is recommended. The common thread is occupied premises where a fire would put people at risk — particularly where occupants may not be able to react quickly (sleeping, vulnerable, large numbers). The 32 A socket-outlet circuit is the canonical case because that\'s where most domestic / occupied-premises arc-fault fires originate."
            onSite="When specifying a new install or quoting a CU change, consider Reg 421.1.7 against the building type. Domestic dwelling — recommended. HMO or hotel — strongly recommended. Care home or similar — strongly recommended. Educational establishment — recommended. Office or retail — best practice but less specifically targeted. HRRB — mandatory under separate building regulations."
          >
            <p>Reg 421.1.7 location categories (paraphrased):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dwellings.</strong> Single-family houses, flats, apartments. Final
                circuits supplying socket-outlets up to 32 A. The most common scope.
              </li>
              <li>
                <strong>Premises with sleeping accommodation.</strong> HMOs, hotels, B&amp;Bs,
                hostels. Higher fire-risk because of occupant vulnerability while sleeping.
              </li>
              <li>
                <strong>Care homes and similar.</strong> Premises with vulnerable occupants
                (elderly, disabled, medically dependent). Higher fire-risk because of evacuation
                difficulty.
              </li>
              <li>
                <strong>Educational establishments.</strong> Schools, colleges, training centres.
                Multiple occupants, potentially complex evacuation.
              </li>
              <li>
                <strong>Other locations as enumerated by the regulation.</strong> Check the
                current text of Reg 421.1.7 in BS 7671 for the full list.
              </li>
            </ul>
            <p>Higher Risk Residential Buildings (HRRB):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Definition.</strong> Buildings 18 m or more in height (typically 7 storeys
                or more) containing two or more residential units.
              </li>
              <li>
                <strong>Regulatory basis.</strong> Building Safety Act 2022 + accompanying
                building regulations. Administered by the Building Safety Regulator (HSE).
              </li>
              <li>
                <strong>AFDD requirement.</strong> Mandatory on socket-outlet circuits — not just
                recommended. Different regime from BS 7671 Reg 421.1.7.
              </li>
              <li>
                <strong>Other HRRB requirements.</strong> Linked smoke detection, enhanced fire
                compartmentation, additional documentation duties on the duty holder.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 532.6 (Arc Fault Detection Devices)"
            clause="Regulations 421.1.7, 532.6 and 651.2(e) require confirmation that arc fault detection device(s) are operational. On completion the installer shall confirm AFDDs show the correct operational indication and are capable of being tested or monitored in accordance with manufacturer instructions and relevant regulations. BS EN 62606:2013 + A1:2017 (general requirements for AFDDs) is referenced by BS 7671 at 421.1.7, 532.6 and Table 537.4."
            meaning={
              <>
                Reg 532.6 sits in Chapter 53 (Selection and erection — protection, isolation,
                switching, control and monitoring) and works alongside Reg 421.1.7 (location
                recommendation) and Reg 651.2(e) (initial verification confirmation). The
                regulatory triad covers: <strong>where</strong> AFDDs are recommended (421.1.7),{' '}
                <strong>what</strong> the device must comply with (532.6, referencing BS EN
                62606) and <strong>how</strong> operation is confirmed at initial verification
                (651.2(e)). On site you confirm via the manufacturer test button and the
                operational indicator.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 53, Regulation 532.6."
          />

          <RegsCallout
            source="IET Guidance Note 3 — Devices presenting low resistance during IR test"
            clause="The guidance identifies RCCBs, RCBOs, AFDDs and surge protection devices (SPDs) as examples of protective or electronic components that can present a low resistance path during an insulation resistance test, potentially skewing results or causing unacceptable current flow during testing."
            meaning={
              <>
                AFDDs join RCBOs, RCCBs and SPDs as devices that can be affected by 500 V IR
                test voltage. Standard mitigations: disconnect the device for the IR test and
                re-fit afterwards; test at 250 V if the manufacturer permits; or apply IR
                test to the wiring only by isolating at the device load terminals. The
                manufacturer manual is the source of truth for what each specific device
                tolerates.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, IR test guidance."
          />

          <ConceptBlock
            title="AFDD-RCBO commissioning — the integrated test sequence"
            plainEnglish="An AFDD-RCBO combines three protective functions in one device — overcurrent (MCB), residual current (RCD) and arc-fault detection (AFDD). Commissioning verification covers each function: continuity and IR for the cabling (with care for the device electronics on 500 V IR), single AC at 1 x I delta n for the RCD half (per A4:2026 Reg 643.7.3), and the manufacturer test button for the AFDD half. Document each test on the schedule."
            onSite="Standard sequence: dead tests first (continuity, IR with care, polarity), then energise, then live tests (Zs, RCD trip time, AFDD test button). Most modern certification software has a workflow specifically for AFDD-RCBO that prompts each test in turn — useful for not missing any of the three function tests."
          >
            <p>Full AFDD-RCBO commissioning checklist:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection.</strong> Device fitted correctly, terminations
                torqued per manufacturer, label visible, identification on the circuit chart.
              </li>
              <li>
                <strong>Continuity (R1+R2).</strong> Standard dead test on the cabling. Records
                expected for Zs sanity-check later.
              </li>
              <li>
                <strong>IR test.</strong> 500 V if the device manufacturer permits on the line
                side; 250 V or device-disconnected if not. GN3 explicitly identifies AFDDs as
                devices that can present low resistance during IR testing.
              </li>
              <li>
                <strong>Polarity.</strong> Confirmed at all accessories on the circuit.
              </li>
              <li>
                <strong>Energise.</strong> Close the AFDD-RCBO, confirm device shows healthy.
              </li>
              <li>
                <strong>Zs at the furthest point.</strong> No-trip mode (the RCD half is RCD).
                Compare against Type B / C / D Table 41.3 limit with 0.8 multiplier.
              </li>
              <li>
                <strong>RCD trip-time test.</strong> Single AC at 1 x I delta n per A4:2026 Reg
                643.7.3. Compare against 300 ms product limit and Table 41.1 system limit.
              </li>
              <li>
                <strong>AFDD functional test (manufacturer button).</strong> Press T, device
                trips, reset by switching back on. Record pass / fail.
              </li>
              <li>
                <strong>Documentation.</strong> Schedule of Test Results — RCD type and trip
                time per circuit, AFDD pass / fail per circuit, BS EN 62606 product compliance
                noted in test method notes.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Diagnosing AFDD nuisance trips — the structured approach"
            plainEnglish="AFDD nuisance trips happen — particularly with first-generation devices and certain modern electronic loads. The structured diagnostic approach: investigate genuine loose connections first (real arc-fault risk), then assess load characteristics (electronic loads can mimic arc signatures to less-discriminating algorithms), then assess device discrimination (older devices may need replacement with newer-generation models)."
            onSite="Don't bypass or remove the AFDD as the first response — that removes the fire protection. The right path is structured investigation. Most nuisance trips on quality installations come from genuinely-loose connections that the device is correctly detecting; replacing the device without finding the cause just shifts the problem."
          >
            <p>The AFDD nuisance-trip diagnostic sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Investigate genuine loose connections first.</strong> Inspect every
                accessory on the circuit — sockets, switches, junction boxes, the device
                terminals themselves. Tighten with proper torque tool. Replace any worn or
                damaged accessories. Check plug-in equipment for damaged flexes.
              </li>
              <li>
                <strong>Check pattern of trips.</strong> When does it trip? Same time of day?
                Same appliance? Same socket? Pattern often points to a specific cause.
              </li>
              <li>
                <strong>Test plug-in equipment separately.</strong> Plug in suspected
                appliances one at a time. Damaged flexes on kettles, vacuum cleaners and hair
                dryers are common culprits. Replace the flex or the appliance.
              </li>
              <li>
                <strong>Assess load characteristics.</strong> Some electronic loads (cheap LED
                drivers, no-name PSUs, low-quality variable-speed drives) produce waveforms
                that less-discriminating AFDDs interpret as arc faults. Test by removing each
                electronic load.
              </li>
              <li>
                <strong>Consider device generation.</strong> First-generation AFDDs (pre-2018)
                are more prone to nuisance tripping than current BS EN 62606 compliant devices.
                Replace with a current-generation device from a reputable manufacturer (Hager,
                Schneider, Wylex, Eaton).
              </li>
              <li>
                <strong>Escalate if cause isn\'t locally diagnosable.</strong> Persistent
                nuisance trips with no identified cause may need manufacturer support or
                specialist diagnostic equipment.
              </li>
            </ol>
            <p>
              <strong>Never:</strong> bypass the AFDD, replace with non-AFDD device, increase
              the I delta n. Each removes the fire protection; each may breach Reg 421.1.7
              expectations or HRRB-mandate building regulations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Customer briefing under Reg 132.13 — the AFDD documentation pack"
            plainEnglish="Reg 132.13 requires the documentation handover at certification to give the user the information needed to operate, maintain, inspect and test the installation safely. For AFDDs the brief is short but important — purpose (fire protection from arc faults), test-button protocol (quarterly, same as RCDs), what to do on trip (investigate plug-in equipment first)."
            onSite="Most AFDD manufacturers (Hager, Schneider, Wylex) provide customer-facing user information in PDF — download from the device datasheet page and include in the documentation pack. A brief verbal walk-through at handover, plus the written pack the customer keeps, satisfies Reg 132.13 for the AFDD."
          >
            <p>The AFDD customer brief content:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Purpose of the AFDD.</strong> "These devices protect against fires
                caused by arc faults in the wiring or in plug-in equipment. They detect the
                signature of arcing — typically caused by damaged flexes, loose terminals or
                worn accessories — and disconnect the circuit before a fire can develop."
              </li>
              <li>
                <strong>Test-button protocol.</strong> "Press the T button on each AFDD-RCBO
                quarterly. The device should trip immediately. Reset by switching back on. If
                any device fails to trip on the button, contact us."
              </li>
              <li>
                <strong>What to do on a trip in service.</strong> "If an AFDD trips during
                normal use, switch off any plug-in equipment on the circuit, reset the device,
                and plug equipment back in one item at a time to identify which one caused the
                trip. The most common cause is a damaged flex on a frequently-used appliance —
                kettle, vacuum cleaner, hair dryer. If you can\'t identify the cause, contact
                us."
              </li>
              <li>
                <strong>Lifespan and replacement.</strong> "AFDDs are designed for 10-15 year
                service life. Plan for replacement at consumer unit upgrade time."
              </li>
              <li>
                <strong>Manufacturer literature.</strong> Include the device manufacturer\'s
                user information in the documentation pack.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AFDD vs RCBO — when to recommend each"
            plainEnglish="RCBOs combine overcurrent and residual current protection. AFDD-RCBOs add arc-fault detection on top. The cost premium is 60-100 GBP per device. Recommend AFDD-RCBO on any new domestic CU upgrade as a fire-protection enhancement; mandatory for HRRB; strongly recommended for HMOs, hotels, care homes per Reg 421.1.7."
            onSite="Quote both options on a CU change — RCBO-only at the BS 7671 minimum compliance, AFDD-RCBO as the recommended fire-protection upgrade. Many customers will choose AFDD when the value is explained — the cost premium is small relative to the total CU change cost."
          >
            <p>Recommendation matrix:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HRRB (18 m+ / 7 storeys+ multi-residential):</strong> AFDD-RCBO
                MANDATORY per Building Safety Act 2022 building regulations.
              </li>
              <li>
                <strong>HMO, hotel, care home, sleeping accommodation:</strong> AFDD-RCBO
                strongly recommended per Reg 421.1.7. Specifier and customer education usually
                results in selection.
              </li>
              <li>
                <strong>Domestic dwelling (typical owner-occupied):</strong> AFDD-RCBO
                recommended per Reg 421.1.7 (wording is "recommending"). Customer choice;
                quote both options with cost transparency.
              </li>
              <li>
                <strong>Educational establishment, public building:</strong> AFDD-RCBO
                recommended for socket-outlet circuits per Reg 421.1.7.
              </li>
              <li>
                <strong>Commercial office, retail (no sleeping accommodation):</strong> Best
                practice but not specifically targeted by Reg 421.1.7. Consider for
                higher-fire-risk areas (kitchens, server rooms, storage of combustibles).
              </li>
              <li>
                <strong>Industrial:</strong> Generally not the typical scope — AFDDs are
                designed for socket circuits in occupied premises rather than industrial process
                circuits.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating Reg 421.1.7 as mandatory and quoting too high on jobs the customer can\'t afford"
            whatHappens={
              <>
                You\'re asked to quote a small CU upgrade for a customer on a tight budget. You
                quote AFDD-RCBOs throughout because "BS 7671 says so". Customer can\'t afford the
                quote, gets a competitor who quotes RCBO-only at lower cost, you lose the work.
                Worse — the customer now thinks AFDD is required by law and views you as having
                tried to upsell. The reality is Reg 421.1.7 is a recommendation, not a mandate
                (outside HRRBs); RCBO-only is fully BS 7671 compliant for typical domestic work.
              </>
            }
            doInstead={
              <>
                Quote both options clearly. "Option A — RCBO protection only, fully BS 7671
                compliant, total GBP X. Option B — AFDD-RCBO protection on socket and lighting
                circuits, additional fire protection beyond BS 7671 minimum, total GBP X + 600-
                1000 GBP. BS 7671 recommends AFDDs but doesn\'t mandate them outside HRRBs; the
                choice is yours." Customer makes an informed decision; many will choose AFDD
                when the value is explained; some will choose RCBO-only on cost, and that\'s a
                legitimate choice. The firm has presented both options professionally.
              </>
            }
          />

          <CommonMistake
            title="Forgetting AFDDs are sensitive to 500 V IR test on the line side"
            whatHappens={
              <>
                Routine commissioning IR test on a new install with AFDD-RCBOs. Apprentice
                connects the MFT at the line side of the device, runs 500 V IR test. Some of the
                AFDDs trip; some show low IR readings. Apprentice doesn\'t realise the 500 V is
                potentially damaging the AFDD electronics on the line side. After commissioning
                the AFDDs nuisance trip in service — they\'ve been partially damaged but not
                completely failed. Customer comes back complaining of trips; investigation reveals
                the IR test damaged the devices.
              </>
            }
            doInstead={
              <>
                Disconnect AFDDs (and RCBOs and SPDs) before the 500 V IR test, OR test on the
                load side only (so the test voltage doesn\'t reach the device electronics), OR
                use 250 V IR test if the device manufacturer permits. Most modern AFDD-RCBOs
                tolerate 500 V on the line side but the manufacturer manual is the source of
                truth — read it. GN3 explicitly identifies AFDDs, RCBOs, RCCBs and SPDs as
                devices that can be affected by IR test voltage.
              </>
            }
          />

          <Scenario
            title="AFDD commissioning on a new HMO conversion — Hager AFDD-RCBOs"
            situation={
              <>
                Three-storey HMO conversion in Brighton. New 18-way consumer unit, all-AFDD-RCBO
                spec because the project specification cited Reg 421.1.7 for HMO sleeping
                accommodation. Hager AFDD-RCBOs (BS EN 62606 compliant), 30 mA Type A. TN-C-S
                supply. Eight bedrooms, three kitchens, three bathrooms, common hall lighting.
                Time for commissioning verification.
              </>
            }
            whatToDo={
              <>
                Standard commissioning sequence with AFDD-specific steps. (1) Visual inspection
                — all AFDD-RCBOs labelled and identified on the circuit chart, terminations
                torqued per Hager spec, manufacturer documentation included in the handover pack.
                (2) Dead test set — continuity (R1+R2), IR test on each circuit. For IR, use the
                250 V range per Hager\'s recommendation for AFDD-RCBO line-side testing — confirms
                no damage to electronics. (3) Energise. (4) Live tests — Ze at the supply origin
                = 0.28 Omega. Per circuit Zs at the furthest point in no-trip mode (per A4:2026
                Reg 643.7.3 method from Sub 2). All within Type B 32 A measured limit 1.10 Omega.
                (5) RCD trip-time test on each AFDD-RCBO — single AC at 1 x I delta n per A4:2026
                Reg 643.7.3 (the new method). All trip times 25-40 ms, well within 300 ms
                product limit and 400 ms Table 41.1 TN final limit. (6) AFDD test button on each
                device — press T, device trips, reset. All function correctly. (7) Document
                everything on the EIC: RCD type "A" per circuit, RCD trip time per circuit, AFDD
                functional test pass / fail per circuit, BS EN 62606 device conformance noted in
                the test method notes. (8) Reg 132.13 documentation pack — Hager user manual for
                AFDD-RCBOs, customer brief on quarterly test-button protocol for both RCD and
                AFDD function, recommended next inspection date. Hand over to the duty holder
                with the CU label clearly identifying each AFDD-RCBO and its protected circuit.
              </>
            }
            whyItMatters={
              <>
                The HMO scope is exactly the kind of premises Reg 421.1.7 targets — sleeping
                accommodation, multiple occupants, evacuation potentially complex. AFDD
                protection is the recommended best practice and was specified for this project.
                The verification combines standard A4:2026 RCD method (single AC at 1 x I delta
                n) with the AFDD-specific functional test (manufacturer button). The customer
                handover under Reg 132.13 sets the duty holder up to maintain the protection
                between professional inspections — quarterly test-button on both RCD and AFDD
                functions. Without that documentation, the AFDDs may sit unmaintained for years
                and the duty holder has no knowledge of how to verify them.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 A4:2026 Reg 421.1.7 RECOMMENDS AFDDs on single-phase 32 A socket-outlet circuits in dwellings, sleeping accommodation, educational and similar premises. Wording is \"recommending\", NOT mandating.",
              "Building Safety Act 2022 mandates AFDDs in HRRBs (18 m+ / 7 storeys+ multi-residential) via separate building regulations. Different regime from BS 7671.",
              "AFDD verification is via the manufacturer test button only — no external instrument equivalent to the RCD trip-time test exists for the arc-detection function.",
              "BS EN 62606 is the AFDD product standard. Conformance underpins device performance trust. Modern devices (post-2018 designs) have significantly better discrimination than first-generation.",
              "AFDD-RCBO combines overcurrent + residual current + arc-fault protection in one device. Cost premium 60-100 GBP per circuit over RCBO-only. Quote as recommended option on domestic CU upgrades.",
              "Commissioning sequence on AFDD-RCBO: standard dead tests (with care for 500 V IR on electronics — use 250 V if manufacturer permits or disconnect device), single AC at 1 x I delta n for RCD half, manufacturer test button for AFDD half.",
              "Reg 132.13 documentation handover: brief customer on AFDD purpose (fire protection from arc faults), quarterly test-button protocol, what to do on trip (investigate flex / appliance first).",
              "Failed AFDD test button = replace the device. EICR Code C2 (potentially dangerous) for failed AFDD on a circuit relying on it for fire protection.",
            ]}
          />

          <Quiz title="AFDD test sequence + Reg 421.1.7" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.3 RCD trip-time testing (A4:2026)
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 PFC + PSCC + voltage drop measurement
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
