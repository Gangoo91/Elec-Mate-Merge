/**
 * Module 5 · Section 3 · Subsection 4 — Insulation resistance (Reg 643.3 / Table 64)
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.4, 5.5
 *   AC 5.4 — "specify the procedures for completing insulation resistance testing"
 *   AC 5.5 — "state the effects on insulation resistance values that cables connected in parallel and variations in cable length can have"
 * Layered: 2357 ELTK06 / IR testing
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

const TITLE = 'Insulation resistance — 500 V / 250 V SELV / 1000 V | Level 3 Module 5.3.4 | Elec-Mate';
const DESCRIPTION =
  'IR testing per BS 7671 Reg 643.3 and Table 64 — 500 V DC for circuits up to 500 V (≥ 1 MΩ), 250 V DC for SELV/PELV (≥ 0.5 MΩ), 1000 V DC for circuits above 500 V. Disconnect SPDs/electronics, two-stage test for circuits with AFDDs/RCBOs, parallel-path effects on long cable runs.';

const checks = [
  {
    id: 'm5-s3-sub4-test-voltage',
    question: 'Per BS 7671 Table 64, the test voltage and minimum acceptable IR for a 230 V LV final circuit is:',
    options: [
      'Charge-hand is a senior trade lead — typically an experienced Approved Electrician who runs a small gang of electricians and apprentices on a specific area of the work, reporting up to the Foreman. On a larger job there can be several Charge-hands under one Foreman, each leading a wing or a floor.',
      'Higher-risk activities (live working, hot works, work in confined spaces, work near other live services) on commercial and industrial sites — issued by the responsible person with named conditions and time limits.',
      'Business description, target market and competition, services and pricing strategy, financial projections (year 1 month-by-month, years 2-3 quarterly), marketing plan, operational plan. A working document, not a one-time exercise.',
      '500 V DC, ≥ 1 MΩ. Test voltage 500 V DC for any circuit rated up to and including 500 V (excluding SELV / PELV); minimum acceptable IR 1 MΩ. Anything below 1 MΩ requires investigation — between which conductors and what fixed appliance is contributing.',
    ],
    correctIndex: 3,
    explanation:
      'Table 64 (A4:2026) — for nominal circuit voltages up to and including 500 V (excluding SELV/PELV), test at 500 V DC, minimum IR 1 MΩ. The 1 MΩ figure is the absolute minimum for compliance; healthy modern installations typically read 100 MΩ+ (the meter often shows ">200 MΩ" or ">500 MΩ"). Readings between 1 MΩ and 100 MΩ should prompt investigation — could be a fixed appliance, a damp run, or early insulation degradation.',
  },
  {
    id: 'm5-s3-sub4-disconnect-electronics',
    question: 'Before performing an IR test on a final circuit that includes an RCBO at the CU and SPDs in the consumer unit, you should:',
    options: [
      'Disconnect or isolate components that present a low resistance during the IR test — RCBOs, RCDs, AFDDs, SPDs, electronic dimmers, capacitors, pilot/indicator lamps. Test in two stages per Reg 643.3.3 if the circuit cannot be cleanly isolated from these components, then verify the components separately.',
      'Apply the 0.8 rule for measured-vs-table comparison: Zs(measured) ≤ 0.8 × Zs(table) = 0.8 × 1.37 = 1.10 Ω. 1.05 ≤ 1.10 → pass with small margin (5 %). Worth noting on the schedule that compliance is borderline; investigate any reasons the cable might be hot in service (long run, bundled cables, high ambient temperature).',
      'The button only proves the trip mechanism (electromechanical or electronic latch + tripping spring) operates — it does not prove the residual-current-sensing transformer and electronics are detecting an actual residual current. An instrument-based test injects a real residual current of 30 mA at IΔn and measures the trip time, verifying the complete protective function.',
      'Identify which technology controls the faulty function by reading the drawings, then apply the appropriate diagnostic technique for that part of the system — I/O status for PLC, multimeter tracing for relay circuits',
    ],
    correctIndex: 0,
    explanation:
      'GN3 lists the components that can show a low resistance during IR test or be damaged by 500 V DC: RCCBs, RCBOs, AFDDs, SPDs, electronic dimmers, capacitors, fluorescent ballasts, LED drivers, fixed appliances. Reg 643.3.3 mandates a two-stage IR test for circuits where these components cannot be disconnected: first test L+N to E with all components in place (low test voltage); second test L to N at full 500 V with electronics isolated. Document both stages on the schedule.',
  },
  {
    id: 'm5-s3-sub4-parallel-paths',
    question: 'You IR test a 200 m underground submain on a commercial site. Reading is 0.8 MΩ at 500 V DC. The cable is single-core 95 mm² Al SWA, three runs in parallel per phase. What is your interpretation?',
    options: [
      'Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.',
      'Part P does NOT apply (Part P is dwellings-only). EAWR applies to the workplace electrical safety. The work needs an EIC or MEIWC for BS 7671 compliance and the contractor discharges EAWR duties through competent design and installation. No CPS upload required because Part P does not apply, but the contractor may still notify Building Control if other Building Regulations Parts are triggered (e.g. Part B fire safety, Part L energy efficiency).',
      'Fail at first glance (< 1 MΩ). But long parallel cables behave like resistors in parallel — three 200 m runs in parallel reduce the apparent IR by approximately 1/3. Each individual run could be reading roughly 2.4 MΩ. Test each parallel run independently to localise; document per-run IR. Long damp runs of underground cable show lower IR than short dry indoor runs — context matters.',
      'No — each extraneous-conductive-part must have its own dedicated main protective bonding conductor running back to the MET (or via a properly designed bonding bar). Daisy-chaining means a disconnection at one part disables bonding to the next, and the conductor’s integrity becomes dependent on the previous clamp.',
    ],
    correctIndex: 2,
    explanation:
      'Long cable runs and parallel cables both reduce apparent IR. Length: surface-area-proportional leakage, so doubling length halves IR. Parallel: like resistors in parallel, three identical runs reduce apparent IR to 1/3 of one run. Test each parallel cable separately to localise the lower-IR run. Underground cable IR also drops with moisture — the 1 MΩ minimum may need engineering judgement on long submains. Where a circuit is genuinely below 1 MΩ, investigate and remediate.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Table 64 (A4:2026) test voltage and minimum IR for SELV / PELV circuits:',
    options: [
      'MCCBs typically have adjustable trip settings (Ir, Isd, Ii) that must be correctly configured for the specific application, and their higher breaking capacities require careful verification against prospective fault current',
      '250 V DC, ≥ 0.5 MΩ for basic insulation and live-to-earth tests on SELV/PELV. The lower test voltage protects SPD-style components on low-voltage equipment; the lower acceptance threshold reflects the lower stress on the insulation in service.',
      'Annual leak check by F-Gas-certified personnel where charge ≥ 5 tonnes CO₂e, or every 2 years where charge < 5 tonnes; frequencies double if a leak detection system is installed and operational',
      'Power rating, voltage, speed, mounting type, IP rating, duty cycle, and operating environment from the original motor nameplate, equipment data sheet in the O&M manual, asset register in the CMMS, and the original design specification',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64: SELV/PELV circuits — 250 V DC, minimum IR 0.5 MΩ for both basic insulation (between live conductors and all other circuits) and live-to-earth. 250 V is chosen so SPDs and similar components on the SELV side are not damaged by an over-voltage test pulse. The 0.5 MΩ threshold reflects that SELV is by definition not a shock hazard so the safety margin can be lower.',
  },
  {
    id: 2,
    question: 'Test voltage for circuits rated above 500 V (e.g. some 1 kV control circuits or motor feeders):',
    options: [
      'Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor has the means to pay — sometimes a negotiated settlement or write-off is more commercially sensible',
      'Because the design uses a worst-case Cmin factor (0.95 in BS 7671 A4:2026 Appendix 14, since moved to Appendix 3) to allow for declared rather than measured Ze, expected temperature rise of conductors, and manufacturing tolerance — the install is then verified at ambient with the actual cable.',
      '1000 V DC, minimum IR per Table 64 (typically 1 MΩ at 1000 V). Used for circuits rated above 500 V up to 1000 V — the higher test voltage stresses the insulation appropriately for its in-service voltage and reveals defects that would not show at 500 V.',
      'Absence of trust — without trust, team members will not be vulnerable with each other, leading to fear of conflict, lack of commitment, avoidance of accountability, and ultimately inattention to collective results',
    ],
    correctAnswer: 2,
    explanation:
      'Table 64 row 3: circuits rated above 500 V up to 1000 V — 1000 V DC test voltage. Less common in domestic / small commercial work but routine on industrial sites with 690 V three-phase or larger control systems. The IR meter must support 1 kV output; not all entry-level MFTs do.',
  },
  {
    id: 3,
    question: 'Setting up an IR test on a final circuit at the CU:',
    options: [
      'Redesign — options include increasing the cpc CSA (e.g. from 1.5 mm² to 2.5 mm² as a separate cpc on a single-cable run), shortening the route by relocating the device or the load, dropping to a lower-rated device (B25 max Zs = 1.75 Ω), or fitting a 30 mA RCD as the alternative path under Reg 411.4.204 if the circuit type allows it.',
      'Witnesses fade fast — by the next day they\\\\\\\\\\\\\\\'ve reconstructed events differently, by the next week they\\\\\\\\\\\\\\\'ve forgotten details, by the next month their memory has merged with what they later read or heard. Asking each witness to write down what they saw, in their own words, on the day of the incident, captures evidence at its strongest. The HSE / insurer / firm\\\\\\\\\\\\\\\'s defence team will all want this evidence later.',
      'Internal to firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s responsible person; external to Environment Agency 0800 80 70 60 (24/7) in England, SEPA in Scotland, NRW in Wales. For controlled waters / water pollution / land contamination / hazardous-substance escape. Local authority for noise nuisance / contaminated land issues.',
      'Safely isolate. Open all switches and disconnect any wired-in fixed appliances (or accept Reg 643.3.3 two-stage method). Disconnect L and N at the protective device; if the circuit shares a neutral bar with other circuits, lift its neutral too. Connect the IR tester between L and CPC, then N and CPC, then L and N (each combination). Press TEST. Reading must be ≥ 1 MΩ for a 500 V test.',
    ],
    correctAnswer: 3,
    explanation:
      'IR test setup: safe isolation, then disconnect the circuit cleanly from any path that bypasses the insulation under test (other circuits via shared neutral bar, electronics that present low resistance). Test each conductor combination — L to E, N to E, L to N — and record per circuit. The L-N test catches short-circuit faults; L-E and N-E catch insulation breakdown to earth. All three must be ≥ 1 MΩ at 500 V (or 0.5 MΩ at 250 V for SELV).',
  },
  {
    id: 4,
    question: 'You measure IR L-E on a kitchen radial = 0.4 MΩ at 500 V DC. The circuit feeds a built-in dishwasher (still wired in) and a recessed 230 V LED downlight strip. Most likely cause:',
    options: [
      'A fixed appliance is contributing leakage. Disconnect the dishwasher at its connection unit, retest. If IR rises above 1 MΩ the dishwasher was the cause. Disconnect the LED driver at the downlights, retest. The reading should now reflect the cable insulation alone — typically tens or hundreds of MΩ.',
      'Indirectly - 30-year DPA liability, competence framework changes, Building Regs amendments (Approved Doc B fire safety especially), regulatory direction-of-travel emphasising traceability and certified competence.',
      'Because both have finite lives — panels are typically guaranteed for 25+ years (with declining output), inverters for 5–15 years (and need replacing within the system life), lithium-ion batteries for 10–15 years before significant capacity fade. The customer should understand the install isn’t fit-and-forget forever.',
      'That it correctly transfers the load between sources, that the make-before-break or break-before-make sequence is correct for the application, and that mechanical and electrical interlocks prevent paralleling of sources',
    ],
    correctAnswer: 0,
    explanation:
      'Modern installations have many components downstream of the CU that can lower IR: fixed appliances with line filters, LED drivers with input capacitors, fluorescent ballasts, electronic dimmers, smart controls. The diagnostic process: disconnect each suspect component in turn, retest after each disconnection, watch for the reading to rise. The component that caused the rise is the contributor. Document on the schedule which components were disconnected.',
  },
  {
    id: 5,
    question: 'Effect of cable length on measured insulation resistance:',
    options: [
      'Regulation 132.13 — the explicit requirement for design documentation. Plus Reg 514.9.1 which addresses the on-site distribution board diagram requirement (with the A4:2026 domestic exception). Plus Reg 644.1.1 which makes the EIC and supporting documentation conditional on defect rectification. Plus Section 514 series on identification and notices.',
      'Inversely proportional. Doubling the cable length doubles the surface area for leakage, halving the apparent IR. A 50 m run reading 200 MΩ would read approximately 100 MΩ at 100 m for the same insulation quality. On long runs (especially underground or in damp conditions), the absolute MΩ figure matters less than the consistency between runs of similar length.',
      'Mandatory medical assessment. ECG to check for cardiac arrhythmia (which can develop hours after the event). Examination for entry / exit burns (often deep with little surface marking). Assessment for muscle damage and rhabdomyolysis. Even a brief 230V shock warrants A&E.',
      'Shock / direct contact → EAWR Reg 4 / 13 + BS 7671. Arc-flash → EAWR Reg 4 + 14 + COSHH (combustion products) + EN 61482 PPE. Fire → EAWR + RRFSO 2005 + Approved Doc B. Secondary injury → MHSWR Reg 3 (assessment of consequence chain). Each hazard has its regulatory home.',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation leakage scales with surface area exposed to the test voltage — surface area is proportional to length. So IR (in MΩ) is inversely proportional to length. Long cable runs report lower IR for the same insulation quality. The 1 MΩ minimum is generally easy to meet for short domestic runs (typically 50-500 MΩ), but tight on long submains. Where length is the dominant factor, comparing IR per metre or per km gives a fairer picture.',
  },
  {
    id: 6,
    question: 'Effect of parallel cables (multi-core or single-core in parallel) on measured IR:',
    options: [
      'Contractor must satisfy themselves the client knows their CDM client duties before starting work — particularly relevant on commercial projects where domestic-style cascade doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t apply.',
      'An Electrical Installation Certificate (EIC), accompanied by a Schedule of Inspections AND a Schedule of Test Results — the three-document set required by Section 644 for full initial verification.',
      'Like parallel resistors. Two equal-IR cables in parallel halve the apparent IR. Three reduce it to one-third. To localise a low-IR fault on parallel cables, isolate one cable at a time and retest — the cable whose disconnection raises the reading is the lower-IR run.',
      'Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens',
    ],
    correctAnswer: 2,
    explanation:
      'IR in MΩ behaves like ohms in conductivity terms. Two cables in parallel each at 4 MΩ give a combined apparent IR of 2 MΩ. The combined reading is dominated by the worst run. Diagnostic technique: disconnect one parallel run at a time, retest, watch for the reading to rise — the disconnected cable is responsible for the difference. This is essential on commercial installations with parallel single-core SWA submains.',
  },
  {
    id: 7,
    question: 'Reg 643.3.3 — two-stage IR test required when:',
    options: [
      'Right not to suffer detriment for raising a H&S concern, refusing dangerous work, leaving the workplace in serious and imminent danger, or being a designated H&S representative. Detriment = sacking, demotion, removal from job, disciplinary, victimisation, harassment.',
      'Public-sector procurement, larger commercial clients and lenders increasingly require credible carbon reporting, MCS competence and waste-hierarchy compliance — without these you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'re locked out of growing markets like heat pumps, EV, PV and battery',
      'Confirm: (1) clamp is on consumer side of the meter and on hard metal pipework before any branch; (2) within 600 mm of the meter outlet union where practicable; (3) pipe cleaned to bare metal under the clamp jaw; (4) jointing paste applied; (5) clamp screw torqued to manufacturer spec; (6) "Safety Electrical Connection — Do Not Remove" warning label fitted on the clamp body or conductor; (7) bonding conductor secure and labelled at the MET end.',
      'When the circuit contains components that may present low resistance during the IR test or be damaged by the test voltage — RCBOs, RCDs, AFDDs, SPDs, capacitors, electronic dimmers — and cannot be disconnected for the test. First stage: test L+N together to earth at full voltage with everything in place. Second stage: test L to N with electronics isolated.',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.3.3 — the two-stage method exists because modern installations have so many electronic devices that disconnecting all of them for an IR test is impractical. Stage one tests L and N joined together against earth — the electronics see no voltage between L and N so are not stressed; the IR is only measured to earth (which is what matters for shock protection). Stage two tests L-N alone with electronics isolated to verify line-neutral insulation.',
  },
  {
    id: 8,
    question: 'IR result interpretation — a healthy modern installation typically reads:',
    options: [
      'Between 50 MΩ and over the meter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s maximum range (typically &gt; 200 MΩ or &gt; 999 MΩ depending on model). The 1 MΩ minimum is for borderline acceptance; a well-installed dry circuit with no contributing components should read tens or hundreds of MΩ. Readings between 1-50 MΩ warrant investigation even though they pass — there is leakage from somewhere.',
      'Close to specific sensitive equipment — usually within a few metres of the equipment terminals (server cabinet, medical equipment, AV / studio gear, specialised electronic plant). Provides the final stage of cascade reduction; typically combined with Type 2 upstream.',
      'Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries',
      'A comprehensive assessment that accounts for all greenhouse gas emissions over the entire life of a building, including embodied carbon (materials and construction), operational carbon (energy in use), and end-of-life carbon (demolition and disposal)',
    ],
    correctAnswer: 0,
    explanation:
      'A healthy domestic radial with modern PVC insulation, dry conditions, and no contributing electronics should read off the top of the IR meter\'s range. Readings of 100 MΩ+ are normal. Readings between 1 and 50 MΩ are technically passing but worth investigating — early insulation degradation, damp run, contributing fixed appliance. Anything below 1 MΩ is a fail and must be remediated before the circuit can be signed off as compliant.',
  },
];

const faqs = [
  {
    question: 'Why does the IR test use DC and not AC?',
    answer:
      'DC measures pure leakage resistance with no capacitive component. AC at the same voltage would also drive current through any capacitance in the circuit (cable-to-cable, cable-to-earth, electronic component capacitors), giving an apparent low IR that has nothing to do with insulation health. DC settles to a steady-state leakage current after the initial capacitive charge, and the resulting MΩ value reflects insulation quality alone.',
  },
  {
    question: 'How long do I hold the test for?',
    answer:
      'Standard practice: press TEST and hold until the reading stabilises — typically 5-10 seconds for a domestic radial, longer for cables with significant capacitance (long submains, screened cable). The initial display jumps as the cable charges through its capacitance; wait for the reading to settle. Modern MFTs auto-discharge the cable after the test (otherwise the cable holds 500 V DC for some time, which can give you a nasty bite if you touch the conductors).',
  },
  {
    question: 'What about the auto-discharge feature on modern IR testers?',
    answer:
      'Test instruments compliant with BS EN 61557-2 include an auto-discharge function — when you release the TEST button, the meter applies a low-resistance internal discharge path across its terminals to bleed the cable\'s stored charge to zero. Wait for the meter to confirm discharge before disconnecting leads. On older meters without auto-discharge, manually discharge by short-circuiting the cable terminals to earth via a low-value resistor or a discharge stick.',
  },
  {
    question: 'Do I test L to N as well as L and N to earth?',
    answer:
      'Yes — three combinations per circuit on a single-phase final: L to E, N to E, L to N. The L-N test catches short-circuit faults between live conductors. L-E and N-E catch insulation breakdown to earth. On three-phase the combinations expand: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E — ten readings per circuit. Many MFTs have a "quick test" mode that runs all combinations sequentially.',
  },
  {
    question: 'My IR result on a long submain just scrapes 1 MΩ — what do I do?',
    answer:
      'It passes the absolute minimum but warrants investigation. Long submains, especially underground or in damp conditions, can read close to 1 MΩ legitimately due to length and moisture. But also: contaminated terminations at the gland points, damaged cable, water ingress at the joint. Diagnostic: test from each end separately, test in dry weather, inspect the cable route for damage. Document the result and the investigation; the EIC must reflect the genuine condition. If genuinely 1 MΩ borderline, schedule a periodic retest sooner than normal.',
  },
  {
    question: 'Can I IR test through a fixed appliance instead of disconnecting it?',
    answer:
      'Generally no — many fixed appliances contain capacitors or filter components that present low resistance to the IR test voltage. The reading will reflect the appliance, not the cable insulation. Reg 643.3.3 allows the two-stage approach where disconnection is impractical, but for a clean cable-insulation reading you should disconnect the appliance at its connection unit. Document on the schedule which appliances were disconnected and which were tested in situ via the two-stage method.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 4"
            title="Insulation resistance — 500 V / 250 V SELV / 1000 V"
            description="IR per Reg 643.3 and Table 64. Test voltage by circuit type, disconnection of electronic components, parallel-path and length effects, two-stage method per Reg 643.3.3, diagnostic walkthrough for low IR results."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Reg 643.3 mandates IR testing of every circuit. Table 64: 500 V DC ≥ 1 MΩ for LV up to 500 V; 250 V DC ≥ 0.5 MΩ for SELV/PELV; 1000 V DC for circuits above 500 V.',
              'Disconnect or isolate components that present low resistance: RCBOs, RCDs, AFDDs, SPDs, capacitors, electronic dimmers, fixed appliances. Reg 643.3.3 two-stage method where disconnection is impractical.',
              'Test L-E, N-E and L-N combinations per circuit. A healthy install reads 50 MΩ+ (often above the meter\'s range). 1-50 MΩ passes but warrants investigation. Below 1 MΩ fails.',
              'Cable length and parallel paths reduce apparent IR. Long submains may legitimately read closer to 1 MΩ; localise low IR by disconnecting parallel runs one at a time.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the IR test voltage and minimum acceptable IR for LV, SELV/PELV and HV circuits per BS 7671 Table 64 (AC 5.4).',
              'Describe the procedure for completing an IR test — isolation, disconnection of vulnerable components, conductor combinations, reading interpretation (AC 5.4).',
              'Explain the effect of cable length and parallel-connected cables on measured IR values (AC 5.5).',
              'Apply the two-stage IR test method per Reg 643.3.3 for circuits with electronics that cannot be disconnected.',
              'Diagnose low IR results by sequential disconnection of fixed appliances and electronic components.',
              'Use auto-discharge functionality on modern MFTs and verify cable discharge before disconnecting leads.',
              'Document IR results per conductor combination on the Schedule of Test Results (Appendix 6).',
            ]}
            initialVisibleCount={4}
          />

          <VideoCard
            url={videos.insulationResistanceAmd2.url}
            title={videos.insulationResistanceAmd2.title}
            channel={videos.insulationResistanceAmd2.channel}
            duration={videos.insulationResistanceAmd2.duration}
            topic="Insulation resistance per A4:2026 · Unit 304 LO5"
            caption="Craig Wiltshire walks through the IR test procedure under the latest amendment — test voltage selection from Table 64, conductor combinations, and what to do when the reading comes back low."
          />

          <ContentEyebrow>What IR proves and why the test voltage matters</ContentEyebrow>

          <ConceptBlock
            title="Insulation resistance is the safety margin between conductors and earth"
            plainEnglish="The IR test applies a DC voltage between two points (typically a conductor and earth, or two conductors) and measures the leakage current. The ratio of test voltage to leakage gives the insulation resistance in MΩ. The test catches insulation degradation, damaged cable, moisture ingress and conductive contamination — anything that lowers the resistance between conductors below safe limits."
            onSite="A 230 V circuit with an IR of 1 MΩ to earth would leak 0.23 mA at full voltage — barely below the trip threshold of a 30 mA RCD, but enough to cause unwanted trips on multi-circuit boards where leakage adds up. A circuit at 100 MΩ leaks 0.0023 mA — vanishingly small. The test is the early warning system."
          >
            <p>The IR test detects three categories of fault:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductor-to-earth insulation breakdown.</strong> The most safety-critical
                category — a degraded line-to-CPC insulation can put exposed metal at line voltage.
                Detected on the L-E test.
              </li>
              <li>
                <strong>Conductor-to-conductor insulation breakdown.</strong> Short-circuit
                hazard between L and N. Detected on the L-N test. Less immediate shock risk but
                still hazardous (high fault current, possible fire).
              </li>
              <li>
                <strong>Neutral-to-earth leakage.</strong> Often missed but important — N-E
                leakage causes nuisance RCD trips and can mask real L-E faults if the residual
                current sums them. Detected on the N-E test.
              </li>
            </ul>
            <p>
              The test voltage is chosen to stress the insulation appropriately for its in-service
              voltage. 500 V DC for LV stresses 230 V cable insulation safely above its working
              voltage but well below its breakdown voltage (typically &gt; 5 kV for PVC). 250 V
              for SELV protects sensitive components on extra-low-voltage equipment. 1000 V for
              HV LV stresses cable rated above 500 V appropriately.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Table 64 (Minimum values of insulation resistance) and Reg 643.3"
            clause="Test voltages and minimum acceptable insulation resistance values: SELV and PELV — test voltage 250 V DC, minimum IR 0.5 MΩ. Up to and including 500 V (with the exception of SELV and PELV circuits) — test voltage 500 V DC, minimum IR 1 MΩ. Above 500 V — test voltage 1000 V DC, minimum IR 1 MΩ. Insulation resistance shall be measured between live conductors and between live conductors and the protective conductor connected to the earthing arrangement."
            meaning={
              <>
                Three rows in Table 64. Each row binds test voltage to acceptance threshold.
                500 V at 1 MΩ is the standard for the bulk of UK domestic and small commercial
                work. SELV at 250 V / 0.5 MΩ for ELV control circuits and bell wiring. 1000 V at
                1 MΩ for circuits above 500 V. Choose the test voltage from the circuit rating —
                always test L-L, L-N and L-E (or all combinations on three-phase).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Table 64 + Regulation 643.3."
          />

          <SectionRule />

          <ContentEyebrow>The test setup — what to isolate, what to disconnect</ContentEyebrow>

          <ConceptBlock
            title="Disconnect everything that bypasses the insulation under test"
            plainEnglish="The IR test measures the resistance between two points. Anything else connected between those points — a load, a capacitor, an electronic component — adds a parallel path that the meter can't distinguish from insulation leakage. The job is to isolate the cable insulation as the only path."
            onSite="A modern install has way more electronics than a 1990s install. Dimmer switches, LED drivers, USB sockets, smart relays, broadband filters — all sit between L and N or N and E. Disconnect or use the two-stage method, but don't pretend they aren't there."
          >
            <p>What to disconnect (or use the Reg 643.3.3 two-stage method for):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCBOs, RCDs, AFDDs at the CU.</strong> Internal electronics and varistors
                show low resistance to a 500 V DC pulse and may be damaged by the test. Lift
                the L and N from the device terminals.
              </li>
              <li>
                <strong>SPDs (Type 1, 2, 3 surge protective devices).</strong> Designed to clamp
                at over-voltages — your 500 V DC test triggers them. Isolate by removing the
                module or lifting its connections.
              </li>
              <li>
                <strong>Electronic dimmer switches.</strong> Phase-cut electronics include
                capacitors and inductors that show as low IR.
              </li>
              <li>
                <strong>Fixed appliances and white goods.</strong> Built-in dishwashers, ovens,
                washer-dryers — mains filters with Y capacitors leak appreciable current at
                500 V DC. Disconnect at the connection unit.
              </li>
              <li>
                <strong>LED drivers, fluorescent ballasts, fan motors.</strong> Input capacitors
                contribute leakage. Disconnect downstream of the supply or isolate the lamp /
                fitting.
              </li>
              <li>
                <strong>Pilot/indicator lamps, capacitors in motor circuits.</strong> Direct
                contributors to apparent low IR — disconnect.
              </li>
            </ul>
            <p>
              <strong>The two-stage Reg 643.3.3 alternative</strong> when full disconnection is
              impractical:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — L+N together to E.</strong> Bridge L and N at the CU end.
                Test from the L+N junction to earth at full 500 V DC. Electronics see no voltage
                between L and N (so are not stressed); the test only measures leakage to earth
                — the safety-critical path.
              </li>
              <li>
                <strong>Stage 2 — L to N.</strong> Disconnect or isolate electronics, then test
                L to N at 500 V DC to verify line-to-neutral insulation independently.
              </li>
            </ol>
            <p>
              Document both stages on the schedule. Note which components were isolated for
              Stage 2 — the next inspector will need to know.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET GN3 9th Ed:2022 — Section 4.4 (Insulation resistance — vulnerable components) and Reg 643.3.3"
            clause="Certain protective devices such as RCCBs, RCBOs, AFDDs, and surge protection devices, as well as similar electronic components, can present a low resistance during an insulation resistance test and are specifically noted because they affect the validity or safety of such tests. For circuits containing multipole relays/contactors that open on power removal, or certain protective/electronic devices that present low resistance during a test (including RCCBs, RCBOs, AFDDs, SPDs), Regulation 643.3.3 requires the insulation resistance test to be conducted in two stages. Prior to carrying out the insulation resistance test, the inspector shall disconnect pilot or indicator lamps, and capacitors from circuits to avoid an inaccurate test value being obtained."
            meaning={
              <>
                GN3 codifies the components to watch for, and Reg 643.3.3 provides the two-stage
                method when disconnection is impractical. The list grows with every new amendment
                because installations add more electronic content over time. The principle is
                stable: anything that conducts at 500 V DC must be removed from the test path or
                the result reflects the device, not the insulation.
              </>
            }
            cite="Source: IET Guidance Note 3, 9th Edition (2022, A4 corrected), Section 4.4, with Regulation 643.3.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Conductor combinations — what to test and what to record</ContentEyebrow>

          <ConceptBlock
            title="Test every combination per circuit and record per the schedule"
            plainEnglish="A single-phase final circuit gives three IR readings: L to E, N to E, L to N. Each catches a different fault mode. Record all three on the schedule of test results — they are individually meaningful, not interchangeable. On three-phase the combinations expand to ten."
            onSite="Many MFTs offer a 'sequence' or 'three-phase' mode that runs all combinations one after another and stores the results. Saves time on commissioning a large board, and keeps the data clean."
          >
            <p>Single-phase final circuit — three IR readings per circuit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L to E (line to earth).</strong> The most safety-critical reading.
                Failure mode: insulation degradation between line and CPC, or between line and
                an exposed-conductive-part. Result: exposed metal can become live.
              </li>
              <li>
                <strong>N to E (neutral to earth).</strong> Detects N-E leakage that causes
                nuisance RCD trips and can mask real L-E faults on multi-circuit RCDs.
              </li>
              <li>
                <strong>L to N (line to neutral).</strong> Catches short-circuit hazard between
                live conductors — typically less immediate shock risk but still significant for
                fire and equipment damage.
              </li>
            </ul>
            <p>Three-phase circuit — ten combinations per circuit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1-L2, L1-L3, L2-L3 (line-to-line, three combinations)</li>
              <li>L1-N, L2-N, L3-N (line-to-neutral, three combinations)</li>
              <li>L1-E, L2-E, L3-E (line-to-earth, three combinations)</li>
              <li>N-E (neutral-to-earth, one combination)</li>
            </ul>
            <p>
              Record all combinations on the STR. The lowest reading per circuit determines
              compliance. If you get one reading at 0.8 MΩ and the others all above 100 MΩ, the
              circuit fails — and you have located the fault to whichever conductor pair gave
              the low reading.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Length, parallel paths, and reading interpretation</ContentEyebrow>

          <ConceptBlock
            title="Why long cables and parallel runs read lower than short single cables"
            plainEnglish="Insulation leakage scales with surface area exposed to the test voltage. Doubling cable length doubles the leakage area, halving the apparent IR. Putting cables in parallel multiplies the leakage paths — three identical cables in parallel reduce IR to one-third. The 1 MΩ minimum is easy to meet on short domestic runs; on long submains and parallel cables it can be borderline."
            onSite="On a 200 m underground submain, expect IR readings of 5-50 MΩ rather than the 200 MΩ+ you'd see on a 5 m kitchen radial. The cable can be in perfect condition. Use length-corrected expectations, not the absolute number."
          >
            <p>The two effects that lower apparent IR (without anything being wrong):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Length.</strong> IR is inversely proportional to length. A 50 m cable
                reading 200 MΩ would read approximately 100 MΩ at 100 m. The cable insulation
                quality is the same; the larger surface area leaks more.
              </li>
              <li>
                <strong>Parallel paths.</strong> Cables in parallel act like resistors in
                parallel for IR. Two equal cables in parallel halve the IR. Three reduce it to
                one-third. Common on commercial submains where multiple single-core cables run
                in parallel per phase to handle high current.
              </li>
            </ul>
            <p>
              <strong>How to localise a low IR fault on parallel cables:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Test the parallel set — gives the worst-case combined IR.</li>
              <li>
                Disconnect one cable at a time, retest. The cable whose disconnection raises the
                reading by the largest amount has the lowest individual IR.
              </li>
              <li>
                Test that cable in isolation to confirm the absolute IR of the suspect run.
              </li>
              <li>
                Investigate that run — terminations, cable damage, water ingress at glands.
              </li>
            </ol>
            <p>
              <strong>Reading interpretation guide:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>{'>'} 200 MΩ (often display max):</strong> Excellent, expected on a
                healthy short dry circuit with no contributing components.
              </li>
              <li>
                <strong>50-200 MΩ:</strong> Healthy, normal range for a typical domestic radial.
              </li>
              <li>
                <strong>10-50 MΩ:</strong> Acceptable, but worth noting — early degradation,
                long run, or some contributing component still attached.
              </li>
              <li>
                <strong>1-10 MΩ:</strong> Passes the absolute minimum but warrants investigation.
                Long damp run? Fixed appliance not disconnected? Borderline insulation health?
              </li>
              <li>
                <strong>{'<'} 1 MΩ:</strong> Fails Table 64. Investigate, isolate, repair, retest.
                Do not sign off until the reading is above 1 MΩ.
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

          <ConceptBlock
            title="Test voltage selection — 250 V, 500 V or 1000 V"
            plainEnglish="The IR test voltage is selected to stress the insulation safely without damaging the equipment. BS 7671 Table 64.1 sets the rated test voltages by circuit nominal: SELV / PELV uses 250 V DC, the standard 230 V LV final circuit uses 500 V DC, distribution and sub-mains above 500 V AC use 1000 V DC. A4:2026 added a new 643.3 provision — where the equipment connected is likely to influence the result or be damaged, drop to 250 V DC instead of the default."
            onSite="Read the test voltage selector on the MFT before pressing the button. The default is usually 500 V; circuits with surge protective devices, RCDs with electronic test buttons, dimmers or any LED driver wired in benefit from the 250 V setting. The 1000 V setting is reserved for distribution and sub-main testing where the cables are oversized and the equipment is robust. Record the test voltage used on the schedule of test results — same circuit retested at a different voltage gives a different reading."
          >
            <p>
              Voltage choice matrix:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>250 V DC</strong> — SELV and PELV circuits (extra-low voltage),
                or A4:2026 643.3 reduced-voltage test where equipment damage is a risk
                with electronics still connected.
              </li>
              <li>
                <strong>500 V DC</strong> — standard 230 V LV final circuits and most
                three-phase 400 V circuits. The default for nearly every domestic and
                commercial final-circuit IR test.
              </li>
              <li>
                <strong>1000 V DC</strong> — distribution / sub-main circuits above 500
                V AC, and PV DC string testing per IEC 62446-1 (where the array DC
                voltage routinely sits at 600-1000 V Voc).
              </li>
              <li>
                <strong>Pass thresholds</strong> — 0.5 MΩ for SELV / PELV, 1 MΩ for LV
                circuits, 1 MΩ for HV. Above the minimum is acceptable; well above
                indicates healthy insulation.
              </li>
              <li>
                <strong>Recording</strong> — voltage used and reading per circuit. A
                250 V test reading 1.5 MΩ is a different result from a 500 V test
                reading 1.5 MΩ; the next inspector needs to see which was applied.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IR on PV DC strings — IEC 62446-1 procedure"
            plainEnglish="A PV DC string is a sequence of panels in series, with line and earth conductors running from each string back to the inverter combiner. IR testing on PV uses 1000 V DC test voltage and tests each string array-positive-to-earth and array-negative-to-earth separately. Pass threshold per IEC 62446-1 is typically above 1 MΩ; results below indicate water ingress at a junction box, damaged cable insulation or laminate fault in a panel. The test runs before the inverter is energised because PV strings stay live whenever sunlight hits the panels."
            onSite="Use a multifunction PV tester (Megger PVM210, Seaward PV150, HT IV400) that automates the IEC 62446-1 sequence. Isolate the inverter at AC and DC, connect to the string DC terminals upstream of the inverter, run the IR test array-positive-to-earth, then array-negative-to-earth, then between conductors. Compare against expected — clean dry array typically reads tens of megohms. A reading below 0.5 MΩ rejects the string until the fault is traced. Record per-string IR results on the PV commissioning sheet alongside Voc, Isc and polarity."
          >
            <p>
              PV-specific IR considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wet vs dry conditions</strong> — IR drops in wet weather as
                surface leakage rises. IEC 62446-1 allows a temperature / humidity
                correction factor; on a damp roof, a marginal reading may be acceptable
                if the dry-weather retest passes.
              </li>
              <li>
                <strong>Array capacitance</strong> — large arrays act as a capacitor;
                allow the tester to settle (15-30 seconds) before reading. Modern PV
                testers handle this automatically.
              </li>
              <li>
                <strong>Common low-IR causes</strong> — water in the junction box of a
                panel, damaged DC cable insulation at a roof penetration, broken
                laminate at the corner of a panel where roof debris struck.
              </li>
              <li>
                <strong>Safety on the test</strong> — DC strings are live in daylight;
                isolate the inverter, work with insulated tools, never lift a live DC
                connector under load.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diagnostic walkthrough — what to do when IR comes in low"
            plainEnglish="A low IR result is a finding, not a fail-and-walk-away. The methodical approach: isolate suspected contributors one at a time, retest after each isolation, watch for the reading to rise. The contributor whose isolation caused the rise is responsible for that share of the leakage."
            onSite="Don't just throw the megger at the problem. Think about what's downstream — every fixed appliance, every dimmer, every LED driver. Build a hypothesis, test it by disconnection. The fault location is usually obvious within 2-3 disconnections."
          >
            <p>Step-by-step diagnostic for low IR:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Confirm the reading. Repeat the test, hold longer, ensure the cable has
                discharged before disconnecting probes. Drift can indicate a damp termination.
              </li>
              <li>
                Verify the test voltage is correct for the circuit type (Table 64). 500 V on a
                SELV circuit gives a low reading because it stresses components beyond their
                design.
              </li>
              <li>
                Check what's downstream — list every fixed appliance, dimmer, LED driver, smart
                relay, dimmable LED bulb still in the fitting.
              </li>
              <li>
                Disconnect the most suspect first (usually the most recently added or the most
                complex electronically). Retest.
              </li>
              <li>
                If the reading rises significantly, that component was contributing. Note it on
                the schedule as "tested in two-stage; component XXX disconnected for stage 2".
              </li>
              <li>
                Continue disconnecting until the reading reflects cable insulation alone
                (typically 50 MΩ+).
              </li>
              <li>
                If the reading stays low even with everything disconnected, the cable insulation
                itself is the issue — investigate cable damage, water ingress at JBs, damp
                terminations, or in extreme cases cable replacement.
              </li>
              <li>
                After diagnosis: reconnect everything, retest as a final confirmation. Document
                the diagnostic process, the components disconnected, and the final readings.
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

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="IR testing without disconnecting fixed appliances and accepting the low reading"
            whatHappens={
              <>
                You test a kitchen ring with the dishwasher, washing machine and oven all wired
                in. The L-N reading comes in at 0.8 MΩ. You assume the cable has failed, log a
                C2 on the EICR, and walk away. Customer pays for cable replacement that wasn't
                needed. The actual fault was the line filter capacitors in the washing machine
                contributing leakage. A 5-minute disconnection check would have shown the cable
                is fine.
              </>
            }
            doInstead={
              <>
                Always check what's downstream before condemning a cable. Disconnect the suspect
                fixed appliances at their connection units, retest. If the reading jumps above
                1 MΩ (and ideally above 50 MΩ) with the appliances disconnected, the cable is
                fine — the appliances are contributing. Log on the schedule that the test was
                performed with appliances XYZ disconnected, and verify them separately as
                portable appliance tests if appropriate.
              </>
            }
          />

          <Scenario
            title="IR testing a small office refurb on a Kewtech KT64+"
            situation={
              <>
                You are commissioning a small office refurbishment in Birmingham. New 8-way CU,
                six radial circuits including an office ring final, lighting circuit with eight
                dimmable LED downlights on a wall-mounted electronic dimmer, FELV controls
                circuit feeding desk-level USB modules, and a kitchenette with a wired
                microwave-oven combination. You have completed continuity testing and now need
                IR per Reg 643.3 across the board.
              </>
            }
            whatToDo={
              <>
                Safe isolation, disconnect all six RCBOs at their L and N terminals. Lift SPD
                modules. Identify circuits with electronics: dimmer-controlled lighting, FELV
                controls, kitchen microwave. For each circuit decide: full disconnection or
                two-stage. Office ring: disconnect the ring at the CU, no electronics, full test
                at 500 V DC. L-E = &gt; 200 MΩ; N-E = &gt; 200 MΩ; L-N = &gt; 200 MΩ. Pass. Lighting:
                two-stage per Reg 643.3.3 — bridge L+N at the CU, test to E at 500 V — reading
                comes in at 85 MΩ (some leakage from the dimmer module). Then disconnect the
                dimmer at its load terminals, test L-N at 500 V — &gt; 200 MΩ. Pass with two-stage
                method, dimmer noted as the contributor. FELV controls: this is a SELV circuit,
                switch the Kewtech KT64+ to 250 V test voltage. L-E = 12 MΩ (passes the 0.5 MΩ
                SELV minimum comfortably). Kitchen radial: disconnect the microwave at its FCU,
                test at 500 V — all combinations &gt; 100 MΩ. Document each circuit on the STR with
                the L-E, N-E and L-N readings, the test voltage used, and any disconnections
                made. Reconnect everything, energise, and proceed to live testing in Section 4.
              </>
            }
            whyItMatters={
              <>
                Modern installations are full of electronics. The IR test discipline — pick the
                right test voltage from Table 64, disconnect or use the two-stage method, record
                what you did, document the readings — is what separates a verification-grade
                test from a number scribbled in a column. The next inspector picking up this
                board in five years can re-test, get similar readings, and trust the chain of
                evidence. The customer gets an installation with proven insulation health, and
                the next tradesperson on site can work confident the previous tester didn't
                accept a contaminated reading.
              </>
            }
          />

          <ConceptBlock
            title="IR on three-phase circuits — ten combinations and the missing-neutral case"
            plainEnglish="A three-phase circuit has more conductors than a single-phase circuit so the IR test has more combinations. The full set is L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E — ten combinations against three for single-phase. Some three-phase loads (motors, three-phase inverters) carry no neutral conductor; in that case the four neutral combinations drop out and the test set is six."
            onSite="Practical shortcut for healthy installs: link L1, L2, L3 together at one end, link N separately, then test the linked-Ls to N (one reading covers L1-N, L2-N, L3-N together) and linked-Ls to earth (covers L1-E, L2-E, L3-E together). If the linked test passes well above the threshold, the per-conductor combinations also pass; if it reads marginal, fall back to per-combination testing to find the weak conductor. Disconnect the linking before reconnecting the circuit."
          >
            <p>
              Three-phase IR test patterns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full ten-combination test</strong> — slow but thorough; record
                every reading on the STR. Use on commissioning, on EICRs of unfamiliar
                three-phase boards, on circuits with reported faults.
              </li>
              <li>
                <strong>Linked-conductor shortcut</strong> — fast for healthy installs;
                two readings (linked-Ls to N, linked-Ls to E) plus N to E if the result
                is well above threshold. If marginal, switch to the full test.
              </li>
              <li>
                <strong>Three-phase motor circuits</strong> — three line conductors plus
                CPC, no neutral. Six combinations (L1-L2, L1-L3, L2-L3, L1-E, L2-E,
                L3-E). Disconnect the motor at the local isolator before testing.
              </li>
              <li>
                <strong>Star vs delta loads</strong> — both load configurations have a
                star point that can carry small standing voltages or stray
                capacitances; let the IR tester settle before reading.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (250 V DC IR test for connected electronics)"
            clause={
              <>
                Regulation 643.3 has been redrafted. Where equipment is connected and the
                equipment is likely to influence the insulation resistance verification test or
                be damaged by other test voltages, a 250 V DC insulation resistance test
                following connection of the equipment shall be used to verify insulation
                resistance.
              </>
            }
            meaning={
              <>
                The standard 500 V DC IR test damages connected electronics — inverters,
                control gear, smart switches, surge protective devices. Where the kit is
                connected, drop to 250 V DC. Older training material that fixes 500 V for every
                circuit needs updating to match the redrafted regulation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 643.3 + Table 64 mandates IR testing with three test voltages: 500 V DC for LV up to 500 V (≥ 1 MΩ); 250 V DC for SELV/PELV (≥ 0.5 MΩ); 1000 V DC for above 500 V circuits.',
              'Disconnect components that present low resistance: RCBOs, RCDs, AFDDs, SPDs, capacitors, electronic dimmers, fixed appliances. Or use Reg 643.3.3 two-stage method.',
              'Two-stage method: stage 1 L+N to E at 500 V (electronics in place, no L-N stress); stage 2 L to N at 500 V (electronics isolated).',
              'Three IR readings per single-phase circuit: L-E, N-E, L-N. Ten readings per three-phase circuit. Record all on the STR.',
              'Healthy install reads 50 MΩ to over the meter\'s range. 1-50 MΩ passes but warrants investigation. Below 1 MΩ fails — must investigate, isolate, repair, retest.',
              'Cable length lowers IR inversely (double length = half IR). Parallel cables lower IR like parallel resistors (three runs in parallel = one-third IR).',
              'Localise low IR by disconnecting suspect contributors one at a time, retesting after each disconnection. The contributor whose removal raises the reading is responsible.',
              'Use IR meters with auto-discharge per BS EN 61557-2. Verify cable discharge before disconnecting leads — 500 V DC stored on a long cable can give a nasty jolt.',
            ]}
          />

          <Quiz title="Insulation resistance — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 Ring final 3-step test
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Polarity verification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
