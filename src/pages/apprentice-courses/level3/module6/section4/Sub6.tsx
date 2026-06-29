/**
 * Module 6 · Section 4 · Subsection 6 — Cable selection synthesis (full design example)
 * Maps to C&G 2365-03 / Unit 305 / LO4 / AC 4.6
 *   AC 4.6 — "Synthesise CCC, voltage drop, EFLI and adiabatic gates into a single
 *            coherent cable selection for a multi-load domestic installation"
 * Layered: 2366-03 Unit 304 / AC 4.6; 5393-03 Unit 104 / AC 4.6
 *
 * The capstone Sub for Section 4. A complete worked design for a real-world
 * domestic upgrade — 100 A TN-C-S supply, 7 kW EV charger, 4 kWp PV with battery,
 * 8 kW heat pump — taken end to end through every gate (Sub 4.1 to Sub 4.5)
 * to a single integrated cable schedule.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import VoltageDropCalculator from '@/components/apprentice-courses/VoltageDropCalculator';
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

const TITLE =
  'Cable selection synthesis (4.6) | Level 3 Module 6.4.6 | Elec-Mate';
const DESCRIPTION =
  'A capstone worked example. 100 A TN-C-S domestic supply with 7 kW EV charger, 4 kWp PV with battery and 8 kW heat pump — every cable taken through CCC, Vd, EFLI and adiabatic gates and synthesised into one integrated cable schedule.';

const checks = [
  {
    id: 'maxdemand-100A',
    question:
      'A typical 4-bedroom UK home is being upgraded to 100 A TN-C-S supply. The existing plus planned loads include: 32 A radial sockets (×2), 6 A lighting (×2), 32 A oven, 50 A shower, 32 A EV charger, 16 A heat pump, 16 A battery charge/discharge. Connected total at full demand ≈ 196 A. With after-diversity demand applied, what is the maximum demand the DNO supply must support?',
    options: [
      'The full 196 A connected total — diversity does not apply to a domestic supply, so the DNO must provide a 200 A service.',
      'About 130 A — diversity only reduces the lighting and socket circuits, leaving the large fixed loads at full value, so a supply upgrade above 100 A is unavoidable.',
      'Exactly 100 A — the maximum demand is always assumed to equal the intake fuse rating regardless of the connected load.',
      'About 70–80 A after applying typical domestic diversity factors, comfortably inside the 100 A supply.',
    ],
    correctIndex: 3,
    explanation:
      'Maximum demand uses after-diversity figures from the OSG / IET Guidance Note 1 / DNO calculator. Diversity recognises that not every load is at full power simultaneously. Typical domestic diversity for sockets and lighting is around 30–40 percent of connected; EV chargers and heat pumps are usually treated as full load with load management or sequential operation. A 100 A supply comfortably accommodates a typical 4-bed home with EV + heat pump if load management is in place; without it, you may need to apply for a supply upgrade or fit smart load-management hardware to keep the demand within the supply rating.',
  },
  {
    id: 'ev-cable-pick',
    question:
      'You need to size a 32 A EV charger circuit with a 25 m route from the consumer unit to a driveway charger. Reference Method C (clipped direct), no derate stack. CCC for 6 mm² T&E (Method C) ≈ 47 A. Vd on 6 mm² over 25 m at 32 A: (7.3 × 32 × 25) / 1000 = 5.84 V = 2.54 percent. The EV cable should be:',
    options: [
      '6 mm² — CCC 47 A vs 32 A and Vd 2.54 percent, comfortably inside the 5 percent limit with headroom for a future charger upgrade.',
      '1.5 mm² — CCC of about 18 A, below the 32 A device, but the device protects the cable so the smallest CSA that fits the terminals is acceptable.',
      '2.5 mm² — CCC of 27 A is below the 32 A device, but the short charging cycles are assumed to keep the cable cool enough on the 25 m run.',
      '16 mm² — EV circuits must always match the CSA of the 100 A meter tails to handle the charging inrush current.',
    ],
    correctIndex: 0,
    explanation:
      '6 mm² is the standard EV charger spec on a 25 m run by Method C — comfortable on CCC, comfortable on Vd, and the 2.46 percent Vd headroom absorbs any future load uplift if the customer upgrades to an 11 kW or 22 kW charger later. 4 mm² works on paper for a 32 A radial but the Vd at 25 m starts to scrape margin (Vd ≈ 4.3 V = 1.87 percent, fine but no real headroom for a future upgrade and tight against the 80 percent of limit "size up" rule). 10 mm² is over-spec for this run.',
  },
  {
    id: 'meter-tail',
    question:
      'For a 100 A TN-C-S supply with the meter on the outside wall and the consumer unit 4 m of meter tails away, the recommended meter tail size is:',
    options: [
      '16 mm² — the legacy standard for an 80 A supply, taken as still acceptable for a 100 A supply over short runs.',
      '10 mm² — the same CSA as a typical shower circuit, taken as adequate because the tails are only 4 m.',
      '6 mm² — sized to match the largest final circuit on the board rather than the 100 A supply rating.',
      '25 mm² — the standard DNO and OSG recommendation for a 100 A supply, with Vd verified on the 4 m run.',
    ],
    correctIndex: 3,
    explanation:
      'The DNO and OSG / IET Guidance Note 1 recommendation for a 100 A single-phase TN-C-S supply is 25 mm² meter tails for runs up to ~3 m; longer runs need a Vd check and may need to go to 35 mm². 16 mm² was the legacy standard for 80 A supplies and is no longer considered adequate for 100 A. A 4 m run on 25 mm² gives Vd at 100 A = (1.75 × 100 × 4) / 1000 = 0.7 V — comfortably below any concern. Always check whether the DNO has a specific tail spec attached to the connection agreement; some DNOs are stricter.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In what order are the cable selection gates run when designing a circuit?',
    options: [
      'Adiabatic first (does the CPC survive?), then EFLI, then Vd, then CCC — fault survival always sets the cable size before steady-state current.',
      'CCC, then Vd, then EFLI, then adiabatic — sizing up to satisfy whichever gate demands the largest CSA.',
      'Vd first, then CCC, then adiabatic, then EFLI — voltage drop is the only gate that ever changes the cable size, so it is run first.',
      'There is no fixed order — run whichever single gate is most likely to fail for the circuit type and accept that result.',
    ],
    correctAnswer: 1,
    explanation:
      'The conventional order is CCC → Vd → EFLI → adiabatic. CCC because it sets the floor cable size for steady-state current. Vd next because long runs frequently size up beyond CCC. EFLI to verify that ADS works at the chosen cable. Adiabatic last to confirm the CPC survives the fault. The selected cable is whichever satisfies the most demanding gate. Document each gate’s pass/fail on the design sheet.',
  },
  {
    id: 2,
    question:
      'A 7 kW (32 A at 230 V) EV charger circuit needs to satisfy which BS 7671 special-location requirement that does not apply to a regular socket?',
    options: [
      'No special requirement — an EV charger is wired exactly like a standard 32 A radial socket with a 30 mA Type AC RCD.',
      'Only that the circuit is RCD-protected at 100 mA, with no requirement for DC monitoring or open-PEN protection.',
      'Section 722: dedicated circuit, Type B (or Type A + DC monitor) RCD, open-PEN protection on TN-C-S, and an IP-rated outdoor enclosure.',
      'Only that the charger is fed from a Type D MCB to handle the charging inrush current at switch-on.',
    ],
    correctAnswer: 2,
    explanation:
      'Section 722 of BS 7671 covers EV charging installations and requires: a dedicated circuit (not shared with sockets); RCD protection appropriate to the EV (Type B or Type A + DC residual monitoring); on TN-C-S supplies, "open-PEN" protection so the EV remains safe if the supply PEN is broken (devices like the Garo GLB+, Matt:e Type B + OPDP, Hager EV box family); and an outdoor IP-rated enclosure. Skipping 722 because "it is just a socket" is a safety-critical mistake.',
  },
  {
    id: 3,
    question:
      'A 4 kWp solar PV array on a south-facing roof generates a peak DC power of about 4 kW. The AC inverter output peaks at about 4 kW (~17 A at 230 V single-phase). What current rating should the inverter feed cable to the consumer unit be sized for?',
    options: [
      'The full DC string current of the panels (~40 A), because the AC cable must carry whatever the array generates.',
      'A fixed 32 A, because all PV inverter circuits are protected at 32 A regardless of array size.',
      'Half the inverter output (~8 A), because the grid absorbs the other half of the generated current.',
      '~17 A continuous, sized to the inverter’s manufacturer AC output spec rather than the panel DC rating.',
    ],
    correctAnswer: 3,
    explanation:
      'PV inverter circuits are sized to the manufacturer’s continuous AC output rating. A 4 kWp array with a 4 kW inverter outputs ~17 A continuous at peak. Standard practice: 16 A or 20 A MCB feeding 2.5 mm² T&E for short runs (cable methods M, C, A2). Reg 712 (PV-specific section of BS 7671) and the inverter’s installation manual give the exact protection specs. The DC strings on the roof are sized separately to the manufacturer’s string-cable spec, with DC isolators per Reg 712.537.',
  },
  {
    id: 4,
    question:
      'A heat pump installation with a nameplate continuous current of 16 A on a 230 V supply needs which cable on a 12 m route, Reference Method C (clipped direct), no derate stack? CCC for 2.5 mm² T&E ≈ 27 A.',
    options: [
      '2.5 mm² T&E on a 20 A MCB — CCC of 27 A comfortably above the 16 A load and Vd well inside the 5 percent limit.',
      '1.0 mm² T&E — the smallest cable that fits a 16 A load, fed from a 16 A MCB on the 12 m run.',
      '10 mm² T&E — heat pumps must always be wired in the same CSA as an electric shower to handle the compressor inrush.',
      '1.5 mm² T&E — the standard lighting cable, taken as adequate because the heat pump cycles rather than running continuously.',
    ],
    correctAnswer: 0,
    explanation:
      'CCC for 2.5 mm² T&E (Method C) is about 27 A, comfortably above the 16 A continuous draw; Vd over 12 m at 16 A = (18 × 16 × 12) / 1000 = 3.46 V = 1.5 percent, well under the 5 percent limit. The 20 A MCB sits above the 16 A continuous current with margin for short start-up surges, and 2.5 mm² on a 20 A MCB is the standard radial spec for a typical 8 kW air-source unit. Always read the manufacturer’s installation manual — some heat pumps specify 32 A protection for inrush, in which case the cable must support the protection rating, not just the continuous current.',
  },
  {
    id: 5,
    question:
      'On a TN-C-S supply with declared Ze = 0.35 Ω, what is the maximum permitted Zs for a 32 A B-curve MCB circuit per BS 7671 A4:2026 Table 41.3 (for the 230 V column)?',
    options: [
      '1.44 Ω (pre-A4)',
      '1.37 Ω',
      '0.55 Ω',
      '0.86 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 A4:2026 Table 41.3 max Zs for a B32 (230 V) is 1.37 Ω. The pre-A4 figure was 1.44 Ω; the A4:2026 amendment tightened it to 1.37 Ω because the underlying calculation now uses the Cmin = 0.95 voltage factor formally. Many older study materials and OSG editions still quote 1.44 Ω — that figure is now obsolete. Always work from the current Table 41.3 values for design and verification.',
  },
  {
    id: 6,
    question:
      'On the integrated design, the EV charger circuit is recommissioned from an existing 6 mm² T&E formerly feeding an oven. Which gate is most likely to fail and require the cable to be replaced?',
    options: [
      'CCC — an EV charger draws far more continuous current than an oven, so the 6 mm² cable overheats immediately.',
      'Adiabatic — the EV fault current is much higher than an oven fault, so the existing CPC can no longer survive.',
      'EFLI — the EV charger run is on the perimeter of the house, often longer than the original oven run, so R1 + R2 is larger and Zs may exceed Table 41.3 for the new device.',
      'Voltage drop — EV chargers are voltage-sensitive and held to the 3 percent lighting limit, which the longer run breaches.',
    ],
    correctAnswer: 2,
    explanation:
      'EFLI is the most common failure mode when re-purposing existing oven cable for an EV charger. The oven sat in the kitchen close to the consumer unit; the EV charger is typically out on the driveway, requiring the cable to be extended. The longer R1 + R2 pushes Zs above the 1.37 Ω B32 maximum from Table 41.3. CCC is usually fine (oven and EV are both ~32 A class loads); Vd often passes if the run is under 30 m; adiabatic almost always passes on modern T&E. Always re-check Zs at the new termination point before commissioning.',
  },
  {
    id: 7,
    question:
      'A consumer unit upgrade replaces a 60 A board with a 14-way RCBO board. The customer wants 10 ways used immediately and 4 ways "spare for future". What is the right design call?',
    options: [
      'Fit a 60 A board with only 10 ways — the customer does not need the spare ways now, and a smaller board is cheaper.',
      'Fit the 14-way board but leave the 4 spare ways completely unlabelled, so the next contractor can decide their use freely.',
      'Fill all 14 ways now with spare RCBOs energised but not connected to any load, so the board looks complete at handover.',
      'Fit the 14-way board, label the 4 spare ways with their intended future use, and document the reserved loads in the design pack with the maximum demand re-checked.',
    ],
    correctAnswer: 3,
    explanation:
      'Designing for the future is one of the L3 designer’s core skills. A 14-way board with 4 documented reserved ways turns three future disruptive jobs (re-board, re-route, re-cert) into three commissioning visits. Document the reserved ways with their intended use, the cable size if pre-routing makes sense, and the implication for maximum demand. The customer pays slightly more upfront for the larger board and the documentation, and saves the cost of re-boarding twice in five years.',
  },
  {
    id: 8,
    question:
      'The integrated design has been signed off and installed. What does the L3 designer hand over per Reg 132.13?',
    options: [
      'A full design pack — single-line diagram, cable schedule with the four gates per circuit, device and RCD/OPDP specs, future-load notes and homeowner operating notes.',
      'Only the signed Electrical Installation Certificate — the schedules and design calculations are kept by the contractor and not handed over.',
      'Only a verbal explanation of how to reset the consumer unit, since written documentation is not required for domestic work.',
      'Only the manufacturer leaflets for the EV charger and heat pump, with no installation-specific documentation needed.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 132.13 documentation is part of the design product. The handover pack proves the design, supports the next contractor, and gives the homeowner what they need to operate the system safely. The bigger the system (multi-load EV/PV/battery/heat pump), the more important the documentation. The EIC plus schedule of test results plus this design pack together form the complete handover.',
  },
];

const faqs = [
  {
    question: 'Which cable gate "wins" — which one normally drives the final CSA?',
    answer:
      'It depends on the run length, the design current and the protective device. As a rough guide: short heavy circuits (showers, ovens, EV chargers under 15 m) are usually CCC-driven; long runs (over 25 m, sub-mains, garden / outhouse supplies) are usually Vd-driven; small-current circuits with high fault levels (sockets near a strong TN-C-S source) are occasionally EFLI-driven if a long internal run pushes Zs near its limit; the adiabatic almost never wins on modern domestic work but routinely wins on industrial sub-mains with BS 88 fuses or settable MCCBs. Run all four gates and the answer presents itself.',
  },
  {
    question: 'How does maximum demand interact with the supply rating?',
    answer:
      'Maximum demand is the after-diversity number — the total load the installation will actually draw at its busiest moment, after recognising that not every load is at full power simultaneously. The supply rating (60 A, 80 A, 100 A) is the limit the DNO has agreed to provide. Maximum demand must be at most the supply rating. When EV chargers and heat pumps push the maximum demand close to or above the existing supply rating, the design choices are: (1) apply for a supply upgrade (free or paid depending on DNO and circumstances); (2) fit smart load management that prevents simultaneous full-power operation (sequencing the EV charger to reduce when other heavy loads are on); (3) fit a battery to absorb peaks. Most modern multi-load homes use (2) and (3) together.',
  },
  {
    question: 'Why does an EV charger need its own dedicated circuit?',
    answer:
      'Section 722 of BS 7671 requires it. The reasoning: an EV charger draws sustained heavy current for hours (a 7 kW charger is 32 A for 6+ hours on an empty-to-full charge), and shared circuits would routinely trip. The EV also has DC-side residual current behaviour that demands Type B (or Type A + DC monitor) RCD protection — fitting the EV behind a Type AC RCD shared with general sockets defeats the protection. On TN-C-S supplies the EV needs "open-PEN" protection (so the EV remains safe if the supply PEN is broken), which is a circuit-level device. All of these requirements push the EV onto its own circuit by design, not just by convenience.',
  },
  {
    question: 'How does the PV / battery / heat pump combination affect the consumer unit layout?',
    answer:
      'Bidirectional flow changes the design. PV exports current from the inverter back through the consumer unit to the grid; the battery exports to loads when the grid is down (in island mode) and stores excess PV during the day; the heat pump is a heavy continuous draw. The consumer unit needs: a dedicated PV inverter feed (reverse-power capable RCBO, manufacturer-specified protection); a battery feed sized to charge and discharge currents; a heat pump radial; load management to prevent the EV charger and heat pump from simultaneously breaching the supply rating; and labelling that makes the bidirectional flow obvious to the next person who opens the board. Reg 551 (low-voltage generating sets) and Reg 712 (PV) and Reg 722 (EV) all touch the same board on a multi-load home.',
  },
  {
    question: 'When does a 100 A supply become inadequate?',
    answer:
      'When the after-diversity maximum demand exceeds 100 A. For a typical 4-bed home with: 7 kW EV charger (32 A); 8 kW heat pump (16 A continuous, with possible 25–30 A start-up); 9 kW shower (39 A); cooker, sockets, lighting at typical diversity — the simultaneous worst-case can exceed 100 A. Two responses: apply for a 3-phase supply upgrade (typically 60 A or 80 A per phase = 240 A total, comfortable for any UK domestic load), or install smart load management (Project EV, Zappi/Eddi/Libbi ecosystem, or DNO-approved load limiters) that physically prevents simultaneous full-power operation. Smart load management is much cheaper than a supply upgrade and is the standard answer for retrofit installs in 2026.',
  },
  {
    question: 'What documentation does the customer actually want at the end?',
    answer:
      'Three things they will use: (1) a one-page summary of "what is what" — labelled circuit list with friendly names ("downstairs lights", "kitchen sockets", "EV charger") matched to the board legend; (2) a clear set of operating notes — how to reset an RCD, how to isolate a circuit, what each indicator on the EV charger / battery / inverter means; (3) the formal design pack and EIC for their property file (mortgage, sale, insurance). The L3 designer produces all three. The customer remembers (1) and (2) immediately and refers to (3) when they sell the house.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 6 · Section 4 · Subsection 6"
            title="Cable selection synthesis — full domestic worked example"
            description="The capstone for Section 4. Take a real-world 100 A TN-C-S domestic upgrade with 7 kW EV charger, 4 kWp PV with battery and 8 kW heat pump end to end through CCC, Vd, EFLI and adiabatic gates, and synthesise the result into a single integrated cable schedule and design pack."
            tone="amber"
          />

          <TLDR
            points={[
              'Cable selection is not "pick a number that looks right". It is the synthesis of four independent gates: CCC (does it carry Ib safely?), Vd (does the load see enough voltage?), EFLI (does ADS work?), and adiabatic (does the CPC survive the fault?). The cable that wins is the one that satisfies the most demanding gate.',
              'On a multi-load modern domestic install (EV + PV + battery + heat pump on a 100 A TN-C-S supply) the cable schedule has eight to twelve circuits, every one of which has been individually run through all four gates. The integrated design also has to satisfy maximum demand against the supply rating.',
              'Reg 132.13 documentation is part of the design product. The customer gets a one-page operating summary, a clearly labelled board, and a formal design pack with calculations for every circuit. Bigger systems = more documentation, not less.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Synthesise CCC, Vd, EFLI and adiabatic gates into a single coherent cable selection for any circuit type.',
              'Calculate maximum demand for a multi-load domestic installation using diversity factors from the OSG / IET Guidance Note 1 / DNO calculator.',
              'Apply BS 7671 Section 722 requirements to an EV charger circuit — dedicated circuit, Type B (or Type A + DC monitor) RCD, OPDP open-PEN protection on TN-C-S supplies, IP-rated outdoor enclosure.',
              'Apply BS 7671 Section 712 requirements to a PV inverter circuit — DC isolators, reverse-power-capable RCBO, manufacturer protection spec.',
              'Size a heat pump final circuit to manufacturer continuous-current spec with appropriate inrush protection.',
              'Size meter tails for a 100 A TN-C-S supply per DNO and OSG recommendations.',
              'Produce a complete design pack per Reg 132.13 — single-line diagram, cable schedule with all four gates documented, protective-device specs, future-load notes, operating notes for the homeowner.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The four gates as one process — CCC → Vd → EFLI → adiabatic"
            plainEnglish="The four cable gates are independent checks asking different questions. Run them in sequence, in this order, and let whichever gate demands the largest CSA win. The same cable that wins for one circuit may lose for the next — every circuit gets its own honest calc."
            onSite="On a multi-load design the gate order matters because each gate prunes the choice. CCC sets the floor; Vd often pushes you up a CSA bracket on long runs; EFLI sometimes pushes you up another bracket; adiabatic occasionally adds a final constraint. The integrated design respects all four."
          >
            <p>
              The four gates revisited from Subs 4.1–4.5:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CCC (Sub 4.2)</strong> — current-carrying capacity. Does the cable carry
                Ib in steady state without exceeding the conductor temperature limit? Reference
                Method, derate stack (Ca, Cg, Ci), required tabulated It ≥ Ib / total-derate.
                Result: minimum CSA for thermal-steady-state.
              </li>
              <li>
                <strong>Vd (Sub 4.4)</strong> — voltage drop. Does the load see enough voltage at
                its terminals? mV/A/m × Ib × L / 1000 ≤ 3 percent (lighting) or 5 percent (other).
                Result: possibly forces a CSA bigger than CCC alone needed.
              </li>
              <li>
                <strong>EFLI (Sub 5.1, run alongside cable selection)</strong> — earth fault loop
                impedance. Does Zs at the end of the circuit clear ADS in time? Zs(design) =
                Ze + (R1 + R2 at operating temperature) ≤ Table 41.3 max for the device. Result:
                may force a larger CPC or larger overall cable to bring R1 + R2 down.
              </li>
              <li>
                <strong>Adiabatic (Sub 4.5)</strong> — CPC survival. Does the CPC withstand the
                I²t energy let-through during the fault? S = √(I²t) / k. Result: may force a
                larger CPC fraction.
              </li>
            </ul>
            <p>
              The cable that goes on the schedule is whichever satisfies all four gates. On many
              circuits the gates resolve to the same answer; on some, one gate forces a step up.
              Document each gate’s pass/fail figure on the design sheet so the result is
              traceable and the next designer can see why each cable was chosen.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <VoltageDropCalculator />
          </div>

          <SectionRule />

          <ContentEyebrow>The brief — the property and the loads</ContentEyebrow>

          <ConceptBlock
            title="The brief — 1995 4-bed semi, 100 A TN-C-S, multi-load upgrade"
            plainEnglish="A real-world domestic refurbishment. New 100 A TN-C-S supply. 14-way RCBO consumer unit replacing a 60 A 8-way. 7 kW EV charger on the driveway, 4 kWp PV array on the south roof, 5 kWh AC-coupled battery in the loft, 8 kW air-source heat pump replacing a gas combi. Phased install over 12 months — first fix all wiring, second fix as commissioning windows align with the customer’s budget."
          >
            <p>
              Property: 1995 brick-built 4-bedroom semi-detached, 130 m² internal floor area,
              suburban. Existing supply: 60 A TN-C-S being upgraded to 100 A TN-C-S as part of the
              works (DNO upgrade booked). Existing CU: 8-way split-load with 30 mA RCDs, being
              replaced with a 14-way all-RCBO board (10 ways used now, 4 reserved for future).
            </p>
            <p>
              Loads to be designed in:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 × 32 A radial sockets (kitchen, utility) on 4 mm² T&E or 6 mm² where Vd demands.</li>
              <li>2 × 6 A lighting circuits (downstairs, upstairs) on 1.5 mm² T&E.</li>
              <li>1 × 32 A oven (existing) on 6 mm² T&E.</li>
              <li>1 × 50 A 9.5 kW electric shower on 10 mm² T&E.</li>
              <li>1 × 32 A EV charger on a dedicated 6 mm² T&E radial, 25 m route to driveway, with Type B RCD + OPDP open-PEN protection per Section 722.</li>
              <li>1 × 4 kWp PV inverter feed on 2.5 mm² T&E with 16 A reverse-power-capable RCBO per Section 712.</li>
              <li>1 × 5 kWh battery on 4 mm² T&E with 20 A RCBO and bidirectional power capability per Reg 551.</li>
              <li>1 × 8 kW heat pump (16 A continuous) on 2.5 mm² T&E with 20 A RCBO, 12 m route to outdoor unit.</li>
            </ul>
            <p>
              4 spare RCBO ways reserved for future loads — labelled "RESERVED FOR EXPANSION" in
              the design pack with no specific allocation, but the supply maximum demand has been
              calculated assuming up to a further 32 A of future load can be absorbed by load
              management.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 1 — maximum demand against supply</ContentEyebrow>

          <ConceptBlock
            title="Maximum demand calculation — diversity applied"
            plainEnglish="Connected total of all the new loads is around 196 A. After diversity, simultaneous worst-case demand is around 70–80 A, comfortably inside the 100 A supply. Smart load management ensures the EV charger and heat pump cannot simultaneously breach the supply rating during the worst-case winter evening."
          >
            <p>
              Connected total at full demand (every load on at full power simultaneously):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2 × 32 A radial sockets — 64 A connected.</li>
              <li>2 × 6 A lighting — 12 A connected.</li>
              <li>32 A oven — 32 A connected.</li>
              <li>50 A shower — 50 A connected.</li>
              <li>32 A EV charger — 32 A connected.</li>
              <li>16 A heat pump — 16 A continuous, 25–30 A inrush briefly.</li>
              <li>16 A battery (charge or discharge) — 16 A connected.</li>
              <li>16 A PV inverter — 16 A continuous AC export.</li>
            </ul>
            <p>
              Total connected: roughly 196 A worst-case-simultaneous, before considering that some
              of these are imports and some are exports.
            </p>
            <p>
              Apply diversity per OSG Table 1A / IET Guidance Note 1:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sockets and lighting: 100 percent of largest + 40 percent of remainder ≈ 32 + 0.4 × 44 = 49.6 A.</li>
              <li>Oven: 10 A + 30 percent of remainder + 5 A for socket on cooker switch = 10 + 0.3 × 22 + 5 = 21.6 A.</li>
              <li>Shower: 100 percent of largest = 50 A (no diversity for the largest single fixed load).</li>
              <li>EV charger: 100 percent (continuous, treated as full load with load management).</li>
              <li>Heat pump: 100 percent continuous (sized to nameplate; inrush is brief).</li>
              <li>Battery: depends on direction — assume worst-case 16 A draw during charging.</li>
              <li>PV: subtract from import demand during peak generation, but worst-case demand is at night when PV is zero.</li>
            </ul>
            <p>
              Worst-case simultaneous winter evening (no PV, all heating loads on, EV charging,
              shower in use): roughly 50 + 50 + 32 + 16 + ~10 sundry = 158 A naively, before load
              management. With the EV charger and heat pump on smart load management (which
              throttles the EV charger to keep total imports under 90 A), the demand stays inside
              the 100 A supply rating with margin for surge.
            </p>
            <p>
              The design call: 100 A supply is adequate provided smart load management is
              specified and installed (e.g. Zappi 2.1 with the heat pump CT clamp, or a
              DNO-approved load limiter on the meter side). Without load management, a supply
              upgrade to 3-phase would be needed.
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

          <ContentEyebrow>Step 2 — meter tails and main board</ContentEyebrow>

          <ConceptBlock
            title="Meter tails — 25 mm² for 100 A supply"
            plainEnglish="100 A TN-C-S meter tails are 25 mm² for runs up to ~3 m. Bigger if longer or if the DNO or scheme dictates 35 mm². Verify the DNO connection agreement before ordering cable."
          >
            <p>
              For a 100 A single-phase TN-C-S supply with a meter cupboard on the outside wall and
              the consumer unit inside the kitchen 4 m away, 25 mm² 6181Y or equivalent tails are
              the standard spec. CCC for 25 mm² single-core is comfortably above 100 A by Method
              C; Vd at 100 A over 4 m on 25 mm² ≈ (1.75 × 100 × 4) / 1000 = 0.7 V — negligible.
              Some DNOs require 35 mm² for any 100 A supply regardless of length — check the
              connection agreement.
            </p>
            <p>
              Earthing arrangement: TN-C-S means the DNO supplies a combined PEN at the cut-out;
              the installer’s side separates PEN into PE and N at the consumer’s main earthing
              terminal (MET). The meter tail "earth" is a 16 mm² (typically) earthing conductor
              from the cut-out earth terminal back to the MET.
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

          <ContentEyebrow>Step 3 — final circuits, gate by gate</ContentEyebrow>

          <ConceptBlock
            title="Lighting — 1.5 mm² T&E, 6 A B-curve RCBO"
            plainEnglish="The easy ones first. Two 6 A lighting radials on 1.5 mm² T&E, B-curve RCBO. CCC, Vd, EFLI, adiabatic all pass with comfortable margin on typical domestic runs of 15–25 m total per circuit."
          >
            <p>
              <strong>CCC:</strong> 1.5 mm² T&E by Method C clipped direct ≈ 19.5 A; Method A in
              insulated wall ≈ 14 A. Either way, comfortably above the 6 A design current.
            </p>
            <p>
              <strong>Vd:</strong> at 6 A over 25 m on 1.5 mm² (mV/A/m ≈ 29): Vd = (29 × 6 × 25) /
              1000 = 4.35 V = 1.89 percent. Below 3 percent lighting limit.
            </p>
            <p>
              <strong>EFLI:</strong> Ze 0.35 Ω + R1+R2 for 1.5 mm² T&E (1.5/1.0 mm² CPC) at 70 °C:
              cold ~30.20 mΩ/m × 1.20 = 36.24 mΩ/m × 25 m = 0.91 Ω. Zs(design) = 0.35 + 0.91 = 1.26 Ω.
              Max Zs for B6 (Table 41.3 A4:2026) = 7.28 Ω. Pass with huge margin.
            </p>
            <p>
              <strong>Adiabatic:</strong> If = 230 × 0.95 / 1.26 = 173 A. B6 magnetic instantaneous
              range 18–30 A; 173 A is way into the magnetic region, t ≈ 0.02 s. S(min) = √(173² ×
              0.02) / 115 = √598 / 115 = 24.5 / 115 = 0.21 mm². Installed CPC 1.0 mm² — pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Kitchen radial sockets — 4 mm² T&E, 32 A B-curve RCBO"
            plainEnglish="32 A radial in 4 mm² T&E for the kitchen sockets — modern domestic standard, generous CCC, comfortable Vd on typical runs."
          >
            <p>
              <strong>CCC:</strong> 4 mm² T&E by Method C ≈ 36 A; Method 100 (under
              insulation) ≈ 27 A. 32 A In with no derate stack (clipped direct on the joist run)
              clears Method C; if the cable disappears under insulation for any portion of its
              run, must derate (Ci) and re-check.
            </p>
            <p>
              <strong>Vd:</strong> at 32 A over 22 m on 4 mm² (mV/A/m ≈ 11): Vd = (11 × 32 × 22) /
              1000 = 7.74 V = 3.37 percent. Below 5 percent. Headroom adequate.
            </p>
            <p>
              <strong>EFLI:</strong> Ze 0.35 Ω + R1+R2 for 4 mm² T&E (1.5 mm² CPC) at 70 °C:
              cold ~17.07 mΩ/m × 1.20 = 20.5 mΩ/m × 22 m = 0.45 Ω. Zs(design) = 0.35 + 0.45 = 0.80 Ω.
              Max Zs for B32 = 1.37 Ω (A4:2026 Table 41.3). Pass.
            </p>
            <p>
              <strong>Adiabatic:</strong> If = 230 × 0.95 / 0.80 = 273 A. B32 instantaneous from
              160 A; 273 A magnetic, t ≈ 0.03 s. S(min) = √(273² × 0.03) / 115 = √2236 / 115 =
              47.3 / 115 = 0.41 mm². Installed CPC 1.5 mm² — pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Shower — 10 mm² T&E, 50 A B-curve RCBO"
            plainEnglish="9.5 kW shower at 230 V draws ~41 A. Sized to 50 A protection on 10 mm² T&E. Short run from CU to first-floor bathroom."
          >
            <p>
              <strong>CCC:</strong> 10 mm² T&E by Method C ≈ 64 A; Method 100 ≈ 47 A. With the run
              partly under loft insulation, derate by Ci (typically Ci = 0.78), giving
              effective It ≈ 50 A. Pass for 41 A continuous.
            </p>
            <p>
              <strong>Vd:</strong> at 41 A over 8 m on 10 mm² (mV/A/m ≈ 4.4): Vd = (4.4 × 41 × 8) /
              1000 = 1.44 V = 0.63 percent. Comfortably under 5 percent.
            </p>
            <p>
              <strong>EFLI:</strong> Ze 0.35 Ω + R1+R2 for 10 mm²/4 mm² CPC at 70 °C ≈ cold
              6.44 mΩ/m × 1.20 = 7.73 mΩ/m × 8 m = 0.062 Ω. Zs(design) = 0.35 + 0.062 = 0.412 Ω.
              Max Zs for B50 (Table 41.3 A4:2026) = 0.87 Ω. Pass.
            </p>
            <p>
              <strong>Adiabatic:</strong> If = 230 × 0.95 / 0.412 = 530 A. B50 magnetic from
              250 A; 530 A is in the magnetic region, t ≈ 0.025 s. S(min) = √(530² × 0.025) / 115 =
              √7022 / 115 = 83.8 / 115 = 0.73 mm². Installed CPC 4 mm² — pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="EV charger — 6 mm² T&E, 32 A B RCBO with Type B + OPDP, 25 m route"
            plainEnglish="The EV charger is the most regulated of the new loads. Section 722 demands a dedicated circuit, Type B (or Type A + DC monitor) RCD, OPDP open-PEN protection on TN-C-S, and an outdoor IP-rated enclosure. 6 mm² T&E is the standard cable for a 32 A EV on a 25 m run."
            onSite="The OPDP device is non-negotiable on TN-C-S. Without it, a broken PEN at the supply (a real-world DNO failure mode) puts the EV chassis at line voltage. The OPDP isolates the EV supply if it detects an open-PEN condition. Manufacturers: Garo GLB+, Matt:e Type B + OPDP, Hager EV box family."
          >
            <p>
              <strong>CCC:</strong> 6 mm² T&E by Method C ≈ 47 A. With clipped-direct routing on
              joists and no derate stack, comfortably clears 32 A.
            </p>
            <p>
              <strong>Vd:</strong> at 32 A over 25 m on 6 mm² (mV/A/m ≈ 7.3): Vd = (7.3 × 32 × 25) /
              1000 = 5.84 V = 2.54 percent. Below 5 percent with adequate headroom.
            </p>
            <p>
              <strong>EFLI:</strong> Ze 0.35 Ω + R1+R2 for 6 mm²/2.5 mm² CPC at 70 °C: cold
              10.49 mΩ/m × 1.20 = 12.6 mΩ/m × 25 m = 0.315 Ω. Zs(design) = 0.35 + 0.315 = 0.665 Ω.
              Max Zs for B32 (A4:2026) = 1.37 Ω. Pass with comfortable margin.
            </p>
            <p>
              <strong>Adiabatic:</strong> If = 230 × 0.95 / 0.665 = 329 A. B32 magnetic from 160 A;
              329 A magnetic, t ≈ 0.03 s. S(min) = √(329² × 0.03) / 115 = √3247 / 115 =
              56.98 / 115 = 0.50 mm². Installed CPC 2.5 mm² — pass.
            </p>
            <p>
              <strong>Section 722 specifics:</strong> Type B RCD (or Type A with DC residual
              monitoring, e.g. integrated into the EV unit). OPDP open-PEN protection at the
              consumer end of the supply (Garo, Matt:e or Hager device — typically combined with
              the Type B RCD in one enclosure). IP54 outdoor enclosure for the EV charger itself
              (most domestic EV products are IP54 or IP65 by design). Dedicated 6 mm² T&E radial
              from a labelled "EV CHARGER" way on the consumer unit, not shared with anything else.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Heat pump — 2.5 mm² T&E, 20 A B RCBO, 12 m route"
            plainEnglish="The 8 kW air-source heat pump runs at 16 A continuous nameplate. 2.5 mm² T&E on a 20 A RCBO is the standard call. Manufacturer’s installation manual is the source of truth for any inrush or specific protection demand."
          >
            <p>
              <strong>CCC:</strong> 2.5 mm² T&E by Method C ≈ 27 A. Comfortably above 16 A continuous.
            </p>
            <p>
              <strong>Vd:</strong> at 16 A over 12 m on 2.5 mm² (mV/A/m ≈ 18): Vd = (18 × 16 × 12) /
              1000 = 3.46 V = 1.50 percent. Comfortably under 5 percent.
            </p>
            <p>
              <strong>EFLI:</strong> Ze 0.35 Ω + R1+R2 for 2.5 mm²/1.5 mm² CPC at 70 °C: cold
              19.51 mΩ/m × 1.20 = 23.4 mΩ/m × 12 m = 0.281 Ω. Zs(design) = 0.35 + 0.281 = 0.631 Ω.
              Max Zs for B20 (A4:2026) = 2.19 Ω. Pass.
            </p>
            <p>
              <strong>Adiabatic:</strong> If = 230 × 0.95 / 0.631 = 346 A. B20 magnetic from 100 A;
              346 A magnetic, t ≈ 0.025 s. S(min) = √(346² × 0.025) / 115 = √2993 / 115 = 54.7 /
              115 = 0.48 mm². Installed CPC 1.5 mm² — pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="PV inverter feed — 2.5 mm² T&E, 16 A reverse-power-capable RCBO"
            plainEnglish="The 4 kWp PV inverter outputs ~17 A at peak. Reg 712 governs the install. Reverse-power-capable RCBO so the inverter export does not nuisance trip a forward-only protection device. Manufacturer’s manual specifies the exact protection."
          >
            <p>
              <strong>CCC:</strong> 2.5 mm² T&E by Method C ≈ 27 A. Comfortably above 17 A.
            </p>
            <p>
              <strong>Vd:</strong> short run from inverter (typically loft) to consumer unit, 5 m,
              17 A on 2.5 mm² (mV/A/m ≈ 18): Vd = (18 × 17 × 5) / 1000 = 1.53 V = 0.67 percent.
            </p>
            <p>
              <strong>EFLI / adiabatic:</strong> short cable, low Zs, comfortable for any
              reasonable B-curve RCBO at 16 A or 20 A.
            </p>
            <p>
              <strong>Section 712 specifics:</strong> DC isolators on the roof side of the
              inverter (integrated into the inverter on most modern units). AC isolator labelled
              "PV INVERTER ISOLATOR" in the loft adjacent to the inverter. PV warning labelling
              on the consumer unit, on the inverter, and at the supply intake per Reg 712.537.
              Reverse-power-capable RCBO at the consumer unit way (most modern RCBOs are; verify
              the manufacturer datasheet).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.411.4.1 (TN system, EV charging on a PME supply)"
            clause="A PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors or that might reasonably be expected to be used to charge a vehicle outdoors unless one of the following methods is used: (b) the main earthing terminal of the installation is connected to an installation earth electrode by a protective conductor complying with Regulation 544.1.1 — the resistance of the earth electrode to Earth shall be such that the maximum voltage between the main earthing terminal of the installation and Earth in the event of an open-circuit fault in the PEN conductor of the low voltage network supplying the installation does not exceed 70 V RMS; (c) protection against electric shock is provided by a device which electrically disconnects the vehicle from the live conductors of the supply and from protective earth in accordance with Regulation 543.3.3.101(b) within 5 s in the event of the voltage between the circuit protective conductor and Earth exceeding 70 V RMS."
            meaning={
              <>
                A4:2026 deleted the old "reasonably practicable" exception that used to let
                designers off the open-PEN protection duty. On a TN-C-S (PME) domestic supply
                feeding an outdoor EV charging point, you must do one of: drive an earth
                electrode that limits the open-PEN voltage rise to 70 V (route b); fit an
                open-PEN detection device that disconnects within 5 s (route c, the OPDP / Matt:e /
                Garo / Hager type); or use a voltage-window detection device on the line-to-neutral
                voltage (route d). Skipping this and trusting the PME earth alone is a straight
                non-compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 722, Regulation 722.411.4.1."
          />

          <ConceptBlock
            title="Battery — 4 mm² T&E, 20 A RCBO, bidirectional flow"
            plainEnglish="5 kWh AC-coupled battery. Charge and discharge currents both around 16 A. 4 mm² T&E on 20 A RCBO. Bidirectional protection per Reg 551."
          >
            <p>
              <strong>CCC:</strong> 4 mm² T&E by Method C ≈ 36 A. Comfortable above 16 A bidirectional.
            </p>
            <p>
              <strong>Vd:</strong> short run from loft to CU, ~6 m, 16 A on 4 mm² (mV/A/m ≈ 11):
              Vd = (11 × 16 × 6) / 1000 = 1.06 V = 0.46 percent.
            </p>
            <p>
              <strong>EFLI / adiabatic:</strong> short cable, low Zs, all gates pass with margin.
            </p>
            <p>
              <strong>Reg 551 specifics:</strong> bidirectional protection (RCBO that operates on
              fault current in either direction). Synchronisation and anti-islanding behaviour
              built into the inverter that controls the battery (G98 / G99 compliant). Labelling
              that identifies the bidirectional source. Disconnection scheme: how the battery is
              isolated for maintenance (typically an isolator at the battery, plus the CU way),
              clearly documented and labelled.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 4 — the integrated cable schedule</ContentEyebrow>

          <ConceptBlock
            title="One schedule, one design pack — Reg 132.13 deliverable"
            plainEnglish="The output of the synthesis is one cable schedule with every circuit, every cable, every protective device and every gate documented. That schedule plus the single-line diagram plus the operating notes is the design pack."
          >
            <p>
              The integrated cable schedule for this property (worked above) covers ten circuits.
              Each row records: circuit reference, description, design current Ib, route length L,
              reference method, derate stack, selected cable CSA (line / CPC), CCC pass figure, Vd
              percentage, Zs(design), max permitted Zs from Table 41.3, adiabatic minimum CSA,
              installed CPC CSA, protective device type / rating, RCD type and rating, any
              special-section reference (Section 722 for EV, 712 for PV, 551 for battery).
            </p>
            <p>
              Beyond the schedule, the design pack includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-line schematic showing supply intake → meter → CU → all circuits with bidirectional flow on PV / battery.</li>
              <li>Layout drawing showing cable routes, accessory positions, the loft inverter and battery, the driveway EV charger.</li>
              <li>Maximum demand calculation against the 100 A supply rating, with the smart load management strategy explicitly recorded.</li>
              <li>Future-load notes for the 4 reserved CU ways: "RESERVED FOR EXPANSION", with a note that maximum demand has been calculated assuming up to 32 A of further load can be absorbed by load management.</li>
              <li>RCD test schedule (every RCBO tested at IΔn and 1×IΔn at commissioning and periodically).</li>
              <li>Operating notes for the homeowner — how to reset, how to isolate, what each indicator means, who to call when.</li>
              <li>EIC plus schedule of inspections plus schedule of test results, signed by designer / installer / inspector (which on a small job may be the same person, signing three boxes).</li>
            </ul>
            <p>
              The customer keeps a copy. The designer keeps the master on file for the design life
              of the installation (typically 25 years for cable, 15–20 years for protective devices
              and equipment).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                A4:2026 carries 421.1.7 as a recommendation, not a requirement, for general
                AFDD use across AC final circuits. The wording is "recommending" — advisory
                rather than "shall". Where AFDDs become mandatory in domestic work is via the
                Building Safety Act 2022 framework for higher-risk residential buildings (HRRBs),
                which adopt the recommendation as a hard duty. On the worked example here
                (a single-family dwelling), AFDDs on the EV, heat pump and battery circuits is
                the design call — the recommendation in 421.1.7 plus a duty-of-care position on
                the higher-energy modern loads.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                The design pack is the document the next designer relies on to discharge the
                Reg 132.16 duty when an addition or alteration is proposed. On a single-circuit
                job it can be three sheets; on a multi-load home like this worked example it can
                be twenty pages plus the EIC. The completeness floor scales with the complexity
                of the installation. The next person who works on the system — possibly fifteen
                years later — needs to be able to read this pack, understand what was designed
                and why, and ascertain that the rating and condition of equipment is adequate
                for the altered circumstances.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Sizing the EV charger cable to the same spec as a regular socket circuit"
            whatHappens={
              <>
                The apprentice runs the EV charger off a spare way on the existing CU, fits a
                Type AC RCD shared with the kitchen sockets, picks 4 mm² T&E because "it’s a 32 A
                radial like any other", and skips the OPDP open-PEN protection. The install passes
                a casual visual check at handover. Six months later the supply PEN breaks in a
                roadworks incident; the EV chassis goes to line voltage and someone touching the
                car gets shocked.
              </>
            }
            doInstead={
              <>
                Run the EV charger as its own dedicated circuit per Section 722. Fit a Type B RCD
                (or Type A with DC monitoring built into the EV unit). Fit OPDP open-PEN
                protection on TN-C-S supplies. Use the manufacturer-recommended cable size for
                the run length (6 mm² for 32 A over 20–30 m is the standard call). Never share
                the EV with any other circuit, never put it behind a Type AC RCD, and never skip
                the OPDP. The Section 722 requirements exist because the EV is a uniquely
                hazardous load and the regulation has caught up.
              </>
            }
          />

          <Scenario
            title="The phased install — first fix everything now, second fix as the customer’s budget allows"
            situation={
              <>
                The customer cannot afford the EV charger, PV, battery and heat pump all at once.
                They want to budget the works over 18 months: CU upgrade and supply uplift now,
                EV charger in 3 months, PV in 6 months, battery in 9 months, heat pump in 12
                months. The first-fix electrician is asking how to handle this without doing
                expensive rework at each stage.
              </>
            }
            whatToDo={
              <>
                Design the end state up front. Fit the 14-way RCBO board now with all 10 immediate
                ways used and 4 future ways labelled and documented. Run all the second-fix cables
                during the initial first-fix while the walls and ceilings are open — cable to the
                EV charger position, cable to the loft inverter and battery, cable to the heat
                pump position. Cap and label each cable end at the second-fix accessory positions.
                Document the supply maximum demand assuming all future loads with smart load
                management. At each subsequent commissioning visit, the install reduces to:
                connect the device, configure the load management, test, certify, hand over.
                Each second-fix visit is half a day rather than a 3-day rip-out.
              </>
            }
            whyItMatters={
              <>
                Phased installs are the normal pattern for domestic energy upgrades. The L3
                designer’s job is to design the end state once and execute in stages. Skipping
                this and treating each stage as a fresh design produces unnecessary rework
                (re-routing cables, re-boarding consumer units, re-doing maximum demand calcs)
                and frustrates the customer. The design pack carries the staging plan so any
                contractor coming in mid-stream can see what was anticipated.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Cable selection is the synthesis of four independent gates: CCC, Vd, EFLI and adiabatic. The cable on the schedule is whichever satisfies the most demanding gate. Run all four for every circuit.',
              'Maximum demand is calculated after diversity per OSG Table 1A / IET Guidance Note 1. On a multi-load home (EV + PV + battery + heat pump) on a 100 A supply, smart load management is normally needed to keep simultaneous demand inside the supply rating without a 3-phase upgrade.',
              'EV chargers are governed by BS 7671 Section 722 — dedicated circuit, Type B (or Type A + DC monitor) RCD, OPDP open-PEN protection on TN-C-S, IP-rated outdoor enclosure. None of this is optional.',
              'PV inverter circuits are governed by Section 712 — DC isolators, AC isolator, reverse-power-capable RCBO, prominent labelling at supply / inverter / consumer unit.',
              'Battery installations are governed by Reg 551 — bidirectional protection, G98/G99 compliance for grid synchronisation and anti-islanding, clear isolation scheme.',
              'Heat pumps are sized to manufacturer continuous-current spec with appropriate inrush protection. 2.5 mm² T&E on a 20 A RCBO is the typical 8 kW air-source spec for a 12 m run.',
              'Meter tails for a 100 A TN-C-S supply are 25 mm² standard for runs up to ~3 m; verify the DNO connection agreement for any tighter spec.',
              'BS 7671 A4:2026 Table 41.3 max Zs for B32 = 1.37 Ω (the pre-A4 figure of 1.44 Ω is now obsolete). Always work from the current Table 41.3 values for design and verification.',
              'Reg 132.13 design pack is part of the deliverable. Single-line diagram, cable schedule with all four gates documented, protective device specs, future-load notes, operating notes for the homeowner — bigger systems need more documentation, not less.',
            ]}
          />

          <Quiz title="Cable selection synthesis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.5 Thermal constraint
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — EFLI &amp; ADS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
