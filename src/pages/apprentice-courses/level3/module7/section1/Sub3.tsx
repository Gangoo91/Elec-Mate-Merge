/**
 * Module 7 · Section 1 · Subsection 3 — ECS card requirements + employer expectations
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.6
 *   AC 1.6 — "Define the different roles in building services engineering"
 *
 * The Electrotechnical Certification Scheme (ECS) card — what it is, what it
 * looks like, what colour means what, the ECS health and safety assessment,
 * specialist endorsements (PV, EV, Hazardous Areas), how to apply, what
 * employers and main contractors expect, and the practical day-to-day reality
 * of the card on UK construction sites.
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

const TITLE = 'ECS card requirements + employer expectations | Level 3 Module 7.1.3 | Elec-Mate';
const DESCRIPTION =
  'The Electrotechnical Certification Scheme (ECS) card — what it is, the ECS H&S assessment, specialist endorsements (PV, EV, Hazardous Areas), how to apply, and what employers and main contractors expect on UK sites.';

const checks = [
  {
    id: 'mod7-s1-sub3-purpose',
    question: "What's the ECS card actually for?",
    options: [
      "Carrying out any building, civil engineering or engineering construction work; including alteration, renovation, demolition, conversion, repair, maintenance, decoration, removal of structures, installation, removal, maintenance of mechanical / electrical / similar services.",
      "(a) Every fuse and single-pole control / protective device is in the line conductor only; (b) for circuits with an earthed neutral, ES and BC lampholders have the outer or screwed contacts connected to neutral (except E14/E27 to BS EN 60238); (c) wiring is correctly connected throughout.",
      "Three things: (1) proves your identity on site, (2) records your competence — JIB grade, qualifications, H&S assessment, specialist endorsements, (3) is required for entry on most CDM-regulated sites because main contractors use ECS as their proof-of-competence check. Without an ECS card you're typically refused entry to commercial and infrastructure sites.",
      "Because a ladder is a personal access platform that doesn't have a guardrail and depends on the user's three-point contact and footing for stability. It provides minimal collective protection. INDG401 and INDG402 (HSE guidance) limit ladder use to short-duration tasks (typically up to 30 minutes at one location), light work (one-handed work where reasonably practicable, with a free hand for grip) and where a higher control isn't reasonably practicable.",
    ],
    correctIndex: 2,
    explanation:
      "ECS is the Electrotechnical Certification Scheme run by JIB on behalf of the industry. The card is the portable evidence of competence — your JIB grade, qualifications, H&S test pass and specialist endorsements all on one card. It's the construction industry's standard proof-of-competence check; main contractors use ECS card status as a precondition for site entry alongside CSCS for non-electrical trades. Without the card most sites won't let you in.",
  },
  {
    id: 'mod7-s1-sub3-hsa',
    question:
      "What's the ECS Health and Safety Assessment and how often do you need to take it?",
    options: [
      "A 50-question multiple-choice computer-based test covering electrical-trade health and safety (HASAWA, CDM, working at height, PPE, electrical safety, manual handling). The pass mark is 80%. Valid for 3 years from pass date — must be re-taken before expiry to keep your ECS card current. Without a valid H&S assessment your ECS card lapses and you'll be refused site entry.",
      "No. The right to join (or not join) a trade union is protected by the Trade Union and Labour Relations (Consolidation) Act 1992. Employers cannot dismiss, demote, refuse to hire, or treat less favourably any worker because they're a trade union member or because they take part in lawful trade union activities. Anti-union discrimination is unlawful.",
      "Carry out a more extensive visual survey to establish the installation arrangement (reverse engineering from observation), document the limitation on the report front sheet under Section D, agree the scope of inspection with the duty holder, and note \\\\\\\\\\\\\\\"no documentation available\\\\\\\\\\\\\\\" as a limitation against affected items on the schedule.",
      "On-site assessment of the actual conditions found on arrival, by the operative(s) doing the work, in real time. Catches what the static RAMS couldn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t have known. MHSWR Reg 3 expects current assessment; the dynamic version is the closing-the-gap mechanism.",
    ],
    correctIndex: 0,
    explanation:
      "The ECS H&S Assessment (sometimes 'JIB H&S test') is the electrical-trade equivalent of the CSCS H&S test. It's specifically tuned to electrical work — covering safe isolation, BS 7671 basics, working at height, manual handling, PPE, and the regulatory framework (HASAWA, CDM, EAWR). Valid for 3 years — you must take and pass before expiry. Most testing centres charge around £20-30; the test takes about 45 minutes. Treat the renewal as a fixed-calendar item; missing it means losing site access until you re-pass.",
  },
  {
    id: 'mod7-s1-sub3-endorsements',
    question:
      "What are 'endorsements' on the ECS card and why do they matter?",
    options: [
      "Standard route: existing Electrician JIB grade + AM2S (Solar PV variant of AM2) OR an MCS-recognised PV installer course (typically a 5-day course covering PV system design, installation, commissioning and the MCS install standard) + employer firm registers with MCS for PV. The individual electrician holds the PV competence; the firm holds the MCS registration. Some installers also pursue the BPEC Solar PV course.",
      "Endorsements are formal recognitions of additional specialist competence printed on your ECS card — Solar PV (after AM2S), EV Charging (after the EV competency course), Hazardous Areas (after CompEx), Fire Detection (after BAFE training), and others. They prove to main contractors and clients that you hold the specialist competence required for that work — increasingly necessary as the trade specialises.",
      "Same as PV — durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. Wind connections fall under the same ENA G98 (≤16 A per phase) or G99 (&gt;16 A per phase) framework as PV. The DNO needs to know the installation exists; the maintainer who turns up to a fault call needs to know there's a parallel generator.",
      "3 V — pass. Calculation: Ra x I delta n = 100 x 0.030 = 3 V. The acceptance criterion (Reg 411.5.3(b)) is Ra x I delta n less than or equal to 50 V (the conventional touch-voltage limit). 3 V is well within 50 V — the RCD will operate well before the touch-voltage approaches dangerous level. For the same Ra with a 100 mA RCD: 100 x 0.100 = 10 V — still pass. With a 300 mA RCD: 100 x 0.300 = 30 V — still pass but tighter. The Ra x I delta n calculation is the TT-specific acceptance test.",
    ],
    correctIndex: 1,
    explanation:
      "Endorsements are how specialism is recorded on the ECS card. As the trade fragments into specialist domains (PV, EV, fire, BMS, hazardous areas) main contractors increasingly require endorsement evidence before letting you do that work. Endorsements typically require both training (e.g. AM2S for PV, the BPEC EV course) and time-served experience. Each endorsement appears as a line on your card and is searchable on the JIB ECS register.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Who runs the ECS scheme?",
    options: [
      "People, environment, services, fabric. People — pedestrians, customers, children, other trades. Environment — weather, dust, asbestos suspicion in pre-2000 homes, confined spaces, working at height. Services — concealed live cables, gas pipes, water pipes, structural steel that needs bonding. Fabric — brittle masonry, joist orientation, plaster condition.",
      "JIB (the Joint Industry Board for the Electrical Contracting Industry) operates the Electrotechnical Certification Scheme on behalf of the industry. ECS is the electrical trade's competence card scheme; CSCS is the broader construction industry's equivalent. JIB processes ECS card applications, holds the public register, sets the H&S assessment standard, and renews cards.",
      "Main protective bonding equalises potential between extraneous-conductive-parts (gas, water, structure) and the MET. The earthing conductor connects the MET back to the source earth (PEN, sheath, or local electrode) so fault current can actually return to the source — without it, no current flows and no disconnection happens.",
      "Establish a full exclusion zone with barriers minimum 6 metres from the base, deploy adequate task and area lighting, station banksmen at all access points, display warning signs, ensure all personnel wear enhanced high-visibility clothing, have a traffic management plan approved by the local authority, and confirm the rescue plan accounts for reduced visibility",
    ],
    correctAnswer: 1,
    explanation:
      "JIB administers ECS as the industry's certification scheme. The ECS register is publicly searchable at jib.org.uk — anyone can verify a card by entering the card number. This public verifiability is part of why ECS has become the default site-entry check for electrical work.",
  },
  {
    id: 2,
    question: "What information appears on the front of an ECS card?",
    options: [
      "Manages the power flow between the PV array, battery, household loads and the grid — deciding when to charge the battery from PV, when to discharge to loads, when to export to grid, and when to import from grid, based on tariff schedules and user preferences",
      "Set the switches to a known closed position, then continuity-test from line at the CU through to the switched-line terminal of the lamp. Toggle each switch in turn and verify the meter responds correctly at every step. The intermediate switch should swap the strap connections when toggled — the meter should show this in the continuity readings.",
      "Your photo, full name, formal JIB grade (Apprentice / Adult Trainee / Electrician / Approved / Technician), card expiry date, qualifications listed, specialist endorsements (if any), and a unique card number for register lookup. Card colour and design indicate the grade tier (Gold for qualified Electrician/Approved, etc.).",
      "Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.",
    ],
    correctAnswer: 2,
    explanation:
      "The card is designed to be scanned at the gate — site security can read your photo, grade and endorsements at a glance, and look up the card number on the public register if there's any doubt. Carry the card every shift; some sites have started using contactless ECS readers that scan the card chip.",
  },
  {
    id: 3,
    question: "When does an ECS card expire?",
    options: [
      "Calculated expected R1+R2 for 50 m of 2.5 mm² ring (cores + CPC): roughly 2 × 50 × 7.41 mΩ/m = 0.74 Ω end-to-end ÷ 2 (ring divides) = 0.37 Ω. Plus lead null. So 0.55 Ω is HIGHER than calculated expected — suggests added resistance somewhere on the ring (HRJ at a socket, partial connection at the CU). It's still well within Table 41.3 limits but the trend is worth investigating. The L3 apprentice records the value AND notes the deviation from expected.",
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — requiring an EICR at intervals not exceeding five years (or sooner if the report states), a copy to the tenant within 28 days, a copy to a new tenant before occupation, and a copy to the local housing authority on request within 7 days.",
      "The dead test proves the wiring is correct between conductor identification at the CU and conductor identification at the accessory. The live test (using an approved voltage indicator at the accessory after first energising) confirms that the assumed L conductor at the CU actually carries the supply line — the dead test cannot detect a labelling error or a reversed connection at the meter tails.",
      "Five years from issue. Renewal requires a current ECS Health & Safety Assessment pass (which itself is only valid for 3 years) plus current employment / qualification evidence. Card renewal is initiated through the JIB ECS portal — your employer typically handles renewals for employed staff; self-employed apprentices and electricians manage their own.",
    ],
    correctAnswer: 3,
    explanation:
      "ECS card validity is 5 years; ECS Health & Safety Assessment validity is 3 years — two separate cycles. The most common cause of card lapse is letting the H&S assessment expire (because a valid H&S Assessment is required to keep or renew the card). Calendar the H&S Assessment renewal well before its 3-year expiry, and the card renewal before the 5-year expiry. Missing either means losing site access overnight; some main contractors won't let you back on with an expired card even if you've booked the renewal.",
  },
  {
    id: 4,
    question: "What's a 'Solar PV' endorsement on an ECS card?",
    options: [
      "A formal recognition that you hold the specialist solar PV competence — typically gained by passing AM2S (the Solar PV variant of AM2) or by completing an MCS-approved PV installer course alongside time-served PV installation experience. The endorsement allows you to work on PV installations under MCS-registered firms.",
      "The responsible person must provide employees with comprehensible and relevant information on the risks identified by the fire risk assessment, the fire preventive and protective measures, the identity of competent persons, and the emergency procedures",
      "Default to 100 percent (no diversity) for a single domestic EV charger because charging sessions tend to coincide with peak domestic demand (evenings); use load-managed (OZEV-compliant) charger or DSR-compliant control to claw back diversity if needed.",
      "Meet each person individually using the SBI model to understand their perspective, then facilitate a joint discussion where both parties share their concerns, identify underlying interests (skills development, recognition, fairness), and collaboratively agree a fair rotation or allocation that addresses both people's needs",
    ],
    correctAnswer: 0,
    explanation:
      "PV endorsement is increasingly important as the UK PV market grows. Most MCS-registered PV installers require staff to hold the endorsement before letting them work on grid-tied PV. AM2S is the JIB practical test variant that adds PV to the standard AM2 syllabus. The endorsement appears as a line on your ECS card and is verifiable on the public register.",
  },
  {
    id: 5,
    question: "What's CompEx and what endorsement does it earn?",
    options: [
      "An EICR if the existing certificate is more than 5 years old at the date of the new tenancy starting. If the existing certificate is less than 5 years old, it carries forward to the new tenancy. Some local authorities or scheme providers recommend a refreshed EICR at any change of tenancy regardless of certificate age, but the statutory trigger is the 5-year maximum interval (or change of tenancy, whichever is sooner).",
      "CompEx (Competency in Explosive Atmospheres) is the standard UK competence scheme for electrical work in hazardous areas — petrochemical, offshore, fuel storage, paint shops, anywhere with explosive atmospheres. The CompEx Ex01-04 modules cover gas-protected installations; Ex05-06 cover dust-protected. Holding CompEx earns you the Hazardous Areas endorsement on your ECS card and unlocks high-day-rate work in oil and gas.",
      "The line conductor is not easily accessible at the CU end (e.g. busbar trunking systems), the circuit is part of a complex distribution network where you want to isolate the CPC verification, or the wander lead is more practical on a large commercial site (one person at the MET, radio contact with the tester at the accessory).",
      "SELV / PELV barriers, basic protection (insulation, barriers, enclosures, obstacles, placing out of reach), fault protection (ADS via overcurrent device or RCD, double or reinforced insulation, electrical separation, earth-free local equipotential bonding), additional protection (RCD ≤ 30 mA, supplementary equipotential bonding).",
    ],
    correctAnswer: 1,
    explanation:
      "CompEx is the gateway qualification for hazardous-area electrical work. Five-day course plus assessment, run at approved centres around the UK. Day rates for CompEx-endorsed electricians on offshore or petrochemical work are typically 50-100% above standard rates — but the work is harsh (offshore rotation, remote locations) and the certification has to be re-validated periodically. A specialism worth considering if you're prepared to travel.",
  },
  {
    id: 6,
    question: "Why do main contractors require ECS cards for site entry?",
    options: [
      "Capability to handle the 8/20 microsecond impulse waveform — induced surges from nearby strikes, switching transients on the supply, transients propagated from the network. Standard at the installation origin / main distribution board on most installations without LPS, characterised by an In and Imax rating in the 5-40 kA range.",
      "(1) Eliminate — can the chase be avoided entirely (surface mount, alternative route)? (2) Substitute — can a less dust-producing tool be used (resin-bonded chase saw with extraction vs hammer-and-bolster)? (3) Engineer — on-tool extraction connected to an M-class vacuum, water suppression. (4) Administrative — limit duration, rotate operatives, restrict access. (5) PPE — FFP3 mask as the LAST line, not the first. RPE alone is not COSHH-compliant for routine silica work.",
      "To discharge their CDM 2015 duty to ensure the workers on site are competent for the work. The ECS card is the industry-recognised proof of competence for electrical workers; main contractors use it to evidence that they checked competence before allowing entry. Failure to check competence (with no card or other evidence) leaves the main contractor exposed under CDM.",
      "Account-for personnel from the firm; ensure customers / visitors in your care have evacuated; liaise with the building's responsible person and fire-marshal at the muster point; provide accurate information to fire service if asked; prevent re-entry; preserve the scene afterwards if relevant to your firm's work.",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 puts a duty on the Principal Contractor to ensure workers are competent for the work. ECS card check is the standard mechanism for electrical trades. Combined with the site induction (which records when you arrived and what risk briefing you received) it gives the PC the audit trail they need. Refusing site entry to non-card-holders is the PC discharging that duty.",
  },
  {
    id: 7,
    question: "How much does an ECS card cost (rough 2024 figures)?",
    options: [
      "Reg 514.16.1 — introduced by A4:2026, requiring a label to indicate the presence of SPDs (with an exception for domestic / household premises). Located in Part 5 (selection and erection), Chapter 51 (common rules), Section 514 (identification and notices). Knowing the labelling regs live in Section 514 is faster than searching by reg number.",
      "Higher than typical UK domestic. PSCC may be 5-15 kA depending on the supply transformer size and the cable run from substation to consumer. PEFC typically 50-80 percent of PSCC. Protective devices need higher Icn — typically 10 kA or 25 kA for the main switchgear and downstream MCBs / RCBOs at the distribution boards. Direct measurement at the origin is required (the BS EN 61439-3 16 kA exemption applies only to dwellings). Document on the EIC against the device Icn ratings.",
      "(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, no stuck contacts, anti-restart works after release; (6) PAT label — current, in date, legible. Plus check the tool is the right one for the job.",
      "First-issue ECS card typically £36-40 (varies by grade and route). Three-yearly renewal similar cost. ECS H&S Assessment fee around £20-30 at most testing centres. Specialist endorsements have separate course costs (CompEx 5-day course around £1,000-1,500; AM2S around £400-600 plus prep). Employers often pay the card and H&S fees for employed staff; self-employed cover their own.",
    ],
    correctAnswer: 3,
    explanation:
      "Card and H&S fees are modest. The big cost items are the specialist courses behind the endorsements (CompEx, AM2S, BPEC EV, BAFE Fire). Plan and budget for these — your employer may part-fund them as CPD investment, especially if the firm is moving into that specialism. Keep receipts; CPD spend is typically tax-deductible if you're self-employed.",
  },
  {
    id: 8,
    question: "What if your ECS card is lost or stolen on site?",
    options: [
      "Report to the JIB ECS team immediately and request a replacement (small admin fee, typically £15-20). Get a temporary letter of confirmation from JIB or your employer to maintain site access while the new card is in production (typically 5-10 working days). Most sites will accept an ECS register printout temporarily; some won't, in which case you can't work until the new card arrives.",
      "A mask that doesn\\\\\\\\'t seal properly to the face provides much less protection than its rated assigned protection factor. Face-fit testing (qualitative or quantitative) confirms the fit. HSE INDG479 is the guide. Fit-test required at first issue and on changes (weight, dental work, beard growth).",
      "The customer makes the COMMERCIAL decision (cost / convenience trade-off). The firm makes the SAFETY / COMPLIANCE decision (which options satisfy BS 7671 + current standards). Apprentice presents options with trade-offs in plain English; customer chooses; firm executes the chosen option within the safety constraint. Customer cannot choose 'below BS 7671' — that's the firm's professional duty floor. The boundary: customer chooses between compliant options; firm refuses non-compliant requests.",
      "The firm (the contracting business) is the data CONTROLLER — it decides what data to collect, why, and how to process it. The customer is the DATA SUBJECT — the person to whom the data relates. The processor would be a third party processing data on the firm's behalf (e.g. the cloud-hosted CRM, the accounting software, an offshore admin team).",
    ],
    correctAnswer: 0,
    explanation:
      "Lost cards happen — wallet stolen, card dropped on site, washing-machine accident. JIB issues replacements quickly; the public register entry confirms your status while the physical card is in production. Always carry the card in a sturdy holder; some firms issue branded ECS card holders. If it's stolen, file a police report and quote the crime number when requesting the replacement.",
  },
];

const faqs = [
  {
    question: "Do I need an ECS card if I only work on domestic jobs?",
    answer:
      "Strictly, no — domestic jobs aren't typically CDM-Principal-Contractor-controlled, and you don't need site induction to enter someone's house. But practically, holding the card matters for two reasons: (1) it's the industry-standard evidence of your JIB grade and qualifications when dealing with customers, insurers and competent-person schemes; (2) if you ever do site or commercial work, you'll need the card. Most domestic electricians hold ECS as a matter of professional standing.",
  },
  {
    question: "What's the difference between an ECS card and a CSCS card?",
    answer:
      "ECS is the electrical-trade-specific scheme run by JIB. CSCS (Construction Skills Certification Scheme) is the broader construction industry scheme covering all trades. ECS is recognised as equivalent to CSCS on most UK construction sites — so an electrician with an ECS card doesn't typically also need a CSCS card. CSCS cards are for non-electrical trades (joinery, plastering, etc.); ECS for electrical.",
  },
  {
    question: "Can I get an ECS card before I finish my apprenticeship?",
    answer:
      "Yes — the Apprentice ECS card is issued during the apprenticeship and is the standard card for apprentices. Requires evidence of the registered apprenticeship (the Apprenticeship Agreement), a current ECS H&S assessment pass, and your employer's confirmation. Apply through jib.org.uk; your employer or college tutor can guide you through the application.",
  },
  {
    question: "What if I fail the ECS H&S assessment?",
    answer:
      "You can re-sit it as soon as the testing centre has slots — typically the same week. The test costs £20-30 each attempt, so revise properly first time. The questions cover HASAWA, CDM, EAWR, BS 7671 basics, working at height, manual handling and PPE. JIB publishes the test syllabus and revision materials on jib.org.uk; CITB and several private providers publish revision apps.",
  },
  {
    question: "Does the ECS card prove I've passed the AM2?",
    answer:
      "Indirectly — once you upgrade to the JIB Electrician grade (which requires AM2 pass), your ECS card is reissued at the Electrician grade. So a Gold Electrician ECS card implies the AM2. The card doesn't print 'AM2 passed on date X' but the grade itself proves it. The public ECS register at jib.org.uk shows the qualifications behind each card.",
  },
  {
    question: "What if I work in Scotland — do I need an SJIB card or an ECS card?",
    answer:
      "SJIB issues its own equivalent card under the SJIB Grading Scheme; in practice the card is broadly the same and recognised across the UK. Scottish apprentices typically hold the SJIB version. If you cross the border for work, both ECS and the SJIB card are recognised; check with the specific main contractor for their preference.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 3"
            title="ECS card requirements + employer expectations"
            description="The ECS card — what it is, the H&S assessment, specialist endorsements (PV, EV, Hazardous Areas), how to apply, and what employers and main contractors expect on UK sites."
            tone="emerald"
          />

          <TLDR
            points={[
              "The ECS card is the industry-standard proof of competence for electrical workers — issued by JIB, records your grade, qualifications, H&S assessment pass and specialist endorsements.",
              "Required for entry on most CDM-regulated UK construction sites — main contractors use it to discharge their CDM duty to check worker competence.",
              "ECS card validity is 5 years from issue. The JIB ECS Health & Safety Assessment (50-question CBT, 80% pass mark) is valid 3 years — and you must hold a valid H&S Assessment to renew (or maintain) your ECS card. Two separate renewal cycles to track.",
              "Specialist endorsements (Solar PV, EV Charging, Hazardous Areas / CompEx, Fire Detection / BAFE) are increasingly required for specialist work and earn higher day rates.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.6 — define the different roles in building services engineering, and the competence-card scheme that records them.",
              "State the role of the ECS card in proving competence for site entry under CDM 2015.",
              "Identify the ECS H&S Assessment requirement, the validity period, and the consequences of letting it lapse.",
              "Identify common ECS endorsements (Solar PV, EV Charging, Hazardous Areas / CompEx, Fire Detection / BAFE) and the qualifications behind them.",
              "Identify the application and renewal process, including costs and typical employer responsibilities.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What the card is and what it does</ContentEyebrow>

          <ConceptBlock
            title="The card on the lanyard — three jobs in one piece of plastic"
            plainEnglish="The ECS card is the credit-card-sized photo ID that lives on every UK electrician's lanyard. It does three things at once: proves who you are (photo + name), proves what you can do (JIB grade + qualifications + endorsements), and proves you've passed the industry H&S test. Site security at the gate scans it; payroll cross-checks it; competent-person scheme assessors verify it during audits."
            onSite="Carry the card every shift. Store it in a sturdy holder — standard lanyard holders crack and the card photo wears off. Many electricians keep a second copy of the card details (number + expiry) in their phone in case the physical card goes missing on site."
          >
            <p>
              What appears on the card:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photo</li>
              <li>Full name</li>
              <li>Formal JIB grade (Apprentice / Adult Trainee / Electrician / Approved / Technician)</li>
              <li>Card expiry date</li>
              <li>Qualifications listed</li>
              <li>Specialist endorsements (if any)</li>
              <li>Unique card number (for public register lookup at jib.org.uk)</li>
              <li>Card colour / design indicating grade tier (Gold for qualified)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why main contractors insist on it — the CDM 2015 link"
            plainEnglish="The Construction (Design and Management) Regulations 2015 put a duty on the Principal Contractor to ensure that everyone on site is competent for the work they're doing. The ECS card is the industry-recognised proof of competence for electrical work. Main contractors use ECS card check at site entry as the audit trail that they did their CDM check. Without an ECS card you can't be admitted to most commercial sites because the PC can't evidence your competence."
            onSite="On a typical commercial or infrastructure site you'll show the card at the gate, sign in to the site, attend the site induction, and your card details get logged. If the card lapses or expires while you're working on site, you'll be quietly stopped and asked to renew before continuing — sometimes with no work and no pay until it's sorted."
          >
            <p>
              The site entry sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Show ECS card at the gate.</li>
              <li>Card scanned or visually checked against the public register.</li>
              <li>Photo matched to your face.</li>
              <li>Site induction (or check that you have a current induction on file).</li>
              <li>Logged in to the site attendance system.</li>
              <li>Issued with PPE / hi-vis as required.</li>
              <li>Briefed on site rules, risks and welfare facilities.</li>
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

          <ContentEyebrow>The ECS H&amp;S Assessment</ContentEyebrow>

          <ConceptBlock
            title="The ECS H&S Assessment — 50 questions, 80% pass, 3-year validity"
            plainEnglish="The ECS H&S Assessment is a computer-based multiple-choice test taken at an approved testing centre. 50 questions, 45-minute time limit, 80% pass mark. It covers electrical-trade health and safety: HASAWA, CDM 2015, EAWR 1989, BS 7671 safety basics, working at height, manual handling, PPE, fire safety, asbestos awareness, and incident reporting. A pass is recorded on your JIB account and is valid for 3 years."
            onSite="Most testing centres charge £20-30. The test is straightforward if you've revised — JIB publishes the syllabus and a revision booklet, and several private providers publish revision apps. Common reasons for failing first time: not revising the regulatory framework, not knowing the manual handling weights, confusion between PPE and RPE. Take it seriously; failing means another £20-30 and another trip to the centre."
          >
            <p>
              Test syllabus headlines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HASAWA 1974 — duties of employer, employee and self-employed.</li>
              <li>CDM 2015 — Principal Contractor and Worker duties.</li>
              <li>Electricity at Work Regulations 1989 — safe isolation, dead working.</li>
              <li>BS 7671 safety basics — safe isolation, lock-off, prove-dead-prove-meter.</li>
              <li>Working at height — Work at Height Regulations 2005, fall arrest.</li>
              <li>Manual handling — Manual Handling Operations Regulations 1992.</li>
              <li>PPE — types, when each is required, employer duties.</li>
              <li>Fire safety, asbestos awareness, COSHH basics.</li>
              <li>Incident reporting — RIDDOR.</li>
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

          <ContentEyebrow>Specialist endorsements</ContentEyebrow>

          <ConceptBlock
            title="Endorsements unlock specialist work — and specialist day rates"
            plainEnglish="Specialist endorsements are formal recognitions of additional competence printed as a line on your ECS card and recorded against your card number on the public register. Each endorsement requires specific training and (usually) demonstrable experience. Main contractors and clients increasingly require endorsement evidence before letting you do specialist work."
            onSite="Endorsements typically pay back the training cost within months because they unlock work that pays significantly above standard electrician rates — CompEx-endorsed offshore work pays double or triple a standard rate; AM2S-PV endorsement is the entry condition for MCS-registered solar work. Plan endorsements as part of your CPD strategy, not as an afterthought."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Solar PV (AM2S)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  AM2S is the Solar PV variant of AM2. Required by MCS-registered PV
                  installers for staff working on grid-tied PV. Course + practical
                  assessment around &pound;400-600. Endorsement valid as part of card.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  EV Charging
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  BPEC or City &amp; Guilds EV charging course (typically 2 days). Required
                  by OZEV-grant-eligible installers and increasingly by main contractors on
                  EV-charging-heavy projects. Course around &pound;300-500.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Hazardous Areas (CompEx)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  CompEx Ex01-04 (gas) or Ex05-06 (dust) modules. Required for petrochemical,
                  offshore, fuel storage, paint shop work. 5-day course around
                  &pound;1,000-1,500. Day rates 50-100% above standard.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Fire Detection (BAFE SP203-1)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  BAFE-registered fire alarm installer competence. Course + experience-based
                  recognition. Required for BAFE-registered fire alarm work; typical entry
                  point for fire specialism.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Applying, renewing, replacing</ContentEyebrow>

          <ConceptBlock
            title="Application and renewal — the JIB ECS portal"
            plainEnglish="ECS card applications and renewals are processed through the JIB ECS portal at jib.org.uk. First-issue cards require evidence of identity, photo, employer (or self-employed status), qualifications, and a current ECS H&S assessment pass. Renewals require an updated H&S pass and current employment / qualification status. Card production typically takes 5-10 working days from approval."
            onSite="For employed staff most firms handle renewals centrally — your training lead or HR will batch-renew cards before they expire. For self-employed and apprentices changing employer, you handle your own. Calendar the H&S renewal at month 30 (six months before card expiry) so you have buffer time if you fail the test first try."
          >
            <p>
              The application checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photo (passport-standard).</li>
              <li>Proof of identity (passport, driving licence).</li>
              <li>Proof of address (utility bill, bank statement).</li>
              <li>Current ECS H&amp;S assessment pass (within 3 years).</li>
              <li>Qualifications evidence (certificates).</li>
              <li>Employer confirmation (or self-employed declaration).</li>
              <li>Application fee (typically &pound;36-40 for first issue or renewal).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — competence (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  CDM 2015 requires the Principal Contractor (PC) and Principal Designer (PD)
                  to ensure that the people working on a project have the skills, knowledge,
                  training and experience to carry out the work in a way that secures health
                  and safety.
                </p>
                <p>
                  In practice the PC discharges this duty by checking competence cards at
                  site entry &mdash; ECS for electrical workers, CSCS for other trades.
                </p>
              </>
            }
            meaning={
              <>
                The ECS card is the industry-recognised competence card for electrical work
                under CDM 2015. The PC&apos;s duty to check competence is what drives the
                site-entry card check. Without an ECS card the PC has no audit trail that
                they checked your competence &mdash; so they refuse entry. The card is the
                workable bridge between your individual competence and the PC&apos;s
                regulatory duty.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), reg. 5 and reg. 8 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(2)(c) (training and supervision)"
            clause={
              <>
                &quot;The matters to which that duty extends include in particular &mdash;
                (c) the provision of such information, instruction, training and supervision
                as is necessary to ensure, so far as is reasonably practicable, the health
                and safety at work of his employees.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.2(2)(c) is the explicit training duty on the Employer. Funding the
                ECS H&amp;S assessment, the AM2S, the CompEx or the BAFE training is part of
                discharging this duty &mdash; particularly when the firm is moving into a new
                specialism that requires staff to upskill. Apprentices and pre-AM2 staff should
                expect the employer to fund baseline ECS card and H&amp;S assessment costs;
                specialist endorsements often sit somewhere between employer-funded and
                self-funded by negotiation.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2."
          />

          <RegsCallout
            source="JIB ECS scheme rules (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The ECS scheme rules set the issuance and renewal criteria for ECS cards:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Card valid 5 years from issue.
                  </li>
                  <li>
                    ECS Health &amp; Safety Assessment valid 3 years from pass date.
                  </li>
                  <li>
                    Card renewal requires a current ECS H&amp;S assessment pass (within its
                    3-year validity) and current employment / qualification evidence.
                  </li>
                  <li>
                    Specialist endorsements require evidence of the underlying training and
                    (where applicable) experience.
                  </li>
                  <li>
                    Card holder must notify JIB of changes of name, employer or
                    qualifications during the card&apos;s validity.
                  </li>
                  <li>
                    Lost or stolen cards can be replaced for an admin fee on application
                    through the JIB ECS portal.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The ECS rules are administered by JIB and the public ECS register at
                jib.org.uk is the authoritative source of card status. The rules are not
                statute &mdash; they&apos;re scheme rules &mdash; but they&apos;re the
                practical floor of card management and are accepted across the UK industry as
                the standard. Treat the renewal calendar seriously; expired cards mean
                immediate site lock-out.
              </>
            }
            cite="Source: JIB ECS scheme rules — paraphrased from publicly-available JIB guidance at jib.org.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Letting the H&S assessment lapse, then the card lapses with it"
            whatHappens={
              <>
                Apprentice or electrician forgets when their ECS H&amp;S assessment expires.
                Three years pass quietly. The H&amp;S Assessment lapses; even though the ECS
                card itself runs to 5 years, the card renewal application (or the card&apos;s
                continued validity) gets blocked because a valid H&amp;S Assessment is a
                required condition. Cards effectively lock out on a Monday morning; the next
                site visit on Tuesday ends with a polite turn-around at the gate. Two weeks of
                lost work while the H&amp;S Assessment is rebooked, taken, passed, and the new
                card produced.
              </>
            }
            doInstead={
              <>
                Calendar the H&amp;S Assessment renewal at month 30 of its 3-year validity
                &mdash; six months of buffer before the H&amp;S pass would expire. Separately,
                calendar the ECS card renewal at year 4.5 of its 5-year validity. If you fail
                the H&amp;S test first try, you&apos;ve still got time to rebook and pass before
                anything lapses. Set phone reminders; don&apos;t rely on JIB email reminders
                alone &mdash; they sometimes go to spam.
              </>
            }
          />

          <Scenario
            title="Site induction tomorrow morning, your ECS card just expired — what now?"
            situation={
              <>
                You&apos;re due on a new commercial site at 7:30am tomorrow. You&apos;re
                packing your tools tonight and check your ECS card &mdash; it expired
                yesterday. Your H&amp;S assessment lapsed two months ago. The site induction
                rules require a current ECS card for entry. You&apos;ve got one evening to
                fix this before you&apos;d normally be on site.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; phone the main contractor&apos;s site manager
                tonight</strong>. Be honest. Don&apos;t turn up tomorrow expecting to bluff
                it. The site manager will appreciate the heads-up and may agree a short
                grace period (sometimes 24-48 hours) if you commit to fixing it within that
                window.
                <br /><br />
                <strong>Step 2 &mdash; book the ECS H&amp;S assessment for the earliest
                slot</strong>. Most testing centres have walk-in or next-day slots. JIB ECS
                Approved Centres (typically CITB-approved test centres) are the providers.
                Book online tonight if possible.
                <br /><br />
                <strong>Step 3 &mdash; revise tonight</strong>. JIB publishes a revision
                booklet free at jib.org.uk; the CITB H&amp;S app is also widely used. Two
                hours of focused revision &mdash; HASAWA, CDM, manual handling weights, PPE
                vs RPE, working at height &mdash; will get most people to 80%.
                <br /><br />
                <strong>Step 4 &mdash; pass the test, then submit the ECS card renewal
                same day</strong>. Renewal is processed through the JIB ECS portal once the
                H&amp;S pass is recorded. Expedited card production is sometimes available
                for an extra fee. Get a temporary letter of confirmation from JIB while the
                physical card is in production.
                <br /><br />
                <strong>Step 5 &mdash; learn from it</strong>. Calendar the next H&amp;S
                assessment for month 30. Better still, set two reminders &mdash; one at
                month 28, one at month 30. Don&apos;t rely on memory or on JIB email
                reminders.
              </>
            }
            whyItMatters={
              <>
                Lost site days are lost income and lost employer trust. A first incident
                might be forgiven; a second pattern of letting cards lapse will damage your
                reputation with both your direct employer and the main contractors who run
                the sites you visit. The card renewal cycle is one of the few things in the
                trade that&apos;s genuinely under your control &mdash; treat it as a
                personal-admin priority.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The endorsement economy and renewal admin</ContentEyebrow>

          <ConceptBlock
            title="Specialist endorsements that change what work you can win"
            plainEnglish="The ECS card holds endorsements beyond the base electrician grade — Solar PV, EV Charging, Hazardous Areas (CompEx), Fire Detection (FIA Unit qualifications), Data Cabling (BICSI / vendor certs), Rail Personal Track Safety (PTS), Confined Spaces. Each endorsement requires a separate qualification (typically C&G or vendor-route) and adds a line to your card. Each endorsement also opens a different work stream — Hazardous Areas opens petrochemical, pharma and offshore work at premium rates; PTS opens UK rail projects; FIA opens fire-system commissioning."
            onSite="Plan endorsements deliberately — chasing every certificate is expensive and dilutes focus. Pick 2-3 endorsements that match the work you want to win. A domestic-installer career typically wants PV, EV and possibly Heat Pump (MCS scheme work); a commercial-fit-out career wants FIA fire and BMS; an offshore career wants CompEx and offshore survival; a rail career wants PTS plus Network Rail-specific endorsements. The endorsement is on the card; the qualification certificate that backed it has to be in your CPD folder for renewal."
          >
            <p>
              Common ECS endorsements and what they unlock:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solar PV</strong> &mdash; AM2S or BPEC PV, opens MCS PV install work.
              </li>
              <li>
                <strong>EV Charging</strong> &mdash; C&amp;G 2919 / 2921 or BPEC EV, opens MCS EV and OZEV-grant work.
              </li>
              <li>
                <strong>Hazardous Areas (CompEx)</strong> &mdash; CompEx Ex01-Ex04, opens petrochemical, pharma, offshore.
              </li>
              <li>
                <strong>Fire Detection (FIA Unit)</strong> &mdash; FIA Unit 1&ndash;5 stack, opens BS 5839 commissioning.
              </li>
              <li>
                <strong>Data Cabling</strong> &mdash; BICSI Installer or vendor (CommScope, Panduit, Excel), opens structured-cabling work.
              </li>
              <li>
                <strong>Rail PTS</strong> &mdash; Network Rail Personal Track Safety, opens UK rail projects.
              </li>
              <li>
                <strong>Heat Pump</strong> &mdash; LCL HP / MCS HP, opens MCS heat-pump install work and BUS grant access.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The renewal calendar — what expires and when"
            plainEnglish="ECS cards have multiple moving parts that expire on different cycles. The card itself runs to 5 years from issue. The H&S assessment (or accepted CSCS-equivalent) must be valid at renewal. Some specialist endorsements have shorter cycles — CompEx is 5-yearly with refresher; First Aid at Work is 3-yearly; PTS varies by employer. Build a single renewal calendar with reminders set 90 days before each expiry and you avoid the mid-week 'site won't let you in' surprise that costs a day's pay."
            onSite="Most apprentices never own their renewal calendar because the employer manages it during the apprenticeship. Post-AM2 it's yours. Set repeating calendar entries for: ECS card expiry (5yr), H&S assessment validity, BS 7671 currency (read each amendment as it lands), First Aid (3yr), Manual Handling (varies by site), site-specific inductions (some sites require annual refresh). Keep digital copies of every certificate in a single cloud folder you can email from a phone — main contractors increasingly want PDFs at induction not just card photos."
          >
            <p>
              A typical electrician's renewal calendar:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ECS card</strong> &mdash; 5yr cycle from issue.
              </li>
              <li>
                <strong>ECS H&amp;S assessment</strong> &mdash; required for card validity, accepted equivalents (CITB CSCS test) recognised.
              </li>
              <li>
                <strong>First Aid at Work</strong> &mdash; 3yr cycle, 1-day refresher in middle year.
              </li>
              <li>
                <strong>Manual Handling</strong> &mdash; site-specific, often annual.
              </li>
              <li>
                <strong>BS 7671 amendment</strong> &mdash; CPD on each new amendment (currently A4:2026 incoming).
              </li>
              <li>
                <strong>CompEx</strong> &mdash; 5yr with refresher.
              </li>
              <li>
                <strong>MCS scheme assessment</strong> &mdash; annual (if you carry MCS endorsements through your firm).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ECS Manager and the move to digital — what changed in 2024-25"
            plainEnglish="JIB has migrated ECS to a digital-first model — the ECS Manager mobile app holds your card, your endorsements, your H&S assessment record and your renewal alerts. Main contractors increasingly accept the digital card scanned via the ECS Site app at the gate; physical cards remain valid but the digital card is faster, harder to lose and lets you prove competence on the spot from your phone. The 2024 update also added Smart Check — a QR-scan verification that confirms the card is current and not suspended."
            onSite="Download ECS Manager (iOS or Android), link it to your JIB record on first install, and keep notifications enabled — the app is what tells you 90 days out that your card is approaching expiry. Some sites still want a physical card on first day; many large main contractors (Mace, Wates, Sir Robert McAlpine) now use the Smart Check QR at induction. Either way, the digital card is your default; the physical card is a backup. As an apprentice this matters because by the time you're qualified, the digital-first model will be the norm."
          >
            <p>
              ECS Manager / Smart Check practical use:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Download</strong> &mdash; ECS Manager on iOS or Android, free.
              </li>
              <li>
                <strong>Link your record</strong> &mdash; using your JIB-registered email and ECS card number.
              </li>
              <li>
                <strong>Smart Check QR</strong> &mdash; live verification that your card is current; site gate-keepers scan it.
              </li>
              <li>
                <strong>Renewal alerts</strong> &mdash; in-app push notifications 90/60/30 days before expiry.
              </li>
              <li>
                <strong>Endorsement updates</strong> &mdash; new endorsements added by JIB show in-app within 1 working day of processing.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "ECS card is the industry-standard competence card for UK electrical workers — issued by JIB, records grade, qualifications, H&S assessment pass and specialist endorsements.",
              "Required for entry on most CDM-regulated UK construction sites; main contractors use it to discharge their CDM 2015 duty to check competence.",
              "ECS card validity is 5 years; the ECS Health & Safety Assessment is 3-year validity (50 questions, 80% pass) — and you must hold a valid H&S Assessment to maintain or renew the card. Calendar the H&S renewal at month 30; the card renewal around year 4.5.",
              "Specialist endorsements (Solar PV / AM2S, EV Charging / BPEC, Hazardous Areas / CompEx, Fire Detection / BAFE) unlock specialist work and significantly higher day rates.",
              "Application and renewal through jib.org.uk; first-issue typically £36-40; H&S assessment £20-30; specialist courses £300-1,500+.",
              "Lost or stolen cards replaceable through the JIB ECS portal for a small admin fee; public register confirms status while physical card is in production.",
              "Card grade tracks your formal JIB grade — Apprentice → Adult Trainee → Electrician (Gold) → Approved → Technician — and updates as your grade upgrades.",
              "Calendar discipline matters — let the card lapse and you lose site access overnight. Treat renewals as a fixed personal-admin priority.",
            ]}
          />

          <Quiz title="ECS card requirements — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 JIB grading deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Scheme membership economics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
