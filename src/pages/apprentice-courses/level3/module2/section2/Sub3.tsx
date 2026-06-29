/**
 * Module 2 · Section 2 · Subsection 3 — BS 7671 Section 753 (heating systems) deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 2.1 (regulations) and AC 2.2 (statutory framework);
 * 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This subsection covers the BS 7671 Section 753 framework
 * for heating cables and embedded heating systems, plus the broader regulatory map for
 * heat-pump electrical work — F-Gas Regulations boundary, MCS MIS 3005 and Building Regs
 * Part L compliance.
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
  'BS 7671 Section 753 (heating) deeper (2.3) | Level 3 Module 2.2.3 | Elec-Mate';
const DESCRIPTION =
  "BS 7671 Section 753 (heating systems) and the broader regulatory map for heat-pump electrical work at recognition level for the L3 electrician — heating cables and embedded systems, the F-Gas Regulations boundary, MCS MIS 3005 install standard, Building Regs Part L compliance and the apprentice's electrical scope on a heat pump install.";

const checks = [
  {
    id: "l3-m2-s2-sub3-section-753",
    question:
      "What does BS 7671 Section 753 actually cover and where does it apply on a heat pump install?",
    options: [
      "Section 753 covers heating cables and embedded heating systems; on a heat pump it applies only where electric trim or boost elements are integrated into the wet system, not to the heat pump itself.",
      "Section 753 is the dedicated heat pump section of BS 7671. It covers the whole heat pump install — supply circuit, compressor, refrigerant interlocks and controls — and replaces the general requirements of Parts 4 and 5 for any property fitted with a heat pump.",
      "Section 753 covers the wet central-heating system fed by the heat pump — the radiators, pipework and circulating pump. It sets the bonding and earthing requirements for the metallic pipework, applying to every heat pump install regardless of whether an electric heating element is present.",
      "Section 753 covers customer handover and labelling for renewable heating. It defines the documentation pack and warning notices that must accompany a heat pump, but holds no requirements about the electric heating elements, which sit under Section 554.",
    ],
    correctIndex: 0,
    explanation:
      "Section 753 is specifically about embedded electrical heating elements — underfloor electric heating, trace heating, heated mirrors/handrails. On a heat pump install it applies only where electric trim or pre-heat/boost elements are integrated into the wet system. The heat pump itself has its own electrical supply covered by general BS 7671 plus the manufacturer's instructions and MCS MIS 3005; the refrigerant circuit is F-Gas territory, not BS 7671 at all.",
  },
  {
    id: "l3-m2-s2-sub3-fgas",
    question:
      "What does the F-Gas Regulations mean for the L3 apprentice on a heat pump install?",
    options: [
      "F-Gas governs the electrical earthing and bonding of refrigerant pipework. Because the copper refrigerant lines are conductive, the apprentice must bond them to the main earthing terminal and record this on the EIC; the F-Gas certification covers this bonding work, so the apprentice needs the qualification to terminate those bonds.",
      "F-Gas sets the maximum refrigerant charge weight a heat pump may hold in a domestic property, and it is the apprentice's job to weigh the system at commissioning to confirm it is within the limit. The electrician records the charge weight on the commissioning certificate; only the weighing itself, not the certification, sits within scope.",
      "F-Gas governs refrigerant work, which requires separate certification; the apprentice's electrical scope (supply, isolation, controls, bonding) is BS 7671 territory, the refrigerant scope is not.",
      "F-Gas is purely a record-keeping obligation with no bearing on the apprentice's work. It requires the manufacturer to log the refrigerant type on a label inside the unit; the electrician never needs F-Gas certification because connecting refrigerant pipework counts as electrical work under BS 7671 competence.",
    ],
    correctIndex: 2,
    explanation:
      "F-Gas (Fluorinated Greenhouse Gases Regulations) governs work on circuits containing fluorinated refrigerants (R32, R410A, R134a). Anyone installing refrigerant pipework, charging, or recovering refrigerant must hold F-Gas certification (City & Guilds 2079 or equivalent); the L3 apprentice does not do refrigerant work without it. F-Gas is a hard boundary between trades — the electrician sizes the supply, fits isolation, terminates controls, bonds the chassis; the F-Gas-certified engineer handles every refrigerant activity. Crossing the line is a regulatory offence and an insurance issue. R290 (propane) carries less F-Gas burden but the Regulations still apply where fluorinated refrigerants are present.",
  },
  {
    id: "l3-m2-s2-sub3-mcs-3005",
    question:
      "What does MCS MIS 3005 cover on a heat pump install and how does it relate to BS 7671?",
    options: [
      "MCS MIS 3005 is the refrigerant-handling standard that replaces the F-Gas Regulations for heat pumps. It sets the charge limits, leak-check intervals and recovery procedures, and is the qualification the apprentice needs before connecting refrigerant pipework; BS 7671 covers only the supply cable up to the isolator.",
      "MCS MIS 3005 is the installer competence and product certification standard for heat pump installs, covering design, product selection, install quality, commissioning and handover; BS 7671 covers the electrical safety alongside it.",
      "MCS MIS 3005 is the section of BS 7671 that deals with heat pump electrical safety. It sits alongside the general requirements and covers the supply rating, RCD type and isolation for a heat pump circuit; it is part of the wiring regulations rather than a separate scheme, applied directly by the MCS designer.",
      "MCS MIS 3005 is the Building Regulations approval document for low-carbon heating. Building Control checks the install against it, replacing Part L for heat pump projects, and it has no connection to BS 7671, which governs only the consumer unit.",
    ],
    correctIndex: 1,
    explanation:
      "MIS 3005 is the installer competence and product certification standard for heat pump installations (air-source, ground-source, water-source). It covers system design (heat-loss calculation, emitter sizing, SCOP estimate), product selection (eligible MCS-certified equipment), installation quality, commissioning (flow temperature setup, control validation) and customer handover. It is required to claim Boiler Upgrade Scheme grants. It works alongside BS 7671 (electrical safety), F-Gas (refrigerant), Part L (energy efficiency) and PAS 2035 (retrofit, where applicable). The MCS-certified designer holds the documentation map together; the apprentice contributes the electrical scope.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the typical electrical interface for a domestic air-source heat pump?",
    options: [
      "A spur taken off the nearest ring final circuit. Because the average running current is modest, it is wired as a fused spur from the existing socket ring using 2.5 mm cable and a 13 A fused connection unit, avoiding a dedicated circuit from the consumer unit.",
      "A dedicated final circuit from the consumer unit, sized to the unit (typically 32-40 A radial), on a Type C device with a local isolator at the outdoor unit and manufacturer-specified controls cabling.",
      "A three-phase 400 V supply in every case. Domestic heat pumps always need three-phase because of the compressor load, so the standard interface is a 16 A three-phase radial with a Type B RCBO and no local isolation, the unit isolated only at the consumer unit.",
      "A SELV supply via a transformer. Because the outdoor unit is exposed to weather, it is fed at extra-low voltage through a step-down transformer at the consumer unit, using 1.5 mm cable, removing the need for an RCD or local isolator at the unit.",
    ],
    correctAnswer: 1,
    explanation:
      "A heat pump takes a dedicated final circuit: typically 32 A radial on 6 mm for a 5-7 kW unit, 40 A radial on 10 mm for a 9-12 kW unit. Type C MCB or RCBO is used because compressor-start inrush can nuisance-trip a Type B. The install includes a local isolator outside near the outdoor unit, controls cabling to the indoor controller and any zone valves/pumps, and bonding of the chassis where it is an extraneous-conductive-part. The nameplate gives the maximum rated current; the MCS designer specifies cable and protective device. The controls cabling is often the time-consuming part.",
  },
  {
    id: 2,
    question:
      "What does Building Regs Part L require for a new-build property with a heat pump?",
    options: [
      "Part L requires a minimum heat pump SCOP of 4.0 on every new-build. If the chosen unit cannot demonstrate a SCOP of at least 4.0 in the manufacturer's data, Building Control will refuse to sign off the dwelling, regardless of fabric performance or any other measures.",
      "Part L requires the heat pump to deliver 100% of the design heat loss at the coldest design temperature without any backup. The immersion heater must be physically disconnected on a new-build so the SAP calculation can credit the heat pump as the sole heat source.",
      "Part L requires every new build and notifiable refurbishment to demonstrate compliance via a SAP calculation that meets the Target Emission Rate; a heat pump's SCOP feeds that calculation.",
      "Part L sets the maximum flow temperature a heat pump may run at on a new-build — currently 45°C. The installer must lock the controller to this limit so the dwelling passes; the SAP calculation plays no part, since Part L is verified purely by checking the flow-temperature setting at commissioning.",
    ],
    correctAnswer: 2,
    explanation:
      "Part L (Conservation of Fuel and Power) is the construction-side energy regulation. New builds and notifiable refurbishments demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER) and Target Fabric Energy Efficiency (TFEE) for the property type. A heat pump's contribution depends on its SCOP and the carbon intensity of grid electricity; modern heat pumps in well-designed homes pass comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. The MCS designer's SCOP estimate feeds the SAP calculation. This is the underlying driver behind heat pump uptake.",
  },
  {
    id: 3,
    question:
      "What is the difference between an air-source heat pump and a ground-source heat pump from the apprentice's electrical perspective?",
    options: [
      "Air-source is single-phase but ground-source is always three-phase, so the electrical interface is fundamentally different. A GSHP needs three-phase for its ground-loop pumps and compressor, which is why most properties need a supply upgrade before a GSHP can be fitted; an ASHP runs off the existing single-phase supply.",
      "Ground-source runs at extra-low voltage because the buried ground loop must be SELV for safety, while air-source runs at 230 V. The apprentice wires a GSHP through a step-down transformer and an ASHP directly, which is the main electrical difference between the two.",
      "There is no electrical difference — both are wired identically and the only distinction is the heat source. The apprentice treats a GSHP and an ASHP as the same job electrically, with the same outdoor unit, cable run and controls in both cases.",
      "Both are predominantly single-phase domestic; the differences are in the install scope (civils, indoor-vs-outdoor unit) rather than the electrical interface.",
    ],
    correctAnswer: 3,
    explanation:
      "From the apprentice's wiring perspective, ASHP and GSHP are similar — predominantly single-phase domestic, 32-40 A typical final circuit, controls cabling. ASHP has an outdoor unit with a single supply, refrigerant pipework to the indoor cylinder/buffer and controls cabling. GSHP has horizontal slinky coils in trenches or vertical boreholes — a much larger civils scope, ground-loop pumps that are themselves loads, and an indoor unit containing the compressor (no outdoor unit). Cable runs differ (GSHP indoor unit fed from the CU; ASHP has cable to the outdoor unit). MCS MIS 3005 covers both technology types.",
  },
  {
    id: 4,
    question:
      "What does PAS 2035 mean and when does it apply to a heat pump retrofit?",
    options: [
      "PAS 2035 governs domestic energy-efficiency retrofit with a 'whole-house' fabric-first approach, coordinated by a Retrofit Coordinator; it applies to grant-funded retrofits including heat pumps.",
      "PAS 2035 is the product-testing standard for heat pumps. It is the specification a manufacturer must certify its units against before they appear on the MCS eligible-products list, covering noise, efficiency and refrigerant safety; it has no bearing on how an individual retrofit is designed or coordinated.",
      "PAS 2035 is the electrical commissioning standard for heat pump circuits. It sets the dead and live test sequence the apprentice follows at handover — continuity, insulation resistance, Zs and RCD operation — and applies to every heat pump install whether grant-funded or not.",
      "PAS 2035 is the apprenticeship standard for retrofit installers. It defines the competencies and End-Point Assessment a worker must hold to carry out heat pump installs, applying to the installer's qualification rather than to the design of any particular retrofit project.",
    ],
    correctAnswer: 0,
    explanation:
      "PAS 2035 (Publicly Available Specification — Retrofitting dwellings for improved energy efficiency) is the 'fabric-first' framework for retrofit. It requires a whole-house approach — fabric assessment, ventilation strategy, moisture risk management — coordinated by a Retrofit Coordinator and designed by a Retrofit Designer. It is required for grant-funded retrofits (ECO4, Boiler Upgrade Scheme in some cases, local authority schemes) and pushes back against the failure mode of fitting a heat pump to an uninsulated leaky house that then posts a poor SCOP. The MCS-certified installer works within the PAS 2035 framework on grant-funded projects.",
  },
  {
    id: 5,
    question:
      "Why does a heat pump typically use a Type C MCB or RCBO rather than a Type B?",
    options: [
      "Because a Type C MCB has a higher current rating than a Type B. The heat pump's running current exceeds the maximum rating in the Type B range, so a Type C is fitted purely to obtain the larger amperage; the trip characteristic is identical between the two types.",
      "The compressor produces a high start-up inrush that can nuisance-trip a Type B MCB (3-5x); a Type C (5-10x) is more tolerant and is the standard recommendation.",
      "Because a Type C MCB provides DC fault detection that a Type B does not. The inverter-driven compressor produces smooth DC fault currents, and only a Type C device can detect them, which is why Type C is mandated on heat pump circuits like Type B RCDs are mandated on EV circuits.",
      "Because a Type C MCB trips faster than a Type B, giving the shorter disconnection time a heat pump circuit needs. The long cable run to an outdoor unit raises Zs above the limit a Type B can clear in 0.4 s, so the faster-tripping Type C is fitted to meet the disconnection-time requirement.",
    ],
    correctAnswer: 1,
    explanation:
      "The compressor produces a substantial inrush at start-up — typically 5-10x the steady-state running current for a fraction of a second. A Type B MCB (3-5x trip threshold) can nuisance-trip on this; a Type C (5-10x threshold) is more tolerant and is the standard recommendation. Modern inverter-driven units with soft-start have lower inrush than older fixed-speed units, but Type C is still the typical specification. Always check the manufacturer's installation manual — some modern units are explicitly compatible with Type B; the MCS designer specifies the device per that manual.",
  },
  {
    id: 6,
    question:
      "What is the Boiler Upgrade Scheme (BUS) and how does it interact with the heat pump electrical install?",
    options: [
      "BUS pays the customer a per-kWh subsidy for the heat the heat pump generates over its life, metered through a dedicated heat meter the apprentice must wire in. The grant value depends on metered output, so the install must include the heat-metering circuit before the grant can be claimed.",
      "BUS is a low-interest government loan toward a heat pump, repaid through the customer's electricity bill over 10 years. The apprentice must fit a separate sub-meter on the heat pump circuit so the supplier can apportion the repayment; without it the grant cannot proceed.",
      "BUS is a fixed government grant (currently £7,500) toward replacing a fossil-fuel boiler with a heat pump; eligibility requires an MCS-certified install but the wiring scope is unaffected.",
      "BUS funds the supply upgrade rather than the heat pump itself. It pays the DNO directly for any main-fuse or three-phase upgrade the heat pump requires, so the apprentice's role is to give the DNO the load calculation that sets the grant amount; the hardware is paid for by the customer.",
    ],
    correctAnswer: 2,
    explanation:
      "The Boiler Upgrade Scheme contributes a fixed amount (currently £7,500) toward replacing a fossil-fuel boiler with a heat pump or biomass boiler. The customer applies via an MCS-certified installer who handles the paperwork; eligibility requires an MCS-certified install, the property to meet basic insulation standards, and a system designed per MIS 3005. The grant does not change the electrical install — Section 753 (where applicable), general BS 7671 and the F-Gas boundary still apply. The L3 apprentice does not touch the BUS paperwork but should recognise that the customer's financial decision is often grant-driven.",
  },
  {
    id: 7,
    question:
      "What labelling is required on a domestic heat pump installation per BS 7671?",
    options: [
      "Dual-supply and parallel-generation warning notices at the consumer unit, the main isolation and the unit itself — the same signage as a PV install — because a heat pump is treated as an embedded generator under Section 712 and a maintainer must know it can back-feed the supply.",
      "A refrigerant-hazard label only, stating the refrigerant type, charge weight and flammability class, fixed to the outdoor unit. Because the electrical risk is no different from any other final circuit, BS 7671 requires no electrical labelling beyond what the manufacturer already fits.",
      "A flow-temperature and SCOP performance label at the cylinder, so the customer can see the system's efficiency. BS 7671 makes this the only mandatory notice because the electrical circuit is identified on the schedule of test results rather than by a physical label.",
      "Standard Section 514 circuit identification at the consumer unit and isolators — the same as any other final circuit, plus Section 753 signage where embedded heating elements are present.",
    ],
    correctAnswer: 3,
    explanation:
      "Heat pump labelling follows the standard Section 514 framework — the final circuit identified at the consumer unit, the local isolator labelled with the upstream RCBO referenced, and controls cabling identified at termination points. Where Section 753 applies (e.g. integrated trim heaters) the relevant section signage applies. The MCS-certified designer's commissioning pack adds the SCOP estimate, design heat-loss summary and handover documentation. The labelling serves the customer (which isolator does what), the next electrician (understanding the install years later) and the service engineer (isolating safely), and evidences the install for grant claims and warranty.",
  },
  {
    id: 8,
    question:
      "What is the apprentice's electrical scope on a typical air-source heat pump install?",
    options: [
      "The electrical side only — supply cable, local isolator, controls cabling, chassis bonding and electrical commissioning; refrigerant work stays with the F-Gas-certified engineer.",
      "The full install end to end — supply cable, controls, refrigerant pipework, charging and the wet-system commissioning. Because a heat pump is a single appliance, the L3 apprentice carries out every stage, with the MCS designer only signing the paperwork afterwards.",
      "Only the consumer-unit termination. The apprentice fits the RCBO and connects the meter tails; everything beyond — cable run, isolator, controls and bonding — is specialist heat pump scope carried out by the manufacturer's commissioning engineer.",
      "Only the controls and smart-home wiring. The apprentice runs the data cabling and configures the room thermostats and app, while the supply cable, isolator and bonding are installed by the customer's electrician before the heat pump team arrives.",
    ],
    correctAnswer: 0,
    explanation:
      "The L3 apprentice's scope is the electrical side: first-fix supply cable from the consumer unit to the outdoor unit (typically 6 mm or 10 mm radial, Type C RCBO), a local isolator near the outdoor unit, controls cabling to the indoor cylinder/controller, zone valves, room thermostats and weather compensation sensor, chassis bonding where extraneous-conductive-part criteria apply, power and controls to any electric trim heater (Section 753 where applicable), any Cat5e/Cat6 for smart-home or HEMS, and commissioning of the electrical side. Refrigerant pipework and charging is F-Gas-certified scope only. The MCS-certified designer holds the overall scope together. Recognising the trade boundary is a Unit 301 expectation.",
  },
];

const faqs = [
  {
    question: "Why doesn't BS 7671 cover the refrigerant side of a heat pump?",
    answer:
      "Because the refrigerant circuit is a different regulatory regime entirely. The Fluorinated Greenhouse Gases Regulations (F-Gas) govern work on circuits containing fluorinated refrigerants and require F-Gas certification for the personnel doing the work. BS 7671 is the Wiring Regulations — it covers electrical installations. The two trades work alongside each other on a heat pump install: the F-Gas certified engineer handles the refrigerant pipework and charging; the electrician handles the supply, isolation, controls and bonding. Crossing the line without certification is a regulatory offence.",
  },
  {
    question: "Does Section 753 apply to underfloor heating fed from a heat pump?",
    answer:
      "Section 753 applies to embedded electric heating cables (resistive elements buried in the floor or wall). Wet underfloor heating fed from a heat pump is not electrically heated at the floor — the heat pump's wet system circulates warm water through pipework in the floor, with the water itself heated by the heat pump compressor. Section 753 does not apply to the wet pipework. It would apply if the install includes any embedded electric heating elements (e.g. an electric boost element in a particular zone, or electric trim heaters in bathrooms).",
  },
  {
    question: "How does a heat pump's flow temperature affect its SCOP and why does the apprentice care?",
    answer:
      "Lower flow temperature gives higher SCOP — a heat pump driving an underfloor system at 35-40 degC posts a much better SCOP than the same unit driving 60 degC radiators. The MCS designer sets the flow temperature based on the emitter design and the building heat loss. The apprentice does not adjust flow temperature on commissioning — that is the MCS designer's call, set during the system commissioning. But the apprentice should understand that the flow temperature is the single biggest driver of SCOP and therefore of the customer's running cost and Part L compliance score.",
  },
  {
    question: "What happens if the customer has a heat pump and an immersion heater — how does that fit Part L?",
    answer:
      "Most heat pump cylinders include a backup electric immersion heater for legionella protection (heating to 60 degC weekly to kill legionella bacteria — a Health and Safety at Work Act requirement) and as a backup for the compressor. The immersion's contribution to the property's running cost and carbon footprint is small (used briefly for legionella, occasionally for backup) and Part L SAP calculation accounts for it. The apprentice's electrical scope includes wiring the immersion controls (typically programmable timer plus thermostat). Section 753 may apply if the immersion is integrated into the cylinder unusually, but typically the immersion is a discrete element with its own thermostat.",
  },
  {
    question: "Are there any heat pump installs that do not require MCS certification?",
    answer:
      "Off-grid systems, very large commercial / industrial installs, and customers who do not need to claim Boiler Upgrade Scheme grants or demonstrate quality assurance for some other reason can technically be done without MCS certification. But the install must still comply with BS 7671 (electrical), F-Gas (refrigerant) and Building Regs Part L (where applicable). MCS is the dominant route for UK domestic because it bundles the regulatory compliance with the grant access. As an apprentice you should expect virtually every domestic heat pump install you encounter to be MCS-certified.",
  },
  {
    question: "How do air-source and ground-source heat pumps compare on Part L compliance?",
    answer:
      "Both are heat pumps and both contribute to Part L SAP compliance via their SCOP. Ground-source typically posts a slightly higher SCOP (4.0-4.5 typical) than air-source (3.5-4.0 typical) because ground temperature is more stable than air temperature across the heating season. Both pass Part L comfortably in well-designed homes. The choice between air-source and ground-source is normally driven by site conditions (ground space for trenches or boreholes, garden access for civils, planning constraints) and capital cost (ground-source is typically 2-3x the install cost of air-source) rather than by Part L compliance alone.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 3"
            title="BS 7671 Section 753 (heating) and the heat pump regulatory map"
            description="Section 753 covers heating cables and embedded heating systems. The broader heat pump install draws on general BS 7671, F-Gas Regulations for refrigerant work, MCS MIS 3005 for design and installer competence, and Building Regs Part L for Part L compliance. The L3 apprentice's electrical scope sits within this regulatory map."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor electric heating, trace heating on pipework, integrated electric trim heaters in heat pump systems. Wet underfloor heating fed from a heat pump is not Section 753.",
              "F-Gas Regulations are a hard boundary — refrigerant work requires separate F-Gas certification. The L3 electrician handles supply, isolation, controls and bonding; the F-Gas engineer handles all refrigerant work.",
              "MCS MIS 3005 is the heat pump install standard — covers system design, product certification, installer competence, commissioning. Required for Boiler Upgrade Scheme grant eligibility.",
              "Building Regs Part L drives the underlying push toward heat pumps via the SAP target rate. Future Homes Standard takes fossil-fuel boilers off new-build from 2025. PAS 2035 governs grant-funded retrofit projects.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the scope of BS 7671 Section 753 and identify which heat pump install scenarios fall within it.",
              "Describe the F-Gas Regulations boundary and explain which heat pump install activities are F-Gas-only and which are within the L3 apprentice's electrical scope.",
              "Identify the role of MCS MIS 3005 alongside BS 7671 and explain its requirement for Boiler Upgrade Scheme grant eligibility.",
              "Recognise Building Regs Part L as the underlying driver behind the UK push toward heat pumps and identify the Future Homes Standard implications for new-build.",
              "Describe the typical electrical interface for a domestic heat pump — supply rating, protective device type, isolation, bonding, controls.",
              "Identify the apprentice's electrical scope on a typical air-source heat pump install.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>BS 7671 Section 753 — what it covers</ContentEyebrow>

          <ConceptBlock
            title="Section 753 covers heating cables and embedded heating systems"
            plainEnglish="BS 7671 Section 753 (Heating cables and embedded heating systems) covers electric heating elements buried in floors, walls, ceilings or pipework. It applies to underfloor electric heating, trace heating on pipework (frost protection on outdoor pipework, cold-room pipework, etc.), heated mirrors, heated handrails, and integrated electric trim heaters in heat pump or HVAC systems."
            onSite="On a typical air-source heat pump install in the UK, Section 753 may or may not apply depending on whether any embedded electrical heating elements are integrated. The wet system itself (water circulating through pipework in the floor) is not Section 753 — the floor pipework is not electrically heated, the water is heated by the heat pump compressor. Section 753 would apply if the install includes an electric trim heater integrated into a particular zone, an electric boost element in the cylinder beyond the standard immersion, or any other embedded electrical heating element."
          >
            <p>
              Section 753 typical applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor electric heating</strong> — heating cable or mat embedded in floor screed, fed from a thermostat / programmer. Common in bathrooms and kitchens.
              </li>
              <li>
                <strong>Trace heating</strong> — heating cable wrapped around or run alongside pipework to prevent freezing. Common on external pipework, cold rooms, drainage in cold climates.
              </li>
              <li>
                <strong>Heated mirrors and handrails</strong> — small heating elements integrated into bathroom mirrors (anti-fogging) or commercial handrails (anti-icing).
              </li>
              <li>
                <strong>Integrated electric trim / boost in HVAC</strong> — secondary electric heating elements integrated into heat pump systems for specific zones or duties.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 753 (Heating cables and embedded heating systems)"
            clause={
              <>
                "The requirements of this section apply to electrical heating systems with embedded heating cables or embedded heating film, and to surface heating systems on roofs, in gutters, and on pipework, vessels and walkways. The requirements supplement and modify the general requirements of this Standard."
              </>
            }
            meaning={
              <>
                Section 753 covers embedded electrical heating in its various forms. On a typical UK domestic heat pump install Section 753 applies where any electric heating element is integrated; the wet pipework circulating water from the heat pump is not Section 753. A4:2026 has refined Section 753 alongside the broader updates. The IET Codes of Practice for specific heating technologies (underfloor electric, trace heating) give the practical implementation guidance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 753 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>F-Gas Regulations — the trade boundary</ContentEyebrow>

          <ConceptBlock
            title="Refrigerant work requires F-Gas certification — the L3 electrician does not touch refrigerant"
            plainEnglish="The Fluorinated Greenhouse Gases Regulations (F-Gas) govern work on refrigerant circuits containing fluorinated refrigerants (R32, R290 propane, R410A, R134a etc.). Anyone installing refrigerant pipework, charging the system, or recovering refrigerant during service must hold F-Gas certification (City & Guilds 2079 or equivalent). The L3 electrician on a heat pump install does NOT do refrigerant work unless they hold separate F-Gas certification."
            onSite="On a typical heat pump install the trade split is clear. The F-Gas-certified engineer: connects and pressure-tests refrigerant pipework, charges the system with refrigerant, leaks-tests to F-Gas standards, recovers refrigerant during service or end-of-life. The L3 electrician: sizes and runs the supply cable, fits the local isolator, terminates the controls cabling, bonds the outdoor chassis where required, fits any electric trim heater per Section 753, commissions the electrical side. Crossing the line without F-Gas certification is a regulatory offence and an insurance issue."
          >
            <p>
              The F-Gas trade split:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F-Gas scope (NOT the L3 electrician without F-Gas cert)</strong> — refrigerant pipework, charging, recovery, leak testing, refrigerant disposal.
              </li>
              <li>
                <strong>L3 electrician scope</strong> — electrical supply, isolation, controls, bonding, embedded heating per Section 753, commissioning of electrical side.
              </li>
              <li>
                <strong>Joint scope</strong> — first-fix coordination (cable routes, refrigerant pipe routes, condensate drainage), final commissioning sign-off, customer handover.
              </li>
              <li>
                <strong>Refrigerant choice trends</strong> — R32 dominant in 2020-2024 modern systems; R290 (propane, natural refrigerant) increasingly common in 2024-2026 for low-GWP regulatory reasons. R290 has its own additional safety requirements (flammability) but reduces F-Gas regulatory burden.
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

          <ContentEyebrow>MCS MIS 3005 and Building Regs Part L</ContentEyebrow>

          <ConceptBlock
            title="MCS covers install quality and grant access; Part L covers building energy performance"
            plainEnglish="MCS MIS 3005 is the installer competence and product certification standard for heat pump installations. It covers system design (heat-loss calculation methodology, emitter sizing, SCOP estimate), product selection (eligible MCS-certified equipment), installation quality (refrigerant work by F-Gas certified personnel, electrical work to BS 7671), commissioning (flow temperature setup, control validation), and customer handover. Required for Boiler Upgrade Scheme (BUS) grant eligibility — currently £7,500 toward the cost of replacing a fossil-fuel boiler with a heat pump."
            onSite="Building Regs Part L (Conservation of Fuel and Power) is the construction-side energy regulation. New builds and notifiable refurbishments must demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER). A heat pump's SCOP feeds the SAP calculation; modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. PAS 2035 (Publicly Available Specification — Retrofitting dwellings) governs grant-funded retrofit projects with a 'whole-house' fabric-first approach."
          >
            <p>
              The four-document map for a UK domestic heat pump install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 (general plus Section 753 where applicable)</strong> — electrical safety. Mandatory.
              </li>
              <li>
                <strong>F-Gas Regulations</strong> — refrigerant work. Mandatory for refrigerant scope; requires F-Gas certification.
              </li>
              <li>
                <strong>MCS MIS 3005</strong> — install quality and BUS grant access. Required for grant eligibility; effectively mandatory for UK domestic.
              </li>
              <li>
                <strong>Building Regs Part L</strong> — energy efficiency. Mandatory for new-build and notifiable refurbishment; the SAP calculation includes the heat pump's SCOP.
              </li>
              <li>
                <strong>PAS 2035 (where applicable)</strong> — whole-house retrofit standard for grant-funded projects.
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

          <ContentEyebrow>The electrical interface in detail</ContentEyebrow>

          <ConceptBlock
            title="Supply rating, OCPD, RCD, isolation — the electrician's checklist for a domestic ASHP"
            plainEnglish="A typical UK domestic 5-12 kW ASHP draws between 16 A and 40 A on full compressor load, depending on size and conditions. The electrician sizes the supply, the protective device, the cable, the RCD and the isolation per the manufacturer&apos;s installation manual and the BS 7671 framework. The headline numbers are predictable, but the detail matters — under-sizing trips the OCPD on cold-morning compressor inrush, over-sizing wastes the customer&apos;s money on cable."
            onSite="Read the manual before specifying. Most modern inverter-driven heat pumps publish the recommended OCPD rating and type, the maximum cable run for each cable size, and any specific RCD type requirement. The MCS-certified designer should specify; the apprentice verifies and installs. Always factor in: the maximum continuous load (compressor plus fan plus controls), the inrush current (especially on non-soft-start units), the cable installation method (T+E in trunking vs SWA buried vs through-loft) and the ambient temperature derating, and the disconnection time requirement on the protective device per Section 411."
          >
            <p>
              The electrical interface in numbers (typical UK domestic ASHP):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Supply rating</strong> — typically 32 A or 40 A radial single-phase
                for 5-12 kW units. Three-phase units (large or commercial) sit above.
              </li>
              <li>
                <strong>OCPD type</strong> — Type C MCB or RCBO is the standard. Some
                modern soft-start inverter units accept Type B; check the manual.
              </li>
              <li>
                <strong>Cable size</strong> — 6 mm or 10 mm T+E typical for 32 A or 40 A
                circuits respectively, depending on length and method. SWA for outdoor
                runs to the unit.
              </li>
              <li>
                <strong>RCD</strong> — Type A typically acceptable for inverter-driven
                heat pumps; some larger or three-phase units may need Type B per Section
                531. Manufacturer&apos;s manual is the binding source.
              </li>
              <li>
                <strong>Local isolator</strong> — outdoor-rated rotary or padlockable
                isolator within sight of the outdoor unit per Section 537. Allows safe
                isolation for service without going to the consumer unit.
              </li>
              <li>
                <strong>Bonding</strong> — outdoor unit chassis bonded if it forms an
                extraneous-conductive-part. Typically the case where the unit connects
                via metallic refrigerant pipes to the indoor system; check at install.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cylinder immersion and legionella protection</ContentEyebrow>

          <ConceptBlock
            title="The immersion heater on a heat pump cylinder is for legionella, not heating"
            plainEnglish="A heat pump cylinder typically runs at flow temperatures of 45-55 degC. Legionella bacteria can grow in stored water at temperatures between 20 and 45 degC. To kill any legionella that establishes itself, the cylinder must be raised to at least 60 degC for an hour at least once a week — too hot for the heat pump to deliver efficiently, so a backup electric immersion heater handles the weekly thermal disinfection cycle. The heat pump does the routine heating; the immersion does the legionella cycle."
            onSite="The L3 apprentice scope on the immersion side: a 16 A radial on 2.5 mm T+E from the consumer unit to the immersion heater terminal box (rated 3 kW typical), a programmable thermostat / timer that triggers the weekly disinfection cycle, RCBO at the consumer unit. The MCS-certified designer specifies the disinfection schedule (typically Sunday morning for low-tariff utilisation); the apprentice configures the timer per the design. Brief the customer that the immersion is not a backup heater for general heating — running it routinely defeats the heat pump&apos;s economic case. The L8 ACoP (Approved Code of Practice for legionella) is the underlying regulation; the heat pump cylinder design typically incorporates a controller that handles the cycle automatically once the immersion is wired."
          >
            <p>
              Immersion and legionella considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Legionella cycle requirement</strong> — typically 60 degC for an
                hour at least once a week per L8 ACoP guidance for stored hot water.
              </li>
              <li>
                <strong>Immersion rating</strong> — typically 3 kW on 16 A circuit. Some
                larger cylinders or commercial use 6 kW on 32 A.
              </li>
              <li>
                <strong>Programmable thermostat / timer</strong> — triggers the weekly
                cycle; some heat pump cylinder controllers handle this internally given
                only a switched supply to the immersion.
              </li>
              <li>
                <strong>Customer brief</strong> — do not run the immersion routinely;
                the legionella cycle is automated; if the heat pump fails the immersion
                can hold hot water as emergency backup but at higher running cost.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Controls integration — the unsung half of the install</ContentEyebrow>

          <ConceptBlock
            title="Heat pump performance lives or dies on the controls"
            plainEnglish="A heat pump with poor controls runs at high flow temperatures and posts a poor SCOP. A heat pump with good controls — weather compensation, room compensation, tariff awareness, multi-zone scheduling — runs at the lowest flow temperature that meets demand and posts SCOP near the manufacturer&apos;s headline. The control wiring is typically a small portion of the total cable scope but a large portion of the install&apos;s eventual performance."
            onSite="The L3 apprentice scope on controls: pull the manufacturer-specified controls cable between the outdoor unit, the indoor cylinder controller and any remote room controllers; terminate per the manufacturer&apos;s wiring diagram; commission per the manufacturer&apos;s sequence (typically with the MCS designer present). Modern controls cables vary by manufacturer — Mitsubishi uses the M-NET protocol on a 2-core polarity-sensitive cable; Daikin uses S21 or P1/P2 protocols on similar 2-core; Samsung uses F1/F2; Vaillant uses eBUS. Cross-reference with the install manual; do not assume cables are interchangeable between manufacturers."
          >
            <p>
              The controls layer typically includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Weather compensation</strong> — outdoor sensor (sometimes built
                into the outdoor unit, sometimes a separate sensor near the eaves)
                feeds outdoor temperature; controller drops flow temperature on milder
                days. Single biggest SCOP improvement available.
              </li>
              <li>
                <strong>Room compensation</strong> — primary room sensor (typically the
                living room) feeds room temperature; controller modulates output to
                hit setpoint without overshoot.
              </li>
              <li>
                <strong>Multi-zone scheduling</strong> — separate zones (downstairs,
                upstairs, hot water) each with their own setpoint and schedule.
              </li>
              <li>
                <strong>Tariff awareness</strong> — increasingly available; heat pump
                pre-heats the cylinder during cheap-rate windows, defers compressor run
                during peak windows.
              </li>
              <li>
                <strong>Remote / app control</strong> — customer-facing app for schedule
                changes, holiday mode, monitoring.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Refrigerant landscape — R32, R290 and the GWP push</ContentEyebrow>

          <ConceptBlock
            title="Refrigerants are migrating from R32 to R290 (propane) for low-GWP compliance"
            plainEnglish="The Global Warming Potential (GWP) of a refrigerant measures how much it warms the atmosphere relative to CO2 if it escapes. R410A (older systems) has GWP 2088. R32 (current dominant) has GWP 675. R290 (propane, natural refrigerant) has GWP 3 — effectively zero. UK and EU F-Gas regulation is progressively tightening on high-GWP refrigerants, pushing the manufacturers toward lower-GWP options. R290 is now common on new ASHP launches in 2024-2026."
            onSite="The L3 electrician does not handle refrigerant — that is F-Gas territory. But the apprentice should recognise that R290 systems have additional safety considerations because R290 is flammable. Outdoor unit siting on R290 systems requires clearance from openings (windows, vents) and from sources of ignition; some indoor configurations are restricted. The MCS-certified designer applies the manufacturer&apos;s clearance rules; the apprentice verifies the install conforms. There is no electrical scope difference between R32 and R290 systems — the supply, isolation, controls and bonding are the same — but the install location and clearances may differ."
          >
            <p>
              The refrigerant landscape in 2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R410A (legacy)</strong> — GWP 2088. Phased out for new equipment;
                still in service on 2010-2018 systems. Recovery and disposal under
                F-Gas.
              </li>
              <li>
                <strong>R32 (current dominant)</strong> — GWP 675. Mildly flammable
                (A2L). Most 2018-2024 systems. F-Gas-certified install and service.
              </li>
              <li>
                <strong>R290 / propane (rising)</strong> — GWP 3. Fully flammable (A3).
                Outdoor units only typically; clearance rules to openings and ignition
                sources. F-Gas-certified plus additional ATEX-style safety
                considerations for the engineer.
              </li>
              <li>
                <strong>CO2 / R744 (commercial / DHW)</strong> — GWP 1. Used in some
                high-temperature commercial DHW heat pumps. Very high operating
                pressures.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When the property supply needs an upgrade</ContentEyebrow>

          <ConceptBlock
            title="Heat pump install can push the existing supply past its limit — flag it early"
            plainEnglish="A 9 kW ASHP on full load draws around 20 A continuous. Add an EV charger, a cooker, a shower running concurrently, and a typical 60-80 A single-phase main fuse can be exceeded. Heat pump installs are one of the common triggers for a DNO supply upgrade conversation alongside EV charging. The MCS-certified designer runs the diversity calculation; the apprentice flags the constraint when the headline maximum looks suspicious."
            onSite="The supply-upgrade decision tree mirrors the EV one. 60 A single-phase: heat pump alone fits; combined with EV usually needs load management or upgrade. 80 A single-phase: heat pump + EV with load management normally fits; combined with shower + oven concurrent draw is borderline. 100 A single-phase: comfortable for heat pump + EV + typical domestic loads. Three-phase: significant DNO works (4-12 weeks) but unlocks 22 kW EV charging and headroom for full electrification. Flag the constraint early; DNO supply upgrades take time and the customer needs the timeline. Some DNOs offer free or subsidised upgrades for low-carbon installs as part of network reinforcement programmes."
          >
            <p>
              The supply-upgrade trigger conditions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Existing 60 A main fuse plus heat pump plus EV</strong> —
                load management essential; upgrade to 80 A or 100 A worth discussing.
              </li>
              <li>
                <strong>Existing 80 A plus heat pump plus EV plus other heavy loads</strong>
                — normally fits with HEMS dispatch and load management; borderline at
                concurrent peak.
              </li>
              <li>
                <strong>Customer planning full electrification within 5 years</strong>
                — push for 100 A or three-phase upgrade now while the supply is being
                touched.
              </li>
              <li>
                <strong>Three-phase already present</strong> — opens 22 kW EV charging
                and headroom for full electrification; flag the opportunity.
              </li>
              <li>
                <strong>Network reinforcement programmes</strong> — Some DNOs subsidise
                or free-fund supply upgrades for low-carbon installs. Check before
                quoting.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Crossing the F-Gas line without certification because 'it is just connecting a couple of pipes'"
            whatHappens={
              <>
                Apprentice or non-F-Gas-certified electrician handles refrigerant pipework on the basis that 'it is the same as plumbing'. It is not. F-Gas Regulations are a regulatory regime with their own competence requirements, leak-test standards, refrigerant handling rules and certification. Crossing the line without certification: regulatory offence, insurance void, F-Gas leakage risk to atmosphere (refrigerants are powerful greenhouse gases — R32 has 675x the GWP of CO2), system failure risk if the joint is not properly tested. Not worth it.
              </>
            }
            doInstead={
              <>
                Stay strictly within the electrical scope unless you hold F-Gas certification (City &amp; Guilds 2079 or equivalent). Coordinate with the F-Gas-certified engineer on first fix (cable routes alongside pipe routes), but never handle refrigerant pipework or charging without the certification. If the apprentice wants to expand into the refrigerant trade later, the route is the F-Gas qualification — there is no shortcut.
              </>
            }
          />

          <CommonMistake
            title="Using a Type B MCB on a heat pump final circuit and getting nuisance trips on compressor inrush"
            whatHappens={
              <>
                Apprentice fits a Type B MCB on the heat pump final circuit because that is what the consumer unit happened to have spare. The compressor's start-up inrush (5-10x steady-state) trips the Type B (3-5x trip threshold) on the first cold morning. Customer's heating is off; callback to swap the device for a Type C; reputation damage avoidable.
              </>
            }
            doInstead={
              <>
                Use Type C MCB or RCBO unless the manufacturer's installation manual specifies otherwise. Some modern inverter-driven heat pumps with soft-start are explicitly compatible with Type B; most still recommend Type C. Read the manual before specifying the protective device. The MCS-certified designer should specify; the apprentice should verify on site.
              </>
            }
          />

          <Scenario
            title="Apprentice on an ASHP install — replacing a 1990s combi boiler"
            situation={
              <>
                You are the apprentice on a Mitsubishi Ecodan 8.5 kW air-source heat pump install replacing a 1990s combi boiler at a 4-bed semi. The MCS-certified designer (holding MIS 3005) has produced the system design — flow temperature 45 degC into upsized radiators, a 250 L unvented cylinder with backup immersion, weather compensation control, BUS grant claim. The F-Gas-certified engineer is handling the outdoor unit, refrigerant pipework, indoor cylinder coil and refrigerant charging. Your electrical scope: 40 A radial on 10 mm T+E from the consumer unit to the outdoor unit location, Type C RCBO at the consumer unit, local isolator outside near the outdoor unit, controls cabling between outdoor unit and indoor cylinder controller (manufacturer-specified pairs), bonding of the outdoor chassis (extraneous-conductive-part criteria met because of the wet system connection), 16 A radial on 2.5 mm T+E to the immersion heater with programmable thermostat. No Section 753 elements (no electric trim heaters in this design).
              </>
            }
            whatToDo={
              <>
                First fix: pull the 10 mm T+E cable through wall to outdoor unit location; pull the 2.5 mm T+E to immersion location; pull the controls cabling per manufacturer's wiring diagram; coordinate cable routes with the F-Gas engineer's refrigerant pipe routes. Second fix: terminate at consumer unit on new Type C RCBO; install local isolator outside; terminate at outdoor unit per wiring diagram; terminate controls; install immersion thermostat and programmable timer; bond outdoor chassis. Coordinate commissioning with the F-Gas engineer — they handle refrigerant charge and pressure-test, you handle electrical commissioning and controls validation. MCS designer signs off the system commissioning including SCOP estimate and customer handover documentation. Customer briefing: which isolator does what, how the immersion programmer works, what to expect from the heat pump in cold weather.
              </>
            }
            whyItMatters={
              <>
                ASHP installs are now mainstream UK domestic work. The L3 apprentice's role on the electrical side is real and significant — the supply, the controls, the bonding, the immersion, the labelling. Recognising the trade boundary (F-Gas separate, MCS designer overall, electrician electrical) is part of working effectively on a multi-trade install. The customer's BUS grant depends on the MCS sign-off; the install's electrical safety depends on the electrician's BS 7671 work; the refrigerant safety depends on F-Gas. All three trades contribute; none can skip the boundary.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD additional protection)"
            clause={
              <>
                Regulation 411.3.3 of BS 7671:2018+A4:2026 has been revised and now applies to
                socket-outlets with a rated current not exceeding 32 A. There is an exception to
                omit RCD protection where, other than for a dwelling, a documented risk
                assessment determines that RCD protection is not necessary.
              </>
            }
            meaning={
              <>
                Heat-pump installs typically include local socket-outlets at the outdoor unit
                or the cylinder cupboard for service work. Those sockets fall under 411.3.3 and
                must have RCD protection at the 32 A threshold and below. In a dwelling there
                is no risk-assessment exemption.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs in AC final circuits)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning={
              <>
                A heat-pump radial circuit is a fixed-load AC final circuit drawing high
                current for hours at a time — exactly the scenario AFDDs target. The regulation
                uses &quot;recommending&quot;, so AFDDs are not blanket-mandatory under BS 7671
                for a domestic heat pump, but a competent designer will normally specify them
                anyway and HRRBs bring AFDDs in via the Building Safety Act framework.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Section 753 covers heating cables and embedded heating systems — underfloor electric, trace heating, integrated electric trim heaters. Wet pipework fed from a heat pump is not Section 753.",
              "F-Gas Regulations are a hard trade boundary. Refrigerant work requires F-Gas certification (City & Guilds 2079). The L3 electrician handles supply, isolation, controls, bonding; not refrigerant.",
              "MCS MIS 3005 is the heat pump install standard. Required for Boiler Upgrade Scheme grant eligibility. Covers system design, product selection, installer competence, commissioning.",
              "Building Regs Part L drives the underlying push toward heat pumps via SAP target rate. Future Homes Standard takes fossil-fuel boilers off new-build from 2025.",
              "PAS 2035 governs grant-funded retrofit projects with a 'whole-house' fabric-first approach. Coordinated by Retrofit Coordinator and Retrofit Designer.",
              "Type C MCB or RCBO is the standard on heat pump final circuits because of compressor inrush. Type B can nuisance-trip even on inverter-driven units in some conditions.",
              "Cylinder immersion heater wiring is part of the apprentice's scope — programmable thermostat for legionella protection (60 degC weekly per HSWA) and as compressor backup.",
              "The four-document map for UK domestic heat pump install — BS 7671, F-Gas, MCS MIS 3005, Building Regs Part L (plus PAS 2035 on grant-funded retrofit). All apply; none can be skipped.",
            ]}
          />

          <Quiz title="BS 7671 Section 753 and heat pump regulatory map — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 BS 7671 Section 722 (EV)
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 ENA G98 / G99 grid notification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
