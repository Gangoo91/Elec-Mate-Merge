/**
 * Module 5 · Section 3 · Sub 4 — Manufacturer instructions (Reg 526.1 + warranty)
 * Synthesis Sub — extends LO2 / AC 2.2 (purpose of workplace information).
 * Not directly mapped to a single 210 AC. Reading manufacturer data is a
 * Level 2 skill applied across the rest of the qualification.
 *
 * Frame: BS 7671 Reg 526.1 — durable connections — pulls in the
 * manufacturer's specific instructions (torque, ferrule, sequence).
 * Reg 510.3 ties selection and erection to mfr instructions. Warranty is
 * voided by deviation. The data sheet IS technically authoritative.
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
  'Manufacturer instructions (Reg 526.1 + warranty) | Level 2 Module 5.3.4 | Elec-Mate';
const DESCRIPTION =
  'BS 7671 Reg 526.1 ties durable connections to the manufacturer instructions — torque values, ferrule requirements, sequence. Reading the data sheet is part of the regs, not optional reference.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s3-sub4-torque',
    question:
      "You're terminating a 6mm² T&E into a Hager RCBO. Where do you find the torque value?",
    options: [
      "Take ALL adequate precautions: secure isolation (lock-off + key in pocket, not left in lock); a warning notice at the point of isolation; in some installations a separate caution at the point of work; voltage proving on a known live source before AND after testing the isolation; all to prevent the equipment becoming live again whilst work is in progress. Talking to the customer about not touching it is part of the precaution chain.",
      "Inside the lid of the consumer unit (manufacturer label), or in the manufacturer's data sheet for the device, or in the manufacturer's mobile app. Hager's typical circuit terminal torque is 1.2 Nm; incomers are higher (3.5 Nm). Hitting that value with a calibrated torque screwdriver is what discharges BS 7671 Reg 526.1 (durable connections) and Reg 510.3 (selection and erection in line with mfr instructions).",
      "Personal Track Safety — the Network Rail mandatory safety competence card for anyone working on or near operational rail track. PTS course typically 2-day classroom + practical assessment plus medical fitness check. PTS expires after 2 years requiring re-validation. Rail electrical work pays significantly above standard rates (often £350-500+/day) but the PTS requirement, rotational shifts and track-access constraints make it a lifestyle commitment.",
      "C3 — improvement recommended. Reg 421.1.7 uses the language of recommendation, not requirement, for the relevant categories. The absence of an AFDD on an existing circuit is not in itself a defect requiring urgent action — but it is an improvement that brings the installation closer to current best practice. Higher-Risk Residential Buildings under the Building Safety Act 2022 are a separate matter where AFDDs may be a hard requirement.",
    ],
    correctIndex: 1,
    explanation:
      "Manufacturer torque values are not advisory — BS 7671 Reg 510.3 ties them to compliance and Reg 526.1 ties durable connections to mechanical strength, which depends on correct torque. Inside the CU lid is the most accessible source on site; the data sheet is the authoritative source. By-feel torquing is one of the most common termination failures and the cause of many heat-stress incidents in domestic boards.",
  },
  {
    id: 'mod5-s3-sub4-ferrule',
    question:
      "The manufacturer data sheet for a new control device specifies bootlace ferrules for stranded conductors above 1mm². You haven't crimped ferrules before and the supervisor says 'just twist the strands and tighten — it'll be fine'. What's the correct response?",
    options: [
      "Reg 722.410.3.5 prohibits obstacles and placing out of reach (Section 417 measures). Reg 722.410.3.6 prohibits non-conducting location and earth-free local equipotential bonding. Designers must select alternative protective measures permitted within Chapter 72 and elsewhere in BS 7671 — typically ADS with appropriate RCDs, SELV / PELV where applicable, and double or reinforced insulation.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
      "Stop. The data sheet specifies ferrules for a reason — stranded conductors crushed under a screw terminal can spread, lose strands, and form a high-resistance joint that runs hot. Working outside the manufacturer's instructions breaches BS 7671 Reg 510.3 (which ties selection and erection to those instructions) and risks failing Reg 526.1 (durable connection). Get the ferrules and crimping tool, or get a written supervisor sign-off that the deviation has been assessed and the manufacturer warranty implications accepted.",
      "Section 7(a) — to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work. Section 7(b) — to co-operate with their employer (and any other person under a duty) so far as is necessary to enable that duty to be performed. These are personal statutory duties that apply to every operative on site, including apprentices.",
    ],
    correctIndex: 2,
    explanation:
      "BS 7671 Reg 510.3 explicitly requires equipment to be selected and erected taking account of manufacturer's instructions. The ferrule requirement is one such instruction. Working around it by twisting or by substituting tools defeats the manufacturer's design and exposes the install to long-term termination failure. Heat from a poor termination is a known cause of consumer-unit fires. The right response is to get the right kit; if that's not possible, escalate.",
  },
  {
    id: 'mod5-s3-sub4-warranty',
    question:
      "A customer's two-year-old EV charger fails. The manufacturer asks for the install records. Your firm's records show the unit was torqued by feel because the calibrated torque driver was being used by another team. What's the warranty position?",
    options: [
      "It tells you the torque settings for the terminals, the conductor sizes the unit accepts, whether ferrules are required for stranded conductors, the breaking capacity, the trip curve, and the IP rating in its housing — all of which feed directly into compliance with BS 7671 Reg 526.1 (durable connections) and Reg 510.3 (selection and erection in line with mfr instructions). Skip the data sheet and you're terminating by feel, which voids warranty AND fails Reg 526.1.",
      "5-Whys is a root-cause analysis technique from manufacturing (Toyota Production System). Ask 'why?' five times to drill from symptom to root cause. Example: (1) Why did the breaker trip? — earth leakage. (2) Why was there earth leakage? — water in junction box. (3) Why was there water? — ceiling void leak. (4) Why was there a leak? — failed valve seal. (5) Why did the valve fail? — installed wrong rating for the pressure. Root cause: wrong-rated valve at install. Without the 5-Whys, you'd fix the JB (level 2 cause) but the leak returns. With it, you fix the valve too (root cause). Customer needs both fixes; firm needs to specify both in quotes.",
      "Alternative Dispute Resolution — out-of-court mechanisms for resolving consumer disputes (mediation, conciliation, arbitration). Under the Alternative Dispute Resolution for Consumer Disputes Regulations 2015 you must signpost customers to a certified ADR provider when an internal complaint is unresolved (you're not always required to USE ADR but you must offer it). MCS-registered installers must be members of an approved ADR scheme via RECC or HIES.",
      "Warranty is at risk. Most equipment warranties are conditional on installation in accordance with the manufacturer's instructions. Failure to use the specified torque value (and the records to prove it) is a documented deviation that gives the manufacturer grounds to void the warranty. The cost of replacement falls on your firm, not the manufacturer. Equally, if the failure caused damage (fire, downstream equipment), the firm's insurance position is weakened. Reading and following the data sheet is also a commercial discipline, not just a technical one.",
    ],
    correctIndex: 3,
    explanation:
      "Manufacturer warranties are conditional contracts. Almost every electrical equipment warranty has a clause requiring installation in accordance with the manufacturer's instructions; deviation gives the manufacturer grounds to refuse the claim. The combined effect — Reg 526.1 / 510.3 compliance issue + warranty void + insurance weakening — means the firm picks up the full cost of failure. By year three you should treat the data sheet as a commercial document as well as a technical one.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which BS 7671 regulation explicitly requires connections to provide durable electrical continuity and adequate mechanical strength?",
    options: [
      "A work-related FATALITY or a SPECIFIED INJURY (Schedule 1) — fracture (excl fingers/thumbs/toes), amputation, sight loss, crush injury, serious burn, scalping, head-injury unconsciousness, enclosed-space injury. Phone HSE on 0345 300 9923; F2508 follows within 10 days.",
      "Reg 526.1 — 'Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection.' This is the formal hook for torque values, ferrule requirements, conductor preparation and termination sequence.",
      "A mask that doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t seal properly to the face provides much less protection than its rated assigned protection factor. Face-fit testing (qualitative or quantitative) confirms the fit. HSE INDG479 is the guide. Fit-test required at first issue and on changes (weight, dental work, beard growth).",
      "A fixed appliance is contributing leakage. Disconnect the dishwasher at its connection unit, retest. If IR rises above 1 MΩ the dishwasher was the cause. Disconnect the LED driver at the downlights, retest. The reading should now reflect the cable insulation alone — typically tens or hundreds of MΩ.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 526.1 is the headline connection regulation in BS 7671. The wording — 'durable electrical continuity and adequate mechanical strength' — is what the torque value, the ferrule, the conductor preparation and the termination sequence are all collectively achieving. Failing to follow the manufacturer's specific instructions for any of those is a Reg 526.1 risk.",
  },
  {
    id: 2,
    question:
      "What is the link between BS 7671 Reg 510.3 and manufacturer instructions?",
    options: [
      "True adaptability requires actively regulating emotional resistance to change, maintaining effectiveness during ambiguity, proactively seeking new approaches, and flexing strategies without losing core values — it is an emotionally regulated, intentional process, not passive compliance",
      "Replace the periodic inspection with reliance on the O&M regime under GN3 guidance — formal periodic can be reduced or replaced where an effective management system with competent permanent on-site maintenance staff is in place. The decision must be documented and the management regime evidenced.",
      "Reg 510.3 — 'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions.' Selection AND erection. The 'take account of manufacturers' instructions' clause is what makes the data sheet effectively part of the standard.",
      "Depositing controlled waste, or knowingly permitting the deposit of controlled waste, in or on land without an environmental permit; treating, keeping or disposing of controlled waste without a permit; treating, keeping or disposing of controlled waste in a manner likely to cause pollution of the environment or harm to human health. Fly-tipping is the headline s.33 offence.",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 510.3 is the bridge between BS 7671 and the manufacturer's data sheet. By making compliance with manufacturer's instructions a regulatory requirement, BS 7671 effectively pulls those instructions into the standard. Skip the data sheet and you're not just risking the warranty — you're potentially in breach of BS 7671 itself.",
  },
  {
    id: 3,
    question:
      "Why does over-torquing a circuit terminal in a consumer unit cause problems?",
    options: [
      "Report it to your insurer promptly within the timeframe specified in the policy (often within 7-30 days). Preserve evidence (photos, statements, certificates). Don't admit liability — let the insurer handle the negotiation. Failure to notify within the policy timeframe can void cover for that claim.",
      "All failures on Critical (A) assets, repeated failures on any asset, failures with safety or environmental consequences, and any failure that reveals a gap in the current maintenance programme — the goal is to learn from every significant failure and prevent recurrence",
      "Make safe by reinstating the bonding connection if competent and equipped to do so, then test continuity, then code based on the as-found evidence — typically C2 (potentially dangerous, urgent action) for absent main protective bonding to an extraneous-conductive-part. Document the as-found state and the corrective action.",
      "Over-torquing crushes the conductor strands, deforms the terminal, can crack the device housing, and reduces the long-term mechanical and electrical reliability of the connection. It also voids the manufacturer's warranty (most warranties are explicitly conditional on the specified torque) and creates a Reg 526.1 risk because a damaged connection is no longer 'durable'.",
    ],
    correctAnswer: 3,
    explanation:
      "The torque value specified by the manufacturer is the result of design analysis — too low and the connection isn't tight enough, too high and the conductor or terminal is damaged. Both extremes fail Reg 526.1. The torque-by-feel method consistently produces over-torquing on circuit terminals (because operatives instinctively think 'tighter = better') and under-torquing on incomers (because they're physically harder to reach). A calibrated torque screwdriver fixes both.",
  },
  {
    id: 4,
    question:
      "Where would you typically find a manufacturer's torque value for a circuit terminal in a domestic consumer unit?",
    options: [
      "Inside the consumer unit lid (typically printed on a label), in the manufacturer's data sheet for the device, in the manufacturer's app, or on the manufacturer's website. The lid label is the most accessible on site; the data sheet is the authoritative source.",
      "XLPE insulation must be handled with extreme cleanliness — contamination (fingerprints, moisture, dust) on the insulation surface can cause partial discharge sites and eventual failure",
      "Pacesetting and commanding — pacesetting creates anxiety through unrealistic expectations when overused, and commanding creates fear through coercive demands. Both have narrow appropriate applications but are destructive as default styles",
      "The employer must investigate the grievance promptly, take the allegations seriously, follow the ACAS Code of Practice on grievance procedures, protect the apprentice from victimisation, and take appropriate action based on the findings",
    ],
    correctAnswer: 0,
    explanation:
      "Most domestic CU manufacturers — Hager, Wylex, Schneider, Crabtree — print the torque values on a label inside the lid or in the user manual in the box. The data sheet on the manufacturer's website is the authoritative version (the lid label can fade or be removed). Many manufacturers now provide apps that include torque tables and product registration for warranty.",
  },
  {
    id: 5,
    question:
      "What does 'workmanship' mean in BS 7671 Reg 134.1.1?",
    options: [
      "(1) Identify circuit (label, drawings, customer info — hypothesis only). (2) Isolate (operate the breaker / switch — confirm it's the right one). (3) Lock-off (apply a personal padlock + tag with your name + date). (4) Prove the tester on a known live source (Martindale GVD2 proving unit OR a known live socket nearby) — voltage tester only. (5) Test the circuit at the work point (between L–N, L–E, N–E) — voltage tester only. (6) Re-prove the tester on the same known live source. Multimeters do NOT prove dead. Socket testers do NOT prove dead. Only a GS38 voltage tester does.",
      "Reg 134.1.1 requires that 'good workmanship by competent persons and proper materials shall be used in the erection of the electrical installation'. This is the workmanship hook — how the install is physically put together has to meet trade-standard quality. Includes correct torque, correct conductor preparation, neat termination, secure containment, proper labelling. Workmanship is what distinguishes a competent install from one that just barely passes test.",
      "Read the RAMS for the job before you start so you understand the planned controls. Attend the toolbox talks and sign the register. Operate within the scope of any permit-to-work — never extend the work beyond what the permit authorises. Flag anything you see on site that doesn't match the RAMS. HASAWA s.7 makes all of this a personal duty.",
      "The Local Authority — specifically the Environmental Health team of the local council. The Health and Safety (Enforcing Authority) Regulations 1998 allocate retail, office, leisure, residential care, places of worship and similar lower-risk premises to local-authority enforcement. EHOs have the same HASAWA powers as HSE inspectors — entry, inspection, notices, prosecution.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 134.1.1 is the workmanship requirement. It sits alongside Reg 526.1 (connections) and Reg 510.3 (selection and erection per mfr instructions) as the trio that governs how the install is physically built. 'Good workmanship by competent persons' is a flexible test but in practice it covers correct torque, neat terminations, secure containment, conductor preparation, and the visible quality of the install.",
  },
  {
    id: 6,
    question:
      "Most equipment warranties are conditional on what?",
    options: [
      "Only when (a) you're trained in extinguisher use; (b) the fire is small (waste-bin sized); (c) you can identify the correct extinguisher class for the fire; (d) the route to a safe exit is behind you (you don't have to pass the fire to escape); (e) you can do so without risking yourself; (f) someone else has called 999 or is doing so. Otherwise EVACUATE.",
      "A space substantially enclosed (whether or not entirely) and where a 'specified risk' could arise — fire/explosion (gas, vapour, dust), loss of consciousness from fumes or lack of oxygen, drowning, asphyxiation from free-flowing solid, or trapping/heat-related illness. Reg 4 prohibits entry unless reasonably practicable to do the work without entering. Reg 5 requires a safe system of work (entry permit, atmospheric monitoring, rescue arrangements) where entry is necessary.",
      "Installation in accordance with the manufacturer's instructions, including torque values, conductor preparation, environmental conditions and any product registration the manufacturer requires. Deviation gives the manufacturer grounds to void the warranty. Some manufacturers (especially EV charger and solar manufacturers) require product registration within a specified period after install.",
      "The 110 V supply on site is centre-tapped earthed (CTE), so the voltage between either leg and earth is only 55 V. A faulty tool that ends up with the case live to one leg only puts 55 V between the casing and the operative, not 230 V. Combined with a 30 mA RCD at the transformer this dramatically reduces shock energy and survivability if something goes wrong.",
    ],
    correctAnswer: 2,
    explanation:
      "The standard form of an equipment warranty is a conditional contract — the manufacturer guarantees the product against defect provided the buyer (or installer) complies with specified conditions. Failure to install per the data sheet is the most common warranty-voiding failure. By year three you should be reading the warranty terms as well as the technical data — they're usually on the same page or in the same document.",
  },
  {
    id: 7,
    question:
      "What's the typical torque value for a circuit terminal in a Hager domestic RCBO?",
    options: [
      "On any multi-discipline project of meaningful size, BIM is how electrical coordinates with structural, mechanical, architectural and fire engineering disciplines. The L3 designer who cannot read or contribute to a BIM model is locked out of a growing share of commercial, public sector and HRRB work where BIM is the procurement default.",
      "Customer / occupier may be a dutyholder under various capacities: HASAWA s.4 (controller of non-domestic premises); CAR 2012 Reg 4 (asbestos register); CDM 2015 Reg 4 (client). Domestic-customer client duties largely cascade to contractor under CDM.",
      "The line conductor is not easily accessible at the CU end (e.g. busbar trunking systems), the circuit is part of a complex distribution network where you want to isolate the CPC verification, or the wander lead is more practical on a large commercial site (one person at the MET, radio contact with the tester at the accessory).",
      "Around 1.2 Nm for the circuit terminals, around 3.5 Nm for the incomers (verify against the specific data sheet — values vary by product line and update cycle). Hager publishes the torques inside the CU lid, in the data sheet, and in the Hager Pro app. Wylex and Schneider have similar values for equivalent products.",
    ],
    correctAnswer: 3,
    explanation:
      "Domestic CU circuit terminals across the major UK brands (Hager, Wylex, Schneider, Crabtree) sit broadly in the 0.8–1.5 Nm range for circuit terminations and 2.5–4 Nm for incomers. The specific value depends on the product and you always verify against the current data sheet — values can change between revisions. A calibrated torque screwdriver in the 0.5–5 Nm range covers most domestic work.",
  },
  {
    id: 8,
    question:
      "If the manufacturer's instructions conflict with custom-and-practice on a particular installation, which takes precedence?",
    options: [
      "The manufacturer's instructions — BS 7671 Reg 510.3 explicitly requires equipment to be selected and erected taking account of those instructions. 'How it's always been done' isn't a defence under BS 7671 or in a warranty claim. If you genuinely think the instructions are wrong (rare), the right response is to contact the manufacturer in writing and seek written clarification before deviating.",
      "Full incident details — date, time, location, casualty(ies) details, what happened, what they were doing, what equipment/substance involved, the kind of accident, the injury, who else was involved, any witness information, action taken since. Full and accurate completion is the responsible person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s job; gathering the facts is often the L3 operative\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s job.",
      "Employers, employees and the self-employed — all three categories carry duties under EAWR. Employers have the heaviest set of duties (Reg 4 systems, Reg 13 isolation, Reg 16 competence, etc.). Employees have a duty to cooperate (Reg 3(2)(b)). Self-employed contractors have employer-equivalent duties when working on their own account.",
      "Is a ±12 V PWM (pulse width modulation) signal between the EVSE and the vehicle that communicates: EVSE availability, maximum available current (encoded in the PWM duty cycle), vehicle connected status, and charge enable/disable — it is the fundamental communication protocol for AC charging",
    ],
    correctAnswer: 0,
    explanation:
      "Custom-and-practice has no legal standing against either BS 7671 or a manufacturer warranty. The data sheet wins. Apprentices arriving on site sometimes meet experienced electricians with strong opinions — 'we don't bother with that' or 'the data sheet is overkill'. The right response is to follow the data sheet, document any deviation properly if it's genuinely unavoidable, and keep your own training and your own evidence trail clean.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Do I really need a calibrated torque screwdriver for domestic CU work?",
    answer:
      "Yes. The manufacturer's torque values are specified to two decimal places in some cases; hitting them by feel isn't credible. A 0.5–5 Nm calibrated torque screwdriver covers most domestic CU work and is one of the cheapest pieces of professional kit you'll buy. The screwdriver should be calibrated annually (the manufacturer typically supplies a calibration certificate; recalibration is offered by most tool service centres). Without it, your terminations are not demonstrably compliant with BS 7671 Reg 526.1.",
  },
  {
    question: "What's the difference between data sheet and installation instructions?",
    answer:
      "The data sheet is the technical specification — torque values, conductor capacities, breaking capacities, IP ratings, dimensions. Installation instructions are the step-by-step guidance for installing the product — sequence, mounting, connection method, commissioning checks. Larger products (boards, EV chargers, solar inverters) usually have both. Smaller products (RCBOs, accessories) usually combine them in a single document. BS 7671 Reg 510.3 covers both.",
  },
  {
    question: "If I work to a torque value but don't record it, does that count?",
    answer:
      "It counts technically but it's weak evidentially. The HSE inspector or warranty assessor asking 'how do we know you torqued to spec?' won't accept 'I always do'. Most reputable firms have a torque-record practice — either a tick on the schedule of test results, a photo of the calibrated torque screwdriver next to the completed termination, or a digital record in the firm's job-management app. Five seconds of recording per CU is cheap insurance.",
  },
  {
    question: "What if the data sheet for a discontinued product isn't available any more?",
    answer:
      "Contact the manufacturer's technical support — most will retain data sheets for discontinued products and email them on request. If the manufacturer no longer exists (mergers, liquidations), the IET Wiring Matters articles, the IET Guidance Notes and equivalent product data sheets from the same era are reasonable substitutes provided you document why. Working without any data sheet on a connection-critical product (board, RCBO, distribution device) is not advisable.",
  },
  {
    question: "Does this apply to accessories like sockets and switches as well?",
    answer:
      "Yes, although the torque values for accessory terminals are typically lower (0.4–0.8 Nm) and the data sheets are simpler. The principle is the same — BS 7671 Reg 510.3 ties accessory selection and erection to the manufacturer's instructions, and Reg 526.1 ties durable connection to correct termination. A torque-by-feel approach to socket terminals is one of the most common reasons a socket runs hot under load.",
  },
  {
    question: "Where do I get the manufacturer apps that contain torque values?",
    answer:
      "Most major UK manufacturers — Hager, Schneider, Wylex, Crabtree, Aico, Niglon — publish free professional apps on iOS and Android. They typically include data sheets, torque tables, calculators, product registration for warranty, and CPD content. Search the manufacturer name in the app store; the app is usually free and registration is straightforward. Worth installing the apps for the brands you regularly install on day one.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 4"
            title="Manufacturer instructions — Reg 526.1 and warranty"
            description="BS 7671 Reg 526.1 ties durable connections to manufacturer instructions. Torque values, ferrule requirements, sequence — reading the data sheet is part of the regs, not optional reference."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 Reg 526.1 requires connections to be durable, mechanically strong and protected. Achieving that depends on the manufacturer's specific torque, ferrule and termination instructions.",
              "Reg 510.3 explicitly ties equipment selection and erection to manufacturer's instructions. The data sheet is effectively part of the standard, not optional reference material.",
              "Warranty is conditional on installation in accordance with the manufacturer's instructions. Torquing by feel voids warranty AND fails Reg 526.1 — double penalty for the same shortcut.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 / AC 2.2 (purpose of workplace information). Not directly mapped to a single 210 AC. Reading manufacturer data is a Level 2 skill applied across the rest of the qualification.",
              "Identify BS 7671 Reg 526.1 as the regulatory hook for durable electrical continuity and adequate mechanical strength of connections.",
              "Identify BS 7671 Reg 510.3 as the regulatory hook tying equipment selection and erection to manufacturer's instructions.",
              "Identify BS 7671 Reg 134.1.1 as the workmanship requirement underpinning the physical build quality of the install.",
              "State the typical torque values for circuit terminals (around 1.2 Nm) and incomers (around 3.5 Nm) in domestic consumer units across the major UK brands (Hager, Wylex, Schneider, Crabtree) — verifying always against the specific data sheet.",
              "Recognise the link between deviation from manufacturer instructions and warranty voiding — most equipment warranties are conditional contracts.",
              "Apply the rule of pre-termination data-sheet review — read the torque value and any ferrule or preparation requirement BEFORE starting the termination, not after.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why the data sheet is part of the regs</ContentEyebrow>

          <ConceptBlock
            title="Reg 510.3 — the bridge between BS 7671 and manufacturer instructions"
            plainEnglish="BS 7671 Reg 510.3 explicitly requires equipment to be selected AND erected so as to allow compliance with the regulations, taking account of the manufacturer's instructions. That last clause — 'take account of manufacturers' instructions' — is what makes the data sheet effectively part of the regulatory standard. Working without reference to the data sheet isn't just risky on warranty; it's risky on BS 7671 compliance."
            onSite="The bridge regulation is one of the most important to know by name. When you're challenged on why you read the data sheet — by an impatient supervisor, a customer wanting the job finished — the answer is 'Reg 510.3'. The regs themselves require it; you're not being pedantic, you're discharging the standard."
          >
            <p>
              The chain of regulations governing manufacturer-instruction compliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 510.3</strong> — equipment shall be selected and erected to allow
                compliance with the regs and shall take account of manufacturers' instructions.
                The bridge.
              </li>
              <li>
                <strong>Reg 526.1</strong> — every connection shall provide durable electrical
                continuity and adequate mechanical strength and protection. The connection
                regulation that depends on torque and termination method.
              </li>
              <li>
                <strong>Reg 134.1.1</strong> — good workmanship by competent persons and proper
                materials shall be used. The workmanship test.
              </li>
              <li>
                <strong>Reg 132.13</strong> — the designer shall provide the information
                necessary for safe operation, inspection and maintenance. Mfr data is part of
                that information pack.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Reg 526.1 (Electrical connections)"
            clause={
              <>
                &quot;Every connection between conductors or between a conductor and other
                equipment shall provide durable electrical continuity and adequate mechanical
                strength and protection.&quot;
              </>
            }
            meaning={
              <>
                Reg 526.1 is the headline connection regulation. &apos;Durable&apos; means it
                stays good over time. &apos;Adequate mechanical strength&apos; means it
                doesn&apos;t fail under foreseeable stress. &apos;Protection&apos; covers the
                electrical and physical containment. All three depend on doing the connection
                the way the manufacturer designed it &mdash; correct conductor preparation,
                correct torque, correct ferrules where specified, correct sequence. Skip any of
                those and the connection is not demonstrably compliant.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022 IET Wiring Regulations, Chapter 52 — Selection and Erection of Wiring Systems, Reg 526.1 (verbatim)."
          />

          <RegsCallout
            source="BS 7671 — Reg 510.3 (General — selection and erection)"
            clause={
              <>
                &quot;Every item of equipment shall be selected and erected so as to allow
                compliance with the regulations stated in this chapter and the relevant
                regulations in other parts of BS 7671 and shall take account of manufacturers&apos;
                instructions.&quot;
              </>
            }
            meaning={
              <>
                Reg 510.3 ties the manufacturer&apos;s instructions directly to BS 7671
                compliance. If the data sheet specifies a torque, that torque is part of how you
                achieve a code-compliant install. The phrase &apos;take account of&apos; has been
                interpreted in industry practice as &apos;follow unless there&apos;s a documented
                reason not to&apos; &mdash; ignoring the instructions is not an option that the
                regulation contemplates.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022 IET Wiring Regulations, Chapter 51 — Common Rules, Reg 510.3."
          />

          <RegsCallout
            source="BS 7671 — Reg 134.1.1 (Workmanship)"
            clause={
              <>
                &quot;Good workmanship by competent persons and proper materials shall be used in
                the erection of the electrical installation. Such installation shall include all
                items of electrical equipment selected as defined in Chapter 51 ...&quot;
              </>
            }
            meaning={
              <>
                Reg 134.1.1 is the workmanship test. &apos;Good workmanship&apos; is a flexible
                term but in practice it covers correct torque, neat terminations, secure
                containment, conductor preparation, proper labelling, and the visible quality of
                the install. An EICR observation of poor workmanship will typically cite Reg
                134.1.1 alongside the more specific regulation that the poor workmanship caused
                a breach of (Reg 526.1 for a poor connection, Reg 522 for poor mechanical
                protection).
              </>
            }
            cite="Source: BS 7671:2018+A2:2022 IET Wiring Regulations, Chapter 13 — Fundamental Principles, Reg 134.1.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="What 'durable connection' actually requires — four properties"
            plainEnglish="Reg 526.1 sets out four properties of a compliant connection — durable electrical continuity, adequate mechanical strength, adequate protection, and (by reference to other regs) it should remain so for the operating life of the install. Each property depends on a specific aspect of how the connection is made. Torque achieves continuity and mechanical strength. Conductor preparation achieves continuity. Enclosure achieves protection. Material selection achieves durability."
            onSite="Most termination failures aren't dramatic — they're slow. A loose connection runs hot, the heat oxidises the contact, the resistance climbs, the heat increases. Months or years later the connection fails. The properties that prevent that failure are all set at the moment of installation; once the cover goes on, they're locked in until the next inspection."
          >
            <p>
              The four properties of a Reg 526.1-compliant connection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Durable electrical continuity</strong> &mdash; the connection conducts
                current with low and stable resistance over the install&apos;s life. Depends on
                clean conductors, correct preparation, and the manufacturer&apos;s specified
                contact pressure.
              </li>
              <li>
                <strong>Adequate mechanical strength</strong> &mdash; the connection holds
                under foreseeable mechanical stress (vibration, thermal cycling, conductor
                tension). Depends on torque value and any ferrule / strain-relief provisions.
              </li>
              <li>
                <strong>Adequate protection</strong> &mdash; the connection is protected from
                contact, ingress and mechanical damage. Depends on the enclosure, IP rating
                and termination accessibility.
              </li>
              <li>
                <strong>Operating-life durability</strong> &mdash; pulls in material
                compatibility (don&apos;t mix dissimilar metals without protection), thermal
                compatibility (don&apos;t terminate inside a hot enclosure with heat-sensitive
                conductors), and environmental compatibility (correct IP rating for the
                location).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Torque values across the major UK brands</ContentEyebrow>

          <ConceptBlock
            title="Knowing where to look — and verifying always against the current data sheet"
            plainEnglish="Each major UK consumer-unit brand publishes torque values in three places — inside the lid of the CU on a label, in the product data sheet on the website, and in the manufacturer's professional app. The values in the table below are typical for domestic circuit terminals and incomers; they're a starting point only — always verify against the specific data sheet for the specific product because values can change between revisions."
            onSite="By the end of year one you'll know roughly what torque the major brands use. By year three you'll be checking the data sheet automatically before every CU change because you've seen what under-torque and over-torque look like in the field. The 30-second check is one of the cheapest pieces of professional discipline you build."
          >
            <div className="space-y-3">
              <p className="text-[14px] leading-relaxed">
                Typical domestic CU torque values across the major UK brands — table for desktop,
                card list for mobile. Always verify against the specific product data sheet.
              </p>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
                <table className="w-full text-[13px]">
                  <thead className="bg-white/[0.04] text-white/80 text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium">Brand</th>
                      <th className="px-3 py-2 font-medium">Circuit terminal</th>
                      <th className="px-3 py-2 font-medium">Incomer / busbar</th>
                      <th className="px-3 py-2 font-medium">Where to find</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/85">
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Hager</td>
                      <td className="px-3 py-2">~1.2 Nm</td>
                      <td className="px-3 py-2">~3.5 Nm</td>
                      <td className="px-3 py-2">Lid label, data sheet, Hager Pro app</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Wylex</td>
                      <td className="px-3 py-2">~1.2 Nm</td>
                      <td className="px-3 py-2">~3.0 Nm</td>
                      <td className="px-3 py-2">Lid label, data sheet</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Schneider</td>
                      <td className="px-3 py-2">~1.2 Nm</td>
                      <td className="px-3 py-2">~3.5 Nm</td>
                      <td className="px-3 py-2">Lid label, data sheet, mySchneider app</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Crabtree</td>
                      <td className="px-3 py-2">~1.0 Nm</td>
                      <td className="px-3 py-2">~3.0 Nm</td>
                      <td className="px-3 py-2">Lid label, data sheet</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden space-y-2">
                {[
                  {
                    brand: 'Hager',
                    circuit: '~1.2 Nm',
                    incomer: '~3.5 Nm',
                    where: 'Lid label, data sheet, Hager Pro app',
                  },
                  {
                    brand: 'Wylex',
                    circuit: '~1.2 Nm',
                    incomer: '~3.0 Nm',
                    where: 'Lid label, data sheet',
                  },
                  {
                    brand: 'Schneider',
                    circuit: '~1.2 Nm',
                    incomer: '~3.5 Nm',
                    where: 'Lid label, data sheet, mySchneider app',
                  },
                  {
                    brand: 'Crabtree',
                    circuit: '~1.0 Nm',
                    incomer: '~3.0 Nm',
                    where: 'Lid label, data sheet',
                  },
                ].map((row) => (
                  <div
                    key={row.brand}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <div className="text-[13px] font-semibold text-white">{row.brand}</div>
                    <div className="mt-1 text-[12px] text-white/75">
                      Circuit terminal: <span className="text-elec-yellow/90">{row.circuit}</span>
                    </div>
                    <div className="text-[12px] text-white/75">
                      Incomer / busbar:{' '}
                      <span className="text-elec-yellow/90">{row.incomer}</span>
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/55">Where: {row.where}</div>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-white/55 italic leading-relaxed">
                These values are typical examples for domestic consumer-unit terminations. They
                are not a substitute for the manufacturer&apos;s current data sheet for the
                specific product you are installing. Values can change between product revisions
                &mdash; verify before every job.
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Calibrated torque screwdrivers — what to buy, how to maintain"
            plainEnglish="A calibrated torque screwdriver is the tool that translates the manufacturer's torque value into an actual force at the terminal. The standard professional choice is a 0.5–5 Nm range with an audible click at the set value. It needs annual recalibration to stay credible — most tool service centres offer the service and supply a calibration certificate."
            onSite="Treat the torque screwdriver as a measuring instrument, not a tool. Don't drop it. Don't use it as a regular screwdriver — that defeats the calibration. Don't store it under tension (always release the spring back to the lowest setting before storage). Replace the screwdriver when the calibration has drifted beyond the service centre's tolerance and recalibration isn't economic."
          >
            <p>
              The professional kit and care:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Range</strong> &mdash; 0.5&ndash;5 Nm covers most domestic CU work
                (circuit terminals 1.0&ndash;1.2 Nm, incomers up to 3.5 Nm). Industrial work
                often needs a higher-range unit (5&ndash;25 Nm) as well.
              </li>
              <li>
                <strong>Click action</strong> &mdash; an audible click at the set value
                signals you&apos;ve reached torque. Don&apos;t keep turning after the click.
              </li>
              <li>
                <strong>Calibration</strong> &mdash; annual recalibration is the standard. The
                service centre supplies a calibration certificate; keep it with your tools.
              </li>
              <li>
                <strong>Storage</strong> &mdash; release the spring to the lowest setting before
                storage. Storing under tension drifts the calibration.
              </li>
              <li>
                <strong>Bit selection</strong> &mdash; use the bit specified by the terminal
                manufacturer (usually a specific Pozidriv or hex). Wrong bit = damaged
                terminal head.
              </li>
              <li>
                <strong>Don&apos;t double-up</strong> &mdash; don&apos;t use the torque
                screwdriver as a regular driver between calibrations. The shock loading
                shortens its useful life.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Connection types and the ferrule question</ContentEyebrow>

          <ConceptBlock
            title="Cage clamp, screw terminal, and when ferrules are mandatory"
            plainEnglish="UK consumer units typically use either screw terminals (clamping the conductor under a screw against a metal contact) or cage clamp terminals (a spring-loaded clamp that holds the conductor against a contact bar). Both have specific manufacturer requirements. For stranded conductors above a certain CSA, ferrules are often mandatory — they stop strands escaping or spreading under the clamp."
            onSite="Solid conductors (e.g. T&E up to 6mm²) usually go straight into the terminal without preparation beyond stripping. Stranded conductors (panel wiring, control circuits, larger sizes) often need ferrules — the data sheet will specify when. Substituting twisted strands for ferrules is a common shortcut and a common cause of long-term termination failure."
          >
            <p>
              Connection method by typical product type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic CU RCBO / MCB</strong> — typically screw terminals. T&amp;E up
                to 6mm² straight in. Stranded panel wire above 1mm² often needs a ferrule per
                the data sheet.
              </li>
              <li>
                <strong>Industrial / commercial board</strong> — typically cage clamp on
                control gear, screw on power. Ferrules effectively standard on stranded conductors.
              </li>
              <li>
                <strong>Switchgear / contactors</strong> — varies. Some manufacturers require
                ferrules above 0.5mm² stranded; others above 1mm² or 2.5mm². Always read the data
                sheet.
              </li>
              <li>
                <strong>EV charger / solar inverter terminals</strong> — typically heavy-duty
                screw terminals with strict torque values. Ferrules mandatory on stranded
                conductors. Warranty depends on it.
              </li>
              <li>
                <strong>Accessories (sockets, switches)</strong> — typically screw terminals.
                Solid T&amp;E straight in. Stranded flex usually needs preparation per the
                accessory manufacturer&apos;s instructions.
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
            title="Where the data sheet typically lives — six places to look"
            plainEnglish="Manufacturers publish data sheets in multiple locations precisely because installers don't always get to the website. The six common locations: inside the consumer-unit lid (printed label), in the original packaging insert, on the manufacturer's website (search by product code), in the manufacturer's professional app, in the wholesaler's product portal, and in the trade reference apps (e.g. Amtech / Trimble Wiring app for cross-product reference)."
            onSite="By year one you should know how to find the data sheet for any product on the van within a couple of minutes. By year three the manufacturer apps are on your phone for the brands you regularly install — Hager Pro, mySchneider, the Wylex app. The apps usually include torque tables, the data sheets, calculators, and product registration for warranty."
          >
            <p>
              The six places, ranked by speed of access on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer&apos;s app</strong> &mdash; usually the fastest if installed.
                Search by product code, the data sheet opens.
              </li>
              <li>
                <strong>Inside the CU lid</strong> &mdash; printed label with the headline
                torques. Quick reference; not the full data sheet.
              </li>
              <li>
                <strong>Manufacturer&apos;s website</strong> &mdash; always the latest version.
                Most have a downloads section indexed by product.
              </li>
              <li>
                <strong>Original packaging insert</strong> &mdash; if you still have the
                packaging from when the unit was unboxed.
              </li>
              <li>
                <strong>Wholesaler&apos;s product portal</strong> &mdash; CEF, City Electrical
                Factors, Edmundson, Rexel and others publish data sheets on their product
                pages.
              </li>
              <li>
                <strong>Trade reference apps</strong> &mdash; cross-product references for
                checking when you can&apos;t find the manufacturer&apos;s own.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Warranty and the commercial cost of deviation</ContentEyebrow>

          <ConceptBlock
            title="Warranty is a conditional contract — and 'condition' usually means 'install per data sheet'"
            plainEnglish="Almost every electrical equipment warranty is a conditional contract. The manufacturer guarantees the product against defect provided the installer complies with the data sheet — torque, conductor preparation, environmental conditions, sometimes product registration. Deviation gives the manufacturer grounds to refuse the warranty claim. The cost of replacement falls on the firm, not the manufacturer."
            onSite="Warranty voiding doesn't usually come up until something fails. By then the records have to show the install was compliant — torque value used, calibrated tool ID, install date, registration submitted where required. Firms that maintain those records survive warranty disputes; firms that don't pay for replacements out of margin. As an apprentice your job is to follow the data sheet AND keep the record."
          >
            <p>
              Where warranty conditions typically bite:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Torque value</strong> — &quot;installed in accordance with the data sheet
                torque specifications&quot; is a standard warranty condition. Records of torque
                value used, screwdriver ID and date are evidence in dispute.
              </li>
              <li>
                <strong>Product registration</strong> — common on EV chargers, solar inverters
                and some heat pumps. Failure to register within (typically) 30 days voids
                extended warranty.
              </li>
              <li>
                <strong>Environmental conditions</strong> — IP rating, temperature range,
                humidity. Installing an indoor-rated unit outdoors voids warranty. Section 9 of
                the data sheet gives the limits.
              </li>
              <li>
                <strong>Connection type</strong> — using twisted strands where ferrules are
                specified, using the wrong cable type, exceeding the conductor CSA limit. All
                deviations from the data sheet.
              </li>
              <li>
                <strong>Commissioning</strong> — some manufacturers require specific
                commissioning steps (test sequence, firmware update, configuration). Skipping
                them voids warranty.
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
            title="Recording torque — five seconds that closes the loop"
            plainEnglish="Hitting the right torque value is half the job; recording that you did is the other half. The record is what evidences compliance with Reg 526.1 and protects the warranty position. Standard practice: a tick or value entered against each circuit on the schedule of test results, a photo of the torque screwdriver next to the completed termination, or a digital entry in the firm's job-management app."
            onSite="The recording habit takes seconds and removes any later ambiguity. Apprentices who build it early find that the schedule of test results becomes a complete record of the install, useful at handover, useful at any later inspection, and useful in any warranty claim. Apprentices who don't tend to be in arguments later about whether the work was done properly."
          >
            <p>
              Where the torque value typically gets recorded:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Schedule of test results</strong> &mdash; many firms add a torque column
                or a tick box per circuit. The schedule is part of the BS 7671 Reg 132.13
                handover pack, so the torque record travels with the install.
              </li>
              <li>
                <strong>Photo evidence</strong> &mdash; a quick phone photo of the torque
                screwdriver (showing the set value) next to the completed termination, with the
                CU label in shot for context.
              </li>
              <li>
                <strong>Digital app entry</strong> &mdash; firms using job-management apps
                (Tradify, Powered Now, Procore) typically have a place to log torque values
                and tool serial numbers per termination.
              </li>
              <li>
                <strong>Tool calibration record</strong> &mdash; the calibration certificate
                for the torque screwdriver, kept with the firm&apos;s QA records. Links the
                actual torque applied to a calibrated instrument with traceability.
              </li>
              <li>
                <strong>Manufacturer registration</strong> &mdash; for products requiring
                registration for extended warranty (EV chargers, solar inverters), the
                registration record itself confirms install in accordance with the data sheet.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Torquing 'by feel' because you've forgotten the spec or the calibrated tool isn't to hand"
            whatHappens={
              <>
                Apprentice and electrician are completing a CU change late in the day. The
                calibrated torque screwdriver has been left in the other van. The electrician
                says &quot;just nip them up firm, it&apos;ll be fine&quot;. The apprentice
                tightens the circuit terminals as instructed. Six months later one of the
                circuits starts tripping intermittently under load; investigation finds the
                terminal screw is loose and the conductor has been crushed. The fault wasn&apos;t
                a defect in the RCBO &mdash; it was the termination. The manufacturer refuses
                the warranty claim because the install records don&apos;t show torque values.
                The firm pays for the replacement RCBO, the call-out, and the customer&apos;s
                inconvenience.
              </>
            }
            doInstead={
              <>
                Carry a calibrated torque screwdriver on every job &mdash; one per van is the
                standard. If the calibrated tool isn&apos;t available, the work doesn&apos;t
                start. &quot;Nip them up firm&quot; isn&apos;t a defensible installation method
                under BS 7671 Reg 526.1 or under any manufacturer warranty. Record the torque
                value used (a tick on the schedule of test results, or a photo of the
                screwdriver next to the completed termination, is enough). The discipline takes
                seconds; the alternative is the call-back and the warranty fight.
              </>
            }
          />

          <Scenario
            title="6mm² T&E into a Hager RCBO — finding and applying the torque"
            situation={
              <>
                You&apos;re terminating a 6mm² twin-and-earth into a Hager RCBO during a CU
                change. You&apos;ve isolated, proved dead, prepared the conductors (stripped to
                the right length, sleeved the CPC). The supervisor is on the phone in the
                kitchen. You don&apos;t remember the torque value off the top of your head and
                the lid label has been removed during the work.
              </>
            }
            whatToDo={
              <>
                Three sources to check, in order. First: the Hager Pro app on your phone &mdash;
                search the RCBO model number, the data sheet opens, the torque value is in the
                installation section (typically around 1.2 Nm for the circuit terminals). Second:
                the manufacturer&apos;s website &mdash; data sheets are typically in the
                downloads section. Third: the data sheet inside the RCBO packaging &mdash; if
                you still have it. Set the calibrated torque screwdriver to the specified value
                (for an unknown product, default to 1.2 Nm circuit / 3.5 Nm incomer pending
                confirmation). Make the termination, listen for the click, record the value used
                on the schedule of test results. If you&apos;re uncertain about any aspect of
                the data sheet (e.g. whether ferrules are needed for a stranded conductor),
                stop and ask the supervisor before completing.
              </>
            }
            whyItMatters={
              <>
                The pre-termination data-sheet check is one of the cleanest professional habits
                you can build. It takes 30 seconds, removes any ambiguity about the value,
                creates a record (the schedule entry), and protects the firm against warranty
                fights. Apprentices who build the habit early carry it through their career;
                those who don&apos;t end up either guessing or being challenged on terminations
                they made years ago.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Reg 526.1 requires connections to provide durable electrical continuity, adequate mechanical strength and protection. Achieving that depends on the manufacturer's specific torque, ferrule and termination instructions.",
              "BS 7671 Reg 510.3 ties equipment selection and erection to manufacturer's instructions. The data sheet is effectively part of the regulatory standard, not optional reference material.",
              "BS 7671 Reg 134.1.1 is the workmanship test. Good workmanship covers correct torque, neat terminations, secure containment and conductor preparation — the visible quality of the install.",
              "Torque values are typically printed inside the CU lid, in the product data sheet, and in the manufacturer's professional app. Calibrated torque screwdriver is professional kit, not optional.",
              "Typical domestic CU torque values across the major UK brands are around 1.2 Nm circuit / 3.0–3.5 Nm incomer — but always verify against the specific product data sheet, values can change between revisions.",
              "Warranty is a conditional contract — installation per data sheet is the standard condition. Deviation (torque, ferrules, environmental, commissioning, registration) gives grounds to void.",
              "Custom-and-practice has no standing against either BS 7671 or a manufacturer warranty. The data sheet wins — every time.",
              "Pre-termination data-sheet review takes 30 seconds. Read the torque value and any ferrule or preparation requirement BEFORE starting the termination, not after.",
            ]}
          />

          <Quiz
            title="Manufacturer instructions and Reg 526.1 — knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 COSHH data sheets
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Site diary and time sheets
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
