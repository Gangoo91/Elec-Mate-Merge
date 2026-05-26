/**
 * Module 4 · Section 3 · Subsection 2 — Common symptoms of electrical faults
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.2
 *   AC 3.2 — "describe typical types of faults and their likely locations in wiring systems and equipment"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.3 — identify and describe common
 * symptoms of electrical faults.
 *
 * Frame: the customer-language symptoms (flicker, trip, dim, intermittent,
 * smell of burning, warm, no power) translated into engineering categories
 * and likely fault hypotheses. The interview discipline that turns a vague
 * complaint into a focused investigation.
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
  'Common symptoms of electrical faults (3.2) | Level 3 Module 4.3.2 | Elec-Mate';
const DESCRIPTION =
  'Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent — translated into engineering categories and likely fault hypotheses. The interview discipline that turns vague complaints into focused investigations.';

const checks = [
  {
    id: 'mod4-s3-sub2-flicker',
    question:
      "Customer reports 'lights flicker every time the fridge cycles on'. What's the engineering interpretation and the most likely fault?",
    options: [
      "The fridge motor's start-up draws inrush current (typically 6–10× running current). The fridge runs at maybe 1.5 A; inrush is 9–15 A for 100 ms. That sudden current causes a voltage drop along the supply path. If the supply path has higher-than-design impedance — undersized cable, HRJ at a termination, oversized circuit relative to cable — the voltage drop is large enough to dim the lights momentarily. Most likely cause on older installations: HRJ at the consumer-unit incoming tail or the meter tails. On newer installations: undersized cable for the load. Diagnosis: clamp meter on the incoming tail during fridge cycle reveals the voltage drop magnitude; thermal imaging finds the HRJ.",
      "Annual service is the standard, with weekly to monthly customer-side tasks. Annual: full strip-down clean, ash compartment service, auger inspection, igniter check, fan check, flue inspection, controls firmware update, performance check. Monthly customer task: empty ash pan. Weekly customer task: top up pellet hopper, check fuel feed, visual check for blockages. Pellet quality matters — high-ash or wet pellets shorten component life. Some boilers need flue cleaning more frequently than annual; chimney sweep is a specialist trade.",
      "Give as much advance notice as possible of the day's plan, the week's plan and any expected changes. Provide written or visual schedules where possible. When changes are unavoidable, explain the reason calmly and give the apprentice a moment to adjust. Provide clear, unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft'). Avoid unwritten rules and 'common sense' assumptions. Many autistic workers thrive on predictability and clear structure — giving that structure costs nothing and improves performance.",
      "WAHR 2005 Reg 12 requires a tower used for working at height to be inspected before use after assembly, after any event likely to have affected it (high winds, impact, alteration), and at intervals not exceeding 7 days. The pre-use check covers stability (level base, outriggers deployed, brakes on), structural integrity (no missing components, all connectors locked), platform fully boarded with guardrails and toeboards, and a current inspection record (Form 91 / scaff tag). The user does the daily check; a more thorough inspection is by a competent person.",
    ],
    correctIndex: 0,
    explanation:
      "Flicker on a known load cycling is one of the diagnostic gold-standards — it tells you the fault is on the supply side of the lighting circuit (otherwise the load on a separate circuit wouldn't affect the lighting). The voltage drop magnitude scales with the impedance times the inrush current; an HRJ at the supply tails is the classic cause.",
  },
  {
    id: 'mod4-s3-sub2-burning',
    question:
      "Customer reports 'smell of burning plastic, can't find the source'. What's the L3 response?",
    options: [
      "Prefabrication off-site (e.g. pre-terminating SWA tails to length, pre-building consumer units, pre-assembling cable trays in a workshop) reduces on-site cuts and offcuts. Off-site cutting can be measured precisely; on-site cuts under time pressure tend to leave more wastage. Less waste = lower material cost = smaller skip = less environmental impact. Relevant to environmental tech because: (a) the customer is by definition committed to sustainability so resource-efficient installation matches their values; (b) the trade is increasingly held to evidence-based environmental claims; (c) it's a 2357 Unit 312 AC 2.1 explicit requirement. Plus prefabrication gives faster on-site install times.",
      "Ask her what helps — she'll know better than you. Common adjustments include extra time on written assessments, the option of a verbal or practical demonstration assessment instead of (or alongside) written, the briefing material provided in advance with key terms highlighted, audio versions where available, a large clear font and a coloured background overlay for some readers. Confirm with the assessor that the adjustment is in place. Equality Act 2010 s.20 puts the duty on the employer (and the assessing centre) to make reasonable adjustments where a provision, criterion or practice puts a disabled person at a substantial disadvantage.",
      "Compliance-only — the firm does the work, issues the certificate, files the documentation, meets the regulations, repeats. Learning organisation — the firm does all of that PLUS captures lessons from each job (what worked, what didn't, what to change), feeds them back into training and procedure, and improves over time. The difference shows up in fault recurrence rates (learning firms have fewer comebacks), in apprentice progression speed (learning firms develop competence faster), in customer satisfaction (learning firms build patterns that customers come to trust). The L3 apprentice's job is to support the learning side — bring observations from visits back to the office, contribute to toolbox talks, suggest procedure improvements. Most firms aspire to be learning organisations; the apprentice's input is part of how they become one.",
      "Treat as immediate hazard. Burning plastic smell from electrical sources almost always indicates an HRJ that's already heating to char-point on the surrounding insulation. Steps: (1) Ask customer to identify the location range — which floor, which area, when did it start. (2) Isolate at the main switch if the source is unlocated — removes the heat source while you investigate. (3) Open every consumer unit, junction box and accessory in the affected area for visual inspection. (4) Use a thermal camera (Sub 2.3) on accessible enclosures during normal operation if the smell isn't immediate (but only with the customer's informed consent — there's a fire risk in the meantime). (5) Customer brief: this is a Code 1 (Danger Present) issue — work doesn't pause for a coffee.",
    ],
    correctIndex: 3,
    explanation:
      "Burning plastic smell is the alarm bell of HRJ progression. By the time the smell is noticeable, charring is happening — the fire-risk window is open. The HSE / fire investigators repeatedly find scenarios where customers reported burning smells for days or weeks before the actual fire. Treating it as urgent is the L3 expectation.",
  },
  {
    id: 'mod4-s3-sub2-interview',
    question:
      "What's the structured interview an L3 apprentice should run with a customer reporting an unspecified electrical problem?",
    options: [
      "Five categories. (1) THE DUTY HOLDER — the customer for domestic, the employer for commercial, the landlord for rented. They get the certificate and the verbal hand-back. (2) THE ORIGINAL DESIGNER if it's their installation and a design change has been made (informational courtesy). (3) BUILDING CONTROL via the competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA) for notifiable work under Part P in England / Wales (slightly different in Scotland and Northern Ireland). (4) THE FIRM's INTERNAL JOB SYSTEM — job sheet update, photos, certificate copy filed. (5) THE NEXT PERIODIC INSPECTOR — implicit, served by leaving the certificate bundle (EICR + Schedule of Remedial Works + MWC) on file with the Duty Holder.",
      "Circuits supplying heating units shall have additional protection by the use of RCDs in accordance with the characteristics specified in Regulation 415.1.1. Where a resistive fault may cause a fire, for example for overhead heating with heating film elements, the rated residual operating current shall not exceed 30 mA. All underfloor heating installations shall have additional protection by an RCD rated at 30 mA irrespective of location. In areas where occupants are not expected to be completely wet, a circuit supplying heating equipment of Class II construction (or equivalent insulation) shall be provided with additional protection by the use of an RCD with a rated residual operating current not exceeding 30 mA.",
      "Older fixed-speed heat pumps run the compressor at full output or off — short-cycling repeatedly to match a partial load. Each start consumes electricity and stresses the compressor. Modern inverter-driven units vary the compressor speed continuously to match the actual heat demand — running at 30 to 100 percent capacity smoothly. The result is better SCOP (less wasted starting energy), longer compressor life, quieter operation and more comfortable indoor temperatures. Almost every new domestic ASHP sold in the UK is inverter-driven. The L3 electrician sizes the supply to the rated nameplate current (the compressor at full speed); the variable-speed control is internal to the unit.",
      "Six questions in order. (1) WHAT exactly happens? (in customer's own words). (2) WHEN does it happen — time of day, day of week, season, weather, after specific activity? (3) WHERE in the property — single room, multiple rooms, only when specific accessories used? (4) HOW LONG has it been happening — first noticed when, getting worse / better / same? (5) WHAT have you tried — reset breakers, unplug appliances, anything else? (6) WHAT CHANGED recently — new appliance, building work, leak, anything? The answers narrow the fault hypothesis from infinity to a small set. Most apprentices skip the interview; the senior who built habits saves an hour per call-out by spending 5 minutes on it.",
    ],
    correctIndex: 3,
    explanation:
      "The structured customer interview is the single most under-used L3 fault-diagnosis tool. The information that turns a vague complaint into a focused investigation is in the customer's head; the interview extracts it. Trade firms with fast turnaround (Pimlico, Aspect, MyBuilder pros) all use structured interviews — saves the apprentice from chasing the wrong fault hypothesis.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Customer reports 'breaker keeps tripping when I plug in the kettle'. What's the differential diagnosis?",
    options: [
      "Load management is doing its job. The CT clamp on the main supply detects the rising property total when the heat pump enters defrost cycle or fast-heat mode (drawing 3-7 kW) and the charger throttles its own draw to keep the total below the configured limit (typically the main-fuse rating). This is the design intent — better to throttle the charger temporarily than to trip the cut-out. The customer should be briefed on this at handover so the slowdown is not interpreted as a fault.",
      "Three hypotheses to test in order. (1) Kettle is the fault — try a different kettle on the same socket, or the same kettle on a different circuit. If only this kettle on this socket trips, kettle is suspect. (2) Socket has a fault — IR test the socket with kettle disconnected; loose wiring causing earth leakage during high-current draw. (3) Circuit is overloaded — measure existing load on the circuit before plugging in (clamp meter), confirm kettle adds enough current to exceed breaker rating. Most likely on older installations: HRJ at the socket terminal, exposed under high inrush current. Diagnose with thermal imaging during a controlled kettle test.",
      "Tariff arbitrage. The system controller can charge the battery from the grid during the cheap window and discharge during the expensive window, regardless of solar. On a tariff with a 25-30 p/kWh spread between cheap and expensive rates, the arbitrage saves a few hundred pounds a year on top of the solar self-consumption benefit. Over a 10-15 year battery life this can roughly double the system's lifetime value compared to solar self-consumption alone. The G98/G99 notification covers grid charging if the system can also export.",
      "PQ analyser (Fluke 1748, Megger PQM, Dranetz HDPQ) is a long-term monitoring instrument — connect it at the supply or DB for a few days / weeks, it logs voltage, current, harmonic spectrum, transient events, sags / swells / interruptions, frequency, power factor, flicker. The multimeter shows you NOW; the PQ analyser shows you the past 7 days. Essential for diagnosing intermittent faults on commercial installations where the symptom only appears occasionally — the PQ log captures the moment of the fault and the conditions around it.",
    ],
    correctAnswer: 1,
    explanation:
      "Differential diagnosis — listing the possibilities and testing each — is the L3 method. Three hypotheses cover most cases (load fault, socket fault, circuit fault); the customer's other answers narrow which is most likely. Kettle inrush is high (9–13 A peak for a 3 kW kettle) and exposes any HRJ on the socket / cable run.",
  },
  {
    id: 2,
    question: "Customer reports 'the upstairs lights are dim, the downstairs lights are normal'. Engineering interpretation?",
    options: [
      "Apprenticeship standards (gov.uk) require evidence of at least 20% of the apprenticeship being off-the-job training. The log records day-release at college, online courses, structured study time, shadowing in unfamiliar areas, and any other learning activity outside normal productive work. Without it, the apprenticeship may not meet the standards required for the End-Point Assessment to be funded and certified.",
      "Generators (PV, wind, micro-CHP) put energy into the system that wasn't there before from the user's point of view. Demand-reduction tech (LED lighting, smart controls, MVHR, insulation) makes the existing energy do more useful work. From a carbon perspective the cheapest watt is the one you don't use — demand reduction usually has a shorter payback than generation. From a Building Regs perspective both count toward Part L compliance via the SAP / SBEM calculation.",
      "Voltage drop on the upstairs lighting circuit, OR a problem at the upstairs lighting tap-off. Most likely causes: (1) HRJ at a junction box upstream of the upstairs lights, (2) loose terminal at the lighting RCBO, (3) high-resistance neutral on the upstairs circuit (broken or partially connected), (4) under-sized cable retrofit (someone replaced cable with smaller cross-section). Test: measure voltage at an upstairs lampholder under normal load; compare to nominal 230 V. If significantly low (&lt;220 V), trace upstream for the HRJ. Thermal imaging at the suspected location.",
      "Safeguarding. Children are present during term time, which restricts when work can be done, requires DBS-checked operatives for any work where unsupervised contact with pupils is foreseeable, and adds rules around photography, conversation and movement around the building. Most major electrical work in schools is done during holidays for exactly this reason. The school's safeguarding lead is a key contact during prep.",
    ],
    correctAnswer: 2,
    explanation:
      "Localised dim lighting is voltage drop on the affected circuit. The L3 differential narrows quickly: if downstairs is fine, the issue is upstream of the upstairs tap-off but downstream of the supply common point. A few targeted voltage measurements pinpoint the HRJ location.",
  },
  {
    id: 3,
    question: "Customer reports 'fire alarm panel showing 'EARTH FAULT' on the LCD'. What does this mean and what's the L3 action?",
    options: [
      "Both are batteries under the Waste Batteries and Accumulators Regulations 2009 — separate stream from WEEE, separate Take-Back Scheme via wholesalers and battery distributors. Lead-acid (older emergency lighting, alarm panels) — non-spillable but contains lead and sulphuric acid; route via the wholesaler battery bin or a licensed battery recycler. Lithium-ion (newer fittings, including some LED emergency packs) — fire risk if punctured, short-circuited or thermally abused; tape the terminals, transport in a non-conductive container, never bin. Both routes are free at the wholesaler; both are legal requirements.",
      "PEOPLE: earth fault that's NOT cleared by a protective device — the operator touches metalwork that has risen to phase voltage, current flows through them to earth. Direct cause of most electrical shock fatalities. PROPERTY: high-resistance joint (HRJ) — generates I²R heat under load, ignites surrounding combustibles. Direct cause of most electrical fires. The two top fault categories on the HSE / Fire & Rescue statistics. RCD protects against the people-harm fault; AFDD + thermal monitoring protect against the property-harm fault. Both are required for full protection.",
      "Work at Height Regulations 2005 apply. (1) Risk assessment includes the height work specifically — fall distance, type of platform (ladder / step / platform / scaffold), duration. (2) Working platform: ladder for short-duration access tasks (under 30 minutes per task), platform for longer / heavier work. (3) Securing the ladder — stabiliser, person footing, anti-slip feet, 1:4 angle, three points of contact. (4) Tools secured against falling onto people below. (5) Loft work — board out the loft hatch and a working area; do not stand on plasterboard. (6) Single-operative restriction — solo work at height carries higher risk and the firm's lone-working procedure may bar it. WaHR 2005 is enforced by the HSE alongside EAWR — both apply simultaneously.",
      "Fire alarm panels under BS 5839-1 monitor the system for earth faults on the detection / sounder circuits. An EARTH FAULT indication means there's a connection (typically high-resistance) between one of the system conductors and earth — could be water ingress at a detector / sounder, damaged cable, contaminated terminal. The fault doesn't immediately stop the alarm working but it compromises the system's ability to operate reliably and may mask other faults. L3 action: (1) Document the fault on the fire log book. (2) Isolate the affected zone (panel will let you do this) so you can investigate. (3) IR test each loop / circuit on the affected zone. (4) Find and rectify; retest; restore. (5) Inform the customer's responsible person under RR(FS)O 2005.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm earth faults are a regulated category — BS 5839-1 + RR(FS)O 2005 require documented investigation and rectification within defined timescales. The L3 apprentice does the investigation under supervision (specialist fire-alarm engineer typically leads); the apprentice's role is correct fault identification + documentation.",
  },
  {
    id: 4,
    question: "Customer reports 'the socket in the bathroom feels warm, even when nothing's plugged in'. What does this tell you?",
    options: [
      "The socket has an active heat source — even unplugged, current is flowing somewhere within the socket itself. Most likely causes: (1) HRJ at the L or N terminal under load (any other socket on the same ring is loaded; current passes through this socket as a transit point on the ring). (2) Insulation breakdown between L and N or L and CPC inside the socket — small leakage current dissipating heat. (3) Failing component (some sockets have surge protection or USB charging modules that can fail and draw quiescent current). Action: isolate the circuit at the breaker, prove dead, IR test the socket (between L–N, L–E, N–E with the socket disconnected from the cable). If IR is poor, replace socket. If IR is good, problem is upstream — trace back along the ring.",
      "Because under the Environmental Permitting Regulations and the Waste (England and Wales) Regulations any business that transports waste it has produced from a customer site to a disposal point is carrying controlled waste and requires a waste carrier registration. Lower-tier registration (for businesses carrying only their own waste) is free and renewable; upper-tier (for businesses carrying other parties waste, or carrying construction and demolition waste from third parties) carries a fee. Failure to register is a criminal offence.",
      "A protective device opens a fault circuit by interrupting fault current. The breaking capacity (Icn) is the maximum current the device can safely interrupt without damage to the device or risk of the fault current continuing across the device contacts. If the actual fault current (PFC) exceeds Icn, the device may fail to clear the fault — contacts may weld together, the device case may rupture, the fault may persist. For a typical Type B 32 A MCB the Icn is typically 6 kA; for a CU the busbar Icn is typically 16 kA. Both must exceed the PFC at their installation point.",
      "Water ingress at an outdoor accessory. The water creates a high-resistance path between live and earth (or live and live); when the leakage current accumulated across the protected circuits exceeds 30 mA, the RCD trips. Most common locations: outdoor sockets (Wylex / MK / BG outdoor sockets), security lighting (with damaged grommets), garden outbuilding lighting, EV charger (if not properly weather-sealed). Diagnostic approach: with the customer's permission, simulate rain (garden hose at gentle setting) on each outdoor accessory while monitoring RCD; the accessory that triggers the trip is the leak point. Alternative: thermal camera shows wet seams on accessories.",
    ],
    correctAnswer: 0,
    explanation:
      "A socket warm to touch with no load plugged in means current is flowing inside the socket. On a ring final, the socket carries transit current for downstream loads — an HRJ at one terminal heats up under that transit load. Bathroom moisture can accelerate the problem but isn't usually the root cause; the HRJ is.",
  },
  {
    id: 5,
    question: "Customer reports 'every Tuesday morning around 7am the broadband router restarts'. How do you investigate?",
    options: [
      "Because Future Homes Standard requires very low fabric U-values, very low air permeability, and Part F controlled ventilation. At those airtightness levels the building cannot rely on infiltration for air change — it needs deliberate mechanical ventilation. MVHR provides that mechanical ventilation while recovering 80-90% of the heat. SAP credits MVHR with significant carbon savings in airtight new-build, contributing materially to the Part L target rate. Fitting MEV (mechanical extract ventilation only, no recovery) instead loses the recovery benefit and harms the SAP score.",
      "Time-correlated faults are usually caused by something that operates at that time. Tuesday 7am suggests a domestic schedule (heating timer, immersion timer, washing machine cycle). Investigation: (1) Check the heating system schedule — does the boiler / immersion fire at 7am Tuesday? (2) Check washing machine / dishwasher timer. (3) Check any external supply (street lighting nearby, Tuesday morning industrial start-up). (4) Install a power-quality analyser (Sub 2.3) for a week to capture the voltage / current at 7am Tuesday and correlate. The router restart is a symptom of a brief over-voltage or under-voltage; the source is whatever's switching on at that time. Most common cause: immersion timer firing into a marginal supply, voltage dipping briefly, router below its tolerance threshold.",
      "L–L (phase-to-phase) fault is a direct connection between two phases of a three-phase supply (e.g. L1 and L2). Continuity between the phases reads near zero. Fault current is high (limited only by supply + cable impedance) — typically 5–10 kA on a typical commercial supply. Operates the magnetic element of the protective device on at least one of the affected phases. The unaffected phase remains live; loads connected line-to-neutral on the unaffected phase continue working. Common cause: insulation breakdown in three-phase cable or motor windings, accidental contact between phases at a terminal block.",
      "Fit a 10 mm&sup2; (typical for TT or where main earth is not 16 mm&sup2;) or 16 mm&sup2; (for TN-S / TN-C-S where main earth is 16 mm&sup2;) green/yellow protective bonding conductor between the MET (Main Earthing Terminal) at the consumer unit and the gas service pipe within 600 mm of the gas meter on the consumer's side, after the meter and before any branch (BS 7671 411.3.1.2). Use a BS 951 earthing clamp on the gas pipe with the appropriate label ('Safety Electrical Connection — Do Not Remove'). Verify continuity with the MFT — measured resistance from the MET to the bonded clamp should be under 0.05 &Omega; for a sound bonding cable. CERTIFICATE: Minor Works for the bonding work + Schedule of Remedial Works closing the C2. Inform the gas installer (Gas Safe registered) if the gas supplier needs to be aware of the change.",
    ],
    correctAnswer: 1,
    explanation:
      "Time-correlated faults are the easiest intermittents to diagnose because the time is the clue. The 'router restarts' symptom is consumer-grade (modern routers reboot on transient under-voltage); the cause is something else operating at the same time. The PQ analyser captures the moment; correlation with household schedule identifies the source.",
  },
  {
    id: 6,
    question: "Customer reports 'half the house has no power, the other half is fine'. What does this tell you about the fault location?",
    options: [
      "ATEX zones (Zone 0 / 1 / 2 for gas, Zone 20 / 21 / 22 for dust) require all equipment in the zone — including test instruments — to be ATEX-rated for the zone. Standard kit: intrinsically-safe two-pole tester (Martindale VI-15800 or Megger DET14C with Ex marking), no mobile phones in zone, no battery tools without Ex rating, no smoking, no metal tools that could spark on contact with steel. The fault diagnosis approach is — bring everything to a non-zoned area where possible, isolate at the boundary, only work in-zone with intrinsically-safe instruments and a hot-work permit.",
      "On a monoblock unit the entire refrigerant circuit is contained inside the outdoor unit and only water pipes enter the building. The flammable-refrigerant indoor minimum-room-volume rule (under BS EN 378 and the F-Gas / refrigerant safety standards) only applies where flammable refrigerant is present in occupied indoor space. Splits that route refrigerant pipes indoors do trigger the rule and require detailed room-volume calculations.",
      "The fault is at a point that splits the supply — typically the consumer unit busbar, an MCB / RCBO, or a sub-circuit. If the divide is between RCD-protected zones (e.g. all RCD1 circuits dead, all RCD2 fine), the issue is RCD1 or its busbar. If the divide is between separate buildings on the same supply (main house OK, garage out), the issue is the garage feed. The fault is at the upstream side of the affected portion. Investigation: identify the boundary of dead vs live circuits; trace upstream from the boundary; the fault is at the point where dead becomes live.",
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
    ],
    correctAnswer: 2,
    explanation:
      "Localised power loss reveals the fault location by the boundary it creates. The boundary tells you which protective device or distribution point has failed. Standard L3 method: map the dead zone, trace upstream, find the point where supply is restored, the fault is at that boundary point.",
  },
  {
    id: 7,
    question: "Customer reports 'when I turn on the shower, the lights upstairs flicker briefly then settle'. What's the engineering interpretation?",
    options: [
      "Three locations. (1) SWA gland terminations — the brass gland's earth path through the armour to the gland body is critical and often poorly made (insufficient compression on the armour, missing earth tag, paint between gland and box). Causes intermittent earth faults. (2) Compound seal at gland — over years the seal hardens / shrinks, water ingress to the cable cores. (3) The cable run itself only when physically damaged (forklift impact, settlement, vermin). Brand patterns: CMP industrial glands and Pratley sealing compound are the trade standard; cheap gland kits (Vinco, generic OEM) often fail at the earth-tag connection.",
      "G98 is post-notification — install, commission, notify within 28 days. The whole transaction completes inside 28 days from commissioning. G99 is pre-application — submit the application before commissioning, wait for the DNO to model the network, receive a Connection Offer, accept the Offer (which may contain export limits or fault-level conditions), then commission. Typical G99 timeline is 4-12 weeks for a domestic system; longer for commercial. On a fast-moving install programme the G99 paperwork is usually the long pole — start it early.",
      "IT (Isolated Terra) — neutral isolated from earth (or connected via high impedance). Single earth fault doesn't cause significant fault current; alarm only. Typically used in continuous-process industries (chemical plants, hospitals), where one fault must not stop the process. TN-S (Terra Neutral Separated) — neutral and earth separately distributed from transformer; standard UK domestic / commercial older arrangement; faults clear normally via overcurrent / RCD. The L3 apprentice rarely meets IT outside specialist sites; if you're diagnosing in a hospital ITU or specialist process plant, the supply may be IT and the fault behaviour is fundamentally different.",
      "Inrush current from the shower heater (typically 35–50 A for an 8.5 kW shower) causes voltage drop on the supply path. The lighting circuit branches off the same supply. The brief drop dims the lights for the duration of the inrush (typically 100–500 ms for the heater to reach steady state). If the inrush voltage drop is significant (&gt;5% of nominal), it suggests high impedance on the supply path — possibly a shared neutral, undersized supply tail, or HRJ at the consumer unit. If it's small (&lt;2%), it's normal behaviour. Diagnosis: clamp meter on the supply tail during shower start; voltage measurement at upstairs lighting at the same moment. Compare to BS 7671 Appendix 4 voltage-drop limits.",
    ],
    correctAnswer: 3,
    explanation:
      "Brief flicker on high-load inrush is sometimes normal (small voltage drop) and sometimes a symptom (large voltage drop). The diagnostic is whether the magnitude of the drop is normal for the installation — comparison against BS 7671 Appendix 4 limits (3% lighting, 5% other) tells you whether to investigate further.",
  },
  {
    id: 8,
    question: "Customer reports 'the RCD trips when it rains heavily but not when it's dry'. What's the most likely fault?",
    options: [
      "Water ingress at an outdoor accessory. The water creates a high-resistance path between live and earth (or live and live); when the leakage current accumulated across the protected circuits exceeds 30 mA, the RCD trips. Most common locations: outdoor sockets (Wylex / MK / BG outdoor sockets), security lighting (with damaged grommets), garden outbuilding lighting, EV charger (if not properly weather-sealed). Diagnostic approach: with the customer's permission, simulate rain (garden hose at gentle setting) on each outdoor accessory while monitoring RCD; the accessory that triggers the trip is the leak point. Alternative: thermal camera shows wet seams on accessories.",
      "FAIL — well above the BS 7671 Table 41.3 maximum of 1.37 Ω for B32 at 0.4 s disconnection. The protective device cannot guarantee disconnection within the required time. Action: (1) Verify the reading. (2) Check supply Ze first — is the high Zs caused by high origin Ze (possible PEN issue) or by added impedance on the circuit (HRJ, undersized cable)? (3) Make safe — isolate the affected circuit. (4) Investigate and rectify. (5) Document as Code 1 if safety is at imminent risk; Code 2 if safety is compromised but not immediately dangerous.",
      "Significant. Many faults recur because the customer's behaviour caused or contributed to them — overloaded extensions, plug-in heaters on lighting circuits, kettle + microwave + toaster simultaneously. Educating the customer on the actual cause AND how to avoid recurrence is part of preventing the comeback. Format: brief verbal explanation during the work + written summary in the job sheet that the customer signs at completion. 'Your circuit is rated for X amps; running these appliances together exceeds that; consider running them sequentially OR add a dedicated circuit'. The customer's informed cooperation prevents 60–80% of behaviour-related comebacks.",
      "IEC 62446-1 is the international standard for grid-connected PV system documentation, commissioning tests and inspection. It defines the test procedure for PV strings: Voc, Isc, polarity, insulation resistance, with pass/fail thresholds. MCS MGD 003 is the UK MCS-flavoured equivalent — it adopts the IEC 62446-1 method and adds UK-specific requirements (MCS-eligible product list, installer competence, customer pack contents). Modern multifunction PV test instruments are calibrated against IEC 62446-1; the resulting test record satisfies both IEC and MCS requirements. The L3 apprentice on a PV install will use a test instrument that automates the IEC 62446-1 sequence.",
    ],
    correctAnswer: 0,
    explanation:
      "Weather-correlated faults are caused by environmental conditions affecting the installation. Rain triggers earth-leakage on damaged outdoor accessories. The investigation pattern is — when does it happen, what's different at that time, simulate the condition to reproduce and locate. A garden hose simulation is a legitimate L3 diagnostic technique on outdoor accessories.",
  },
];

const faqs = [
  {
    question: "How do I tell when a customer's symptom description is unreliable?",
    answer:
      "When the timeline is vague ('it's been a while'), the description is technical-sounding but inconsistent ('the polarity reversed itself'), or there's a clear emotional bias ('the previous electrician put it in wrong'). Treat all customer descriptions as starting hypotheses, not facts. Verify with measurement. Customers describe symptoms accurately about 70% of the time; the other 30% they misremember, exaggerate, or mis-attribute. The structured interview pulls out the verifiable facts — when, what, how often — that you can test against.",
  },
  {
    question: "Should I trust customer descriptions of intermittent faults?",
    answer:
      "Yes, for the timing pattern. Customers are usually correct about WHEN something happened ('every morning', 'after the storm', 'when I run the washing machine') even if they're wrong about what happened. Time-pattern is gold for diagnosing intermittents — it gives you the trigger to investigate. Use a power quality analyser (Sub 2.3) to capture the actual electrical conditions at the reported time; correlate with the customer's schedule.",
  },
  {
    question: "What should I do if the customer can't reproduce the fault while I'm there?",
    answer:
      "Document the customer's description on the job sheet, run a baseline test of the affected circuits (continuity, IR, EFLI), look for evidence of past faults (scorched terminals, signs of arcing, replaced fuses), recommend either a return visit when the symptom recurs OR installation of a power-quality analyser to log conditions over a week. Don't pretend to find a fault that isn't there; don't dismiss the customer's report. Most intermittent faults need data over time to characterise.",
  },
  {
    question: "How do I deal with customers who describe symptoms in panic / dramatic terms?",
    answer:
      "Calm, structured interview. 'Tell me exactly what happened — start from the beginning'. Let them tell the full story without interruption first. Then go back through with structured questions — what exactly, when, how often. Acknowledge their concern without dismissing or amplifying. The factual content is usually within the dramatic narrative; you extract it through patient listening + targeted follow-up.",
  },
  {
    question: "What's the most common 'symptom' that turns out to NOT be an electrical fault?",
    answer:
      "'The lights flicker' — about half the time it's actually an LED driver / lamp incompatibility (cheap LED bulb in a dimmable fitting, dimmer not rated for LEDs, mismatched bulbs in the same fitting) rather than a wiring fault. Standard diagnostic: substitute known-good lamps; if flicker stops, it's the original lamp / driver. Other common false alarms: 'the breaker keeps tripping' (sometimes user has an overloaded extension lead pattern, not a circuit fault); 'the socket isn't working' (sometimes a tripped GFCI on a different floor that the customer doesn't know about).",
  },
  {
    question: "How do I document my customer interview for the job sheet?",
    answer:
      "Standard fault-diagnosis job sheet template includes a 'Symptoms' section: customer's words (in quotes), timeline, conditions, what they've tried. A 'Diagnosis' section: tests run, findings, identified fault category and location. A 'Rectification' section: action taken. A 'Verification' section: post-repair tests. The interview goes in 'Symptoms'; the test results in 'Diagnosis'. The structured format protects the customer (clear record of what was reported and done) and the firm (defensible record if disputed).",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 2"
            title="Common symptoms of electrical faults"
            description="Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent — translated into engineering categories and likely fault hypotheses. The structured customer interview that turns a vague complaint into a focused investigation."
            tone="emerald"
          />

          <TLDR
            points={[
              "Customer symptoms are starting hypotheses, not facts. Structured interview (what / when / where / how long / what tried / what changed) extracts the verifiable details.",
              "Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. Power quality analyser captures the electrical conditions at the reported moment.",
              "Burning plastic smell is always urgent — HRJ progressing to char point, fire-risk window open. Treat as Code 1.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Translate customer-language symptoms (flicker, trip, dim, warm, smell, intermittent) into engineering fault hypotheses.",
              "Conduct a structured customer interview using the six-question framework — what, when, where, how long, what tried, what changed.",
              "Recognise time-correlated, weather-correlated and load-correlated fault patterns and use the correlation to identify the cause.",
              "Treat 'smell of burning plastic' as a Code 1 immediate-hazard report and respond accordingly.",
              "Distinguish symptoms that are likely electrical faults from symptoms that are usually false alarms (LED flicker from cheap lamps, etc.).",
              "Document customer interviews in the standard fault-diagnosis job sheet format.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The structured customer interview</ContentEyebrow>

          <ConceptBlock
            title="Six questions that turn vague complaints into focused investigations"
            plainEnglish="The customer holds the diagnostic information in their head. The interview extracts it. Most apprentices skip this step and waste time chasing the wrong fault hypothesis. The senior who built the habit saves an hour per call-out."
          >
            <p>The six questions in order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT exactly happens?</strong> In customer's own words. Don\'t paraphrase or interpret yet.</li>
              <li><strong>WHEN does it happen?</strong> Time of day, day of week, season, weather, after specific activity.</li>
              <li><strong>WHERE in the property?</strong> Single room, multiple rooms, only when specific accessories used.</li>
              <li><strong>HOW LONG has it been happening?</strong> First noticed when, getting worse / better / same.</li>
              <li><strong>WHAT have you tried?</strong> Reset breakers, unplug appliances, switched off / on, called a previous electrician.</li>
              <li><strong>WHAT CHANGED recently?</strong> New appliance, building work, leak, anything in the last weeks / months.</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic="Fault finding and how to describe a fault · Unit 303 AC 3.2"
            caption={<>Craig Wiltshire walks through how to describe a fault for an NVQ assessment — the same structured language that turns a customer's vague symptom into an engineering hypothesis. Watch how the symptom (flicker, trip, smell) is named, then the hypothesis is stated, then the test is chosen.</>}
          />

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — fault diagnosis principles (paraphrased framework)"
            clause={<>Paraphrased framework summary: diagnosis of faults takes a systematic approach — start from the reported symptoms, work through inspection of the system, instrument verification, and only then formulate an action plan. Premature action without diagnosis risks harm to operative, customer and equipment.</>}
            meaning={<>The systematic approach starts with the symptom — the customer interview. Without the symptom information, the investigation has no anchor and is likely to chase the wrong hypothesis. The interview is the first step in the procedure, not an optional preamble.</>}
            cite="Source: IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework, paraphrased."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The common symptom catalogue</ContentEyebrow>

          <ConceptBlock
            title="Customer language vs engineering interpretation"
            onSite="Each common symptom maps to a small set of engineering hypotheses. The customer\'s other answers (when, where, what changed) narrow which hypothesis is most likely."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>\'Lights flicker when X starts'</strong> — voltage drop on supply path during X's inrush; HRJ on supply tails or undersized supply cable.</li>
              <li><strong>\'Smell of burning plastic'</strong> — HRJ at char point; fire-risk; immediate isolation + investigation.</li>
              <li><strong>'Socket warm to touch (no load)'</strong> — HRJ at socket terminal carrying transit current on a ring; isolate, IR test, replace if poor.</li>
              <li><strong>'Half the house has no power'</strong> — fault at boundary; trace upstream from boundary to find protective device / distribution point.</li>
              <li><strong>'Breaker trips when I plug in X'</strong> — load fault, socket fault, or circuit fault; differential diagnosis on each.</li>
              <li><strong>'RCD trips when it rains'</strong> — water ingress at outdoor accessory; simulate with hose to localise.</li>
              <li><strong>'Lights dim only upstairs'</strong> — voltage drop on upstairs circuit; HRJ on tap-off or sub-main.</li>
              <li><strong>'Fault every Tuesday at 7am'</strong> — time-correlated; identify what runs at that time; PQ analyser captures the moment.</li>
              <li><strong>'Lights flicker constantly'</strong> — usually LED driver / lamp incompatibility; substitute known-good lamps first.</li>
              <li><strong>'Tingles when I touch the tap'</strong> — open PEN or compromised main bonding; STOP, check N–E voltage at cut-out; possible DNO call.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Time-, weather- and load-correlated faults</ContentEyebrow>

          <ConceptBlock
            title="Correlation reveals causation"
            plainEnglish="Intermittent faults that correlate with time, weather or load have a trigger that's visible in the correlation. Use the correlation to find the trigger; the trigger leads to the cause."
          >
            <p>Three correlation patterns and their typical causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time-correlated</strong> — domestic schedules (heating timer, immersion timer, washing cycle), neighbour activity (street lighting switch-on, industrial start-up), weather (overnight cooling causing condensation).</li>
              <li><strong>Weather-correlated</strong> — water ingress (rain → outdoor leakage), temperature (hot day → cable derating, cold day → contraction at terminations), wind (cable swing on overhead supplies, structural movement at terminations).</li>
              <li><strong>Load-correlated</strong> — specific appliance use (kettle, shower, oven, EV charger), total household load (overloaded ring, marginal supply), inrush current (motors, fluorescent ballasts, transformers starting).</li>
            </ul>
            <p>
              Investigation method: install a power quality analyser (Sub 2.3) for a week, capture voltage / current / harmonic data continuously, correlate the captured electrical events with the customer's schedule and weather conditions. The correlation reveals the trigger; targeted investigation finds the cause.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Symptoms aren&apos;t just data for your diagnosis &mdash; they&apos;re reportable. Anything that points to damage, deterioration, defect or dangerous condition has to land on a report. The customer interview produces evidence, the report records it; both are part of the audit trail when something goes wrong later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.1"
            clause={
              <>
                "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
              </>
            }
            meaning={
              <>
                The structured symptom hunt sits inside the inspection step &mdash; visual evidence (scorch marks, discoloured terminals, soft cable insulation, water staining) before any meter goes on. The Regulation makes the order explicit: look first, test second. Most missed faults are the visible ones an apprentice rushed past.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the customer interview"
            whatHappens={<>Apprentice arrives at a \'lights flickering' job, immediately starts testing the lighting circuits. Spends 90 minutes investigating, finds no fault on the lighting circuits. Customer mentions in passing 'oh, it only flickers when the heat pump turns on\'. Apprentice realises they\'ve been investigating the wrong circuit — the issue is on the supply tail to the heat pump, dropping voltage on every cycle. 90 minutes wasted; customer charged for time; customer dissatisfied.</>}
            doInstead={<>Always run the structured interview before opening any enclosure. Five minutes of interview saves thirty minutes of misdirected testing. The customer\'s \'oh by the way' details are usually the clue that points to the actual fault.</>}
          />

          <CommonMistake
            title="Treating burning plastic smell as a non-urgent investigation"
            whatHappens={<>Customer reports a faint burning smell in the meter cupboard. Apprentice books a return visit for next week (other jobs in the diary). Three days later the customer reports a fire in the meter cupboard — the HRJ that was creating the smell ignited the surrounding plastic. Property damage, displaced family, insurance dispute. The HSE / fire service investigation finds the firm had been notified of the smell and didn't act urgently.</>}
            doInstead={<>Burning plastic smell is always immediate. Reschedule lower-priority jobs if needed; isolate at the main switch on arrival to remove the heat source; investigate, find, rectify before leaving site. The \'we\'ll come back' approach is wrong for any fire-risk symptom.</>}
          />

          <Scenario
            title="Diagnosing 'the lights have been weird for months'"
            situation={<>Customer is vague — 'the lights have been a bit weird for months, sometimes they flicker, sometimes they\'re dim, my husband says it\'s nothing but I\'m worried\'. They don\'t know which lights, when, or what triggers it.</>}
            whatToDo={<>Run the structured interview methodically. (1) WHAT — \'tell me about the most recent time you noticed it; what exactly happened?' (Customer recalls: dimming in the kitchen yesterday evening). (2) WHEN — 'what time, what was happening?' (7pm, kettle was boiling). (3) WHERE — 'just the kitchen, or other rooms?' (Mostly kitchen, sometimes hallway). (4) HOW LONG — 'when did you first notice?' (Six months ago, after they had the kitchen extension built). (5) WHAT TRIED — 'have you tried anything?' (Replaced the bulbs, didn't help). (6) WHAT CHANGED — \'kitchen extension built' answers it. Investigation focuses on the kitchen extension\'s wiring — likely an HRJ at the junction where the new wiring meets the existing circuit, exposed under high-current loads (kettle inrush). Thermal imaging at the kitchen junction box during a controlled kettle test confirms the hotspot. Open box, find loose terminal, re-terminate, retest, fault corrected.</>}
            whyItMatters={<>The customer\'s vague initial description hid a clear engineering picture — recent building work introduced a high-resistance termination, exposed under load. Without the structured interview the apprentice would have wasted hours chasing \'lights are dim\'. With the interview, the building-work clue points directly to the fault location. This is the L3 step-up — using the interview as the primary diagnostic tool, not an optional preamble.</>}
          />

          <SectionRule />

          <ContentEyebrow>Symptom: lights flicker</ContentEyebrow>

          <ConceptBlock
            title="Flicker — five candidate causes, prioritised by likelihood"
            plainEnglish="Customer reports lights flicker. Five candidate hypotheses to test: (1) loose neutral somewhere on the circuit (HRJ); (2) supply-side voltage instability; (3) LED driver / dimmer incompatibility; (4) heavy intermittent load on the same circuit (immersion thermostat cycling); (5) Open PEN starting to develop on TN-C-S."
            onSite="Diagnostic order: Megger MFT1741+ Zs at lampholder (compares to design); Fluke 117 voltage at lampholder during flicker event (transient dip suggests source); Fluke 369 leakage clamp on circuit (intermittent leakage suggests insulation); thermal camera on suspect terminations; PQ analyser deployment if unable to reproduce."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Loose neutral / HRJ</strong> — Zs above expected; voltage drops on load. Likely cause if recent building work, vibration, age.</li>
              <li><strong>Supply instability</strong> — multiple properties affected; PQ analyser shows correlated dips. DNO call.</li>
              <li><strong>LED driver / dimmer</strong> — only on dimmable circuits; flicker pattern matches dimmer setting. Replace with compatible driver / dimmer pair (Click Mode dimmer + Aurora Enlite drivers, or LightwaveRF leading-edge dimmer + retrofit-rated lamps).</li>
              <li><strong>Intermittent load</strong> — flicker correlates with appliance cycling (boiler, immersion, freezer). Calculate voltage drop on circuit; oversized cable or split circuit.</li>
              <li><strong>Open PEN developing</strong> — N-E voltage at cut-out elevated. STOP, DNO.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: smell of burning</ContentEyebrow>

          <ConceptBlock
            title="Burning smell — STOP, isolate, investigate by elimination"
            plainEnglish="A burning smell is a STOP-WORK condition. The customer should be advised to switch the property off at the main switch immediately and stay clear until the fault is located. Burning suggests overheating somewhere — typically a HRJ at a terminal, an overloaded conductor, or a failed component generating heat without yet causing fault current."
            onSite="Investigation: full installation isolation, then thermal camera scan (Fluke Ti401 / FLIR E54) of every accessory in the affected area looking for hot spots that have cooled. Visual inspection for char marks, melted plastic, discolouration. The pattern of damage often points to the fault — burnt back-box = terminal HRJ; melted MCB = chronic overload; charred SWA gland = water ingress and arcing."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Customer brief</strong> — switch off at main, stay clear, ventilate, no candles or open flames (carbon monoxide risk if it's a fuel-burning appliance fault).</li>
              <li><strong>Visual inspection</strong> — discolouration on plastic accessories, char marks at terminations, melted insulation visible at any cable end.</li>
              <li><strong>Thermal camera</strong> — even after isolation, thermal mass holds heat for 10-20 minutes. Scan immediately on arrival.</li>
              <li><strong>Smell isolation</strong> — bakelite / phenolic resin smell = old plastic accessories overheating; PVC smell = modern accessory melting; ozone = arcing; metal-burn smell = busbar damage.</li>
              <li><strong>Common locations</strong> — high-current connections (CU incomer, immersion, shower, kitchen radial), points where flexes plug into accessories (multi-way adaptors, extension leads), inside lamp fittings (especially old halogen downlights).</li>
              <li><strong>Document and report</strong> — fault may have caused damage requiring replacement of multiple accessories. Issue Dangerous Situation Report to customer; recommend full electrical condition review.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: RCD trip on power-up</ContentEyebrow>

          <ConceptBlock
            title="RCD trips immediately when reset — six candidate causes"
            plainEnglish="The RCD won't stay reset. Either it's catching a real fault, or the RCD itself is faulty, or there's cumulative leakage above the trip threshold from healthy loads."
            onSite="Diagnostic sequence: (1) disconnect ALL loads from the affected circuit; reset RCD; if holds, the fault is in a load. (2) Plug loads back one at a time; the load that trips the RCD is the fault. (3) If the RCD trips with no loads connected, the fault is in the fixed wiring — IR test with the Megger MFT1741+ between L-E, N-E and L-N at 500 V."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Earth fault on fixed wiring</strong> — IR L-E reads low. Locate by halving and retest.</li>
              <li><strong>Earth fault on appliance</strong> — IR drops when appliance plugged in. Replace appliance or PAT-test.</li>
              <li><strong>Cumulative leakage</strong> — many electronics on one circuit, each leaking 1-2 mA, total exceeds 30 mA. Split circuit or upgrade to 100 mA RCD with downstream 30 mA RCBOs.</li>
              <li><strong>Faulty RCD</strong> — Megger MFT1741+ AutoRCD test shows trip outside spec (e.g. trip at 8 mA on a 30 mA device).</li>
              <li><strong>Wrong-type RCD on DC-injecting load</strong> — Type AC RCD on a circuit feeding LED drivers / VSDs / EV charger. DC component blinds the RCD or causes nuisance trips. Upgrade to Type A or Type B as appropriate.</li>
              <li><strong>Borrowed neutral</strong> — circuit shares neutral with another circuit. RCD sees imbalance. BS 7671 314.4 violation. Trace and rectify.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: warm to touch</ContentEyebrow>

          <ConceptBlock
            title="Warm or hot accessory — early-warning HRJ signal"
            plainEnglish="A socket, switch, accessory or breaker that's warm to touch (&gt;40 °C is noticeable, &gt;60 °C is dangerous) is generating heat — typically from a high-resistance termination or chronic overload. Catch it before it becomes a fire."
            onSite="Diagnosis: thermal camera (Fluke Ti401, FLIR E54) on the affected accessory under load. Compare to identical adjacent accessories — single hot accessory in a row of cold ones is the fault. Then isolate, open the accessory, inspect terminals — typically loose screw, work-hardened conductor, copper-on-aluminium corrosion (rare but seen on older installations)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal scan under load</strong> — energise circuit at expected load (kettle on a kitchen socket, drill on a workshop socket). Image under load; compare to ambient.</li>
              <li><strong>Touch comparison</strong> — bare hand back-of-fingers comparison between suspect and adjacent accessories. Significant temperature difference = fault.</li>
              <li><strong>Voltage drop</strong> — Fluke 117 voltage measurement at the suspect accessory under load vs at the supply end. Drop above 2-3% = significant resistance somewhere in between.</li>
              <li><strong>Visual on opening</strong> — discolouration on terminal screws, brown stains on conductor insulation near terminals, blackened terminal block, cracked accessory body.</li>
              <li><strong>Common causes</strong> — terminal screw not torqued to spec (typical 0.8-2.0 Nm for accessories), conductor partially insulated under terminal screw, multi-strand conductor with strands escaping the terminal, repeated plug-in cycles loosening socket contacts.</li>
              <li><strong>Repair</strong> — cut back to clean conductor, re-strip, re-terminate to manufacturer's torque (Wera 7440 1/4" torque screwdriver, Knipex Twistor Plus). Retest with thermal camera under load to confirm.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: intermittent — the hardest fault to diagnose</ContentEyebrow>

          <ConceptBlock
            title="Intermittent faults — when the fault isn't there when you arrive"
            plainEnglish="The customer reports a fault that you can't reproduce. Common intermittent faults: thermal expansion opening a HRJ when warm; humidity bridging an L-E gap; load cycling triggering an RCD only at certain loads; PQ events from supply or neighbouring property."
            onSite="Investigation: PQ analyser deployment (Fluke 1730 / 1760, Hioki PW3198) for 24-72 hours captures the event. Customer interview to identify timing patterns (every morning at 6 AM = correlate with timers; only during rain = water ingress; only on hot days = thermal expansion). Targeted load testing under suspect conditions (heat the circuit with a hairdryer, soak the suspect accessory with a wet cloth — under controlled isolation)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Customer log</strong> — ask customer to log every event (time, what was on, weather, anything unusual). Pattern often reveals the cause.</li>
              <li><strong>PQ analyser deployment</strong> — Fluke 1730 logs voltage, current, harmonics, dips, swells continuously. Catches the event in real time with timestamp.</li>
              <li><strong>Thermal cycling</strong> — heat suspect terminations with hot air gun (Steinel HG2120E on low setting), retest immediately. HRJ that's stable cold may open when heated.</li>
              <li><strong>Humidity testing</strong> — apply controlled moisture (damp cloth at suspect accessory under isolation), retest IR. Shows water-ingress faults.</li>
              <li><strong>Load testing</strong> — apply expected loads in sequence to reproduce conditions. Use a Megger Loadbox or similar to simulate large fixed loads.</li>
              <li><strong>Time of day</strong> — correlate with neighbouring property activity (factory startup, large equipment cycling, EV charging). Intermittent supply-quality issues common in shared-feeder situations.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Structured customer interview (what / when / where / how long / what tried / what changed) is the L3 fault-diagnosis primary tool. 5 minutes saves 30 minutes of misdirected testing.",
              "Customer symptoms are starting hypotheses, not facts. Verify with measurement; treat customer descriptions as approximately 70% accurate.",
              "Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. PQ analyser captures the conditions at the reported moment.",
              "Burning plastic smell is always urgent — HRJ at char point, fire-risk window open. Treat as Code 1; isolate immediately; investigate same visit.",
              "Common false-alarm symptoms: 'lights flicker' often = LED lamp/dimmer incompatibility; 'breaker trips' often = overloaded extension; 'socket dead' sometimes = upstream tripped GFCI.",
              "Weather-correlated faults indicate environmental triggers — rain → outdoor leakage, temperature → cable / termination effects, wind → mechanical movement at supply.",
              "Load-correlated faults reveal the load that exposes the fault — kettle inrush exposes HRJ on the supply, motor start exposes loose terminal in the breaker.",
              "Document interviews in the standard job sheet 'Symptoms' section — customer's words in quotes, timeline, conditions, what they've tried.",
            ]}
          />

          <Quiz title="Common symptoms — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.1 Types and causes</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.3 Fault locations</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
