/**
 * Module 6 · Section 3 · Subsection 3 — AFDD design considerations
 * Maps to C&G 2365-03 / Unit 305 / LO3 / AC 3.3
 *   AC 3.3 — "Identify the design considerations for the application of arc
 *             fault detection devices (AFDDs) in accordance with current
 *             BS 7671 wording"
 *
 * Layered depth: 2366-03 Unit 304 / AC 3.3; 5393-03 Unit 104 / AC 3.3
 *
 * Reg 421.1.7 — recommending AFDDs for AC final circuits to mitigate fire
 * risk. The language is 'recommending' (advisory) in BS 7671 itself; the
 * Building Safety Act 2022 + secondary legislation hardens it for HRRBs.
 * Where to use, where it changes the calc, what BS EN 62606 product
 * standard demands, and why this is the most-misunderstood area of L3
 * design today.
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

const TITLE = 'AFDD design considerations (3.3) | Level 3 Module 6.3.3 | Elec-Mate';
const DESCRIPTION =
  "Arc Fault Detection Device design — what AFDDs do, where Reg 421.1.7 recommends them, the BS EN 62606 product standard, the BSA 2022 / HRRB hardening, and how to specify them on a domestic CU upgrade or commercial fit-out without breaking the discrimination scheme.";

const checks = [
  {
    id: 'afdd-wording',
    question:
      "BS 7671 A4:2026 Reg 421.1.7 says about AFDDs:",
    options: [
      "Maintenance effectiveness depends directly on the competence of the people performing the work — technicians need both technical skills (fault-finding, condition monitoring, repair techniques) and analytical skills (RCA, FMEA, data interpretation) to implement RCM effectively",
      "No — both the metal back-box AND the metal socket faceplate are exposed-conductive-parts. Each must be connected to the CPC, normally via a fly-lead or via the fixing screws securing a metal faceplate to a metal back-box (provided that connection is verified by continuity test).",
      "Immediately evacuate the area, do not attempt to disconnect or move the battery, call the fire service, notify the building occupant, and contact the manufacturer — swelling indicates internal cell failure that could lead to thermal runaway, fire and toxic gas release",
      "AFDDs are recommended for installation in AC final circuits of a fixed installation to mitigate the risk of fire arising from the effects of arc fault currents. The wording is advisory ('recommending'), not mandatory at the BS 7671 level — though specific occupancy types under the Building Safety Act 2022 and HRRB regime may make AFDDs effectively required.",
    ],
    correctIndex: 3,
    explanation:
      "Reg 421.1.7 is intentionally written with the word 'recommending' — advisory rather than mandatory. The competent designer reads this as 'AFDDs should be installed unless there is good reason not to', and a periodic inspection will not code a pre-A4 installation lacking AFDDs as C2. However, the Building Safety Act 2022 and the secondary legislation around higher-risk residential buildings (HRRBs — broadly buildings 18 m or seven storeys and above) effectively make AFDDs a requirement on those occupancy types. Houses in multiple occupation, care homes, and certain commercial environments increasingly specify AFDDs as part of insurer or client requirement, well ahead of any BS 7671 mandate.",
  },
  {
    id: 'afdd-product',
    question:
      "AFDD product standard is:",
    options: [
      "BS EN 62606 — sets the test requirements for AFDD detection of series and parallel arc faults, immunity to nuisance trip from normal load behaviour (motor starting, fluorescent flicker, switching transients), and integration with overcurrent and RCD protection in combined modules.",
      "The DNO declared 0.35 ohm — design uses the worst-case declared figure (lower Ze means higher Zs at fault, which the design must still satisfy). The measured figure is for verification, not design.",
      "Likelihood × Severity. Likelihood scale (1 rare → 5 almost certain). Severity scale (1 minor → 5 catastrophic). Multiplied gives a risk score; matrix categorises (low / medium / high / very high) and triggers control requirements. Many firms use 3x3 or 5x5 matrices.",
      "Include a price variation clause in your quotation allowing adjustment for significant material price changes (e.g. copper, aluminium, key brands). Set a clear threshold (typical: changes over 5%) and define the calculation method. This protects both parties on long-running projects.",
    ],
    correctIndex: 0,
    explanation:
      "BS EN 62606 is the product standard for AFDDs. It defines: arc fault detection performance for series faults (a single conductor with intermittent contact such as a damaged extension lead or a loose terminal) and parallel arcs (between live conductors or live and earth, often the precursor to a short-circuit fault); immunity tests against false trip from normal household / commercial load behaviour; the integration requirements for AFDD-only, AFDD+OPD and AFDD+RCBO devices; and marking and end-user information requirements. The L3 designer specifies AFDDs on the schedule by citing BS EN 62606 and the manufacturer / part number, exactly as for any other protective device.",
  },
  {
    id: 'afdd-discrimination',
    question:
      "An AFDD-RCBO module on a final circuit is fed from a 100 A BS 88-3 main switch and main fuse. A series arc fault in a long extension lead plugged into the protected circuit. Discrimination outcome:",
    options: [
      "The AFDD-RCBO operates on the arc-fault detection (the fault current may not be high enough to trip the OPD or the RCD), clearing the affected circuit only. The BS 88-3 fuse stays intact. This is exactly the scenario AFDDs are designed to detect — fault energy below conventional OPD / RCD thresholds but high enough to ignite cable insulation or appliance materials.",
      "Confirm: (1) clamp is on consumer side of the meter and on hard metal pipework before any branch; (2) within 600 mm of the meter outlet union where practicable; (3) pipe cleaned to bare metal under the clamp jaw; (4) jointing paste applied; (5) clamp screw torqued to manufacturer spec; (6) \\\"Safety Electrical Connection — Do Not Remove\\\" warning label fitted on the clamp body or conductor; (7) bonding conductor secure and labelled at the MET end.",
      "Limited companies have separate legal personality — the company is liable for debts, not the individual director (subject to personal guarantees and director duties). Sole traders have unlimited personal liability — personal assets can be pursued for business debts.",
      "Appendix 6 — model forms for certification and reporting. The appendices to BS 7671 also include Appendix 1 (British Standards referenced), Appendix 4 (cable current-carrying capacity and voltage drop tables), Appendix 15 (ring and radial final circuit arrangements) and Appendix 17 (energy efficiency). Knowing the appendices by topic is half of installer navigation.",
    ],
    correctIndex: 0,
    explanation:
      "Series arc faults (loose connections, damaged flex, deteriorated terminals) often produce intermittent low-current arcing — a few amps, well below the OPD's overcurrent threshold and well below the RCD's residual threshold (because the arc is line-to-line, not line-to-earth). Conventional protection does not see them, but the local heating from the arc routinely starts fires. AFDDs detect the characteristic high-frequency signature of arcing in the load current and trip on it. The AFDD-RCBO clears the affected circuit; the BS 88-3 main fuse stays intact, the rest of the building keeps running. This is the engineering case for AFDDs — closing a known gap in conventional overcurrent / RCD protection.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does an AFDD detect that a conventional MCB / RCBO does not?",
    options: [
      "Main protective bonding equalises potential between extraneous-conductive-parts (gas, water, structure) and the MET. The earthing conductor connects the MET back to the source earth (PEN, sheath, or local electrode) so fault current can actually return to the source — without it, no current flows and no disconnection happens.",
      "Series arc faults (intermittent low-current arcing in damaged flex, loose terminals, deteriorated joints) and parallel arc faults (between live conductors or live-to-earth before they develop into a full short-circuit). These produce fault energies that ignite cable insulation but typically do not reach the OPD overload or RCD residual thresholds.",
      "If a standby or backup system exists and can maintain the required function when the primary system fails, the overall consequence of a single failure is reduced — but the backup system itself becomes critical and must be maintained to ensure it works when needed",
      "Direct application to the Local Authority Building Control (LABC) office before the work starts, with a Building Notice or Full Plans application; LABC inspects and issues a completion certificate. Significantly more expensive and slower than CPS routes — most contractors register with a scheme for this reason.",
    ],
    correctAnswer: 1,
    explanation:
      "AFDDs target a specific gap in conventional protection: arc faults producing local heating at fault energies below the OPD or RCD thresholds. Series arcs (single-conductor intermittent contact) routinely sit at 1-5 A in the early stages — invisible to a 32 A MCB. Parallel arcs (between conductors before short-circuiting) start at modest currents that heat the insulation enough to char and ignite. The arc waveform has a characteristic high-frequency content that the AFDD's signal-processing detects. RCDs see line-to-earth residual current; OPDs see overload and short-circuit; AFDDs see arcing.",
  },
  {
    id: 2,
    question: "BS 7671 Reg 421.1.7 wording on AFDDs is best described as:",
    options: [
      "That every employer appoint one or more competent persons to assist them in undertaking the measures needed to comply with the requirements and prohibitions imposed on them by the relevant statutory provisions. Often this is a designated H&S manager or external consultant.",
      "Design out or reduce the need for work at height where reasonably practicable, and where it cannot be eliminated, provide information about remaining risks in the health and safety file for future duty holders",
      "Advisory ('recommending') the installation of AFDDs in AC final circuits of a fixed installation to mitigate fire risk arising from the effects of arc fault currents. Not a mandatory requirement at the BS 7671 level for general installations.",
      "The apprenticeship funding rules require a minimum of 20% off-the-job training, and the ESFA (Education and Skills Funding Agency) requires evidence that this has been met before the EPA can proceed",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 421.1.7 uses the word 'recommending' deliberately — it is advisory. Competent designers read it as 'install unless there is a good reason not to'. A periodic inspection of an installation pre-dating A4 will not code the absence of AFDDs as C2 simply for absence; it might recommend C3 (improvement recommended). The hardening of this recommendation into a requirement comes via the Building Safety Act 2022 and HRRB-specific secondary legislation, plus insurer / occupancy-type requirements (HMO, care home, premium commercial).",
  },
  {
    id: 3,
    question: "AFDD product standard is:",
    options: [
      "Steel expands ~12 µm per m per °C; over 32 m a 30°C swing gives ~11 mm of expansion that has to be accommodated to prevent stress on the saddles and threaded joints.",
      "Roles of employer/training provider/apprentice, off-the-job learning hours, end-point assessment plans and pay/conditions",
      "They provide additional support, specialist rescue capability, medical assistance, and resources to supplement the on-site rescue team",
      "BS EN 62606 — sets test requirements for arc fault detection, immunity to nuisance trip, and integration with overcurrent / RCD protection in combined modules.",
    ],
    correctAnswer: 3,
    explanation:
      "BS EN 62606 is the dedicated AFDD product standard. It specifies: detection performance (series and parallel arc), nuisance-trip immunity testing (motor starting transients, fluorescent flicker, switching surges), test conditions for combined AFDD-MCB and AFDD-RCBO modules, marking and end-user information. Always cite BS EN 62606 alongside the manufacturer / part number on the schedule, the same way you cite BS EN 60898 for an MCB.",
  },
  {
    id: 4,
    question: "Which occupancy type currently has the strongest AFDD requirement (beyond Reg 421.1.7's general recommendation)?",
    options: [
      "Higher-risk residential buildings (HRRBs) under the Building Safety Act 2022 — broadly buildings 18 m or seven storeys and above with sleeping accommodation. Insurer requirements increasingly extend to HMOs, care homes, student accommodation and certain commercial use classes.",
      "1–100 kW depending on the head (vertical drop) and the flow rate — at the small end, the same kind of single-phase grid-connected system as a PV install; at the larger end, three-phase and a full G99 application.",
      "Aligned - reputation for compliance and quality wins repeat business. The HSE Public Register prosecutions / notices are a competitive disadvantage. Firms with clean records win frameworks; firms with poor records lose them.",
      "A \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"skilled person (electrically)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" as defined in BS 7671 Part 2 — typically evidenced by membership of a competent person scheme (NICEIC, NAPIT, ELECSA, Stroma) and current 2391/2394/2395 (or equivalent) inspection and testing qualification. The duty-holder is liable if they appoint someone not competent.",
    ],
    correctAnswer: 0,
    explanation:
      "The Building Safety Act 2022 introduced a stricter regime for HRRBs (higher-risk residential buildings) — typically residential buildings 18 m or seven storeys and above. Designers on these buildings must demonstrate competence and produce a 'golden thread' of design documentation. AFDDs are widely treated by responsible designers as required on HRRB final circuits even though Reg 421.1.7 itself remains advisory. Insurer requirements push the same way for HMOs, care homes, hospices, and certain occupancy types where fire risk is elevated.",
  },
  {
    id: 5,
    question: "Combined AFDD-RCBO modules are typically available with:",
    options: [
      "Unlimited fine and/or up to 2 years imprisonment for individuals; unlimited fine for companies. Sentencing follows the Definitive Guideline (HSE Sentencing Council, 2016) and turns on culpability, harm and turnover.",
      "Standard MCB ratings (6, 10, 16, 20, 25, 32, 40 A) with Type B or C overcurrent characteristic, combined with 30 mA Type A or Type AC residual current protection (Type B / F variants becoming available). Same form factor as a standard RCBO; same cascade and breaking-capacity specifications.",
      "Explain that an EICR has minimum content requirements set by BS 7671 Part 6, GN3 and BPG4 — sampling can be agreed but the sampling itself must be representative and the limitations recorded in writing. Walk the customer through what an EICR can and cannot exclude. If they still want sub-minimum work, decline and document the refusal.",
      "A connector that combines the Type 2 AC connector with two additional DC pins below it, enabling both AC charging (via the Type 2 portion) and DC rapid charging (via the DC pins) through a single vehicle inlet — supporting DC charging up to 350 kW",
    ],
    correctAnswer: 1,
    explanation:
      "Combined AFDD-RCBO modules from major manufacturers are available across the standard MCB rating range with Type B and Type C overcurrent characteristics and 30 mA residual current protection. The combined module replaces a standalone RCBO in the same DIN-rail position and the same width — typically 1 module wide for single-pole, 2 modules wide for double-pole. The cascade and breaking-capacity behaviours are the same as for an equivalent RCBO; the AFDD function is additional, not a replacement for OPD or RCD.",
  },
  {
    id: 6,
    question: "AFDDs are most useful on circuits where the dominant fire risk is:",
    options: [
      "3-10 seconds, to avoid unnecessary starts during brief supply interruptions (voltage dips, transient faults) that are resolved by the DNO within seconds",
      "The more precisely you can identify your emotion (e.g., distinguishing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"frustrated\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" from \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"disappointed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" from \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"overwhelmed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"), the more effectively you can select the appropriate regulation strategy — because different emotions require different responses",
      "Series arc faults from damaged or aged flex, loose terminals, deteriorated terminations — typical of long-life installations with extensive socket-outlet use, in-wall cabling under furniture, and aged accessories.",
      "A notice served by the fire authority requiring the responsible person to notify them before making changes to the premises or its use that could increase fire risk or affect fire safety measures",
    ],
    correctAnswer: 2,
    explanation:
      "AFDDs target the series and parallel arc fault that conventional protection misses. The risk profile that benefits most: long-life installations where flex and terminations age (sleeping accommodation, occupied spaces with high cable density), socket-outlet circuits with extension leads or worn appliances, accessory boxes with intermittent terminal contact. Less benefit on heavy-industrial circuits where short-circuit faults are caught quickly by OPD; less benefit on lighting circuits with simple fixed wiring and no flex.",
  },
  {
    id: 7,
    question: "When specifying AFDDs on the schedule, the design row should record:",
    options: [
      "Allows EVs to discharge stored battery energy back to the grid or building during peak demand periods — effectively using the EV battery as a distributed energy storage resource, providing grid services and reducing electricity costs for the vehicle owner",
      "Read the RAMS for the job before you start so you understand the planned controls. Attend the toolbox talks and sign the register. Operate within the scope of any permit-to-work — never extend the work beyond what the permit authorises. Flag anything you see on site that doesn't match the RAMS. HASAWA s.7 makes all of this a personal duty.",
      "At minimum: power topology (cables, breakers, DBs); annotations (ratings, calc results); revision clouds and notes; legend and title block. Some designers add layers for fault current, voltage drop, disconnection time and sub-discipline (e.g. emergency lighting circuits, fire alarm circuits, IT critical) so layers can be turned on or off for clarity.",
      "Type (AFDD-RCBO combined or AFDD-OPD combined or standalone AFDD), rating (matched to circuit), trip characteristic (Type B / C), RCD class (where combined), product standard (BS EN 62606 plus BS EN 61009-1 or BS EN 60898 as applicable), and manufacturer / part number — same discipline as for any other protective device.",
    ],
    correctAnswer: 3,
    explanation:
      "AFDDs are protective devices and the schedule discipline is the same as for any other device: type, rating, breaking capacity, trip characteristic, RCD class, product standard citations, manufacturer / part number. A vague 'AFDD' line is no better than a vague 'MCB' line. Specific spec lets the installer order the right part and the inspector verify the install matches the design. On HRRB or insurer-driven AFDD installations the schedule discipline is part of the compliance evidence.",
  },
  {
    id: 8,
    question: "On a domestic CU upgrade in a typical owner-occupied house in 2026, the L3 designer's AFDD position is:",
    options: [
      "Recommended (per the wording of Reg 421.1.7) — discuss with the customer, present the cost vs benefit, and let them decide. Document the conversation. AFDDs are a sensible choice for the bedroom and lounge socket circuits in particular; less of a priority on shower, immersion, hob and dedicated EV circuits.",
      "Charge-hand is a senior trade lead — typically an experienced Approved Electrician who runs a small gang of electricians and apprentices on a specific area of the work, reporting up to the Foreman. On a larger job there can be several Charge-hands under one Foreman, each leading a wing or a floor.",
      "Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.",
      "The four stages — concrete experience (having an emotional interaction), reflective observation (thinking about what happened and how you felt), abstract conceptualisation (identifying patterns and principles), and active experimentation (trying a new approach next time) — create a systematic method for learning from emotional experiences rather than repeating the same patterns",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 421.1.7 is advisory in BS 7671 itself, so the L3 designer's job is to inform the customer and let them decide. Present the case for AFDDs on the circuits where the engineering benefit is strongest (sleeping-area socket circuits, lounge sockets, kitchen sockets where appliances are routinely plugged and unplugged), present the cost (each AFDD-RCBO module typically 3-5 x the cost of an equivalent RCBO), and let the customer choose. Document the conversation in the design pack — 'AFDDs offered, customer declined / accepted on circuits A B and C'. On HRRB or insurer-driven installations the conversation goes differently, but the documentation discipline is the same.",
  },
];

const faqs = [
  {
    question: "Are AFDDs mandatory under BS 7671 A4:2026?",
    answer:
      "No, not under BS 7671 itself. Reg 421.1.7 uses the word 'recommending' — advisory wording. AFDDs are not mandatory across general installations under the BS 7671 framework. The hardening into a requirement comes from secondary legislation and occupancy-specific regimes: the Building Safety Act 2022 and the higher-risk residential building (HRRB) regime treat AFDDs as effectively required on HRRB final circuits; insurers increasingly require AFDDs on HMOs, care homes, student accommodation and certain commercial occupancy classes; specific clients (heritage buildings, museums, hospitals) may specify AFDDs in their employer's requirements. The L3 designer reads the requirement layer by layer — BS 7671 advisory, secondary legislation possibly mandatory, insurer / client specification possibly mandatory, occupier risk profile may justify even where not mandatory.",
  },
  {
    question: "Do AFDDs replace RCDs and MCBs?",
    answer:
      "No. AFDDs are an additional protection function on top of (not instead of) overcurrent (MCB) and residual current (RCD) protection. The most common modern installation uses a combined AFDD-RCBO module — overcurrent + RCD + AFDD all in one DIN-rail device. The AFDD looks for the high-frequency signature of arcing; the RCD looks for residual line-to-earth current; the MCB function looks for overload and short-circuit. Three different functions, three different fault types, all needed. Removing the RCD function and relying on the AFDD alone would leave the circuit without earth-fault additional protection — a clear regulatory non-compliance.",
  },
  {
    question: "Will my discrimination scheme break if I add AFDDs?",
    answer:
      "Usually not — AFDD-RCBO modules cascade with upstream BS 88 fuses the same way as plain RCBOs, and the AFDD function operates on its own algorithm rather than on a coordinated current threshold. The cases where discrimination might be affected: AFDD upstream of AFDD (rare in practice — AFDDs go on final circuits, not as upstream backup), or where the manufacturer's cascade table limits AFDD modules to specific upstream device types. Verify with the manufacturer's published combinations on the schedule. The general design rule is the same: AFDD on the final circuit, conventional cascade backup upstream.",
  },
  {
    question: "Why are AFDDs so much more expensive than RCBOs?",
    answer:
      "AFDDs require active signal-processing electronics inside the module to analyse the load current waveform for the high-frequency signature of arcing. That signal processing — current sensing, ADC, microcontroller, filtering, decision logic — adds cost compared to the passive thermal-magnetic-electromagnetic mechanism of an MCB or RCBO. As of 2026 a combined AFDD-RCBO module typically costs 3-5 times an equivalent RCBO. Prices are reducing as production volume scales, particularly in the European market where AFDDs are more widely required. On a domestic CU upgrade the AFDD cost is a real conversation with the customer — half a dozen circuits at five-times-RCBO cost can add several hundred pounds to the project bill.",
  },
  {
    question: "On which circuits do AFDDs add the most engineering value?",
    answer:
      "Circuits where series arc faults are most likely and where the consequence of an unattended arc fault is most severe. Most engineering value: sleeping-area socket circuits (bedroom sockets, where occupants are asleep when an arc starts), lounge sockets (long-life flex on entertainment systems and lamps, intermittent appliance use), kitchen sockets (regular plug-unplug cycle wears terminations), HMO and shared-house socket circuits (mixed appliance use, less occupant control). Less engineering value where conventional protection is fast and the load is short-flex / fixed: shower circuits, immersion circuits, dedicated EV charging, dedicated heat pump, lighting circuits with no flex.",
  },
  {
    question: "How do I document my AFDD design decision when I have not specified them?",
    answer:
      "Document the discussion in the design pack and on the schedule. A standard form of words: 'Reg 421.1.7 AFDD recommendation discussed with customer; customer informed of cost and benefit; AFDDs not specified on circuits X, Y, Z by customer election; AFDDs specified on circuits A, B, C [or — none specified]'. The documentation protects you on a future complaint or insurance claim where the customer says 'you should have insisted'. The professional discipline is to inform, recommend, and let the customer make the call — recorded honestly. On HRRBs and insurer-driven installations the conversation goes differently but the documentation discipline is identical.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 3"
            title="AFDD design considerations and Reg 421.1.7"
            description="Arc Fault Detection Device design — what AFDDs do, where Reg 421.1.7 recommends them, the BS EN 62606 product standard, the Building Safety Act 2022 / HRRB hardening, and how to specify them on a domestic CU upgrade or commercial fit-out without breaking the discrimination scheme."
            tone="amber"
          />

          <TLDR
            points={[
              "AFDDs detect series and parallel arc faults — fault energies that ignite cable insulation but typically sit below the OPD overload threshold and below the RCD residual threshold. They close a known gap in conventional protection.",
              "Reg 421.1.7 in BS 7671 A4:2026 recommends (advisory wording) AFDDs in AC final circuits of a fixed installation to mitigate fire risk. The hardening into a requirement comes from the Building Safety Act 2022 / HRRB regime and from insurer / client specifications, not from BS 7671 itself.",
              "Product standard is BS EN 62606. Combined AFDD-RCBO modules are available at standard MCB ratings with Type B / C overcurrent and 30 mA Type A / F / B RCD; they cascade with upstream BS 88 fuses the same way as standard RCBOs.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe what an AFDD detects (series and parallel arc faults) and why it closes a gap left by conventional MCB and RCD protection.",
              "Quote BS 7671 A4:2026 Reg 421.1.7 wording correctly — recommending the installation of AFDDs in AC final circuits to mitigate fire risk arising from the effects of arc fault currents — and distinguish the advisory wording from a mandatory requirement.",
              "Identify occupancy types where AFDDs are effectively required by secondary legislation or insurer / client specification, including HRRBs under the Building Safety Act 2022.",
              "Specify AFDD-RCBO modules on the design schedule with the same discipline as any other protective device: type, rating, characteristic, RCD class, BS EN 62606 product standard reference, and manufacturer / part number.",
              "Explain how AFDDs interact with the discrimination scheme and confirm cascade behaviour with the manufacturer's published combinations.",
              "Lead a customer conversation about AFDD specification on a domestic CU upgrade, presenting the engineering case, the cost, and the regulatory wording, and document the decision in the design pack.",
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="What an AFDD does — and the gap it closes"
            plainEnglish="A series arc — a damaged flex, a loose terminal — sits at a few amps for hours before it catches the curtains. Your 32 A MCB does not see it. Your 30 mA RCD does not see it. An AFDD does."
            onSite="The classic AFDD case is a kettle flex with a worn-through inner conductor that arcs intermittently every time the kettle is moved. Old MCBs ignored it. AFDDs flag it."
          >
            <p>
              Conventional overcurrent protection (MCB / RCBO) operates on the magnitude of the
              circuit current. It trips on overload (sustained current above the device rating) or
              short-circuit (instantaneous current at the magnetic threshold). Conventional residual
              current protection (RCD / RCBO) operates on the imbalance between line and neutral
              currents — line-to-earth residual current. Both miss arcing faults that sit between
              the conventional thresholds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Series arc</strong> — single conductor with intermittent contact. A
                damaged flex, a loose terminal screw, a corroded socket-outlet contact, a worn
                appliance lead. Current sits at the load's normal operating current (a few amps)
                but the contact arcs each cycle, dissipating heat at the arc point. The magnitude
                does not exceed the OPD threshold. The arc is line-to-line / line-to-neutral, not
                line-to-earth, so the RCD does not see it. The local heat ignites the insulation
                or the surrounding fabric over hours.
              </li>
              <li>
                <strong>Parallel arc</strong> — between conductors before they fully short-circuit.
                Insulation degradation, cable damage from a nail or screw, terminal flashover. A
                full short-circuit would trip the OPD instantly; a parallel arc that sits at modest
                current for some seconds before progressing to full short can ignite the cable
                before the OPD operates.
              </li>
            </ul>
            <p>
              AFDDs detect the high-frequency signature of arcing in the load current waveform.
              The signal-processing inside the AFDD analyses the current for characteristic patterns
              — repeated current pulses, frequency content above 50 Hz, gap-filled cycles — and
              trips when the pattern matches an arc fault. The product standard BS EN 62606 sets
              the detection performance and the immunity to false trip from normal load behaviour.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices)"
            clause="Regulation 421.1.7 of BS 7671:2018+A4:2026 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                Reg 421.1.7 is the regulation that introduces AFDDs into BS 7671. The wording is
                deliberately advisory ('recommending the installation') rather than mandatory
                ('shall be installed'). The competent designer reads this as 'install where the
                engineering benefit and the customer / occupancy profile justify it'. Periodic
                inspection of pre-A4 installations does not code the absence of AFDDs as C2 by
                default; it might recommend C3 (improvement recommended) if the occupancy profile
                makes the absence material. The hardening of this recommendation into a requirement
                for specific occupancy types comes from the Building Safety Act 2022 and HRRB
                secondary legislation, not from Reg 421.1.7 itself.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7. See also BS EN 62606 (AFDD product standard)."
          />

          <SectionRule />

          <ContentEyebrow>The advisory vs mandatory question</ContentEyebrow>

          <ConceptBlock
            title="Reading the regulatory layers correctly"
            plainEnglish="BS 7671 says 'recommending'. The Building Safety Act 2022 effectively says 'required for HRRBs'. Insurers say 'required for HMO / care home / certain commercial'. Read each layer and apply the strictest one that fits."
          >
            <p>
              Three regulatory layers operate on AFDD requirements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671 A4:2026 Reg 421.1.7</strong> — advisory. 'Recommending the
                installation of AFDDs.' Not a mandatory requirement at the BS 7671 level for
                general installations. Periodic inspection does not code absence as C2.
              </li>
              <li>
                <strong>Building Safety Act 2022 + HRRB regime</strong> — for higher-risk
                residential buildings (broadly residential buildings 18 m or seven storeys and
                above with sleeping accommodation), the Building Safety Regulator gateway 2 / 3
                review treats AFDDs as effectively required on final circuits, even though BS 7671
                itself remains advisory. HRRB design without AFDDs would face challenge.
              </li>
              <li>
                <strong>Insurer requirements</strong> — increasing pressure from the insurance
                industry on HMOs, care homes, student accommodation, listed / heritage buildings,
                hospitals, and certain commercial occupancy classes. Insurers may make AFDDs a
                condition of cover or apply a premium loading where AFDDs are absent.
              </li>
              <li>
                <strong>Client / employer requirements</strong> — specific clients (London local
                authorities, major retailers, museums, NHS estates) often specify AFDDs in their
                employer's requirements regardless of the BS 7671 wording.
              </li>
              <li>
                <strong>Engineering judgement / risk profile</strong> — even where none of the
                above applies, the L3 designer may recommend AFDDs where the engineering case
                justifies it (long-life occupancy with aged cabling, sleeping accommodation, high
                socket-outlet density with extension-lead use).
              </li>
            </ul>
            <p>
              The L3 designer reads each layer in turn, applies the strictest, documents the
              decision. On a domestic CU upgrade for an owner-occupier none of the layers above
              the BS 7671 advisory apply — the conversation is engineering recommendation plus
              customer choice. On an HRRB the conversation is mandatory specification with
              compliance evidence. The discipline is the same: read, apply, document.
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

          <ContentEyebrow>Specifying AFDDs on the design schedule</ContentEyebrow>

          <ConceptBlock
            title="What the schedule row looks like"
            plainEnglish="Same discipline as for any other protective device. Type, rating, characteristic, RCD class, product standards, manufacturer / part number."
          >
            <p>
              An AFDD-RCBO row on the design schedule:
            </p>
            <p className="font-mono bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px]">
              AFDD-RCBO 32 A Type B 6 kA Icn 30 mA Type A | BS EN 62606 + BS EN 61009-1 |
              Manufacturer X part Y | design max Zs 1.37 ohms (Table 41.3 A4:2026)
            </p>
            <p>
              Each element of the row matters:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AFDD-RCBO</strong> — combined module type. Could also be AFDD-MCB (no RCD) or standalone AFDD (operates only on arc detection).</li>
              <li><strong>32 A</strong> — circuit rating, matched to Ib less than or equal to In less than or equal to Iz per Reg 433.1.1.</li>
              <li><strong>Type B</strong> — overcurrent characteristic (3-5 x In magnetic). Could be Type C for higher in-rush circuits.</li>
              <li><strong>6 kA Icn</strong> — breaking capacity, matched to PSCC at the device per Reg 434.5.1.</li>
              <li><strong>30 mA Type A</strong> — RCD trip threshold and class. 30 mA is the additional protection threshold; Type A is the modern minimum.</li>
              <li><strong>BS EN 62606 + BS EN 61009-1</strong> — product standards for the AFDD function and the RCBO function respectively.</li>
              <li><strong>Manufacturer / part</strong> — for traceability and verification at install.</li>
              <li><strong>Design max Zs</strong> — Table 41.3 figure for the OPD function (the AFDD function does not have a Zs limit in the same way; the RCD function has its own residual-current operating threshold).</li>
            </ul>
            <p>
              On a domestic CU upgrade with eight final circuits, a fully-AFDD'd schedule has eight
              such rows. On a commercial board with fifty circuits, fifty such rows. The
              consistency of the row format is the design discipline — vague rows ('AFDD on
              circuit 4') invite installer error and inspector challenge.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="AFDD product standard — BS EN 62606"
            plainEnglish="The product standard that says what an AFDD must detect, what it must not nuisance-trip on, and how to integrate it with overcurrent / RCD."
          >
            <p>
              BS EN 62606 covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Detection performance</strong> — series arc detection at specified test
                currents and arc gap distances; parallel arc detection at specified fault energies.
                The standard includes a battery of test waveforms representing real-world arc
                signatures.
              </li>
              <li>
                <strong>Immunity to nuisance trip</strong> — the device must NOT trip on normal
                load behaviour. Test waveforms include: small motor starting transients (vacuum
                cleaners, fans), fluorescent lamp starting flicker, switching transients (relay
                contacts, solenoid energisation), light-dimmer phase-cutting, switchmode supply
                in-rush.
              </li>
              <li>
                <strong>Combined-device requirements</strong> — for AFDD-MCB and AFDD-RCBO
                modules, the standard specifies how the AFDD function integrates with the OPD /
                RCD function. The RCD function continues to operate per BS EN 61008 / 61009-1; the
                OPD function continues to operate per BS EN 60898; the AFDD function adds on top.
              </li>
              <li>
                <strong>Marking and end-user information</strong> — the device must be clearly
                marked as AFDD and the user must be supplied with information on how to test the
                AFDD function (typically a dedicated test button, separate from the RCD test
                button).
              </li>
            </ul>
            <p>
              Always verify on the schedule that the specified AFDD is BS EN 62606 compliant.
              Devices marketed as 'arc-fault aware' or 'arc-tolerant' that are not BS EN 62606
              tested do not qualify as AFDDs for design purposes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Automatic disconnection in case of a fault)"
            clause="A protective device shall automatically interrupt the supply to the line conductor of a circuit or equipment in the event of a fault of negligible impedance between the line conductor and an exposed-conductive-part or a protective conductor in the circuit or equipment within the disconnection time required by Regulation 411.3.2."
            meaning={
              <>
                Reg 411.3.1.1 mandates ADS on earth faults — the OPD or RCD must operate within
                the Table 41.1 disconnection time. AFDDs are not a substitute for ADS; they
                operate on a different fault type (arcing fault, not low-impedance earth fault).
                A combined AFDD-RCBO module satisfies both — the RCD function provides ADS on
                earth faults (and additional protection at 30 mA), the OPD function provides ADS
                on short-circuit faults, the AFDD function provides additional protection against
                arcing faults that the OPD and RCD do not see. All three operate independently
                inside the same module.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Customer conversations and decisions</ContentEyebrow>

          <ConceptBlock
            title="The domestic CU upgrade conversation in 2026"
            plainEnglish="Reg 421.1.7 is advisory. The customer pays the bill. Your job is to inform, recommend, and document the decision."
            onSite="Have the conversation up front, in writing if possible. The customer who declined AFDDs and then has a fire later is a much harder conversation than the customer who accepted AFDDs because you explained the case clearly."
          >
            <p>
              On a typical owner-occupied domestic CU upgrade, your AFDD conversation goes
              something like:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Explain Reg 421.1.7 in plain language: BS 7671 recommends AFDDs on AC final
                circuits to reduce fire risk from arc faults in damaged cabling and worn
                appliances.
              </li>
                            <li>
                Explain what AFDDs detect: arcing faults at low currents that conventional
                breakers and RCDs do not see. Common cause: damaged flex, worn appliance leads,
                loose terminals.
              </li>
              <li>
                Explain where the engineering benefit is greatest: bedroom and lounge socket
                circuits, kitchen sockets, anywhere with extension leads and routine plug /
                unplug.
              </li>
              <li>
                Explain where the engineering benefit is more modest: dedicated single-load
                circuits (shower, immersion, EV, heat pump), lighting circuits with no flex.
              </li>
              <li>
                Quote the cost — typically 3-5 x the cost of an equivalent RCBO per AFDD-RCBO
                module. Six AFDD-RCBOs on a typical CU might add £200-£400 to the project bill.
              </li>
              <li>
                Let the customer decide which circuits to AFDD-protect. Document the decision in
                the design pack — 'AFDDs offered per Reg 421.1.7; customer accepted on circuits
                A, B, C; declined on circuits D, E, F, G'.
              </li>
            </ul>
            <p>
              Documentation is the protection — for you and for them. A customer who declined
              AFDDs in writing has accepted the risk; a customer who was never offered the
              choice can credibly claim 'you should have insisted'. The conversation takes ten
              minutes; the documentation takes five. Both are part of the L3 design product.
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
            title="Reading 'recommending' as 'mandatory' and over-quoting the customer"
            whatHappens={
              <>
                You read Reg 421.1.7 in haste and tell the customer AFDDs are now mandatory on every
                final circuit. You quote the upgrade with eight AFDD-RCBOs. The customer compares
                with another contractor who has read the regulation correctly, gets a quote with
                conventional RCBOs, and you lose the job. Worse, you have miscommunicated a
                regulation to a customer — they will repeat it.
              </>
            }
            doInstead={
              <>
                Read Reg 421.1.7 carefully. The wording is 'recommending', not 'shall be
                installed'. Present the case correctly: BS 7671 recommends, the engineering case
                is strongest on socket circuits, the cost premium is real, and the decision is the
                customer's. Document the decision either way. On HRRB and insurer-driven
                installations the conversation goes differently, but on a typical owner-occupied
                domestic CU upgrade the regulation is advisory and the customer chooses.
              </>
            }
          />

          <CommonMistake
            title="Reading 'recommending' as 'optional' and skipping the conversation entirely"
            whatHappens={
              <>
                You decide AFDDs are 'just a recommendation' and do not mention them to the
                customer at all. You quote the upgrade with conventional RCBOs. Two years later a
                series arc fault in a kitchen extension lead starts a fire while the customer is
                asleep. The fire investigation flags the absence of AFDDs as a contributory factor.
                The customer's insurer pursues you for failing to discuss a relevant safety
                option. Your professional indemnity is engaged.
              </>
            }
            doInstead={
              <>
                The L3 design discipline is to surface every relevant safety option, not just the
                ones that are mandatory. AFDDs are recommended by BS 7671; that recommendation has
                to be presented to the customer with the engineering case and the cost, and the
                decision documented. Skipping the conversation because the regulation is advisory
                is a defensive failure — both regulatorily and reputationally. Inform, recommend,
                document.
              </>
            }
          />

          <Scenario
            title="Domestic CU upgrade with EV charger, PV and heat pump — AFDD specification"
            situation={
              <>
                Same brief as Sub 3.1 and Sub 3.2. New consumer unit; the property is a 1990s
                three-bedroom house with mixed cable ages (some original 1990s ring final, some
                replaced 2010, some new from the upgrade). Customer is owner-occupier, no
                Building Safety Act 2022 applicability. No insurer or employer requirement.
              </>
            }
            whatToDo={
              <>
                Present the AFDD case to the customer. Strongest engineering benefit on the
                bedroom socket ring (sleeping accommodation, mixed-age cable, occasional lamp /
                charger flex), the lounge socket ring (long-life flex on entertainment system),
                and the kitchen ring (regular plug / unplug, mixed appliance use). Less benefit
                on the new shower (dedicated, fixed flex), new EV charger (dedicated, fixed flex,
                modern equipment), new heat pump (dedicated, fixed flex), new lighting (LED on
                fixed wiring, no flex). Quote two specifications: full AFDD on all final circuits
                (premium) and AFDD on the three socket circuits only (engineering-justified
                middle ground). Customer chooses the middle ground; you document the decision in
                the design pack.
              </>
            }
            whyItMatters={
              <>
                The AFDD conversation is the L3 design role at its most useful — turning a
                regulatory recommendation into a customer decision based on engineering judgement
                and cost. The customer ends up with AFDDs where they help most, conventional
                RCBOs where the AFDD function would add little, and a documented record of the
                decision. The schedule shows three AFDD-RCBO rows and five RCBO rows, each with
                full specification. Inspector verification is straightforward; future periodic
                inspection has documented design intent to verify against; insurer enquiry has
                evidence of regulatory compliance and customer informed consent.
              </>
            }
          />

          <ConceptBlock
            title="Diagnosing AFDD nuisance trips on site — when the device is too sensitive"
            plainEnglish="AFDDs occasionally trip on loads that mimic the high-frequency signature of arcing — old fluorescent fittings with tired starters, certain switch-mode PSUs, brushed motors near end of life, dimmers with phase-cutting waveforms. The diagnostic challenge is distinguishing genuine arc faults (which the AFDD must trip on) from these nuisance trips (which it must not). Modern BS EN 62606 devices have improved immunity but no AFDD is completely immune."
            onSite="A bedroom AFDD-RCBO trips repeatedly when the customer uses an old bedside lamp. The lamp has a worn switch contact — exactly the kind of intermittent contact the AFDD is designed to detect. This is NOT a nuisance trip; the AFDD is doing its job. The customer needs a new lamp, not a different RCBO."
          >
            <p>
              When an AFDD trips repeatedly, work the diagnosis logically:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Press the test button</strong> on the AFDD with the circuit live (or at least the upstream supply live). The device should trip cleanly and reset cleanly — confirms the AFDD function is healthy and the test button mechanism is working.
              </li>
              <li>
                <strong>Unplug all connected loads on the affected circuit.</strong> Re-energise. Does it stay on? If yes, the issue is load-related; if no, the issue is in the fixed wiring.
              </li>
              <li>
                <strong>Plug loads back in one at a time</strong>, leaving each running for a few minutes before adding the next. The first load that trips the AFDD is the suspect.
              </li>
              <li>
                <strong>Inspect the suspect load</strong> — look at the flex (frayed, kinked, near-broken strands at the plug or appliance end), the plug terminations (loose, oxidised), the appliance switch (sparking, intermittent), the appliance internals (visible degradation around connection blocks).
              </li>
              <li>
                <strong>If no load trips</strong> the device repeatedly during the diagnostic, the issue is in fixed wiring — typically a loose terminal at an accessory, a poor crimp at a junction box, or a damaged cable in a wall void. Inspect each accessory in turn for signs of arcing (discoloration, scorch marks, loose terminations) and remediate.
              </li>
              <li>
                <strong>Document the diagnostic outcome.</strong> Genuine arc fault detected and remediated → restore service, customer education on the failure mode. Cause cannot be identified after thorough diagnosis → consider replacing the AFDD with a different manufacturer (BS EN 62606 immunity tests differ between manufacturers; some are tighter than others).
              </li>
            </ol>
            <p>
              <strong>Loads with elevated false-trip risk</strong> (verify with manufacturer compatibility data):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Old fluorescent fittings with magnetic ballasts</strong> — starter cycling produces transient noise that can resemble arcing. Modern LED retrofits of these fittings remove the issue.
              </li>
              <li>
                <strong>Variable-speed brushed motors</strong> (food processors, hand drills, vacuum cleaners with brushed universal motors) — brush sparking is a near-continuous arcing signature. AFDDs that pass nuisance immunity testing handle these correctly, but ageing motors with worn brushes can trigger sensitive devices.
              </li>
              <li>
                <strong>Phase-cut dimmers with high inductive load</strong> — old rotary dimmers feeding inductive loads (transformer-fed halogens) can produce trip-worthy waveforms.
              </li>
              <li>
                <strong>Switch-mode PSUs with poor in-rush limiting</strong> — large in-rush at switch-on can occasionally trigger AFDDs on the verge of their detection threshold.
              </li>
            </ul>
            <p>
              On a domestic install where AFDD nuisance tripping is recurrent and the load mix is benign, consider whether the customer has accepted the right specification. The L3 designer's job is to inform — explain that AFDDs are doing their job, that the nuisance trips are typically diagnosing genuine equipment issues, and that occasional resets are the price of additional fire protection. Where the diagnosis genuinely points to AFDD over-sensitivity (rare on BS EN 62606 devices from major manufacturers), the alternative is a conventional RCBO with the customer informed that the AFDD layer of protection has been removed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="AFDD on three-phase circuits and on commercial / industrial sites"
            plainEnglish="Three-phase AFDDs exist but are less common. Commercial / industrial use is growing, particularly on critical occupancy and on circuits feeding shared / public spaces."
          >
            <p>
              For three-phase circuits, three-phase AFDD modules are available from major
              manufacturers but the product range is narrower than for single-phase. Specification
              follows the same logic: target circuits where arc-fault risk is meaningful (mixed
              socket use, public spaces, sleeping accommodation in HRRBs); cite BS EN 62606 plus
              BS EN 60947 for the three-phase device class; specify breaking capacity and trip
              characteristic for the OPD function. For most commercial three-phase distribution
              the engineering case for AFDD is on lower-rated final circuits (16 A or 20 A
              radial, three-phase socket-outlets in workshop / studio environments), not on
              upstream distribution.
            </p>
            <p>
              For commercial / industrial sites generally, AFDDs are growing on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HMO and HMO-equivalent dwellings with shared common areas (sleeping accommodation, mixed cable ages, multiple tenant changes).</li>
              <li>Care homes, hospices, sheltered housing — sleeping accommodation with vulnerable occupants.</li>
              <li>Hotels and student accommodation — sleeping accommodation with high turnover.</li>
              <li>Heritage buildings and museums — irreplaceable contents and complex installation history.</li>
              <li>Hospitals and clinical environments — life-safety adjacency.</li>
              <li>Premium commercial fit-outs where the client specifies AFDDs as part of the employer's requirements.</li>
            </ul>
            <p>
              The L3 designer reads the occupancy profile, the regulatory layers and the client
              specification, and proposes AFDDs where the case justifies. On a generic warehouse
              or office fit-out the engineering case is more limited and the conventional RCBO
              specification is fine.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Testing AFDDs at install and at periodic inspection"
            plainEnglish="AFDDs have a dedicated test button. Press it; the device should trip. That is the routine test."
          >
            <p>
              At install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Visual check that the AFDD is fitted and labelled per the schedule.</li>
              <li>Operate the AFDD test button — the device should trip. Reset.</li>
              <li>For combined AFDD-RCBO, also operate the RCD test button — confirms the RCD function trips. Reset.</li>
              <li>Continuity, IR, polarity, Zs and RCD operating tests proceed as for any final circuit.</li>
              <li>Record AFDD test result on the schedule of test results — typically a dedicated 'AFDD test' column or note.</li>
            </ul>
            <p>
              At periodic inspection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operate the AFDD test button — should trip. If not, code as appropriate (typically C2 if the AFDD function is intended to provide protection that is now absent).</li>
              <li>Operate the RCD test button — should trip. Same rule.</li>
              <li>Standard periodic test sequence proceeds.</li>
            </ul>
            <p>
              At customer handover, demonstrate the AFDD test button to the customer and explain
              that it should be pressed every six months as part of the standard RCD test routine.
              Most modern AFDD-RCBO modules have separate AFDD and RCD test buttons; older or
              combined-test models may have a single test button that exercises both functions.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDD recommendation)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc
                fault detection devices (AFDDs) to mitigate the risk of fire in AC final
                circuits of a fixed installation due to the effects of arc fault currents. The
                regulation&apos;s wording uses &quot;recommending&quot; rather than mandatory
                phrasing.
              </>
            }
            meaning={
              <>
                AFDDs are advisory under BS 7671 — but mandatory in high-rise residential
                buildings via the Building Safety Act 2022 framework. Designers should now
                default to AFDDs on fire-risk-elevated AC final circuits and document any
                decision to omit them. Manufacturers commonly supply AFDD-RCBO modules
                combining the AFDD and the RCD function in a single unit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "AFDDs detect series and parallel arc faults — fault energies that ignite cable insulation but typically sit below the OPD overload threshold and below the RCD residual threshold. They close a known gap in conventional protection.",
              "Reg 421.1.7 in BS 7671 A4:2026 recommends AFDDs in AC final circuits to mitigate fire risk arising from the effects of arc fault currents. The wording is advisory ('recommending'), not mandatory at the BS 7671 level.",
              "The hardening of the recommendation into a requirement comes from the Building Safety Act 2022 and HRRB regime (residential buildings 18 m or seven storeys and above), and from insurer / client / employer specifications — not from BS 7671 itself.",
              "Product standard is BS EN 62606. Combined AFDD-RCBO modules are widely available at standard MCB ratings with Type B / C overcurrent and 30 mA Type A / F / B RCD; cascade with upstream BS 88 fuses the same way as standard RCBOs.",
              "Engineering benefit is greatest on socket-outlet circuits in sleeping accommodation, lounge sockets with long-life flex, kitchen sockets with frequent plug / unplug. Less benefit on dedicated fixed-flex circuits (shower, immersion, EV, heat pump) and lighting with no flex.",
              "AFDDs are additional protection — they sit alongside (not in place of) overcurrent and RCD protection. Removing the RCD function in favour of an AFDD-MCB would leave the circuit without earth-fault additional protection.",
              "On a typical owner-occupied domestic CU upgrade the AFDD conversation is engineering recommendation plus customer choice. Document the conversation either way — informed consent is part of the L3 design product.",
              "Test routine: dedicated AFDD test button. Press at install, at periodic inspection, and on the standard six-monthly user routine for RCD test. Code an AFDD that fails to trip on test as a C2 if the AFDD function is intended to provide active protection.",
            ]}
          />

          <Quiz title="AFDD design considerations — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Protective device selection
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 SPD selection (Type 1 / 2 / 3)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
