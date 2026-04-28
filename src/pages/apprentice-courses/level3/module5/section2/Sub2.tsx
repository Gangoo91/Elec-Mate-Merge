/**
 * Module 5 · Section 2 · Subsection 2 — Earthing and bonding inspection
 * Maps to C&G 2365-03 / Unit 304 / LO3 / AC 3.1
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 3.2; 2366-03 Unit 302 / AC 3.2
 *
 * The visual inspection of earthing and main / supplementary bonding —
 * sizing tables (54.7 / 54.8), arrangement (TN-S / TN-C-S / PNB / TT / IT),
 * label requirements (Reg 514.13.1), test link presence, and the special
 * location supplementary bonding considerations under Part 7.
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

const TITLE = 'Earthing and bonding inspection | Level 3 Module 5.2.2 | Elec-Mate';
const DESCRIPTION =
  "Visual inspection of the earthing and bonding arrangement — Table 54.7 and 54.8 sizing, BS 951 labels, test link presence, supplementary bonding in special locations, and the A4:2026 PNB designation for protective neutral bonding.";

const checks = [
  {
    id: 'm5-s2-sub2-tncs-pnb',
    question: 'A4:2026 introduced the term PNB to formalise:',
    options: [
      'A new earthing system entirely.',
      "A specific TN-C-S arrangement: protective neutral bonding — the earthing arrangement where the supply neutral is bonded to earth at the supply intake by the customer, distinct from PME where the DNO performs that bonding.",
      'A type of RCD.',
      'A bonding accessory.',
    ],
    correctIndex: 1,
    explanation:
      "PNB (protective neutral bonding) names the customer-side bonding of N to earth at the intake — historically grouped under TN-C-S along with PME. The functional difference: PME = DNO bonds N-E at street; PNB = customer bonds N-E at intake. A4:2026 formalised the PNB label so the schedule and EIC can identify the specific arrangement. Both are TN-C-S in topology.",
  },
  {
    id: 'm5-s2-sub2-table547',
    question: 'For a 25 mm² Cu PME supply tail, the minimum CSA of the main earthing conductor per Table 54.7 is:',
    options: [
      '6 mm² Cu.',
      '10 mm² Cu.',
      '16 mm² Cu.',
      '25 mm² Cu.',
    ],
    correctIndex: 2,
    explanation:
      "Table 54.7 — for 25 mm² Cu line conductor on PME, the main earthing conductor must be at least 16 mm² Cu (or equivalent). The PME column is more stringent than other arrangements because the earthing conductor may carry diverted neutral current under fault. Visual inspection measures the installed CSA against the supply tail size and ticks against this table.",
  },
  {
    id: 'm5-s2-sub2-supp-bonding',
    question: 'Supplementary bonding in a Section 701 bathroom is required where:',
    options: [
      'Always — every bathroom needs it.',
      'It is no longer required where ADS disconnection times are met, all circuits have RCD additional protection at 30 mA, and all extraneous-conductive-parts in the location are connected to the main earthing terminal — Reg 701.415.2 omission criteria.',
      'Only in commercial bathrooms.',
      'Only when there is no shower.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 701.415.2 allows omission of supplementary bonding in a Section 701 bathroom IF: (a) all circuits comply with disconnection times, (b) all circuits have additional protection by 30 mA RCD, (c) all extraneous-conductive-parts of the location are connected to the main earthing terminal. All three must be met. If any condition fails, supplementary bonding is required. Visual inspection checks the conditions and the supplementary bonding presence accordingly.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Reg 542.1.2.1 requires the means of earthing for an electrical installation to:',
    options: [
      'Be connected to the cold water main.',
      'Provide a low-impedance return path for fault current and be of adequate cross-section, mechanical strength, and resistance to corrosion — Table 54.7 sizing applies.',
      'Be installed below ground.',
      'Be coloured red.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 542.1.2.1 requires the means of earthing to provide a low-impedance return path for fault current. Sizing per Table 54.7 (or by calculation per Reg 543.1.4 for protective conductors), mechanical strength per Reg 543.3, and corrosion resistance per Reg 542.4. Visual inspection verifies CSA, condition (corrosion / damage), and connection integrity.',
  },
  {
    id: 2,
    question: 'On a TN-S installation, Ze (external earth fault loop impedance) is:',
    options: [
      'Always less than 0.05 ohm.',
      'The impedance of the earth fault loop external to the installation — measured at the origin with the main switch open. For TN-S, typical values 0.1 to 0.8 ohm. Confirmed at initial verification.',
      'The same as the internal Zs.',
      'Not relevant on TN-S.',
    ],
    correctAnswer: 1,
    explanation:
      'Ze is the external loop impedance — DNO supply transformer secondary back to the supply origin. Measured at the origin with main switch open (so the installation is excluded). TN-S typical 0.1-0.8 ohm. TN-C-S typical 0.1-0.35 ohm. TT typical 20-200 ohm plus the electrode resistance. Confirmed at initial verification and recorded on EIC.',
  },
  {
    id: 3,
    question: 'Table 54.8 (main bonding conductor sizing) for a 35 mm² Cu PME supply tail requires a main bonding conductor of:',
    options: [
      '10 mm² Cu.',
      '16 mm² Cu.',
      '25 mm² Cu.',
      '6 mm² Cu.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 sizing — for 35 mm² Cu line on PME, main bonding minimum 16 mm² Cu (or equivalent). The PME column is more stringent than non-PME because of diverted neutral current considerations. Note Table 54.7 (earthing conductor) and Table 54.8 (main bonding) are different tables — students often confuse them. Both are required reading for visual inspection.',
  },
  {
    id: 4,
    question: 'A BS 951 label states:',
    options: [
      "Caution — High Voltage.",
      "Safety Electrical Connection — Do Not Remove.",
      "Inspect Annually.",
      "Earth Bond.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 951 is the British Standard for the durable label 'Safety Electrical Connection — Do Not Remove' required by Reg 514.13.1 at every earth electrode connection, every main bonding connection to extraneous-conductive-parts, and at the MET where it sits separately from the main switchgear.",
  },
  {
    id: 5,
    question: 'For a TT installation, the maximum acceptable Ra (earth electrode resistance) is governed by:',
    options: [
      'A fixed value of 5 ohm regardless of installation.',
      'The relationship Ra times IΔn must not exceed 50 V — for a 30 mA RCD this gives a theoretical maximum of 1667 ohm, but stability over time is the practical concern. Reg 411.5.3 requires the value chosen to ensure reliable disconnection.',
      'A fixed value of 200 ohm.',
      'No requirement.',
    ],
    correctAnswer: 1,
    explanation:
      'TT relies on the RCD for disconnection. Reg 411.5.3 — Ra times IΔn must not exceed 50 V (touch voltage limit). For 30 mA RCD that gives Ra at most 1667 ohm theoretically, but BS 7671 practical guidance and electrode stability point to keeping Ra well below this — 200 ohm as a working maximum, lower where soil conditions allow. Visual inspection confirms electrode type, depth, accessibility for retest.',
  },
  {
    id: 6,
    question: 'On an existing installation, you find the main earthing conductor is connected to the MET via a bolted connection that has corroded. Visual inspection records:',
    options: [
      'Tick — the connection is still attached.',
      'Cross — the connection is not electrically and mechanically sound (Reg 542.4.2). Comment: corrosion at MET connection. Action: clean, retighten with anti-corrosion compound, retest continuity, recommend regular re-inspection.',
      'N/A — corrosion is not in the schedule.',
      'LIM — cannot assess.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 542.4.2 — connections in the earthing arrangement must be electrically and mechanically sound. Corrosion compromises both. Cross with comment, photograph, and action plan. On EICR this is typically C2 (potentially dangerous) — if the corrosion is severe enough to break continuity, C1.',
  },
  {
    id: 7,
    question: 'In a kitchen with a metal sink and metal water pipes, supplementary bonding to the sink is:',
    options: [
      'Always required.',
      'Required only if the sink is in a Section 701 location (bathroom). In a kitchen, the metal water pipes are bonded at the main bonding (extraneous-conductive-parts to MET). The sink is incidentally connected via the pipes — separate supplementary bonding is not required by BS 7671 in a domestic kitchen.',
      'Required if the kitchen has an electric oven.',
      'Required by Part L.',
    ],
    correctAnswer: 1,
    explanation:
      "Section 701 bathrooms have specific supplementary bonding considerations (with the omission criteria in Reg 701.415.2 if all conditions are met). A kitchen is not a special location under Part 7 — supplementary bonding is not separately required. The metal water pipes are bonded at the entry point as extraneous-conductive-parts under main bonding to MET. The sink is connected via the pipes. Adding separate supplementary bonding to the sink in a domestic kitchen is unnecessary and not required by BS 7671.",
  },
  {
    id: 8,
    question: 'A4:2026 added the PNB designation. Compared to PME, the operational difference is:',
    options: [
      'PNB has higher fault currents.',
      "PNB = customer-side bonding of N to earth at the intake (the customer installs and maintains the N-E link); PME = DNO-side bonding (the DNO bonds N to earth at the supply transformer and along the network). Both are TN-C-S topologies but the responsibility split differs.",
      'PNB requires no earthing.',
      'PNB is a TT system.',
    ],
    correctAnswer: 1,
    explanation:
      "PME (Protective Multiple Earthing) — the DNO bonds the combined PEN to earth at multiple points on its network including the supply transformer. PNB (Protective Neutral Bonding) — the customer bonds the supply neutral to earth at the customer intake. Both result in a TN-C-S topology at the customer side, but the responsibility, fault risk, and DNO declaration differ. A4:2026 formalised PNB so the EIC can record the actual arrangement rather than lumping all TN-C-S as PME.",
  },
];

const faqs = [
  {
    question: 'When do I use Table 54.7 versus Table 54.8?',
    answer:
      'Table 54.7 sizes the main earthing conductor (from MET back to the means of earthing — DNO terminal or earth electrode). Table 54.8 sizes the main protective bonding conductors (MET out to extraneous-conductive-parts like gas and water mains). Two different roles, two different tables. The PME column in each table is more stringent than the non-PME column due to diverted-neutral-current considerations.',
  },
  {
    question: 'Why does PME need a bigger earthing conductor than TN-S?',
    answer:
      "Under PME, the supply neutral is combined with earth (PEN). If the PEN connection fails upstream, the customer earthing system can carry a portion of normal load current — known as diverted neutral current. The Table 54.7 PME column sizes the earthing conductor to safely carry that current without overheating. TN-S has separate N and CPC at supply, so this concern does not arise.",
  },
  {
    question: 'Is supplementary bonding ever required in a kitchen?',
    answer:
      'Not under BS 7671 — kitchens are not Section 701 special locations. The extraneous-conductive-parts (metal water pipes) are bonded at main bonding. Metal sinks are connected incidentally via the pipes. Older installations may have supplementary bonding cables visible at the sink — that is historic and was never strictly required outside Section 701. Periodic inspection just confirms the main bonding is sound.',
  },
  {
    question: 'How do I tell PME from PNB on visual inspection?',
    answer:
      'Look at the supply intake. PME — the DNO has bonded N to earth on their side (you see the supply head with no separate customer N-E link). PNB — the customer has bonded N to earth at the intake (you see a visible N-E link in the customer enclosure). The DNO declaration on the EIC tells you definitively. A4:2026 added the PNB designation row so you can record it accurately.',
  },
  {
    question: 'What if the test link is missing on a TT installation?',
    answer:
      "Record as a non-compliance (Reg 542.4 — accessibility for inspection and testing). Without a test link you cannot disconnect the earthing conductor for accurate Ra measurement without disturbing the entire installation bonding. Recommend installation of a test link as a remedial action. On an existing TT install you may find this — it is a legitimate observation/improvement on the EICR.",
  },
  {
    question: "What is the practical difference between earthing and bonding?",
    answer:
      "Earthing = providing a low-impedance return path for fault current to enable ADS — connecting exposed-conductive-parts (metal of equipment) to earth. Bonding = equalising potential between conductive parts to prevent dangerous voltage differences — connecting extraneous-conductive-parts (incoming metal services like gas/water/structural steel) to earth. Two different jobs, often confused. Visual inspection treats them separately on the schedule.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 2"
            title="Earthing and bonding inspection"
            description="The visual stage for the earthing and bonding arrangement — sizing tables, BS 951 labels, ADS arrangement (TN-S / TN-C-S / PNB / TT / IT), and the special location supplementary bonding considerations."
            tone="emerald"
          />

          <TLDR
            points={[
              'Table 54.7 sizes the main earthing conductor (PME column more stringent due to diverted neutral current). Table 54.8 sizes the main protective bonding.',
              "Reg 514.13.1 — BS 951 label 'Safety Electrical Connection — Do Not Remove' at every earth electrode connection, every main bonding connection, and at the MET where separated from switchgear.",
              "A4:2026 formalised the PNB designation — TN-C-S where the customer (not the DNO) bonds neutral to earth at the intake. Distinct from PME on the EIC.",
              'Section 701 bathrooms — supplementary bonding can be omitted only if Reg 701.415.2 conditions are all met (disconnection times, 30 mA RCD on all circuits, all extraneous-conductive-parts to MET).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Table 54.7 to size the main earthing conductor against the supply tail and earthing arrangement.',
              'Apply Table 54.8 to size the main protective bonding to extraneous-conductive-parts.',
              'Distinguish between earthing (fault return path) and bonding (potential equalisation) functions.',
              'Identify the four ADS arrangements TN-S, TN-C-S (PME / PNB), TT, IT and the visual cues that distinguish them.',
              'Confirm BS 951 label presence and durability per Reg 514.13.1 at all required connections.',
              'Apply the Reg 701.415.2 omission criteria for supplementary bonding in bathrooms correctly.',
              "Record corrosion, damage, or undersized conductors as cross / C2 with appropriate comment and remediation.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The two jobs — earthing and bonding</ContentEyebrow>

          <ConceptBlock
            title="Two functions, two tables, one connection point at the MET"
            plainEnglish="Earthing connects metal of equipment (exposed-conductive-parts) to earth so fault current has a path back. Bonding connects incoming metal services (extraneous-conductive-parts) to the same earth so they sit at the same potential — preventing dangerous voltage differences across the body during a fault. Both terminate at the MET. Both have their own sizing table."
            onSite="When you walk a CU, find the MET. Trace one earthing conductor outward — that is the means-of-earthing route, sized per Table 54.7. Trace one bonding conductor outward — that is a main bond to gas / water / structure, sized per Table 54.8. Different jobs, different sizes."
          >
            <p>The two functions broken down:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earthing — Reg 542.</strong> Provide a low-impedance return path for fault
                current. Connects every exposed-conductive-part (metal cases of Class I equipment)
                back to the MET via the CPC. The MET connects back to the means of earthing — DNO
                supply terminal (TN-S, TN-C-S) or earth electrode (TT, IT). Sized per Table 54.7
                (main earthing conductor) and Table 54.8 / Reg 543.1.4 (CPCs).
              </li>
              <li>
                <strong>Bonding — Reg 411.3.1.2.</strong> Equalise potential between extraneous
                conductive parts (gas, water, structural metal entering the building, lightning
                protection bond) and the MET. During a fault, even with ADS operating, transient
                voltages can appear on metalwork. Bonding ensures everything in the equipotential
                zone rises together — no dangerous voltage difference across the body.
              </li>
              <li>
                <strong>Supplementary bonding — Reg 415.2.</strong> Local equipotential bonding in
                special locations (Section 701/702/703 etc) — connects extraneous and exposed
                conductive parts within the location to each other, providing extra protection
                against shock from voltage differences in wet / restricted environments. Required
                in bathrooms unless Reg 701.415.2 omission criteria all met.
              </li>
            </ul>
            <p>
              Visual inspection of the earthing and bonding is methodical: identify the supply
              arrangement, find the MET, measure / verify each conductor sizing against the
              relevant table, check every connection for soundness and BS 951 labelling, follow
              extraneous-conductive-parts to confirm bonding presence and routing.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Main protective bonding)"
            clause="In each consumer's installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54. Examples of extraneous-conductive-parts can include: (a) metallic water installation pipes; (b) metallic gas installation pipes; (c) other metallic installation pipework and ducting; (d) central heating and air conditioning systems; (e) exposed metallic structural parts of the building."
            meaning={
              <>
                The main bonding requirement is comprehensive. Every extraneous-conductive-part
                entering the building must be bonded at the MET — gas, water, oil, central
                heating, lightning, structural steel where it is in continuous contact with earth.
                Visual inspection works through the list, identifies what is present, confirms a
                bonding conductor of the correct CSA (Table 54.8) terminates from each within
                600 mm of the point of entry where practical.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.2."
          />

          <SectionRule />

          <ContentEyebrow>Sizing — Table 54.7 and 54.8</ContentEyebrow>

          <ConceptBlock
            title="The two tables that drive most visual fail-points"
            plainEnglish="Most visible earthing / bonding defects come down to wrong CSA. Inspector measures the supply tail, looks up Table 54.7 for the earthing conductor, looks up Table 54.8 for the bonding. If the installed CSA is below the tabulated minimum, it is a cross with remediation required."
          >
            <p>Working with Table 54.7 (main earthing conductor):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inputs you need.</strong> Supply tail size (CSA in mm²), earthing
                arrangement (PME / TN-C-S non-PME / TN-S / TT). Conductor material (assume Cu
                unless stated).
              </li>
              <li>
                <strong>Common values.</strong> 16 mm² Cu PME tail gives main earthing 10 mm² Cu (or
                16 mm² Al). 25 mm² Cu PME tail gives main earthing 16 mm² Cu. 35 mm² Cu PME tail
                gives main earthing 16 mm² Cu (PME column flattens at this point). 70 mm² Cu PME
                tail gives main earthing 35 mm² Cu.
              </li>
              <li>
                <strong>Non-PME column.</strong> Slightly less stringent because no diverted
                neutral current — typically half the line CSA up to a 25 mm² minimum, then sized
                per Reg 543.1.4 for larger.
              </li>
            </ul>
            <p>Working with Table 54.8 (main protective bonding):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inputs you need.</strong> Supply tail size, earthing arrangement.
              </li>
              <li>
                <strong>Common PME values.</strong> 16 mm² line gives 10 mm² bond. 25 mm² line
                gives 10 mm² bond. 35 mm² line gives 16 mm² bond. 70 mm² line gives 25 mm² bond.
              </li>
              <li>
                <strong>Common non-PME values.</strong> 16 mm² line gives 6 mm² bond. 25 mm² line
                gives 6 mm² bond. 35 mm² line gives 10 mm² bond.
              </li>
              <li>
                <strong>Minimum and maximum.</strong> Minimum bonding 6 mm² Cu in any case where
                bonding is required. Maximum 25 mm² Cu (no benefit from larger).
              </li>
            </ul>
            <p>
              Table values shift with edition and amendment — always check the current published
              table, not memory or older copies. A4:2026 retained the Table 54.7 / 54.8 structure
              from previous editions but the supporting text was clarified.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 542.4.2 (Earthing connections)"
            clause="Every earthing connection shall be electrically and mechanically sound, protected against mechanical damage and against corrosion, accessible for inspection and testing (except for foundation earth electrodes and other buried connections), and labelled per Regulation 514.13."
            meaning={
              <>
                Visual inspection checks every earthing connection against the four-part Reg
                542.4.2 test: sound (tight, intact, correct termination type), protected (no
                mechanical risk, no corrosion exposure), accessible (test link present at MET),
                labelled (BS 951 per Reg 514.13.1). Failure on any one is a cross / non-compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 54, Regulation 542.4.2."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The ADS arrangements — TN-S, TN-C-S (PME / PNB), TT, IT</ContentEyebrow>

          <ConceptBlock
            title="What each looks like at the supply intake"
            plainEnglish="Visual inspection identifies the ADS arrangement at the supply intake. Each has distinctive visual cues. Get this wrong and the rest of the verification proceeds against the wrong reference values."
          >
            <p>Quick visual identification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S.</strong> Supply with separate N and PE conductors. The DNO supplies
                a dedicated earth — usually via the cable armour or a separate earth conductor.
                Customer earthing connects to the DNO earth terminal at the intake. Ze typically
                0.1-0.8 ohm.
              </li>
              <li>
                <strong>TN-C-S (PME).</strong> Supply combines N and PE upstream (PEN). The DNO
                bonds N to earth at multiple points on the network, including at the supply
                transformer. Customer earthing connects to the DNO supply terminal — which is the
                PEN. The customer side has separate N and PE (the C-S of TN-C-S). Ze typically
                0.1-0.35 ohm.
              </li>
              <li>
                <strong>TN-C-S (PNB).</strong> Same TN-C-S topology, but the N-E bond is performed
                by the customer at the intake — not by the DNO on the network. Visible as a
                customer-side N-E link in the intake enclosure. A4:2026 formalised this designation.
              </li>
              <li>
                <strong>TT.</strong> Customer provides their own earth electrode — the DNO supplies
                only L and N. The customer earthing connects to a buried electrode, an earth rod,
                an earth mat, or a foundation earth electrode. Ze (Ra) typically 20-200 ohm.
                Requires RCD as the primary disconnection device for fault protection.
              </li>
              <li>
                <strong>IT.</strong> Source is isolated from earth (or earthed via high
                impedance). Used in specific industrial / medical applications where first-fault
                continuity of supply is critical. Rare in UK general installations.
              </li>
            </ul>
            <p>
              Visual inspection records the arrangement at the head of the EIC and against the
              schedule sections that depend on arrangement (e.g. main bonding presence is
              relevant to all; electrode test link is relevant only to TT; PEN bond verification
              is relevant only to TN-C-S).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Confusing PME and PNB on the EIC"
            whatHappens={
              <>
                Inspector ticks PME by default for any TN-C-S install. The actual arrangement
                is PNB — customer-side N-E bond. The EIC is wrong, and the maintenance
                responsibilities recorded against the install are misattributed. Future inspectors
                base their assumptions on the EIC and may not check the bond integrity that the
                customer is actually responsible for maintaining.
              </>
            }
            doInstead={
              <>
                Look at the intake. If you see a customer-side N-E link inside the customer
                enclosure (often a strap between the neutral bar and the earth bar in the supply
                head or origin distribution), it is PNB. If the bond is upstream of the customer
                meter and inside the DNO sealed enclosure, it is PME. The DNO declaration on file
                also confirms. A4:2026 added the PNB designation row — use it.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Supplementary bonding in special locations</ContentEyebrow>

          <ConceptBlock
            title="Section 701 bathrooms — the Reg 701.415.2 omission criteria"
            plainEnglish="Old-style supplementary bonding cables visible in bathroom panels were once mandatory. Modern designs often omit them — but only if all three Reg 701.415.2 conditions are met. Visual inspection checks the conditions and the bonding presence accordingly."
          >
            <p>Reg 701.415.2 omission of supplementary bonding in a Section 701 location requires ALL three of:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) All circuits comply with disconnection times.</strong> Verified at
                live testing (Zs at or below Table 41.3 max for the circuit).
              </li>
              <li>
                <strong>(b) All circuits supplying the location have additional protection by
                30 mA RCD.</strong> Visual confirms RCD presence and rating; live test confirms
                trip time (A4:2026 simplified — single AC test at 1 times IΔn under Reg 643.7.3,
                must operate within 300 ms).
              </li>
              <li>
                <strong>(c) All extraneous-conductive-parts of the location are connected to the
                main earthing terminal.</strong> Visual confirms the MET bonding for the relevant
                pipework / structure / heating elements.
              </li>
            </ul>
            <p>
              If any one condition fails, supplementary bonding remains required. On EICR
              this often shows up as old houses where supp bonding was correctly installed but
              has since been disturbed (e.g. removed during a kitchen refit, lost when a copper
              pipe was replaced with plastic, broken at a connection). Cross with remediation
              recommended.
            </p>
            <p>
              Other Part 7 locations have their own supplementary bonding rules — Section 702
              (swimming pools), Section 703 (saunas), Section 705 (agricultural / horticultural),
              Section 711 (exhibitions), etc. Each section has its own zone definitions and
              bonding requirements. Visual inspection adds the relevant Part 7 items where the
              location applies.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 701.415.2 (Supplementary bonding omission)"
            clause="Local supplementary equipotential bonding according to Regulation 415.2 is not required where: all final circuits of the location comply with the requirements for automatic disconnection according to Regulation 411.3.2, all final circuits of the location have additional protection by means of an RCD according to Regulation 415.1.1, and all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding according to Regulation 411.3.1.2."
            meaning={
              <>
                The omission is conditional on all three being verified. Visual inspection
                confirms RCD presence and bonding to MET. Live testing confirms disconnection
                times. If you record an omission of supplementary bonding without verifying all
                three, the EIC is unsupported. On EICR, missing supp bonding where any condition
                fails is C2 (potentially dangerous in a wet location).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 701, Regulation 701.415.2."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Identifying the means of earthing on visual inspection"
            plainEnglish="The means of earthing is where the customer earthing system connects to earth — DNO supply terminal on TN systems, dedicated earth electrode on TT. Visual inspection identifies the means, confirms the connection is sound, the conductor is sized per Table 54.7, the BS 951 label is present, and (TT) the test link allows future Ra retest."
            onSite="Find the MET. Trace the earthing conductor from the MET back to the means of earthing. On TN-S — to a dedicated earth terminal at the supply head. On TN-C-S — to the supply neutral terminal (combined PEN). On TT — to a buried electrode via a test link. Record what you see on the EIC."
          >
            <p>Visual identification of the means of earthing by ADS arrangement:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S.</strong> Separate earth terminal at the supply head, often the cable
                armour or a separate green/yellow conductor from the DNO. Customer earthing
                conductor terminates at this dedicated earth terminal. Ze typically 0.1-0.8 Ω.
              </li>
              <li>
                <strong>TN-C-S (PME).</strong> The combined PEN at the supply head. Customer
                earthing conductor terminates at the supply neutral terminal — which is also the
                earth on PME. The PEN is bonded to earth multiple times on the DNO network.
                Visible: no separate earth terminal at the supply head; customer connects to the
                neutral terminal.
              </li>
              <li>
                <strong>TN-C-S (PNB).</strong> Same topology but the customer bonds N to E at the
                intake. Visible: a customer-side N-E link inside the customer enclosure (often a
                bar or strap between the neutral block and the earth block at the origin
                distribution).
              </li>
              <li>
                <strong>TT.</strong> Customer's own earth electrode — typically an earth rod
                driven into the ground, a foundation electrode, or an earth mat. Connection at
                the MET via a test link to permit periodic Ra retest. Inspection pit / marker
                ideally above the buried electrode for future access.
              </li>
              <li>
                <strong>IT.</strong> Source isolated from earth. Specialised — medical Group 2,
                some industrial. Visible: monitoring equipment and / or earthing transformer at
                the source.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Continuity of bonding conductors — visual cues vs measurement"
            plainEnglish="Visual inspection confirms a bonding conductor is present at every required location and that the connection looks sound. Continuity testing (covered in Section 3) actually measures the resistance from MET to the bonded part. Both are needed — visual catches missing or visibly defective bonding; testing catches hidden discontinuity."
            onSite="During visual, every extraneous-conductive-part should have a bonding conductor terminating within 600 mm of its entry point (Reg 411.3.1.2). Look at gas, water, oil, central heating, structural metal, lightning earthing. Each should have a green/yellow conductor labelled with BS 951 going back to the MET."
          >
            <p>Visual cues for sound bonding:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bonding conductor present.</strong> Green/yellow, terminated at the
                extraneous-conductive-part with an appropriate clamp (BS 951 type for pipework).
              </li>
              <li>
                <strong>Conductor sized per Table 54.8.</strong> Measure or compare against the
                supply tail size. Common defect: 6 mm² where Table 54.8 requires 10 mm² for
                25 mm² PME tail.
              </li>
              <li>
                <strong>BS 951 label present and legible.</strong> "Safety Electrical Connection
                — Do Not Remove". Check on every required connection.
              </li>
              <li>
                <strong>Termination clamp appropriate.</strong> BS 951 clamp for pipework
                (gas / water). Crimped lug or terminated in approved enclosure for structural
                metal. Plumbing band clip is not a bonding clamp.
              </li>
              <li>
                <strong>Connection sound.</strong> Tight, no corrosion, no movement.
              </li>
              <li>
                <strong>Routing sensible.</strong> Conductor protected from mechanical damage,
                not run through gas / fuel pipes' close vicinity, not subject to tension or
                strain.
              </li>
              <li>
                <strong>Within 600 mm of point of entry where practical (Reg 411.3.1.2).</strong>
                Bond should be installed close to where the service enters the building, before
                any branches or fittings.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diverted neutral current — why PME tables are stricter"
            plainEnglish="On PME, the supply combines neutral and earth (PEN). If the PEN connection fails upstream, normal load current that would have returned via the neutral instead returns via the customer's earthing system — bonding conductors, earthing conductor, anything connected to MET. This 'diverted neutral current' can be substantial. Table 54.7 / 54.8 PME columns size conductors to safely carry this without overheating."
            onSite="When you measure a PME supply tail at 25 mm² and the earthing / bonding conductors are 10 mm² and 6 mm² (the non-PME values), that's a Table 54.7 / 54.8 violation under PME. The stricter PME columns require 16 mm² / 10 mm² for that tail size. Visual catches this; remediation needed before sign-off."
          >
            <p>Diverted neutral current — the engineering rationale for PME stricter sizing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The PEN failure mode.</strong> A break in the combined PEN conductor
                upstream of the customer (in the supply cable or at a joint). The customer's
                earthing system suddenly becomes the only return path for normal load current.
              </li>
              <li>
                <strong>Current magnitude.</strong> In a small domestic install, the diverted
                current could be 30-80 A. In larger commercial, hundreds of amps. The conductors
                must safely carry this without overheating or damaging insulation.
              </li>
              <li>
                <strong>Voltage rise on extraneous parts.</strong> The current flowing through the
                bonding network creates a voltage rise on the gas / water / structural metal —
                potentially significant. Bonding equalises these to the customer earth, but the
                customer earth itself is at a raised voltage.
              </li>
              <li>
                <strong>Touch voltage risk.</strong> Stand on the ground (true earth) and touch a
                bonded part — voltage difference across the body. The further from the supply
                transformer, the worse.
              </li>
              <li>
                <strong>EV charger context.</strong> The vehicle chassis becomes a touchable
                extraneous-conductive-part. A user standing on the driveway touching the vehicle
                during a PEN failure could be exposed to fatal voltage. Section 722.411.4
                addresses this with O-PEN devices or TT earthing for the EVSE.
              </li>
            </ul>
            <p>
              The Table 54.7 / 54.8 PME columns are sized conservatively to handle diverted
              neutral current safely. Visual inspection enforces these by measuring conductor
              sizes against the table.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test link at the MET — visual confirmation and TT requirements"
            plainEnglish="The test link at the MET provides the means to disconnect the earthing conductor for testing without disturbing the rest of the installation bonding. Reg 542.4 requires accessibility for inspection and testing — the test link is the practical mechanism. On TT installations particularly, periodic Ra testing requires the link."
            onSite="Find the MET. The earthing conductor should arrive at the MET via a removable link — typically a brass strap secured by a single bolt that can be undone for testing. If the conductor terminates directly with no link, periodic Ra testing requires breaking the bonding to the entire installation — impractical and risky. Recommend installation of a test link as a remedial item."
          >
            <p>Test link visual inspection items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Presence at MET.</strong> Removable link between earthing conductor and
                MET busbar / terminal. Most modern installations have a link; older installations
                may not.
              </li>
              <li>
                <strong>Accessibility.</strong> The link can be reached for testing without
                dismantling the enclosure. Reg 542.4 — accessibility for inspection / testing.
              </li>
              <li>
                <strong>Mechanical integrity.</strong> Link is solidly attached, fasteners tight,
                no corrosion compromising the joint.
              </li>
              <li>
                <strong>Identification.</strong> "Earth — do not remove" or similar warning at
                the link, distinct from the BS 951 label which goes on the bonding conductor
                connection itself.
              </li>
              <li>
                <strong>TT-specific — accessible electrode.</strong> Earth electrode accessible
                for visual inspection where reasonably practical (inspection pit / marker above
                the buried rod). Buried electrodes per Reg 542.4 exception don't need accessibility
                but should be at known location.
              </li>
              <li>
                <strong>Recording on EIC.</strong> Test link presence noted; absence on existing
                installations is an observation / improvement on EICR (typically C3 unless other
                factors elevate).
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Bathroom rewire with a missing supp bond"
            situation={
              <>
                You are doing a periodic on a 1990s domestic install. The bathroom has a metal
                bath, metal towel rail, copper hot/cold pipes, and a metal-bodied shower. Visual
                inspection finds main bonding to gas and water at the MET (16 mm² Cu, BS 951
                label, sound). The bathroom circuits are RCBO-protected at 30 mA. But the
                supplementary bonding cable that used to link the towel rail to the pipework has
                been disconnected — the conductor is hanging loose with no termination. Reg
                701.415.2 conditions: Zs and disconnection times will be verified at live test;
                RCDs are present at 30 mA; the towel rail is metal and is potentially in
                continuous contact with the metal radiator pipework — but the lost supp bond
                breaks the equipotential path within the location.
              </>
            }
            whatToDo={
              <>
                Record on the schedule: supplementary bonding (Reg 701.415.2): cross. Comment:
                disconnected supplementary bond observed at towel rail in Section 701 zone.
                Reg 701.415.2 omission criterion three cannot be verified as met — recommend
                reinstatement of supplementary bonding to all extraneous-conductive-parts within
                the location, OR full verification by testing extraneous-conductive-part
                continuity to MET. Code C2 on EICR (potentially dangerous — Section 701 wet
                location, bonding integrity not assured). Photograph the loose conductor.
              </>
            }
            whyItMatters={
              <>
                Section 701 is a wet location — body resistance is reduced when wet, touch
                voltage limits are stricter. Supplementary bonding equalises potential within the
                location so even during a fault before the RCD trips, the user is not exposed to
                dangerous voltage differences across body parts. A disconnected supp bond removes
                that protection layer. The RCD still works — but the layered defence the location
                requires is compromised.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Earthing (Reg 542) provides the fault return path for ADS. Bonding (Reg 411.3.1.2) equalises potential between extraneous-conductive-parts. Two different jobs that meet at the MET.',
              'Table 54.7 sizes the main earthing conductor — PME column more stringent due to diverted neutral current. Table 54.8 sizes main bonding — PME column also more stringent.',
              "Reg 514.13.1 — BS 951 label at every earth electrode connection, every main bonding to extraneous-conductive-parts, and at the MET where separated from switchgear.",
              "A4:2026 formalised the PNB (protective neutral bonding) designation — TN-C-S where the customer (not the DNO) bonds neutral to earth at the intake. Distinct from PME on the EIC.",
              'Section 701 bathroom supplementary bonding can be omitted only if all three Reg 701.415.2 conditions are met (disconnection times, 30 mA RCD on all circuits, all extraneous-conductive-parts to MET).',
              'TT installations require an electrode test link (Reg 542.4) for accessible Ra retest. Missing test link is a recordable observation/improvement.',
              'Reg 542.4.2 — every earthing connection must be electrically and mechanically sound, protected against damage and corrosion, accessible for inspection (except buried), and labelled per Reg 514.13.',
              'Visual inspection identifies the ADS arrangement at the intake — TN-S, TN-C-S (PME / PNB), TT, IT. The arrangement drives the rest of the verification reference values.',
            ]}
          />

          <Quiz title="Earthing and bonding inspection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Visual inspection scope
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Protective device inspection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
