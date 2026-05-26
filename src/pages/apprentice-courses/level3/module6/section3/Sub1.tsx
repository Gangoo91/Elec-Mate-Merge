/**
 * Module 6 · Section 3 · Subsection 1 — Design current Ib
 * Maps to C&G 2365-03 / Unit 305 / LO3 / AC 3.1
 *   AC 3.1 — "Calculate the design current of a circuit (Ib) for resistive,
 *             inductive and mixed loads, applying diversity where appropriate"
 *
 * Layered depth: 2366-03 Unit 304 / AC 3.1; 5393-03 Unit 104 / AC 3.1
 *
 * The first calc of any final-circuit design. Ib is the demand the circuit
 * has to deliver, before you size the cable or pick the device. Resistive,
 * inductive (power factor and apparent power), and the diversity adjustment
 * for mixed-use circuits.
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

const TITLE = 'Design current Ib calculation (3.1) | Level 3 Module 6.3.1 | Elec-Mate';
const DESCRIPTION =
  "Calculating the design current Ib for any final circuit. Resistive loads, inductive loads with power factor, three-phase, and the diversity adjustment that turns connected load into design current. The first number on every cable schedule.";

const checks = [
  {
    id: 'ib-resistive',
    question:
      "An 8.5 kW resistive electric shower on a 230 V single-phase supply. Design current Ib?",
    options: [
      "Income protection pays regular monthly income for ongoing inability to work; critical illness pays a lump sum for specific diagnosed conditions",
      "Fit castors to the base frame, lock them, ensure the base is level, then fit outriggers before building the tower higher than the manufacturer's specified freestanding limit",
      "Early intervention allows workplace modifications and treatment before the condition becomes chronic and potentially irreversible",
      "Ib = P / V = 8500 / 230 = 36.96 A — round up to 37 A for cable sizing. Pure resistive load so power factor is 1; no diversity since the shower draws full rated load when running.",
    ],
    correctIndex: 3,
    explanation:
      "Single-phase resistive: Ib = P / V where P is the rated power in watts and V is the nominal supply voltage. 8500 / 230 = 36.96 A. The shower is a pure resistive load (heating element) with power factor 1, so apparent power equals real power and the design current is the same as if you had used kVA. No diversity is applied to a single-load dedicated circuit when it runs — when the shower is on, it draws full load. The cable schedule rounds up to a whole-amp figure for protective device matching.",
  },
  {
    id: 'ib-inductive',
    question:
      "A 4 kW single-phase induction motor with a power factor of 0.85 lagging at full load. Design current Ib at the motor?",
    options: [
      "Ib = (4000) / (230 x 0.85) = 20.46 A — apparent power is real power divided by power factor, then current is apparent power divided by voltage. Round to 21 A and apply a starting allowance for protective coordination.",
      "To provide a complete record of all maintainable assets including their location, criticality, technical specifications, maintenance history, and spare parts, enabling effective maintenance planning",
      "Verify the timer is receiving its enable/trigger signal, check the time setting, and confirm the timer type (on-delay, off-delay, pulse) is correct for the application",
      "Check the VSD fault log for diagnostic codes, assess the motor insulation resistance and phase balance, inspect the mechanical load, review recent changes or maintenance, and apply root cause analysis before implementing a permanent fix",
    ],
    correctIndex: 0,
    explanation:
      "Inductive single-phase: Ib = P / (V x cos φ). The motor draws apparent power S = P / cos φ = 4000 / 0.85 = 4706 VA, and the line current carries apparent power not real power. So Ib = 4706 / 230 = 20.46 A. Round up to 21 A. For motor circuits the starting current is typically 6-8 x FLC for a few seconds; the cable carries the start (short duration, OK on cable thermal) but the protective device must be coordinated for it (Type C MCB or motor-rated MPCB).",
  },
  {
    id: 'ib-three-phase',
    question:
      "A 22 kW three-phase induction motor at 400 V line-to-line, power factor 0.86, efficiency 0.93. Full-load current?",
    options: [
      "An electricity meter, a gas meter (if applicable), a communications hub (connecting to the DCC network), and an in-home display (IHD) showing real-time energy usage and cost information",
      "Ib = 22000 / (1.732 x 400 x 0.86 x 0.93) = 39.7 A. Three-phase formula uses sqrt(3) and the input power must be derived from the rated mechanical output divided by efficiency.",
      "Stop work immediately, verify the status of their own isolation, and challenge the colleague — the integrity of the safe isolation system has been compromised",
      "An SWA stripping tool or rotary cable cutter designed for armoured cable, which cuts through the armour wires without damaging the inner insulation",
    ],
    correctIndex: 1,
    explanation:
      "Three-phase formula: Ib = P_input / (sqrt(3) x VL x cos φ). For a motor the rated label P is typically the mechanical output, so P_input = P_output / efficiency = 22000 / 0.93 = 23656 W. Then Ib = 23656 / (1.732 x 400 x 0.86) = 39.7 A. Most BS EN 60034 motor nameplates give FLC directly so the calc is a check against the nameplate rather than the primary derivation. Always apply starting current allowance for motor circuit protection coordination (typically 6-8 x FLC for DOL).",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Ib (design current) represent in BS 7671 terminology?",
    options: [
      "Your business details, client details, unique number, date, description of work, amount, VAT if applicable",
      "The current intended to be carried by the circuit in normal service, after diversity has been applied — the demand the circuit has to deliver.",
      "Working near overhead power lines with cranes, MEWPs, scaffold towers, or other equipment that could approach the lines",
      "The Electricity at Work Regulations 1989, COSHH 2002, PUWER 1998, and the CDM Regulations 2015 may all be relevant depending on the work",
    ],
    correctAnswer: 1,
    explanation:
      "Ib is the design current — the current the circuit is designed to carry in normal service. It is the result of the load assessment: connected load adjusted by diversity and power factor. Ib is the first input to the BS 7671 sizing chain Ib less than or equal to In less than or equal to Iz (Reg 433.1.1). Ib is not the fault current (that is Ipfc / PSCC), not the maximum cable capacity (that is It / Iz), and not the rated current of the device (that is In).",
  },
  {
    id: 2,
    question: "For a single-phase resistive load, the design current formula is:",
    options: [
      "A short, focused, informal training session delivered at the workplace covering a specific manual handling topic relevant to current work",
      "Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met",
      "Ib = P / V — power in watts, voltage in volts, current in amps. No power factor term because resistive loads have unity power factor.",
      "Each test relies on the integrity of a previous test (e.g. IR cannot be safely interpreted without continuity of cpc; live tests require dead-test confirmation of earthing)",
    ],
    correctAnswer: 2,
    explanation:
      "Resistive single-phase: Ib = P / V. A heater, an incandescent lamp, an electric shower, an immersion element — all have power factor near 1. Apparent power equals real power, so the line current is just P / V. For 230 V the divisor is 230; for 240 V (older legacy installations) the divisor is 240. Always use the nominal supply voltage at the equipment.",
  },
  {
    id: 3,
    question: "For an inductive single-phase load, the design current formula is:",
    options: [
      "The sideways distortion of the tower frame caused by horizontal forces, which can lead to collapse if bracing is missing or inadequate",
      "The inspector, based on installation type, environment, intensity of use, and the GN3 frequency table — recorded as the inspector\\\\\\\\\\\\\\\\'s \\\\\\\\\\\\\\\"reasonable and informed decision\\\\\\\\\\\\\\\" with the rationale documented.",
      "Communication of residual risks is required when hazards cannot be eliminated or reduced through design, forming part of the \\\\\\\\\\\\\\\"inform\\\\\\\\\\\\\\\" step after designing out risk",
      "Ib = P / (V x cos φ) — real power divided by the product of voltage and power factor. The motor or inductive load draws apparent power = P / cos φ, and line current carries apparent power.",
    ],
    correctAnswer: 3,
    explanation:
      "Inductive single-phase: Ib = P / (V x cos φ). Power factor cos φ accounts for the phase shift between voltage and current in inductive loads — motors, fluorescent ballasts, transformers. The line current includes both the real (in-phase) component carrying useful work and the reactive (90 deg out-of-phase) component magnetising the motor. Both components flow through the cable, so Ib is the apparent-power line current, larger than the resistive equivalent for the same useful work.",
  },
  {
    id: 4,
    question: "For a three-phase balanced load, the design current formula is:",
    options: [
      "Ib = P / (sqrt(3) x VL x cos φ) — three-phase line current uses sqrt(3) (1.732), line-to-line voltage VL (typically 400 V in UK LV), and power factor.",
      "The part number, description, serial/batch number, date of issue, who issued it, which equipment it was fitted to, and the work order number",
      "Tell your supervisor immediately, isolate if needed, and put it right — errors caught and corrected are not disciplinary issues; errors hidden are",
      "A description of the waste, the quantity, the type of container, the date of transfer, the SIC code of the waste producer, details of both parties, and the waste carrier's registration number",
    ],
    correctAnswer: 0,
    explanation:
      "Three-phase balanced: Ib = P / (sqrt(3) x VL x cos φ). VL is the line-to-line voltage (400 V on UK LV three-phase). The sqrt(3) factor (1.732) appears because three-phase power is shared across three line conductors, and the relationship between line current and total power involves the geometry of the three-phase vector triangle. For purely resistive three-phase (cos φ = 1) the formula simplifies to Ib = P / (sqrt(3) x VL).",
  },
  {
    id: 5,
    question: "On a 30 kW resistive electric heater bank at 400 V three-phase, balanced, the design current Ib is:",
    options: [
      "Used lubricants are classified as hazardous waste and must be collected, stored and disposed of through a licensed waste carrier",
      "Ib = 30000 / (1.732 x 400 x 1) = 43.3 A. Balanced three-phase resistive (heating elements arranged in star or delta configuration), power factor 1.",
      "Make substantial pension contributions now (gaining 40% relief) while building tax-efficient ISA savings to provide flexible retirement income below allowance taper threshold",
      "Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal",
    ],
    correctAnswer: 1,
    explanation:
      "Three-phase resistive heater bank: Ib = P / (sqrt(3) x VL) since cos φ = 1. 30000 / (1.732 x 400) = 43.3 A. Round up to 44 A for cable sizing. The cable carries the same current on each line conductor (balanced load), so the three-phase line current is 43.3 A and the cable size is selected on the per-conductor basis with the appropriate grouping factor for three single-phase or one three-phase + neutral cable on a tray.",
  },
  {
    id: 6,
    question: "Diversity is applied at the design current calculation when:",
    options: [
      "RCBO 50 A Type B 6 kA Icn 30 mA Type A; 10 mm² T&E cable; Ib = 9500 / 230 = 41.3 A so In = 50 A (next standard rating); 10 mm² T&E Reference Method C tabulated It approximately 64 A so Iz greater than or equal to In comfortably; design max Zs Type B 50 A approximately 0.87 ohms per Table 41.3 A4:2026.",
      "Mirror neurons provide a neurological basis for empathy — they help us automatically simulate others' experiences in our own brain, which is why we wince when we see someone hurt or smile when we see someone happy",
      "When the circuit supplies multiple loads that will not all run simultaneously at full power. Apply diversity to the connected load before deriving Ib. For a dedicated single-load circuit (single shower, single hob), no diversity applies — Ib equals the rated current of the load.",
      "Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.",
    ],
    correctAnswer: 2,
    explanation:
      "Diversity is the engineering recognition that not every load runs simultaneously. Apply it to multi-outlet circuits (sockets ring with mixed appliances), to multi-load circuits (cooker circuit with hob plus oven plus extras) and at the consolidated installation level. Do not apply it to a dedicated circuit feeding a single load that draws full rated power when on (shower, single immersion, EV charger) — for those, Ib equals the rated current.",
  },
  {
    id: 7,
    question: "A 230 V domestic ring final circuit serving a kitchen has connected load of 30 A worth of appliances. The On-Site Guide standard circuit assumption for ring final design current is:",
    options: [
      "Report internally; if the defect appears systemic (e.g. a brand of MCB failing prematurely across multiple installs), escalate to the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s technical lead who can report to the manufacturer / RAPEX (Rapid Alert System for Non-Food Products) / Office for Product Safety and Standards. Product withdrawals and safety alerts come out of these channels.",
      "Physiological response to electric current passing through the body. Effects scale with current (mA): perception (1mA), pain (5-10mA), can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t-let-go (10-20mA), respiratory paralysis (20-50mA), ventricular fibrillation (50-100mA+). Duration matters — long exposure at lower current can be lethal.",
      "To indicate that a device (e.g. a fuse, switch or MCB) only interrupts the line conductor, not the neutral. Important for any future electrician working on the circuit — the neutral may still be live relative to earth even with the device open, so isolation procedures (lock-off, prove dead) must take account of the single-pole nature.",
      "Standard ring final is designed and protected at 30 A or 32 A regardless of connected appliance count, on the basis that diversity across the multiple outlets keeps simultaneous draw below the protective device rating. The ring itself is the protected entity, not each outlet.",
    ],
    correctAnswer: 3,
    explanation:
      "BS 1363 ring final circuits are a standard arrangement (per BS 7671 Appendix 15 / OSG section 7) protected at 30 A or 32 A. The diversity assumption is built into the standard arrangement: multiple sockets, multiple appliances, statistical simultaneity well below 30 A in normal residential use. The L3 designer's job is to verify the ring meets the standard arrangement (floor area limits, no high-fixed-load appliances on the ring) and to consider radial circuits where a heavy fixed load would dominate (e.g. a kitchen with a 3 kW kettle, 3 kW microwave and 3 kW toaster all in regular concurrent use — radial 20 A may be more appropriate than ring 32 A).",
  },
  {
    id: 8,
    question: "A 7 kW EV charger at 230 V single-phase. Design current Ib?",
    options: [
      "Ib = 7000 / 230 = 30.4 A — round up to 32 A for the charger circuit. EV charging is essentially resistive (charger is a switchmode converter with near-unity power factor at full power) and continuous at full rating during a charging cycle, so no diversity applies on a dedicated EV circuit.",
      "Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.",
      "Dynamically distributing the available electrical supply capacity across multiple chargers — reducing individual charge rates when total demand approaches the site supply limit, ensuring the electrical infrastructure is not overloaded while maximising the total energy delivered to all connected vehicles",
      "Are essential — they prevent re-energisation by another person who might assume the breaker is off because of a tripped fault. Multiple lock-offs allow each person working on the circuit to fit their own padlock.",
    ],
    correctAnswer: 0,
    explanation:
      "7 kW EV charger at 230 V single-phase: Ib = 7000 / 230 = 30.4 A. EV chargers are designed to operate at full rated power during the bulk-charge phase, so design at the rated current with no diversity. The charger should be on a dedicated 32 A circuit (Type B RCBO with O-PEN protection per Reg 722.411.4.1 if TN-C-S supply, or earth electrode arrangement). Cable sizing is then driven by the continuous nature of the load — derate where grouped, allow for thermal rise on PVC over long runs.",
  },
];

const faqs = [
  {
    question: "What voltage do I use in the formula — 230 V or 240 V?",
    answer:
      "Use the nominal supply voltage at the load. UK LV is harmonised at 230 V single-phase / 400 V three-phase under the BS EN 60038 standard, with a tolerance of +10/-6 percent (so the actual voltage at the meter typically sits in the 216-253 V band). For design calc use 230 V (single-phase) and 400 V (three-phase line-to-line). Older texts use 240 V — for verification of legacy installations you can calculate with the value the original design used, but new designs use 230 / 400 V. The supply voltage worst-case for Zs (Cmin = 0.95 in BS 7671 A4:2026) uses 218.5 V at the load for fault-current sizing, but for normal-service Ib the figure is the nominal 230 V.",
  },
  {
    question: "Where do I find power factor for a load if the manufacturer datasheet does not state it?",
    answer:
      "For pure resistive loads (heaters, showers, immersions, incandescent lamps, electric ovens with element heating only) cos φ = 1 — no power factor term. For motors, the nameplate or motor catalogue states cos φ at full load (typically 0.80-0.92 for induction motors, higher for synchronous and PMSM types). For LED drivers, electronic ballasts and switchmode supplies the displacement power factor is usually near unity but the true power factor (including harmonic distortion) can be 0.5-0.7 for cheap drivers. For mixed loads on a circuit (a small office with mixed lighting, computers and kettle) the engineering practice is to assume cos φ = 0.95 for the dominant resistive load and 0.85 for any inductive component, taking the worst-case for sizing. For single-load design where no datasheet is available, a conservative cos φ = 0.85 is the default assumption.",
  },
  {
    question: "Do I include the EV charger pilot signal when sizing the supply cable?",
    answer:
      "No — the pilot is a low-current control signal (microamps to a few mA), not part of the main current path. The supply cable is sized for the main charging current Ib (32 A for a 7 kW charger). The pilot wiring uses a separate twisted-pair or screened cable to the charger control input. The protective device on the main charging circuit is sized to carry Ib continuously and to coordinate with the charger's own internal current management.",
  },
  {
    question: "Why does the design current formula not include time?",
    answer:
      "Ib is the steady-state demand of the circuit — what it draws when running. Time-dependent considerations (starting current of motors, in-rush of lamp loads, kettle peaks) come in via the protective device coordination and the cable thermal calc, not via Ib itself. Ib = P / V (or P / V x cos φ) is the average sustained current the circuit has to deliver. Cable sizing then verifies the cable can carry Ib continuously without overheating; protective device selection then coordinates for both Ib and the start-up transient.",
  },
  {
    question: "How does Ib differ from the maximum demand on the schedule?",
    answer:
      "Ib is per-circuit; maximum demand (MD) is per-installation. You calculate Ib for each final circuit individually — the shower circuit is 36.96 A, the EV circuit is 30.4 A, the ring final is 30 A. Then you sum the circuit Ib values into the load schedule, applying installation-level diversity (not every circuit at peak simultaneously), to derive the per-phase MD on the consolidated schedule. The supply is sized for MD; the protective device for each circuit is sized for that circuit's Ib. Same arithmetic principles, different scope.",
  },
  {
    question: "What if the actual load is unknown — for example a future tenant fit-out?",
    answer:
      "Use a category-based assumption for sockets and lighting density, then size to the standard arrangement. For a generic office: 25 W per square metre for lighting, 25 VA per square metre for small power, plus separate calcs for known fixed loads (HVAC, server room, comms cabinet). For retail: 50-150 VA per square metre depending on category. For warehouse: 5-15 W per square metre lighting, low base small power. The L3 designer documents the assumption against the circuit and notes the limit ('design for 25 VA per square metre small power; tenant fit-out exceeding this requires re-assessment'). The schedule reads honestly that the calc was based on a category assumption rather than a specific equipment list.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 1"
            title="Design current Ib — the first calc on every circuit"
            description="Calculating the design current Ib for any final circuit. Resistive loads, inductive loads with power factor, three-phase, and the diversity adjustment that turns connected load into design current. The first number on every cable schedule and the input to BS 7671 Reg 433.1.1."
            tone="amber"
          />

          <TLDR
            points={[
              "Ib is the design current — the current the circuit has to carry in normal service after diversity. It is the first input to BS 7671 Reg 433.1.1 (Ib less than or equal to In less than or equal to Iz).",
              "Resistive single-phase: Ib = P / V. Inductive single-phase: Ib = P / (V x cos φ). Three-phase balanced: Ib = P / (sqrt(3) x VL x cos φ).",
              "Apply diversity on multi-outlet or multi-load circuits; do not apply it on dedicated single-load circuits (shower, EV, immersion) where Ib equals the rated current.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Calculate the design current Ib for resistive single-phase loads using Ib = P / V.",
              "Calculate the design current Ib for inductive single-phase loads using Ib = P / (V x cos φ) and explain the role of power factor.",
              "Calculate the design current Ib for balanced three-phase loads using Ib = P / (sqrt(3) x VL x cos φ).",
              "Decide when diversity should and should not be applied to the connected load before deriving Ib.",
              "Recognise the difference between Ib (per-circuit design current) and MD (per-installation maximum demand) and use each in the right place on the design pack.",
              "Use Ib as the first input to BS 7671 Reg 433.1.1 (Ib less than or equal to In less than or equal to Iz) and explain why an accurate Ib is the foundation of correct cable and device sizing.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What Ib is and why it comes first"
            plainEnglish="Ib is the current the circuit has to carry when it is doing its job. Get Ib wrong and every later calc — cable size, device rating, voltage drop, EFLI — sits on a wrong foundation."
            onSite="Most circuit-design errors start at Ib. Either the connected load was misread, or diversity was applied where it should not have been, or the power factor term was dropped. Slow down on Ib; the rest of the design is downstream of it."
          >
            <p>
              In BS 7671 terminology Ib is the design current of a circuit — the current intended
              to be carried by the circuit in normal service. It is not the fault current (Ipfc),
              not the rated current of the protective device (In), and not the maximum
              current-carrying capacity of the cable (Iz). Ib is the demand the circuit has to
              deliver, and it is the input from which the protective device rating (In) and the
              cable size (Iz) are then chosen.
            </p>
            <p>
              The chain runs: assess the load → calculate Ib → choose In greater than or equal to
              Ib (Reg 433.1.1(a)) → choose a cable with Iz greater than or equal to In (Reg
              433.1.1(b)) → verify Iz is greater than or equal to In and that the device operating
              current does not exceed 1.45 x Iz (Reg 433.1.1(c)) → check voltage drop (Reg 525) →
              check Zs and disconnection time (Reg 411). Every step uses Ib as the starting input.
              An incorrect Ib propagates through the whole calc.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1 (Coordination between conductors and overload protective device)"
            clause="The rated current or current setting of the protective device (Ir) shall not be less than the design current (Ib) of the circuit. The rated current or current setting of the protective device (Ir) shall not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit. The current (I2) causing effective operation of the protective device shall not exceed 1.45 times the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit."
            meaning={
              <>
                Reg 433.1.1 is the regulation Ib feeds into. It is the foundation of overload
                protection: the device rating must be at least the design current (so the circuit
                can run normally without nuisance trip) and at most the cable capacity (so the
                cable does not get damaged before the device operates). The 1.45 x Iz limit covers
                the small overcurrent zone where a device has not yet operated but the cable is
                being stressed. Get Ib accurate and the whole chain falls into place; get it
                wrong and the chain breaks.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.1(a), (b), (c). The label 'Ir' is used in the regulation text for the rated or set current of the protective device (often shown as 'In' in cable schedules)."
          />

          <SectionRule />

          <ContentEyebrow>Resistive loads — the simplest case</ContentEyebrow>

          <ConceptBlock
            title="Resistive single-phase formula"
            plainEnglish="Ib = P / V. No power factor term because resistive loads are in-phase. A 9 kW shower at 230 V draws 39.1 A — round up to 40 A for cable sizing."
          >
            <p>
              For a resistive load on a single-phase 230 V supply:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              Ib = P / V
            </p>
            <p>
              Where P is the rated power in watts and V is the nominal supply voltage. Examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3 kW immersion heater at 230 V: Ib = 3000 / 230 = 13.04 A. Round up to 14 A. Standard 16 A protected radial.</li>
              <li>9 kW electric shower at 230 V: Ib = 9000 / 230 = 39.13 A. Round up to 40 A. Standard 40 A protected radial, 6 mm² T&E (subject to Reference Method derate).</li>
              <li>2 kW kettle on a ring final: Ib = 2000 / 230 = 8.7 A. Adds to ring loading; ring still at 32 A protective device.</li>
              <li>10 kW shower at 230 V: Ib = 10000 / 230 = 43.5 A. Round up to 45 A. Use 45 A or 50 A protected radial, 10 mm² T&E.</li>
              <li>1.5 kW LED lighting array at 230 V (treating as resistive — see below): Ib = 1500 / 230 = 6.5 A. Standard 6 A or 10 A lighting circuit.</li>
            </ul>
            <p>
              Pure resistive loads — heating elements, incandescent and halogen lamps, electric
              showers, immersions, ovens with element heating only — have power factor cos φ = 1
              and the formula is straightforward. Watch out for LED lighting and switchmode
              supplies: at the lamp / driver level the power factor can vary with quality, but for
              circuit-level design the assumption is generally cos φ near 1 for the lighting
              circuit overall.
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

          <ContentEyebrow>Inductive loads — power factor enters the formula</ContentEyebrow>

          <ConceptBlock
            title="Inductive single-phase formula"
            plainEnglish="Ib = P / (V x cos φ). The motor draws apparent power S = P / cos φ; line current carries apparent power, not just real power."
            onSite="A 4 kW motor at 0.85 power factor draws 20.5 A from a 230 V supply, not 17.4 A. Forgetting the cos φ term undersizes the cable by about 18 percent — enough to overheat over time."
          >
            <p>
              For an inductive load (induction motor, fluorescent fitting with magnetic ballast,
              transformer, contactor coil bank) on a single-phase supply:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              Ib = P / (V x cos φ)
            </p>
            <p>
              Why the cos φ term? Inductive loads draw both real power (P, watts, doing useful
              work) and reactive power (Q, VAr, magnetising the inductance). The vector sum is
              apparent power S in volt-amps:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              S = sqrt(P² + Q²) = P / cos φ
            </p>
            <p>
              The line current carries S, not P. So Ib = S / V = P / (V x cos φ). The cable sees
              the larger apparent-power current, and the design current is correspondingly larger
              than the resistive equivalent for the same useful work. Examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4 kW single-phase motor at 230 V, cos φ 0.85: Ib = 4000 / (230 x 0.85) = 20.46 A. Round to 21 A.</li>
              <li>2.2 kW single-phase fan motor at 230 V, cos φ 0.80: Ib = 2200 / (230 x 0.80) = 11.96 A. Round to 13 A.</li>
              <li>1 kW magnetic-ballast fluorescent fitting at 230 V, cos φ 0.90 (uncorrected): Ib = 1000 / (230 x 0.90) = 4.83 A.</li>
              <li>0.5 kW electronic transformer for low-voltage halogen at 230 V, cos φ 0.95: Ib = 500 / (230 x 0.95) = 2.29 A.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Power factor correction (PFC) — what it changes for Ib"
            plainEnglish="PFC capacitors raise the effective cos φ of an inductive load. The motor still does the same useful work, but the line current drops. Ib drops with it."
          >
            <p>
              Power factor correction (PFC) capacitors are wired in parallel with inductive loads
              (motors, fluorescent banks). They supply the magnetising reactive power locally so it
              does not have to be drawn from the supply. The effect: cos φ at the supply moves
              from (say) 0.75 lag towards 0.95 lag or 1.0, and the line current Ib falls
              correspondingly.
            </p>
            <p>
              Example: a 22 kW three-phase motor at 0.75 cos φ uncorrected: Ib = 22000 / (1.732 x
              400 x 0.75) = 42.3 A. With PFC to 0.95 cos φ: Ib = 22000 / (1.732 x 400 x 0.95) =
              33.4 A — a 21 percent reduction. The cable size, intake fuse and supply size all
              benefit. PFC is therefore a design choice on inductive-heavy installations
              (workshops, commercial kitchens, refrigeration plant) that pays back through smaller
              supply, smaller cables, lower DNO charges and lower power-factor penalties on the
              electricity bill.
            </p>
            <p>
              Note: PFC does not change the motor's torque or the kW it delivers — only the line
              current it draws to do so. Modern variable-speed drives (VSDs) typically present
              near-unity displacement power factor at the supply but inject harmonics that have
              their own diversity / sizing implications (see industrial load assessment Sub 2.5).
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

          <ContentEyebrow>Three-phase loads</ContentEyebrow>

          <ConceptBlock
            title="Three-phase balanced formula"
            plainEnglish="Ib = P / (sqrt(3) x VL x cos φ). VL is line-to-line voltage (400 V on UK LV three-phase). The sqrt(3) comes from the three-phase vector geometry."
          >
            <p>
              For a balanced three-phase load:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              Ib = P / (sqrt(3) x VL x cos φ)
            </p>
            <p>
              Where P is the total real power (watts), VL is the line-to-line voltage (400 V on UK
              LV three-phase), cos φ is the load power factor and sqrt(3) approx 1.732. The
              formula gives the line current — the current in any one line conductor of a balanced
              three-phase system. Examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>30 kW resistive heater bank, 400 V three-phase, cos φ 1: Ib = 30000 / (1.732 x 400) = 43.3 A. Round to 44 A.</li>
              <li>22 kW three-phase induction motor, 400 V, cos φ 0.86, efficiency 0.93. Input power = 22000 / 0.93 = 23656 W. Ib = 23656 / (1.732 x 400 x 0.86) = 39.7 A.</li>
              <li>11 kW three-phase EV rapid charger, 400 V, cos φ 0.99 (modern AC charger): Ib = 11000 / (1.732 x 400 x 0.99) = 16.05 A. Round to 16 A on dedicated circuit.</li>
              <li>50 kW three-phase commercial kitchen mixed load, balanced, cos φ 0.92: Ib = 50000 / (1.732 x 400 x 0.92) = 78.5 A.</li>
            </ul>
            <p>
              For unbalanced three-phase, calculate per phase (treat each line as single-phase
              with phase-to-neutral voltage 230 V) and report the heaviest phase. The neutral
              conductor carries the imbalance; on harmonic-rich loads (LED-heavy lighting, multiple
              VSDs) the third-harmonic neutral current can exceed the phase current and require
              upsized neutral per Appendix 4.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why sqrt(3) appears in the three-phase formula"
            plainEnglish="In a balanced three-phase system the line-to-line voltage is sqrt(3) times the line-to-neutral voltage. The total power formula respects that geometry."
          >
            <p>
              In a three-phase wye (star) system, the line-to-line voltage VL and the
              line-to-neutral voltage VLN are related by:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              VL = sqrt(3) x VLN
            </p>
            <p>
              For the UK LV system: VL = 400 V (line to line), VLN = 230 V (line to neutral). The
              ratio 400 / 230 = 1.739, very close to sqrt(3) (the small discrepancy is the BS EN
              60038 harmonised tolerance band).
            </p>
            <p>
              Total three-phase power for a balanced load:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              P = sqrt(3) x VL x IL x cos φ
            </p>
            <p>
              Re-arranging for the line current:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              IL = P / (sqrt(3) x VL x cos φ)
            </p>
            <p>
              That IL is what BS 7671 calls Ib for the three-phase circuit. The same conductor
              carries the same line current regardless of whether the load is connected in star or
              delta, provided the load is balanced. The cable size is then selected on the
              per-conductor basis with appropriate Reference Method and grouping factors.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diversity at the circuit level</ContentEyebrow>

          <ConceptBlock
            title="When to apply diversity to derive Ib"
            plainEnglish="Multi-load circuits get diversity. Single-load dedicated circuits do not. Most cable schedule errors come from confusing the two."
          >
            <p>
              Diversity is the engineering recognition that not every load on a multi-load circuit
              runs simultaneously at full power. It is applied to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ring final circuits (multiple sockets, mixed appliance use) — built into the standard arrangement at 32 A.</li>
              <li>Cooker circuits (hob plus oven plus extras on a single connection unit) — On-Site Guide formula: first 10 A at 100 percent + 30 percent of remainder + 5 A if the connection unit feeds a 13 A socket.</li>
              <li>Lighting circuits (multiple lamps, simultaneity less than 100 percent on larger circuits) — diversity in the order of 75-90 percent depending on installation type.</li>
              <li>Multi-outlet small power on commercial floors — assess by tenant fit-out category.</li>
            </ul>
            <p>
              Diversity is NOT applied to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dedicated single-load circuits — shower, immersion, EV charger, single oven, single hob, dedicated heat-pump compressor. The load draws full rated current when on; design at rated current.</li>
              <li>Continuous-rated loads — anything intended to run at full load for prolonged periods (commercial fridge plant, server-room AC, life-safety equipment).</li>
              <li>Fixed mechanical loads where the duty is known — for example a lift designed to run at 100 percent during peak, with starting allowance added.</li>
            </ul>
            <p>
              The L3 designer's discipline is to know the difference. The protective device for an
              EV charger circuit is sized at 32 A because Ib is 30.4 A (no diversity); the
              protective device for a kitchen ring final is sized at 32 A because the standard
              arrangement covers diversity statistically. Same protective device rating, two
              entirely different design routes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1 (Maximum demand and diversity)"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                Reg 311.1 is the regulation that authorises diversity in the design current
                calculation. It permits — but does not require — diversity to be applied. The
                designer judges where it is engineering-justified (multi-outlet, multi-load
                circuits with statistical simultaneity) and where it is not (dedicated single-load
                circuits). The On-Site Guide Appendix A and IET Guidance Note 1 give standard
                diversity assumptions for typical installation types; the designer cites the
                source on the cable schedule.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 3, Chapter 31, Regulation 311.1. See also IET On-Site Guide Appendix A (Maximum demand and diversity)."
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Forgetting the cos φ term on inductive loads"
            whatHappens={
              <>
                You design a workshop with five 4 kW single-phase motors. You calculate Ib as 4000
                / 230 = 17.4 A per motor. You spec a 20 A device and 2.5 mm² cable. The motors
                actually draw 4000 / (230 x 0.85) = 20.5 A continuously, and the starting transient
                takes them to 130 A peak. The 20 A device starts nuisance-tripping; the 2.5 mm²
                cable runs hot under sustained 20-21 A and the insulation degrades over months.
                The engineering report after the failure points straight at the missing cos φ term.
              </>
            }
            doInstead={
              <>
                On any load that is not pure resistive, look up cos φ on the manufacturer datasheet
                or the motor catalogue, or use a conservative default (0.85 for general motors,
                0.80 for older fluorescent banks, 0.95 for modern electronics). Apply the formula
                Ib = P / (V x cos φ) for single-phase or Ib = P / (sqrt(3) x VL x cos φ) for
                three-phase. Always state the cos φ assumption on the cable schedule against the
                circuit row so it can be verified.
              </>
            }
          />

          <CommonMistake
            title="Applying domestic ring-final diversity to a heavy commercial small-power load"
            whatHappens={
              <>
                You design a small office break-room with a 32 A ring final, treating it like a
                domestic kitchen. The actual load is two 3 kW kettles, a 2.5 kW microwave, a 2 kW
                toaster and a 1.5 kW coffee machine — all hammered at the morning peak by twelve
                staff. Cumulative concurrent draw routinely 30-35 A at 9 a.m. The ring final
                trips, recovers, trips again. The protective device replacement does not fix it.
                The diversity assumption was wrong — domestic 'sockets diverse' became commercial
                'kitchen kit on simultaneously'.
              </>
            }
            doInstead={
              <>
                On commercial small power, assess the actual load profile rather than dropping the
                domestic ring assumption in. For a busy break-room consider a 32 A ring with the
                heavy appliances on dedicated radials (3 kW kettle on a 13 A FCU off the ring is
                fine; two 3 kW kettles in concurrent use need their own provision). For server
                rooms, A/V suites or any continuous-load environment, design for the assessed
                continuous draw with no diversity. The On-Site Guide ring assumptions are
                domestic-rated; commercial design needs commercial assumptions.
              </>
            }
          />

          <Scenario
            title="Domestic CU upgrade — Ib for each new circuit"
            situation={
              <>
                A 1990s domestic CU swap with three new circuits added: a 9.5 kW electric shower
                (replacing a 7.5 kW unit), a 7 kW EV charger on the driveway, and an 8 kW
                air-source heat pump replacing the gas boiler. Existing: lighting, sockets ring,
                immersion, cooker — to be re-protected on the new RCBO board.
              </>
            }
            whatToDo={
              <>
                Calculate Ib for each new circuit individually. Shower 9.5 kW resistive at 230 V:
                Ib = 9500 / 230 = 41.3 A; spec a 45 A or 50 A RCBO and 10 mm² T&E. EV charger 7
                kW at 230 V (manufacturer states cos φ near unity at full charge): Ib = 7000 / 230
                = 30.4 A; spec 32 A Type B RCBO with O-PEN protection (TN-C-S supply), 6 mm² T&E
                or 4 mm² 6242Y SWA depending on route. Heat pump 8 kW at 230 V single-phase, cos φ
                0.95 (manufacturer datasheet): Ib = 8000 / (230 x 0.95) = 36.6 A; spec 40 A Type B
                or C RCBO depending on starting transient (compressor inrush), 6 mm² T&E. Existing
                circuits keep their existing Ib (lighting, sockets) — re-derive only if loads
                changed. Sum all circuit Ib into the load schedule with diversity at consolidation,
                then verify the 100 A intake fuse is sufficient for the consolidated MD.
              </>
            }
            whyItMatters={
              <>
                Per-circuit Ib is the foundation. The shower needs a 45-50 A device because Ib is
                41.3 A; a smaller device nuisance-trips. The EV charger needs 32 A because Ib is
                30.4 A; smaller fails to deliver full charge. The heat pump needs 40 A because Ib
                is 36.6 A and the compressor inrush needs starting headroom. Each circuit
                designed to its own Ib. The consolidated schedule then verifies the 100 A supply
                handles the combined demand under diversity. Skip Ib at the circuit level and the
                board ends up nuisance-tripping on the first cold morning when shower, EV and heat
                pump all run.
              </>
            }
          />

          <ConceptBlock
            title="Ib for non-sinusoidal loads — the harmonic factor"
            plainEnglish="LED drivers, switchmode power supplies and VSDs draw current in chopped pulses, not smooth sinewaves. The RMS current can be higher than the formula predicts. On harmonic-heavy installations, add a harmonic loading factor."
            onSite="In a small commercial fit-out with all-LED lighting and a server-room of switchmode-supplied servers, the line and neutral currents are harmonic-rich. Reg 524.1 and Appendix 4 cover the upsize. For most residential designs the effect is small enough to ignore; for commercial / industrial designs over a certain VSD or LED density it is real."
          >
            <p>
              Loads with rectifier front ends (LED drivers, switchmode power supplies, computer
              power supplies, single-phase VSDs) draw current in chopped pulses near the voltage
              peaks. The result:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The RMS line current is higher than the average current predicted by P / V — the crest factor of the current is greater than the sinusoidal sqrt(2) = 1.414.</li>
              <li>Harmonic distortion appears on the supply — third (150 Hz), fifth (250 Hz), seventh (350 Hz) and so on.</li>
              <li>On three-phase systems, third-harmonic currents in each phase are in-phase with each other (triplen harmonics) and add in the neutral conductor — the neutral can carry up to 1.73 x the phase current on heavily harmonic loads.</li>
            </ul>
            <p>
              For Ib calc on harmonic-rich circuits: use the formula as normal but apply a
              harmonic loading factor (typically 1.10 to 1.25 for LED-heavy lighting, 1.30 plus
              for VSD-heavy industrial) to the cable sizing. Reg 524.1 and Appendix 4 give the
              rating-factor methodology. For residential and small commercial work the effect is
              small enough to absorb in the standard derate; for serious VSD installations it is a
              specific design step.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Ib on a TT or TN-C-S supply — same calc, different downstream"
            plainEnglish="Ib does not care what the supply earthing arrangement is. The downstream protection method does."
          >
            <p>
              Ib is determined by the load and the supply voltage, not by the supply earthing
              arrangement. A 7 kW EV charger draws Ib = 30.4 A on TN-S, on TN-C-S (PME) and on TT
              alike. What changes downstream:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Protective device coordination — the disconnection time at fault depends on Zs, which depends on Ze (TN-S typically 0.8 ohms maximum, TN-C-S typically 0.35 ohms, TT can be 100 ohms or more) and on the cable R1+R2.</li>
              <li>EV charger O-PEN protection — required on TN-C-S per Reg 722.411.4.1, achieved either by purpose-designed charger (built-in O-PEN protection) or by an earth electrode arrangement that effectively converts the charger to TT for fault purposes.</li>
              <li>Disconnection time — TN supplies use OPD or RCD to meet Table 41.1 (0.4 s for socket-outlet circuits up to 63 A on a 230 V system); TT supplies usually rely on RCD additional protection because Zs is too high for OPD-only disconnection.</li>
            </ul>
            <p>
              The L3 designer calculates Ib first, then the protection scheme based on the supply
              earthing. The cable size and protective device rating come out the same; the
              earthing and the additional-protection requirements differ.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.4.1 (TN system earthing integrity)"
            clause={
              <>
                In a TN system, the integrity of the earthing of the installation depends on
                the reliable and effective connection of the PEN or PE conductors to Earth.
                Where the earthing is provided from a public or other supply system, compliance
                with the necessary conditions external to the installation is the
                responsibility of the distributor.
              </>
            }
            meaning={
              <>
                For TN-S, TN-C-S and TN-C circuits the earthing relies on the supply-side
                conductor remaining intact. The distributor carries the duty for the external
                portion; the designer carries the duty for the installation-side. A circuit
                designed for a TN system that is later found to be on a different earthing
                arrangement may not satisfy ADS — the earthing arrangement is a fundamental
                input to the design.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.4.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Ib is the design current — the current the circuit has to carry in normal service after diversity. It is the first input to BS 7671 Reg 433.1.1 and the foundation of the cable / device sizing chain.",
              "Resistive single-phase: Ib = P / V. No power factor term. Examples: shower, immersion, oven element.",
              "Inductive single-phase: Ib = P / (V x cos φ). Power factor accounts for the reactive component magnetising the inductance. Forgetting cos φ undersizes the cable.",
              "Three-phase balanced: Ib = P / (sqrt(3) x VL x cos φ). VL is line-to-line (400 V on UK LV). The sqrt(3) comes from the three-phase vector geometry.",
              "Apply diversity on multi-outlet or multi-load circuits with statistical simultaneity (rings, cookers, lighting). Do not apply diversity on dedicated single-load circuits (shower, EV, immersion) where Ib equals the rated current.",
              "Power factor correction (PFC) reduces the line current of inductive loads by supplying reactive power locally. Effective on motor-heavy installations; reduces cable, switchgear and supply sizing requirements.",
              "Harmonic-rich loads (LED drivers, switchmode supplies, VSDs) inject distorted current — the RMS exceeds the simple formula. Apply Reg 524.1 / Appendix 4 rating-factor methodology on commercial / industrial designs.",
              "Ib is per-circuit; MD (maximum demand) is per-installation. Calculate Ib for each circuit individually; sum and apply installation-level diversity to derive MD on the consolidated schedule.",
            ]}
          />

          <Quiz title="Design current Ib — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section2-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.6 Load schedule consolidation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Protective device selection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
