/**
 * Module 2 · Section 5 · Subsection 3 — Maintenance requirements for environmental tech
 * Maps to City & Guilds 2365-03 / Unit 301 / LO3 / AC 3.2
 *   AC 3.2 — "state the maintenance requirements for environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 1.1 (workplace procedures for safe handling,
 * storage and disposal of hazardous materials and products) and Unit 602 ELTK02 /
 * AC 1.5 (materials classed as hazardous to the environment / recyclable) and AC 1.6
 * (organisational procedures for processing materials hazardous / recyclable).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed maintenance competence belongs in
 * MCS standalone quals. This Sub gives the L3 electrician the maintenance framework
 * across the environmental tech family — what gets serviced, how often, by whom, and
 * what waste / refrigerant handling applies.
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
  'Maintenance requirements (5.3) | Level 3 Module 2.5.3 | Elec-Mate';
const DESCRIPTION =
  'Maintenance requirements for environmental technology systems — heat pump annual service, PV inspection schedule, EV charger periodic inspection, MVHR filter changes, biomass ash and flue clean. Plus the regulated waste streams — F-Gas refrigerant, lithium-ion batteries, WEEE — and what they mean for the L3 electrician on a maintenance call.';

const checks = [
  {
    id: 'l3-m2-s5-sub3-heat-pump-annual',
    question:
      'A customer phones a year after their heat-pump install asking what "annual service" actually involves. What\'s the right answer?',
    options: [
      "Nothing — heat pumps are maintenance-free for the first ten years. There is no annual service because the refrigerant circuit is sealed and the unit self-monitors; the customer can ignore it until a fault appears, and the warranty is unaffected by skipping any servicing.",
      "A multi-trade annual visit: an F-Gas engineer checks the refrigerant charge and leak-tests; a plumber checks wet-system pressure, inhibitor and flow; an electrician checks supply, isolation, RCD and controls; the outdoor unit is cleaned and performance verified. Manufacturer warranty usually requires it.",
      "Just an annual electrical safety test. The yearly service is simply an EICR-style check of the supply, isolation and RCD at the outdoor unit; the refrigerant and wet system are sealed and need no attention, so the electrician does the whole service alone.",
      "Only a software update. Modern heat pumps are serviced remotely — the manufacturer pushes a firmware update over the internet once a year and that constitutes the annual service; no engineer attends and nothing physical is checked.",
    ],
    correctIndex: 1,
    explanation:
      "Annual service is essential for warranty maintenance and SCOP retention. Refrigerant leaks, scale buildup in the wet system, fouled outdoor coil, drifted controls — all gradually erode performance and the customer doesn't notice until the bills jump. The annual service is the planned intervention that keeps the system at design SCOP. As the L3 electrician you may be the contracted service provider for the electrical scope of the annual service.",
  },
  {
    id: 'l3-m2-s5-sub3-pv-periodic-inspection',
    question:
      'A landlord with a PV system asks how often the array should be inspected and tested. What\'s the framework?',
    options: [
      "No inspection is required once a PV array is commissioned. Because the panels have no moving parts and the inverter self-monitors, the install is exempt from periodic inspection; the landlord only needs the original EIC and never has to revisit the array.",
      "A full EICR every twelve months is the legal minimum for any PV array. The Electrical Safety Standards Regulations require landlord PV to be inspected and tested annually rather than five-yearly, because the DC side is treated as a high-risk special installation needing tighter intervals than the rest of the property.",
      "A BS 7671 EICR periodic inspection applies — typically every 5 years, or 5 years / change of tenancy for landlord properties under the 2020 Regulations. For PV the IET Code of Practice also recommends an annual visual inspection and datalog review on top of the 5-year EICR.",
      "The DNO is responsible for inspecting the PV array, not the landlord. Because the array exports to the grid, the network operator carries out the periodic inspection as part of its G98 obligations; the landlord has no inspection duty and the property EICR excludes the PV circuits.",
    ],
    correctIndex: 2,
    explanation:
      "The 5-year EICR is the BS 7671 framework that catches the electrical safety baseline. The annual visual / datalog review catches the performance drift earlier. Both are good practice for a landlord PV install. For owner-occupied properties the EICR isn't legally required at a fixed interval but is recommended at 10 years (or change of occupier).",
  },
  {
    id: 'l3-m2-s5-sub3-battery-disposal',
    question:
      'A customer\'s 10 kWh lithium-ion battery has reached end-of-life and needs replacing. What waste-handling rules apply?',
    options: [
      "A domestic storage battery is general WEEE and can go in the household electrical recycling skip at the local tip. Because it is consumer equipment, no special handling applies — the customer simply drops it at the recycling centre's small-electricals point like an old kettle or toaster.",
      "The battery can be put out with the normal kerbside recycling provided the terminals are taped over. Lithium-ion cells are recyclable plastics and metals, so once the terminals are insulated against short circuit the unit is safe to leave for the council recycling collection.",
      "The customer can keep the old battery indefinitely or dispose of it however they wish, as end-of-life storage batteries are unregulated. There is no statutory waste route for a domestic battery, so it is entirely the householder's choice how to handle it.",
      "Lithium-ion batteries are hazardous waste under the Hazardous Waste and WEEE Regulations — they cannot go to landfill or general recycling. They must go to an authorised treatment centre via a licensed waste carrier, usually through the manufacturer or installer take-back scheme.",
    ],
    correctIndex: 3,
    explanation:
      "Lithium-ion battery fires in waste streams are a real and growing problem — bin lorries and recycling centres have caught fire from carelessly disposed batteries. Domestic battery storage units are large lithium-ion assemblies; they need specialist handling. The 2357 Unit 602 ELTK02 AC 1.6 explicitly requires the L3 electrician to recognise organisational procedures for processing hazardous materials. The MCS-certified installer normally arranges decommissioning; as an apprentice you should never improvise.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'How often does a typical UK domestic ASHP need a service, and what does it involve?',
    options: [
      "A heat pump never needs servicing — the sealed refrigerant circuit and self-cleaning coil mean it runs maintenance-free for its whole life. The customer can ignore it entirely, and the manufacturer warranty is unaffected by whether any servicing is ever carried out.",
      "Annual service is the standard — required by most warranties and MCS aftercare. It covers an F-Gas refrigerant check, a wet-system check, an electrical check, an outdoor-unit clean and a performance verification against the previous year. Skip it and the SCOP drifts down, the warranty voids and small faults escalate.",
      "A ten-yearly service is sufficient, timed to coincide with the property's EICR. The heat pump is checked once a decade alongside the fixed wiring inspection; an annual visit is unnecessary because the unit's electronics flag any fault automatically between inspections.",
      "Only the customer-side tasks matter — topping up the pellet hopper and emptying the ash pan. An air-source heat pump has the same fuel-handling service routine as a biomass boiler, so the annual service is just refuelling and ash removal carried out by the householder.",
    ],
    correctAnswer: 1,
    explanation:
      "Annual service is the planned-maintenance interval that keeps a heat pump at design SCOP and the manufacturer warranty valid. Customers who skip the service and 'wait for it to break' typically lose the warranty cover and pay for service-induced faults years later.",
  },
  {
    id: 2,
    question:
      'What does PV array maintenance typically include?',
    options: [
      "Monthly washing of the panels with detergent and a stiff brush to keep output high. PV maintenance is dominated by frequent cleaning, and the householder is expected to scrub the array each month; the electrical side needs no inspection because the inverter self-tests.",
      "Replacing the inverter every two years as a preventative measure. PV maintenance centres on swapping the inverter on a fixed two-year cycle before it can fail; the panels and cabling are sealed and require no inspection over the system's life.",
      "Annual visual inspection of panels, frames, cables and MC4 connectors; inverter error-log and ventilation check; datalog review against expected output; signage check at the isolation points; and a periodic 5-year EICR for the electrical condition. Soiling cleaning as needed in dusty or coastal locations.",
      "Annual refrigerant and pressure checks, the same routine as a heat pump. PV maintenance involves an F-Gas engineer checking the array's refrigerant charge and a plumber pressurising the panel loop each year; there is no electrical inspection because the DC side is sealed.",
    ],
    correctAnswer: 2,
    explanation:
      "PV is largely self-maintaining — no moving parts on the array side. The maintenance is preventative and inspection-led rather than intervention-led. Soiling, cable degradation and inverter faults are the main issues. Annual aftercare visits from the MCS-certified installer pick up most issues before they become customer-visible.",
  },
  {
    id: 3,
    question:
      'What does MVHR maintenance typically involve and how often?',
    options: [
      "MVHR is sealed for life and needs no maintenance at all. The unit recovers heat passively with no filters or moving parts, so once commissioned the customer can forget about it; there is nothing to clean, change or inspect over its service life.",
      "An annual refrigerant top-up by an F-Gas engineer is the only MVHR maintenance task. Because MVHR moves heat between airstreams it works on a refrigerant cycle like a heat pump, so the yearly service is a charge check; there are no filters to change.",
      "A five-yearly EICR is the entire MVHR maintenance requirement. MVHR is purely an electrical load, so the only servicing it needs is the periodic inspection of its supply circuit alongside the rest of the installation; the ductwork and filters are maintenance-free.",
      "Filter changes every 6-12 months, heat-exchanger cleaning every 1-2 years, ductwork inspection every 3-5 years, plus boost-control and air-flow checks at major service intervals. Without the filter changes the unit's efficiency drops sharply and indoor air quality suffers.",
    ],
    correctAnswer: 3,
    explanation:
      "MVHR maintenance is light but essential. Filter changes are the headline item — a blocked filter destroys the whole point of the system. The MCS Code (or its equivalent for non-MCS MVHR installs under Building Regs Part F) requires customer instructions on filter changes. Some smart MVHR units alert the customer when filters need changing.",
  },
  {
    id: 4,
    question:
      'What\'s the maintenance interval for a domestic biomass boiler?',
    options: [
      "Annual professional service plus weekly-to-monthly customer tasks. The annual covers a full strip-down clean, ash service, auger / igniter / fan checks, flue inspection and a performance check; the customer tops up pellets, checks the feed weekly and empties the ash pan monthly.",
      "A biomass boiler is maintenance-free like a heat pump — no annual service is required because the combustion chamber is sealed and self-cleaning. The customer simply tops up the pellets and the unit handles ash and flue cleaning automatically for its whole life.",
      "Servicing is needed only every five years, to coincide with the chimney sweep. The boiler runs untouched between sweeps because modern controls manage the combustion; the householder has no weekly or monthly tasks and the ash compartment empties itself.",
      "A monthly engineer visit is the standard interval. Because biomass burns solid fuel it must be professionally serviced every month, with the customer doing nothing themselves; the auger, igniter and flue are all checked by a technician on each monthly call.",
    ],
    correctAnswer: 0,
    explanation:
      "Biomass is operationally heavier than gas or heat-pump systems because of fuel handling and ash. Customers committing to biomass need to commit to the maintenance schedule. Skipped service often means glow-plug (igniter) failure, auger jams or flue blockages — expensive and inconvenient.",
  },
  {
    id: 5,
    question:
      'When and why do EV chargers need periodic inspection?',
    options: [
      "EV chargers never need periodic inspection because they are plug-in appliances rather than fixed wiring. Once installed the unit is the manufacturer's responsibility, so there is no EICR interval and no EV-specific testing; the customer simply replaces the unit if it stops working.",
      "Annual user visual check plus a 5-year BS 7671 EICR (or change of tenancy for landlord properties). EV-specific tests cover RCD operation (Type B or RDC-DD), open-PEN protection function and Zs at the charge point, with firmware updates as available.",
      "EV chargers must be PAT tested every three months like a portable site tool, because the charging lead is a flexible cable. The periodic regime is the portable-appliance cycle rather than a fixed-wiring EICR, and no loop-impedance or RCD testing of the circuit is involved.",
      "The DNO inspects EV chargers annually as part of its open-PEN protection duties. Because the charge point connects to the network, the network operator carries out the periodic test of the RCD and open-PEN device; the property EICR excludes the charger circuit entirely.",
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers are subject to mechanical and electrical stress — repeated plug / unplug cycles, weather exposure, sustained high current. Periodic inspection catches wear, RCD drift, software issues. The 5-year EICR baseline is the BS 7671 framework. Landlord properties additionally subject to the Electrical Safety Standards Regulations 2020.",
  },
  {
    id: 6,
    question:
      'What waste-handling rules apply to refrigerant when servicing or decommissioning a heat pump?',
    options: [
      "Refrigerant can be vented to atmosphere once the system is isolated, provided it is done outdoors. Modern heat-pump refrigerants are low-GWP, so releasing the small domestic charge to air is permitted at decommissioning and no recovery cylinder or certification is needed.",
      "The refrigerant is treated as general WEEE and goes to the recycling centre with the rest of the unit. Because the gas is sealed inside the heat pump, the whole appliance can be taken to the electrical recycling point without recovering the charge first.",
      "F-Gas Regulations require recovery into a calibrated cylinder by an F-Gas-certified engineer; venting fluorinated refrigerants is a criminal offence. The recovered refrigerant returns to the supplier or a recycling stream, and every transaction is logged in the F-Gas register.",
      "The L3 electrician may recover the refrigerant into any sealed container provided it is labelled and returned to the wholesaler. Recovery is part of the electrical decommissioning scope, so the electrician handles the refrigerant directly without needing F-Gas certification, as long as it is not vented to air.",
    ],
    correctAnswer: 2,
    explanation:
      "Refrigerant venting is a serious environmental offence — fluorinated refrigerants have global warming potentials hundreds to thousands of times that of CO₂. Recovery is the legal and ethical baseline. The F-Gas-certified engineer carries the responsibility for recovery on heat-pump decommissioning. As an apprentice your role is recognition; you don't break into the refrigerant circuit yourself.",
  },
  {
    id: 7,
    question:
      'What does the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require for environmental tech in landlord properties?',
    options: [
      "Environmental tech in a let property is exempt from the Regulations because PV, EV and heat pump circuits are covered by their own MCS certificates. The landlord's five-yearly EICR applies only to the original house wiring, and the renewable circuits are inspected separately by the installer, not the EICR.",
      "The Regulations require a fresh EICR every time any environmental tech is added, replacing the five-yearly cycle. Each new PV, EV or heat pump circuit resets the clock, so a property with several additions may need annual inspections rather than the standard interval.",
      "The Regulations make environmental tech a landlord's option rather than a duty — there is no inspection requirement for PV, EV or heat pump circuits in rented property, only for the consumer unit and sockets. The renewable additions sit outside the fixed-installation EICR scope.",
      "A five-yearly EICR covering the whole fixed installation, including any added PV, EV, heat pump, battery and MVHR circuits. The landlord must provide it to tenants and the local authority on request, and any C1 or C2 finding must be remediated within 28 days.",
    ],
    correctAnswer: 3,
    explanation:
      "The Electrical Safety Standards Regulations 2020 made EICR mandatory for private rented sector in England (5-yearly + change of tenancy). Environmental tech additions are part of the fixed installation and fall within the EICR scope. As the L3 electrician carrying out an EICR on a landlord property you'll inspect and test the PV / EV / heat pump circuits along with everything else.",
  },
  {
    id: 8,
    question:
      'What\'s the practical waste hierarchy for environmental tech maintenance and decommissioning?',
    options: [
      "Reduce → reuse → recycle → recover → dispose. Reduce by keeping kit in service longer; reuse second-life batteries and mounting hardware; recycle copper, aluminium and steel; recover refrigerant; and dispose of hazardous components via authorised carriers. The order is statutory under the Waste (England and Wales) Regulations 2011.",
      "Dispose → recover → recycle → reuse → reduce. The hierarchy runs from the simplest option to the hardest, so a busy job is entitled to start at disposal and only work up the order if time allows; disposal sits at the top because it is always available.",
      "Recycle → dispose → reduce → recover → reuse. The point of the hierarchy is to get as much material into the recycling stream as possible, so recycling always sits at the top and reduction comes much further down the order.",
      "There is no fixed order — the installer chooses whichever of reduce, reuse, recycle, recover or dispose is most convenient for each item. The waste hierarchy is guidance only and imposes no statutory priority on how environmental tech waste is handled.",
    ],
    correctAnswer: 0,
    explanation:
      "The waste hierarchy is a statutory principle. Reduce-first is cheaper and more environmentally sound than dispose-last. The 2357 Unit 602 ELTK02 AC 1.5 / 1.6 explicitly requires the L3 electrician to recognise hazardous and recyclable material categories and the organisational procedures for processing them. As the trade increasingly works on circular-economy principles, waste-handling discipline matters as a core competence, not a side issue.",
  },
];

const faqs = [
  {
    question: "Who carries out the annual service on a heat pump — the original installer, the manufacturer, or someone else?",
    answer:
      "Usually the original MCS-certified installer or a similarly qualified service company. Many installers offer service contracts covering the annual service. Manufacturer-direct service is also available for some brands. Independent service companies are emerging in the heat-pump aftercare market. Whoever does it must be F-Gas-certified for the refrigerant scope and competent for the wet-system and electrical scopes. As the L3 electrician you may be the contracted electrical-scope service provider, with the F-Gas engineer handling the refrigerant scope.",
  },
  {
    question: "What's the cost of an annual heat-pump service?",
    answer:
      "Typically £150-300 for the annual service, depending on complexity and provider. Service contracts may bundle 5-10 years of annual visits at a discount. Heat-pump warranty cover usually requires evidence of annual servicing — without it the warranty defaults. Customers should treat the annual service as a non-negotiable operating cost, comparable to an annual gas-boiler service.",
  },
  {
    question: "Do PV inverters need replacing during the system's lifetime?",
    answer:
      "Yes, typically once. PV panels are warranted 25 years; inverters are typically warranted 5-12 years. Most domestic PV systems will need at least one inverter replacement during the panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission. Some inverter manufacturers offer extended warranty options at install. The cost should be factored into the system's whole-life economic case, not ignored.",
  },
  {
    question: "What happens to a battery storage unit at end-of-life?",
    answer:
      "Authorised disposal via the manufacturer's take-back scheme or a specialist battery treatment centre. Lithium-ion batteries are hazardous waste; they cannot go to landfill or general recycling. Some batteries are repurposed for 'second-life' applications (less demanding storage uses where partial degradation is acceptable). The MCS-certified installer normally arranges decommissioning when the battery is replaced. Customer-side disposal requires the right specialist waste carrier; improper disposal is a criminal offence and a fire risk.",
  },
  {
    question: "What's the customer's responsibility vs the installer's responsibility for ongoing maintenance?",
    answer:
      "Customer-side: weekly / monthly visual checks (filter status indicators, error lights), MVHR filter changes (often DIY-able with right replacement filters), pellet hopper top-up for biomass, EV cable visual check. Installer-side: annual service across all the above, F-Gas refrigerant scope, electrical EICR every 5 years, controls firmware updates, performance verification. The handover pack should clearly state which responsibility lies with each party. Confusion here is the headline cause of customer-installer disputes years after the install.",
  },
  {
    question: "Are there environmental waste considerations specific to the PV / battery / EV install?",
    answer:
      "Yes. Refrigerants (heat pumps) — F-Gas recovery only. Lithium-ion batteries (storage / EV) — hazardous waste under WEEE. Electronic control boards (inverters, smart controls) — WEEE. Copper / aluminium / steel components — recyclable via standard streams. Plastics (panel backsheets, cable insulation) — variable recyclability. Cardboard / pallets from delivery — recycle on-site. The L3 electrician's responsibility is to use authorised waste streams and not improvise — the 2357 Unit 312 ELTP02 AC 1.1 explicitly requires demonstration of safe handling, storage and disposal of hazardous materials per the Hazardous Waste Regulations.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 3"
            title="Maintenance requirements"
            description="Maintenance for environmental technology systems — heat pump annual service, PV inspection, EV charger periodic inspection, MVHR filter changes, biomass ash and flue clean. Plus regulated waste streams (F-Gas, lithium-ion, WEEE) and the L3 electrician's responsibility on a maintenance call."
            tone="emerald"
          />

          <TLDR
            points={[
              "Heat pumps need annual service — F-Gas refrigerant check, wet-system check, electrical check, outdoor unit clean, performance verification. Required for warranty validity and SCOP retention.",
              "PV is largely self-maintaining — annual visual inspection plus 5-year EICR. Inverter typically replaced once during 25-year panel lifetime.",
              "MVHR needs filter changes every 6-12 months and heat exchanger clean every 1-2 years. A blocked filter destroys the whole point of the system.",
              "Lithium-ion batteries are hazardous waste under WEEE — authorised treatment only, never landfill / general recycling. Improper disposal is a criminal offence and a fire risk.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the maintenance interval and scope for the main environmental technology systems — heat pump, PV, EV charger, MVHR, biomass.",
              "Identify the BS 7671 EICR (5-yearly) as the periodic inspection framework, plus the additional landlord requirement under the Electrical Safety Standards Regulations 2020.",
              "Recognise the F-Gas refrigerant recovery requirement at heat-pump service / decommissioning and identify it as F-Gas-certified-only work.",
              "Identify lithium-ion batteries as hazardous waste under the WEEE Regulations and recognise the authorised-disposal requirement.",
              "Apply the waste hierarchy (reduce, reuse, recycle, recover, dispose) to environmental technology decommissioning.",
              "State the customer-side vs installer-side maintenance responsibilities and the role of the handover pack in clarifying them.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Heat pump — annual service is non-negotiable</ContentEyebrow>

          <ConceptBlock
            title="What the annual service actually covers"
            plainEnglish="Heat pumps need annual service — required by most manufacturer warranties and standard MCS aftercare practice. The service is multi-trade: F-Gas-certified engineer for refrigerant; plumber for wet system; electrician for electrical; sometimes the same firm covers all three with appropriately certified personnel. Without annual service the SCOP drifts down, small faults escalate, and the warranty defaults."
            onSite="As the L3 electrician you may be the contracted electrical-scope service provider, working alongside an F-Gas engineer for the refrigerant scope. Document each visit with measured values (Zs, RCD test, electrical condition) — the records support continued warranty cover and provide a baseline for the next year."
          >
            <p>
              Annual service scope by trade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas refrigerant</strong> — charge weight verified, leak test
                across all joints, sub-cooling and superheat checks, suction / discharge
                pressures recorded.
              </li>
              <li>
                <strong>Wet system</strong> — system pressure, expansion vessel charge,
                inhibitor concentration test, flow rate verification, emitter balancing
                check, sludge / debris check at filter.
              </li>
              <li>
                <strong>Electrical</strong> — supply check, isolation operation, RCD test
                (operating time at I△n and 5×I△n; smooth-DC test for Type B), Zs at the
                outdoor isolator, controls integration test.
              </li>
              <li>
                <strong>Outdoor unit</strong> — fins clean of leaves / debris, condensate
                drain clear, mountings secure, no corrosion, no obstruction to airflow.
              </li>
              <li>
                <strong>Performance check</strong> — flow temperature, return temperature,
                ambient temperature, instantaneous COP measured. Compare with last year&apos;s
                figures and the design SCOP estimate.
              </li>
              <li>
                <strong>Smart controls</strong> — firmware up to date, weather compensation
                curve still appropriate, error log reviewed, customer reports addressed.
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

          <SectionRule />

          <ContentEyebrow>PV — light maintenance, periodic electrical inspection</ContentEyebrow>

          <ConceptBlock
            title="PV is largely self-maintaining — until it isn't"
            plainEnglish="A PV array has no moving parts on the array side — panels, frames, cables, isolators just sit there. The maintenance is preventative inspection rather than active intervention. The inverter is the wear part — typically replaced once during the 25-year panel lifetime. The key risks are gradual: cable UV degradation, MC4 connector corrosion, soiling, inverter overheating in a poorly ventilated location."
            onSite="Annual visual inspection plus 5-year periodic EICR is the framework. Some MCS aftercare contracts include datalog review (catches underperformance trends before the customer notices). Soiling cleaning may be needed in dusty / urban / coastal locations — done by specialist PV cleaners using deionised water, not by the electrician."
          >
            <p>
              PV maintenance schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Annual visual inspection</strong> — panels secure, no physical
                damage, no significant soiling. Mountings firm, no corrosion. Cables in
                conduit / clipping intact, no rodent damage. MC4 connectors firm. Inverter
                ventilation clear, no overheating signs. Signage at consumer unit / meter
                / inverter / DC isolators still present and durable.
              </li>
              <li>
                <strong>Annual datalog review</strong> — total generation kWh,
                daily / weekly profile, error events. Compare against expected for the
                season. Underperformance vs expected suggests soiling, shading, panel
                degradation or inverter issue.
              </li>
              <li>
                <strong>5-year periodic inspection (EICR)</strong> — full BS 7671
                inspection and test. Continuity, IR, polarity, Zs, RCD test on the PV
                circuit. Update certificate. Particularly important on landlord properties
                where the Electrical Safety Standards Regulations 2020 make EICR mandatory.
              </li>
              <li>
                <strong>Inverter replacement</strong> — typically year 8-15 depending on
                manufacturer warranty and inverter type. Replacement is straightforward —
                disconnect old, fit replacement of compatible spec, recommission.
              </li>
              <li>
                <strong>Soiling cleaning</strong> — as needed, typically every 1-3 years
                in urban / coastal / dusty locations. Specialist PV cleaners use deionised
                water and soft brushes; high-pressure jets damage panel surfaces.
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

          <ContentEyebrow>EV chargers, MVHR, biomass — short scope</ContentEyebrow>

          <ConceptBlock
            title="EV charger periodic inspection"
            plainEnglish="EV chargers are subject to mechanical wear (cable, plug), weather exposure, and sustained high-current operation. The standard framework is annual visual inspection by the user plus 5-year BS 7671 EICR. EV-specific tests include RCD operation (Type B or RDC-DD), open-PEN protection function (where fitted), Zs at the charge point. Manufacturer-recommended firmware updates as available."
            onSite="As the L3 electrician on a 5-year EICR for an EV-equipped property, the EV charger circuit gets the standard inspection plus the EV-specific RCD / open-PEN checks. Where the charger has been involved in a fault event (known surge, vehicle-side incident) bring the inspection forward."
          >
            <p>
              EV-specific maintenance points:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cable and plug condition — look for damage, fraying, melted spots.
              </li>
              <li>
                Mounting and weatherproofing — IP rating intact, no water ingress.
              </li>
              <li>
                RCD operation — Type B or Type A + RDC-DD; smooth-DC test if Type B.
              </li>
              <li>
                Open-PEN protection function — confirmed working per manufacturer&apos;s
                test procedure (where the unit has built-in protection).
              </li>
              <li>
                Earthing — Zs at the charge point, earth electrode resistance if TT
                arrangement.
              </li>
              <li>
                Firmware — update to latest manufacturer-supplied version.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MVHR — filter changes are the key job"
            plainEnglish="MVHR maintenance is light but essential. Filter changes are the headline item — a blocked filter destroys the whole point of the system (no air-flow = no recovery). Heat exchanger cleaning every 1-2 years keeps the recovery efficiency up. Ductwork inspection every 3-5 years catches blockages and rodent damage."
            onSite="Customer-side responsibility for filter changes (often DIY-able with right replacement filters and a quarterly visual check). Annual service by a ventilation specialist for the deeper checks. Some smart MVHR units alert the customer when filters need changing via app notification."
          >
            <p>
              MVHR maintenance schedule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Filter changes</strong> — every 6-12 months. Kitchen and bathroom
                extract filters can clog faster.
              </li>
              <li>
                <strong>Heat exchanger clean</strong> — every 1-2 years. Vacuum or wash
                exchanger plates per manufacturer&apos;s instructions.
              </li>
              <li>
                <strong>Ductwork inspection</strong> — every 3-5 years. Look for blockages,
                condensate accumulation, rodent damage.
              </li>
              <li>
                <strong>Boost-control check</strong> — humidity sensors / PIRs operating
                correctly.
              </li>
              <li>
                <strong>Air-flow rate verification</strong> — at major service intervals,
                anemometer at supply / extract terminals, balanced per design.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Biomass — operationally heavier than other systems"
            plainEnglish="Biomass appliances need both customer-side weekly tasks (pellet hopper top-up, ash empty, visual check) and an annual professional service (full strip-down clean, auger / igniter / fan check, flue inspection, controls firmware). Skipped service typically means glow-plug failure, auger jam or flue blockage."
            onSite="As the electrician on a biomass install you handle the electrical scope of the annual service — supply check, RCD test, controls integration, firmware. The wet system is plumber's scope; the boiler internals and flue are biomass-specialist scope. Customer-facing instruction on the weekly tasks should have been part of the install handover."
          >
            <p>
              Customer-side weekly / monthly tasks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Top up pellet hopper as needed.
              </li>
              <li>
                Empty ash compartment monthly (more often in heavy use).
              </li>
              <li>
                Visual check of fuel feed (auger), no obstructions.
              </li>
              <li>
                Check pellet quality — kiln-dried, low-ash, manufacturer-approved.
              </li>
            </ul>
            <p>
              Annual professional service:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Full strip-down clean of combustion chamber and ash compartment.
              </li>
              <li>
                Auger inspection, lubrication, replacement of wear parts.
              </li>
              <li>
                Igniter (glow plug) check and replacement if required.
              </li>
              <li>
                Combustion fan inspection.
              </li>
              <li>
                Flue inspection (often a chimney sweep separately).
              </li>
              <li>
                Controls firmware update, electrical scope check.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Regulated waste streams</ContentEyebrow>

          <ConceptBlock
            title="The waste hierarchy applied to environmental tech"
            plainEnglish="The waste hierarchy — reduce, reuse, recycle, recover, dispose — is a statutory principle under the Waste (England and Wales) Regulations 2011. Applied to environmental tech: reduce by maintaining equipment longer, reuse second-life batteries where appropriate, recycle copper / aluminium / steel via standard streams, recover refrigerant via F-Gas-certified engineer, dispose hazardous components (lithium-ion, electronics, refrigerant) via authorised waste carriers."
            onSite="The L3 electrician's responsibility is to use authorised waste streams and not improvise. The 2357 Unit 312 ELTP02 AC 1.1 explicitly requires demonstration of safe handling, storage and disposal of hazardous materials per the Hazardous Waste Regulations. The 2357 Unit 602 ELTK02 AC 1.5 / 1.6 requires recognition of hazardous and recyclable categories and the organisational procedures for processing them."
          >
            <p>
              The four headline regulated waste categories on environmental tech installs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas refrigerant</strong> — recovery only, by F-Gas-certified
                engineer. Venting is a criminal offence under Environmental Permitting
                Regulations. Recovered refrigerant goes back to the supplier or specialist
                recycling stream. Records kept in the F-Gas register.
              </li>
              <li>
                <strong>Lithium-ion batteries</strong> — hazardous waste under the
                Hazardous Waste Regulations and WEEE Regulations. Cannot go to landfill or
                general recycling. Authorised treatment centres only. Battery transport
                regulated under ADR. Improper disposal is a criminal offence with significant
                fines and material fire risk.
              </li>
              <li>
                <strong>Electronic equipment (inverters, controls, smart kit)</strong> —
                WEEE Regulations. Producer-take-back schemes, household waste recycling
                centres (HWRCs), or licensed WEEE carriers. Cannot go to general waste.
              </li>
              <li>
                <strong>Standard recyclables</strong> — copper cabling, aluminium frames,
                steel components, cardboard packaging. Established recycling streams; the
                installer&apos;s firm should have a waste management plan covering these.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 EICR changes — what the inspector now records on env tech kit"
            plainEnglish="Two changes from A4:2026 affect every periodic inspection on a property with environmental tech additions. First, Reg 643.7 RCD verification is now a single AC test at 1×IΔn — no more multi-current sequence, no more separate five-times test for additional protection. Second, Reg 653.1 / 653.2 require Appendix 6 notes for the report producer and customer-facing recipient guidance to be carried forward on the Condition Report itself."
            onSite="Practical effect on a heat pump or PV property EICR: the RCD test on the inverter circuit, the heat pump supply, the EV charger and the battery storage RCBOs all run as a single 1×IΔn AC test, regardless of RCD type. Operating time recorded in milliseconds against the BS EN 61008 / 61009 limits. Photographs of the inverter label, the heat pump outdoor unit, the EV charger and battery isolator are explicitly permitted as appended evidence — much faster than handwritten descriptions."
          >
            <p>
              What to bring on the EICR visit and what to record:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MFT firmware</strong> — confirm test firmware is updated to the
                A4:2026 RCD test method (single AC test at 1×IΔn). Older firmware may still
                run the multi-current sequence; the value that goes on the schedule is the
                1×IΔn reading.
              </li>
              <li>
                <strong>Camera or phone</strong> — take inverter, heat pump unit, EV
                charger and battery isolator photos. Reg 653.1 / 653.2 explicitly allow
                images appended to the report. One photo of a serial-numbered inverter
                label captures install state cleanly.
              </li>
              <li>
                <strong>Appendix 6 notes</strong> — the EICR producer's notes table is the
                template for guidance to the recipient. Cover the env tech findings with
                C1 / C2 / C3 / FI codes plus the recipient action expected.
              </li>
              <li>
                <strong>Photos of signage</strong> — Section 712 PV signage at consumer
                unit, meter and inverter; EV charger isolator labelling per Section 722;
                battery storage isolator and identification per the 2026-aligned scheme.
                Missing or illegible signage is typically C3.
              </li>
              <li>
                <strong>Test method note</strong> — record that the RCD verification used
                A4:2026 single AC test at 1×IΔn. Older EICRs the inspector compares against
                will quote multi-current readings; document the methodology change.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer-side maintenance briefing — what to leave them on the fridge"
            plainEnglish="Most env tech failures the L3 electrician sees on a service call could have been caught earlier by the customer if they knew what to look for. The handover pack should include a single-page customer maintenance brief — what to check weekly, what to check monthly, and the warning signs that mean ring the installer. A laminated A5 card on the fridge or in the consumer unit cupboard works."
            onSite="Spend ten minutes at handover walking the customer through the brief. Short verbal demonstrations beat written instructions every time — show them how to read the inverter daily kWh, where the heat pump pressure gauge is, how to know when the MVHR filters need changing. A confident customer rings less and rings about the right things; a confused customer rings monthly and often about non-issues."
          >
            <p>
              Customer-side checks by frequency:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Weekly</strong> — heat pump display green-light check; PV inverter
                producing kWh in daylight; MVHR filter status indicator clean; biomass
                pellet hopper level; EV charger plug condition.
              </li>
              <li>
                <strong>Monthly</strong> — heat pump outdoor unit clear of leaves and
                debris; PV array visual from a safe vantage (no obvious cracks or shading);
                MVHR filters changed if indicator says due; biomass ash compartment
                emptied; EV charger plug seated firmly.
              </li>
              <li>
                <strong>Quarterly</strong> — PV daily kWh compared to expected for the
                season; heat pump bills compared to last year for the same month; smoke
                alarm and emergency lighting (flat blocks) functional test.
              </li>
              <li>
                <strong>Warning signs — ring the installer</strong> — heat pump short-cycling
                (turning on and off every few minutes); inverter showing red fault light;
                MVHR fan louder than usual; biomass repeated ignition failure; EV charger
                tripping on every charge attempt; battery storage refusing to charge or
                discharge; sustained higher bills with no obvious cause.
              </li>
              <li>
                <strong>Annual reminders</strong> — heat pump service due (calendar
                reminder); MVHR full filter replacement; PV aftercare visit; biomass full
                strip-down service; 5-year EICR if landlord property approaching the cycle.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste Regulations (England and Wales) 2005, as amended — paraphrased"
            clause={
              <>
                The producer of hazardous waste (which includes WEEE, refrigerants,
                lithium-ion batteries) must ensure the waste is consigned to an authorised
                disposal or treatment route, accompanied by a consignment note, and
                delivered to an authorised facility. Improper disposal — including
                sending hazardous waste to landfill or to a non-authorised carrier — is a
                criminal offence.
              </>
            }
            meaning={
              <>
                The Hazardous Waste Regulations make the producer (typically the installer
                or service provider on environmental tech) responsible for the waste from
                the moment it&apos;s removed from service. The chain of consignment notes
                proves the waste reached an authorised facility. The Environment Agency
                (England) / Natural Resources Wales / SEPA (Scotland) / NIEA (NI) enforce.
                As the L3 electrician on a service / decommissioning visit you should
                recognise the regulatory obligation and use the firm&apos;s waste-handling
                procedure — never improvise.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (paraphrased from the published Regulations available via legislation.gov.uk)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Customer skipping annual heat-pump service to save money"
            whatHappens={
              <>
                Customer decides to skip the £200 annual service in year 2. SCOP drifts
                down (sludge in wet system, drift in compensation curve, slight refrigerant
                leak undetected). By year 4 the customer&apos;s bills are noticeably higher
                than they were in year 1; warranty has defaulted; small problems have
                cascaded into bigger ones. The £600 saved over three years has cost £2,000
                in higher bills and £1,500 in non-warranty repair work.
              </>
            }
            doInstead={
              <>
                Stress the importance of annual service at handover. Frame it as a
                non-negotiable operating cost — comparable to an annual gas-boiler service
                or an MOT for a car. The MCS-certified installer often offers a service
                contract bundling 5-10 years of annual visits at a discount. Customers
                who opt out should be told plainly what they&apos;re giving up — warranty
                cover and SCOP retention.
              </>
            }
          />

          <CommonMistake
            title="Disposing of an old battery storage unit in general waste"
            whatHappens={
              <>
                Battery has reached end of life. Apprentice / installer removes it and
                drops it in the customer&apos;s general waste skip. Bin lorry catches fire
                en route to landfill (lithium-ion fires in waste streams are a real and
                growing problem). Investigation traces the battery back to the install
                firm. The firm faces a criminal prosecution under the Hazardous Waste
                Regulations, plus the bin firm&apos;s civil claim, plus reputational damage.
              </>
            }
            doInstead={
              <>
                Lithium-ion batteries are hazardous waste — authorised treatment only.
                The MCS-certified installer normally arranges decommissioning via the
                manufacturer&apos;s take-back scheme or a specialist battery recycler.
                Battery transport is itself regulated under ADR. As the L3 electrician on
                a battery decommissioning visit, never improvise — use the firm&apos;s
                waste-handling procedure and the authorised waste carrier.
              </>
            }
          />

          <Scenario
            title="5-year EICR on a property with PV, EV charger and heat pump"
            situation={
              <>
                You&apos;re carrying out a 5-year EICR on a private rented property in
                England — a 3-bed semi with 5 kWp PV (G98), 7 kW EV charger (PME with
                charger&apos;s open-PEN protection), 10 kW ASHP, and a 10 kWh battery.
                The Electrical Safety Standards Regulations 2020 apply. The customer is
                the landlord; the tenants are at home.
              </>
            }
            whatToDo={
              <>
                Plan the EICR before starting. The fixed installation includes the
                original house circuits plus the four added environmental tech circuits.
                Schedule with the tenants for power-down windows. Notify the DNO if
                you&apos;re going to fully isolate the supply. For each circuit: visual
                inspection, continuity, IR, polarity, Zs, RCD test (Type B / RDC-DD for
                EV), open-PEN protection function test (EV charger), DC-side checks (PV
                with both DC and AC isolators locked-off and verified dead), labelling /
                signage check at all isolation points. Issue the EICR with C1 / C2 /
                C3 / FI codings as appropriate. C1 / C2 findings remediated within 28 days
                (legal duty under the Regulations). Provide the report to the landlord and
                signpost the requirement to provide it to the tenants. Update the customer
                handover pack with the new EICR.
              </>
            }
            whyItMatters={
              <>
                Five-year EICR is the BS 7671 baseline + the Electrical Safety Standards
                Regulations legal requirement for landlord properties in England.
                Environmental tech additions are part of the fixed installation and fall
                within scope — the landlord&apos;s legal compliance depends on the EICR
                covering everything. As the L3 electrician your professional reputation
                rests on a thorough, documented inspection. Skipping the PV DC-side check
                or the EV open-PEN check leaves dangerous gaps.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 651.1 (periodic inspection and testing)"
            clause={
              <>
                Where required, periodic inspection and testing of every electrical
                installation shall be carried out in accordance with the regulations of Part 6.
              </>
            }
            meaning={
              <>
                A periodic inspection (EICR) of an installation including PV, EV, battery or
                heat-pump kit follows the standard Part 6 process plus the technology-specific
                checks. The frequency is determined by Regulation 652.1 from the type of
                installation, its use, the quality of maintenance, and external influences.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 651.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 653.1 / 653.2 (Condition Report changes)"
            clause={
              <>
                Regulation 653.1 now requires the notes for the person producing the report
                (provided in Appendix 6) to be taken into account on the Condition Report.
                Regulation 653.2 now requires the report to include guidance for the
                recipient(s) based on the model in Appendix 6. A note has also been added
                pointing out that photographic and/or thermographic images can be appended to
                the report.
              </>
            }
            meaning={
              <>
                Two changes affect every EICR you produce — the Appendix 6 notes for the report
                producer must be applied, and customer-facing recipient guidance must be
                included. Photos and thermographic images can be appended; this is particularly
                useful on environmental tech additions where a single image of the inverter,
                battery isolator or EV charger label captures the install state cleanly.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulations 653.1 and 653.2."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Heat pumps need annual service (multi-trade — F-Gas, plumber, electrician). Required for warranty validity and SCOP retention.",
              "PV is largely self-maintaining — annual visual inspection plus 5-year EICR. Inverter typically replaced once during 25-year panel lifetime.",
              "MVHR filter changes every 6-12 months are essential. A blocked filter destroys the whole point of the system.",
              "Biomass is operationally heavier — weekly customer tasks (pellets, ash) plus annual professional service.",
              "EV chargers need 5-yearly EICR + EV-specific RCD / open-PEN protection tests. Landlord properties subject to Electrical Safety Standards Regulations 2020.",
              "F-Gas refrigerant recovery only by F-Gas-certified engineer. Venting is a criminal offence under the Environmental Permitting Regulations.",
              "Lithium-ion batteries are hazardous waste under WEEE — authorised treatment only, never landfill / general recycling. Improper disposal is a criminal offence + fire risk.",
              "Waste hierarchy (reduce, reuse, recycle, recover, dispose) applies. The L3 electrician uses authorised waste streams and never improvises on hazardous categories.",
            ]}
          />

          <Quiz title="Maintenance requirements — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Commissioning and handover
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module home <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Environmental technology
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
