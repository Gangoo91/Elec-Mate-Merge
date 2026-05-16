/**
 * Module 2 · Section 1 · Subsection 2 — Main types, characteristics and purposes
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.2 (applications and limitations of
 * environmental technology systems) and Unit 312 ELTP02 / AC 3.1 (provide information
 * on operational requirements and benefits).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed PV/HP/EV competence
 * belongs in MCS standalone quals (2399 / 2919 / 2921) not 2365-03.
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

const TITLE =
  'Main types, characteristics and purposes (1.2) | Level 3 Module 2.1.2 | Elec-Mate';
const DESCRIPTION =
  'A working family map of environmental technology systems an electrician will meet on UK installs — solar PV, solar thermal, ASHP, GSHP, MVHR, micro-CHP, biomass, wind, micro-hydro, EV charging and battery storage. Each system\'s purpose, characteristic output, typical scale, regulatory home and limitation.';

const checks = [
  {
    id: 'l3-m2-s1-sub2-pv-vs-thermal',
    question:
      'A customer has a south-facing roof and wants "solar". They\'re asking the difference between PV and solar thermal — what\'s the honest distinction?',
    options: [
      'They are the same — solar thermal is the modern name for PV.',
      "They look similar on the roof but do completely different jobs. PV converts sunlight into DC electricity that an inverter turns into AC for the property and the grid. Solar thermal absorbs sunlight as heat and uses it to preheat domestic hot water (DHW) via a heat exchanger in a twin-coil cylinder. PV is electricity-out, governed by BS 7671 Section 712 + MCS MIS 3002. Solar thermal is heat-out, governed by Building Regs Part L + MCS MIS 3001. PV has overtaken solar thermal in the UK because PV electricity now runs the immersion or heat pump that heats the water — one collector, two jobs.",
      'PV is for winter use; solar thermal is for summer use.',
      'PV is illegal in the UK; only solar thermal is allowed.',
    ],
    correctIndex: 1,
    explanation:
      "Solar thermal had its day in the early 2000s when PV was expensive. PV prices have collapsed and PV's flexibility — drives the heat pump, charges the EV, exports to grid, runs the lights — has made it the default. Solar thermal still exists but is increasingly rare on new installs. The MCS sign-off and regulatory home are different for each technology. Recognising which kind of 'solar' the customer is asking about is the first move.",
  },
  {
    id: 'l3-m2-s1-sub2-ashp-vs-gshp',
    question:
      'When would a ground-source heat pump be the right choice over an air-source heat pump?',
    options: [
      'Always — ground-source is just better.',
      "When the site has space for the ground loop (a bored borehole or a horizontal slinky array in a large garden), and the customer wants the highest possible SCOP and the longest equipment life, and the up-front cost is acceptable. Ground temperature stays close to 8-12°C year-round, so GSHP doesn't suffer the cold-day SCOP penalty that ASHP does. ASHP is right for most retrofits — cheaper, faster to install, no garden disruption — and modern ASHP units are now respectable performers. GSHP wins on performance and lifetime; ASHP wins on cost and constructability.",
      'When the customer hates fans.',
      'Whenever the customer asks for the cheapest option.',
    ],
    correctIndex: 1,
    explanation:
      "GSHP installations require either a horizontal slinky (large garden, shallow trench, ~50-150 m of pipe per kW heating output) or a vertical borehole (drilled to 50-150 m depth). Both are expensive and disruptive. The pay-off is a stable 8-12°C ground source temperature regardless of weather, so SCOP typically clears 4.0-5.0. ASHP SCOP is more variable — typically 2.8-3.8 across a UK heating season. For new-build with land available the calculation often favours GSHP; for a retrofit on a postage-stamp garden, ASHP wins on practicality.",
  },
  {
    id: 'l3-m2-s1-sub2-battery-purpose',
    question:
      'What does a domestic battery storage unit actually do for a customer with PV?',
    options: [
      'It generates additional electricity overnight.',
      "It time-shifts PV-generated energy. PV typically over-generates at midday when nobody is in (export to grid at the SEG rate, often 5-15p/kWh) and under-generates at evening peak when the family is in (import from grid at 25-35p/kWh). The battery captures the midday surplus and discharges it across the evening load. Net effect: much higher self-consumption of the PV (typically 70-90% with battery vs 25-40% without), much lower grid import, much shorter PV payback. The battery doesn't generate anything — it shifts when the customer uses what the PV makes.",
      'It powers the property when the grid fails — that\'s its only purpose.',
      'It exports surplus electricity faster.',
    ],
    correctIndex: 1,
    explanation:
      "Time-shifting is the financial argument for batteries. The grid backup function (UPS / island mode) is a secondary feature — most domestic batteries don't island automatically and require a separate ATS or hybrid inverter. The MCS standard for battery storage (MIS 3012) covers safety, commissioning and labelling. BS 7671 Section 712 (extensively revised in A4:2026) covers the electrical interface for battery storage systems integrated with PV.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which family of environmental technology systems does an electrician most commonly meet on UK domestic installs?',
    options: [
      'Tidal, geothermal, hydrogen.',
      "Heat pumps (ASHP / GSHP), solar PV, EV charging, battery storage and MVHR — these five make up the bulk of MCS-regulated and Part L-relevant kit on UK domestic sites today. Solar thermal, micro-CHP, biomass, wind and micro-hydro all exist but are far less common. The five common families share regulatory homes (BS 7671 Section 712 / 722 / 753, MCS MIS 3002 / 3005 / 3007 / 3012, Building Regs Part L) and the electrician's interface logic is broadly similar across them.",
      'Tidal, wave, biomass.',
      'Hydrogen boilers — they\'re everywhere now.',
    ],
    correctAnswer: 1,
    explanation:
      "Hydrogen boilers remain a distant prospect — the trial schemes have not converted into mainstream rollout. Heat pumps, PV, EV charging, batteries and MVHR are what an electrician sees in the field today. Knowing the five core families in depth, plus the others as recognition-level, covers the AC 1.2 requirement to 'specify the main types, characteristics and purposes' without overstating obscure tech.",
  },
  {
    id: 2,
    question:
      'What\'s the typical electrical interface for a domestic ASHP install?',
    options: [
      'A 13 A plug socket.',
      "A dedicated radial circuit, typically 32 A or 40 A (Type C MCB to handle the inrush from the compressor and fan), in 6 mm² or 10 mm² T&E or SWA depending on length and method. RCD protection per BS 7671 Section 411.3.3 / 415.1. A local rotary or DP isolator outdoors at the unit. Smart controls integration via dedicated low-voltage cable. Cyclic-rated cable selection — heat pumps run for hours, not minutes. Bonding to the unit chassis if it forms an extraneous-conductive part.",
      'A 30 A blue Commando socket on a domestic ring final.',
      '110 V CTE supply via a transformer.',
    ],
    correctAnswer: 1,
    explanation:
      "The supply must be sized for the heat pump's nameplate maximum load, not its average. Manufacturer schedules typically specify the MCB type and cable size. The local outdoor isolator is a maintenance-and-emergency interface — the F-Gas-certified engineer will use it. Heat pumps draw their full load for sustained periods (hours) so cable thermal rating is the design constraint, not voltage drop.",
  },
  {
    id: 3,
    question:
      'What does kWp mean on a PV system spec, and how does it relate to the actual annual yield in the UK?',
    options: [
      'kWp is the actual continuous output in kW.',
      "kWp (kilowatt-peak) is the array's nameplate output under Standard Test Conditions (1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum). It's a laboratory rating, not a real-world output. Annual yield in the UK is normally quoted as kWh per kWp per year — typically 800-1100 depending on roof orientation, pitch and shading. So a 4 kWp array on a south-facing roof in southern England might deliver 4 × 1000 = 4000 kWh per year; the same array on a north-facing roof might deliver 4 × 600 = 2400 kWh. The kWp tells you the size; the kWh per kWp tells you the real-world.",
      'kWp is the maximum surge power the array can deliver in a thunderstorm.',
      'kWp is the inverter\'s frequency.',
    ],
    correctAnswer: 1,
    explanation:
      "Customers often confuse kWp (peak rating) with kWh (energy delivered). The MCS yield calculator and SAP both use long-run irradiance data plus the array's orientation and shading to produce the kWh-per-kWp number. Always quote both — the customer needs the kWh number to estimate financial savings.",
  },
  {
    id: 4,
    question:
      'What\'s the practical difference between an MCS Mode 3 and a Mode 4 EV charger?',
    options: [
      'Mode 3 is petrol; Mode 4 is diesel.',
      "Mode 3 is AC charging through a dedicated charger that controls and protects the charging session — typical domestic 7 kW units (single-phase) or 22 kW units (three-phase). The vehicle's onboard charger converts AC to DC for the battery. Mode 4 is DC fast charging — the off-vehicle equipment (typically 50-350 kW public rapid chargers) outputs DC directly to the battery, bypassing the vehicle's onboard charger. Domestic installations are essentially always Mode 3. BS 7671 Section 722 (significantly amended in A4:2026) governs the electrical installation requirements.",
      'Mode 3 is for cars; Mode 4 is for vans.',
      'They are the same.',
    ],
    correctAnswer: 1,
    explanation:
      "The IEC 61851 / BS EN 61851 'Mode' terminology defines the control and protection arrangement for EV charging. Mode 1 (no protection — banned in the UK) and Mode 2 (in-cable protection — the granny lead) are not used for permanent installs. Mode 3 is the standard domestic / workplace AC interface. The Smart Charging Regulations 2021 add demand-side response requirements on top of the BS 7671 electrical safety requirements.",
  },
  {
    id: 5,
    question:
      'When would micro-CHP (combined heat and power) make sense over a heat pump?',
    options: [
      'Always — micro-CHP is more efficient.',
      "Rarely, in the modern UK context. Micro-CHP burns gas to generate electricity locally and uses the waste heat to drive the wet system. It made sense when grid electricity was carbon-intensive (~500 gCO₂/kWh) and gas was cheap. As the grid decarbonises (~200 gCO₂/kWh now), the relative carbon advantage shrinks. Heat pumps deliver lower running carbon per kWh of heat. Micro-CHP is now mostly seen in larger commercial / institutional applications where heat demand is constant and high. For domestic UK new-build, the Future Homes Standard effectively rules it out.",
      'Whenever the customer has a chimney.',
      'On every new-build by default.',
    ],
    correctAnswer: 1,
    explanation:
      "Micro-CHP had a moment in the late 2000s / early 2010s. The economic and carbon case has weakened as the grid has cleaned up. The technology isn't dead — engine-based CHP at 5-50 kWe scale still suits some commercial premises with high constant heat demand — but it isn't the default for domestic any more. As the apprentice you should recognise CHP as a category but not over-pitch its current relevance.",
  },
  {
    id: 6,
    question:
      'What characterises biomass heating for the domestic UK customer?',
    options: [
      'It\'s the cheapest heating option in every case.',
      "Wood-pellet or wood-chip boilers and stoves. Burns sustainably-sourced biomass to drive a wet heating system. Counts as 'low-carbon' because the CO₂ released is offset by what the trees absorbed during growth (debated within the carbon accounting community). Fuel storage, ash handling and air-quality regulation (Clean Air Act zones; the Ecodesign Directive for new appliances) make biomass operationally heavier than gas or heat pumps. Best fit: rural off-gas-grid properties with space for a fuel store. Worst fit: urban smoke-control areas with poor PM2.5 ratings.",
      'It\'s a refrigerant cycle like a heat pump.',
      'It only burns coal.',
    ],
    correctAnswer: 1,
    explanation:
      "Biomass had a boost from the Renewable Heat Incentive (RHI) which closed in 2022. New domestic biomass installs are now relatively rare — heat pumps have taken over the off-gas-grid retrofit market. Air quality concerns in urban areas have further squeezed it. As an electrician you may still meet existing biomass installs (boilers need 13 A or 16 A supply for the auger, igniter and pump; controls integrate with the wet system).",
  },
  {
    id: 7,
    question:
      'What\'s the practical limitation that rules out wind for most UK suburban gardens?',
    options: [
      'Planning permission only — physics is fine.',
      "Wind shear from neighbouring buildings. Domestic-scale turbines need clean laminar wind, which only happens at hub heights well clear of surrounding obstacles. In a typical suburban garden the turbine sits in turbulent air, the yield is well below the manufacturer's wind-tunnel claims, and the noise / vibration interface is poor. Even where the planning application succeeds, the energy yield often disappoints. Wind makes sense in open rural settings with tall masts; it does not make sense in suburban back gardens.",
      'They\'re illegal.',
      'They damage the National Grid.',
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer yield figures are quoted at clean reference wind speeds. In real suburban sites the actual wind regime delivers a fraction of that. Several high-profile small-wind installations from the 2008-2012 era posted yields well below promise and the market for sub-10 kW turbines has since contracted. As an electrician you may meet existing units but new domestic installs are uncommon.",
  },
  {
    id: 8,
    question:
      'A customer in a rural Welsh valley with a fast-flowing year-round stream asks about micro-hydro. What\'s the honest framing?',
    options: [
      'It will never work in the UK.',
      "Micro-hydro can deliver excellent baseload renewable electricity if the site has the head (vertical drop) and flow rate to support it. Unlike wind and PV, hydro runs 24/7 and tracks demand reasonably well. Practical issues: Environment Agency / Natural Resources Wales abstraction licensing, fish protection requirements, weir and intake construction cost, and connection to the property (often hundreds of metres of buried cable). The right site is rare; where it exists, micro-hydro is one of the best-performing renewables per pound spent.",
      'It only works in Scotland.',
      'It\'s a heat pump variant.',
    ],
    correctAnswer: 1,
    explanation:
      "Micro-hydro is genuinely site-specific. Where head and flow are adequate it produces consistent output with low intermittency. The capital cost (turbine, intake, power-house, civils, grid connection) is the headline barrier; the operational cost is low. As an electrician you'd encounter it as a G99 connection installer or as the cable-and-controls specialist on the property side. MCS MIS 3008 covers small-hydro installation standards.",
  },
];

const faqs = [
  {
    question: "If I had to remember just five environmental tech families, which five would they be?",
    answer:
      "Heat pumps (air-source / ground-source), solar PV, EV charging, battery storage, and MVHR. These five cover almost every UK domestic install you'll see in 2026 and beyond. Each has a clear MCS standard (MIS 3002, 3005, 3007, 3012; MVHR sits under Building Regs Part F rather than MCS) and a clear electrical interface. Solar thermal, micro-CHP, biomass, wind and micro-hydro round out the family for completeness, but you'll meet them less often.",
  },
  {
    question: "Why does the task sometimes call out 'MCS' before talking about the technology itself?",
    answer:
      "MCS (Microgeneration Certification Scheme) is the competence and quality scheme that gates eligibility for various government incentives — currently the Smart Export Guarantee (SEG) for PV export, and historically the Renewable Heat Incentive (RHI) and Feed-in Tariff (FiT). For a customer to claim those payments the installer has to be MCS-certified for the technology in question, and the install has to be signed off against the relevant MCS Installation Standard (MIS). It's not a legal requirement to install — but it's a financial requirement for incentive eligibility, which in practice means most customers want it.",
  },
  {
    question: "What's a hybrid heat pump and where does it fit?",
    answer:
      "A hybrid heat pump pairs a smaller-than-full-load heat pump with a gas boiler. The heat pump handles the bulk of the heating season at high SCOP; the boiler kicks in for cold spells where the heat pump can't keep up or where the radiator system isn't sized for low-flow operation. Hybrids are a halfway-house that can suit older properties where full heat-pump-only retrofit is hard. They are explicitly recognised in some MCS guidance. They aren't future-proof — eventually the gas boiler comes out and the heat pump is upsized — but they can be the right step for a particular customer at a particular time.",
  },
  {
    question: "How big a battery is realistic for a domestic PV install?",
    answer:
      "Typical domestic battery sizes range from 5 kWh to 15 kWh. Sizing depends on the PV array (you can't store more than the PV will generate), the customer's evening load (a typical UK family uses 8-15 kWh per day), and the customer's tariff. A 5 kWh battery covers a modest evening load; 10 kWh suits a typical family; 15 kWh suits high-consumption households or those time-shifting heat-pump load on Octopus Cosy / Agile / Go tariffs. BS 7671 Section 712 covers the electrical interface; manufacturer's instructions cover ventilation, location and isolation.",
  },
  {
    question: "Is solar thermal dead?",
    answer:
      "Effectively, in the UK new-install market. PV prices have fallen so far that the same roof area covered in PV (driving an immersion or heat pump for hot water) usually delivers more total useful energy and more flexibility than solar thermal collectors driving a twin-coil cylinder. Solar thermal still works fine where it exists and you'll meet existing installs in service. The technology isn't broken — it's been outcompeted by cheaper, more flexible PV.",
  },
  {
    question: "Why does the MVHR install sometimes specify both supply and extract grilles in one room?",
    answer:
      "Some rooms (particularly large open-plan living spaces) need both fresh-air supply and extract to maintain even airflow without short-circuit. The ductwork designer balances supply and extract per room and per floor. As the electrician you don't decide grille placement — you wire the unit, the boost switches and any commissioning sensors — but you'll see the duct schematic on commissioning.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 2"
            title="Main types, characteristics and purposes"
            description="A working family map of environmental technology systems an electrician will meet on UK installs — five core families (heat pumps, PV, EV, batteries, MVHR) plus solar thermal, micro-CHP, biomass, wind and micro-hydro for recognition. Each system's purpose, scale, regulatory home and limitation."
            tone="emerald"
          />

          <TLDR
            points={[
              "Five families dominate UK domestic environmental tech today — heat pumps (ASHP/GSHP), solar PV, EV charging, battery storage, MVHR. Solar thermal, micro-CHP, biomass, wind and micro-hydro round out the family but are less common.",
              "Each system has a regulatory home — BS 7671 Section 712/722/753 for the electrical interface, MCS MIS 300x for installer competence, Building Regs Part L for energy/Part F for ventilation.",
              "kWp ≠ kWh. PV's nameplate kWp is a laboratory rating; UK annual yield is typically 800-1100 kWh per kWp per year depending on orientation, pitch and shading.",
              "Battery storage doesn't generate energy — it time-shifts PV output from midday surplus to evening peak. That's the financial argument; backup-island mode is a secondary feature.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the main types of environmental technology systems an electrician will meet on UK domestic and small-commercial installs — heat pumps, PV, EV charging, battery storage, MVHR, solar thermal, micro-CHP, biomass, wind, micro-hydro.",
              "State the characteristic operating principle, typical scale, and primary purpose of each system family.",
              "Identify the relevant regulatory home for each system — BS 7671 section, MCS MIS standard, Building Regs part — at recognition level.",
              "Distinguish PV from solar thermal in terms of output (electricity vs heat), interface and current market relevance.",
              "Distinguish ASHP from GSHP in terms of source temperature, SCOP, capital cost and constructability.",
              "Explain the purpose of battery storage in a PV-equipped home — time-shifting midday surplus to evening peak — and recognise its role in self-consumption optimisation.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The five common families</ContentEyebrow>

          <ConceptBlock
            title="Heat pumps — air-source (ASHP) and ground-source (GSHP)"
            plainEnglish="Heat pumps are upgraders. ASHP draws heat from outdoor air; GSHP draws heat from the ground (via a horizontal slinky in a trench or a vertical borehole). Both run a vapour-compression cycle and deliver heat to a wet system. ASHP dominates UK retrofit because it's cheaper and faster to install. GSHP suits new-build with land available, where the higher capital cost is recovered through better SCOP and longer life."
            onSite="Electrical interface — typically a 32 A or 40 A radial on a Type C MCB, 6 mm² or 10 mm² cable, RCD per Section 411.3.3, local outdoor isolator, smart controls integration. Refrigerant work is F-Gas-certified-only — not your responsibility. Bonding the outdoor unit chassis if it forms an extraneous-conductive-part."
          >
            <p>
              Headline numbers per system:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ASHP</strong> — typical domestic size 5-16 kW heat output. SCOP 2.8-3.8
                across a UK heating season for properly designed systems. Capital cost
                £10-15k typical. MCS MIS 3005.
              </li>
              <li>
                <strong>GSHP</strong> — same heat output range. SCOP 4.0-5.0 (more stable
                because ground temperature is steady at 8-12°C). Capital cost £20-35k typical
                including ground array. MCS MIS 3005.
              </li>
              <li>
                <strong>Hybrid heat pump</strong> — small heat pump paired with gas boiler for
                cold spells. Suits older properties with under-sized radiator systems where
                full heat-pump-only retrofit is impractical.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Solar PV — the dominant harvest technology"
            plainEnglish="PV converts sunlight directly to DC electricity in silicon cells. An inverter converts the DC to AC for the property. Modern domestic installs typically range 3-8 kWp, often paired with a battery. The MCS MIS 3002 standard covers installer competence. BS 7671 Section 712 (extensively revised in the A4:2026 amendment) covers the electrical interface."
            onSite="DC side runs from the panels through string fuses and DC isolators into the inverter. AC side runs from the inverter through an AC isolator, an MID-compliant generation meter, and an MCB into the consumer unit. Earth-bonding of the array frame, DC-side isolation accessible at the array, AC-side isolation accessible at the inverter and the consumer unit. ENA G98 notification for systems up to 16 A per phase; G99 for larger."
          >
            <p>
              Key characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>kWp (kilowatt-peak)</strong> — nameplate output at Standard Test
                Conditions (1000 W/m², 25°C, AM 1.5). Real-world is normally less.
              </li>
              <li>
                <strong>Annual yield</strong> — typically 800-1100 kWh per kWp per year on UK
                roofs. Orientation, pitch and shading dominate the figure.
              </li>
              <li>
                <strong>Self-consumption</strong> — without battery, typically 25-40% of
                generation; with battery, 70-90%. Self-consumption drives the financial case.
              </li>
              <li>
                <strong>Smart Export Guarantee (SEG)</strong> — payment for exported energy.
                Tariffs vary 5-15p/kWh between suppliers. MCS-certified install required.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="EV charging — Mode 3 dominates domestic"
            plainEnglish="An EV charger is the controlled interface between the property's electrical installation and the vehicle's onboard charger. Domestic installs are essentially always Mode 3 (AC charging via dedicated equipment). Typical domestic units: 7 kW single-phase (32 A) or 22 kW three-phase (32 A per phase). Public rapid chargers are Mode 4 (DC) at 50-350 kW. BS 7671 Section 722 (significantly amended in A4:2026) covers the electrical installation."
            onSite="Dedicated radial circuit, Type B RCD or RCD with DC fault detection per Section 722, local isolation, dedicated MCB. Earthing arrangement matters — PME-supplied installations need either an open-PEN protection device (built into most modern chargers) or an earth electrode for the EV chassis to satisfy Section 722 requirements. The Smart Charging Regulations 2021 require demand-side response capability on units sold for installation."
          >
            <p>
              Why Mode 3 not Mode 1/2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mode 1</strong> — direct connection, no protection. Banned in the UK
                for safety reasons.
              </li>
              <li>
                <strong>Mode 2</strong> — in-cable protection (the &quot;granny lead&quot;).
                Allowed for emergency / occasional use only.
              </li>
              <li>
                <strong>Mode 3</strong> — dedicated charger with full protection and
                communication. The standard for permanent installs.
              </li>
              <li>
                <strong>Mode 4</strong> — off-vehicle DC supply. Public rapid chargers and
                some commercial fast-chargers.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery storage — the time-shifter"
            plainEnglish="A domestic battery captures excess PV generation during the day and discharges it across the evening peak. Without a battery, only 25-40% of PV generation is consumed on-site (the rest exports at low SEG rates); with a battery, self-consumption rises to 70-90%. The battery doesn't generate energy — it shifts when the customer uses it. Typical sizes 5-15 kWh."
            onSite="Hybrid inverters integrate PV, battery and grid in one unit (most modern installs). AC-coupled batteries connect via their own inverter alongside an existing PV system. Either way the electrical interface includes battery DC isolation, AC isolation at the inverter, integration with the consumer unit, and labelling per BS 7671 Section 712 + MCS MIS 3012. Ventilation and location follow the manufacturer's instructions; lithium-ion batteries are regulated for fire-safety placement (not in escape routes, not near heat sources)."
          >
            <p>
              Key sizing considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Battery capacity should match the daily PV surplus and the customer's evening
                load profile. Oversizing wastes capital; undersizing wastes generation.
              </li>
              <li>
                Tariff matters — some customers benefit from time-of-use tariffs (Octopus
                Cosy, Agile, Go) where the battery charges from cheap overnight grid as well
                as from PV.
              </li>
              <li>
                Backup / island operation is a separate feature — not all batteries provide it.
                The customer who wants &quot;the lights to stay on in a power cut&quot; needs
                to specify backup explicitly.
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

          <ConceptBlock
            title="MVHR — the recovery default in airtight new-build"
            plainEnglish="Mechanical ventilation with heat recovery supplies fresh air to bedrooms and living spaces, extracts stale air from kitchens and bathrooms, and recovers 80-90% of the heat in the extract air via a counter-flow exchanger. Standard kit on Future Homes Standard new-build, retrofit-feasible only in airtight, well-insulated properties. Building Regs Part F covers ventilation requirements; Part L credits MVHR with significant SAP improvements."
            onSite="Electrical interface — dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, local isolation, kitchen and bathroom boost wiring (sometimes via remote sensors, sometimes via switches). The ducting and commissioning is the ventilation specialist\'s domain; you wire the unit and the boost network."
          >
            <p>
              MVHR works only when the building is airtight enough that controlled ventilation
              is the dominant air-change pathway. SAP and SBEM credit MVHR with significant
              savings only when air permeability is below threshold values (typically below
              3 m³/h/m² @ 50 Pa). In a leaky building the fan power consumed outweighs the
              heat recovered.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (Electric vehicle charging installations) — significant changes for A4"
            clause={
              <>
                Section 722 has been significantly amended in A4:2026 to reflect updated
                requirements for EV charging installations, including refinements to RCD
                selection, open-PEN protection requirements for PME-supplied installations,
                and integration with smart-charging functionality.
              </>
            }
            meaning={
              <>
                As Unit 301 is overview-level, you need to recognise that Section 722 is the
                regulatory home for EV charging electrical installations and that A4:2026
                contains material changes. The detailed application — RCD type selection,
                PEN-fault detection device choice, earthing arrangement decisions — is taught
                in the EV charging-specific qualification 2921 and applied by the MCS-certified
                installer. As an apprentice on an EV install you read the manufacturer\'s
                instructions, follow Section 722, and let the certified installer make the
                regulatory judgement calls.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar photovoltaic (PV) power supply systems) — scope"
            clause={
              <>
                Requirements of Section 712 shall apply to PV installations not connected to a
                system for distribution of electricity to the public, in parallel with a system
                for distribution of electricity to the public, and as an alternative to a system
                for distribution of electricity to the public.
              </>
            }
            meaning={
              <>
                Whichever flavour of PV the customer ends up with — grid-parallel (the typical
                domestic install), off-grid (rural / island), or replacement-supply (rare) —
                the same Section 712 applies. As the L3 electrician on site you do not need
                to memorise which case is which; you do need to recognise that PV always sits
                under Section 712 plus the relevant MCS MIS standard for installer competence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Section 712."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (Electric vehicle charging installations) — scope"
            clause={
              <>
                Section 722 applies to electric vehicle charging installations. It modifies
                general requirements for protection against electric shock and includes specific
                requirements with regard to PME systems, socket-outlets and connectors, external
                influences, isolation and switching and RCD protection. The requirements of
                Section 722 do not apply to wireless charging, such as inductive charging.
              </>
            }
            meaning={
              <>
                When you walk onto an EV install, Section 722 is the first place to look — and
                A4:2026 brought significant changes for PME (TN-C-S) supplies, RCD selection
                and connector requirements. Wireless charging is out of scope, but that&apos;s
                rare on UK domestic. Mode 3 AC charging on a dedicated radial circuit is what
                you&apos;ll meet day-to-day.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Section 722."
          />

          <SectionRule />

          <ContentEyebrow>The less common family — recognise but don\'t overstate</ContentEyebrow>

          <ConceptBlock
            title="Solar thermal, micro-CHP, biomass, wind, micro-hydro"
            plainEnglish="These five technologies all exist and you may meet them in the field, but new domestic installs are uncommon. The market has consolidated around heat pumps, PV, EV, batteries and MVHR. Recognise each — purpose, scale, regulatory home — without overstating their current relevance."
            onSite="On a 2026 install, treat heat pumps + PV + EV + battery + MVHR as the default family. Treat the rest as recognition-level — you should be able to identify them, describe what they do, and explain why they\'re less common, but you won\'t be designing or installing them as routine work."
          >
            <p>
              Quick reference:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar thermal</strong> — collectors heat fluid that preheats DHW via
                a twin-coil cylinder. Outcompeted by PV + immersion or PV + heat pump for
                most retrofits. MCS MIS 3001.
              </li>
              <li>
                <strong>Micro-CHP</strong> — burns gas to generate electricity locally and
                uses waste heat for the wet system. Carbon advantage erodes as the grid
                cleans up. Mainly seen in larger commercial / institutional applications now.
              </li>
              <li>
                <strong>Biomass</strong> — wood-pellet or chip boilers and stoves. Best fit:
                rural off-gas-grid with fuel storage. Worst fit: urban smoke-control areas.
                MCS MIS 3004 / 3006. Air-quality regulation tightening.
              </li>
              <li>
                <strong>Wind</strong> — small turbines (sub-10 kW). Suits open rural sites
                with tall masts and clean wind. Suburban back-garden installs almost always
                disappoint due to wind shear from surrounding buildings.
              </li>
              <li>
                <strong>Micro-hydro</strong> — site-specific, needs both head (vertical drop)
                and flow rate. Where the site exists, micro-hydro delivers excellent baseload
                renewable. Environment Agency / Natural Resources Wales licensing is the
                non-trivial step. MCS MIS 3008.
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

          <ContentEyebrow>Heat-pump variants in deeper detail</ContentEyebrow>

          <ConceptBlock
            title="ASHP, GSHP, WSHP, exhaust-air and high-temperature variants"
            plainEnglish="The 'heat pump' label covers a small family of variants that share the vapour-compression cycle but differ in heat source and target temperature. Knowing which variant a site has tells you what flow temperature to expect, what SCOP is realistic, and what electrical interface you are dealing with."
            onSite="On a domestic install the variant is decided by the MCS designer based on heat-loss survey, plot constraints and customer budget. As the L3 electrician you read it off the order paperwork and design the supply, isolation, controls and bonding around it. The supply rating, RCD type, smart-control comms and outdoor-unit bonding are common across all variants — what changes is the unit&apos;s nameplate (and therefore cable size and OCPD), the pipework you will see (refrigerant only on monoblocs vs split, water for GSHP loops, exhaust duct for EAHP) and any ancillary controls."
          >
            <p>
              The five variants worth recognising:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ASHP (air-source)</strong> — outdoor coil draws heat from ambient air.
                Monobloc (refrigerant stays outside, water pipes only inside) or split
                (refrigerant runs between outdoor and indoor units, F-Gas-certified
                installer required for the indoor connections). UK retrofit default.
              </li>
              <li>
                <strong>GSHP (ground-source)</strong> — buried horizontal slinky in a trench
                or vertical borehole. Source temperature 8-12 degC year-round so SCOP 4-5
                is achievable. Capital is higher because of the groundworks; lifetime is
                longer because the compressor is not freezing-and-defrosting.
              </li>
              <li>
                <strong>WSHP (water-source)</strong> — heat extracted from a river, lake or
                aquifer. Site-specific; requires Environment Agency abstraction licence in
                most cases. Excellent SCOP where the water source is stable.
              </li>
              <li>
                <strong>EAHP (exhaust-air)</strong> — small (typically 1-3 kW) unit drawing
                heat from the building&apos;s ventilation extract air. Common in Passivhaus
                / very low-energy homes where total heat demand is small. Often integrated
                with MVHR.
              </li>
              <li>
                <strong>High-temperature ASHP (HT-ASHP)</strong> — uses two-stage
                compression or CO2 (R-744) refrigerant to deliver flow temperatures of
                65-80 degC. Allows retrofit onto existing radiators sized for gas-boiler
                flow temperatures. SCOP lower than a low-temperature install (typically
                2.5-3.0) but the radiator survey is much easier to pass.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Solar thermal, biomass, micro-wind and micro-hydro — recognition-level detail"
            plainEnglish="The 'less common' family is recognition-level for Unit 301 — you do not need to design any of these, but you do need to recognise the kit when you meet it on a maintenance call, an EICR or an extension job. Each has its own MCS standard, its own typical install context, and its own characteristic failure mode."
            onSite="If you walk onto a site with one of these technologies already installed, your job is to identify it, isolate it safely if your work touches it, and refer the customer to a competent specialist for any system-specific work. Solar thermal is the most likely retrofit hand-off — you may be asked to swap a tired pump or replace controls. Biomass, micro-wind and micro-hydro are normally specialist-only domains where the L3 electrician supplies and isolates only."
          >
            <p>
              Quick-reference field guide:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar thermal (MCS MIS 3001)</strong> — flat-plate or evacuated-tube
                collectors on the roof, glycol-filled primary loop, twin-coil DHW
                cylinder. Typical scale 2-4 m2 collector area for a family home. Common
                failure mode: stagnation damage in unattended summer when the household is
                away. Pump and controller are the L3 electrician&apos;s scope; the panel
                and the glycol loop are the heating engineer&apos;s.
              </li>
              <li>
                <strong>Biomass (MCS MIS 3004 / 3006)</strong> — wood-pellet or wood-chip
                boiler with a hopper or silo, automated auger feed, ash collection,
                flue. Typical 10-25 kW domestic. Common failure: ash build-up in the
                burner or flue blockage from poor-quality fuel. L3 electrician scope:
                supply, controls, ignition heater, flue gas analyser interlock.
                Smoke-control area rules under the Clean Air Act 1993 may restrict the
                fuel type.
              </li>
              <li>
                <strong>Micro-wind (MCS MIS 3003)</strong> — small turbine on a free-standing
                mast or building-mounted bracket. Building-mounted units almost always
                disappoint due to wind shear; mast-mounted units in genuinely open rural
                sites perform reasonably. Planning permission in many areas. ENA G98
                /G99 connection. Common failure: bearings and yaw motors in salt-air
                environments.
              </li>
              <li>
                <strong>Micro-hydro (MCS MIS 3008)</strong> — Pelton, Turgo or crossflow
                turbine on a stream or river drop. Site-specific — needs head (vertical
                drop) and flow rate. Environment Agency / Natural Resources Wales
                abstraction licence is the non-trivial step. Where the site exists,
                excellent baseload renewable. L3 electrician scope: AC connection from
                turbine house to property, isolation, bonding of metallic structures.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting the customer the kWp figure as if it were the kWh annual output"
            whatHappens={
              <>
                Apprentice tells the customer their 4 kWp PV array will deliver 4 kWh a year.
                The customer either thinks the system is hopeless (when actually it\'ll
                deliver around 4000 kWh) or, more often, the apprentice means the right
                number but the customer reads back &quot;you said 4 kWh&quot;. The
                customer-facing number is annual kWh, not the nameplate kWp. Confusing the
                two undermines trust in the install before the panels go on the roof.
              </>
            }
            doInstead={
              <>
                Always quote both numbers and explain the relationship. &quot;Your roof will
                take a 4 kWp array. UK yield on your orientation works out at around 950 kWh
                per kWp per year, so we&apos;re estimating 3,800 kWh a year — roughly the
                annual electricity consumption of a typical UK family of four.&quot; The MCS
                yield calculator produces the exact figure for the SAP and the customer
                handover pack.
              </>
            }
          />

          <CommonMistake
            title="Assuming wind is the next obvious step after solar"
            whatHappens={
              <>
                Customer asks &quot;I&apos;ve got solar — what should I do next?&quot;.
                Apprentice (or the marketing they&apos;ve seen) suggests wind. Customer
                spends £8-15k on a 1-3 kW back-garden turbine. Real-world yield is well
                below the manufacturer&apos;s claim because wind shear from surrounding
                buildings makes the wind unsteady. Customer is unhappy, the install becomes
                a regret purchase, and the trade picks up the reputational damage.
              </>
            }
            doInstead={
              <>
                For a customer with PV, the next-step ladder is normally — battery storage
                (extends self-consumption), smart EV charger (loads the surplus into the
                car), then heating electrification (heat pump replacing gas / oil). Wind is
                rarely the right next step in suburban contexts. If the customer is in a
                genuinely open rural location with clean wind, a proper site survey by a
                wind specialist is the answer — not an off-the-shelf back-garden turbine.
              </>
            }
          />

          <Scenario
            title="New-build show home — the customer wants the &quot;full green package&quot;"
            situation={
              <>
                The customer is looking at a new-build with no environmental tech as
                standard. They want to know what to add to make the house &quot;as green as
                reasonably possible&quot; within a £25-30k budget on top of the base
                purchase price. The plot has a south-facing roof of 30 m² usable area, a
                small garden (no room for ground loops), a single-phase 100 A supply, and
                the customer drives a petrol car they plan to replace with an EV in the
                next two years.
              </>
            }
            whatToDo={
              <>
                Recommend the five-family core: a 5-7 kWp PV array (south-facing, ~5000-6500
                kWh/year), a 10 kWh battery (for evening self-consumption), a 7 kW EV
                charger (single-phase, ready for the EV), an air-source heat pump with
                low-temperature radiators or underfloor (replacing whatever the developer
                planned), and MVHR if the building shell is airtight enough (check the
                developer&apos;s air permeability test result). That combination consumes
                roughly £25-30k typically and covers all four operating principles. Wind
                doesn&apos;t fit (no clean wind), micro-hydro doesn&apos;t fit (no stream),
                solar thermal is outclassed by PV + immersion, biomass doesn&apos;t fit (no
                fuel store, urban smoke concerns).
              </>
            }
            whyItMatters={
              <>
                The customer-facing conversation needs the five-family frame. The five
                technologies cover all four operating principles (harvest, upgrade, recovery,
                demand reduction); together they hit Future Homes Standard or better.
                Throwing wind or micro-hydro at the wrong site is a textbook way to waste
                the customer&apos;s budget and miss the actual carbon goal.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Five families dominate UK domestic environmental tech today — heat pumps (ASHP/GSHP), solar PV, EV charging, battery storage, MVHR.",
              "Solar thermal, micro-CHP, biomass, wind and micro-hydro are recognition-level — they exist but new installs are uncommon.",
              "kWp ≠ kWh. Always quote PV in both — the nameplate kWp and the expected annual kWh — and explain the relationship.",
              "ASHP dominates UK retrofit because it's cheap and quick. GSHP wins on SCOP and lifetime where land and budget allow.",
              "Battery storage is a time-shifter, not a generator. It moves PV surplus from midday to evening peak, raising self-consumption from 25-40% to 70-90%.",
              "Mode 3 EV charging is the domestic standard. Mode 1 is banned, Mode 2 is the granny lead, Mode 4 is DC rapid (public).",
              "Each system has a regulatory home — BS 7671 Section 712/722/753 (electrical), MCS MIS 300x (installer competence), Building Regs Part L/F (energy/ventilation).",
              "Customer-facing advice should respect the four operating principles and the realistic constraints of the site — wind in a suburban garden almost always disappoints.",
            ]}
          />

          <Quiz title="Environmental technology types — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Principles of environmental technology
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Renewable energy systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
