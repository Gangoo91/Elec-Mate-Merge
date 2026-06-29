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
      "A two-stage cycle. (1) An electric resistance element heats the refrigerant directly to its boiling point. (2) The hot refrigerant is pumped round the wet system. The electricity does its work in the heating element, which is why the COP can never exceed 1 — the output heat simply equals the electrical input, the same as any electric heater.",
      "Four stages around a closed loop: the evaporator absorbs heat from the source and boils the refrigerant; the electrically-driven compressor pressurises and heats the vapour; the condenser gives that heat up to the wet system; the expansion valve drops the pressure to start again. The electricity does its work in the compressor.",
      "A three-stage cycle where the electricity does its work in the expansion valve. The valve is motor-driven and squeezes the refrigerant to raise its temperature, then the compressor simply circulates it. The condenser and evaporator are passive, so the expansion valve is the only component that draws power.",
      "An open cycle that draws in fresh refrigerant, burns it in the compressor to release heat, and vents the spent gas outdoors. The electricity ignites the refrigerant, and the COP exceeds 1 because the chemical energy of the burnt gas adds to the electrical input. The refrigerant is topped up periodically as it is consumed.",
    ],
    correctIndex: 1,
    explanation:
      "Four stages, one moving part (the compressor) that consumes the electricity. Energy is conserved — heat out of the condenser equals heat in at the evaporator plus the electrical work done by the compressor, and the COP measures how much heat each kWh of electrical work moves. The source is outside air for ASHP, ground brine for GSHP, water for WSHP. The L3 apprentice should be able to point to each stage on a unit diagram and explain what happens. The compressor is the only moving part the electrician supplies — sizing the cable to its rated current is part of the electrical scope. The refrigerant work is F-Gas-certified personnel territory.",
  },
  {
    id: "l3-m2-s3-sub4-cop-vs-scop",
    question:
      "Why does the manufacturer quote COP at A7 / W35 conditions and SCOP across the season — and which one matters more for the customer?",
    options: [
      "COP and SCOP are the same measurement under two different names — manufacturers quote both purely to fill out the data sheet. Either figure can be used for running-cost estimates because they always come out within a few percent of each other, so the customer can take whichever is printed largest.",
      "COP is the figure measured in cold conditions and SCOP the figure measured in mild conditions, so SCOP is always the higher of the two. The customer should be quoted the COP because it represents the worst case, and the SCOP is only used by the manufacturer for marketing.",
      "COP is the heat output in kW and SCOP is the electrical input in kW — dividing one by the other gives the efficiency. The customer needs the COP because it tells them the size of the unit, while SCOP is an internal design figure of no interest to the householder.",
      "COP at A7 / W35 is the headline measured at a mild outdoor 7 °C and a low 35 °C flow — typically 4 to 5. SCOP (seasonal COP) averages performance across the whole UK heating season, including the cold spells when the COP drops, and is the more honest running-cost number. Quote SCOP to customers, not COP.",
    ],
    correctIndex: 3,
    explanation:
      "COP is the headline; SCOP is the bill. Customers told 'COP 4' read it as 'every kWh in produces 4 kWh of heat all winter' — wrong. The COP test point is mild conditions on low-temperature emitters; in real use the unit averages somewhat lower across the season — typically SCOP 3.0 to 3.5 on radiators, 3.5 to 4.5 on underfloor, lower on undersized emitters. MCS-certified installations must provide a SCOP estimate per the actual building heat loss and emitter design. The L3 apprentice should not quote COP without explaining the SCOP context.",
  },
  {
    id: "l3-m2-s3-sub4-emitter",
    question:
      "Why do heat-pump installations prefer underfloor heating or oversized radiators over the existing gas-boiler radiators?",
    options: [
      "Because heat pumps deliver heat at a much higher flow temperature than a gas boiler — typically 80 to 90 °C — and the original radiators cannot withstand that heat. Larger emitters are fitted to spread the higher temperature over more surface area and avoid scorching, not for any efficiency reason.",
      "Heat pumps deliver heat at a lower flow temperature than a gas boiler — typically 35 to 50 °C versus 65 to 75 °C — and the lower the flow temperature the higher the SCOP. Larger emitters deliver the same room output at that lower flow, whereas original boiler radiators forced down to 50 °C deliver too little heat and the SCOP suffers.",
      "Because heat pumps produce much higher water pressure than a boiler and old radiators would burst. Underfloor pipe and oversized radiators are rated for the higher pressure, so they are fitted purely as a safety measure; flow temperature and SCOP play no part in the decision.",
      "Because underfloor heating and large radiators hold more water, and the extra volume lets the heat pump store heat for use during a power cut. The emitter choice is about thermal storage for backup, not efficiency — the original radiators would work fine on flow temperature alone.",
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
      "ASHP draws heat from the attic air, GSHP from the cavity-wall insulation and WSHP from the cold-water mains. ASHP is most common because lofts are warm. GSHP and WSHP are rare because few homes have suitable wall cavities or large enough mains. All three deliver the same SCOP because the source is always indoors.",
      "ASHP takes heat from outside air via a fan-coil outdoor unit — cheapest and most common UK domestic install. GSHP takes heat from the ground via a buried slinky or borehole array — higher SCOP from the stable ground temperature but higher install cost. WSHP takes heat from a pond or river — rare, site-dependent and mostly commercial.",
      "ASHP, GSHP and WSHP differ only in the colour of their casing for the relevant install location; the heat source is outdoor air in all three. WSHP is most common in UK domestic because it is the cheapest, followed by GSHP, with ASHP being the rare and expensive option reserved for large rural properties.",
      "ASHP runs on air pressure, GSHP on a buried gas main and WSHP on the hot-water cylinder. GSHP is most common in UK domestic because most homes have a gas connection to tap into. ASHP and WSHP are niche because they need either a windy site or a swimming pool to work.",
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
      "Modern heat pumps use plain water as the refrigerant because it is cheap, non-toxic and non-flammable. Water freezes in the evaporator, which is why the units have a defrost cycle. Because water is harmless there are no F-Gas or siting restrictions, and any tradesperson can top up the circuit.",
      "Modern heat pumps run on compressed air, not a refrigerant at all — the compressor squeezes ambient air and the heat of compression warms the wet system. There is nothing to leak and no GWP to worry about, so the install has no special clearance or certification requirements.",
      "R32 is the dominant current refrigerant — moderate GWP (~675), F-Gas regulated, mildly flammable (A2L). R290 (propane) is rising fast — very low GWP (~3) but highly flammable (A3), needing specific siting clearances at install. The L3 electrician doesn't handle refrigerant but should recognise the type on the nameplate.",
      "Modern heat pumps all use CO2 (R744) because it has a GWP of 1, and because CO2 is non-flammable there are no siting clearances to observe. R32 and R290 were banned years ago under F-Gas, so the only refrigerant an apprentice will see on a current nameplate is R744.",
    ],
    correctAnswer: 2,
    explanation:
      "R32 dominates today; R290 is the future. F-Gas Regulations are pushing the industry toward natural refrigerants with low GWP. As an apprentice you should recognise the refrigerant from the nameplate and understand that R290 (propane) units need careful siting — windows, vents, ignition sources kept clear per the installation manual.",
  },
  {
    id: 3,
    question:
      "Why is the heat-loss calculation the most important document on a heat pump install?",
    options: [
      "Because it is the document the DNO needs before granting the G99 connection — the heat-loss figure tells the network how much electricity the heat pump will export. Without it the DNO cannot size the connection, so the calc is really a grid-connection document rather than a heating one.",
      "Because it records the refrigerant charge weight, which the F-Gas engineer needs at commissioning. The heat-loss calc is essentially the refrigerant log; its importance is that it keeps the install F-Gas compliant, not that it sizes the heating system.",
      "Because it lists the cable sizes and protective devices the electrician must fit. The heat-loss calc is the electrical schedule under another name, so it matters because it drives the BS 7671 design of the supply, not the heating performance.",
      "The heat-loss calc determines the unit size, the flow temperature, the emitter design and the SCOP estimate — and ultimately whether the customer is warm and the running costs match the quote. Get it wrong and the system either oversizes (cycles inefficiently) or undersizes (cannot meet load on cold days).",
    ],
    correctAnswer: 3,
    explanation:
      "The heat-loss calc is to a heat pump install what the design current is to an electrical install — it sets everything downstream. MCS MIS 3005 mandates a room-by-room heat-loss calculation per BS EN 12831 — fabric-by-fabric U-values, ventilation losses by air-change rate, design outdoor temperature for the location and design indoor temperature per room — yielding the design heat load (kW) that sizes the unit. MCS-certified designers spend hours on it because everything else hangs off the answer. As an apprentice on the install team you should be able to point to the heat-loss summary and recognise that the unit specified, the radiator schedule and the design flow temperature all derive from it.",
  },
  {
    id: 4,
    question:
      "How does an inverter-driven heat pump differ from an older fixed-speed unit, and why does it matter for SCOP?",
    options: [
      "Older fixed-speed units run the compressor full-output or off, short-cycling to match a partial load and stressing the compressor on each start. Inverter-driven units vary the compressor speed continuously to match demand, giving better SCOP, longer compressor life and quieter, more comfortable operation.",
      "An inverter-driven unit converts its output to DC for storage in a battery, while a fixed-speed unit feeds the radiators directly. The SCOP is higher on the inverter unit because the battery lets it run overnight on cheap electricity; the variable speed has nothing to do with it.",
      "An inverter-driven unit is the type that exports surplus electricity to the grid, whereas a fixed-speed unit only consumes power. The SCOP is better on the inverter unit because the export earnings offset the running cost, which is why it is the modern choice.",
      "An inverter-driven unit always runs the compressor flat out and uses the inverter to throttle the water flow instead, while a fixed-speed unit varies the compressor. The SCOP improves because controlling the water is gentler on the system than starting and stopping the compressor.",
    ],
    correctAnswer: 0,
    explanation:
      "Inverter-driven (sometimes called 'modulating') is the modern standard. Variable-speed compressors give better SCOP because they avoid the start-stop losses of older fixed-speed units. The cost premium has fallen and is now standard. Type C MCB or RCBO is needed because of the start-up inrush even on inverter units.",
  },
  {
    id: 5,
    question:
      "What does the MCS designer do with the SCOP estimate and why does the customer need to see it?",
    options: [
      "The MCS designer keeps the SCOP estimate confidential and only shares it with the DNO, because it is used to set the grid-connection limit. The customer never sees it — they are given the headline COP instead, since the SCOP is a technical figure of no use to a householder.",
      "The MCS designer calculates the predicted SCOP from the heat-loss calc, emitter design and flow temperature, and shares it with the customer in writing — alongside an estimated annual kWh and running cost on their tariff. This sets honest expectations and is the basis for the buy-or-not-buy decision; the MCS Code of Practice requires the disclosure.",
      "The MCS designer uses the SCOP estimate purely to choose the cable size, then discards it. The customer needs to see it only because it is printed on the Electrical Installation Certificate, not because it tells them anything about running cost.",
      "The MCS designer treats the SCOP estimate as a marketing figure and inflates it to win the job, so the customer should be told to ignore it. The real running cost is only known after installation, which is why the estimate carries no obligation and is left off the design proposal.",
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
      "The full install end to end — the L3 apprentice is responsible for the refrigerant pipework, the charge weighing and leak test, the wet pipework and radiators, as well as the electrical supply. A heat pump is a single-trade job, so the electrician completes everything including the F-Gas work under the firm's registration.",
      "Only the final connection of the unit's plug to a 13 A socket. The heat pump arrives fully wired internally and simply needs plugging in, so the apprentice's scope is limited to fitting a socket near the outdoor unit; no dedicated circuit, isolation or controls cabling is involved.",
      "The dedicated final circuit (typically 32-40 A radial, Type C for compressor inrush), local weatherproof isolation by the outdoor unit, the controls cabling, immersion-heater and legionella-thermostat wiring, chassis bonding where required, and EIC certification. The refrigerant pipework and charge work are F-Gas territory, outside the L3 scope.",
      "Just the controls wiring — the low-voltage links between the thermostat, zone valves and the indoor controller. The power supply to the unit is the DNO's responsibility because a heat pump connects ahead of the consumer unit, so the apprentice never installs the final circuit or the isolator.",
    ],
    correctAnswer: 2,
    explanation:
      "The electrical scope is well-defined and significant — dedicated supply, isolation, controls, bonding, certification. The controls cabling is often the time-consuming part — multiple zone valves, room thermostats, weather sensors, smart-home integration. The refrigeration trade lands separately and runs the refrigerant work; the plumber lands separately and runs the wet system. Three trades on one install.",
  },
  {
    id: 7,
    question:
      "Why does a heat pump need a Type C MCB or RCBO rather than Type B?",
    options: [
      "Because a Type C device has a higher current rating than a Type B, so it can carry the heat pump's continuous load without overheating. A Type B is limited to 16 A whereas a Type C goes up to 50 A, which is why the larger unit needs the Type C — it is about steady-state capacity, not start-up current.",
      "Because a Type C MCB includes built-in surge protection that a Type B lacks, and the heat pump's electronics need protecting from transients. The letter refers to the surge-rating class, so Type C is fitted to shield the inverter board rather than for any reason to do with motor starting.",
      "Because a Type C is faster-acting than a Type B and disconnects the compressor more quickly under fault, which protects the refrigerant circuit. The heat pump needs the quicker trip to prevent damage to the sealed system, so the choice is about disconnection speed.",
      "Heat-pump compressors draw a high inrush at start-up — typically 5 to 10 times rated current for a few cycles. A Type B MCB trips at 3 to 5 times rated and can nuisance-trip on a healthy install; a Type C trips at 5 to 10 times rated, comfortably clearing the inrush while still preserving fault protection.",
    ],
    correctAnswer: 3,
    explanation:
      "Type C is the standard heat-pump answer. Type B MCBs that nuisance-trip on cold-morning compressor starts produce unhappy customers and emergency call-outs. The MCS-certified designer specifies the protective device on the design pack; the L3 apprentice fits per the design.",
  },
  {
    id: 8,
    question:
      "How does the heat pump deliver hot water and what is the legionella protection requirement?",
    options: [
      "An unvented cylinder (typically 200-300 L) with two heat sources — the heat pump coil (primary, 45-50 °C) and an electric immersion (secondary). The immersion runs periodically, usually weekly, to lift the cylinder to 60 °C for at least 60 minutes for legionella pasteurisation. Its programmable thermostat is the L3 electrician's wiring scope.",
      "A heat pump heats water instantly on demand like a combi boiler, so no cylinder is fitted. Because the water is never stored, legionella cannot grow and no pasteurisation cycle is needed — the absence of stored water removes the risk entirely.",
      "The heat pump keeps the cylinder permanently at 60 °C, which is hot enough that legionella never establishes, so there is no separate weekly cycle. Running the cylinder this hot all the time is the legionella control, and the immersion heater is fitted only as a frost-protection backup.",
      "Hot water comes straight from the heat pump's condenser into the taps with no cylinder and no immersion. Legionella is controlled by a chemical dosing unit plumbed into the supply rather than by temperature, so the apprentice wires the dosing pump instead of any thermostat.",
    ],
    correctAnswer: 0,
    explanation:
      "Hot water is the heat pump's secondary job after space heating. Legionella protection is the safety-critical part — Legionnaires disease is a real risk in tepid stored water — so the 60 °C weekly pasteurisation cycle (per the L8 ACoP under HSWA 1974) is non-negotiable. Some heat pumps run this cycle themselves at high flow temperature without the immersion. Water at 60 °C is hot enough to scald, so anti-scald TMVs are required at outlets per Building Regs Part G. The programmable immersion thermostat is part of the L3 apprentice wiring scope.",
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
