/**
 * Module 4 · Section 3 · Subsection 5 — Special precautions on specialised systems
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.2 + LO4 / AC 4.1
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.6 — special precautions for
 * lone working, hazardous areas, fibre-optic cabling, ESD, electronic devices,
 * IT equipment, HF / capacitive circuits, batteries.
 *
 * Frame: deep-dive on the special-environment / specialised-equipment
 * precautions an L3 apprentice meets — fibre-optic, IT shutdown,
 * fluorescent ballast capacitors, RF / induction equipment, fire alarm
 * isolation, emergency lighting test cycles.
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
  'Special precautions for specialised systems (3.5) | Level 3 Module 4.3.5 | Elec-Mate';
const DESCRIPTION =
  'Special-environment and specialised-equipment precautions an L3 apprentice meets — fibre-optic, IT shutdown, fluorescent ballast capacitors, RF / induction equipment, fire alarm isolation, emergency lighting test cycles, lone working in hazardous areas.';

const checks = [
  {
    id: 'mod4-s3-sub5-fibre',
    question:
      "What's the special precaution for working on fibre-optic cabling during a fault investigation?",
    options: [
      "There is no special precaution — fibre carries light, not electricity, so it is completely safe to handle live. Just unplug the patch lead and inspect the end with the naked eye; the lack of voltage means none of the electrical safety rules apply.",
      "Three: eye safety (the invisible infrared laser light can permanently damage retinas — never look down a connected fibre, verify dark with a VFL), cleanliness (a single 1 µm dust particle causes signal loss), and breakage (sharp glass fragments embed in skin).",
      "Treat the fibre exactly like a mains cable — prove it dead with a GS38 two-pole voltage tester before touching it. If the tester reads zero the fibre is safe to handle; the same lock-off and prove-dead routine used on copper applies unchanged to optical fibre.",
      "Discharge the fibre to earth first. Fibre cores build up a static charge that can damage the transceiver, so bond the connector to the rack earth bar through a 1 MΩ resistor before inspection. Once discharged, you can safely look directly into the connector to check the cleave.",
    ],
    correctIndex: 1,
    explanation:
      "Fibre-optic safety is its own discipline. The eye-safety risk is invisible — you literally can't see the light that damages you. Visual Fault Locators (VFLs) at 650 nm RED are the standard 'is this fibre live?' tool because the light is visible. Fluke and EXFO sell complete fibre toolkits; the L3 apprentice's role is recognising the hazard and using the right precautions, not commissioning the fibre links.",
  },
  {
    id: 'mod4-s3-sub5-it',
    question:
      "Customer's office has a server in a comms cabinet. You need to isolate the supply to investigate a fault. What's the procedure to avoid data loss?",
    options: [
      "Just isolate at the main switch — the server's UPS will keep everything running, so there is no risk of data loss. The UPS is designed to ride through any outage indefinitely, so no coordination with the customer is needed before you switch off.",
      "Pull the server plugs out first so the cabinet is fully dead before you isolate the supply. Removing the load at the equipment end protects the data, because a hard stop at the plug is gentler on the disks than isolating at the board.",
      "Coordinate with the customer's IT contact BEFORE isolation: brief them on the outage window, let them perform a graceful shutdown of servers and arrays (typically 5–15 minutes), confirm it is complete, then isolate. Skipping this risks data corruption and RAID degradation.",
      "Switch off quickly at a quiet time, such as lunchtime, when no one is using the system. A fast outage when the office is empty means no in-flight transactions, so the data is safe and there is no need to involve IT or shut anything down in software.",
    ],
    correctIndex: 2,
    explanation:
      "IT systems require graceful shutdown to protect data. Hard power-off can corrupt databases, degrade RAID arrays, lose in-flight transactions. The financial impact of one hour's data loss in a typical business runs to thousands of pounds plus regulatory exposure (GDPR breach if personal data is affected). The 5–15 minute IT coordination window is non-negotiable.",
  },
  {
    id: 'mod4-s3-sub5-firealarm',
    question:
      "You need to isolate a circuit feeding part of a fire alarm system at a hotel. What additional procedures apply under BS 5839-1 and RR(FS)O 2005?",
    options: [
      "Inform the responsible person and notify the alarm-receiving centre before isolation, place a fire watch in the affected zone, and document the isolation in the fire log book — confirming the panel returns to normal and closing the entry on restoration.",
      "Isolate the circuit and carry on — the fire alarm panel's battery backup keeps the whole system fully operational during mains isolation, so there is nothing else to do. No one needs to be told and no fire watch is required because detection continues uninterrupted.",
      "Simply put a note in the site diary and isolate. The fire alarm is the building owner's responsibility, not yours, so once you have recorded that you switched it off the regulatory duty is fully discharged and no further coordination is needed.",
      "Trigger the alarm first so everyone evacuates, then isolate while the building is empty. Working with the building cleared removes all risk, and the alarm can simply be reset and the panel restored once your work on the circuit is complete.",
    ],
    correctIndex: 0,
    explanation:
      "Fire alarm isolation is a regulated activity. The Regulatory Reform (Fire Safety) Order 2005 puts the responsibility on the building's 'responsible person' to maintain the fire alarm; your isolation is a temporary departure that must be controlled. The fire log book entry is the audit record. Most commercial premises have specific documented procedures for fire-alarm work.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the residual charge in a 4 µF fluorescent ballast capacitor after isolation, and how do you safely discharge it?",
    options: [
      "There is no residual charge to worry about — the moment you open the isolator the capacitor discharges instantly through the ballast windings, so the terminals are dead as soon as the supply is off. You can handle the capacitor straight away with bare hands.",
      "A 4 µF cap charged to ~325 V peak stores about 0.21 J — enough for a sharp shock but not normally fatal. Wait a minute after isolation, verify with a meter, and discharge through a 5–10 kΩ resistor if still charged; never short with a screwdriver.",
      "The capacitor holds a lethal charge for hours and must be left disconnected overnight before anyone touches it. There is no safe way to discharge it deliberately, so the only correct procedure is to isolate, label the fitting and return the next day once it has bled down on its own.",
      "Short the capacitor terminals directly with a screwdriver blade as soon as you isolate. The dead short drains the charge fastest, and the brief arc is harmless; using a resistor wastes time and leaves residual charge that a screwdriver removes completely.",
    ],
    correctAnswer: 1,
    explanation:
      "Fluorescent ballast capacitors are a low-but-real hazard. Modern bin-mounted ballasts have integral bleed resistors that drop the voltage within a minute; older ones may not. The danger is the surprise shock if you grab the terminals expecting them to be dead — shorting with a screwdriver pits the contacts and the discharge arc can weld. The energy is small enough that a properly-handled discharge is safe. Modern LED conversions remove the ballast entirely, so this hazard is reducing in newer installations.",
  },
  {
    id: 2,
    question: "What's the precaution for working near RF (radio-frequency) equipment such as induction heaters or RF welders in a workshop?",
    options: [
      "None beyond standard isolation. RF equipment is just another mains load; lock off the supply, prove dead at the terminals and work as normal. The radio-frequency output stops the instant the supply is removed, so there is no residual hazard to consider.",
      "Wear hearing protection and high-visibility clothing. RF welders are loud and the workshop is busy, so the controls are the same as any noisy mechanical area; there are no electrical-field considerations specific to the radio-frequency output itself.",
      "Three: RF field exposure limits (standby fields couple to your body without direct contact), a pacemaker / metal-implant warning (RF fields interfere with cardiac devices and heat implants), and capacitor-bank discharge (tank circuits store significant energy; wait the manufacturer-specified bleed period).",
      "Earth yourself to the equipment chassis through a wrist strap before working. The only RF hazard is static build-up on the operator, so an anti-static strap removes the risk entirely; field exposure and capacitor energy are not concerns at workshop power levels.",
    ],
    correctAnswer: 2,
    explanation:
      "RF equipment has safety considerations beyond standard electrical hazards — field exposure, pacemaker risk, capacitor bank energy. The Control of Electromagnetic Fields at Work Regulations 2016 (CEMFAW) sets exposure limits. Manufacturer's manual gives the specific precautions for the equipment.",
  },
  {
    id: 3,
    question: "What's the procedure for isolating an emergency lighting central battery system without compromising the building's safety?",
    options: [
      "Just isolate the mains feed and work — the whole point of emergency lighting is that the battery keeps it lit during any mains loss, so isolating the supply actually triggers the system to do its job. No briefing or signage is needed because the lights stay on.",
      "Isolate the lighting at the local switch, the same as any lighting circuit. Emergency fittings are ordinary luminaires with a battery pack, so the normal lighting-circuit isolation applies and there is no separate procedure or fire-safety duty to follow.",
      "Leave it energised and work live. Emergency lighting must never be switched off under any circumstances, so any fault is repaired on the live system using insulated tools; there is no acceptable way to isolate a central battery system.",
      "Verify the evacuation route doesn't depend on the affected lighting (or deploy alternatives), place maintenance signage, brief the responsible person and log it, isolate only the affected segment, and on restoration confirm normal operation and run a discharge test.",
    ],
    correctAnswer: 3,
    explanation:
      "Emergency lighting maintenance is governed by BS 5266-1 + RR(FS)O 2005. The system's purpose is life-safety during a power failure; your isolation defeats the system temporarily and must be controlled. The full discharge test on completion verifies the batteries weren't drained during the work and are still capable of the BS 5266 3-hour duration.",
  },
  {
    id: 4,
    question: "A customer's lift fails to operate after an unrelated fault investigation that involved isolation of the building's main supply. What might have happened?",
    options: [
      "The lift control system, its safety subsystems, or the BMS interface have not recovered cleanly from the power loss and need clearing. The fix is to call the lift's contracted maintainer (LOLER 1998) to reset and recommission — the L3 apprentice does not work on lift internals.",
      "The lift's supply phase rotation has reversed during the isolation. Swap any two phases at the lift isolator and the car will move again; this is a routine adjustment the L3 apprentice makes on the lift motor terminals before calling anyone else.",
      "The lift motor windings have been damaged by the sudden power loss. IR-test the motor at 500 V; a low reading confirms it, and the L3 apprentice rewinds or replaces the motor as part of restoring the supply.",
      "Nothing has happened to the lift — it is simply waiting for the building's main supply to stabilise and will restart itself within a few minutes. Wait ten minutes and the lift returns to service with no intervention; there is no need to contact anyone.",
    ],
    correctAnswer: 0,
    explanation:
      "Lifts are specialised plant under LOLER 1998 (Lifting Operations and Lifting Equipment Regulations). The L3 apprentice doesn't intervene with lift internals; the lift contractor does. Knowing this in advance — and warning the customer that an isolation may require lift contractor reset — is part of the four-category impact assessment (Sub 1.3).",
  },
  {
    id: 5,
    question: "Customer's IT comms cabinet has a UPS. After your work, the UPS shows 'BATTERY LOW'. What's happened?",
    options: [
      "The UPS has been damaged by your isolation and needs replacing. A 'BATTERY LOW' message after a mains interruption always means the unit's charging circuit has failed; quote the customer for a new UPS and fit it before restoring the IT load.",
      "The UPS battery has been substantially discharged during the mains isolation. It will recharge over several hours once mains is restored, during which it cannot give full backup; brief the customer on the recharge timeline and avoid further isolation until it recovers.",
      "The UPS has detected reverse polarity on the restored supply. 'BATTERY LOW' is the unit's polarity-fault warning; swap line and neutral at the UPS input socket and the message clears, confirming the supply is now correct.",
      "The UPS battery is permanently dead and must be discarded as the message will never clear. UPS batteries fail closed after a single deep discharge, so once 'BATTERY LOW' shows the only fix is to remove the battery and run the IT load on mains alone.",
    ],
    correctAnswer: 1,
    explanation:
      "UPS batteries deplete during use and recharge slowly. The post-isolation recharge window is a planned consequence — communicate it to the customer. UPS battery life is also degraded by deep-discharge cycles; frequent isolation work can shorten battery life significantly.",
  },
  {
    id: 6,
    question: "What does 'lone working in hazardous areas' mean and what additional controls apply?",
    options: [
      "Lone working in hazardous areas simply means working by yourself anywhere with a raised floor or a loft — the controls are the standard lone-working measures of a check-in phone call and a charged mobile. No second person is needed because the hazard is the same as any solo domestic job.",
      "It means working alone outside normal hours, and the only extra control is a lone-worker alarm device that calls a monitoring centre if you stop moving. ATEX zones, confined spaces and HV proximity carry no additional requirement beyond that alarm.",
      "Hazardous-area work (ATEX zones, confined spaces, work at height in remote locations, work near live HV) carries higher risk than standard work, so the ordinary lone-working precautions aren't enough — two-person working with a permit-to-work, a standby person and a defined rescue procedure is the default.",
      "It refers to working alone near live conductors, and the extra control is simply wearing arc-flash PPE. As long as you have the right gloves and visor you may work solo in any hazardous area; the PPE removes the need for a permit-to-work or a standby person.",
    ],
    correctAnswer: 2,
    explanation:
      "Hazardous-area work is one of the categories where lone-working is functionally banned. The combination of regulations (EAWR + INDG73 + Confined Spaces + WaHR + DSEAR for ATEX) makes two-person working the only defensible approach. The L3 apprentice's role is to recognise hazardous-area work and decline solo deployment, escalating to the supervisor.",
  },
  {
    id: 7,
    question: "What's the special isolation precaution for fault diagnosis on a building with PV + battery storage where the customer relies on the battery for off-grid backup?",
    options: [
      "Isolate the main switch only — the battery and PV will keep the whole house running through the auto-transfer switch, so you can work on any circuit without interrupting the customer. The backup function actually makes isolation easier, not harder.",
      "Open the battery DC isolator first to make the system safe, then work freely. Once the battery is disconnected the PV array cannot energise anything, so the rest of the installation is dead and no further coordination with the customer is needed.",
      "There is no special precaution — a PV-plus-battery house is isolated exactly like any other. Switch off at the consumer unit and the ATS will simply sit idle until you restore the supply; the customer keeps their backup throughout because the battery is unaffected.",
      "Identify whether the customer relies on the battery backup (off-grid switchover via an ATS). If so, isolating the inverter side defeats the backup — brief them, isolate only the affected circuit where possible, time any inverter isolation carefully, and confirm the ATS returns to standby afterwards.",
    ],
    correctAnswer: 3,
    explanation:
      "Battery + PV + ATS systems are increasingly common for customers wanting outage protection. The ATS automatically switches the customer to battery during a grid outage. Your isolation needs to consider whether the battery backup function is still available during your work — if not, the customer loses both grid AND battery during your work, which is worse than just losing grid.",
  },
  {
    id: 8,
    question: "What's the special precaution for diagnosing faults on circuits feeding life-safety equipment (medical equipment in a care home, oxygen concentrators, mobility lifts)?",
    options: [
      "Three additional steps: identify the life-safety loads before isolation (interview the customer or clinical lead), brief them and agree alternative arrangements, and minimise the outage window. Life-safety circuit isolation is a multi-stakeholder coordination, not a unilateral electrician decision.",
      "No special precaution applies — life-safety equipment all runs on its own internal battery backup, so a circuit can be isolated freely and the equipment carries on. Brief no one; the batteries cover any outage you create.",
      "Isolate the whole installation at the main switch and work fast. A single short outage is safer than juggling individual circuits, and life-safety equipment is built to survive brief interruptions, so coordinating with clinical staff only wastes time.",
      "Refuse the work entirely. An L3 apprentice is never permitted to isolate any circuit in a care home or hospital under any circumstances, so the only correct action is to decline and refer the customer to a specialist medical-electrical contractor.",
    ],
    correctAnswer: 0,
    explanation:
      "Life-safety equipment depends on continuous power. Care homes (CQC), hospitals (NHS), supported living facilities all have regulatory expectations about electrical reliability. Your isolation has to fit within their continuity-of-care procedures. The L3 apprentice's role is to identify life-safety loads in the interview, escalate the planning to the supervisor, and follow the coordinated procedure.",
  },
];

const faqs = [
  {
    question: "What special precaution applies for fault investigation on a circuit feeding a smart meter?",
    answer:
      "Smart meters re-handshake with the supplier's network on power restoration; the process takes 5–15 minutes during which the meter shows 'connecting' or similar. The customer's IHD (in-home display) and any HAN-connected devices (smart thermostat, smart EV charger) lose connection during this period. Brief the customer in advance. If the meter doesn't re-handshake (rare but happens), the supplier's customer service line is the next step — they remotely reset or arrange replacement. The L3 apprentice's role is preparation + documentation, not meter intervention (smart meter exchange is the supplier / DNO's monopoly).",
  },
  {
    question: "How do I work safely on circuits that feed CCTV, security alarms or building access control?",
    answer:
      "Coordinate with the security contact (in-house security manager, security company, alarm receiving centre). Brief them on the planned outage. ARCs typically need 24-hour notice to suspend the alarm-receiving function; if you go offline without notice, they dispatch police / response to investigate the silent alarm. Access control systems often default to 'fail safe' (unlocked) or 'fail secure' (locked) on power loss — confirm which mode applies and brief building security on temporary alternative measures. Document all coordination in the job sheet.",
  },
  {
    question: "What precautions apply for fault work on a circuit feeding refrigeration that affects food safety?",
    answer:
      "Food refrigeration is regulated under the Food Safety Act 1990 + Food Hygiene (England) Regulations 2006. Loss of refrigeration above 8 °C for more than a few hours triggers food-safety protocols (re-inspection of food, possible disposal). Brief the customer / food business operator before isolation. For a planned isolation: arrange portable refrigeration backup, time the work to minimise the outage window, get the customer's written acceptance of the timing. After restoration: the customer's food safety log should record the outage and any food-safety actions taken.",
  },
  {
    question: "What's the precaution for circuits feeding elevators or escalators?",
    answer:
      "LOLER 1998 governs lifts; PUWER 1998 governs escalators. Both are specialised plant under contracted maintenance. NEVER intervene with the lift / escalator electrics yourself — that's the lift contractor's responsibility. Isolate at the supply (the dedicated lift isolator, usually marked 'LIFT MAINS') only after notifying the lift maintainer that the lift will be off. Some lifts have battery-backed comms / emergency call systems that need separate brief / coordination. After restoration the lift maintainer typically must do a recommissioning visit before the lift is returned to service — this can take days for older lifts.",
  },
  {
    question: "What's the precaution for circuits feeding solar PV / battery storage when investigating an unrelated fault?",
    answer:
      "Identify before isolating. PV systems have AC isolation (consumer side) and DC isolation (array side); battery storage has AC and DC. Map all the energy sources; isolate only what your fault investigation requires. For solar specifically: the array is energised whenever sunlight is on it — DC voltage at the inverter input can be 200–600 V even when AC is isolated. Use a DC-rated voltage tester (Fluke T6-1000, Megger MFT1741+ in DC mode). For battery storage: the battery DC bus is energised continuously until physically disconnected — treat as live until verified.",
  },
  {
    question: "What's the L3 apprentice's role in fault investigation on commercial three-phase plant (motors, VFDs, large pumps)?",
    answer:
      "Supporting the senior, not leading. Three-phase plant fault diagnosis is improver / Approved Electrician territory because of the complexity (motor windings, VFD parameters, control circuit logic) and the energy levels (3-phase fault currents are high). The L3 apprentice's role is: isolation + lock-off, MFT testing of the supply side, observation and documentation of the senior's diagnostic process, retest after rectification, restoration. Building the experience in the supporting role is what prepares the apprentice to lead these jobs at improver level.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 4 · Section 3 · Subsection 5"
            title="Special precautions for specialised systems"
            description="Special-environment and specialised-equipment precautions an L3 apprentice meets — fibre-optic eye safety, IT graceful shutdown, fluorescent ballast capacitor discharge, RF / induction equipment fields, fire alarm isolation procedures, emergency lighting test cycles, life-safety equipment coordination."
            tone="emerald"
          />

          <TLDR
            points={[
              "Fibre-optic carries invisible IR laser light — never look down a fibre or connector. Use a Visual Fault Locator (VFL, 650 nm red) to verify dark.",
              "IT systems need graceful shutdown coordinated with the IT contact — hard power-off corrupts data, degrades RAID, loses transactions worth thousands of pounds.",
              "Fire alarm isolation requires brief responsible person, notify ARC, place fire watch, document in fire log book — RR(FS)O 2005 + BS 5839-1.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply fibre-optic safety precautions — eye safety, cleanliness, breakage handling — when working near fibre links.",
              "Coordinate IT graceful shutdown with the IT contact before isolating circuits feeding servers, NAS or comms equipment.",
              "Discharge fluorescent ballast capacitors safely (1-min wait, verify, resistor discharge if needed).",
              "Recognise RF / induction equipment hazards — field exposure, pacemaker risk, capacitor bank energy.",
              "Apply fire alarm isolation procedure — responsible person brief, ARC notification, fire watch, log book entry, RR(FS)O 2005 compliance.",
              "Identify life-safety equipment (medical, mobility, refrigeration) and coordinate isolation with regulated continuity-of-care procedures.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Fibre-optic safety</ContentEyebrow>

          <ConceptBlock
            title="Invisible laser light, sharp glass, sub-micron contamination"
            plainEnglish="Fibre-optic links carry infrared laser light that you can't see (typically 1310 nm or 1550 nm). The light can permanently damage your retina if you look at it. Add the eye-safety risk to the cleanliness requirement (sub-micron contamination causes signal loss) and the breakage hazard (sharp glass fragments) — fibre work has its own discipline."
            onSite="Most L3 apprentices won't commission fibre links — that's a fibre specialist's job. But you'll meet fibre on commercial sites (telecoms, server rooms, smart buildings) and need to know the safety precautions before you touch anything."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Eye safety</strong> — NEVER look down a connected fibre or its connector. Use a Visual Fault Locator (VFL, 650 nm red) to verify dark before inspection. Fluke / EXFO sell standard VFLs at ~£100.</li>
              <li><strong>Cleanliness</strong> — single 1 µm dust particle on a connector causes signal loss. Clean with proper wipes (Sticklers CleanWipes, IBC Cleaning Tools); inspection scope (Fluke FI-3000, EXFO FIP-400B) verifies cleanliness.</li>
              <li><strong>Breakage</strong> — broken fibre fragments are sharp and easily embedded in skin. Wear safety glasses + nitrile gloves; collect fragments in a designated waste container; never wipe surfaces by hand.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>IT systems — graceful shutdown</ContentEyebrow>

          <ConceptBlock
            title="The 5–15 minute coordination that prevents data loss"
            onSite="IT systems require graceful shutdown to protect data. Hard power-off corrupts databases, degrades RAID arrays, loses in-flight transactions. The financial impact of one hour's data loss in a typical business runs to thousands of pounds plus regulatory exposure (GDPR breach if personal data is affected). The 5–15 minute IT coordination is non-negotiable."
          >
            <p>Standard procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify the IT lead (in-house IT, MSP, on-call provider) BEFORE isolation.</li>
              <li>Brief them on the planned outage window and scope.</li>
              <li>IT performs graceful shutdown via OS or UPS interface — typically 5–15 minutes.</li>
              <li>Confirm shutdown complete via UPS status / server console.</li>
              <li>Then isolate.</li>
              <li>After work: restore supply, IT verifies system boot, confirms application availability.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSWA 1974 — Section 3 (Duty to non-employees)"
            clause={<>"It shall be the duty of every employer to conduct his undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in his employment who may be affected thereby are not thereby exposed to risks to their health or safety."</>}
            meaning={<>HSWA Section 3 puts the duty on the employer to consider the impact of work on third parties — including the customer's data, the customer\'s staff, the customer\'s clients. Hard power-off of a server with data loss is a foreseeable harm; the firm has a duty to coordinate to prevent it.</>}
            cite="Source: Health and Safety at Work etc. Act 1974, Section 3."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Fire alarm and emergency lighting</ContentEyebrow>

          <ConceptBlock
            title="Regulated systems with their own coordination procedures"
            plainEnglish="Fire alarm (BS 5839) and emergency lighting (BS 5266) are life-safety systems. Your isolation defeats their function temporarily and must be controlled. The Regulatory Reform (Fire Safety) Order 2005 puts the duty on the building\'s responsible person; your work fits into their procedure."
          >
            <p>Fire alarm isolation procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inform the responsible person (typically duty manager) BEFORE isolation.</li>
              <li>Notify the alarm-receiving centre (ARC) — un-notified outage triggers fire brigade dispatch.</li>
              <li>Place fire watch in affected zone — designated person with extinguisher + alarm-raising means.</li>
              <li>Document in the fire log book — start, end, scope, responsible person.</li>
              <li>Carry out work; minimise outage window.</li>
              <li>On restoration: confirm panel returns to normal; inform ARC; close fire log entry.</li>
            </ul>
            <p>Emergency lighting isolation procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify evacuation route safety; deploy alternative measures if route depends on affected lighting.</li>
              <li>Place \'EMERGENCY LIGHTING UNDER MAINTENANCE' signage.</li>
              <li>Brief responsible person; document in emergency lighting log book.</li>
              <li>Isolate at dedicated isolator; minimise outage to affected segment only.</li>
              <li>On restoration: confirm normal operation; perform discharge test (BS 5266 3-hour); update log book.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Other specialised systems</ContentEyebrow>

          <ConceptBlock
            title="Fluorescent ballasts, RF equipment, lifts, life-safety loads"
          >
            <p><strong>Fluorescent ballast capacitors</strong> — 1-minute wait after isolation, verify with meter (DC reading should be &lt;30 V), discharge through 5–10 kΩ resistor if still charged. Never short with screwdriver.</p>
            <p><strong>RF equipment (induction heaters, RF welders)</strong> — field exposure (CEMFAW 2016), pacemaker / implant warning, capacitor bank discharge wait per manufacturer manual.</p>
            <p><strong>Lifts and escalators</strong> — LOLER 1998 / PUWER 1998 specialised plant; never intervene with electrics yourself; brief lift contractor before isolation.</p>
            <p><strong>Life-safety loads (medical, mobility, oxygen)</strong> — identify in customer interview, brief clinical staff, agree alternative arrangements, minimise outage.</p>
            <p><strong>UPS units</strong> — battery depletion during isolation, slow recharge after; brief customer on recharge timeline.</p>
            <p><strong>Smart meters</strong> — re-handshake takes 5–15 minutes; brief customer; supplier call if it doesn't reconnect.</p>
            <p><strong>CCTV / access control / intruder alarm</strong> — brief security contact; ARC notification 24 hours in advance.</p>
            <p><strong>Refrigeration affecting food safety</strong> — brief food business operator; arrange backup; document under Food Safety Act 1990.</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.4"
            clause={
              <>
                "Precautions shall be taken to avoid danger to persons and livestock, and to avoid damage to property and installed equipment, during inspection and testing."
              </>
            }
            meaning={
              <>
                Specialised systems amplify the &ldquo;damage to installed equipment&rdquo; side of 641.4. Hard power-off of an IT cabinet, an unannounced fire-alarm isolation or a 500&nbsp;V IR test through a connected dimmer module each breach 641.4 in the same way &mdash; precautions weren&apos;t taken to protect equipment. The Regulation makes equipment damage just as much a duty failure as personal injury.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.4, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Where equipment is connected and the equipment is likely to influence the insulation resistance verification test or be damaged by other test voltages, a 250 V DC insulation resistance test following connection of the equipment shall be used to verify insulation resistance as clarified in the redraft to Regulation 643.3."
              </>
            }
            meaning={
              <>
                Specialised systems &mdash; fire panels, smart-meter HAN modules, BMS controllers, DALI lighting drivers, EV chargers, PV inverters &mdash; are exactly the &ldquo;equipment likely to influence the verification test or be damaged&rdquo; that A4:2026 has in mind. Drop the IR test voltage to 250&nbsp;V DC, leave the equipment connected, and you&apos;ll get a verification reading without the cost of a replacement controller.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 643.3 (insulation resistance, redrafted in A4:2026)."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Hard power-off of a server room without IT coordination"
            whatHappens={<>Apprentice isolates the supply to the comms cabinet to investigate a fault. The customer\'s three Dell PowerEdge servers and the NAS array running the office\'s accounting database have a hard power-off. The accounting database is mid-transaction; the post-restart database integrity check finds 47 corrupted records; the customer\'s accountant spends a day reconciling. Bill: £600 of accountant time + lost productivity. The firm refunds; the apprentice gets a tutorial on IT coordination.</>}
            doInstead={<>Always coordinate with the IT contact BEFORE isolating any circuit feeding IT equipment. The 5–15 minute coordination window is trivial compared to the data-loss cost. If the IT contact isn\'t available, escalate to the supervisor — don\'t proceed with the isolation.</>}
          />

          <CommonMistake
            title="Isolating a fire alarm circuit without notifying the ARC"
            whatHappens={<>Apprentice isolates a small section of the fire alarm system at a hotel to investigate a fault. The panel goes into fault. The alarm-receiving centre sees the fault signal, follows their standing protocol, dispatches the fire brigade. Two engines arrive 8 minutes later. Hotel guests evacuate. Hotel charges the firm for the false-alarm callout fee + lost revenue from disrupted bookings. The firm\'s fire-safety insurance excludes coverage for un-notified isolations.</>}
            doInstead={<>ALWAYS notify the ARC before any fire-alarm isolation. Brief the responsible person. Place fire watch. Document in the fire log book. The procedure exists because the ARC\'s response to an un-notified fault is to dispatch the fire service, which is expensive and embarrassing.</>}
          />

          <Scenario
            title="Multi-system isolation at a small care home"
            situation={<>You\'re at a 12-resident care home to investigate a fault on the kitchen circuit. The kitchen circuit shares an RCD with the medication-fridge circuit (containing insulin), the electric beds in two rooms, and the call-bell system feeding back to the night-staff\'s pager.</>}
            whatToDo={<>(1) Customer interview — identify the manager (responsible person under CQC), the night-staff lead, and the resident\'s families if needed. (2) Map the affected loads — kitchen + medication fridge + 2 electric beds + call bell. The medication fridge and call bell are life-safety; the beds are mobility-safety. (3) Brief the manager; agree the work timing (mid-morning when residents are mobile and the night staff aren\'t on shift). (4) Arrange alternative measures: portable cool-bag for medication fridge contents (manager organises); manual operation instructions for the affected beds; substitute call-bell coverage by additional staff round (manager organises). (5) Confirm with the manager that all alternatives are in place. (6) Isolate, work efficiently, restore as fast as possible. (7) After restoration: verify medication fridge cooling; verify beds operate normally; verify call bells reach the pager. Document everything in the job sheet AND in the home\'s electrical log book.</>}
            whyItMatters={<>Care homes have multiple regulated load categories (CQC for clinical, fire safety, food safety) all of which interact with electrical isolation. The L3 apprentice\'s role is identifying the regulated loads in the customer interview, planning the isolation around them, and coordinating with the responsible person. \'Just isolate' on a care home is a regulatory minefield; the structured approach is what makes the work defensible.</>}
          />

          <SectionRule />

          <ContentEyebrow>Fibre-optic systems — eye safety</ContentEyebrow>

          <ConceptBlock
            title="Fibre-optic eye safety — invisible Class 1M / 3R laser hazards"
            plainEnglish="Fibre-optic systems carry Class 1M (low-power, eye-safe normally) or Class 3R (medium-power, eye damage if directly viewed) laser light at 850 / 1310 / 1550 nm. The light is invisible (above visible spectrum) so you can't see when a fibre is energised. Looking down a powered fibre, even briefly, can cause permanent retinal damage."
            onSite="L3 apprentices encounter fibre on commercial / industrial sites — building management systems, IP CCTV, datacentre / server room work. Standard precautions: never look down an installed fibre cable, never look into a powered transmitter port, always disconnect at both ends before any inspection, use a fibre-optic detector (a IR-sensitive viewer like Norman F8 or Fluke FT535) to verify dark before handling. Standard Lockout-Tagout procedure for fibre is the same as electrical — disconnect, lock the patch panel, prove dark with the detector."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Class 1M</strong> — eye-safe at normal viewing distance but unsafe with optical aids (microscope). Most building network fibre is Class 1M.</li>
              <li><strong>Class 3R</strong> — direct eye exposure can cause damage. WDM systems and longer-distance backbone fibre.</li>
              <li><strong>Detection</strong> — Norman F8 fibre detector or Fluke FT535 photonic test set show whether a fibre is energised. Hold detector to fibre end; energised fibre lights the indicator.</li>
              <li><strong>Don't trust labels</strong> — fibre labelling is often missing or wrong. Always test with the detector before handling.</li>
              <li><strong>Cleaning</strong> — fibre ends accumulate dust that can scatter light dangerously. Clean with manufacturer's lint-free swabs and isopropyl alcohol; never with a tissue.</li>
              <li><strong>Visible-light inspection</strong> — use a fibre microscope (200×) to inspect cleaved fibre ends. Visual assessment of cleave quality is part of the splicing competence.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fluorescent ballasts and discharge lamps</ContentEyebrow>

          <ConceptBlock
            title="Fluorescent and HID lamp circuits — capacitor discharge and high voltage"
            plainEnglish="Fluorescent and high-intensity discharge (HID) lamp circuits use capacitors for power factor correction and high-voltage starters / ballasts to ignite the lamp. Capacitors hold charge after isolation; ballasts can produce 1-5 kV during start-up. L3 apprentice meets these on older commercial sites (T8 / T12 fluorescent, sodium / metal halide highbay)."
            onSite="Standard discharge routine: isolate at the local switch; wait 5 minutes for ballast to discharge; verify with the multimeter on AC volts at the lamp terminals (should read zero); discharge the PFC capacitor through a 5 kΩ resistor with insulated leads (never short with a screwdriver — capacitor discharge can weld the metal); verify capacitor is discharged with the multimeter; THEN handle. Many older fluorescent ballasts contain PCBs (polychlorinated biphenyls) — handle with gloves; dispose under hazardous waste rules."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PFC capacitors</strong> — typically 4-8 µF on T8 fluorescent ballasts; 30-100 µF on HID. Hold lethal charge for several minutes after isolation.</li>
              <li><strong>Discharge routine</strong> — 5-10 kΩ resistor with insulated leads; touch one end to each capacitor terminal for 10 seconds. Verify discharged with multimeter.</li>
              <li><strong>Magnetic ballast hot</strong> — older magnetic ballasts run hot in service. Allow 15+ minutes to cool before handling.</li>
              <li><strong>HID startup voltage</strong> — sodium and metal halide ballasts produce 1-5 kV pulse during ignition. Don't probe live circuits.</li>
              <li><strong>PCB-containing ballasts</strong> — pre-1986 ballasts often contain PCBs. Hazardous waste; dispose through licensed contractor (Veolia, Suez, etc.).</li>
              <li><strong>LED retrofit</strong> — most fluorescent fittings can be retrofitted to LED tubes (Aurora T8 LED, Osram SubstiTUBE) but the ballast / starter must be bypassed. Some retrofits keep ballast in circuit; check tube specification.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire alarm system isolation</ContentEyebrow>

          <ConceptBlock
            title="Fire alarm isolation — coordinating with the alarm receiving centre"
            plainEnglish="Fire alarm systems on commercial premises are typically connected to an Alarm Receiving Centre (ARC) — a 24/7 monitored response. Isolating the fire alarm panel, even briefly, will trigger an ARC alert unless the ARC is informed in advance. The L3 apprentice coordinates the isolation with the ARC, the customer's responsible person, and the building manager."
            onSite="Standard procedure: customer (responsible person under Regulatory Reform Fire Safety Order 2005) calls the ARC to put the system 'on test' for a defined time window; site is briefed (signage at entrances, fire watch may be required by insurer); fire alarm panel isolated at its dedicated supply; work performed; system restored; ARC called to take system off test. Document everything. BS 5839-1 sets the standard for fire detection / alarm systems; BAFE is the certification scheme; FIA (Fire Industry Association) sets industry guidance."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ARC notification</strong> — customer's responsible person calls before isolation. Provide expected duration and contact details.</li>
              <li><strong>Fire watch</strong> — for prolonged isolation (&gt;30 minutes), insurer or RRFSO often requires a person stationed to manually call 999 if a fire occurs.</li>
              <li><strong>Panel manufacturers</strong> — Apollo, C-Tec, Advanced, Kentec, Honeywell Morley, Hochiki. Each has documented isolation procedures in the panel manual.</li>
              <li><strong>Battery backup</strong> — fire alarm panels have integral 24-72 hour battery backup. Mains isolation alone doesn't disable the system; the battery isolator inside the panel must also be opened for full isolation.</li>
              <li><strong>Causes for alarm work</strong> — most common: faulty smoke detector (replace), zone fault (locate cable damage), low battery (replace), addressable loop fault (cable break or short).</li>
              <li><strong>Re-commissioning</strong> — after work, system must be tested per BS 5839-1. Walk-test of detectors, sounder test, panel functional test, all documented in the fire alarm log book.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Emergency lighting test cycles</ContentEyebrow>

          <ConceptBlock
            title="Emergency lighting — BS 5266 test cycles and the central battery"
            plainEnglish="Emergency lighting (EM lighting) provides escape route illumination during mains failure. UK standard: BS 5266-1 requires a brief monthly functional test (verify each unit lights), a 1-hour annual test, and a full duration test (3 hours typical) every 3 years. Most modern systems automate this with a self-test feature."
            onSite="Self-test units (Mackwell, Channel Safety, Eaton Crouse-Hinds, Kaufel, JCC) handle the test cycle automatically; failure indicators show on the unit (red LED). Central battery systems (Eaton Saturn, Mackwell Centroline, Channel Diablo) need manual test or scheduled test through a central control unit. The L3 apprentice's role: respond to failure indicators, replace failed units, document tests in the EM lighting log book."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test cycle</strong> — monthly: 30-second functional. Annual: 1-hour discharge. Triennial: full 3-hour discharge to confirm battery capacity.</li>
              <li><strong>Self-test units</strong> — automatic test cycle, status LED visible. Failure indicators differ by manufacturer (steady red, flashing red).</li>
              <li><strong>Central battery</strong> — large battery cabinet (often 24 V or 110 V DC) feeds multiple light fittings via dedicated FP200 cable. Replace cells every 5-10 years per manufacturer's spec.</li>
              <li><strong>Battery types</strong> — sealed lead acid (older), Ni-Cd (industry standard), Li-ion (newer; longer life). Replace per manufacturer; don't mix types.</li>
              <li><strong>Common failures</strong> — battery end-of-life (most common after 4-7 years); LED driver failure; bypass connection broken (battery sees charge but lamp doesn't see battery during failure).</li>
              <li><strong>Documentation</strong> — EM lighting log book records every test, every failure, every replacement. Audit trail for fire safety inspections under RRFSO 2005.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Fibre-optic carries invisible IR laser light. Never look down a fibre or connector. VFL (650 nm red) verifies dark. Single 1 µm dust particle causes signal loss.",
              "IT systems need graceful shutdown coordinated with IT contact. Hard power-off corrupts data, degrades RAID, loses transactions. 5–15 minute coordination non-negotiable.",
              "Fluorescent ballast capacitors hold charge after isolation. 1-minute wait, verify with meter, discharge through 5–10 kΩ resistor if needed. Never short with screwdriver.",
              "RF equipment has field exposure (CEMFAW 2016), pacemaker risk, capacitor bank energy. Manufacturer manual gives specific precautions.",
              "Fire alarm isolation: brief responsible person, notify ARC, fire watch, fire log book entry. RR(FS)O 2005 + BS 5839-1.",
              "Emergency lighting isolation: verify evacuation route safety, signage, log book, post-work discharge test (BS 5266 3-hour).",
              "Lifts and escalators are LOLER 1998 / PUWER 1998 specialised plant — never intervene with electrics yourself; coordinate with lift contractor.",
              "Life-safety loads (medical, mobility, refrigeration affecting food safety) require multi-stakeholder coordination, not unilateral electrician decision.",
            ]}
          />

          <Quiz title="Special precautions — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.4 RCD / AFDD trips</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">§4 Diagnostic procedure</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
