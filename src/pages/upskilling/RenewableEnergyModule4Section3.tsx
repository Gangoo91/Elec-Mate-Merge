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
    id: 'm4s3-when-needed',
    question:
      'A UK rural off-grid PV install (5 kWp + 25 kWh battery, design autonomy 3 days). When is generator backup recommended?',
    options: [
      'Never',
      "For full-year occupation in regions with low December PSH (typically Scotland, Northern Ireland, North Wales, upland Lakes/Pennines). Recommended whenever: (a) load is critical (medical equipment, vulnerable resident); (b) winter cloud cover routinely exceeds the design autonomy (5-7+ consecutive cloud days happens in UK winters); (c) customer can't accept any outage. Optional for seasonal / holiday properties where customer accepts winter shutdown",
      'Always required',
      'Only for commercial',
    ],
    correctIndex: 1,
    explanation:
      'UK winter weather can deliver 5-7+ consecutive low-PSH days, exceeding the typical 3-5 day battery autonomy. A generator gives the install resilience against worst-case weather without oversizing PV + battery beyond economic reason. The generator runs occasionally — typically 10-50 hours/year total for a well-sized PV+battery install. For installs where outage is unacceptable (medical, security, vulnerable), generator is essentially mandatory. For seasonal cottages, customer often accepts the risk.',
  },
  {
    id: 'm4s3-fuel-choice',
    question:
      'Off-grid backup generator — diesel vs petrol vs LPG. Which is most common in UK rural off-grid, and why?',
    options: [
      'Petrol everywhere',
      'Diesel and LPG dominate UK rural off-grid. Diesel: high energy density, long shelf life (12+ months in suitable tank), reliable cold-weather starting with glow plugs, low cost per kWh produced. LPG: clean burning, less storage hazard than diesel for indoor / domestic settings, longer fuel shelf life (years), but lower energy density than diesel. Petrol is rare — short fuel shelf life (3-6 months), volatile storage hazard, and cold-start issues',
      'Battery only',
      'Wood-burning',
    ],
    correctIndex: 1,
    explanation:
      "UK off-grid generator fuel choice: DIESEL is the dominant choice — high energy density, long shelf life (with stabiliser, 12-24 months), reliable in winter cold (with glow plug systems), well-established service network. LPG is the second choice — cleaner burning, suitable for indoor / near-building installation, fuel doesn't degrade like diesel. PETROL is the third choice but rare for off-grid backup — short fuel shelf life (3-6 months with stabiliser), more volatile storage, harder cold start. Generator selection: 5-10 kVA typical UK off-grid; brands like Pramac, Honda, Yamaha, Cummins are common.",
  },
  {
    id: 'm4s3-auto-start',
    question:
      'Off-grid generator auto-start logic — what triggers the generator to start automatically, and what stops it?',
    options: [
      'Customer presses a button',
      'Auto-start trigger: battery state-of-charge (SoC) drops below a threshold (typically 20-30% SoC for LFP installs); or battery voltage drops below a threshold (low-V protection backup). Auto-stop: SoC reaches a target charge level (typically 70-90% — partial charge to leave headroom for PV); or after a maximum run-time limit; or on fault detection. Modern hybrid inverters (Victron, Studer, Sigenergy) have built-in auto-gen control via their Cerbo / Xcom / Sigen apps',
      'Random timer',
      'No automation',
    ],
    correctIndex: 1,
    explanation:
      "Off-grid auto-start typically driven by battery SoC: start at 20-30% SoC; stop at 70-90% SoC (not 100% — leave headroom for any PV that's producing during the day, otherwise the PV would have nothing to charge into). Modern systems (Victron Cerbo GX with auto-gen-start; Studer Xcom-GSM; Sigenergy SigenStor) also support trigger by: low battery voltage (backup safety); load too high for inverter alone (assisted-output mode); scheduled exercise run; manual start. Customer's app shows real-time status; cert evidence bundle records the configured thresholds.",
  },
  {
    id: 'm4s3-ats-panel',
    question:
      'Automatic Transfer Switch (ATS) panel — what does it do in an off-grid install with generator backup?',
    options: [
      'Nothing',
      'The ATS is the electrical switch that transfers the property load between the inverter output (PV+battery primary) and the generator output (backup). When the generator starts, ATS senses generator V/freq stable, transfers load from inverter to generator. When generator stops, ATS transfers back to inverter. In integrated hybrid inverters (Victron Multiplus, Studer Xtender), the ATS function is INSIDE the inverter — no separate ATS panel needed. In split installs with separate inverter + generator, an external ATS panel is fitted',
      "Customer's phone",
      'A type of MCB',
    ],
    correctIndex: 1,
    explanation:
      'ATS (Automatic Transfer Switch) handles the load-transfer between inverter (PV+battery) and generator. Modern integrated hybrid inverters have ATS built in: AC-IN port connects to generator; AC-OUT port connects to property loads. The inverter handles the synchronisation, transfer, and charging logic internally. For installs with discrete inverter + generator (older / custom builds), an external ATS panel is fitted — typically a contactor-based panel that monitors both sources and switches the load. The cert evidence bundle records the ATS configuration.',
  },
  {
    id: 'm4s3-charge-stages',
    question:
      'When the generator is running, it both supplies the property load AND charges the battery. What are the three charging stages?',
    options: [
      'No stages',
      '(1) BULK — generator at maximum charge current, raises battery SoC quickly; (2) ABSORPTION — battery V at the absorption setpoint, current tapers as battery approaches full; (3) FLOAT — maintain V at float setpoint with minimal trickle current for any standby load. For LFP batteries, the stages compress (no float stage typically; absorption is brief); for lead-acid, the stages are traditional and well-defined. Hybrid inverter / charge controller handles the stage transitions automatically',
      'Just one',
      'Hundred stages',
    ],
    correctIndex: 1,
    explanation:
      'Three-stage charging is the standard battery-charge profile: BULK (fast charge at constant current until V reaches absorption setpoint); ABSORPTION (constant V at absorption setpoint, current tapers naturally as battery fills); FLOAT (low maintenance V at float setpoint to compensate for self-discharge). For LFP / Li-ion: stages compress — bulk continues until ~90% SoC, brief absorption, no float (LFP self-discharge is very low). For lead-acid: traditional three stages, with absorption typically 15-20% above float V. The hybrid inverter / charge controller manages stages automatically via the BMS interface.',
  },
  {
    id: 'm4s3-section-551',
    question:
      'How does BS 7671 Section 551 (generating sets) apply to an off-grid PV install with generator backup?',
    options: [
      "Doesn't apply",
      "Section 551 applies to BOTH the PV+battery generating set (Reg 551.1.1(d) PV + (e) batteries) AND the diesel/LPG generator (551.1.1(a) combustion engines). Reg 551.2.2: prospective short-circuit / earth fault assessed for each source / combination. Reg 551.2.3: capacity / operating characteristics handle each source's load + V/freq protection. Reg 551.4.1: fault protection for each source. Reg 551.6: precautions against parallel operation between sources where parallel is not intended (typical off-grid: ATS transfers load, never parallels grid and gen)",
      'Only one applies',
      "Customer's choice",
    ],
    correctIndex: 1,
    explanation:
      'Section 551 covers ALL generating sets — PV + battery AND combustion engines. For an off-grid install with both, the regs apply per source AND per combination. Reg 551.2.2 fault-current assessment; Reg 551.2.3 V/freq protection; Reg 551.4.1 fault protection per source. Reg 551.6: where the generator switches as a backup (not in parallel with the inverter), the ATS ensures the two never operate in parallel — preventing reverse power flow into the inverter. For installs where the generator runs in parallel with the inverter (assisted-output mode), Reg 551.7 parallel-operation requirements apply. Cert evidence bundle records the chosen operating mode.',
  },
  {
    id: 'm4s3-noise-emissions',
    question:
      'Off-grid generator considerations beyond electrical safety — what UK regulatory framework applies?',
    options: [
      'None',
      'Multiple frameworks: (a) Noise — UK domestic noise nuisance law via Environmental Protection Act 1990; local council bylaws on permitted hours; typical limits 50-55 dB at boundary 3am-7am, 60-65 dB daytime; (b) Emissions — Air Quality (Standards) Regulations 2010; some areas have smoke-control zones restricting diesel/wood burning; (c) Fuel storage — Petroleum (Consolidation) Regulations 2014 for petrol; HSE guidance for diesel; (d) Planning — generator enclosures may need planning permission if visible / large',
      "Customer's discretion",
      'No regulations',
    ],
    correctIndex: 1,
    explanation:
      'Off-grid generators have non-electrical regulatory considerations: NOISE — Environmental Protection Act 1990 + local council bylaws; typical noise limits at property boundary 50-55 dB nighttime, 60-65 dB daytime; modern silenced canopy generators achieve ~50-55 dB at 7m. EMISSIONS — Air Quality (Standards) Regulations 2010; some smoke-control areas restrict diesel/wood; modern Stage V diesel engines (UK 2025-2026 emissions standard) meet most requirements. FUEL STORAGE — diesel typically OK in bunded tank near building; petrol restricted by Petroleum Consolidation Regulations 2014. PLANNING — large generator enclosures may need permission. Customer / installer responsibility; cert evidence bundle records compliance assessments.',
  },
  {
    id: 'm4s3-paralleling',
    question:
      'Some hybrid inverters support "PowerAssist" mode — running the generator in PARALLEL with the inverter to handle peak loads. What\'s the BS 7671 regulatory implication?',
    options: [
      'No issue',
      'Reg 551.7 parallel-operation rules apply when the generator runs in parallel with the inverter (as opposed to switched-alternative via ATS). Reg 551.7.1(c) NEW A4:2026: bidirectional protective device required where energy flow is bidirectional. Reg 551.7.2.1: stationary batteries (Chapter 57) shall be considered a generating set not a load. The cert evidence bundle records the PowerAssist configuration and the protective devices selected per Section 551.7',
      'Only one direction',
      'No regs apply',
    ],
    correctIndex: 1,
    explanation:
      'PowerAssist (Victron) / Quick Assist (similar): hybrid inverter parallels with the generator to handle short-duration peak loads (e.g. kettle + heat pump startup). The generator + inverter both supply the load momentarily. Reg 551.7 applies — additional requirements for installations where the generating set operates in parallel with other sources. Reg 551.7.1(c) (NEW A4:2026): bidirectional protective device required where energy can flow either way. The Reg 551.7.1(c) device sits between the inverter and the generator AC input. The cert evidence bundle records the mode, the protective devices, and any V/freq trip parameters per Reg 551.7.4-6.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Off-grid customer's 5 kWp PV + 25 kWh LFP battery system. Daily load 6 kWh. December PSH 1.0. Worst-case 7 consecutive cloudy days expected once per winter. Generator sizing recommendation?",
    options: [
      '20 kVA',
      '5 kVA — enough to fully recharge the battery within reasonable run-time + supply the property load during charge. Worked: bulk charging needs ~3-4 kW continuous to fast-charge 25 kWh LFP within 6-8 hours; property load 0.5-1.0 kW typical; generator output 4-5 kW continuous handles both. Brand: Pramac, Cummins, Honda EU65 with silenced canopy. Auto-start tied to battery SoC threshold (e.g. start at 20% SoC, stop at 80%). Fuel: diesel preferred',
      '0.5 kVA',
      '100 kVA',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid generator sizing: typically 1× to 1.2× the typical battery charge power + property load. For 25 kWh LFP battery wanting full recharge in 6-8 hours: 25/7 = 3.6 kW charge power. Plus property load 0.5-1.0 kW concurrent. Total 4-5 kW continuous generator output. 5 kVA generator (typical UK rural off-grid choice) at 80% derating = 4 kW continuous — adequate. Smaller (3 kVA) struggles to handle the load + charge concurrently; larger (10 kVA) overspecified, runs at low load (poor fuel efficiency, glazing risk on diesel). Cert evidence bundle records sizing rationale.',
  },
  {
    id: 2,
    question:
      "Off-grid generator runs for 2 hours during deep winter to recharge battery. Customer asks why generator doesn't fully charge to 100% SoC.",
    options: [
      'Generator faulty',
      "Auto-stop typically configured at 70-90% SoC (NOT 100%). Reason: the battery should retain HEADROOM to absorb any PV that's generating during the day. If charged to 100% by generator, any PV produced thereafter has nowhere to go and is wasted. By stopping at ~80% SoC, the system leaves room for PV to charge the battery to 100% later — maximising PV utilisation, minimising generator runtime. Cert evidence bundle records the threshold setting",
      'Battery is broken',
      "Customer's fault",
    ],
    correctAnswer: 1,
    explanation:
      "Generator auto-stop at partial SoC is INTENTIONAL — leaves headroom for PV. Stop at 100% means PV produced after generator-stop is wasted (battery can't absorb). Stop at 80% means PV produced afterwards charges the battery from 80% → 100%, capturing free solar energy. Trade-off: stopping too low (e.g. 60%) wastes generator efficiency (lots of generator runtime needed to top up); stopping too high (e.g. 95%) wastes solar capture. 70-90% is the typical sweet spot, location-dependent. Customer-configurable per the inverter app; cert evidence bundle records.",
  },
  {
    id: 3,
    question:
      "Off-grid install with diesel generator. Customer reports the generator won't start in cold January morning. Diagnosis priority?",
    options: [
      'Replace generator',
      'Diesel cold-start issues are common in UK winter. Diagnostic priority: (1) battery health — cranking battery (separate from the off-grid PV battery) may be low / sulfated; (2) glow plug system — pre-heat may be failing; (3) fuel quality — diesel "waxing" in extreme cold (-5°C and below) clogs filter; winter-grade diesel or anti-waxing additive needed; (4) air filter blockage; (5) coolant level. Replace generator only after diagnostic. Most issues fix-able with simple maintenance',
      'Buy new battery',
      "Customer's fault",
    ],
    correctAnswer: 1,
    explanation:
      'UK diesel cold-start diagnostic: (1) START BATTERY — generators have a separate small starter battery (12V or 24V) for cranking; it ages and sulfates over 3-5 years; load-test it; replace if marginal. (2) GLOW PLUGS — pre-heat the diesel before start; failing glow plugs make cold start impossible; test resistance; replace per service interval. (3) FUEL — diesel "waxing" at -5°C and below (UK winter rare but possible in N Scotland); winter diesel grades are pre-treated; aftermarket anti-wax additives available. (4) FILTERS — air + fuel + oil; service per schedule. Maintenance log in customer information pack; cert evidence bundle records the diagnostic.',
  },
  {
    id: 4,
    question:
      'Off-grid generator runs for the first time in 6 months (rare backup use). Customer reports generator runs rough and exhaust smoke is excessive. Likely cause?',
    options: [
      'Generator broken',
      'Diesel fuel degradation. Diesel left in tank for 6+ months without use can accumulate water (condensation), microbial growth ("diesel bug"), or oxidation. Symptoms: rough running, smoke, hard start. Resolution: drain old fuel; replace fuel filters; refill with fresh diesel + fuel stabiliser; consider fuel polishing for large tanks. Preventive: run generator under load monthly (exercise run, typically 30 min) to cycle fuel through; use fuel stabiliser; bunded tank with drain to remove water condensation',
      'New customer',
      'Always like this',
    ],
    correctAnswer: 1,
    explanation:
      'Diesel fuel degradation in long-storage is a real off-grid issue. Mechanisms: (a) WATER condensation from temperature cycling — collects at tank bottom, freezes in winter, blocks fuel system; (b) MICROBIAL "diesel bug" — bacteria/fungi grow at the water/fuel interface, secreting acids; (c) OXIDATION — diesel polymerises into gum that clogs filters and injectors. Mitigation: monthly exercise run under load; fuel stabiliser (e.g. Stabil Diesel Plus, Power Service Diesel Fuel Supplement); bunded tank with low drain to remove water; annual fuel polishing for large tanks (>500L). Modern winter-blend diesel keeps better than summer-blend.',
  },
  {
    id: 5,
    question:
      "Customer's off-grid generator runs in PowerAssist parallel mode with the Victron Multiplus inverter. EICR-style inspection. What additional BS 7671 regs apply?",
    options: [
      'Same as switched-alternative',
      "Reg 551.7 parallel-operation requirements: Reg 551.7.1(c) NEW A4:2026 bidirectional protective device required where energy flow is bidirectional (the protective device must operate in either direction); Reg 551.7.4 automatic disconnection on V/freq deviation; Reg 551.7.5 prevent connection during loss/deviation; Reg 551.7.6 means of isolation. The inverter's built-in transfer/parallel logic typically handles these; the cert evidence bundle records the inverter manufacturer's compliance statement against Reg 551.7",
      'No regs apply',
      'Only the inverter',
    ],
    correctAnswer: 1,
    explanation:
      'PowerAssist parallel mode triggers Reg 551.7 parallel-operation requirements. Critical additions: Reg 551.7.1(c) NEW A4:2026 — bidirectional protective device (current can flow either way during PowerAssist; the protective device must operate in either direction). Reg 551.7.4-6: V/freq protection, disconnect on loss/deviation, means of isolation. Victron / Studer / Sigenergy hybrid inverters provide compliance through their internal transfer/parallel logic; cert evidence bundle records the manufacturer compliance statement and the as-configured mode.',
  },
  {
    id: 6,
    question:
      'Off-grid customer asks "can the generator backup itself supply our heat pump for prolonged cold weather?". Heat pump 8 kW electrical, 3 kW continuous typical operation, 6 kW peak.',
    options: [
      'Always',
      'Yes — if generator sized adequately. Heat pump 3 kW continuous + property baseline 0.5 kW + battery charging 2 kW = ~5.5 kW continuous. Generator 7-8 kVA (~5.5-6.5 kW continuous at 80% derating) handles this. Generator runs continuously through the cold spell (potentially days of operation). Fuel consumption: ~1-1.5 L/hr for 6-8 kW diesel generator at typical loading = 24-36 L/day; tank size needs to support 5-7 day cold spells. Cert evidence bundle records the cold-spell design scenario',
      'Never',
      'Magic',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid generator + heat pump cold-spell scenario: typical sizing 7-10 kVA generator (5.5-8 kW continuous at 80% derating) handles heat pump 3 kW continuous + property baseline + battery top-up concurrently. The generator essentially becomes the prime mover during prolonged cold weather (PV producing minimally in cloud/short days). Fuel: diesel consumption 1-1.5 L/hr at 6-8 kW load = 24-36 L/day. Tank sizing for worst case: 5-7 day cold spell × 30 L/day = 150-210 L tank needed. The design pack records the cold-spell scenario assumption and the tank sizing rationale.',
  },
  {
    id: 7,
    question:
      'Off-grid generator wiring — what BS 7671 Section 551 / 712 / 537 isolation requirement applies?',
    options: [
      'No isolation needed',
      'Reg 551.2.4: provision for isolation per Chapter 46 + Section 537 for EACH source / combination of sources. Reg 551.4.3.3.3: where static convertor (inverter) is part of the install, means of isolation on BOTH SIDES (DC and AC). For generator: separate isolator at the generator output AC terminals (BS EN 60947-3 switch-disconnector). The ATS panel itself provides switching but separate isolation per source is mandatory for safe maintenance work',
      "Customer's choice",
      'Only one isolator',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 isolation discipline for off-grid: Reg 551.2.4 — isolation per Chapter 46 + Section 537 for EACH source / combination. Practical implementation: (a) generator AC output isolator — BS EN 60947-3 switch-disconnector with adequate ratings; (b) inverter AC input/output isolators (per Reg 551.4.3.3.3 for static convertors); (c) battery DC isolator (Reg 712 + Chapter 57 for BESS — Module 5); (d) ATS isolator if separate from inverter. Cert evidence bundle records each isolator location, brand, model, and ratings. Maintenance can isolate each source independently for safe work.',
  },
  {
    id: 8,
    question:
      "Off-grid customer's generator: 5 kVA Pramac diesel, used 4 hours/month average. Maintenance schedule recommendation?",
    options: [
      'No maintenance',
      'Service intervals per manufacturer (Pramac typical): oil + filter change every 100-200 hours OR annually; air filter every 200-400 hours OR annually; fuel filter every 200 hours; battery test annually; spark arrestor / muffler check annually; coolant change every 2-3 years; fuel polishing if tank ≥500L. At 48 hours/year usage, time-based (annual) intervals are the binding constraint. Customer / contractor maintenance log records each service. The cert evidence bundle includes the maintenance schedule',
      'Every day',
      "Customer's preference",
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid generator maintenance: typical interval whichever comes first — hour-based OR time-based. For LIGHT USE (4 hrs/month = 48 hrs/year): ANNUAL service is the binding interval; oil/filter change at year 1 or 100-200 hours; air filter year 1 or 200-400 hours; fuel filter year 1 or 200 hrs. Spark arrestor cleaning, coolant level check, battery test, glow plug test — annual. Coolant change every 2-3 years. Modern Stage V emissions generators have additional emissions-system checks. Customer informed of schedule; maintenance log in customer information pack; cert evidence bundle records the contractor agreement.',
  },
];

const faqs = [
  {
    question: 'How loud are off-grid backup generators in practice?',
    answer:
      "Modern silenced canopy diesel generators (Pramac, Cummins, Honda) achieve ~50-55 dB at 7m — quieter than typical urban traffic. UK domestic noise limits at property boundary: 50-55 dB nighttime, 60-65 dB daytime per local council bylaws + Environmental Protection Act 1990. Practical mitigation: site generator 5-10m from neighbouring properties; acoustic enclosure around the generator (additional 5-10 dB attenuation); planted screening; ventilation that doesn't compromise acoustic performance. Cert evidence bundle records the as-installed noise assessment.",
  },
  {
    question: 'What fuel storage volume is typical for UK off-grid?',
    answer:
      'Typical UK off-grid generator fuel tank: 100-500 L diesel in a bunded tank (sized for ~3-7 days continuous operation + safety margin). 100 L lasts 3-4 days at typical 4-hour/day backup usage; 500 L lasts 2-3 weeks of continuous heat-pump-cold-spell operation. Tank options: integrated tank in the generator skid (typically 30-100 L); separate bunded tank (100-1,000 L, fixed near generator with delivery line); customer fuel arrangement (deliveries scheduled). Larger tanks need planning approval and HSE COMAH consideration for >50 tonnes.',
  },
  {
    question: 'How does the off-grid generator integrate with the PV+battery autonomy calculation?',
    answer:
      'With generator backup, the autonomy days calculation changes: instead of "battery must support load for X days with no input", the design accepts a worst-case generator-supported scenario. Typical UK approach: PV+battery sized for 3-5 day autonomy + generator covers anything beyond that. Customer accepts: in worst-case weather (5-7+ cloud days), generator runs as needed; outside that, generator stays off (months at a time). Cert evidence bundle records the design assumption — battery autonomy days + expected annual generator runtime.',
  },
  {
    question: 'Do I need planning permission for an off-grid generator?',
    answer:
      'Depends on size and location. UK permitted development rights typically cover small generators (≤10 kVA, suitably housed) on existing curtilage. Larger installs (>10 kVA, separate plant building, fuel tanks >500L) typically need planning permission. Smoke control areas restrict diesel — check local council bylaws. Noise + visual impact assessments may be required. Cert evidence bundle records the planning approval or permitted-development assessment.',
  },
  {
    question: 'What about cold-cranking battery for the generator itself?',
    answer:
      'Off-grid generators have a separate small starter battery (typically 12V or 24V) for engine cranking — independent from the off-grid PV battery. This battery: cycles when generator runs; recharges from generator alternator after start; ages over 3-5 years; sulfates if left undischarged too long. Maintenance: monthly exercise run keeps it cycled; load-test annually; replace at signs of sulfation. The off-grid PV battery should NOT be used for generator cranking (different chemistry, different charge profile, different replacement schedule).',
  },
  {
    question: 'How does the off-grid generator coexist with PV during the day?',
    answer:
      'Two modes: (1) Generator OFF, PV charging battery — normal sunny-day operation. (2) Generator ON, charging battery, PV also charging — generator+PV combine to fast-recharge after low-PV periods. Modern hybrid inverters (Victron Multiplus, Studer Xtender, Sigenergy SigenStor) handle the combined charging: PV first (free energy), generator topping up where needed. Generator stops once battery hits the configured threshold (typically 70-90% SoC) to leave headroom for PV.',
  },
  {
    question: 'Can I use the generator to supply EV charging directly?',
    answer:
      'Technically yes — but inefficient. The generator generates electricity from diesel (~30% efficiency on a modern diesel); the EV converts AC back to DC battery charge (~90% efficiency); net ~27% efficiency from diesel to EV battery. For comparison, off-grid PV→battery→EV is ~75-80% efficient (free PV input). The generator route makes sense only when PV is consistently insufficient AND EV charging is essential (e.g. rural off-grid working remotely with EV daily commute). Most off-grid customers prioritise PV+battery for EV; generator for emergency backup only.',
  },
  {
    question: "What's the typical operating cost of off-grid generator backup?",
    answer:
      'UK 2025-2026: diesel ~£1.40-1.60/L. Modern 5 kVA generator consumes ~1.0-1.5 L/hr at full load. So fuel cost per kWh produced: roughly £0.30-0.50/kWh — much higher than UK grid import (~£0.28/kWh). Generator is INSURANCE, not primary supply — used a few tens of hours per year, totalling £100-500/year fuel cost. Plus maintenance £150-400/year. Total ownership: ~£250-900/year for typical UK rural off-grid backup generator. The economic case is "outage avoidance" — quantified against the cost of unreliable supply for the customer.',
  },
  {
    question: 'How does PAS 63100 (UK BESS standard) interact with off-grid + generator?',
    answer:
      'PAS 63100:2024 (Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings) is the UK BESS-specific standard. For an off-grid install with BESS + generator: PAS 63100 covers the BESS installation (battery placement, ventilation, fire safety, BMS integration); BS 7671 Section 712 covers the PV side; BS 7671 Section 551 + Chapter 57 cover the generating-set + BESS interaction; manufacturer specs cover the integrated inverter/charger. Cert evidence bundle records compliance against all four sources. Module 5 covers BESS / PAS 63100 / Chapter 57 in depth.',
  },
];

export default function RenewableEnergyModule4Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Off-grid backup & generator integration | Renewable Energy 4.3 | Elec-Mate',
    description:
      'Off-grid PV install backup — diesel / LPG / petrol generator selection, auto-start logic, ATS panels, three-stage charging, BS 7671 Section 551 generating-set regs, noise / emissions / fuel storage frameworks, and the cold-weather sizing for heat pump load.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · BS 7671:2018+A4:2026"
            title="Off-grid backup & generator integration"
            description="Diesel / LPG / petrol generator selection, auto-start logic, ATS panels, three-stage charging, BS 7671 Section 551 generating-set regs, noise / emissions / fuel storage frameworks, and the cold-weather sizing scenario."
            tone="yellow"
          />

          <TLDR
            points={[
              'Generator backup recommended for full-year UK off-grid installs (extended winter cloud periods routinely exceed typical 3-5 day battery autonomy). Critical loads (medical, security, vulnerable customer) make generator effectively mandatory.',
              'Fuel choice: DIESEL dominant (high energy density, long shelf life with stabiliser, cold-weather start). LPG second (cleaner burning, indoor-safe). Petrol rare (short shelf life, volatile, cold-start issues).',
              'Auto-start logic: trigger on battery SoC below threshold (typically 20-30%); stop at higher threshold (typically 70-90% — leaves PV headroom). Modern hybrid inverters (Victron, Studer, Sigenergy) have built-in generator-start control.',
              'ATS (Automatic Transfer Switch): transfers load between inverter (PV+battery) and generator (backup). Modern hybrid inverters have built-in ATS — no separate panel needed for switched-alternative mode.',
              'Three-stage charging: BULK (fast charge, constant current); ABSORPTION (constant V, current tapers); FLOAT (low maintenance V). For LFP / Li-ion, stages compress (no float). Hybrid inverter manages stage transitions via BMS interface.',
              'Reg 551.1.1(a) explicitly lists combustion engines; Reg 551.2.4 isolation per source; Reg 551.6 precautions against parallel operation. Where parallel (PowerAssist): Reg 551.7 applies including Reg 551.7.1(c) NEW A4:2026 bidirectional protective device.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify when generator backup is recommended vs optional for a UK off-grid install based on load criticality, winter PSH, and customer outage tolerance.',
              'Select generator fuel type (diesel / LPG / petrol) and size (typically 5-10 kVA UK rural) based on charging-power needs and concurrent load.',
              'Configure auto-start logic (SoC thresholds, run-time limits, scheduled exercise) using modern hybrid-inverter app interfaces.',
              'Apply BS 7671 Section 551 generating-set regs to the off-grid install — isolation per source, fault protection, parallel-operation considerations.',
              'Apply non-electrical UK frameworks: noise (Environmental Protection Act 1990), emissions (Air Quality Regulations), fuel storage (Petroleum Consolidation 2014), and planning permission for the generator install.',
              'Plan a cold-weather sizing scenario: generator sized to support heat pump + property baseline + battery charging through extended winter cloud periods.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Generator is insurance, not primary. Auto-start at 20-30%. Auto-stop at 70-90%. Diesel
            dominant. Section 551 applies.
          </Pullquote>

          <ContentEyebrow>When generator backup is needed</ContentEyebrow>

          <ConceptBlock
            title="The criteria for adding generator backup"
            plainEnglish="Generator backup is the off-grid install\'s INSURANCE policy against worst-case winter weather. PV+battery sized for typical autonomy (3-5 days); generator handles the rare extended cloud periods (5-7+ days) that would otherwise drain the battery."
            onSite="UK weather pattern: most years have at least one 5-7+ day low-PSH stretch in deep winter (Nov-Feb). Battery autonomy alone can\'t reliably cover this without massive oversizing. Generator gives the resilience without the cost."
          >
            <p>Criteria favouring generator backup:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Full-year occupation</strong> — vs seasonal cottages
                where winter shutdown is acceptable
              </li>
              <li>
                <strong className="text-white">Critical loads</strong> — medical equipment,
                security, vulnerable customer, agricultural process — outage unacceptable
              </li>
              <li>
                <strong className="text-white">Northern UK location</strong> — Scotland, Northern
                Ireland, N England — winter PSH 0.5-1.0 makes extended-cloud-day events more likely
                to exceed battery autonomy
              </li>
              <li>
                <strong className="text-white">Heat-pump heating</strong> — electric heat in cold
                spells dramatically increases the autonomy gap (covered in Q6)
              </li>
              <li>
                <strong className="text-white">EV charging required year-round</strong> — daily
                commute or essential vehicle use
              </li>
              <li>
                <strong className="text-white">Customer outage intolerance</strong> — even partial
                outage unacceptable (working from home, business continuity)
              </li>
            </ul>
            <p>
              Generator typically runs LIGHTLY when sized correctly — 20-50 hours/year for typical
              UK rural off-grid. Cost per year ~£250-900 total ownership (fuel + maintenance +
              amortised purchase). The insurance value (avoided outage cost, customer satisfaction)
              typically exceeds the operating cost.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Fuel choice — diesel / LPG / petrol</ContentEyebrow>

          <Pullquote>Diesel dominant. LPG for indoor-near installs. Petrol rare.</Pullquote>

          <ConceptBlock
            title="Diesel — the UK off-grid default"
            plainEnglish="High energy density (~10 kWh/L gross), long shelf life with stabiliser (12-24 months), reliable cold-weather start with glow plugs, well-established UK service network. Most UK rural off-grid generators are diesel."
            onSite="Brands: Pramac, Cummins, Honda EU65, Yamaha EF65, FG Wilson, John Deere agricultural. Sizes 3-15 kVA typical UK domestic / smallholding range. Stage V emissions standard (UK 2025-2026) is the current minimum for new generators."
          >
            <p>Diesel pros / cons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PRO Energy density</strong> — ~10 kWh/L gross; ~3.5
                kWh/L useful electrical output at ~35% efficiency on modern Stage V diesel
              </li>
              <li>
                <strong className="text-white">PRO Fuel shelf life</strong> — 12-24 months with
                stabiliser in suitable tank (vs petrol 3-6 months)
              </li>
              <li>
                <strong className="text-white">PRO Cold-weather start</strong> — glow plug pre-heat
                enables reliable -20°C+ starts (rare in UK but happens in N Scotland)
              </li>
              <li>
                <strong className="text-white">PRO UK service network</strong> — generator service
                contractors widely available; parts in stock
              </li>
              <li>
                <strong className="text-white">CON Emissions</strong> — particulates + NOx;
                restricted in some smoke-control zones
              </li>
              <li>
                <strong className="text-white">CON Storage</strong> — bunded tank required for
                &gt;200L; HSE guidance for diesel storage
              </li>
              <li>
                <strong className="text-white">CON Cold-weather fuel</strong> — diesel
                &ldquo;waxing&rdquo; at -5°C and below blocks filter; winter-grade diesel or
                stabiliser needed
              </li>
              <li>
                <strong className="text-white">CON Carbon footprint</strong> — fossil fuel;
                conflicts with renewable-energy narrative for some customers
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="LPG — the cleaner-burning alternative"
            plainEnglish="Lower energy density than diesel (~6.5 kWh/L vapour) but cleaner burning, suitable for indoor / near-building installation, longer fuel shelf life (years), and good cold-weather performance."
            onSite="Used where: noise / fume / planning constraints favour cleaner burn; integration with existing LPG infrastructure (rural LPG-heated properties); long-term storage required without fuel degradation. Brands and sizes similar to diesel."
          >
            <p>LPG pros / cons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PRO Clean burning</strong> — much lower particulates
                / smoke than diesel; suitable for smoke-control areas
              </li>
              <li>
                <strong className="text-white">PRO Indoor-safe option</strong> — with proper
                ventilation, LPG generators can be in plant rooms / outhouses
              </li>
              <li>
                <strong className="text-white">PRO Long fuel shelf life</strong> — LPG doesn\'t
                degrade like diesel; years of storage OK
              </li>
              <li>
                <strong className="text-white">PRO Existing LPG infrastructure</strong> — rural
                properties with LPG for heating can integrate with the same supply
              </li>
              <li>
                <strong className="text-white">CON Lower energy density</strong> — larger fuel tank
                needed for equivalent runtime
              </li>
              <li>
                <strong className="text-white">CON Bottled vs bulk</strong> — bottled LPG (47kg
                cylinders) needs frequent swaps; bulk LPG tank (1-5T) requires significant capital +
                planning
              </li>
              <li>
                <strong className="text-white">CON Pressure regulation</strong> — LPG generators
                need pressure regulator + safety devices; more complex than diesel
              </li>
              <li>
                <strong className="text-white">CON Cold-weather pressure drop</strong> — LPG vapour
                pressure drops in extreme cold; vaporiser may be needed
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Petrol — rarely used for off-grid backup"
            plainEnglish="Petrol generators are uncommon for permanent UK off-grid backup. Short fuel shelf life (3-6 months even with stabiliser), volatile storage hazard, and cold-start issues outweigh the small cost saving."
            onSite="Petrol generators have a place in: portable / emergency-only backup (camping, sites without permanent installation); very small installs (<2 kVA) where fuel turnover is fast. Not recommended for permanent off-grid resilience."
          >
            <p>Petrol typical scenario:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Portable generator for occasional use</strong> —
                Honda EU22i / EU30i for camping, events, occasional power. Not for permanent
                off-grid backup
              </li>
              <li>
                <strong className="text-white">Fuel issues</strong> — petrol degrades quickly (3-6
                months with stabiliser, weeks without); gumming up carburettor
              </li>
              <li>
                <strong className="text-white">Storage hazard</strong> — petrol volatile; Petroleum
                Consolidation Regulations 2014 restrict large storage
              </li>
              <li>
                <strong className="text-white">Cold-start</strong> — choke + manual priming needed;
                not as reliable as diesel + glow plug
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Off-grid generator fuel-comparison chart — three-column comparison: Diesel (high energy density, 12-24 month shelf, reliable cold-start, UK service network, particulate emissions, fuel waxing risk), LPG (cleaner burn, indoor-safe, long shelf life, lower energy density, pressure-regulation needed, cold-weather vapour-pressure drop), Petrol (small portable use, fast fuel turnover required, volatile storage hazard, cold-start challenges, not recommended for permanent off-grid)."
            filename="renewable/m4s3-fuel-comparison.png"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Auto-start logic & ATS panels</ContentEyebrow>

          <Pullquote>
            Auto-start at 20-30% SoC. Auto-stop at 70-90% SoC. Hybrid inverter handles transfer.
          </Pullquote>

          <ConceptBlock
            title="Auto-start triggers and stop conditions"
            plainEnglish="Modern off-grid hybrid inverters (Victron Multiplus / Studer Xtender / Sigenergy SigenStor) include built-in generator-start control. Configure trigger conditions in the inverter\'s app; the inverter starts the generator via a relay output (typically 2-wire start signal to the generator\'s control module)."
            onSite="The triggers and stop conditions are CUSTOMER-CONFIGURED — varies per install. Cert evidence bundle records the chosen thresholds and rationale."
          >
            <p>Common auto-start triggers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Battery SoC threshold (primary)</strong> — typically
                20-30% SoC. Below this, generator starts. Lower threshold (15%) trades SoC headroom
                for less generator runtime; higher (35%) gives more SoC headroom but more generator
                runtime
              </li>
              <li>
                <strong className="text-white">Battery V threshold (backup)</strong> — backup if SoC
                calculation is unreliable; triggers at 48V for 48V system / 230V for 230V system
                (typical low-V trip levels)
              </li>
              <li>
                <strong className="text-white">Load too high (assisted-output)</strong> — when load
                exceeds inverter capability, generator starts to share the load (PowerAssist / Quick
                Assist mode)
              </li>
              <li>
                <strong className="text-white">Scheduled exercise</strong> — monthly run for 30-60
                minutes to keep diesel cycled, lubricants moving, battery cranking
              </li>
              <li>
                <strong className="text-white">Manual start</strong> — customer-initiated via app or
                physical button
              </li>
            </ul>
            <p>Common auto-stop conditions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SoC reached target</strong> — typically 70-90% SoC.
                Stops BEFORE 100% to leave headroom for any PV that produces during the day
              </li>
              <li>
                <strong className="text-white">Maximum run-time</strong> — safety cap (e.g. 8 hours
                continuous) to limit fuel consumption / generator wear
              </li>
              <li>
                <strong className="text-white">Fault detection</strong> — overheat, low oil, low
                fuel, V/freq excursion — generator stops with alarm
              </li>
              <li>
                <strong className="text-white">Manual stop</strong> — customer-initiated via app
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ATS (Automatic Transfer Switch) — built-in vs external"
            plainEnglish="The ATS handles the load-transfer between inverter (PV+battery primary) and generator (backup). Modern hybrid inverters have ATS built-in; older / custom installs use an external ATS panel."
            onSite="Integrated ATS (most modern installs): Victron Multiplus, Studer Xtender, Sigenergy SigenStor have AC-IN port (generator) and AC-OUT port (loads). Inverter senses generator V/freq stable, transfers load via internal contactor. External ATS (legacy / split installs): a separate panel with two incoming feeds (inverter AC-OUT, generator AC-OUT) and one outgoing feed (loads); contactor-based or static-switch-based switching."
          >
            <p>ATS operating modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Switched-alternative</strong> — generator and
                inverter alternate; never operate in parallel. ATS detects active source and
                switches load. Reg 551.6 precautions against unintended parallel
              </li>
              <li>
                <strong className="text-white">PowerAssist / parallel mode</strong> — generator and
                inverter operate in parallel during peak loads. Reg 551.7 applies including
                551.7.1(c) bidirectional protective device. More complex but supports higher
                transient loads
              </li>
              <li>
                <strong className="text-white">Transfer time</strong> — typical 20-200 ms
                break-before-make switching. Modern static-switch ATS achieves &lt;10 ms
                (effectively seamless for non-critical loads)
              </li>
              <li>
                <strong className="text-white">Sync requirements</strong> — for make-before-break or
                parallel operation, generator V/freq must match inverter (within typical 5% V, 0.5
                Hz). Static converter handles synchronisation
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="ATS integrated vs external — two-panel diagram. Panel 1 (integrated, modern): hybrid inverter with AC-IN (generator), AC-OUT (loads), internal contactor switches between battery-supplied and generator-supplied modes. Panel 2 (external, legacy): separate ATS panel with three feeds — inverter AC-OUT, generator AC-OUT, load. Contactor coil energised by control logic. Annotated with Reg 551.2.4 isolation requirement per source."
            filename="renewable/m4s3-ats-integrated-vs-external.png"
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Three-stage charging</ContentEyebrow>

          <Pullquote>
            Bulk → Absorption → Float. LFP compresses stages; lead-acid uses all three.
          </Pullquote>

          <ConceptBlock
            title="The three-stage charge profile"
            plainEnglish="When the generator runs, the hybrid inverter / charge controller manages battery charging through three traditional stages: BULK (fast constant-current), ABSORPTION (constant V, current tapers), FLOAT (low maintenance V)."
            onSite="LFP / Li-ion compresses these stages — bulk continues longer, brief absorption, no float (LFP self-discharge is very low). Lead-acid uses traditional three stages with explicit float. The BMS communicates the appropriate setpoints to the charge controller."
          >
            <p>The three stages explained:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BULK</strong> — constant CURRENT charging at maximum
                rate (typically 0.5C to 1.0C for LFP; 0.1-0.2C for lead-acid). Battery V rises as
                SoC increases. Continues until V reaches absorption setpoint
              </li>
              <li>
                <strong className="text-white">ABSORPTION</strong> — constant VOLTAGE at absorption
                setpoint. Current naturally tapers as battery approaches full. For LFP: brief (10-30
                minutes typical). For lead-acid: 1-3 hours typical (slower chemistry)
              </li>
              <li>
                <strong className="text-white">FLOAT</strong> — constant V at lower setpoint to
                maintain SoC against self-discharge. For lead-acid: float V ~2.25V/cell (13.5V for
                12V). For LFP: typically OMITTED — LFP self-discharge is &lt;3%/month; sit at
                absorption end-point
              </li>
              <li>
                <strong className="text-white">EQUALISATION</strong> (lead-acid only) — periodic
                over-charge to equalise individual cell voltages; typically monthly. Modern LFP
                doesn\'t need equalisation
              </li>
            </ul>
            <p>
              The hybrid inverter / charge controller handles stage transitions automatically. BMS
              communicates with charge controller via CAN bus or Modbus to specify the
              chemistry-appropriate setpoints. Cert evidence bundle records the configured profile.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 551 / 712 regulatory framework</ContentEyebrow>

          <Pullquote>
            Sources separately + combinations. Reg 551.2.4 isolation per source. Reg 551.6 parallel
            prevention.
          </Pullquote>

          <ConceptBlock
            title="Section 551 generating-set regs for off-grid + generator"
            plainEnglish="BS 7671 Section 551 covers generating sets — Reg 551.1.1(a) explicitly includes combustion engines (diesel / petrol / LPG generators); (d) PV cells; (e) batteries. For an off-grid install with PV+battery+generator, all three are &ldquo;generating sets&rdquo; subject to Section 551."
            onSite="Critical regs: 551.2.4 isolation per source; 551.4.1 fault protection per source / combination; 551.6 precautions against unintended parallel between sources. Where intended parallel (PowerAssist): 551.7 applies including 551.7.1(c) NEW A4:2026 bidirectional protective device."
          >
            <p>Section 551 application to off-grid + generator:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 551.1.1</strong> — generating sets include (a)
                combustion engines, (d) PV cells, (e) batteries. All three apply to typical off-grid
                + backup
              </li>
              <li>
                <strong className="text-white">Reg 551.2.2</strong> — prospective short-circuit /
                earth fault assessed for each source / combination of sources. PV+battery alone,
                generator alone, PV+battery+generator parallel — three scenarios
              </li>
              <li>
                <strong className="text-white">Reg 551.2.3</strong> — capacity / operating
                characteristics ensure no danger on load connection / disconnection due to V/freq
                deviation. Automatic disconnection on V/freq excursion
              </li>
              <li>
                <strong className="text-white">Reg 551.2.4</strong> — isolation per Chapter 46 +
                Section 537 for EACH source / combination. Means generator isolator, inverter AC
                isolator, battery DC isolator all required separately
              </li>
              <li>
                <strong className="text-white">Reg 551.4.1</strong> — fault protection for each
                source / combination. Different fault paths exist for each operating mode
              </li>
              <li>
                <strong className="text-white">Reg 551.4.3.2</strong> — switched-alternative to
                grid: ADS shall not rely on grid earthing; suitable means of earthing provided. For
                off-grid (no grid): generating set provides the reference earth via the inverter or
                generator
              </li>
              <li>
                <strong className="text-white">Reg 551.4.3.3.3</strong> — static convertor
                (inverter): means of isolation on BOTH sides (DC and AC)
              </li>
              <li>
                <strong className="text-white">Reg 551.5</strong> — overcurrent protection near
                generator terminals
              </li>
              <li>
                <strong className="text-white">Reg 551.6</strong> — precautions against parallel
                operation where parallel NOT intended. Electrical / mechanical / electromechanical
                interlock between sources. Standard switched-alternative ATS provides this
              </li>
              <li>
                <strong className="text-white">Reg 551.7</strong> — parallel-operation requirements
                where parallel IS intended. Reg 551.7.1(c) NEW A4:2026 bidirectional protective
                device. Reg 551.7.4-6 V/freq protection, disconnect on loss/deviation, isolation
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.1.1 — Generating sets covered"
            clause="Generating sets with the following power sources are considered: (a) combustion engines; (b) turbines; (c) electric motors; (d) photovoltaic cells; (e) batteries; (f) other suitable sources."
            meaning="Reg 551.1.1 explicitly covers diesel / petrol / LPG combustion engines (a), PV cells (d), and batteries (e). An off-grid install with PV+battery+generator has THREE generating sets all subject to Section 551. The cert evidence bundle records each source and the combination-of-sources scenarios."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.6.1 — Precautions against parallel operation (when not intended)"
            clause="Precautions complying with the relevant requirements of Chapter 46 and Section 537 for isolation shall be taken so that the generator cannot operate in parallel with the system for distribution of electricity to the public. Suitable precautions may include one or more of the following: (a) an electrical, mechanical or electromechanical interlock between the operating mechanisms or control circuits of the changeover switching devices; (b) a system of locks with a single transferable key; (c) a three-position break-before-make changeover switch; (d) an automatic changeover switching device with a suitable interlock; (e) other means providing equivalent security of operation."
            meaning="Reg 551.6.1 governs switched-alternative operation — generator alternates with inverter, never operates in parallel. The ATS provides the precaution. Five suitable methods are listed (a)-(e), of which the automatic changeover switching device with interlock (d) is the modern norm for UK off-grid installs. Most off-grid installs operate in switched-alternative mode. Where parallel operation IS intended (PowerAssist), Reg 551.7 applies instead. Cert evidence bundle records which method (a)-(e) is used."
          />

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Rural Welsh smallholding — full off-grid with backup generator + heat pump"
            situation="Customer at remote Welsh smallholding, 1.5 km from nearest grid connection. Property: 3-bed farmhouse + workshop + greenhouse. Daily load: 18 kWh/day average; peaks to 35 kWh/day in cold winter (heat pump). PV: 12 kWp; battery: 50 kWh LFP. Generator needed for cold winter spells when heat pump runs continuously and PV produces minimally."
            whatToDo="Design: 8 kVA Pramac diesel generator (silenced canopy, ~52 dB at 7m). Fuel: 500 L bunded diesel tank (7-10 day cold spell coverage). Auto-start via Victron Cerbo GX: trigger at 25% SoC; stop at 80% SoC; scheduled exercise monthly 30 min. Heat pump 3 kW continuous + property baseline 1 kW + battery charge 3 kW = ~7 kW; 8 kVA generator at 80% derating = 6.4 kW continuous handles this comfortably. Reg 551.2.4 isolation: generator AC isolator (BS EN 60947-3); inverter AC-IN isolator; battery DC isolator. ATS built into Victron Multiplus 8kVA. Cert evidence bundle records: design pack, auto-start config, fuel tank sizing, noise assessment, Section 551 compliance. Customer informed: expected ~50-100 hrs/year generator runtime in cold UK winters."
            whyItMatters="Cold-weather heat-pump scenario is the binding sizing constraint for many UK off-grid installs. Without generator backup, the install would need either: (a) massive PV oversizing (20+ kWp) AND massive battery (100+ kWh) — cost prohibitive; or (b) accept periods without heating in cold spells (unacceptable for occupied homes). The generator gives the resilience at a fraction of the cost. Cert evidence bundle records the design assumption and the customer\'s informed agreement."
          />

          <Scenario
            title="Highland Scottish weekend lodge — seasonal off-grid without generator"
            situation="Customer with weekend lodge in Scottish Highlands, used May-October mostly weekends, closed Nov-Apr. Daily load when occupied: ~10 kWh/day. PSH May-Oct: ~3.5; closed winter."
            whatToDo="Seasonal off-grid design (no generator). PV: 4 kWp (sized for May design point, 10/(3.5×0.75) = 4 kWp). Battery: 18 kWh LFP (3 days autonomy for occupancy). NO generator — customer accepts closed-winter shutdown. Lodge winterised: water drained, heating off, security minimal (small load handled by battery + 4 kWp PV producing ~1-2 kWh/day even in winter via long-period PSH average). Total install cost ~£18,000-£22,000 vs full off-grid + generator ~£35,000-£45,000. Customer makes the seasonal trade-off explicitly; cert evidence bundle records the scope decision."
            whyItMatters="Seasonal off-grid is materially cheaper than full off-grid because: (1) PSH design point is higher (May vs December); (2) battery autonomy days needed is less (3 days vs 5-7); (3) no generator backup needed. The customer\'s informed choice matters — full-year residency would require the full design at 2× cost. The honest survey presents both options with their cost implications."
          />

          <CommonMistake
            title="Generator auto-stop configured at 100% SoC — wastes PV"
            whatHappens="An installer configures generator auto-stop at 100% SoC for &ldquo;maximum battery&rdquo;. The generator charges battery fully each run. When the sun comes out the next day, PV produces but the battery is already full — PV is wasted (or exported to nowhere on off-grid). Customer\'s annual generator runtime is higher than necessary; PV utilisation is lower than design."
            doInstead="Configure auto-stop at 70-90% SoC — leaves room for PV to charge the remaining 10-30%. The system designs the cooperative behaviour: generator covers the bulk; PV covers the top-up. Typical UK config: stop at 80% SoC. Customer\'s app shows the runtime statistics; cert evidence bundle records the rationale."
          />

          <CommonMistake
            title="Petrol generator chosen for permanent backup — fuel goes bad"
            whatHappens="Installer fits a 5 kVA petrol generator for permanent off-grid backup (cheaper than diesel by ~£500). Generator runs reliably for the first 3 months. After that, fuel in the tank degrades; generator runs rough, won\'t start, eventually needs carb cleaning and fresh fuel. Customer\'s confidence in backup eroded."
            doInstead="Diesel is the appropriate choice for permanent off-grid backup. The fuel shelf life (12-24 months with stabiliser) matches the rare-use pattern. Petrol degrades too quickly for occasional-use backup. The £500 saving is false economy — fuel-degradation repairs cost more, and a generator the customer can\'t trust is no insurance at all."
          />

          <CommonMistake
            title="Single isolator for generator + inverter — Reg 551.2.4 violation"
            whatHappens="An installer fits a single AC isolator that disconnects the generator AND the inverter together. Maintenance work on either source can\'t isolate the source independently — the other source must also be shut down. Reg 551.2.4 requires isolation per Chapter 46 + Section 537 for EACH source / combination of sources. MCS audit / EICR finds the single isolator non-compliant."
            doInstead="Provide isolation for EACH source: (a) generator AC output isolator (BS EN 60947-3); (b) inverter AC isolator (sometimes the ATS, sometimes separate); (c) battery DC isolator. Plus the means to isolate the combination (e.g. the ATS provides the load-side isolation between sources). Cert evidence bundle records each isolator location and its functional purpose."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Generator backup recommended for full-year UK off-grid installs (extended winter cloud routinely exceeds 3-5 day battery autonomy). Effectively mandatory for critical loads.',
              'Fuel choice: DIESEL dominant (high energy density, long shelf life, cold-start reliable). LPG second (clean, indoor-safe, long shelf life). Petrol rare (short shelf life, volatile, cold-start issues).',
              'Generator sizing: typically 5-10 kVA UK rural off-grid; 7-10 kVA where heat pump cold-spell scenario is the binding constraint. Output at 80% derating; concurrent charge + load capacity.',
              'Auto-start logic: SoC threshold (typically 20-30% start, 70-90% stop). Stops before 100% to leave PV headroom. Hybrid inverters (Victron, Studer, Sigenergy) have built-in control.',
              'ATS handles inverter ↔ generator load transfer. Modern hybrid inverters have integrated ATS; older / custom installs use external ATS panel. Switched-alternative or parallel modes.',
              'Three-stage charging: BULK (constant I) → ABSORPTION (constant V, I tapers) → FLOAT (low maintenance V). LFP compresses to bulk + brief absorption; lead-acid uses all three.',
              'BS 7671 Section 551 applies fully: Reg 551.1.1 includes (a) combustion engines + (d) PV + (e) batteries; Reg 551.2.4 isolation per source; Reg 551.6 parallel-prevention for switched-alternative; Reg 551.7 + 551.7.1(c) for parallel-operation (PowerAssist).',
              'Non-electrical frameworks: Environmental Protection Act 1990 (noise), Air Quality Regulations 2010, Petroleum Consolidation Regulations 2014, planning permission. Cert evidence bundle records compliance.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Off-grid PV fundamentals
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Hybrid PV + BESS topologies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
