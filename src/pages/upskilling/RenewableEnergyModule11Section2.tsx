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
import { Chapter81Verification } from '@/components/study-centre/diagrams/renewableGapKit';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s2-i2r-payback-model',
    question:
      'What is the Chapter 81 cable-upsize payback model — the typical calculation?',
    options: [
      'Payback = cable cost divided by the inverter rating, giving the number of years the generation takes to cover the upsized conductor',
      'Annual I²R loss × unit price = annual loss cost; payback = incremental upsize cost / annual saving, with a reasonable threshold of 5-10 years',
      'Annual loss = voltage drop percentage × the circuit rating in amps, converted to pounds at the standing-charge rate rather than the unit rate',
      'Payback is fixed at one year by Chapter 81; any upsize that does not repay within twelve months is not permitted under the energy-efficiency chapter',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 81 cable-upsize payback model: (1) Annual I²R loss at design current = I² × R × L × t — where I = design current (A), R = cable resistance per metre at operating temp (Ω/m), L = run length (m), t = operating hours per year (h). Returns kWh/year. (2) Annual cost = kWh/year × unit price (£/kWh) UK 2025-26 typical 25-30 p/kWh import. (3) Incremental cost of upsize = cable cost delta + install labour delta (typically modest for one CSA step). (4) Payback in years = incremental cost / annual loss saving. (5) Reasonable threshold UK 2025-26: 5-10 years. Sustained-load LCT circuits (heat pump 4-6 h/day × 5 months ≈ 750 h/year; EV charger 6-8 h × 3-5 nights × 50 weeks ≈ 1,200 h/year) typically pay back. Designer records: per-circuit design current + operating hours assumption + cable R/L + payback. Cert evidence bundle attaches the model.',
  },
  {
    id: 'm11s2-tariff-aware-design',
    question:
      'What is "tariff-aware design" under Chapter 81 + the EEMS (Reg 825.1)?',
    options: [
      'Designing the install so the customer pays a single premium tariff that covers all LCT equipment, simplifying the bill into one flat rate',
      'Designing circuits and the EEMS for time-of-use tariffs, scheduling EV, heat pump, immersion and BESS charging to off-peak; the tariff assumptions are recorded',
      'Sizing the consumer unit so that every LCT circuit can run simultaneously at peak rate, guaranteeing the customer never has to wait for an off-peak window',
      'Selecting protective devices rated for the supplier\'s half-hourly settlement so the meter can bill each circuit on a different tariff',
    ],
    correctIndex: 1,
    explanation:
      'Tariff-aware design (Chapter 81 efficiency, methodology per BS HD 60364-8-1:2019) = designing the install for operation on time-of-use (TOU) tariffs. UK 2025-26 tariff landscape: Octopus Agile (half-hourly variable), Octopus Cosy (heat-pump optimised), Octopus Go (EV night rate), British Gas Electric Driver, EDF GoElectric, IO. Off-peak rates 5-12 p/kWh; peak 30-40 p/kWh; export tariffs (Smart Export Guarantee) 4-15 p/kWh. Design implications: (1) EV charger + heat pump + immersion diverter + BESS charging scheduled to off-peak windows. (2) The EEMS (Electrical Energy Management System, Reg 825.1) coordinates the schedule. (3) BESS sized for off-peak fill + peak shave + export when SEG rate favourable. (4) PV + BESS + EV coordination for self-consumption optimisation. (5) Sub-meter + smart-meter export wired to confirm operation. The efficiency design records the tariff assumptions + load-shift schedule + EEMS configuration. Cert evidence bundle: tariff identified + load-shift model + EEMS commissioning sheet.',
  },
  {
    id: 'm11s2-monitoring-plan',
    question:
      'What goes in the Chapter 81 post-install monitoring plan?',
    options: [
      'A single power-quality reading taken at handover; once recorded, no further monitoring of the LCT components is expected under Chapter 81',
      'Monitoring points, reporting cadence and a year-1 verification of actual vs design energy — sub-meters per LCT component, CT clamp on export, a review app',
      'The schedule of statutory EICR dates only, since periodic inspection is the mechanism by which efficiency performance is checked over time',
      'The manufacturer warranty registration details for each LCT component, which serve as the post-install performance record',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 81 post-install monitoring plan documents: (1) Monitoring points — sub-meter on each LCT component (PV import / BESS in/out / heat pump / EV charger); CT clamp on smart-meter export; data-logger / portal / app. (2) Reporting cadence — typical monthly customer-facing report + annual verification. (3) Verification expectation — PV annual yield kWh vs design estimate; heat pump SCOP measured vs SCOP design; EV consumption vs design; BESS round-trip efficiency vs design. (4) Year-1 verification trigger — if actual deviates significantly from design, investigation. (5) Customer empowerment — customer can see their efficiency design performing or not. (6) EEMS data feeds the monitoring. Cert evidence bundle: monitoring plan attached to Chapter 81 design records; year-1 verification report.',
  },
  {
    id: 'm11s2-cable-vd-margin',
    question:
      'For a 32 A heat pump dedicated circuit, 25 m run, what cable CSA does Chapter 81 typically justify beyond the Reg 525 minimum?',
    options: [
      'Drop to 4 mm² — Chapter 81 favours the smallest conductor that passes the voltage-drop check, because less copper is the more efficient outcome',
      'Typically 10 mm² T+E — one step above the 6 mm² Reg 525 minimum; it cuts I²R loss ~40% with a ~4-8 year payback, and the rationale is recorded',
      'Jump straight to 16 mm² on every heat pump circuit, since the largest practical CSA always gives the shortest payback regardless of run length',
      'Keep 6 mm² but double up the conductors in parallel, which halves the resistance more cheaply than moving to a single larger CSA',
    ],
    correctIndex: 1,
    explanation:
      '32 A heat pump dedicated circuit, 25 m run worked case: (1) Reg 525 minimum CSA — 6 mm² T+E (voltage drop ~3.5-4% at design current 25-32 A over 25 m, within 5% cap). Safety + correctness floor. (2) Chapter 81 upsize candidate — 10 mm² T+E. Voltage drop drops to ~2%; resistance per metre drops from ~3.0 mΩ/m (6 mm²) to ~1.8 mΩ/m (10 mm²); I²R loss reduces ~40%. (3) Annual operating hours estimate — UK heat pump 4-6 h/day × 5 months = ~750 hours/year average; design current ~25 A average (cycle weighted). (4) Annual I²R saving — ~30-50 kWh/year × 25-30 p/kWh = £8-15/year. (5) Cable cost delta — 10 mm² vs 6 mm² T+E for 25 m run ~£40-80 material + minor labour delta. (6) Payback — 4-8 years. Within UK 2025-26 reasonable threshold (5-10 years). Chapter 81 records the rationale + designer chooses 10 mm². Cert evidence: per-circuit design table — CSA, R/m, design I, hours/year, kWh saving, payback.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer with 6 kWp PV + 13 kWh BESS + tariff with off-peak fill option asks: how should the Chapter 81 design coordinate the BESS charging?',
    options: [
      'Charge the BESS only from PV surplus and never from the grid, so the off-peak fill option is left disabled regardless of the tariff differential',
      'Charge the BESS during the daytime peak window so it is full before the evening, accepting the higher import rate to guarantee capacity',
      'Keep the BESS at a fixed 50% state of charge at all times and let it float, since cycling the battery against the tariff shortens its life',
      'Tariff-aware: charge off-peak (~23:30-05:30), self-consume PV, discharge through peak (16:00-19:00); the EEMS coordinates and the saving is recorded',
    ],
    correctAnswer: 3,
    explanation:
      'Efficiency-led BESS coordination (Chapter 81; EEMS per Reg 825.1) for a tariff-aware customer: (1) BESS charges off-peak when grid unit price is lowest + PV is not generating (typical off-peak 23:30-05:30 at 5-12 p/kWh). (2) PV generates daytime — direct self-consumption first; surplus to BESS if not full; remainder to grid (export at SEG rate). (3) BESS discharges through peak window (16:00-19:00 at 30-40 p/kWh) to displace grid import. (4) The EEMS (Reg 825.1) / BESS controller coordinates the schedule via tariff signal (smart-meter) + PV inverter + load priority list. (5) Designer records: tariff identified + charge schedule + discharge schedule + annual cost saving estimate vs flat tariff. (6) Customer monitoring: BESS cycle log + £ saved per month vs flat-rate baseline. Cert evidence: tariff assumption + EEMS commissioning sheet + monitoring plan. UK 2025-26 typical saving £100-300/year on a 13 kWh BESS on Octopus Cosy / Go vs flat tariff.',
  },
  {
    question:
      'PV DC string from roof to inverter — 15 m run, 8 A string current. How does Chapter 81 frame the cable selection?',
    options: [
      'Size the DC string cable purely for mechanical robustness; voltage drop is irrelevant on the DC side because the inverter regulates the output',
      'Size per Section 712 (Iz ≥ array max DC current); DC voltage drop affects MPP tracking, so Chapter 81 may upsize to hold voltage closer to MPP and lift yield',
      'Always use the smallest CSA the connectors accept, since a shorter, thinner DC cable reduces capacitance and improves inverter performance',
      'Match the DC cable CSA to the AC output cable so both sides of the inverter share the same conductor size for simplicity',
    ],
    correctAnswer: 1,
    explanation:
      'PV DC cable framing: (1) Cable selection per Reg 712.521.1041 — cables on the DC side selected + erected to minimise the risk of earth faults and short-circuits (e.g. single-core non-metallic-sheathed H1Z2Z2-K to BS EN 50618). Sizing per Reg 712.433.103 — the cable continuous current-carrying capacity shall be ≥ the PV array maximum DC current; there is no separate "minimum CSA" figure, CSA follows current-carrying capacity. 4 mm² PV-DC double-insulated is typical for 10-12 A string current at 600-1000 V DC. (2) Reg 525 voltage drop applies to AC; DC has analogous voltage drop affecting MPP (Maximum Power Point) tracking — voltage drop on DC reduces string voltage at inverter, shifts MPP, lowers yield. (3) Chapter 81 upsize candidate — 6 mm² PV-DC. Resistance per metre drops; voltage drop drops; MPP held closer to optimum; daily yield modestly improved (~0.5-1.5% depending on conditions). (4) Annual generation hours — UK PV 4-7 h/day equivalent full-sun (varies seasonally, ~1,000 h/year equivalent). (5) Payback model — incremental cable cost ~£20-50; yield improvement ~30-80 kWh/year × export or self-consumption value (15-30 p/kWh) = £5-25/year; payback ~3-10 years. (6) Designer records the rationale per string. Cert evidence: PV DC design table — string V, I, length, CSA, the Iz ≥ array max DC current check per Reg 712.433.103 + Chapter 81 rationale.',
  },
  {
    question:
      'What is the role of the EEMS (Electrical Energy Management System) in Chapter 81 efficiency design — and where is it defined in BS 7671?',
    options: [
      'The EEMS is the consumer unit\'s main switch, defined in Chapter 53; Chapter 81 simply requires it to be rated for the combined LCT load',
      'The EEMS is the smart meter installed by the supplier, so it falls outside BS 7671 and is not referenced anywhere in the standard',
      'Defined at Reg 825.1 within Chapter 82, the EEMS is the control mechanism that delivers the Chapter 81 efficiency design — coordinating PV/BESS/heat pump/EV per tariff',
      'The EEMS is the inverter\'s anti-islanding relay, defined in Section 551, and Chapter 81 relies on it to disconnect generation during a grid fault',
    ],
    correctAnswer: 2,
    explanation:
      'The EEMS (Electrical Energy Management System) is defined at Reg 825.1 and sits within the Chapter 82 prosumer installation — it is the control + automation + monitoring layer. Chapter 81 efficiency design + the EEMS work together: (1) Chapter 81 = the design rationale (methodology per BS HD 60364-8-1:2019) — what efficiency outcome the designer aims for (cable upsize + tariff-aware load shifting + LCT coordination). (2) The EEMS (Reg 825.1) = the control mechanism — it coordinates operation: PV inverter + BESS controller + heat pump controller + EV charger + immersion diverter, all coordinated against tariff + load priority + export setting. (3) Integration — the efficiency design records the EEMS configuration as part of the rationale; the prosumer commissioning records its operation. (4) UK 2025-26 typical EEMS — manufacturer-specific (SolarEdge ONE, Tesla Powerwall app, MyEnergi Eddi / Zappi + libbi, Enphase Enlighten) or open-protocol (Modbus + home automation). (5) Designer documents which EEMS, the coordinated devices, the tariff signal, the load priority. Cert evidence bundle: efficiency design + EEMS commissioning sheet + monitoring plan + customer handover.',
  },
  {
    question:
      'A customer reads about Chapter 81 + asks "is my cable choice optimal?" How does the designer answer in concrete terms?',
    options: [
      'The designer points to the EIC and explains that any cable passing the Reg 525 voltage-drop check is by definition optimal, so no further analysis applies',
      'The designer shows the per-circuit design table — current, length, hours, CSA, cost, saving and payback — so the customer sees the rationale and accepts or modifies',
      'The designer recommends upsizing every circuit by two CSA steps, since larger cable is always nearer optimal and removes the need for a payback calculation',
      'The designer defers to the SAP assessor, since cable efficiency is assessed as part of the EPC rather than by the electrical designer',
    ],
    correctAnswer: 1,
    explanation:
      'Concrete Chapter 81 customer answer = the per-circuit design table. Each circuit row: (1) Circuit name (e.g. heat pump dedicated). (2) Design current I (A). (3) Run length L (m). (4) Operating hours per year t (h) — designer\'s assumption based on load profile + tariff. (5) Reg 525 minimum CSA (e.g. 6 mm²) + design voltage drop %. (6) Chapter 81 upsize candidate (e.g. 10 mm²) + design voltage drop %. (7) Cable R/m at operating temp (Ω/m). (8) Annual I²R loss at minimum vs upsize (kWh/year). (9) Annual cost difference (£/year at unit price). (10) Incremental cable + install cost (£). (11) Payback (years). (12) Designer decision + rationale. Customer sees the design transparently + accepts or modifies. UK 2025-26 reasonable payback threshold: 5-10 years for typical residential LCT; longer thresholds may apply to commercial / high-duty / long-lifetime installs. Chapter 81 cert evidence: per-circuit design table attached to EIC + customer handover.',
  },
  {
    question:
      'How does Chapter 81 design verification at commissioning differ from the safety verification per Reg 643?',
    options: [
      'Reg 643 and Chapter 81 are verified by measuring the same values; the only difference is that the efficiency results are recorded in kWh rather than ohms',
      'Reg 643 verifies safety; Chapter 81 verification confirms the install matches the efficiency design — CSA, voltage drop, EEMS config and monitoring points',
      'Chapter 81 replaces the Reg 643 live tests on LCT circuits, so loop impedance and RCD operation are no longer checked once the efficiency design is signed off',
      'Chapter 81 verification is carried out a year after commissioning by reviewing the monitoring data, so nothing efficiency-related is checked at handover itself',
    ],
    correctAnswer: 1,
    explanation:
      'Two-layer verification at commissioning: (1) Reg 643 Part 6 safety + correctness — continuity of protective conductors (Reg 643.2.1), insulation resistance (Reg 643.3, redrafted in A4:2026), polarity, RCD operation (Table 3A in Appendix 3 has been deleted in A4:2026 — a single AC test at IΔn now applies regardless of RCD type), earth fault loop impedance, functional tests of switchgear / RCDs / interlocks. (2) Chapter 81 efficiency verification — cable CSA as designed; voltage-drop calculation matches install; the EEMS (Reg 825.1) configured per design; monitoring points wired + operational; annual energy estimate documented + attached. Both verified at commissioning. Inspector / verifier signs both off. Cert evidence bundle: Reg 643 schedule of inspection + schedule of test + efficiency design verification record + EEMS commissioning sheet. M11 §8 covers the integrated commissioning chain across Chapter 81 + lightning + SPDs + fault contribution + anti-islanding.',
  },
  {
    question:
      'A commercial site with 50 kW PV + 100 kWh BESS + air-source heat pump + EV fleet charging — how does Chapter 81 scale?',
    options: [
      'Chapter 81 does not apply above domestic scale; large commercial LCT sites are designed to BS HD 60364-8-1 directly with no BS 7671 efficiency layer',
      'Payback lengthens at commercial scale because the cable cost rises faster than the energy saving, so upsizing rarely repays on large circuits',
      'Same framework, larger magnitude — higher currents and longer hours mean bigger I²R losses, so upsizing often pays back in 2-5 years across more circuits',
      'Commercial sites use a fixed efficiency target set by the DNO at connection, so the per-circuit payback model is replaced by a single site-wide loss limit',
    ],
    correctAnswer: 2,
    explanation:
      'Commercial Chapter 81 = same design framework, larger payback magnitude + more circuits. UK 2025-26 commercial LCT typical: 50-500 kW PV array; 100-1000 kWh BESS; multi-circuit EV fleet charging (10-100 chargers); commercial heat pump (50-300 kW); CHP if present (Chapter 82 PEI). Chapter 81 application: (1) Sustained-load circuits — 32-125 A typical per dedicated circuit; long operating hours (industrial process / fleet charging / heat pump on commercial duty). (2) Cable upsize often pays back in 2-5 years — annual I²R losses scale with I² (much larger at commercial current ratings). (3) The EEMS (Reg 825.1) / building management system (BMS) coordinates the multi-source PEI per Chapter 82. (4) Designer records per-circuit + per-component rationale + commercial-tariff model (DUoS, TNUoS, capacity charges) + monitoring. (5) Customer evidence bundle structurally same: Chapter 81 efficiency design + Chapter 82 PEI records + EEMS commissioning + Reg 643 verification + EIC. Larger document set; same framework. Commercial customers typically more attuned to operational cost reduction => Chapter 81 strongly supports the business case.',
  },
];

const faqs = [
  {
    question: 'What is the typical Chapter 81 cable upsize step in residential UK 2025-26?',
    answer:
      'One CSA step (e.g. 6 mm² to 10 mm² T+E; 10 mm² to 16 mm² T+E for higher-current circuits). Two-step upsizes rarely pay back in residential unless load is exceptional. Commercial circuits with high sustained current may justify two steps. Designer models payback per circuit + records the choice.',
  },
  {
    question: 'Does Chapter 81 require an EEMS on every install?',
    answer:
      'No — the EEMS (Electrical Energy Management System, defined at Reg 825.1) is a feature of the Chapter 82 prosumer installation and is design-dependent. Simple installs (small PV-only without storage) may not need an EEMS. Multi-source LCT installs with tariff-aware operation typically do. The efficiency design records whether an EEMS is part of the design + the rationale.',
  },
  {
    question: 'What about cable losses on the PV side — does Chapter 81 cover DC cabling?',
    answer:
      'Yes, energy-efficient design applies to any conductor where I²R loss matters. PV DC cabling has sustained current during daylight hours; the baseline is set by Reg 712.521.1041 (cable selection to minimise earth-fault / short-circuit risk) and Reg 712.433.103 (Iz ≥ array max DC current), and upsizing one step above can hold MPP voltage closer to optimum + improve string yield. Designer records the rationale per string.',
  },
  {
    question: 'How precise does the Chapter 81 payback model need to be?',
    answer:
      'Engineering estimate, not precision economics. Inputs: design current, operating hours assumption (load profile based), cable R/m from manufacturer data, unit electricity price (year-1 assumption), incremental cable + install cost. Payback in years. Reasonable round numbers; designer records assumptions transparently. Customer sees the model + accepts.',
  },
  {
    question: 'What happens if year-1 monitoring shows actual energy use much higher / lower than design?',
    answer:
      'Investigation. Possible causes: customer load profile differs from assumption (more / less EV use, different heating pattern); equipment performance differs from manufacturer claim (heat pump SCOP, PV yield, BESS round-trip); tariff change. Chapter 81 monitoring plan should flag the deviation. Designer / installer engages with customer to understand + may revise design records.',
  },
];

export default function RenewableEnergyModule11Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Chapter 81 applied — efficiency design + verification | Renewable Energy 11.2 | Elec-Mate',
    description:
      'Practical Chapter 81 design: cable CSA payback model, voltage-drop margins, tariff-aware load shifting, EEMS integration, monitoring plan. Per-circuit design table. Verification at commissioning. Cert evidence bundle.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 2 · BS 7671:2018+A4:2026 · Chapter 81 design + verification"
            title="Chapter 81 applied — efficiency design + verification"
            description="Practical Chapter 81 design (methodology per BS HD 60364-8-1:2019): cable CSA payback model, voltage-drop margins below the Reg 525 floor, tariff-aware load shifting, EEMS integration (Reg 825.1), monitoring plan, per-circuit design table. Verification at commissioning + cert evidence bundle."
            tone="yellow"
          />

          <TLDR
            points={[
              'Chapter 81 cable upsize is payback-driven. Designer models annual I²R loss × unit price vs incremental cable cost; reasonable payback threshold UK 2025-26 is 5-10 years.',
              'Typical upsize candidates: heat pump dedicated, EV charger dedicated, BESS DC + AC, PV DC + AC, immersion diverter, commercial sustained-load. General lighting + intermittent sockets rarely justify upsize.',
              'Voltage-drop margin below Reg 525 cap is a measurable Chapter 81 outcome — designer aims well below 3% / 5% caps where payback supports.',
              'Tariff-aware design coordinates EV + heat pump + BESS + immersion diverter operation to off-peak windows. The EEMS (Reg 825.1) implements the schedule.',
              'Per-circuit Chapter 81 design table: circuit, design I, run length, hours/year, Reg 525 minimum CSA, upsize candidate, R/m, annual loss saving, incremental cost, payback. Customer-readable.',
              'Monitoring plan: sub-meter per LCT component + CT clamp on smart-meter export + year-1 verification of actual vs design.',
              'Commissioning verification: Reg 643 Part 6 safety tests + Chapter 81 efficiency verification record. Both attached to EIC.',
              'Commercial sites scale the same framework — larger currents + longer operating hours = larger payback magnitude + faster payback.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Build a Chapter 81 cable-upsize payback model: I²R loss + operating hours + unit price + incremental cost.',
              'Identify candidate circuits for upsize: sustained-load LCT vs intermittent / low-duty general circuits.',
              'Set voltage-drop margin targets below the Reg 525 floor where payback supports.',
              'Design tariff-aware load shifting: off-peak EV / heat pump / BESS / immersion diverter scheduling.',
              'Integrate the EEMS (Reg 825.1) configuration into the Chapter 81 efficiency design records.',
              'Specify the Chapter 81 post-install monitoring plan: sub-meter points + reporting cadence + year-1 verification.',
              'Verify Chapter 81 design at commissioning alongside Reg 643 Part 6 safety tests.',
              'Scale Chapter 81 design from residential to commercial — same framework, larger payback magnitude.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Chapter 81 is payback-driven, not aspiration-driven. The customer sees the math: cable upsize cost, annual loss saving, payback years. That\'s the rationale.
          </Pullquote>

          <ContentEyebrow>The Chapter 81 cable-upsize payback model</ContentEyebrow>

          <ConceptBlock
            title="The payback model — inputs + calculation"
            plainEnglish="Chapter 81 cable upsize is justified by payback math. Inputs: design current, run length, operating hours per year, cable R/m at operating temperature, unit electricity price, incremental cable + install cost. Calculation: annual I²R loss in kWh × unit price = annual £ saving from upsize; incremental upsize cost / annual saving = payback in years."
            onSite="UK 2025-26 reasonable payback threshold: 5-10 years for residential LCT. Commercial may accept 2-5 years (operational cost focus). Designer records the inputs + math + decision per circuit. Customer sees the rationale + signs off."
          >
            <p>The Chapter 81 payback calculation step-by-step:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Design current I</strong>
                — typical operating current (A). For sustained-load circuits use a
                load-profile-weighted average if available; otherwise use rated /
                design current
              </li>
              <li>
                <strong className="text-white">Run length L</strong>
                — total cable run from origin to load (m). For T+E circuits double
                the line + neutral path doesn\'t double the I²R (loss is per-conductor,
                so 2 × loss for line + neutral OR use combined R per metre)
              </li>
              <li>
                <strong className="text-white">Operating hours per
                  year t</strong> — load-profile-based. Heat pump 5-month heating
                season at 4-6 h/day ≈ 750 h. EV charger 6-8 h/session × 3-5
                nights/week × 50 weeks ≈ 1,200 h. PV daylight at near MPP ≈ 1,000 h
                equivalent
              </li>
              <li>
                <strong className="text-white">Cable resistance R/m</strong>
                — from manufacturer data at operating temperature (typically 70°C for
                70°C-rated cable). UK common: 6 mm² T+E ~3.0 mΩ/m per conductor at
                70°C; 10 mm² ~1.8 mΩ/m; 16 mm² ~1.15 mΩ/m
              </li>
              <li>
                <strong className="text-white">Annual I²R loss</strong>
                — kWh/year = I² × R × L × t / 1000. For two-conductor circuit multiply
                by 2 (line + neutral)
              </li>
              <li>
                <strong className="text-white">Loss difference</strong>
                — annual kWh saving from upsize = (loss at Reg 525 minimum) − (loss at
                Chapter 81 upsize)
              </li>
              <li>
                <strong className="text-white">Annual £ saving</strong>
                — kWh saving × unit price (£/kWh). UK 2025-26 typical residential
                25-30 p/kWh; commercial varied
              </li>
              <li>
                <strong className="text-white">Incremental cost</strong>
                — cable material delta + install labour delta (modest for single CSA
                step). Cert evidence: payback per circuit
              </li>
            </ul>
          </ConceptBlock>

          <Chapter81Verification caption="Chapter 81 is a signpost to energy-efficiency measures you document — not pass/fail tests." />

          <ConceptBlock
            title="Worked case — 32 A heat pump dedicated circuit"
            plainEnglish="Heat pump dedicated 32 A circuit, 25 m run, 25 A average load current, 750 h/year operating hours. Reg 525 minimum CSA 6 mm² T+E (voltage drop ~3.5-4%). Chapter 81 upsize candidate 10 mm² T+E (voltage drop ~2%). I²R loss reduces ~40%. Annual £ saving ~£8-15. Incremental cost ~£40-80. Payback ~4-8 years — within reasonable threshold; Chapter 81 records 10 mm² choice."
            onSite="The math the designer shows the customer. Numbers are illustrative + designer must validate against local cable supplier prices + actual operating profile. UK 2025-26 typical residential ASHP install."
          >
            <p>Heat pump dedicated 32 A — Chapter 81 worked numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Inputs</strong> — design current
                I = 25 A average; run length L = 25 m; operating hours t = 750 h/year;
                unit price 28 p/kWh
              </li>
              <li>
                <strong className="text-white">Reg 525 minimum</strong>
                — 6 mm² T+E. R/m ~3.0 mΩ/m per conductor. Loss = 2 × 25² × 0.003 × 25
                × 750 / 1000 = ~70 kWh/year. £19.6/year at 28 p/kWh
              </li>
              <li>
                <strong className="text-white">Chapter 81 upsize</strong>
                — 10 mm² T+E. R/m ~1.8 mΩ/m per conductor. Loss = 2 × 25² × 0.0018 × 25
                × 750 / 1000 = ~42 kWh/year. £11.8/year at 28 p/kWh
              </li>
              <li>
                <strong className="text-white">Annual saving</strong>
                — £19.6 − £11.8 = £7.8/year. ~28 kWh/year I²R loss avoided
              </li>
              <li>
                <strong className="text-white">Incremental cost</strong>
                — 10 mm² T+E ~£3-4/m material delta over 6 mm²; 25 m run = ~£75-100
                delta; labour delta modest
              </li>
              <li>
                <strong className="text-white">Payback</strong>
                — ~10 years on cable alone. Within UK 2025-26 reasonable threshold
                (5-10 years). Secondary benefit: equipment life, voltage-drop
                headroom, future load capacity
              </li>
              <li>
                <strong className="text-white">Sensitivity</strong>
                — if customer is high-usage (8-9 h/day heating season ≈ 1,200 h/year)
                payback shortens to ~6 years. If unit price rises payback shortens.
                Designer records assumptions
              </li>
              <li>
                <strong className="text-white">Decision</strong>
                — Chapter 81 records 10 mm² T+E choice + rationale. Customer evidence
                bundle: per-circuit table with these inputs + decision
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525 — Voltage drop floor (re-cited for Chapter 81 layering)"
            clause="The voltage at the terminals of any current-using equipment shall be greater than the lower limit corresponding to the relevant product standard. Appendix 4 recommendation: voltage drop from origin to any point should not exceed 3% for lighting, 5% for other uses."
            meaning="Reg 525 is the unchanged safety + correctness floor for voltage drop. Chapter 81 layers efficiency on top — designer typically aims for design voltage drop well below the cap (e.g. 1-2% on sustained-load circuits) where conductor upsize payback supports. Cert evidence bundle: per-circuit voltage-drop calculation showing Reg 525 compliance + Chapter 81 margin where applied. The two regs work together as floor (Reg 525) + upside (Chapter 81). On commissioning, Reg 643 Part 6 verifies the design — voltage drop measurement at functional test confirms the install matches design."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Tariff-aware design + EEMS integration</ContentEyebrow>

          <Pullquote>
            Off-peak is the discount. EEMS is the dispatcher. Chapter 81 is the design that says: schedule the heavy loads to where the electricity costs least.
          </Pullquote>

          <ConceptBlock
            title="Tariff-aware load shifting under Chapter 81"
            plainEnglish="UK 2025-26 time-of-use (TOU) tariffs make off-peak electricity much cheaper than peak. Chapter 81 design schedules controllable loads (EV, heat pump, BESS charging, immersion diverter) to off-peak windows. The EEMS (Reg 825.1) implements the schedule. Designer records the tariff assumption + load-shift schedule + annual £ saving estimate."
            onSite="UK 2025-26 tariff landscape: Octopus Agile (half-hourly variable); Octopus Cosy (heat-pump optimised, three time-bands); Octopus Go (EV-focused night rate 00:30-05:30); British Gas Electric Driver; EDF GoElectric. Off-peak rates 5-12 p/kWh; peak rates 30-40 p/kWh; SEG export rates varied. Designer matches the install to the customer\'s chosen tariff."
          >
            <p>Tariff-aware Chapter 81 design elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">EV charger</strong> —
                scheduled to off-peak window (typical 00:30-05:30 or 23:30-07:30
                depending on tariff). Octopus Go ~7.5 p/kWh off-peak vs ~30 p/kWh
                peak; saving on 3,000 kWh/year EV use ~£675 vs flat tariff
              </li>
              <li>
                <strong className="text-white">Heat pump</strong>
                — Cosy tariff has heat-pump-optimised windows (cheap morning + cheap
                afternoon, peak evening). EEMS or smart-controller schedules
                heat-up pre-peak using thermal mass + lower-cost evening top-up
              </li>
              <li>
                <strong className="text-white">BESS charging</strong>
                — schedule charging to lowest-cost window (typically deep off-peak
                23:30-05:30) + discharge during peak (16:00-19:00). EEMS / BESS
                controller coordinates. Saving on 13 kWh × 365 cycles × tariff
                spread = ~£100-300/year
              </li>
              <li>
                <strong className="text-white">Immersion diverter</strong>
                — diverts excess PV to immersion DHW first (free). Where no excess
                PV, may schedule overnight off-peak top-up via timer / EEMS
              </li>
              <li>
                <strong className="text-white">Export coordination</strong>
                — PV + BESS export when SEG (Smart Export Guarantee) rate is
                favourable. Some tariffs (Octopus Outgoing Agile) pay half-hourly
                variable export; EEMS coordinates discharge to peak SEG window
              </li>
              <li>
                <strong className="text-white">Designer records</strong>
                — tariff identified + load-shift schedule + EEMS configuration +
                annual £ saving estimate vs flat tariff
              </li>
              <li>
                <strong className="text-white">Customer monitoring</strong>
                — sub-meter + smart-meter export wired; customer can see actual
                vs design schedule + £ saving
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — Chapter 81 tariff-aware design section + EEMS (Reg 825.1)
                commissioning sheet
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EEMS integration into Chapter 81 records"
            plainEnglish="The EEMS (Electrical Energy Management System) is defined at Reg 825.1 and managed within the Chapter 82 prosumer installation. Chapter 81 efficiency design integrates the EEMS configuration as part of the rationale — what equipment is coordinated, what schedule, what tariff signal, what load priority. Designer records the EEMS scope + commissioning + customer training."
            onSite="UK 2025-26 EEMS options: manufacturer ecosystems (SolarEdge ONE, Tesla Powerwall app, MyEnergi Eddi / Zappi / libbi, Enphase Enlighten, GivEnergy Cloud) + open-protocol home automation (Home Assistant, openHAB) + dedicated EEMS platforms. Designer chooses based on customer requirements + tariff + LCT mix."
          >
            <p>EEMS scope (Reg 825.1) within the Chapter 81 efficiency design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Coordinated devices</strong>
                — PV inverter, BESS, heat pump controller, EV charger, immersion
                diverter, smart thermostats, smart-meter
              </li>
              <li>
                <strong className="text-white">Tariff signal</strong>
                — smart-meter Time-of-use signal OR cloud API from tariff provider
                (e.g. Octopus API for half-hourly Agile prices)
              </li>
              <li>
                <strong className="text-white">Load priority</strong>
                — customer-set: e.g. self-consume PV first → BESS charge → EV charge
                → export. Or: heating priority → EV priority → export priority
              </li>
              <li>
                <strong className="text-white">Schedule</strong> —
                EEMS computes optimal operation schedule based on PV forecast + load
                forecast + tariff schedule + customer preference
              </li>
              <li>
                <strong className="text-white">Override</strong>
                — customer can override the schedule (manual EV charge now, heat
                boost). EEMS respects override + resumes optimal schedule
              </li>
              <li>
                <strong className="text-white">Monitoring +
                  reporting</strong> — EEMS dashboard / app shows generation + storage +
                consumption + cost; customer-facing efficiency report
              </li>
              <li>
                <strong className="text-white">Commissioning</strong>
                — installer configures EEMS at install; verifies coordinated operation
                across PV / BESS / heat pump / EV; trains customer
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Chapter 81 design records integrate the EEMS scope;
                EEMS (Reg 825.1) commissioning sheet + customer-training acknowledgement
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 825.1 — Electrical Energy Management System (EEMS) within Chapter 82 (Prosumer's LV Installations)"
            clause="The EEMS (Electrical Energy Management System) is defined at Reg 825.1 within Part 8 Chapter 82. It is the control, automation + monitoring layer of the prosumer installation — it coordinates operation of multi-source generation / storage / load equipment, including load shedding and source selection, per the design objectives + customer preferences. The Chapter 81 efficiency design leverages the EEMS to deliver tariff-aware operation."
            meaning="The EEMS (Reg 825.1) is the coordination layer of the prosumer (PEI) installation in Part 8 Chapter 82. It covers: coordinated operation of PV / BESS / heat pump / EV / immersion diverter / smart thermostats / smart-meter; tariff-aware scheduling; load priority; load shedding and source selection (per BS HD 60364-8-1); customer-facing monitoring + reporting. The Chapter 81 efficiency design integrates the EEMS configuration as part of the rationale. M11 §2 focuses on how the Chapter 81 efficiency design leverages the EEMS — they are designed to work together. Cert evidence bundle: efficiency design records + EEMS commissioning sheet + customer-training record + monitoring plan. M10 covered the prosumer EEMS / smart-export framework in depth; M11 references it as the implementation layer for Chapter 81 tariff-aware design."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Monitoring plan + verification chain</ContentEyebrow>

          <ConceptBlock
            title="Chapter 81 post-install monitoring plan"
            plainEnglish="Chapter 81 design includes a monitoring plan — sub-meter / CT clamp points to capture per-component energy use + smart-meter export. Customer sees monthly energy report; year-1 verification confirms actual vs design assumptions. Deviation triggers investigation."
            onSite="UK 2025-26 typical monitoring stack: sub-meter on PV inverter output + BESS in/out + heat pump dedicated + EV charger dedicated; CT clamp on incoming + outgoing smart-meter feed; data-logger / cloud portal; customer app. Year-1 verification compares actual annual kWh per component to design estimate; significant deviation flagged for investigation."
          >
            <p>Monitoring plan structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sub-meter points</strong>
                — per LCT component: PV inverter output kWh; BESS kWh in + out;
                heat pump dedicated kWh; EV charger dedicated kWh; immersion
                diverter kWh (if separate)
              </li>
              <li>
                <strong className="text-white">CT clamp</strong>
                — on smart-meter incoming + outgoing feeds (import + export). Some
                smart meters report export natively
              </li>
              <li>
                <strong className="text-white">Data-logger /
                  portal</strong> — manufacturer cloud (SolarEdge ONE, MyEnergi,
                Enphase, GivEnergy, Tesla) OR open-protocol Home Assistant +
                MQTT
              </li>
              <li>
                <strong className="text-white">Customer app</strong>
                — visualisation: PV daily / monthly / annual; BESS cycle; heat pump
                kWh + SCOP; EV kWh + cost; export £
              </li>
              <li>
                <strong className="text-white">Reporting cadence</strong>
                — monthly customer review + annual verification
              </li>
              <li>
                <strong className="text-white">Year-1
                  verification</strong> — compare actual annual kWh per component to
                Chapter 81 design estimate; significant deviation (&gt;20% typical
                threshold) triggers investigation
              </li>
              <li>
                <strong className="text-white">Investigation
                  triggers</strong> — customer load profile differs from assumption
                (more / less EV use); equipment performance differs from manufacturer
                claim; tariff change; install fault
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Chapter 81 monitoring plan attached to design
                records; year-1 verification report
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The per-circuit Chapter 81 design table"
            plainEnglish="Chapter 81 evidence per circuit is best presented as a design table — circuit name, design current, run length, operating hours/year, Reg 525 minimum CSA, Chapter 81 upsize candidate, R/m, annual loss saving, incremental cost, payback in years, designer decision + rationale. Customer-readable + verifiable."
            onSite="UK 2025-26 typical: 4-12 LCT circuits per residential install (PV DC, PV AC, BESS DC + AC, heat pump, EV charger, immersion diverter, induction hob, cooker, key sustained-load circuits). Plus a general lighting + sockets summary where Reg 525 floor applies. One A4 page per design phase typical."
          >
            <p>Chapter 81 per-circuit table fields:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Circuit name</strong>
                — descriptive (e.g. "Heat pump dedicated"; "EV charger dedicated";
                "PV DC string 1")
              </li>
              <li>
                <strong className="text-white">Design current I (A)</strong>
                — load-profile-based; sustained-current average if available
              </li>
              <li>
                <strong className="text-white">Run length L (m)</strong>
                — origin to load
              </li>
              <li>
                <strong className="text-white">Operating hours / year
                  t (h)</strong> — load-profile estimate based on customer use pattern
              </li>
              <li>
                <strong className="text-white">Reg 525 minimum CSA</strong>
                — calculated for the design voltage-drop cap
              </li>
              <li>
                <strong className="text-white">Chapter 81 upsize
                  candidate</strong> — typically one CSA step above the minimum
              </li>
              <li>
                <strong className="text-white">R/m (Ω/m at 70°C)</strong>
                — from cable manufacturer data
              </li>
              <li>
                <strong className="text-white">Annual loss saving
                  (kWh/year)</strong> — calculated I²R difference × t × 2 (line + neutral)
              </li>
              <li>
                <strong className="text-white">Annual £ saving</strong>
                — kWh × unit price
              </li>
              <li>
                <strong className="text-white">Incremental cost (£)</strong>
                — cable + labour delta for the upsize
              </li>
              <li>
                <strong className="text-white">Payback (years)</strong>
                — incremental cost / annual £ saving
              </li>
              <li>
                <strong className="text-white">Designer decision</strong>
                — upsize / no upsize + brief rationale
              </li>
              <li>
                <strong className="text-white">Customer evidence</strong>
                — table signed off + attached to EIC
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3 — Verification of insulation resistance (redrafted in A4:2026)"
            clause="Reg 643.3 has been redrafted. The requirements for testing insulation resistance where equipment is likely to influence the verification test or be damaged has been clarified and reference is made to a 250 V DC test following the connection of equipment."
            meaning="Reg 643.3 is the IR (insulation resistance) test requirement, redrafted in A4:2026. The redraft clarifies how to handle equipment that might influence or be damaged by the standard 500 V DC IR test (typical with electronics — PV inverters, BESS, EV chargers, heat pump VSD electronics). The redraft references a 250 V DC follow-on test after equipment connection to confirm IR remains acceptable without risking equipment damage. For Chapter 81 verification at commissioning, this matters because LCT installs always have multiple electronics-rich loads. Reg 643 Part 6 sequence: initial 500 V DC IR before equipment connection → connect equipment → 250 V DC follow-on test → record both. Cert evidence bundle: schedule of test records both IR readings. M11 §8 covers the full commissioning chain integration."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <Scenario
            title="Residential retrofit — Chapter 81 design for full LCT package"
            situation="Existing 1980s semi-detached home, customer adding 6 kWp PV + 10 kWh BESS + 7 kW ASHP + 7 kW EV charger + Octopus Cosy tariff. Existing 100 A single-phase supply (DNO confirmed). Post-A4:2026 install — Chapter 81 evidence required. UK 2025-26."
            whatToDo="Chapter 81 per-circuit design pass: (1) Heat pump dedicated 32 A circuit — 20 m run. Reg 525 min 6 mm² T+E (voltage drop ~3%). Chapter 81 upsize to 10 mm² T+E. 750 h/year × 25 A avg × (6 mm² vs 10 mm² R/m) = ~22 kWh/year saving × 27 p/kWh = £6/year. Incremental ~£60. Payback 10 years. Marginal — record both options; customer decides. Choose 10 mm² for headroom + future use. (2) EV charger 32 A — 15 m run. Reg 525 min 6 mm² T+E. Chapter 81 upsize to 10 mm² T+E. 1,200 h/year × 30 A × R/m difference = ~38 kWh/year × 7.5 p/kWh (Cosy off-peak EV charge) = £2.85/year direct + voltage-drop benefit. Marginal payback alone — but voltage-drop margin matters at 32 A draw. Choose 10 mm². (3) PV DC string — 12 m run, 9 A string. 4 mm² PV-DC selected per Reg 712.521.1041 + sized per Reg 712.433.103 (Iz ≥ array max DC current) + manufacturer. Chapter 81 upsize to 6 mm² — modest yield improvement ~15-30 kWh/year × 15 p/kWh (PV self-consumption avg value) = £3-5/year. Payback marginal; record both options. (4) BESS DC + AC — manufacturer-specific cable; designer follows DoC. Modest Chapter 81 upsizing if economic. (5) Immersion diverter — existing 16 A circuit; Chapter 81 floor sufficient. (6) Cooker + induction hob — intermittent peak; Reg 525 floor. Tariff-aware: EEMS coordinates EV + BESS to off-peak Cosy window; heat pump on Cosy heat-pump windows; immersion diverter on PV excess. Monitoring: sub-meter per LCT + CT clamp on smart-meter; customer app. Annual energy estimate: PV ~5,200 kWh; BESS round-trip 92%; heat pump SCOP 3.4 ≈ 6,400 kWh heat from 1,880 kWh elec; EV 3,000 kWh/year. Year-1 verification target. Cert evidence: Chapter 81 design table + EEMS commissioning + monitoring plan + EIC."
            whyItMatters="Real residential UK 2025-26 install. Chapter 81 doesn\'t mean upsize everything — it means model payback per circuit + record the choice. Some circuits comfortably upsize; some are marginal; some stay at Reg 525 floor. The customer sees the math + signs off. Cert evidence bundle differentiates a Chapter 81 install from a pre-A4:2026 install. EEMS configuration (Reg 825.1) is the implementation layer; EEMS commissioning sheet attached."
          />

          <Scenario
            title="Commercial leisure centre — 50 kW PV + 100 kWh BESS + ASHP + EV fleet"
            situation="Local authority leisure centre. Existing 100 kVA three-phase. Adding: 50 kWp roof PV array; 100 kWh BESS; 50 kW central ASHP (pool + space); 8 × 7 kW EV chargers (fleet vehicles); Chapter 82 PEI. Commercial tariff with capacity charges + TNUoS / DUoS exposure. Post-A4:2026 install."
            whatToDo="Commercial Chapter 81 scales. (1) PV DC + AC — multiple strings + central inverter; cable upsize on long DC runs likely pays back quickly (high sustained current × full daylight hours × commercial unit value 15-25 p/kWh self-consumed). (2) BESS DC + AC — round-trip efficiency optimisation; cable upsize on power-rated cables (BESS can deliver 50-100 kW peak) reduces I²R + supports capacity charge management. (3) Heat pump dedicated — 80-125 A circuit; sustained commercial duty. Cable upsize one or two steps typical payback 2-4 years. (4) EV fleet charging — 8 × 32 A on dedicated submain; cable upsize on submain reduces fleet-wide losses. (5) Tariff-aware design — EEMS schedules BESS charge + EV charge during low-DUoS / low-cost windows; PV self-consumption priority; export when SEG / commercial rate favourable. Capacity charge management critical. (6) Per-circuit design table covers ~15-25 LCT + sustained-load circuits. (7) Monitoring stack — building management system (BMS) integrating PV + BESS + heat pump + EV + smart-meter feed. (8) Cert evidence bundle — Chapter 81 efficiency design + Chapter 82 PEI architecture + EEMS (Reg 825.1) / BMS commissioning + Reg 643 verification + commercial EIC. ~10-20 pages typical."
            whyItMatters="Commercial Chapter 81 = same framework, larger numbers, faster payback. Commercial customers typically demand operational cost reduction; Chapter 81 design provides the evidence. Building Regs Part L compliance + EPC re-assessment + grant documentation (where applicable) all reference the Chapter 81 records. Multi-document handover; designer / installer owns the BS 7671 layer. EICR scope in 5 years verifies safety + reviews Chapter 81 records for consistency."
          />

          <CommonMistake
            title="Treating Chapter 81 as a checkbox without the math"
            whatHappens={`Installer writes "Chapter 81 compliant" on the EIC but no design table + no payback model + no monitoring plan. Customer / inspector / future EICR can't verify what was designed. Compliance is in name only.`}
            doInstead={`Chapter 81 evidence is the math + records, not the label. Per-circuit design table; payback model with inputs + assumptions; EEMS commissioning sheet; monitoring plan; year-1 verification trigger. Cert evidence bundle attaches the records to the EIC. Customer + future inspector can see what was designed + why. If you can't produce the table, you can't claim Chapter 81 compliance.`}
          />

          <CommonMistake
            title="Designer assumptions disconnected from actual customer use"
            whatHappens="Chapter 81 design assumes 4 h/day heat pump operation; actual customer is empty 5 days/week (holiday home) — design is over-engineered. Or design assumes 500 h/year EV; actual customer drives 30,000 miles/year (12,000 kWh/year EV). Year-1 monitoring shows large deviation; design integrity questioned."
            doInstead="Designer engages customer for honest load-profile + use-pattern conversation at design stage. Customer should size + plan the install for their actual use, not a generic assumption. Chapter 81 design records the customer\'s use pattern + the assumptions used. Year-1 monitoring verifies; if deviation, designer + customer review + may update records. Honest framing avoids over- or under-design."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Chapter 81 cable-upsize design is payback-driven. Model annual I²R loss + unit price + incremental cable cost; reasonable payback threshold UK 2025-26 is 5-10 years for residential, 2-5 years for commercial.',
              'Upsize candidates: heat pump + EV charger + BESS + PV + immersion diverter + commercial sustained-load. General lighting + intermittent sockets rarely justify upsizing.',
              'Voltage-drop margin below Reg 525 cap is a measurable Chapter 81 outcome — design margin records the efficiency intent.',
              'Tariff-aware load shifting: schedule EV + heat pump + BESS + immersion to off-peak windows. UK 2025-26 typical Octopus Cosy / Go / Agile + others.',
              'The EEMS (Reg 825.1) implements the schedule. Chapter 81 records the EEMS configuration as part of the efficiency rationale.',
              'Per-circuit Chapter 81 design table: circuit, I, L, t, Reg 525 minimum, upsize, R/m, kWh saving, £ saving, cost, payback, decision. Customer-readable.',
              'Monitoring plan: sub-meter per LCT component + CT clamp on smart-meter + year-1 verification trigger.',
              'Commissioning verification: Reg 643 Part 6 safety tests + Chapter 81 efficiency verification. Both attached to EIC. Reg 643.3 redrafted in A4:2026 for IR test sequence around electronics.',
              'Commercial sites scale the framework — same model, larger numbers, faster payback, more circuits.',
              'Cert evidence bundle: Chapter 81 per-circuit design table + EEMS commissioning sheet + monitoring plan + customer handover.',
              'Honest customer framing: design records the assumptions + customer signs off + year-1 verification confirms.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.1 A4:2026 Chapter 81 landscape
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.3 BS EN 62305-1 / -2 lightning framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
