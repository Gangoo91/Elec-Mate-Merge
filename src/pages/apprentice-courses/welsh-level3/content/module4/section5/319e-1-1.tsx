/**
 * Ported from the English course, combining:
 *   level3/module2/section3/Sub1.tsx
 *   level3/module2/section3/Sub3.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'l3-m2-s3-sub1-pv-strings',
    question:
      'On a domestic PV install you see two strings of 8 panels each going into a single MPPT input on the inverter. Each panel is rated 400 W at 40 V Voc, 10 A Isc. What does that tell you about the DC voltage at the inverter input on a cold sunny morning?',
    options: [
      'Around 40 V, because the two strings are in parallel and panels in parallel keep the same voltage while their currents add. Eight panels at 400 W each gives 3.2 kW per string at a constant 40 V; the cold morning lifts the current, not the voltage, so the inverter only ever sees 40 V DC.',
      'Around 320 V Vmp (8 panels in series), rising toward 380-400 V open-circuit on a cold morning because Voc has a negative temperature coefficient — so the inverter and DC isolator must be rated above that worst case.',
      'Around 230 V, because the inverter regulates the incoming DC to match the 230 V AC grid it feeds — the panels self-adjust to the grid voltage. On a cold morning the figure stays at 230 V; the temperature only affects how much current the array can deliver into that fixed voltage.',
      'Around 640 V, because both strings are in series with each other through the single MPPT input — 16 panels at 40 V each. The cold morning pushes this toward 700 V open-circuit, so the DC isolator and inverter must both be rated above 700 V even though each string is only eight panels long.',
    ],
    correctIndex: 1,
    explanation:
      "Strings put cells in series, so voltages add: 8 panels at 40 V give around 320 V at Vmp, and the open-circuit voltage on a cold morning can push toward 380-400 V due to the temperature coefficient of Voc (typically -0.3% per °C below 25°C). Two strings paralleled at the same MPPT contribute 20 A combined Isc but the same string voltage. The inverter's max DC input voltage spec, and the DC isolator at the array, must exceed the worst-case cold-morning Voc with margin. DC string voltage is a textbook electrocution risk — a typical domestic string sits at 300-600 V DC even with the inverter off and the AC isolated, so both DC isolators must be operated and locked-off before any work on the string.",
  },
  {
    id: 'l3-m2-s3-sub1-g98-g99',
    question:
      "A customer asks you to install an 8 kWp PV array with a single-phase 7 kW inverter. What's the DNO notification path?",
    options: [
      'ENA G98 fast-track — at 7 kW the inverter is still within the 16 A per phase notify-after limit, so you simply notify the DNO within 28 days of commissioning. No pre-application is needed because G98 covers everything up to 7 kW single-phase; G99 only applies to three-phase systems.',
      'No DNO notification is required at all because the array is below 10 kWp. Notification only becomes a legal requirement above 10 kWp; below that the installer commissions and the DNO is informed automatically through the smart meter once export begins.',
      'ENA G99 pre-application — the 7 kW single-phase inverter exceeds the 16 A per phase (3.68 kW) G98 limit, so the DNO must approve the connection before commissioning.',
      'Building Control notification under Part P — PV grid connection is treated as notifiable domestic electrical work, so the installer notifies Local Authority Building Control rather than the DNO. The DNO has no role in single-phase domestic PV; the G98 and G99 recommendations apply only to commercial generators.',
    ],
    correctIndex: 2,
    explanation:
      'The 16 A per phase boundary is the practical line — a single-phase 16 A export is 230 V × 16 A = 3.68 kW, so most 4 kW inverters sit just below it deliberately. A 7 kW inverter is well above, so it needs G99: a pre-installation application to the DNO, normally submitted by the MCS-certified installer, who confirms or rejects the connection based on local network capacity. Without G99 approval the DNO can require disconnection. G99 can take weeks to months depending on constraints, so the customer needs the timeline before a fitting date is committed. G98/G99 replaced the older G83/G59 in 2019 and apply to all parallel-connected generators — PV, battery, micro-CHP, micro-wind.',
  },
  {
    id: 'l3-m2-s3-sub1-shading',
    question:
      "A 10-panel string runs across a roof and one panel sits in partial shadow from a chimney each afternoon. What's the realistic effect on the string output?",
    options: [
      'Only the shaded panel loses output — it produces about 30% less while in shadow, but the other nine are unaffected because each panel feeds the string independently. The total string loss is therefore roughly one tenth of 30%, around 3%, so single-panel shading is rarely worth designing around.',
      "The shaded panel simply switches itself out of the string when it falls below its operating threshold, leaving a healthy nine-panel string at full output. Modern panels disconnect under shade automatically, so the only effect is the loss of that one panel's share — a small, predictable reduction.",
      "The shaded panel limits the current through the whole string, so the loss is far bigger than one panel's share; bypass diodes and panel-level optimisation are how the design mitigates it.",
      'The shaded panel raises the voltage of the whole string because shaded cells behave like extra resistance in series, pushing the string voltage up rather than the current down. The inverter then trips on DC over-voltage, so the practical effect is intermittent shutdowns each afternoon rather than a steady loss of output.',
    ],
    correctIndex: 2,
    explanation:
      'Without bypass diodes or panel-level optimisation, the shaded panel limits the current through the entire string — like a kink in a hose — so a 30% shade on one panel can drop the whole string by 30% or more. Bypass diodes within each panel partially mitigate this by letting current bypass the affected substring; panel-level optimisation (Tigo, SolarEdge, micro-inverters) goes further, running each panel at its own MPP regardless of neighbours. Shading is the headline real-world performance issue on UK roofs — chimneys, dormers, trees, satellite dishes — and the MCS Yield Calculator includes a shading factor from the site survey. Where shading is hard to avoid, panel-level optimisation is usually specified at design stage.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the basic chain of equipment on a typical UK domestic PV install, from sunlight to the consumer unit?",
    options: [
      'Sunlight → silicon cells → AC voltage in panel → AC string conductors → AC string isolator at the array → inverter (which steps the voltage up) → DC isolator at the inverter → generation meter → consumer unit. The panels produce AC directly, so the inverter raises the voltage rather than converting DC to AC. No DC appears anywhere on the array.',
      'Sunlight → DC panels in series → DC string isolator → inverter (MPPT, DC-AC) → AC isolator → generation meter → consumer unit, with array-frame bonding and signage at each isolation point.',
      'Sunlight → silicon cells → DC voltage → straight into the consumer unit on a dedicated MCB → inverter mounted inside the consumer unit → AC isolator → meter. The DC goes to the board first and the inverter sits inside the consumer unit, so no separate array isolator or inverter enclosure is needed.',
      'Sunlight → silicon cells → DC voltage → battery → inverter → meter → consumer unit. Every domestic PV install routes the DC through a battery first because the panels cannot feed the inverter directly; the battery acts as the buffer, so there is no direct DC-string-to-inverter path.',
    ],
    correctAnswer: 1,
    explanation:
      'The chain runs sunlight → silicon cells → DC voltage in the panel → DC string conductors (panels in series) → DC string isolator at the array → inverter (MPPT, DC-AC conversion) → AC isolator at the inverter → MID-compliant generation meter → consumer unit / DNO supply, with the array frame earth-bonded to the MET, labels at each isolator and signage at the meter. Battery storage adds a DC battery and BMS in parallel (hybrid) or a separate AC-coupled battery inverter. Each link has its own isolation point and labelling: Section 712 requires multiple DC and AC means of isolation, and the MCS Code requires durable signage warning a maintainer of the parallel generation source.',
  },
  {
    id: 2,
    question:
      'Why does the inverter in a grid-tied PV install need to "follow" the grid, and what happens if the grid fails?',
    options: [
      'The inverter follows the grid only to keep its internal clock accurate for the export meter. If the grid fails the inverter carries on running, automatically becoming the new mains supply for the whole street so neighbours keep power — this islanding mode is the main selling point of grid-tied PV.',
      'The inverter follows the grid so it can draw a small amount of power to run its own electronics. If the grid fails the inverter keeps exporting at full output into the dead network, which is safe because the DNO de-energises that section before any repair work begins.',
      'It synchronises to the grid as its reference, and must disconnect (anti-islanding) when the grid fails so it cannot energise cables the DNO has isolated for repair — so a standard grid-tied system has no power in an outage.',
      'The inverter follows the grid purely to match the 50 Hz frequency for appliance compatibility. When the grid fails it switches to a stored-energy mode and runs the house from the panels alone, which is why a standard grid-tied PV system keeps the lights on through any power cut without a battery.',
    ],
    correctAnswer: 2,
    explanation:
      'A grid-tied (parallel-connected) inverter synchronises its output voltage and frequency to the grid, using the grid as its reference. When the grid fails the inverter must disconnect (anti-islanding protection) — it cannot legally export into a dead network because that would put live voltage onto cables the DNO has isolated for fault repair, endangering linespeople. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits). Anti-islanding is tested at commissioning and verified at periodic inspection. Without backup hardware the PV stops when the grid drops — the house goes dark even with sun on the roof. Customers wanting backup need a hybrid inverter with islanded operation or a separate ATS-and-battery arrangement.',
  },
  {
    id: 3,
    question: "What's the safe approach to the DC side of a PV array if you have to work near it?",
    options: [
      'Switch off the AC isolator at the consumer unit and the work is safe — once the inverter loses its grid connection it shuts down within milliseconds, and a shut-down inverter means the whole system including the DC array is dead. There is no need to operate the DC isolators separately.',
      'Wait until dusk or cover the panels with a tarpaulin and the DC side is dead, because the array only produces voltage in direct sunlight. Once shaded there is no output, so covering is an accepted substitute for isolating and proving dead with a meter.',
      'Pull the main switch on the property to kill all supplies, then work on the DC side immediately — removing the incoming supply de-energises everything downstream including the PV array, so no further isolation of the array conductors is required.',
      'Treat it as live until proven dead — operate and lock both DC isolators, allow the inverter dwell time, then prove dead with a voltage-rated meter; the array generates whenever light hits it.',
    ],
    correctAnswer: 3,
    explanation:
      "The DC side stays live until proven dead with a meter rated for the voltage. Both DC isolators — at the array end and the inverter end — must be operated and locked-off, then verified dead at both ends of the string. Even with the inverter AC-side isolated and switched off, the array generates as long as light hits the panels, and covering them reduces but does not eliminate the DC output. The manufacturer's instructions usually require a dwell time after isolation for internal capacitors to discharge. PV is an under-rated electrocution risk — 300-600 V DC is typical, DC arcs have no zero-crossing so they keep burning once started, and the source cannot be switched off, only isolated.",
  },
  {
    id: 4,
    question:
      'On a UK domestic PV install, which document covers installer competence and which document covers the electrical design?',
    options: [
      'MCS MIS 3002 covers installer competence and install quality; BS 7671 Section 712 covers the electrical design — both apply on every install.',
      "BS 7671 Section 712 covers installer competence and MCS MIS 3002 covers the electrical design. Section 712 audits the installer's skills and processes the commissioning certificate, while MIS 3002 specifies the wiring, protection and isolation detail the electrician follows on site.",
      'Building Regulations Part P covers installer competence and Part L covers the electrical design. Part P registration proves the installer is competent to do PV, and Part L sets the cable sizing, protection and isolation for a solar array. BS 7671 and MCS do not apply to domestic PV.',
      "The Smart Export Guarantee scheme rules cover installer competence and the DNO's G98/G99 recommendation covers the electrical design. SEG sets the training and accreditation an installer must hold, while G98/G99 specifies the wiring, protection and labelling. MCS and BS 7671 are voluntary on domestic work.",
    ],
    correctAnswer: 0,
    explanation:
      'MIS 3002 is the MCS installer-competence and installation-quality standard for solar PV — site survey, design, install quality, commissioning, handover and labelling. BS 7671 Section 712 is the electrical-design standard for the wiring, protection, isolation and labelling. Both apply on every install: MIS 3002 references BS 7671 explicitly for the electrical detail, and BS 7671 applies regardless of whether the install is MCS-certified. MCS certification is required for the customer to claim Smart Export Guarantee payments; BS 7671 compliance is required because it is the electrical regulation. Section 712 was extensively revised in the A4:2026 amendment.',
  },
  {
    id: 5,
    question: "What's the practical effect of orientation and pitch on UK PV yield?",
    options: [
      'Negligible. UK PV output depends almost entirely on the panel kWp rating; orientation and pitch make less than 5% difference because diffuse daylight reaches the panels from all directions. A north-facing roof yields essentially the same as a south-facing roof, so the array can go wherever is easiest.',
      'Significant — south at 30-40° pitch is the UK optimum; east/west posts about 80-85% and north 50-65%, all captured by the MCS Yield Calculator.',
      'Significant, but reversed — north-facing is the UK optimum because it avoids the panels overheating in the midday sun, which protects yield. South-facing roofs lose 20-30% to heat de-rating, so the MCS designer prefers north or east aspects wherever the roof allows.',
      'Significant only for pitch, not orientation. A steep 60-70° pitch is the UK optimum regardless of which way the roof faces, because it sheds rain and keeps the panels clean. East, west and south all yield the same provided the pitch is steep enough; flat roofs are unsuitable for PV.',
    ],
    correctAnswer: 1,
    explanation:
      "Orientation and pitch matter a lot. A south-facing roof at 30-40° pitch is the UK optimum, posting roughly 100% of reference yield because it catches the sun's mid-day arc through most of the year. East- or west-facing roofs typically produce 80-85% of optimum; north-facing 50-65% (still positive but with longer payback). Steeper pitches favour winter performance, shallower pitches summer; flat roofs use an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this and produces the kWh figure for the SAP and customer handover. Customers fixated on 'south or nothing' often miss good east-or-west opportunities.",
  },
  {
    id: 6,
    question:
      'Why are dual-MPPT inverters often preferred over single-MPPT for UK domestic installs?',
    options: [
      'They double the maximum export power of the inverter — a dual-MPPT unit pushes twice the kW of a single-MPPT unit of the same rating, so the customer gets more generation from the same panels. The second MPPT is a second power stage running in parallel for higher output.',
      'They provide a built-in battery backup channel — the second MPPT input is reserved for a DC battery so a dual-MPPT inverter can run the house off-grid during a power cut. A single-MPPT inverter has no spare input for storage, which is the main reason dual-MPPT is preferred.',
      'They let two independent strings — e.g. an east slope and a west slope — each run at their own MPP instead of being forced to a wasteful compromise.',
      'They are required to stay within the G98 fast-track limit — splitting the array across two MPPT inputs halves the export current per input so a larger array can still be notified under G98 rather than G99. Single-MPPT inverters always need a G99 application, which is why dual-MPPT is the domestic default.',
    ],
    correctAnswer: 2,
    explanation:
      'Dual-MPPT lets two independent strings run at their own maximum power point. A roof with both an east-facing and a west-facing slope gets one string per slope, each tracked independently — the east string MPPs in the morning, the west in the afternoon, and the inverter combines the AC outputs. Without dual-MPPT, mixing east and west panels in one string forces a compromise MPP that wastes 10-20% of the available energy. Dual-MPPT inverters are now standard on most domestic units; the cost premium is small and the design flexibility significant. The MPPT count on the inverter spec sheet tells you how many independent string groups the design can use.',
  },
  {
    id: 7,
    question:
      'What signage is required at the consumer unit / meter position on a PV-installed property?',
    options: [
      "No signage is required at the consumer unit or meter — the requirement only applies to the inverter itself, which carries the manufacturer's rating plate. A label at the CU would confuse the occupier, so BS 7671 keeps PV warning notices off the consumer unit and meter position.",
      "Only an energy-efficiency rating label showing the array's annual kWh output, for the customer and any future house buyer. The label is a performance notice rather than a safety notice; there is no requirement to warn maintainers about the generation source.",
      'A single label stating the date of the next EICR, the same as any other circuit. PV is treated like any final circuit for labelling, so a periodic-inspection sticker at the consumer unit is all that is required — no special dual-supply warning.',
      'Durable dual-supply warning notices identifying the parallel generation source, at the consumer unit, meter, main isolation, inverter and DC isolators, with the system details and DNO emergency contacts.',
    ],
    correctAnswer: 3,
    explanation:
      "PV needs durable warning signs telling anyone working on the installation that there is a parallel generation source on site — at the consumer unit/meter, the main isolation, the inverter and the DC isolators — plus the DNO's emergency contacts and the PV system identification (kWp rating, inverter make/model). The requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there is a generator on the property; the MCS Code specifies the durable label format. Signage saves lives.",
  },
  {
    id: 8,
    question: "What's the realistic carbon and financial payback for a UK domestic PV install?",
    options: [
      'Carbon payback is typically 1-3 years; financial payback is roughly 6-12 years for standalone PV (shorter with a battery), against a 25-year panel life.',
      "Carbon payback is typically 15-20 years because manufacturing a panel emits more CO₂ than it will ever save in the UK's cloudy climate. Financial payback is usually under 2 years, so PV is sold on money savings rather than its essentially marginal carbon case.",
      'Carbon and financial payback are effectively identical at around 25 years — the panel only breaks even at the very end of its warranted life. PV is therefore installed for environmental signalling rather than any real saving, since the system is worn out by the time it has paid back.',
      'Carbon payback is immediate because PV emits no CO₂ in manufacture, and financial payback is also immediate because the Smart Export Guarantee pays more than the import price. A standalone PV install therefore turns a profit from day one with no break-even period.',
    ],
    correctAnswer: 0,
    explanation:
      'Carbon payback for typical UK PV is 1-3 years — the time for operating CO₂ savings to offset the manufacturing CO₂ cost (from manufacturer LCA studies and academic reviews on the UK grid mix). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone install in 2026, often shorter with a battery (which lifts self-consumption from 25-40% to 70-90%). After payback the system runs for the rest of its 25-year warranted life essentially as free energy. Financial payback shortened with the 2022-2023 price spikes — at 30p/kWh import it shortens significantly. The MCS handover includes a Performance Estimate; reinforce those realistic numbers rather than over-promising.',
  },
];

const faqs = [
  {
    question:
      "What's the difference between mono-crystalline, polycrystalline and thin-film PV panels?",
    answer:
      'Different cell technologies. Mono-crystalline (cells cut from a single silicon crystal) has the highest efficiency (typically 20-22%) and is the dominant technology in 2026. Polycrystalline (multiple silicon crystals fused) was cheaper but lower efficiency (15-17%) — largely outcompeted now. Thin-film (amorphous silicon, CdTe, CIGS) has lower efficiency but performs better in low light and at higher temperatures — used in some commercial / utility-scale applications, rare on UK domestic. The MCS-certified designer chooses the panel; the apprentice should recognise the spec sheet differences.',
  },
  {
    question: 'Why does the inverter sometimes derate (output less than the DC available)?',
    answer:
      "Several reasons. Heat — inverters derate when their internal temperature rises above design limits (usually mid-summer afternoon on south-facing arrays). DC over-voltage — if the array Voc exceeds the inverter's max DC input. Grid frequency excursion — under G98/G99 the inverter must reduce output if grid frequency rises above set thresholds (a network-stability mechanism). Customer monitoring may show 'lost generation' on hot days; this is normal and unavoidable beyond a certain point. System design accounts for it via the inverter:array ratio (often 0.85-0.95 — i.e. inverter slightly smaller than array kWp).",
  },
  {
    question: "Should the customer expect their meter to 'spin backwards' with PV?",
    answer:
      'No. UK electronic meters do not spin backwards — they have separate import and export registers. The Smart Export Guarantee (SEG) requires a smart meter that can record export for the supplier to pay the export tariff. Some older import-only meters need replacing for the customer to claim SEG payments. The MCS installer arranges meter replacement as part of the install; the customer signs up for the SEG scheme separately with their chosen supplier.',
  },
  {
    question: 'Can I leave the inverter switched on while I work on the AC side?',
    answer:
      "No. Safe isolation is non-negotiable. The procedure is: AC isolator off and locked-off, DC isolator at the inverter off and locked-off, DC isolator at the array off and locked-off, verify dead with a tested meter at every accessible isolation point. The DC side remains live as long as light hits the panels — the AC isolation alone is not safe isolation of the DC side. The inverter manufacturer's instructions specify a dwell time after isolation for internal capacitors to discharge.",
  },
  {
    question: 'How long do PV panels actually last?',
    answer:
      "Manufacturer warranties are typically 25 years on output (90% of nameplate at year 10, 80% at year 25). Real-world degradation is usually 0.5% per year or less for quality panels. Inverters are typically warranted 5-12 years and may need replacement once during the panel lifetime. Battery warranties are typically 10 years or 6,000-10,000 cycles. The customer's expected life of the asset should reflect these realities — PV is a 25+ year decision; battery is a 10-15 year decision; inverter is a mid-life replacement.",
  },
  {
    question: "If the customer asks me about MCS, what's the honest answer for the apprentice?",
    answer:
      "MCS isn't a regulatory requirement to install — but it is a financial requirement for the customer to claim Smart Export Guarantee payments and was historically required for the Renewable Heat Incentive and Feed-in Tariff. Without MCS sign-off the customer can still have a working PV system; they just don't get paid for export. Most install firms are MCS-certified. The MCS installer is responsible for the design, the MCS handover pack and the SEG-compliant labelling. As an apprentice on the install you work to the certified installer's design; you don't sign off the MCS paperwork yourself unless you're personally certified.",
  },
];

const checks2 = [
  {
    id: 'l3-m2-s3-sub3-mvhr-airtight',
    question:
      "A customer in a 1960s detached house with single-glazed windows and uninsulated cavity walls asks about MVHR. What's the responsible answer?",
    options: [
      'Yes, go ahead. A leaky building is the ideal candidate for MVHR because the high air-change rate gives the heat exchanger plenty of warm extract air to recover from. The draughtier the house, the more heat the MVHR can claw back, so fitting it first is the cheapest way to cut the heating bill before any fabric work.',
      "Yes, but only fit a mechanical extract (MEV) version. In a leaky house there is no point recovering heat, but a continuous extract unit will still cut condensation. MEV and MVHR cost the same to run, so recommending MVHR here would simply waste the customer's money on an exchanger they cannot benefit from.",
      'Not yet — fabric first. MVHR only delivers a net energy benefit in airtight, well-insulated buildings; in a leaky 1960s house the uncontrolled air leakage outpaces what the exchanger can recover, so the fan power consumed outweighs the heat recovered.',
      'Yes, MVHR works in any house regardless of airtightness because the heat exchanger recovers 80-90% of the heat whatever the building fabric. The exchanger efficiency is a fixed property of the unit and does not depend on the envelope, so a 1960s detached benefits just as much as a new-build Passivhaus.',
    ],
    correctIndex: 2,
    explanation:
      "MVHR is a recovery technology — it can only recover what's flowing through it. In a leaky building, the bulk of the air change happens through cracks in the envelope, not through the MVHR ducts, so most ventilation heat loss escapes the recovery exchanger entirely. The continuous fan power (typically 50-150 W) then exceeds the heat recovered. SAP and SBEM credit MVHR with significant savings only at low air permeability (roughly below 3 m³/h/m² @ 50 Pa). Fabric upgrades — insulation, glazing, draught-proofing — must come first; then MVHR earns its keep. Same logic as fabric first, heat pump second.",
  },
  {
    id: 'l3-m2-s3-sub3-micro-chp-decline',
    question: 'Why has micro-CHP largely disappeared from new UK domestic installs?',
    options: [
      'Because the technology was banned outright under the F-Gas Regulations, which prohibited the engine refrigerants micro-CHP units relied on. Once the gases were phased out the units could no longer be sold, so the market disappeared overnight regardless of the economics.',
      'The economic and carbon case has eroded. Micro-CHP burns gas to generate electricity locally, which made sense when the grid was carbon-intensive; as the grid has decarbonised, heat pumps now deliver lower running carbon per kWh of heat.',
      'Because the DNO will no longer connect micro-CHP units to the grid — the G98 and G99 recommendations were rewritten to exclude any gas-fired generator. Without a grid connection the units cannot export, so installers stopped fitting them even though the heating side still works.',
      'Because micro-CHP units were found to produce dangerous levels of carbon monoxide indoors and were withdrawn on safety grounds. A product recall removed them from sale, which is why no new domestic units are installed and existing ones are being decommissioned.',
    ],
    correctIndex: 1,
    explanation:
      'Micro-CHP was a sensible technology for its time but the time has passed in the UK domestic market. It made sense when grid electricity sat near 500 gCO₂/kWh and gas was cheap; as the grid has fallen to around 200 gCO₂/kWh the relative carbon advantage of generating locally from gas has shrunk, and the Future Homes Standard rules out fossil-fuel heat in new-build from 2025 — taking the new-install market away entirely. You may still meet existing units (typically Stirling-engine or fuel-cell types from 2010-2015 era installs) and engine-based CHP at 5-50 kWe scale in commercial / institutional sites where heat demand is constant and high. As an apprentice you should recognise CHP as a category but not over-pitch its current relevance for new domestic work.',
  },
  {
    id: 'l3-m2-s3-sub3-domestic-wind',
    question:
      "A customer wants to fit a 5 kW vertical-axis wind turbine on a pole in their suburban back garden. What's the honest assessment?",
    options: [
      'Good choice. Vertical-axis turbines are designed for exactly this — they capture wind from any direction and are unaffected by the turbulence around buildings, which is why they suit built-up areas. A 5 kW unit on a pole will deliver close to its rated output in a suburban garden because it does not need clean laminar wind.',
      "It will outperform the manufacturer's figure. Manufacturer ratings are measured in a wind tunnel at a single fixed speed, whereas a real garden sees gusts that push the turbine above its rating much of the time. The gusty, turbulent air in a suburban garden is therefore an advantage, not a drawback.",
      "The main issue is purely cosmetic and planning-related. The turbine will generate its rated 5 kW reliably; the only thing to manage is the neighbours' objection to the look of it. Once planning permission is granted the yield is assured, so the honest advice is simply to handle the planning application carefully.",
      "It will almost certainly disappoint. Domestic turbines need clean laminar wind, but a suburban back garden sits in turbulent air shed by surrounding houses; the turbine spends most of its time below cut-in speed and real-world yield is a fraction of the manufacturer's claim.",
    ],
    correctIndex: 3,
    explanation:
      "Several high-profile small-wind installations from the 2008-2012 era posted yields well below the manufacturer's claim. The market for sub-10 kW domestic turbines has contracted accordingly. Where wind genuinely makes sense — open rural sites with tall masts and clean wind — the answer is professional siting plus a properly engineered installation, not an off-the-shelf back-garden unit. As an apprentice your role is to recognise the unrealistic site request and refer the customer to a wind specialist for an honest site assessment.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: "What's the operating principle of MVHR (mechanical ventilation with heat recovery)?",
    options: [
      "A heating element in the supply duct warms the incoming fresh air to room temperature before it reaches the rooms, while a separate fan extracts stale air. The 'heat recovery' comes from the element being highly efficient; there is no exchange between the two air streams, just direct electric heating of the supply.",
      'Warm stale extract air and cold fresh supply air pass through opposite sides of a counter-flow heat exchanger, transferring most of the heat from one stream to the other without the two ever mixing. Net effect: controlled ventilation with most of the heat loss recovered.',
      'A single fan recirculates the same indoor air through a filter and back into the rooms, recovering heat by never letting the warm air leave the building. No fresh air is brought in; the system simply keeps the existing warm air moving so none of its heat escapes, which is where the recovery comes from.',
      'The unit mixes the warm stale extract air with the cold fresh supply air in a plenum chamber so the blended air comes out at a comfortable temperature. The two streams deliberately combine, which is how the heat is shared, and the mixed air is then distributed to all rooms.',
    ],
    correctAnswer: 1,
    explanation:
      'MVHR is the recovery principle in its clearest form. Around 80-90% of the heat in the extract air crosses to the supply air through the exchanger plates, and the fan power consumed (typically 50-150 W continuous) is small compared to the heat recovered in airtight buildings. The heat exchanger is a passive component (no moving parts in the heat-transfer path); the fans drive the supply and extract. Counter-flow exchangers achieve the highest efficiency by maintaining a temperature differential along the entire exchanger length. Modern MVHR units include summer bypass dampers and frost protection (the supply pre-heater or recirculation mode prevents the exchanger freezing in cold weather).',
  },
  {
    id: 2,
    question: "What's the typical electrical interface for a domestic MVHR unit?",
    options: [
      "A dedicated 32 A radial on a Type C MCB in 6 mm² cable, the same as a heat pump, because the unit's two fans plus the supply pre-heater draw a sustained high current. A local outdoor rotary isolator and Type B RCD are required, and the bulk of the work is sizing the heavy supply cable.",
      'A three-phase supply because MVHR fans are three-phase motors, fed on a 16 A TP&N breaker. The boost overrides are wired into the three-phase contactor, and an emergency-stop is mandatory because of the moving fan blades. Single-phase MVHR units are not available for domestic use.',
      'Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB in 1.5 mm² T&E to the unit location, with a local DP isolator. The unit is a modest load (typically 50-300 W); the bulk of the electrical work is the boost wiring network from kitchens and bathrooms, not the unit supply.',
      'A fused connection unit spurred off the bathroom lighting circuit, with no separate supply, because the MVHR unit is classed as a bathroom extractor fan. It must be SELV-fed at 12 V through a transformer in the loft, and no boost wiring is needed because the unit runs at a single fixed speed.',
    ],
    correctAnswer: 2,
    explanation:
      "MVHR unit supply is straightforward. The complexity is in the room-by-room boost network and any commissioning sensors. The ducting and air-flow commissioning is the ventilation specialist's domain (Part F of the Building Regs); you wire the unit and the boost network. Cat5e/Cat6 increasingly common where the MVHR unit integrates with smart home / Home Energy Management systems.",
  },
  {
    id: 3,
    question: 'Where does micro-CHP still make commercial sense?',
    options: [
      "Small flats and studio apartments with low, intermittent heat demand — the compact size of a micro-CHP unit suits a small dwelling, and the brief bursts of heating match the engine's short run cycles. The unit exports its surplus electricity whenever the flat is empty, making the economics work best at the smallest scale.",
      'Holiday homes and second properties that stand empty for long periods — the CHP can run to keep the building frost-free and export electricity while no one is there. The long idle stretches let the unit bank export earnings, which is why low-occupancy properties are the strongest case for CHP.',
      'New-build housing estates built to the Future Homes Standard, where a micro-CHP in each home replaces the heat pump. The constant low heat demand of a well-insulated new home matches the CHP perfectly, which is why CHP is becoming the default new-build heating technology.',
      'Larger commercial / institutional sites where heat demand is constant and high — hospitals, hotels, leisure centres, large care homes. Engine-based CHP at 5-50 kWe generates electricity locally (offsetting expensive import) while the waste heat displaces boiler load.',
    ],
    correctAnswer: 3,
    explanation:
      "Commercial CHP is a different conversation from domestic micro-CHP. The economics work because the site has a constant high-load heat demand (so the CHP runs at high capacity factor) and the electricity is consumed on-site (so the financial value of the generated electricity is the import-displacement rate, not the export rate). On a typical domestic install with intermittent low heat demand, those conditions don't hold and the CHP under-runs.",
  },
  {
    id: 4,
    question: "What's the regulatory framework for biomass heating in UK domestic properties?",
    options: [
      'Multiple frameworks stack up: Building Regs Part J (combustion, flues, ventilation), the Clean Air Act (smoke control areas / Defra-exempt appliances), the Ecodesign emissions standards, and MCS MIS 3004 / 3006 for installer competence on boilers and stoves.',
      'Just BS 7671, the same as any electrical circuit. Because a biomass boiler has an electric supply for its controls and pump, it is treated purely as a fixed appliance under the Wiring Regulations, and no combustion, flue or air-quality regulation applies to a domestic installation.',
      'The F-Gas Regulations only, because biomass boilers contain a sealed refrigerant loop that drives the heat exchanger. Certification to handle that gas is the sole regulatory requirement; flues and fuel storage are unregulated for domestic units below 45 kW.',
      'Part P of the Building Regulations only. As the boiler is fitted in a dwelling, the installer simply notifies Local Authority Building Control of the electrical connection and that single notification covers the whole installation including the flue and the fuel store.',
    ],
    correctAnswer: 0,
    explanation:
      'Biomass had a boost from the Renewable Heat Incentive (RHI) which closed in 2022. New domestic biomass installs are now relatively rare — heat pumps have taken over the off-gas-grid retrofit market and air-quality regulation in urban areas has further squeezed it. Existing installs you may meet on commissioning or maintenance work; new installs are increasingly niche.',
  },
  {
    id: 5,
    question: "What's the difference between a domestic biomass boiler and a biomass stove?",
    options: [
      'A boiler burns wood pellets and a stove burns logs, but otherwise they are the same appliance — both heat a single room and both feed the wet system. The only practical difference is the fuel; the output, location and controls are identical, which is why one MCS standard covers both.',
      'A boiler drives a wet heating system — radiators, underfloor and a cylinder — at 10-50 kW with automatic fuel feed and ash handling. A stove is a single-room heater (5-15 kW typical) that radiates directly into the room, with manual loading and no automatic ash removal.',
      "A stove is the larger plant-room unit that drives the whole house's radiators, while a boiler is the small room heater that warms a single room. The stove is auto-fed from a hopper and the boiler is hand-loaded, so the naming is the reverse of what most people assume.",
      'A boiler is electrically heated and a stove is wood-fired, but both deliver heat to the wet system. The boiler uses an immersion element rather than combustion, which is why it needs no flue, whereas the stove burns fuel and needs a chimney; they share the same MCS standard and output range.',
    ],
    correctAnswer: 1,
    explanation:
      'The boiler-vs-stove split matters because the install scope is so different. A biomass boiler is a major plant-room install with civils, fuel storage, flue, controls integration. A stove is a single-room install — chimney, hearth, surround, single-room thermostat. The MCS standards (MIS 3004 boilers, MIS 3006 stoves) reflect that.',
  },
  {
    id: 6,
    question:
      'What signage is required at the point of supply for a parallel-connected micro-wind installation?',
    options: [
      'None — a micro-wind turbine needs no special signage because it stops spinning when the grid fails, so there is no parallel-supply hazard to warn anyone about. The turbine is treated like any ordinary appliance and carries only its manufacturer rating plate.',
      'Only a noise-rating label at the base of the mast, for the benefit of neighbours and the planning authority. The electrical interface needs no warning notices because wind connections are exempt from the dual-supply labelling that applies to PV.',
      'Same as PV — durable warning signs at the consumer unit, the main isolation, the inverter and any DC isolators, notifying anyone working on site that a parallel generation source is present. Wind connections fall under the same ENA G98 / G99 framework as PV.',
      "Only a label showing the turbine's annual kWh output, mounted at the meter. This is a performance notice for the customer rather than a safety warning, because the inverter's anti-islanding removes any risk to a future maintainer and so no dual-supply sign is needed.",
    ],
    correctAnswer: 2,
    explanation:
      'All parallel-connected generators in the UK now fall under G98 / G99 — PV, wind, micro-hydro, micro-CHP, battery storage. The signage and notification requirements are technology-agnostic. As an apprentice you should recognise that a wind install is fundamentally the same regulatory framework as a PV install on the electrical interface side, even though the physical install is very different.',
  },
  {
    id: 7,
    question:
      "A customer in a rural Scottish glen has a year-round stream with 30 m of head and 100 l/s flow. What's the realistic micro-hydro framing?",
    options: [
      'This is a weak site because 100 l/s is far too little flow to turn a turbine — micro-hydro needs at least 1,000 l/s to be worthwhile. The 30 m head counts for nothing without that flow, so the honest advice is that the stream cannot generate any useful power and PV would be the better option.',
      'The output depends only on the flow, not the head, so a 100 l/s stream gives roughly 100 W regardless of the drop. The 30 m head makes no difference to the power available, which is why even a fast stream rarely justifies a hydro install on a domestic property.',
      'The site will produce so much power that the customer can run the whole glen off it — with 30 m head and 100 l/s the output is around 300 kW, enough for a small village. The only barrier is finding somewhere to use the surplus, so a community scheme is the obvious recommendation.',
      'This is a strong micro-hydro site. With 30 m head and 100 l/s flow the theoretical hydraulic power is around 29 kW, giving roughly 20-25 kW continuous after turbine and generator losses — significant baseload renewable energy at a high capacity factor.',
    ],
    correctAnswer: 3,
    explanation:
      'Micro-hydro is genuinely site-specific. The product of head × flow gives the available hydraulic power: ρ × g × h × Q = 1000 × 9.81 × 30 × 0.1 ≈ 29 kW, and after typical turbine/generator efficiency of 70-85% the realistic continuous output is 20-25 kW. Where head and flow exist, hydro delivers consistent output with low intermittency (much higher capacity factor than wind or PV). Practical issues include SEPA abstraction licensing, fish-friendly intake design, civils for weir / intake / penstock / power-house, a G99 grid connection at this size, and the buried cable run to the property. The capital cost is the headline barrier; the operational cost is low and the equipment life is long. MCS MIS 3008 covers small-hydro installation standards.',
  },
  {
    id: 8,
    question: 'Why is MVHR almost a default on Future Homes Standard new-build?',
    options: [
      'Because Future Homes Standard demands very low air permeability, and at those airtightness levels the building cannot rely on infiltration for air change — it needs deliberate mechanical ventilation. MVHR provides that while recovering most of the heat, which MEV (extract only) cannot.',
      'Because Future Homes Standard bans opening windows in new dwellings on security grounds, so a mechanical ventilation system becomes the only legal way to provide fresh air. MVHR is chosen over simpler systems purely because the windows are sealed shut, not for any energy reason.',
      'Because MVHR is the cheapest ventilation option available, so house builders fit it to keep costs down. There is no regulatory driver — builders simply choose the lowest-cost unit, and MVHR happens to be cheaper than a basic extractor fan.',
      "Because Future Homes Standard requires every new home to generate its own heat, and MVHR is classed as a heat source. The unit's fans warm the supply air enough to heat the house on their own, which is why it counts toward the heating requirement and is fitted as standard.",
    ],
    correctAnswer: 0,
    explanation:
      "Future Homes Standard, expected to take fossil-fuel boilers off new-build from 2025, is the regulatory driver pushing all-electric ventilation and heating in new homes. It requires very low fabric U-values, very low air permeability and Part F controlled ventilation; MVHR recovers 80-90% of the heat and earns SAP credit that contributes materially to the Part L target rate, whereas fitting MEV only (no recovery) loses that benefit and harms the SAP score. As the electrician on a Future Homes Standard new-build install you'll see MVHR as standard kit alongside heat pump and PV.",
  },
];

const faqs2 = [
  {
    question: "What's a Passive House and how does it relate to MVHR?",
    answer:
      "Passive House (Passivhaus) is a building standard that targets very low space-heating demand (typically <15 kWh/m²/year) through extreme insulation, air-tightness (≤0.6 air changes per hour @ 50 Pa) and triple glazing. At Passivhaus airtightness levels the building must have MVHR — there's no other way to provide adequate ventilation. Passivhaus pre-dates Future Homes Standard but the underlying logic is the same. Most new UK Passivhaus projects fit MVHR + heat pump + PV as standard.",
  },
  {
    question: 'Are wood-burning stoves still legal in UK urban areas?',
    answer:
      'Subject to restrictions. The Clean Air Act and successive Defra regulations restrict what can be burned in smoke-control areas and require Defra-exempt appliances (designed to meet emission limits when burning approved fuels). The Ecodesign Directive sets emission limits for new appliances. Burning wet/unseasoned wood, treated timber or general waste in a stove is illegal in smoke-control areas regardless of appliance. Customers with stoves in urban areas should have a Defra-exempt appliance and use only approved fuels (kiln-dried logs, manufactured pellets).',
  },
  {
    question: 'Can MVHR be retrofitted into an existing house?',
    answer:
      "Sometimes. The barriers are airtightness (the host building must be tight enough that MVHR delivers net benefit) and ductwork space (running supply and extract ducts to every habitable room is invasive in a finished house). A whole-house refurbishment with insulation upgrade, replacement glazing and air-sealing can support MVHR retrofit; a casual single-room intervention typically can't. Some manufacturers offer single-room heat-recovery units (room-by-room MVHR) that side-step the duct problem at lower per-room recovery efficiency.",
  },
  {
    question: "What's the operating life of a domestic biomass boiler?",
    answer:
      'Typically 15-25 years for a quality wood-pellet boiler with proper maintenance. Major service every 1-2 years (auger, igniter, ash handling, flue clean). Boilers in hard service or burning poor fuel quality have shorter lives. Pellet quality matters — high-ash or wet pellets foul the burner and shorten component life. Customers committing to biomass need to commit to the maintenance schedule.',
  },
  {
    question: "What's the carbon footprint of biomass compared to a heat pump?",
    answer:
      "Debated within the carbon accounting community. Biomass is conventionally counted as 'low-carbon' because the CO₂ released during combustion is offset by what the trees absorbed during growth — but the timing mismatch (release now, regrowth over 30-80 years) and the displacement of mature woodland for plantation use complicate the picture. A heat pump driven by an increasingly clean grid (~200 gCO₂/kWh now, falling) delivers heat at ~57 gCO₂/kWh of useful heat with SCOP 3.5. Biomass conventionally accounts in the 20-30 gCO₂/kWh range using the IPCC offset assumption, but the lifecycle picture is contested. For most UK domestic situations the heat pump is the cleaner choice on most accounting bases.",
  },
  {
    question: 'If domestic wind is a poor bet, what about wind on a farm site?',
    answer:
      "Different conversation. A farm with a clear wind-exposed field, room for a tall mast (typically 15-30 m hub height for a sub-100 kW turbine), and a willing planning authority can get a viable installation. The capital cost is significant; the planning timeline is long; the noise impact assessment matters. Where the site genuinely works the financial and carbon case can be strong. Always engage a wind specialist for the site assessment — generic 'a turbine here would work' opinions are not a substitute for proper wind-resource modelling.",
  },
];

export default function Lesson319E_1_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        DC array, inverter, AC interface, BS 7671 Section 712 (extensively revised in A4:2026),
        MCS MIS 3002, ENA G98/G99 grid connection. Working knowledge to be a competent
        installer-side hand on a PV install — not the lead designer.
      </p>

      <TLDR
        points={[
          'PV chain — sunlight → DC string → inverter → AC isolator → meter → consumer unit. Every isolation point needs labelling, every conductor needs sizing.',
          'DC strings sit at 300-600 V even with the inverter off and the AC isolated. DC isolation is a separate problem from AC isolation; both must be locked-off before any work on the string.',
          'G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that. Both are downstream of the ENA Engineering Recommendations.',
          'MCS MIS 3002 covers installer competence; BS 7671 Section 712 covers electrical design. Both apply on every install. MCS is the gateway to Smart Export Guarantee payments.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the equipment chain on a typical UK domestic PV install — DC array, string isolator, inverter, AC isolator, generation meter, consumer unit.',
          'Identify the DC voltage hazard on a PV string and apply a safe-isolation procedure that addresses both DC and AC sides.',
          'Distinguish ENA G98 fast-track notification from G99 pre-application based on inverter rating per phase.',
          'Recognise BS 7671 Section 712 (extensively revised in the A4:2026 amendment) as the electrical regulatory home for PV.',
          'Recognise MCS MIS 3002 as the installer-competence and installation-quality standard for PV; understand its role in Smart Export Guarantee eligibility.',
          'Identify the role of dual-MPPT inverter architecture and panel-level optimisation in addressing real-world UK roof shading and orientation constraints.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The equipment chain</ContentEyebrow>

      <ConceptBlock
        title="Sunlight in, AC out — the chain of equipment"
        plainEnglish="A typical UK domestic PV install runs from sunlight on the panels through a DC string to the inverter, then from the inverter as AC through an isolator and a meter into the consumer unit. Battery storage adds a parallel DC battery and BMS (hybrid topology) or a separate AC-coupled battery inverter."
        onSite="Each link in the chain has its own isolation point and its own labelling requirement. The DC isolation problem is distinct from the AC isolation problem — you have to address both before working on any part of the system. The MCS-certified designer specifies the equipment; you fit, terminate and verify."
      >
        <p>The chain in detail:</p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Panels</strong> — silicon cells in a sealed module. Wired in series inside the
            panel; multiple panels wired in series via MC4 connectors to form a DC string.
          </li>
          <li>
            <strong>DC string isolator at the array</strong> — typically rooftop or immediately
            accessible, rated for the string's worst-case open-circuit voltage. Allows the array
            to be isolated from the inverter for maintenance.
          </li>
          <li>
            <strong>DC string conductors</strong> — UV-stable solar cable (typically 4 mm² or 6
            mm² double-insulated DC cable), routed from array to inverter.
          </li>
          <li>
            <strong>Inverter</strong> — converts DC to grid-synchronised AC. Modern units are
            dual-MPPT (two independent string inputs), 3-10 kW for domestic. Located indoors in a
            ventilated location, typically a utility room, garage or loft.
          </li>
          <li>
            <strong>AC isolator at the inverter</strong> — local, accessible, allows the inverter
            to be isolated from the AC side without opening the consumer unit.
          </li>
          <li>
            <strong>Generation meter (MID-compliant)</strong> — Smart Export Guarantee requires
            accurate export measurement. Many installs use a smart meter for both import and
            export.
          </li>
          <li>
            <strong>Connection to the consumer unit</strong> — dedicated MCB, RCD per BS 7671,
            durable warning signage at the CU and meter position.
          </li>
        </ol>
      </ConceptBlock>

      <VideoCard
        {...videos.inverter}
        topic="Solar PV inverter — DC to grid-quality AC"
        caption="The inverter is the heart of the PV install — taking variable DC from the array and synthesising a 230 V 50 Hz sinusoid that the consumer unit can accept. Understanding the inverter is the foundation for everything else on the AC side."
      />

      <SectionRule />

      <ContentEyebrow>The DC side — voltages and isolation</ContentEyebrow>

      <ConceptBlock
        title="DC isolation is a separate problem from AC isolation"
        plainEnglish="On a typical 3-6 kW domestic PV install the DC string voltage sits at 300-600 V whenever the panels see daylight. That voltage is independent of the AC side — switching off the inverter, isolating the AC at the consumer unit, even pulling the main switch on the property does nothing to the DC voltage on the array conductors. You isolate the DC by operating the DC string isolator and locking it off, then verifying dead with a tested meter at each end of the string."
        onSite="DC arc behaviour is different from AC. Without the AC zero-crossing to extinguish an arc, a DC arc once started will continue burning until the conductors physically separate. That’s why DC isolators are constructed differently from AC isolators (multiple breaks, magnetic blow-out, designed for the DC interrupting duty). Never use an AC-rated isolator on a DC circuit."
      >
        <p>Safe isolation procedure for PV:</p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>AC isolator at the consumer unit off and locked-off.</li>
          <li>AC isolator at the inverter off and locked-off.</li>
          <li>DC isolator at the inverter off and locked-off.</li>
          <li>DC isolator at the array (rooftop or accessible location) off and locked-off.</li>
          <li>
            Wait for the inverter dwell time per manufacturer’s instructions (allows internal DC
            capacitors to discharge — typically 5-15 minutes).
          </li>
          <li>
            Verify dead with a tested meter at the DC inverter terminals and the AC inverter
            terminals. Test the meter on a known live source before and after.
          </li>
          <li>Apply lock-out tag and proceed.</li>
        </ol>
        <p>
          Covering the panels with opaque material reduces but does not eliminate the DC output.
          Diffuse daylight at low light levels still produces a non-trivial Voc. Always treat the
          DC side as live until proven dead with a meter.
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

      <ContentEyebrow>The grid-connection regime</ContentEyebrow>

      <ConceptBlock
        title="ENA G98 fast-track vs G99 pre-application"
        plainEnglish="Every parallel-connected generator in the UK — PV, battery, micro-CHP, micro-wind — connects under one of two ENA Engineering Recommendations. G98 is a fast-track notification process for inverters at or below 16 A per phase per inverter (3.68 kW single-phase). G99 is a pre-application process for anything bigger; the DNO will assess local network capacity and either approve, request modifications, or in rare cases require network reinforcement before connection."
        onSite="The MCS-certified installer submits the G98 / G99 paperwork — not the apprentice. But you should know which scheme applies and what the timeline is. G98 is essentially a ‘fit and tell' (notify within 28 days of commissioning) and is the default for most domestic PV. G99 can take weeks to months and the customer’s commission date depends on DNO approval."
      >
        <p>The 16 A per phase boundary in numbers:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single-phase G98 limit</strong> — 16 A × 230 V = 3.68 kW per inverter. Most 4
            kW inverters quote 3.68 kW max output to stay G98-eligible.
          </li>
          <li>
            <strong>Three-phase G98 limit</strong> — 16 A × 230 V × 3 = 11.04 kW total. Some
            installers split a larger system into multiple G98 inverters to avoid G99.
          </li>
          <li>
            <strong>G99 above 16 A</strong> — pre-application required, DNO assesses network
            capacity, may require connection at higher voltage if local constraints apply.
          </li>
          <li>
            <strong>Storage included</strong> — battery storage with grid-export capability falls
            under the same G98/G99 rules. The total combined export capacity matters, not just the
            PV inverter rating.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="ENA Engineering Recommendation G98 (Issue 1, Amendment 7) / G99 — paraphrased"
        clause={
          <>
            <p className="mb-2">
              <strong>G98</strong> — applies to fully-type-tested generators with output up to and
              including 16 A per phase per inverter. Connection notification can be made after
              commissioning (within 28 days). The DNO does not pre-approve the connection.
            </p>
            <p>
              <strong>G99</strong> — applies to generators above 16 A per phase, and to all
              generators (regardless of size) at sites where pre-existing G98 or G99 generators
              already exist. Pre-application required; the DNO assesses local network capacity and
              confirms or qualifies the connection.
            </p>
          </>
        }
        meaning={
          <>
            The G98 / G99 split is the operational reality of grid-connecting any parallel
            generator in the UK. Most domestic PV (≤4 kW per inverter, single- phase) sits
            comfortably in G98. As soon as the inverter exceeds 3.68 kW, or the system has a
            battery with export capability that combines with PV to exceed 16 A per phase, G99
            kicks in. The MCS installer manages the application; the apprentice needs to recognise
            which regime applies and the associated timeline implications for the customer.
          </>
        }
        cite="Source: ENA Engineering Recommendation G98 / G99 — paraphrased from the published recommendations available via the Energy Networks Association."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Real-world UK roof constraints</ContentEyebrow>

      <ConceptBlock
        title="Orientation, pitch, shading — what eats yield in practice"
        plainEnglish="Manufacturer kWp ratings assume Standard Test Conditions; UK roofs almost never see those conditions. The two big real-world constraints on yield are roof orientation/pitch and partial shading. Both are captured in the MCS Yield Calculator that the certified installer runs at design stage."
        onSite="A south-facing roof at 30-40° pitch is the UK optimum. East / west typically posts 80-85% of optimum; north 50-65% (still positive but slow payback). Partial shading from chimneys, dormers, neighbouring trees, satellite dishes and adjacent buildings can knock 20-50% off string output if not addressed by panel-level optimisation."
      >
        <p>How the design choice responds:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Plain string</strong> — cheapest, simplest. Suits unshaded uniform roofs.
            Shading on one panel impacts the entire string.
          </li>
          <li>
            <strong>Bypass diodes within each panel</strong> — partially mitigates shading by
            allowing current to bypass affected substrings. Standard on all modern panels.
          </li>
          <li>
            <strong>Power optimisers (Tigo, SolarEdge)</strong> — DC-DC converter behind each
            panel. Each panel runs at its own MPP. String inverter sees an aggregated MPP. Costs
            more, recovers shading losses well.
          </li>
          <li>
            <strong>Micro-inverters (Enphase)</strong> — full DC-AC conversion behind each panel.
            AC string back to the consumer unit. No high-voltage DC anywhere except inside the
            panel. Highest cost, simplest topology, best per-panel monitoring.
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

      <SectionRule />

      <ContentEyebrow>BS 7671 Section 712 — the electrical regulatory home</ContentEyebrow>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 712 Solar photovoltaic (PV) power supply systems"
        clause={
          <>
            Section 712 contains particular requirements for PV installations. The requirements
            apply to PV installations not connected to public distribution, in parallel with
            public distribution, and as an alternative to public distribution. The technical
            content was extensively revised and expanded in the A4:2026 amendment.
          </>
        }
        meaning={
          <>
            Section 712 sits in Part 7 of BS 7671 (Special Installations or Locations) and applies
            in addition to the general requirements of Parts 1-6. Topics covered include array
            voltage and isolation, DC and AC overcurrent protection, additional protection by RCD
            where required, equipotential bonding of array frames, signage and labelling,
            anti-islanding requirements at the AC interface, and the inspection-and-test
            requirements specific to PV. The A4: 2026 revision strengthened several areas —
            designers and installers must apply the current text. Detailed application is taught
            in MCS qual 2399.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from the published amendment text)."
      />

      <SectionRule />

      <ContentEyebrow>Panel technology — mono PERC, half-cut, bifacial</ContentEyebrow>

      <ConceptBlock
        title="Modern UK PV panels are almost universally mono PERC half-cut, often bifacial"
        plainEnglish="The panels you will see on a 2024-2026 UK domestic install are almost all monocrystalline silicon with PERC (Passivated Emitter Rear Cell) architecture, half-cut cells (each cell physically split in half to halve the current per cell and reduce I2R losses), and increasingly bifacial construction (the back of the panel also generates from reflected light). Typical 400-450 W per panel at module level; modules typically 1.7 m by 1.1 m."
        onSite="The L3 apprentice does not need to choose the panel — that is the MCS-certified designer’s scope. But you should recognise the kit you are mounting and the module data sheet you are reading. Module open-circuit voltage (Voc), short-circuit current (Isc), maximum power point voltage (Vmpp) and current (Impp), temperature coefficients and module dimensions all matter for the system designer; the apprentice ensures the modules fitted on site match those specified in the design (substituting a different module changes the string voltage and current, which can break inverter compatibility and string fusing assumptions)."
      >
        <p>The panel landscape in 2026:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Monocrystalline PERC</strong> — the dominant cell architecture. Higher
            efficiency (20-22%) than older polycrystalline (15-17%). Black appearance.
          </li>
          <li>
            <strong>Half-cut cells</strong> — each cell physically split in half, wired to halve
            current per cell. Lower I2R losses, better partial-shade tolerance, slightly higher
            module efficiency.
          </li>
          <li>
            <strong>Bifacial</strong> — generates from light hitting the back of the panel as well
            as the front. Most useful on ground-mount and flat-roof installs over reflective
            surfaces; modest gain on pitched-roof domestic.
          </li>
          <li>
            <strong>TOPCon and HJT (next generation)</strong> — Tunnel Oxide Passivated Contact
            and Heterojunction Technology cells. Slightly higher efficiency (22-24%) and better
            temperature performance than PERC. Mainstream by late 2020s.
          </li>
          <li>
            <strong>Module power rating trajectory</strong> — typical UK domestic modules have
            moved from 250 W (early 2010s) to 400-450 W (2024+) to 500 W+ (commercial / coming
            domestic). System kWp from a typical domestic roof has roughly doubled in a decade.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Mounting and structural considerations</ContentEyebrow>

      <ConceptBlock
        title="The roof has to take the load — structural sign-off is a real step"
        plainEnglish="A typical 4-6 kWp PV array adds 250-400 kg of distributed load to the roof, plus wind and snow loads transferred through the mounting points into the rafters. Most UK domestic roofs are designed to take this without issue, but very old roofs, lightweight constructions, or roofs already loaded with insulation upgrades may need structural assessment. The MCS-certified installer is responsible for confirming the structural adequacy; the apprentice executes the mounting per the design."
        onSite="The mounting system on a typical pitched UK domestic install: stainless-steel roof hooks fixed into the rafters, an aluminium rail system spanning the hooks, panels clamped to the rails. On flat roofs, ballasted frames or penetrating fixings spread the load. On in-roof installs (panels replacing tiles, common on new-build), the mounting becomes the weatherproofing too. The L3 apprentice contribution: cable management at the array (UV-stable cable, MC4 connectors, weatherproof routing), mounting alignment for the roof edge clearance regulation (typically 300-500 mm clear of every roof edge for fire-fighter access), and verification that the mounting system used matches the structural sign-off."
      >
        <p>Structural and mounting considerations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Roof load assessment</strong> — older properties (pre-1960s) and roofs already
            burdened with insulation upgrades may need structural sign-off. The MCS designer
            arranges.
          </li>
          <li>
            <strong>Roof-edge clearance</strong> — typically 300-500 mm clear of every roof edge
            for fire-fighter access. Local fire-service guidance may dictate.
          </li>
          <li>
            <strong>Ridge tile clearance</strong> — minimum clearance from the ridge per the
            mounting system manufacturer.
          </li>
          <li>
            <strong>Weatherproofing at penetrations</strong> — every roof hook is a potential leak
            point. The mounting system manufacturer&apos;s instructions specify the flashing or
            sealant arrangement.
          </li>
          <li>
            <strong>Listed buildings and conservation areas</strong> — planning permission may
            apply. Slate-roof properties in conservation areas may require lower-profile or
            in-roof systems for visual reasons.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Inverter sizing and clipping</ContentEyebrow>

      <ConceptBlock
        title="DC-to-AC ratio and inverter clipping — why a 5 kWp array often gets a 4 kW inverter"
        plainEnglish="A PV array’s nameplate kWp is its output at Standard Test Conditions (1000 W/m2, 25 degC, AM 1.5). UK roofs almost never see those conditions — typical real-world peak output on a sunny day is 70-85% of nameplate. So pairing a 5 kWp array with a 4 kW inverter (a DC-to-AC ratio of around 1.25) actually wastes very little energy, while keeping the install in the G98 (≤16 A per phase) connect-and-notify band. The few hours per year when the array could exceed 4 kW are clipped by the inverter; the lost energy is small compared to the regulatory and cost savings of staying within G98."
        onSite="The MCS-certified designer specifies the inverter rating. The apprentice fits per the design. Recognise that ’the inverter is smaller than the array’ is normal and intentional, not a fault. The inverter manufacturer publishes a maximum DC input power rating that should not be exceeded; the system designer sizes the array to stay within that limit. Clipping behaviour is logged by the inverter portal — the customer may see ’clipping events’ reported, which are not faults but design-intent moments where the array briefly exceeded the inverter’s AC output rating."
      >
        <p>DC-to-AC ratio considerations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Typical UK domestic ratio</strong> — 1.1 to 1.3 (kWp DC array divided by kW AC
            inverter). Higher ratios are common where staying in G98 matters.
          </li>
          <li>
            <strong>G98 boundary management</strong> — 4 kW (3.68 kW) per phase inverter ceiling
            drives many oversize-DC, sized-AC designs. A 5 kWp array with a 3.68 kW inverter sits
            firmly in G98 with negligible clipping loss.
          </li>
          <li>
            <strong>Inverter maximum DC input</strong> — published in the manufacturer&apos;s spec
            sheet. The array must not exceed this even at the worst-case low-temperature
            high-irradiance moment.
          </li>
          <li>
            <strong>Clipping loss in numbers</strong> — typical UK domestic install with a 1.2
            ratio loses 1-3% of annual generation to clipping. Trivial compared to the regulatory
            and cost savings of staying in G98.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>MCS commissioning and customer handover pack</ContentEyebrow>

      <ConceptBlock
        title="The MCS handover pack is the customer’s evidence base for SEG and warranty"
        plainEnglish="At the end of an MCS-certified PV install the customer receives a handover pack documenting the install, certifying compliance with the relevant standards, and providing the evidence base for Smart Export Guarantee registration with their electricity supplier. Without the MCS handover the customer cannot claim SEG payments and warranty claims become significantly harder. The pack is generated by the MCS-certified installer; the L3 apprentice contributes to the install but is not the certifier."
        onSite="The handover pack typical contents: MCS installation certificate (system specification, MCS-certified installer details, MCS-eligible product details), BS 7671 Electrical Installation Certificate for the new circuits, the SAP / EPC update if applicable, the design drawings and schematic, the commissioning data (string voltages, inverter portal access credentials, generation meter reading), the labelling photographs, the structural sign-off if applicable, the G98 / G99 paperwork, the manufacturer warranties, and the customer guidance on app monitoring and routine checks. Customers ask the apprentice for handover pack copies long after the install — keep a digital copy filed for the customer’s reference."
      >
        <p>The MCS handover pack contents:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>MCS installation certificate</strong> — system spec, installer details,
            eligible product details.
          </li>
          <li>
            <strong>BS 7671 EIC</strong> — for new circuits installed.
          </li>
          <li>
            <strong>Design drawings and schematic</strong> — single-line diagram of the system
            with all isolation points marked.
          </li>
          <li>
            <strong>Commissioning data</strong> — string voltages and currents at commissioning,
            inverter portal credentials, generation meter starting reading.
          </li>
          <li>
            <strong>G98 / G99 paperwork</strong> — DNO notification confirmation.
          </li>
          <li>
            <strong>Labelling photographs</strong> — evidence of installed labels at every
            isolation point.
          </li>
          <li>
            <strong>Structural sign-off</strong> — if structural assessment was required.
          </li>
          <li>
            <strong>Manufacturer warranties</strong> — panel, inverter, mounting system warranty
            certificates.
          </li>
          <li>
            <strong>Customer guidance</strong> — what to expect day-to-day, app monitoring
            instructions, when to call back.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating DC isolation as ‘AC off = safe’"
        whatHappens={
          <>
            Apprentice arrives to a PV-equipped property to do an unrelated electrical job. They
            isolate the consumer unit AC main switch and assume the property is dead. The PV array
            continues generating; the DC string conductors between the array and the inverter
            remain live at 300-600 V. If the apprentice opens the inverter or touches the DC
            terminals, they can take a 400 V DC shock — serious injury or fatality. The
            post-incident report finds ‘inadequate isolation procedure for PV-equipped
            property’.
          </>
        }
        doInstead={
          <>
            Always identify a PV install before starting any electrical work on the property. Look
            for the inverter (utility room, loft, garage), the meter position signage, and the DC
            isolator. Run the full safe-isolation procedure — AC isolator off and locked, DC
            isolator off and locked, dwell time respected, dead-test verified at every accessible
            point with a tested meter. If the property has PV and you don&apos;t have the
            procedure for it, stop and escalate.
          </>
        }
      />

      <CommonMistake
        title="Promising the customer they’ll have power during a grid outage"
        whatHappens={
          <>
            Customer asks &quot;so when there&apos;s a power cut my solar still works,
            right?&quot;. Apprentice says yes, customer signs the contract, installer fits a
            standard grid-tied inverter without backup hardware. First power cut — house goes dark
            even with sun on the roof. Customer is furious; the trade gets the blame.
          </>
        }
        doInstead={
          <>
            Be clear with the customer up front. A standard grid-tied inverter must disconnect
            when the grid fails (anti-islanding under G98/G99 — protects linespeople). The lights
            only stay on in a power cut if the install includes either a hybrid inverter with
            islanded operation, or a separate ATS-and- battery arrangement. Both add cost and
            complexity. The customer who wants blackout-resilience needs to specify it up front so
            the MCS designer can size the kit accordingly.
          </>
        }
      />

      <Scenario
        title="Existing PV property — emergency call-out for a tripped consumer unit"
        situation={
          <>
            You&apos;re called to a property at 7pm in October. The customer reports the consumer
            unit has tripped and won&apos;t reset. As you arrive you notice an inverter labelled
            &quot;Solar PV — 4 kW&quot; on the garage wall and a generation meter next to the main
            meter. The customer says &quot;the solar people fitted it three years ago, no problems
            since&quot;. The light is fading and the array on the south-facing roof is only
            marginally illuminated.
          </>
        }
        whatToDo={
          <>
            Treat the install as live until proven dead. Identify all isolation points — AC
            isolator at the inverter, AC isolator at the consumer unit, DC isolator at the
            inverter, DC isolator at the array (look on the rooftop or in the loft). Even with the
            consumer unit tripped, the inverter has its own AC and DC supplies that need
            separately isolating. Run the full safe-isolation procedure before opening any cover.
            Wait the manufacturer&apos;s dwell time for capacitor discharge. Verify dead at every
            accessible point. Then proceed with the fault diagnosis on the rest of the
            installation. If the customer asks why it&apos;s taking longer than they expected,
            explain — &quot;safe isolation on a PV property is two systems, not one&quot;.
          </>
        }
        whyItMatters={
          <>
            PV is now common enough that any electrician on emergency call-out work needs a
            standard procedure for a PV-equipped property. The DC voltage on the strings is
            non-trivial even at low light levels; the inverter capacitors hold charge after
            isolation. The customer doesn&apos;t see the safety- critical detail; they just see
            &quot;an electrician taking a long time&quot;. Explaining the procedure as you do it
            builds trust and prevents the emergency from becoming an incident.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 712 (Solar PV power supply systems) — extensive revision"
        clause={
          <>
            Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
            extensively revised and expanded in BS 7671:2018+A4:2026. The technical content of
            this section has been extensively revised and expanded and now contains updated
            requirements specific to PV systems.
          </>
        }
        meaning={
          <>
            Renewable PV is the most-revised special-installation section in A4:2026.
            Pre-amendment training notes and reference books should be checked against the
            published amendment text before being used as authority. The MCS MIS 3002
            installer-competence standard is the practical companion document.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Section 712."
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'PV chain — sunlight → DC string → inverter → AC isolator → meter → consumer unit. Every link has its own isolation and labelling.',
          'DC isolation is a separate safety problem from AC isolation. Both must be locked-off before work; the DC side stays live whenever light hits the panels.',
          'Modern PV strings sit at 300-600 V DC. DC arc behaviour is different from AC — only DC-rated isolators and DC-rated meters are suitable.',
          'G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that.',
          'BS 7671 Section 712 (extensively revised in A4:2026) is the electrical regulatory home for PV. MCS MIS 3002 is the installer-competence standard.',
          'Dual-MPPT inverters allow east-and-west string designs to track independently. Panel-level optimisation (Tigo, SolarEdge, Enphase) addresses partial shading.',
          'UK PV yield is typically 800-1100 kWh per kWp per year on south-facing roofs at 30-40° pitch. East/west posts 80-85%, north 50-65%.',
          'Grid-tied inverters disconnect during grid outages (anti-islanding under G98/G99). Customers wanting blackout backup need hybrid inverter or ATS-and-battery.',
        ]}
      />

      <Quiz title="Solar PV overview — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Operating principles, electrical interface, regulatory home and current UK market
        relevance for the five remaining environmental technology families an L3 electrician
        should recognise.
      </p>

      <TLDR
        points={[
          'MVHR is the recovery default in airtight new-build — recovers 80-90% of ventilation heat loss. Only delivers net benefit when the building envelope is airtight enough.',
          'Domestic wind almost always disappoints in suburban back gardens because of wind shear from surrounding buildings. Genuine wind sites are rare and need professional siting.',
          'Micro-CHP made sense when grid was carbon-intensive and gas was cheap. Both conditions have reversed — heat pumps now deliver lower running carbon. Domestic micro-CHP is largely over.',
          'Biomass suits rural off-gas-grid properties with fuel storage. Air-quality regulation tightening; new domestic installs increasingly rare since the RHI closed in 2022.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Describe the operating principle of MVHR — counter-flow heat exchanger recovering heat from extract air to supply air — and explain why it depends on building airtightness.',
          'State the typical electrical interface for a domestic MVHR unit and identify the boost-wiring network as the bulk of the electrical scope.',
          'State the typical electrical interface for a domestic micro-wind installation and recognise that it falls under the same ENA G98 / G99 framework as PV.',
          'Explain why domestic micro-CHP is largely over in the UK new-install market and identify where commercial CHP still makes sense.',
          'Identify the regulatory framework for domestic biomass — Building Regs Part J, Clean Air Act, Ecodesign Directive, MCS MIS 3004 / 3006 — and recognise the air-quality constraints in urban areas.',
          'Recognise micro-hydro as a site-specific technology with strong baseload performance where head and flow exist; identify the licensing and capital-cost barriers.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>MVHR — the recovery default</ContentEyebrow>

      <ConceptBlock
        title="Mechanical ventilation with heat recovery"
        plainEnglish="MVHR supplies fresh air to bedrooms and living rooms, extracts stale air from kitchens, bathrooms and utility rooms, and passes both streams through a counter-flow heat exchanger. 80-90% of the heat in the extract air transfers to the supply air through the exchanger plates without the two streams ever mixing. Net effect: controlled ventilation with most of the ventilation heat loss recovered."
        onSite="Standard kit on Future Homes Standard new-build and a viable retrofit option for properties that have been airtight-upgraded. Building Regs Part F covers ventilation requirements; Part L credits MVHR with significant SAP improvements in airtight buildings."
      >
        <p>The electrical interface for a typical domestic MVHR unit:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Unit supply</strong> — dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, 1.5
            mm² T&E to the unit location. Local DP isolator. Unit nameplate typically 50-300 W
            full load.
          </li>
          <li>
            <strong>Boost wiring</strong> — kitchens and bathrooms have boost overrides (humidity
            sensors, PIR, push-buttons or pull-cords) that increase the unit's fan speed
            temporarily. The boost network is the bulk of the electrical scope.
          </li>
          <li>
            <strong>Commissioning sensors</strong> — some units include CO₂ sensors, humidity
            sensors or temperature probes that feed back to the unit’s controls.
          </li>
          <li>
            <strong>Smart-home integration</strong> — Cat5e/Cat6 to the unit increasingly common
            for IP-based controls, integration with Home Energy Management systems and
            tenant-facing apps.
          </li>
        </ul>
        <p>
          The ducting, terminal placement and air-flow commissioning is the ventilation
          specialist’s domain. Your scope is the unit supply, the boost network, the isolation
          and any commissioning sensor wiring.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Building Regulations 2010, Approved Document F (Ventilation) — paraphrased"
        clause={
          <>
            Approved Document F sets minimum ventilation rates for habitable rooms, kitchens,
            bathrooms and utility rooms in new and refurbished dwellings. Mechanical ventilation
            systems (including MEV and MVHR) must be designed, installed, commissioned and
            balanced to deliver the specified flow rates, and the commissioning records must be
            retained for the building owner.
          </>
        }
        meaning={
          <>
            Part F is the regulatory home for ventilation. It applies regardless of whether the
            ventilation is natural, mechanical extract (MEV) or mechanical-with-recovery (MVHR).
            The commissioning records — air-flow rates at every supply and extract terminal — are
            part of the Building Regs hand- over pack. As the electrician you’re not the lead
            trade on Part F compliance but you need to recognise where it sits in the regulatory
            map.
          </>
        }
        cite="Source: Building Regulations 2010, Approved Document F (paraphrased from the published Approved Document available via gov.uk)."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Micro-wind — recognise but expect to disappoint</ContentEyebrow>

      <ConceptBlock
        title="Domestic-scale wind turbines and where they actually work"
        plainEnglish="Wind turbines convert moving air into rotational energy via the rotor and into electrical energy via the generator. Domestic-scale turbines (sub-10 kW) need clean laminar wind to deliver their rated output. Suburban back gardens deliver turbulent air shed by surrounding houses; the turbine spends most of its time below cut-in wind speed or cycling wildly. Real-world yields are usually a fraction of the manufacturer’s wind-tunnel claim."
        onSite="Where wind genuinely works — open rural sites with tall masts (15-30 m hub height) and clean wind — domestic-scale wind can deliver useful baseload renewable. The capital cost, planning timeline, noise assessment and ongoing maintenance are all non-trivial. As the electrician on a wind install you’d see a similar electrical chain to PV: turbine → rectifier (for DC turbines) or AC output → inverter (where required) → grid-connection isolator → consumer unit. ENA G98 (≤16 A per phase) or G99 (>16 A per phase) applies as for PV."
      >
        <p>The typical electrical interface:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Turbine</strong> — variable-speed permanent-magnet alternator inside the
            nacelle. Outputs variable-frequency AC or DC depending on the design.
          </li>
          <li>
            <strong>Power conversion</strong> — rectifier and inverter (or DC-DC + DC-AC inverter
            chain) converts the variable turbine output to grid-synchronised AC. Located at the
            base of the mast or in the property.
          </li>
          <li>
            <strong>Grid interface</strong> — AC isolator, generation meter, dedicated MCB into
            the consumer unit. ENA G98 or G99 notification per the inverter rating.
          </li>
          <li>
            <strong>Anti-islanding and safety</strong> — same loss-of-mains detection as PV.
            Inverter must disconnect on grid failure. MCS MIS 3003 covers small wind installer
            competence.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Micro-CHP — niche commercial, almost dead domestic</ContentEyebrow>

      <ConceptBlock
        title="Combined heat and power for the L3 electrician"
        plainEnglish="Micro-CHP burns gas (or sometimes other fuels) to generate electricity locally, using the waste heat from the engine or fuel-cell to drive the wet heating system. The economic case worked when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid has decarbonised (~200 gCO₂/kWh now), the relative carbon advantage has shrunk; heat pumps deliver lower running carbon per kWh of heat. Future Homes Standard takes fossil-fuel heat off new-build from 2025, removing the new-install market for domestic micro-CHP."
        onSite="Commercial-scale CHP at 5-50 kWe still makes sense in sites with high constant heat demand — hospitals, hotels, leisure centres, large care homes. The economics work because the site has constant heat demand (high capacity factor), the electricity offsets expensive day-rate import, and the combined efficiency (heat + power) outperforms separate plant. As the electrician on a commercial CHP install you handle the AC export side (G99 for anything material), the controls integration and the safety interlocks."
      >
        <p>The categories of CHP you may meet:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Stirling-engine domestic</strong> — typically 1 kWe / 6-7 kW heat, gas-fired.
            Largely 2010-2015 era installs; new install market essentially gone.
          </li>
          <li>
            <strong>Fuel-cell domestic</strong> — typically 0.7-1.5 kWe, gas-fired reformer. Pilot
            installs only; not mainstream.
          </li>
          <li>
            <strong>Engine-based commercial</strong> — 5-50 kWe internal combustion engine driving
            a generator, with heat exchanger recovering jacket water and exhaust heat. Mature
            technology, live commercial market.
          </li>
          <li>
            <strong>Biomass CHP</strong> — gasification or steam-cycle plants at 50 kW+ scale.
            Niche; usually associated with agricultural / forestry sites with fuel availability.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Biomass — rural off-gas-grid niche</ContentEyebrow>

      <ConceptBlock
        title="Biomass boilers and stoves"
        plainEnglish="Biomass appliances burn sustainably-sourced wood (logs, pellets, chips) to drive a wet heating system (boiler) or to heat a single room (stove). Counts as ‘low-carbon' under conventional accounting because the CO₂ released during combustion is offset by what the trees absorbed during growth — though the timing mismatch is debated. Best fit: rural off-gas-grid properties with space for a fuel store and ash handling. Worst fit: urban smoke-control areas with poor air quality."
        onSite="The electrical interface is straightforward — typically 13 A or 16 A supply on a 6 A or 10 A MCB to the boiler / stove location, with controls integration into the wet system pumps, three-port valves and thermostats. The fuel auger, ignition element, fan and ash-handling motor are all electrically driven and the controller manages the start-stop / modulation cycle. Building Regs Part J covers combustion appliances, flues and combustion-air provision; Clean Air Act compliance covers smoke-control area restrictions; MCS MIS 3004 (boilers) / 3006 (stoves) covers installer competence."
      >
        <p>Practical considerations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Fuel storage</strong> — pellets in a hopper (auto-feed) or logs in a wood
            store (manual loading). Pellet hoppers need annual delivery; log stores need seasoning
            and stacking.
          </li>
          <li>
            <strong>Ash handling</strong> — ash pan empties weekly to monthly depending on use.
            Customer-facing operational task. Some boilers offer auto-ash handling at higher cost.
          </li>
          <li>
            <strong>Air quality</strong> — Clean Air Act smoke-control areas restrict what can be
            burned and require Defra-exempt appliances. Many UK urban postcodes are in
            smoke-control areas.
          </li>
          <li>
            <strong>Maintenance</strong> — annual service essential. Auger, igniter, fan,
            ash-handling components have wear lives. Pellet quality matters — high-ash or wet
            pellets foul the burner and shorten component life.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Micro-hydro — site-specific but excellent where it fits</ContentEyebrow>

      <ConceptBlock
        title="Small-scale hydroelectric for the L3 electrician"
        plainEnglish="Micro-hydro converts the kinetic and potential energy of flowing water into electrical energy via a turbine and generator. Output depends on head (vertical drop) × flow (volume per unit time). Where the site has both head and flow, micro-hydro delivers consistent baseload renewable energy with very high capacity factor (typically 50-80% — much higher than wind or PV). The capital cost (turbine, intake, civils, grid connection) is the headline barrier; the operational cost is low and the equipment life is long."
        onSite="The right site is rare — a year-round flowing stream, sufficient drop, and adjacent property with reasonable cable run. Where the site exists, micro-hydro outperforms PV and wind by a wide margin. The regulatory framework includes the Environment Agency / SEPA / NRW abstraction licensing, fish-friendly intake design, planning permission, and the standard ENA G98 / G99 grid-connection regime. MCS MIS 3008 covers small-hydro installer competence."
      >
        <p>Typical electrical interface:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Turbine and generator</strong> — Pelton, Turgo or Crossflow for high- head
            sites; Francis or Kaplan for low-head high-flow. Generator output is AC or DC
            depending on the design.
          </li>
          <li>
            <strong>Power conversion</strong> — inverter / converter chain converts the generator
            output to grid-synchronised AC.
          </li>
          <li>
            <strong>Grid interface</strong> — long cable run from power-house to property (often
            hundreds of metres of buried SWA), grid-connection isolator, generation meter,
            dedicated MCB into the consumer unit. ENA G99 typically applies given the size of
            viable installs.
          </li>
          <li>
            <strong>Civils</strong> — weir, intake, penstock, power-house. The civils cost
            typically dominates the install budget.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Solar thermal — recognition for retrofit and maintenance</ContentEyebrow>

      <ConceptBlock
        title="Solar thermal — heat collection rather than electricity generation"
        plainEnglish="Solar thermal collectors absorb sunlight to heat a glycol-based fluid in a primary loop. The hot fluid runs through a coil in the bottom of a twin-coil hot water cylinder; a small pump circulates it; a controller decides when to run the pump based on collector temperature versus cylinder temperature. Output is heat for hot water, not electricity. Two collector types — flat plate (cheaper, less efficient at low irradiance) and evacuated tube (more efficient, especially at low light, more expensive)."
        onSite="Solar thermal new-install volume in the UK has fallen sharply since 2014 as PV costs collapsed and PV-plus-immersion (or PV-plus-heat-pump) outcompeted thermal on cost-per-kWh-of-hot-water. The L3 apprentice will encounter solar thermal mainly on EICR and maintenance work — replacing a tired pump, swapping a controller, decommissioning a stagnated system. The electrical scope is small: typically a 13 A supply to the controller, a 2-core to the pump, and the controller’s sensor wiring (collector temperature probe, cylinder temperature probe). MCS MIS 3001 is the install standard. Watch for stagnation damage on systems that have been left unattended over hot summer periods — the glycol breaks down and the system needs flushing."
      >
        <p>Solar thermal field-recognition guide:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Flat plate collector</strong> — glazed metal panel, looks like a flat
            radiator. Cheaper; less efficient at low light.
          </li>
          <li>
            <strong>Evacuated tube collector</strong> — array of glass tubes with vacuum
            insulation. Higher efficiency at low light; more expensive; more visually distinctive.
          </li>
          <li>
            <strong>Twin-coil cylinder</strong> — distinguishing feature of a solar thermal
            install. Lower coil from solar primary, upper coil from boiler / immersion top-up.
          </li>
          <li>
            <strong>Primary loop pump and controller</strong> — typical 13 A supply, controller
            mounted near the cylinder. Watch for failed pumps and degraded glycol on systems
            unattended for years.
          </li>
          <li>
            <strong>Stagnation damage</strong> — common failure on systems where the customer was
            away during hot weather and the cylinder filled. The primary loop overheats; glycol
            degrades. Flush, replace glycol, inspect for corrosion damage.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>MVHR commissioning detail</ContentEyebrow>

      <ConceptBlock
        title="The MVHR balance-and-commission step is what makes the install actually work"
        plainEnglish="MVHR delivers its design performance only when each supply terminal and each extract terminal is delivering the design air flow rate. Out of the box every install needs balancing — adjusting the diffuser dampers and the unit’s flow settings until each room’s supply and extract match the design schedule. Building Regs Part F requires the commissioning records (measured flow rate at every terminal) be retained as part of the building handover. The ventilation specialist runs the balance; the L3 electrician’s scope is the supply, isolation and boost wiring."
        onSite="A poorly commissioned MVHR install is a common and avoidable failure mode. Symptoms: rooms that feel stuffy or stale, condensation on bedroom windows in the mornings, perceived noise from the unit running at higher speed than necessary because the airflow is throttled by miscommissioned terminals. The commissioning records are the customer’s evidence base — without them, the install is non-compliant under Part F and the customer cannot demonstrate that the system is delivering design ventilation. As the L3 electrician verifying an MVHR install at EICR, ask to see the commissioning records; a missing record is a failure to flag."
      >
        <p>The MVHR commissioning checklist:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Air flow at every terminal</strong> — measured with an anemometer at every
            supply and extract terminal; recorded against the design schedule.
          </li>
          <li>
            <strong>Unit flow rate</strong> — measured at the unit&apos;s outlet ducts; verified
            against the sum of terminal flows.
          </li>
          <li>
            <strong>Boost function</strong> — kitchen and bathroom boost operating; humidity / PIR
            sensors triggering; unit responding.
          </li>
          <li>
            <strong>Bypass operation</strong> — many MVHR units include a summer bypass that
            disengages the heat exchanger when outdoor air is cooler than indoor. Verify operation
            per design.
          </li>
          <li>
            <strong>Filter access and replacement schedule</strong> — clearly briefed to the
            customer. Filter clogging is the most common cause of MVHR underperformance over time.
          </li>
          <li>
            <strong>Commissioning records retained</strong> — Part F requires the records be
            provided to the customer at handover and retained for building inspection.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>EAHP and Passivhaus integration</ContentEyebrow>

      <ConceptBlock
        title="Exhaust-air heat pumps and the Passivhaus integration story"
        plainEnglish="Passivhaus and similar very-low-energy designs (Future Homes Standard high-spec, AECB Silver / Gold) reduce the building’s heat demand to a fraction of conventional construction. Total heat demand may be only 15-25 kWh per m2 per year, against 100+ for typical Building Regs minimum. At that demand level a small exhaust-air heat pump (1-3 kW) integrated with the MVHR can supply both the ventilation and the heating from a single unit. Genvex Combi 185, NIBE F750 and Vaillant aroSTOR are typical examples."
        onSite="The L3 apprentice will encounter EAHP / Passivhaus integration mainly on new-build and major retrofit. The electrical interface is relatively simple — a single dedicated supply to the integrated unit, controls cabling for room sensors and temperature probes, boost wiring from kitchens and bathrooms (same as standard MVHR), and a small immersion heater on the integrated DHW cylinder for legionella protection. Performance depends heavily on the building envelope being genuinely airtight and well-insulated; an EAHP fitted to a leaky building will not deliver. The install is typically signed off by an MCS-certified designer holding both MIS 3005 (heat pump) and MVHR competence."
      >
        <p>When EAHP / Passivhaus integration fits:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>New-build to Passivhaus or similar standard</strong> — air permeability ≤0.6
            air changes per hour at 50 Pa; low total heat demand. Single integrated unit replaces
            separate heat pump and MVHR.
          </li>
          <li>
            <strong>Major retrofit to EnerPHit or AECB Silver</strong> — whole-house fabric
            upgrade brings demand into EAHP range; integrated unit avoids needing two separate
            systems.
          </li>
          <li>
            <strong>Conventional new-build or retrofit</strong> — separate ASHP plus separate MVHR
            is the typical configuration; integrated EAHP not applicable because the heating
            demand exceeds what a 1-3 kW unit can deliver.
          </li>
          <li>
            <strong>Performance dependence</strong> — building envelope airtightness and
            insulation are non-negotiable. An EAHP in a leaky building underperforms because the
            extracted air does not carry enough heat to drive a useful heat pump duty.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Recommending MVHR for a leaky uninsulated property"
        whatHappens={
          <>
            Customer in a 1960s detached with single glazing and uninsulated cavity walls asks
            about MVHR. Apprentice (or marketing they&apos;ve seen) recommends it. System is
            fitted at significant cost. The building&apos;s air permeability is so high that the
            bulk of air change happens through the envelope, not the MVHR ducts. The MVHR fan
            power consumed (continuous 50-150 W) outweighs the heat recovered. Customer&apos;s
            bills go up, not down.
          </>
        }
        doInstead={
          <>
            MVHR only earns its keep in airtight buildings. The MCS / Passivhaus / AECB MVHR
            design guides specify air permeability thresholds (typically ≤3 m³/h/m² @ 50 Pa) below
            which MVHR pays back. Above that threshold the fabric needs upgrading first. The
            honest customer-facing answer: &quot;MVHR is the right next step after you&apos;ve
            done the insulation, glazing and draught-proofing — before that, you&apos;re burning
            fan power for no recovery.&quot;
          </>
        }
      />

      <CommonMistake
        title="Quoting wind manufacturer claims as if they were the realistic suburban yield"
        whatHappens={
          <>
            Customer reads a 5 kW turbine&apos;s spec sheet promising &quot;up to 12,000 kWh per
            year&quot;. Apprentice doesn&apos;t challenge it. Customer spends £12-18k on the
            install. Real-world yield in their suburban back garden is 2,500-4,000 kWh per year
            due to wind shear from surrounding buildings. Customer is unhappy; the trade gets the
            blame.
          </>
        }
        doInstead={
          <>
            Manufacturer yield claims are quoted at clean reference wind speeds — they are
            essentially never achievable in suburban gardens. Where the customer wants wind, refer
            them to a wind specialist for a proper site assessment with anemometer-derived
            wind-resource modelling, not an off-the-shelf back-garden turbine. For most suburban
            customers asking about wind, the honest answer is &quot;wind is unlikely to deliver —
            battery storage / EV smart charging / heat pump are better next steps&quot;.
          </>
        }
      />

      <Scenario
        title="Rural off-gas-grid retrofit — biomass vs heat pump"
        situation={
          <>
            Customer has a 1980s detached cottage in a rural off-gas-grid area, currently heated
            by an oil boiler. Property has a single-storey extension housing the existing boiler
            and oil tank. Customer wants to decarbonise heating and is weighing biomass
            (wood-pellet boiler with hopper) against air-source heat pump. Property has cavity
            wall insulation, double glazing, and reasonable airtightness. Garden has space for
            either option. Annual heat demand estimated at 18,000 kWh.
          </>
        }
        whatToDo={
          <>
            The realistic comparison: ASHP (10-12 kW) at typical SCOP 3.0-3.5 would consume around
            5,500-6,000 kWh of electricity annually — at current grid carbon ~200 gCO₂/kWh,
            that&apos;s ~1.1-1.2 tonnes CO₂. Pellet boiler at ~85% efficiency burning ~21,000 kWh
            of pellets — ash, weekly hopper top-up, annual service. Pellet cost varies but
            typically £1,200-1,800/year at recent rates. Heat pump electricity cost depends on
            tariff (~£1,500-1,700/year on standard tariff, can drop with time-of-use tariffs).
            Carbon: heat pump on current grid is the cleaner choice and gets cleaner each year as
            the grid cleans up. Pellet is conventionally low-carbon but the grid trajectory
            favours the heat pump. Boiler Upgrade Scheme grant available for both. Honest
            recommendation: heat pump unless the customer particularly values the fuel
            independence of biomass or has biomass fuel availability on-site (forestry /
            agricultural).
          </>
        }
        whyItMatters={
          <>
            Off-gas-grid retrofit is the segment where biomass historically had the strongest
            claim. Heat pumps have largely taken over this segment as costs have fallen and SCOP
            has improved. The customer-facing answer needs the operating-cost comparison, the
            carbon-trajectory comparison and the lifestyle comparison (auto-running heat pump vs
            hands-on pellet management). The L3 electrician is the customer-trusted trade who can
            frame the comparison honestly.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Section 712 (PV power supply systems)"
        clause={
          <>
            Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
            extensively revised and expanded in BS 7671:2018+A4:2026. The technical content of
            this section has been extensively revised and expanded and now contains updated
            requirements specific to PV systems.
          </>
        }
        meaning={
          <>
            Solar thermal sits under Building Regs Part L and MCS MIS 3001 rather than Section
            712. PV — including the panels and the immersion-diverter logic that often replaces a
            solar-thermal twin-coil cylinder — is governed by Section 712 as fully revised in
            A4:2026.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Section 712."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs)"
        clause={
          <>
            Regulation 421.1.7 has been introduced recommending the installation of arc fault
            detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed
            installation due to the effects of arc fault currents.
          </>
        }
        meaning={
          <>
            Where a PV-driven immersion or storage tank is wired as an AC final circuit, the AFDD
            recommendation in 421.1.7 applies. It is advisory under BS 7671 but mandatory in
            high-rise residential buildings via the Building Safety Act framework.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'MVHR recovers 80-90% of ventilation heat loss in airtight buildings. In leaky buildings the fan power outweighs the heat recovered — fabric first, MVHR second.',
          'MVHR electrical interface — dedicated 13/16 A supply, local isolation, boost wiring from kitchens and bathrooms. The boost network is usually the bulk of the scope.',
          'Domestic micro-wind almost always disappoints in suburban back gardens. Wind shear from surrounding buildings means yields are well below manufacturer claims.',
          'All parallel-connected generators (PV, wind, micro-hydro, micro-CHP, battery) fall under ENA G98 (≤16 A/phase) or G99 (>16 A/phase).',
          'Domestic micro-CHP is essentially over in new installs — grid carbon has fallen to where heat pumps win the carbon comparison. Commercial CHP at 5-50 kWe still works in constant-heat-demand sites.',
          'Biomass suits rural off-gas-grid properties with fuel storage and ash handling. Air quality regulation (Clean Air Act, Ecodesign) tightening; new installs uncommon.',
          'Micro-hydro is site-specific but excellent where head and flow exist — much higher capacity factor than wind or PV. Capital cost and licensing are the headline barriers.',
          'Each of the five technologies has a regulatory home — Building Regs Part F (MVHR), MCS MIS 3003 / 3004 / 3006 / 3008 (wind, biomass boiler, biomass stove, hydro), ENA G98/G99 (any grid-connected generator).',
        ]}
      />

      <Quiz title="MVHR, wind, micro-CHP, biomass — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
