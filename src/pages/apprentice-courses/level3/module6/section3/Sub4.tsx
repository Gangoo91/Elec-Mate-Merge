/**
 * Module 6 · Section 3 · Subsection 4 — SPD selection (Type 1 / 2 / 3)
 * Maps to C&G 2365-03 / Unit 305 / LO3 / AC 3.4
 *   AC 3.4 — "Select surge protective devices for an installation in
 *             accordance with Section 443 / 534 of BS 7671 and the
 *             relevant product standard"
 *
 * Layered depth: 2366-03 Unit 304 / AC 3.4; 5393-03 Unit 104 / AC 3.4
 *
 * BS EN 61643 product standard, Section 443 risk-based selection, Section
 * 534 installation rules. Type 1 at the origin, Type 2 at distribution,
 * Type 3 at sensitive equipment. Cascade and protection of equipment from
 * transient overvoltage. The L3 designer's choices on a typical mixed
 * installation.
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

const TITLE = 'SPD selection — Type 1, 2, 3 cascade (3.4) | Level 3 Module 6.3.4 | Elec-Mate';
const DESCRIPTION =
  "Surge protective device design — BS EN 61643 product standard, Section 443 risk-based selection, Section 534 installation rules. Type 1 at the origin for direct lightning, Type 2 at distribution for inductive surges, Type 3 at sensitive equipment. Cascade and protection design for the L3 mixed installation.";

const checks = [
  {
    id: 'spd-type-choice',
    question:
      "A small commercial unit on a TN-C-S supply, no external lightning protection system, located in a moderate-keraunic-level area. The Section 443 risk-assessment outcome is 'protection required'. The right SPD installation is:",
    options: [
      "Securing all isolations (locks remain in place if any work is incomplete), making all enclosures safe (covers on, doors closed), tidying tools, sweeping the work area, signing the day&rsquo;s permit / RAMS as complete, briefing the next shift / next day.",
      "Currently £90,000 of VAT-taxable turnover in any rolling 12-month period (£85,000 was the long-standing figure, raised to £90,000 in April 2024). When you cross the threshold you must register for VAT within 30 days and start charging VAT (currently 20% standard rate) on your invoices. Quarterly VAT returns. You can reclaim VAT paid on business purchases. For a busy electrical firm crossing the threshold is a significant administrative event.",
      "The casualty has autonomy on their own treatment but the supervisor has duties to the firm, the regulator and the wider workplace. Refusing medical assessment is the casualty's right but doesn't discharge the supervisor's HASAWA s.2 / s.7 duty. Supervisor should: strongly recommend assessment, document the conversation, escalate to a more senior manager, decline to release the casualty back to safety-critical work without clearance.",
      "Type 2 at the origin (or main distribution board), located on the supply side of the main RCD if present, with conductor lengths kept short and earth bonding to the MET. No Type 1 unless the building has its own external lightning protection system (LPS); no Type 3 unless specific sensitive equipment is at risk after the Type 2 has dealt with bulk transient.",
    ],
    correctIndex: 3,
    explanation:
      "Type 1 SPDs are required where there is a direct-strike risk path into the installation, typically meaning the building has an external lightning protection system (LPS) per BS EN 62305-3 or there is a direct overhead supply conductor. Without LPS or overhead supply, the dominant transient threat is induced surges from nearby strikes and switching transients on the supply — Type 2 at the origin (or main board) addresses these. Type 3 is added only where specific sensitive equipment downstream needs further protection (server rooms, medical equipment, particular electronic plant) — it is not required across the board.",
  },
  {
    id: 'spd-conductor',
    question:
      "Per Reg 534.4.10, the SPD protective conductor (between the SPD and the main earthing terminal) for a Type 2 SPD installed at or near the origin must have a minimum cross-sectional area of:",
    options: [
      "Use written communication (printed schedule + email), face them clearly when speaking so they can lip-read, and offer to use a BSL interpreter for complex discussions",
      "Both are coil-operated switches, but contactors are built for higher currents (motor and load circuits) and usually have multiple ganged poles, often three.",
      "6 mm² copper or equivalent — Reg 534.4.10(a). The protective conductor must carry the SPD's discharge current to earth without excessive impedance; an undersized PE conductor between SPD and MET defeats the SPD function.",
      "After a stressful incident (e.g., a near-miss or heated confrontation), you should delay important decisions and conversations for at least 20 minutes where possible, allowing the physiological stress response to subside before engaging",
    ],
    correctIndex: 2,
    explanation:
      "Reg 534.4.10(a) requires a minimum 6 mm² copper (or equivalent) for the protective conductor between a Type 2 SPD and the main earthing terminal, when the SPD is installed at or near the origin. For Type 1 SPDs the requirement is 16 mm² copper minimum (Reg 534.4.10(b)) — Type 1 handles much higher discharge currents (10/350 microsecond impulse waveform from direct lightning) and needs the larger conductor. The connecting conductor on the live side has its own minimum (2.5 mm² for Type 2, 6 mm² for Type 1) per Reg 534.4.10(c) and (d).",
  },
  {
    id: 'spd-cascade',
    question:
      "A Type 1+2 combined SPD at the origin and a Type 2 SPD at a distant sub-distribution board feeding sensitive equipment. The cascade design intent is:",
    options: [
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\\\\\\\\\\\\\\\\\\\\\\\\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
      "The Type 1+2 at the origin handles the bulk of the transient energy; the downstream Type 2 (or Type 3) handles the residual surge that survives the upstream device, providing further reduction of the let-through voltage at the equipment terminals. Cascade requires coordination via manufacturer tables to avoid let-through that exceeds the downstream device's rating.",
      "Site rules on which categories of access equipment are permitted (e.g. ladders only with PC permission), the inspection / Form 91 regime for towers and MEWPs, the storage and overnight security arrangements for kit (so unauthorised use is prevented), the permit-to-work systems for any specialised access work (rope access, suspended platforms), and the chain of authorisation for hire-in equipment. CDM 2015 Reg 13 makes this part of the principal contractor's induction duty.",
      "NICEIC scheme action — non-conformance notice, possible suspension, possible removal from the scheme. Removal from the CPS means: no more self-certification under Part P, customers' insurance defences weakened, marketing claims (logo, badge) withdrawn, and frequently insurer-driven loss of public liability cover. The job stays civil, but the firm's ability to trade collapses.",
    ],
    correctIndex: 1,
    explanation:
      "SPD cascade matches the energy-handling capability to the role: Type 1 (or Type 1+2 combined) at the origin diverts the bulk of the transient energy from a direct-strike or induced surge; Type 2 at distribution further reduces the surge voltage that survives; Type 3 at sensitive equipment trims the residual to a level the equipment can withstand. Each downstream device must be rated to handle the let-through from its upstream device — manufacturer cascade tables specify the maximum cable length between SPDs (decoupling distance) so the downstream device does not see voltage above its Up. Without the decoupling distance, both devices may activate but the downstream device sees a higher let-through than its rating.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Section 443 of BS 7671 A4:2026 sets the requirement for surge protection on a:",
    options: [
      "Because the retail trading hours can't be disrupted. Floor lifts, ceiling tile removal, dust generation and circuit isolation all interfere with shoppers and staff. Out-of-hours work (typically 8pm to 6am for high-street retail) lets the work proceed without affecting trade. Prep includes agreed access times, security pass arrangements, fire-alarm coordination (if temporary detector covers are needed) and a formal hand-back at end of shift.",
      "Consequence-based assessment — the designer assesses the consequences of an overvoltage event and provides protection where the assessment indicates it is needed. Reg 443.4.1 lists two active 'shall provide' consequences (serious injury or loss of human life; significant financial or data loss); for all other cases protection shall be provided unless the owner declares it is not required because any loss or damage is tolerable and they accept the risk.",
      "Sign in, get a brief visitor induction, wear correct PPE, and be escorted by the Site Manager or a senior member of the contractor\\\\'s team. For a client representative the escort is usually the Project Manager or Site Manager because they\\\\'ll want to talk through progress, snags and any commercial issues.",
      "They allow two independent strings to run at their own MPP. A roof with both an east-facing and a west-facing slope gets one string per slope, each tracked independently — the east string MPPs in the morning, the west string MPPs in the afternoon, and the inverter combines the AC outputs. Without dual-MPPT, mixing east and west panels in one string forces a compromise MPP that wastes 10-20% of the available energy. Many domestic UK installs benefit from dual-MPPT given typical roof geometries.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 443 in BS 7671 A4:2026 uses a consequence-based decision procedure. Reg 443.4.1 lists the consequences where transient overvoltage protection 'shall be provided': (a) serious injury to, or loss of, human life; (c) significant financial or data loss. Limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases, protection shall be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk of damage to equipment and any consequential loss. The L3 designer documents the assessment on the design pack — protection provided / not provided, with the reasoning.",
  },
  {
    id: 2,
    question: "Type 1 SPDs are characterised by:",
    options: [
      "Describe: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The last three invoices were paid 30+ days late.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" Express: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I value our relationship, but late payment creates cash flow difficulties.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" Specify: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I need invoices paid within 14-day terms.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" Consequences: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This allows me to continue prioritising your work\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"",
      "As a complete printed pack at handover plus PDF emailed for their records — they need it for any future EICR (so the inspector can compare current readings against the original), any property sale (solicitors increasingly require current EIC), any insurance claim (proof of certification at the time of an incident), any warranty claim on installed equipment.",
      "Capability to handle the 10/350 microsecond impulse waveform — partial direct-lightning current. Required at the installation origin where the building has an external lightning protection system (LPS) per BS EN 62305-3 or where direct-strike risk to the supply exists. Higher Iimp rating, higher Up than Type 2 / 3.",
      "For minor additions or alterations to an existing circuit (e.g. adding a single socket on an existing ring) that do NOT require a new circuit. New circuits, CU replacements and major alterations require an EIC + Schedule of Inspections + STR.",
    ],
    correctAnswer: 2,
    explanation:
      "Type 1 SPDs handle partial direct lightning currents — the 10/350 microsecond impulse waveform that represents direct strike injection into the supply. They are characterised by an Iimp rating (typically 12.5 kA, 25 kA per pole on common modules) and are required at the installation origin where direct-strike risk exists (LPS per BS EN 62305-3, or specific exposed supply arrangements). Type 1 SPDs typically have higher protection level Up than Type 2, so a Type 2 (or Type 3) is added downstream where lower let-through is needed for sensitive equipment.",
  },
  {
    id: 3,
    question: "Type 2 SPDs are characterised by:",
    options: [
      "Internal = report within your firm to the responsible person (H&S manager, contracts manager, director). External = report to a regulator (HSE for H&S, Environment Agency for pollution, local authority for some EHO matters, scheme body like NICEIC for installation defects). Most issues need both — internal first, then the firm\\\\\\\\'s responsible person decides on external.",
      "Avoid working at height where reasonably practicable; if unavoidable, use collective protection (scaffold, MEWP, edge protection); if collective inadequate, use personal fall protection (harness + lanyard + anchor); minimise distance and consequences of falls.",
      "A digital, structured record of design decisions, materials, products and safety-critical information that is created at design stage, maintained through construction, and handed over to the Accountable Person for the lifetime of the building.",
      "Capability to handle the 8/20 microsecond impulse waveform — induced surges from nearby strikes, switching transients on the supply, transients propagated from the network. Standard at the installation origin / main distribution board on most installations without LPS, characterised by an In and Imax rating in the 5-40 kA range.",
    ],
    correctAnswer: 3,
    explanation:
      "Type 2 SPDs handle induced surges from nearby strikes and switching transients — the 8/20 microsecond impulse waveform. Common In ratings 5-20 kA per pole, Imax ratings 10-40 kA per pole. Type 2 is the standard SPD at the installation origin / main distribution board on installations without LPS and direct-strike risk. Lower Up than Type 1, so the let-through voltage at downstream equipment is lower. Many modern devices are 'Type 1+2 combined' — handle both 10/350 and 8/20 waveforms in a single module, used at the origin where LPS is present.",
  },
  {
    id: 4,
    question: "Type 3 SPDs are typically located:",
    options: [
      "Close to specific sensitive equipment — usually within a few metres of the equipment terminals (server cabinet, medical equipment, AV / studio gear, specialised electronic plant). Provides the final stage of cascade reduction; typically combined with Type 2 upstream.",
      "Apply SLAM: stop the current activity, look for the source of the smell, assess whether it indicates a new hazard (overheating, insulation failure), and manage by withdrawing if necessary, de-energising the panel if safe to do so, and reporting the finding",
      "That the service is performed with 'reasonable care and skill'. This is a statutory implied term that can't be excluded by your terms and conditions. If the work falls below the standard a competent electrician would deliver, the customer has a right to repeat performance or a price reduction under s.55 and s.56.",
      "Discarded smoking materials (cigarettes, matches, lighters) remain a fire cause, particularly in areas with poor housekeeping, near flammable materials, or where smoking policies are not enforced",
    ],
    correctAnswer: 0,
    explanation:
      "Type 3 SPDs are point-of-use devices — installed close to the equipment they protect (within typically 5-10 metres of the equipment terminals). They handle smaller residual surges that survive upstream Type 1 / Type 2 protection. Common form factors: socket-outlet integrated, dedicated DIN-rail near the load, plug-in surge strips for IT / AV equipment. Type 3 alone is not sufficient — the cascade requires upstream Type 2 (or Type 1+2) at the origin / distribution to handle the bulk of the transient energy.",
  },
  {
    id: 5,
    question: "Reg 443.4.1(a) requires SPD protection where transient overvoltage:",
    options: [
      "It tells you the appliance has been double-insulated by the manufacturer to provide protection without relying on a CPC — so you don’t add an earth wire to the casing thinking you’re improving safety.",
      "Could result in serious injury to, or loss of, human life. This is the headline mandatory case — life-safety circuits, medical premises, fire alarm and detection systems. SPD protection shall be provided regardless of installation type or location.",
      "It works best when the original failure was not caused by negligence, the recovery is swift and genuine, and the client perceives the effort as exceptional — it does not apply to repeated failures or serious safety issues",
      "To provide a complete record of all maintainable assets including their location, criticality, technical specifications, maintenance history, and spare parts, enabling effective maintenance planning",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 443.4.1(a) is the life-safety case — transient overvoltage protection 'shall be provided' where the consequence of an overvoltage could be serious injury to, or loss of, human life. This applies regardless of installation type or location: hospitals, care homes, hazardous areas, life-safety circuits, fire alarm systems, emergency lighting feeders. The designer cannot weigh cost-benefit on (a); it is mandatory. The only other active consequence is (c) significant financial or data loss; limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum (May 2023). For all other cases protection shall be provided unless the owner declares it is not required because any loss or damage is tolerable and they accept the risk.",
  },
  {
    id: 6,
    question: "The voltage protection level Up of an SPD describes:",
    options: [
      "Twist the strands tightly, insert fully into the ferrule, and crimp with the correct tool using the matching die — verify the ferrule is correctly shaped with no strand visible outside the ferrule",
      "A notice served by the fire authority requiring the responsible person to notify them before making changes to the premises or its use that could increase fire risk or affect fire safety measures",
      "The maximum let-through voltage at the SPD terminals during a surge — the voltage that the equipment downstream actually sees through the SPD. Lower Up = better protection. Manufacturer's Up is measured at a specified test current.",
      "It connects to the metal casing of the heater. The casing is an exposed-conductive-part — Class I equipment requires CPC connection so a fault from the heating element to the casing causes fault current to flow back through the CPC and trip the protective device.",
    ],
    correctAnswer: 2,
    explanation:
      "Up is the voltage protection level — the maximum voltage that survives across the SPD terminals during a surge of the SPD's rated current. Equipment connected downstream sees this Up plus any voltage induced by the SPD's connecting conductor inductance (which is why short conductor lengths matter — the cable inductance adds to the let-through voltage). Lower Up = better protection. Type 1 typically Up 1.5-4 kV; Type 2 typically Up 1.0-2.5 kV; Type 3 typically Up 0.6-1.5 kV. Match the cascade Up to the downstream equipment's overvoltage withstand category (Category I, II, III, IV per Reg 443.5).",
  },
  {
    id: 7,
    question: "Per Reg 534.4.8, the conductor length between the SPD and the live and earth busbars should be:",
    options: [
      "Workers making a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"qualifying disclosure\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" — a disclosure of information that the worker reasonably believes shows malpractice, including criminal offences, breach of legal obligations, miscarriage of justice, danger to health and safety, environmental damage. Protects from detriment and dismissal.",
      "The immediate priority is to open the airway using a jaw thrust (rather than head tilt) to minimise spinal movement, and commence CPR if no breathing is detected — the need to resuscitate overrides the spinal precaution to avoid movement",
      "Contact the distribution network operator to discuss options including isolation or diversion; install goal posts and physical barriers to define the safe zone; use a banks person; and restrict boom operation with a rated capacity limiter",
      "Kept as short as practicable — typically less than 0.5 m total combined connection length (live to SPD, SPD to earth). The conductor inductance adds to the SPD's let-through voltage at the high frequencies of a transient surge; long leads can effectively bypass the SPD.",
    ],
    correctAnswer: 3,
    explanation:
      "Conductor inductance is the silent SPD killer. At the high frequencies present in a transient surge (kHz to MHz range), conductor inductance produces significant voltage drop — even a few metres of cable can add hundreds of volts to the let-through voltage at the equipment. Reg 534.4.8 requires conductor lengths to be kept as short as practicable; design practice is less than 0.5 m total combined live-to-SPD plus SPD-to-earth. For SPDs that cannot be installed close to the busbars, use the manufacturer's V-connection method (loop the live conductor through the SPD body) to minimise the inductive path.",
  },
  {
    id: 8,
    question: "On a domestic CU upgrade with no LPS, no overhead supply, and no specific Section 443.4 trigger, the L3 designer's SPD position is:",
    options: [
      "Apply the Reg 443 risk assessment. For most owner-occupied dwellings the assessment outcome is 'protection recommended' rather than mandatory. Present the case to the customer — Type 2 SPD at the consumer unit protects connected appliances against induced surges and switching transients — and let them decide. Cost is modest (typically £80-£200 for a Type 2 device including labour) and the protection benefit is real for households with sensitive electronics.",
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
      "The ECA is a trade body — voluntary membership organisation representing contractors' commercial interests, providing technical / commercial / legal support, lobbying, training and standard-form contracts. The JIB is the joint employer/union body that sets pay, conditions and grading on JIB-affiliated jobs. ECA members typically apply JIB rules but the bodies are separate. SELECT plays a similar (but distinct) role for the contracting industry in Scotland.",
      "To enable the customer to operate the install correctly, recognise fault conditions, perform any user-level routine checks (e.g. weekly fire-alarm test) and know when to call you back. Without them the customer can't discharge their own legal duties (e.g. fire-alarm log under the Regulatory Reform (Fire Safety) Order 2005) and is more likely to mis-use or under-maintain the kit.",
    ],
    correctAnswer: 0,
    explanation:
      "For cases not covered by the Reg 443.4.1 consequence limbs, protection shall be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk. Most owner-occupied domestic installations fall outside the active triggers (no serious injury or loss of human life from a transient on a standard residential circuit, no significant financial or data loss). The outcome is therefore 'protection recommended unless the owner declares the loss tolerable' rather than absolutely mandatory. Present the case to the customer: Type 2 SPD at the CU costs £80-£200 typical, protects all connected appliances against induced surges (a near-miss lightning strike on the local network can damage thousands of pounds of electronics on a single transient). Most informed customers accept the protection on a CU upgrade.",
  },
];

const faqs = [
  {
    question: "What is the difference between Type 1, 2 and 3 SPDs in plain language?",
    answer:
      "Think of three lines of defence. Type 1 sits at the front door — handles direct lightning current that comes in via the supply or via a building's lightning protection system (LPS). Heavy-duty, high discharge current capability, higher let-through voltage Up. Type 2 sits at the main distribution — handles induced surges from nearby strikes and switching transients on the supply network. Standard at the consumer unit / main distribution board on most installations. Type 3 sits at sensitive equipment — handles the residual surge that survives upstream protection. Used in addition to (not instead of) Type 1 and / or Type 2. The cascade matches energy-handling to role: Type 1 takes the brunt, Type 2 reduces the survivor, Type 3 trims the residual at the equipment.",
  },
  {
    question: "Do I need a Type 1 SPD on a typical commercial fit-out?",
    answer:
      "Usually only if the building has an external lightning protection system (LPS) per BS EN 62305-3, or if there is a specific direct-strike risk to the supply (overhead service, exposed building, high keraunic-level area without LPS). Without those triggers, Type 2 at the origin / main board is the standard answer. For most typical urban / suburban commercial fit-outs in the UK there is no LPS and the Type 2 specification is correct. Always confirm by walking the site — an LPS is visible (down-conductors, air-rods, earth electrode network, equipotential bonding to the structural steel) and is recorded on the building's structural / fire-safety drawings.",
  },
  {
    question: "How does the Reg 443.4.1 'shall be provided' wording differ from Reg 443.5?",
    answer:
      "Reg 443.4.1 sets the consequence cases — (a) serious injury to, or loss of, human life; and (c) significant financial or data loss (limb (b) was deleted by the BS 7671:2018+A2:2022 Corrigendum, May 2023). Where either applies, SPDs 'shall be provided'. For all other cases protection shall be provided unless the owner declares it is not required because any loss or damage is tolerable and they accept the risk. Reg 443.5 then gets into the detail of how the protection is selected and installed — the impulse withstand voltage categories of equipment (I, II, III, IV — each with a specified withstand voltage at the supply nominal), how to match the SPD's Up to the downstream equipment category, the requirement to coordinate cascade. Reg 443.4.1 says 'protect or not'; Reg 443.5 says 'how to protect'. The L3 designer reads both and produces a design that satisfies both.",
  },
  {
    question: "What is the impulse withstand voltage category and where does it come from?",
    answer:
      "BS 7671 (and BS EN 60664-1, the underlying standard) classifies equipment by its ability to withstand transient overvoltage at the supply nominal: Category I = lowest withstand (sensitive electronic equipment, intended to be protected by upstream SPD), Category II = standard appliances (kitchen kit, lighting, sockets), Category III = distribution equipment (main switches, distribution boards), Category IV = origin / supply equipment (DNO cut-out, supply tail terminations). For a 230 V supply the typical withstand voltages are 1.5 kV (I), 2.5 kV (II), 4 kV (III), 6 kV (IV). The L3 designer matches the SPD's Up to the protected equipment's category — for example a Type 2 SPD with Up of 1.5 kV protects Category II equipment well; for Category I sensitive electronics, add a Type 3 close to the equipment to bring Up below 1.5 kV at the equipment terminals.",
  },
  {
    question: "Where in the consumer unit do I install the SPD?",
    answer:
      "On the supply side of the main switch is preferred — the SPD then protects the entire installation including the main switch itself and the busbars. Some manufacturers' consumer units are designed with a dedicated SPD location next to the main switch, with short tails to the live and earth busbars and a fuse / MCB for SPD overcurrent protection (the SPD has a finite end-of-life and may fail short on heavy duty). Where the SPD must be on the load side of the main switch (because the unit is designed that way), make the conductor lengths as short as possible (less than 0.5 m total combined) and use the SPD manufacturer's V-connection method where applicable. Always include the dedicated SPD overcurrent protection per the SPD manufacturer's specification — typically a 25 A or 32 A MCB or fuse.",
  },
  {
    question: "Do SPDs have a service life and how do I check?",
    answer:
      "Yes, SPDs have a finite service life. They degrade with each significant surge they handle, and they may eventually fail in either of two modes: open (no longer providing protection) or short (drawing continuous current, eventually tripping their dedicated overcurrent protection). All BS EN 61643 SPDs have a status indicator — typically a window showing green (working) or red (end-of-life), or an LED on more modern devices. Check the indicator at every periodic inspection and at customer handover, and demonstrate to the customer how to read it. Replacement SPDs are sold as spare modules that plug into the same DIN base, so replacement is simple and does not require removing the base or re-terminating conductors. End-of-life SPD is a periodic inspection finding (typically C2 if the SPD function is intended to provide active protection that is now absent).",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 4"
            title="SPD selection — Type 1, 2, 3 cascade"
            description="Surge protective device design — BS EN 61643 product standard, Section 443 risk-based selection, Section 534 installation rules. Type 1 at the origin for direct lightning, Type 2 at distribution for induced surges, Type 3 at sensitive equipment. Cascade and protection design for the L3 mixed installation."
            tone="amber"
          />

          <TLDR
            points={[
              "Section 443 of BS 7671 A4:2026 uses a consequence-based decision procedure. Reg 443.4.1 sets two consequence triggers (serious injury or loss of human life; significant financial or data loss); for all other cases protection shall be provided unless the owner declares it is not required because the loss or damage is tolerable.",
              "Three SPD types in cascade: Type 1 at the origin for partial direct-lightning current (10/350 microsecond impulse, required where LPS is present); Type 2 at distribution for induced surges (8/20 microsecond impulse, standard); Type 3 close to sensitive equipment for residual surge.",
              "Section 534 sets installation rules: minimum protective conductor CSA per Reg 534.4.10 (6 mm² for Type 2, 16 mm² for Type 1 at origin), conductor length less than 0.5 m total per Reg 534.4.8 (inductance kills SPD performance at surge frequencies).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the Section 443 consequence-based decision procedure to determine whether SPDs are required on an installation.",
              "Identify the Reg 443.4.1 consequence triggers (serious injury or loss of human life; significant financial or data loss) and explain the difference between mandatory protection and the owner-declaration route for all other cases.",
              "Distinguish Type 1, Type 2 and Type 3 SPDs by their characteristic impulse waveform, location in the cascade and typical protection level Up.",
              "Apply BS EN 61643 product standard requirements when specifying SPDs on the design schedule.",
              "Apply Section 534 installation rules — protective conductor CSA per Reg 534.4.10, conductor length per Reg 534.4.8, dedicated overcurrent protection for the SPD.",
              "Design an SPD cascade for a typical mixed installation matching SPD Up to the downstream equipment's impulse withstand category (Category I, II, III, IV per BS EN 60664-1 / Reg 443.5).",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why SPDs matter — the transient overvoltage problem"
            plainEnglish="A near-miss lightning strike on a power line a few hundred metres away can drive a kilovolt transient through your supply. Every connected appliance sees it. Without SPDs, several thousand pounds of electronics can fail in one strike."
            onSite="The most common SPD claim is not direct lightning — it is induced surge from a network event a few miles away. Sensitive electronics fail (router, NAS, AV system, smart-home controller); the customer is bewildered; the insurer asks why there was no SPD."
          >
            <p>
              Transient overvoltages on the LV supply come from three sources:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct lightning strike</strong> — to the supply network, to an overhead
                service, to the building's external lightning protection system (LPS) where
                present. Magnitude: tens of kV, tens of kA, characteristic 10/350 microsecond
                impulse waveform. Rare event but extreme energy.
              </li>
              <li>
                <strong>Induced lightning surge</strong> — from a strike a few hundred metres to a
                few kilometres away. Magnetic coupling into the supply network induces a transient
                surge that propagates through the network. Magnitude: hundreds of volts to a few
                kV, characteristic 8/20 microsecond impulse waveform. Far more common than direct
                strikes; the dominant cause of equipment damage on most UK installations.
              </li>
              <li>
                <strong>Switching transients</strong> — from network operations (capacitor bank
                switching, transformer switching, fault clearance, motor starting). Magnitude:
                hundreds of volts, characteristic 8/20 microsecond or longer waveforms.
              </li>
            </ul>
            <p>
              Sensitive electronics — switchmode power supplies in IT equipment, AV gear,
              smart-home controllers, LED drivers, washing-machine and dishwasher control boards
              — fail when the supply voltage exceeds the equipment's impulse withstand voltage
              (typically 1.5 kV for Category I sensitive electronics, 2.5 kV for Category II
              standard appliances). SPDs clamp the voltage that reaches the equipment to within
              the withstand category, preventing the cascade of failures.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 443.4.1 (Transient overvoltages due to the effects of indirect lightning strokes)"
            clause="Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in: (a) serious injury to, or loss of, human life; (b) [Deleted by BS 7671:2018+A2:2022, Corrigendum (May 2023)]; (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares it is not required due to any loss or damage being tolerable and they accept the risk of damage to equipment and any consequential loss."
            meaning={
              <>
                Reg 443.4.1 sets the consequence-based cases for SPD provision. There are two
                active limbs — (a) serious injury to, or loss of, human life, and (c) significant
                financial or data loss; limb (b) was deleted by the BS 7671:2018+A2:2022
                Corrigendum (May 2023). Where (a) or (c) applies, SPDs shall be provided — no
                cost-benefit, just protection. For all other cases, protection shall be provided
                unless the owner of the installation declares it is not required because any loss
                or damage is tolerable and they accept the risk. The L3 designer documents the
                assessment on the design pack — the consequence limbs checked with yes / no and
                reasoning, any owner declaration for the residual case, the conclusion 'protection
                provided / not provided' with the SPD specification or the reason for omission.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 44, Section 443, Regulation 443.4.1."
          />

          <SectionRule />

          <ContentEyebrow>The three SPD types and the cascade</ContentEyebrow>

          <ConceptBlock
            title="Type 1 SPD — origin / direct-lightning"
            plainEnglish="Front line. Handles direct-strike current via the supply or LPS. Required where the building has its own LPS (BS EN 62305-3) or has a direct overhead supply with strike risk."
          >
            <p>
              Type 1 SPD characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Handles 10/350 microsecond impulse waveform (direct-lightning partial current).</li>
              <li>Iimp rating typically 12.5 kA, 25 kA per pole on common modules.</li>
              <li>Up typically 1.5-4 kV — higher let-through than Type 2; downstream Type 2 / 3 needed for sensitive equipment.</li>
              <li>Uc (maximum continuous operating voltage) per pole — typically 275 V or 350 V for 230 V single-phase supplies; matched to the supply earthing arrangement (TN-S, TN-C-S, TT — different combinations use different SPD modes).</li>
              <li>Located at the installation origin, supply-side of the main switch where possible.</li>
              <li>Mandatory protective conductor minimum 16 mm² copper to the MET (Reg 534.4.10(b)).</li>
              <li>Live connection minimum 6 mm² copper, rated for prospective short-circuit (Reg 534.4.10(d)).</li>
            </ul>
            <p>
              When to specify Type 1: building has external LPS per BS EN 62305-3; building has
              high-exposure overhead supply (rural, exposed location, high keraunic level);
              specific risk assessment indicates direct-strike pathway exists. For most urban /
              suburban installations without LPS, Type 1 is not required and Type 2 at the origin
              is the standard answer. Many manufacturers offer 'Type 1+2 combined' devices that
              handle both 10/350 and 8/20 waveforms in a single module — used at the origin where
              LPS is present, replacing separate Type 1 and Type 2 devices.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type 2 SPD — distribution / induced surges"
            plainEnglish="Standard SPD at the installation origin / main board on most installations without LPS. Handles induced surges and switching transients."
          >
            <p>
              Type 2 SPD characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Handles 8/20 microsecond impulse waveform (induced surges, switching transients).</li>
              <li>In (nominal discharge current) typically 5-20 kA per pole; Imax (maximum discharge current) typically 10-40 kA per pole.</li>
              <li>Up typically 1.0-2.5 kV — lower let-through than Type 1; suitable to protect Category II / III equipment.</li>
              <li>Uc per pole matched to supply (typically 275 V for 230 V single-phase TN systems).</li>
              <li>Located at the installation origin / main distribution board, supply-side of the main switch where possible.</li>
              <li>Mandatory protective conductor minimum 6 mm² copper to the MET (Reg 534.4.10(a)).</li>
              <li>Live connection minimum 2.5 mm² copper, rated for prospective short-circuit (Reg 534.4.10(c)).</li>
              <li>Dedicated overcurrent protection per the SPD manufacturer's specification (typically a 25 A or 32 A MCB or HRC fuse).</li>
            </ul>
            <p>
              When to specify Type 2: most installations without LPS. Standard fit where a
              Reg 443.4.1 consequence applies — care homes, HMOs and clinical premises engage the
              (a) serious injury / loss of human life limb; commercial premises with valuable data
              or business continuity engage the (c) significant financial or data loss limb. On
              owner-occupied domestic, none of the active consequence limbs is usually triggered,
              so protection shall be provided unless the owner declares it is not required because
              the loss or damage is tolerable — present the case to the customer and let them
              decide.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type 3 SPD — sensitive equipment / final stage"
            plainEnglish="Point-of-use device near the equipment it protects. Final stage of the cascade. Used in addition to upstream Type 2 (or Type 1+2)."
          >
            <p>
              Type 3 SPD characteristics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Handles small residual surges that survive upstream protection.</li>
              <li>In typically 1-5 kA per pole; intended for the smaller residual rather than the bulk transient.</li>
              <li>Up typically 0.6-1.5 kV — lowest let-through, suitable to protect Category I sensitive electronics.</li>
              <li>Located close to sensitive equipment — within typically 5-10 metres of the equipment terminals.</li>
              <li>Form factors: socket-outlet integrated, dedicated DIN-rail near the load, plug-in surge strips for IT / AV equipment.</li>
              <li>Type 3 alone is not sufficient — requires upstream Type 2 (or Type 1+2) at the origin to handle the bulk of the transient energy. A Type 3 hit by a full surge would fail at first event.</li>
            </ul>
            <p>
              When to specify Type 3: server cabinets, NAS / video-surveillance rack, medical
              equipment in clinical premises, AV / studio gear in production environments,
              specialised electronic plant where the equipment's impulse withstand is below 1.5 kV
              and the cascade Up at that point would otherwise exceed the withstand. Standard
              residential and commercial installations normally do not need Type 3 — Type 2 at
              the consumer unit / main board is sufficient for the typical Category II equipment
              load.
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

          <ContentEyebrow>Section 534 installation rules</ContentEyebrow>

          <ConceptBlock
            title="Reg 534.4.10 — protective conductor sizing"
            plainEnglish="The PE conductor between SPD and MET has a minimum CSA. Smaller than 6 mm² (Type 2) or 16 mm² (Type 1) at the origin defeats the SPD."
          >
            <p>
              Reg 534.4.10 sets the minimum protective conductor cross-sectional areas for SPDs
              installed at or near the origin of the installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reg 534.4.10(a)</strong> — Type 2 SPD: protective conductor minimum 6 mm² copper or equivalent.</li>
              <li><strong>Reg 534.4.10(b)</strong> — Type 1 SPD: protective conductor minimum 16 mm² copper or equivalent.</li>
              <li><strong>Reg 534.4.10(c)</strong> — Type 2 SPD: live connection conductor minimum 2.5 mm² copper, rated to withstand the prospective short-circuit current.</li>
              <li><strong>Reg 534.4.10(d)</strong> — Type 1 SPD: live connection conductor minimum 6 mm² copper, rated to withstand the prospective short-circuit current.</li>
            </ul>
            <p>
              The protective conductor is the path the SPD's discharge current takes to earth.
              Undersizing it raises the impedance and the let-through voltage at the SPD terminals
              — defeating the SPD function. The 6 mm² and 16 mm² minimums are the floor; longer
              runs or higher let-through capability may justify upsizing further. The live
              connection conductor must be rated for the prospective short-circuit current at the
              SPD location because the SPD's overcurrent protection (the MCB or fuse upstream of
              the SPD) must be able to clear a short-circuit fault on the SPD itself without
              damaging the live conductor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 534.4.10 (Connecting conductors of SPDs at origin)"
            clause="Conductors between SPDs and the main earthing terminal or the protective conductor shall have a cross-sectional area not less than: (a) 6 mm² copper or equivalent for Type 2 SPDs installed at or near the origin of the installation; (b) 16 mm² copper or equivalent for Type 1 SPDs installed at or near the origin of the installation. Conductors connecting SPDs and the OCPDs to live conductors shall have a cross-sectional area not less than: (c) 2.5 mm² copper or equivalent for Type 2 SPDs installed at or near the origin of the installation; (d) 6 mm² copper or equivalent for Type 1 SPDs installed at or near the origin of the installation, and shall be rated to withstand the prospective short-circuit current to be expected."
            meaning={
              <>
                Reg 534.4.10 sets two distinct CSA requirements on the SPD installation:
                protective conductor (SPD to MET / PE) minimum 6 mm² for Type 2 or 16 mm² for
                Type 1 at the origin; live connection (SPD to OPD to live busbar) minimum 2.5 mm²
                for Type 2 or 6 mm² for Type 1 at the origin. The CSA floors apply at the origin;
                downstream SPDs (cascade Type 2 at sub-distribution boards, Type 3 at point-of-
                use) may use smaller CSAs per the SPD manufacturer's installation instructions.
                The live connection must additionally be rated for the prospective short-circuit
                current — the SPD's dedicated OPD must be able to clear a fault on the SPD itself
                without damaging the connecting conductor.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Section 534, Regulation 534.4.10(a) (b) (c) (d)."
          />

          <ConceptBlock
            title="Reg 534.4.8 — connection length"
            plainEnglish="Conductor inductance kills SPD performance at high frequencies. Keep total live-to-SPD plus SPD-to-earth length under 0.5 m where possible."
            onSite="The most common SPD install error: long flying leads up to the SPD and back down to the earth busbar. The cable inductance adds hundreds of volts to the let-through. The SPD looks installed but does not protect."
          >
            <p>
              At the high frequencies present in a transient surge (kHz to MHz range), conductor
              inductance produces significant voltage drop. Even a few metres of cable can add
              hundreds of volts to the let-through voltage seen by downstream equipment. Reg
              534.4.8 therefore requires the connecting conductors between the live, SPD and
              earth to be kept as short as practicable.
            </p>
            <p>
              Practical limits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total combined length (live to SPD + SPD to earth) less than 0.5 m where possible.</li>
              <li>Where short straight runs are not achievable, use the SPD manufacturer's V-connection method (loop the live conductor through the SPD body so the live current and the SPD discharge current share part of the path).</li>
              <li>For SPDs in dedicated SPD enclosures alongside the main switch, the manufacturer's recommended layout typically achieves the under-0.5 m total without specific design effort.</li>
              <li>Avoid coiled conductors, sharp bends, or routing the SPD discharge conductor parallel to live conductors over long distances — all increase inductance.</li>
            </ul>
            <p>
              The single biggest install-quality issue with SPDs is excessive connection length.
              The SPD looks fitted, the indicator shows green, but the let-through at the
              equipment is much higher than the SPD's quoted Up because the inductive voltage
              drop on the connecting conductors dominates the circuit at surge frequencies. The
              L3 designer specifies the SPD location (close to the busbars) and the maximum
              permissible connection length on the schedule, and the installer follows it. Both
              roles are accountable for the install quality.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cascade design and Up coordination</ContentEyebrow>

          <ConceptBlock
            title="Cascade — energy hand-off between SPDs"
            plainEnglish="Type 1 takes the brunt; Type 2 reduces the survivor; Type 3 trims the residual at the equipment. Each downstream device must be rated for the let-through from upstream — coordinated by manufacturer cascade tables."
          >
            <p>
              SPD cascade is the technique of placing multiple SPD types in series (with electrical
              decoupling distance between them) to progressively reduce the let-through voltage at
              each stage. The cascade matches energy handling to role:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1 — Type 1 (or Type 1+2 combined) at the origin</strong> — diverts
                the bulk of the transient energy to earth. Let-through at SPD terminals: Up
                typically 1.5-4 kV.
              </li>
              <li>
                <strong>Stage 2 — Type 2 at distribution</strong> — reduces the surviving surge.
                Decoupling distance from Stage 1 typically greater than 10 m of cable inductance,
                or via a dedicated decoupling inductor. Let-through at Stage 2 SPD terminals: Up
                typically 1.0-2.5 kV.
              </li>
              <li>
                <strong>Stage 3 — Type 3 at sensitive equipment</strong> — trims the residual
                surge to a level the equipment can withstand. Decoupling distance from Stage 2
                typically greater than 5 m of cable inductance. Let-through at Stage 3 SPD
                terminals: Up typically 0.6-1.5 kV.
              </li>
            </ul>
            <p>
              Without the decoupling distances both devices may operate but the downstream device
              sees a higher let-through than its rating, defeating the cascade and potentially
              damaging the downstream device. Manufacturer cascade tables specify the maximum
              permissible cable lengths between SPDs and the resulting let-through at each stage;
              the L3 designer cites the cascade table on the design schedule and the installer
              follows the cable lengths.
            </p>
            <p>
              On a typical commercial fit-out the cascade is two-stage: Type 1+2 (or Type 2 alone
              if no LPS) at the origin, plus Type 2 (or sometimes Type 3) at sub-distribution
              boards serving sensitive equipment groups. On a typical residential CU the cascade
              is single-stage: Type 2 at the consumer unit only.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Up matching to equipment impulse withstand category"
            plainEnglish="Equipment is classified by what overvoltage it can survive. Match the SPD let-through Up to the equipment category."
          >
            <p>
              BS EN 60664-1 (referenced in Reg 443.5) classifies equipment by impulse withstand
              voltage category at the supply nominal:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category I</strong> — sensitive electronics intended to be protected by upstream SPD. Typical withstand at 230 V supply: 1.5 kV. Examples: small electronics, communication equipment, instrumentation.</li>
              <li><strong>Category II</strong> — standard appliances and equipment connected to the fixed installation. Typical withstand: 2.5 kV. Examples: kitchen kit, lighting, sockets, most domestic and commercial appliances.</li>
              <li><strong>Category III</strong> — distribution equipment and equipment downstream of the origin. Typical withstand: 4 kV. Examples: main switches, distribution boards, switchgear in the installation.</li>
              <li><strong>Category IV</strong> — equipment at the origin / supply side. Typical withstand: 6 kV. Examples: DNO cut-out equipment, supply head terminations, intake fuses.</li>
            </ul>
            <p>
              The L3 designer chooses SPDs such that the let-through Up at the equipment terminals
              is at or below the equipment's category withstand. For Category II equipment (most
              residential and commercial appliances) a Type 2 SPD with Up in the 1.0-2.5 kV range
              is sufficient. For Category I sensitive equipment (server rack, AV studio gear),
              cascade with a Type 3 close to the equipment to bring Up below 1.5 kV. The schedule
              records the protected equipment category and the SPD Up against each row.
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

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Specifying Type 1 on a domestic CU because 'bigger is better'"
            whatHappens={
              <>
                You spec a Type 1+2 combined SPD on a domestic consumer unit upgrade where the
                building has no LPS and no overhead direct-strike risk path. The customer pays
                three times the price of a Type 2 device for protection capability they will
                never use. Worse, the higher Up of the Type 1+2 means the let-through at the
                customer's appliances is higher than a plain Type 2 would have provided —
                inferior protection at higher cost.
              </>
            }
            doInstead={
              <>
                Match the SPD type to the threat. Type 1 is for direct-strike risk paths — LPS
                per BS EN 62305-3, exposed overhead supply, specific high-exposure scenarios.
                For most domestic and small commercial installations without LPS, Type 2 at the
                origin is correct — lower Up, lower cost, better protection for the actual
                threat (induced surges and switching transients). Read the building, read the
                supply, read the keraunic exposure, then specify.
              </>
            }
          />

          <CommonMistake
            title="Long flying leads on the SPD install"
            whatHappens={
              <>
                The installer fits a Type 2 SPD on a free DIN-rail position 30 cm away from the
                main switch and earth busbar. Live and earth connections are made with 1.5 m
                conductors looped around the consumer unit interior. The SPD's quoted Up is 1.5
                kV but the actual let-through at the equipment is over 3 kV because the conductor
                inductance adds 1.5 kV at surge frequencies. A surge event damages a connected
                appliance even though the SPD operated. The customer is told 'the SPD did its
                job' but the equipment is still broken.
              </>
            }
            doInstead={
              <>
                Specify the SPD location on the schedule — adjacent to the main switch, with
                conductor lengths specified less than 0.5 m total combined. Use the SPD
                manufacturer's recommended consumer unit position (most modern consumer units
                have a dedicated SPD location). For retrofits where the existing CU has no SPD
                position, use a separate SPD enclosure mounted next to the CU with short tails to
                the live and earth, rather than fitting the SPD inside the CU with long flying
                leads. The let-through voltage seen by downstream equipment depends critically on
                the install quality.
              </>
            }
          />

          <Scenario
            title="Domestic CU upgrade — SPD specification with EV charger and PV"
            situation={
              <>
                Same brief as Sub 3.1, 3.2 and 3.3. New consumer unit with EV charger, PV inverter
                output, heat pump and domestic load. TN-C-S supply, no LPS, suburban location.
                Customer values their AV and IT equipment (modest server / NAS, multi-room AV
                system, smart-home controllers).
              </>
            }
            whatToDo={
              <>
                Apply Section 443. Neither Reg 443.4.1(a) (serious injury or loss of human life)
                nor (c) (significant financial or data loss) is engaged on a single
                owner-occupied dwelling, so protection shall be provided unless the owner declares
                it is not required because the loss or damage is tolerable. Sensitive AV / IT
                equipment is present, supply-network induced surges are plausible, and the cost of
                replacement equipment in the event of a strike near-miss is substantial — so the
                owner is unlikely to declare the loss tolerable. Outcome: protection recommended.
                Specify a Type 2 SPD at the new
                consumer unit, supply-side of the main switch, dedicated 25 A MCB for SPD OPD,
                6 mm² copper protective conductor to the MET (Reg 534.4.10(a)), 2.5 mm² live
                connections (Reg 534.4.10(c)), conductor lengths less than 0.5 m total combined
                (Reg 534.4.8). For the AV / IT equipment cluster, recommend Type 3 socket-outlet
                or plug-in surge strip. Document the Section 443 assessment in the design pack
                and customer-facing summary.
              </>
            }
            whyItMatters={
              <>
                The Section 443 consequence assessment is the L3 designer's discipline. Where a
                Reg 443.4.1 consequence applies, protection is required. Where it does not,
                protection shall still be provided unless the owner declares the loss or damage
                tolerable — and on most informed customer installations the owner does not, so
                the answer is 'protection recommended', particularly with connected sensitive
                electronics. The customer ends up with appropriate
                protection (Type 2 at the CU plus Type 3 at the AV cluster), proper installation
                discipline (short conductors, correct CSA) and documented assessment that
                supports a future periodic inspection or insurance enquiry. This is design
                done well, not over-engineered and not under-engineered.
              </>
            }
          />

          <ConceptBlock
            title="SPD on TT supplies — different mode topology"
            plainEnglish="On a TT supply (rural off-PME) the SPD has to bridge differently between live, neutral, and earth because there is no DNO PEN. Modes-3 SPDs are the typical answer."
          >
            <p>
              SPDs are connected in different configurations (modes) depending on the supply
              earthing arrangement:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN systems (TN-S, TN-C-S)</strong> — common-mode (live-to-PE and
                neutral-to-PE) plus differential-mode (live-to-neutral). Most BS EN 61643 SPDs
                marketed for UK domestic / small commercial are designed for TN with
                appropriate mode arrangement.
              </li>
              <li>
                <strong>TT systems</strong> — separate installation earth electrode, no DNO PEN.
                The SPD must protect against transients arriving via the supply (live, neutral)
                with reference to the local earth electrode rather than a DNO-provided earth.
                Modes-3 SPDs (with live-neutral, live-earth, neutral-earth modes all addressed)
                are typical. Some manufacturers offer 'TT-specific' modules with a higher Uc on
                the neutral-earth mode to handle the higher neutral-to-earth voltage that can
                occur on TT during a fault.
              </li>
              <li>
                <strong>IT systems</strong> — rare on UK LV but encountered in specialist
                installations. SPD selection requires reference to the IT-specific manufacturer
                guidance.
              </li>
            </ul>
            <p>
              The L3 designer specifies the SPD with the supply earthing arrangement on the
              schedule, and the device's nameplate Uc per mode is verified against the supply
              type. Wrong-mode SPDs do not fail catastrophically on the day of install, but
              they may fail prematurely under normal supply-voltage variation, or fail to operate
              correctly on a transient.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="SPD end-of-life and periodic inspection"
            plainEnglish="SPDs degrade with each surge. Status indicator shows green / red. End-of-life is a periodic inspection finding."
          >
            <p>
              All BS EN 61643 SPDs incorporate a status indicator — typically a coloured window
              showing green (working) or red (end-of-life), or an LED on more modern devices. The
              SPD degrades with each significant surge it handles, and may eventually fail in one
              of two modes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open-mode failure</strong> — SPD no longer provides surge protection but
                does not draw any continuous current. The status indicator shows red. The
                installation continues to operate but is unprotected. This is the more common
                end-of-life failure.
              </li>
              <li>
                <strong>Short-mode failure</strong> — SPD develops a short to earth, drawing
                continuous current. The dedicated SPD overcurrent protection (the MCB or fuse
                upstream of the SPD per the manufacturer's specification) operates and disconnects
                the SPD. The status indicator shows red.
              </li>
            </ul>
            <p>
              Periodic inspection should:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Visually inspect the SPD status indicator — record green / red on the schedule of inspections.</li>
              <li>If red — code the finding (typically C2 if the SPD function is intended to provide active protection and is now absent, or C3 if SPD provision was advisory rather than mandatory).</li>
              <li>Verify that the SPD overcurrent protection is in place and not tripped (a tripped OPD on the SPD circuit may mask a short-mode SPD failure).</li>
              <li>Test the SPD test button if provided (some modern devices have a self-test function — operate per the manufacturer's instructions).</li>
            </ul>
            <p>
              Replacement SPDs are sold as plug-in spare modules that fit into the existing DIN
              base, so replacement is straightforward and does not require re-terminating
              conductors. Customer handover should explain the status indicator, where it is, and
              what to do if it shows red — typically 'phone the contractor for a replacement
              module within a few weeks; the supply continues to work but the surge protection
              is not active until replacement'.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 16 (devices for protection against overvoltage)"
            clause={
              <>
                Appendix 16 is identified as &quot;(Informative)&quot; and titled &quot;Devices
                for protection against overvoltage&quot;. It provides guidance material related
                to devices intended to protect installations and equipment from overvoltage
                phenomena. As an appendix, it supplements the body requirements of BS 7671 with
                explanatory or selection guidance for overvoltage protective devices used in
                low-voltage installations.
              </>
            }
            meaning={
              <>
                Surge protective device (SPD) selection draws on the body requirements of Section
                443 plus the informative guidance in Appendix 16. Designers should read the
                appendix when specifying SPDs to confirm device class, location and coordination
                with the rest of the protective scheme.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Appendix 16."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Section 443 of BS 7671 A4:2026 uses a consequence-based decision procedure. Reg 443.4.1 sets two consequence triggers (serious injury or loss of human life; significant financial or data loss — limb (b) deleted by the A2:2022 Corrigendum, May 2023); for all other cases protection shall be provided unless the owner declares it is not required because the loss or damage is tolerable.",
              "Type 1 SPDs handle 10/350 microsecond direct-lightning current — required at the origin where the building has external LPS (BS EN 62305-3) or has direct-strike supply risk. Iimp 12.5-25 kA per pole; Up 1.5-4 kV.",
              "Type 2 SPDs handle 8/20 microsecond induced surges and switching transients — standard at the installation origin / main board on most installations without LPS. In 5-20 kA per pole; Up 1.0-2.5 kV.",
              "Type 3 SPDs are point-of-use devices for sensitive equipment — installed within ~5-10 m of the equipment. Used in addition to upstream Type 2; alone they would fail at first significant event.",
              "Reg 534.4.10 sets minimum conductor CSA at the origin: 6 mm² copper protective for Type 2, 16 mm² copper protective for Type 1; live connections 2.5 mm² (Type 2) or 6 mm² (Type 1) rated for prospective short-circuit.",
              "Reg 534.4.8: SPD connection length less than 0.5 m total combined (live-SPD plus SPD-earth) where possible. Conductor inductance dominates at surge frequencies; long leads defeat the SPD.",
              "Cascade design matches energy handling to role and matches let-through Up to downstream equipment impulse withstand category (I = 1.5 kV, II = 2.5 kV, III = 4 kV, IV = 6 kV at 230 V supply per BS EN 60664-1 / Reg 443.5).",
              "SPDs degrade with each surge. Status indicator green / red. End-of-life SPDs are a periodic inspection finding (typically C2 where the SPD function is intended as active protection); replacement is via plug-in spare modules.",
            ]}
          />

          <Quiz title="SPD selection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 AFDD design considerations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Synthesis worked example
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
