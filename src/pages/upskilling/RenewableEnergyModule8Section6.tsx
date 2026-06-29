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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { DhwCylinderIntegration } from '@/components/study-centre/diagrams/renewableGapSvg';

const inlineChecks = [
  {
    id: 'm8s6-immersion-purpose',
    question:
      'Why does a heat pump install include an immersion backup element in the DHW cylinder?',
    options: [
      'Three roles: boost in high demand or cold weather, the weekly Legionella cycle to ≥60 °C, and fault fallback if the heat pump fails — a 3 kW element on its own circuit',
      'It runs continuously alongside the compressor as a co-equal primary heat source for the cylinder',
      'It is a frost-protection heater for the cylinder pipework only, energised by the OAT sensor in winter',
      'It is omitted on modern dual-coil cylinders, where the second coil replaces any need for an immersion',
    ],
    correctIndex: 0,
    explanation:
      'Immersion backup element is standard in heat pump DHW cylinder integration. Three operational roles: (1) BOOST during high DHW demand (multiple showers in a row) or low outdoor temperature when heat pump COP drops; (2) LEGIONELLA pasteurisation cycle — Health + Safety Executive HSG274 framework recommends maintaining stored DHW ≥60 °C; industry practice for heat pumps is a periodic (typically weekly) pasteurisation cycle to kill Legionella pneumophila bacteria; heat pump alone may not consistently reach 60 °C in cold weather (efficient operating range typically 35-55 °C primary flow); (3) FAULT FALLBACK — if compressor / refrigerant fault occurs, immersion provides DHW (and central heating with controls re-configuration) until repair. Typically 3 kW element on dedicated 16 A circuit. Heat pump control schedules immersion outside compressor running (boost cycles + scheduled legionella cycle + fault override).',
  },
  {
    id: 'm8s6-554-2-x',
    question:
      'Which BS 7671 Section / Reg covers the immersion electrical install?',
    options: [
      'Section 701, the bathroom special-location section, because the cylinder stores hot water for the bathroom',
      'Section 600 inspection and testing, which sets the design requirements for fixed water heaters',
      'Section 554: Reg 554.2 / 554.2.1 (immersed elements + over-temperature device) and Reg 554.3 (uninsulated element), with Reg 415.1.1, Reg 314 and Reg 411.4',
      'No BS 7671 regulation applies; the immersion is governed solely by the cylinder manufacturer instructions',
    ],
    correctIndex: 2,
    explanation:
      'Within Section 554 (Current-using equipment), Reg 554.2 addresses heaters for liquids or other substances having immersed heating elements — Reg 554.2.1 mandates the automatic over-temperature device; Reg 554.3.x addresses single-phase water heaters with uninsulated heating elements immersed in water (the standard DHW cylinder immersion). Note Reg 554.1 covers electrode water heaters and boilers, which is a different appliance type and does not apply here. Related: Reg 415.1.1 30 mA additional protection applies (standard for any final circuit with socket-outlet or domestic-context); Reg 314 division of installation supports dedicated circuit; Reg 411.4 ADS. The framework is mature + standard — the immersion has been part of UK DHW cylinder design for decades. Cert evidence bundle records: per-circuit EIC + Section 554 compliance verified + functional test of thermostat + thermal cut-out.',
  },
  {
    id: 'm8s6-dual-coil',
    question:
      'What is a dual-coil DHW cylinder + why is it used with heat pumps?',
    options: [
      'A cylinder with two immersion elements and no indirect coils, both fed from the same 16 A circuit',
      'A single-coil cylinder fitted with a twin-element immersion, marketed as dual-coil for heat pump use',
      'A cylinder with one coil split into two ports, used to feed both the heat pump and the underfloor loop',
      'Two indirect coils — a larger lower coil for the heat pump (low primary temperature) and an upper coil for boiler integration — with the immersion at the top for stratification',
    ],
    correctIndex: 3,
    explanation:
      'Dual-coil DHW cylinder: two indirect heat exchanger coils inside the cylinder. Heat pump primary coil (lower, larger surface area — optimised for low temperature heat pump primary flow 35-55 °C); upper coil for legacy boiler integration or future system upgrade (some hybrid configurations); immersion element at the top of the cylinder. Stratification: hot water rises naturally; heat pump heats the bulk of the cylinder via the lower coil; immersion boosts the top of the cylinder where the DHW outlet draws from. Customer experience: consistent DHW temperature even during heat pump warm-up. UK 2025-26 typical: 200-300 L dual-coil unvented cylinder; Mixergy / Telford / OSO / similar brands. Cert evidence bundle records the cylinder model + DoC + electrical connection to immersion + thermostat circuit.',
  },
  {
    id: 'm8s6-control-priority',
    question:
      'How does the heat pump control coordinate compressor + immersion?',
    options: [
      'Immersion-priority logic: the element runs first and the compressor supplements it, to guarantee a hot tap on demand',
      'Heat-pump-priority logic: the compressor runs first; the immersion only supplements in high demand or poor COP, the Legionella cycle, or fault fallback',
      'No coordination — both are wired to the same contactor and energise together whenever the cylinder calls',
      'The customer manually selects compressor or immersion at the cylinder before each heating period',
    ],
    correctIndex: 1,
    explanation:
      'Heat pump controller coordinates compressor + immersion per heat-pump-priority logic: (1) Normal operation — compressor only, immersion off. Most efficient operating mode. (2) High demand / cold conditions — if cylinder demand exceeds what the compressor can deliver at acceptable COP (e.g. cold outdoor air + high DHW draw simultaneously), immersion activates supplementally. Compressor + immersion both running briefly. (3) Legionella cycle — scheduled (typically weekly at off-peak hours e.g. 02:00); compressor + immersion coordinated to raise cylinder to ≥60 °C briefly. (4) Fault fallback — if compressor / refrigerant fault detected, controller switches to immersion-only operation; customer notified via display / app. UK 2025-26 typical heat pump controllers (Vaillant multiMATIC, Mitsubishi MELCloud, Daikin Onecta, NIBE myUplink) all implement this priority logic. Cert evidence bundle records: control configuration + priority logic verified at commissioning.',
  },
];

const quizQuestions = [
  {
    question:
      '3 kW immersion in a 200 L unvented cylinder — what circuit design?',
    options: [
      'Dedicated 16 A Type A RCBO C-curve + 30 mA per Reg 415.1.1, 2.5 mm² T+E (Method C ~24 A) under Reg 554, with functional test of thermostat + over-temp cut-out',
      'No protective device at the board, relying on the cylinder thermostat alone to break the supply',
      'A 32 A B-curve MCB with no RCD on 6 mm² cable, treating the immersion like a cooker circuit',
      'No RCD fitted, on the basis that a resistive immersion element cannot present an earth-fault shock risk',
    ],
    correctAnswer: 0,
    explanation:
      'Standard 3 kW immersion install: 16 A dedicated circuit. Type A RCBO (BS EN 61009 + BS EN 62423) covers AC + pulsating DC (some thermostat electronics may include rectified DC). C-curve handles immersion start (essentially resistive load, low inrush — B curve could work but C is the standard default). 2.5 mm² T+E cable Method C ~24 A capacity at standard ambient (single-phase) — adequate for 13 A continuous (3 kW / 230 V). 30 mA additional protection per Reg 415.1. Reg 554 framework: 554.2 heaters for liquids having immersed heating elements; 554.2.1 over-temperature cut-out (the cylinder over-temp cut-out is mandatory + integrates with the electrical supply trip); 554.3 specifically for uninsulated heating elements immersed in water (standard immersion). Reg 314 division supports dedicated circuit. Reg 411.4 ADS verified. Cert evidence bundle: 16 A Type A RCBO + 2.5 mm² T+E + Section 554 verification + functional test of thermostat + cylinder cut-out + heat pump control integration.',
  },
  {
    question:
      'Dual-coil DHW cylinder — what does the electrical installer need to wire?',
    options: [
      'Nothing — the cylinder arrives fully wired and pre-commissioned from the factory',
      'The 3 kW immersion on its 16 A circuit, the immersion thermostat, the over-temp cut-out and the control wiring back to the heat pump controller',
      'Only a fused spur to the immersion; the thermostat and cut-out are wired by the cylinder manufacturer on site',
      'Only the control wiring; the immersion and thermostat are connected by the plumber as part of the cylinder fit',
    ],
    correctAnswer: 1,
    explanation:
      'Dual-coil DHW cylinder electrical install scope: (1) IMMERSION element at top of cylinder — 3 kW typical, factory-fitted in the cylinder by the cylinder manufacturer + wired by electrical installer to dedicated 16 A circuit. (2) IMMERSION thermostat — mechanical bimetallic or electronic thermostat controlling immersion ON/OFF. Set typically 60-65 °C for normal DHW; legionella cycle setpoint different. (3) Cylinder over-temp thermal cut-out — manufacturer-fitted safety device; trips at high temperature (typically 80-90 °C); manual reset; isolates immersion supply. Mandatory per Reg 554.2.1. (4) Control wiring back to heat pump controller — typically low-voltage low-current signalling for priority logic + cycle scheduling. Hydraulic engineer fits the cylinder + connects primary heat pump coil + DHW outlet plumbing; electrical installer wires the electrical components. Cert evidence bundle: per-circuit EIC + functional test + Section 554 verification.',
  },
  {
    question:
      'Why does Reg 554.2.1 thermal cut-out matter for immersion safety?',
    options: [
      'It is fitted only to satisfy the cylinder warranty and has no role in BS 7671 compliance',
      'It is a thermal fuse that resets itself automatically once the cylinder cools, requiring no intervention',
      'Reg 554.2.1 requires an automatic device against a dangerous temperature rise: the cut-out trips at ~80-90 °C, isolates the supply and needs manual reset, preventing scalding and steam build-up',
      'It is a temperature gauge for the installer to read at service visits, not a device that breaks the supply',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 554.2.1 is the safety regulation behind the over-temp thermal cut-out: every heater for liquid or other substance must incorporate or be provided with an automatic device to prevent a dangerous rise in temperature. For DHW cylinders, the over-temp cut-out is factory-fitted by the cylinder manufacturer; trips at ~80-90 °C; isolates immersion electrical supply; requires manual reset (deliberate intervention so the customer / engineer can investigate the cause). Prevents: scalding of users at the tap (cold-water mix designed for 60 °C max); thermal damage to cylinder + connected pipework; steam pressure build-up in unvented cylinders (catastrophic failure risk). Cert evidence bundle: functional test of the over-temp cut-out at commissioning (typically by deliberate overheat with thermostat bypassed in controlled condition); manufacturer DoC reference; manual reset procedure documented for customer handover.',
  },
  {
    question:
      'Legionella cycle — what is the BS 7671 framework + how is it managed?',
    options: [
      'It is governed directly by a dedicated regulation in Part 7 of BS 7671 covering hot-water hygiene',
      'It is a customer DIY task with no defined framework, left entirely to the householder to manage',
      'No Legionella cycle is needed once a heat pump heats the DHW, as the circulating flow prevents stagnation',
      'Not directly a BS 7671 matter — control sits under HSE HSG274 / ACoP L8, with the controller scheduling a weekly cycle to ≥60 °C via heat pump and immersion',
    ],
    correctAnswer: 3,
    explanation:
      'Legionella control framework: NOT directly a BS 7671 regulation (BS 7671 is the wiring regs, not water hygiene regs). The framework: HSE HSG274 + Approved Code of Practice L8 (under the Health + Safety at Work Act 1974); BS 8580 risk assessment; relevant for domestic + commercial DHW systems. Heat pump-specific concern: efficient heat pump operating temperature (primary flow 35-55 °C) means DHW may not consistently reach 60 °C — Legionella growth risk. Mitigation: scheduled legionella cycle in the heat pump controller. Typical weekly cycle: 60-65 °C DHW for 1-2 hours at off-peak (e.g. 02:00 Monday). Heat pump + immersion coordinated to reach the setpoint briefly. Verification: temperature probe at cylinder outlet during commissioning + at periodic service visits. Cert evidence bundle records: legionella cycle configuration + frequency + setpoint + verification result. Customer handover: cycle explained + override procedure for service visits.',
  },
  {
    question: 'Immersion vs heat pump for water heating — economic + COP question?',
    options: [
      'They cost the same per kWh delivered, so the choice between them is purely about speed of heat-up',
      'Heat pump DHW (COP ~3) costs roughly a third of immersion (COP 1) per kWh, so the immersion is for backup / boost / Legionella, not primary heating',
      'The immersion is the cheaper option per kWh, so it should carry the bulk of routine DHW heating',
      'The difference is too small to matter, so customers can run on whichever source is more convenient',
    ],
    correctAnswer: 1,
    explanation:
      'Economic comparison: heat pump DHW COP ~3 (variable; lower COP than space heating because DHW requires higher temperature; varies with outdoor air temperature). Immersion COP = 1 (resistance heating). At UK 2025-26 typical domestic electricity tariff: heat pump DHW ~1/3 the cost of immersion-only DHW per kWh delivered. So immersion is fundamentally the BACKUP / BOOST / LEGIONELLA solution — NOT the primary DHW heating. Customer education: explain to customer that running primarily on immersion (e.g. through customer misunderstanding the control or deliberate during heat pump fault) significantly increases electricity bills. Heat pump warranty + EPC + operational expectations all rely on heat pump being primary. Cert evidence bundle: customer handover documentation + immersion intended role + heat pump priority logic verified.',
  },
  {
    question: 'Cylinder enclosure thermal + Reg 422.3.2 — application?',
    options: [
      'Where dust/fibres could accumulate, it caps the enclosure at 90 °C normal / 115 °C fault; the cylinder skin stays cool, but a dusty store cupboard warrants the check',
      'It sets a fixed 70 °C surface limit on the cylinder skin, applied to every install regardless of location',
      'It has no application to a DHW cylinder, since stored hot water never reaches a hazardous surface temperature',
      'It applies only to the immersion access cover, never to the cylinder body or the surrounding cupboard',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 422.3.2 sets enclosure surface temperature limits — 90 °C normal operation, 115 °C fault — where materials such as dust or fibres sufficient to cause a fire hazard could accumulate on the enclosure. It is a location / fire-hazard-driven check, not a universal cap on every cylinder surface. DHW cylinder considerations: (1) Cylinder body is heavily insulated (typically 50 mm rigid polyurethane foam between inner cylinder shell + outer skin). External surface temperature stays low even with full immersion run + cylinder hot — typically 25-35 °C external skin. (2) Immersion access cover at top of cylinder: typically a plastic / metal removable cover allowing access to the immersion electrical terminals. Manufacturer DoC declares thermal compliance. (3) Cylinder cupboard enclosure: where the cylinder + immersion + circulation pumps + heat pump indoor unit + electrical CU share a built-in cupboard with restricted ventilation AND dust / fibres could accumulate, assess the enclosure against the 422.3.2 limits — designer assesses + provides ventilation if needed. Cert evidence bundle: cylinder manufacturer DoC + thermal compliance verified visually at commissioning + any thermal imaging if commercial.',
  },
];

const faqs = [
  {
    question: 'Can the immersion + heat pump share a CU way?',
    answer:
      'No. Reg 314 + MCS / MIS 3005-I:2025 install standard + dedicated-circuit pattern from §8.4: separate dedicated circuits. Heat pump on 32 A RCBO; immersion on 16 A RCBO. Per-circuit Part 6 verification + EIC. Per-circuit RCD architecture. Per-circuit fault isolation. Sharing would compromise all of these.',
  },
  {
    question: 'Smart immersion (e.g. solar PV diversion to immersion) — relevant?',
    answer:
      'Yes, especially in PEI (Chapter 82) sites. Excess PV generation diverted to immersion via diverter controller (e.g. MyEnergi Eddi, Solic 200) — uses surplus PV to heat DHW for free. UK 2025-26 typical at properties with PV + heat pump combined. Electrical install: immersion dedicated circuit still applies; diverter integration via control wiring + CT clamps. Cert evidence bundle integrates the diverter scope.',
  },
  {
    question: 'Cylinder + immersion location — typical UK 2025-26 patterns?',
    answer:
      'Airing cupboard upstairs typical for retrofits (existing cylinder location). Utility room / plant room ground floor for new builds + larger properties. Garage / outbuilding for some installs (insulated; protection from frost). Cylinder weight when full (~250-350 kg for 200-300 L) drives structural support consideration. Electrical scope unchanged across locations; cable routing differs.',
  },
  {
    question: 'Unvented vs vented cylinder — electrical implication?',
    answer:
      'Unvented (sealed, pressurised): standard for modern installs; over-pressure safety via pressure relief valve + expansion vessel. Vented (open-vented): legacy; gravity-fed from cold water tank; less common in new installs. Electrical install scope identical: immersion + thermostat + over-temp cut-out + dedicated circuit. Unvented systems require G3 qualification for the plumber doing the install (unvented hot water training); electrical scope unchanged.',
  },
  {
    question: 'EICR finding: missing over-temp thermal cut-out?',
    answer:
      'C1 (immediate danger). Reg 554.2.1 mandates the automatic device to prevent dangerous temperature rise. Without it: scald risk + cylinder pressure risk + thermal damage to building. Immediate remediation: fit a thermal cut-out (or replace immersion + thermostat assembly that integrates one) before re-energising. Cert evidence bundle records the finding + remediation + post-remediation functional test.',
  },
];

export default function RenewableEnergyModule8Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Backup immersion + DHW cylinder integration | Renewable Energy 8.6 | Elec-Mate',
    description:
      'Heat pump DHW cylinder integration — immersion backup element per Reg 554.2 / 554.2.1 / 554.3, 30 mA RCD per Reg 415.1.1, dedicated 16 A circuit, dual-coil cylinder, heat-pump-priority logic, legionella cycle per HSE HSG274, thermal cut-out, control wiring.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · BS 7671:2018+A4:2026 · Section 554 + Reg 415.1.1 + Reg 314 + HSE HSG274"
            title="Backup immersion + DHW cylinder integration"
            description="Hot Water Cylinder backup immersion element — Reg 554.2 / 554.2.1 / 554.3 (heaters for liquids having immersed heating elements), 30 mA RCD per Reg 415.1.1, dedicated 16 A circuit per Reg 314, dual-coil cylinder pattern, heat-pump-priority logic, legionella cycle per HSE HSG274 / HSG L8, thermal cut-out, control wiring."
            tone="yellow"
          />

          <TLDR
            points={[
              'Immersion backup element in DHW cylinder serves three roles: boost during high demand / cold conditions; legionella pasteurisation cycle (HSE HSG274); fault fallback if compressor / refrigerant fault.',
              'BS 7671 Section 554 framework: 554.2 heaters with immersed heating elements; 554.2.1 over-temperature cut-out mandatory; 554.3 specifically for water heaters with uninsulated immersed elements (standard DHW immersion).',
              'Dedicated 16 A circuit per Reg 314 + MCS / MIS 3005-I:2025 install standard. Type A RCBO C-curve + 30 mA additional protection per Reg 415.1. 2.5 mm² T+E typical.',
              'Cylinder over-temp thermal cut-out mandatory per Reg 554.2.1 — automatic device preventing dangerous temperature rise. Manual reset.',
              'Dual-coil cylinder typical for heat pump install: lower coil for heat pump primary; upper coil for legacy boiler / future system; immersion at top for DHW outlet boost.',
              'Heat-pump-priority control logic: compressor primary; immersion supplements only when needed; legionella cycle weekly off-peak.',
              'Legionella control per HSE HSG274 + ACOP L8 — NOT directly BS 7671. Weekly cycle ≥60 °C kills Legionella pneumophila.',
              'Economic: heat pump DHW COP ~3 vs immersion COP 1. Immersion is BACKUP / BOOST / LEGIONELLA — not primary DHW heating.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the three roles of immersion backup: boost, legionella cycle, fault fallback.',
              'Apply BS 7671 Section 554 framework: 554.2 immersed heating elements, 554.2.1 over-temperature cut-out, 554.3 uninsulated immersed elements.',
              'Design the dedicated 16 A immersion circuit per Reg 314 + Reg 415.1.',
              'Identify the dual-coil DHW cylinder pattern + electrical scope.',
              'Verify Reg 554.2.1 thermal cut-out at commissioning.',
              'Apply heat-pump-priority control logic + verify at commissioning.',
              'Apply HSE HSG274 / ACOP L8 legionella framework + schedule the weekly cycle.',
              'Document immersion + cylinder integration in the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The immersion is the backup, not the primary. Heat pump COP ~3, immersion COP 1. Customer confusion on this point is the most expensive operational mistake on a heat pump install.
          </Pullquote>

          <ContentEyebrow>Immersion role + BS 7671 Section 554 framework</ContentEyebrow>

          <ConceptBlock
            title="Three operational roles of immersion backup"
            plainEnglish="DHW cylinder immersion element on a heat pump install serves three operational roles: boost during high demand / cold conditions; legionella pasteurisation cycle; fault fallback if compressor / refrigerant fault. Not the primary DHW heating — that’s the heat pump."
            onSite="Heat pump controller schedules immersion outside compressor running in normal operation (so they don’t coincide unnecessarily — preserves the supply max demand calc from §8.2). Customer handover education: explain the three roles + that immersion-only operation is the most expensive mode + heat pump priority logic."
          >
            <p>Immersion roles:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Boost</strong> — supplements
                heat pump during high DHW demand (multiple showers in a row) or low
                outdoor temperature when heat pump COP drops + compressor cannot keep
                up with demand
              </li>
              <li>
                <strong className="text-white">Legionella cycle</strong>
                — periodic (typically weekly off-peak) cycle raising DHW to ≥60 °C
                briefly. Kills Legionella pneumophila bacteria per HSE HSG274 + ACOP
                L8. Heat pump alone may not reliably reach 60 °C in cold weather
              </li>
              <li>
                <strong className="text-white">Fault fallback</strong> —
                if compressor / refrigerant fault detected, controller switches to
                immersion-only operation. Customer notified via display / app. DHW (and
                space heating with controls re-config) maintained until repair
              </li>
              <li>
                <strong className="text-white">Typical
                  specification</strong> — 3 kW element, 1¾" BSP fitting, factory-fitted
                in the cylinder by the cylinder manufacturer
              </li>
              <li>
                <strong className="text-white">Dedicated 16 A
                  circuit</strong> — Type A RCBO C-curve + 30 mA additional protection +
                2.5 mm² T+E. Reg 314 dedicated circuit pattern
              </li>
              <li>
                <strong className="text-white">Not primary
                  heating</strong> — heat pump COP ~3; immersion COP 1. Immersion is the
                BACKUP / BOOST / LEGIONELLA solution — customer education is part of
                handover
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — immersion circuit EIC + Section 554 verification +
                functional test + customer handover documentation
              </li>
            </ul>
          </ConceptBlock>

          <DhwCylinderIntegration caption="The heat pump heats via the lower coil; the immersion is electric backup plus the Legionella cycle." />

          <ConceptBlock
            title="Section 554 + Reg 554.2.1 thermal cut-out"
            plainEnglish="BS 7671 Section 554 covers current-using equipment including electrode water heaters (554.1) and heaters for liquids or other substances having immersed heating elements (554.2). For the DHW immersion: Reg 554.2.1 mandates the thermal cut-out (automatic device preventing a dangerous rise in temperature); Reg 554.3 addresses single-phase water heaters with uninsulated heating elements immersed in water (the standard DHW cylinder immersion). Reg 554.1 (electrode heaters) does not apply to a conventional insulated-element immersion."
            onSite="The over-temp thermal cut-out is factory-fitted by the cylinder manufacturer. Trips at ~80-90 °C; isolates immersion electrical supply; requires manual reset. Functional test at commissioning by deliberate overheat (thermostat bypassed in controlled condition) verifies the cut-out operates."
          >
            <p>Section 554 applied:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 554.2.1</strong> — every
                heater for liquid or other substance shall incorporate or be provided
                with an automatic device to prevent a dangerous rise in temperature.
                THIS IS THE THERMAL CUT-OUT — mandatory
              </li>
              <li>
                <strong className="text-white">Reg 554.3</strong> — water
                heaters having immersed and uninsulated heating elements — additional
                requirements (typically integrated into modern cylinder design by
                manufacturer)
              </li>
              <li>
                <strong className="text-white">Reg 554.3.1</strong> —
                every single-phase water heater with uninsulated immersed element
                shall comply with regulations referenced. Standard immersion fits this
                category
              </li>
              <li>
                <strong className="text-white">Thermal cut-out
                  function</strong> — trips at ~80-90 °C cylinder temperature; isolates
                immersion electrical supply; manual reset required (deliberate
                intervention to investigate root cause)
              </li>
              <li>
                <strong className="text-white">Trip causes</strong> —
                thermostat failure (stuck-closed contacts); thermostat sensor failure;
                blocked outlet causing temperature build-up; fault condition
              </li>
              <li>
                <strong className="text-white">Functional test at
                  commissioning</strong> — deliberate overheat with thermostat
                bypassed in controlled condition; verify cut-out trips at the
                manufacturer-declared temperature; reset; restore normal operation
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cylinder manufacturer DoC + thermal cut-out spec +
                functional test result + reset procedure documented for handover
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 554.2.1 — Automatic device preventing dangerous temperature rise"
            clause="Every heater for liquid or other substance shall incorporate or be provided with an automatic device to prevent a dangerous rise in temperature."
            meaning="Reg 554.2.1 mandates the over-temp thermal cut-out on every immersion / liquid heater. For DHW cylinder immersion: the cut-out is factory-fitted by the cylinder manufacturer; trips at ~80-90 °C; isolates the immersion electrical supply; manual reset required. Prevents: scalding at the tap (cold-water mix is designed for 60 °C max); cylinder pressure damage in unvented systems; thermal damage to surrounding building / cabling. The functional test at commissioning is mandatory verification — deliberate overheat with thermostat bypassed in controlled condition. Cert evidence bundle records the test result + manufacturer DoC + reset procedure for customer handover."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>DHW cylinder integration + control logic</ContentEyebrow>

          <Pullquote>
            Dual-coil cylinder + heat-pump-priority logic + scheduled legionella cycle: three elements turning the immersion from primary heating into smart backup.
          </Pullquote>

          <ConceptBlock
            title="Dual-coil DHW cylinder integration"
            plainEnglish="DHW cylinder with two indirect heat exchanger coils + immersion. Lower coil: heat pump primary (large surface area, optimised for 35-55 °C primary flow). Upper coil: legacy / future boiler integration. Immersion at top for DHW outlet boost + legionella + fault fallback."
            onSite="Stratification: hot water rises naturally; heat pump heats bulk of cylinder via lower coil; immersion boosts top of cylinder where the DHW outlet draws from. Customer experience: consistent DHW temperature even during heat pump warm-up. UK 2025-26 typical cylinders: Mixergy 200-300 L unvented; Telford Tempest; OSO Saga / Optima; Joule unvented dual-coil."
          >
            <p>Dual-coil cylinder architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Lower coil (heat
                  pump primary)</strong> — large surface area heat exchanger near the
                bottom of the cylinder. Optimised for low temperature heat pump primary
                flow (35-55 °C). Heat pump returns slightly cooler primary water; coil
                heats the cylinder gradually
              </li>
              <li>
                <strong className="text-white">Upper coil (boiler or
                  future)</strong> — second heat exchanger near the top. Available for
                legacy boiler integration (hybrid configuration) or for future system
                upgrade. May be unused on a pure-heat-pump install
              </li>
              <li>
                <strong className="text-white">Immersion at
                  top</strong> — single 3 kW element factory-fitted near the top of the
                cylinder. Boosts the top of the cylinder where the DHW outlet draws
              </li>
              <li>
                <strong className="text-white">Stratification</strong>
                — hot water rises; heat pump heats the bulk; immersion boosts the top.
                DHW draw comes from the top — customer always gets the hottest water
                even during cylinder warm-up
              </li>
              <li>
                <strong className="text-white">Cylinder
                  thermostat(s)</strong> — typically one or two thermostats: one
                control thermostat for the heat pump primary coil cycle; one control
                thermostat for the immersion. Sensors mounted at specific cylinder
                heights for stratification-aware control
              </li>
              <li>
                <strong className="text-white">Capacity</strong> — 200-300 L
                typical for UK 2025-26 domestic (versus 90-120 L for legacy combi
                boiler indirect cylinders). Larger cylinder buffers low-temperature
                heat pump output
              </li>
              <li>
                <strong className="text-white">Typical UK 2025-26
                  brands</strong> — Mixergy (smart cylinders with stratification
                control); Telford Tempest (mainstream unvented dual-coil); OSO Saga /
                Optima (Norwegian); Joule (Irish, mainstream); Stiebel Eltron WPF
                (German integrated heat pump + cylinder)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — cylinder model + manufacturer DoC + electrical
                connection diagram + immersion circuit EIC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Heat-pump-priority control logic"
            plainEnglish="Heat pump controller coordinates compressor + immersion per priority logic. Normal operation: compressor only. High demand / cold conditions: immersion supplements. Legionella cycle: scheduled. Fault fallback: immersion takes over."
            onSite="UK 2025-26 typical controllers (Vaillant multiMATIC, Mitsubishi MELCloud, Daikin Onecta, NIBE myUplink, Mixergy app) all implement this priority logic. Electrical installer verifies the configuration at commissioning. Customer handover education is critical — customer must understand the priority logic + not override it inappropriately."
          >
            <p>Control logic states:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">State 1: Heat pump
                  only</strong> — normal operation. Compressor runs as needed; immersion
                off. Most efficient mode; lowest electricity bill
              </li>
              <li>
                <strong className="text-white">State 2: Heat pump +
                  immersion (boost)</strong> — controller detects high DHW demand or
                low outdoor temperature reducing heat pump capacity. Immersion
                activates supplementally. Both running briefly; immersion deactivates
                when demand met
              </li>
              <li>
                <strong className="text-white">State 3: Scheduled
                  legionella cycle</strong> — typically weekly at off-peak hours.
                Compressor + immersion coordinated to raise cylinder to ≥60 °C
                briefly. Returns to State 1
              </li>
              <li>
                <strong className="text-white">State 4: Fault
                  fallback (immersion only)</strong> — compressor / refrigerant fault
                detected. Controller switches to immersion-only for DHW + space
                heating (with controls re-config). Customer notified
              </li>
              <li>
                <strong className="text-white">State 5: Customer
                  override</strong> — customer can manually request immersion-only via
                controller (e.g. for high-demand event). NOT recommended for routine
                use — much higher electricity bill
              </li>
              <li>
                <strong className="text-white">Verification at
                  commissioning</strong> — exercise each state: compressor only,
                compressor + immersion (force boost mode), scheduled legionella cycle
                (manually trigger), fault simulation (disconnect refrigerant signal),
                customer override
              </li>
              <li>
                <strong className="text-white">Customer handover
                  documentation</strong> — explain each state + when to expect each +
                when NOT to override (immersion-only mode is expensive)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — control configuration + verification results +
                handover documentation reference
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Legionella cycle per HSE HSG274 / ACOP L8"
            plainEnglish="Legionella control is per HSE HSG274 + ACOP L8 (Health + Safety at Work Act framework) — NOT directly BS 7671. Heat pump-specific concern: efficient heat pump operating temperature (primary flow 35-55 °C) means DHW may not consistently reach 60 °C without intervention. Mitigation: scheduled weekly cycle raising DHW to ≥60 °C briefly."
            onSite="Legionella pneumophila killed at ≥60 °C within 1-2 minutes; 50-60 °C significant kill rate over hours; below 50 °C the bacterium can grow + colonise stagnant water. Heat pump controller schedules a weekly cycle (typical 02:00 Monday off-peak) raising DHW to setpoint briefly. Electrical install supports via heat pump + immersion coordination. Customer handover includes cycle configuration + override procedure for service visits."
          >
            <p>Legionella cycle context:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">HSE HSG274 +
                  ACOP L8</strong> — UK statutory framework under Health + Safety at
                Work Act 1974. Risk assessment per BS 8580. Relevant to domestic +
                commercial DHW systems
              </li>
              <li>
                <strong className="text-white">Legionella
                  pneumophila</strong> — bacterium that can colonise stagnant warm
                water. Causes Legionnaires’ disease. Kill rate: ≥60 °C in 1-2 min;
                50-60 °C significant kill over hours; below 50 °C growth possible
              </li>
              <li>
                <strong className="text-white">Heat pump
                  challenge</strong> — efficient heat pump operates primary flow 35-55
                °C. Cylinder may not reliably reach 60 °C without backup heat.
                Legionella growth risk
              </li>
              <li>
                <strong className="text-white">Weekly cycle
                  mitigation</strong> — schedule legionella cycle at off-peak (typical
                02:00 Monday). Compressor + immersion coordinated to raise cylinder to
                ≥60 °C briefly (typically 1-2 hours)
              </li>
              <li>
                <strong className="text-white">Setpoint</strong> —
                typically 60-65 °C cylinder temperature, sustained 1-2 hours minimum.
                Some installations use higher (70 °C) for extra safety margin
              </li>
              <li>
                <strong className="text-white">Frequency</strong> —
                weekly is typical; some commercial / vulnerable-occupant installs
                run daily or twice-weekly
              </li>
              <li>
                <strong className="text-white">Verification at
                  service visits</strong> — temperature probe at cylinder outlet
                during legionella cycle; verify setpoint achieved + sustained
              </li>
              <li>
                <strong className="text-white">Override for
                  service visits</strong> — temporary disable when occupants might be
                away (legionella growth low if no warm water draw); re-enable on
                resumption
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — legionella cycle configuration (setpoint +
                duration + frequency) + verification result + handover documentation
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 415.1.1 — Additional protection: 30 mA RCD"
            clause="The use of RCDs having a rated residual operating current (IΔn) not exceeding 30 mA and an operating time not exceeding 40 ms at a residual current of 5 IΔn is recognised in alternating-current systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users."
            meaning="Reg 415.1.1 30 mA additional protection applies to the immersion dedicated circuit (and the heat pump dedicated circuit + most domestic circuits). Integrated into the 16 A Type A RCBO supplying the immersion. Verification at commissioning per Reg 643.8: trip-time at IΔn (30 mA) ≤300 ms typical actual 20-50 ms; trip-time at 5 × IΔn (150 mA) ≤40 ms typical actual 10-20 ms. Cert evidence bundle records: RCBO Type + IΔn + trip-time test results."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Standard UK 2025-26 dual-coil cylinder install"
            situation="200 L Telford Tempest dual-coil unvented cylinder + 3 kW immersion at top. Vaillant aroTHERM Plus R290 heat pump primary loop into lower coil. Customer-facing controller: Vaillant multiMATIC. UK 2025-26 typical domestic retrofit."
            whatToDo="Electrical scope: (1) Immersion dedicated 16 A circuit per Reg 314 — Hager AD116 16 A Type A RCBO C-curve + 30 mA additional protection + 2.5 mm² T+E from CU to cylinder cupboard junction box. (2) Immersion thermostat wired in series with the RCBO supply (immersion electrical = RCBO live → thermostat → element). Thermostat set 60-65 °C normal + 65 °C legionella cycle setpoint (cylinder manufacturer default). (3) Over-temp thermal cut-out per Reg 554.2.1 — manufacturer-fitted, factory-set trip ~85 °C; manual reset button accessible at cylinder top. (4) Control wiring back to Vaillant multiMATIC controller — low-voltage low-current; coordinates immersion ON/OFF with compressor priority + legionella schedule. Reg 643 commissioning: continuity + IR + ADS + RCD trip-time + functional test (immersion heats DHW from cold; thermostat cycles; over-temp cut-out exercised in controlled overheat). Heat pump + immersion coordination verified: compressor primary, immersion supplemental on demand, legionella cycle Monday 02:00 sample. Customer handover: cylinder operation explained + manual reset procedure + immersion-only override warning + legionella cycle awareness. Cert evidence bundle: 16 A immersion circuit EIC + Section 554 verification + thermal cut-out functional test + heat pump priority logic verified + customer handover documentation."
            whyItMatters="Standard UK 2025-26 cylinder install pattern — applies the Section 554 + Reg 415 + Reg 314 framework cleanly. Cert evidence bundle integrates with the heat pump dedicated circuit EIC + handed to the MCS company for the customer handover pack."
          />

          <Scenario
            title="Mixergy smart cylinder + PV diverter integration"
            situation="300 L Mixergy smart cylinder (stratification-control + app integration) + Vaillant aroTHERM Plus R290 + 6 kWp PV + MyEnergi Eddi diverter. Customer wants excess PV diverted to immersion for free DHW boost during daytime."
            whatToDo="Standard Section 554 immersion circuit as above (16 A Type A RCBO + thermal cut-out + thermostat). PLUS PV diverter integration: MyEnergi Eddi unit fitted between CU and immersion circuit; CT clamp on main incoming tails reads net export; Eddi diverts excess PV current to immersion via PWM (variable load matching available PV). Control wiring: Mixergy app integration via CT clamp + WiFi to Mixergy cloud; Mixergy app coordinates with heat pump controller via Modbus (where supported) or via timer-based coordination otherwise. Cert evidence bundle: 16 A immersion circuit + Section 554 verification + Eddi diverter EIC + CT clamp commissioning + Mixergy cylinder app integration verified + heat pump + diverter coordination verified. Customer handover: smart cylinder app interface + PV diversion explanation + heat pump priority maintained (Eddi diverter operates only on excess PV; doesn’t replace heat pump as primary). Chapter 82 PEI integration with the wider PV + (future) BESS scope."
            whyItMatters="UK 2025-26 PEI (Chapter 82) integrated install — heat pump + PV + smart cylinder + diverter all coordinated. Cost differential vs standard install: ~£500-1,000 for Eddi diverter + smart cylinder premium. Customer benefit: excess PV → free DHW during daytime + cylinder warmth carry-over to evening. Cert evidence bundle is richer + integrates multiple scopes. Mirrors §7.5 PEI integration pattern."
          />

          <CommonMistake
            title="Skipping the over-temp thermal cut-out functional test"
            whatHappens="Installer commissions the immersion circuit (RCBO + cable + thermostat + element); verifies operation by switching on; declares complete. Doesn’t verify the over-temp cut-out (Reg 554.2.1 mandatory device). Months later, thermostat fails stuck-closed → immersion runs continuously → DHW reaches dangerous temperature → cylinder pressure relief operates OR worse, scalding at the tap. Customer hospitalised; EICR review reveals untested cut-out at commissioning."
            doInstead="Reg 554.2.1 thermal cut-out functional test is mandatory at commissioning. Procedure: bypass the thermostat (deliberately, in controlled condition); allow cylinder to overheat; verify cut-out trips at the manufacturer-declared temperature (typically 80-90 °C); reset; restore thermostat; verify normal operation. Cert evidence bundle records the test result + temperature reached + reset procedure documented for customer handover."
          />

          <CommonMistake
            title="Customer mis-using immersion-only override as primary heating"
            whatHappens={`Customer doesn’t understand heat pump priority logic. During cold winter week with heat pump performance dropping, customer panics + sets controller to "immersion only" override + leaves it there. Heating bill triples; customer blames the heat pump; warranty / refund dispute; reputation damage.`}
            doInstead={`Customer handover education is critical. Explain: heat pump COP ~3 is the primary; immersion COP 1 is the backup. Immersion-only override is FOR EMERGENCIES only (e.g. heat pump fault awaiting repair). Show the customer the controller display + app interface. Provide a written handover guide with the priority logic explained + the override scenarios. Some installers leave a "heat pump priority sticker" near the controller as a reminder. Cert evidence bundle records the handover documentation provided.`}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Immersion backup serves three roles: boost during high demand / cold conditions; legionella pasteurisation cycle; fault fallback if compressor / refrigerant fault.',
              'BS 7671 Section 554 framework: 554.2 immersed heating elements; 554.2.1 over-temperature cut-out MANDATORY; 554.3 specifically for water heaters with uninsulated immersed elements.',
              'Reg 554.2.1 over-temp thermal cut-out: automatic device preventing dangerous temperature rise. Factory-fitted by cylinder manufacturer. Trips at ~80-90 °C. Manual reset.',
              'Dedicated 16 A circuit per Reg 314 + MCS / MIS 3005-I:2025 install standard. Type A RCBO C-curve + 30 mA additional protection per Reg 415.1. 2.5 mm² T+E.',
              'Dual-coil DHW cylinder: lower coil heat pump primary; upper coil legacy / future boiler; immersion at top. Stratification-optimised.',
              'Heat-pump-priority control logic: compressor primary; immersion supplemental when needed; legionella cycle weekly off-peak; fault fallback immersion only.',
              'Legionella control per HSE HSG274 + ACOP L8 (NOT BS 7671). Weekly cycle ≥60 °C kills Legionella pneumophila.',
              'Economic: heat pump DHW COP ~3 vs immersion COP 1. Immersion is BACKUP / BOOST / LEGIONELLA — not primary DHW heating.',
              'Customer handover education: priority logic + immersion-only override warning + legionella cycle awareness.',
              'Smart cylinder + PV diverter integration: PEI Chapter 82 scope; excess PV → immersion → free DHW; heat pump priority maintained.',
              'Cert evidence bundle: immersion circuit EIC + Section 554 verification + thermal cut-out functional test + heat pump priority logic verified + customer handover documentation.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                RCD architecture for VSD inverter compressors
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.7 Controls + electrical interface
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
