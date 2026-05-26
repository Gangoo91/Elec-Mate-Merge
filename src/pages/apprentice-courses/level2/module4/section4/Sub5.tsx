/**
 * Module 4 · Section 4 · Sub 5 — Main vs supplementary bonding deep dive
 * Supplementary subsection — synthesises Reg 411.3.1.2 (main), Reg 415.2
 * (supplementary) and Reg 701.415.2 (bathroom exception). Builds on Subs 1-4.
 *
 * Frame: Main bonding equalises potential at the building's intake.
 * Supplementary bonding equalises potential at a specific high-risk
 * location. Different conductors, different sizing, different purpose,
 * different regs. Modern installs can omit supplementary in many cases.
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

const TITLE = 'Main vs supplementary bonding deep dive | Level 2 Module 4.4.5 | Elec-Mate';
const DESCRIPTION =
  'Main bonding (Reg 411.3.1.2 + 544.1) at the building intake vs supplementary bonding (Reg 415.2) at a specific high-risk location — when each is required, when supplementary can be omitted in modern bathrooms (Reg 701.415.2), and how to choose correctly.';

const checks = [
  {
    id: 'm4-s4-sub5-purpose',
    question:
      'What is the fundamental difference in purpose between main bonding and supplementary bonding?',
    options: [
      'Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.',
      'Main bonding equalises potential between extraneous-conductive-parts (gas, water, structural steel) and the MET at the building\\\\\\\\\\\\\\\'s intake — system-wide protection. Supplementary bonding equalises potential between exposed-conductive-parts and extraneous-conductive-parts at a specific high-risk location (bathroom, swimming pool) where ADS disconnection times alone aren\\\\\\\\\\\\\\\'t fast enough to prevent shock.',
      'Section 722 of BS 7671 (Electric vehicle charging installations) is the regulation anchor. It applies in addition to the rest of BS 7671 and covers the supply, the charging point, the protective measures (especially the PEN-fault and additional protection requirements), the cable rating and the means of isolation. A4:2026 has refined Section 722 alongside the broader updates around TN-C-S systems (now PNB) and AFDD requirements.',
      'No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work.',
    ],
    correctIndex: 1,
    explanation:
      'Main bonding (Reg 411.3.1.2) — system-wide equipotential reference at the MET. Every extraneous-conductive-part bonded to the MET so the entire installation has a common earth potential during a fault. Supplementary bonding (Reg 415.2) — local equipotential reference at a high-risk location (bathroom, pool, agricultural). Connects the metalwork at the location so anyone touching two metal items at once experiences the same potential on both. Different scope, different purpose, different sizing.',
  },
  {
    id: 'm4-s4-sub5-bathroom-exception',
    question:
      'Reg 701.415.2 allows supplementary bonding to be omitted in a room containing a bath or shower if which conditions are met?',
    options: [
      'Politely tell the Site Manager you\\\\\\\'ve been tasked by your own supervisor on a different priority, and offer to ask your supervisor to come over so the two managers can re-prioritise. You take instructions on the work face from your own contractor\\\\\\\'s chain (Site Supervisor → Project Engineer → Contracts Manager). The main contractor\\\\\\\'s Site Manager co-ordinates between contractors but does not give direct instructions to a sub-contractor\\\\\\\'s apprentice.',
      '(a) Don\\\\\\\'t carry out construction work unless you have the skills, knowledge, training and experience to do it safely (or are in the process of obtaining them); (b) report to the person in control anything you\\\\\\\'re aware of that\\\\\\\'s likely to endanger H&S; (c) co-operate with any other person working on or in connection with the project to enable that person to comply with their duties.',
      'Three conditions all met: (a) all final circuits of the location comply with the requirements for automatic disconnection per Reg 411.3.2; (b) all final circuits of the location have additional protection by means of an RCD per Reg 415.1.1 (typically 30 mA); (c) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding per Reg 411.3.1.2 (i.e. main bonding is in place and proven).',
      'An Improver has completed the technical qualifications (often Level 3 NVQ or 2365-03) but has not yet passed AM2 — they work under the supervision of an Approved Electrician. An Electrician has passed AM2 and can work without direct supervision on routine work. Improver is therefore the post-college, pre-AM2 grade.',
    ],
    correctIndex: 3,
    explanation:
      'Reg 701.415.2 — supplementary bonding may be omitted when ALL THREE: ADS compliance, 30 mA RCD on every final circuit serving the location, and main bonding compliant on extraneous-conductive-parts. Modern fully-RCD-protected new-builds typically meet all three, so reflexively installing supplementary bonding cable in every new bathroom is wasted labour.',
  },
  {
    id: 'm4-s4-sub5-415-2-2',
    question:
      'Reg 415.2.2 sets the resistance condition for supplementary bonding effectiveness. For an AC system, what is the formula?',
    options: [
      'Demonstrating environmental performance to clients, supporting tender bids, identifying cost savings, meeting regulatory requirements and driving internal improvement',
      'The leak must be sealed and the smoke test repeated — the enclosure must pass before any asbestos work can begin',
      'Slightly lower accuracy than the high-current test (factor of 2-3 in resolution) but adequate for verifying compliance with Table 41.3',
      'R < 50 V / I_a (where I_a is the operating current of the protective device — for RCDs, I_Δn; for overcurrent devices, the 5 s operating current).',
    ],
    correctIndex: 1,
    explanation:
      'Reg 415.2.2 (AC systems) — R < 50 V / I_a. The 50 V is the conventional touch voltage limit; I_a is the device that disconnects under fault. For a 30 mA RCD: R < 50 / 0.030 = 1667 ohm. For a 32 A B-type MCB at 5 s operation (~5×In = 160 A): R < 50/160 = 0.3125 ohm. The supplementary bond conductance must be sufficient to keep touch voltage under 50 V during the disconnection time.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation is the headline for main protective equipotential bonding to extraneous-conductive-parts at the building intake?',
    options: [
      'Reg 411.3.1.1',
      'Reg 411.3.1.2',
      'Reg 415.2',
      'Reg 543.3',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.3.1.2 — "In each consumer\'s installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54." This is the regulation that mandates main bonding to gas, water and other extraneous services. Sizing rules then come from Chapter 54 (Reg 544.11 + Table 54.8 covered in Sub 1).',
  },
  {
    id: 2,
    question:
      'Which BS 7671 regulation governs supplementary protective equipotential bonding in special locations?',
    options: [
      'Reg 544.1',
      'Reg 411.3.1.2',
      'Reg 415.2',
      'Reg 514.13.1',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 415.2 — "Additional protection: supplementary protective equipotential bonding". Section 415.2.1 lists what must be bonded together (simultaneously accessible exposed-conductive-parts of fixed equipment + extraneous-conductive-parts including reinforced concrete metal work where practicable). Section 415.2.2 sets the resistance condition (R < 50/I_a in AC). Special locations (bathroom 701, swimming pool 702, agricultural 705) reference back to 415.2 with their own additional rules.',
  },
  {
    id: 3,
    question:
      'A 1960s house has supplementary bonding cable visible between the bath, the towel rail and the copper pipes in the bathroom. The bathroom has all 30 mA RCD protection on every circuit. Main bonding to gas and water is in place and tests OK. What\'s the right approach to the existing supplementary bonding?',
    options: [
      'Digital and durable — typically PDF for the drawings and schedules, native files (DWG, RVT, IFC) where the building owner has compatible software, and a structured index. Hard-copy printout if the building owner needs one. On HRRBs, format must support the BSA 2022 golden thread requirements (accessible, structured, digital).',
      'Drilled within the centre third of the joist depth, in the middle 25-40% of the span, and not weaken the structural integrity. Notches allowed in top of joist within prescribed limits per Building Regulations Part A and BS 5268.',
      'Consistently testing installations to standard even when unsupervised, documenting results accurately, and proactively addressing any issues found — because your internal standards drive your behaviour, not external monitoring',
      'Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 701.415.2 is permissive — it allows omission, doesn\'t mandate removal. Existing supplementary bonds in a fully RCD-protected bathroom with main bonding compliant are still functional and add resilience. Leave them. The cost-saving from omission is on NEW installs where you skip the labour of running supplementary cable. On a refurb, only remove existing bonding if you\'re tearing out the pipework anyway.',
  },
  {
    id: 4,
    question:
      'On a NEW domestic install with all-RCD protection, the bathroom has the bath, the towel rail, copper hot/cold pipes and a heated towel rail circuit. The main bonding to gas and water at the building intake is in place. Do you need to install supplementary bonding cable in the bathroom?',
    options: [
      'No — Reg 701.415.2 allows supplementary bonding to be omitted when all three conditions are met (ADS compliance, all final circuits in the location have 30 mA RCD additional protection, main bonding on extraneous-conductive-parts is in place per Reg 411.3.1.2). Modern fully-RCD-protected new-builds typically meet all three.',
      'Close to specific sensitive equipment — usually within a few metres of the equipment terminals (server cabinet, medical equipment, AV / studio gear, specialised electronic plant). Provides the final stage of cascade reduction; typically combined with Type 2 upstream.',
      's.2 is the duty to employees; s.3 is the duty to non-employees affected by the work — customers, the public, other trades, visitors. On a domestic install it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s s.3 that catches the customer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s family. On a commercial fit-out it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s s.3 that catches the trades next to you.',
      'Visually inspect for storage damage, check the coil resistance, verify the contacts are not corroded or contaminated, ensure the operating mechanism moves freely, and confirm the component is within its shelf-life (if applicable)',
    ],
    correctAnswer: 0,
    explanation:
      'New build with full 30 mA RCD protection on every bathroom circuit + main bonding compliant + ADS works = supplementary bonding can be omitted. This is one of the genuine cost-saves in modern bathroom wiring. Confirm all three conditions are demonstrably met and document in the EIC. Note: omitting supplementary doesn\'t omit main bonding — gas and water at the building intake still need bonding regardless.',
  },
  {
    id: 5,
    question:
      'What is the minimum CSA for a supplementary bonding conductor between two exposed-conductive-parts where mechanical protection is provided?',
    options: [
      'The designer must adopt the safer alternative unless the cost is grossly disproportionate to the risk reduction achieved — a 15% cost increase for eliminating a moderate risk is unlikely to be grossly disproportionate',
      'Per Reg 544.2.1 — conductance not less than the smaller protective conductor connected to the exposed-conductive-parts. If the smaller CPC is e.g. 1.5 mm², the supplementary bond can be 1.5 mm² provided it has equivalent mechanical protection.',
      'All business income (invoices issued, payments received), all business expenses (receipts, invoices), bank statements, mileage records if claiming vehicle expenses, capital purchases (tools, equipment, vehicle). Keep for at least 5 years after the 31 January filing deadline.',
      'Salovey-Mayer focuses on cognitive emotional abilities, Bar-On on emotional-social personality traits, and Goleman on workplace performance competencies — each offering a different but complementary lens',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 544.2.1 (between two exposed-conductive-parts) — conductance at least equal to the smaller CPC, with a 4 mm² minimum if not mechanically protected. The exact CSA depends on the CPC sizes of the circuits feeding the exposed-conductive-parts. Different rule again from main bonding (Reg 544.11 + Table 54.8) — supplementary uses Reg 544.2.x.',
  },
  {
    id: 6,
    question:
      'In Reg 415.2.2, the "I_a" term for an overcurrent protective device is defined as:',
    options: [
      'Ask the assessor to rephrase or clarify the question — this is completely acceptable and demonstrates professional communication rather than guessing and giving an irrelevant answer',
      'Document the programme change and its impact, notify the main contractor in writing of any additional costs or delays, and follow up with a formal variation or claim if applicable',
      'The 5 s operating current of the device — the current that causes the device to operate within 5 seconds (typically the current at the magnetic-trip threshold for an MCB, or the BS 88 fuse 5 s curve current).',
      'SAP is the statutory methodology for assessing dwelling energy performance and underpins EPC ratings, but heat pump SIZING uses BS EN 12831 heat-loss calculations — not SAP',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 415.2.2 — for overcurrent devices, I_a is the 5 s operating current. For Type B MCB this is roughly 5×In (e.g. B32 → ~160 A). For Type C: ~10×In. For RCDs, I_a is the rated residual operating current I_Δn (e.g. 30 mA). The supplementary bond resistance must keep touch voltage under 50 V at this current.',
  },
  {
    id: 7,
    question:
      'Why does BS 7671 distinguish "main" bonding from "supplementary" bonding rather than treating all bonding as one concept?',
    options: [
      'Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.',
      'Hazardous Waste under EWC code 20 01 21* (the asterisk denotes hazardous). Fluorescent tubes contain mercury vapour — typically 3–5 mg in a 5-foot T8, less in modern T5 and CFL. Mercury is acutely toxic if inhaled and persistent in the environment. Producers of hazardous waste who generate over 500 kg / year must register with the Environment Agency; under that threshold the firm is exempt but still has the Duty of Care to use a licensed carrier and disposal route. Consignment Notes accompany the waste and are kept for three years.',
      'The employer\\\\\\\'s firm needs Competent Person Scheme registration (NICEIC / NAPIT / ELECSA) to self-certify the firm\\\\\\\'s notifiable domestic work. The apprentice carries: (a) a JIB Industrial Determination card showing their grade and apprenticeship year (issued through the apprenticeship); (b) ECS card for site access on most major commercial sites; (c) evidence of their college enrolment and progression. The apprentice does NOT need personal CPS membership — that\\\\\\\'s a contractor-level registration.',
      'Because they serve different protective functions. Main bonding (411.3.1.2) is the ADS strategy at building intake — equalising potential of all extraneous-conductive-parts to the MET so a fault anywhere in the installation produces a controlled potential rise. Supplementary bonding (415.2) is "additional protection" at a specific location where touch-voltage risk is unusually high (wet skin, bare feet) and the ADS disconnection times alone may not be fast enough to prevent shock.',
    ],
    correctAnswer: 3,
    explanation:
      'Main = whole-building equipotential reference at intake. Supplementary = local equipotential reference at high-risk location. Both contribute to shock protection but operate at different scales and with different design assumptions. The two-tier system is what allows modern installs to omit supplementary in fully-RCD-protected bathrooms (Reg 701.415.2) — the RCD provides the disconnection speed that supplementary bonding was originally compensating for.',
  },
  {
    id: 8,
    question:
      'A fully-RCD-protected bathroom has all extraneous-conductive-parts connected to main bonding at the MET. You decide to install supplementary bonding cable anyway, "for redundancy". Is this:',
    options: [
      'Permitted — Reg 701.415.2 allows omission but doesn\\\\\\\\\\\\\\\'t prohibit installation. Many electricians fit supplementary as a defensive standard despite the omission permission, on the basis that an additional layer of protection costs little and provides margin against any future loss of RCD protection. Code C3 finding on EICR if absent in older bathrooms; never a finding for fitting it as additional protection.',
      'When the inspector believes a specific activity involves or will involve a risk of SERIOUS personal injury. The notice prohibits the activity (immediately, or from a stated time) until the risk has been remedied. Like an Improvement Notice, it can be appealed to an Employment Tribunal within 21 days — but the appeal does NOT suspend the notice (unlike an Improvement Notice). The activity must stop while the appeal is heard.',
      'Starting each week by asking your team: "What obstacles are you facing that I can help remove?" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves',
      'You assess against current BS 7671 but use the C1/C2/C3 codes per Best Practice Guide 4. Departures that were compliant at installation but no longer meet the current edition (e.g. a fully metal CU on a 16th edition install) are typically C3 (improvement recommended) — not C1 or C2 — unless they present an actual present danger or potential danger. The EICR is not a vehicle for upgrading every old install to the latest edition.',
    ],
    correctAnswer: 0,
    explanation:
      'The omission permission is permissive, not prohibitive. You can fit supplementary bonding even when not required; the regulation simply removes the requirement. Some electricians always fit it for belt-and-braces; others rely on the omission to save time. Both are compliant with BS 7671. The customer\'s preference, the building\'s expected long-term occupancy, and the cost of access for future work all factor into the decision.',
  },
];

const faqs = [
  {
    question: 'I was always told "every bathroom needs supplementary bonding" — has that changed?',
    answer:
      'Yes. Reg 701.415.2 (specifically the second part — the omission conditions) was introduced/clarified in BS 7671:2008 and remains in BS 7671:2018+A4:2026. On modern installs where every final circuit serving the bathroom is RCD-protected (30 mA additional protection per Reg 415.1.1), and main bonding to extraneous-conductive-parts is compliant, supplementary bonding may be omitted. Older installs (pre-RCD-on-everything) genuinely need it. New installs typically don\'t.',
  },
  {
    question: 'What counts as "all final circuits of the location have additional protection by means of an RCD"?',
    answer:
      'Every circuit that supplies any equipment WITHIN the bathroom — lighting, shower, towel rail, fan, shaver socket — must have 30 mA RCD additional protection. Could be RCBOs (one per circuit), an RCD on a section of the consumer unit covering all bathroom circuits, or a dedicated bathroom-feed RCD. As long as nothing serving the bathroom is unprotected by 30 mA RCD, the condition is met. A circuit feeding only equipment OUTSIDE the bathroom doesn\'t count toward this condition.',
  },
  {
    question: 'How do I prove "main bonding to extraneous-conductive-parts" for the omission condition?',
    answer:
      'Continuity test from the MET to each BS 951 clamp on each extraneous-conductive-part (gas, water, structural steel). Documented continuity reading on the Schedule of Test Results. Sub 4 of this Section covers the procedure. The omission permission is conditional on main bonding being verified — not just installed. Without a continuity reading proving the main bond, you can\'t rely on the omission.',
  },
  {
    question: 'Where else in BS 7671 does supplementary bonding crop up?',
    answer:
      'Section 701 (rooms containing a bath or shower) is the most common. Section 702 (swimming pools) has tighter rules — supplementary bonding inside the pool zones is rarely omittable. Section 703 (rooms containing sauna heaters), 704 (construction sites), 705 (agricultural), 708 (caravan parks), 711 (exhibitions) all reference Reg 415.2 with location-specific overlays. Each special location reads slightly differently on what\'s required and what can be omitted.',
  },
  {
    question: 'Can supplementary bonding ever replace main bonding?',
    answer:
      'No. The two serve different purposes at different scales. Main bonding equalises the entire installation at the MET — affects every circuit, every accessory, every metal surface in the building during any fault. Supplementary bonding equalises a single location only. Removing main bonding in favour of supplementary leaves the rest of the installation without intake-level potential equalisation — a fault on any non-bonded service creates a touch-voltage hazard everywhere except the supplementary-bonded location.',
  },
  {
    question: 'Modern bathroom install: should I fit supplementary bonding or rely on the omission?',
    answer:
      'It\'s a judgement call. Pure-omission saves 30-90 minutes and a few metres of cable per bathroom. The downsides: any future loss of RCD protection (e.g. a future occupant fitting a non-RCD board) leaves the bathroom without supplementary protection, and the install is "thinner" against unforeseen scenarios. Many trade electricians fit supplementary bonding as a defensive standard on first-fix even when omission would be permissible — particularly on rented properties, social housing and any install where you can\'t control future modifications. Document your choice in the EIC.',
  },
];

export default function Sub5() {
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 5"
            title="Main vs supplementary bonding deep dive"
            description="Main bonding (Reg 411.3.1.2 + 544.1) at the building intake — system-wide. Supplementary bonding (Reg 415.2) at a specific high-risk location — local. Different conductors, different sizing, different regs, sometimes both required and sometimes one can be omitted."
            tone="emerald"
          />

          <TLDR
            points={[
              'Main bonding (Reg 411.3.1.2) — equalises potential between extraneous-conductive-parts and the MET at the building intake. Mandatory on every install with metal services. Sized by Table 54.8 (PME) or Reg 544.11 (TN-S/TT).',
              'Supplementary bonding (Reg 415.2) — equalises potential between exposed and extraneous-conductive-parts at a specific high-risk location. Sized by Reg 544.2.x. Smaller conductors (2.5 / 4 mm²).',
              'Reg 701.415.2 permits omission of supplementary bonding in a bathroom when all three conditions met: ADS-compliant final circuits + 30 mA RCD on every final circuit + main bonding compliant. Modern new-builds usually meet all three.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO4 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of the main vs supplementary bonding distinction in a deep dive across Reg 411.3.1.2, Reg 415.2 and the Reg 701.415.2 bathroom omission.',
              'Distinguish the protective purposes of main bonding (system-wide intake equipotential) and supplementary bonding (local high-risk equipotential).',
              'Cite Reg 411.3.1.2 (main) and Reg 415.2 (supplementary) and identify which applies in different scenarios.',
              'Apply the Reg 415.2.2 resistance condition R < 50 V / I_a for AC supplementary bonding effectiveness.',
              'Apply the Reg 701.415.2 three-condition test for permitted omission of supplementary bonding in rooms containing a bath or shower.',
              'Identify the sizing rules for main bonding (Reg 544.11 + Table 54.8) vs supplementary bonding (Reg 544.2.1 / 544.2.2 / 544.2.3) and apply each correctly.',
              'Identify the locations and special-location sections of BS 7671 (Section 701, 702, 703, 705, etc.) where supplementary bonding rules apply.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The two-tier bonding system</ContentEyebrow>

          <ConceptBlock
            title="Main bonding — system-wide equipotential at the MET"
            plainEnglish="From the MET, run bonding cables to every metal service that enters the building (gas, water, oil, structural steel, lightning earth). Tie them all to the MET. Now the entire installation has a common reference earth. A fault anywhere produces a controlled potential rise everywhere — no big touch voltages between any two metal surfaces."
            onSite="Done at the meter cabinet on every install. 10 mm² G/Y on PME domestic, larger on commercial. BS 951 clamp on each service. Sub 1 covers sizing, Sub 2 covers terminations, Sub 3 covers clamps, Sub 4 covers the test."
          >
            <p>
              Main protective equipotential bonding is part of the BS 7671 ADS strategy (Reg
              411.3). The Reg 411.3.1.2 mandate: "extraneous-conductive-parts liable to introduce
              a dangerous potential difference shall be connected to the main earthing terminal
              by protective bonding conductors complying with Chapter 54." The protective
              function is system-wide:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Without main bonding:</strong> a fault on a circuit raises the CPC and
                MET to fault potential. Extraneous services (gas pipe, water pipe) are still at
                ground potential via the soil. Touch voltage between MET-bonded metalwork and a
                gas pipe = full fault voltage = lethal.
              </li>
              <li>
                <strong>With main bonding:</strong> the same fault raises the MET, CPC AND every
                bonded extraneous part to the same potential. Touch voltage between any bonded
                metal and any other bonded metal = near zero. Fault is cleared by the protective
                device within Table 41.1 disconnection times; nobody touching the metalwork is
                exposed to lethal touch voltage during the disconnection period.
              </li>
            </ul>
            <p>
              That\'s why main bonding is universal — every install has it (or should have it).
              Sized to handle worst-case fault current including the broken-PEN scenario on PME.
              Tested for continuity at initial verification and at every periodic inspection.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Supplementary bonding — local equipotential at a high-risk location"
            plainEnglish="In a bathroom, the user is wet, often barefoot, in close contact with metal pipes. Touch voltage thresholds are far lower than in a kitchen. Supplementary bonding ties metal items at the location to each other so the user can\'t touch two surfaces at different potentials."
            onSite="Older installs: 4 mm² G/Y from earth bar in consumer unit out to the bathroom, then short bonds between bath, towel rail, copper pipes. Modern installs with all-RCD protection: often omitted per Reg 701.415.2 — the RCD trip time replaces the need for local potential equalisation."
          >
            <p>
              Reg 415.2 — supplementary bonding is "additional protection" beyond ADS. It
              addresses scenarios where the standard ADS disconnection times (0.4 s on TN final
              circuits) are too slow to prevent harm. In a bathroom:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The user is in contact with water and metalwork — body resistance drops
                dramatically (wet skin can be 10× lower resistance than dry skin).
              </li>
              <li>
                The user is barefoot on a tiled floor that\'s often wet — body-to-ground
                impedance drops.
              </li>
              <li>
                Touch voltages that would be uncomfortable but survivable in a dry kitchen can
                be lethal in a wet bathroom.
              </li>
            </ul>
            <p>
              Supplementary bonding addresses this by tying metal items at the location to each
              other directly (not just to the distant MET). If a fault raises the towel rail to
              full line potential, the supplementary bond pulls the copper pipe to the same
              potential within microseconds — touch voltage between towel rail and pipe stays
              near zero regardless of how long the upstream protective device takes to clear the
              fault.
            </p>
            <p>
              The modern alternative: a 30 mA RCD that trips in 25-40 ms instead of 0.4 s. If
              the disconnection happens in under 40 ms, even wet-skin touch voltage is
              survivable, so the local potential equalisation becomes unnecessary. That\'s the
              logic behind the Reg 701.415.2 omission permission.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 415.2 (Supplementary protective equipotential bonding)"
            clause="415.2.1 Supplementary protective equipotential bonding shall include all simultaneously accessible exposed-conductive-parts of fixed equipment and extraneous-conductive-parts including where practicable the main metallic reinforcement of constructional reinforced concrete. The supplementary protective equipotential bonding system shall be connected to the protective conductors of all equipment including those of socket-outlets. 415.2.2 The resistance R between simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts shall fulfil the following condition: R < 50 V / I_a in AC systems; R < 120 V / I_a in DC systems. Where I_a is the operating current in amperes (A) of the protective device or: (a) for RCDs, I_Δn; (b) for overcurrent devices, the 5 s operating current."
            meaning={
              <>
                Supplementary bonding ties together every simultaneously accessible exposed
                (Class I appliance bodies) and extraneous (metal pipes, structural steel)
                conductive part at the location. Plus to the CPC of every circuit serving the
                location including socket-outlets. The resistance between any two such parts
                must satisfy R &lt; 50/I_a — a tight limit for fast-tripping devices (30 mA RCD
                gives 1667 Ω so almost any joint passes), much tighter for high-current
                overcurrent devices.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulations 415.2.1 + 415.2.2 — paraphrased synthesis."
          />

          <SectionRule />

          <ContentEyebrow>The Reg 701.415.2 bathroom omission</ContentEyebrow>

          <ConceptBlock
            title="Three conditions, all met, supplementary may be omitted"
            plainEnglish="Modern bathroom + all RCDs + main bonding done = no need to install supplementary cable. Old bathroom or any condition not met = supplementary bonding required."
            onSite="The omission isn\'t a free pass. You have to prove all three: (1) ADS compliance for every final circuit serving the location; (2) 30 mA RCD additional protection on every final circuit serving the location; (3) main bonding to all extraneous-conductive-parts of the location is in place AND verified by continuity test."
          >
            <p>
              The three conditions in detail:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Condition (d) — ADS compliance.</strong> Every final circuit serving the
                bathroom must satisfy Reg 411.3.2 (disconnection times). On a TN final circuit
                at 230 V that\'s 0.4 s. Verified by Zs measurement against Table 41.3 (covered
                in Module 3 §4 Sub 5).
              </li>
              <li>
                <strong>Condition (e) — 30 mA RCD additional protection.</strong> Every final
                circuit serving the bathroom must have additional protection by 30 mA RCD per
                Reg 415.1.1. Could be an RCBO per circuit or an upstream RCD covering all
                bathroom circuits. The 30 mA value matters — higher (e.g. 100 mA) does NOT
                count for additional protection.
              </li>
              <li>
                <strong>Condition (f) — main bonding compliant.</strong> All extraneous-
                conductive-parts (gas, water, structural steel) must be effectively connected
                to the protective equipotential bonding per Reg 411.3.1.2. "Effectively
                connected" implies verification — continuity tested per Sub 4 of this Section.
              </li>
            </ul>
            <p>
              All three conditions met = supplementary may be omitted. Any condition not met =
              supplementary bonding required. Document the assessment in the EIC.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 701.415.2 (Supplementary protective equipotential bonding in rooms containing a bath or shower)"
            clause="Local supplementary protective equipotential bonding according to Regulation 415.2 shall be established connecting together the terminals of the protective conductor of each circuit supplying Class I and Class II equipment to the accessible extraneous-conductive-parts, within a room containing a bath or shower, including the following: (a) metallic pipes supplying services and metallic waste pipes (for example, water, gas); (b) metallic central heating pipes and air conditioning systems; (c) accessible metallic structural parts of the building. Where the location containing a bath or shower is in a building with a protective equipotential bonding system in accordance with Regulation 411.3.1.2, supplementary protective equipotential bonding may be omitted where all of the following conditions are met: (d) all final circuits of the location comply with the requirements for automatic disconnection according to Regulation 411.3.2; (e) all final circuits of the location have additional protection by means of an RCD in accordance with Regulation 415.1.1; (f) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding according to Regulation 411.3.1.2."
            meaning={
              <>
                The full 701.415.2 in plain reading. First half: supplementary bonding
                requirement (CPCs of every Class I and II circuit + extraneous-conductive-parts
                in the bathroom). Second half: omission permission when ALL THREE conditions met
                (ADS + RCD additional protection + main bonding compliant). The omission is a
                permission, not a mandate — fitting supplementary bonding when not strictly
                required is still compliant.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 701, Regulation 701.415.2."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sizing — the rules diverge</ContentEyebrow>

          <ConceptBlock
            title="Main bonding sizing — Reg 544.11 + Table 54.8 (PME) — covered in Sub 1"
            plainEnglish="Main bonding sizing is detailed in Sub 1. Quick recap: PME uses Table 54.8 against the supplier PEN. Non-PME uses half the earthing conductor with 6 mm² floor and 25 mm² Cu cap."
          >
            <p>Quick reference for main bonding from Sub 1:</p>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-white/90">
                <div className="font-semibold text-emerald-300">PME PEN ≤ 35 mm²</div>
                <div className="text-white/70 sm:text-white/90">10 mm² Cu</div>

                <div className="font-semibold text-emerald-300">PME PEN 35-50 mm²</div>
                <div className="text-white/70 sm:text-white/90">16 mm² Cu</div>

                <div className="font-semibold text-emerald-300">PME PEN 50-95 mm²</div>
                <div className="text-white/70 sm:text-white/90">25 mm² Cu</div>

                <div className="font-semibold text-emerald-300">Non-PME (TN-S, TT)</div>
                <div className="text-white/70 sm:text-white/90">half earthing CSA, min 6 mm², max 25 mm² Cu</div>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Supplementary bonding sizing — Reg 544.2.x — different rules"
            plainEnglish="Supplementary bonds are smaller and shorter. The sizing rule depends on what\'s being bonded to what — exposed-to-exposed, extraneous-to-exposed, or extraneous-to-extraneous."
          >
            <p>The three supplementary bonding cases:</p>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px]">
              <div className="grid grid-cols-1 gap-y-3 text-white/90">
                <div>
                  <div className="font-semibold text-emerald-300">Reg 544.2.1 — exposed to exposed</div>
                  <div className="text-white/70 mt-1">
                    Conductance not less than the smaller CPC connected to the exposed parts.
                    Min 4 mm² if not mechanically protected.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-emerald-300">Reg 544.2.2 — exposed to extraneous</div>
                  <div className="text-white/70 mt-1">
                    Conductance not less than half the CPC of the exposed-conductive-part. Min
                    4 mm² if not mechanically protected.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-emerald-300">Reg 544.2.3 — extraneous to extraneous</div>
                  <div className="text-white/70 mt-1">
                    2.5 mm² minimum if mechanically protected (in conduit, sheath, etc.) or
                    4 mm² minimum if not mechanically protected.
                  </div>
                </div>
              </div>
            </div>
            <p>
              Trade shorthand: 4 mm² on view, 2.5 mm² in conduit, half-the-CPC for exposed-side
              bonds where the CPC is bigger than 4 mm² (rare in domestic).
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

          <ContentEyebrow>The R &lt; 50 / I_a calculation</ContentEyebrow>

          <ConceptBlock
            title="Reg 415.2.2 — the resistance condition for supplementary effectiveness"
            plainEnglish="The supplementary bond conductance must be enough that touch voltage between any two simultaneously accessible parts stays under 50 V during the disconnection time of the upstream protective device."
            onSite="On a 30 mA RCD-protected circuit, the limit is 50/0.030 = 1667 ohms — almost any plausible bond joint passes this comfortably. On a high-current overcurrent device (no RCD) the limit can drop to under 1 ohm — much tighter."
          >
            <p>
              Reg 415.2.2 sets the resistance R between any two simultaneously accessible
              exposed-conductive-parts and extraneous-conductive-parts:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">R &lt; 50 V / I_a (AC systems)</p>
            <p className="font-mono text-[14px] text-emerald-300">R &lt; 120 V / I_a (DC systems)</p>
            <p>Where I_a is:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>For RCDs:</strong> the rated residual operating current I_Δn — typically
                30 mA for additional protection.
              </li>
              <li>
                <strong>For overcurrent devices:</strong> the 5 s operating current — for Type B
                MCBs that\'s roughly 5×In, for Type C that\'s roughly 10×In.
              </li>
            </ul>
            <p>Worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30 mA RCD:</strong> R &lt; 50 / 0.030 = 1667 ohm. Almost any
                supplementary bond joint passes.
              </li>
              <li>
                <strong>Type B 32 A MCB (5×In = 160 A):</strong> R &lt; 50 / 160 = 0.3125 ohm.
                Tighter — needs a clean low-resistance bond.
              </li>
              <li>
                <strong>Type C 32 A MCB (10×In = 320 A):</strong> R &lt; 50 / 320 = 0.156 ohm.
                Tighter still.
              </li>
              <li>
                <strong>BS 88 fuse 32 A (5 s operating current ~140 A):</strong> R &lt; 50 / 140
                = 0.357 ohm.
              </li>
            </ul>
            <p>
              The reason 30 mA RCD additional protection sits at the heart of Reg 701.415.2
              omission: with an RCD, the resistance condition is so loose that supplementary
              bonding effectively can\'t fail — and the fast disconnection time means
              equipotential bonding becomes redundant. Without the RCD, you need both the
              supplementary bond AND a tight resistance, and even then the protection isn\'t as
              fast.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="When supplementary bonding can be omitted in modern installs (Reg 701.415.2 + the 30 mA RCD provision)"
            plainEnglish="The A4:2026 simplification: if every final circuit serving the bathroom has 30 mA RCD additional protection, ADS works on every circuit and main bonding is in place and tested, supplementary bonding may be omitted. The RCD's 25-40 ms trip time replaces the need for local potential equalisation."
            onSite="On a new-build with an 18-way RCBO board (every circuit on its own 30 mA RCBO) and main bonding upgraded to current sizing, the omission applies. Document the decision in the EIC. On an older board with only one or two upstream RCDs covering everything, check that bathroom circuits are all under those RCDs — if a non-RCD circuit feeds even a fan, the omission permission breaks."
          >
            <p>
              The Reg 701.415.2 omission permission has been on the books since the 17th edition
              and has stayed put through 18th edition Amendment 2 and into the BS 7671:2018+A4:2026
              update. The conditions haven't changed in substance — what HAS changed is that the
              regulation is now widely understood and applied, and modern boards (RCBO per circuit
              becoming standard) make the conditions easy to meet.
            </p>
            <p>The three conditions, restated, with the practical "is it met?" check:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(d) ADS compliance on every final circuit of the location.</strong> Reg
                411.3.2 disconnection times — 0.4 s on a TN final circuit at 230 V. Verified by
                Zs measurement at sign-off. Modern installs almost always meet this — the RCD
                drives Zs requirements way down (the RCD trips on residual current, not on Zs).
              </li>
              <li>
                <strong>(e) 30 mA RCD additional protection on every final circuit of the
                location.</strong> The bathroom lighting, the shower, the towel rail circuit,
                the extractor fan, the shaver socket — every one of these must be on a 30 mA RCD
                or RCBO. 100 mA RCDs do NOT count for additional protection — must be 30 mA. The
                check: open the consumer unit, identify every circuit feeding any equipment in
                the bathroom, confirm each one has 30 mA RCD/RCBO upstream.
              </li>
              <li>
                <strong>(f) Main bonding to extraneous-conductive-parts effectively
                connected.</strong> Effectively connected = installed AND verified by continuity
                test (per Sub 4). On a refurb, retest the existing main bonds before relying on
                the omission. On a new install, fit and test main bonding before the bathroom
                rough-in.
              </li>
            </ul>
            <p>
              The A4:2026 angle. A4 hasn't moved Reg 701.415.2 itself, but the broader A4 push
              toward universal RCD protection (every socket, every lighting circuit, every final
              circuit in dwellings) means more installations meet condition (e) by default. The
              omission becomes the routine answer on new builds and modern refurbs, where five
              years ago it was less common because some boards still had a non-RCD'd "essential
              services" section. Document the assessment in the EIC each time — the regulation
              gives you the freedom, the documentation evidences your competent decision.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Special locations beyond bathrooms — pools, agricultural, marinas — where supplementary bonding scope expands"
            plainEnglish="Bathroom is the easy one — Reg 701 with an omission permission. Other special locations have tighter rules. Swimming pool zones (Section 702) require supplementary bonding inside Zone 1 with no general omission. Agricultural (Section 705) wants supplementary bonding for livestock-touch protection. Marinas (Section 709) and caravan parks (Section 708) have galvanic-corrosion considerations that change the bonding strategy entirely."
            onSite="Always read the relevant Section before starting work in a special location. The general rules of Chapter 41 / Chapter 54 / Reg 415.2 are the baseline; the Section adds rules on top. Section 702 has been known to fail otherwise-competent installers on pool jobs because the omission they're used to in bathrooms doesn't apply."
          >
            <p>The headline differences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 702 — swimming pools and other basins.</strong> Zones 0, 1 and 2
                around the pool. Local supplementary bonding inside Zone 1 connects every
                extraneous-conductive-part (metal pool ladder, metal pool surround, metal handrail,
                metal pipework) and every exposed-conductive-part of fixed equipment in the zone.
                The Reg 701.415.2 omission permission does NOT apply to pools — supplementary
                bonding is essentially mandatory in Zone 1 regardless of RCD protection.
                Reasoning: a person in or beside a pool is in maximum body-conductivity state
                (wet skin, full immersion in many cases) and the touch-voltage limits drop way
                below the bathroom threshold.
              </li>
              <li>
                <strong>Section 703 — sauna heaters and rooms with sauna heaters.</strong> Tighter
                IP ratings on accessories, no socket-outlets in Zone 1, supplementary bonding
                requirements similar to bathroom but with no omission permission inside the sauna
                cabin itself.
              </li>
              <li>
                <strong>Section 705 — agricultural and horticultural premises.</strong>
                Supplementary bonding to protect livestock (cattle, horses, sheep) which have
                much lower touch-voltage tolerance than humans. Bonding ties together every
                metalwork item livestock might contact — feeding troughs, milking stalls, gates,
                fence posts. RCD additional protection at 30 mA on every final circuit. The
                special-location rules effectively make supplementary bonding mandatory across
                a much larger zone than a bathroom.
              </li>
              <li>
                <strong>Section 708 — caravan and camping parks.</strong> TN-S or TT supplies
                preferred over PME because of the broken-PEN risk on touring caravans and
                static homes (where the metal frame becomes the broken-PEN return path). Supply
                pillars require RCD protection at 30 mA per pitch. Bonding considerations
                include the metal hookup pillar itself plus on-site service pipework.
              </li>
              <li>
                <strong>Section 709 — marinas and similar locations.</strong> The big additional
                consideration is galvanic corrosion between bonded vessels — connecting a steel-
                hulled boat's electrical earth to a copper-bonded shore supply via the bonding
                system creates a galvanic cell that corrodes the boat's hull over months.
                Section 709 mandates galvanic isolation transformers or other isolation devices
                between shore supply and vessel earth.
              </li>
              <li>
                <strong>Section 711 — exhibitions, shows and stands.</strong> Temporary
                installations with frequent changes, supplementary bonding requirements relax in
                some cases (because nothing is permanent) but tighten in others (public access
                to live equipment must be impossible).
              </li>
            </ul>
            <p>
              The general rule: when you're working in any special location, read the relevant
              Section of Part 7 before designing the bonding strategy. The general Chapter 41 /
              Chapter 54 / Reg 415.2 framework is the baseline; the Section adds and overrides.
              The bathroom omission permission is unusually permissive — most other special
              locations push the other way (tighter rules, more bonding, fewer omissions).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the distinction matters in practice</ContentEyebrow>

          <CommonMistake
            title="Reflexively installing supplementary bonding cable in every modern bathroom"
            whatHappens={
              <>
                You\'re first-fixing a new-build bathroom. By habit you run a 4 mm² G/Y
                supplementary bonding cable from the consumer unit\'s earth bar to a junction
                box in the bathroom, then short bonds from the JB to the bath, the towel rail,
                the copper pipes. The bathroom\'s circuits are all RCBO-protected (30 mA), main
                bonding to gas and water is in place and tested. You\'ve added 30+ minutes of
                labour and 8 m of cable to satisfy a regulation that explicitly permits
                omission.
              </>
            }
            doInstead={
              <>
                Check the three Reg 701.415.2 omission conditions before deciding. New build
                with full RCBO protection + main bonding compliant + ADS verified = supplementary
                may be omitted. Document the omission decision in the EIC. The labour and cable
                saved per bathroom multiplies up over a 100-bathroom development. Belt-and-braces
                fitting is permissible (and many electricians do it for resilience), but
                reflexive fitting without considering the omission is wasted effort. On a
                refurb of an older bathroom where existing supplementary bonding is in place,
                leave it — don\'t remove what\'s already working.
              </>
            }
          />

          <Scenario
            title="Rewiring a bathroom in a 1960s house — supplementary bonding decision"
            situation={
              <>
                You\'re rewiring a bathroom in a 1960s end-terrace. Existing install has
                supplementary bonding cable visible: a 4 mm² G/Y from an earth bar in the old
                consumer unit (being replaced), to a junction box behind the bath panel, with
                short bonds to the bath, the towel rail and the copper hot/cold pipes. The new
                consumer unit will be 18-way RCBO-protected (every circuit on its own 30 mA RCBO
                including the bathroom lighting and shower circuits). Main bonding to gas and
                water at the building intake is being upgraded to 10 mm² G/Y as part of the
                same job and will be continuity-tested. Decision: keep, remove, or replace the
                bathroom supplementary bonding?
              </>
            }
            whatToDo={
              <>
                Apply the Reg 701.415.2 three-condition test. (1) ADS compliance — yes, all
                bathroom circuits will be verified by Zs measurement at sign-off. (2) 30 mA RCD
                additional protection — yes, every bathroom circuit is on its own 30 mA RCBO.
                (3) Main bonding compliant — yes, being upgraded and will be tested. All three
                met → supplementary may be omitted on the new install. BUT — the existing
                supplementary bonding is functional, accessible, and adds no cost to leave in
                place. Most electricians on a refurb where the bathroom isn\'t being torn out
                would leave the existing bonds: cost zero, removes work, adds redundancy. If
                the bath panel is coming off and the JB is being disturbed anyway, take the
                opportunity to inspect, clean and re-make the joints — but don\'t deliberately
                remove a working supplementary bond just because the omission permits it.
                Document in the EIC: "Supplementary bonding existing — retained as additional
                protection. Reg 701.415.2 omission conditions also met." Best of both worlds.
              </>
            }
            whyItMatters={
              <>
                Reg 701.415.2 is permissive, not prohibitive. The decision tree for refurb
                work: existing bonds in place → leave them. New bathroom build with full RCD
                protection → omission permitted, decide based on customer/labour preference.
                Older bathroom without RCD protection → supplementary required. Always document
                the assessment. The regulation gives you freedom; the EIC documents your choice.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Main bonding (Reg 411.3.1.2 + 544.11) — system-wide intake equipotential. From MET to every extraneous-conductive-part. Mandatory on every install with metal services.',
              'Supplementary bonding (Reg 415.2 + 544.2) — local high-risk equipotential. At a specific location, between exposed and extraneous parts at that location.',
              'Different sizing: main uses Table 54.8 (PME) or half-earthing (non-PME); supplementary uses Reg 544.2.1/2/3 (typically 2.5 mm² protected or 4 mm² unprotected).',
              'Reg 415.2.2 sets the supplementary effectiveness condition R < 50/I_a (AC). 30 mA RCD makes this very loose (1667 ohm); high-current MCB makes it tight (under 1 ohm).',
              'Reg 701.415.2 — supplementary bonding may be omitted in a bathroom when ALL THREE conditions met: ADS-compliant final circuits + 30 mA RCD on every final circuit + main bonding to extraneous-conductive-parts compliant.',
              'Modern fully-RCD-protected new-builds typically meet all three omission conditions. Reflexive supplementary bonding install is wasted labour on these jobs.',
              'On refurb work, leave existing supplementary bonding in place even if the omission permission applies — it adds redundancy at zero ongoing cost.',
              'Other special locations (Section 702 swimming pools, 705 agricultural, 711 exhibitions) reference Reg 415.2 with location-specific overlays. Always check the Section for the location you\'re working in.',
            ]}
          />

          <Quiz title="Main vs supplementary — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Test continuity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Bonding scenarios across services
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
