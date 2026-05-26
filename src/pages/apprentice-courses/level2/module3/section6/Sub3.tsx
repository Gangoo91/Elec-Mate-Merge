/**
 * Module 3 · Section 6 · Subsection 3 — Battery storage deep dive
 * Maps to City & Guilds 2365-02 / Unit 203 / LO6 / AC 6.1, 6.2
 *   AC 6.1 — "Describe types of micro-renewable energies"
 *   AC 6.2 — "Identify requirements for installation of micro-renewable energies"
 *
 * The dedicated battery deep dive — chemistries (LFP vs NMC vs lead-acid),
 * BMS, AC- vs DC-coupled topologies, BS 7671 Chapter 57 (stationary
 * secondary batteries) reg by reg, BS EN 62619, IET CoP for EESS,
 * fire safety, G99, location restrictions and end-of-life. Sits between
 * Sub 6.2 (PV deep dive) and Sub 6.4 (general install requirements).
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

const TITLE =
  'Battery storage deep dive (6.1, 6.2) | Level 2 Module 3.6.3 | Elec-Mate';
const DESCRIPTION =
  'Battery storage in detail — LFP vs NMC vs lead-acid chemistries, BMS, AC- vs DC-coupled topologies, BS 7671 Chapter 57 (stationary secondary batteries) reg by reg, BS EN 62619, IET Code of Practice for EESS, fire safety, G99 thresholds, PAS 63100 location restrictions and end-of-life recycling.';

const checks = [
  {
    id: 'bess-lfp-vs-nmc',
    question:
      'A customer is comparing two domestic battery options — one is described as LFP (lithium iron phosphate) and the other as NMC (nickel manganese cobalt). What is the safety-relevant difference for a UK domestic install?',
    options: [
      'LFP has a more stable thermal runaway threshold (around 270 °C) and tends to vent rather than ignite, while NMC has a lower runaway threshold (around 200 °C) and a higher risk of self-sustaining fire. LFP is typically heavier per kWh but is the safer chemistry for in-home storage.',
      'Verify the RAMS / SSoW matches the actual site, brief the operatives on the relevant content, confirm understanding, sign as the responsible supervisor. The signature is evidence the handover was done. Increasingly L3 contributes to writing RAMS for routine jobs.',
      'Hazardous waste - double-bagged (red inner with asbestos label, clear outer with hazardous waste label), accompanied by Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility.',
      'Reject — measured exceeds 0.8 × table max, which means the hot Zs in service will probably exceed Table 41.3 max. Investigate: confirm the device, recalculate the design Zs, and either upsize the cable or accept the device must be downrated.',
    ],
    correctIndex: 0,
    explanation:
      'LFP (LiFePO4) has the highest thermal stability of the common lithium chemistries — its cathode is harder to push into thermal runaway. NMC packs more energy per kg (which is why electric vehicles use it) but goes into runaway at a lower temperature and burns harder. Most UK domestic battery products today are LFP for exactly this reason. Manufacturer datasheets will state the chemistry — always read it before specifying or installing.',
  },
  {
    id: 'bess-bms',
    question:
      'A 10 kWh lithium battery has a "BMS" inside it. What does the BMS do and why does it matter for safety?',
    options: [
      'So the tester can verify the design assumptions during initial verification — measured Ze at the origin and measured Zs at each circuit end can be compared against the design values on the SLD. Mismatch flags either a measurement issue or a design assumption that did not hold (e.g. cable installed differently to design).',
      'The Battery Management System monitors the voltage, current and temperature of every individual cell (or cell group), balances charge across cells, prevents over-charge and over-discharge, and shuts the pack down if any parameter goes out of safe range. Without a working BMS a lithium pack will eventually go into thermal runaway.',
      'By first stating what they don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t mean ("I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not saying your work is below standard overall") and then what they do mean ("I am saying this particular joint needs attention because it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t meet the specification")',
      'Not directly. BS 7671 is a British Standard published by BSI and the IET — it\\\\\\\\\\\\\\\'s not an Act of Parliament. But for a domestic install in England, the Building Regulations 2010 Approved Document P treats compliance with BS 7671 as the way to meet the statutory requirement for electrical safety, so in practice the courts will expect the standard to have been followed. It\\\\\\\\\\\\\\\'s voluntary in name and effectively mandatory in court.',
    ],
    correctIndex: 1,
    explanation:
      'A modern domestic battery is an assembly of dozens or hundreds of individual cells in series-parallel. If any one cell drifts (over-charged, under-charged or overheated), the pack is at risk. The BMS is the safety-critical electronics that watches every cell and shuts the pack down at the first sign of trouble. The BMS is normally inside the battery enclosure and not user-serviceable. If it fails, the whole pack is decommissioned. BS EN 62619 (industrial lithium battery safety) and PAS 63100 both treat the BMS as the key safety control on the pack.',
  },
  {
    id: 'bess-rcd-type',
    question:
      'You are wiring the AC supply circuit for a hybrid inverter that handles PV plus a 10 kWh LFP battery. The PCE manufacturer says nothing about RCD type in the manual. What does Reg 570.6.2.2 (battery side) and Reg 712.531.3.5.1 (PV side) point you to?',
    options: [
      'Stop. The RAMS is the baseline; it can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t cover what\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s changed since the survey. Walk the site, identify the new hazards, write a dynamic risk assessment that supplements the RAMS, decide whether the work can safely proceed today. If the conditions are wildly different, escalate for a fresh RAMS rather than try to manage on the fly.',
      'Type B RCD is the default for both. Both regs use almost identical wording — Type B per BS EN 62423 or BS EN 60947-2 unless (a) the PCE provides at least simple separation between AC and DC, (b) a transformer separates PCE from RCD, or (c) the PCE manufacturer explicitly states Type B is not required.',
      'It continuously adjusts the operating voltage of the string so the panels deliver their peak power as light, temperature and partial shade change throughout the day. The peak power point sits below open-circuit voltage and at a current below short-circuit — the MPPT hunts for the sweet spot.',
      'A 10-digit reference number issued by HMRC when you register for Self Assessment as a self-employed individual or when you register a limited company. You need it for tax returns and HMRC correspondence; partners and directors each have their own.',
    ],
    correctIndex: 1,
    explanation:
      'Both Reg 712.531.3.5.1 (PV) and Reg 570.6.2.2 (stationary secondary batteries) default to Type B for the same reason — a transformerless inverter or PCE can leak smooth DC fault current onto the AC side, and smooth DC saturates the toroidal core of any Type AC or Type A device. The three exceptions are specific and narrow. With nothing in the manual, you fit Type B.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which battery chemistry currently dominates new UK domestic energy storage installs and why?',
    options: [
      'The Type 1+2 at the origin handles the bulk of the transient energy; the downstream Type 2 (or Type 3) handles the residual surge that survives the upstream device, providing further reduction of the let-through voltage at the equipment terminals. Cascade requires coordination via manufacturer tables to avoid let-through that exceeds the downstream device\\\\\\\'s rating.',
      'Lithium iron phosphate (LFP / LiFePO4), because its thermal stability is high, cycle life is long (typically 5,000–10,000 cycles), depth of discharge is near 100 %, and the cells do not contain cobalt — making it both the safest mainstream lithium chemistry and the most commercially attractive for in-home use.',
      'Clear communication ensures safe handovers between shifts, accurate fault reporting for root cause analysis, effective coordination with production teams, correct documentation of maintenance activities, and professional interaction with colleagues, supervisors, and contractors',
      'Ze on a TT system is typically 21 Ω or higher (electrode + soil + remote substation electrode), which exceeds the Table 41.3 max Zs for any practical MCB rating. RCDs are required for fault protection — Table 41.5 then applies.',
    ],
    correctAnswer: 1,
    explanation:
      'LFP has taken over the UK domestic market over the last few years. Lead-acid (flooded, AGM, gel) survives only on niche off-grid applications because of its short cycle life (500–1,500 cycles), poor depth of discharge (typically 50 %) and venting of hydrogen during charging. NMC is still used in some products but is being squeezed out by LFP for in-home installs because of the fire-safety story.',
  },
  {
    id: 2,
    question:
      'A typical UK domestic battery is rated at 10 kWh of usable capacity and 5 kW of continuous power. The "C-rate" is the ratio of charge or discharge current to capacity. What rough C-rate is that battery operating at when discharging at full power?',
    options: [
      'Walk them through hazard identification on real jobs; ask "what hazards do you see here?"; explain reasoning behind controls; show them how to write a dynamic assessment note; review their attempts; correct calibration over time.',
      'Explaining how the adjusted routing would benefit both trades — showing that the change makes the plumber\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s work easier while solving the cable routing problem, and offering to help with the adjustment',
      '0.5C — discharging at 5 kW from a 10 kWh pack means it would take roughly 2 hours to fully discharge, which is a 0.5C rate. Higher C-rates (1C+) heat the pack harder and shorten cycle life.',
      'Add specific details about what was learned, how it felt to overcome challenging concepts, analyse why RCD selection was previously a weakness, and create a concrete action plan with measurable steps',
    ],
    correctAnswer: 2,
    explanation:
      'C-rate = power / capacity. 5 kW / 10 kWh = 0.5/h, expressed as 0.5C. Most domestic batteries are designed for 0.5C continuous discharge, with brief bursts up to 1C. EV traction packs run at much higher C-rates — that is part of why their cell chemistry differs and why their cooling systems are far more complex than a domestic wall-mounted pack.',
  },
  {
    id: 3,
    question:
      'A new PV plus battery install uses a single hybrid inverter handling both. The battery is "DC-coupled" to the PV. What does that mean and why is it preferred for new installs?',
    options: [
      'Include a price variation clause in your quotation allowing adjustment for significant material price changes (e.g. copper, aluminium, key brands). Set a clear threshold (typical: changes over 5%) and define the calculation method. This protects both parties on long-running projects.',
      'It works best when the original failure was not caused by negligence, the recovery is swift and genuine, and the client perceives the effort as exceptional — it does not apply to repeated failures or serious safety issues',
      'Verification of correct operation in all modes: normal (mains-powered), battery (mains-failure), bypass (maintenance), and transfer between modes, including verification of transfer times and output voltage/frequency under load',
      'The battery and the PV strings both connect to the DC side of one inverter. PV power can charge the battery without first being inverted to AC and back, giving roughly 3–5 % higher round-trip efficiency than AC-coupling. Best for new PV plus battery installs that go in together.',
    ],
    correctAnswer: 3,
    explanation:
      'In a DC-coupled system the PV charge controller and the battery share the inverter\'s DC bus. Sunlight charges the battery at DC without a conversion step, and the inverter only kicks in when AC export or AC load is needed. AC-coupling is the alternative — used when adding a battery to an existing PV system where the PV inverter is already in place and you do not want to replace it. AC-coupled systems convert PV-DC to AC, then AC back to DC to charge the battery, then DC back to AC to use it — three conversions, lower efficiency, but it slots into existing installs.',
  },
  {
    id: 4,
    question:
      'Which BS 7671 chapter introduced detailed requirements for stationary secondary battery installations under BS 7671:2018+A4:2026?',
    options: [
      'Chapter 57 (Stationary Secondary Batteries) — Section 570 onwards covers scope, battery and PCE selection, energy management systems, isolation, fire and ventilation, labelling and warning notices.',
      'Demonstrates your commitment to professional standards, provides formal recognition of your competence, requires ongoing CPD, and enhances your career prospects and professional credibility',
      'Because testing proves the system works at a specific moment, but certification provides legal documentation of compliance with recognised standards',
      'Self-regulation directly affects all four components: managing emotions maintains credibility, consistent behaviour builds reliability, emotional openness creates intimacy, and regulating self-interest reduces self-orientation — all of which build trust',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 57 (regs 570.x) is the dedicated home for stationary battery installations under the A4:2026 amendment. It captures battery selection (570.5.1), PCE selection (570.5.2), EEMS (570.5.3), DC-side earthing (570.6.1.2.x), Type B RCD on the AC side (570.6.2.2), thermal protection (570.6.3), DC fault protection (570.6.4), isolation (570.6.5), other hazards including arcing and explosion (570.6.7), location and ventilation (570.6.7.202–203), and labelling (570.6.8.x). The reg framework is finally maturing into one place.',
  },
  {
    id: 5,
    question:
      'Reg 570.6.7.203 says stationary secondary batteries in dwellings "shall be installed in a suitable location taking account of manufacturer\'s instructions and PAS 63100". What is PAS 63100?',
    options: [
      'Brings the installed systems to life — energising, testing, setting parameters, demonstrating compliance, and signing the system over to the client. On a commercial project commissioning is a distinct phase after the install: the Commissioning Engineer runs the test sequence, configures the BMS, programmes the panels, sets the protection settings and produces the commissioning records that go in the O&M manual.',
      'A BSI Publicly Available Specification — "PAS 63100:2024 Electrical installations. Protection against fire of battery energy storage systems intended for use in dwellings" — that sets out fire safety requirements for domestic battery storage, including location restrictions, separation distances from sleeping accommodation and escape routes, fire detection requirements and segregation from combustibles.',
      'Reg 132.13 — \\\\\\\'The designer of the electrical installation shall provide ... the information necessary to allow the safe operation, inspection, alteration, repair, maintenance and dismantling of the electrical installation\\\\\\\'. The information has to be available to whoever is going to operate or maintain it. That is the BS 7671 hook for site-folder paperwork (single line diagram, schedule of circuits, certificate, schedule of test results, mfr data).',
      'I apply the requirements of the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and relevant ACoPs and British Standards such as BS 7671, through practical actions including risk assessment, safe isolation, use of appropriate PPE, maintenance of competence, and accurate record keeping',
    ],
    correctAnswer: 1,
    explanation:
      'PAS 63100:2024 is the standard the trade is now expected to follow for any in-dwelling battery install. It sits on top of BS 7671 Chapter 57 and adds dwelling-specific fire safety: do not install lithium batteries in a loft above a habitable room, do not install in escape routes, keep them away from sleeping accommodation, fit smoke and heat detection in the room, and use a non-combustible enclosure. Reg 570.6.7.203 makes PAS 63100 a normative reference for dwellings.',
  },
  {
    id: 6,
    question:
      'A 5.5 kW hybrid inverter on a new PV plus battery install draws 24 A per phase at 230 V at full export. The customer wants a 10 kWh battery. Which DNO process applies?',
    options: [
      'The total greenhouse gas emissions caused by an individual, organisation, or product',
      'Every 20-30 minutes, lasting 30 seconds to 2 minutes, involving stretching or posture change',
      'G99 — full pre-application to the DNO before install, because the per-phase output exceeds 16 A.',
      'Observe, take notes for their own learning, and contribute when asked — not negotiate with the client',
    ],
    correctAnswer: 2,
    explanation:
      'The G98 / G99 split is on the export-side per-phase current at the inverter, not on whether the install includes a battery. 5.5 kW at 230 V is roughly 24 A per phase — over the 16 A G98 threshold, so G99 applies. The full G99 application includes the inverter type-test certificates, single-line diagram and DNO-agreed protection settings. This is the same threshold and the same process as for a PV-only install of the same export capacity.',
  },
  {
    id: 7,
    question:
      'Why is "thermal runaway" the headline safety concern with lithium batteries?',
    options: [
      'Cutting (T+E shears, side cutters, hacksaw for trunking and conduit), stripping (auto-strippers and a sharp Stanley for outer sheath) and terminating (Pozidriv VDE drivers for accessory terminations, ratchet crimper for ferrules where used). Layered on top of that — measuring (tape, level), marking (pencil or chinagraph), and fixing (claw hammer for joist clips, club hammer for chasing). Six categories in two months.',
      'The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.',
      'Because the rate of fires originating from Li-ion batteries (e-bikes, e-scooters, power tools, solar storage) has risen sharply in recent years across the UK as the installed base has grown. Fires in vehicles, garages and small workshops are a recurring incident type. The guidance focuses on segregation, charging on non-combustible surfaces, not charging unattended overnight, and immediate isolation of damaged batteries. The same rules apply in proportion to a tradesperson van as to a battery storage warehouse.',
      'A damaged or over-charged lithium cell can heat itself by internal short-circuit. Above a chemistry-dependent threshold (around 200 °C for NMC, around 270 °C for LFP) the cell\\\\\\\\\\\\\\\'s internal materials decompose exothermically — releasing more heat that propagates to neighbouring cells. The reaction is self-sustaining and standard water-based extinguishers do not stop it. Hence the emphasis on chemistry, BMS, segregation and detection.',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal runaway is when a single cell\'s heat output exceeds its ability to dissipate that heat — temperature climbs, internal materials break down exothermically, more heat is released, neighbouring cells reach the same threshold, and the whole pack ignites in a fast cascade. Once started it is hard to stop. The chemistry sets the threshold, the BMS prevents the conditions that trigger it, the enclosure and location reduce the consequences if it does happen, and detection gives the occupants time to escape. This is the chain that PAS 63100 and BS EN 62619 are protecting.',
  },
  {
    id: 8,
    question:
      'A 9-year-old domestic LFP battery has lost roughly 25 % of its original capacity. The customer asks whether to replace it. What is the realistic answer?',
    options: [
      'Most LFP batteries are warrantied to retain at least 70–80 % of original capacity at 10 years (typically 6,000+ cycles). 75 % at 9 years is on or just below the warranty curve. The customer can either claim under warranty if still in coverage, replace the pack now, or carry on using the reduced capacity until economic payback drops below the cost of replacement. End-of-life packs go for proper UK lithium recycling under WEEE / battery regulations — they are not house-clearance waste.',
      'The HEMS schedules the heat pump\\\\\\\'s main run-time toward cheap off-peak windows where possible (e.g. overnight on Octopus Go). The battery charges during the same off-peak window. During the expensive peak window (typically 16:00-19:00) the battery discharges to cover the property load, including any heat pump running, while the grid import drops to near zero. Net peak grid demand from the property falls; the customer\\\\\\\'s bill falls; the grid stress falls. Some smart tariffs explicitly reward this — Octopus Cosy, for example, has dedicated cheap windows aligned with heat-pump run preferences.',
      'Because the single-pole switch on the circuit must still interrupt the LINE conductor — reverse polarity means the switch interrupts neutral, leaving the lampholder live when "off". Bayonet holders do not have the screw-thread access hazard of E14/E27, but the switch behaviour is still a safety issue. Polarity verified at every accessory regardless of holder type.',
      'The 110 V supply on site is centre-tapped earthed (CTE), so the voltage between either leg and earth is only 55 V. A faulty tool that ends up with the case live to one leg only puts 55 V between the casing and the operative, not 230 V. Combined with a 30 mA RCD at the transformer this dramatically reduces shock energy and survivability if something goes wrong.',
    ],
    correctAnswer: 0,
    explanation:
      'LFP cycle life is genuinely long — 5,000–10,000 cycles at 80 % capacity retention is a typical industry rating. Real-world packs reach 70–80 % capacity at 8–12 years. The customer\'s decision is economic, not safety, provided the BMS is healthy and there are no fault codes. End-of-life: lithium batteries fall under the UK Waste Batteries and Accumulators Regulations and the WEEE directive — they go to a registered battery recycler, not to landfill or general waste. Manufacturers and installers have take-back obligations.',
  },
];

const faqs = [
  {
    question: 'Why has lithium taken over from lead-acid in UK domestic storage?',
    answer:
      'Three reasons. Cycle life — a quality LFP pack manages 5,000–10,000 cycles to 80 % capacity, against 500–1,500 for a lead-acid pack. Depth of discharge — LFP can be discharged to roughly 100 % usable capacity, where lead-acid cycle life collapses if you discharge below 50 %. And footprint — a 10 kWh LFP pack is wall-mountable in a small enclosure, where the same usable capacity in lead-acid is a floor-standing rack. Lead-acid survives only on legacy off-grid systems and a few traditionalist installs.',
  },
  {
    question: 'What is the practical difference between AC-coupling and DC-coupling a battery?',
    answer:
      'DC-coupled means the battery shares the DC bus with the PV inside one hybrid inverter — fewer conversion steps, roughly 3–5 % higher round-trip efficiency, and the natural choice for new PV plus battery installs. AC-coupled means the battery has its own inverter and connects to the AC side of the consumer unit — slightly less efficient (PV-DC to AC to battery-DC to AC) but the only practical option when adding a battery to an existing PV install where the PV inverter is already in place and the customer does not want to replace it.',
  },
  {
    question: 'Where can I install a domestic battery in a UK house?',
    answer:
      'Manufacturer\'s instructions and PAS 63100 govern. The general rules: not in a loft above habitable rooms, not in escape routes, not in bedrooms, ideally in a garage or utility room with natural ventilation. Reg 570.6.7.202 requires adequate ventilation that does not create a hazard — for some chemistries that means ventilation to outdoor space. Reg 570.6.7.203 specifically calls up PAS 63100 for dwellings. Smoke or heat detection in the same room is now standard practice.',
  },
  {
    question:
      'What is the IET Code of Practice for Electrical Energy Storage Systems and is it mandatory?',
    answer:
      'The IET Code of Practice for Electrical Energy Storage Systems (current edition 2nd, 2020) is a non-statutory document published by the IET that pulls together best practice for designing, installing, commissioning and maintaining EESS. It is not directly cited as a mandatory document in BS 7671, but it is the trade reference that competent EESS installers (and MCS-certified battery installers) work from. Treat it as the practical companion to Chapter 57 — it covers the things the regs do not spell out in detail.',
  },
  {
    question:
      'What does BS EN 62619 cover and where does it apply to the install?',
    answer:
      'BS EN 62619 is the safety standard for industrial lithium-ion cells and batteries used in stationary applications. It defines the cell-level and pack-level tests a manufacturer must pass — overcharge, short-circuit, mechanical impact, thermal abuse — before a product can be sold. As an installer you do not test for BS EN 62619 yourself; you check that the battery datasheet declares conformity. Most reputable domestic batteries cite BS EN 62619 (cells) and IEC 62933 (system level).',
  },
  {
    question: 'What is the realistic payback on a battery in 2026?',
    answer:
      'Honest answer: it depends on tariff and on solar self-consumption. With time-of-use tariffs that have a wide gap between off-peak and peak (Octopus Go, Cosy, Intelligent Octopus) and a household that uses most of its consumption in the evening peak, payback can land at 6–8 years. With a flat tariff and a household that already uses its PV generation directly during the day, payback can stretch past 12 years. Add a battery for the right customer and the wrong tariff, and you may not see payback inside the warranty period. Be straight with customers about this at quote.',
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 3"
            title="Battery storage deep dive"
            description="Battery storage is the fastest-growing micro-generation install in the UK after PV. Lithium iron phosphate (LFP) plus AC- or DC-coupled to a PV system. The reg framework is still maturing — Chapter 57 (Stationary Secondary Batteries) is now the home, with PAS 63100, BS EN 62619 and the IET Code of Practice for EESS sitting alongside."
            tone="emerald"
          />

          <TLDR
            points={[
              'Lithium iron phosphate (LFP) has taken over UK domestic storage — better cycle life, deeper discharge and far better thermal stability than NMC or lead-acid. Typical pack: 5–15 kWh usable, wall- or floor-mounted, BMS inside.',
              'BS 7671 Chapter 57 (regs 570.x) is the dedicated home for stationary battery installs. Critical regs: 570.5.1 (battery selection), 570.6.2.2 (Type B RCD on AC side), 570.6.5 (isolation each end), 570.6.7.202–203 (location, ventilation and PAS 63100).',
              'G99 applies above 16 A per phase at the inverter. PAS 63100 governs dwelling location and fire safety. BS EN 62619 covers cell-level safety tests. The IET Code of Practice for EESS is the practical install companion.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Compare the three battery chemistries an electrician will meet (LFP, NMC, lead-acid) on energy density, cycle life, depth of discharge and thermal stability.',
              'Explain the role of the BMS (Battery Management System) and why it is the safety-critical electronics on every modern lithium pack.',
              'Distinguish AC-coupled from DC-coupled topologies and explain when each suits a real install.',
              'Cite the four critical Chapter 57 regulations (570.5.1 selection, 570.6.2.2 Type B RCD, 570.6.5 isolation, 570.6.7.203 PAS 63100 location) and explain what each one is protecting against.',
              'Describe thermal runaway, the fire-suppression challenge it presents, and the segregation, ventilation and detection requirements that mitigate it.',
              'State the G99 threshold for a battery-plus-inverter install and outline end-of-life handling under UK lithium battery recycling rules.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Where this Sub fits"
            plainEnglish="Sub 6.2 went deep on solar PV. This Sub does the same for battery storage — the install category that has grown fastest behind PV over the last five years."
            onSite="Most new battery installs are paired with PV through a hybrid inverter. The PV side is governed by Section 712 (covered in Sub 6.2). The battery side now has its own home in Chapter 57. There is overlap — the same RCD type rule, the same anti-islanding rule, the same Section 462 isolation rules — but the battery-specific requirements are growing."
          >
            <p>
              For most of the last decade, battery storage sat in regulatory limbo — Section 712 was
              written for PV, Chapter 53 covered general isolation, and the rest came from manufacturer
              instructions and the IET Code of Practice for EESS. The A4:2026 amendment to BS 7671
              changed that with the introduction of Chapter 57 (Stationary Secondary Batteries) — the
              first dedicated reg framework for domestic and small commercial battery installs.
            </p>
            <p>
              This Sub follows the same shape as Sub 6.2 (PV): chemistry first, then topology, then
              the critical regs, then the things that actually go wrong.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Battery chemistries</ContentEyebrow>

          <ConceptBlock
            title="LFP, NMC and lead-acid — three chemistries, three trade-offs"
            plainEnglish="LFP is safer but heavier per kWh. NMC packs more energy per kg but is more flammable. Lead-acid is older, cheaper, much shorter cycle life. UK domestic now defaults to LFP."
            onSite="Read the datasheet before quoting. Most domestic packs sold in the UK in 2026 are LFP — Tesla Powerwall 3, GivEnergy AIO, Pylontech, BYD HVM. NMC is still found in some products; lead-acid only on legacy off-grid."
          >
            <p>
              Three chemistry families dominate the UK market:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lithium iron phosphate (LFP / LiFePO4)</strong> — cathode is iron and
                phosphate, no cobalt or nickel. Energy density around 90–160 Wh/kg. Cycle life
                5,000–10,000 cycles to 80 % capacity. Thermal runaway threshold around 270 °C.
                Tends to vent rather than ignite. The default for in-home storage.
              </li>
              <li>
                <strong>Nickel manganese cobalt (NMC)</strong> — higher energy density (150–250
                Wh/kg), which is why it dominates EV traction packs. Cycle life 1,500–3,000.
                Thermal runaway threshold around 200 °C. Higher fire risk if the BMS fails or
                the pack is damaged. Used in some domestic products but losing market share to
                LFP for in-home use.
              </li>
              <li>
                <strong>Lead-acid</strong> — flooded, AGM (absorbed glass mat) or gel. Energy
                density 30–40 Wh/kg. Cycle life 500–1,500 cycles, and only with shallow
                discharge. Vents hydrogen during charging — must be installed in ventilated
                spaces away from ignition sources. Survives on legacy off-grid systems and as
                back-up batteries on emergency lighting.
              </li>
            </ul>
            <p>
              For any new domestic install in 2026, the realistic chemistry choice is LFP unless
              the customer has a specific reason for an NMC product. The fire-safety story alone
              is enough to make LFP the default — it is the same chemistry the National Fire
              Chiefs Council and most domestic battery manufacturers now recommend for in-home
              use.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.leadAcidBatteries.url}
            title={videos.leadAcidBatteries.title}
            channel={videos.leadAcidBatteries.channel}
            duration={videos.leadAcidBatteries.duration}
            topic="How lead-acid batteries work · Unit 203 AC 6.1"
            caption="The Engineering Mindset takes a lead-acid cell apart to show the electrochemistry — the same charge / discharge half-reactions that govern every secondary cell, from a backup pack to a Tesla Powerwall. The chemistry that makes BMS-managed lithium so much more demanding."
          />

          <ConceptBlock
            title="Capacity, power and C-rate — the three numbers on the label"
            plainEnglish="Capacity is how much energy the pack stores (kWh). Power is how fast it can deliver that energy (kW). C-rate is the ratio between them — a 10 kWh pack delivering 5 kW is running at 0.5C."
          >
            <p>
              Three numbers describe a battery pack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacity (kWh):</strong> how much energy the pack stores. Typical
                domestic ratings sit at 5, 10 or 15 kWh of usable capacity. Note "usable" —
                manufacturers often quote nameplate capacity above the actual usable figure
                because the BMS keeps the pack between roughly 5 % and 95 % state of charge to
                preserve cycle life.
              </li>
              <li>
                <strong>Continuous power (kW):</strong> how fast the pack can deliver or absorb
                energy. Most domestic packs sit at 3–7 kW continuous. A bigger inverter does not
                help if the battery cannot deliver the current.
              </li>
              <li>
                <strong>C-rate:</strong> power divided by capacity. A 10 kWh pack discharging at
                5 kW is at 0.5C — would take 2 hours to fully discharge. Higher C-rates heat the
                cells harder and shorten cycle life. Most domestic batteries are designed for
                continuous 0.5C with brief peaks at 1C.
              </li>
            </ul>
            <p>
              The numbers matter because customers often ask for "a 15 kWh battery" without
              knowing whether they need the energy capacity or the power capacity. A 15 kWh pack
              with 5 kW power output runs the house overnight. A 10 kWh pack with 7 kW output
              runs the EV charger and the oven simultaneously for short periods. Understand which
              one the customer actually needs before specifying.
            </p>
          </ConceptBlock>

          <ContentEyebrow>The BMS and pack architecture</ContentEyebrow>

          <ConceptBlock
            title="Battery Management System — the safety-critical brain inside every pack"
            plainEnglish="A modern battery is dozens or hundreds of small cells in series-parallel. The BMS watches every cell, balances them as they charge and discharge, prevents over-charge, prevents over-discharge, and shuts the pack down if any cell goes out of safe range."
            onSite="If the BMS fails, the pack is dead — it will not allow charge or discharge. That is by design. A pack with a failed BMS is not a fire risk because it stops operating. The fire risk is when a pack runs without a working BMS — never disable, bridge or modify a BMS."
          >
            <p>
              A 10 kWh LFP pack typically contains 16 cells of 3.2 V nominal each (in series for
              roughly 51 V) repeated several times in parallel — so 100+ individual cells in
              total. Each cell can drift in voltage, temperature and capacity over the pack\'s
              life. Without active management, the cells go out of balance and the pack degrades
              fast.
            </p>
            <p>
              The BMS is the dedicated electronics that sits inside the battery enclosure and:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Measures the voltage of every cell (or small cell group) several times a second.
              </li>
              <li>
                Measures the current flowing in and out of the pack.
              </li>
              <li>
                Measures temperatures at multiple points across the pack.
              </li>
              <li>
                Balances cells during charging — gently bleeding charge from the highest-voltage
                cells so the lowest catch up.
              </li>
              <li>
                Cuts off charge or discharge if any cell goes outside the safe voltage,
                temperature or current window.
              </li>
              <li>
                Reports state of charge, state of health and any fault codes to the inverter.
              </li>
            </ul>
            <p>
              The BMS is the single most important piece of electronics on the pack. PAS 63100
              and the IET Code of Practice for EESS both treat it as the primary safety control.
              On a domestic install you never service or modify the BMS — if it faults, the whole
              pack goes back to the manufacturer or to recycling.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="DC-coupled vs AC-coupled — two ways to wire a battery into an installation"
            onSite="DC-coupled is the default on new PV plus battery installs through a hybrid inverter. AC-coupled is the practical option when adding a battery to an existing PV system. Both are legitimate — pick the one that matches what is already on site."
          >
            <p>
              <strong>DC-coupled.</strong> The PV strings and the battery share the DC bus inside
              one hybrid inverter. Sunlight charges the battery directly at DC; the inverter only
              converts to AC when the battery discharges to the load or to export. One conversion
              step instead of three, so round-trip efficiency lands at 90–95 %. The right choice
              for any new install where PV and battery go in together.
            </p>
            <p>
              <strong>AC-coupled.</strong> The battery has its own inverter and connects to the AC
              side of the consumer unit, alongside an existing PV inverter. PV-DC is converted to
              AC by the PV inverter, then back to DC to charge the battery, then back to AC to
              use it — three conversion steps, round-trip efficiency around 85–88 %. The right
              choice when adding a battery to an existing PV install where the PV inverter is
              already installed and the customer does not want to replace it.
            </p>
            <p>
              Some installs use a third option — a stand-alone battery with its own inverter, no
              PV at all, charging from the grid on time-of-use tariffs (off-peak overnight) and
              discharging during peak hours. The economics can work if the tariff has a wide
              off-peak / peak gap. From an install point of view this is identical to AC-coupling
              minus the PV inverter.
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

          <ContentEyebrow>BS 7671 Chapter 57 — the home regulation</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 570.5.1 (Selection of battery)"
            clause="The battery type and capacity shall be selected taking account of: (a) nature of demand; (b) battery voltage; (c) charge time and discharge time; (d) generation profiles of locally connected generators, such as solar PV; (e) power conversion equipment (PCE) connection and coupling mode; (f) supplied equipment’s utilization voltage range; (g) battery charge and discharge profiles; (h) load profiles and cyclic operation capability; (i) suitability for fixed installation and connection to an electrical installation; and (j) the relevant external influences. NOTE: The selection of type of battery might include consideration of battery chemistry and construction, for example cell plate configuration and possibility of evolution of flammable [gases]."
            meaning={
              <>
                The "what battery, what size" reg. The reg explicitly calls out chemistry,
                charge/discharge profile, PCE coupling mode (AC vs DC), and the need to consider
                whether the battery can evolve flammable gases (LFP and NMC do not in normal use;
                lead-acid does during charging). On any new install, the chemistry choice should
                be a deliberate decision documented in the design — not an accident of whichever
                pack the wholesaler had in stock.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 57, Regulation 570.5.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 570.6.2.2 (Type B RCD on AC side of battery PCE)"
            clause="Where an RCD is used for protection of the AC supply circuit, the RCD shall be of Type B according to BS EN 62423 or BS EN 60947-2, unless: (a) the PCE provides at least simple separation between the AC side and the DC side; or (b) at least simple separation is provided between the PCE and the RCD by means of separate windings of a transformer; or (c) the PCE does not require a Type B RCD as stated by the manufacturer of the PCE."
            meaning={
              <>
                Same wording, same logic as Reg 712.531.3.5.1 for PV. A transformerless battery
                PCE (or hybrid inverter) can leak smooth DC fault current onto the AC side, which
                blinds Type AC and Type A RCDs. Default is Type B unless one of the three
                exceptions applies. With nothing in the manual, fit Type B.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 57, Regulation 570.6.2.2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 570.6.5 (Isolation)"
            clause="Every power circuit connecting to a stationary secondary battery shall be provided with appropriate means of isolation conforming to Section 462. NOTE: Isolation is likely to be required at both ends of the power circuit. This may be achieved by a combination of suitable means of isolation provided either within, and/or external to, the manufacturer’s supplied equipment."
            meaning={
              <>
                Two isolators on the battery DC circuit: one at the battery end and one at the
                PCE end. The "either end" rule matters because the cable between them can fault
                and you need to be able to break the circuit from either side without relying on
                the other. Many modern battery products integrate the battery-end isolator inside
                the pack enclosure; if so, that satisfies the requirement at that end. If not, an
                external DC isolator is required.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 57, Regulation 570.6.5."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 570.6.7.203 (Location of stationary secondary batteries)"
            clause="Stationary secondary batteries in dwellings shall be installed in a suitable location taking account of manufacturer’s instructions and PAS 63100. In other premises, the location of storage batteries and fire protection requirements shall be selected taking into account the fire strategy for the premises."
            meaning={
              <>
                For dwellings, this reg makes PAS 63100:2024 ("Electrical installations.
                Protection against fire of battery energy storage systems intended for use in
                dwellings") a normative reference. PAS 63100 governs where the battery can go in
                a house — not above habitable rooms in a loft, not in escape routes, not in
                bedrooms, with a minimum separation from the dwelling boundary, with smoke / heat
                detection in the same room, and with a non-combustible enclosure or location.
                Treat PAS 63100 as a required read for any in-dwelling battery install.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 57, Regulation 570.6.7.203."
          />

          <RegsCallout
            source="Paraphrased — IET Code of Practice for Electrical Energy Storage Systems (2nd edn, 2020) and BS EN 62619 (Industrial lithium-ion battery safety)"
            clause="The IET Code of Practice for EESS sets out the design, installation, commissioning, handover, inspection and maintenance practices expected for electrical energy storage systems. BS EN 62619:2017 covers safety requirements (electrical, mechanical and environmental tests) for secondary lithium cells and batteries used in industrial applications, including stationary energy storage. Conformance to BS EN 62619 is typically declared on the battery datasheet by the manufacturer."
            meaning={
              <>
                Two non-statutory standards that sit on top of BS 7671 Chapter 57. The IET CoP for
                EESS is the practical install handbook the trade uses — covers things the regs do
                not spell out, like cable management between battery and PCE, cooling
                considerations, commissioning checks, handover documentation and ongoing
                maintenance. BS EN 62619 is the cell-level safety standard the manufacturer must
                conform to before the product can be sold for stationary use; you will not test
                it on site, but you should check the battery datasheet declares conformance.
              </>
            }
            cite="Paraphrased — see the IET Code of Practice for Electrical Energy Storage Systems (current edition) and BS EN 62619 for full text."
          />

          <SectionRule />

          <ContentEyebrow>Fire safety and grid connection</ContentEyebrow>

          <ConceptBlock
            title="Thermal runaway and the fire-suppression challenge"
            plainEnglish="A damaged or over-charged lithium cell heats itself by internal short-circuit. Above a chemistry-dependent threshold (roughly 270 °C for LFP, 200 °C for NMC) the cell decomposes exothermically, neighbouring cells reach the same threshold, and the whole pack ignites in a self-sustaining cascade."
            onSite="Standard ABC, CO2 and water extinguishers are not effective on an active lithium fire — the chemistry continues to release oxygen internally. Fire services treat lithium battery fires as containment-and-cool-the-surroundings rather than extinguish. That is why segregation, location and detection matter so much."
          >
            <p>
              The chain that triggers thermal runaway:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A cell sees a stress event — over-charge, over-discharge, internal short from
                cell defect or external impact, or external heat from a fire elsewhere.
              </li>
              <li>
                The cell heats up faster than it can dissipate that heat.
              </li>
              <li>
                Above the chemistry-specific threshold (around 200 °C for NMC, around 270 °C for
                LFP), the cell\'s internal materials decompose exothermically, releasing more
                heat and flammable gases.
              </li>
              <li>
                Heat propagates to neighbouring cells; they reach the same threshold; the pack
                ignites.
              </li>
              <li>
                Once ignited, the reaction is hard to stop because the chemistry releases its own
                oxygen as it decomposes — water and conventional extinguishers cool the
                surroundings but do not stop the cell-level reaction.
              </li>
            </ul>
            <p>
              The mitigation chain is the chain that BS 7671 Chapter 57, PAS 63100 and BS EN
              62619 collectively try to enforce:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chemistry choice</strong> — LFP raises the runaway threshold and reduces
                the consequences if it does happen.
              </li>
              <li>
                <strong>BMS</strong> — prevents the conditions that trigger runaway in the first
                place.
              </li>
              <li>
                <strong>Enclosure and location</strong> — non-combustible enclosure, segregated
                from sleeping areas and escape routes, with adequate ventilation. PAS 63100 sets
                the rules.
              </li>
              <li>
                <strong>Detection</strong> — smoke and heat detection in the room, alerting
                occupants in time to escape.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="G99 application — typical for residential battery install"
            onSite="Even a small battery install can trip into G99 territory if the inverter export rating exceeds 16 A per phase. A single hybrid inverter at 5 kW is roughly 22 A per phase — over the threshold. Most domestic battery installs in 2026 require a G99 application, not the simpler G98 process."
          >
            <p>
              The G98 / G99 split is on the inverter\'s export current, not on whether the
              install includes a battery. Reg 551.7.4 sets the same threshold — 16 A per phase
              decides whether the protection settings are fixed by BS EN 50549-1 (G98) or agreed
              with the DNO (G99).
            </p>
            <p>
              In practice, most modern hybrid inverters on PV plus battery installs sit at 5 kW
              or 6 kW (24–26 A per phase at 230 V), which falls into G99. The G99 application
              includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-line diagram of the install.</li>
              <li>Inverter type-test certificate (BS EN 50549-1 or IEC 61727).</li>
              <li>Protection settings agreed with the DNO.</li>
              <li>Earthing arrangement.</li>
              <li>Anti-islanding declaration.</li>
            </ul>
            <p>
              The DNO assesses whether the local LV network can take the export, sets the
              protection settings, and issues a connection agreement. Only after that agreement
              is in place does the installer commission the system. Skipping the G99 process is
              not a paperwork lapse — it is illegal under the Electricity Safety, Quality and
              Continuity Regulations (ESQCR) and the DNO can require disconnection.
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

          <ContentEyebrow>Commissioning and end-of-life</ContentEyebrow>

          <ConceptBlock
            title="Commissioning checklist for a domestic battery install"
            plainEnglish="The battery is more than just a wiring job. Commissioning includes electrical tests, BMS communication checks, configuration settings, customer demonstration and handover documentation."
          >
            <p>
              A reasonable battery commissioning checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Visual inspection — pack mounted per manufacturer instructions, ventilation
                clearances correct, non-combustible substrate, separation from sleeping
                accommodation per PAS 63100.
              </li>
              <li>
                Electrical tests on the AC supply circuit — continuity, insulation resistance,
                polarity, earth fault loop impedance, RCD test (Type B per Reg 570.6.2.2).
              </li>
              <li>
                DC isolation test — both isolators (at battery and at PCE per Reg 570.6.5)
                operate, prove dead procedure can be performed at both.
              </li>
              <li>
                BMS communication — inverter sees the battery, reports correct chemistry,
                capacity, voltage, no fault codes.
              </li>
              <li>
                Anti-islanding test — disconnect the grid (open the AC isolator), confirm the
                inverter shuts down within roughly 200 ms, reconnect and confirm grid
                synchronisation.
              </li>
              <li>
                Charge / discharge test — battery accepts charge from PV (or grid), delivers
                charge to load, state of charge updates correctly.
              </li>
              <li>
                Labels per Reg 570.6.8.201–203 — warning notices at origin, metering position,
                consumer unit, battery enclosure and PCE.
              </li>
              <li>
                Customer demonstration — how to read state of charge, how to isolate in
                emergency, fire safety briefing, what to do if a fault code appears.
              </li>
              <li>
                Handover pack — manuals, MCS certificate (if applicable), G99 connection
                agreement, EIC, commissioning records, scheduled maintenance plan.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Service life and end-of-life — the battery is not house-clearance waste"
            onSite="A 10 kWh LFP pack at 80 % capacity at 10 years is a typical industry warranty point. Real-world packs reach 70–80 % at 8–12 years. End of useful life arrives when capacity drop or BMS fault codes make further operation uneconomic."
          >
            <p>
              When a domestic battery reaches end of life, three things happen in sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Decommissioning.</strong> The battery is isolated at both ends per
                Reg 570.6.5, the pack is fully discharged where the manufacturer permits, and
                the wiring is removed.
              </li>
              <li>
                <strong>Transport.</strong> Lithium batteries are classed as dangerous goods (UN
                3480 / UN 3481) for transport — they must be packaged and shipped per ADR rules.
                Most installers use the manufacturer\'s take-back scheme, which provides
                compliant packaging.
              </li>
              <li>
                <strong>Recycling.</strong> Lithium batteries fall under the UK Waste Batteries
                and Accumulators Regulations 2009 and the WEEE directive. They go to a
                registered battery recycler — never to landfill, never to general waste, never
                left at a kerbside collection. Manufacturers and producers have legal take-back
                obligations under these regulations.
              </li>
            </ul>
            <p>
              The expected service life depends on chemistry, cycle depth and temperature:
              7–10 years for typical NMC packs, 10–15 years for LFP packs operated within their
              spec. The customer should know at quote that the battery is a replaceable
              consumable on a 10-ish-year cycle, not a fit-and-forget asset.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Fitting a residential battery without checking G99 status"
            whatHappens={
              <>
                You quote and fit a 5 kW hybrid inverter with a 10 kWh battery on a domestic PV
                plus storage install. The inverter exports up to 24 A per phase. You assume
                G98 covers it because the customer "only has a small battery". Six months later,
                the DNO discovers the install during a network audit and requires immediate
                disconnection plus a retrospective G99 application. Customer is without their
                system for weeks; you are facing a difficult conversation about who pays for the
                rework.
              </>
            }
            doInstead={
              <>
                Check the inverter export rating in amps per phase before quoting. Anything above
                16 A per phase is G99 territory regardless of whether it is PV-only, battery-only
                or hybrid. Submit the G99 application before installing — the DNO sets protection
                settings, agrees the connection, and issues the connection agreement. Only then
                do you commission. The G99 process takes weeks, so it has to be in the project
                plan from day one. A 3.68 kW single-phase inverter (16 A per phase) stays in G98;
                anything bigger needs G99.
              </>
            }
          />

          <Scenario
            title="Adding a battery to a 2018 PV install — what is your design call?"
            situation={
              <>
                A customer fitted a 4 kW PV system in 2018 — single string, string inverter, 16 A
                per phase export, G98 notification on file. Now wants to add a 10 kWh battery for
                evening self-consumption. The existing inverter is healthy and has years of life
                left.
              </>
            }
            whatToDo={
              <>
                Two options. AC-couple the battery — fit a separate battery inverter on the AC
                side of the consumer unit, alongside the existing PV inverter. Three conversion
                steps so round-trip efficiency lands at 85–88 %. Cheapest because the existing
                PV inverter stays in place. Or replace the existing PV inverter with a hybrid
                that handles both PV and battery on a shared DC bus. One conversion step so
                round-trip 90–95 %, but you have written off a working inverter that has years
                of useful life. For most customers in this scenario, AC-coupling is the right
                economic call — the efficiency gain from DC-coupling rarely justifies replacing
                a working PV inverter. Either way, check the resulting export current per phase
                — adding a battery inverter can push the install into G99 territory and
                trigger a fresh DNO application. Document the upgrade with an EIC for the new
                work and update the G98 notification (or submit a fresh G99 if the threshold is
                crossed).
              </>
            }
            whyItMatters={
              <>
                Battery retrofits onto existing PV are now a routine job. The wrong design choice
                wastes the customer\'s money or breaches the DNO connection agreement. Knowing
                when DC-coupling is worth the extra capital outlay and when AC-coupling is the
                pragmatic call separates an experienced installer from one going through the
                motions.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Lithium iron phosphate (LFP) is the dominant chemistry for new UK domestic battery installs — best balance of cycle life, depth of discharge and thermal stability. NMC and lead-acid are niche.',
              'BS 7671 Chapter 57 (regs 570.x) is the dedicated home for stationary secondary battery installs under A4:2026. Key regs: 570.5.1 (selection), 570.6.2.2 (Type B RCD), 570.6.5 (isolation each end), 570.6.7.203 (PAS 63100 location).',
              'PAS 63100:2024 governs in-dwelling location and fire safety. BS EN 62619 covers cell-level safety. The IET Code of Practice for EESS is the practical install handbook.',
              'The BMS is the safety-critical brain inside every lithium pack. Never disable, bridge or modify it. A failed BMS shuts the pack down — by design.',
              'DC-coupling is the default for new PV plus battery installs (one hybrid inverter). AC-coupling is the practical option when retrofitting a battery to an existing PV system.',
              'G99 applies to any inverter exporting above 16 A per phase. Most domestic battery installs in 2026 trip into G99 territory and need a full DNO pre-application — not the simpler G98 process.',
            ]}
          />

          <Quiz title="Battery storage deep dive — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Solar PV deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Installation requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
