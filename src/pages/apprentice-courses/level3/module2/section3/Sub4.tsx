/**
 * Module 2 · Section 3 · Subsection 4 — Heat pump system technology deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational
 * requirements and benefits); 2357 Unit 602 ELTK02 / AC 3.2 (applications and
 * limitations of environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This Sub deepens the heat-pump system technology
 * content beyond Sub 3.2 — refrigeration cycle physics, COP / SCOP design at apprentice
 * level, emitter sizing trade-offs, ASHP / GSHP / WSHP comparison, refrigerant
 * options (R32, R290, R454B), the F-Gas trade boundary and how the L3 electrical
 * scope sits alongside refrigeration and plumbing.
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
  'Heat pump system technology deeper (3.4) | Level 3 Module 2.3.4 | Elec-Mate';
const DESCRIPTION =
  "Heat pump system technology at deeper recognition level for the L3 electrician — vapour-compression cycle in plain English, COP / SCOP at apprentice level, emitter sizing trade-offs, ASHP / GSHP / WSHP comparison, refrigerant options (R32, R290, R454B) and the F-Gas trade boundary. The electrical scope sits alongside the refrigeration and plumbing trades.";

const checks = [
  {
    id: "l3-m2-s3-sub4-cycle",
    question:
      "In plain physics terms, what is the vapour-compression cycle and where in it does the electricity actually do its work?",
    options: [
      "The cycle generates heat by burning the refrigerant.",
      "The vapour-compression cycle has four stages around a closed loop. (1) Evaporator — refrigerant at low pressure absorbs heat from the source (outside air for ASHP, ground brine for GSHP, water for WSHP) and boils to a vapour. (2) Compressor — driven by an electric motor, pressurises the vapour, raising its temperature. The compressor is where the electrical energy enters the cycle as mechanical work. (3) Condenser — the hot high-pressure vapour gives up heat to the wet system (radiators, underfloor) and condenses to a liquid. (4) Expansion valve — the liquid drops in pressure, ready to evaporate again. The first law of thermodynamics is conserved — heat out of the condenser equals heat in at the evaporator plus the electrical work done by the compressor. The COP measures how much heat each kWh of electrical work moves.",
      "The compressor heats the refrigerant electrically using a heating element.",
      "The cycle requires hydrogen.",
    ],
    correctIndex: 1,
    explanation:
      "Four stages, one moving part (the compressor) that consumes the electricity. The L3 apprentice should be able to point to each stage on a unit diagram and explain what happens. The compressor is the only moving part the electrician supplies — sizing the cable to its rated current is part of the electrical scope. The refrigerant work is F-Gas-certified personnel territory.",
  },
  {
    id: "l3-m2-s3-sub4-cop-vs-scop",
    question:
      "Why does the manufacturer quote COP at A7 / W35 conditions and SCOP across the season — and which one matters more for the customer?",
    options: [
      "They mean the same thing.",
      "COP at A7 / W35 means coefficient of performance measured at outdoor air 7 °C and water flow temperature 35 °C — a mild day driving low-temperature underfloor. It is the manufacturer's headline number and is typically 4 to 5 for a modern ASHP. SCOP (seasonal COP) averages performance across a typical UK heating season — including the cold spells when the unit works hardest at higher flow temperatures and the COP drops. SCOP is the more honest customer number — typical 3.0 to 3.5 for a properly designed UK system on radiators, 3.5 to 4.5 on underfloor heating, lower on undersized emitters. MCS-certified installations are required to provide a SCOP estimate per the actual building heat loss and emitter design. Quote SCOP to customers when discussing running costs.",
      "Only COP matters.",
      "Only SCOP matters.",
    ],
    correctIndex: 1,
    explanation:
      "COP is the headline; SCOP is the bill. Customers told 'COP 4' read it as 'every kWh in produces 4 kWh of heat all winter' — wrong. The COP test point is mild conditions on low-temperature emitters; in real use the unit averages somewhat lower across the season. Modern MCS designers issue the SCOP estimate; the L3 apprentice should not quote COP without explaining the SCOP context.",
  },
  {
    id: "l3-m2-s3-sub4-emitter",
    question:
      "Why do heat-pump installations prefer underfloor heating or oversized radiators over the existing gas-boiler radiators?",
    options: [
      "Heat pumps cannot drive radiators at all.",
      "Heat pumps deliver heat at a lower flow temperature than a gas boiler — typically 35 to 50 °C versus 65 to 75 °C for a boiler. The lower the flow temperature the higher the SCOP. Underfloor heating runs at 35 to 40 °C and gives the highest SCOP. Oversized radiators (larger surface area than the original boiler-sized radiators) deliver the same heat output at the lower flow temperature, keeping SCOP high. Original boiler radiators sized for 70 °C flow forced to run at 50 °C will deliver too little heat output — the room never reaches setpoint, the heat pump runs constantly, the customer is cold and the SCOP is poor. The MCS heat-loss survey identifies which rooms need radiator upgrades; the customer often has to budget for new emitters as part of the install.",
      "Underfloor is required by law.",
      "It is purely cosmetic.",
    ],
    correctIndex: 1,
    explanation:
      "Emitter sizing is the difference between a happy customer and an unhappy one. Heat pumps are not 'gas boilers but electric' — they need a different system design because they deliver low-grade heat. Customer expectations need to be set up front: 'we may need to upgrade some radiators to keep your house warm at heat pump flow temperatures'. The MCS heat-loss calc identifies rooms that need emitter upgrades.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between an ASHP, a GSHP and a WSHP and which is most common in UK domestic?",
    options: [
      "They are all the same.",
      "ASHP (air-source heat pump) takes heat from outside air via a fan-coil outdoor unit. Most common UK domestic install. Cheapest to install, COP varies most with weather. GSHP (ground-source heat pump) takes heat from the ground via a buried slinky pipe array (horizontal, needs garden space) or borehole array (vertical, needs ~£10-20k drilling). Higher SCOP because ground temperature is more stable than air, especially in winter. Higher install cost; rare in UK domestic outside of new-build with planning headroom. WSHP (water-source heat pump) takes heat from a pond, river or large body of water. Rare; site-dependent; needs environmental permitting (Environment Agency) and is mostly commercial / district scheme. The L3 electrician will see ASHPs on most jobs and GSHPs occasionally.",
      "GSHP is most common.",
      "WSHP is most common.",
    ],
    correctAnswer: 1,
    explanation:
      "ASHP dominates UK domestic because the install is straightforward — wall-mounted outdoor unit, pipe penetration through the wall, indoor controller. GSHP requires either garden excavation or borehole drilling, both expensive and disruptive. WSHP is niche. Most L3 apprentices will see ASHP on every install pre-2030; GSHP on the occasional new-build estate or large rural property.",
  },
  {
    id: 2,
    question:
      "What refrigerants are common in modern UK heat pumps and what does it mean for the install?",
    options: [
      "Only R22.",
      "R32 is the dominant refrigerant in current UK ASHP — moderate Global Warming Potential (GWP ~675), F-Gas regulated, mildly flammable (A2L category), efficient in vapour-compression. R290 (propane) is rapidly increasing in market share — natural refrigerant, very low GWP (~3), highly flammable (A3 category) requiring specific install practices (charge limits per BS EN 378, ventilation around outdoor unit, ignition source clearance). R454B is replacing R410A in some products as a lower-GWP step. R410A and R134a are older refrigerants being phased down under F-Gas. The L3 electrician does not handle refrigerant — that is F-Gas certified personnel — but should recognise the refrigerant on the unit nameplate because A3 (R290) units have additional spacing requirements at install (clearance from windows, vents, ignition sources).",
      "Only water.",
      "Diesel.",
    ],
    correctAnswer: 1,
    explanation:
      "R32 dominates today; R290 is the future. F-Gas Regulations are pushing the industry toward natural refrigerants with low GWP. As an apprentice you should recognise the refrigerant from the nameplate and understand that R290 (propane) units need careful siting — windows, vents, ignition sources kept clear per the installation manual.",
  },
  {
    id: 3,
    question:
      "Why is the heat-loss calculation the most important document on a heat pump install?",
    options: [
      "It is just paperwork.",
      "The heat-loss calc determines the unit size, the flow temperature, the emitter design, the SCOP estimate and ultimately whether the customer is warm and the running costs match the quote. MCS MIS 3005 mandates a room-by-room heat-loss calculation per BS EN 12831 — fabric-by-fabric, with U-values for each wall / window / floor / roof element, ventilation losses by air change rate, design outdoor temperature for the location, design indoor temperature for each room. The result is the design heat load (kW) which sizes the unit. Skip it or fudge it and the system either oversizes (cycles inefficiently, premature compressor wear, poor SCOP) or undersizes (cannot meet load on cold days, customer freezes, complaint city). The L3 apprentice does not run the heat-loss calc but should recognise it as the foundation document of the whole install.",
      "Only the manufacturer cares.",
      "Replaced by SCOP.",
    ],
    correctAnswer: 1,
    explanation:
      "The heat-loss calc is to a heat pump install what the design current is to an electrical install — it sets everything downstream. MCS-certified designers spend hours on it because everything else hangs off the answer. As an apprentice on the install team you should be able to point to the heat-loss summary and recognise that the unit specified, the radiator schedule and the design flow temperature all derive from it.",
  },
  {
    id: 4,
    question:
      "How does an inverter-driven heat pump differ from an older fixed-speed unit, and why does it matter for SCOP?",
    options: [
      "They are identical.",
      "Older fixed-speed heat pumps run the compressor at full output or off — short-cycling repeatedly to match a partial load. Each start consumes electricity and stresses the compressor. Modern inverter-driven units vary the compressor speed continuously to match the actual heat demand — running at 30 to 100 percent capacity smoothly. The result is better SCOP (less wasted starting energy), longer compressor life, quieter operation and more comfortable indoor temperatures. Almost every new domestic ASHP sold in the UK is inverter-driven. The L3 electrician sizes the supply to the rated nameplate current (the compressor at full speed); the variable-speed control is internal to the unit.",
      "Inverter-driven units are slower.",
      "Inverter-driven units use no electricity.",
    ],
    correctAnswer: 1,
    explanation:
      "Inverter-driven (sometimes called 'modulating') is the modern standard. Variable-speed compressors give better SCOP because they avoid the start-stop losses of older fixed-speed units. The cost premium has fallen and is now standard. Type C MCB or RCBO is needed because of the start-up inrush even on inverter units.",
  },
  {
    id: 5,
    question:
      "What does the MCS designer do with the SCOP estimate and why does the customer need to see it?",
    options: [
      "Bin it.",
      "The MCS designer calculates the predicted SCOP per the heat-loss calc, the chosen emitter design, the unit specification and the design flow temperature. The result is shared with the customer in writing as part of the design proposal — typically alongside an estimated annual electricity consumption (kWh) and an estimated annual running cost using the customer's electricity tariff. This sets honest customer expectations and is the basis on which the customer makes the buy-or-not-buy decision. MCS Code of Practice requires this disclosure. Without the SCOP estimate, the customer is signing off a six-figure decision (especially with retrofit fabric work) on no basis. The L3 apprentice should be able to find the SCOP estimate in the design pack and discuss it at customer level if asked.",
      "Manufacturer secrecy.",
      "Optional.",
    ],
    correctAnswer: 1,
    explanation:
      "Honest SCOP disclosure is the difference between a satisfied customer and a complaint case. Customers who are told 'this will save you X per year' on a SCOP basis can verify the saving against their bill within a year. Customers who are sold on COP marketing find their bill higher than promised and the trust collapses. The L3 apprentice on site is the customer's real-time interface; knowing the SCOP estimate matters.",
  },
  {
    id: 6,
    question:
      "What is the typical electrical scope for the L3 apprentice on a domestic ASHP install?",
    options: [
      "Refrigerant work.",
      "The electrical scope: dedicated final circuit from the consumer unit (typical 32 A radial on 6 mm cable for 5-7 kW unit, 40 A on 10 mm for 9-12 kW; Type C MCB or RCBO because of compressor inrush); local means of isolation outside near the outdoor unit (rotary isolator with weatherproof enclosure to BS EN 60947-3); controls cabling between outdoor unit, indoor controller, room thermostats, weather compensation sensor, zone valves, hot water cylinder thermostat; immersion heater wiring on the cylinder (programmable thermostat for legionella protection); bonding of the outdoor chassis where the manufacturer specifies or where it is an extraneous-conductive-part; certification on the EIC. The refrigerant pipework, charge weighing, leak test and commissioning of the refrigeration circuit are F-Gas certified personnel territory and outside the L3 electrical scope.",
      "Plumbing only.",
      "Driving the van.",
    ],
    correctAnswer: 1,
    explanation:
      "The electrical scope is well-defined and significant — dedicated supply, isolation, controls, bonding, certification. The controls cabling is often the time-consuming part — multiple zone valves, room thermostats, weather sensors, smart-home integration. The refrigeration trade lands separately and runs the refrigerant work; the plumber lands separately and runs the wet system. Three trades on one install.",
  },
  {
    id: 7,
    question:
      "Why does a heat pump need a Type C MCB or RCBO rather than Type B?",
    options: [
      "Type B works fine.",
      "Heat-pump compressors have a high inrush current at start-up — typically 5 to 10 times the rated running current for a few cycles as the motor starts. A Type B MCB trips at 3 to 5 times rated current; the compressor inrush can nuisance-trip a Type B even on a healthy install, especially in cold weather when the motor starts hardest. A Type C MCB trips at 5 to 10 times rated current — comfortably above the inrush, still well below the prospective fault current, gives reliable nuisance-trip-free operation while preserving fault protection. Modern inverter-driven units have softer start profiles than older fixed-speed units but Type C remains the standard recommendation. RCBOs in Type C variant are also commonly used to provide both overcurrent and 30 mA earth leakage protection in one device.",
      "Only Type AC works.",
      "MCBs not needed at all.",
    ],
    correctAnswer: 1,
    explanation:
      "Type C is the standard heat-pump answer. Type B MCBs that nuisance-trip on cold-morning compressor starts produce unhappy customers and emergency call-outs. The MCS-certified designer specifies the protective device on the design pack; the L3 apprentice fits per the design.",
  },
  {
    id: 8,
    question:
      "How does the heat pump deliver hot water and what is the legionella protection requirement?",
    options: [
      "It does not.",
      "Domestic ASHP installs usually include an unvented hot water cylinder (typically 200 to 300 L for a family home) with two heat sources — the heat pump heating coil (primary, low-temperature) and an electric immersion heater (secondary, higher-temperature). The heat pump heats the cylinder to 45 to 50 °C for normal hot water demand. The immersion heater is run periodically (typically weekly) to lift the cylinder temperature to 60 °C for at least 60 minutes for legionella pasteurisation per the WHS guidance under HSWA 1974 / L8 ACoP. Some heat pumps can do the legionella cycle themselves at high flow temperature without the immersion. The programmable thermostat on the immersion is the L3 electrician's wiring scope. Hot water at 60 °C is hot enough to scald — anti-scald TMVs are required at outlets per Building Regs Part G.",
      "Only by gas backup.",
      "Cold water only.",
    ],
    correctAnswer: 1,
    explanation:
      "Hot water is the heat pump's secondary job after space heating. Legionella protection is the safety-critical part — Legionnaires disease is a real risk in tepid stored water. The 60 °C weekly pasteurisation cycle is a non-negotiable. The programmable immersion thermostat that does this is part of the L3 apprentice wiring scope.",
  },
];

const faqs = [
  {
    question: "What is the realistic SCOP I should expect on a properly designed UK ASHP?",
    answer:
      "On a well-designed install with appropriately sized radiators (oversized vs original boiler-sized) or underfloor heating, design flow temperature 45 to 50 °C, modern inverter-driven unit, well-insulated property — SCOP 3.0 to 3.5 on radiators, 3.5 to 4.5 on underfloor. Marginal installs with original undersized radiators forced to run at 55 to 60 °C will post SCOP 2.5 to 3.0. SCOP below 2.5 indicates either poor design (undersized emitters) or poor install (refrigerant leak, controls misconfiguration) and is a warning sign. The MCS designer issues a SCOP estimate per house; comparing actual SCOP after a year against the estimate is a useful health check.",
  },
  {
    question: "Why does the outdoor unit blow cold air in winter?",
    answer:
      "An ASHP extracts heat from outside air. The outdoor coil takes heat from the air, so air leaving the coil is colder than air entering. In winter this can be visibly cold (as low as -10 °C leaving) and on humid cold days you may see frost on the coil and ice forming on the ground below the unit. This is normal and expected — the unit is doing its job. The defrost cycle (a brief reverse of the cycle to warm the outdoor coil and shed accumulated frost) is also normal — typically every 30 to 60 minutes in cold conditions. Customers occasionally report this as a fault; explain it is the unit working as designed.",
  },
  {
    question: "Can a heat pump replace a gas boiler one-for-one?",
    answer:
      "Sometimes, but not always. The honest answer depends on the building fabric and the existing radiator system. A well-insulated property with reasonably sized radiators may accept a heat pump with no fabric work and no emitter upgrades. A leaky 1930s semi with single-glazing and undersized radiators needs fabric upgrades (insulation, double glazing) and emitter upgrades (larger radiators or underfloor) to achieve a good SCOP. The MCS heat-loss survey identifies exactly what is needed. Customers expecting 'rip out the boiler, drop in a heat pump, done' need an honest conversation about the wider scope.",
  },
  {
    question: "What about hybrid systems — heat pump and gas boiler together?",
    answer:
      "Hybrid systems use a heat pump for the bulk of the heating load and a gas boiler for cold-weather peaks and hot water. Justified historically where the existing boiler and radiator system was hard to replace; less attractive now as grid carbon falls and heat pump performance improves. Future Homes Standard takes new fossil-fuel boilers off new-build from 2025; hybrid retrofit may persist for some niche cases but the policy direction is heat-pump-only. The L3 electrician will see fewer hybrids over time.",
  },
  {
    question: "What is the noise level outside and is it a planning issue?",
    answer:
      "Modern domestic ASHP outdoor units are typically rated 45 to 55 dB(A) at 1 metre. Permitted Development rules (England) include MCS planning standard MIS 020 noise assessment that limits noise at the nearest neighbour assessment position to 42 dB(A) — typically achievable with sensible siting (1 metre from boundary, away from neighbour windows). MCS-certified designers complete the MCS noise assessment as part of the design. Local Planning Authority can require a separate planning application if the install falls outside Permitted Development. The L3 apprentice should expect to see the noise assessment in the install pack.",
  },
  {
    question: "Why do MCS designs sometimes specify a buffer tank or volumiser?",
    answer:
      "A buffer tank or volumiser is a small extra hot-water tank (typically 25 to 75 L) plumbed into the heating circuit between the heat pump and the emitters. Its job is to stabilise the heat pump cycle — preventing short-cycling when the heating demand falls below the heat pump minimum modulation level. Modern inverter-driven units modulate well and may not need a buffer; older systems with high turndown ratios benefit. The MCS designer specifies whether a buffer is needed per the heat-loss calc and the unit modulation profile. The buffer is plumbing scope — the L3 electrician installs the controls (immersion if any, sensors) but not the wet pipework.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 4"
            title="Heat pump system technology deeper"
            description="The vapour-compression cycle in plain English. COP / SCOP at apprentice level. Emitter sizing trade-offs. ASHP / GSHP / WSHP comparison. Refrigerant options and the F-Gas trade boundary. The electrical scope sits alongside refrigeration and plumbing — recognise where each starts and stops."
            tone="emerald"
          />

          <TLDR
            points={[
              "Vapour-compression cycle has four stages: evaporator (heat in), compressor (electrical work in), condenser (heat out), expansion valve (reset). The compressor is where the electricity does its work.",
              "COP is the headline at A7 / W35 mild conditions; SCOP averages across the heating season. SCOP 3.0-3.5 on radiators, 3.5-4.5 on underfloor is good; below 2.5 indicates a problem.",
              "Emitter sizing matters — heat pumps deliver low-temperature heat, so emitters need to be larger than gas-boiler-sized to deliver the same room output.",
              "ASHP dominates UK domestic; GSHP is rare outside new-build with garden space. R32 dominates current refrigerants; R290 (propane) is rising and needs careful siting clearances.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the four stages of the vapour-compression cycle in plain physics terms — evaporator, compressor, condenser, expansion valve.",
              "Explain the difference between COP at A7 / W35 and SCOP across the heating season; identify realistic SCOP ranges for UK domestic installs.",
              "Describe why emitter sizing matters for heat pump SCOP and what flow temperatures correspond to underfloor, oversized radiators and original boiler-sized radiators.",
              "Compare ASHP, GSHP and WSHP at recognition level — install cost, SCOP, market prevalence in UK domestic.",
              "Recognise current refrigerants (R32, R290, R454B) on a unit nameplate and identify the F-Gas trade boundary at apprentice level.",
              "Identify the L3 electrical scope on an ASHP install — supply, isolation, controls, bonding, certification — distinct from the F-Gas refrigeration and the wet plumbing.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The vapour-compression cycle in plain English</ContentEyebrow>

          <ConceptBlock
            title="Four stages, one moving part, no magic"
            plainEnglish="A heat pump runs the same physics as your fridge but in the reverse direction. A fridge moves heat from inside the cabinet to the room behind it; a heat pump moves heat from outside the building to inside. The same four-stage closed loop is involved — refrigerant evaporates somewhere cold to absorb heat, gets compressed (electrical work), condenses somewhere warmer to give up heat, then expands back to low pressure for the next cycle. Energy is conserved throughout — heat out of the condenser equals heat in at the evaporator plus the electrical work the compressor did."
            onSite="The L3 electrician supplies one moving part — the compressor motor. Sizing the supply cable to the rated current, fitting Type C protection, providing local isolation, terminating the controls, bonding the chassis. The refrigerant pipework and the four-stage process happen inside the unit; you do not open the refrigerant circuit at any point unless you are F-Gas certified separately."
          >
            <p>
              The four stages, in order around the loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Evaporator (cold side)</strong> — refrigerant at low pressure
                (typically 5-10 bar) is below the source temperature. It absorbs heat from
                the source (outside air for ASHP, ground brine for GSHP, water for WSHP)
                and boils to a vapour. The source loses heat; the refrigerant gains it.
              </li>
              <li>
                <strong>Compressor (electrical work in)</strong> — the heart of the
                system. An electric motor drives a scroll, rotary or piston compressor
                that pressurises the vapour to a high pressure (typically 25-40 bar).
                Compression raises both the pressure and the temperature of the vapour.
                The electrical energy enters the cycle here as mechanical work on the
                refrigerant.
              </li>
              <li>
                <strong>Condenser (hot side)</strong> — the hot high-pressure vapour
                meets the wet system (radiator or underfloor circuit) which is at a lower
                temperature. Heat flows from the refrigerant to the wet system; the
                refrigerant condenses to a liquid. The wet system gains heat; the
                refrigerant loses it.
              </li>
              <li>
                <strong>Expansion valve (pressure reset)</strong> — the high-pressure
                liquid drops in pressure through a metering device (thermal expansion
                valve or electronic expansion valve), cooling sharply as it expands. The
                cycle is now ready to start again at the evaporator.
              </li>
            </ul>
            <p>
              Energy balance: heat delivered to the wet system = heat extracted from the
              source + electrical work done by the compressor. The COP is the ratio of
              the first to the third — useful heat delivered per kWh of electricity
              consumed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="F-Gas Regulations — EU Regulation 517/2014 (retained UK law) and the Fluorinated Greenhouse Gases Regulations 2015"
            clause={
              <>
                Work on equipment containing fluorinated refrigerants requires
                personnel to hold a current F-Gas qualification appropriate to
                the work category (installation, leak checking, recovery,
                servicing). It is a regulatory offence to install, service or
                decommission F-Gas refrigerant circuits without certification.
                The Regulations cover R32, R410A, R134a, R404A, R454B and
                related fluorinated refrigerants. Natural refrigerants (R290
                propane, CO2, ammonia) sit outside F-Gas but inside other
                competence frameworks (BS EN 378 hydrocarbon handling).
              </>
            }
            meaning={
              <>
                F-Gas is a hard trade boundary. The L3 electrician does NOT
                touch the refrigerant circuit unless they hold separate F-Gas
                certification (typically City and Guilds 2079 or equivalent).
                The electrical scope (supply, isolation, controls, bonding) is
                BS 7671 territory and within the L3 scope; the refrigerant
                scope is F-Gas territory and requires separate competence. The
                two trades work alongside each other on a heat pump install.
                Crossing the boundary without certification is a regulatory
                offence and an insurance issue.
              </>
            }
            cite="Source: EU Regulation 517/2014 (retained UK law) and SI 2015/310 — Fluorinated Greenhouse Gases Regulations 2015. Full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>COP and SCOP — the two efficiency numbers</ContentEyebrow>

          <ConceptBlock
            title="COP is the marketing number; SCOP is the bill"
            plainEnglish="COP (Coefficient of Performance) is measured at a specific test point — typically A7 / W35 (outdoor 7 °C, water flow 35 °C). It is a manufacturer headline. SCOP (Seasonal COP) averages performance across a typical UK heating season including the cold spells when the unit works hardest at higher flow temperatures. SCOP is the more honest customer number because it tracks real running cost. The MCS designer issues a SCOP estimate per actual building heat loss and chosen emitter design; that estimate is what the customer should be told about expected running cost."
            onSite="When a customer asks 'how efficient is this thing' the answer should be SCOP-based: 'on your design with these emitters, the MCS estimate is SCOP X — meaning every kWh of electricity moves about X kWh of heat into your house, averaged across the year'. Quoting raw COP without the SCOP context is what generates angry customers a year later when the bills do not match the marketing."
          >
            <p>
              Realistic UK SCOP ranges:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating, design flow 35 °C, well-insulated property</strong> —
                SCOP 3.5 to 4.5. The best-case scenario.
              </li>
              <li>
                <strong>Oversized radiators, design flow 45 °C, reasonable insulation</strong> —
                SCOP 3.0 to 3.5. The typical retrofit target.
              </li>
              <li>
                <strong>Mixed system, design flow 50 °C, average insulation</strong> —
                SCOP 2.8 to 3.2. Acceptable but not optimal.
              </li>
              <li>
                <strong>Original boiler-sized radiators, design flow 55-60 °C, marginal
                insulation</strong> — SCOP 2.3 to 2.8. Warning territory; running cost
                may exceed customer expectations.
              </li>
              <li>
                <strong>SCOP below 2.0</strong> — install pathology. Refrigerant
                undercharge, undersized emitters causing constant high-flow operation,
                controls misconfigured, weather compensation off. Warrants investigation.
              </li>
            </ul>
            <p>
              The carbon comparison: gas combustion in a domestic boiler produces about
              210 gCO2 per kWh of useful heat. A heat pump at SCOP 3.0 on a UK grid at
              200 gCO2 per kWh of electricity emits about 67 gCO2 per kWh of heat — roughly
              three times cleaner. As the grid carbon intensity continues to fall, the heat
              pump gets cleaner without any change to the kit; gas boilers do not.
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

          <ContentEyebrow>Emitter sizing — why the radiators matter</ContentEyebrow>

          <ConceptBlock
            title="Lower flow temperature, larger emitters, better SCOP"
            plainEnglish="A radiator delivers heat to the room at a rate proportional to the difference between the radiator surface and the room temperature. A radiator at 70 °C in a 20 °C room delivers a lot of heat per square metre of surface. The same radiator at 50 °C in a 20 °C room delivers about half. To get the same room heat output at the lower flow temperature, you need either more surface area (bigger radiators) or a different emitter (underfloor heating with very large surface area at low temperature)."
            onSite="The MCS heat-loss calc identifies design heat output needed per room. The MCS designer then picks emitters that deliver that output at the chosen design flow temperature. Original boiler-sized radiators sized for 70 °C flow may need replacing with larger units to deliver the same output at 50 °C. The customer needs to know this at design stage — radiator upgrades can add four-figure cost and disruption to the install. The L3 apprentice does not size radiators (plumbing trade) but should recognise the radiator schedule in the install pack and understand why the upgrade list exists."
          >
            <p>
              Practical implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Underfloor heating</strong> — very large emitter surface area
                (whole floor). Runs at 30-40 °C flow. Highest SCOP. Ideal for new-build
                or major retrofit. Cost is the install (screed, manifold, controls).
              </li>
              <li>
                <strong>Oversized radiators</strong> — typical retrofit answer. Replace
                original radiators with larger units (often double-panel double-convector)
                sized for 45-50 °C flow. Lower install cost than underfloor; cosmetic
                impact (larger units in each room).
              </li>
              <li>
                <strong>Original radiators retained</strong> — sometimes feasible in
                rooms where the original radiator was already oversized for the load.
                Force the heat pump to higher flow temperature (55-60 °C) and accept the
                SCOP hit. Often the cheapest install but the worst running cost.
              </li>
              <li>
                <strong>Skirting heating, low-temperature trench convectors</strong> —
                niche emitter types that work well at low flow temperature. Cosmetic
                appeal in some properties.
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

          <ContentEyebrow>ASHP, GSHP, WSHP — what each is</ContentEyebrow>

          <ConceptBlock
            title="Three source options; ASHP dominates UK domestic"
            plainEnglish="ASHP (Air-Source Heat Pump) takes heat from outside air via a fan-coil outdoor unit. Most common UK domestic install. Cheapest. Performance varies most with weather — colder air means lower COP, defrost cycles in cold humid conditions. GSHP (Ground-Source Heat Pump) takes heat from the ground via a buried pipe array. Higher SCOP because ground temperature is more stable. Higher install cost because the ground loop needs garden excavation (slinky) or borehole drilling. WSHP (Water-Source Heat Pump) takes heat from a pond, river or large body of water. Rare; site-specific; needs Environment Agency permitting; mostly commercial / district scheme."
            onSite="Most L3 apprentices will see ASHPs on every install pre-2030; GSHPs occasionally on new-build estates with garden space or large rural retrofit; WSHPs rarely. The electrical scope is broadly similar across all three (supply to a compressor, isolation, controls, bonding) — the differences are in the source-side install (refrigerant circuit for ASHP, ground loop for GSHP, water heat exchanger for WSHP) which is outside the L3 electrical scope."
          >
            <p>
              Practical comparison at apprentice level:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ASHP install cost</strong> — typically £8-15k for a 5-7 kW unit
                including emitter upgrades on a typical UK retrofit. Boiler Upgrade
                Scheme grant (BUS) £7,500 in England / Wales (subject to ongoing scheme
                terms).
              </li>
              <li>
                <strong>GSHP install cost</strong> — typically £15-30k including ground
                loop. Slinky horizontal £4-8k extra; borehole £10-20k extra. BUS grant
                £7,500 (same as ASHP — no premium for GSHP).
              </li>
              <li>
                <strong>WSHP install cost</strong> — site-dependent, plus Environment
                Agency permitting. Mostly commercial.
              </li>
              <li>
                <strong>SCOP comparison</strong> — ASHP 3.0-3.5 typical retrofit; GSHP
                3.5-4.5 typical due to stable ground temperature.
              </li>
              <li>
                <strong>Maintenance burden</strong> — all three need annual service per
                MCS Code and warranty terms. ASHP has the visible outdoor unit needing
                occasional cleaning of fins. GSHP has no outdoor moving parts above
                ground. WSHP needs occasional inspection of the underwater heat exchanger.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Refrigerants — R32 today, R290 increasingly"
            plainEnglish="Modern UK ASHPs use R32, R290 (propane) or R454B refrigerant. R32 dominates current sales — moderate Global Warming Potential (~675), F-Gas regulated, mildly flammable (A2L). R290 is rapidly rising — natural hydrocarbon, very low GWP (~3), highly flammable (A3) requiring specific install practices per BS EN 378 (charge limits, ventilation around the outdoor unit, ignition source clearances). R454B is replacing R410A as a lower-GWP step-change. Older refrigerants (R410A, R134a) are being phased down under F-Gas. The L3 electrician does not handle refrigerant but should recognise the type from the unit nameplate."
            onSite="R290 (propane) units have specific install rules — typically 1 metre clearance from openable windows / vents, 3 metres from ignition sources (spark-producing electrical equipment, hot exhausts), and the outdoor unit must be sited where any leaked propane disperses upwards rather than pooling. The MCS-certified designer checks these clearances at survey; the L3 apprentice should recognise the rules and not site any electrical isolators inside the no-ignition-source zone around an R290 outdoor unit."
          >
            <p>
              Refrigerant categories in plain terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A1 (non-flammable)</strong> — older refrigerants like R410A,
                R134a. F-Gas regulated, being phased down because of high GWP.
              </li>
              <li>
                <strong>A2L (mildly flammable)</strong> — R32, R454B. F-Gas regulated.
                Some restrictions on charge size and confined space install. Most current
                UK ASHPs.
              </li>
              <li>
                <strong>A3 (highly flammable)</strong> — R290 (propane). Natural,
                non-F-Gas, very low GWP. Specific install rules per BS EN 378 — charge
                limits typically 0.152 kg of propane per cubic metre of room volume
                (indoor), generous clearances outdoor.
              </li>
              <li>
                <strong>B (toxic)</strong> — R717 ammonia. Industrial only; not
                domestic.
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

          <ConceptBlock
            title="Hot water cylinders — sizing, recovery and the legionella cycle"
            plainEnglish="A heat pump's hot water side runs differently from a gas combi. The cylinder is heated to roughly 50 degrees C in normal operation (heat pump SCOP drops sharply above 55 degrees C, so designers keep the temperature low), with a weekly anti-legionella cycle to 60 degrees C using either the heat pump's full output or a backup immersion. Cylinder size is set by the household's hot water demand pattern — a 4-bed family home typically uses a 250-300 L cylinder; a 5-bed with two showers in the morning needs 300-400 L."
            onSite="The L3 apprentice's electrical scope on the cylinder is the immersion supply, the cylinder thermostat, and the controls that command the heat pump to run on hot water priority. The plumber installs the cylinder and the dry pocket for the thermostat; the heat pump installer wires the controls. Ensure the immersion is on its own circuit (typical 3 kW on a 16 A B-curve MCB) so it can run as backup if the heat pump is out of service. Document the anti-legionella schedule on the handover — customers occasionally turn it off to save energy and inadvertently breach the Health and Safety at Work guidance on legionella."
          >
            <p>
              Heat-pump cylinder design factors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cylinder size</strong> — driven by daily peak hot
                water draw; 250-300 L typical for a 4-bed.
              </li>
              <li>
                <strong>Coil rating</strong> — heat-pump-rated cylinders have
                an oversized coil so the heat pump can charge the cylinder at
                its low flow temperature; gas cylinders' undersized coils are
                not suitable.
              </li>
              <li>
                <strong>Storage temperature</strong> — typically 50 degrees C
                normal, 60 degrees C anti-legionella weekly.
              </li>
              <li>
                <strong>Backup immersion</strong> — typical 3 kW on a 16 A
                B-curve MCB with its own thermostat; runs as backup or as the
                anti-legionella heat source.
              </li>
              <li>
                <strong>Smart controls</strong> — controls schedule the heat
                pump for cylinder priority overnight (cheap-rate tariff if
                available); the apprentice should recognise the schedule
                pattern at handover.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Buffer tanks and volumiser — when and why they appear in the install"
            plainEnglish="A buffer tank is a small (50-200 L) insulated water tank between the heat pump and the heating circuit. It provides thermal mass to prevent short-cycling on lightly-loaded systems and to handle defrost cycles smoothly. A volumiser is a similar small tank used to add volume to the system loop without adding mixing capability. The L3 apprentice on a heat-pump install will encounter both in design packs — recognising which is which matters for the controls and the bonding."
            onSite="The buffer tank is typically wired with its own circulating pump that draws from the buffer to the emitters; the heat pump charges the buffer at its own flow rate. Bonding to the buffer tank chassis goes back to the MET via the local CPC. A volumiser is plumbed inline, no extra pump or controls, no bonding implications beyond the existing pipework. Customer brief at handover — the buffer tank is normal and necessary; do not turn off the buffer pump as a 'fuel saving' measure (the heat pump short-cycles and SCOP collapses)."
          >
            <p>
              Buffer tank vs volumiser — recognising the difference:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Buffer tank with separate pump</strong> — adds
                thermal mass and decouples the heat pump cycle from the
                emitter demand; runs the heat pump at its sweet-spot flow
                rate even when the rooms are lightly demanding heat.
              </li>
              <li>
                <strong>Volumiser inline</strong> — adds water volume to
                meet the manufacturer's minimum system volume (often
                30-50 L per kW of heat pump rating); no controls or
                bonding implications.
              </li>
              <li>
                <strong>Anti-cycling on small loads</strong> — buffer
                tank holds the heat output when only one or two
                radiators are calling for heat; without it, the heat pump
                would short-cycle and SCOP would collapse.
              </li>
              <li>
                <strong>Smooth defrost</strong> — buffer water rides through
                the heat pump's defrost cycle (a few minutes once or twice
                an hour in cold weather) so the rooms do not feel the
                temperature drop.
              </li>
              <li>
                <strong>Customer brief</strong> — leave the buffer pump
                running; the buffer is part of the system, not optional.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Backup heating strategy — bivalent, bivalent-parallel and emergency immersion"
            plainEnglish="Heat pumps deliver less heat as the outdoor air drops below the design temperature. On the coldest UK days (-3 to -8 degrees C in southern England, lower in Scotland) the heat pump may not deliver the full design heat output. The design strategy is bivalent (heat pump alone above the bivalent point, electric backup below), bivalent-parallel (heat pump plus electric resistance running together below the bivalent point), or emergency immersion (only used if the heat pump fails)."
            onSite="The L3 apprentice's electrical contribution is the backup heater supply — typically a 3-12 kW electric immersion or inline electric heater, on its own circuit sized to its rated current (3 kW = 16 A B-curve, 9 kW = 40 A B-curve, 12 kW = 50 A B-curve), with its own RCD or RCBO. The controls strategy is set by the heat pump installer — backup activates automatically when the heat pump cannot meet demand, or only when the customer presses the emergency heat button. Document the strategy on handover so the customer knows what to expect on the coldest days."
          >
            <p>
              Backup heating strategy options:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bivalent (heat-pump only above bivalent point)</strong>
                — backup activates below a set outdoor temperature; the
                heat pump shuts down when backup is on.
              </li>
              <li>
                <strong>Bivalent-parallel (both run below bivalent
                point)</strong> — heat pump continues at part-load below
                the bivalent point, supplemented by the electric backup
                to reach demand.
              </li>
              <li>
                <strong>Emergency immersion only</strong> — heat pump runs
                alone year-round; backup only used if the heat pump
                fails. Less expensive on capital but customer is colder
                on the coldest days.
              </li>
              <li>
                <strong>Inline electric resistance vs cylinder
                immersion</strong> — inline heats the system flow water
                directly; immersion heats the cylinder only. Different
                wiring and controls; pick the one the design calls for.
              </li>
              <li>
                <strong>Customer brief</strong> — explain that backup may
                run on cold days; bills will rise; this is normal and
                already in the SCOP estimate.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MCS MIS 3005 — Heat Pump Installation Standard (paraphrased)"
            clause={
              <>
                MCS MIS 3005 sets requirements for the design, installation,
                commissioning and handover of heat pump systems. It mandates a
                room-by-room heat-loss calculation per BS EN 12831, an emitter
                schedule sized for the chosen design flow temperature, a SCOP
                estimate disclosed to the customer, eligible product selection
                from the MCS-certified product list, refrigerant work by F-Gas
                certified personnel, electrical work to BS 7671, and a
                commissioning certificate issued through the installer MCS
                umbrella scheme.
              </>
            }
            meaning={
              <>
                MIS 3005 is the heat pump install standard. Customer
                eligibility for the Boiler Upgrade Scheme grant depends on an
                MIS 3005-compliant install. The L3 apprentice on a heat pump
                install works under the MCS-certified installer competence. You
                do not need to memorise the MIS 3005 clause numbers but you
                should recognise it as the document that ties the install
                together — heat-loss calc, emitter sizing, SCOP disclosure,
                product selection, F-Gas refrigerant, BS 7671 electrical,
                commissioning evidence.
              </>
            }
            cite="Source: MCS MIS 3005 (paraphrased from the latest published Issue — full text on the MCS website)."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting COP without SCOP and setting customer expectations on the wrong number"
            whatHappens={
              <>
                Customer is told this heat pump is COP 4. They read that as
                every kWh in produces 4 kWh of heat all winter. In practice
                COP 4 is the manufacturer A7 / W35 number — a mild day on
                low-temperature underfloor. The same unit driving 60 °C
                radiators on a -2 °C frost morning is closer to COP 2.0. The
                customer actual seasonal performance is the SCOP — typically
                3.0 to 3.5 on a properly designed UK retrofit, lower for
                marginal installs. When the bills come in higher than
                expected, the apprentice gets the phone call.
              </>
            }
            doInstead={
              <>
                Always quote SCOP, not COP, when discussing running costs with
                the customer. MCS-certified installations are required to
                provide a SCOP estimate based on the actual building heat loss
                and emitter design. If you do not have SCOP at hand, say COP
                at standard conditions — actual seasonal performance will be
                lower and refer them to the MCS designer for the realistic
                figure.
              </>
            }
          />

          <CommonMistake
            title="Siting an electrical isolator inside the no-ignition-source zone of an R290 outdoor unit"
            whatHappens={
              <>
                R290 (propane) heat pump outdoor unit specifies 1 metre clearance
                from openable windows and 3 metres from ignition sources. The
                electrician fits the local rotary isolator (a switching device
                with potential for arc on operation) inside the 3 metre zone
                because that was the easiest cable run. In normal operation,
                no problem. In a leak scenario (refrigerant pipe failure
                releasing propane), the isolator becomes an ignition risk
                during operation. Under BS EN 378 hydrocarbon handling rules
                this is a non-compliance.
              </>
            }
            doInstead={
              <>
                Read the manufacturer install manual at survey stage to
                identify the no-ignition-source zone for the specific R290
                unit. Site the isolator outside the zone — typically on a wall
                3+ metres from the unit, or inside the building near the
                consumer unit if the cable run allows. Coordinate with the
                MCS designer at design stage so the isolator location is on
                the install drawings and not improvised at install time.
              </>
            }
          />

          <Scenario
            title="Survey day — customer asks 'will it heat my house?'"
            situation={
              <>
                You are assisting on a survey for a 1980s 4-bed detached. The
                customer is replacing a 24 kW gas combi with an ASHP. The
                MCS-certified surveyor is running the heat-loss calc. The
                customer asks you while the surveyor is in the loft 'so will
                this heat pump actually heat my house in winter?'.
              </>
            }
            whatToDo={
              <>
                Honest framing: 'the surveyor is calculating exactly that
                right now. Heat pumps deliver heat at a lower flow temperature
                than your old combi — about 45-50 °C versus 70 °C. To get
                the same room temperature at the lower flow, we may need to
                upsize some of your radiators. The surveyor will identify
                which rooms need new radiators and the SCOP estimate will
                tell you the expected running cost. If your insulation is
                reasonable, a properly sized heat pump will keep your house
                warm through every UK winter on record. If your insulation
                is poor, we may recommend cavity wall and loft top-up before
                the heat pump is sized — fabric first is cheaper and more
                effective than oversizing the heat pump.' Avoid promises
                about specific bills until the SCOP estimate is in.
              </>
            }
            whyItMatters={
              <>
                Customers ask the apprentice on site because the apprentice
                is approachable. A trained, honest answer protects the
                customer relationship and the firm reputation. Avoid the
                marketing line ('heat pumps are amazing'); deliver the
                physics line ('they work; the design has to be right; the
                radiators may need an upgrade'). The MCS designer will
                back the conversation with numbers in a few days.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (RCD additional protection — sockets ≤32 A)"
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
                Wind and micro-hydro installs almost always include local socket-outlets at the
                turbine house or controls cabinet for service work. Those sockets fall under the
                411.3.3 32 A threshold and require RCD protection. The risk-assessment exemption
                only applies outside dwellings.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.3."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Vapour-compression cycle — evaporator, compressor, condenser, expansion valve. The compressor is the only moving part the L3 electrician supplies.",
              "F-Gas Regulations are a hard trade boundary. Refrigerant work by F-Gas certified personnel only. Electrical scope is BS 7671 territory and within L3 scope.",
              "COP at A7 / W35 is the marketing headline; SCOP across the season is the bill. SCOP 3.0-3.5 on radiators, 3.5-4.5 on underfloor is the realistic UK target.",
              "Emitter sizing is critical — heat pumps deliver low-temperature heat, so emitters need to be larger than original gas-boiler radiators for the same room output.",
              "ASHP dominates UK domestic; GSHP rare outside new-build with garden space. R32 and R290 (propane) are current refrigerants; R290 needs careful clearances.",
              "MCS MIS 3005 is the install standard — heat-loss calc, emitter schedule, SCOP estimate, product selection, F-Gas refrigerant, BS 7671 electrical, commissioning certificate.",
              "L3 electrical scope on ASHP — 32-40 A radial Type C, local isolator, controls cabling, immersion heater wiring with 60 °C legionella thermostat, EIC certification.",
              "Annual service required for warranty validity; the legionella weekly 60 °C cycle is non-negotiable for safety.",
            ]}
          />

          <Quiz title="Heat pump system technology deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 MVHR, wind, micro-CHP, biomass overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Wind, hydro, CHP, biomass deeper
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
